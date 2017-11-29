# get-pages

get-pages is an utility that transform the `routes.js` configuration used for `<Route />`.

The react-router `<Route />` components expect a few props described [here](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/Route.md).

You might need to store part of the configuration somewhere in your business logic.

**get-pages** allow you to quickly turn your array of `routes` into a `pages` object that can be used to access path and right readable links.

It allow consistency for page access across projects.

**Master**

[![build status](https://module.kopaxgroup.com/api-front/get-pages/badges/master/build.svg)](https://module.kopaxgroup.com/api-front/get-pages/commits/master)
[![coverage report](https://module.kopaxgroup.com/api-front/get-pages/badges/master/coverage.svg)](https://module.kopaxgroup.com/api-front/get-pages/commits/master)

**Dev**

[![build status](https://module.kopaxgroup.com/api-front/get-pages/badges/dev/build.svg)](https://module.kopaxgroup.com/api-front/get-pages/commits/dev)
[![coverage report](https://module.kopaxgroup.com/api-front/get-pages/badges/dev/coverage.svg)](https://module.kopaxgroup.com/api-front/get-pages/commits/dev)

## Table of Contents

  - [Changelog](#changelog)
  - [How it work](#how-it-work)
  - [Installation](#installation)
  - [Reminders](#reminders)
  - [Quick start](#quick-start)
  - [Release](#release)
  - [License](#license)

---

## Changelog

  - View [Changelog](CHANGELOG.md)

## How it work

Your `routes.js` must be of type `Array` and can include `childRoutes` of type `Array`.

It will return an object construct of `{ [route.name]: route }`.

`childRoutes` are flattened in parent `[parent][route.name]` and are kept in `[parent].childRoutes` for faster accessibility.

This is how you would access a specific page in your routes array:

```jsx
const page = routes.filter((route) => route.name === 'dashboard')[0]
```

This is how you do with `get-pages`:

```jsx
import getPages from 'get-pages';
const pages = getPages(routes);
const page = page.dashboard;
```

Example: 

```jsx
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
```
  
## Installation

npm install:

    npm install git+ssh://git@module.kopaxgroup.com:20024/api-front/get-pages.git

## Reminders

**⚠️ When using this plugin, you must import in the first line of your application javascript entry file `babel-polyfill`: ⚠️**
  
    import "babel-polyfill";
    
To enable ES features in older browsers, you MUST include in the package.json

    "browserslist": ["ie >= 9", "last 2 versions"]
    // or
    "browserslist": ["ie >= 10", "last 2 versions"]

## Quick start

Clone project

    git clone ssh://git@module.kopaxgroup.com:20024/api-front/get-pages.git

Install dependencies

    npm install

Build project

    npm run build
    
Run unit test
     
    npm test
    
Watch unit test
     
    npm run test:watch

Watch the `/dist` directory

    npm run build:dist:watch

Watch the `/lib` directory

    npm run build:lib:watch

# Contribute

`master` is used to release the version. 

- `master` only accept merge requests from `dev`

`dev` is the developement branch. It should be used by developers for applying their merge requests.

If you wish to implement new functionalities you need to do a merge request including your change on the `dev` branch.

    git checkout dev
    git checkout $(whoami)-dev
    git push -u origin $(whoami)-dev 

You can now start working on your branch. Don't forget to check `Delete branch when merged`.

## Release

Merge `dev` into `master` will release a new version and prepare a new version in `dev`.

To release a new version, edit the [Changelog](CHANGELOG.md) and set the version in `package.json` and merge your change into `master`.

**⚠️ if you are releasing on a git repository instead of a npm repository, **DO NOT** forget to remove `build`, and `dist` from the `.gitignore` ⚠️**

    sed -i "/lib\|dist/d" .gitignore

## License

Copyright (c) 2017 Kopax Ltd. For more information `contact@kopaxgroup.com`. Made with [rollup-umd](https://module.kopaxgroup.com/dev-tools/rollup-umd/tags/0.3.4) 0.3.4
