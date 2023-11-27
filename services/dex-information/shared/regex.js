/*
 * LiskHQ/lisk-service
 * Copyright © 2022 Lisk Foundation
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

const POOL_ID = /^\b[a-fA-F0-9]{16,40}\b$/;
const TOKEN_ID = /^\b[a-fA-F0-9]{16,40}\b$/;
const LIMIT = /^[0-9]+$/;

module.exports = {
	POOL_ID,
	TOKEN_ID,
    LIMIT,	
};