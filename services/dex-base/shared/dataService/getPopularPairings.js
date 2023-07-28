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
const { requestIndexer } = require('../utils/request');

const getPopularPairings = async (params = {}) => {
  try {

    const paringsArray = new Array();
    
    const transactions = await requestIndexer('transactions');

    for(let i = 0;i<transactions.data.length;i++){
      if (transactions.data.sender.address === params.senderAddres) {
        if (data.moduleCommand === 'token:swap') {
          const pairingString = data.params.tokenIdIn.toString().concat('-', data.params.tokenIdOut);
          paringsArray.push(pairingString);
        }
      }
    }
    
    const pairingCounts = {};
    
    paringsArray.forEach((el) => {
      pairingCounts[el] = (pairingCounts[el] || 0) + 1;
    });

    
    const sortedElements = Object.keys(pairingCounts).sort((a, b) => {
      return pairingCounts[b] - pairingCounts[a];
    });

    const popularPairings = sortedElements.slice(0, 6);

    return {
      data: {
        popularPairings: popularPairings,
      },
      meta: {},
    };
  } catch (err) {
    if (err) {
      throw err;
    }
  }
};

module.exports = {
  getPopularPairings,
};