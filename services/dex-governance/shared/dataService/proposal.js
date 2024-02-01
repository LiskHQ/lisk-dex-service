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

const { Logger } = require('lisk-service-framework');
const { requestConnector } = require('../utils/request');

const logger = Logger();

const getProposal = async params => {
	try {
		const response = await requestConnector('invokeEndpoint', {
			endpoint: 'dexGovernance_getProposal',
			params,
		});

		if (response.error !== null) {
			throw new Error(response.error.message);
		}

		return {
			data: {
				proposal: response,
			},
			meta: {},
		};
	} catch (err) {
		logger.warn(`Error thrown when invoking 'dexGovernance_getProposal'.\n${err.stack}`);
		throw err;
	}
};

module.exports = {
	getProposal,
};
