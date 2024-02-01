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

const dataService = require('../../shared/dataService');

const getPriceImpact = async params => {
	let priceImpact;
	if (params.isZeroToOne) {
		priceImpact = await dataService.getPriceImpactExactIn(params);
	} else {
		priceImpact = await dataService.getPriceImpactExactOut(params);
	}

	return {
		data: priceImpact.data,
		meta: priceImpact.meta,
		links: {},
	};
};

module.exports = {
	getPriceImpact,
};