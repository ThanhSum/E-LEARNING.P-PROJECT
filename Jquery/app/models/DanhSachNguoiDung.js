function DanhSachNguoiDung() {
    this.DSND = [];
    this.ThongKeDiem = [];

    this.ThemNguoiDung = function (nguoidung) {
        this.DSND.push(nguoidung);
        this.ThongKeDiem.push(nguoidung.Diem);
    }

    this.XoaDSNguoiDung = function (lstTaiKhoanXoa) {

        for (var i = 0; i < lstTaiKhoanXoa.length; i++) {
            for (var j = this.DSND.length - 1; j >= 0; j--) {
                var nguoidung = this.DSND[j];
                if (lstTaiKhoanXoa[i] === nguoidung.TaiKhoan) {
                    this.DSND.splice(j, 1);

                }
            }
        }
    }

    this.XoaNguoiDung = function (taiKhoan) {
        console.log(taiKhoan);
        for (var j = this.DSND.length - 1; j >= 0; j--) {
            var nguoidung = this.DSND[j];
            if (taiKhoan === nguoidung.TaiKhoan) {
                this.DSND.splice(j, 1);
            }
        }

    }

    this.SuaNguoiDung = function (nguoiDungCapNhat) {
        for (var i = 0; i < this.DSND.length; i++) {
            var nguoiDungUpdate = this.DSND[i];
            if (nguoiDungUpdate.TaiKhoan === nguoiDungCapNhat.TaiKhoan) {
                nguoiDungUpdate.MatKhau = nguoiDungCapNhat.MatKhau;
                nguoiDungUpdate.HoTen = nguoiDungCapNhat.HoTen;
                nguoiDungUpdate.Email = nguoiDungCapNhat.Email;
                nguoiDungUpdate.SoDienThoai = nguoiDungCapNhat.SoDienThoai;
            }
        }
    }
    this.TimKiemNguoiDung = function (tukhoa) {
        var common = new commonService();
        //Chuyển đổi chuỗi từ khóa có dấu thành không dấu và loại bỏ khoảng trống đầu cuối
        //Biến đổi các ký tự hoa thành thường thay khoảng trống  = '-'
        tukhoa = common.getSeoTitle(tukhoa);
        //List kết quả tìm kiếm : DanhSachSinhVien
        var lstKetQuaTimKiem = new DanhSachNguoiDung();
        for (var i = 0; i < this.DSND.length; i++) {
            var nguoiDung = this.DSND[i];
            if (common.getSeoTitle(nguoiDung.HoTen).search(tukhoa) !== -1) {
                lstKetQuaTimKiem.ThemNguoiDung(nguoiDung);
            }
        }
        return lstKetQuaTimKiem;
    }
    this.TimNguoiDungTheoTaiKhoan = function (TaiKhoan) {
        for (var i = 0; i < this.DSND.length; i++) {
            var nguoiDung = this.DSND[i];

            if (nguoiDung.TaiKhoan === TaiKhoan) {
                return nguoiDung;
            }
        }
        return null;
    }
    this.LayThongTinGiaoVu = function ()
    {
        //Tạo ra dsGiaoVu: DanhSachNguoiDung
        var dsGiaoVu = new DanhSachNguoiDung();
        //Duyệt tất cả người dùng => đối tượng nào có MaLoaiNguoiDung = "GV" thêm vào mảng
        this.DSND.map(function (nguoiDung,index){
            if(nguoiDung.MaLoaiNguoiDung === "GV"){
                dsGiaoVu.ThemNguoiDung(nguoiDung);
            }
        })
        return dsGiaoVu.DSND;
    }
}