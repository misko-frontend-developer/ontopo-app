import "./assets/index.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import ErrorHandler from "./components/ErrorHandler.vue";
const app = createApp(App);

app.use(createPinia());
app.component("ErrorHandler", ErrorHandler);

app.mount("#app");
