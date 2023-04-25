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

const getPriceImpactExactIn = async (params) => {
    const moduleEndpointContext = {
		params:{
			tokenIdIn: params.tokenIdIn,
			amountIn:params.amountIn,
			tokenIdOut:params.tokenIdOut,
			minAmountOut:params.amountOut,
			swapRoute:params.swapRoute,
            
		}
	}
	try {
		const priceImpact = await invokeEndpoint('dex_dryRunSwapExactIn', moduleEndpointContext);
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
            logger.warn(`Error returned when invoking 'dex_dryRunSwapExactIn'.\n${err.stack}`);
			throw new TimeoutException('Request timed out when calling \'dryRunSwapExactIn\'.');
		}
	}
};

const getPriceImpactExactOut = async (params) => {
    const moduleEndpointContext = {
		params:{
			tokenIdIn: params.tokenIdIn,
			maxAmountIn:params.amountIn,
			tokenIdOut:params.tokenIdOut,
			amountOut:params.amountOut,
			swapRoute:params.swapRoute,
		}
	}
	try {
		const priceImpact = await invokeEndpoint('dex_dryRunSwapExactOut', moduleEndpointContext);
        return {
            data: {
                priceImpact,
                unit: "percentage",
                symbol: "%",
            },
            meta: {},
        };
	} catch (err) {
		logger.warn(`Error returned when invoking 'dex_dryRunSwapExactOut'.\n${err.stack}`);
		throw new TimeoutException('Request timed out when calling \'dryRunSwapExactOut\'.');
	}
};

module.exports = {
    getPriceImpactExactIn,
    getPriceImpactExactOut
};