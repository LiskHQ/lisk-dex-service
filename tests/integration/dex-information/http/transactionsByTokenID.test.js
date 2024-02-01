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
const baseUrl = `${baseAddress}/api/dex-information/v1`;
const endpoint = `${baseUrl}/getTransactionsByTokenID`;

describe('GET /api/dex-information/v1/getTransactionsByTokenID', () => {
	describe('returning a list of transactions by tokenID', () => {
		it('should return an error when given invalid params', async () => {
			const response = await api.get(`${endpoint}`, 400);
			expect(response.error).toBeTruthy();
			expect(response.message).toBe(
				"Server error: Invalid input: The 'poolID' field is required.; The 'tokenID' field is required.; The 'command' field is required.; The 'account' field is required.; The 'limit' field is required.; The 'offset' field is required.",
			);
		});

		it('should return the expected response when given valid params', async () => {
			const response = await api.get(
				`${endpoint}?poolID=0000000000000000&tokenID=0000000000000000&command=swap&account=12345678912345&limit=1&offset=0`,
			);
			expect(response.data).toBeInstanceOf(Object);
			expect(response.data).toHaveProperty('transactionsByTokenID');
			expect(response.data.transactionsByTokenID).toBeInstanceOf(Array);
		});
	});
});
