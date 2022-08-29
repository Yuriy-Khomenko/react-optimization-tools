'use strict';

const { qcloneCircular } = require('qclone');
const { useRef, memo } = require('react');
const compareDeep = require('./utils/compareDeep');
const memoizeDeep = require('./utils/memoizeDeep');

const memoDeep = (component) => memo(component, compareDeep);

function useMemoDeep(func, props, isCloneProps = false) {
  const refInputs = useRef(null);
  if (props.length === 0 && refInputs.current) {
    return refInputs.current.res;
  }
  if (!refInputs.current || !compareDeep(refInputs.current.props, props)) {
    refInputs.current = {
      res: func(),
      props: isCloneProps ? qcloneCircular(props) : props
    };
  }
  return refInputs.current.res;
}

function useCallbackDeep(func, props, isCloneProps = false) {
  const refInputs = useRef(null);
  if (props.length === 0 && refInputs.current) {
    return refInputs.current.res;
  }
  if (!refInputs.current || !compareDeep(refInputs.current.props, props)) {
    refInputs.current = {
      res: func,
      props: isCloneProps ? qcloneCircular(props) : props
    };
  }
  return refInputs.current.res;
}

function staticCallback(that, fn, key, props = [], isCloneProps = false) {
  if (!that.reactOptimizationTools) {
    that.reactOptimizationTools = {};
  }
  const entity = that.reactOptimizationTools[key];
  if (!entity) {
    that.reactOptimizationTools[key] = {fn, props};
    return fn;
  }
  if (props.length === 0) {
    return entity.fn;
  }
  if (qcompare(props, entity.props)) {
    return entity.fn;
  }
  entity.fn = fn;
  entity.props = isCloneProps ? qcloneCircular(props) : props;
  return fn;
}

module.exports = {
  memoDeep,
  useMemoDeep,
  useCallbackDeep,
  memoizeDeep,
  compareDeep,
  staticCallback
};