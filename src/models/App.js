import RatesList from '../collections/RatesList';
import SymbolsList from '../collections/SymbolsList';
import Binance from '../exchanges/Binance';

export default Backbone.Model.extend({
    async initialize() {
        this.exchange = new Binance();
        this._ready = this.exchange.init();

        this.Rates = new RatesList();
        this.Symbols = new SymbolsList();
        this.availableSymbols = new Set();

        await this._ready;
        this.trigger('ready');

        for (const rate of this.exchange.rates) {
            this.availableSymbols.add(rate.from);
            this.availableSymbols.add(rate.to);
        }

        // eslint-disable-next-line sonarjs/no-empty-collection
        for (const symbol of this.availableSymbols) {
            this.Symbols.create({
                id   : symbol,
                name : symbol,
                app  : this
            });
        }

        const ITEMS = [ 'BTC', 'USDT', 'UAH' ];

        ITEMS.forEach(symbol => this.Rates.create({
            symbol,
            favorite : true,
            app      : this
        }));
    },

    crateRate(symbol) {
        this.Rates.create({
            symbol,
            favorite : false,
            app      : this
        });
    }
});
