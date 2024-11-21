const Taikhoan = require("../model/model_taikhoan");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

// Đăng ký tài khoản
exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Kiểm tra xem tài khoản đã tồn tại chưa
    const existingTaikhoan = await Taikhoan.findOne({ username });
    if (existingTaikhoan) {
      return res.status(400).send({ message: "Tai khoan already exists." });
    }

    // Tạo tài khoản mới
    const taikhoan = new Taikhoan({ username, password, role });
    const savedTaikhoan = await taikhoan.save();
    res.status(201).send(savedTaikhoan);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra tài khoản có tồn tại
    const taikhoan = await Taikhoan.findOne({ username });
    if (!taikhoan) {
      return res.status(404).send({ message: "Không tìm thấy tài khoản." });
    }
    console.log(password);
    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, taikhoan.password);
    if (!isMatch) {
      return res
        .status(400)
        .send({ message: "Tài khoản hoặc mật khẩu không đúng." });
    }

    // Tạo token JWT
    const token = jwt.sign(
      { id: taikhoan._id, role: taikhoan.role },
      config.app.jwtSecret,
      { expiresIn: "1h" }
    );
    res.send({ message: "Đăng nhập thành công", token, role: taikhoan.role });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Xem thông tin tài khoản
exports.getTaikhoanInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const taikhoan = await Taikhoan.findById(id).select("-password"); // Loại bỏ mật khẩu khi trả về
    if (!taikhoan) {
      return res.status(404).send({ message: "Tai khoan not found." });
    }

    res.send(taikhoan);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Xóa tài khoản
exports.deleteTaikhoan = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTaikhoan = await Taikhoan.findByIdAndDelete(id);
    if (!deletedTaikhoan) {
      return res.status(404).send({ message: "Tai khoan not found." });
    }

    res.send({ message: "Tai khoan deleted successfully." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
