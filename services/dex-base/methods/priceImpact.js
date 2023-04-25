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

const { getPriceImpact } = require('./controller/priceImpact');

module.exports = [
	{
		name: 'prices.impact',
		controller: getPriceImpact,
		params: {
			tokenIdIn: { optional: false, type: 'string' },
			amountIn: { optional: false, type: 'string' },
            tokenIdOut: { optional: false, type: 'string' },
            amountOut: { optional: false, type: 'string' },
            swapRoute: { optional: false, type: 'string' },
            isZeroToOne: { optional: false, type: 'boolean' },
		},
	},
];