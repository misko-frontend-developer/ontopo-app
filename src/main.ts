import "./assets/index.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import ErrorHandler from "./components/ErrorHandler.vue";
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("ErrorHandler", ErrorHandler);

app.mount("#app");
