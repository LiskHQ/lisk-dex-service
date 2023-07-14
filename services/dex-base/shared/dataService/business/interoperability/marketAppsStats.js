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

const { requestMarket } = require("../../../utils/request");
const logger = require('lisk-service-framework').Logger();

let marketAppsPricesCache;

const getMarketAppsPrices = async () => {
	
	if(!marketAppsPricesCache){
		marketAppsPricesCache = await requestMarket('prices');        		
	}	
	return marketAppsPricesCache;
};

const reloadMarketAppsPrices = async () => {
	try {		    
		logger.debug('Updating market apps prices cache');
		if(!marketAppsPricesCache){
			marketAppsPricesCache = await requestMarket('prices');        		
		}
        logger.info('Updated market apps statistics cache.');
	} catch (err) {
		logger.warn(`Failed to update blockchain apps statistics cache due to: ${err.message}`);
	}
};

module.exports = {
	getMarketAppsPrices,
	reloadMarketAppsPrices,
};