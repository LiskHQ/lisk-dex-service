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

const config = require('../../../config');
const { api } = require('../../../helpers/api');

const baseAddress = config.SERVICE_ENDPOINT;
const baseUrl = `${baseAddress}/api/dex/v1`;
const endpoint = `${baseUrl}/tokens/popularPairings`;

describe('GET /api/dex/v1/tokens/popularPairings', () => {
	describe('returning popular token pairings', () => {
		it('should return an error when given invalid params', async () => {
			const response = await api.get(`${endpoint}`, 400);
			expect(response.error).toBeTruthy();
			expect(response.message).toBe(
				"Server error: Invalid input: The 'senderAddress' field is required.",
			);
		});

		it('should return the expected response when given valid params', async () => {
			const response = await api.get(`${endpoint}?senderAddress=000000`);
			expect(response.data).toBeInstanceOf(Object);
			expect(response.data).toHaveProperty('popularPairings');
			expect(response.data.popularPairings).toBeInstanceOf(Array);
		});
	});
});
