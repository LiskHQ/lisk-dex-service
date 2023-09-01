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




const gettingSlippageBoundsResponseSchema = {
	minimum: Joi.array().items(minimum).required(),
	maximum: Joi.array().items(minimum).required(),
};

const gettingSlippageBoundsMetaResponseSchema = {};

const goodResponseSchema = {
	data: Joi.object(gettingSlippageBoundsResponseSchema).required(),
	meta: Joi.object(gettingSlippageBoundsMetaResponseSchema).required(),
};

module.exports = {
	gettingSlippageBoundsMetaResponseSchema: Joi.object(gettingSlippageBoundsMetaResponseSchema).required(),
	goodResponseSchema: Joi.object(goodResponseSchema).required(),
	gettingSlippageBoundsResponseSchema: Joi.object(gettingSlippageBoundsResponseSchema).required(),
};
