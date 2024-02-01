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
const baseUrl = `${baseAddress}/api/dex-governance/v1`;
const endpoint = `${baseUrl}/proposals`;

describe('GET /api/dex-governance/v1/proposals', () => {
	describe('returning a specific proposal', () => {
		it('returns an error when given invalid params', async () => {
			const response = await api.get(`${endpoint}`, 400);
			expect(response.error).toBeTruthy();
			expect(response.message).toBe(
				"Server error: Invalid input: The 'proposal' field is required.",
			);
		});

		it('should return an error when the proposal does not exist', async () => {
			const response = await api.get(`${endpoint}?proposal=000000`, 500);
			expect(response.error).toBeTruthy();
			expect(response.message).toBe('Server error: Proposal with the given index does not exist');
		});

		it.skip('should return the expected response when the proposal exists', async () => {
			const response = await api.get(`${endpoint}?proposal=000000`);
			expect(response.data).toBeInstanceOf(Object);
			expect(response.data).toHaveProperty('proposal');
			expect(response.data.proposal).toBeInstanceOf(Object);
		});
	});
});
