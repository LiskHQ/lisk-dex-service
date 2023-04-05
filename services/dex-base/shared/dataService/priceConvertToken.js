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
const getPricesConvertToken = async (params = {}) => {

	let marketPrices;
	let tokenID0TokenMarketPrice;  
	let conversionTokenIDMarketPrice;

	//getting all available tokens
	const setAppContext = (h) => app = h;
	const getAppContext = () => app;
	const requestRpc = async (service, method, params) => {
		const data = await getAppContext().requestRpc(`${service}.${method}`, params);
		if (Utils.isObject(data) && data.error) throw new Error(data.error.message);
		return data;
	};

	const requestMarket = async (method, params) => requestRpc('market', method, params);
	marketPrices = await requestMarket('prices');
	const requestAppRegistry = async (method, params) => requestRpc('app-registry', method, params);
  
    for (let i = 0;i<marketPrices.data.length;i++){
        const marketPriceToken = marketPrices.data.from;
        if(marketPriceToken.equals(params.tokenID0) && marketPrices.data.code.includes('EUR')){
			tokenID0TokenMarketPrice = marketPrices.data.to;
		}else if(marketPriceToken.equals(params.conversionTokenID) && marketPrices.data.code.includes('EUR')){
			conversionTokenIDMarketPrice = marketPrices.data.to;
		}
    }

	const token1ToToken2 = tokenID0TokenMarketPrice/conversionTokenIDMarketPrice;
	const token2ToToken1 = 1/token1ToToken2;

	const convertedTokenPrice = {
		token1ToToken2 : params.tokenID0+'is equal to'+token1ToToken2+params.conversionTokenID,
		token2ToToken1 : params.conversionTokenID+'is equal to'+token2ToToken1+params.tokenID0,
		
	}

	module.exports = {
		setAppContext,
		requestMarket,
		requestAppRegistry
	};

	return {
		data: convertedTokenPrice,
		meta: {},
	};
};

module.exports = {
	getPricesConvertToken,
};
