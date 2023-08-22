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

const config = require('../../../config');
const { request } = require('../../../helpers/socketIoRpcRequest');
const { poolsAvailableMetaResponseSchema,goodResponseSchema,poolsAvailableResponseSchema } = require('../../../schemas/dex-base/poolsSchema')
const wsRpcUrl = `${config.SERVICE_ENDPOINT}/rpc-dex-v1`;
const getPoolsAvailable = async params => request(wsRpcUrl, 'get.dex.pools.available', params);

describe('Method get.dex.pools.available', () => {
	describe('is able to retrieve specified currency fiat price for the input token', () => {
		it('returns a list of pools', async () => {
			try {
				const response = await getPoolsAvailable({ limit: '0', offset: '0' });
				const { result } = response;
				expect(result).toMap(goodResponseSchema);
				expect(result.data).toBeInstanceOf(Object);
				expect(result.data).toMap(poolsAvailableResponseSchema);
				expect(result.meta).toMap(poolsAvailableMetaResponseSchema);
			} catch (err) {
				// TODO: add more explicit message for the error
				throw err;
			}
		});
	});
});
