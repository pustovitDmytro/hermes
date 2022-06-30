/* eslint-disable no-loop-func */
import { last } from 'myrmidon';

function areNeighbours(a, b) {
    return [ a.from, a.to ].some(ticker => [ b.from, b.to ].includes(ticker));
}

function getMinByProp(array, prop) {
    let min = array[0];

    for (const item of array) {
        if (item[prop] < min[prop]) min = item;
    }

    return min;
}

export default class Lee {
    constructor(symbols, { from, to }, getMark) {
        this._symbols = symbols;
        this._from = from;
        this._to = to;
        this._getMark = getMark;
    }

    run() {
        const { chain, map } = this.initialization();

        this.waveExpansion(chain, map);
        this.backTrace(chain, map);

        return chain;
    }

    initialization() {
        const chain = [];
        const map = this._symbols.map(s => {
            const isInitial = [ s.from, s.to ].includes(this._from);
            const joinTicker = isInitial && [ s.from, s.to ].find(t => t !== this._from);

            return {
                ...s,
                mark     : isInitial ? this._getMark(joinTicker, { to: this._to }) : -1,
                discover : isInitial
            };
        });

        return { chain, map };
    }

    waveExpansion(chain, map) {
        while (
            !map.some(item => item.mark > 0 && [ item.from, item.to ].includes(this._to))
            || !map.some(item => item.mark === -1)
        ) {
            for (const marked of map.filter(i => i.discover)) {
                for (const item of map) {
                    const isNotMarked = item.mark === -1;

                    if (isNotMarked && areNeighbours(item, marked)) {
                        const joinTicker =  [ item.from, item.to ]
                            .find(ticker => ![ marked.from, marked.to ].includes(ticker));

                        item.mark = marked.mark + this._getMark(joinTicker, { to: this._to });
                        item.discover = true;
                    }
                }

                marked.discover = false;
            }
        }
    }

    backTrace(chain, map) {
        const targets = map.filter(item => item.mark >= 0 && [ item.from, item.to ].includes(this._to));

        if (targets.length === 0) return [];
        const closest = getMinByProp(targets, 'mark');

        chain.push(closest);
        while (!chain.some(item => [ item.from, item.to ].includes(this._from))) {
            const neighbours = map.filter(item => item.mark > 0 && areNeighbours(item, last(chain)));
            const min = getMinByProp(neighbours, 'mark');

            chain.push(min);
        }

        return chain.reverse().map(item => {
            // eslint-disable-next-line no-unused-vars
            const { mark, discover, ...raw } = item;

            return raw;
        });
    }
}
