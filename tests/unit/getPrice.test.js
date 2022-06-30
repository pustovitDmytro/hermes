import { assert } from 'chai';
import Test from '../Test';
import Binance from '../../src/exchanges/Binance';

const exchange = new Binance();
const factory = new Test();

suite('unit: getPrice [binance]');

before(async function () {
    factory.mockAPI();
    await exchange.init();
});

function approx(actual, expected) {
    const mistake = 0.1;
    const mistakeVal = expected * mistake;

    assert.isAtMost(actual, expected + mistakeVal);
    assert.isAtLeast(actual, expected - mistakeVal);
}

test('USDT => UAH', async function () {
    const price = exchange.getPrice(10, 'USDT', 'UAH');

    assert.equal(price.price, 349.4);
    assert.equal(price.rate, 34.94);
});

test('UAH => USDT (inverse)', async function () {
    const price = exchange.getPrice(350, 'UAH', 'USDT');

    approx(price.rate, 0.028);
    approx(price.price, 10);
});

test('ADA => USDT => SOL', async function () {
    const price = exchange.getPrice(15.8, 'ADA', 'SOL');

    approx(price.rate, 0.013);
    approx(price.price, 0.2);
    assert.sameMembers(
        price.points.map(p => p.symbol),
        [ 'ADA', 'USDT', 'SOL' ]
    );
});


after(function () {
    factory.unMockAPI();
});
