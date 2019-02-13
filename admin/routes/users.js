var express = require('express');
var router = express.Router();
const user = require('../controllers/user.controller');
/* GET users listing. */
router.post('/', user.create);
router.put('/:id', user.updata);
router.delete('/:id', user.remove);
router.get('/:id', user.get);
router.post('/list', user.list);

module.exports = router;