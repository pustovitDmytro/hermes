
import Plus from '../icons/app/plus.svg';
import App from '../models/App';
import RateView from './RateView';
import SymbolView from './SymbolView';
import styles from './SidebarApp.scss';
import template from './SidebarApp.html';


export default Backbone.View.extend({
    el : $('#app'),

    initialize() {
        $(this.el).append(template({ styles }));
        this.amountInput = this.$('input[name=amount]');
        this.symbolInput = this.$('select[name=symbol]');
        this.addSymbolInput = this.$('select[name=add_symbol]');
        this.addRateBtn = this.$('#add_symbol');
        this.model = new App();

        this.listenTo(this.model.Rates, 'add', this.addRate);
        this.listenTo(this.model.Symbols, 'add', this.addSymbol);
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'ready', this.appReady);

        this.symbolInput.select2({
            placeholder : 'Currency',
            allowClear  : true
        });

        this.addSymbolInput.select2({ placeholder: 'Currency' });

        this.addRateBtn.append(Plus);
        this.render();
    },

    appReady() {
        $('#app_loader').remove();
        $(this.el).removeClass('isLoading');
    },

    events : {
        'change input[name=amount]'  : 'updateAmount',
        'change select[name=symbol]' : 'updateSymbol',
        'click #add_symbol'          : 'handleAddSymbolClick'
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

    handleAddSymbolClick() {
        const symbol = this.addSymbolInput.val();

        if (symbol) this.model.crateRate(symbol);
    },

    addRate(item) {
        const view = new RateView({ model: item });

        this.$('#exchange_rates').append(view.render().el);
    },

    addSymbol(item) {
        const view = new SymbolView({ model: item });
        const addView = new SymbolView({ model: item });

        this.symbolInput.append(view.render().el);
        this.addSymbolInput.append(addView.render().el);
    }

});
