export default class Store {
    constructor() {
        this._items = new Map();
        this._seq = 1;
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

    findAll() {
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
