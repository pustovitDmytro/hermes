export default class Price {
    constructor(amount, rate = 1, precision = 8) {
        this.rate = rate;
        this.price = this.rate * amount;
        this.precision = precision;
    }

    get prettyPrice() {
        return this.price.toFixed(this.precision).toString(); // TODO: drop trailing spaces
    }
}
