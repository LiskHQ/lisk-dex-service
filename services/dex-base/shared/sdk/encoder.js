/*
 * LiskHQ/lisk-service
 * Copyright © 2022 Lisk Foundation
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

const { parseInputBySchema } = require('../utils/parser');
const {
	getTransactionParamsSchema,
} = require('./schema');

const encodeTransaction = (transaction) => {
	// Handle the transaction params
	const txParamsSchema = getTransactionParamsSchema(transaction);

	const parsedTxParams = parseInputBySchema(transaction.params, txParamsSchema);

	return parsedTxParams;
};

module.exports = {
	encodeTransaction,
};
