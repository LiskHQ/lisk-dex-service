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

const {
	Logger,
	Exceptions: { TimeoutException },
} = require('lisk-service-framework');
const { requestConnector } = require('../utils/request');

const logger = Logger();
const timeoutMessage = 'Response not received in';

const getPriceImpactExactIn = async params => {
	let priceImpact;

	params.minAmountOut = params.amountOut;

	try {
		const response = await requestConnector('invokeEndpoint', {
			endpoint: 'dex_dryRunSwapExactIn',
			params,
		});

		if (response.error !== null) {
			throw new Error(response.error.message);
		} else {
			priceImpact = response;
		}

		return {
			data: {
				priceImpact,
				unit: 'percentage',
				symbol: '%',
			},
			meta: {},
		};
	} catch (err) {
		if (err.message.includes(timeoutMessage)) {
			logger.warn(`Error thrown when invoking 'dex_dryRunSwapExactIn'.\n${err.stack}`);
			throw new TimeoutException("Request timed out when calling 'dryRunSwapExactIn'.");
		} else {
			throw err;
		}
	}
};

const getPriceImpactExactOut = async params => {
	let priceImpact;

	params.maxAmountIn = params.amountIn;

	try {
		const response = await requestConnector('invokeEndpoint', {
			endpoint: 'dex_dryRunSwapExactOut',
			params,
		});

		if (response.error !== null) {
			throw new Error(response.error.message);
		} else {
			priceImpact = response;
		}

		return {
			data: {
				priceImpact,
				unit: 'percentage',
				symbol: '%',
			},
			meta: {},
		};
	} catch (err) {
		if (err.message.includes(timeoutMessage)) {
			logger.warn(`Error thrown when invoking 'dex_dryRunSwapExactOut'.\n${err.stack}`);
			throw new TimeoutException("Request timed out when calling 'dryRunSwapExactOut'.");
		} else {
			throw err;
		}
	}
};

module.exports = {
	getPriceImpactExactIn,
	getPriceImpactExactOut,
};
