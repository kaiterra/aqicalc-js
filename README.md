# aqicalc-js

[![Build Status](https://travis-ci.org/kkpoon/aqicalc-js.svg?branch=master)](https://travis-ci.org/kkpoon/aqicalc-js)
[![codecov](https://codecov.io/gh/kkpoon/aqicalc-js/branch/master/graph/badge.svg)](https://codecov.io/gh/kkpoon/aqicalc-js)

This is a utility to calculate Air Quality Index (AQI) with the input of concentration of the six main pollutants.

## Making Changes

To modify this code, edit the .ts files and then compile.

### Prerequisites
Install typescript globally:
```
npm install -g typescript@2.3.3
```

### Compiling
If you modified e.g. index.ts, compile it with:
```
tsc --lib es6 --outDir lib src/index.ts
```
This will put the compiled index.js into the lib folder.


## References

- https://zh.wikipedia.org/zh-hk/空氣質素指數
