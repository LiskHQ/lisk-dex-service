const {
    getPricesConvertFiat
} = require ('../prices/convert/fiat')

//pools
const {
    getPoolsAvailable
} = require ('../pools/poolsAvailable')

module.exports = {
    //prices
    getPricesConvertFiat,
    //pools
    getPoolsAvailable
}