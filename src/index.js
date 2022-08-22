'use strict';

const {
  qcloneCircular
} = require('qclone');
const {
  useRef,
  memo
} = require('react');
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

module.exports = {
  memoDeep,
  useMemoDeep,
  useCallbackDeep,
  memoizeDeep,
  compareDeep
};