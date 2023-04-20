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
import Joi from 'joi';

<<<<<<< HEAD:services/gateway/sources/dex-version1/pricesConvertFiatSource.js
module.exports = {
	type: 'moleculer',
	method: 'dex.prices',
	params: {
		currency: '=,string',
		tokenID: '=,string',
	},
	definition: {
		data: {
			convertedPrice: '=,string',
			convertedTarget: '=,string',
		},
		meta: {

		},
		links: {},
	},
=======
const priceConvertTokenSchema = {
	credibleDirectPriceToken2ToToken1: Joi.string().required(),
	credibleDirectPriceToken1ToToken2: Joi.string().required(),
};

module.exports = {
	priceConvertTokenSchema: Joi.object(priceConvertTokenSchema).required(),
>>>>>>> 3ac0dd49c4db9abf7e35abb831c184eb36b4b98d:tests/schemas/dex-base/priceConvertToken.schema.js
};