The react-router `<Route />` components expect a few props described [here](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/Route.md).

Because an application use a list of routes, it is why having an array is more appropriate than an object.

Problem is that looping through an array, and recursively (`childRoutes`) won't look nice in user land code.  

**get-pages** allow you to quickly turn your array of `routes` into a `pages` object that can be used to access path and right readable links.

$PACKAGE_NAME allow consistency for page management across projects.
