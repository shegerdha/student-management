declare module "*.vue" {
  import { DefineComponent, defineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "moment-jalaali";
declare module "vue3-print-nb";
