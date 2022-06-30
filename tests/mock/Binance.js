/* eslint-disable security/detect-object-injection */
import { axiosResponse } from './utils';
import exchangeInfo from './binance-response-exchangeInfo.json';
import price from './binance-response-price.json';

export default function (opts) {
    if (opts.url.match('/api/v3/exchangeInfo')) {
        return axiosResponse(exchangeInfo);
    }

    if (opts.url.match('/api/v3/ticker/price')) {
        return axiosResponse(price);
    }

    throw new Error('unknown binance method');
}
