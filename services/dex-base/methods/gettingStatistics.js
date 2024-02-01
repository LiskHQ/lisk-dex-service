/*
 * LiskHQ/lisk-service
 * Copyright © 2024 Lisk Foundation
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
	gettingStatistics,
} = require('./controller/gettingStatistics');
const regex = require('../shared/regex')

module.exports = [
	{
		name: 'gettingStatistics',
		controller: gettingStatistics,
		params: {
			interval: { optional: false, type: 'string', pattern: regex.DEX_INTERVAL },
			limit: { optional: false, type: 'number', pattern: regex.NONCE },
			offset: { optional: false, type: 'number', pattern: regex.NONCE },
		},
	},
];