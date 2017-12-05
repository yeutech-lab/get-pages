(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['get-pages'] = factory());
}(this, (function () { 'use strict';

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function getPages(routes) {
  var pages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var copy = [].concat(toConsumableArray(routes));
  function addRoutes(routes, parent) {
    var innerCopy = [].concat(toConsumableArray(routes));
    innerCopy.forEach(function (route) {
      parent[route.name] = route;
      route.childRoutes && addRoutes(route.childRoutes, route);
    });
  }
  addRoutes(copy, pages);
  return pages;
}

return getPages;

})));
//# sourceMappingURL=get-pages.js.map
