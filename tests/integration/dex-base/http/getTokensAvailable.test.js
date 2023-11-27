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
const endpoint = `${baseUrl}/tokens/supported`;

describe('Method prices/convert/fiat', () => {
	let priceConvert;
	beforeAll(async () => {
		const response = await api.get(`${endpoint}`);		
		priceConvert = response.data;
	});

	describe('To Retrieve List Of Tokens', () => {
		it('returns list of tokens', async () => {
			const response = await api.get(`${endpoint}?limit=0`,422);
			expect(response.error).toBeTrue();
			expect(response.message).toBe("Server error: Parameters validation error!");
		});
		it('returns list of token in a json object', async () => {
			const response = await api.get(`${endpoint}`);	
			expect(response.data).toBeInstanceOf(Object);
			expect(response.data).not.toBeNull();
			expect(response.data.length).toBeGreaterThan(0);			
		});
	})	
});


