//Tất cả html đã được load thì mới chạy function này
$(document).ready(function () {
    var dsNguoiDung = new DanhSachNguoiDung();

    LayLocalStorage();
    $("#btnThemNguoiDung").click(function () {
        $("#btnModal").trigger("click");
        //Tạo nội dung cho popup Modal
        var modalHeading = `Thêm người dùng`;
        var modalFooter = `
            <button class="btn btn-success" id="btnTaoMoi">Thêm người dùng</button>
            <button class="btn btn-danger" id="btnDong"> Đóng </button>
        `;
        $(".modal-title").html(modalHeading);
        $(".modal-footer").html(modalFooter);
    });

    $("body").delegate("#btnTaoMoi", "click", function () {
        //Lấy thông tin từ người dùng nhập vào
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var soDienThoai = $("#SoDienThoai").val();
        //Khởi tạo đối tượng người dùng
        var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDienThoai);
        dsNguoiDung.ThemNguoiDung(nguoiDung);
        LoadTableNguoiDung(dsNguoiDung.DSND);
        //Đóng popup
        $("#myModal").click();
        //Clear dữ liệu textbox dựa trên selector
        $(".modal-body .form-control").val("");
        LuuLocalStorage();
    });

    $("body").delegate("#btnDong", "click", function () {
        // $("#myModal").css({"display":"none"});
        // $(".modal-backdrop").removeClass("show");
        $("#myModal").click();
    });

    // function LoadTableNguoiDung(mangNguoiDung) {
    //     var noiDungTbl = "";
    //     for (var i = 0; i < mangNguoiDung.length; i++) {
    //         var nguoiDung = mangNguoiDung[i];
    //         noiDungTbl += `
    //             <tr class="trNguoiDung" taikhoan="${nguoiDung.TaiKhoan}" matkhau="${nguoiDung.MatKhau}" hoten="${nguoiDung.HoTen}" email="${nguoiDung.Email}" sodienthoai="${nguoiDung.SoDienThoai}" >
    //                 <td><input type="checkbox" class="ckbTaiKhoan" value="${nguoiDung.TaiKhoan}" /> </td>
    //                 <td> ${nguoiDung.TaiKhoan} </td>
    //                 <td> ${nguoiDung.MatKhau} </td>
    //                 <td> ${nguoiDung.HoTen} </td>
    //                 <td> ${nguoiDung.Email} </td>
    //                 <td> ${nguoiDung.SoDienThoai} </td>
    //                 <td> 
    //                     <button  class="btn btn-danger btnXoa"  taikhoan="${nguoiDung.TaiKhoan}" >Xóa</button>
    //                     <button  class="btn btn-primary btnSua"   >Sửa</button>
    //                 </td>
    //             </tr>
    //         `;
    //     }
    //     $("#tblDanhSachNguoiDung").html(noiDungTbl);
    // }

    $("body").delegate(".btnSua", "click", function () {
        $("#btnModal").trigger("click");
        //Tạo nội dung cho popup Modal
        var modalHeading = `Cập nhật thông tin người dùng`;
        var modalFooter = `
            <button class="btn btn-success" id="btnLuu">Lưu</button>
            <button class="btn btn-danger" id="btnDong"> Đóng </button>
        `;
        $(".modal-title").html(modalHeading);
        $(".modal-footer").html(modalFooter);
        //Lấy thông tin từ người dùng được chọn load lên popup
        //closest(): Dom đến selector chứa phần tử đó
        var trChinhSua = $(this).closest(".trNguoiDung");
        $("#TaiKhoan").val(trChinhSua.attr("TaiKhoan"));
        $("#MatKhau").val(trChinhSua.attr("MatKhau"));
        $("#HoTen").val(trChinhSua.attr("HoTen"));
        $("#Email").val(trChinhSua.attr("Email"));
        $("#SoDienThoai").val(trChinhSua.attr("SoDienThoai"));
    });

    $("body").delegate("#btnLuu", "click", function () {
        //Lấy thông tin từ người dùng nhập vào
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var soDienThoai = $("#SoDienThoai").val();
        var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDienThoai);
        dsNguoiDung.SuaNguoiDung(nguoiDung);
        LoadTableNguoiDung(dsNguoiDung.DSND);
        $(".close").trigger("click");
    });

    //Gán hàm tìm kiếm cho sự kiện click của nút xử lý #btnTimKiemNguoiDung
    $("#btnTimKiemNguoiDung").click(TimKiem);
    $("#txtTuKhoa").keyup(TimKiem);
    function TimKiem() {
        //Lấy giá trị từ input#txtTuKhoa
        var tuKhoa = $("#txtTuKhoa").val();
        var lengthTuKhoa = tuKhoa.length;
        var dsNguoiDungTimKiem = dsNguoiDung.TimKiemNguoiDung(tuKhoa);
        LoadTableNguoiDung(dsNguoiDungTimKiem.DSND);

        //Duyệt các thẻ tdHoTen
        $(".tdHoTen").each(function (index, tdHoTen) {
            var hoTen = $(tdHoTen).text();
            if (hoTen.search(tuKhoa) != -1) {
                var viTriTuKhoa = hoTen.search(tuKhoa);
                tdHoTen.innerHTML = `${hoTen.substring(0, viTriTuKhoa)}
                <span class="InDam">${tuKhoa}</span>
                ${hoTen.substring(viTriTuKhoa + lengthTuKhoa)}`;
                console.log(tdHoTen);
            }
        });

     
        // $(".InDam").animate({
        //     fontSize: "30px"
        // }, 3000);
        $(".InDam").NhapNhay({fontSize:"25px"});
    }
   


    $("body").delegate(".btnXoa", "click", function () {
        //Lấy thông tin từ attribute của thẻ 
        var taiKhoan = $(this).attr("taikhoan");
        dsNguoiDung.XoaNguoiDung(taiKhoan);
        LoadTableNguoiDung(dsNguoiDung.DSND);
    });

    $("#btnXoaDSNguoiDung").click(function () {
        var lstTaiKhoan = [];
        //Duyệt mảng = phương thức map()
        $(".ckbTaiKhoan").map(function (index, item) {
            if (item.checked) {
                lstTaiKhoan.push($(item).val());
            }
        });
        //Gọi phương thức xóa danh sách người dùng
        dsNguoiDung.XoaDSNguoiDung(lstTaiKhoan);
        LoadTableNguoiDung(dsNguoiDung.DSND);
    });



    $("#ckbAll").click(function () {
        var ckbAllCheked = $("#ckbAll").is(":checked"); //Có attr đó trong thẻ ckbAll hay không
        $(".ckbTaiKhoan").each(function (index, item) {
            //console.log(index);

            $(this).prop("checked", ckbAllCheked);
            //=> thẻ chứa selector đó 
            //prop: thuộc tính của đối tượng selector đó
            //attr: thuộc tính trên thẻ của selector đó
        });
    });

    function LuuLocalStorage() {
        localStorage.setItem("DSND", JSON.stringify(dsNguoiDung.DSND));
    }
    function LayLocalStorage() {
        if (localStorage.getItem("DSND")) {
            dsNguoiDung.DSND = JSON.parse(localStorage.getItem("DSND"));
            LoadTableNguoiDung(dsNguoiDung.DSND);
        }
    }
    // PhanTrang(dsNguoiDung.DSND);
    function LoadTableNguoiDung(DSND) {
        //Object javascript
        var configPagination = {
            dataSource: DSND,
            pageSize: 5,
            showGoInput: true,
            showGoButton: true,
            callback: function (data, pagination) {
                // template method of yourself
                var html = template(data);
                $('#tblDanhSachNguoiDung').html(html);
            }
        }
        $('#pagination-container').pagination(configPagination);

        function template(mangNguoiDung) {
            var noiDungTbl = "";
            for (var i = 0; i < mangNguoiDung.length; i++) {
                var nguoiDung = mangNguoiDung[i];
                noiDungTbl += `
                    <tr class="trNguoiDung" taikhoan="${nguoiDung.TaiKhoan}" matkhau="${nguoiDung.MatKhau}" hoten="${nguoiDung.HoTen}" email="${nguoiDung.Email}" sodienthoai="${nguoiDung.SoDienThoai}" >
                        <td><input type="checkbox" class="ckbTaiKhoan" value="${nguoiDung.TaiKhoan}" /> </td>
                        <td> ${nguoiDung.TaiKhoan} </td>
                        <td> ${nguoiDung.MatKhau} </td>
                        <td class="tdHoTen"> ${nguoiDung.HoTen} </td>
                        <td> ${nguoiDung.Email} </td>
                        <td> ${nguoiDung.SoDienThoai} </td>
                        <td> 
                            <button  class="btn btn-danger btnXoa"  taikhoan="${nguoiDung.TaiKhoan}" >Xóa</button>
                            <button  class="btn btn-primary btnSua"   >Sửa</button>
                        </td>
                    </tr>
                `;
            }
            return noiDungTbl;
        }
    }

});



