/*
 * LiskHQ/lisk-service
 * Copyright © 2022 Lisk Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Lisk Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 *
 */
const util = require('util');

const { Logger, Signals } = require('lisk-service-framework');

const { getApiClient } = require('./client');
const { formatEvent } = require('./formatter');
const { getRegisteredEvents, getEventsByHeight, getNodeInfo } = require('./endpoints');
const config = require('../../config');
const { updateTokenInfo } = require('./token');

const logger = Logger();

const EVENT_CHAIN_FORK = 'chain_forked';
const EVENT_CHAIN_BLOCK_NEW = 'chain_newBlock';
const EVENT_CHAIN_BLOCK_DELETE = 'chain_deleteBlock';
const EVENT_CHAIN_VALIDATORS_CHANGE = 'chain_validatorsChanged';
const EVENT_TX_POOL_TRANSACTION_NEW = 'txpool_newTransaction';
//dex-base-events
const EVENT_POOL_CREATED = 'poolCreated';
const EVENT_POOL_CREATION_FAILED = 'poolCreationFailed';
const EVENT_POSITION_CREATED = 'positionCreated';
const EVENT_POSITION_CREATION_FAILED = 'positionCreationFailed';
const EVENT_POSITION_UPDATED = 'positionUpdated';
const EVENT_POSITION_UPDATE_FAILED = 'positionUpdateFailed';
const EVENT_REMOVE_LIQUIDITY = 'removeLiquidity';
const EVENT_REMOVE_LIQUIDITY_FAILED = 'removeLiquidityFailed';
const EVENT_SWAPPED = 'swapped';
const EVENT_SWAP_FIALED = 'swapFailed';

const events = [
	EVENT_CHAIN_FORK,
	EVENT_CHAIN_BLOCK_NEW,
	EVENT_CHAIN_BLOCK_DELETE,
	EVENT_CHAIN_VALIDATORS_CHANGE,
	EVENT_TX_POOL_TRANSACTION_NEW,
	EVENT_POOL_CREATED,
	EVENT_POOL_CREATION_FAILED,
	EVENT_POSITION_CREATED,
	EVENT_POSITION_CREATION_FAILED,
	EVENT_POSITION_UPDATED,
	EVENT_POSITION_UPDATE_FAILED,
	EVENT_REMOVE_LIQUIDITY,
	EVENT_REMOVE_LIQUIDITY_FAILED,
	EVENT_SWAPPED,
	EVENT_SWAP_FIALED,
];

let eventsCounter;

const logError = (method, err) => {
	logger.warn(`Invocation for ${method} failed with error: ${err.message}.`);
	logger.debug(err.stack);
};

const subscribeToAllRegisteredEvents = async () => {
	// Reset eventsCounter first
	eventsCounter = 0;

	const apiClient = await getApiClient();
	const registeredEvents = await getRegisteredEvents();
	const allEvents = registeredEvents.concat(events);
	allEvents.forEach(event => {
		apiClient.subscribe(event, async payload => {
			// Force update necessary caches on new chain events
			if (event.startsWith('chain_')) {
				eventsCounter++; // Increase counter with every newBlock/deleteBlock

				await getNodeInfo(true).catch(err => logError('getNodeInfo', err));
				await updateTokenInfo().catch(err => logError('updateTokenInfo', err));
			}

			logger.debug(`Received event: ${event} with payload:\n${util.inspect(payload)}`);
			Signals.get(event).dispatch(payload);
		});
		logger.info(`Subscribed to the API client event: ${event}.`);
	});
};

const getEventsByHeightFormatted = async height => {
	const chainEvents = await getEventsByHeight(height);
	const formattedEvents = chainEvents.map(event => formatEvent(event));
	return formattedEvents;
};

// To ensure API Client is alive and receiving chain events
setInterval(() => {
	if (eventsCounter === 0) {
		Signals.get('resetApiClient').dispatch();
	} else if (eventsCounter > 0) {
		eventsCounter = 0;
	}
}, config.clientConnVerifyInterval);

module.exports = {
	events,

	subscribeToAllRegisteredEvents,
	getEventsByHeight: getEventsByHeightFormatted,
};
