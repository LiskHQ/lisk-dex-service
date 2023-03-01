#!/bin/sh
mkdir -p ~/.lisk/lisk-dex-core/config/devnet/
cp /tmp/config/genesis_block.json ~/.lisk/lisk-dex-core/config/devnet/

/home/lisk/node_modules/.bin/lisk-dex-core blockchain:import /tmp/snapshots/blockchain.db.tar.gz --force
/home/lisk/node_modules/.bin/lisk-dex-core forger-info:import /tmp/snapshots/forger.db.tar.gz --force

/home/lisk/node_modules/.bin/lisk-dex-core start --network=devnet --api-ws --api-ws-host=0.0.0.0 --api-ws-port=5001 --enable-forger-plugin