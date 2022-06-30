import Store from '../store/LocalStore';

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

export default function (method, model, options) {
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
}
