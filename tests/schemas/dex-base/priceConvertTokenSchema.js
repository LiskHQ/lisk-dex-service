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

const regex = require('./regex.js');

import Joi from 'joi';

const priceConvertTokenSchema = {
	credibleDirectPriceToken2ToToken1: Joi.string().pattern(regex.CONVERTED_PRICE).required(),
	credibleDirectPriceToken1ToToken2: Joi.string().pattern(regex.CONVERTED_PRICE).required(),
};

module.exports = {
	priceConvertTokenSchema: Joi.object(priceConvertTokenSchema).required(),
};
