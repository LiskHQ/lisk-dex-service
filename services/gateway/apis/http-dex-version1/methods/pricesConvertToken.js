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
const pricesConvertTokenSource = require('../../../sources/dex-version1/pricesConvertTokenSource');
const { transformParams, response, getSwaggerDescription } = require('../../../shared/utils');
const regex = require('../../../shared/regex');

module.exports = {
	version: '2.0',
	swaggerApiPath: '/prices/convert/token',
	rpcMethod: 'get.prices.convert.token',
	tags: ['pricesConvertToken'],
	params: {
		tokenID0: { optional: false, type: 'string', pattern: regex.TOKEN_ID },
		conversionTokenID: { optional: false, type: 'string', pattern: regex.TOKEN_ID },
	},
	get schema() {
		const pricesConvertTokenSchema = {};
		pricesConvertTokenSchema[this.swaggerApiPath] = { get: {} };
		pricesConvertTokenSchema[this.swaggerApiPath].get.tags = this.tags;
		pricesConvertTokenSchema[this.swaggerApiPath].get.summary = 'Convert token price to the equivalent amount of another token price.';
		pricesConvertTokenSchema[this.swaggerApiPath].get.description = getSwaggerDescription({
			rpcMethod: this.rpcMethod,
			description: 'Convert token price to the equivalent amount of another token price.',
		});
		pricesConvertTokenSchema[this.swaggerApiPath].get.parameters = transformParams('prices', this.params);
		pricesConvertTokenSchema[this.swaggerApiPath].get.responses = {
			200: {
				description: 'Convert token price to the equivalent amount of another token price.',
				schema: {
					$ref: '#/definitions/PricesConvertTokenWithoutEnvelope',
				},
			},
		};
		Object.assign(pricesConvertTokenSchema[this.swaggerApiPath].get.responses, response);
		return pricesConvertTokenSchema;
	},
	source: pricesConvertTokenSource,
};
