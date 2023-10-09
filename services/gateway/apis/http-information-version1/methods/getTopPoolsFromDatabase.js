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

const getTopPoolsFromDatabase = require('../../../sources/information-version1/getTopPoolsFromDatabase');
const { transformParams, response, getSwaggerDescription } = require('../../../shared/utils');
const envelope = require('../../../sources/information-version1/mappings/stdEnvelope');
const regex = require('../../../shared/regex');

module.exports = {
	version: '2.0',
	swaggerApiPath: '/getTopPoolsFromDatabase',
	rpcMethod: 'get.getTopPoolsFromDatabase',
	tags: ['GetTopPoolsFromDatabase'],
	params: {
		limit: { optional: true, type: 'number', min: 1, max: 100, pattern: regex.LIMIT },
	},
	get schema() {
		const getTopPoolsFromDatabaseSchema = {};
		getTopPoolsFromDatabaseSchema[this.swaggerApiPath] = { get: {} };
		getTopPoolsFromDatabaseSchema[this.swaggerApiPath].get.tags = this.tags;
		getTopPoolsFromDatabaseSchema[this.swaggerApiPath].get.summary = 'Returns list of top pools in the information database.';
		getTopPoolsFromDatabaseSchema[this.swaggerApiPath].get.description = getSwaggerDescription({
			rpcMethod: this.rpcMethod,
			description: 'Returns list of top pools in the information database.',
		});
		getTopPoolsFromDatabaseSchema[this.swaggerApiPath].get.parameters = transformParams('getTopPoolsFromDatabase', this.params);
		getTopPoolsFromDatabaseSchema[this.swaggerApiPath].get.responses = {
			200: {
				description: 'Returns list of top pools in the information database.',
				schema: {
					$ref: '#/definitions/getTopPoolsFromDatabase',
				},
			},
		};
		Object.assign(getTopPoolsFromDatabaseSchema[this.swaggerApiPath].get.responses, response);
		return getTopPoolsFromDatabaseSchema;
	},
	source: getTopPoolsFromDatabase,
	envelope,
};