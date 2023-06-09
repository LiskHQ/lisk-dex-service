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
const gettingStatisticsSource = require('../../../sources/dex-version1/gettingStatisticsSource');
const { transformParams, response, getSwaggerDescription } = require('../../../shared/utils');
const regex = require('./../../../shared/regex');
const envelope = require('./dataDefinitions/stdEnvelope')

module.exports = {
	version: '2.0',
	swaggerApiPath: '/dex/gettingStatistics',
	rpcMethod: 'get.dex.gettingStatistics',
	tags: ['Statistics'],
    params: {
        interval: { optional: false, type: 'string', pattern: regex.DEX_INTERVAL },
        limit: { optional: false, type: 'number', pattern: regex.NONCE },
        offset: { optional: false, type: 'number', pattern: regex.NONCE },
		
    },
	get schema() {
		const gettingStatisticsSchema = {};
		gettingStatisticsSchema[this.swaggerApiPath] = { get: {} };
		gettingStatisticsSchema[this.swaggerApiPath].get.tags = this.tags;
		gettingStatisticsSchema[this.swaggerApiPath].get.summary = 'Retrieves statistics for transactions.';
		gettingStatisticsSchema[this.swaggerApiPath].get.description = getSwaggerDescription({
			rpcMethod: this.rpcMethod,
			description: 'Retrieves statistics for transactions.',
		});
		gettingStatisticsSchema[this.swaggerApiPath].get.parameters = transformParams('prices', this.params);
		gettingStatisticsSchema[this.swaggerApiPath].get.responses = {
			200: {
				description: 'Retrieves statistics for transactions.',
				schema: {
					$ref: '#/definitions/GettingStatisticsWithoutEnvelope',
				},
			},
		};
		Object.assign(gettingStatisticsSchema[this.swaggerApiPath].get.responses, response);
		return gettingStatisticsSchema;
	},
	source: gettingStatisticsSource,
	envelope,
};