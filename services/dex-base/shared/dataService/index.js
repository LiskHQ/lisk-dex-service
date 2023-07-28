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

const {
    gettingCurrentsqrtprice
} = require ('./gettingCurrentsqrtprice')

const {
    gettingStatistics
} = require ('./gettingStatistics')


const {
    getPriceImpactExactIn,
    getPriceImpactExactOut
} = require ('./priceImpact')

const {
    getPoolsAvailable
} = require ('./poolsAvailable')

const{
	getPricesConvertFiat,
} = require('./pricesConvertFiat');

const {
	getPricesConvertToken,
} = require('./priceConvertToken');

const {
    getTokensAvailable
} = require ('./tokensAvailable');

const {
    gettingSlippageBounds
} = require('./gettingSlippageBounds');

const {
	reloadMarketAppsPrices
} = require('./interoperability');

const {
    getPopularPairings
} = require ('./getPopularPairings')

module.exports = {
	// prices
	getPricesConvertFiat,
	getPricesConvertToken,
	getPriceImpactExactIn,
    getPriceImpactExactOut,
    gettingCurrentsqrtprice,
    gettingSlippageBounds,
	//tokens
	getTokensAvailable,
	//pools
	getPoolsAvailable,
	//statistcs
	gettingStatistics,
	//Interoperability
	reloadMarketAppsPrices,
   getPopularPairings
};
