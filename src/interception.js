import isEmpty from 'lodash/isEmpty';

import router from '@/router';
import { store } from '@/store';

const handleInfoUser = async (to, from, next) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!isEmpty(accessToken)) {
    store.dispatch('user/tryAutoSignIn');
  } else {
    next({ path: `/signin?redirect=${to.path}` });
  }
};

router.beforeEach(async (to, from, next) => {
  const { isAuthenticated } = store.getters;

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    handleInfoUser(to, from, next);
  } else if (isAuthenticated) {
    switch (to.name) {
      case 'Login':
      case 'Register':
      case 'ResetPassword':
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
