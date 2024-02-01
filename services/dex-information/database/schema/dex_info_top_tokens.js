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
	tableName: 'dex_info_top_tokens',
	primaryKey: ['tokenName', 'tokenPrice', 'volume24H'],
	schema: {
		tokenName: { type: 'string' },
		tokenPrice: { type: 'string' },
		priceChange: { type: 'string' },
		volume24H: { type: 'string' },
		liquidity: { type: 'string' },
	},
	indexes: {
		tokenName: { type: 'key' },
		tokenPrice: { type: 'key' },
		priceChange: { type: 'key' },
		volume24H: { type: 'key' },
		liquidity: { type: 'key' },
	},
	purge: {},
};
