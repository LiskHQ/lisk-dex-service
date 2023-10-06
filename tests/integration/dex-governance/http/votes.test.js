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
const baseUrl = `${baseAddress}/api/dex-governance/v1`;
const endpoint = `${baseUrl}/votes`;

const { api } = require('../../../helpers/api');

describe('Method votes', () => {
	let votes;
	beforeAll(async () => {
		const response = await api.get(`${endpoint}?voterAddress=0000000000`);		
		votes = response.data;
	});

	describe('Retrieve Votes', () => {
		it('returns errors becuase of invalid params related', async () => {
			const response = await api.get(`${endpoint}`,422);
			expect(response.error).toBeTrue();
			expect(response.message).toBe("Server error: Parameters validation error!");
		});
		it('returns list of votes', async () => {
			const response = await api.get(`${endpoint}?voterAddress=0000000000`);	
			expect(response.data).toBeInstanceOf(Object);
			expect(response.data).not.toBeNull();
		});
	})
	
});
