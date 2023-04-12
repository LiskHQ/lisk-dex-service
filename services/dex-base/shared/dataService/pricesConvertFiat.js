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
const { requestRpc } = require('../utils/request');

const getPricesConvertFiat = async (params = {}) => {

    let convertedFiatPrice;
    
    //check params.currency can only be EUR || USD 
    if (!(params.currency === 'EUR') && !(params.currency === 'USD')) {
        convertedFiatPrice = 'please provide either EUR or USD as input currency'
    }  

    

    //get the market price for a specific token and return it
    const requestMarket = async (method, params) => requestRpc('market', method, params);
    const marketPrices = await requestMarket('prices');
    let inputTokenMarketPrice;    
    for (let i = 0;i<marketPrices.data.length;i++){
        const marketPriceToken = marketPrices.data[i].from;
        if(marketPriceToken === params.tokenID && marketPrices.data[i].to === params.currency){
            inputTokenMarketPrice = marketPrices.data[i].rate;
        }
    }

    convertedFiatPrice = inputTokenMarketPrice;
    
    return {
        data: convertedFiatPrice,
        meta: {},
    };
};

module.exports = {
    getPricesConvertFiat,
};