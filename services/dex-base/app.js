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
const path = require('path');


const {
	Microservice,
	LoggerConfig,
	Logger,
	Signals,
} = require('lisk-service-framework');

const config = require('./config');
const packageJson = require('./package.json');
const { setAppContext } = require('./shared/utils/request');
const { init } = require('./shared/init');

// Configure logger
const loggerConf = {
	...config.log,
	name: packageJson.name,
	version: packageJson.version,
};



LoggerConfig(loggerConf);

const logger = Logger();

// Initialize Microservice framework
const app = Microservice({
	name: 'dex',
	transporter: config.transporter,
	timeout: config.brokerTimeout,
	packageJson,
	logger: loggerConf,
	dependencies: [
		'statistics',
		'connector',
		'market',
	],
	events:{
		poolCreated:async (payload) => {
			logger.debug('Received a \'poolCreated\' event from connecter.');
			Signals.get('poolCreated').dispatch(payload);
		},
		poolCreationFailed:async (payload) => {
			logger.debug('Received a \'poolCreationFailed\' event from connecter.');
			Signals.get('poolCreationFailed').dispatch(payload);
		},
		positionCreated:async (payload) => {
			logger.debug('Received a \'positionCreated\' event from connecter.');
			Signals.get('positionCreated').dispatch(payload);
		},
		positionCreationFailed:async (payload) => {
			logger.debug('Received a \'positionCreationFailed\' event from connecter.');
			Signals.get('positionCreationFailed').dispatch(payload);
		},
		positionUpdated:async (payload) => {
			logger.debug('Received a \'positionUpdated\' event from connecter.');
			Signals.get('positionUpdated').dispatch(payload);
		},
		positionUpdateFailed:async (payload) => {
			logger.debug('Received a \'positionUpdateFailed\' event from connecter.');
			Signals.get('positionUpdateFailed').dispatch(payload);
		},
		removeLiquidity:async (payload) => {
			logger.debug('Received a \'removeLiquidity\' event from connecter.');
			Signals.get('removeLiquidity').dispatch(payload);
		},
		removeLiquidityFailed:async (payload) => {
			logger.debug('Received a \'removeLiquidityFailed\' event from connecter.');
			Signals.get('removeLiquidityFailed').dispatch(payload);
		},
		swapped:async (payload) => {
			logger.debug('Received a \'swapped\' event from connecter.');
			Signals.get('swapped').dispatch(payload);
		},
		swapFailed:async (payload) => {
			logger.debug('Received a \'swapFailed\' event from connecter.');
			Signals.get('swapFailed').dispatch(payload);
		},
	}
});

setAppContext(app);

// Add routes, events & jobs
app.addMethods(path.join(__dirname, 'methods'));
app.addEvents(path.join(__dirname, 'events'));
app.addJobs(path.join(__dirname, 'jobs'));



// Run the application
app.run().then(async() => {
	await init();
	logger.info(`Service started ${packageJson.name}`);	
}).catch(err => {
	logger.fatal(`Could not start the service ${packageJson.name} + ${err.message}`);
	logger.fatal(err.stack);
	process.exit(1);
});