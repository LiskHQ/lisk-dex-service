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
const priceImpactSource = require('../../../sources/dex-version1/priceImpactSource');
const { transformParams, response, getSwaggerDescription } = require('../../../shared/utils');
const regex = require('../../../shared/regex');

module.exports = {
	version: '2.0',
	swaggerApiPath: '/prices/impact',
	rpcMethod: 'get.prices.impact',
	tags: ['Prices'],
	params: {
		tokenIdIn: { optional: false, type: 'string', min: 16, max: 16, pattern: regex.TOKEN_ID },
		amountIn: { optional: false, type: 'string', min: 1, max: 64, pattern: regex.AMOUNT_IN },
		tokenIdOut: { optional: false, type: 'string', min: 16, max: 16, pattern: regex.TOKEN_ID },
		amountOut: { optional: false, type: 'string', min: 1, max: 64, pattern: regex.AMOUNT_OUT },
		swapRoute: { optional: false, type: 'array' },
		isZeroToOne: { optional: false, type: 'boolean' },
	},
	get schema() {
		const pricesImpactSchema = {};
		pricesImpactSchema[this.swaggerApiPath] = { get: {} };
		pricesImpactSchema[this.swaggerApiPath].get.tags = this.tags;
		pricesImpactSchema[this.swaggerApiPath].get.summary =
			'Returns the price impact on a swap trade on the market price of the pool.';
		pricesImpactSchema[this.swaggerApiPath].get.description = getSwaggerDescription({
			rpcMethod: this.rpcMethod,
			description: 'Returns the price impact on a swap trade on the market price of the pool.',
		});
		pricesImpactSchema[this.swaggerApiPath].get.parameters = transformParams('prices', this.params);
		pricesImpactSchema[this.swaggerApiPath].get.responses = {
			200: {
				description: 'Returns the price impact on a swap trade on the market price of the pool.',
				schema: {
					$ref: '#/definitions/PricesImpactWithoutEnvelope',
				},
			},
		};
		Object.assign(pricesImpactSchema[this.swaggerApiPath].get.responses, response);
		return pricesImpactSchema;
	},
	source: priceImpactSource,
};
