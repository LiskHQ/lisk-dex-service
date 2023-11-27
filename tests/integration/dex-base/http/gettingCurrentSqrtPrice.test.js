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

describe('Method getCurrentSqrtPrice', () => {
	let currentSqrtPrice;
	beforeAll(async () => {
		const response = await api.get(`${endpoint}?poolID=0X00000000&priceDirection=false`);		
		currentSqrtPrice = response.data;
	});

	describe('To retrieve currentSqrtPrice', () => {
		it('returns http error as params are not defined for currentSqrtPrice', async () => {
			const response = await api.get(`${endpoint}`,400);
			expect(response.error).toBeTrue();
			expect(response.message).toBe("Invalid input: The 'poolID' field is required.; The 'priceDirection' field is required.");
		});
		it('returns currentSqrtPrice', async () => {
			const response = await api.get(`${endpoint}?poolID=0X00000000&priceDirection=false`);	
			expect(response.data).toBeInstanceOf(Object);
			expect(response.data).not.toBeNull();
			expect(response.data.currentSqrtPrice).not.toBeNull();			
		});
	})	
});


