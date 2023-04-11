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

const { invokeEndpoint } = require("../../../blockchain-connector/shared/sdk/client");

const getPriceImpactExactIn = async (address) => {
	try {
		const priceImpact = await invokeEndpoint('dex_dryRunSwapExactIn', { 
            tokenIdIn,
			amountIn,
			tokenIdOut,
			minAmountOut,
			swapRoute});
        return {
            data: {
                priceImpact,
                unit: "percentage",
                symbol: "%",
            },
            meta: {},
        };
	} catch (err) {
		if (err.message.includes(timeoutMessage)) {
			throw new TimeoutException('Request timed out when calling \'dryRunSwapExactIn\'.');
		}
		logger.warn(`Error returned when invoking 'dex_dryRunSwapExactIn'.\n${err.stack}`);
		throw err;
	}
};

const getPriceImpactExactOut = async (address) => {
	try {
		const priceImpact = await invokeEndpoint('dex_dryRunSwapExactOut', {  
            tokenIdIn,
			maxAmountIn,
			tokenIdOut,
			amountOut,
			swapRoute });
        return {
            data: {
                priceImpact,
                unit: "percentage",
                symbol: "%",
            },
            meta: {},
        };
	} catch (err) {
		if (err.message.includes(timeoutMessage)) {
			throw new TimeoutException('Request timed out when calling \'dryRunSwapExactOut\'.');
		}
		logger.warn(`Error returned when invoking 'dex_dryRunSwapExactOut'.\n${err.stack}`);
		throw err;
	}
};

module.exports = {
    getPriceImpactExactIn,
    getPriceImpactExactOut
};