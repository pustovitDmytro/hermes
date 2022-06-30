import Price from './Price';

export default class DirectPrice extends Price {
    constructor(amount, { price, precision }, { isInverted }) {
        super(
            amount,
            isInverted ? 1 / price : price,
            precision
        );
    }
}
