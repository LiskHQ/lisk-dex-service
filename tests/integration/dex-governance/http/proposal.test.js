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
const baseUrl = `${baseAddress}/api/dex-governance/v1`;
const endpoint = `${baseUrl}/proposals`;

describe('Method proposals', () => {
	let proposals;
	beforeAll(async () => {
		const response = await api.get(`${endpoint}?proposal=000000`);		
		proposals = response.data;
	});

	describe('For proposals Function', () => {
		it('returns with errors becuase of params related to proposals', async () => {
			const response = await api.get(`${endpoint}`,400);
			expect(response.error).toBeTrue();
			expect(response.message).toBe("Invalid input: The 'proposal' field is required.");
		});
		it('returns a list of proposals', async () => {
			const response = await api.get(`${endpoint}?proposal=000000`);	
			expect(response.data).toBeInstanceOf(Object);
			expect(response.data).not.toBeNull();
			expect(parseInt(response.data.popularPairings)).not.toBeNull();		
		});
	})	
});