function NguoiDungService() {
    this.layDanhSachNguoiDung = function () {
        $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
            type: "GET"
        })
            .done(function (danhSachNguoiDung) {
                taoBang(danhSachNguoiDung);
            })
            .fail(function (err) {
                console.log(err);
            })
    }

    this.themNguoiDung = function (nguoiDung) {
        $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung",
            type: "POST",
            data: nguoiDung
        })
            .done(function (result) {
                console.log(result);
                if (result === "tai khoan da ton tai !") {
                    alert("Tai khoan đã tồn tại");
                } else {
                    location.href = "";
                }
            })
            .fail(function (err) {
                console.log(err);
            })
    }

    this.xoaNguoiDung = function (taiKhoan) {
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${taiKhoan}`,
            type: "DELETE"
        })
            .done(function (result) {
                location.href = "";
            })
            .fail(function (err) {
                console.log(err);
            })
    }

    this.layThongTinNguoiDung = function (taiKhoan) {
        var thongTinNguoiDung = [];
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/ThongTinNguoiDung?taikhoan=${taiKhoan}`,
            type: "GET",
            async: false
        })
            .done(function (result) {
                thongTinNguoiDung = result;
                console.log(result);
            })
            .fail(function (err) {
                console.log(err);
            })
        console.log(thongTinNguoiDung);
        return thongTinNguoiDung;
    }

    this.capNhatNguoiDung = function (nguoiDung) {
        var ngd = JSON.stringify(nguoiDung);
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung`,
            type: "PUT",
            contentType: 'application/json',
            dataType : "json",
            data: ngd,
        })
        .done(function (result) {
            location.href = "";
        })
        .fail(function (err) {
            console.log(err);
        })
    }
}
function taoBang(danhSachNguoiDung) {
    var tblBody = "";
    danhSachNguoiDung.map(function (item, index) {
        tblBody += `<tr>
        <td>${index + 1}</td>
        <td>${item.TaiKhoan}</td>
        <td>${item.MatKhau}</td>
        <td>${item.HoTen}</td>
        <td>${item.Email}</td>
        <td>${item.SoDT}</td>
        <td>${item.TenLoaiNguoiDung}</td>
        <td><button id='btnSua' class='btn btn-primary' data-toggle="modal" data-target="#myModal" data-taikhoan='${item.TaiKhoan}'>Sửa</button><button id='btnXoa' class='btn btn-danger' data-taikhoan='${item.TaiKhoan}'>Xóa</button></td>
    </tr>`
    })
    $("#tblDanhSachNguoiDung").html(tblBody);
}
