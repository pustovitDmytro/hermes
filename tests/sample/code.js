/* eslint-disable max-lines-per-function */
/* eslint-disable import/unambiguous */

const ITEMS = [ '10 BTC', '1 USDT', '30 UAH', '0.00000001 BTC' ];
const ENTER = 13;

class Store {
    constructor(items = []) {
        this._items = new Map(items.map(item => ([ item.id, item ])));
        this._seq = this._items.size;
    }

    create(item) {
        this._seq++;
        const id = item.id || this._seq;
        const stored = { ...item, id };

        this._items.set(this._items.size, stored);

        return stored;
    }

    findOne(item) {
        return this._items.get(item.id);
    }

    findOne() {
        return [ ...this._items ].map((id, value) => value);
    }

    update(item) {
        this._items.set(item.id, item);

        return item;
    }

    destroy(item) {
        this._items.delete(item.id);

        return item;
    }
}


function request(store, method, model) {
    switch (method) {
        case 'read':
            return model.id
                ? store.findOne(model)
                : store.findAll();
        case 'create':
            return store.create(model);
        case 'update':
            return store.update(model);
        case 'delete':
            return store.destroy(model);
        default: throw new Error(`Unrecognized method ${method}`);
    }
}

$(() =>  {
    Backbone.sync = function (method, model, options) {
        // eslint-disable-next-line no-param-reassign
        if (!model.collection.store) model.collection.store = new Store();
        const resp = request(model.collection.store, method, model);

        if (resp) {
            model.trigger('sync', model, resp, options);
            // if (options && options.success) {
            //     options.success(resp);
            // }
        }

        // if (options && options.complete) options.complete(resp);
    };

    const Item = Backbone.Model.extend({});

    const ItemList = Backbone.Collection.extend({
        model : Item,
        valid() {
            return this.where({ valid: true });
        },

        nextOrder() {
            if (!this.length) return 1;

            return this.last().get('order') + 1;
        },

        comparator : 'order'

    });

    const Items = new ItemList();

    const ItemView = Backbone.View.extend({
        tagName  : 'li',
        template : _.template($('#item-template').html()),

        events : {
            'dblclick .view'  : 'edit',
            'click a.destroy' : 'clear',
            'keypress .edit'  : 'updateOnEnter'
        },

        initialize() {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },

        render() {
            this.$el.html(this.template(this.model.toJSON()));
            this.input = this.$('.edit');

            return this;
        },

        edit() {
            this.$el.addClass('editing');
            this.input.focus();
        },

        // Close the `"editing"` mode, saving changes to the todo.
        close() {
            const value = this.input.val();

            if (!value) {
                this.clear();
            } else {
                this.model.save({ title: value });
                this.$el.removeClass('editing');
            }
        },

        updateOnEnter(e) {
            if (e.keyCode === ENTER) this.close();
        },

        clear() {
            this.model.destroy();
        }

    });

    const AppView = Backbone.View.extend({
        el     : $('#app'),
        events : {
            'keypress #new-item' : 'createOnEnter'
        },

        initialize() {
            this.input = this.$('#new-item');

            this.listenTo(Items, 'add', this.addOne);
            this.listenTo(Items, 'reset', this.resetAll);
            this.listenTo(Items, 'all', this.render);


            this.footer = this.$('footer');
            this.main = $('#main');
            ITEMS.forEach(txt => Items.create({ raw: txt }));
        },

        statsTemplate : _.template($('#stats-template').html()),

        render() {
            const valid = Items.valid().length;

            if (Items.length > 0) {
                this.main.show();
                this.footer.show();
                this.footer.html(this.statsTemplate({ valid }));
            } else {
                this.main.hide();
                this.footer.hide();
            }
        },

        addOne(item) {
            const view = new ItemView({ model: item });

            this.$('#item-list').append(view.render().el);
        },

        resetAll() {
            _.invoke(Items.custom(), 'destroy');
        },

        createOnEnter(e) {
            if (e.keyCode !== ENTER) return;
            if (!this.input.val()) return;

            Items.create({ raw: this.input.val() });
            this.input.val('');
        }

    });

    window._appView = new AppView();
});
