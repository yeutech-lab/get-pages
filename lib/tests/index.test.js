'use strict';

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('should exports', function () {
  it('should get pages', function () {
    var routes = [{
      name: 'hello',
      path: '/hello',
      childRoutes: [{
        name: 'world',
        path: '/hello/world',
        childRoutes: [{
          name: '2017',
          path: '/hello/world/2017'
        }]
      }]
    }, {
      name: 'bye',
      path: '/bye',
      childRoutes: [{
        name: 'forest',
        path: '/bye/forest',
        childRoutes: [{
          name: 'gump',
          path: '/bye/forest/gump',
          childRoutes: [{
            name: '1337',
            path: '/bye/forest/gump/1337'
          }]
        }]
      }]
    }];
    var routesCopy = [].concat(routes);
    expect((0, _index2.default)(routes)).toEqual({
      bye: {
        childRoutes: [{
          childRoutes: [{
            1337: {
              name: '1337', path: '/bye/forest/gump/1337'
            },
            childRoutes: [{
              name: '1337', path: '/bye/forest/gump/1337'
            }],
            name: 'gump',
            path: '/bye/forest/gump'
          }],
          gump: {
            1337: {
              name: '1337', path: '/bye/forest/gump/1337'
            },
            childRoutes: [{
              name: '1337', path: '/bye/forest/gump/1337'
            }],
            name: 'gump',
            path: '/bye/forest/gump'
          },
          name: 'forest',
          path: '/bye/forest'
        }],
        forest: {
          childRoutes: [{
            1337: {
              name: '1337', path: '/bye/forest/gump/1337'
            },
            childRoutes: [{
              name: '1337', path: '/bye/forest/gump/1337'
            }],
            name: 'gump',
            path: '/bye/forest/gump'
          }],
          gump: {
            1337: {
              name: '1337', path: '/bye/forest/gump/1337'
            },
            childRoutes: [{
              name: '1337', path: '/bye/forest/gump/1337'
            }],
            name: 'gump',
            path: '/bye/forest/gump'
          },
          name: 'forest',
          path: '/bye/forest'
        },
        name: 'bye',
        path: '/bye'
      },
      hello: {
        childRoutes: [{
          2017: {
            name: '2017', path: '/hello/world/2017'
          },
          childRoutes: [{
            name: '2017', path: '/hello/world/2017'
          }],
          name: 'world',
          path: '/hello/world'
        }],
        name: 'hello',
        path: '/hello',
        world: {
          2017: {
            name: '2017', path: '/hello/world/2017'
          },
          childRoutes: [{
            name: '2017', path: '/hello/world/2017'
          }],
          name: 'world',
          path: '/hello/world'
        }
      }
    });
    expect(routes).toEqual(routesCopy);
  });
});