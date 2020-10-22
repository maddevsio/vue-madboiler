import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import middlewarePipeline from '@/router/middlewarePipeline';
// import auth from '@/router/middlewares/auth';
import Home from '@/pages/Home';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'default',
    component: Home
    // meta: {
    //   middleware: [auth]
    // }
  }
];

const router = new VueRouter({
  mode: 'history',
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
