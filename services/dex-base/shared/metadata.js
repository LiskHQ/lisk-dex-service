/*
 * LiskHQ/lisk-service
 * Copyright © 2024 Lisk Foundation
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

const { read } = require('./utils/fsUtils');

const config = require('../config');

const getSupportedTokens = async () => {
	const { dataDir } = config;

	const blockchainAppsTokenMetadataSupported = {
		data: [],
		meta: {},
	};

	const appPathInClonedRepo = `${dataDir}/Lisk`;
	const tokenMetaString = await read(`${appPathInClonedRepo}/${config.FILENAME.NATIVETOKENS_JSON}`);
	const parsedTokenMeta = JSON.parse(tokenMetaString);

	parsedTokenMeta.tokens.forEach(token => {
		blockchainAppsTokenMetadataSupported.data.push({
			...token,
		});
	});

	// TODO: Use count method directly once support for custom column-based count added https://github.com/LiskHQ/lisk-service/issues/1188
	blockchainAppsTokenMetadataSupported.meta = {
		count: blockchainAppsTokenMetadataSupported.data.length,
	};

	return blockchainAppsTokenMetadataSupported;
};

module.exports = {
	getSupportedTokens,
};
