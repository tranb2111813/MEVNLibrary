const DocGia = require("../model/model_docgia");
const Taikhoan = require("../model/model_taikhoan");
const bcrypt = require("bcrypt");

const generateMsdg = async () => {
  const latestDocGia = await DocGia.findOne().sort({ msdg: -1 });
  let newId = "D0000001";
  if (latestDocGia && latestDocGia.msdg) {
    const currentIdNum = parseInt(latestDocGia.msdg.slice(1), 10); // Lấy phần số
    newId = `D${String(currentIdNum + 1).padStart(7, "0")}`; // Tăng dần và nối tiền tố "D"
  }
  return newId;
};

// Lấy tất cả các độc giả
exports.getAll = async (req, res) => {
  try {
    const docgia = await DocGia.find();
    res.status(200).json(docgia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.create = async (req, res) => {
  try {
    const { holot, ten, ngaysinh, diachi, sodienthoai, phai } = req.body;
    console.log(req.body);

    newMsdg = await generateMsdg();
    const username = newMsdg;
    const password = "Password@123";

    const newDocGia = new DocGia({
      msdg: newMsdg,
      holot,
      ten,
      phai,
      ngaysinh,
      diachi,
      sodienthoai,
    });
    await newDocGia.save();
    // const newTaikhoan = new Taikhoan({
    //   username,
    //   password,
    //   role: "docgia",
    //   needsPasswordChange: true,
    // });
    // await newTaikhoan.save();

    res.status(201).json({
      message: "DocGia and Tai khoan created successfully",
      msdg: newMsdg,
      username,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy độc giả theo ID
exports.getById = async (req, res) => {
  try {
    const docgia = await DocGia.findById(req.params.msdg);
    if (!docgia) {
      return res.status(404).json({ message: "DocGia not found" });
    }
    res.status(200).json(docgia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật độc giả
exports.update = async (req, res) => {
  try {
    const updatedDocGia = await DocGia.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDocGia) {
      return res.status(404).json({ message: "DocGia not found" });
    }
    res.status(200).json(updatedDocGia);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.searchByName = async (req, res) => {
  try {
    const { ten } = req.query;
    const readers = await DocGia.find({
      ten: {
        $regex: ".*" + ten + ".*",
        $options: "i",
      },
    });
    res.status(200).json(readers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.sortByHolot = async (req, res) => {
  try {
    const { query } = req.query;
    if (query === "asc") {
      const readers = await DocGia.find().sort({ holot: 1 });
      res.status(200).json(readers);
    } else if (query === "desc") {
      const readers = await DocGia.find().sort({ holot: -1 });
      res.status(200).json(readers);
    } else {
      this.getAll(req, res);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedReader = await DocGia.findByIdAndDelete(req.params.id);
    if (!deletedReader)
      return res.status(404).json({ message: "Không tìm thấy đọc giả" });
    res.status(200).json({ message: "Đọc giả đã bị xóa" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
