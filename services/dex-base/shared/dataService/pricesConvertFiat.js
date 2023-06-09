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

const { requestMarket } = require('../utils/request');
const currency = require('../../shared/constants');

const getPricesConvertFiat = async (params = {}) => {
	let convertedFiatPrice;

	if ((params.currency.toUpperCase() !== currency.currency.EUR) && (params.currency.toUpperCase() !== currency.currency.USD)) {
		convertedFiatPrice = 'Please provide EUR or USD as an input currency.';
		return {
			data: convertedFiatPrice,
			meta: {},
		};
	}

	// get the market price for a specific token and return it

	const marketPrices = await requestMarket('prices', params);
	let inputTokenMarketPrice;
	for (let i = 0; i < marketPrices.data.length; i++) {
		const marketPriceToken = marketPrices.data[i].from;
		if (marketPriceToken === params.tokenSymbol.toUpperCase() && marketPrices.data[i].to === params.currency.toUpperCase()) {
			inputTokenMarketPrice = marketPrices.data[i].rate;
		}
	}

	convertedFiatPrice = inputTokenMarketPrice;

	return {
		data: convertedFiatPrice,
		meta: {},
	};
};

module.exports = {
	getPricesConvertFiat,
};
