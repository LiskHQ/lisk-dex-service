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
const { api } = require('../../../helpers/api');

const baseAddress = config.SERVICE_ENDPOINT;
const baseUrl = `${baseAddress}/api/dex/v1`;
const endpoint = `${baseUrl}/prices/convert/token`;

describe('GET /api/dex/v1/prices/convert/token', () => {
	describe('converting token price to the equivalent amount of another token price', () => {
		it('should return an error when given invalid params', async () => {
			const response = await api.get(`${endpoint}`, 400);
			expect(response.error).toBeTruthy();
			expect(response.message).toBe(
				"Server error: Invalid input: The 'tokenSymbol' field is required.; The 'conversionTokenSymbol' field is required.",
			);
		});

		it('should return the price of one token compared to another token when given valid params', async () => {
			const response = await api.get(`${endpoint}?tokenSymbol=LSK&conversionTokenSymbol=BTC`);
			expect(response.data).toBeInstanceOf(Object);
			expect(response.data).toHaveProperty('credibleDirectPriceToken2ToToken1');
			expect(
				parseInt(response.data.credibleDirectPriceToken2ToToken1 * 100000, 10),
			).toBeGreaterThan(0);
			expect(response.data).toHaveProperty('credibleDirectPriceToken1ToToken2');
			expect(
				parseInt(response.data.credibleDirectPriceToken1ToToken2 * 100000, 10),
			).toBeGreaterThan(0);
		});
	});
});
