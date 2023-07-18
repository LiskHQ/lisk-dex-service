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
const { requestStatistics } = require('../utils/request');

const gettingPopularPairings = async (params = {}) => {
    try {
      const statistics = await requestStatistics('transactions.statistics', params);
          return {
              data: {
                popularPairings:statistics,
              },
              meta: {},
          };
    } catch (err) {
      if (err) {
        logger.warn(`Error returned when invoking 'transactions.statistics'.\n${err.stack}`);
        throw err;
      }
    }
};

module.exports = {
	gettingPopularPairings,
};