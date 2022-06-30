import { getNamespace } from 'cls-hooked';

import { v4 as uuid } from 'uuid';
import BinanceAPI from '../../src/api/BinanceAPI';
import binanceMock from './Binance';

export const traces = [];

const defaultMethods = {
    log(level, data) {
        traces.push(data);
    },

    getTraceId() {
        const ns = getNamespace('__TEST__');
        const current = ns.get('current');

        return current?.id || uuid();
    }
};

const APIs = [
    {
        API     : BinanceAPI,
        methods : { ...defaultMethods, _axios: binanceMock }
    }
];

for (const api of APIs) {
    api.BACKUP = {};
    Object.keys(api.methods).forEach(methodName => {
        api.BACKUP[methodName] = api.API.prototype[methodName];
    });
}

export function mockAPI() {
    for (const api of APIs) {
        for (const methodName of Object.keys(api.methods)) {
            api.API.prototype[methodName] = api.methods[methodName];
        }
    }
}

export function unMockAPI() {
    for (const api of APIs) {
        for (const methodName of Object.keys(api.methods)) {
            api.API.prototype[methodName] = api.BACKUP[methodName];
        }
    }
}
