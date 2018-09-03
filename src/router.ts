import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/index.vue';
import Upload from './views/upload.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload,
    }
  ],
});
