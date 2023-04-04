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
const pricesConvertFiatSource = require('../../../sources/dex-version1/pricesConvertFiatSource');
const { transformParams, response, getSwaggerDescription } = require('../../../shared/utils');
const regex = require('../../../shared/regex');

module.exports = {
	version: '2.0',
	swaggerApiPath: '/prices/convert/fiat',
	rpcMethod: 'get.prices.convert.fiat',
	tags: ['pricesConvertFiat'],
	params: {
		currency: { optional: false, type: 'string', min: 1, max: 64, pattern: regex.CURRENCY },
		tokenID: { optional: false, type: 'string', min: 0, pattern: regex.TOKEN_ID },
	},
	get schema() {
		const pricesConvertFiatSchema = {};
		pricesConvertFiatSchema[this.swaggerApiPath] = { get: {} };
		pricesConvertFiatSchema[this.swaggerApiPath].get.tags = this.tags;
		pricesConvertFiatSchema[this.swaggerApiPath].get.summary = 'Convert token price to the equivalent amount of fiat.';
		pricesConvertFiatSchema[this.swaggerApiPath].get.description = getSwaggerDescription({
			rpcMethod: this.rpcMethod,
			description: 'Convert token price to the equivalent amount of fiat.',
		});
		pricesConvertFiatSchema[this.swaggerApiPath].get.parameters = transformParams('prices', this.params);
		pricesConvertFiatSchema[this.swaggerApiPath].get.responses = {
			200: {
				description: 'Convert token price to the equivalent amount of fiat.',
				schema: {
					$ref: '#/definitions/PricesConvertFiatWithoutEnvelope',
				},
			},
		};
		Object.assign(pricesConvertFiatSchema[this.swaggerApiPath].get.responses, response);
		return pricesConvertFiatSchema;
	},
	source: pricesConvertFiatSource,
};