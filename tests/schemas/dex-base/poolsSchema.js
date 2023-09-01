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


const poolsAvailable = {
	poolsAvailable: Joi.array().items(Joi.string().pattern(regex.TOKEN_ID)).required()
};

const goodResponseSchema = {
	data: Joi.object(poolsAvailableResponseSchema).required(),
	meta: Joi.object(poolsAvailableMetaResponseSchema).required(),
};


const poolsAvailableResponseSchema = {
	poolsAvailable: Joi.array().items(poolsAvailable).required(),
};

const poolsAvailableMetaResponseSchema = {};

module.exports = {
	poolsAvailableMetaResponseSchema: Joi.object(poolsAvailableMetaResponseSchema).required(),
	goodResponseSchema: Joi.object(goodResponseSchema).required(),
	poolsAvailableResponseSchema: Joi.object(poolsAvailableResponseSchema).required(),
};
