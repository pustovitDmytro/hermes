import Lee from '../utils/Lee';
import { StubPrice, DirectPrice, ChainedPrice } from '../prices';

export default class Exchange {
    getPrice(amount, from, to) {
        if (from === to) {
            return new StubPrice(amount);
        }

        const direct = this.rates.find(s => [ s.from, s.to ].every(ticker => [ from, to ].includes(ticker)));

        if (direct) {
            const isInverted = (direct.from === to) && (direct.to === from);

            return new DirectPrice(amount, direct, { isInverted });
        }

        const lee = new Lee(this.rates, { from, to }, this.getMark);

        const chain = lee.run();

        if (chain.length === 0) return null;

        return new ChainedPrice(amount, { from }, chain);
    }
}
