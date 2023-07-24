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

//const { gettingSlippageBounds } = require('./controller/gettingSlippageBounds');
const regex = require('../shared/regex');
const { dryRunTransaction } = require('../shared/sdk/transactions')

module.exports = [
	{
		name: 'prices.gettingSlippageBounds',
		controller: async ({
			tokenIdIn,
			amountIn,
			tokenIdOut,
			minAmountOut,
			swapRoute
		}) => dryRunTransaction({ tokenIdIn,amountIn,tokenIdOut,minAmountOut,swapRoute }),
		params: {
			tokenIdIn: { optional: false, type: 'string', min: 16, max: 16, pattern: regex.TOKEN_ID },
			amountIn: { optional: false, type: 'number', min: 1, max: 64, pattern: regex.AMOUNT_IN },
			tokenIdOut: { optional: false, type: 'string', min: 16, max: 16, pattern: regex.TOKEN_ID },
			minAmountOut: { optional: false, type: 'number', min: 1, max: 64, pattern: regex.AMOUNT_OUT },
			swapRoute: { optional: false, type: 'string' },
		},
	},
];