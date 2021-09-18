import Vue from 'vue';
import VueRouter from 'vue-router';
import IndexPage from '../views/IndexPage';
import RegisterPage from '../views/RegisterPage';
import LoginPage from '../views/LoginPage';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  base: '/04-SPA/05-AuthPages',
  routes: [
    {
      path: '/',
      component: IndexPage,
      name: 'index',
    },
    {
      path: '/register',
      component: RegisterPage,
      name: 'register',
    },
    {
      path: '/login',
      component: LoginPage,
      name: 'login',
    },
  ],
});
