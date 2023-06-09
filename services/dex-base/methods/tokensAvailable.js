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
	getTokensAvailable,
} = require('./controller/tokensAvailable');

const regex = require('../shared/regex');

module.exports = [
	{
		name: 'tokens.available',
		controller: getTokensAvailable,
		params: {
			limit: { optional: true, type: 'string', min: 1, max: 100, pattern: regex.NONCE },
			offset: { optional: true, type: 'string', min: 0, pattern: regex.NONCE },
		},
	},
];