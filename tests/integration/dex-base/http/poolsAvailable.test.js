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
const baseAddress = config.SERVICE_ENDPOINT;
const baseUrl = `${baseAddress}/api/dex/v1`;
const endpoint = `${baseUrl}/pools/available`;

const { api } = require('../../../helpers/api');

describe('Method get.dex.pools.available', () => {
	let poolAvailable;
	beforeAll(async () => {
		const response = await api.get(`${endpoint}?limit=0&offset=0`);		
		poolAvailable = response.data;
	});

	describe('Retrieve Pools Available lists', () => {
		it('returns errors becuase of params related to pools Available', async () => {
			const response = await api.get(`${endpoint}`,400);
			expect(response.error).toBeTrue();
			expect(response.message).toBe("Invalid input: The 'limit' field is required.; The 'offset' field is required.");
		});
		it('returns list of poolsAvaiable', async () => {
			const response = await api.get(`${endpoint}?limit=0&offset=0`);	
			expect(response.data).toBeInstanceOf(Object);
			expect(response.data).not.toBeNull();
		});
	})
	
});
