function NguoiDungService(){
    this.LayDanhSachNguoiDung = function (){
        var urlAPi = `http://sv.myclass.vn/api/quanlytrungtam/danhsachnguoidung`;
        return $.ajax({
            url: urlAPi,
            type:"GET"
        });
    }
}