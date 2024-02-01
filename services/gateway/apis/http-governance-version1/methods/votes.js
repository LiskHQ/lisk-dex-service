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

const votesSource = require('../../../sources/governance-version1/votesSource');
const { transformParams, response, getSwaggerDescription } = require('../../../shared/utils');
const envelope = require('../../../sources/governance-version1/mappings/stdEnvelope');

module.exports = {
	version: '2.0',
	swaggerApiPath: '/votes',
	rpcMethod: 'get.votes',
	tags: ['Votes'],
	params: {
		voterAddress: { optional: true, type: 'string' },
	},
	get schema() {
		const votesSchema = {};
		votesSchema[this.swaggerApiPath] = { get: {} };
		votesSchema[this.swaggerApiPath].get.tags = this.tags;
		votesSchema[this.swaggerApiPath].get.summary = 'Returns details about the votes for a given account.';
		votesSchema[this.swaggerApiPath].get.description = getSwaggerDescription({
			rpcMethod: this.rpcMethod,
			description: 'Returns details about the votes for a given account.',
		});
		votesSchema[this.swaggerApiPath].get.parameters = transformParams('votes', this.params);
		votesSchema[this.swaggerApiPath].get.responses = {
			200: {
				description: 'Returns details about the votes for a given account.',
				schema: {
					$ref: '#/definitions/VotessWithoutEnvelope',
				},
			},
		};
		Object.assign(votesSchema[this.swaggerApiPath].get.responses, response);
		return votesSchema;
	},
	source: votesSource,
	envelope,
};