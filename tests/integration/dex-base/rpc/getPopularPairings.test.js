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
const getPriceImpact = async params => request(wsRpcUrl, 'get.dex.tokens.popularPairings', params);
const { popularPairingsMetaResponseSchema,goodResponseSchema,popularPairingsResponseSchema } = require('../../../schemas/dex-base/gettingSlippageBoundsSchema')


describe('Method get.tokens.popularPairings', () => {
    describe('is able toReturn the impact price on a swap trade on the market price of the pool.', () => {
        it('returns impact price', async () => {
            try {
                const moduleEndpointContext = {
                    params:{
                        senderAddress: Buffer.from('0000000000000000', 'hex'),
                        
                    }
                }    
                const response = await getPriceImpact(moduleEndpointContext);
                const { result } = response;
                expect(result).toMap(goodResponseSchema);
				expect(result.data).toBeInstanceOf(Object);
				expect(result.data).toMap(popularPairingsResponseSchema);
				expect(result.meta).toMap(popularPairingsMetaResponseSchema);
            } catch (err) {
                //TODO: Modify the error throwing logic
                throw err;
            }
        });
    });
});