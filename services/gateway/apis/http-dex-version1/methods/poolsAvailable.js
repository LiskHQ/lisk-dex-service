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
const poolsAvailableSource = require('../../../sources/dex-version1/poolsAvailableSource');
const { transformParams, response, getSwaggerDescription } = require('../../../shared/utils');
const regex = require('../../../shared/regex');

module.exports = {
	version: '2.0',
	swaggerApiPath: '/pools/available',
	rpcMethod: 'get.pools.available',
	tags: ['poolsAvailable'],
	params: {
		limit: { optional: false, type: 'string', min: 1, max: 100, pattern: regex.NONCE },
		offset: { optional: false, type: 'string', min: 0, pattern: regex.NONCE },
	},
	get schema() {
		const poolsAvailableSchema = {};
		poolsAvailableSchema[this.swaggerApiPath] = { get: {} };
		poolsAvailableSchema[this.swaggerApiPath].get.tags = this.tags;
		poolsAvailableSchema[this.swaggerApiPath].get.summary = 'Retrieves liskt of all available pools.';
		poolsAvailableSchema[this.swaggerApiPath].get.description = getSwaggerDescription({
			rpcMethod: this.rpcMethod,
			description: 'Retrieves liskt of all available pools.',
		});
		poolsAvailableSchema[this.swaggerApiPath].get.parameters = transformParams('prices', this.params);
		poolsAvailableSchema[this.swaggerApiPath].get.responses = {
			200: {
				description: 'Retrieves liskt of all available pools.',
				schema: {
					$ref: '#/definitions/PoolsAvailableWithoutEnvelope',
				},
			},
		};
		Object.assign(poolsAvailableSchema[this.swaggerApiPath].get.responses, response);
		return poolsAvailableSchema;
	},
	source: poolsAvailableSource,
};