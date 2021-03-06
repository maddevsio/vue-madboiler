import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import middlewarePipeline from '@/router/middlewarePipeline';
// import auth from '@/router/middlewares/auth';
import Home from '@/pages/Home';
import Signup from '@/pages/Signup';
import Signin from '@/pages/Signin';

const routes = [
  {
    path: '/',
    name: 'default',
    component: Home
    // meta: {
    //   middleware: [auth]
    // }
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  }
];

const router = createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware;
  const context = {
    to,
    routes,
    next,
    store
  };
  return middleware[0]({
    ...context,
    nextMiddleware: middlewarePipeline(context, middleware, 1)
  });
});

export default router;
