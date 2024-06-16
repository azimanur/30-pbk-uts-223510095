import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import { Quasar } from 'quasar';
import './index.css'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Create Vue app instance
const app = createApp(App);

// Create Pinia store
const pinia = createPinia();
app.use(pinia);

// Use Vue Router
app.use(router);

// Use Quasar with plugins (if needed)
app.use(Quasar, {
  /* Add Quasar plugins here if needed */
});

// Mount the app to the DOM
app.mount('#app');
