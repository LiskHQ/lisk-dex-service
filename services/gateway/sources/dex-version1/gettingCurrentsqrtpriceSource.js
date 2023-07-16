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

module.exports = {
	type: 'moleculer',
<<<<<<< HEAD:services/gateway/sources/dex-version1/gettingCurrentsqrtpriceSource.js
	method: 'dex.prices.currentsqrtprice',
	params: {
		poolID: '=,string',
		priceDirection: '=,boolean',
	},
	definition: {
		data: {
            currentSqrtPrice: '=',
            tokenID0: '=',
            tokenID1: '=',
            unit: '=',
			symbol: '=',
		},
		meta: {},
=======
	method: 'dex.prices.convert.fiat',
	params: {
		currency: '=,string',
		tokenSymbol: '=,string',
	},
	definition: {
		data: {
			convertedPrice: '=,string',
			convertedTarget: '=,string',
		},
		meta: {

		},
		links: {},
>>>>>>> origin/development:services/gateway/sources/dex-version1/pricesConvertFiatSource.js
	},
};