import { createApp } from 'vue'
import router from './router.js'
import App from './App.vue'
import store from './store/index.js'
import ToastPlugin from "vue-toast-notification";




/////styles////////
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "vue-toast-notification/dist/theme-sugar.css";
//////////////////
import TheHeader from './components/layout/TheHeader.vue'
import SideBar from './components/layout/SideBar.vue';
import BaseModal from './components/ui/BaseModal.vue';
import TheButton from './components/ui/TheButton.vue';

import "./configs/axios";




const app = createApp(App)



app.use(router)
app.use(store)
app.use(ToastPlugin)


app.component('the-header',TheHeader)
app.component('side-bar',SideBar)
app.component('base-modal',BaseModal)
app.component('the-button',TheButton)




app.mount('#app')

