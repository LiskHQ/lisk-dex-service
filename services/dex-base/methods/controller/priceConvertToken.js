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

const getPricesConvertToken = async params => {
	try {
		const response = await dataService.getPricesConvertToken(params);

		return {
			data: {
				credibleDirectPriceToken2ToToken1: response.data.token2ToToken1,
				credibleDirectPriceToken1ToToken2: response.data.token1ToToken2},
			meta: {}
		};
	} catch (err) {
		// TODO: throwing caught error
		throw err;
	}
};


module.exports = {
	getPricesConvertToken,
};
