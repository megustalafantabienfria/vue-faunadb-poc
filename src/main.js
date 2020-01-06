import Vue from 'vue'
import App from './App.vue'
import db from './common/faunaDB.service';

Vue.config.productionTip = false

// eslint-disable-next-line no-console
console.log(db.client);
// eslint-disable-next-line no-console
db.getAll().then(console.log);

new Vue({
  render: h => h(App),
}).$mount('#app')
