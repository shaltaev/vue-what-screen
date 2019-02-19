# Vue-what-screen

The project is designed so that from any place of the application you can easily find out: **layout** of app and curent screent orientation _Portrait_ or _Landscape_.

## Usage

### Install

```sh
npm i vue-what-screen
```

or

```sh
yarn add vue-what-screen
```

### Features

- [x] `v-if` on mounted hooks
- [x] optimise `window.addEventListener("resize", () => {})`
- [ ] deside: what to use `window.addEventListener` or `Media Query List Sucribtions`?
- [ ] create an easy way to subscribe Vue-component to status updates

### Example from init to done

<!-- prettier-ignore-start -->

In main:

```js
var vueScreen = require('vue-what-screen')

Vue.use(vueScreen)
```

In vue component:

```vue
<template>
  <h3 v-if="$screen.isP().done()">Your screen orientation is Portrait</h3>
</template>
```

<!-- prettier-ignore-end -->

Look more in directory **/examples**

## Docs

States:

- `state.isL` (autoupdated on resize event) true if now your screen orientation is Lanscape

Functions:

- chain-like: `$screen.isH(">", 400).isL().done()`

  - `isL()` is orientation Landscape
  - `isP()` is orientation Portrait
  - `isW(sign, width)` is width(px)?

    - sign: enum ( > , >= , < , <=, = )
    - width: number
    - if sign not in enum or width is not number result will be **false**

  - `isH(sign, height)` is height(px)?

    - sign: enum ( > , >= , < , <=, = )
    - height: number
    - if sign not in enum or height is not number result will be **false**

  - finish: one of it **REQUIRED** in chain

    - `done()` return chain request result
    - `not()` return inverted result

  - `init()` Deprecated. Now is unnessary.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [project tags](https://github.com/shaltaev/vue-what-screen/tags)

## Author

- **Shaltaev Gleb** - project founder.

## Licence

This project is licensed under the MIT license - see details in the file [LICENSE](/LICENSE).
