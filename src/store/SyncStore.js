import { v4 as uuid } from 'uuid';
import browser from '../browser';
import { version } from '../manifest.json';

const { storage } = browser;

export default class SyncStore {
    constructor(prefix) {
        this._items = [];
        this._prefix = prefix;
    }

    async create(item) {
        const id = item.id || uuid();
        const stored = { ...item.toJSON(), id, version };

        this._items.push(stored);
        await storage.sync.set({ [this._prefix]: this._items });

        return stored;
    }

    // async findOne(item) {
    // }

    async cleanup() {
        await storage.sync.remove(this._prefix);
    }

    async findAll() {
        const stored = await storage.sync.get(this._prefix);
        const scoped = stored[this._prefix];

        if (!scoped) return [];

        this._items = scoped;

        return this._items;
    }

    // async update(item) {
    // }

    async destroy(item) {
        this._items = this._items.filter(i => i.id !== item.id);
        await storage.sync.set({ [this._prefix]: this._items });

        return item;
    }
}
