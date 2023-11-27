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

const { requestIndexer } = require('../utils/request');

const getTransactionsByTokenID = async (params) => {

    let transactionsByTokenID = [];
    
    try {
        const transactions = await requestIndexer('transactions');

        if (transactions.data != null) {
            if (transactions.data.length != 0) {
                for (let i = 0; i < transactions.data.length; i++) {
                    if (transactions.data[i].tokenID == params.tokenID) {
                        transactionsByTokenID.push(transactions.data[i]);
                    }
                }
            }
        } else {
            throw new Error(`Error no transactions with the specified tokenID`);
        }

    } catch (error) {
        if (error) {
            throw error;
        }
    }

    return {
        data: {
            transactionsByTokenID
        },
        meta: {},
    };
};

module.exports = {
    getTransactionsByTokenID,
};