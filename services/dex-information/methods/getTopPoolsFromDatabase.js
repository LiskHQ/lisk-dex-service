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

const { getTopPoolsFromDatabase } = require('./controller/getTopPoolsFromDatabase');

const regex = require('../shared/regex');

module.exports = [
	{
		name: 'getTopPoolsFromDatabase',
		controller: getTopPoolsFromDatabase,
		params: {
			limit: { optional: true, type: 'number', min: 1, max: 100, pattern: regex.LIMIT },
		},
	},
];
