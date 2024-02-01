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

const { Logger } = require('lisk-service-framework');
const { requestStatistics } = require('../utils/request');

const logger = Logger();

const gettingStatistics = async (params = {}) => {
	try {
		const response = await requestStatistics('transactions.statistics', params);

		return {
			data: {
				transactionCount: response.data.timeline,
				volume: response.data.distributionByAmount,
			},
			meta: {},
		};
	} catch (err) {
		logger.warn(`Error thrown when getting statistics.\n${err.stack}`);
		throw err;
	}
};

module.exports = {
	gettingStatistics,
};
