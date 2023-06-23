const {
	getPricesConvertToken,
} = require('./priceConvertToken');

const {
	reloadMarketAppsPrices
} = require('./interoperability');

module.exports = {
	// prices
	getPricesConvertToken,
	//Interoperability
	reloadMarketAppsPrices
};
