/* eslint-disable no-unused-vars */
import isEmpty from 'lodash/isEmpty';

import router from '@/router';
import { store } from '@/store';

// eslint-disable-next-line no-unused-vars
const handleInfoUser = async (to, from, next) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!isEmpty(accessToken)) {
    store.dispatch('user/tryAutoSignIn');
  } else {
    next({ path: `/signin?redirect=${to.path}` });
  }
};

router.beforeEach(async (to, from, next) => {
  if (to.name === 'Stream') {
    return next();
  }
  const { isAuthenticated } = store.getters;

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    handleInfoUser(to, from, next);
  } else if (isAuthenticated) {
    switch (to.name) {
      case 'Login' || 'Register' || 'ResetPassword':
        next({ path: '/' });
        break;
      case 'Home':
        next({ path: '/stream' });
        break;
      default:
        next();
        break;
    }
  } else next();
});

// router.afterEach(() => {});
