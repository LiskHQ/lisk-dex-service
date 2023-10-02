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



const popularPairingsResponseSchema = {
	popularPairings: Joi.array().items(popularPairings).required(),
};


const popularPairingsMetaResponseSchema = {};

const goodResponseSchema = {
	data: Joi.object(popularPairingsResponseSchema).required(),
	meta: Joi.object(popularPairingsMetaResponseSchema).required(),
};


module.exports = {
	popularPairingsMetaResponseSchema: Joi.object(popularPairingsMetaResponseSchema).required(),
	goodResponseSchema: Joi.object(goodResponseSchema).required(),
	popularPairingsResponseSchema: Joi.object(popularPairingsResponseSchema).required(),
};
