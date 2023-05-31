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

const getProposal = async params => {
	try {
		const response = await dataService.getProposal(params);

		return {
			data: {
				creationHeight: response.data.creationHeight,
                votesYes: response.data.votesYes,
                votesNo: response.data.votesNo,
                votesPass: response.data.votesPass,
                type: response.data.type,
                content: response.data.content,
			},
			meta: {}
		};
	} catch (err) {
		// TODO: throwing caught error
		throw err;
	}
};


module.exports = {
	getProposal,
};