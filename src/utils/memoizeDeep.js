'use strict'

const qcompare = require('./compareDeep');

function memoizeDeep(f, s) {
  let r, p = { length: null };
  if (s) {
    let cf;
    const { circular, strict } = s;
    if (circular && strict) {
      cf = require('qclone/qcloneStrictCircular');
    } else if (circular) {
      cf = require('qclone/qcloneCircular');
    } else if (strict) {
      cf = require('qclone/qcloneStrict');
    } else {
      cf = require('qclone');
    }
    return function (...a) {
      let q = a.length;
      if (q === p.length) {
        for (let i = 0; i < q; i++) {
          if (a[i] === p[i]) continue;
          if (!qcompare(a[i], p[i])) {
            const rf = f.apply(this, a);
            p = cf(a);
            r = cf(rf);
            return rf;
          }
        }
        return r;
      }
      const rf = f.apply(this, a);
      p = cf(a);
      r = cf(rf);
      return rf;
    };
  } else {
    return function (...a) {
      let q = a.length;
      if (q === p.length) {
        for (let i = 0; i < q; i++) {
          if (a[i] === p[i]) continue;
          if (!qcompare(a[i], p[i])) {
            r = f.apply(this, a);
            p = a;
            return r;
          }
        }
        return r;
      }
      r = f.apply(this, a);
      p = a;
      return r;
    };
  }
}

module.exports = memoizeDeep;