(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['get-pages'] = factory());
}(this, (function () { 'use strict';

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

return getPages;

})));
//# sourceMappingURL=get-pages.js.map
