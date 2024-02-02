/*
 * LiskHQ/lisk-service
 * Copyright © 2024 Lisk Foundation
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

const TOKEN_ID = /^\b[a-fA-F0-9]{16}\b$/;
const AMOUNT_IN = /^[0-9]+$/;
const AMOUNT_OUT = /^[0-9]+$/;
const CURRENCY = /^\b([A-Za-z])+\b$/;
const TOKEN_SYMBOL = /^\b([A-Za-z])+\b$/;
const NONCE = /^[0-9]+$/;
const DEX_INTERVAL = /^\b(?:day|month|,)+\b$/;

module.exports = {
	TOKEN_ID,
	AMOUNT_IN,
	AMOUNT_OUT,
	CURRENCY,
	TOKEN_SYMBOL,
	NONCE,
	DEX_INTERVAL,
};
