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
const { requestConnector } = require('../utils/request');
const { getAvailableModuleCommands, getRegisteredModules } = require('../constants');

const getNetworkStatus = async () => {
	const status = await requestConnector('getNetworkStatus');

	status.moduleCommands = await getAvailableModuleCommands();
	status.registeredModules = await getRegisteredModules();
	status.constants = { chainID: status.chainID };

	return {
		data: status,
		meta: {
			lastUpdate: Math.floor(Date.now() / 1000),
			lastBlockHeight: status.height,
			lastBlockID: status.lastBlockID,
		},
	};
};

module.exports = {
	getNetworkStatus,
};