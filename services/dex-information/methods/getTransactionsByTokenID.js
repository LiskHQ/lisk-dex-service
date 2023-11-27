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
	getTransactionsByTokenID,
} = require('./controller/getTransactionsByTokenID');

const regex = require('../shared/regex');

module.exports = [
	{
		name: 'getTransactionsByTokenID',
		controller: getTransactionsByTokenID,
		params: {
			poolID: { optional: false, type: 'string', min: 16, max: 40, pattern: regex.POOL_ID },
			tokenID: { optional: false, type: 'string', min: 16, max: 40, pattern: regex.TOKEN_ID },
			command: { optional: false, type: 'string' },
			account: { optional: false, type: 'string' },
			limit: { optional: false, type: 'number', min: 1, max: 100, pattern: regex.LIMIT },
			offset: { optional: false, type: 'string' },
		},
	},
];