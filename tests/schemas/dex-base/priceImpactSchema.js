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

const priceImpactResponseSchema = {
	priceImpact: Joi.array().items(priceImpact).required(),
};

const priceImpactMetaResponseSchema = {};

const goodResponseSchema = {
	data: Joi.object(priceImpactResponseSchema).required(),
	meta: Joi.object(priceImpactMetaResponseSchema).required(),
};

module.exports = {
	priceImpactMetaResponseSchema: Joi.object(priceImpactMetaResponseSchema).required(),
	goodResponseSchema: Joi.object(goodResponseSchema).required(),
	priceImpactResponseSchema: Joi.object(priceImpactResponseSchema).required(),
};
