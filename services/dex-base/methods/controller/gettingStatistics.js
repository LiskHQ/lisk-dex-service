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


const gettingStatistics = async params => {
	try {
		const response = await dataService.gettingStatistics(params);

		return {
			data: {id: response.data.id, data: response.data.data, volume: response.data.volume, tvl: response.data.tvl},
			meta: {},
		};
	} catch (err) {
		// TODO: throw more explicit message
		throw err;
	}
};


module.exports = {
	gettingStatistics,
};