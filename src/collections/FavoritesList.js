import SyncStore from '../store/SyncStore';
import Favorite from '../models/Favorite';

export default Backbone.Collection.extend({
    model : Favorite,
    store : new SyncStore('favorites'),
    initialize(rates) {
        this._ratesList = rates;
        this.listenTo(rates, 'change', this.ratesListChange);
        this.listenTo(this, 'change', rates.favoritesListChange);
        this.listenTo(this, 'add', this.favoritesListAdd);
        this.listenTo(this, 'reset', this.favoritesListReset);
    },

    ratesListChange(r) {
        if (Object.keys(r.changed).includes('favorite')) {
            const { favorite, symbol } = r.toJSON();

            const favoriteItem = this.find(i => i.get('symbol') === symbol);

            if (favorite && !favoriteItem) this.create({ symbol });
            if (favoriteItem && !favorite) favoriteItem.destroy();
        }
    },

    favoritesListAdd(model) {
        const symbol = model.get('symbol');
        const rate = this._ratesList.find(s => s.get('symbol') === symbol);

        if (!rate) {
            this._ratesList.create({
                symbol,
                favorite : true
            });
        } else {
            rate.set({ favorite: true });
        }
    },

    favoritesListReset() {
        this.each(this.favoritesListAdd, this);
    }
});
