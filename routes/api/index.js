const router = require('express').Router();
const transactionRoutes = require('./api-routes');

// add prefix of `/pizzas` to routes created in `pizza-routes.js`
router.use('/', transactionRoutes);

module.exports = router;