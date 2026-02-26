import { stackMiddlewares, authMiddlewareFactory, subscriptionsMiddlewareFactory, localesMiddlewareFactory } from "@/middlewareStack";

const middlewares = [authMiddlewareFactory, subscriptionsMiddlewareFactory, localesMiddlewareFactory];
export default stackMiddlewares(middlewares);