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

const { Utils } = require('lisk-service-framework');

const getPricesConvertFiat = async (params = {}) => {

    let convertedFiatPrice;
    let app;
    
    //check params.currency can only be EUR || USD 
    if (!(params.currency.equals('EUR')) && !(params.currency.equals('USD'))) {
        convertedFiatPrice = 'please provide either EUR or USD as input currency'
    }  

    const setAppContext = (h) => app = h;
    const getAppContext = () => app;

    const requestRpc = async (service, method, params = {}) => {
        const data = await getAppContext().requestRpc(`${service}.${method}`, params);
        if (Utils.isObject(data) && data.error) throw new Error(data.error.message);
        return data;
    };

    //get the market price for a specific token and return it
    const requestMarket = async (method, params) => requestRpc('market', method, params);
    const marketPrices = await requestMarket('prices');
    let inputTokenMarketPrice;    
    for (let i = 0;i<marketPrices.data.length;i++){
        const marketPriceToken = marketPrices.data.from;
        if(marketPriceToken.equals(params.tokenID) && marketPrices.data.code.equals(marketPriceToken.concat('_'+params.cuurecny.toUpperCase()))){
            inputTokenMarketPrice = marketPrices.data.to;
        }
    }

    convertedFiatPrice = inputTokenMarketPrice;
    
    module.exports = {
        setAppContext,
    };

    return {
        data: convertedFiatPrice,
        meta: {},
    };
};

module.exports = {
    getPricesConvertFiat,
};