export default Backbone.Model.extend({
    initialize({ app, ...attributes }) {
        this.set({ attributes });
        this.set({ price: null });
        this.app = app;
        this.calculate();
        this.listenTo(this.app, 'change', this.calculate);
    },

    calculate() {
        const app = this.app;

        const { amount, symbol } = app.toJSON();


        if (amount && symbol) {
            const price = app.exchange.getPrice(amount, symbol, this.get('symbol'));

            this.set({
                rate  : price.rate,
                price : price.prettyPrice
            });
        }
    }
});
