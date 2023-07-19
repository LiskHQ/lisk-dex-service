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

const gettingSlippageBoundsSource = require('../../../sources/dex-version1/gettingSlippageBoundsSource');
const { transformParams, response, getSwaggerDescription } = require('../../../shared/utils');
const envelope = require('../methods/dataDefinitions/stdEnvelope')
const regex = require('../../../shared/regex');

module.exports = {
	version: '2.0',
	swaggerApiPath: '/prices/gettingSlippageBounds',
	rpcMethod: 'get.prices.gettingSlippageBounds',
	tags: ['Prices'],
	params: {
		tokenIdIn: { optional: false, type: 'string', min: 16, max: 16, pattern: regex.TOKEN_ID },
		amountIn: { optional: false, type: 'number', min: 1, max: 64, pattern: regex.AMOUNT_IN },
        tokenIdOut: { optional: false, type: 'string', min: 16, max: 16, pattern: regex.TOKEN_ID },
        minAmountOut: { optional: false, type: 'number', min: 1, max: 64, pattern: regex.AMOUNT_OUT },
        swapRoute: { optional: false, type: 'array' },         
	},
	get schema() {
		const gettingSlippageBoundsSchema = {};
		gettingSlippageBoundsSchema[this.swaggerApiPath] = { get: {} };
		gettingSlippageBoundsSchema[this.swaggerApiPath].get.tags = this.tags;
		gettingSlippageBoundsSchema[this.swaggerApiPath].get.summary = 'Retrives the slippage Bounds for a given swap.';
		gettingSlippageBoundsSchema[this.swaggerApiPath].get.description = getSwaggerDescription({
			rpcMethod: this.rpcMethod,
			description: 'Retrives the slippage Bounds for a given swap.',
		});
		gettingSlippageBoundsSchema[this.swaggerApiPath].get.parameters = transformParams('prices', this.params);
		gettingSlippageBoundsSchema[this.swaggerApiPath].get.responses = {
			200: {
				description: 'Retrives the slippage Bounds for a given swap.',
				schema: {
					$ref: '#/definitions/gettingSlippageBoundsWithEnvelope',
				},
			},
		};
		Object.assign(gettingSlippageBoundsSchema[this.swaggerApiPath].get.responses, response);
		return gettingSlippageBoundsSchema;
	},
	source: gettingSlippageBoundsSource,
	envelope,
};