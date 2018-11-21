function Service() {
    this.LayDanhSachKhoaHoc = function () {
        var urlAPI = `http://sv.myclass.vn/api/quanlytrungtam/danhsachkhoahoc`;
        return $.ajax({ // return ở đây mới trả về 1 ajax thì bên khoahoc.js mới .done được
            url: urlAPI,
            type: "GET"
        });
    };
}