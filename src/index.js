/* eslint-disable no-shadow, no-param-reassign, no-unused-expressions */
export default function getPages(routes, pages = {}) {
  function addRoutes(routes, parent) {
    routes.forEach((route) => {
      parent[route.name] = route;
      route.childRoutes && addRoutes(route.childRoutes, route);
    });
  }
  addRoutes(routes, pages);
  return pages;
}
/* eslint-enable no-shadow, no-param-reassign, no-unused-expressions */
