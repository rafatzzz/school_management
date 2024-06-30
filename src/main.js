import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router from your router file

import Swal from 'sweetalert2'; // Import SweetAlert2
import 'sweetalert2/src/sweetalert2.scss'; // Import SweetAlert2 styles

import vuetify from './plugins/vuetify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles'; // Ensure you are using css-loader
import 'vuetify/styles'; // Ensure you import Vuetify styles
import '@mdi/font/css/materialdesignicons.css'; // Import Material Design Icons
import i18n from '../src/translate/i18n.js';


const app = createApp(App);

// Add SweetAlert2 to the global properties
app.config.globalProperties.$swal = Swal;
app.use(i18n);
app.use(router).use(vuetify).mount('#app');
