/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*TYPEDJS*/
var typed = new Typed('#typed', {
    stringsElement: '#typed-strings',
    loop: true,
    typeSpeed: 50,
    startDelay: 2000,
});
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*KHÓA HỌC*/
var sv = new Service();
sv.LayDanhSachKhoaHoc().done(function (data) {
    console.log(data);
    var noiDung = '';
    for (var i = 9; i < 13; i++) {
        var khoaHoc = data[i];
        var moTa = "";
        if (khoaHoc.MoTa != null) {
            khoaHoc.MoTa.length > 100 ? moTa = khoaHoc.MoTa.substring(0, 100) + "..." : moTa = khoaHoc.MoTa;
        }
        noiDung += `
        <div class="col-md-4 col-lg-3 mobile-margin visible-xs" data-aos="zoom-in">
        <div class=" bg-light "  >
            <img class="card-img-top"  src="${khoaHoc.HinhAnh}" width="150" height="180" style="border-radius: 0;">
            <div class="card-body text-center text-dark">
  
                        <p class="font-weight-bold">
                            <td class="card-title">${khoaHoc.TenKhoaHoc}</td>
                        </p>
                        <p>
                            <td class="card-text">${khoaHoc.LuotXem}</td>    
                        </p>
                        <p>
                             <td>${moTa}</td>
            
             <div><button class=" myBtnJS">CHI TIẾT</button>    </div>
            </div>
        </div>
         </div>
    `;
    }
    console.log(noiDung);
    $('.noiDungTable').html(noiDung);
});
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*SCROLLINE*/
$.scrolline({
    position: 'bottom',
    backColor: '#000',
    frontColor: '#FFD600',
    weight: 12
});
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*MODAL*/
$('.btnPopup').click(function () {
    $('#btnModal').trigger('click')
});
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

