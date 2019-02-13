var express = require("express");
var router = express.Router();
const cates = require("../controllers/cate.controller");

/* GET users listing. */
router.post("/", cates.creat);
router.put("/:id", cates.update);
router.delete("/:id", cates.remove);
router.post("/list", cates.list);
router.post("/list/:type", cates.list);
router.get("/:id", cates.get);

module.exports = router;