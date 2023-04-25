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
	Exceptions: { ValidationException },
} = require('lisk-service-framework');

const { StatusCodes: { BAD_REQUEST } } = HTTP;


const dataService = require('../../shared/dataService');


const getPoolsAvailable = async params => {
	try {
		const response = await dataService.getPoolsAvailable(params);

		return {
			data: {poolsAvailable:response.data},
			meta: response.meta,
			links: {},
		};
	} catch (err) {
		// TODO: throw more explicit message
		throw err;
	}
};


module.exports = {
	getPoolsAvailable,
};
