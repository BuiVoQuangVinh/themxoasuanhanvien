const danhSachNhanVien = new DanhSachNhanVien()

const validation = new Validation();

// viết tắc lệnh
const getEle = (id) => {
    return document.getElementById(id)
}








// xóa thông báo lỗi của các form trước
const xoaLoiForm = ()=>{
    document.getElementById('tbMaNV').innerText = '';
    document.getElementById('tbTen').innerText = '';
    document.getElementById('tbEmail').innerText = '';
    document.getElementById('tbMatKhau').innerText = '';
    document.getElementById('tbNgay').innerText = '';
    document.getElementById('tbChucVu').innerText = '';
}

// lay thong tin nhân viên từ bảng
// tra về 1 biến nhan viên
const layThongTinTuBang = () => {
    //    lay thong tin nhan vien tu bang
    const msnv = getEle("msnv");
    const name = getEle("name");
    const email = getEle("email");
    const password = getEle("password");
    const date = getEle("datepicker");
    const chucvu = getEle("chucvu");
    const nhanVien = new NhanVien(msnv.value, name.value, email.value, password.value, date.value, chucvu.value,);
    return nhanVien;

}

// sua nhan vien 
const suaNhanVien = (id) => {
    // reset form 
    getEle('formNV').reset()
    getEle('msnv').setAttribute('disabled', true)
    getEle('btnThemNV').style.display = 'none';
    getEle('btnCapNhat').style.display = 'block';
    // xóa lỗi của form trước
    xoaLoiForm()

    // lấy thông tin nhân viên từ id
    const nv = danhSachNhanVien.layThongTinNhanVien(id)
    // hiển thị thông tinh nhân viên được chọn
    getEle("msnv").value = nv.msnv;
    getEle("name").value = nv.hoVaTen;
    getEle("email").value = nv.email;
    getEle("password").value = nv.password;
    getEle("datepicker").value = nv.ngayLam;
    getEle("chucvu").value = nv.chucVu;
}


// Hien thi nhan vien từ danh sách ra bang
const hienThi = (arr) => {
    const tbody = getEle('tableDanhSach')

    let content = arr.reduce((pre, current) => {
        return pre += `
            <tr>
            <td>${current.msnv}</td>
            <td>${current.hoVaTen}</td>
            <td>${current.email}</td>
            <td>${current.ngayLam}</td>
            <td>
                <button class='btn btn-danger' onclick='xoaNhanVien(${current.msnv})'> Xóa</button>
                <button id='btnSua' class='btn btn-warning'  onclick='suaNhanVien(${current.msnv})' data-toggle='modal' data-target='#myModal'> Sửa</button>
            </td>
            </tr>
        `
    }, ``)
    tbody.innerHTML = content;
}

// lưu xuống localStorage 
const setLocalStorage = (dsNhanVien) => {
    localStorage.setItem('dsnv', JSON.stringify(dsNhanVien))
}


// lấy dữ liệu từ local
const getLocalStorage = () => {
    // lấy dữ liệu từ local sau đó lưu vào danhSach
    if (localStorage.getItem('dsnv')) {
        const ds = JSON.parse(localStorage.getItem('dsnv'))
        danhSachNhanVien.danhSach = ds;
    }
    // hiển thị danh sách
    hienThi(danhSachNhanVien.danhSach)
}


// kiểm tra nhân viên vừa được thêm vào
const kiemTraNhanVien = (nv) => {
    let isValid = true;
    // kiểm tra msnv
    isValid &= validation.kiemTraRong(nv.msnv, 'tbMaNV', 'Mã số nhân viên không được để trống') && validation.kiemTraTrung(nv.msnv, danhSachNhanVien.danhSach, 'tbMaNV', 'Mã số nhân viên không được trùng');

    // kiểm tra họ và tên
    isValid &= validation.kiemTraRong(nv.hoVaTen, "tbTen", "Tên nhân viên không được để trống") && validation.kiemTraTen(nv.hoVaTen, "tbTen", "Tên nhân viên không hợp lệ");

    // kiểm tra email
    isValid &= validation.kiemTraEmail(nv.email, "tbEmail", "Email viên không hợp lệ");

    // kiểm tra mật khẩu
    isValid &= validation.kiemTraMatKhau(nv.password, 'tbMatKhau', 'Mật khẩu phải trên 6 ký tự');

    // kiểm tra ngày làm
    isValid &= validation.kiemTraNgayLam(nv.ngayLam, 'tbNgay', 'Ngày làm không hợp lệ');

    // kiểm tra chức vụ
    isValid &= validation.kiemTraChucVu('chucvu', 'tbChucVu', 'Chức vụ không được để trống')
    return isValid;
}


// kiểm tra cập nhật nhân viên
const kiemTraCapNhat = (nv)=>{
    let isValid = true;

    // kiểm tra họ và tên
    isValid &= validation.kiemTraRong(nv.hoVaTen, "tbTen", "Tên nhân viên không được để trống") && validation.kiemTraTen(nv.hoVaTen, "tbTen", "Tên nhân viên không hợp lệ");

    // kiểm tra email
    isValid &= validation.kiemTraEmail(nv.email, "tbEmail", "Email viên không hợp lệ");

    // kiểm tra mật khẩu
    isValid &= validation.kiemTraMatKhau(nv.password, 'tbMatKhau', 'Mật khẩu phải trên 6 ký tự');

    // kiểm tra ngày làm
    isValid &= validation.kiemTraNgayLam(nv.ngayLam, 'tbNgay', 'Ngày làm không hợp lệ');

    // kiểm tra chức vụ
    isValid &= validation.kiemTraChucVu('chucvu', 'tbChucVu', 'Chức vụ không được để trống')
    return isValid;
}

const themNhanVien = () => {
    const nhanVien = layThongTinTuBang();
    // kiem tra thong tin nhan vien
    const isValid = kiemTraNhanVien(nhanVien);


    if (isValid) {
        // them nhan vien vao danh sach
        danhSachNhanVien.themNV(nhanVien)
        // luu xuống localstorage
        setLocalStorage(danhSachNhanVien.danhSach)
        // hien thi Nhan vien ra bang
        hienThi(danhSachNhanVien.danhSach)
    }


}

// const btnThemNV = document.getElementById("btnThemNV");
const btnThemNV = getEle("btnThemNV")
btnThemNV.addEventListener("click", themNhanVien)


// xu ly form them nhan vien

getEle('btnThem').addEventListener('click', () => {
    getEle('formNV').reset();
    getEle('msnv').removeAttribute('disabled')
    getEle('btnThemNV').style.display = 'block';
    getEle('btnCapNhat').style.display = 'none';

    // xóa mess lỗi từ form trước
    xoaLoiForm()
})



const xoaNhanVien = (id) => {
    danhSachNhanVien.xoaNhanVien(id)

    // hien thi lai danh sach moi
    hienThi(danhSachNhanVien.danhSach)

    //  luu lai vao localstorage
    setLocalStorage(danhSachNhanVien.danhSach)
}

getEle('btnCapNhat').addEventListener('click', () => {
    const nhanVienCapNhat = layThongTinTuBang();
    const isValid = kiemTraCapNhat(nhanVienCapNhat)
    if (isValid) {
        danhSachNhanVien.suaNhanVien(nhanVienCapNhat);
        setLocalStorage(danhSachNhanVien.danhSach)
        hienThi(danhSachNhanVien.danhSach)
        getEle('btnDong').click();
    }
})


getLocalStorage()


