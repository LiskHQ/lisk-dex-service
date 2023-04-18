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

const getTokensAvailable = async params => {
	try {
		const response = await dataService.getTokensAvailable(params);

		return {
			data: {tokensAvailable:response.data.supportedTokens},
			meta: {}
			};
	} catch (err) {
		//TODO: add more explicit message for throwing the error
		throw err;
	}
};


module.exports = {
	getTokensAvailable,
};