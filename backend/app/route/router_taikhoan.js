const express = require("express");
const router = express.Router();
const taikhoanController = require("../controllers/controller_taikhoan");

// router.post('/register', taikhoanController.register);

// Đăng nhập
router.post("/login", taikhoanController.login);

// Xem thông tin tài khoản
router
  .get("/:id", taikhoanController.getTaikhoanInfo)
  .delete("/:id", taikhoanController.deleteTaikhoan);

module.exports = router;
