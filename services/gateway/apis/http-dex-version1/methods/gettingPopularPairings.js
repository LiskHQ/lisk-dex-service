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
const gettingPopularPairingsSource = require('../../../sources/dex-version1/gettingPopularPairingsSource');
const { transformParams, response, getSwaggerDescription } = require('../../../shared/utils');

module.exports = {
	version: '2.0',
	swaggerApiPath: '/tokens/popularPairings',
	rpcMethod: 'get.tokens.popularPairings',
	tags: ['Tokens'],
	params: {

	},
	get schema() {
		const gettingPopularPairingsSchema = {};
		gettingPopularPairingsSchema[this.swaggerApiPath] = { get: {} };
		gettingPopularPairingsSchema[this.swaggerApiPath].get.tags = this.tags;
		gettingPopularPairingsSchema[this.swaggerApiPath].get.summary = 'Retrives a list of top 6 frequently used token pairs for swap.';
		gettingPopularPairingsSchema[this.swaggerApiPath].get.description = getSwaggerDescription({
			rpcMethod: this.rpcMethod,
			description: 'Retrives a list of top 6 frequently used token pairs for swap.',
		});
		gettingPopularPairingsSchema[this.swaggerApiPath].get.parameters = transformParams('tokens', this.params);
		gettingPopularPairingsSchema[this.swaggerApiPath].get.responses = {
			200: {
				description: 'Retrives a list of top 6 frequently used token pairs for swap.',
				schema: {
					$ref: '#/definitions/GettingPopularPairingsWithoutEnvelope',
				},
			},
		};
		Object.assign(gettingPopularPairingsSchema[this.swaggerApiPath].get.responses, response);
		return gettingPopularPairingsSchema;
	},
	source: gettingPopularPairingsSource,
};