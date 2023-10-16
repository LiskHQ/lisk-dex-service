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


const { requestConnector } = require("../utils/request");

const getProposal = async (params) => {

	let proposalsList; 

    try {
        proposalsList = await requestConnector('invokeEndpoint',{endpoint:"dexGovernance_getProposal", params}); 
        if(proposalsList.error != null){
            return {
                data: {},
                meta: {},
            };

        }
        return {
            data: {
                creationHeight: proposalsList.creationHeight,
                votesYes: proposalsList.votesYes,
                votesNo: proposalsList.votesNo,
                votesPass: proposalsList.votesPass,
                type: proposalsList.type,
                content: proposalsList.content,
            },
            meta: {},
        };
    } catch (error) {
        throw error.message;
    }
};

module.exports = {
	getProposal,
};