import { createRoute, RouteConfig } from "@hono/zod-openapi";

type RoutingPath<P extends string> =
  P extends `${infer Head}/{${infer Param}}${infer Tail}`
    ? `${Head}/:${Param}${RoutingPath<Tail>}`
    : P;

export class RouteFactory {
  private routeConfig: RouteConfig;
  constructor(routeConfig: RouteConfig) {
    this.routeConfig = routeConfig;
  }

  route<P extends string, R extends Omit<RouteConfig, "path"> & { path: P }>(
    config: R
  ): R & {
    getRoutingPath(): RoutingPath<R["path"]>;
  } {
    const mergedConfig = {
      ...this.routeConfig,
      ...config,
    };
    return createRoute(mergedConfig);
  }
}
