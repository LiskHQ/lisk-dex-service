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
const currency = {
	USD: 'USD',
	EUR: 'EUR',
};

<<<<<<< HEAD:services/dex-base/methods/gettingCurrentsqrtprice.js
const {
	gettingCurrentsqrtprice,
} = require('./controller/gettingCurrentsqrtprice');

module.exports = [
	{
		name: 'prices.currentsqrtprice',
		controller: gettingCurrentsqrtprice,
		params: {
			poolID: { optional: false, type: 'string' },
			priceDirection: { optional: false, type: 'boolean'},
		},
	},
];
=======
module.exports = {
	currency,
};

module.exports = {
	currency,
};
>>>>>>> origin/development:services/gateway/sources/dex-version1/tokensAvailableSource.js
