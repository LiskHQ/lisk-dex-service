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

module.exports = {
	type: 'moleculer',
	method: 'governance.proposal',
	params: {
		proposalID: '=,string',
	},
	definition: {
		data: {
			proposalID: '=,string',
            creationHeight: '=,string',
            votesYes: '=,string',
            votesNo: '=,string',
            votesPass: '=,string',
            type: '=,string',
            content: {
                text: '=,string',
                poolID: '=,string',
                multiplier: '=,string',
                metadata: {
                    title: '=,string',
                    author: '=,string',
                    summary: '=,string',
                    discussionsTo: '=,string',
                }
            },
		},
		meta: {},
	},
};