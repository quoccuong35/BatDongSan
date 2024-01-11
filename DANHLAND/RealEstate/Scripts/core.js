$(document).ready(function () {
    var activePage = window.location.href.split('/')[3];
    $('#kt_header_menu li a').each(function () {
        var full_link = this.href;
        var linkPage = full_link.split('/')[3]; 
        if (activePage == linkPage) {
            if ($(this).hasClass('one-menu')) {
                $(this).parent().addClass('menu-item-active');
            } else if (full_link == window.location.href) {
                $(this).parent().addClass('menu-item-active');
                $(this).parent().parent().parent().parent().addClass('menu-item-active');
            }
        }
    });
});
function setDanhMuc(id, data, required, placeholder,value) {
    $selectbox = $("#" + id).dxSelectBox({
        items: data,
        placeholder: 'Chọn ' + placeholder.toLowerCase()+'..',
        showClearButton: !required,
        searchEnabled: true,
        value: value,
        valueExpr: "term_taxonomy_id",
        displayExpr: "name",
    });
    if (required) {
        $selectbox.dxValidator({ validationRules: [{ type: "required", message: placeholder+" không được trống!" }] });
    }
}
// Can ho
function setDanhMuc1(id, data, required, placeholder, value) {
    $selectbox = $("#" + id).dxSelectBox({
        items: data,
        placeholder: 'Chọn ' + placeholder.toLowerCase() + '..',
        showClearButton: !required,
        searchEnabled: true,
        value: value,
        valueExpr: "term_id",
        displayExpr: "name",
    });
    if (required) {
        $selectbox.dxValidator({ validationRules: [{ type: "required", message: placeholder + " không được trống!" }] });
    }
}
var NumToText = function () { var t = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"], r = function (r, n) { var o = "", a = Math.floor(r / 10), e = r % 10; return a > 1 ? (o = " " + t[a] + " mươi", 1 == e && (o += " mốt")) : 1 == a ? (o = " mười", 1 == e && (o += " một")) : n && e > 0 && (o = " lẻ"), 5 == e && a >= 1 ? o += " lăm" : 4 == e && a >= 1 ? o += " tư" : (e > 1 || 1 == e && 0 == a) && (o += " " + t[e]), o }, n = function (n, o) { var a = "", e = Math.floor(n / 100), n = n % 100; return o || e > 0 ? (a = " " + t[e] + " trăm", a += r(n, !0)) : a = r(n, !1), a }, o = function (t, r) { var o = "", a = Math.floor(t / 1e6), t = t % 1e6; a > 0 && (o = n(a, r) + " triệu", r = !0); var e = Math.floor(t / 1e3), t = t % 1e3; return e > 0 && (o += n(e, r) + " ngàn", r = !0), t > 0 && (o += n(t, r)), o }; return { convert: function (r) { if (0 == r) return t[0]; var n = "", a = ""; do ty = r % 1e9, r = Math.floor(r / 1e9), n = r > 0 ? o(ty, !0) + a + n : o(ty, !1) + a + n, a = " tỷ"; while (r > 0); return n.trim() } } }();
var ShowToast = {
    success: function (mess, time) {
        $.notify({ message: mess, icon: 'icon flaticon2-checkmark' }, {
            type: 'success',
            timer: time,
            placement: {
                from: 'bottom',
                align: 'center'
            },
            delay: 1000,
            z_index: 1000,
            animate: {
                enter: 'animate__animated animate__bounce',
                exit: 'animate__animated animate__bounce'
            }
        });
    },
    info: function (mess, time) {
        $.notify({ message: mess, icon: 'icon flaticon-exclamation-2' }, {
            type: 'primary',
            timer: time,
            placement: {
                from: 'bottom',
                align: 'center'
            },
            delay: 1000,
            z_index: 1000,
            animate: {
                enter: 'animate__animated animate__bounce',
                exit: 'animate__animated animate__bounce'
            }
        });
    },
    warning: function (mess, time) {
        $.notify({ message: mess, icon: 'icon la la-warning' }, {
            type: 'warning',
            timer: time,
            placement: {
                from: 'bottom',
                align: 'center'
            },

            delay: 1000,
            z_index: 1000,
            animate: {
                enter: 'animate__animated animate__bounce',
                exit: 'animate__animated animate__bounce'
            }
        });
    },
    error: function (mess, time) {
        $.notify({ message: mess, icon: 'icon la la-warning' }, {
            type: 'error',
            timer: time,
            placement: {
                from: 'bottom',
                align: 'center'
            },

            delay: 1000,
            z_index: 1000,
            animate: {
                enter: 'animate__animated animate__bounce',
                exit: 'animate__animated animate__bounce'
            }
        });
    }
}