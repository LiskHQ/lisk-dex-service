/*
 * LiskHQ/lisk-service
 * Copyright © 2023 Lisk Foundation
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

const gettingSlippageBounds = async params => {
	try {
		const response = await requestConnector('invokeEndpoint', {
			endpoint: 'dex_dryRunSwapExactOut',
			params,
		});

		if (response.error !== null) {
			throw new Error(response.error.message);
		}

		return {
			data: {
				minimum: response[2],
				maximum: response[3],
				unit: 'percentage',
				symbol: '%',
			},
			meta: {},
		};
	} catch (err) {
		logger.warn(`Error thrown when invoking dex_dryRunSwapExactIn.\n${err.stack}`);
		throw err;
	}
};

module.exports = {
	gettingSlippageBounds,
};
