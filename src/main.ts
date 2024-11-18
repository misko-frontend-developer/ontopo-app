import "./assets/index.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import ErrorHandler from "./components/ErrorHandler.vue";
import ReservationForm from "./components/ReservationForm.vue";
import RestorantsData from "./components/RestorantsData.vue";
import SingleRestorant from "./components/SingleRestorant.vue";
import SkeletonLoaders from "./components/SkeletonLoaders.vue";
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("ErrorHandler", ErrorHandler);
app.component("ReservationForm", ReservationForm);
app.component("RestorantsData", RestorantsData);
app.component("SingleRestorant", SingleRestorant);
app.component("SkeletonLoaders", SkeletonLoaders);

app.mount("#app");
