'use strict';

const {
  qcloneCircular
} = require('qclone');
const {
  useRef,
  memo,
  useEffect
} = require('react');
const compareDeep = require('./utils/compareDeep');
const memoizeDeep = require('./utils/memoizeDeep');

const memoDeep = (component) => memo(component, compareDeep);

const useMemoDeep = (func, deps, isCloneProps = false) => {
  const ref = useRef(null);
  if (deps && deps.length === 0 && ref.current) {
    return ref.current.res;
  }
  if (!ref.current || !compareDeep(ref.current.deps, deps)) {
    ref.current = {
      res: func(),
      deps: isCloneProps ? qcloneCircular(deps) : deps
    };
  }
  return ref.current.res;
};

const useMemoDeepSE = (func, deps, isCloneProps = false) => {
  const ref = useRef();

  useEffect(() => {
    if (deps && deps.length && !compareDeep(ref.current.deps, deps)) {
      ref.current = {
        res: func(),
        deps: isCloneProps ? qcloneCircular(deps) : deps,
      };
    }
  });

  if (ref.current) {
    return ref.current.res
  }

  const res = func();

  ref.current = {
    res,
    deps: isCloneProps ? qcloneCircular(deps) : deps,
  };

  return res;
};

const useCallbackDeep = (func, deps, isCloneProps = false) => {
  const ref = useRef(null);
  if (deps && deps.length === 0 && ref.current) {
    return ref.current.res;
  }
  if (!ref.current || !compareDeep(ref.current.deps, deps)) {
    ref.current = {
      res: func,
      deps: isCloneProps ? qcloneCircular(deps) : deps
    };
  }
  return ref.current.res;
};

const useCallbackDeepSE = (func, deps, isCloneProps = false) => {
  const ref = useRef();

  useEffect(() => {
    if (deps && deps.length && !compareDeep(ref.current.deps, deps)) {
      ref.current = {
        res: func,
        deps: isCloneProps ? qcloneCircular(deps) : deps,
      };
    }
  });

  if (ref.current) {
    return ref.current.res
  }

  const res = func;

  ref.current = {
    res,
    deps: isCloneProps ? qcloneCircular(deps) : deps,
  };

  return res;
};

const staticCallback = (that, fn, key, props = [], isCloneProps = false) => {
  if (!that.reactOptimizationTools) {
    that.reactOptimizationTools = {};
  }
  const entity = that.reactOptimizationTools[key];
  if (!entity) {
    that.reactOptimizationTools[key] = {
      fn,
      props
    };
    return fn;
  }
  if (props.length === 0) {
    return entity.fn;
  }
  if (compareDeep(props, entity.props)) {
    return entity.fn;
  }
  entity.fn = fn;
  entity.props = isCloneProps ? qcloneCircular(props) : props;
  return fn;
};

const useEffectDeep = (func, deps) => {
  const ref = useRef(null);
  const {
    current
  } = ref;
  let isEqual = null;

  if (deps && deps.length) {
    isEqual = compareDeep(current, deps);
  }

  if (isEqual === false || !current) {
    ref.current = deps;
  }

  useEffect(func, ref.current);
};

const useEvent = (func) => {
  const funcRef = useRef(func);

  const staticFuncRef = useRef((...args) => {
    return funcRef.current(...args);
  });

  funcRef.current = func;
  return staticFuncRef.current;
};

module.exports = {
  memoDeep,
  memoizeDeep,
  compareDeep,
  staticCallback,
  useMemoDeep,
  useMemoDeepSE,
  useCallbackDeep,
  useCallbackDeepSE,
  useEffectDeep,
  useEvent
};