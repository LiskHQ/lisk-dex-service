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

const {
	Exceptions: { TimeoutException },
} = require('lisk-service-framework');

const { invokeEndpoint } = require('./client');

const dryRunTransaction = async (params) => {
	try {
		const response = await invokeEndpoint('dex_dryRunSwapExactIn', params);
		return response;
	} catch (err) {
		if (err.message.includes(timeoutMessage)) {
			throw new TimeoutException(`Request timed out when calling 'dryRunTransaction' with transaction: ${transaction}.`);
		}
		throw err;
	}
};

module.exports = {
	dryRunTransaction,
};