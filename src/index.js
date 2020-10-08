import React from 'react';
import qcompare from './utils';
import deepMemoizeOnce from 'deep-memoize-once';

const memoDeep = (component) => React.memo(component, qcompare);

function useMemoDeep(func, props) {
  const refInputs = useRef(null);

  if (!refInputs.current || !qcompare(refInputs.current.props, props)) {
    refInputs.current = { res: func(), props };
  }

  return refInputs.current.res;
}

function useCallbackDeep(func, props) {
  const refInputs = useRef(null);

  if (!refInputs.current || !qcompare(refInputs.current.props, props)) {
    refInputs.current = { res: func, props };
  }

  return refInputs.current.res;
}

export {
  memoDeep,
  useMemoDeep,
  useCallbackDeep,
  useMemo: useMemoDeep,
  useCallback: useCallbackDeep,
  deepMemoizeOnce
};
