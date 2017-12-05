"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPages;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* eslint-disable no-shadow, no-param-reassign, no-unused-expressions */
function getPages(routes) {
  var pages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var copy = [].concat(_toConsumableArray(routes));
  function addRoutes(routes, parent) {
    var innerCopy = [].concat(_toConsumableArray(routes));
    innerCopy.forEach(function (route) {
      parent[route.name] = route;
      route.childRoutes && addRoutes(route.childRoutes, route);
    });
  }
  addRoutes(copy, pages);
  return pages;
}
/* eslint-enable no-shadow, no-param-reassign, no-unused-expressions */

module.exports = exports["default"];