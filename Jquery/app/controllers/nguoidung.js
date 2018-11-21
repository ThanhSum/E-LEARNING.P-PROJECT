$(document).ready(function () {

    var dsNguoiDung = new DanhSachNguoiDung();
    // var dsNguoiDung = new DanhSachNguoiDung();
    var svNguoiDung = new NguoiDungService();
    // var nguoiDungService = new NguoiDungService();


    $("#btnThemKhoaHoc").click(function () { //Open popup 
        $("#btnModal").trigger("click");
        //Tạo nội dung cho popup Modal
        var modalHeading = `Thêm người dùng`;
        var modalFooter = `
            <button class="btn btn-success" id="btnThemKH">Thêm khóa học</button>
            <button class="btn btn-danger" id="btnDong"> Đóng </button>
        `;
        $(".modal-title").html(modalHeading);
        $(".modal-footer").html(modalFooter);
    });
    $("body").delegate("#btnDong", "click", function () {
        document.getElementsByClassName("close")[0].click();
    });

    //Gọi api Lấy dữ liệu khóa học từ Backend load lên table
    svNguoiDung.LayDanhSachNguoiDung().done(function (data) {
        console.log(data);
        dsNguoiDung.DSND = data;
        LoadTableKhoaHoc(dsNguoiDung.DSND);
    }).fail(function (error) {
        console.log(error);
    });

    //Gọi api Lấy dữ liệu người dùng load lên thẻ select
    // nguoiDungService.LayDanhSachNguoiDung().done(function (data) {
    //     console.log(data);
    //     dsNguoiDung.DSND = data
    //     //Viết hàm load thông tin người dùng select#NguoiTao
    //     LoadSelectNguoiTao(dsNguoiDung.LayThongTinGiaoVu());
    //
    // }).fail(function (error) {
    //     console.log(error);
    // });

    function LoadSelectNguoiTao(data) {
        var noiDung = "";
        data.map(function (nguoiDung, index) {
            noiDung += `
                    <option value="${nguoiDung.TaiKhoan}"> ${nguoiDung.HoTen}</option>
                `
        });
        $("#NguoiTao").html(noiDung);
    }

    function LoadTableKhoaHoc(data) {
        var noiDung = "";
        //hiển thị dữ liệu lên table
        data.map(function (nguoiDung, index) {
            var moTa = "";

            noiDung += `
                <tr  >
                  
                    <td  >${nguoiDung.TaiKhoan}</td>
                    <td  >${nguoiDung.MatKhau}</td>
                    <td  >${nguoiDung.HoTen}</td>
                    <td  >${nguoiDung.Email}</td>
                    <td  >${nguoiDung.SoDT}</td>
                    <td  >${nguoiDung.MaLoaiNguoiDung}</td>
                    <td  >${nguoiDung.TenLoaiNguoiDung}</td>

                    <td>
                        <button class="btn btn-primary btnSua" TaiKhoan="${nguoiDung.TaiKhoan}">Sửa</button>
                        <button class="btn btn-danger btnXoa" TaiKhoan="${nguoiDung.TaiKhoan}">Xóa</button>
                    
                    </td>
                </tr>
            `;
        });
        $("#tblDanhSachNguoiDung").html(noiDung);

    }

    $("body").delegate("#btnThemKH", "click", function () {
        console.log(1);
        //Lấy thông tin từ các control
        var khoaHoc = new KhoaHoc();
        khoaHoc.MaKhoaHoc = $("#MaKhoaHoc").val();
        khoaHoc.TenKhoaHoc = $("#TenKhoaHoc").val();
        // khoaHoc.MoTa = $("#MoTa").val();
        khoaHoc.MoTa = CKEDITOR.instances.MoTa.getData();
        khoaHoc.LuotXem = $("#LuotXem").val();
        khoaHoc.NguoiTao = $("#NguoiTao").val();
        console.log(khoaHoc);
        svKhoaHoc.ThemKhoaHoc(khoaHoc).done(function (data) {
            console.log(data);
        }).fail(function (error) {
            console.log(error);
        });
    });

    $("body").delegate(".btnSua", "click", function () { //Open popup 
        $("#btnModal").trigger("click");
        //Tạo nội dung cho popup Modal
        var modalHeading = `Thêm người dùng`;
        var modalFooter = `
            <button class="btn btn-success" id="btnCapNhat">Cập nhật</button>
            <button class="btn btn-danger" id="btnDong"> Đóng </button>
        `;
        $(".modal-title").html(modalHeading);
        $(".modal-footer").html(modalFooter);
        //Lấy thông tin khóa học gán popup
        var maKHoaHoc = $(this).attr("makhoahoc");
        var khoaHoc = dsKhoaHoc.LayThongTinKhoaHoc(maKHoaHoc);
        if (khoaHoc) {
            $("#MaKhoaHoc").val(khoaHoc.MaKhoaHoc);
            $("#TenKhoaHoc").val(khoaHoc.TenKhoaHoc);
            //Gán giá trị
            CKEDITOR.instances.MoTa.setData(khoaHoc.MoTa);
            // $("#MoTa").val(khoaHoc.MoTa);
            $("#LuotXem").val(khoaHoc.LuotXem);
            $("#NguoiTao").val(khoaHoc.NguoiTao);
        }
    });
    $("body").delegate("#btnCapNhat", "click", function () {
        //Lấy thông tin từ các control
        var khoaHoc = new KhoaHoc();
        khoaHoc.MaKhoaHoc = $("#MaKhoaHoc").val();
        khoaHoc.TenKhoaHoc = $("#TenKhoaHoc").val();
        // khoaHoc.MoTa = $("#MoTa").val();
        khoaHoc.MoTa = CKEDITOR.instances.MoTa.getData();
        khoaHoc.LuotXem = $("#LuotXem").val();
        khoaHoc.NguoiTao = $("#NguoiTao").val();
        console.log(khoaHoc);
        //Gọi service cập nhật khóa học
        svKhoaHoc.CapNhatKhoaHoc(khoaHoc).done(function (data) {
            console.log(data);
            location.reload();
        }).fail(function (error) {
            console.log(error);
        });
    })
    $("body").delegate(".btnXoa", "click", function () {
        var maKH = $(this).attr("makhoahoc");
        svKhoaHoc.XoaKhoaHoc(maKH).done(function (data) {
            console.log(data);
            location.reload();
        }).fail(function (error) {
            console.log(error)
        })
    })
    CKEDITOR.replace("MoTa");
});