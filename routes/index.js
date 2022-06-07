const express = require('express');
const ainsRouter = require('./ains.router');
function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/ains', ainsRouter);
}
module.exports = routerApi;
