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

<<<<<<< HEAD:tests/schemas/dex-base/priceConvertFiatSchema.js
const priceConvertFiatSchema = {
	convertedPrice: Joi.string().required(),
	convertedTarget: Joi.string().required(),
};

module.exports = {
	priceConvertFiatSchema: Joi.object(priceConvertFiatSchema).required(),
=======
let app;

const setAppContext = (h) => app = h;

const getAppContext = () => app;

const requestRpc = async (service, method, params = {}) => {
	const data = await getAppContext().requestRpc(`${service}.${method}`, params);
	return data;
};

const requestConnector = async (method, params) => requestRpc('connector', method, params);

module.exports = {
	setAppContext,
	requestConnector,
	requestRpc,
	getAppContext
>>>>>>> 3ac0dd49c4db9abf7e35abb831c184eb36b4b98d:services/dex-base/shared/utils/request.js
};