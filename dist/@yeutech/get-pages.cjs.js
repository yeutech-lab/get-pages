'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function getPages(routeConfig) {
  var pages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var copy = _toConsumableArray(routeConfig);
  function addRoutes(routes, parent) {
    var innerCopy = _toConsumableArray(routes);
    innerCopy.forEach(function (route) {
      parent[route.name] = route;
      route.childRoutes && addRoutes(route.childRoutes, route);
    });
  }
  addRoutes(copy, pages);
  return pages;
}

exports.default = getPages;
//# sourceMappingURL=get-pages.cjs.js.map
