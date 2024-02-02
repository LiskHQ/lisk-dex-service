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
module.exports = {
	tableName: 'dex_info_top_pools',
	primaryKey: ['poolName', 'poolTVL', 'poolVolume24H'],
	schema: {
		poolName: { type: 'string' },
		poolTVL: { type: 'string' },
		poolVolume24H: { type: 'string' },
		poolFees24H: { type: 'string' },
		poolAPY: { type: 'string' },
	},
	indexes: {
		poolName: { type: 'key' },
		poolTVL: { type: 'key' },
		poolVolume24H: { type: 'key' },
		poolFees24H: { type: 'key' },
		poolAPY: { type: 'key' },
	},
	purge: {},
};
