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
const { priceConvertFiatSchema } = require('../../../schemas/dex-base/priceConvertFiatSchema')
const wsRpcUrl = `${config.SERVICE_ENDPOINT}/rpc-dex-v1`;
const getPricesConvertFiat = async params => request(wsRpcUrl, 'get.dex.prices.convert.fiat', params);

describe('Method get.dex.prices.convert.fiat', () => {
	describe('is able to retrieve specified currency fiat price for the input token', () => {
		it('returns fiat price', async () => {
			try {
				const response = await getPricesConvertFiat({currency:'USD', tokenID:'LSK'});
				const { result } = response;
				expect(result.data).toMap(priceConvertFiatSchema);
				expect(result.data.convertedPrice).toBeGreaterThan(0.0000);
				expect(result.data.convertedTarget).toBe('USD');
			} catch (err) {
				throw err;
			}
		});
	});
});
