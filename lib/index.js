"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPages;
/* eslint-disable no-shadow, no-param-reassign, no-unused-expressions */
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
/* eslint-enable no-shadow, no-param-reassign, no-unused-expressions */

module.exports = exports["default"];