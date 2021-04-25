const router = require('express').Router();

const { mainView, grill } = require('./grill-master.controller');

/* Main View Route, Path - / */
router.get('/', mainView);

/* Grill View Route, Path - / */
router.post('/grill', grill);

module.exports = router;
