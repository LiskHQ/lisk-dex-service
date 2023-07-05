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
const BluebirdPromise = require('bluebird');

const {
	MySQL: { getTableInstance },
} = require('lisk-service-framework');

const { read } = require('./utils/fsUtils');

const config = require('../config');
const applicationMetadataIndexSchema = require('./database/schema/application_metadata');
const tokenMetadataIndexSchema = require('./database/schema/token_metadata');

const MYSQL_ENDPOINT = config.endpoints.mysql;

const getApplicationMetadataIndex = () => getTableInstance(
	applicationMetadataIndexSchema.tableName,
	applicationMetadataIndexSchema,
	MYSQL_ENDPOINT,
);

const getTokenMetadataIndex = () => getTableInstance(
	tokenMetadataIndexSchema.tableName,
	tokenMetadataIndexSchema,
	MYSQL_ENDPOINT,
);

const getBlockchainAppsTokenMetadataSupported = async (params) => {
	const { dataDir } = config;
	const repo = config.gitHub.appRegistryRepoName;
	const applicationMetadataTable = await getApplicationMetadataIndex();
	const tokenMetadataTable = await getTokenMetadataIndex();

	const blockchainAppsTokenMetadataSupported = {
		data: [],
		meta: {},
	};

	// Initialize DB params
	params.whereIn = [];

	// Resolve network from chainID if present
	if (params.chainID) {
		params.network = config.CHAIN_ID_PREFIX_NETWORK_MAP[params.chainID.substring(0, 2)];
	}

    const tokensResultSet = await tokenMetadataTable.find(params, ['chainID']);

	const uniqueChainMap = {};
	tokensResultSet.forEach(item => uniqueChainMap[item.chainID] = item);
	const uniqueChainList = Object.values(uniqueChainMap);

	await BluebirdPromise.map(
		uniqueChainList,
		async (tokenMeta) => {
			const [{ appDirName }] = await applicationMetadataTable.find(
				{ network: tokenMeta.network, chainID: tokenMeta.chainID },
				['appDirName'],
			);
			const appPathInClonedRepo = `${dataDir}/${repo}/${tokenMeta.network}/${appDirName}`;
			const tokenMetaString = await read(`${appPathInClonedRepo}/${config.FILENAME.NATIVETOKENS_JSON}`);
			const parsedTokenMeta = JSON.parse(tokenMetaString);

			parsedTokenMeta.tokens.forEach(token => {
				blockchainAppsTokenMetadataSupported.data.push({
					...token,
					chainID: tokenMeta.chainID,
					chainName: tokenMeta.chainName,
					network: tokenMeta.network,
				});
			});
		},
		{ concurrency: uniqueChainList.length },
	);

	// TODO: Use count method directly once support for custom column-based count added https://github.com/LiskHQ/lisk-service/issues/1188
	const [{ total }] = await tokenMetadataTable.rawQuery(`SELECT COUNT(tokenName) as total from ${tokenMetadataIndexSchema.tableName}`);

	blockchainAppsTokenMetadataSupported.meta = {
		count: blockchainAppsTokenMetadataSupported.data.length,
		offset: params.offset,
		total,
	};

	return blockchainAppsTokenMetadataSupported;
};

module.exports = {
	getBlockchainAppsTokenMetadataSupported,
};
