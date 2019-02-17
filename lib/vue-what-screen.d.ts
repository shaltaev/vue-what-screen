import Vue from "vue"

import { IScreen } from "../src"

declare module "vue/types/vue" {
  interface VueConstructor {
    $screen: IScreen
  }
}
