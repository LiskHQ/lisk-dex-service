/*
 * LiskHQ/lisk-service
 * Copyright © 2022 Lisk Foundation
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
const endpoint = `${baseUrl}/tokens/currentsqrtprice`;

describe('GET /api/dex/v1/tokens/currentsqrtprice', () => {
	describe('returning the current sqrt price of a given pool', () => {
		it('should return an error when given invalid params', async () => {
			const response = await api.get(`${endpoint}`, 400);
			expect(response.error).toBeTruthy();
			expect(response.message).toBe(
				"Server error: Invalid input: The 'poolID' field is required.; The 'priceDirection' field is required.",
			);
		});

		it('should return an error when the given pool does not exist', async () => {
			const response = await api.get(`${endpoint}?poolID=0X00000000&priceDirection=false`, 500);
			expect(response.error).toBeTruthy();
			expect(response.message).toBe('Server error: Key 1d0fbf938000 does not exist.');
		});

		it.skip('should return the expected response when the given pool exists', async () => {
			const response = await api.get(`${endpoint}?poolID=0X00000000&priceDirection=false`);
			expect(response.data).toBeInstanceOf(Object);
			expect(response.data).toHaveProperty('currentSqrtPrice');
			expect(response.data.currentSqrtPrice).not.toBeNull();
		});
	});
});
