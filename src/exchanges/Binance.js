import BinanceAPI from '../api/BinanceAPI';
import Exchange from './Exchange';

export default class Binance extends Exchange {
    constructor() {
        super();
        this._api = new BinanceAPI();
    }

    async init() {
        const [ { symbols }, tickers ] = await Promise.all([
            this._api.info(),
            this._api.tickers()
        ]);

        for (const symbol of symbols) {
            const ticker = tickers.find(t => t.symbol === symbol.symbol);

            symbol.price = ticker.price;
        }

        this.rates = symbols;
    }

    getMark(ticker, { to }) {
        if (ticker === to) return 1;
        /* eslint-disable no-magic-numbers*/
        if (ticker === 'USDT') return 1.1;
        if ([ 'BUSD', 'USDC' ].includes(ticker)) return 1.15;
        if ([ 'BTC', 'BNB', 'ETH' ].includes(ticker)) return 1.25;

        return 1.5;
        /* eslint-enable no-magic-numbers*/
    }
}
