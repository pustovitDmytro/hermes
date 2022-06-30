#!./node_modules/.bin/babel-node

import { docopt } from 'docopt';
import Binance from '../src/exchanges/Binance';

const doc =
`Usage:
   test.js binance
   test.js -h | --help

Options:
   -h --help    Run tests on APIs.
`;

const favorites = [ 'USDT', 'BTC', 'UAH', 'SOL' ];
const input = { value: 15, ticker: 'ADA' };

async function binance() {
    const exchange = new Binance();

    await exchange.init();

    const results = favorites.map(ticker => exchange.getPrice(input.value, input.ticker, ticker));

    console.log(results);
}

async function main(opts) {
    try {
        if (opts.binance) await binance();

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}


main(docopt(doc));
