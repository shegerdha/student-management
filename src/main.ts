import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import lightTheme from "./themes/lightTheme";
import darkTheme from "./themes/darkTheme";
import "@mdi/font/css/materialdesignicons.css";

const app = createApp(App);
const vuetify = createVuetify({
  icons: { defaultSet: "mdi" },
  components,
  directives,
  theme: { themes: { light: lightTheme, dark: darkTheme } },
});

app.use(vuetify);
app.use(createPinia());
app.use(router);

app.mount("#app");
