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
const eventsSource = require('../../../sources/dex-version1/eventsSource');
const { transformParams, response, getSwaggerDescription } = require('../../../shared/utils');
const envelope = require('./dataDefinitions/stdEnvelope');

module.exports = {
	version: '2.0',
	swaggerApiPath: '/getEventsByHeight',
	rpcMethod: 'getEventsByHeight',
	tags: ['Events'],
	params: {
		height: { optional: false, type: 'number' },
	},
	get schema() {
		const eventsSchema = {};
		eventsSchema[this.swaggerApiPath] = { get: {} };
		eventsSchema[this.swaggerApiPath].get.tags = this.tags;
		eventsSchema[this.swaggerApiPath].get.summary = 'Retrieves list of events.';
		eventsSchema[this.swaggerApiPath].get.description = getSwaggerDescription({
			rpcMethod: this.rpcMethod,
			description: 'Returns a list of events.',
		});
		eventsSchema[this.swaggerApiPath].get.parameters = transformParams('prices', this.params);
		eventsSchema[this.swaggerApiPath].get.responses = {
			200: {
				description: 'Returns a list of events.',
				schema: {
					$ref: '#/definitions/EventsWithEnvelope',
				},
			},
		};
		Object.assign(eventsSchema[this.swaggerApiPath].get.responses, response);
		return eventsSchema;
	},
	source: eventsSource,
	envelope,
};
