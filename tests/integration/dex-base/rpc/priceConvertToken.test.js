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

const { priceConvertTokenSchema } = require('../../../schemas/dex-base/priceConvertToken.schema')
const {
	invalidParamsSchema,
} = require('../../../schemas/rpcGenerics.schema');

const wsRpcUrl = `${config.SERVICE_ENDPOINT}/rpc-dex-v1`;
const getPricesConvertToken = async params => request(wsRpcUrl, 'get.prices.convert.token', params);

describe('Method get.prices.convert.token', () => {
	describe('is able to convert token1 to token2 and token2 to token1', () => {
		it('returns token1/token2 and token2/token1 converted price', async () => {
			const response = await getPricesConvertToken({ tokenID0: 'LSK', conversionTokenID: 'BTC' });
			const { result } = response;
			expect(result.data).toMap(priceConvertTokenSchema);
		});
		it('params not supported -> INVALID_PARAMS ', async () => {
			const response = await request(wsRpcUrl, 'get.prices.convert.token', {
				someparam: 'not_supported',
			}).catch(e => e);
			expect(response).toMap(invalidParamsSchema);
		});
	});
});
