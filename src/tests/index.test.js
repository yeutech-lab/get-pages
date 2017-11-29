import getPages from '../index';

describe('should exports', () => {
  it('should get pages', () => {
    expect(getPages([{
      name: 'hello',
      path: '/hello',
      childRoutes: [{
        name: 'world',
        path: '/hello/world',
        childRoutes: [{
          name: '2017',
          path: '/hello/world/2017',
        }],
      }],
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
            path: '/bye/forest/gump/1337',
          }],
        }],
      }],
    }])).toEqual({
      bye: {
        childRoutes: [{
          childRoutes: [{
            1337: {
              name: '1337', path: '/bye/forest/gump/1337',
            },
            childRoutes: [{
              name: '1337', path: '/bye/forest/gump/1337',
            }],
            name: 'gump',
            path: '/bye/forest/gump',
          }],
          gump: {
            1337: {
              name: '1337', path: '/bye/forest/gump/1337',
            },
            childRoutes: [{
              name: '1337', path: '/bye/forest/gump/1337',
            }],
            name: 'gump',
            path: '/bye/forest/gump',
          },
          name: 'forest',
          path: '/bye/forest',
        }],
        forest: {
          childRoutes: [{
            1337: {
              name: '1337', path: '/bye/forest/gump/1337',
            },
            childRoutes: [{
              name: '1337', path: '/bye/forest/gump/1337',
            }],
            name: 'gump',
            path: '/bye/forest/gump',
          }],
          gump: {
            1337: {
              name: '1337', path: '/bye/forest/gump/1337',
            },
            childRoutes: [{
              name: '1337', path: '/bye/forest/gump/1337',
            }],
            name: 'gump',
            path: '/bye/forest/gump',
          },
          name: 'forest',
          path: '/bye/forest',
        },
        name: 'bye',
        path: '/bye',
      },
      hello: {
        childRoutes: [{
          2017: {
            name: '2017', path: '/hello/world/2017',
          },
          childRoutes: [{
            name: '2017', path: '/hello/world/2017',
          }],
          name: 'world',
          path: '/hello/world',
        }],
        name: 'hello',
        path: '/hello',
        world: {
          2017: {
            name: '2017', path: '/hello/world/2017',
          },
          childRoutes: [{
            name: '2017', path: '/hello/world/2017',
          }],
          name: 'world',
          path: '/hello/world',
        },
      },
    });
  });
});
