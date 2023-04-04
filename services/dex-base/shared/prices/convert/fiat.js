/*
 * LiskHQ/lisk-service
 * Copyright © 2022 Lisk Foundation
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
const getPricesConvertFiat = async (params = {}) => {
	
    let convertedFiatPrice;
	//Check if token is valid
    //check params.currency can only be EUR || USD 
    //Convert token to equibalent LSK
    //convert LSK to params.currency and get the exchange rate
    return {
		data: convertedFiatPrice,
		meta: {},   
	};
};

module.exports = {
	getPricesConvertFiat,
};