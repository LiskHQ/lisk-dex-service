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

const getProposal = async (params) => {

	let proposalsList;

    try {
        proposalsList = await invokeEndpoint('dexGovernance_getProposal'); 
        return {
            data: {
                proposalsList,
            },
            meta: {},
        };
    } catch (error) {
        if (err) {
            logger.warn(`Error returned when invoking 'dex_getProposal'.\n${err.stack}`);
            throw err;
        }
    }

	return {
		data: proposalsList,
		meta: {},
	};
};

module.exports = {
	getProposal,
};