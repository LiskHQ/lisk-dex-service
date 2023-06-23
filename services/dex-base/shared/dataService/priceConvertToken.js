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

const getPricesConvertToken = async (params) => {
	
	const marketPrices = getMarketAppsPrices();
	
	const tokenSymbolMap = new Map();
	const conversionTokenSymbolMap = new Map();
	let rate;
	let rateTokenIDs;
	let rateconversionTokenID;

	// set a global variable and 
	// a function to call the marketservice and set the value for the global varibale
	// updating the variable
	// a fallback method for the market service is down then explicitly invoke the market service
	
	for (let i = 0; i < marketPrices.data.length; i++) {
		const marketPriceToken = marketPrices.data[i].from;
		if (marketPriceToken === params.tokenSymbol.toUpperCase()) {
			tokenSymbolMap.set(marketPrices.data[i].to, marketPrices.data[i]);
		} else if (marketPriceToken === params.conversionTokenSymbol.toUpperCase()) {
			conversionTokenSymbolMap.set(marketPrices.data[i].to, marketPrices.data[i]);
		}

	}

	if (tokenSymbolMap.has(params.conversionTokenSymbol.toUpperCase())) {
		rate = tokenSymbolMap.get(params.conversionTokenSymbol.toUpperCase()).rate;
	} else {
		for (const tokenSymbol of tokenSymbolMap.keys()) {
			if (conversionTokenSymbolMap.has(tokenSymbol)) {
				rateTokenIDs = tokenSymbolMap.get(tokenSymbol).rate;
				rateconversionTokenID = conversionTokenSymbolMap.get(tokenSymbol).rate;
				rate = rateTokenIDs / rateconversionTokenID;
				break;
			}
		}
	}

	const token1ToToken2 = rate;
	const token2ToToken1 = 1 / rate;

	const convertedTokenPrice = {
		token1ToToken2,
		token2ToToken1,
	};

	return {
		data: convertedTokenPrice,
		meta: {},
	};
};

module.exports = {
	getPricesConvertToken,
};
