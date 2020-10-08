## deepMemoizeOnce

the fastest memoization library for memoizing JS functions that remembers the last result with deep argument comparison

### Install

npm install --save deep-memoize-once

### Usage

```javascript
const deepMemoizedOnce = require('deep-memoize-once');

const multiply = (a, b) => a * b;
const memoizedFunc = deepMemoizedOnce(multiply);

memoizedFunc(2, 3); // result is calculated
memoizedFunc(2, 3); // result from cache
memoizedFunc(5, 7); // result is calculated
```

the second argument can be passed an object with settings for cloning the values of the arguments and the return value:
- circular: true - circular dependency support;
- strict: true - strict cloning;

```javascript
const memoizedFunc = deepMemoizedOnce(func, {
  circular: true,
  strict: true,
});
```

### Features

- Remembers only the last result of the function and arguments;
- Uses deep argument comparison;
- Fast memoization, this function can be used wherever [memoize-one](https://github.com/alexreardon/memoize-one)  is used, with the best result;
- Memoized function must be without side effects;

### Benchmarks

For more balanced testing of performance, tests of other projects were used

```
Nodejs - v14.9.0
Date - 30.09.2020
```

[memoize-state](https://github.com/theKashey/memoize-state) project test result

```
function of 3 arguments, all unchanged
base            x            5536 ops/sec ±18.80% (6 runs sampled)  hitratio 0% 2967 /2967
memoize-one     x         9516391 ops/sec ±8.92% (5 runs sampled)  hitratio 100% 1 /5362078
lodash.memoize  x         3360876 ops/sec ±2.40% (6 runs sampled)  hitratio 100% 1 /6912821
fast-memoize    x          505972 ops/sec ±3.97% (6 runs sampled)  hitratio 100% 1 /7184118
memoize-state   x         3147439 ops/sec ±7.35% (6 runs sampled)  hitratio 100% 1 /8648142
deepMemoizeOnce x        17196055 ops/sec ±5.91% (5 runs sampled)  hitratio 100% 1 /16758976
Fastest is deepMemoizeOnce
    √ compare simple function

function of 1 arguments, object unchanged
base            x        92630311 ops/sec ±1.09% (6 runs sampled)  hitratio 100% 0 /48901155
memoize-one     x        57745002 ops/sec ±7.35% (6 runs sampled)  hitratio 100% 0 /80308173
lodash.memoize  x         5327520 ops/sec ±8.64% (5 runs sampled)  hitratio 100% 0 /82831261
fast-memoize    x        41636405 ops/sec ±6.17% (6 runs sampled)  hitratio 100% 0 /104220777
memoize-state   x         3488330 ops/sec ±7.53% (6 runs sampled)  hitratio 100% 0 /106198061
deepMemoizeOnce x        38448140 ops/sec ±26.44% (6 runs sampled)  hitratio 100% 0 /128352249
Fastest is base
    √ dry run. empty function calling object, not returning

function of 1 arguments, object unchanged
base            x        91134604 ops/sec ±4.61% (6 runs sampled)  hitratio 100% 0 /44366172
memoize-one     x        57490305 ops/sec ±6.63% (5 runs sampled)  hitratio 100% 0 /70455271
lodash.memoize  x         5203014 ops/sec ±14.47% (6 runs sampled)  hitratio 100% 0 /73079097
fast-memoize    x        20673835 ops/sec ±9.01% (6 runs sampled)  hitratio 100% 0 /83847783
memoize-state   x         3447027 ops/sec ±3.65% (6 runs sampled)  hitratio 100% 0 /85314682
deepMemoizeOnce x        43291749 ops/sec ±12.43% (6 runs sampled)  hitratio 100% 0 /107617897
Fastest is base
    √ dry run. empty function calling object

function of 2 arguments, providing 3, all unchanged
base            x            6041 ops/sec ±7.30% (5 runs sampled)  hitratio 0% 2818 /2818
memoize-one     x         9325150 ops/sec ±11.41% (6 runs sampled)  hitratio 100% 1 /4871330
lodash.memoize  x         2750232 ops/sec ±7.93% (5 runs sampled)  hitratio 100% 1 /6175594
fast-memoize    x          512512 ops/sec ±6.41% (6 runs sampled)  hitratio 100% 1 /6402350
memoize-state   x         2942902 ops/sec ±7.92% (6 runs sampled)  hitratio 100% 1 /7853654
deepMemoizeOnce x        12063030 ops/sec ±8.11% (6 runs sampled)  hitratio 100% 1 /14767111
Fastest is deepMemoizeOnce
    √ compare simple function

function of 3 arguments, all changed / 10
base            x            5391 ops/sec ±17.20% (6 runs sampled)  hitratio 0% 2209 /2209
memoize-one     x           12628 ops/sec ±3.53% (5 runs sampled)  hitratio 56% 8324 /18857
lodash.memoize  x           19529 ops/sec ±5.30% (6 runs sampled)  hitratio 91% 2595 /27507
fast-memoize    x           12047 ops/sec ±1.15% (5 runs sampled)  hitratio 86% 5276 /38060
memoize-state   x           11817 ops/sec ±5.13% (6 runs sampled)  hitratio 95% 1953 /41965
deepMemoizeOnce x           12306 ops/sec ±6.11% (6 runs sampled)  hitratio 96% 2048 /46062
Fastest is lodash.memoize
    √ compare unique params function

function with an object as argument, returning a part
base            x            6146 ops/sec ±4.81% (6 runs sampled)  hitratio 0% 3202 /3202
memoize-one     x            6100 ops/sec ±5.81% (5 runs sampled)  hitratio 54% 2747 /5950
lodash.memoize  x          873815 ops/sec ±37.62% (6 runs sampled)  hitratio 100% 1 /478404
fast-memoize    x          571642 ops/sec ±7.74% (6 runs sampled)  hitratio 100% 1 /782347
memoize-state   x         1191328 ops/sec ±8.49% (6 runs sampled)  hitratio 100% 1 /1518019
deepMemoizeOnce x         6909733 ops/sec ±4.92% (6 runs sampled)  hitratio 100% 1 /5467593
Fastest is deepMemoizeOnce
    √ compare function with object as argument, returning value from object

function with an object as argument, changing value, returning a part
base            x            6288 ops/sec ±1.97% (5 runs sampled)  hitratio 0% 3182 /3182
memoize-one     x            6190 ops/sec ±3.46% (6 runs sampled)  hitratio 59% 2219 /5402
lodash.memoize  x           55473 ops/sec ±8.49% (6 runs sampled)  hitratio 92% 2680 /32191
fast-memoize    x           46307 ops/sec ±22.82% (6 runs sampled)  hitratio 95% 2670 /58883
memoize-state   x           34332 ops/sec ±18.10% (5 runs sampled)  hitratio 98% 1829 /77166
deepMemoizeOnce x           61919 ops/sec ±3.35% (6 runs sampled)  hitratio 97% 2982 /106979
Fastest is deepMemoizeOnce
    √ compare function with object as argument, returning value from object, and changing value

function with an object as argument, changing other value, returning a part
base            x            6265 ops/sec ±3.24% (6 runs sampled)  hitratio 0% 3130 /3130
memoize-one     x            6260 ops/sec ±2.08% (6 runs sampled)  hitratio 50% 3140 /6271
lodash.memoize  x           53049 ops/sec ±8.82% (6 runs sampled)  hitratio 92% 2460 /30862
fast-memoize    x           51312 ops/sec ±10.31% (6 runs sampled)  hitratio 95% 2595 /56800
memoize-state   x         1195041 ops/sec ±7.33% (6 runs sampled)  hitratio 100% 1 /525014
deepMemoizeOnce x           62263 ops/sec ±3.09% (6 runs sampled)  hitratio 99% 3439 /559392
Fastest is memoize-state
    √ compare function with object as argument, returning value from object, and changing not used value

function with 2 objects as argument, changing both value
base            x            6064 ops/sec ±4.62% (5 runs sampled)  hitratio 0% 2477 /2477
memoize-one     x            6337 ops/sec ±3.09% (6 runs sampled)  hitratio 47% 2837 /5315
lodash.memoize  x            6043 ops/sec ±2.72% (6 runs sampled)  hitratio 64% 3032 /8348
fast-memoize    x            5217 ops/sec ±20.17% (6 runs sampled)  hitratio 74% 2973 /11322
memoize-state   x           22568 ops/sec ±10.41% (6 runs sampled)  hitratio 95% 1122 /22532
deepMemoizeOnce x            6052 ops/sec ±7.33% (6 runs sampled)  hitratio 87% 3322 /25855
Fastest is memoize-state
    √ compare function with 2 object as argument, returning value from object, and changing not used value

when changes anything, except the function gonna to consume
base            x            6007 ops/sec ±5.74% (6 runs sampled)  hitratio 0% 3347 /3347
memoize-one     x            6179 ops/sec ±3.15% (6 runs sampled)  hitratio 49% 3486 /6834
lodash.memoize  x            5911 ops/sec ±1.81% (6 runs sampled)  hitratio 72% 2711 /9546
fast-memoize    x            5647 ops/sec ±7.92% (5 runs sampled)  hitratio 80% 2366 /11913
memoize-state   x          401923 ops/sec ±9.69% (6 runs sampled)  hitratio 100% 1 /246843
deepMemoizeOnce x            5903 ops/sec ±8.37% (5 runs sampled)  hitratio 99% 2048 /248892
Fastest is memoize-state
    √ when changes anything, except the function gonna to consume

when state is very big, and you need a small part
base            x            6047 ops/sec ±3.80% (5 runs sampled)  hitratio 0% 3043 /3043
memoize-one     x            6077 ops/sec ±5.24% (6 runs sampled)  hitratio 55% 2491 /5535
lodash.memoize  x             127 ops/sec ±25.42% (6 runs sampled)  hitratio 100% 6 /5592
fast-memoize    x             143 ops/sec ±4.53% (6 runs sampled)  hitratio 100% 7 /5649
memoize-state   x           36758 ops/sec ±9.15% (5 runs sampled)  hitratio 93% 1232 /17968
deepMemoizeOnce x           61092 ops/sec ±4.92% (6 runs sampled)  hitratio 95% 1944 /37398
Fastest is deepMemoizeOnce
    √ when state is very big, and you need a small part
```

*these tests are not intended for memoization functions that only work with the last values, but surprisingly the author, the function shows more than good results

[moize](https://github.com/planttheidea/moize) project test result
| Name            | Overall (average) | Single (average) | Multiple (average) | single primitive | single array | single object | multiple primitive | multiple array | multiple object |
| --------------- | ----------------- | ---------------- | ------------------ | ---------------- | ------------ | ------------- | ------------------ | -------------- | --------------- |
| moize           | 38 576 034        | 54 725 259       | 22 426 809         | 101 699 086      | 33 941 510   | 28 535 182    | 22 923 691         | 22 455 716     | 21 901 020      |
| **deepMemoizeOnce** | 34 022 376        | 52 949 808       | 15 094 943         | 106 337 559      | 25 630 312   | 26 881 554    | 31 684 534         | 9 310 210      | 4 290 087       |
| lru-memoize     | 28 628 652        | 38 207 096       | 19 050 208         | 55 709 741       | 33 057 805   | 25 853 743    | 19 219 851         | 18 657 611     | 19 273 162      |
| mem             | 24 858 316        | 36 557 173       | 13 159 460         | 82 474 777       | 13 496 573   | 13 700 170    | 13 559 594         | 13 090 266     | 12 828 521      |
| fast-memoize    | 23 782 321        | 47 129 271       | 435 371            | 140 020 029      | 762 865      | 604 921       | 523 174            | 426 151        | 356 789         |
| memoizeState    | 15 346 644        | 19 179 178       | 11 514 109         | 27 046 690       | 14 795 908   | 15 694 938    | 10 059 870         | 12 162 806     | 12 319 652      |
| lodash          | 14 053 145        | 27 637 274       | 469 017            | 36 421 313       | 26 928 316   | 19 562 193    | 603 631            | 420 382        | 383 040         |
| memoizee        | 9 956 941         | 12 558 895       | 7 354 988          | 15 977 478       | 10 567 749   | 11 131 459    | 7 977 683          | 6 934 772      | 7 152 510       |
| ramda           | 9 175 299         | 17 802 691       | 547 907            | 50 806 657       | 887 297      | 1 714 119     | 738 007            | 514 649        | 391 066         |
| underscore      | 6 346 505         | 12 156 417       | 536 593            | 29 332 384       | 2 323 929    | 4 812 940     | 713 455            | 523 511        | 372 815         |
| memoizerific    | 3 940 252         | 4 437 272        | 3 443 233          | 5 110 392        | 4 101 188    | 4 100 236     | 3 279 163          | 3 490 893      | 3 559 644       |
| addy-osmani     | 1 936 454         | 3 046 763        | 826 145            | 7 789 653        | 753 898      | 596 739       | 1 550 308          | 508 753        | 419 376         |

[micro-memoize](https://github.com/planttheidea/micro-memoize) project test result
| Name            | Ops / sec  |
| --------------- | ---------- |
| mem             | 21 927 168 |
| **deepMemoizeOnce** | 19 945 133 |
| micro-memoize   | 16 717 308 |
| lru-memoize     | 15 908 631 |
| lodash          | 8 547 078  |
| memoizee        | 6 518 938  |
| fast-memoize    | 6 507 992  |
| addy osmani     | 5 464 261  |
| underscore      | 4 712 687  |
| memoizerific    | 3 970 484  |
| ramda           | 2 622 240  |

[nano-memoize](https://github.com/anywhichway/nano-memoize) project test result
functions with a single primitive parameter
| Name          | Ops / sec   | Relative margin of error | Sample size |
| ------------- | ----------- | ------------------------ | ----------- |
| fast-memoize  | 122,285,257 | ± 1.07%                  | 87          |
| nano-memoize  | 110,154,812 | ± 0.95%                  | 87          |
|**deepMemoizeOnce**| 102,029,600 | ± 1.02%                  | 88          |
| micro-memoize | 97,649,817  | ± 1.04%                  | 87          |
| moize         | 72,055,681  | ± 1.15%                  | 85          |
| iMemoized     | 60,566,879  | ± 1.60%                  | 87          |
| lru-memoize   | 53,812,649  | ± 1.10%                  | 82          |
| lodash        | 35,426,082  | ± 0.93%                  | 85          |
| underscore    | 27,514,230  | ± 0.89%                  | 86          |
| memoizee      | 15,209,147  | ± 1.05%                  | 81          |
| addy-osmani   | 7,110,753   | ± 1.93%                  | 80          |
| memoizerific  | 4,775,290   | ± 1.13%                  | 83          |

functions with a single object parameter
| Name          | Ops / sec  | Relative margin of error | Sample size |
| ------------- | ---------- | ------------------------ | ----------- |
| nano-memoize  | 46,559,990 | ± 3.41%                  | 86          |
| fast-memoize  | 31,216,826 | ± 1.87%                  | 84          |
| micro-memoize | 30,959,878 | ± 2.36%                  | 83          |
| iMemoized     | 30,771,835 | ± 3.71%                  | 61          |
|**deepMemoizeOnce**| 28,586,867 | ± 2.15%                  | 82          |
| moize         | 28,260,009 | ± 2.07%                  | 67          |
| lru-memoize   | 27,324,535 | ± 2.02%                  | 66          |
| lodash        | 23,549,779 | ± 1.31%                  | 88          |
| underscore    | 15,716,233 | ± 1.72%                  | 77          |
| memoizee      | 11,783,396 | ± 2.20%                  | 80          |
| addy-osmani   | 7,608,877  | ± 1.41%                  | 84          |
| memoizerific  | 4,350,553  | ± 1.91%                  | 85          |

functions with multiple parameters that contain only primitives
| Name          | Ops / sec  | Relative margin of error | Sample size |
| ------------- | ---------- | ------------------------ | ----------- |
|**deepMemoizeOnce**| 23,342,906 | ± 1.51%                  | 84          |
| nano-memoize  | 22,796,511 | ± 2.02%                  | 84          |
| micro-memoize | 22,088,234 | ± 1.45%                  | 86          |
| moize         | 20,543,288 | ± 2.22%                  | 84          |
| lru-memoize   | 18,635,510 | ± 1.33%                  | 83          |
| memoizee      | 7,922,784  | ± 1.64%                  | 87          |
| iMemoized     | 4,388,674  | ± 2.04%                  | 85          |
| memoizerific  | 3,150,442  | ± 1.45%                  | 86          |
| addy-osmani   | 1,593,296  | ± 0.75%                  | 84          |
| fast-memoize  | 497,292    | ± 5.76%                  | 78          |

functions with multiple parameters that contain objects
| Name          | Ops / sec  | Relative margin of error | Sample size |
| ------------- | ---------- | ------------------------ | ----------- |
|**deepMemoizeOnce**| 23,403,134 | ± 1.37%                  | 84          |
| micro-memoize | 21,300,415 | ± 2.04%                  | 81          |
| moize         | 20,524,643 | ± 1.78%                  | 83          |
| nano-memoize  | 19,824,379 | ± 1.53%                  | 83          |
| lru-memoize   | 18,593,938 | ± 1.60%                  | 86          |
| memoizee      | 8,094,432  | ± 0.99%                  | 88          |
| memoizerific  | 3,457,526  | ± 1.63%                  | 83          |
| addy-osmani   | 518,926    | ± 1.14%                  | 86          |
| fast-memoize  | 393,055    | ± 1.83%                  | 82          |

### License

MIT Yuriy Khomenko
