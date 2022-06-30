export default class Store {
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


// const { storage } = browser;

// storage.sync.set({
//     '7f7cf8bd-0b46-5459-b777-004943e4f304' : 1,
//     '079ac157-bcde-50d1-8128-37189e6af9df' : 2
// });

// console.log(111_111, storage.sync.get('079ac157-bcde-50d1-8128-37189e6af9df'));
