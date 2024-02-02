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
const proposalsSource = require('../../../sources/governance-version1/proposalsSource');
const { transformParams, response, getSwaggerDescription } = require('../../../shared/utils');

module.exports = {
	version: '2.0',
	swaggerApiPath: '/proposals',
	rpcMethod: 'get.proposals',
	tags: ['Proposals'],
	params: {
		proposal: { optional: false, type: 'number' },
	},
	get schema() {
		const proposalsSchema = {};
		proposalsSchema[this.swaggerApiPath] = { get: {} };
		proposalsSchema[this.swaggerApiPath].get.tags = this.tags;
		proposalsSchema[this.swaggerApiPath].get.summary =
			'Returns all proposals, or a specific proposal if it was specified.';
		proposalsSchema[this.swaggerApiPath].get.description = getSwaggerDescription({
			rpcMethod: this.rpcMethod,
			description: 'Returns all proposals, or a specific proposal if it was specified.',
		});
		proposalsSchema[this.swaggerApiPath].get.parameters = transformParams('proposals', this.params);
		proposalsSchema[this.swaggerApiPath].get.responses = {
			200: {
				description: 'Returns all proposals, or a specific proposal if it was specified.',
				schema: {
					$ref: '#/definitions/ProposalsWithoutEnvelope',
				},
			},
		};
		Object.assign(proposalsSchema[this.swaggerApiPath].get.responses, response);
		return proposalsSchema;
	},
	source: proposalsSource,
};
