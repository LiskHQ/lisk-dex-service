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

const gettingSlippageBounds = async (params) => {
      
	try {
		const swapResponse = await invokeEndpoint('dex_dryRunSwapExactOut', params);
        if(swapResponse.error!=null){
           return{
			data:{
				minimum:swapResponse.error.message,
				maximum:swapResponse.error.message,
				unit: "percentage",
				symbol: "%",
			}
		   }
        }
		return {
			data: {
				minimum:swapResponse[2],
                maximum:swapResponse[3],
				unit: "percentage",
				symbol: "%",
			},
			meta: {},
		};
	} catch (err) {
        throw new Error (`error in calling dex_dryRunSwapExactIn.\n${err}`);
	}
};

module.exports = {
	gettingSlippageBounds,
};