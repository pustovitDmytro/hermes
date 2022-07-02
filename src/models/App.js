import RatesList from '../collections/RatesList';
import SymbolsList from '../collections/SymbolsList';
import FavoritesList from '../collections/FavoritesList';
import Binance from '../exchanges/Binance';

export default Backbone.Model.extend({
    async initialize() {
        window._app = this;
        // eslint-disable-next-line no-async-promise-executor
        this._ready = new Promise(async resolve => {
            this.exchange = new Binance();
            this.Rates = new RatesList();
            this.Symbols = new SymbolsList();
            this._Favorites = new FavoritesList(this.Rates);
            const availableSymbols = new Set();

            await Promise.all([
                this._Favorites.fetch(),
                this.exchange.init()
            ]);

            for (const rate of this.exchange.rates) {
                availableSymbols.add(rate.from);
                availableSymbols.add(rate.to);
            }

            // eslint-disable-next-line sonarjs/no-empty-collection
            for (const symbol of availableSymbols) {
                this.Symbols.create({
                    id   : symbol,
                    name : symbol
                });
            }

            this.trigger('ready');
            resolve();
        });
        await this._ready;
    },

    crateRate(symbol) {
        this.Rates.create({
            symbol,
            favorite : false
        });
    }
});
