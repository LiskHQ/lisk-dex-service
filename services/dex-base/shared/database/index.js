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
const BluebirdPromise = require('bluebird');

const {
	Logger,
	MySQL: {
		getDbConnection,
		getTableInstance,
		startDbTransaction,
		commitDbTransaction,
		rollbackDbTransaction,
	},
} = require('lisk-service-framework');

const logger = Logger();

const config = require('../../config');
const { set, get } = require('./mysqlKVStore');

const indexSchemas = {
	token_metadata: require('./schema/dex_info_top_tokens'),
};

const MYSQL_ENDPOINT = config.endpoints.mysql;

const initializeSearchIndex = async () => {
	logger.debug('Initializing all the tables.');
	await BluebirdPromise.map(
		Object.values(indexSchemas),
		async schema => {
			logger.trace(`Initializing table: ${schema.tableName}.`);
			return getTableInstance(schema.tableName, schema, MYSQL_ENDPOINT);
		},
		{ concurrency: 1 },
	);
	logger.debug('Initialized all the tables successfully.');
};

const truncateAllTables = async () => {
	logger.info('Truncating all the tables.');
	await BluebirdPromise.map(
		Object.values(indexSchemas),
		async schema => {
			logger.trace(`Truncating table: ${schema.tableName}.`);
			const db = await getTableInstance(schema.tableName, schema, MYSQL_ENDPOINT);
			await db.rawQuery(`TRUNCATE TABLE ${schema.tableName};`);
			logger.info(`Truncated table: ${schema.tableName}.`);
		},
		{ concurrency: 1 },
	);
	logger.debug('Truncated all the tables successfully.');
};

const initTopTokensTable = async() => {
	try {
		const connection = await getDbConnection(MYSQL_ENDPOINT);
		const dbTrx = await startDbTransaction(connection);
		await set("tokenName", "LSK", dbTrx);
		await commitDbTransaction(dbTrx);

	} catch (error) {
		console.log("error in usertin")
	}
	
	
}

const initDatabase = async () => {
	//if (config.isRebuildIndexAtInit) await truncateAllTables();
	
	await initializeSearchIndex();
	await initTopTokensTable();
};

module.exports = {
	initDatabase,
};
