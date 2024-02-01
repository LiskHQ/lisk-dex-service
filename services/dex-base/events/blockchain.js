/*
 * LiskHQ/lisk-service
 * Copyright © 2024 Lisk Foundation
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
const { Logger, Signals } = require('lisk-service-framework');

const logger = Logger();

module.exports = [
	{
		name: 'pool.created',
		description: 'Pool Created',
		controller: callback => {
			const poolCreatedListener = async (payload) => {
				try {
					callback(payload);
				} catch (err) {
					logger.error(`Error occured when processing 'pool.created' event:\n${err.stack}`);
				}
			};
			Signals.get('poolCreated').add(poolCreatedListener);
		},
	},
	{
		name: 'pool.creation.failed',
		description: 'Pool Creation Failed',
		controller: callback => {
			const poolCreationFailedListener = async (payload) => {
				try {
					callback(payload);
				} catch (err) {
					logger.error(`Error occured when processing 'pool.creation.failed' event:\n${err.stack}`);
				}
			};
			Signals.get('poolCreationFailed').add(poolCreationFailedListener);
		}
	},
	{
		name: 'position.created',
		description: 'Position Created',
		controller: callback => {
			const positionCreatedListener = async (payload) => {
				try {
					callback(payload);
				} catch (err) {
					logger.error(`Error occured when processing 'position.created' event:\n${err.stack}`);
				}
			};
			Signals.get('positionCreated').add(positionCreatedListener);
		}
	},
	{
		name: 'position.creation.failed',
		description: 'Position Creation Failed',
		controller: callback => {
			const positionCreationFailedListener = async (payload) => {
				try {
					callback(payload);
				} catch (err) {
					logger.error(`Error occured when processing 'position.creation.failed' event:\n${err.stack}`);
				}
			};
			Signals.get('positionCreationFailed').add(positionCreationFailedListener);
		}
	},
	{
		name: 'position.updated',
		description: 'Position Updated',
		controller: callback => {
			const positionUpdatedListener = async (payload) => {
				try {
					callback(payload);
				} catch (err) {
					logger.error(`Error occured when processing 'position.updated' event:\n${err.stack}`);
				}
			};
			Signals.get('positionUpdated').add(positionUpdatedListener);
		}
	},
	{
		name: 'position.update.failed',
		description: 'Pool Update Failed',
		controller: callback => {
			const positionUpdateFailedListener = async (payload) => {
				try {
					callback(payload);
				} catch (err) {
					logger.error(`Error occured when processing 'pool.created' event:\n${err.stack}`);
				}
			};
			Signals.get('positionUpdateFailed').add(positionUpdateFailedListener);
		}
	},
	{
		name: 'remove.liquidity',
		description: 'Remove Liquidity',
		controller: callback => {
			const removeLiquidityListener = async (payload) => {
				try {
					callback(payload);
				} catch (err) {
					logger.error(`Error occured when processing 'remove.liquidity' event:\n${err.stack}`);
				}
			};
			Signals.get('removeLiquidity').add(removeLiquidityListener);
		}
	},
	{
		name: 'removeLquidityFailed',
		description: 'Remove Liquidity Failed',
		controller: callback => {
			const removeLquidityFailedListener = async (payload) => {
				try {
					callback(payload);
				} catch (err) {
					logger.error(`Error occured when processing 'remove.liquidity.failed' event:\n${err.stack}`);
				}
			};
			Signals.get('removeLquidityFailed').add(removeLquidityFailedListener);
		}
	},
	{
		name: 'swapped',
		description: 'swapped',
		controller: callback => {
			const swappedListener = async (payload) => {
				try {
					callback(payload);
				} catch (err) {
					logger.error(`Error occured when processing 'swapped' event:\n${err.stack}`);
				}
			};
			Signals.get('swapped').add(swappedListener);
		}
	},
	{
		name: 'swap.failed',
		description: 'swapFailed',
		controller: callback => {
			const swapFailedListener = async (payload) => {
				try {
					callback(payload);
				} catch (err) {
					logger.error(`Error occured when processing 'swap.failed' event:\n${err.stack}`);
				}
			};
			Signals.get('swapFailed').add(swapFailedListener);
		}
	},

];
