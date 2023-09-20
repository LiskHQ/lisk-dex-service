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

const dataService = require('../../shared/dataService');
const topPoolsMetadataIndexSchema = require('../../database/schema/dex_info_top_pools');


const getTopPoolsMetadataIndex = () => getTableInstance(
	topPoolsMetadataIndexSchema.tableName,
	topPoolsMetadataIndexSchema,
	MYSQL_ENDPOINT,
);

const getTopPoolsFromDatabase = async params => {
	const { dataDir } = config;
	const repo = config.gitHub.appRegistryRepoName;
	const topPoolsTokenMetadataTable = await getTopPoolsMetadataIndex();

	const topPoolsTokenMetadataData = {
		data: [],
		meta: {},
	};

	// Initialize DB params
	params.whereIn = [];

	const tokensResultSet = await tokenMetadataTable.find(params, ['network', 'chainID', 'chainName']);

	const uniqueChainMap = {};
	tokensResultSet.forEach(item => uniqueChainMap[item.chainID] = item);
	const uniqueChainList = Object.values(uniqueChainMap);

	await BluebirdPromise.map(
		uniqueChainList,
		async (topPoolsMetaData) => {

			const [{ topPoolsData }] = await topPoolsTokenMetadataTable.rawQuery(` SELECT * FROM ${topPoolsMetadataIndexSchema.tableName}`);

			const appPathInClonedRepo = `${dataDir}/${repo}/${topPoolsMetaData.network}/${topPoolsData}`;
			const tokenMetaString = await read(`${appPathInClonedRepo}/${config.FILENAME.NATIVETOKENS_JSON}`);
			const parsedTokenMeta = JSON.parse(tokenMetaString);

			parsedTokenMeta.tokens.forEach(token => {
				topPoolsTokenMetadataData.data.push({
					...token,
					chainID: topPoolsMetaData.chainID,
					chainName: topPoolsMetaData.chainName,
					network: topPoolsMetaData.network,
				});
			});
		},
		{ concurrency: uniqueChainList.length },
	);

	// TODO: Use count method directly once support for custom column-based count added https://github.com/LiskHQ/lisk-service/issues/1188
	const [{ total }] = await tokenMetadataTable.rawQuery(`SELECT COUNT(tokenName) as total from ${tokenMetadataIndexSchema.tableName}`);

	topPoolsTokenMetadataData.meta = {
		count: topPoolsTokenMetadataData.data.length,
		offset: params.offset,
		total,
	};

	if (topPoolsTokenMetadataData.data.length == 0){
		topPoolsTokenMetadataData=[{
			poolName:"DEX-BTC",
			poolTVL:"118413665423",
			poolVolume24H:"1252065",
			poolFees24H:"12.5696",
			poolAPY:"18740.1502"
		},
		{
			poolName:"DEX-LSK",
			poolTVL:"3648158215",
			poolVolume24H:"2489",
			poolFees24H:"709.02",
			poolAPY:"6186.1485"
		},
		{
			poolName:"ETH-BTC",
			poolTVL:"784901566",
			poolVolume24H:"296.0149",
			poolFees24H:"8.4561",
			poolAPY:"7891.4196"
		},
		{
			poolName:"BTC-LSK",
			poolTVL:"118413665423",
			poolVolume24H:"1252065",
			poolFees24H:"894.5661",
			poolAPY:"1874.6549"
		},
		{
			poolName:"LSK-DEU",
			poolTVL:"4891698498",
			poolVolume24H:"5494",
			poolFees24H:"2.7814",
			poolAPY:"6.65"
		},
		{
			poolName:"BRZ-LSK",
			poolTVL:"97846986",
			poolVolume24H:"9756",
			poolFees24H:"9.5619",
			poolAPY:"9.8480"
		}
	]
	}

	return topPoolsTokenMetadataData;
};


module.exports = {
	getTopPoolsFromDatabase,
};