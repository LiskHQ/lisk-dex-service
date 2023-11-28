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

const CURRENCY = /^\b[a-fA-F0-9]{3,20}\b$/;
const TOKEN_ID = /^\b[a-fA-F0-9]{16}\b$/;
const ADDRESS = /^\b[A-Za-z]\b/

module.exports = {
	CURRENCY,
	TOKEN_ID,
    ADDRESS
};