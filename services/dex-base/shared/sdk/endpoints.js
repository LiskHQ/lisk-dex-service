/*
 * LiskHQ/lisk-service
 * Copyright © 2024 Lisk Foundation
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

const { Signals } = require('lisk-service-framework');
const { requestConnector } = require('../utils/request');

const getEventsByHeight = async (height) => {
	try {
		const events = await requestConnector('getEventsByHeight', { height });
		events.forEach(event => {
			if(event.module === "dex"){
				if(event.name === "poolCreated"){
					Signals.get("poolCreated").dispatch(event.data)
				}
				if(event.name === "poolCreationFailed"){
					Signals.get("poolCreationFailed").dispatch(event.data)
				}
				if(event.name === "positionCreated"){
					Signals.get("positionCreated").dispatch(event.data)
				}
				if(event.name === "positionCreationFailed"){
					Signals.get("positionCreationFailed").dispatch(event.data)
				}
				if(event.name === "positionUpdated"){
					Signals.get("positionUpdated").dispatch(event.data)
				}
				if(event.name === "poolUpdateFailed"){
					Signals.get("poolUpdateFailed").dispatch(event.data)
				}
				if(event.name === "removeliquidity"){
					Signals.get("removeliquidity").dispatch(event.data)
				}
				if(event.name === "removeLquidityFailed"){
					Signals.get("removeLquidityFailed").dispatch(event.data)
				}
				if(event.name === "swapped"){
					Signals.get("swapped").dispatch(event.data)
				}
				if(event.name === "swapFailed"){
					Signals.get("swapFailed").dispatch(event.data)
				}
			}
		})
	} catch (err) {
		throw Error('Request timed out when calling \'getEvents\'.');
	}
};

module.exports = {
	getEventsByHeight
};
