var express = require('express');
var router = express.Router();
const dataCtrl = require('../controllers/product.controller');
/* GET users listing. */
router.post('/', dataCtrl.create);
router.put('/:id', dataCtrl.update);
router.delete('/:id', dataCtrl.remove);
router.get('/:id', dataCtrl.get);
router.post('/list', dataCtrl.list);


module.exports = router;