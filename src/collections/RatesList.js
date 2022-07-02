import Rate from '../models/Rate';
import LocalStore from '../store/LocalStore';

export default Backbone.Collection.extend({
    model : Rate,
    store : new LocalStore(),

    // nextOrder() {
    //     if (!this.length) return 1;

    //     return this.last().get('order') + 1;
    // },

    // comparator : 'order'

    favoritesListChange(f) {
        console.log('favoritesListChange');
        if (Object.keys(f.changed).includes('favorite')) {
            console.log('favoritesListChange:', f.toJSON());
        }
    },

    favoritesListAdd() {
        console.log('favoritesListAdd');
    }
});
