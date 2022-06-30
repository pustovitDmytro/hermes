import Price from './Price';
import StubPrice from './StubPrice';
import DirectPrice from './DirectPrice';

export default class ChainedPrice extends Price {
    constructor(amount, { from }, chain) {
        const precision = Math.max(...chain.map(c => c.precision));
        const points = [ { symbol: from, price: new StubPrice(amount) } ];

        let accumRate = 1;

        chain.forEach((c, i) => {
            const prevSymbol = points[i].symbol;
            const prevPrice = points[i].price;
            const isInverted = c.from !== prevSymbol;
            const price = new DirectPrice(prevPrice.price, c, { isInverted });

            points.push({
                symbol : isInverted ? c.from : c.to,
                price
            });

            accumRate = accumRate * price.rate;
        });

        super(amount, accumRate, precision);
        this.points = points;
    }
}
