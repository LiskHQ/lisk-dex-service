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


const logger = require('lisk-service-framework').Logger();

const {
	reloadMarketAppsPrices,
} = require('../shared/dataService');

module.exports = [
	{
		name: 'reload.market.apps.prices',
		description: 'Keep the market apps prices up-to-date',
		schedule: '*/1 * * * *', // Every 1 min
		init: async () => {
			console.log('Successfully initialized market app prices cache.');
			logger.debug('Initializing market apps prices cache...');
			try {
				await reloadMarketAppsPrices();
				logger.info('Successfully initialized market app prices cache.');
				
			} catch (err) {
				logger.warn(`Initializing market apps prices cache failed due to: ${err.message}`);
			}
		},
		controller: async () => {
			logger.debug('Reloading market apps prices cache...');
			try {
				await reloadMarketAppsPrices();
			} catch (err) {
				logger.warn(`Reloading market apps prices cache: ${err.message}`);
			}
		},
	},
];
