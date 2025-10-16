import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

// Config de tailwind
import './assets/tailwind.css'


Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:3004/'
//axios.defaults.baseURL = 'https://escuelakpi.club/kpi/'

// Aquí mandamos los datos del usuario como un di, para la recepción en el back y poder saber si tiene acceso o no y sacarlo
axios.interceptors.request.use(config => {
  const datosUsuarioERP = 2354;
  // Agregar encabezados personalizados (por ejemplo, token de autorización)
  config.headers.Authorization = 'Bearer ' + localStorage.tlaKey;
  config.headers.Accept = 'application/json';
  config.headers['Access-Control-Allow-Origin'] = '*';
  config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE';
  config.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
  config.headers['user-iD'] = datosUsuarioERP;

  return config;
}, error => {
  // Manejar errores de solicitud
  console.log( error )
  return Promise.reject(error);
});


new Vue({
  render: h => h(App),
}).$mount('#app')
