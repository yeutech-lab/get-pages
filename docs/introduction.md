[![build status]($CI_PROJECT_URL/badges/$PACKAGE_VERSION/build.svg)]($CI_PROJECT_URL/commits/$PACKAGE_VERSION)
[![coverage report]($CI_PROJECT_URL/badges/$PACKAGE_VERSION/coverage.svg)]($CI_PROJECT_URL/commits/$PACKAGE_VERSION)

![image](https://img.shields.io/badge/version-$PACKAGE_VERSION-green.svg)
![image](https://img.shields.io/badge/node-$NODE_VERSION-brightgreen.svg)
![image](https://img.shields.io/badge/npm-$NPM_VERSION-red.svg)
![image]($IMG_SHIELD_PUBLISHING)

$PACKAGE_DESCRIPTION.

```bash
npm install --save theme-customizer
```

## Setting-up

### Reducer
Import the *reducer* and the *store ID* from the `theme-customizer` package.

```jsx static
import themeCustomizerReducer from 'theme-customizer/lib/reducer';
import { STORE_ID as THEME_CUSTOMIZER_STORE_ID } from 'theme-customizer/lib/constants';
```

Add it to your application's reducer:

```jsx static
export default function createReducer(asyncReducers) {
  return combineReducers({
    [THEME_CUSTOMIZER_STORE_ID]: themeCustomizerReducer,
    ...asyncReducers,
  });
}
```

If you are using the Bootstrap Styled theme by default, you don't have to add the *theme* to your reducer as it is set by default.
However, if you are using a customized theme or, themes from other modules, you **MUST** add your theme to the `reducer`.

```jsx static
import theme from 'theme';
...
  return combineReducers({
    [THEME_CUSTOMIZER_STORE_ID]: themeCustomizerReducer(theme),
    ...asyncReducers,
  });
```
