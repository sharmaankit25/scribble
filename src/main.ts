import { createApp } from "vue";
import { createPinia } from "pinia";
import { createORM } from "pinia-orm";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "./assets/styles.css";
// Import your component
import FlashMessage from "./components/utils/FlashMessage.vue";

const app = createApp(App);

// Global Component
app.component("flash-message", FlashMessage);

const pinia = createPinia().use(createORM());
app.use(pinia.use(piniaPluginPersistedstate));
app.use(router);

app.mount("#app");
