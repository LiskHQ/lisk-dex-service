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
const regex = require('../shared/regex');

module.exports = [
	{
		name: 'prices.impact',
		controller: getPriceImpact,
		params: {
			tokenIdIn: { optional: false, type: 'string', min: 16, max: 16, pattern: regex.TOKEN_ID },
			amountIn: { optional: false, type: 'string', min: 1, max: 64, pattern: regex.AMOUNT_IN },
			tokenIdOut: { optional: false, type: 'string', min: 16, max: 16, pattern: regex.TOKEN_ID },
			amountOut: { optional: false, type: 'string', min: 1, max: 64, pattern: regex.AMOUNT_OUT },
			swapRoute: { optional: false, type: 'string' },
			isZeroToOne: { optional: false, type: 'boolean' },
		},
	},
];