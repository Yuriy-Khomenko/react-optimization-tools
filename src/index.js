'use strict';

const { useRef, memo } = require('react');
const compareDeep = require('./utils/compareDeep');
const memoizeDeep = require('./utils/memoizeDeep');

const memoDeep = (component) => memo(component, compareDeep);

function useMemoDeep(func, props) {
  const refInputs = useRef(null);
  if (!refInputs.current || !compareDeep(refInputs.current.props, props)) {
    refInputs.current = { res: func(), props };
  }
  return refInputs.current.res;
}

function useCallbackDeep(func, props) {
  const refInputs = useRef(null);
  if (!refInputs.current || !compareDeep(refInputs.current.props, props)) {
    refInputs.current = { res: func, props };
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
