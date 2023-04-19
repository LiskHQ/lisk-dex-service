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

const { currencies } = require('../constants');
const { requestMarket } = require('../utils/request');

const getPricesConvertToken = async (params) => {

	let marketPrices;
	let tokenID0TokenMarketPrice;  
	let conversionTokenIDMarketPrice;

	//getting all available tokens

	marketPrices = await requestMarket('prices');
	
    for (let i = 0;i<marketPrices.data.length;i++){
        const marketPriceToken = marketPrices.data[i].from;
        if(marketPriceToken === params.tokenID0 && marketPrices.data[i].to === currencies.USD){
			tokenID0TokenMarketPrice = marketPrices.data[i].rate;
		}else if(marketPriceToken === params.conversionTokenID && marketPrices.data[i].to === currencies.USD){
			conversionTokenIDMarketPrice = marketPrices.data[i].rate;
		}
    }

	const token1ToToken2 = tokenID0TokenMarketPrice/conversionTokenIDMarketPrice;
	const token2ToToken1 = 1/token1ToToken2;

	const convertedTokenPrice = {
		token1ToToken2 : token1ToToken2,
		token2ToToken1 : token2ToToken1
	};

	return {
		data: convertedTokenPrice,
		meta: {},
	};
};

module.exports = {
	getPricesConvertToken,
};
