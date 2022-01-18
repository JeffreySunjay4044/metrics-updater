const { createContainer, asValue, asClass, InjectionMode, Lifetime } = require('awilix');
function getScope() {
    if (process.env.ACTIVE_ENV === 'PRODUCTION') {
        return { lifetime: Lifetime.SINGLETON };
    }

    // tests need a new resolved instance everytime.
    const lifetimeForTests = Lifetime.TRANSIENT;
    return { lifetime: lifetimeForTests };
}


const container = createContainer({ injectionMode: InjectionMode.CLASSIC });

container.register({

    //------------------ CONFIG ------------------------
    //------------------ LOGGER ------------------------
    baseConfig: asValue(require('../config/baseConfig')),

});
container.register("utils",asClass(require('../utils/utils'), getScope()));
container.register("httpAdapter",asClass(require('../request/httpAdapter'), getScope()));

container.register("scrapMetrics",asClass(require('../jobs/scrapMetrics'), getScope()));
module.exports = container;
