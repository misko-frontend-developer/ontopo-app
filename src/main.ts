import "./assets/index.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import ErrorHandler from "./components/ErrorHandler.vue";
import ReservationForm from "./components/ReservationForm.vue";
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("ErrorHandler", ErrorHandler);
app.component("ReservationForm", ReservationForm);

app.mount("#app");
