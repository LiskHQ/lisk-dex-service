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

const votesSource = require('../../../sources/information-version1/votesSource');
const { transformParams, response, getSwaggerDescription } = require('../../../shared/utils');
const envelope = require('../../../sources/information-version1/mappings/stdEnvelope');
const regex = require('../../../shared/regex');

module.exports = {
	version: '2.0',
	swaggerApiPath: '/getTransactionsByTokenID',
	rpcMethod: 'get.getTransactionsByTokenID',
	tags: ['TransactionsByTokenID'],
	params: {
		poolID: { optional: false, type: 'string', min: 16, max: 40, pattern: regex.POOL_ID },
		tokenID: { optional: false, type: 'string', min: 16, max: 40, pattern: regex.TOKEN_ID },
		command: { optional: false, type: 'string' },
		account: { optional: false, type: 'string' },
		limit: { optional: false, type: 'number', min: 1, max: 100, pattern: regex.LIMIT },
		offset: { optional: false, type: 'string' },
	},
	get schema() {
		const votesSchema = {};
		votesSchema[this.swaggerApiPath] = { get: {} };
		votesSchema[this.swaggerApiPath].get.tags = this.tags;
		votesSchema[this.swaggerApiPath].get.summary = 'Returns a list of transactions by tokenID.';
		votesSchema[this.swaggerApiPath].get.description = getSwaggerDescription({
			rpcMethod: this.rpcMethod,
			description: 'Returns a list of transactions by tokenID.',
		});
		votesSchema[this.swaggerApiPath].get.parameters = transformParams('votes', this.params);
		votesSchema[this.swaggerApiPath].get.responses = {
			200: {
				description: 'Returns a list of transactions by tokenID.',
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
