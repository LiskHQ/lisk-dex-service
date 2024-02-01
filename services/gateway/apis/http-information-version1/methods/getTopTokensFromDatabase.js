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

const getTopTokensFromDatabase = require('../../../sources/information-version1/getTopTokensFromDatabase');
const { transformParams, response, getSwaggerDescription } = require('../../../shared/utils');
const envelope = require('../../../sources/information-version1/mappings/stdEnvelope');
const regex = require('../../../shared/regex');

module.exports = {
	version: '2.0',
	swaggerApiPath: '/getTopTokensFromDatabase',
	rpcMethod: 'get.getTopTokensFromDatabase',
	tags: ['GetTopTokensFromDatabase'],
	params: {
		limit: { optional: true, type: 'number', min: 1, max: 100, pattern: regex.LIMIT },
	},
	get schema() {
		const getTopTokensFromDatabaseSchema = {};
		getTopTokensFromDatabaseSchema[this.swaggerApiPath] = { get: {} };
		getTopTokensFromDatabaseSchema[this.swaggerApiPath].get.tags = this.tags;
		getTopTokensFromDatabaseSchema[this.swaggerApiPath].get.summary =
			'Returns a list of top tokens from the database.';
		getTopTokensFromDatabaseSchema[this.swaggerApiPath].get.description = getSwaggerDescription({
			rpcMethod: this.rpcMethod,
			description: 'Returns a list of top tokens from the database.',
		});
		getTopTokensFromDatabaseSchema[this.swaggerApiPath].get.parameters = transformParams(
			'getTopTokensFromDatabase',
			this.params,
		);
		getTopTokensFromDatabaseSchema[this.swaggerApiPath].get.responses = {
			200: {
				description: 'Returns a list of top tokens from the database.',
				schema: {
					$ref: '#/definitions/getTopTokensFromDatabase',
				},
			},
		};
		Object.assign(getTopTokensFromDatabaseSchema[this.swaggerApiPath].get.responses, response);
		return getTopTokensFromDatabaseSchema;
	},
	source: getTopTokensFromDatabase,
	envelope,
};
