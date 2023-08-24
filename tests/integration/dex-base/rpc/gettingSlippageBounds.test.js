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
const { request } = require('../../../helpers/socketIoRpcRequest');


const wsRpcUrl = `${config.SERVICE_ENDPOINT}/rpc-dex-v1`;
const gettingSlippageBounds = async params => request(wsRpcUrl, 'get.dex.prices.gettingSlippageBounds', params);
const { gettingSlippageBoundsMetaResponseSchema,goodResponseSchema,gettingSlippageBoundsResponseSchema } = require('../../../schemas/dex-base/gettingSlippageBoundsSchema')


describe('Method get.dex.prices.gettingSlippageBounds', () => {
    describe('is able to slippage bounds.', () => {
        it('returns slippage bounds', async () => {
            try {
                const moduleEndpointContext = {
                    params:{
                        tokenIdIn: Buffer.from('0000000000000000', 'hex'),
                        maxAmountIn: "",
                        tokenIdOut: Buffer.from('0000000000000000', 'hex'),
                        amountOut: "",
                        swapRoute: ["",""],                       
                    }
                }    
                const response = await gettingSlippageBounds(moduleEndpointContext);
                const { result } = response;
                expect(result).toMap(goodResponseSchema);
				expect(result.data).toBeInstanceOf(Object);
				expect(result.data).toMap(gettingSlippageBoundsResponseSchema);
				expect(result.meta).toMap(gettingSlippageBoundsMetaResponseSchema);
            } catch (err) {
                //TODO: Modify the error throwing logic
                throw err;
            }
        });
    });
});