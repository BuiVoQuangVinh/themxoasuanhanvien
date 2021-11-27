class DanhSachNhanVien {
    constructor() {
        this.danhSach = [];
    }
    // them nhan vien
    themNV = (nv) => {
        this.danhSach.push(nv)
    }

    // checkVi tri

    viTri = (id) => {
        let viTri = -1;
        this.danhSach.map((nhanVien, index) => {
            if (nhanVien.msnv == id) {
                viTri = index
            }
        })
        return viTri
    }



    // xóa nhân viên
    xoaNhanVien = (id) => {
        let viTri = this.viTri(id)
        if (viTri > -1) {
            this.danhSach.splice(viTri, 1)
        }
    }

    // lấy thông tin nhân viên

    layThongTinNhanVien = (id)=>{
        let nhanVien = {}
        const viTri = this.viTri(id)
        if( viTri >=0){
            nhanVien =  this.danhSach[viTri]
        }
        return nhanVien
    }

    // sửa nhan viên
    suaNhanVien = (NV) => {
        console.log(NV)
        let viTri = this.viTri(NV.msnv);
        if (viTri > -1) {
            this.danhSach[viTri] = NV
        }


    }
}

