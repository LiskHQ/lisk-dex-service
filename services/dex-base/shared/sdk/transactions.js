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

const { codec } = require('@liskhq/lisk-codec');

const { encodeTransaction } = require('./encoder')

//const { formatEvent } = require('./formatter');

const { dryRunTransaction } = require('./endpoint');

const dryRunTransactionWrapper = async (params) => {
	
	const { tokenIdIn,amountIn,tokenIdOut,
		minAmountOut,
		swapRoute } = params;
	
	console.log(typeof tokenIdIn);
	
	if(typeof tokenIdIn !== 'object' || typeof amountIn !== 'object' || typeof tokenIdOut !== 'object' ||
	 typeof minAmountOut !== 'object' || typeof swapRoute !== 'array'){

		params.tokenIdIn = Buffer.from(tokenIdIn, 'hex');
		console.log(typeof params.tokenIdIn);
		params.amountIn =  BigInt(amountIn);
		params.tokenIdOut = Buffer.from(tokenIdOut, 'hex');
		params.minAmountOut =  BigInt(minAmountOut);
		params.swapRoute = tokenIdIn;
		
	}	
		
	const response = await dryRunTransaction(params);
	//response.events = response.events.map(event => formatEvent(event));
	return response;
};

module.exports = {
	dryRunTransaction: dryRunTransactionWrapper,
};
