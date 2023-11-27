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
const endpoint = `${baseUrl}/prices/gettingSlippageBounds`;

describe('Method getSlippageBounds', () => {
	let slippageBounds;
	beforeAll(async () => {
		const response = await api.get(`${endpoint}?tokenIdIn=0000000000000000&maxAmountIn=10&tokenIdOut=0000010000000000&amountOut=20&swapRoute[]=000000`);		
		slippageBounds = response.data;
	});

	describe('For Price Convert Fiat Function', () => {
		it('returns errors becuase of params related to getSlippageBounds method', async () => {
			const response = await api.get(`${endpoint}`,400);
			expect(response.error).toBeTrue();
			expect(response.message).toBe("Invalid input: The 'tokenIdIn' field is required.; The 'maxAmountIn' field is required.; The 'tokenIdOut' field is required.; The 'amountOut' field is required.; The 'swapRoute' field is required.");
		});
		it('returns slippage price for a swap operation', async () => {
			const response = await api.get(`${endpoint}?tokenIdIn=0000000000000000&maxAmountIn=10&tokenIdOut=0000010000000000&amountOut=20&swapRoute[]=000000`);	
			expect(response.data).toBeInstanceOf(Object);
			expect(response.data).not.toBeNull();
			expect(response.data.minimum).not.toBeNull();
			expect(response.data.minimum).not.toBeNull();
			
		});
	})	
});
