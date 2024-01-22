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
const tokensAvailableSource = require('../../../sources/dex-version1/supportedTokensSource');
const { transformParams, response, getSwaggerDescription } = require('../../../shared/utils');
const regex = require('../../../shared/regex');
const envelope = require('./dataDefinitions/stdEnvelope')

module.exports = {
	version: '2.0',
	swaggerApiPath: '/tokens/supported',
	rpcMethod: 'get.tokens.supported',
	tags: ['Tokens'],
	params: {
		limit: { optional: true, type: 'string', min: 1, max: 100, pattern: regex.NONCE },
		offset: { optional: true, type: 'string', min: 0, pattern: regex.NONCE },
	},
	get schema() {
		const availableTokensSchema = {};
		availableTokensSchema[this.swaggerApiPath] = { get: {} };
		availableTokensSchema[this.swaggerApiPath].get.tags = this.tags;
		availableTokensSchema[this.swaggerApiPath].get.summary = 'Returns a list of supported tokens.';
		availableTokensSchema[this.swaggerApiPath].get.description = getSwaggerDescription({
			rpcMethod: this.rpcMethod,
			description: 'Returns a list of supported tokens.',
		});
		availableTokensSchema[this.swaggerApiPath].get.parameters = transformParams('prices', this.params);
		availableTokensSchema[this.swaggerApiPath].get.responses = {
			200: {
				description: 'Returns a list of supported tokens.',
				schema: {
					$ref: '#/definitions/TokensAvailableWithEnvelope',
				},
			},
		};
		Object.assign(availableTokensSchema[this.swaggerApiPath].get.responses, response);
		return availableTokensSchema;
	},
	source: tokensAvailableSource,
	envelope
};