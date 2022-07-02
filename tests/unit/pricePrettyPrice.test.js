import { assert } from 'chai';
import '../Test';
import Price from '../../src/prices/Price';


suite('unit: price.prettyPrice');

test('leave good prices as is', async function () {
    assert.equal((new Price(12.123_456_78)).prettyPrice, '12.12345678');
});

test('round over precision', async function () {
    assert.equal((new Price(12.123_456_781)).prettyPrice, '12.12345678');
    assert.equal((new Price(12.123_456_786)).prettyPrice, '12.12345679');
});

test('trim extra zeroes', async function () {
    assert.equal((new Price(12.123)).prettyPrice, '12.123');
    assert.equal((new Price(100)).prettyPrice, '100');
    assert.equal((new Price(12)).prettyPrice, '12');
    assert.equal((new Price(1.000_000_000_000_000_001)).prettyPrice, '1');
    assert.equal((new Price(0.000_000_000_000_000_01)).prettyPrice, '0');
});
