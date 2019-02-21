import Vue from "vue"

import { IScreen } from "./index"

declare module "vue/types/vue" {
  interface VueConstructor {
    $screen: IScreen
  }
}
