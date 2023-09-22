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
const topTokensMetadataIndexSchema = require('../../database/schema/dex_info_top_tokens');


const getTopTokensPoolsMetadataIndex = () => getTableInstance(
	topTokensMetadataIndexSchema.tableName,
	topTokensMetadataIndexSchema,
	MYSQL_ENDPOINT,
);

const getTopTokensFromDatabase = async params => {
	const { dataDir } = config;
	const repo = config.gitHub.appRegistryRepoName;
	const topTokensTokenMetadataTable = await getTopTokensPoolsMetadataIndex();

	const topPoolsTokenMetadataData = {
		data: [],
		meta: {},
	};

	// Initialize DB params
	params.whereIn = [];

	const tokensResultSet = await topTokensTokenMetadataTable.findAll();

	const uniqueChainMap = {};
	tokensResultSet.forEach(item => uniqueChainMap[item.chainID] = item);
	const uniqueChainList = Object.values(uniqueChainMap);

	await BluebirdPromise.map(
		uniqueChainList,
		async (topPoolsMetaData) => {

			const [{ topPoolsData }] = await topTokensTokenMetadataTable.rawQuery(` SELECT * FROM ${topTokensMetadataIndexSchema.tableName}`);

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
			name:"Lisk",
            price:"1.23",
			priceChange:"+3.24",
			volume24H:"1.23",
			liquidity:"7.2",			
		},
		{
			name:"Bazar",
            price:"1732.25",
			priceChange:"-4.54",
			volume24H:"1.23",
			liquidity:"7.2",			
		},
		{
			name:"doEDU",
            price:"1.23",
			priceChange:"+3.24",
			volume24H:"1.23",
			liquidity:"7.2",			
		},
		{
			name:"Enevti",
            price:"1732.25",
			priceChange:"-4.54",
			volume24H:"1.23",
			liquidity:"7.2",			
		},
		{
			name:"RGB",
            price:"1.23",
			priceChange:"+3.24",
			volume24H:"1.23",
			liquidity:"7.2",			
		},
		{
			name:"Feat",
            price:"1732.25",
			priceChange:"-4.54",
			volume24H:"1.23",
			liquidity:"7.2",			
		}
	]
	}

	return topPoolsTokenMetadataData;
};


module.exports = {
	getTopTokensFromDatabase,
};