const express = require('express');
const cors = require('cors');
const ApiError = require('./app/api_error');
const app = express();
const taikhoan_Router = require('./app/route/router_taikhoan');
const nxb_Router = require('./app/route/router_nhaxuatban');
const muontra_Router = require('./app/route/router_muontrasach');
const sach_Router = require('./app/route/router_sach');
const nhanvien_Router = require('./app/route/router_nhanvien');
const docgia_Router = require('./app/route/router_docgia');

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
        res.json({ message: 'Chào mừng' });
});
app.use("/api/nhanvien", nhanvien_Router);
app.use("/api/nxbs", nxb_Router);
app.use("/api/mts", muontra_Router);
app.use("/api/sach", sach_Router);
app.use("/api/docgia", docgia_Router);
app.use("/api/taikhoan", taikhoan_Router);
app.use((req, res, next) => {
        return next(new ApiError(404, 'Không tìm thấy trang'));
});
app.use((err, req, res, next) => {
        return res.status(err.statuscode || 500).json({ message: err.message || 'Lỗi máy chủ' });
});
module.exports = app;