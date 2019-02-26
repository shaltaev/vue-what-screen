# Vue-what-screen

The project is designed so that from any place of the application you can easily find out: **layout** of app and current screen orientation _Portrait_ or _Landscape_.

Also plugin provide system to work with breakpoints (and css media-query).

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

- IN 0.1
  - [x] Chain-style request
  - [x] Breakpoints
  - [x] Presets for Breakpoints
  - [x] TypeScript support (since 0.1.8) [more about](#typescript-support)
- IN 0.2
  - [ ] easy subscription on $screen.state for Vue-component

### Example from init to done

<!-- prettier-ignore-start -->

In main:

```js
var vueScreen = require('vue-what-screen')

Vue.use(vueScreen)
```

In vue component:

```xml
<template>
  <h3 v-if="$screen.isP().done()">Your screen orientation is Portrait</h3>
</template>
```

or like that:

```xml
<template>
  <h3 :class=" { 'class-for-landscape': $screen.isL().done() , 'class-for-portrait': $screen.isP().done() }">Your screen orientation is Portrait</h3>
</template>
```

<!-- prettier-ignore-end -->

Look more in directory **/examples**

## Docs

States:

- `state.isL` (automated on resize event) true if now your screen orientation is Landscape
- `state.screen` (automated on resize event) available if you set breakpoints or choose one of breakpoints preset

Functions:

- chain-like: `$screen.isH(">", 400).isL().done()`

  - `isL()` is orientation Landscape
  - `isP()` is orientation Portrait
  - `isScreen(screen)` is screen compare to breakpoint

    - screen: string (one of breakpoint name, like "xs" for Bootstrap preset)
    - if breakpoints not set result will be **false**

  - `isScreenAd(sign, screen)` is screen compare to breakpoint condition (Ad as advanced)

    - sign: enum ( > , >= , < , <=, = )
    - screen: string (one of breakpoint name, like "xs" for Bootstrap preset)
    - if sign not in enum or breakpoints not set result will be **false**
    - ex: `isScreenAd('>', 'xs')` mean that screen should be more then `xs` from Bootstrap (only if you use Bootstrap preset)

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

  - `init()` Deprecated. Now is unnecessary.

BreakPoints:

| presets      | alias for always    | alias as for latest package |
| ------------ | ------------------- | --------------------------- |
| Bootstrap 4  | "BS4", "Bootstrap4" | "BS", "Bootstrap"           |
| Bootstrap 3  | "BS3", "Bootstrap3" |                             |
| Foundation 6 | "F6", "Foundation6" | "F", "Foundation"           |

In main NEW STYLE (will be saved in 1.0.0)

```js
// Valid BpOptions

bp0 = "PresetName"
bp1 = { breakpointsPreset: "PresetName" }

bp2 = { // bp set as object
  breakpoints: [   //  [ []|{} ] length 1 or more
    // Name should be uniq
    // !IMPORTANT You specify the upper limit in px, and this limit is in the range so (.., limit]
    // The lower limit is derived from the previous breakpoint or 0
    { // breakpoint as object
      name: "bp0",
      value: 200  // if Portrait the same Landscape
    },
    [ "bp1", [400, 450] ], // breakpoint as array
  ],
  breakpointsLastName: "lastBpName" //  if not set then name will be `u_${breakpoints[last].name}` like u_H
}

bp3 = [ // bp set as array
 [   //  [ []|{} ] length 1 or more
    // Name should be uniq
    // !IMPORTANT You specify the upper limit in px, and this limit is in the range so (.., limit]
    // The lower limit is derived from the previous breakpoint or 0
    { // breakpoint as object
      name: "bp0",
      value: 200  // if Portrait the same Landscape
    },
    [ "bp1", [400, 450] ], // breakpoint as array
  ],,
 "lastBpName"
]
```

```js
var vueScreen = require("vue-what-screen")

var options = {
  // one of BpOption look up ^
  // bp:
}

Vue.use(vueScreen, options)
```

In main OLD STYLE (deprecated and will be removed in 1.0.0)

```js
var vueScreen = require("vue-what-screen")

var options = {
  breakpoints: [
    {
      name: "S", // Name should be uniq
      // !IMPORTANT You specify the upper limit in px, and this limit is in the range so (.., limit]
      // The lower limit is derived from the previous breakpoint or 0
      value: [600, 800] // first for Portrait, second for Landscape
    },
    {
      name: "M",
      value: [1200, 1280]
    },
    {
      name: "H",
      value: 1800 // if Portrait the same Landscape
    }
  ],
  breakpointsLastName: "uH", // if not set then name will be `u_${breakpoints[last].name}` like u_H

  /**
   * If you add next, then options.breakpoints and options.breakpointsLastName will be ignored
   */
  breakpointsPreset: "BS"
}

Vue.use(vueScreen, options)
```

## TypeScript support

In your app you need to add shim file with contain:

```ts
// shims-vueScreen.d.ts
import Vue from "vue"

import { IScreen } from "vue-what-screen/dist/types"

declare module "vue/types/vue" {
  interface Vue {
    $screen: IScreen
  }
}
```

## ToDo's

- [ ] decide: what to use `window.addEventListener` or `Media Query List Subscriptions`?

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [project tags](https://github.com/shaltaev/vue-what-screen/tags)

## Author

- **Shaltaev Gleb** - project founder.

## Licence

This project is licensed under the MIT license - see details in the file [LICENSE](/LICENSE).
