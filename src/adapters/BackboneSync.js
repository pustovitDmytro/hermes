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

export default async function (method, model, options) {
    // eslint-disable-next-line no-param-reassign
    const store = model.store ||  model.collection.store;

    try {
        const resp = await request(store, method, model);

        model.trigger('sync', model, resp, options);
        if (options?.success) options.success(resp);
        // if (options?.complete) options.complete(resp);
    } catch (error) {
        if (options?.error) options.error(error);
    }
}
