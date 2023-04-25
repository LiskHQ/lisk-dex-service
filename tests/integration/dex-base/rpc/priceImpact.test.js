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
const getPriceImpact = async params => request(wsRpcUrl, 'get.prices.impact', params);

describe('Method get.prices.impact', () => {
    describe('is able toReturn the impact price on a swap trade on the market price of the pool.', () => {
        it('returns impact price', async () => {
            try {
                const moduleEndpointContext = {
                    params:{
                        tokenIdIn: Buffer.from('0000000000000000', 'hex'),
                        amountIn:50,
                        tokenIdOut:Buffer.from('0000010000000000', 'hex'),
                        minAmountOut:10,
                        swapRoute:[Buffer.from('0000000000000000000001000000000000c8', 'hex')],
                    }
                }                
                const response = await getPriceImpact(moduleEndpointContext);
                const { result } = response;
                expect(result.priceImpact).not.toBe('0.0000');
            } catch (err) {
                //TODO: Modify the error throwing logic
                throw err;
            }
        });
    });
});