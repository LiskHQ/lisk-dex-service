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

const gettingCurrentsqrtpriceSource = require('../../../sources/dex-version1/gettingCurrentsqrtpriceSource');
const { transformParams, response, getSwaggerDescription } = require('../../../shared/utils');
const envelope = require('../methods/dataDefinitions/stdEnvelope')

module.exports = {
	version: '2.0',
	swaggerApiPath: '/tokens/currentsqrtprice',
	rpcMethod: 'get.prices.currentsqrtprice',
	tags: ['Prices'],
	params: {
		poolID: { optional: false, type: 'string' },
		priceDirection: { optional: false, type: 'boolean'},
	},
	get schema() {
		const gettingCurrentsqrtpriceSchema = {};
		gettingCurrentsqrtpriceSchema[this.swaggerApiPath] = { get: {} };
		gettingCurrentsqrtpriceSchema[this.swaggerApiPath].get.tags = this.tags;
		gettingCurrentsqrtpriceSchema[this.swaggerApiPath].get.summary = 'Retrives the current sqrt price of a given pool.';
		gettingCurrentsqrtpriceSchema[this.swaggerApiPath].get.description = getSwaggerDescription({
			rpcMethod: this.rpcMethod,
			description: 'Retrives the current sqrt price of a given pool.',
		});
		gettingCurrentsqrtpriceSchema[this.swaggerApiPath].get.parameters = transformParams('tokens', this.params);
		gettingCurrentsqrtpriceSchema[this.swaggerApiPath].get.responses = {
			200: {
				description: 'Retrives the current sqrt price of a given pool.',
				schema: {
					$ref: '#/definitions/gettingCurrentsqrtpriceWithEnvelope',
				},
			},
		};
		Object.assign(gettingCurrentsqrtpriceSchema[this.swaggerApiPath].get.responses, response);
		return gettingCurrentsqrtpriceSchema;
	},
	source: gettingCurrentsqrtpriceSource,
	envelope,
};