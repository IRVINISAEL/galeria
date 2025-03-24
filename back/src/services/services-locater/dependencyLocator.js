class DependencyLocator {
    factories = new Map();
    lazySingletons = new Map();

    static instance;

    constructor() {}

    bindFactory(token, fn) {
        this.factories.set(token, { type: 'factory', fn });
    }

    bindLazySingleton(token, fn) {
        this.factories.set(token, { type: 'LazySingleton', fn });
    }

    static getInstance() {
        if (!DependencyLocator.instance) {
            DependencyLocator.instance = new DependencyLocator();
        }
        return DependencyLocator.instance;
    }

    get(token) {
        const factory = this.factories.get(token);

        if (!factory) {
            throw new Error(`Dependency ${token} is not registered`);
        }

        if (factory.type === 'LazySingleton') {
            if (!this.lazySingletons.has(token)) {
                this.lazySingletons.set(token, factory.fn());
            }
            return this.lazySingletons.get(token);
        } else {
            return factory.fn();
        }
    }

    clear() {
        this.factories.clear();
        this.lazySingletons.clear();
    }
}

module.exports = DependencyLocator;
