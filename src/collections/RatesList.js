import Rate from '../models/Rate';

export default Backbone.Collection.extend({
    model : Rate

    // nextOrder() {
    //     if (!this.length) return 1;

    //     return this.last().get('order') + 1;
    // },

    // comparator : 'order'

});
