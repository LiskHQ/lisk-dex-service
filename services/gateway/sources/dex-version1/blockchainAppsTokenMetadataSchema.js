/*
 * LiskHQ/lisk-service
<<<<<<< HEAD:services/dex-base/shared/utils/request.js
 * Copyright © 2023 Lisk Foundation
=======
 * Copyright © 2022 Lisk Foundation
>>>>>>> origin/development:services/gateway/sources/dex-version1/blockchainAppsTokenMetadataSchema.js
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
const blockchainAppTokenMetadata = require('./mappings/blockchainAppTokenMetadata');

<<<<<<< HEAD:services/dex-base/shared/utils/request.js

let app;

const setAppContext = (h) => app = h;

const getAppContext = () => app;

const requestRpc = async (service, method, params = {}) => {
	const data = await getAppContext().requestRpc(`${service}.${method}`, params);
	return data;
=======
module.exports = {
	type: 'moleculer',
	method: 'dex.blockchain.apps.meta.tokens.supported',
	params: {
		chainID: '=,string',
		offset: '=,number',
		limit: '=,number',
		sort: '=,string',
	},
	definition: {
		data: ['data', blockchainAppTokenMetadata],
		meta: {
			count: '=,number',
			offset: '=,number',
			total: '=,number',
		},
		links: {},
	},
>>>>>>> origin/development:services/gateway/sources/dex-version1/blockchainAppsTokenMetadataSchema.js
};

const requestConnector = async (method, params) => requestRpc('connector', method, params);

module.exports = {
	setAppContext,
	requestConnector,
	requestRpc,
	getAppContext
}
