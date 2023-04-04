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
const getTokensAvailable = async (params = {}) => {
	
    let tokensAvailable;
	//Check if params are valid
    //check params.limit and params.offset to return the lisk of available tokens 
    return {
		data: tokensAvailable,
		meta: {},   
	};
};

module.exports = {
	getTokensAvailable,
};