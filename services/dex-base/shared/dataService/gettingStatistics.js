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

const gettingStatistics = async (params = {}) => {

    try {
        const statistics = await requestStatistics('transactions.statistics', params);
        return {
            data: {
                transactionCount: statistics.data.timeline, volume: statistics.data.distributionByAmount
            },
            meta: {},
        };
    } catch (error) {
        throw new Error(error)
    }

};

module.exports = {
    gettingStatistics,
};