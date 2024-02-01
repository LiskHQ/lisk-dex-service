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
const config = {
    endpoints: {
		mysql:process.env.SERVICE_APP_REGISTRY_MYSQL || 'mysql://lisk:password@localhost:3306/lisk',
	},
};

config.dataDir = `${__dirname}/data`;

/**
 * External endpoints
 */
config.endpoints.liskHttp = `${(process.env.LISK_APP_HTTP || 'http://127.0.0.1:7887')}/api`;
config.endpoints.liskWs = process.env.LISK_APP_WS || config.endpoints.liskHttp.replace('http', 'ws').replace('/api', '');
config.endpoints.mysql = process.env.SERVICE_APP_REGISTRY_MYSQL || 'mysql://lisk:password@localhost:3306/lisk';
config.endpoints = {
	redis: process.env.SERVICE_DEXBASE_REDIS || 'redis://localhost:6381/0',
};

const packageJson = require('./package.json');

// Moleculer broker config
config.transporter = process.env.SERVICE_BROKER || 'redis://localhost:6381/0';
config.brokerTimeout = Number(process.env.SERVICE_BROKER_TIMEOUT) || 10; // in seconds

// Logging
config.log = {
	name: packageJson.name,
	version: packageJson.version,
};
/**
 * log.level - Limits the importance of log messages for console and stdout outputs
 *             One fo the following in that order:
 *               TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK
 */
config.log.level = process.env.SERVICE_LOG_LEVEL || 'info';

config.gitHub = {
	accessToken: process.env.GITHUB_ACCESS_TOKEN,
	appRegistryRepo: process.env.GITHUB_APP_REGISTRY_REPO || 'https://github.com/LiskHQ/app-registry',
	branch: process.env.GITHUB_APP_REGISTRY_REPO_BRANCH || 'main',
	get appRegistryRepoName() { return this.appRegistryRepo.split('/').pop(); },
};

/*
 * True / False outputs
 * log.console - Plain JavaScript console.log() output
 * log.stdout  - Writes directly to stdout
 */
config.log.console = process.env.SERVICE_LOG_CONSOLE || 'false';
config.log.stdout = process.env.SERVICE_LOG_STDOUT || 'true';

/*
 * Configurable outputs
 * log.file   - outputs to a file (ie. ./logs/app.log)
 * log.gelf   - Writes to GELF-compatible socket (ie. localhost:12201/udp)
 */
config.log.gelf = process.env.SERVICE_LOG_GELF || 'false';
config.log.file = process.env.SERVICE_LOG_FILE || 'false';

// Set docker host if running inside the container
config.log.docker_host = process.env.DOCKER_HOST || 'local';

// config.dataDir = '/home/irfan/lisk-dex-service-d/lisk-dex-service/services/blockchain-app-registry/data';

config.dataDir = `${__dirname}/data`;

config.FILENAME = Object.freeze({
	APP_JSON: 'app.json',
	NATIVETOKENS_JSON: 'nativetokens.json',
});

config.supportedNetworks = ['mainnet', 'testnet', 'betanet', 'alphanet', 'devnet'];

config.CHAIN_ID_PREFIX_NETWORK_MAP = Object.freeze({
	'00': 'mainnet',
	'01': 'testnet',
	'02': 'betanet',
	'03': 'alphanet',
	'04': 'devnet',
});

/**
 * API Client related settings
 */
config.isUseLiskIPCClient = Boolean(String(process.env.USE_LISK_IPC_CLIENT).toLowerCase() === 'true');
config.liskAppDataPath = process.env.LISK_APP_DATA_PATH || '~/.lisk/lisk-dex-core';

module.exports = config;
