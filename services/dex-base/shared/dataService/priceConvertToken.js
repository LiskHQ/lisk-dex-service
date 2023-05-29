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

const { requestMarket } = require('../utils/request');

const getPricesConvertToken = async (params) => {
	let marketPrices;
	marketPrices = await requestMarket('prices');

	const tokenID0Map = new Map();
	const conversionTokenIDMap = new Map();
	let rate;
	let rateTokenIDs;
	let rateconversionTokenID;

	for (let i = 0; i < marketPrices.data.length; i++) {
		const marketPriceToken = marketPrices.data[i].from;
		if (marketPriceToken === params.tokenSymbol) {
			tokenID0Map.set(marketPrices.data[i].to, marketPrices.data[i]);// {[BTC,LSK_BTC], [ETH,LSK_ETH]}
		} else if (marketPriceToken === params.conversionTokenSymbol) {
			conversionTokenIDMap.set(marketPrices.data[i].to, marketPrices.data[i]);// {[ABC,BTC_ABC], [ETH,BTC_ETH]}
		}
	}

	if (tokenID0Map.has(params.conversionTokenSymbol)) {
		rate = tokenID0Map.get(params.conversionTokenSymbol).rate;
	} else {
		for (const tokenIDs of tokenID0Map.keys()) {
			if (conversionTokenIDMap.has(tokenIDs)) {
				rateTokenIDs = tokenID0Map.get(tokenIDs).rate;
				rateconversionTokenID = conversionTokenIDMap.get(tokenIDs).rate;
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
