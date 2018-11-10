/*
Người tạo : Trần Minh Hiếu
Ngày tạo : 14/10/2018
Mục tiêu :
    - Xây dựng Thêm , Xoá , Sửa nhân viên
    - Xây dụng chức năng tìm kiếm theo Mã hoặc Tên NV
    - Sắp xếp table theo thứ tự giảm dần ( tuổi , lương )
    - Sắp xếp thứ tự tên nhân viên theo bảng chữ cái
    - Hiển thị nhân viên lương MAX
    - Đếm xem có bao nhiêu nhân viên lương > 10tr
*/
// DOM tới input date rồi gán giá trị = today
document.addEventListener("DOMContentLoaded", function (event) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    getEle('ngaySinh').value = today;

});

// chạy demo a xem
//----------------------CODE----------------------------
// Khởi tạo mảng DanhSachNhanVien
var DanhSachNhanVien = [];
// DOM ID
function getEle(id) {
    return document.getElementById(id);
}
console.log(typeof inputTen);
// DOM Create New Element
function create(id) {
    return document.createElement(id);
}
// Format số tiền 
function formatCurrency(n, separate = ".") {
    var s = n.toString();
    var len = s.length;
    var ret = "";
    for (var i = 1; i <= len; i++) {
        ret = s[(len - i)] + ret;
        if (i % 3 === 0 && i < len) {
            ret = separate + ret;
        }
    }
    return ret;
}
// Thêm nhân viên
function themNhanVien() {
    var isValidation = true;
    isValidation &= kiemTraNhap('ten','tbTen','**Vui lòng không để trống!') && kiemTraTen('ten','tbTen','**Tên phải là chữ!') && kiemTraLength('ten','tbTen','**Tên phải từ',4,30);
    isValidation &= kiemTraNhap('ma','tbMa','**Vui lòng không để trống!') && kiemTraMaNV('ma','tbMa','**Đã tồn tại mã nhân viên này!');
    isValidation &= kiemTraNhap('email','tbEmail','**Vui lòng không để trống!') && kiemTraEmail('email','tbEmail','**Email không đúng định dạng!');
    isValidation &= kiemTraNhap('sdt','tbSoDT','**Vui lòng không để trống!') && kiemTraSo('sdt','tbSoDT','**Số điện thoại phải là số!') && kiemTraLength('sdt','tbSoDT','**Số điện thoại phải từ',10,12);
    isValidation &= kiemTraNhap('luongCB','tbLuong','**Vui lòng không để trống!') && kiemTraSo('luongCB','tbLuong','**Lương phải là số!');
    isValidation &= kiemTraNhap('soNgayLam','tbSoNgayLam','**Vui lòng không để trống!') && kiemTraSo('soNgayLam','tbSoNgayLam','**Số ngày làm phải là số!');
    isValidation &= kiemTraNhap('phuCap','tbPhuCap','**Vui lòng không để trống!') && kiemTraSo('phuCap','tbPhuCap','**Phụ cấp phải là số!');
    isValidation &= chonChucVu('chucVu','tbChucVu','**Vui lòng chọn chức vụ!');
    if(isValidation){
        var ten = getEle('ten').value;
        var ma = getEle('ma').value;
        var email = getEle('email').value;
        var sdt = getEle('sdt').value;
        var ngaySinh = getEle('ngaySinh').value;
        var luongCB = getEle('luongCB').value;
        var soNgayLam = getEle('soNgayLam').value;
        var phuCap = getEle('phuCap').value;
        var chucVu = getEle('chucVu').value;
        // Chuyễn string thành number
        luongCB = parseFloat(luongCB);
        soNgayLam = parseFloat(soNgayLam);
        phuCap = parseFloat(phuCap);
        // Khởi tạo đối tượng NhanVienMoi
        var NhanVienMoi = new NhanVien(ten, ma, email, sdt, ngaySinh, luongCB, soNgayLam, phuCap, chucVu);
        NhanVienMoi.TinhLuong();
        // Gọi hàm hienThiNVVuaThem
        hienThiNVVuaThem(NhanVienMoi);
        // Push đối tượng NhanVienMoi vào mảng
        DanhSachNhanVien.push(NhanVienMoi);
        // Gọi hàm taoBang
        taoBang(DanhSachNhanVien);
        swal({
            type: 'success',
            title: 'Thêm nhân viên thành công',
            showConfirmButton: false,
            timer: 800
        })
        luuLocal();
        reset();
    }
}
// Tạo Table
function taoBang(mangDanhSach) {
    var tbody = getEle('tbody');
    tbody.innerHTML = "";
    for (var i = 0; i < mangDanhSach.length; i++) {
        // Tạo ra thẻ TR
        var trTag = create('tr');
        // Tạo ra thẻ TD
        var tdTen = create('td');
        var tdMa = create('td');
        var tdEmail = create('td');
        var tdSoDT = create('td');
        var tdNgaySinh = create('td');
        var tdChucVu = create('td');
        var tdTongLuong = create('td');
        var tdThaoTac = create('td');
        // Đổ dữ liệu vào thẻ TD
        tdTen.innerHTML = mangDanhSach[i].TenNV;
        tdMa.innerHTML = mangDanhSach[i].MaNV;
        tdEmail.innerHTML = mangDanhSach[i].Email;
        tdSoDT.innerHTML = mangDanhSach[i].SoDT;
        tdNgaySinh.innerHTML = mangDanhSach[i].NgaySinh;
        tdChucVu.innerHTML = mangDanhSach[i].ChucVu;
        var tongLuong =  mangDanhSach[i].TongLuong;
        tdTongLuong.innerHTML = formatCurrency(String(tongLuong), ",");
        tdThaoTac.innerHTML = `
        <button class="btn btn-danger" id="btnXoa_${i}"><i class="fa fa-times"></i></button>
        <button 
        data-ten = "${mangDanhSach[i].TenNV}"
        data-ma = "${mangDanhSach[i].MaNV}"
        data-email = "${mangDanhSach[i].Email}"
        data-sodt = "${mangDanhSach[i].SoDT}"
        data-ngaysinh = "${mangDanhSach[i].NgaySinh}"
        data-luongcb = "${mangDanhSach[i].LuongCB}"
        data-songaylam = "${mangDanhSach[i].SoNgayLam}"
        data-phucap = "${mangDanhSach[i].PhuCap}"
        data-chucvu = "${mangDanhSach[i].ChucVu}"
        data-toggle="modal" 
        data-target="#myModal"
        class="btn btn-success" id="btnSua_${i}"><i class="fa fa-wrench"></i></button>
        `;
        // Chèn thẻ TD vào TR
        trTag.appendChild(tdTen);
        trTag.appendChild(tdMa);
        trTag.appendChild(tdEmail);
        trTag.appendChild(tdSoDT);
        trTag.appendChild(tdNgaySinh);
        trTag.appendChild(tdChucVu);
        trTag.appendChild(tdTongLuong);
        trTag.appendChild(tdThaoTac);
        trTag.classList.add('table-success')
        // Chèn thẻ TR vào TBODY
        tbody.appendChild(trTag);
        // Gọi hàm Xoá một Nhân viên
        xoaNhanVien("btnXoa_" + i, mangDanhSach[i].MaNV);
        hienThiEdit("btnSua_" + i);
    }
}
// DOM button themNhanVien & Click
var btnThem = getEle('themNhanVien');
btnThem.addEventListener('click', themNhanVien);
// Hiển thị chi tiết Nhân viên vừa thêm
function hienThiNVVuaThem(NhanVienMoi) {
    getEle('htTen').innerHTML = NhanVienMoi.TenNV;
    getEle('htMa').innerHTML = NhanVienMoi.MaNV;
    getEle('htEmail').innerHTML = NhanVienMoi.Email;
    getEle('htSDT').innerHTML = NhanVienMoi.SoDT;
    getEle('htNgaySinh').innerHTML = NhanVienMoi.NgaySinh;
    getEle('htLuongCB').innerHTML = formatCurrency(String(NhanVienMoi.LuongCB), ",");
    getEle('htSoNgayLam').innerHTML = NhanVienMoi.SoNgayLam;
    getEle('htPhuCap').innerHTML = formatCurrency(String(NhanVienMoi.PhuCap), ",");
    getEle('htChucVu').innerHTML = NhanVienMoi.ChucVu;
    getEle('htTongLuong').innerHTML = formatCurrency(String(NhanVienMoi.TongLuong), ",") + " đ";
}
// Hàm Xoá một Nhân viên
function xoaNhanVien(idButton, maNV) {
    getEle(idButton).addEventListener('click', function () {
        swal({
            title: 'Bạn chắc chắn muốn xoá?',
            text: "Dữ liệu của bạn không thể hoàn tác!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                for (var i = 0; i < DanhSachNhanVien.length; i++) {
                    if (DanhSachNhanVien[i].MaNV === maNV) {
                        DanhSachNhanVien.splice(i, 1);
                    }
                }
                taoBang(DanhSachNhanVien);
                swal(
                    'Đã xoá thành công!',
                    'Dữ liệu đã xoá khỏi danh sách.',
                    'success'
                )
                luuLocal();
            }
        })
    })
}
// Hàm hiển thị dữ liệu lên popup
function hienThiEdit(idButton) {
    getEle(idButton).addEventListener('click', function () {
        // Lấy giá trị của thuộc tính nút Button Sửa
        var ten = this.getAttribute('data-ten');
        var ma = this.getAttribute('data-ma');
        var email = this.getAttribute('data-email');
        var soDT = this.getAttribute('data-sodt');
        var ngaySinh = this.getAttribute('data-ngaysinh');
        var luongCB = this.getAttribute('data-luongcb');
        var soNgayLam = this.getAttribute('data-songaylam');
        var phuCap = this.getAttribute('data-phucap');
        var chucVu = this.getAttribute('data-chucvu');
        // Hiển thị lên form POPUP
        getEle('editTen').value = ten;
        getEle('editMa').value = ma;
        getEle('editEmail').value = email;
        getEle('editSDT').value = soDT;
        getEle('editNgaySinh').value = ngaySinh;
        getEle('editLuongCB').value = luongCB;
        getEle('editSoNgayLam').value = soNgayLam;
        getEle('editPhuCap').value = phuCap;
        getEle('editChucVu').value = chucVu;
    })
}
// Hàm cập nhật thông tin nhân viên
function capNhatNhanVien() {
    var editTen = getEle('editTen').value;
    var editMa = getEle('editMa').value;
    var editEmail = getEle('editEmail').value;
    var editSDT = getEle('editSDT').value;
    var editNgaySinh = getEle('editNgaySinh').value;
    var editLuongCB = getEle('editLuongCB').value;
    var editSoNgayLam = getEle('editSoNgayLam').value;
    var editPhuCap = getEle('editPhuCap').value;
    var editChucVu = getEle('editChucVu').value;
    // Chuyển đổi string thành number
    editLuongCB = parseFloat(editLuongCB);
    editSoNgayLam = parseFloat(editSoNgayLam);
    editPhuCap = parseFloat(editPhuCap);
    // Tạo đối tượng NhanVienEdit 
    var NhanVienEdit = new NhanVien(editTen, editMa, editEmail, editSDT, editNgaySinh, editLuongCB, editSoNgayLam, editPhuCap, editChucVu);
    NhanVienEdit.TinhLuong();
    for (var i = 0; i < DanhSachNhanVien.length; i++) {
        if (DanhSachNhanVien[i].MaNV === NhanVienEdit.MaNV) {
            DanhSachNhanVien[i] = NhanVienEdit;
        }
    }
    taoBang(DanhSachNhanVien);
    luuLocal();
}
// DOM button luuNhanVien & Click
var btnLuu = getEle('luuNhanVien');
btnLuu.addEventListener('click', capNhatNhanVien);
// Hàm tìm kiếm theo mã & tên
function timKiem() {
    var selectSearch = getEle('search').value;
    if (selectSearch === "Tìm theo Mã") {
        var DanhSachTim = [];
        var keyword = getEle('txtSearch').value;
        for (var i = 0; i < DanhSachNhanVien.length; i++) {
            if (DanhSachNhanVien[i].MaNV.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
                DanhSachTim.push(DanhSachNhanVien[i]);
            }
        }
        taoBang(DanhSachTim);
    } else if (selectSearch === "Tìm theo Tên") {
        var DanhSachTim = [];
        var keyword = getEle('txtSearch').value;
        // Hàm check tìm kiếm có dấu vietnamese
        keyword = keyword.toLowerCase();
        keyword = keyword.trim();
        keyword = keyword.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        keyword = keyword.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        keyword = keyword.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        keyword = keyword.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        keyword = keyword.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        keyword = keyword.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        keyword = keyword.replace(/đ/g, "d");
        keyword = keyword.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
        keyword = keyword.replace(/-+-/g, "-");
        keyword = keyword.replace(/^\-+|\-+$/g, "");
        console.log(keyword);
        for (var i = 0; i < DanhSachNhanVien.length; i++) {
            // Hàm check tìm kiếm có dấu vietnamese
            var DanhSachTam = DanhSachNhanVien[i].TenNV;
            DanhSachTam = DanhSachTam.toLowerCase();
            DanhSachTam = DanhSachTam.trim();
            DanhSachTam = DanhSachTam.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            DanhSachTam = DanhSachTam.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            DanhSachTam = DanhSachTam.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            DanhSachTam = DanhSachTam.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            DanhSachTam = DanhSachTam.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            DanhSachTam = DanhSachTam.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            DanhSachTam = DanhSachTam.replace(/đ/g, "d");
            DanhSachTam = DanhSachTam.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
            DanhSachTam = DanhSachTam.replace(/-+-/g, "-");
            DanhSachTam = DanhSachTam.replace(/^\-+|\-+$/g, "");
            if (DanhSachTam.indexOf(keyword) !== -1) {
                DanhSachTim.push(DanhSachNhanVien[i]);
            }
        }
        taoBang(DanhSachTim);
    }
}
// DOM select search & keyup
var txtSearch = getEle('txtSearch');
txtSearch.addEventListener('keyup', timKiem)
// Hàm sắp xếp theo lương giảm dần & thứ tự tên theo bảng chữ cái
function sapXep() {
    var selectSapXep = getEle('sapXep');
    if(selectSapXep.selectedIndex === 1){
        for(var i=0 ; i<DanhSachNhanVien.length ; i++){
            for(var k=i+1; k<DanhSachNhanVien.length; k++){
                if(DanhSachNhanVien[i].TongLuong < DanhSachNhanVien[k].TongLuong){
                    var empty = DanhSachNhanVien[i];
                    DanhSachNhanVien[i] = DanhSachNhanVien[k];
                    DanhSachNhanVien[k] = empty;
                }
            }
        }
        taoBang(DanhSachNhanVien);
    }else if(selectSapXep.selectedIndex === 2){
        for(var i=0 ; i<DanhSachNhanVien.length ; i++){
            for(var k=i+1; k<DanhSachNhanVien.length; k++){
                if(DanhSachNhanVien[i].TenNV > DanhSachNhanVien[k].TenNV){
                    var empty = DanhSachNhanVien[i];
                    DanhSachNhanVien[i] = DanhSachNhanVien[k];
                    DanhSachNhanVien[k] = empty;
                }
            }
        }
        taoBang(DanhSachNhanVien);
    }
}
// DOM select SapXep & change
var selectSapXep = getEle('sapXep');
selectSapXep.addEventListener('change',sapXep);
// Hàm xuất ra Nhân viên lương cao nhất
function timLuongMax() {
    var max = 0;
    var DanhSachMax = [];
    for(var i=0; i<DanhSachNhanVien.length; i++){
        if(DanhSachNhanVien[i].TongLuong > max){
            max = DanhSachNhanVien[i].TongLuong;
        }
    }
    return max;
}
function hienThiNVLuongMax (){
    var MangLuongMax = [];
    for(var i=0; i<DanhSachNhanVien.length; i++){
        if(DanhSachNhanVien[i].TongLuong == timLuongMax()){
            MangLuongMax.push(DanhSachNhanVien[i]);
        }
    }
    taoBang(MangLuongMax);
}
// DOM button NVLương Max & click
var btnNVLuongMax = getEle('btn_luongMax');
btnNVLuongMax.addEventListener('click', hienThiNVLuongMax);
// Lưu dữ liệu trên LocalStorage
function luuLocal() {
    var dulieu = JSON.stringify(DanhSachNhanVien);
    localStorage.setItem('DSNV',dulieu);
}
// Lấy dữ liệu trên LocalStorage
function layLocal() {
    var dulieu = JSON.parse(localStorage.getItem('DSNV'));
    return dulieu != null ? dulieu : [];
}
// hiển thị dữ liệu ban đầu của LocalStorage
DanhSachNhanVien = layLocal();
taoBang(DanhSachNhanVien);
// Hàm reset input khi nhập form
function reset() {
    var inputTen = getEle('ten');
    var inputMa = getEle('ma');
    var inputEmail = getEle('email');
    var inputSDT = getEle('sdt');
    var inputLuongCB = getEle('luongCB');
    var inputSoNgayLam = getEle('soNgayLam');
    var inputPhuCap = getEle('phuCap');
    var selectChucVu = getEle('chucVu');
    inputTen.value = "";
    inputMa.value = "";
    inputEmail.value = "";
    inputSDT.value = "";
    inputLuongCB.value = "";
    inputSoNgayLam.value = "";
    inputPhuCap.value = "";
    selectChucVu.selectedIndex = 0;
}
//----------------Form Validation-----------------
// Hàm kiếm tra nhập
function kiemTraNhap(idField,spThongBao,content){
    var idField = getEle(idField).value;
    var spThongBao = getEle(spThongBao);
    if(idField === ""){
        spThongBao.innerHTML = content;
        return false;
    }
    spThongBao.innerHTML = "";
    return true;
}
// Hàm kiểm tra chức vụ
function chonChucVu(idField,spThongBao,content){
    var idField = getEle(idField);
    var spThongBao = getEle(spThongBao);
    if(idField.selectedIndex === 0){
        spThongBao.innerHTML = content;
        return false
    }
    spThongBao.innerHTML = "";
    return true;
}
// Hàm kiểm tra chiều dài ký tự
function kiemTraLength(idField,spThongBao,content,minLength,maxLength){
    var idField = getEle(idField).value;
    var spThongBao = getEle(spThongBao);
    if(idField.length < minLength || idField.length > maxLength){
        spThongBao.innerHTML = `${content} ${minLength} đến ${maxLength}`;
        return false;
    }
    spThongBao.innerHTML = "";
    return true;
}
// Hàm kiểm tra tên hợp lệ
function kiemTraTen(idField,spThongBao,content){
    var idField = getEle(idField).value;
    var spThongBao = getEle(spThongBao);
    var patt = new RegExp( "^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
    "ẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$");
    if(!patt.test(idField)){
        spThongBao.innerHTML = content;
        return false;
    }
    spThongBao.innerHTML="";
    return true;
}
// Hàm kiểm tra email hợp lệ
function kiemTraEmail(idField,spThongBao,content){
    var idField = getEle(idField).value;
    var spThongBao = getEle(spThongBao);
    var patt = new RegExp( "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
    if(!patt.test(idField)){
        spThongBao.innerHTML = content;
        return false;
    }
    spThongBao.innerHTML="";
    return true;
}
// Hàm kiểm tra số hợp lệ
function kiemTraSo(idField,spThongBao,content) {
    var idField = getEle(idField).value;
    var spThongBao = getEle(spThongBao);
    var patt = new RegExp("^[0-9]+$");
    if(!patt.test(idField)){
        spThongBao.innerHTML = content;
        return false;
    }
    spThongBao.innerHTML="";
    return true;
}
// Hàm kiểm tra mã không được trùng
function kiemTraMaNV(idField,spThongBao,content) {
    var idField = getEle(idField).value;
    var spThongBao = getEle(spThongBao);
    for(var i=0; i<DanhSachNhanVien.length; i++){
        if(DanhSachNhanVien[i].MaNV === idField){
            spThongBao.innerHTML = content;
            return false;
        } 
    }  
    spThongBao.innerHTML="";
    return true;
}






