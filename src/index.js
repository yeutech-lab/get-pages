/* eslint-disable no-shadow, no-param-reassign, no-unused-expressions */
export default function getPages(routes, pages = {}) {
  const copy = [...routes];
  function addRoutes(routes, parent) {
    const innerCopy = [...routes];
    innerCopy.forEach((route) => {
      parent[route.name] = route;
      route.childRoutes && addRoutes(route.childRoutes, route);
    });
  }
  addRoutes(copy, pages);
  return pages;
}
/* eslint-enable no-shadow, no-param-reassign, no-unused-expressions */
