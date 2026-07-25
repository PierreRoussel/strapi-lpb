'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/pages/:id/actions/publish',
      handler: 'page.publish',
      config: {
        auth: {
          scope: ['api::page.page.update'],
        },
      },
    },
    {
      method: 'POST',
      path: '/pages/:id/actions/unpublish',
      handler: 'page.unpublish',
      config: {
        auth: {
          scope: ['api::page.page.update'],
        },
      },
    },
  ],
};
