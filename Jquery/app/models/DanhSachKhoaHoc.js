function DanhSachKhoaHoc()
{
    this.MangKhoaHoc = [];
    this.LayThongTinKhoaHoc = function (maKhoaHoc)
    {
        for(var i = 0; i<this.MangKhoaHoc.length;i++)
        {
            if(this.MangKhoaHoc[i].MaKhoaHoc == maKhoaHoc)
            {
                return this.MangKhoaHoc[i];
            }
        }
        return null;
    }
}