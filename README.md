## react-optimization-tools
Set of the fastest tools for optimizing the work of a React application

### Install
npm install --save react-optimization-tools

### Features

The set includes six algorithms: four functions (memoDeep, memoizeDeep, compareDeep, staticCallback) and two hooks (useMemoDeep, useCallbackDeep). They use deep comparison for equality.
They are all based on a modified version of the [qcompare](https://github.com/Yuriy-Khomenko/qcompare) function, which according to the author is the fastest comparison function in the industry.

#### 1. memoDeep
If the props are not changed, the component is not rendered. Analog [React.memo](https://reactjs.org/docs/react-api.html#reactmemo) but with deep comparison.

Example of use:
```javascript
import React from 'react';
import { memoDeep } from 'react-optimization-tools';

const Component = (props) => {...};
export default memoDeep(Component);
```

#### 2. memoizeDeep
Remembers the last result of the function. Analog [memoize-one](https://github.com/alexreardon/memoize-one) but with deep comparison and better performance. Based on project [deepMemoizeOnce](https://github.com/Yuriy-Khomenko/deep-memoize-once).

Example of use:
- 2.1.
```javascript
import { memoizeDeep } from 'react-optimization-tools';

const memoFunc = memoizeDeep((arg) => {...});// heavy computation function

const mapStateToProps = ({ data }) => {
    return {
    propValue: memoFunc(data)
  }}
  ```

- 2.2. ([reselect](https://github.com/reduxjs/reselect))
```javascript
import { createSelectorCreator } from 'reselect';
import { memoizeDeep } from 'react-optimization-tools';

const customSelectorCreator = createSelectorCreator(memoizeDeep);
// or
const customSelectorCreator = createSelectorCreator(memoizeDeep, {
  circular: true,
  strict: true
});

const selector = customSelectorCreator(
  state => state.a,
  state => state.b,
  (a, b) => {...}
);
```

#### 3. compareDeep
Function of fast deep comparison of two values.

Example of use:
- 3.1. ([reselect](https://github.com/reduxjs/reselect))
```javascript
import { createSelectorCreator, defaultMemoize } from 'reselect';
import { compareDeep } from 'react-optimization-tools';

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  compareDeep
)

const mySelector = createDeepEqualSelector(
  state => state.a,
  values => {...}
)
```

- 3.2. ([React.memo](https://reactjs.org/docs/react-api.html#reactmemo))
```javascript
import React from 'react';
import { compareDeep } from 'react-optimization-tools';

const MemoComponent = React.memo(Component, compareDeep);
// or
export default React.memo(Component, compareDeep);
```

- 3.3. ([shouldComponentUpdate](https://reactjs.org/docs/optimizing-performance.html#shouldcomponentupdate-in-action))
```javascript
import React from 'react';
import { compareDeep } from 'react-optimization-tools';

class Component extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !compareDeep(this.props, nextProps);
  }
  render() {...}
}
```

#### 4. useMemoDeep
Hook for memoizing the result of the function with unchanged values of the input parameters. Similar to [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo), but with a deep comparison.
The arguments of the hook: useMemoDeep(func, props, isCloneProps = false)

Example of use:
```javascript
import React, { useState } from 'react';
import { useMemoDeep } from 'react-optimization-tools';

const Component = () => {
const [ count, setCount ] = useState(0);

// ! attention is memoized result of the function !
const res = useMemoDeep(() => {...}, [count]);

return(...)
}
```

#### 5. useCallbackDeep
Hook for memoizing a reference to a function with unchanged values of input parameters. Similar to [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback), but with a deep comparison.
The arguments of the hook: useCallbackDeep(func, props, isCloneProps = false)

Example of use:
```javascript
import React, { useState } from 'react';
import { useCallbackDeep } from 'react-optimization-tools';

const Component = () => {
const [ count, setCount ] = useState(0);

// ! attention is memoized function reference !
const funcRef = useCallbackDeep(() => {...}, [count]);

return(...)
}
```

#### 6. staticCallback
Function for memoizing a reference to a function with unchanged values of input parameters. Similar to [useCallbackDeep](https://github.com/Yuriy-Khomenko/react-optimization-tools#5-usecallbackdeep), but for class components. Used in cases when it is difficult to create functions in the main definition of the class, as in the example below.
The arguments of the function: staticCallback(context, function, key, props = [], isCloneProps = false)

Example of use:
```javascript
import React, { PureComponent } from 'react';
import { staticCallback } from 'react-optimization-tools';
import GalleryItem from './components/GalleryItem';


class Gallery extends PureComponent {
  sc = (fn, key, props) => staticCallback(this, fn, key, props);

  render() {
    const { sc, props: { items } } = this;
    return (
      <div>
        {items.map((props, index) => {
          const { hash } = props;

          return (
            <GalleryItem
              onDragStart={staticCallback(this, (event) => this.dragStart(event, index), `onDragStart${hash}`, [index])}
              onDragEnd={staticCallback(this, (event) => this.dragEnd(event, index), `onDragEnd${hash}`, [index])}
              // or        
              onDragStart={sc((event) => this.dragStart(event, index), `onDragStart${hash}`, [index])}
              onDragEnd={sc((event) => this.dragEnd(event, index), `onDragEnd${hash}`, [index])}
              {...props}
            />
          );
        })}
      </div>
    );
  }
}
```

### Benchmarks
The algorithms are based on the speed of the modified algorithm of the [qcompare](https://github.com/Yuriy-Khomenko/qcompare) project. The modification was related to the ability to work with React components. Therefore, the performance of this algorithm was compared with similar projects. Performance tests were used from these projects.

```
Nodejs - v14.9.0
Date - 14.10.2020
```

[react-fast-compare](https://github.com/FormidableLabs/react-fast-compare) project test result

```
--- speed tests: generic usage ---
qcompare x 140,332 ops/sec ±0.44% (92 runs sampled)
react-fast-compare x 97,891 ops/sec ±1.27% (88 runs sampled)
fast-deep-equal x 94,725 ops/sec ±1.04% (90 runs sampled)
lodash.isEqual x 16,635 ops/sec ±24.04% (91 runs sampled)
nano-equal x 93,555 ops/sec ±0.27% (90 runs sampled)
shallow-equal-fuzzy x 54,279 ops/sec ±0.43% (89 runs sampled)
  fastest: qcompare

--- speed tests: generic and react ---
qcompare x 64,123 ops/sec ±0.59% (88 runs sampled)
react-fast-compare x 44,744 ops/sec ±0.70% (88 runs sampled)
fast-deep-equal x 33,168 ops/sec ±0.37% (89 runs sampled)
lodash.isEqual x 3,085 ops/sec ±10.04% (87 runs sampled)
  fastest: qcompare
```

### License

MIT Yuriy Khomenko