export default class Price {
    constructor(amount, rate = 1, precision = 8) {
        this.rate = rate;
        this.price = this.rate * amount;
        this.precision = precision;
    }

    get prettyPrice() {
        const str = this.price.toFixed(this.precision).toString();

        if (!str.includes('.')) return str;

        let trimFrom = str.length;

        for (const char of [ ...str ].reverse()) {
            if (char === '0') {
                trimFrom--; continue;
            }

            if (char === '.') {
                trimFrom--; break;
            }

            break;
        }


        return  str.slice(0, trimFrom);
    }
}
