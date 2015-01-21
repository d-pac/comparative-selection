 [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

> Comparative selection algorithm plugin for d-pac platform

See [d-pac.plugin specifications for more information](https://github.com/d-pac/d-pac.docs/blob/master/analysis/plugin%20specification.md)

Based on [NoMoreMarking's `cj` module](https://github.com/NoMoreMarking/cj).

## Description

The algorithm accepts a queue (Array) of items, then:

1. pseudo-randomizes the queue order
1. sorts the queue by `compared.length`
1. retains the first item as 'selected'
1. retains the next valid item as 'opponent':
    * either, the next item in the (shuffled) queue when 'selected' has no previous comparisons.
    * or, the next item in the (shuffled) queue 'selected' hasn't been compared to yet.
2. returns both items as an Array

## Install

```sh
$ npm install --save comparative-selection
```


## Usage

```js
var cs = require('comparative-selection');

cs.select( representations );
```

## API

### `select(items)`

* `items`: `{Object[]}` _**(required)**_ Array of items with following minimal structure:

    * `_id` : `{String}` _**(required)**_ Unique identifier for the item
    * `compared` : {String[]} _**(required)**_ Array of unique identifiers


## License

GPL v3 © [d-pac](http://www.d-pac.be)


[npm-url]: https://npmjs.org/package/comparative-selection
[npm-image]: https://badge.fury.io/js/comparative-selection.svg
[travis-url]: https://travis-ci.org/d-pac/comparative-selection
[travis-image]: https://travis-ci.org/d-pac/comparative-selection.svg?branch=master
[daviddm-url]: https://david-dm.org/d-pac/comparative-selection.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/d-pac/comparative-selection
