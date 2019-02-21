import Vue from "vue"

import { IScreen } from "./main"

declare module "vue/types/vue" {
  interface VueConstructor {
    $screen: IScreen
  }
}
