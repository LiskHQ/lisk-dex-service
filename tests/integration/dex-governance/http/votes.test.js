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
const endpoint = `${baseUrl}/votes`;

describe('GET /api/dex-governance/v1/votes', () => {
	describe('returning details about the votes for a given account', () => {
		it('returns an error when given invalid params', async () => {
			const response = await api.get(`${endpoint}`, 500);
			expect(response.error).toBeTruthy();
			expect(response.message).toBe('Server error: Parameters validation error!');
		});

		it('should return the expected response when given valid params', async () => {
			const response = await api.get(`${endpoint}?voterAddress=0000000000`);
			expect(response.data).toBeInstanceOf(Object);
			expect(response.data).toHaveProperty('voteInfos');
			expect(response.data.voteInfos).toBeInstanceOf(Object);
		});
	});
});
