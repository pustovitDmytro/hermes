export default Backbone.Model.extend({
    initialize(attributes) {
        const app = window._app;

        this.set({ attributes });
        this.set({ price: null });
        this.calculate(app);
        this.listenTo(app, 'change', this.calculate);
    },

    calculate(app) {
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
