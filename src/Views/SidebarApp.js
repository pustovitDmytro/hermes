import RatesList from '../collections/RatesList';
import SymbolsList from '../collections/SymbolsList';
import Binance from '../exchanges/Binance';
import RateView from './RateView';
import SymbolView from './SymbolView';
import './SidebarApp.scss';

const App = Backbone.Model.extend({
    async initialize() {
        this.exchange = new Binance();
        this._ready = this.exchange.init();

        this.Rates = new RatesList();
        this.Symbols = new SymbolsList();
        const availableSymbols = new Set();

        await this._ready;
        for (const rate of this.exchange.rates) {
            availableSymbols.add(rate.from);
            availableSymbols.add(rate.to);
        }

        // eslint-disable-next-line sonarjs/no-empty-collection
        for (const symbol of availableSymbols) {
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
    }
});

export default Backbone.View.extend({
    el : $('#app'),

    initialize() {
        this.amountInput = this.$('#input_amount');
        this.symbolInput = this.$('#input_symbol');
        this.model = new App();

        this.listenTo(this.model.Rates, 'add', this.addRate);
        this.listenTo(this.model.Symbols, 'add', this.addSymbol);
        this.listenTo(this.model, 'change', this.render);

        this.symbolInput.select2({
            placeholder : 'Currency',
            allowClear  : true
        });
        this.render();
    },

    events : {
        'change #input_amount' : 'updateAmount',
        'change #input_symbol' : 'updateSymbol'
    },

    updateAmount(e) {
        this.model.set({ amount: +e.target.value.trim() });
    },
    updateSymbol(e) {
        this.model.set({ symbol: e.target.value });
    },

    render() {
        const { amount, symbol } = this.model.toJSON();

        this.amountInput.val(amount);
        this.symbolInput.val(symbol);
        this.symbolInput.trigger('change');
    },

    addRate(item) {
        const view = new RateView({ model: item });

        this.$('#exchange_rates').append(view.render().el);
    },

    addSymbol(item) {
        const view = new SymbolView({ model: item });

        this.symbolInput.append(view.render().el);
    }

});
