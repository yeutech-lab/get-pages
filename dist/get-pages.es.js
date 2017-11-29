function getPages(routes) {
  var pages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  function addRoutes(routes, parent) {
    routes.forEach(function (route) {
      parent[route.name] = route;
      route.childRoutes && addRoutes(route.childRoutes, route);
    });
  }
  addRoutes(routes, pages);
  return pages;
}

export default getPages;
//# sourceMappingURL=get-pages.es.js.map
