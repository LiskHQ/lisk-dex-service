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

let app;

const setAppContext = h => (app = h);

const getAppContext = () => app;

const requestRpc = async (service, method, params = {}) => {
	const data = await getAppContext().requestRpc(`${service}.${method}`, params);
	return data;
};

const requestConnector = async (method, params) => requestRpc('connector', method, params);

const requestIndexer = async (method, params) => requestRpc('indexer', method, params);

const requestStatistics = async (method, params) => requestRpc('statistics', method, params);

const requestMarket = async (method, params) => requestRpc('market', method, params);

module.exports = {
	setAppContext,
	requestConnector,
	requestStatistics,
	requestRpc,
	getAppContext,
	requestIndexer,
	requestMarket,
};
