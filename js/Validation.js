class Validation {


    // kiểm tra rỗng
    kiemTraRong = (value, spanId, mess) => {
        if (value === '') {
            getEle(spanId).style.display = 'block'
            getEle(spanId).innerText = mess
            return false
        }
        getEle(spanId).style.display = 'none'
        getEle(spanId).innerText = '';
        return true;
    }

    // kiểm tra trùng mã nhân viên
    kiemTraTrung = (idNV, ds, spanId, mess) => {
        let isExist = false;
        ds.map((nv) => {
            // console.log('idNV:',idNV)
            // console.log('nv:',nv.msnv)

            if (nv.msnv === idNV) {
                isExist = true;
            }
        })

        // trường hợp đã có trong mảng 
        if (isExist) {
            getEle(spanId).style.display = 'block'
            getEle(spanId).innerText = mess;
            return false;
        }


        // trường hợp đã không có mảng
        getEle(spanId).style.display = 'none'
        getEle(spanId).innerText = '';
        return true;
    }


    // kiểm tra tên hợp lệ
    kiemTraTen = (value, spanId, mess) => {
        const pattern = new RegExp(
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
        );

        if (pattern.test(value)) {
            // tên hợp lệ
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerText = '';
            return true
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerText = mess;
        return false
    }

    // kiểm tra email 
    kiemTraEmail = (value, spanId, mess) => {
        const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (value.match(mailFormat)) {
            // tên hợp lệ
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerText = '';
            return true
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerText = mess;
        return false
    }

    // kiểm tra mật độ dài mật khẩu
    kiemTraMatKhau = (value, spanId, mess) => {
        console.log(value)
        const length = 6; // dộ dài mật khẩu ít nhất là 6 ký tự
        if (value.length < length) {
            getEle(spanId).style.display = 'block';
            getEle(spanId).innerText = mess;
            return false
        }
        getEle(spanId).style.display = 'none';
        getEle(spanId).innerText = '';
        return true
    }

    // kiểm tra ngày làm
    kiemTraNgayLam = (value, spanId, mess) => {
        const dateFormat = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/
        if (value.match(dateFormat)) {
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerText = '';
            return true
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerText = mess;
        return false
    }

    // kiểm tra chức vụ
    kiemTraChucVu = (inputId, spanId, mess) => {
        if (getEle(inputId).selectedIndex == 0) {
            getEle(spanId).style.display = 'block';
            getEle(spanId).innerText = mess;
            return false
        }

        getEle(spanId).style.display = 'none';
        getEle(spanId).innerText = '';
        return true
    }


}