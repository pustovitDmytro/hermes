import Symbol from '../models/Symbol';
import LocalStore from '../store/LocalStore';

export default Backbone.Collection.extend({
    model : Symbol,
    store : new LocalStore()

});
