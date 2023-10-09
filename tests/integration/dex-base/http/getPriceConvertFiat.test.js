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
const baseUrl = `${baseAddress}/api/dex/v1`;
const endpoint = `${baseUrl}/prices/convert/fiat`;

describe('Method prices/convert/fiat', () => {
	let priceConvert;
	beforeAll(async () => {
		const response = await api.get(`${endpoint}?currency=USD&tokenSymbol=BTC`);		
		priceConvert = response.data;
	});

	describe('For Price Convert Fiat Function', () => {
		it('returns errors becuase of params related to priceConvertFiat', async () => {
			const response = await api.get(`${endpoint}`,400);
			expect(response.error).toBeTrue();
			expect(response.message).toBe("Invalid input: The 'currency' field is required.; The 'tokenSymbol' field is required.");
		});
		it('returns price of converted token to Fiat', async () => {
			const response = await api.get(`${endpoint}?currency=USD&tokenSymbol=BTC`);	
			expect(response.data).toBeInstanceOf(Object);
			expect(response.data).not.toBeNull();
			expect(parseInt(response.data.convertedPrice)).toBeGreaterThan(1);
			expect(response.data.convertedTarget).toBe("USD");
			
		});
	})	
});




