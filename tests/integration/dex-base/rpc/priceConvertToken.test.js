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
const { priceConvertTokenSchema } = require('../../../schemas/dex-base/priceConvertTokenSchema')
const wsRpcUrl = `${config.SERVICE_ENDPOINT}/rpc-dex-v1`;
const getPricesConvertToken = async params => request(wsRpcUrl, 'get.dex.prices.convert.token', params);

describe('Method get.dex.prices.convert.fiat', () => {
	describe('is able to convert price of token1 to token1', () => {
		it('returns fiat price', async () => {
			try {
				const response = await getPricesConvertToken({tokenSymbol:'LSK', conversionTokenSymbol:'BTC'});
				const { result } = response;
				expect(result.data).toMap(priceConvertTokenSchema);
				expect(result.data.credibleDirectPriceToken2ToToken1).toBeGreaterThan(0.0000);
				expect(result.data.credibleDirectPriceToken2ToToken1).toBeGreaterThan(0.0000);
			} catch (err) {
				// TODO: add more explicit message for the error
				throw err;
			}
		});
	});
});
