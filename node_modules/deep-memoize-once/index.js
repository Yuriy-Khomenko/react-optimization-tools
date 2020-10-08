'use strict'

const qcompare = require('qcompare');
const {qclone, qcloneStrict, qcloneCircular, qcloneStrictCircular } = require('qclone');

function deepMemoizeOnce(f, s) {
  let r, p = { length: null };
  if (s) {
    let cf;
    const { circular, strict } = s;
    if (circular && strict) {
      cf = qcloneStrictCircular;
    } else if (circular) {
      cf = qcloneCircular;
    } else if (strict) {
      cf = qcloneStrict;
    } else {
      cf = qclone;
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

module.exports = deepMemoizeOnce;