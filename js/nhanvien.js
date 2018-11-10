function NhanVien(tenNV,maNV,email,soDT,ngaySinh,luongCB,soNgayLam,phuCap,chucVu) {
    this.TenNV = tenNV;
    this.MaNV = maNV;
    this.Email = email;
    this.SoDT = soDT;
    this.NgaySinh = ngaySinh;
    this.LuongCB = luongCB;
    this.SoNgayLam = soNgayLam;
    this.PhuCap = phuCap;
    this.ChucVu = chucVu;
    this.TinhLuong = function(){
        this.TongLuong = this.SoNgayLam * this.LuongCB + this.PhuCap;
    }
}