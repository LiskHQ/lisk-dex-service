/*
 * LiskHQ/lisk-service
 * Copyright © 2022 Lisk Foundation
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
const blockchainAppsTokenMetadataSupportedSchemaSource = require('../../../sources/dex-version1/blockchainAppsTokenMetadataSchema');
const envelope = require('../../../sources/version3/mappings/stdEnvelope');
const regex = require('../../../shared/regex');
const { transformParams, response, getSwaggerDescription } = require('../../../shared/utils');

module.exports = {
	version: '2.0',
	swaggerApiPath: '/blockchain/apps/meta/tokens/supported',
	rpcMethod: 'get.blockchain.apps.meta.tokens.supported',
	tags: ['Interoperability'],
	params: {
		chainID: { optional: true, type: 'string', pattern: regex.CHAIN_ID },
		limit: { optional: true, type: 'number', min: 1, max: 100, default: 10 },
		offset: { optional: true, type: 'number', min: 0, default: 0 },
		sort: {
			optional: true,
			type: 'string',
			enum: ['chainName:asc', 'chainName:desc'],
			default: 'chainName:asc',
		},
	},
	get schema() {
		const blockchainAppsTokenMetadataSupportedSchema = {};
		blockchainAppsTokenMetadataSupportedSchema[this.swaggerApiPath] = { get: {} };
		blockchainAppsTokenMetadataSupportedSchema[this.swaggerApiPath].get.tags = this.tags;
		blockchainAppsTokenMetadataSupportedSchema[this.swaggerApiPath].get.summary = 'Returns blockchain applications off-chain metadata for tokens supported on the specified chainID.';
		blockchainAppsTokenMetadataSupportedSchema[this.swaggerApiPath].get.description = getSwaggerDescription({
			rpcMethod: this.rpcMethod,
			description: 'Returns blockchain applications off-chain metadata for tokens supported on the specified chainID.',
		});
		blockchainAppsTokenMetadataSupportedSchema[this.swaggerApiPath].get.parameters = transformParams('blockchainAppsTokensMetaSupported', this.params);
		blockchainAppsTokenMetadataSupportedSchema[this.swaggerApiPath].get.responses = {
			200: {
				description: 'Returns blockchain applications off-chain metadata for tokens supported on the specified chainID.',
				schema: {
					$ref: '#/definitions/BlockchainAppsTokenMetadataSupportedWithEnvelope',
				},
			},
		};
		Object.assign(blockchainAppsTokenMetadataSupportedSchema[this.swaggerApiPath].get.responses, response);
		return blockchainAppsTokenMetadataSupportedSchema;
	},
	source: blockchainAppsTokenMetadataSupportedSchemaSource,
	envelope,
};
