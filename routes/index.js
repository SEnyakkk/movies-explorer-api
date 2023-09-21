const router = require('express').Router();
const { auth } = require('../middlewares/auth');

router.use('/signin', require('./signin'));
router.use('/signup', require('./signup'));

router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

module.exports = router;
