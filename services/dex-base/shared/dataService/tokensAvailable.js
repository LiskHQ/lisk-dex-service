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

const { requestRpc } = require('../utils/request');

const getTokensAvailable = async (params) => {

	let tokensAvailable;
	let app;

	const requestConnector = async (method, params) => requestRpc('connector', method, params);
	tokensAvailable = await requestConnector('getSupportedTokens', params);
	
	module.exports = {
		setAppContext,
		requestConnector,
	};

	return {
		data: tokensAvailable,
		meta: {},
	};
};

module.exports = {
	getTokensAvailable,
};