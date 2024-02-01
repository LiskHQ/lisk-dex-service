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

const { Logger } = require('lisk-service-framework');
const { requestIndexer } = require('../utils/request');

const logger = Logger();

const getPopularPairings = async (params = {}) => {
	try {
		const response = await requestIndexer('transactions');

		const paringsArray = [];

		for (let i = 0; i < response.data.length; i++) {
			if (response.data.sender.address === params.senderAddres) {
				if (response.data.moduleCommand === 'token:swap') {
					const pairingString = response.data.params.tokenIdIn
						.toString()
						.concat('-', response.data.params.tokenIdOut);
					paringsArray.push(pairingString);
				}
			}
		}

		const pairingCounts = {};

		paringsArray.forEach(el => {
			pairingCounts[el] = (pairingCounts[el] || 0) + 1;
		});

		const sortedElements = Object.keys(pairingCounts).sort(
			(a, b) => pairingCounts[b] - pairingCounts[a],
		);

		return {
			data: {
				popularPairings: sortedElements.slice(0, 6),
			},
			meta: {},
		};
	} catch (err) {
		logger.warn(`Error thrown when getting popular pairings'.\n${err.stack}`);
		throw err;
	}
};

module.exports = {
	getPopularPairings,
};
