function KhoaHocService()
{
    this.LayDanhSachKhoaHoc = function (){
        var urlAPI = `http://sv.myclass.vn/api/quanlytrungtam/danhsachkhoahoc`;
        return $.ajax({
            url:urlAPI,
            type:"GET"
        });
    }
    this.ThemKhoaHoc = function (khoaHoc){
        var urlAPI = "http://sv.myclass.vn/api/quanlytrungtam/themkhoahoc";
        return $.ajax({
            url:urlAPI,
            type:"POST",
            data:khoaHoc // data: dữ liệu gửi lên server
        })    
    }
    this.CapNhatKhoaHoc = function (khoaHoc)
    {
        var urlAPI = "http://sv.myclass.vn/api/quanlytrungtam/capnhatkhoahoc";
        return $.ajax({
            url:urlAPI,
            type:"PUT",
            data:khoaHoc // data: dữ liệu gửi lên server
        }) 
    }
    this.XoaKhoaHoc = function (MaKhoaHoc)
    {
        var urlAPI = `http://sv.myclass.vn/api/quanlytrungtam/xoakhoahoc/${MaKhoaHoc}`;
        return $.ajax({
            url:urlAPI,
            type:"DELETE",
        }) 
    }
}