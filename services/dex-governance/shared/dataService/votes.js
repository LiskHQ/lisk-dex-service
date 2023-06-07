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

	let votesList;

    try {
        votesList = await invokeEndpoint('dexGovernance_getUserVotes'); 
        return {
            data: {
                votesList,
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