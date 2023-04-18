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

const gettingStatistics = async (params = {}) => {

   
    //get the market price for a specific token and return it
    const requestStatistics = async (method, params) => requestRpc('statistics', method, params);
    const statistics = await requestStatistics('transactions.statistics');
    
    return {
        data: statistics,
        meta: {},
    };
};

module.exports = {
    gettingStatistics,
};