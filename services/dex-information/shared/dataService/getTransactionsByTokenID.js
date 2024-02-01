/*
 * LiskHQ/lisk-service
 * Copyright © 2024 Lisk Foundation
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
const { requestIndexer } = require('../utils/request');

const logger = Logger();

const getTransactionsByTokenID = async params => {
	const transactionsByTokenID = [];

	try {
		const response = await requestIndexer('transactions');

		if (response.data === null) {
			throw new Error(`Error no transactions with the specified tokenID.`);
		}

		if (response.data.length !== 0) {
			for (let i = 0; i < response.data.length; i++) {
				if (response.data[i].tokenID === params.tokenID) {
					transactionsByTokenID.push(response.data[i]);
				}
			}
		}

		return {
			data: {
				transactionsByTokenID,
			},
			meta: {},
		};
	} catch (err) {
		logger.warn(`Error thrown when getting transactions by tokenID.\n${err.stack}`);
		throw err;
	}
};

module.exports = {
	getTransactionsByTokenID,
};
