export default function getPages(routeConfig, pages = {}) {
  const copy = [...routeConfig];
  function addRoutes(routes, parent) {
    const innerCopy = [...routes];
    innerCopy.forEach((route) => {
      parent[route.name] = route; // eslint-disable-line no-param-reassign
      route.childRoutes && addRoutes(route.childRoutes, route); // eslint-disable-line no-unused-expressions
    });
  }
  addRoutes(copy, pages);
  return pages;
}
