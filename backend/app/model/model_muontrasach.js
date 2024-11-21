const mongoose = require("mongoose");

const TheoDoiMuonSachSchema = new mongoose.Schema({
  msdg: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DocGia",
    required: true,
  },
  masach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sach",
    required: true,
  },
  ngaymuon: {
    type: Date,
    required: true,
    default: Date.now,
  },
  ngaytra: {
    type: Date,
    default: function () {
      // Tính ngày trả mặc định là 7 ngày sau ngày mượn
      const ngayMuon = this.ngaymuon || Date.now();
      return new Date(ngayMuon.getTime() + 7 * 24 * 60 * 60 * 1000); // Cộng thêm 7 ngày
    },
  },
  trangthai: {
    type: String,
    enum: ["damuon", "datra"],
    default: "damuon",
  },
});

// Thiết lập khóa chính tổng hợp cho model
TheoDoiMuonSachSchema.index(
  { msdg: 1, masach: 1, ngaymuon: 1 },
  { unique: true }
);

module.exports = mongoose.model("TheoDoiMuonSach", TheoDoiMuonSachSchema);
