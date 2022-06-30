import BaseAPI from 'base-api-client';

function dumpSymbol(sym) {
    return {
        symbol    : sym.symbol,
        from      : sym.baseAsset,
        to        : sym.quoteAsset,
        precision : sym.quotePrecision
    };
}

function dumpTicker(ticker) {
    return {
        symbol : ticker.symbol,
        price  : +ticker.price
    };
}

export default class BinanceAPI extends BaseAPI {
    constructor() {
        super('https://api.binance.com');
    }

    async info() {
        const res = await this.get('api/v3/exchangeInfo');

        const lastUpdatedTime = new Date(res.serverTime);
        const symbols = res.symbols
            .filter(r => r.status === 'TRADING')
            .map(t => dumpSymbol(t));

        return { lastUpdatedTime, symbols };
    }

    async tickers() {
        const res = await this.get('api/v3/ticker/price');

        return res.map(t => dumpTicker(t));
    }
}
