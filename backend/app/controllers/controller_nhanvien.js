const NhanVien = require("../model/model_nhanvien");
const Taikhoan = require("../model/model_taikhoan");
const bcrypt = require("bcrypt");
const generateMsnv = async () => {
  const latestNhanVien = await NhanVien.findOne().sort({ msnv: -1 });
  let newId = "N0000001";
  if (latestNhanVien && latestNhanVien.msnv) {
    const currentIdNum = parseInt(latestNhanVien.msnv.slice(1), 10);
    newId = `N${String(currentIdNum + 1).padStart(7, "0")}`;
  }
  return newId;
};

exports.create = async (req, res) => {
  try {
    const { hoten, chucvu, diachi, sodienthoai, password } = req.body;
    const newMsnv = await generateMsnv();
    const username = newMsnv;

    // Lưu thông tin nhân viên vào database
    const newNhanVien = new NhanVien({
      msnv: newMsnv,
      hoten,
      chucvu,
      diachi,
      sodienthoai,
    });
    await newNhanVien.save();

    // Hash mật khẩu và lưu thông tin tài khoản vào database
    const hashedPassword = await bcrypt.hash(password, 10);
    const newTaikhoan = new Taikhoan({
      username,
      password: hashedPassword,
      role: "nhanvien",
    });
    await newTaikhoan.save();

    res.status(201).json({
      message: "NhanVien and Tai khoan created successfully",
      msnv: newMsnv,
      username,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const nhanviens = await NhanVien.find();
    res.send(nhanviens);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const nhanvien = await NhanVien.findOne({ msnv: req.params.msnv });
    if (!nhanvien) {
      return res.status(404).send({ message: "Employee not found" });
    }
    res.send(nhanvien);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.searchByName = async (req, res) => {
  try {
    const { hoten } = req.query;
    const staffs = await NhanVien.find({
      hoten: {
        $regex: ".*" + hoten + ".*",
        $options: "i",
      },
    });
    res.status(200).json(staffs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.sortByName = async (req, res) => {
  try {
    const { query } = req.query;
    if (query === "asc") {
      const staffs = await NhanVien.find().sort({ hoten: 1 });
      res.status(200).json(staffs);
    } else if (query === "desc") {
      const staffs = await NhanVien.find().sort({ hoten: -1 });
      res.status(200).json(staffs);
    } else {
      this.getAll(req, res);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { password, ...data } = req.body;
    const updatedNhanVien = await NhanVien.findByIdAndUpdate(
      req.params.id,
      data,
      {
        new: true,
      }
    );
    if (!updatedNhanVien) {
      return res.status(404).send({ message: "Employee not found" });
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await Taikhoan.findOneAndUpdate(
        { username: updatedNhanVien.msnv },
        { password: hashedPassword }
      );
    }
    res.send(updatedNhanVien);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedStaff = await NhanVien.findByIdAndDelete(req.params.id);
    if (!deletedStaff)
      return res.status(404).json({ message: "Không tìm thấy nhân viên" });

    await Taikhoan.findOneAndDelete({ username: deletedStaff.msnv });
    res.status(200).json({ message: "Nhân viên đã bị xóa" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    await NhanVien.deleteMany();
    res.send({ message: "All employees deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
