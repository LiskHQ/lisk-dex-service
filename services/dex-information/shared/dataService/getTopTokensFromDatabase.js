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


const { getTableInstance } = require('lisk-service-framework/src/mysql');
const config = require('../../config');
const topTokensMetadataIndexSchema = require('../../database/schema/dex_info_top_tokens');
const MYSQL_ENDPOINT = config.endpoints.mysql;


const getTopTokensPoolsMetadataIndex = () => getTableInstance(
	topTokensMetadataIndexSchema.tableName,
	topTokensMetadataIndexSchema,
	MYSQL_ENDPOINT,
);

const getTopTokensFromDatabase = async params => {
	
	const topTokensTokenTable = await getTopTokensPoolsMetadataIndex();

	const topTokensFromDatabase = {
		data: [],
		meta: {},
	};

	let topTokensData = await topTokensTokenTable.rawQuery(` SELECT * FROM ${topTokensMetadataIndexSchema.tableName}`);
	
	if(topTokensData.length == 0){
		topTokensData=[{
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
		}]
	}

	topTokensData.forEach(topTokens => {
		topTokensFromDatabase.data.push({
			...topTokens,
		});
	});

	
	topTokensFromDatabase.meta = {
		count: topTokensFromDatabase.data.length,
		offset: params.offset,
	};

	return topTokensFromDatabase;
};


module.exports = {
	getTopTokensFromDatabase,
};