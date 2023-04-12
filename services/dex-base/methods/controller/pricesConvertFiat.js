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
const {
	HTTP,
} = require('lisk-service-framework');

const dataService = require('../../shared/dataService');


const getPricesConvertFiat = async params => {
	try {
		const response = await dataService.getPricesConvertFiat(params);

		return {
			data: response.data,
			meta: response.meta,
			links: {},
		};
	} catch (err) {
		throw err;
	}
};


module.exports = {
	getPricesConvertFiat,
};