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
const getPopularPairingsSource = require('../../../sources/dex-version1/getPopularPairingsSource');
const { transformParams, response, getSwaggerDescription } = require('../../../shared/utils');

module.exports = {
	version: '2.0',
	swaggerApiPath: '/tokens/popularPairings',
	rpcMethod: 'get.tokens.popularPairings',
	tags: ['Tokens'],
	params: {
		senderAddress: { optional: false, type: 'string' },
	},
	get schema() {
		const getPopularPairingsSchema = {};
		getPopularPairingsSchema[this.swaggerApiPath] = { get: {} };
		getPopularPairingsSchema[this.swaggerApiPath].get.tags = this.tags;
		getPopularPairingsSchema[this.swaggerApiPath].get.summary =
			'Returns a list of the top 6 frequently swapped token pairs.';
		getPopularPairingsSchema[this.swaggerApiPath].get.description = getSwaggerDescription({
			rpcMethod: this.rpcMethod,
			description: 'Returns a list of the top 6 frequently swapped token pairs.',
		});
		getPopularPairingsSchema[this.swaggerApiPath].get.parameters = transformParams(
			'tokens',
			this.params,
		);
		getPopularPairingsSchema[this.swaggerApiPath].get.responses = {
			200: {
				description: 'Returns a list of the top 6 frequently swapped token pairs.',
				schema: {
					$ref: '#/definitions/getPopularPairingsWithoutEnvelope',
				},
			},
		};
		Object.assign(getPopularPairingsSchema[this.swaggerApiPath].get.responses, response);
		return getPopularPairingsSchema;
	},
	source: getPopularPairingsSource,
};
