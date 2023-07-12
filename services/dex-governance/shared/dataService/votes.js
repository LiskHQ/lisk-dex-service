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

const { invokeEndpoint } = require("../../../blockchain-connector/shared/sdk/client");

const getVotes = async (params) => {

	let voteInfos;

    const context = {
        params:params
    }

    try {
        voteInfos = await invokeEndpoint('dexGovernance_getUserVotes',context);
         return {
            data: {
                voteInfos,
            },
            meta: {},
        };
    } catch (error) {
        if (error) {
            logger.warn(`Error returned when invoking 'dexGovernance_getUserVotes'.\n${error.stack}`);
            throw error;
        }
    }

	return {
		data: votesList,
		meta: {},
	};
};

module.exports = {
	getVotes,
};