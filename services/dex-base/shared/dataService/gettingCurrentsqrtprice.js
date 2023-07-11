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

const { invokeEndpoint } = require("../sdk/client");

const gettingCurrentsqrtprice = async (params) => {
	
    let currentsqrtprice;

    const methodContext = {
      params:{
        poolID: params.poolID,
        priceDirection: params.priceDirection,             
      }
    }
	
    try {
        currentsqrtprice = await invokeEndpoint('dex_getCurrentSqrtPrice',{methodContext, poolID:params.poolID,priceDirection:params.priceDirection });
          return {
              data: {
                currentsqrtprice,
              },
              meta: {},
          };
    } catch (err) {
      if (err) {
        throw err;
      }
    }
};

module.exports = {
	gettingCurrentsqrtprice,
};