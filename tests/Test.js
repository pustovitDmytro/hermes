import { getNamespace } from 'cls-hooked';
import jsonQuery from 'json-query';
import { mockAPI, unMockAPI, traces } from  './mock';
import './init-hooks';

export default class Test {
    mockAPI = mockAPI

    unMockAPI = unMockAPI

    async getApiCalls(query, { trace = true } = {}) {
        const ns = getNamespace('__TEST__');
        const queryItems = [];

        if (query)queryItems.push(query);

        if (trace) {
            const traceId = ns.get('current').id;

            queryItems.push(`traceId=${traceId}`);
        }

        const q = `[*${queryItems.join('&')}]`;
        const res = jsonQuery(q, { data: traces });

        return res.value;
    }
}

