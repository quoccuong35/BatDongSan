﻿! function (e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Uppy = e()
    }
}((function () {
    var e, t, r, n = function (e) {
        var t;
        return function (r) {
            return t || e(t = {
                exports: {},
                parent: r
            }, t.exports), t.exports
        }
    },
        i = n((function (e, t) {
            var r = ol("socket.io-client");
            e.exports = t = i;
            var n = t.managers = {};

            function i(e, t) {
                "object" == typeof e && (t = e, e = void 0), t = t || {};
                var i, o = al(e),
                    s = o.source,
                    a = o.id,
                    u = o.path,
                    l = n[a] && u in n[a].nsps;
                return t.forceNew || t["force new connection"] || !1 === t.multiplex || l ? (r("ignoring socket cache for %s", s), i = ap(s, t)) : (n[a] || (r("new io instance for %s", s), n[a] = ap(s, t)), i = n[a]), o.query && !t.query && (t.query = o.query), i.socket(o.path, t)
            }
            t.protocol = Sl.protocol, t.connect = i, t.Manager = ap, t.Socket = ep
        })),
        o = n((function (e, t) { })),
        s = n((function (e, t) {
            (function (e) {
                "use strict";
                t.Buffer = e, t.INSPECT_MAX_BYTES = 50;

                function r(t) {
                    if (t > 2147483647) throw new RangeError('The value "' + t + '" is invalid for option "size"');
                    var r = new Uint8Array(t);
                    return r.__proto__ = e.prototype, r
                }

                function e(e, t, r) {
                    if ("number" == typeof e) {
                        if ("string" == typeof t) throw new TypeError('The "string" argument must be of type string. Received type number');
                        return o(e)
                    }
                    return n(e, t, r)
                }

                function n(t, n, i) {
                    if ("string" == typeof t) return function (t, n) {
                        if ("string" == typeof n && "" !== n || (n = "utf8"), !e.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
                        var i = 0 | u(t, n),
                            o = r(i),
                            s = o.write(t, n);
                        return s !== i && (o = o.slice(0, s)), o
                    }(t, n);
                    if (ArrayBuffer.isView(t)) return s(t);
                    if (null == t) throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
                    if (D(t, ArrayBuffer) || t && D(t.buffer, ArrayBuffer)) return function (t, r, n) {
                        if (r < 0 || t.byteLength < r) throw new RangeError('"offset" is outside of buffer bounds');
                        if (t.byteLength < r + (n || 0)) throw new RangeError('"length" is outside of buffer bounds');
                        var i;
                        return (i = void 0 === r && void 0 === n ? new Uint8Array(t) : void 0 === n ? new Uint8Array(t, r) : new Uint8Array(t, r, n)).__proto__ = e.prototype, i
                    }(t, n, i);
                    if ("number" == typeof t) throw new TypeError('The "value" argument must not be of type number. Received type number');
                    var o = t.valueOf && t.valueOf();
                    if (null != o && o !== t) return e.from(o, n, i);
                    var l = function (t) {
                        if (e.isBuffer(t)) {
                            var n = 0 | a(t.length),
                                i = r(n);
                            return 0 === i.length || t.copy(i, 0, 0, n), i
                        }
                        return void 0 !== t.length ? "number" != typeof t.length || B(t.length) ? r(0) : s(t) : "Buffer" === t.type && Array.isArray(t.data) ? s(t.data) : void 0
                    }(t);
                    if (l) return l;
                    if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof t[Symbol.toPrimitive]) return e.from(t[Symbol.toPrimitive]("string"), n, i);
                    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t)
                }

                function i(e) {
                    if ("number" != typeof e) throw new TypeError('"size" argument must be of type number');
                    if (e < 0) throw new RangeError('The value "' + e + '" is invalid for option "size"')
                }

                function o(e) {
                    return i(e), r(e < 0 ? 0 : 0 | a(e))
                }

                function s(e) {
                    for (var t = e.length < 0 ? 0 : 0 | a(e.length), n = r(t), i = 0; i < t; i += 1) n[i] = 255 & e[i];
                    return n
                }

                function a(e) {
                    if (e >= 2147483647) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + 2147483647..toString(16) + " bytes");
                    return 0 | e
                }

                function u(t, r) {
                    if (e.isBuffer(t)) return t.length;
                    if (ArrayBuffer.isView(t) || D(t, ArrayBuffer)) return t.byteLength;
                    if ("string" != typeof t) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t);
                    var n = t.length,
                        i = arguments.length > 2 && !0 === arguments[2];
                    if (!i && 0 === n) return 0;
                    for (var o = !1; ;) switch (r) {
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return n;
                        case "utf8":
                        case "utf-8":
                            return R(t).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return 2 * n;
                        case "hex":
                            return n >>> 1;
                        case "base64":
                            return T(t).length;
                        default:
                            if (o) return i ? -1 : R(t).length;
                            r = ("" + r).toLowerCase(), o = !0
                    }
                }

                function l(e, t, r) {
                    var n = e[t];
                    e[t] = e[r], e[r] = n
                }

                function c(t, r, n, i, o) {
                    if (0 === t.length) return -1;
                    if ("string" == typeof n ? (i = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), B(n = +n) && (n = o ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
                        if (o) return -1;
                        n = t.length - 1
                    } else if (n < 0) {
                        if (!o) return -1;
                        n = 0
                    }
                    if ("string" == typeof r && (r = e.from(r, i)), e.isBuffer(r)) return 0 === r.length ? -1 : p(t, r, n, i, o);
                    if ("number" == typeof r) return r &= 255, "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, r, n) : Uint8Array.prototype.lastIndexOf.call(t, r, n) : p(t, [r], n, i, o);
                    throw new TypeError("val must be string, number or Buffer")
                }

                function p(e, t, r, n, i) {
                    var o, s = 1,
                        a = e.length,
                        u = t.length;
                    if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                        if (e.length < 2 || t.length < 2) return -1;
                        s = 2, a /= 2, u /= 2, r /= 2
                    }

                    function l(e, t) {
                        return 1 === s ? e[t] : e.readUInt16BE(t * s)
                    }
                    if (i) {
                        var c = -1;
                        for (o = r; o < a; o++)
                            if (l(e, o) === l(t, -1 === c ? 0 : o - c)) {
                                if (-1 === c && (c = o), o - c + 1 === u) return c * s
                            } else -1 !== c && (o -= o - c), c = -1
                    } else
                        for (r + u > a && (r = a - u), o = r; o >= 0; o--) {
                            for (var p = !0, d = 0; d < u; d++)
                                if (l(e, o + d) !== l(t, d)) {
                                    p = !1;
                                    break
                                } if (p) return o
                        }
                    return -1
                }

                function d(e, t, r, n) {
                    r = Number(r) || 0;
                    var i = e.length - r;
                    n ? (n = Number(n)) > i && (n = i) : n = i;
                    var o = t.length;
                    n > o / 2 && (n = o / 2);
                    for (var s = 0; s < n; ++s) {
                        var a = parseInt(t.substr(2 * s, 2), 16);
                        if (B(a)) return s;
                        e[r + s] = a
                    }
                    return s
                }

                function h(e, t, r, n) {
                    return x(R(t, e.length - r), e, r, n)
                }

                function f(e, t, r, n) {
                    return x(function (e) {
                        for (var t = [], r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
                        return t
                    }(t), e, r, n)
                }

                function y(e, t, r, n) {
                    return f(e, t, r, n)
                }

                function g(e, t, r, n) {
                    return x(T(t), e, r, n)
                }

                function v(e, t, r, n) {
                    return x(function (e, t) {
                        for (var r, n, i, o = [], s = 0; s < e.length && !((t -= 2) < 0); ++s) n = (r = e.charCodeAt(s)) >> 8, i = r % 256, o.push(i), o.push(n);
                        return o
                    }(t, e.length - r), e, r, n)
                }

                function m(e, t, r) {
                    return 0 === t && r === e.length ? yn.fromByteArray(e) : yn.fromByteArray(e.slice(t, r))
                }

                function b(e, t, r) {
                    r = Math.min(e.length, r);
                    for (var n = [], i = t; i < r;) {
                        var o, s, a, u, l = e[i],
                            c = null,
                            p = l > 239 ? 4 : l > 223 ? 3 : l > 191 ? 2 : 1;
                        if (i + p <= r) switch (p) {
                            case 1:
                                l < 128 && (c = l);
                                break;
                            case 2:
                                128 == (192 & (o = e[i + 1])) && (u = (31 & l) << 6 | 63 & o) > 127 && (c = u);
                                break;
                            case 3:
                                o = e[i + 1], s = e[i + 2], 128 == (192 & o) && 128 == (192 & s) && (u = (15 & l) << 12 | (63 & o) << 6 | 63 & s) > 2047 && (u < 55296 || u > 57343) && (c = u);
                                break;
                            case 4:
                                o = e[i + 1], s = e[i + 2], a = e[i + 3], 128 == (192 & o) && 128 == (192 & s) && 128 == (192 & a) && (u = (15 & l) << 18 | (63 & o) << 12 | (63 & s) << 6 | 63 & a) > 65535 && u < 1114112 && (c = u)
                        }
                        null === c ? (c = 65533, p = 1) : c > 65535 && (c -= 65536, n.push(c >>> 10 & 1023 | 55296), c = 56320 | 1023 & c), n.push(c), i += p
                    }
                    return function (e) {
                        var t = e.length;
                        if (t <= w) return String.fromCharCode.apply(String, e);
                        for (var r = "", n = 0; n < t;) r += String.fromCharCode.apply(String, e.slice(n, n += w));
                        return r
                    }(n)
                }
                e.TYPED_ARRAY_SUPPORT = function () {
                    try {
                        var e = new Uint8Array(1);
                        return e.__proto__ = {
                            __proto__: Uint8Array.prototype,
                            foo: function () {
                                return 42
                            }
                        }, 42 === e.foo()
                    } catch (t) {
                        return !1
                    }
                }(), e.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(e.prototype, "parent", {
                    enumerable: !0,
                    get: function () {
                        if (e.isBuffer(this)) return this.buffer
                    }
                }), Object.defineProperty(e.prototype, "offset", {
                    enumerable: !0,
                    get: function () {
                        if (e.isBuffer(this)) return this.byteOffset
                    }
                }), "undefined" != typeof Symbol && null != Symbol.species && e[Symbol.species] === e && Object.defineProperty(e, Symbol.species, {
                    value: null,
                    configurable: !0,
                    enumerable: !1,
                    writable: !1
                }), e.poolSize = 8192, e.from = function (e, t, r) {
                    return n(e, t, r)
                }, e.prototype.__proto__ = Uint8Array.prototype, e.__proto__ = Uint8Array, e.alloc = function (e, t, n) {
                    return function (e, t, n) {
                        return i(e), e <= 0 ? r(e) : void 0 !== t ? "string" == typeof n ? r(e).fill(t, n) : r(e).fill(t) : r(e)
                    }(e, t, n)
                }, e.allocUnsafe = function (e) {
                    return o(e)
                }, e.allocUnsafeSlow = function (e) {
                    return o(e)
                }, e.isBuffer = function (t) {
                    return null != t && !0 === t._isBuffer && t !== e.prototype
                }, e.compare = function (t, r) {
                    if (D(t, Uint8Array) && (t = e.from(t, t.offset, t.byteLength)), D(r, Uint8Array) && (r = e.from(r, r.offset, r.byteLength)), !e.isBuffer(t) || !e.isBuffer(r)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                    if (t === r) return 0;
                    for (var n = t.length, i = r.length, o = 0, s = Math.min(n, i); o < s; ++o)
                        if (t[o] !== r[o]) {
                            n = t[o], i = r[o];
                            break
                        } return n < i ? -1 : i < n ? 1 : 0
                }, e.isEncoding = function (e) {
                    switch (String(e).toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "latin1":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                }, e.concat = function (t, r) {
                    if (!Array.isArray(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === t.length) return e.alloc(0);
                    var n;
                    if (void 0 === r)
                        for (r = 0, n = 0; n < t.length; ++n) r += t[n].length;
                    var i = e.allocUnsafe(r),
                        o = 0;
                    for (n = 0; n < t.length; ++n) {
                        var s = t[n];
                        if (D(s, Uint8Array) && (s = e.from(s)), !e.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
                        s.copy(i, o), o += s.length
                    }
                    return i
                }, e.byteLength = u, e.prototype._isBuffer = !0, e.prototype.swap16 = function () {
                    var e = this.length;
                    if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (var t = 0; t < e; t += 2) l(this, t, t + 1);
                    return this
                }, e.prototype.swap32 = function () {
                    var e = this.length;
                    if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (var t = 0; t < e; t += 4) l(this, t, t + 3), l(this, t + 1, t + 2);
                    return this
                }, e.prototype.swap64 = function () {
                    var e = this.length;
                    if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (var t = 0; t < e; t += 8) l(this, t, t + 7), l(this, t + 1, t + 6), l(this, t + 2, t + 5), l(this, t + 3, t + 4);
                    return this
                }, e.prototype.toString = function () {
                    var e = this.length;
                    return 0 === e ? "" : 0 === arguments.length ? b(this, 0, e) : function (e, t, r) {
                        var n = !1;
                        if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
                        if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
                        if ((r >>>= 0) <= (t >>>= 0)) return "";
                        for (e || (e = "utf8"); ;) switch (e) {
                            case "hex":
                                return k(this, t, r);
                            case "utf8":
                            case "utf-8":
                                return b(this, t, r);
                            case "ascii":
                                return _(this, t, r);
                            case "latin1":
                            case "binary":
                                return S(this, t, r);
                            case "base64":
                                return m(this, t, r);
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return P(this, t, r);
                            default:
                                if (n) throw new TypeError("Unknown encoding: " + e);
                                e = (e + "").toLowerCase(), n = !0
                        }
                    }.apply(this, arguments)
                }, e.prototype.toLocaleString = e.prototype.toString, e.prototype.equals = function (t) {
                    if (!e.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    return this === t || 0 === e.compare(this, t)
                }, e.prototype.inspect = function () {
                    var e = "",
                        r = t.INSPECT_MAX_BYTES;
                    return e = this.toString("hex", 0, r).replace(/(.{2})/g, "$1 ").trim(), this.length > r && (e += " ... "), "<Buffer " + e + ">"
                }, e.prototype.compare = function (t, r, n, i, o) {
                    if (D(t, Uint8Array) && (t = e.from(t, t.offset, t.byteLength)), !e.isBuffer(t)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
                    if (void 0 === r && (r = 0), void 0 === n && (n = t ? t.length : 0), void 0 === i && (i = 0), void 0 === o && (o = this.length), r < 0 || n > t.length || i < 0 || o > this.length) throw new RangeError("out of range index");
                    if (i >= o && r >= n) return 0;
                    if (i >= o) return -1;
                    if (r >= n) return 1;
                    if (this === t) return 0;
                    for (var s = (o >>>= 0) - (i >>>= 0), a = (n >>>= 0) - (r >>>= 0), u = Math.min(s, a), l = this.slice(i, o), c = t.slice(r, n), p = 0; p < u; ++p)
                        if (l[p] !== c[p]) {
                            s = l[p], a = c[p];
                            break
                        } return s < a ? -1 : a < s ? 1 : 0
                }, e.prototype.includes = function (e, t, r) {
                    return -1 !== this.indexOf(e, t, r)
                }, e.prototype.indexOf = function (e, t, r) {
                    return c(this, e, t, r, !0)
                }, e.prototype.lastIndexOf = function (e, t, r) {
                    return c(this, e, t, r, !1)
                }, e.prototype.write = function (e, t, r, n) {
                    if (void 0 === t) n = "utf8", r = this.length, t = 0;
                    else if (void 0 === r && "string" == typeof t) n = t, r = this.length, t = 0;
                    else {
                        if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        t >>>= 0, isFinite(r) ? (r >>>= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0)
                    }
                    var i = this.length - t;
                    if ((void 0 === r || r > i) && (r = i), e.length > 0 && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                    n || (n = "utf8");
                    for (var o = !1; ;) switch (n) {
                        case "hex":
                            return d(this, e, t, r);
                        case "utf8":
                        case "utf-8":
                            return h(this, e, t, r);
                        case "ascii":
                            return f(this, e, t, r);
                        case "latin1":
                        case "binary":
                            return y(this, e, t, r);
                        case "base64":
                            return g(this, e, t, r);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return v(this, e, t, r);
                        default:
                            if (o) throw new TypeError("Unknown encoding: " + n);
                            n = ("" + n).toLowerCase(), o = !0
                    }
                }, e.prototype.toJSON = function () {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    }
                };
                var w = 4096;

                function _(e, t, r) {
                    var n = "";
                    r = Math.min(e.length, r);
                    for (var i = t; i < r; ++i) n += String.fromCharCode(127 & e[i]);
                    return n
                }

                function S(e, t, r) {
                    var n = "";
                    r = Math.min(e.length, r);
                    for (var i = t; i < r; ++i) n += String.fromCharCode(e[i]);
                    return n
                }

                function k(e, t, r) {
                    var n, i = e.length;
                    (!t || t < 0) && (t = 0), (!r || r < 0 || r > i) && (r = i);
                    for (var o = "", s = t; s < r; ++s) o += (n = e[s]) < 16 ? "0" + n.toString(16) : n.toString(16);
                    return o
                }

                function P(e, t, r) {
                    for (var n = e.slice(t, r), i = "", o = 0; o < n.length; o += 2) i += String.fromCharCode(n[o] + 256 * n[o + 1]);
                    return i
                }

                function C(e, t, r) {
                    if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
                    if (e + t > r) throw new RangeError("Trying to access beyond buffer length")
                }

                function E(t, r, n, i, o, s) {
                    if (!e.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (r > o || r < s) throw new RangeError('"value" argument is out of bounds');
                    if (n + i > t.length) throw new RangeError("Index out of range")
                }

                function A(e, t, r, n, i, o) {
                    if (r + n > e.length) throw new RangeError("Index out of range");
                    if (r < 0) throw new RangeError("Index out of range")
                }

                function F(e, t, r, n, i) {
                    return t = +t, r >>>= 0, i || A(e, 0, r, 4), En.write(e, t, r, n, 23, 4), r + 4
                }

                function O(e, t, r, n, i) {
                    return t = +t, r >>>= 0, i || A(e, 0, r, 8), En.write(e, t, r, n, 52, 8), r + 8
                }
                e.prototype.slice = function (t, r) {
                    var n = this.length;
                    (t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n), (r = void 0 === r ? n : ~~r) < 0 ? (r += n) < 0 && (r = 0) : r > n && (r = n), r < t && (r = t);
                    var i = this.subarray(t, r);
                    return i.__proto__ = e.prototype, i
                }, e.prototype.readUIntLE = function (e, t, r) {
                    e >>>= 0, t >>>= 0, r || C(e, t, this.length);
                    for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256);) n += this[e + o] * i;
                    return n
                }, e.prototype.readUIntBE = function (e, t, r) {
                    e >>>= 0, t >>>= 0, r || C(e, t, this.length);
                    for (var n = this[e + --t], i = 1; t > 0 && (i *= 256);) n += this[e + --t] * i;
                    return n
                }, e.prototype.readUInt8 = function (e, t) {
                    return e >>>= 0, t || C(e, 1, this.length), this[e]
                }, e.prototype.readUInt16LE = function (e, t) {
                    return e >>>= 0, t || C(e, 2, this.length), this[e] | this[e + 1] << 8
                }, e.prototype.readUInt16BE = function (e, t) {
                    return e >>>= 0, t || C(e, 2, this.length), this[e] << 8 | this[e + 1]
                }, e.prototype.readUInt32LE = function (e, t) {
                    return e >>>= 0, t || C(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
                }, e.prototype.readUInt32BE = function (e, t) {
                    return e >>>= 0, t || C(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
                }, e.prototype.readIntLE = function (e, t, r) {
                    e >>>= 0, t >>>= 0, r || C(e, t, this.length);
                    for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256);) n += this[e + o] * i;
                    return n >= (i *= 128) && (n -= Math.pow(2, 8 * t)), n
                }, e.prototype.readIntBE = function (e, t, r) {
                    e >>>= 0, t >>>= 0, r || C(e, t, this.length);
                    for (var n = t, i = 1, o = this[e + --n]; n > 0 && (i *= 256);) o += this[e + --n] * i;
                    return o >= (i *= 128) && (o -= Math.pow(2, 8 * t)), o
                }, e.prototype.readInt8 = function (e, t) {
                    return e >>>= 0, t || C(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
                }, e.prototype.readInt16LE = function (e, t) {
                    e >>>= 0, t || C(e, 2, this.length);
                    var r = this[e] | this[e + 1] << 8;
                    return 32768 & r ? 4294901760 | r : r
                }, e.prototype.readInt16BE = function (e, t) {
                    e >>>= 0, t || C(e, 2, this.length);
                    var r = this[e + 1] | this[e] << 8;
                    return 32768 & r ? 4294901760 | r : r
                }, e.prototype.readInt32LE = function (e, t) {
                    return e >>>= 0, t || C(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
                }, e.prototype.readInt32BE = function (e, t) {
                    return e >>>= 0, t || C(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
                }, e.prototype.readFloatLE = function (e, t) {
                    return e >>>= 0, t || C(e, 4, this.length), En.read(this, e, !0, 23, 4)
                }, e.prototype.readFloatBE = function (e, t) {
                    return e >>>= 0, t || C(e, 4, this.length), En.read(this, e, !1, 23, 4)
                }, e.prototype.readDoubleLE = function (e, t) {
                    return e >>>= 0, t || C(e, 8, this.length), En.read(this, e, !0, 52, 8)
                }, e.prototype.readDoubleBE = function (e, t) {
                    return e >>>= 0, t || C(e, 8, this.length), En.read(this, e, !1, 52, 8)
                }, e.prototype.writeUIntLE = function (e, t, r, n) {
                    e = +e, t >>>= 0, r >>>= 0, n || E(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                    var i = 1,
                        o = 0;
                    for (this[t] = 255 & e; ++o < r && (i *= 256);) this[t + o] = e / i & 255;
                    return t + r
                }, e.prototype.writeUIntBE = function (e, t, r, n) {
                    e = +e, t >>>= 0, r >>>= 0, n || E(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                    var i = r - 1,
                        o = 1;
                    for (this[t + i] = 255 & e; --i >= 0 && (o *= 256);) this[t + i] = e / o & 255;
                    return t + r
                }, e.prototype.writeUInt8 = function (e, t, r) {
                    return e = +e, t >>>= 0, r || E(this, e, t, 1, 255, 0), this[t] = 255 & e, t + 1
                }, e.prototype.writeUInt16LE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || E(this, e, t, 2, 65535, 0), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
                }, e.prototype.writeUInt16BE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || E(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
                }, e.prototype.writeUInt32LE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || E(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e, t + 4
                }, e.prototype.writeUInt32BE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || E(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
                }, e.prototype.writeIntLE = function (e, t, r, n) {
                    if (e = +e, t >>>= 0, !n) {
                        var i = Math.pow(2, 8 * r - 1);
                        E(this, e, t, r, i - 1, -i)
                    }
                    var o = 0,
                        s = 1,
                        a = 0;
                    for (this[t] = 255 & e; ++o < r && (s *= 256);) e < 0 && 0 === a && 0 !== this[t + o - 1] && (a = 1), this[t + o] = (e / s >> 0) - a & 255;
                    return t + r
                }, e.prototype.writeIntBE = function (e, t, r, n) {
                    if (e = +e, t >>>= 0, !n) {
                        var i = Math.pow(2, 8 * r - 1);
                        E(this, e, t, r, i - 1, -i)
                    }
                    var o = r - 1,
                        s = 1,
                        a = 0;
                    for (this[t + o] = 255 & e; --o >= 0 && (s *= 256);) e < 0 && 0 === a && 0 !== this[t + o + 1] && (a = 1), this[t + o] = (e / s >> 0) - a & 255;
                    return t + r
                }, e.prototype.writeInt8 = function (e, t, r) {
                    return e = +e, t >>>= 0, r || E(this, e, t, 1, 127, -128), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
                }, e.prototype.writeInt16LE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || E(this, e, t, 2, 32767, -32768), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
                }, e.prototype.writeInt16BE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || E(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
                }, e.prototype.writeInt32LE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || E(this, e, t, 4, 2147483647, -2147483648), this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4
                }, e.prototype.writeInt32BE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || E(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
                }, e.prototype.writeFloatLE = function (e, t, r) {
                    return F(this, e, t, !0, r)
                }, e.prototype.writeFloatBE = function (e, t, r) {
                    return F(this, e, t, !1, r)
                }, e.prototype.writeDoubleLE = function (e, t, r) {
                    return O(this, e, t, !0, r)
                }, e.prototype.writeDoubleBE = function (e, t, r) {
                    return O(this, e, t, !1, r)
                }, e.prototype.copy = function (t, r, n, i) {
                    if (!e.isBuffer(t)) throw new TypeError("argument should be a Buffer");
                    if (n || (n = 0), i || 0 === i || (i = this.length), r >= t.length && (r = t.length), r || (r = 0), i > 0 && i < n && (i = n), i === n) return 0;
                    if (0 === t.length || 0 === this.length) return 0;
                    if (r < 0) throw new RangeError("targetStart out of bounds");
                    if (n < 0 || n >= this.length) throw new RangeError("Index out of range");
                    if (i < 0) throw new RangeError("sourceEnd out of bounds");
                    i > this.length && (i = this.length), t.length - r < i - n && (i = t.length - r + n);
                    var o = i - n;
                    if (this === t && "function" == typeof Uint8Array.prototype.copyWithin) this.copyWithin(r, n, i);
                    else if (this === t && n < r && r < i)
                        for (var s = o - 1; s >= 0; --s) t[s + r] = this[s + n];
                    else Uint8Array.prototype.set.call(t, this.subarray(n, i), r);
                    return o
                }, e.prototype.fill = function (t, r, n, i) {
                    if ("string" == typeof t) {
                        if ("string" == typeof r ? (i = r, r = 0, n = this.length) : "string" == typeof n && (i = n, n = this.length), void 0 !== i && "string" != typeof i) throw new TypeError("encoding must be a string");
                        if ("string" == typeof i && !e.isEncoding(i)) throw new TypeError("Unknown encoding: " + i);
                        if (1 === t.length) {
                            var o = t.charCodeAt(0);
                            ("utf8" === i && o < 128 || "latin1" === i) && (t = o)
                        }
                    } else "number" == typeof t && (t &= 255);
                    if (r < 0 || this.length < r || this.length < n) throw new RangeError("Out of range index");
                    if (n <= r) return this;
                    var s;
                    if (r >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0), "number" == typeof t)
                        for (s = r; s < n; ++s) this[s] = t;
                    else {
                        var a = e.isBuffer(t) ? t : e.from(t, i),
                            u = a.length;
                        if (0 === u) throw new TypeError('The value "' + t + '" is invalid for argument "value"');
                        for (s = 0; s < n - r; ++s) this[s + r] = a[s % u]
                    }
                    return this
                };
                var U = /[^+\/0-9A-Za-z-_]/g;

                function R(e, t) {
                    var r;
                    t = t || 1 / 0;
                    for (var n = e.length, i = null, o = [], s = 0; s < n; ++s) {
                        if ((r = e.charCodeAt(s)) > 55295 && r < 57344) {
                            if (!i) {
                                if (r > 56319) {
                                    (t -= 3) > -1 && o.push(239, 191, 189);
                                    continue
                                }
                                if (s + 1 === n) {
                                    (t -= 3) > -1 && o.push(239, 191, 189);
                                    continue
                                }
                                i = r;
                                continue
                            }
                            if (r < 56320) {
                                (t -= 3) > -1 && o.push(239, 191, 189), i = r;
                                continue
                            }
                            r = 65536 + (i - 55296 << 10 | r - 56320)
                        } else i && (t -= 3) > -1 && o.push(239, 191, 189);
                        if (i = null, r < 128) {
                            if ((t -= 1) < 0) break;
                            o.push(r)
                        } else if (r < 2048) {
                            if ((t -= 2) < 0) break;
                            o.push(r >> 6 | 192, 63 & r | 128)
                        } else if (r < 65536) {
                            if ((t -= 3) < 0) break;
                            o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                        } else {
                            if (!(r < 1114112)) throw new Error("Invalid code point");
                            if ((t -= 4) < 0) break;
                            o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                        }
                    }
                    return o
                }

                function T(e) {
                    return yn.toByteArray(function (e) {
                        if ((e = (e = e.split("=")[0]).trim().replace(U, "")).length < 2) return "";
                        for (; e.length % 4 != 0;) e += "=";
                        return e
                    }(e))
                }

                function x(e, t, r, n) {
                    for (var i = 0; i < n && !(i + r >= t.length || i >= e.length); ++i) t[i + r] = e[i];
                    return i
                }

                function D(e, t) {
                    return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name
                }

                function B(e) {
                    return e != e
                }
            }).call(this, s({}).Buffer)
        })),
        a = e = {};

    function u() {
        throw new Error("setTimeout has not been defined")
    }

    function l() {
        throw new Error("clearTimeout has not been defined")
    }

    function c(e) {
        if (t === setTimeout) return setTimeout(e, 0);
        if ((t === u || !t) && setTimeout) return t = setTimeout, setTimeout(e, 0);
        try {
            return t(e, 0)
        } catch (r) {
            try {
                return t.call(null, e, 0)
            } catch (r) {
                return t.call(this, e, 0)
            }
        }
    } ! function () {
        try {
            t = "function" == typeof setTimeout ? setTimeout : u
        } catch (e) {
            t = u
        }
        try {
            r = "function" == typeof clearTimeout ? clearTimeout : l
        } catch (e) {
            r = l
        }
    }();
    var p, d = [],
        f = !1,
        y = -1;

    function g() {
        f && p && (f = !1, p.length ? d = p.concat(d) : y = -1, d.length && v())
    }

    function v() {
        if (!f) {
            var e = c(g);
            f = !0;
            for (var t = d.length; t;) {
                for (p = d, d = []; ++y < t;) p && p[y].run();
                y = -1, t = d.length
            }
            p = null, f = !1,
                function (e) {
                    if (r === clearTimeout) return clearTimeout(e);
                    if ((r === l || !r) && clearTimeout) return r = clearTimeout, clearTimeout(e);
                    try {
                        r(e)
                    } catch (t) {
                        try {
                            return r.call(null, e)
                        } catch (t) {
                            return r.call(this, e)
                        }
                    }
                }(e)
        }
    }

    function m(e, t) {
        this.fun = e, this.array = t
    }

    function b() { }
    a.nextTick = function (e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        d.push(new m(e, t)), 1 !== d.length || f || c(v)
    }, m.prototype.run = function () {
        this.fun.apply(null, this.array)
    }, a.title = "browser", a.browser = !0, a.env = {}, a.argv = [], a.version = "", a.versions = {}, a.on = b, a.addListener = b, a.once = b, a.off = b, a.removeListener = b, a.removeAllListeners = b, a.emit = b, a.prependListener = b, a.prependOnceListener = b, a.listeners = function (e) {
        return []
    }, a.binding = function (e) {
        throw new Error("process.binding is not supported")
    }, a.cwd = function () {
        return "/"
    }, a.chdir = function (e) {
        throw new Error("process.chdir is not supported")
    }, a.umask = function () {
        return 0
    };
    var w = {
        exports: {}
    };
    (function (e, t) {
        ! function (e, t) {
            "object" == typeof w.exports ? w.exports = t() : e.ES6Promise = t()
        }(this, (function () {
            "use strict";

            function r(e) {
                return "function" == typeof e
            }
            var n = Array.isArray ? Array.isArray : function (e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            },
                i = 0,
                o = void 0,
                s = void 0,
                a = function (e, t) {
                    f[i] = e, f[i + 1] = t, 2 === (i += 2) && (s ? s(y) : w())
                },
                u = "undefined" != typeof window ? window : void 0,
                l = u || {},
                c = l.MutationObserver || l.WebKitMutationObserver,
                p = "undefined" == typeof self && void 0 !== e && "[object process]" === {}.toString.call(e),
                d = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;

            function h() {
                var e = setTimeout;
                return function () {
                    return e(y, 1)
                }
            }
            var f = new Array(1e3);

            function y() {
                for (var e = 0; e < i; e += 2)(0, f[e])(f[e + 1]), f[e] = void 0, f[e + 1] = void 0;
                i = 0
            }
            var g, v, m, b, w = void 0;

            function _(e, t) {
                var r = this,
                    n = new this.constructor(P);
                void 0 === n[k] && D(n);
                var i = r._state;
                if (i) {
                    var o = arguments[i - 1];
                    a((function () {
                        return T(i, n, o, r._result)
                    }))
                } else U(r, n, e, t);
                return n
            }

            function S(e) {
                if (e && "object" == typeof e && e.constructor === this) return e;
                var t = new this(P);
                return E(t, e), t
            }
            p ? w = function () {
                return e.nextTick(y)
            } : c ? (v = 0, m = new c(y), b = document.createTextNode(""), m.observe(b, {
                characterData: !0
            }), w = function () {
                b.data = v = ++v % 2
            }) : d ? ((g = new MessageChannel).port1.onmessage = y, w = function () {
                return g.port2.postMessage(0)
            }) : w = void 0 === u ? function () {
                try {
                    var e = Function("return this")().require("vertx");
                    return void 0 !== (o = e.runOnLoop || e.runOnContext) ? function () {
                        o(y)
                    } : h()
                } catch (t) {
                    return h()
                }
            }() : h();
            var k = Math.random().toString(36).substring(2);

            function P() { }

            function C(e, t, n) {
                t.constructor === e.constructor && n === _ && t.constructor.resolve === S ? function (e, t) {
                    1 === t._state ? F(e, t._result) : 2 === t._state ? O(e, t._result) : U(t, void 0, (function (t) {
                        return E(e, t)
                    }), (function (t) {
                        return O(e, t)
                    }))
                }(e, t) : void 0 === n ? F(e, t) : r(n) ? function (e, t, r) {
                    a((function (e) {
                        var n = !1,
                            i = function (r, i, o, s) {
                                try {
                                    r.call(i, (function (r) {
                                        n || (n = !0, t !== r ? E(e, r) : F(e, r))
                                    }), (function (t) {
                                        n || (n = !0, O(e, t))
                                    }))
                                } catch (a) {
                                    return a
                                }
                            }(r, t, 0, 0, e._label);
                        !n && i && (n = !0, O(e, i))
                    }), e)
                }(e, t, n) : F(e, t)
            }

            function E(e, t) {
                if (e === t) O(e, new TypeError("You cannot resolve a promise with itself"));
                else if (i = typeof (n = t), null === n || "object" !== i && "function" !== i) F(e, t);
                else {
                    var r = void 0;
                    try {
                        r = t.then
                    } catch (Ol) {
                        return void O(e, Ol)
                    }
                    C(e, t, r)
                }
                var n, i
            }

            function A(e) {
                e._onerror && e._onerror(e._result), R(e)
            }

            function F(e, t) {
                void 0 === e._state && (e._result = t, e._state = 1, 0 !== e._subscribers.length && a(R, e))
            }

            function O(e, t) {
                void 0 === e._state && (e._state = 2, e._result = t, a(A, e))
            }

            function U(e, t, r, n) {
                var i = e._subscribers,
                    o = i.length;
                e._onerror = null, i[o] = t, i[o + 1] = r, i[o + 2] = n, 0 === o && e._state && a(R, e)
            }

            function R(e) {
                var t = e._subscribers,
                    r = e._state;
                if (0 !== t.length) {
                    for (var n = void 0, i = void 0, o = e._result, s = 0; s < t.length; s += 3) n = t[s], i = t[s + r], n ? T(r, n, i, o) : i(o);
                    e._subscribers.length = 0
                }
            }

            function T(e, t, n, i) {
                var o = r(n),
                    s = void 0,
                    a = void 0,
                    u = !0;
                if (o) {
                    try {
                        s = n(i)
                    } catch (l) {
                        u = !1, a = l
                    }
                    if (t === s) return void O(t, new TypeError("A promises callback cannot return that same promise."))
                } else s = i;
                void 0 !== t._state || (o && u ? E(t, s) : !1 === u ? O(t, a) : 1 === e ? F(t, s) : 2 === e && O(t, s))
            }
            var x = 0;

            function D(e) {
                e[k] = x++, e._state = void 0, e._result = void 0, e._subscribers = []
            }
            var B = function () {
                function e(e, t) {
                    this._instanceConstructor = e, this.promise = new e(P), this.promise[k] || D(this.promise), n(t) ? (this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? F(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(t), 0 === this._remaining && F(this.promise, this._result))) : O(this.promise, new Error("Array Methods must be provided an Array"))
                }
                return e.prototype._enumerate = function (e) {
                    for (var t = 0; void 0 === this._state && t < e.length; t++) this._eachEntry(e[t], t)
                }, e.prototype._eachEntry = function (e, t) {
                    var r = this._instanceConstructor,
                        n = r.resolve;
                    if (n === S) {
                        var i = void 0,
                            o = void 0,
                            s = !1;
                        try {
                            i = e.then
                        } catch (u) {
                            s = !0, o = u
                        }
                        if (i === _ && void 0 !== e._state) this._settledAt(e._state, t, e._result);
                        else if ("function" != typeof i) this._remaining--, this._result[t] = e;
                        else if (r === I) {
                            var a = new r(P);
                            s ? O(a, o) : C(a, e, i), this._willSettleAt(a, t)
                        } else this._willSettleAt(new r((function (t) {
                            return t(e)
                        })), t)
                    } else this._willSettleAt(n(e), t)
                }, e.prototype._settledAt = function (e, t, r) {
                    var n = this.promise;
                    void 0 === n._state && (this._remaining--, 2 === e ? O(n, r) : this._result[t] = r), 0 === this._remaining && F(n, this._result)
                }, e.prototype._willSettleAt = function (e, t) {
                    var r = this;
                    U(e, void 0, (function (e) {
                        return r._settledAt(1, t, e)
                    }), (function (e) {
                        return r._settledAt(2, t, e)
                    }))
                }, e
            }(),
                I = function () {
                    function e(t) {
                        this[k] = x++, this._result = this._state = void 0, this._subscribers = [], P !== t && ("function" != typeof t && function () {
                            throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                        }(), this instanceof e ? function (e, t) {
                            try {
                                t((function (t) {
                                    E(e, t)
                                }), (function (t) {
                                    O(e, t)
                                }))
                            } catch (r) {
                                O(e, r)
                            }
                        }(this, t) : function () {
                            throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                        }())
                    }
                    return e.prototype.catch = function (e) {
                        return this.then(null, e)
                    }, e.prototype.finally = function (e) {
                        var t = this.constructor;
                        return r(e) ? this.then((function (r) {
                            return t.resolve(e()).then((function () {
                                return r
                            }))
                        }), (function (r) {
                            return t.resolve(e()).then((function () {
                                throw r
                            }))
                        })) : this.then(e, e)
                    }, e
                }();
            return I.prototype.then = _, I.all = function (e) {
                return new B(this, e).promise
            }, I.race = function (e) {
                var t = this;
                return n(e) ? new t((function (r, n) {
                    for (var i = e.length, o = 0; o < i; o++) t.resolve(e[o]).then(r, n)
                })) : new t((function (e, t) {
                    return t(new TypeError("You must pass an array to race."))
                }))
            }, I.resolve = S, I.reject = function (e) {
                var t = new this(P);
                return O(t, e), t
            }, I._setScheduler = function (e) {
                s = e
            }, I._setAsap = function (e) {
                a = e
            }, I._asap = a, I.polyfill = function () {
                var e = void 0;
                if (void 0 !== t) e = t;
                else if ("undefined" != typeof self) e = self;
                else try {
                    e = Function("return this")()
                } catch (i) {
                    throw new Error("polyfill failed because global object is unavailable in this environment")
                }
                var r = e.Promise;
                if (r) {
                    var n = null;
                    try {
                        n = Object.prototype.toString.call(r.resolve())
                    } catch (i) { }
                    if ("[object Promise]" === n && !r.cast) return
                }
                e.Promise = I
            }, I.Promise = I, I
        }))
    }).call(this, e, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    (w = w.exports).polyfill();
    var _, S = {
        exports: {}
    };
    _ = function (e) {
        "use strict";
        var t = "URLSearchParams" in self,
            r = "Symbol" in self && "iterator" in Symbol,
            n = "FileReader" in self && "Blob" in self && function () {
                try {
                    return new Blob, !0
                } catch (e) {
                    return !1
                }
            }(),
            i = "FormData" in self,
            o = "ArrayBuffer" in self;
        if (o) var s = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
            a = ArrayBuffer.isView || function (e) {
                return e && s.indexOf(Object.prototype.toString.call(e)) > -1
            };

        function u(e) {
            if ("string" != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");
            return e.toLowerCase()
        }

        function l(e) {
            return "string" != typeof e && (e = String(e)), e
        }

        function c(e) {
            var t = {
                next: function () {
                    var t = e.shift();
                    return {
                        done: void 0 === t,
                        value: t
                    }
                }
            };
            return r && (t[Symbol.iterator] = function () {
                return t
            }), t
        }

        function p(e) {
            this.map = {}, e instanceof p ? e.forEach((function (e, t) {
                this.append(t, e)
            }), this) : Array.isArray(e) ? e.forEach((function (e) {
                this.append(e[0], e[1])
            }), this) : e && Object.getOwnPropertyNames(e).forEach((function (t) {
                this.append(t, e[t])
            }), this)
        }

        function d(e) {
            if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
            e.bodyUsed = !0
        }

        function h(e) {
            return new Promise((function (t, r) {
                e.onload = function () {
                    t(e.result)
                }, e.onerror = function () {
                    r(e.error)
                }
            }))
        }

        function f(e) {
            var t = new FileReader,
                r = h(t);
            return t.readAsArrayBuffer(e), r
        }

        function y(e) {
            if (e.slice) return e.slice(0);
            var t = new Uint8Array(e.byteLength);
            return t.set(new Uint8Array(e)), t.buffer
        }

        function g() {
            return this.bodyUsed = !1, this._initBody = function (e) {
                var r;
                this._bodyInit = e, e ? "string" == typeof e ? this._bodyText = e : n && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : i && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : t && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : o && n && (r = e) && DataView.prototype.isPrototypeOf(r) ? (this._bodyArrayBuffer = y(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : o && (ArrayBuffer.prototype.isPrototypeOf(e) || a(e)) ? this._bodyArrayBuffer = y(e) : this._bodyText = e = Object.prototype.toString.call(e) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : t && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
            }, n && (this.blob = function () {
                var e = d(this);
                if (e) return e;
                if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                return Promise.resolve(new Blob([this._bodyText]))
            }, this.arrayBuffer = function () {
                return this._bodyArrayBuffer ? d(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(f)
            }), this.text = function () {
                var e, t, r, n = d(this);
                if (n) return n;
                if (this._bodyBlob) return e = this._bodyBlob, r = h(t = new FileReader), t.readAsText(e), r;
                if (this._bodyArrayBuffer) return Promise.resolve(function (e) {
                    for (var t = new Uint8Array(e), r = new Array(t.length), n = 0; n < t.length; n++) r[n] = String.fromCharCode(t[n]);
                    return r.join("")
                }(this._bodyArrayBuffer));
                if (this._bodyFormData) throw new Error("could not read FormData body as text");
                return Promise.resolve(this._bodyText)
            }, i && (this.formData = function () {
                return this.text().then(b)
            }), this.json = function () {
                return this.text().then(JSON.parse)
            }, this
        }
        p.prototype.append = function (e, t) {
            e = u(e), t = l(t);
            var r = this.map[e];
            this.map[e] = r ? r + ", " + t : t
        }, p.prototype.delete = function (e) {
            delete this.map[u(e)]
        }, p.prototype.get = function (e) {
            return e = u(e), this.has(e) ? this.map[e] : null
        }, p.prototype.has = function (e) {
            return this.map.hasOwnProperty(u(e))
        }, p.prototype.set = function (e, t) {
            this.map[u(e)] = l(t)
        }, p.prototype.forEach = function (e, t) {
            for (var r in this.map) this.map.hasOwnProperty(r) && e.call(t, this.map[r], r, this)
        }, p.prototype.keys = function () {
            var e = [];
            return this.forEach((function (t, r) {
                e.push(r)
            })), c(e)
        }, p.prototype.values = function () {
            var e = [];
            return this.forEach((function (t) {
                e.push(t)
            })), c(e)
        }, p.prototype.entries = function () {
            var e = [];
            return this.forEach((function (t, r) {
                e.push([r, t])
            })), c(e)
        }, r && (p.prototype[Symbol.iterator] = p.prototype.entries);
        var v = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];

        function m(e, t) {
            var r, n, i = (t = t || {}).body;
            if (e instanceof m) {
                if (e.bodyUsed) throw new TypeError("Already read");
                this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new p(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, i || null == e._bodyInit || (i = e._bodyInit, e.bodyUsed = !0)
            } else this.url = String(e);
            if (this.credentials = t.credentials || this.credentials || "same-origin", !t.headers && this.headers || (this.headers = new p(t.headers)), this.method = (n = (r = t.method || this.method || "GET").toUpperCase(), v.indexOf(n) > -1 ? n : r), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && i) throw new TypeError("Body not allowed for GET or HEAD requests");
            this._initBody(i)
        }

        function b(e) {
            var t = new FormData;
            return e.trim().split("&").forEach((function (e) {
                if (e) {
                    var r = e.split("="),
                        n = r.shift().replace(/\+/g, " "),
                        i = r.join("=").replace(/\+/g, " ");
                    t.append(decodeURIComponent(n), decodeURIComponent(i))
                }
            })), t
        }

        function w(e, t) {
            t || (t = {}), this.type = "default", this.status = void 0 === t.status ? 200 : t.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in t ? t.statusText : "OK", this.headers = new p(t.headers), this.url = t.url || "", this._initBody(e)
        }
        m.prototype.clone = function () {
            return new m(this, {
                body: this._bodyInit
            })
        }, g.call(m.prototype), g.call(w.prototype), w.prototype.clone = function () {
            return new w(this._bodyInit, {
                status: this.status,
                statusText: this.statusText,
                headers: new p(this.headers),
                url: this.url
            })
        }, w.error = function () {
            var e = new w(null, {
                status: 0,
                statusText: ""
            });
            return e.type = "error", e
        };
        var _ = [301, 302, 303, 307, 308];
        w.redirect = function (e, t) {
            if (-1 === _.indexOf(t)) throw new RangeError("Invalid status code");
            return new w(null, {
                status: t,
                headers: {
                    location: e
                }
            })
        }, e.DOMException = self.DOMException;
        try {
            new e.DOMException
        } catch (yc) {
            e.DOMException = function (e, t) {
                this.message = e, this.name = t;
                var r = Error(e);
                this.stack = r.stack
            }, e.DOMException.prototype = Object.create(Error.prototype), e.DOMException.prototype.constructor = e.DOMException
        }

        function S(t, r) {
            return new Promise((function (i, o) {
                var s = new m(t, r);
                if (s.signal && s.signal.aborted) return o(new e.DOMException("Aborted", "AbortError"));
                var a = new XMLHttpRequest;

                function u() {
                    a.abort()
                }
                a.onload = function () {
                    var e, t, r = {
                        status: a.status,
                        statusText: a.statusText,
                        headers: (e = a.getAllResponseHeaders() || "", t = new p, e.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach((function (e) {
                            var r = e.split(":"),
                                n = r.shift().trim();
                            if (n) {
                                var i = r.join(":").trim();
                                t.append(n, i)
                            }
                        })), t)
                    };
                    r.url = "responseURL" in a ? a.responseURL : r.headers.get("X-Request-URL");
                    var n = "response" in a ? a.response : a.responseText;
                    i(new w(n, r))
                }, a.onerror = function () {
                    o(new TypeError("Network request failed"))
                }, a.ontimeout = function () {
                    o(new TypeError("Network request failed"))
                }, a.onabort = function () {
                    o(new e.DOMException("Aborted", "AbortError"))
                }, a.open(s.method, s.url, !0), "include" === s.credentials ? a.withCredentials = !0 : "omit" === s.credentials && (a.withCredentials = !1), "responseType" in a && n && (a.responseType = "blob"), s.headers.forEach((function (e, t) {
                    a.setRequestHeader(t, e)
                })), s.signal && (s.signal.addEventListener("abort", u), a.onreadystatechange = function () {
                    4 === a.readyState && s.signal.removeEventListener("abort", u)
                }), a.send(void 0 === s._bodyInit ? null : s._bodyInit)
            }))
        }
        S.polyfill = !0, self.fetch || (self.fetch = S, self.Headers = p, self.Request = m, self.Response = w), e.Headers = p, e.Request = m, e.Response = w, e.fetch = S, Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, "object" == typeof S.exports ? _(S.exports) : _(this.WHATWGFetch = {}), S = S.exports;
    var k = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    };

    function P() {
        return (P = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var C, E = function () {
        function e(e) {
            var t = this;
            this.locale = {
                strings: {},
                pluralize: function (e) {
                    return 1 === e ? 0 : 1
                }
            }, Array.isArray(e) ? e.forEach((function (e) {
                return t._apply(e)
            })) : this._apply(e)
        }
        var t = e.prototype;
        return t._apply = function (e) {
            if (e && e.strings) {
                var t = this.locale;
                this.locale = P({}, t, {
                    strings: P({}, t.strings, e.strings)
                }), this.locale.pluralize = e.pluralize || t.pluralize
            }
        }, t.interpolate = function (e, t) {
            var r = String.prototype,
                n = r.split,
                i = r.replace,
                o = /\$/g,
                s = [e];
            for (var a in t)
                if ("_" !== a && k(t, a)) {
                    var u = t[a];
                    "string" == typeof u && (u = i.call(t[a], o, "$$$$")), s = l(s, new RegExp("%\\{" + a + "\\}", "g"), u)
                } return s;

            function l(e, t, r) {
                var i = [];
                return e.forEach((function (e) {
                    if ("string" != typeof e) return i.push(e);
                    n.call(e, t).forEach((function (e, t, n) {
                        "" !== e && i.push(e), t < n.length - 1 && i.push(r)
                    }))
                })), i
            }
        }, t.translate = function (e, t) {
            return this.translateArray(e, t).join("")
        }, t.translateArray = function (e, t) {
            if (!k(this.locale.strings, e)) throw new Error("missing string: " + e);
            var r = this.locale.strings[e];
            if ("object" == typeof r) {
                if (t && void 0 !== t.smart_count) {
                    var n = this.locale.pluralize(t.smart_count);
                    return this.interpolate(r[n], t)
                }
                throw new Error("Attempted to use a string with plural forms, but no value was given for %{smart_count}")
            }
            return this.interpolate(r, t)
        }, e
    }(),
        A = function () {
            var e = {},
                t = e._fns = {};
            return e.emit = function (e, r, n, i, o, s, a) {
                var u = function (e) {
                    for (var r = t[e] ? t[e] : [], n = e.indexOf(":"), i = -1 === n ? [e] : [e.substring(0, n), e.substring(n + 1)], o = Object.keys(t), s = 0, a = o.length; s < a; s++) {
                        var u = o[s];
                        if ("*" === u && (r = r.concat(t[u])), 2 === i.length && i[0] === u) {
                            r = r.concat(t[u]);
                            break
                        }
                    }
                    return r
                }(e);
                u.length && function (e, t, r) {
                    for (var n = 0, i = t.length; n < i && t[n]; n++) t[n].event = e, t[n].apply(t[n], r)
                }(e, u, [r, n, i, o, s, a])
            }, e.on = function (e, r) {
                t[e] || (t[e] = []), t[e].push(r)
            }, e.once = function (t, r) {
                this.on(t, (function n() {
                    r.apply(this, arguments), e.off(t, n)
                }))
            }, e.off = function (e, t) {
                var r = [];
                if (e && t)
                    for (var n = this._fns[e], i = 0, o = n ? n.length : 0; i < o; i++) n[i] !== t && r.push(n[i]);
                r.length ? this._fns[e] = r : delete this._fns[e]
            }, e
        },
        F = function (e, t) {
            var r = "000000000" + e;
            return r.substr(r.length - t)
        },
        O = "object" == typeof window ? window : self,
        U = Object.keys(O).length,
        R = F(((navigator.mimeTypes ? navigator.mimeTypes.length : 0) + navigator.userAgent.length).toString(36) + U.toString(36), 4),
        T = function () {
            return R
        },
        x = "undefined" != typeof window && (window.crypto || window.msCrypto) || "undefined" != typeof self && self.crypto;
    if (x) {
        var D = Math.pow(2, 32) - 1;
        C = function () {
            return Math.abs(x.getRandomValues(new Uint32Array(1))[0] / D)
        }
    } else C = Math.random;
    var B = C,
        I = {},
        j = 0,
        L = Math.pow(36, 4);

    function M() {
        return F((B() * L << 0).toString(36), 4)
    }

    function N() {
        return j = j < L ? j : 0, ++j - 1
    }

    function z() {
        return "c" + (new Date).getTime().toString(36) + F(N().toString(36), 4) + T() + (M() + M())
    }
    z.slug = function () {
        var e = (new Date).getTime().toString(36),
            t = N().toString(36).slice(-4),
            r = T().slice(0, 1) + T().slice(-1),
            n = M().slice(-2);
        return e.slice(-2) + t + r + n
    }, z.isCuid = function (e) {
        return "string" == typeof e && !!e.startsWith("c")
    }, z.isSlug = function (e) {
        if ("string" != typeof e) return !1;
        var t = e.length;
        return t >= 7 && t <= 10
    }, z.fingerprint = T, I = z;
    var q = {};
    (function (e) {
        var t = /^\s+|\s+$/g,
            r = /^[-+]0x[0-9a-f]+$/i,
            n = /^0b[01]+$/i,
            i = /^0o[0-7]+$/i,
            o = parseInt,
            s = "object" == typeof e && e && e.Object === Object && e,
            a = "object" == typeof self && self && self.Object === Object && self,
            u = s || a || Function("return this")(),
            l = Object.prototype.toString,
            c = Math.max,
            p = Math.min,
            d = function () {
                return u.Date.now()
            };

        function h(e) {
            var t = typeof e;
            return !!e && ("object" == t || "function" == t)
        }

        function f(e) {
            if ("number" == typeof e) return e;
            if (function (e) {
                return "symbol" == typeof e || function (e) {
                    return !!e && "object" == typeof e
                }(e) && "[object Symbol]" == l.call(e)
            }(e)) return NaN;
            if (h(e)) {
                var s = "function" == typeof e.valueOf ? e.valueOf() : e;
                e = h(s) ? s + "" : s
            }
            if ("string" != typeof e) return 0 === e ? e : +e;
            e = e.replace(t, "");
            var a = n.test(e);
            return a || i.test(e) ? o(e.slice(2), a ? 2 : 8) : r.test(e) ? NaN : +e
        }
        q = function (e, t, r) {
            var n = !0,
                i = !0;
            if ("function" != typeof e) throw new TypeError("Expected a function");
            return h(r) && (n = "leading" in r ? !!r.leading : n, i = "trailing" in r ? !!r.trailing : i),
                function (e, t, r) {
                    var n, i, o, s, a, u, l = 0,
                        y = !1,
                        g = !1,
                        v = !0;
                    if ("function" != typeof e) throw new TypeError("Expected a function");

                    function m(t) {
                        var r = n,
                            o = i;
                        return n = i = void 0, l = t, s = e.apply(o, r)
                    }

                    function b(e) {
                        var r = e - u;
                        return void 0 === u || r >= t || r < 0 || g && e - l >= o
                    }

                    function w() {
                        var e = d();
                        if (b(e)) return _(e);
                        a = setTimeout(w, function (e) {
                            var r = t - (e - u);
                            return g ? p(r, o - (e - l)) : r
                        }(e))
                    }

                    function _(e) {
                        return a = void 0, v && n ? m(e) : (n = i = void 0, s)
                    }

                    function S() {
                        var e = d(),
                            r = b(e);
                        if (n = arguments, i = this, u = e, r) {
                            if (void 0 === a) return function (e) {
                                return l = e, a = setTimeout(w, t), y ? m(e) : s
                            }(u);
                            if (g) return a = setTimeout(w, t), m(u)
                        }
                        return void 0 === a && (a = setTimeout(w, t)), s
                    }
                    return t = f(t) || 0, h(r) && (y = !!r.leading, o = (g = "maxWait" in r) ? c(f(r.maxWait) || 0, t) : o, v = "trailing" in r ? !!r.trailing : v), S.cancel = function () {
                        void 0 !== a && clearTimeout(a), l = 0, n = u = i = a = void 0
                    }, S.flush = function () {
                        return void 0 === a ? s : _(d())
                    }, S
                }(e, t, {
                    leading: n,
                    maxWait: t,
                    trailing: i
                })
        }
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    var H, V = function (e) {
        if ("number" != typeof e || isNaN(e)) throw new TypeError("Expected a number, got " + typeof e);
        var t = e < 0,
            r = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        if (t && (e = -e), e < 1) return (t ? "-" : "") + e + " B";
        var n = Math.min(Math.floor(Math.log(e) / Math.log(1024)), r.length - 1);
        e = Number(e / Math.pow(1024, n));
        var i = r[n];
        return e >= 10 || e % 1 == 0 ? (t ? "-" : "") + e.toFixed(0) + " " + i : (t ? "-" : "") + e.toFixed(1) + " " + i
    };

    function W(e, t) {
        this.text = e = e || "", this.hasWild = ~e.indexOf("*"), this.separator = t, this.parts = e.split(t)
    }
    W.prototype.match = function (e) {
        var t, r, n = !0,
            i = this.parts,
            o = i.length;
        if ("string" == typeof e || e instanceof String)
            if (this.hasWild || this.text == e) {
                for (r = (e || "").split(this.separator), t = 0; n && t < o; t++) "*" !== i[t] && (n = t < r.length && i[t] === r[t]);
                n = n && r
            } else n = !1;
        else if ("function" == typeof e.splice)
            for (n = [], t = e.length; t--;) this.match(e[t]) && (n[n.length] = e[t]);
        else if ("object" == typeof e)
            for (var s in n = {}, e) this.match(s) && (n[s] = e[s]);
        return n
    }, H = function (e, t, r) {
        var n = new W(e, r || /[\/\.]/);
        return void 0 !== t ? n.match(t) : n
    };
    var X, G = /[\/\+\.]/;

    function K() {
        return (K = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var $ = function () {
        function e() {
            this.state = {}, this.callbacks = []
        }
        var t = e.prototype;
        return t.getState = function () {
            return this.state
        }, t.setState = function (e) {
            var t = K({}, this.state),
                r = K({}, this.state, e);
            this.state = r, this._publish(t, r, e)
        }, t.subscribe = function (e) {
            var t = this;
            return this.callbacks.push(e),
                function () {
                    t.callbacks.splice(t.callbacks.indexOf(e), 1)
                }
        }, t._publish = function () {
            for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
            this.callbacks.forEach((function (e) {
                e.apply(void 0, t)
            }))
        }, e
    }();
    $.VERSION = "1.2.4", X = function () {
        return new $
    };
    var Y = function (e) {
        var t = e.lastIndexOf(".");
        return -1 === t || t === e.length - 1 ? {
            name: e,
            extension: void 0
        } : {
                name: e.slice(0, t),
                extension: e.slice(t + 1)
            }
    },
        J = {
            md: "text/markdown",
            markdown: "text/markdown",
            mp4: "video/mp4",
            mp3: "audio/mp3",
            svg: "image/svg+xml",
            jpg: "image/jpeg",
            png: "image/png",
            gif: "image/gif",
            heic: "image/heic",
            heif: "image/heif",
            yaml: "text/yaml",
            yml: "text/yaml",
            csv: "text/csv",
            tsv: "text/tab-separated-values",
            tab: "text/tab-separated-values",
            avi: "video/x-msvideo",
            mks: "video/x-matroska",
            mkv: "video/x-matroska",
            mov: "video/quicktime",
            doc: "application/msword",
            docm: "application/vnd.ms-word.document.macroenabled.12",
            docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            dot: "application/msword",
            dotm: "application/vnd.ms-word.template.macroenabled.12",
            dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
            xla: "application/vnd.ms-excel",
            xlam: "application/vnd.ms-excel.addin.macroenabled.12",
            xlc: "application/vnd.ms-excel",
            xlf: "application/x-xliff+xml",
            xlm: "application/vnd.ms-excel",
            xls: "application/vnd.ms-excel",
            xlsb: "application/vnd.ms-excel.sheet.binary.macroenabled.12",
            xlsm: "application/vnd.ms-excel.sheet.macroenabled.12",
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            xlt: "application/vnd.ms-excel",
            xltm: "application/vnd.ms-excel.template.macroenabled.12",
            xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
            xlw: "application/vnd.ms-excel",
            txt: "text/plain",
            text: "text/plain",
            conf: "text/plain",
            log: "text/plain",
            pdf: "application/pdf"
        },
        Q = function (e) {
            var t = e.name ? Y(e.name).extension : null;
            return t = t ? t.toLowerCase() : null, e.type ? e.type : t && J[t] ? J[t] : "application/octet-stream"
        };

    function Z(e) {
        var t = "";
        return e.replace(/[^A-Z0-9]/gi, (function (e) {
            return t += "-" + function (e) {
                return e.charCodeAt(0).toString(32)
            }(e), "/"
        })) + t
    }
    var ee = function (e) {
        var t = "uppy";
        return "string" == typeof e.name && (t += "-" + Z(e.name.toLowerCase())), void 0 !== e.type && (t += "-" + e.type), e.meta && "string" == typeof e.meta.relativePath && (t += "-" + Z(e.meta.relativePath.toLowerCase())), void 0 !== e.data.size && (t += "-" + e.data.size), void 0 !== e.data.lastModified && (t += "-" + e.data.lastModified), t
    },
        te = function (e) {
            if (null == e && (e = "undefined" != typeof navigator ? navigator.userAgent : null), !e) return !0;
            var t = /Edge\/(\d+\.\d+)/.exec(e);
            if (!t) return !0;
            var r = t[1].split("."),
                n = r[0],
                i = r[1];
            return n = parseInt(n, 10), i = parseInt(i, 10), n < 15 || 15 === n && i < 15063 || n > 18 || 18 === n && i >= 18218
        };

    function re(e) {
        return 2 !== e.length ? 0 + e : e
    }
    var ne = function () {
        var e = new Date;
        return re(e.getHours().toString()) + ":" + re(e.getMinutes().toString()) + ":" + re(e.getSeconds().toString())
    },
        ie = {
            justErrorsLogger: {
                debug: function () { },
                warn: function () { },
                error: function () {
                    for (var e, t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                    return (e = console).error.apply(e, ["[Uppy] [" + ne() + "]"].concat(r))
                }
            },
            debugLogger: {
                debug: function () {
                    for (var e = console.debug || console.log, t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                    e.call.apply(e, [console, "[Uppy] [" + ne() + "]"].concat(r))
                },
                warn: function () {
                    for (var e, t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                    return (e = console).warn.apply(e, ["[Uppy] [" + ne() + "]"].concat(r))
                },
                error: function () {
                    for (var e, t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                    return (e = console).error.apply(e, ["[Uppy] [" + ne() + "]"].concat(r))
                }
            }
        },
        oe = {
            exports: {}
        };
    ! function () {
        "use strict";

        function e() { }

        function t(t, r) {
            var n, i, o, s, a = S;
            for (s = arguments.length; s-- > 2;) _.push(arguments[s]);
            for (r && null != r.children && (_.length || _.push(r.children), delete r.children); _.length;)
                if ((i = _.pop()) && void 0 !== i.pop)
                    for (s = i.length; s--;) _.push(i[s]);
                else "boolean" == typeof i && (i = null), (o = "function" != typeof t) && (null == i ? i = "" : "number" == typeof i ? i = String(i) : "string" != typeof i && (o = !1)), o && n ? a[a.length - 1] += i : a === S ? a = [i] : a.push(i), n = o;
            var u = new e;
            return u.nodeName = t, u.children = a, u.attributes = null == r ? void 0 : r, u.key = null == r ? void 0 : r.key, void 0 !== w.vnode && w.vnode(u), u
        }

        function r(e, t) {
            for (var r in t) e[r] = t[r];
            return e
        }

        function n(e) {
            !e.__d && (e.__d = !0) && 1 == C.push(e) && (w.debounceRendering || k)(i)
        }

        function i() {
            var e, t = C;
            for (C = []; e = t.pop();) e.__d && v(e)
        }

        function o(e, t) {
            return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase()
        }

        function s(e) {
            var t = r({}, e.attributes);
            t.children = e.children;
            var n = e.nodeName.defaultProps;
            if (void 0 !== n)
                for (var i in n) void 0 === t[i] && (t[i] = n[i]);
            return t
        }

        function a(e) {
            var t = e.parentNode;
            t && t.removeChild(e)
        }

        function u(e, t, r, n, i) {
            if ("className" === t && (t = "class"), "key" === t);
            else if ("ref" === t) r && r(null), n && n(e);
            else if ("class" !== t || i)
                if ("style" === t) {
                    if (n && "string" != typeof n && "string" != typeof r || (e.style.cssText = n || ""), n && "object" == typeof n) {
                        if ("string" != typeof r)
                            for (var o in r) o in n || (e.style[o] = "");
                        for (var o in n) e.style[o] = "number" == typeof n[o] && !1 === P.test(o) ? n[o] + "px" : n[o]
                    }
                } else if ("dangerouslySetInnerHTML" === t) n && (e.innerHTML = n.__html || "");
                else if ("o" == t[0] && "n" == t[1]) {
                    var s = t !== (t = t.replace(/Capture$/, ""));
                    t = t.toLowerCase().substring(2), n ? r || e.addEventListener(t, l, s) : e.removeEventListener(t, l, s), (e.__l || (e.__l = {}))[t] = n
                } else if ("list" !== t && "type" !== t && !i && t in e) ! function (e, t, r) {
                    try {
                        e[t] = r
                    } catch (n) { }
                }(e, t, null == n ? "" : n), null != n && !1 !== n || e.removeAttribute(t);
                else {
                    var a = i && t !== (t = t.replace(/^xlink:?/, ""));
                    null == n || !1 === n ? a ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof n && (a ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), n) : e.setAttribute(t, n))
                } else e.className = n || ""
        }

        function l(e) {
            return this.__l[e.type](w.event && w.event(e) || e)
        }

        function c() {
            for (var e; e = E.pop();) w.afterMount && w.afterMount(e), e.componentDidMount && e.componentDidMount()
        }

        function p(e, t, r, n, i, l) {
            A++ || (F = null != i && void 0 !== i.ownerSVGElement, O = null != e && !("__preactattr_" in e));
            var p = function e(t, r, n, i, l) {
                var c = t,
                    p = F;
                if (null != r && "boolean" != typeof r || (r = ""), "string" == typeof r || "number" == typeof r) return t && void 0 !== t.splitText && t.parentNode && (!t._component || l) ? t.nodeValue != r && (t.nodeValue = r) : (c = document.createTextNode(r), t && (t.parentNode && t.parentNode.replaceChild(c, t), d(t, !0))), c.__preactattr_ = !0, c;
                var h, y, v = r.nodeName;
                if ("function" == typeof v) return function (e, t, r, n) {
                    for (var i = e && e._component, o = i, a = e, u = i && e._componentConstructor === t.nodeName, l = u, c = s(t); i && !l && (i = i.__u);) l = i.constructor === t.nodeName;
                    return i && l && (!n || i._component) ? (g(i, c, 3, r, n), e = i.base) : (o && !u && (m(o), e = a = null), i = f(t.nodeName, c, r), e && !i.__b && (i.__b = e, a = null), g(i, c, 1, r, n), e = i.base, a && e !== a && (a._component = null, d(a, !1))), e
                }(t, r, n, i);
                if (F = "svg" === v || "foreignObject" !== v && F, v = String(v), (!t || !o(t, v)) && (h = v, (y = F ? document.createElementNS("http://www.w3.org/2000/svg", h) : document.createElement(h)).__n = h, c = y, t)) {
                    for (; t.firstChild;) c.appendChild(t.firstChild);
                    t.parentNode && t.parentNode.replaceChild(c, t), d(t, !0)
                }
                var b = c.firstChild,
                    w = c.__preactattr_,
                    _ = r.children;
                if (null == w) {
                    w = c.__preactattr_ = {};
                    for (var S = c.attributes, k = S.length; k--;) w[S[k].name] = S[k].value
                }
                return !O && _ && 1 === _.length && "string" == typeof _[0] && null != b && void 0 !== b.splitText && null == b.nextSibling ? b.nodeValue != _[0] && (b.nodeValue = _[0]) : (_ && _.length || null != b) && function (t, r, n, i, s) {
                    var u, l, c, p, h, f, y, g, v = t.childNodes,
                        m = [],
                        b = {},
                        w = 0,
                        _ = 0,
                        S = v.length,
                        k = 0,
                        P = r ? r.length : 0;
                    if (0 !== S)
                        for (var C = 0; C < S; C++) {
                            var E = v[C],
                                A = E.__preactattr_;
                            null != (F = P && A ? E._component ? E._component.__k : A.key : null) ? (w++, b[F] = E) : (A || (void 0 !== E.splitText ? !s || E.nodeValue.trim() : s)) && (m[k++] = E)
                        }
                    if (0 !== P)
                        for (C = 0; C < P; C++) {
                            var F;
                            if (h = null, null != (F = (p = r[C]).key)) w && void 0 !== b[F] && (h = b[F], b[F] = void 0, w--);
                            else if (!h && _ < k)
                                for (u = _; u < k; u++)
                                    if (void 0 !== m[u] && (f = l = m[u], g = s, "string" == typeof (y = p) || "number" == typeof y ? void 0 !== f.splitText : "string" == typeof y.nodeName ? !f._componentConstructor && o(f, y.nodeName) : g || f._componentConstructor === y.nodeName)) {
                                        h = l, m[u] = void 0, u === k - 1 && k--, u === _ && _++;
                                        break
                                    } h = e(h, p, n, i), c = v[C], h && h !== t && h !== c && (null == c ? t.appendChild(h) : h === c.nextSibling ? a(c) : t.insertBefore(h, c))
                        }
                    if (w)
                        for (var C in b) void 0 !== b[C] && d(b[C], !1);
                    for (; _ <= k;) void 0 !== (h = m[k--]) && d(h, !1)
                }(c, _, n, i, O || null != w.dangerouslySetInnerHTML),
                    function (e, t, r) {
                        var n;
                        for (n in r) t && null != t[n] || null == r[n] || u(e, n, r[n], r[n] = void 0, F);
                        for (n in t) "children" === n || "innerHTML" === n || n in r && t[n] === ("value" === n || "checked" === n ? e[n] : r[n]) || u(e, n, r[n], r[n] = t[n], F)
                    }(c, r.attributes, w), F = p, c
            }(e, t, r, n, l);
            return i && p.parentNode !== i && i.appendChild(p), --A || (O = !1, l || c()), p
        }

        function d(e, t) {
            var r = e._component;
            r ? m(r) : (null != e.__preactattr_ && e.__preactattr_.ref && e.__preactattr_.ref(null), !1 !== t && null != e.__preactattr_ || a(e), h(e))
        }

        function h(e) {
            for (e = e.lastChild; e;) {
                var t = e.previousSibling;
                d(e, !0), e = t
            }
        }

        function f(e, t, r) {
            var n, i = U[e.name];
            if (e.prototype && e.prototype.render ? (n = new e(t, r), b.call(n, t, r)) : ((n = new b(t, r)).constructor = e, n.render = y), i)
                for (var o = i.length; o--;)
                    if (i[o].constructor === e) {
                        n.__b = i[o].__b, i.splice(o, 1);
                        break
                    } return n
        }

        function y(e, t, r) {
            return this.constructor(e, r)
        }

        function g(e, t, r, i, o) {
            e.__x || (e.__x = !0, (e.__r = t.ref) && delete t.ref, (e.__k = t.key) && delete t.key, !e.base || o ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, i), i && i !== e.context && (e.__c || (e.__c = e.context), e.context = i), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== r && (1 !== r && !1 === w.syncComponentUpdates && e.base ? n(e) : v(e, 1, o)), e.__r && e.__r(e))
        }

        function v(e, t, n, i) {
            if (!e.__x) {
                var o, a, u, l = e.props,
                    h = e.state,
                    y = e.context,
                    b = e.__p || l,
                    _ = e.__s || h,
                    S = e.__c || y,
                    k = e.base,
                    P = e.__b,
                    C = k || P,
                    F = e._component,
                    O = !1;
                if (k && (e.props = b, e.state = _, e.context = S, 2 !== t && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(l, h, y) ? O = !0 : e.componentWillUpdate && e.componentWillUpdate(l, h, y), e.props = l, e.state = h, e.context = y), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !O) {
                    o = e.render(l, h, y), e.getChildContext && (y = r(r({}, y), e.getChildContext()));
                    var U, R, T = o && o.nodeName;
                    if ("function" == typeof T) {
                        var x = s(o);
                        (a = F) && a.constructor === T && x.key == a.__k ? g(a, x, 1, y, !1) : (U = a, e._component = a = f(T, x, y), a.__b = a.__b || P, a.__u = e, g(a, x, 0, y, !1), v(a, 1, n, !0)), R = a.base
                    } else u = C, (U = F) && (u = e._component = null), (C || 1 === t) && (u && (u._component = null), R = p(u, o, y, n || !k, C && C.parentNode, !0));
                    if (C && R !== C && a !== F) {
                        var D = C.parentNode;
                        D && R !== D && (D.replaceChild(R, C), U || (C._component = null, d(C, !1)))
                    }
                    if (U && m(U), e.base = R, R && !i) {
                        for (var B = e, I = e; I = I.__u;)(B = I).base = R;
                        R._component = B, R._componentConstructor = B.constructor
                    }
                }
                if (!k || n ? E.unshift(e) : O || (e.componentDidUpdate && e.componentDidUpdate(b, _, S), w.afterUpdate && w.afterUpdate(e)), null != e.__h)
                    for (; e.__h.length;) e.__h.pop().call(e);
                A || i || c()
            }
        }

        function m(e) {
            w.beforeUnmount && w.beforeUnmount(e);
            var t = e.base;
            e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;
            var r = e._component;
            r ? m(r) : t && (t.__preactattr_ && t.__preactattr_.ref && t.__preactattr_.ref(null), e.__b = t, a(t), function (e) {
                var t = e.constructor.name;
                (U[t] || (U[t] = [])).push(e)
            }(e), h(t)), e.__r && e.__r(null)
        }

        function b(e, t) {
            this.__d = !0, this.context = t, this.props = e, this.state = this.state || {}
        }
        var w = {},
            _ = [],
            S = [],
            k = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
            P = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
            C = [],
            E = [],
            A = 0,
            F = !1,
            O = !1,
            U = {};
        r(b.prototype, {
            setState: function (e, t) {
                var i = this.state;
                this.__s || (this.__s = r({}, i)), r(i, "function" == typeof e ? e(i, this.props) : e), t && (this.__h = this.__h || []).push(t), n(this)
            },
            forceUpdate: function (e) {
                e && (this.__h = this.__h || []).push(e), v(this, 2)
            },
            render: function () { }
        });
        var R = {
            h: t,
            createElement: t,
            cloneElement: function (e, n) {
                return t(e.nodeName, r(r({}, e.attributes), n), arguments.length > 2 ? [].slice.call(arguments, 2) : e.children)
            },
            Component: b,
            render: function (e, t, r) {
                return p(r, e, {}, !1, t, !1)
            },
            rerender: i,
            options: w
        };
        oe.exports = R
    }(), oe = oe.exports;
    var se = function (e) {
        return e && "object" == typeof e && e.nodeType === Node.ELEMENT_NODE
    },
        ae = function (e, t) {
            return void 0 === t && (t = document), "string" == typeof e ? t.querySelector(e) : se(e) ? e : void 0
        };

    function ue() {
        return (ue = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var le, ce = function () {
        function e(e, t) {
            this.uppy = e, this.opts = t || {}, this.update = this.update.bind(this), this.mount = this.mount.bind(this), this.install = this.install.bind(this), this.uninstall = this.uninstall.bind(this)
        }
        var t = e.prototype;
        return t.getPluginState = function () {
            return this.uppy.getState().plugins[this.id] || {}
        }, t.setPluginState = function (e) {
            var t, r = this.uppy.getState().plugins;
            this.uppy.setState({
                plugins: ue({}, r, (t = {}, t[this.id] = ue({}, r[this.id], e), t))
            })
        }, t.setOptions = function (e) {
            this.opts = ue({}, this.opts, e), this.setPluginState()
        }, t.update = function (e) {
            void 0 !== this.el && this._updateUI && this._updateUI(e)
        }, t.afterUpdate = function () { }, t.onMount = function () { }, t.mount = function (t, r) {
            var n, i, o, s, a = this,
                u = r.id,
                l = ae(t);
            if (l) return this.isTargetDOMEl = !0, this.rerender = function (e) {
                a.uppy.getPlugin(a.id) && (a.el = oe.render(a.render(e), l, a.el), a.afterUpdate())
            }, this._updateUI = (n = this.rerender, i = null, o = null, function () {
                for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                return o = t, i || (i = Promise.resolve().then((function () {
                    return i = null, n.apply(void 0, o)
                }))), i
            }), this.uppy.log("Installing " + u + " to a DOM element '" + t + "'"), this.opts.replaceTargetContent && (l.innerHTML = ""), this.el = oe.render(this.render(this.uppy.getState()), l), this.onMount(), this.el;
            if ("object" == typeof t && t instanceof e) s = t;
            else if ("function" == typeof t) {
                var c = t;
                this.uppy.iteratePlugins((function (e) {
                    if (e instanceof c) return s = e, !1
                }))
            }
            if (s) return this.uppy.log("Installing " + u + " to " + s.id), this.parent = s, this.el = s.addTarget(r), this.onMount(), this.el;
            this.uppy.log("Not installing " + u);
            var p = "Invalid target option given to " + u + ".";
            throw new Error(p += "function" == typeof t ? " The given target is not a Plugin class. Please check that you're not specifying a React Component instead of a plugin. If you are using @uppy/* packages directly, make sure you have only 1 version of @uppy/core installed: run `npm ls @uppy/core` on the command line and verify that all the versions match and are deduped correctly." : "If you meant to target an HTML element, please make sure that the element exists. Check that the <script> tag initializing Uppy is right before the closing </body> tag at the end of the page. (see https://github.com/transloadit/uppy/issues/1042)\n\nIf you meant to target a plugin, please confirm that your `import` statements or `require` calls are correct.")
        }, t.render = function (e) {
            throw new Error("Extend the render method to add your plugin to a DOM element")
        }, t.addTarget = function (e) {
            throw new Error("Extend the addTarget method to add your plugin to another plugin's target")
        }, t.unmount = function () {
            this.isTargetDOMEl && this.el && this.el.parentNode && this.el.parentNode.removeChild(this.el)
        }, t.install = function () { }, t.uninstall = function () {
            this.unmount()
        }, e
    }();

    function pe() {
        return (pe = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function de(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function he(e) {
        var t = "function" == typeof Map ? new Map : void 0;
        return (he = function (e) {
            if (null === e || (r = e, -1 === Function.toString.call(r).indexOf("[native code]"))) return e;
            var r;
            if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== t) {
                if (t.has(e)) return t.get(e);
                t.set(e, n)
            }

            function n() {
                return fe(e, arguments, ge(this).constructor)
            }
            return n.prototype = Object.create(e.prototype, {
                constructor: {
                    value: n,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), ye(n, e)
        })(e)
    }

    function fe(e, t, r) {
        return (fe = function () {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], (function () { }))), !0
            } catch (e) {
                return !1
            }
        }() ? Reflect.construct : function (e, t, r) {
            var n = [null];
            n.push.apply(n, t);
            var i = new (Function.bind.apply(e, n));
            return r && ye(i, r.prototype), i
        }).apply(null, arguments)
    }

    function ye(e, t) {
        return (ye = Object.setPrototypeOf || function (e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }

    function ge(e) {
        return (ge = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }
    var ve = ie.justErrorsLogger,
        me = ie.debugLogger,
        be = function (e) {
            var t, r;

            function n() {
                for (var t, r = arguments.length, n = new Array(r), i = 0; i < r; i++) n[i] = arguments[i];
                return (t = e.call.apply(e, [this].concat(n)) || this).isRestriction = !0, t
            }
            return r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r, n
        }(he(Error)),
        we = function () {
            function e(e) {
                var t = this;
                this.defaultLocale = {
                    strings: {
                        addBulkFilesFailed: {
                            0: "Failed to add %{smart_count} file due to an internal error",
                            1: "Failed to add %{smart_count} files due to internal errors"
                        },
                        youCanOnlyUploadX: {
                            0: "You can only upload %{smart_count} file",
                            1: "You can only upload %{smart_count} files"
                        },
                        youHaveToAtLeastSelectX: {
                            0: "Bạn cần phải chọn ít nhất %{smart_count} file",
                            1: "Bạn cần phải chọn ít nhất %{smart_count} file"
                        },
                        exceedsSize2: "%{backwardsCompat} %{size}",
                        exceedsSize: "This file exceeds maximum allowed size of",
                        inferiorSize: "This file is smaller than the allowed size of %{size}",
                        youCanOnlyUploadFileTypes: "You can only upload: %{types}",
                        noNewAlreadyUploading: "Cannot add new files: already uploading",
                        noDuplicates: "Cannot add the duplicate file '%{fileName}', it already exists",
                        companionError: "Connection with Companion failed",
                        companionUnauthorizeHint: "To unauthorize to your %{provider} account, please go to %{url}",
                        failedToUpload: "Failed to upload %{file}",
                        noInternetConnection: "No Internet connection",
                        connectedToInternet: "Connected to the Internet",
                        noFilesFound: "You have no files or folders here",
                        selectX: {
                            0: "Select %{smart_count}",
                            1: "Select %{smart_count}"
                        },
                        selectAllFilesFromFolderNamed: "Select all files from folder %{name}",
                        unselectAllFilesFromFolderNamed: "Unselect all files from folder %{name}",
                        selectFileNamed: "Select file %{name}",
                        unselectFileNamed: "Unselect file %{name}",
                        openFolderNamed: "Open folder %{name}",
                        cancel: "Cancel",
                        logOut: "Log out",
                        filter: "Filter",
                        resetFilter: "Reset filter",
                        loading: "Loading...",
                        authenticateWithTitle: "Please authenticate with %{pluginName} to select files",
                        authenticateWith: "Connect to %{pluginName}",
                        emptyFolderAdded: "No files were added from empty folder",
                        folderAdded: {
                            0: "Added %{smart_count} file from %{folder}",
                            1: "Added %{smart_count} files from %{folder}"
                        }
                    }
                };
                var r = {
                    id: "uppy",
                    autoProceed: !1,
                    allowMultipleUploads: !0,
                    debug: !1,
                    restrictions: {
                        maxFileSize: null,
                        minFileSize: null,
                        maxNumberOfFiles: null,
                        minNumberOfFiles: null,
                        allowedFileTypes: null
                    },
                    meta: {},
                    onBeforeFileAdded: function (e, t) {
                        return e
                    },
                    onBeforeUpload: function (e) {
                        return e
                    },
                    store: X(),
                    logger: ve
                };
                if (this.opts = pe({}, r, e, {
                    restrictions: pe({}, r.restrictions, e && e.restrictions)
                }), e && e.logger && e.debug ? this.log("You are using a custom `logger`, but also set `debug: true`, which uses built-in logger to output logs to console. Ignoring `debug: true` and using your custom `logger`.", "warning") : e && e.debug && (this.opts.logger = me), this.log("Using Core v" + this.constructor.VERSION), this.opts.restrictions.allowedFileTypes && null !== this.opts.restrictions.allowedFileTypes && !Array.isArray(this.opts.restrictions.allowedFileTypes)) throw new TypeError("`restrictions.allowedFileTypes` must be an array");
                this.i18nInit(), this.plugins = {}, this.getState = this.getState.bind(this), this.getPlugin = this.getPlugin.bind(this), this.setFileMeta = this.setFileMeta.bind(this), this.setFileState = this.setFileState.bind(this), this.log = this.log.bind(this), this.info = this.info.bind(this), this.hideInfo = this.hideInfo.bind(this), this.addFile = this.addFile.bind(this), this.removeFile = this.removeFile.bind(this), this.pauseResume = this.pauseResume.bind(this), this._calculateProgress = q(this._calculateProgress.bind(this), 500, {
                    leading: !0,
                    trailing: !0
                }), this.updateOnlineStatus = this.updateOnlineStatus.bind(this), this.resetProgress = this.resetProgress.bind(this), this.pauseAll = this.pauseAll.bind(this), this.resumeAll = this.resumeAll.bind(this), this.retryAll = this.retryAll.bind(this), this.cancelAll = this.cancelAll.bind(this), this.retryUpload = this.retryUpload.bind(this), this.upload = this.upload.bind(this), this.emitter = A(), this.on = this.on.bind(this), this.off = this.off.bind(this), this.once = this.emitter.once.bind(this.emitter), this.emit = this.emitter.emit.bind(this.emitter), this.preProcessors = [], this.uploaders = [], this.postProcessors = [], this.store = this.opts.store, this.setState({
                    plugins: {},
                    files: {},
                    currentUploads: {},
                    allowNewUpload: !0,
                    capabilities: {
                        uploadProgress: te(),
                        individualCancellation: !0,
                        resumableUploads: !1
                    },
                    totalProgress: 0,
                    meta: pe({}, this.opts.meta),
                    info: {
                        isHidden: !0,
                        type: "info",
                        message: ""
                    }
                }), this._storeUnsubscribe = this.store.subscribe((function (e, r, n) {
                    t.emit("state-update", e, r, n), t.updateAll(r)
                })), this.opts.debug && "undefined" != typeof window && (window[this.opts.id] = this), this._addListeners()
            }
            var t, r, n = e.prototype;
            return n.on = function (e, t) {
                return this.emitter.on(e, t), this
            }, n.off = function (e, t) {
                return this.emitter.off(e, t), this
            }, n.updateAll = function (e) {
                this.iteratePlugins((function (t) {
                    t.update(e)
                }))
            }, n.setState = function (e) {
                this.store.setState(e)
            }, n.getState = function () {
                return this.store.getState()
            }, n.setFileState = function (e, t) {
                var r;
                if (!this.getState().files[e]) throw new Error("Can\u2019t set state for " + e + " (the file could have been removed)");
                this.setState({
                    files: pe({}, this.getState().files, (r = {}, r[e] = pe({}, this.getState().files[e], t), r))
                })
            }, n.i18nInit = function () {
                this.translator = new E([this.defaultLocale, this.opts.locale]), this.locale = this.translator.locale, this.i18n = this.translator.translate.bind(this.translator), this.i18nArray = this.translator.translateArray.bind(this.translator)
            }, n.setOptions = function (e) {
                this.opts = pe({}, this.opts, e, {
                    restrictions: pe({}, this.opts.restrictions, e && e.restrictions)
                }), e.meta && this.setMeta(e.meta), this.i18nInit(), e.locale && this.iteratePlugins((function (e) {
                    e.setOptions()
                })), this.setState()
            }, n.resetProgress = function () {
                var e = {
                    percentage: 0,
                    bytesUploaded: 0,
                    uploadComplete: !1,
                    uploadStarted: null
                },
                    t = pe({}, this.getState().files),
                    r = {};
                Object.keys(t).forEach((function (n) {
                    var i = pe({}, t[n]);
                    i.progress = pe({}, i.progress, e), r[n] = i
                })), this.setState({
                    files: r,
                    totalProgress: 0
                }), this.emit("reset-progress")
            }, n.addPreProcessor = function (e) {
                this.preProcessors.push(e)
            }, n.removePreProcessor = function (e) {
                var t = this.preProcessors.indexOf(e); - 1 !== t && this.preProcessors.splice(t, 1)
            }, n.addPostProcessor = function (e) {
                this.postProcessors.push(e)
            }, n.removePostProcessor = function (e) {
                var t = this.postProcessors.indexOf(e); - 1 !== t && this.postProcessors.splice(t, 1)
            }, n.addUploader = function (e) {
                this.uploaders.push(e)
            }, n.removeUploader = function (e) {
                var t = this.uploaders.indexOf(e); - 1 !== t && this.uploaders.splice(t, 1)
            }, n.setMeta = function (e) {
                var t = pe({}, this.getState().meta, e),
                    r = pe({}, this.getState().files);
                Object.keys(r).forEach((function (t) {
                    r[t] = pe({}, r[t], {
                        meta: pe({}, r[t].meta, e)
                    })
                })), this.log("Adding metadata:"), this.log(e), this.setState({
                    meta: t,
                    files: r
                })
            }, n.setFileMeta = function (e, t) {
                var r = pe({}, this.getState().files);
                if (r[e]) {
                    var n = pe({}, r[e].meta, t);
                    r[e] = pe({}, r[e], {
                        meta: n
                    }), this.setState({
                        files: r
                    })
                } else this.log("Was trying to set metadata for a file that has been removed: ", e)
            }, n.getFile = function (e) {
                return this.getState().files[e]
            }, n.getFiles = function () {
                var e = this.getState().files;
                return Object.keys(e).map((function (t) {
                    return e[t]
                }))
            }, n._checkMinNumberOfFiles = function (e) {
                var t = this.opts.restrictions.minNumberOfFiles;
                if (Object.keys(e).length < t) throw new be("" + this.i18n("youHaveToAtLeastSelectX", {
                    smart_count: t
                }))
            }, n._checkRestrictions = function (e, t) {
                var r = this.opts.restrictions,
                    n = r.maxFileSize,
                    i = r.minFileSize,
                    o = r.maxNumberOfFiles,
                    s = r.allowedFileTypes;
                if (o && Object.keys(e).length + 1 > o) throw new be("" + this.i18n("youCanOnlyUploadX", {
                    smart_count: o
                }));
                if (s && !s.some((function (e) {
                    return e.indexOf("/") > -1 ? !!t.type && function (e, t) {
                        function r(t) {
                            var r = H(t, e, G);
                            return r && r.length >= 2
                        }
                        return t ? r(t.split(";")[0]) : r
                    }(t.type.replace(/;.*?$/, ""), e) : "." === e[0] && t.extension.toLowerCase() === e.substr(1).toLowerCase()
                }))) {
                    var a = s.join(", ");
                    throw new be(this.i18n("youCanOnlyUploadFileTypes", {
                        types: a
                    }))
                }
                if (n && null != t.data.size && t.data.size > n) throw new be(this.i18n("exceedsSize2", {
                    backwardsCompat: this.i18n("exceedsSize"),
                    size: V(n)
                }));
                if (i && null != t.data.size && t.data.size < i) throw new be(this.i18n("inferiorSize", {
                    size: V(i)
                }))
            }, n._showOrLogErrorAndThrow = function (e, t) {
                var r = void 0 === t ? {} : t,
                    n = r.showInformer,
                    i = void 0 === n || n,
                    o = r.file,
                    s = void 0 === o ? null : o,
                    a = r.throwErr,
                    u = void 0 === a || a,
                    l = "object" == typeof e ? e.message : e,
                    c = "object" == typeof e && e.details ? e.details : "",
                    p = l;
                if (c && (p += " " + c), e.isRestriction ? (this.log(p), this.emit("restriction-failed", s, e)) : this.log(p, "error"), i && this.info({
                    message: l,
                    details: c
                }, "error", 5e3), u) throw "object" == typeof e ? e : new Error(e)
            }, n._assertNewUploadAllowed = function (e) {
                !1 === this.getState().allowNewUpload && this._showOrLogErrorAndThrow(new be(this.i18n("noNewAlreadyUploading")), {
                    file: e
                })
            }, n._checkAndCreateFileStateObject = function (e, t) {
                var r = Q(t);
                t.type = r;
                var n, i = this.opts.onBeforeFileAdded(t, e);
                !1 === i && this._showOrLogErrorAndThrow(new be("Cannot add the file because onBeforeFileAdded returned false."), {
                    showInformer: !1,
                    file: t
                }), "object" == typeof i && i && (t = i), n = t.name ? t.name : "image" === r.split("/")[0] ? r.split("/")[0] + "." + r.split("/")[1] : "noname";
                var o = Y(n).extension,
                    s = t.isRemote || !1,
                    a = ee(t);
                e[a] && this._showOrLogErrorAndThrow(new be(this.i18n("noDuplicates", {
                    fileName: n
                })), {
                    file: t
                });
                var u = t.meta || {};
                u.name = n, u.type = r;
                var l = isFinite(t.data.size) ? t.data.size : null,
                    c = {
                        source: t.source || "",
                        id: a,
                        name: n,
                        extension: o || "",
                        meta: pe({}, this.getState().meta, u),
                        type: r,
                        data: t.data,
                        progress: {
                            percentage: 0,
                            bytesUploaded: 0,
                            bytesTotal: l,
                            uploadComplete: !1,
                            uploadStarted: null
                        },
                        size: l,
                        isRemote: s,
                        remote: t.remote || "",
                        preview: t.preview
                    };
                try {
                    this._checkRestrictions(e, c)
                } catch (yc) {
                    this._showOrLogErrorAndThrow(yc, {
                        file: c
                    })
                }
                return c
            }, n._startIfAutoProceed = function () {
                var e = this;
                this.opts.autoProceed && !this.scheduledAutoProceed && (this.scheduledAutoProceed = setTimeout((function () {
                    e.scheduledAutoProceed = null, e.upload().catch((function (t) {
                        t.isRestriction || e.log(t.stack || t.message || t)
                    }))
                }), 4))
            }, n.addFile = function (e) {
                var t;
                this._assertNewUploadAllowed(e);
                var r = this.getState().files,
                    n = this._checkAndCreateFileStateObject(r, e);
                return this.setState({
                    files: pe({}, r, (t = {}, t[n.id] = n, t))
                }), this.emit("file-added", n), this.log("Added file: " + n.name + ", " + n.id + ", mime type: " + n.type), this._startIfAutoProceed(), n.id
            }, n.addFiles = function (e) {
                var t = this;
                this._assertNewUploadAllowed();
                for (var r = pe({}, this.getState().files), n = [], i = [], o = 0; o < e.length; o++) try {
                    var s = this._checkAndCreateFileStateObject(r, e[o]);
                    n.push(s), r[s.id] = s
                } catch (u) {
                    u.isRestriction || i.push(u)
                }
                if (this.setState({
                    files: r
                }), n.forEach((function (e) {
                    t.emit("file-added", e)
                })), n.length > 5 ? this.log("Added batch of " + n.length + " files") : Object.keys(n).forEach((function (e) {
                    t.log("Added file: " + n[e].name + "\n id: " + n[e].id + "\n type: " + n[e].type)
                })), n.length > 0 && this._startIfAutoProceed(), i.length > 0) {
                    var a = "Multiple errors occurred while adding files:\n";
                    i.forEach((function (e) {
                        a += "\n * " + e.message
                    })), this.info({
                        message: this.i18n("addBulkFilesFailed", {
                            smart_count: i.length
                        }),
                        details: a
                    }, "error", 5e3);
                    var u = new Error(a);
                    throw u.errors = i, u
                }
            }, n.removeFiles = function (e, t) {
                var r = this,
                    n = this.getState(),
                    i = n.files,
                    o = n.currentUploads,
                    s = pe({}, i),
                    a = pe({}, o),
                    u = Object.create(null);

                function l(e) {
                    return void 0 === u[e]
                }
                e.forEach((function (e) {
                    i[e] && (u[e] = i[e], delete s[e])
                }));
                var c = [];
                Object.keys(a).forEach((function (e) {
                    var t = o[e].fileIDs.filter(l);
                    0 !== t.length ? a[e] = pe({}, o[e], {
                        fileIDs: t
                    }) : c.push(e)
                })), c.forEach((function (e) {
                    delete a[e]
                }));
                var p = {
                    currentUploads: a,
                    files: s
                };
                0 === Object.keys(s).length && (p.allowNewUpload = !0, p.error = null), this.setState(p), this._calculateTotalProgress();
                var d = Object.keys(u);
                d.forEach((function (e) {
                    r.emit("file-removed", u[e], t)
                })), d.length > 5 ? this.log("Removed " + d.length + " files") : this.log("Removed files: " + d.join(", "))
            }, n.removeFile = function (e, t) {
                void 0 === t && (t = null), this.removeFiles([e], t)
            }, n.pauseResume = function (e) {
                if (this.getState().capabilities.resumableUploads && !this.getFile(e).uploadComplete) {
                    var t = !this.getFile(e).isPaused;
                    return this.setFileState(e, {
                        isPaused: t
                    }), this.emit("upload-pause", e, t), t
                }
            }, n.pauseAll = function () {
                var e = pe({}, this.getState().files);
                Object.keys(e).filter((function (t) {
                    return !e[t].progress.uploadComplete && e[t].progress.uploadStarted
                })).forEach((function (t) {
                    var r = pe({}, e[t], {
                        isPaused: !0
                    });
                    e[t] = r
                })), this.setState({
                    files: e
                }), this.emit("pause-all")
            }, n.resumeAll = function () {
                var e = pe({}, this.getState().files);
                Object.keys(e).filter((function (t) {
                    return !e[t].progress.uploadComplete && e[t].progress.uploadStarted
                })).forEach((function (t) {
                    var r = pe({}, e[t], {
                        isPaused: !1,
                        error: null
                    });
                    e[t] = r
                })), this.setState({
                    files: e
                }), this.emit("resume-all")
            }, n.retryAll = function () {
                var e = pe({}, this.getState().files),
                    t = Object.keys(e).filter((function (t) {
                        return e[t].error
                    }));
                if (t.forEach((function (t) {
                    var r = pe({}, e[t], {
                        isPaused: !1,
                        error: null
                    });
                    e[t] = r
                })), this.setState({
                    files: e,
                    error: null
                }), this.emit("retry-all", t), 0 === t.length) return Promise.resolve({
                    successful: [],
                    failed: []
                });
                var r = this._createUpload(t, {
                    forceAllowNewUpload: !0
                });
                return this._runUpload(r)
            }, n.cancelAll = function () {
                this.emit("cancel-all");
                var e = this.getState().files,
                    t = Object.keys(e);
                t.length && this.removeFiles(t, "cancel-all"), this.setState({
                    totalProgress: 0,
                    error: null
                })
            }, n.retryUpload = function (e) {
                this.setFileState(e, {
                    error: null,
                    isPaused: !1
                }), this.emit("upload-retry", e);
                var t = this._createUpload([e], {
                    forceAllowNewUpload: !0
                });
                return this._runUpload(t)
            }, n.reset = function () {
                this.cancelAll()
            }, n._calculateProgress = function (e, t) {
                if (this.getFile(e.id)) {
                    var r = isFinite(t.bytesTotal) && t.bytesTotal > 0;
                    this.setFileState(e.id, {
                        progress: pe({}, this.getFile(e.id).progress, {
                            bytesUploaded: t.bytesUploaded,
                            bytesTotal: t.bytesTotal,
                            percentage: r ? Math.round(t.bytesUploaded / t.bytesTotal * 100) : 0
                        })
                    }), this._calculateTotalProgress()
                } else this.log("Not setting progress for a file that has been removed: " + e.id)
            }, n._calculateTotalProgress = function () {
                var e = this.getFiles().filter((function (e) {
                    return e.progress.uploadStarted || e.progress.preprocess || e.progress.postprocess
                }));
                if (0 === e.length) return this.emit("progress", 0), void this.setState({
                    totalProgress: 0
                });
                var t = e.filter((function (e) {
                    return null != e.progress.bytesTotal
                })),
                    r = e.filter((function (e) {
                        return null == e.progress.bytesTotal
                    }));
                if (0 !== t.length) {
                    var n = t.reduce((function (e, t) {
                        return e + t.progress.bytesTotal
                    }), 0),
                        i = n / t.length;
                    n += i * r.length;
                    var o = 0;
                    t.forEach((function (e) {
                        o += e.progress.bytesUploaded
                    })), r.forEach((function (e) {
                        o += i * (e.progress.percentage || 0) / 100
                    }));
                    var s = 0 === n ? 0 : Math.round(o / n * 100);
                    s > 100 && (s = 100), this.setState({
                        totalProgress: s
                    }), this.emit("progress", s)
                } else {
                    var a = 100 * e.length,
                        u = r.reduce((function (e, t) {
                            return e + t.progress.percentage
                        }), 0),
                        l = Math.round(u / a * 100);
                    this.setState({
                        totalProgress: l
                    })
                }
            }, n._addListeners = function () {
                var e = this;
                this.on("error", (function (t) {
                    var r = "Unknown error";
                    t.message && (r = t.message), t.details && (r += " " + t.details), e.setState({
                        error: r
                    })
                })), this.on("upload-error", (function (t, r, n) {
                    var i = "Unknown error";
                    if (r.message && (i = r.message), r.details && (i += " " + r.details), e.setFileState(t.id, {
                        error: i,
                        response: n
                    }), e.setState({
                        error: r.message
                    }), "object" == typeof r && r.message) {
                        var o = new Error(r.message);
                        o.details = r.message, r.details && (o.details += " " + r.details), o.message = e.i18n("failedToUpload", {
                            file: t.name
                        }), e._showOrLogErrorAndThrow(o, {
                            throwErr: !1
                        })
                    } else e._showOrLogErrorAndThrow(r, {
                        throwErr: !1
                    })
                })), this.on("upload", (function () {
                    e.setState({
                        error: null
                    })
                })), this.on("upload-started", (function (t, r) {
                    e.getFile(t.id) ? e.setFileState(t.id, {
                        progress: {
                            uploadStarted: Date.now(),
                            uploadComplete: !1,
                            percentage: 0,
                            bytesUploaded: 0,
                            bytesTotal: t.size
                        }
                    }) : e.log("Not setting progress for a file that has been removed: " + t.id)
                })), this.on("upload-progress", this._calculateProgress), this.on("upload-success", (function (t, r) {
                    if (e.getFile(t.id)) {
                        var n = e.getFile(t.id).progress;
                        e.setFileState(t.id, {
                            progress: pe({}, n, {
                                uploadComplete: !0,
                                percentage: 100,
                                bytesUploaded: n.bytesTotal
                            }),
                            response: r,
                            uploadURL: r.uploadURL,
                            isPaused: !1
                        }), e._calculateTotalProgress()
                    } else e.log("Not setting progress for a file that has been removed: " + t.id)
                })), this.on("preprocess-progress", (function (t, r) {
                    e.getFile(t.id) ? e.setFileState(t.id, {
                        progress: pe({}, e.getFile(t.id).progress, {
                            preprocess: r
                        })
                    }) : e.log("Not setting progress for a file that has been removed: " + t.id)
                })), this.on("preprocess-complete", (function (t) {
                    if (e.getFile(t.id)) {
                        var r = pe({}, e.getState().files);
                        r[t.id] = pe({}, r[t.id], {
                            progress: pe({}, r[t.id].progress)
                        }), delete r[t.id].progress.preprocess, e.setState({
                            files: r
                        })
                    } else e.log("Not setting progress for a file that has been removed: " + t.id)
                })), this.on("postprocess-progress", (function (t, r) {
                    e.getFile(t.id) ? e.setFileState(t.id, {
                        progress: pe({}, e.getState().files[t.id].progress, {
                            postprocess: r
                        })
                    }) : e.log("Not setting progress for a file that has been removed: " + t.id)
                })), this.on("postprocess-complete", (function (t) {
                    if (e.getFile(t.id)) {
                        var r = pe({}, e.getState().files);
                        r[t.id] = pe({}, r[t.id], {
                            progress: pe({}, r[t.id].progress)
                        }), delete r[t.id].progress.postprocess, e.setState({
                            files: r
                        })
                    } else e.log("Not setting progress for a file that has been removed: " + t.id)
                })), this.on("restored", (function () {
                    e._calculateTotalProgress()
                })), "undefined" != typeof window && window.addEventListener && (window.addEventListener("online", (function () {
                    return e.updateOnlineStatus()
                })), window.addEventListener("offline", (function () {
                    return e.updateOnlineStatus()
                })), setTimeout((function () {
                    return e.updateOnlineStatus()
                }), 3e3))
            }, n.updateOnlineStatus = function () {
                void 0 === window.navigator.onLine || window.navigator.onLine ? (this.emit("is-online"), this.wasOffline && (this.emit("back-online"), this.info(this.i18n("connectedToInternet"), "success", 3e3), this.wasOffline = !1)) : (this.emit("is-offline"), this.info(this.i18n("noInternetConnection"), "error", 0), this.wasOffline = !0)
            }, n.getID = function () {
                return this.opts.id
            }, n.use = function (e, t) {
                if ("function" != typeof e) throw new TypeError("Expected a plugin class, but got " + (null === e ? "null" : typeof e) + ". Please verify that the plugin was imported and spelled correctly.");
                var r = new e(this, t),
                    n = r.id;
                if (this.plugins[r.type] = this.plugins[r.type] || [], !n) throw new Error("Your plugin must have an id");
                if (!r.type) throw new Error("Your plugin must have a type");
                var i = this.getPlugin(n);
                if (i) {
                    var o = "Already found a plugin named '" + i.id + "'. Tried to use: '" + n + "'.\nUppy plugins must have unique `id` options. See https://uppy.io/docs/plugins/#id.";
                    throw new Error(o)
                }
                return e.VERSION && this.log("Using " + n + " v" + e.VERSION), this.plugins[r.type].push(r), r.install(), this
            }, n.getPlugin = function (e) {
                var t = null;
                return this.iteratePlugins((function (r) {
                    if (r.id === e) return t = r, !1
                })), t
            }, n.iteratePlugins = function (e) {
                var t = this;
                Object.keys(this.plugins).forEach((function (r) {
                    t.plugins[r].forEach(e)
                }))
            }, n.removePlugin = function (e) {
                this.log("Removing plugin " + e.id), this.emit("plugin-remove", e), e.uninstall && e.uninstall();
                var t = this.plugins[e.type].slice(),
                    r = t.indexOf(e); - 1 !== r && (t.splice(r, 1), this.plugins[e.type] = t);
                var n = this.getState();
                delete n.plugins[e.id], this.setState(n)
            }, n.close = function () {
                var e = this;
                this.log("Closing Uppy instance " + this.opts.id + ": removing all files and uninstalling plugins"), this.reset(), this._storeUnsubscribe(), this.iteratePlugins((function (t) {
                    e.removePlugin(t)
                }))
            }, n.info = function (e, t, r) {
                void 0 === t && (t = "info"), void 0 === r && (r = 3e3);
                var n = "object" == typeof e;
                this.setState({
                    info: {
                        isHidden: !1,
                        type: t,
                        message: n ? e.message : e,
                        details: n ? e.details : null
                    }
                }), this.emit("info-visible"), clearTimeout(this.infoTimeoutID), this.infoTimeoutID = 0 !== r ? setTimeout(this.hideInfo, r) : void 0
            }, n.hideInfo = function () {
                var e = pe({}, this.getState().info, {
                    isHidden: !0
                });
                this.setState({
                    info: e
                }), this.emit("info-hidden")
            }, n.log = function (e, t) {
                var r = this.opts.logger;
                switch (t) {
                    case "error":
                        r.error(e);
                        break;
                    case "warning":
                        r.warn(e);
                        break;
                    default:
                        r.debug(e)
                }
            }, n.run = function () {
                return this.log("Calling run() is no longer necessary.", "warning"), this
            }, n.restore = function (e) {
                return this.log('Core: attempting to restore upload "' + e + '"'), this.getState().currentUploads[e] ? this._runUpload(e) : (this._removeUpload(e), Promise.reject(new Error("Nonexistent upload")))
            }, n._createUpload = function (e, t) {
                var r;
                void 0 === t && (t = {});
                var n = t.forceAllowNewUpload,
                    i = void 0 !== n && n,
                    o = this.getState(),
                    s = o.allowNewUpload,
                    a = o.currentUploads;
                if (!s && !i) throw new Error("Cannot create a new upload: already uploading.");
                var u = I();
                return this.emit("upload", {
                    id: u,
                    fileIDs: e
                }), this.setState({
                    allowNewUpload: !1 !== this.opts.allowMultipleUploads,
                    currentUploads: pe({}, a, (r = {}, r[u] = {
                        fileIDs: e,
                        step: 0,
                        result: {}
                    }, r))
                }), u
            }, n._getUpload = function (e) {
                return this.getState().currentUploads[e]
            }, n.addResultData = function (e, t) {
                var r;
                if (this._getUpload(e)) {
                    var n = this.getState().currentUploads,
                        i = pe({}, n[e], {
                            result: pe({}, n[e].result, t)
                        });
                    this.setState({
                        currentUploads: pe({}, n, (r = {}, r[e] = i, r))
                    })
                } else this.log("Not setting result for an upload that has been removed: " + e)
            }, n._removeUpload = function (e) {
                var t = pe({}, this.getState().currentUploads);
                delete t[e], this.setState({
                    currentUploads: t
                })
            }, n._runUpload = function (e) {
                var t = this,
                    r = this.getState().currentUploads[e].step,
                    n = [].concat(this.preProcessors, this.uploaders, this.postProcessors),
                    i = Promise.resolve();
                return n.forEach((function (n, o) {
                    o < r || (i = i.then((function () {
                        var r, i = t.getState().currentUploads,
                            s = i[e];
                        if (s) {
                            var a = pe({}, s, {
                                step: o
                            });
                            return t.setState({
                                currentUploads: pe({}, i, (r = {}, r[e] = a, r))
                            }), n(a.fileIDs, e)
                        }
                    })).then((function (e) {
                        return null
                    })))
                })), i.catch((function (r) {
                    t.emit("error", r, e), t._removeUpload(e)
                })), i.then((function () {
                    var r = t.getState().currentUploads[e];
                    if (r) {
                        var n = r.fileIDs.map((function (e) {
                            return t.getFile(e)
                        })),
                            i = n.filter((function (e) {
                                return !e.error
                            })),
                            o = n.filter((function (e) {
                                return e.error
                            }));
                        t.addResultData(e, {
                            successful: i,
                            failed: o,
                            uploadID: e
                        })
                    }
                })).then((function () {
                    var r = t.getState().currentUploads;
                    if (r[e]) {
                        var n = r[e].result;
                        return t.emit("complete", n), t._removeUpload(e), n
                    }
                })).then((function (r) {
                    return null == r && t.log("Not setting result for an upload that has been removed: " + e), r
                }))
            }, n.upload = function () {
                var e = this;
                this.plugins.uploader || this.log("No uploader type plugins are used", "warning");
                var t = this.getState().files,
                    r = this.opts.onBeforeUpload(t);
                return !1 === r ? Promise.reject(new Error("Not starting the upload because onBeforeUpload returned false")) : (r && "object" == typeof r && (t = r, this.setState({
                    files: t
                })), Promise.resolve().then((function () {
                    return e._checkMinNumberOfFiles(t)
                })).catch((function (t) {
                    e._showOrLogErrorAndThrow(t)
                })).then((function () {
                    var r = e.getState().currentUploads,
                        n = Object.keys(r).reduce((function (e, t) {
                            return e.concat(r[t].fileIDs)
                        }), []),
                        i = [];
                    Object.keys(t).forEach((function (t) {
                        var r = e.getFile(t);
                        r.progress.uploadStarted || -1 !== n.indexOf(t) || i.push(r.id)
                    }));
                    var o = e._createUpload(i);
                    return e._runUpload(o)
                })).catch((function (t) {
                    e._showOrLogErrorAndThrow(t, {
                        showInformer: !1
                    })
                })))
            }, t = e, (r = [{
                key: "state",
                get: function () {
                    return this.getState()
                }
            }]) && de(t.prototype, r), e
        }();

    function _e(e) {
        var t = "function" == typeof Map ? new Map : void 0;
        return (_e = function (e) {
            if (null === e || (r = e, -1 === Function.toString.call(r).indexOf("[native code]"))) return e;
            var r;
            if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== t) {
                if (t.has(e)) return t.get(e);
                t.set(e, n)
            }

            function n() {
                return Se(e, arguments, Pe(this).constructor)
            }
            return n.prototype = Object.create(e.prototype, {
                constructor: {
                    value: n,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), ke(n, e)
        })(e)
    }

    function Se(e, t, r) {
        return (Se = function () {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], (function () { }))), !0
            } catch (e) {
                return !1
            }
        }() ? Reflect.construct : function (e, t, r) {
            var n = [null];
            n.push.apply(n, t);
            var i = new (Function.bind.apply(e, n));
            return r && ke(i, r.prototype), i
        }).apply(null, arguments)
    }

    function ke(e, t) {
        return (ke = Object.setPrototypeOf || function (e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }

    function Pe(e) {
        return (Pe = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }
    we.VERSION = "1.13.2", (le = function (e) {
        return new we(e)
    }).Uppy = we, le.Plugin = ce, le.debugLogger = me;
    var Ce = function (e) {
        var t, r;

        function n() {
            var t;
            return (t = e.call(this, "Authorization required") || this).name = "AuthError", t.isAuthError = !0, t
        }
        return r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r, n
    }(_e(Error));

    function Ee(e) {
        var t = "function" == typeof Map ? new Map : void 0;
        return (Ee = function (e) {
            if (null === e || (r = e, -1 === Function.toString.call(r).indexOf("[native code]"))) return e;
            var r;
            if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== t) {
                if (t.has(e)) return t.get(e);
                t.set(e, n)
            }

            function n() {
                return Ae(e, arguments, Oe(this).constructor)
            }
            return n.prototype = Object.create(e.prototype, {
                constructor: {
                    value: n,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), Fe(n, e)
        })(e)
    }

    function Ae(e, t, r) {
        return (Ae = function () {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], (function () { }))), !0
            } catch (e) {
                return !1
            }
        }() ? Reflect.construct : function (e, t, r) {
            var n = [null];
            n.push.apply(n, t);
            var i = new (Function.bind.apply(e, n));
            return r && Fe(i, r.prototype), i
        }).apply(null, arguments)
    }

    function Fe(e, t) {
        return (Fe = Object.setPrototypeOf || function (e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }

    function Oe(e) {
        return (Oe = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }
    var Ue, Re, Te = function (e) {
        var t, r;

        function n(t, r) {
            var n;
            return void 0 === r && (r = null), (n = e.call(this, "This looks like a network error, the endpoint might be blocked by an internet provider or a firewall.\n\nSource error: [" + t + "]") || this).isNetworkError = !0, n.request = r, n
        }
        return r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r, n
    }(Ee(Error)),
        xe = function () {
            return fetch.apply(void 0, arguments).catch((function (e) {
                throw "AbortError" === e.name ? e : new Te(e)
            }))
        };

    function De() {
        return (De = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function Be(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    var Ie = (Re = Ue = function () {
        function e(e, t) {
            this.uppy = e, this.opts = t, this.onReceiveResponse = this.onReceiveResponse.bind(this), this.allowedHeaders = ["accept", "content-type", "uppy-auth-token"], this.preflightDone = !1
        }
        var t, r, n = e.prototype;
        return n.headers = function () {
            var e = this.opts.companionHeaders || this.opts.serverHeaders || {};
            return Promise.resolve(De({}, this.defaultHeaders, e))
        }, n._getPostResponseFunc = function (e) {
            var t = this;
            return function (r) {
                return e ? r : t.onReceiveResponse(r)
            }
        }, n.onReceiveResponse = function (e) {
            var t, r = this.uppy.getState().companion || {},
                n = this.opts.companionUrl,
                i = e.headers;
            return i.has("i-am") && i.get("i-am") !== r[n] && this.uppy.setState({
                companion: De({}, r, (t = {}, t[n] = i.get("i-am"), t))
            }), e
        }, n._getUrl = function (e) {
            return /^(https?:|)\/\//.test(e) ? e : this.hostname + "/" + e
        }, n._json = function (e) {
            if (401 === e.status) throw new Ce;
            if (e.status < 200 || e.status > 300) {
                var t = "Failed request with status: " + e.status + ". " + e.statusText;
                return e.json().then((function (e) {
                    throw t = e.message ? t + " message: " + e.message : t, t = e.requestId ? t + " request-Id: " + e.requestId : t, new Error(t)
                })).catch((function () {
                    throw new Error(t)
                }))
            }
            return e.json()
        }, n.preflight = function (e) {
            var t = this;
            return this.preflightDone ? Promise.resolve(this.allowedHeaders.slice()) : fetch(this._getUrl(e), {
                method: "OPTIONS"
            }).then((function (e) {
                return e.headers.has("access-control-allow-headers") && (t.allowedHeaders = e.headers.get("access-control-allow-headers").split(",").map((function (e) {
                    return e.trim().toLowerCase()
                }))), t.preflightDone = !0, t.allowedHeaders.slice()
            })).catch((function (e) {
                return t.uppy.log("[CompanionClient] unable to make preflight request " + e, "warning"), t.preflightDone = !0, t.allowedHeaders.slice()
            }))
        }, n.preflightAndHeaders = function (e) {
            var t = this;
            return Promise.all([this.preflight(e), this.headers()]).then((function (e) {
                var r = e[0],
                    n = e[1];
                return Object.keys(n).forEach((function (e) {
                    -1 === r.indexOf(e.toLowerCase()) && (t.uppy.log("[CompanionClient] excluding unallowed header " + e), delete n[e])
                })), n
            }))
        }, n.get = function (e, t) {
            var r = this;
            return this.preflightAndHeaders(e).then((function (t) {
                return xe(r._getUrl(e), {
                    method: "get",
                    headers: t,
                    credentials: "same-origin"
                })
            })).then(this._getPostResponseFunc(t)).then((function (e) {
                return r._json(e)
            })).catch((function (t) {
                return t = t.isAuthError ? t : new Error("Could not get " + r._getUrl(e) + ". " + t), Promise.reject(t)
            }))
        }, n.post = function (e, t, r) {
            var n = this;
            return this.preflightAndHeaders(e).then((function (r) {
                return xe(n._getUrl(e), {
                    method: "post",
                    headers: r,
                    credentials: "same-origin",
                    body: JSON.stringify(t)
                })
            })).then(this._getPostResponseFunc(r)).then((function (e) {
                return n._json(e)
            })).catch((function (t) {
                return t = t.isAuthError ? t : new Error("Could not post " + n._getUrl(e) + ". " + t), Promise.reject(t)
            }))
        }, n.delete = function (e, t, r) {
            var n = this;
            return this.preflightAndHeaders(e).then((function (r) {
                return xe(n.hostname + "/" + e, {
                    method: "delete",
                    headers: r,
                    credentials: "same-origin",
                    body: t ? JSON.stringify(t) : null
                })
            })).then(this._getPostResponseFunc(r)).then((function (e) {
                return n._json(e)
            })).catch((function (t) {
                return t = t.isAuthError ? t : new Error("Could not delete " + n._getUrl(e) + ". " + t), Promise.reject(t)
            }))
        }, t = e, (r = [{
            key: "hostname",
            get: function () {
                var e = this.uppy.getState().companion,
                    t = this.opts.companionUrl;
                return (e && e[t] ? e[t] : t).replace(/\/$/, "")
            }
        }, {
            key: "defaultHeaders",
            get: function () {
                return {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Uppy-Versions": "@uppy/companion-client=" + e.VERSION
                }
            }
        }]) && Be(t.prototype, r), e
    }(), Ue.VERSION = "1.5.4", Re),
        je = {};

    function Le() {
        return (Le = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    je.setItem = function (e, t) {
        return new Promise((function (r) {
            localStorage.setItem(e, t), r()
        }))
    }, je.getItem = function (e) {
        return Promise.resolve(localStorage.getItem(e))
    }, je.removeItem = function (e) {
        return new Promise((function (t) {
            localStorage.removeItem(e), t()
        }))
    };
    var Me = {
        RequestClient: Ie,
        Provider: function (e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).provider = r.provider, n.id = n.provider, n.name = n.opts.name || n.id.split("-").map((function (e) {
                    return e.charAt(0).toUpperCase() + e.slice(1)
                })).join(" "), n.pluginId = n.opts.pluginId, n.tokenKey = "companion-" + n.pluginId + "-auth-token", n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var i = n.prototype;
            return i.headers = function () {
                return Promise.all([e.prototype.headers.call(this), this.getAuthToken()]).then((function (e) {
                    return Le({}, e[0], {
                        "uppy-auth-token": e[1]
                    })
                }))
            }, i.onReceiveResponse = function (t) {
                t = e.prototype.onReceiveResponse.call(this, t);
                var r = this.uppy.getPlugin(this.pluginId),
                    n = r.getPluginState().authenticated ? 401 !== t.status : t.status < 400;
                return r.setPluginState({
                    authenticated: n
                }), t
            }, i.setAuthToken = function (e) {
                return this.uppy.getPlugin(this.pluginId).storage.setItem(this.tokenKey, e)
            }, i.getAuthToken = function () {
                return this.uppy.getPlugin(this.pluginId).storage.getItem(this.tokenKey)
            }, i.authUrl = function () {
                return this.hostname + "/" + this.id + "/connect"
            }, i.fileUrl = function (e) {
                return this.hostname + "/" + this.id + "/get/" + e
            }, i.list = function (e) {
                return this.get(this.id + "/list/" + (e || ""))
            }, i.logout = function () {
                var e = this;
                return this.get(this.id + "/logout").then((function (t) {
                    return Promise.all([t, e.uppy.getPlugin(e.pluginId).storage.removeItem(e.tokenKey)])
                })).then((function (e) {
                    return e[0]
                }))
            }, n.initPlugin = function (e, t, r) {
                if (e.type = "acquirer", e.files = [], r && (e.opts = Le({}, r, t)), t.serverUrl || t.serverPattern) throw new Error("`serverUrl` and `serverPattern` have been renamed to `companionUrl` and `companionAllowedHosts` respectively in the 0.30.5 release. Please consult the docs (for example, https://uppy.io/docs/instagram/ for the Instagram plugin) and use the updated options.`");
                if (t.companionAllowedHosts) {
                    var n = t.companionAllowedHosts;
                    if (!("string" == typeof n || Array.isArray(n) || n instanceof RegExp)) throw new TypeError(e.id + ': the option "companionAllowedHosts" must be one of string, Array, RegExp');
                    e.opts.companionAllowedHosts = n
                } else /^(?!https?:\/\/).*$/i.test(t.companionUrl) ? e.opts.companionAllowedHosts = "https://" + t.companionUrl.replace(/^\/\//, "") : e.opts.companionAllowedHosts = t.companionUrl;
                e.storage = e.opts.storage || je
            }, n
        }(Ie),
        Socket: function () {
            function e(e) {
                this.opts = e, this._queued = [], this.isOpen = !1, this.emitter = A(), this._handleMessage = this._handleMessage.bind(this), this.close = this.close.bind(this), this.emit = this.emit.bind(this), this.on = this.on.bind(this), this.once = this.once.bind(this), this.send = this.send.bind(this), e && !1 === e.autoOpen || this.open()
            }
            var t = e.prototype;
            return t.open = function () {
                var e = this;
                this.socket = new WebSocket(this.opts.target), this.socket.onopen = function (t) {
                    for (e.isOpen = !0; e._queued.length > 0 && e.isOpen;) {
                        var r = e._queued[0];
                        e.send(r.action, r.payload), e._queued = e._queued.slice(1)
                    }
                }, this.socket.onclose = function (t) {
                    e.isOpen = !1
                }, this.socket.onmessage = this._handleMessage
            }, t.close = function () {
                this.socket && this.socket.close()
            }, t.send = function (e, t) {
                this.isOpen ? this.socket.send(JSON.stringify({
                    action: e,
                    payload: t
                })) : this._queued.push({
                    action: e,
                    payload: t
                })
            }, t.on = function (e, t) {
                this.emitter.on(e, t)
            }, t.emit = function (e, t) {
                this.emitter.emit(e, t)
            }, t.once = function (e, t) {
                this.emitter.once(e, t)
            }, t._handleMessage = function (e) {
                try {
                    var t = JSON.parse(e.data);
                    this.emit(t.action, t.payload)
                } catch (yc) {
                    console.log(yc)
                }
            }, e
        }()
    },
        Ne = oe.h,
        ze = function (e) {
            var t, r;

            function n() {
                return e.apply(this, arguments) || this
            }
            return r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r, n.prototype.render = function () {
                var e = Ne("span", {
                    class: "uppy-Provider-authTitleName"
                }, this.props.pluginName, Ne("br", null));
                return Ne("div", {
                    class: "uppy-Provider-auth"
                }, Ne("div", {
                    class: "uppy-Provider-authIcon"
                }, this.props.pluginIcon()), Ne("div", {
                    class: "uppy-Provider-authTitle"
                }, this.props.i18nArray("authenticateWithTitle", {
                    pluginName: e
                })), Ne("button", {
                    type: "button",
                    class: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Provider-authBtn",
                    onclick: this.props.handleAuth,
                    "data-uppy-super-focusable": !0
                }, this.props.i18nArray("authenticateWith", {
                    pluginName: this.props.pluginName
                })))
            }, n
        }(oe.Component),
        qe = {
            exports: {}
        };
    ! function () {
        "use strict";
        var e = {}.hasOwnProperty;

        function t() {
            for (var r = [], n = 0; n < arguments.length; n++) {
                var i = arguments[n];
                if (i) {
                    var o = typeof i;
                    if ("string" === o || "number" === o) r.push(i);
                    else if (Array.isArray(i) && i.length) {
                        var s = t.apply(null, i);
                        s && r.push(s)
                    } else if ("object" === o)
                        for (var a in i) e.call(i, a) && i[a] && r.push(a)
                }
            }
            return r.join(" ")
        }
        qe.exports ? (t.default = t, qe.exports = t) : window.classNames = t
    }(), qe = qe.exports;
    var He = oe.h,
        Ve = function (e) {
            return He("span", null, He("button", {
                type: "button",
                class: "uppy-u-reset",
                onclick: e.getFolder
            }, e.title), e.isLast ? "" : " / ")
        },
        We = oe.h,
        Xe = function (e) {
            var t, r;

            function n(t) {
                var r;
                return (r = e.call(this, t) || this).preventEnterPress = r.preventEnterPress.bind(function (e) {
                    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }(r)), r
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var i = n.prototype;
            return i.preventEnterPress = function (e) {
                13 === e.keyCode && (e.stopPropagation(), e.preventDefault())
            }, i.render = function () {
                var e = this;
                return We("div", {
                    class: "uppy-ProviderBrowser-search"
                }, We("input", {
                    class: "uppy-u-reset uppy-ProviderBrowser-searchInput",
                    type: "text",
                    placeholder: this.props.i18n("filter"),
                    "aria-label": this.props.i18n("filter"),
                    onkeyup: this.preventEnterPress,
                    onkeydown: this.preventEnterPress,
                    onkeypress: this.preventEnterPress,
                    oninput: function (t) {
                        return e.props.filterQuery(t)
                    },
                    value: this.props.filterInput
                }), We("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    class: "uppy-c-icon uppy-ProviderBrowser-searchIcon",
                    width: "12",
                    height: "12",
                    viewBox: "0 0 12 12"
                }, We("path", {
                    d: "M8.638 7.99l3.172 3.172a.492.492 0 1 1-.697.697L7.91 8.656a4.977 4.977 0 0 1-2.983.983C2.206 9.639 0 7.481 0 4.819 0 2.158 2.206 0 4.927 0c2.721 0 4.927 2.158 4.927 4.82a4.74 4.74 0 0 1-1.216 3.17zm-3.71.685c2.176 0 3.94-1.726 3.94-3.856 0-2.129-1.764-3.855-3.94-3.855C2.75.964.984 2.69.984 4.819c0 2.13 1.765 3.856 3.942 3.856z"
                })), this.props.filterInput && We("button", {
                    class: "uppy-u-reset uppy-ProviderBrowser-searchClose",
                    type: "button",
                    "aria-label": this.props.i18n("resetFilter"),
                    title: this.props.i18n("resetFilter"),
                    onclick: this.props.filterQuery
                }, We("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    class: "uppy-c-icon",
                    viewBox: "0 0 19 19"
                }, We("path", {
                    d: "M17.318 17.232L9.94 9.854 9.586 9.5l-.354.354-7.378 7.378h.707l-.62-.62v.706L9.318 9.94l.354-.354-.354-.354L1.94 1.854v.707l.62-.62h-.706l7.378 7.378.354.354.354-.354 7.378-7.378h-.707l.622.62v-.706L9.854 9.232l-.354.354.354.354 7.378 7.378.708-.707-7.38-7.378v.708l7.38-7.38.353-.353-.353-.353-.622-.622-.353-.353-.354.352-7.378 7.38h.708L2.56 1.23 2.208.88l-.353.353-.622.62-.353.355.352.353 7.38 7.38v-.708l-7.38 7.38-.353.353.352.353.622.622.353.353.354-.353 7.38-7.38h-.708l7.38 7.38z"
                }))))
            }, n
        }(oe.Component),
        Ge = oe.h;

    function Ke() {
        return Ge("svg", {
            "aria-hidden": "true",
            focusable: "false",
            class: "uppy-c-icon",
            width: 11,
            height: 14.5,
            viewBox: "0 0 44 58"
        }, Ge("path", {
            d: "M27.437.517a1 1 0 0 0-.094.03H4.25C2.037.548.217 2.368.217 4.58v48.405c0 2.212 1.82 4.03 4.03 4.03H39.03c2.21 0 4.03-1.818 4.03-4.03V15.61a1 1 0 0 0-.03-.28 1 1 0 0 0 0-.093 1 1 0 0 0-.03-.032 1 1 0 0 0 0-.03 1 1 0 0 0-.032-.063 1 1 0 0 0-.03-.063 1 1 0 0 0-.032 0 1 1 0 0 0-.03-.063 1 1 0 0 0-.032-.03 1 1 0 0 0-.03-.063 1 1 0 0 0-.063-.062l-14.593-14a1 1 0 0 0-.062-.062A1 1 0 0 0 28 .708a1 1 0 0 0-.374-.157 1 1 0 0 0-.156 0 1 1 0 0 0-.03-.03l-.003-.003zM4.25 2.547h22.218v9.97c0 2.21 1.82 4.03 4.03 4.03h10.564v36.438a2.02 2.02 0 0 1-2.032 2.032H4.25c-1.13 0-2.032-.9-2.032-2.032V4.58c0-1.13.902-2.032 2.03-2.032zm24.218 1.345l10.375 9.937.75.718H30.5c-1.13 0-2.032-.9-2.032-2.03V3.89z"
        }))
    }

    function $e() {
        return Ge("svg", {
            "aria-hidden": "true",
            focusable: "false",
            class: "uppy-c-icon",
            style: {
                width: 16,
                marginRight: 3
            },
            viewBox: "0 0 276.157 276.157"
        }, Ge("path", {
            d: "M273.08 101.378c-3.3-4.65-8.86-7.32-15.254-7.32h-24.34V67.59c0-10.2-8.3-18.5-18.5-18.5h-85.322c-3.63 0-9.295-2.875-11.436-5.805l-6.386-8.735c-4.982-6.814-15.104-11.954-23.546-11.954H58.73c-9.292 0-18.638 6.608-21.737 15.372l-2.033 5.752c-.958 2.71-4.72 5.37-7.596 5.37H18.5C8.3 49.09 0 57.39 0 67.59v167.07c0 .886.16 1.73.443 2.52.152 3.306 1.18 6.424 3.053 9.064 3.3 4.652 8.86 7.32 15.255 7.32h188.487c11.395 0 23.27-8.425 27.035-19.18l40.677-116.188c2.11-6.035 1.43-12.164-1.87-16.816zM18.5 64.088h8.864c9.295 0 18.64-6.607 21.738-15.37l2.032-5.75c.96-2.712 4.722-5.373 7.597-5.373h29.565c3.63 0 9.295 2.876 11.437 5.806l6.386 8.735c4.982 6.815 15.104 11.954 23.546 11.954h85.322c1.898 0 3.5 1.602 3.5 3.5v26.47H69.34c-11.395 0-23.27 8.423-27.035 19.178L15 191.23V67.59c0-1.898 1.603-3.5 3.5-3.5zm242.29 49.15l-40.676 116.188c-1.674 4.78-7.812 9.135-12.877 9.135H18.75c-1.447 0-2.576-.372-3.02-.997-.442-.625-.422-1.814.057-3.18l40.677-116.19c1.674-4.78 7.812-9.134 12.877-9.134h188.487c1.448 0 2.577.372 3.02.997.443.625.423 1.814-.056 3.18z"
        }))
    }

    function Ye() {
        return Ge("svg", {
            "aria-hidden": "true",
            focusable: "false",
            style: {
                width: 16,
                marginRight: 4
            },
            viewBox: "0 0 58 58"
        }, Ge("path", {
            d: "M36.537 28.156l-11-7a1.005 1.005 0 0 0-1.02-.033C24.2 21.3 24 21.635 24 22v14a1 1 0 0 0 1.537.844l11-7a1.002 1.002 0 0 0 0-1.688zM26 34.18V23.82L34.137 29 26 34.18z"
        }), Ge("path", {
            d: "M57 6H1a1 1 0 0 0-1 1v44a1 1 0 0 0 1 1h56a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zM10 28H2v-9h8v9zm-8 2h8v9H2v-9zm10 10V8h34v42H12V40zm44-12h-8v-9h8v9zm-8 2h8v9h-8v-9zm8-22v9h-8V8h8zM2 8h8v9H2V8zm0 42v-9h8v9H2zm54 0h-8v-9h8v9z"
        }))
    }
    var Je = function (e) {
        if (null !== e.itemIconString) switch (e.itemIconString) {
            case "file":
                return Ge(Ke, null);
            case "folder":
                return Ge($e, null);
            case "video":
                return Ge(Ye, null);
            default:
                return Ge("img", {
                    src: e.itemIconString
                })
        }
    },
        Qe = oe.h,
        Ze = function (e) {
            return Qe("li", {
                class: e.className
            }, Qe("div", {
                "aria-hidden": !0,
                class: "uppy-ProviderBrowserItem-fakeCheckbox " + (e.isChecked ? "uppy-ProviderBrowserItem-fakeCheckbox--is-checked" : "")
            }), Qe("button", {
                type: "button",
                class: "uppy-u-reset uppy-ProviderBrowserItem-inner",
                onclick: e.toggleCheckbox,
                role: "option",
                "aria-label": e.isChecked ? e.i18n("unselectFileNamed", {
                    name: e.title
                }) : e.i18n("selectFileNamed", {
                    name: e.title
                }),
                "aria-selected": e.isChecked,
                "aria-disabled": e.isDisabled,
                "data-uppy-super-focusable": !0
            }, e.itemIconEl, e.showTitles && e.title))
        },
        et = oe.h,
        tt = function (e) {
            return "folder" === e.type ? e.isChecked ? e.i18n("unselectAllFilesFromFolderNamed", {
                name: e.title
            }) : e.i18n("selectAllFilesFromFolderNamed", {
                name: e.title
            }) : e.isChecked ? e.i18n("unselectFileNamed", {
                name: e.title
            }) : e.i18n("selectFileNamed", {
                name: e.title
            })
        },
        rt = function (e) {
            return et("li", {
                class: e.className
            }, et("button", {
                type: "button",
                class: "uppy-u-reset uppy-ProviderBrowserItem-fakeCheckbox " + (e.isChecked ? "uppy-ProviderBrowserItem-fakeCheckbox--is-checked" : ""),
                onClick: e.toggleCheckbox,
                id: e.id,
                role: "option",
                "aria-label": tt(e),
                "aria-selected": e.isChecked,
                "aria-disabled": e.isDisabled,
                "data-uppy-super-focusable": !0
            }), "file" === e.type ? et("label", {
                for: e.id,
                className: "uppy-u-reset uppy-ProviderBrowserItem-inner"
            }, e.itemIconEl, e.showTitles && e.title) : et("button", {
                type: "button",
                class: "uppy-u-reset uppy-ProviderBrowserItem-inner",
                onclick: e.handleFolderClick,
                "aria-label": e.i18n("openFolderNamed", {
                    name: e.title
                })
            }, e.itemIconEl, e.showTitles && e.title))
        };

    function nt() {
        return (nt = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var it = oe.h,
        ot = function (e) {
            var t = e.getItemIcon(),
                r = qe("uppy-ProviderBrowserItem", {
                    "uppy-ProviderBrowserItem--selected": e.isChecked
                }, {
                    "uppy-ProviderBrowserItem--noPreview": "video" === t
                }),
                n = it(Je, {
                    itemIconString: t
                });
            switch (e.viewType) {
                case "grid":
                    return it(Ze, nt({}, e, {
                        className: r,
                        itemIconEl: n
                    }));
                case "list":
                    return it(rt, nt({}, e, {
                        className: r,
                        itemIconEl: n
                    }));
                default:
                    throw new Error("There is no such type " + e.viewType)
            }
        };

    function st() {
        return (st = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var at = oe.h,
        ut = function (e, t) {
            return {
                id: e.id,
                title: e.name,
                getItemIcon: function () {
                    return e.icon
                },
                isChecked: t.isChecked(e),
                toggleCheckbox: function (r) {
                    return t.toggleCheckbox(r, e)
                },
                columns: t.columns,
                showTitles: t.showTitles,
                viewType: t.viewType,
                i18n: t.i18n
            }
        },
        lt = function (e) {
            return e.folders.length || e.files.length ? at("div", {
                class: "uppy-ProviderBrowser-body"
            }, at("ul", {
                class: "uppy-ProviderBrowser-list",
                onscroll: e.handleScroll,
                role: "listbox",
                tabindex: "-1"
            }, e.folders.map((function (t) {
                return ot(st({}, ut(t, e), {
                    type: "folder",
                    isDisabled: !!e.isChecked(t) && e.isChecked(t).loading,
                    handleFolderClick: function () {
                        return e.handleFolderClick(t)
                    }
                }))
            })), e.files.map((function (t) {
                return ot(st({}, ut(t, e), {
                    type: "file",
                    isDisabled: !1
                }))
            })))) : at("div", {
                class: "uppy-Provider-empty"
            }, e.i18n("noFilesFound"))
        },
        ct = oe.h,
        pt = function (e) {
            return ct("div", {
                class: "uppy-ProviderBrowser-footer"
            }, ct("button", {
                class: "uppy-u-reset uppy-c-btn uppy-c-btn-primary",
                onclick: e.done
            }, e.i18n("selectX", {
                smart_count: e.selected
            })), ct("button", {
                class: "uppy-u-reset uppy-c-btn uppy-c-btn-link",
                onclick: e.cancel
            }, e.i18n("cancel")))
        };

    function dt() {
        return (dt = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var ht, ft, yt = oe.h,
        gt = function (e) {
            var t = e.folders,
                r = e.files;
            "" !== e.filterInput && (t = e.filterItems(e.folders), r = e.filterItems(e.files));
            var n = e.currentSelection.length;
            return yt("div", {
                class: qe("uppy-ProviderBrowser", "uppy-ProviderBrowser-viewType--" + e.viewType)
            }, yt("div", {
                class: "uppy-ProviderBrowser-header"
            }, yt("div", {
                class: qe("uppy-ProviderBrowser-headerBar", !e.showBreadcrumbs && "uppy-ProviderBrowser-headerBar--simple")
            }, e.showBreadcrumbs && function (e) {
                return He("div", {
                    class: "uppy-Provider-breadcrumbs"
                }, He("div", {
                    class: "uppy-Provider-breadcrumbsIcon"
                }, e.breadcrumbsIcon), e.directories.map((function (t, r) {
                    return He(Ve, {
                        key: t.id,
                        getFolder: function () {
                            return e.getFolder(t.id)
                        },
                        title: 0 === r ? e.title : t.title,
                        isLast: r + 1 === e.directories.length
                    })
                })))
            }({
                getFolder: e.getFolder,
                directories: e.directories,
                breadcrumbsIcon: e.pluginIcon && e.pluginIcon(),
                title: e.title
            }), yt("span", {
                class: "uppy-ProviderBrowser-user"
            }, e.username), yt("button", {
                type: "button",
                onclick: e.logout,
                class: "uppy-u-reset uppy-ProviderBrowser-userLogout"
            }, e.i18n("logOut")))), e.showFilter && yt(Xe, e), yt(lt, {
                columns: [{
                    name: "Name",
                    key: "title"
                }],
                folders: t,
                files: r,
                activeRow: e.isActiveRow,
                sortByTitle: e.sortByTitle,
                sortByDate: e.sortByDate,
                isChecked: e.isChecked,
                handleFolderClick: e.getNextFolder,
                toggleCheckbox: e.toggleCheckbox,
                handleScroll: e.handleScroll,
                title: e.title,
                showTitles: e.showTitles,
                i18n: e.i18n,
                viewType: e.viewType
            }), n > 0 && yt(pt, dt({
                selected: n
            }, e)))
        },
        vt = oe.h,
        mt = function (e) {
            return vt("div", {
                class: "uppy-Provider-loading"
            }, vt("span", null, e.i18n("loading")))
        },
        bt = function (e) {
            if (!e) return !1;
            var t = e.split("/")[1];
            return !!/^(jpe?g|gif|png|svg|svg\+xml|bmp|webp|avif)$/.test(t)
        };

    function wt() {
        return (wt = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var _t, St = oe.h,
        kt = function (e) {
            var t, r;

            function n() {
                return e.apply(this, arguments) || this
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var i = n.prototype;
            return i.componentWillUnmount = function () {
                this.props.onUnmount()
            }, i.render = function () {
                return this.props.children[0]
            }, n
        }(oe.Component),
        Pt = (ft = ht = function () {
            function e(e, t) {
                this.plugin = e, this.provider = t.provider, this.opts = wt({}, {
                    viewType: "list",
                    showTitles: !0,
                    showFilter: !0,
                    showBreadcrumbs: !0
                }, t), this.addFile = this.addFile.bind(this), this.filterItems = this.filterItems.bind(this), this.filterQuery = this.filterQuery.bind(this), this.toggleSearch = this.toggleSearch.bind(this), this.getFolder = this.getFolder.bind(this), this.getNextFolder = this.getNextFolder.bind(this), this.logout = this.logout.bind(this), this.preFirstRender = this.preFirstRender.bind(this), this.handleAuth = this.handleAuth.bind(this), this.sortByTitle = this.sortByTitle.bind(this), this.sortByDate = this.sortByDate.bind(this), this.isActiveRow = this.isActiveRow.bind(this), this.isChecked = this.isChecked.bind(this), this.toggleCheckbox = this.toggleCheckbox.bind(this), this.handleError = this.handleError.bind(this), this.handleScroll = this.handleScroll.bind(this), this.listAllFiles = this.listAllFiles.bind(this), this.donePicking = this.donePicking.bind(this), this.cancelPicking = this.cancelPicking.bind(this), this.clearSelection = this.clearSelection.bind(this), this.render = this.render.bind(this), this.clearSelection(), this.plugin.setPluginState({
                    authenticated: !1,
                    files: [],
                    folders: [],
                    directories: [],
                    activeRow: -1,
                    filterInput: "",
                    isSearchVisible: !1
                })
            }
            var t = e.prototype;
            return t.tearDown = function () { }, t._updateFilesAndFolders = function (e, t, r) {
                this.nextPagePath = e.nextPagePath, e.items.forEach((function (e) {
                    e.isFolder ? r.push(e) : t.push(e)
                })), this.plugin.setPluginState({
                    folders: r,
                    files: t
                })
            }, t.preFirstRender = function () {
                this.plugin.setPluginState({
                    didFirstRender: !0
                }), this.plugin.onFirstRender()
            }, t.getFolder = function (e, t) {
                var r = this;
                return this._loaderWrapper(this.provider.list(e), (function (n) {
                    var i, o = r.plugin.getPluginState(),
                        s = function (t, r) {
                            for (var n = 0; n < t.length; n++)
                                if (i = t[n], e === i.id) return n;
                            var i;
                            return -1
                        }(o.directories);
                    i = -1 !== s ? o.directories.slice(0, s + 1) : o.directories.concat([{
                        id: e,
                        title: t
                    }]), r.username = r.username ? r.username : n.username, r._updateFilesAndFolders(n, [], []), r.plugin.setPluginState({
                        directories: i
                    })
                }), this.handleError)
            }, t.getNextFolder = function (e) {
                this.getFolder(e.requestPath, e.name), this.lastCheckbox = void 0
            }, t.addFile = function (e) {
                var t = {
                    id: this.providerFileToId(e),
                    source: this.plugin.id,
                    data: e,
                    name: e.name || e.id,
                    type: e.mimeType,
                    isRemote: !0,
                    body: {
                        fileId: e.id
                    },
                    remote: {
                        companionUrl: this.plugin.opts.companionUrl,
                        url: "" + this.provider.fileUrl(e.requestPath),
                        body: {
                            fileId: e.id
                        },
                        providerOptions: this.provider.opts
                    }
                },
                    r = Q(t);
                r && bt(r) && (t.preview = e.thumbnail), this.plugin.uppy.log("Adding remote file");
                try {
                    return this.plugin.uppy.addFile(t), !0
                } catch (yc) {
                    return yc.isRestriction || this.plugin.uppy.log(yc), !1
                }
            }, t.removeFile = function (e) {
                var t = this.plugin.getPluginState().currentSelection;
                this.plugin.setPluginState({
                    currentSelection: t.filter((function (t) {
                        return t.id !== e
                    }))
                })
            }, t.logout = function () {
                var e = this;
                this.provider.logout().then((function (t) {
                    if (t.ok) {
                        if (!t.revoked) {
                            var r = e.plugin.uppy.i18n("companionUnauthorizeHint", {
                                provider: e.plugin.title,
                                url: t.manual_revoke_url
                            });
                            e.plugin.uppy.info(r, "info", 7e3)
                        }
                        e.plugin.setPluginState({
                            authenticated: !1,
                            files: [],
                            folders: [],
                            directories: []
                        })
                    }
                })).catch(this.handleError)
            }, t.filterQuery = function (e) {
                var t = this.plugin.getPluginState();
                this.plugin.setPluginState(wt({}, t, {
                    filterInput: e ? e.target.value : ""
                }))
            }, t.toggleSearch = function (e) {
                var t = this.plugin.getPluginState();
                this.plugin.setPluginState({
                    isSearchVisible: !t.isSearchVisible,
                    filterInput: ""
                })
            }, t.filterItems = function (e) {
                var t = this.plugin.getPluginState();
                return t.filterInput && "" !== t.filterInput ? e.filter((function (e) {
                    return -1 !== e.name.toLowerCase().indexOf(t.filterInput.toLowerCase())
                })) : e
            }, t.sortByTitle = function () {
                var e = wt({}, this.plugin.getPluginState()),
                    t = e.files,
                    r = e.folders,
                    n = e.sorting,
                    i = t.sort((function (e, t) {
                        return "titleDescending" === n ? t.name.localeCompare(e.name) : e.name.localeCompare(t.name)
                    })),
                    o = r.sort((function (e, t) {
                        return "titleDescending" === n ? t.name.localeCompare(e.name) : e.name.localeCompare(t.name)
                    }));
                this.plugin.setPluginState(wt({}, e, {
                    files: i,
                    folders: o,
                    sorting: "titleDescending" === n ? "titleAscending" : "titleDescending"
                }))
            }, t.sortByDate = function () {
                var e = wt({}, this.plugin.getPluginState()),
                    t = e.files,
                    r = e.folders,
                    n = e.sorting,
                    i = t.sort((function (e, t) {
                        var r = new Date(e.modifiedDate),
                            i = new Date(t.modifiedDate);
                        return "dateDescending" === n ? r > i ? -1 : r < i ? 1 : 0 : r > i ? 1 : r < i ? -1 : 0
                    })),
                    o = r.sort((function (e, t) {
                        var r = new Date(e.modifiedDate),
                            i = new Date(t.modifiedDate);
                        return "dateDescending" === n ? r > i ? -1 : r < i ? 1 : 0 : r > i ? 1 : r < i ? -1 : 0
                    }));
                this.plugin.setPluginState(wt({}, e, {
                    files: i,
                    folders: o,
                    sorting: "dateDescending" === n ? "dateAscending" : "dateDescending"
                }))
            }, t.sortBySize = function () {
                var e = wt({}, this.plugin.getPluginState()),
                    t = e.files,
                    r = e.sorting;
                if (t.length && this.plugin.getItemData(t[0]).size) {
                    var n = t.sort((function (e, t) {
                        var n = e.size,
                            i = t.size;
                        return "sizeDescending" === r ? n > i ? -1 : n < i ? 1 : 0 : n > i ? 1 : n < i ? -1 : 0
                    }));
                    this.plugin.setPluginState(wt({}, e, {
                        files: n,
                        sorting: "sizeDescending" === r ? "sizeAscending" : "sizeDescending"
                    }))
                }
            }, t.isActiveRow = function (e) {
                return this.plugin.getPluginState().activeRow === this.plugin.getItemId(e)
            }, t.isChecked = function (e) {
                return this.plugin.getPluginState().currentSelection.some((function (t) {
                    return t.id === e.id
                }))
            }, t.addFolder = function (e) {
                var t = this,
                    r = this.providerFileToId(e),
                    n = this.plugin.getPluginState(),
                    i = n.selectedFolders || {};
                if (!(r in i) || !i[r].loading) return i[r] = {
                    loading: !0,
                    files: []
                }, this.plugin.setPluginState({
                    selectedFolders: i
                }), this.listAllFiles(e.requestPath).then((function (o) {
                    var s = 0;
                    o.forEach((function (e) {
                        t.addFile(e) && s++
                    }));
                    var a, u = o.map(t.providerFileToId);
                    (n = t.plugin.getPluginState()).selectedFolders[r] = {
                        loading: !1,
                        files: u
                    }, t.plugin.setPluginState({
                        selectedFolders: i
                    }), a = o.length ? t.plugin.uppy.i18n("folderAdded", {
                        smart_count: s,
                        folder: e.name
                    }) : t.plugin.uppy.i18n("emptyFolderAdded"), t.plugin.uppy.info(a)
                })).catch((function (e) {
                    delete (n = t.plugin.getPluginState()).selectedFolders[r], t.plugin.setPluginState({
                        selectedFolders: n.selectedFolders
                    }), t.handleError(e)
                }))
            }, t.toggleCheckbox = function (e, t) {
                e.stopPropagation(), e.preventDefault(), e.currentTarget.focus();
                var r = this.plugin.getPluginState(),
                    n = r.folders,
                    i = r.files,
                    o = this.filterItems(n.concat(i));
                if (this.lastCheckbox && e.shiftKey) {
                    var s, a = o.indexOf(this.lastCheckbox),
                        u = o.indexOf(t);
                    return s = a < u ? o.slice(a, u + 1) : o.slice(u, a + 1), void this.plugin.setPluginState({
                        currentSelection: s
                    })
                }
                this.lastCheckbox = t;
                var l = this.plugin.getPluginState().currentSelection;
                this.isChecked(t) ? this.plugin.setPluginState({
                    currentSelection: l.filter((function (e) {
                        return e.id !== t.id
                    }))
                }) : this.plugin.setPluginState({
                    currentSelection: l.concat([t])
                })
            }, t.providerFileToId = function (e) {
                return ee({
                    data: e,
                    name: e.name || e.id,
                    type: e.mimeType
                })
            }, t.handleAuth = function () {
                var t = this,
                    r = btoa(JSON.stringify({
                        origin: "origin" in location ? location.origin : location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "")
                    })),
                    n = encodeURIComponent("@uppy/provider-views=" + e.VERSION),
                    i = this.provider.authUrl() + "?state=" + r + "&uppyVersions=" + n,
                    o = window.open(i, "_blank");
                window.addEventListener("message", (function e(r) {
                    if (t._isOriginAllowed(r.origin, t.plugin.opts.companionAllowedHosts) && r.source === o) {
                        var n = "string" == typeof r.data ? JSON.parse(r.data) : r.data;
                        n.token ? (o.close(), window.removeEventListener("message", e), t.provider.setAuthToken(n.token), t.preFirstRender()) : t.plugin.uppy.log("did not receive token from auth window")
                    } else t.plugin.uppy.log("rejecting event from " + r.origin + " vs allowed pattern " + t.plugin.opts.companionAllowedHosts)
                }))
            }, t._isOriginAllowed = function (e, t) {
                var r = function (e) {
                    return "string" == typeof e ? new RegExp("^" + e + "$") : e instanceof RegExp ? e : void 0
                };
                return (Array.isArray(t) ? t.map(r) : [r(t)]).filter((function (e) {
                    return null != e
                })).some((function (t) {
                    return t.test(e) || t.test(e + "/")
                }))
            }, t.handleError = function (e) {
                var t = this.plugin.uppy;
                if (t.log(e.toString()), !e.isAuthError) {
                    var r = t.i18n("companionError");
                    t.info({
                        message: r,
                        details: e.toString()
                    }, "error", 5e3)
                }
            }, t.handleScroll = function (e) {
                var t = this,
                    r = e.target.scrollHeight - (e.target.scrollTop + e.target.offsetHeight),
                    n = this.nextPagePath || null;
                r < 50 && n && !this._isHandlingScroll && (this.provider.list(n).then((function (e) {
                    var r = t.plugin.getPluginState(),
                        n = r.files,
                        i = r.folders;
                    t._updateFilesAndFolders(e, n, i)
                })).catch(this.handleError).then((function () {
                    t._isHandlingScroll = !1
                })), this._isHandlingScroll = !0)
            }, t.listAllFiles = function (e, t) {
                var r = this;
                return void 0 === t && (t = null), t = t || [], new Promise((function (n, i) {
                    r.provider.list(e).then((function (e) {
                        e.items.forEach((function (e) {
                            e.isFolder || t.push(e)
                        }));
                        var o = e.nextPagePath || null;
                        return o ? r.listAllFiles(o, t).then((function (e) {
                            return n(e)
                        })).catch((function (e) {
                            return i(e)
                        })) : n(t)
                    })).catch((function (e) {
                        return i(e)
                    }))
                }))
            }, t.donePicking = function () {
                var e = this,
                    t = this.plugin.getPluginState().currentSelection.map((function (t) {
                        return t.isFolder ? e.addFolder(t) : e.addFile(t)
                    }));
                this._loaderWrapper(Promise.all(t), (function () {
                    e.clearSelection()
                }), (function () { }))
            }, t.cancelPicking = function () {
                this.clearSelection();
                var e = this.plugin.uppy.getPlugin("Dashboard");
                e && e.hideAllPanels()
            }, t.clearSelection = function () {
                this.plugin.setPluginState({
                    currentSelection: []
                })
            }, t._loaderWrapper = function (e, t, r) {
                var n = this;
                e.then((function (e) {
                    n.plugin.setPluginState({
                        loading: !1
                    }), t(e)
                })).catch((function (e) {
                    n.plugin.setPluginState({
                        loading: !1
                    }), r(e)
                })), this.plugin.setPluginState({
                    loading: !0
                })
            }, t.render = function (e, t) {
                void 0 === t && (t = {});
                var r = this.plugin.getPluginState(),
                    n = r.authenticated;
                if (r.didFirstRender || this.preFirstRender(), this.plugin.getPluginState().loading) return St(kt, {
                    onUnmount: this.clearSelection
                }, St(mt, {
                    i18n: this.plugin.uppy.i18n
                }));
                if (!n) return St(kt, {
                    onUnmount: this.clearSelection
                }, St(ze, {
                    pluginName: this.plugin.title,
                    pluginIcon: this.plugin.icon,
                    handleAuth: this.handleAuth,
                    i18n: this.plugin.uppy.i18n,
                    i18nArray: this.plugin.uppy.i18nArray
                }));
                var i = wt({}, this.opts, t),
                    o = wt({}, this.plugin.getPluginState(), {
                        username: this.username,
                        getNextFolder: this.getNextFolder,
                        getFolder: this.getFolder,
                        filterItems: this.filterItems,
                        filterQuery: this.filterQuery,
                        toggleSearch: this.toggleSearch,
                        sortByTitle: this.sortByTitle,
                        sortByDate: this.sortByDate,
                        logout: this.logout,
                        isActiveRow: this.isActiveRow,
                        isChecked: this.isChecked,
                        toggleCheckbox: this.toggleCheckbox,
                        handleScroll: this.handleScroll,
                        listAllFiles: this.listAllFiles,
                        done: this.donePicking,
                        cancel: this.cancelPicking,
                        title: this.plugin.title,
                        viewType: i.viewType,
                        showTitles: i.showTitles,
                        showFilter: i.showFilter,
                        showBreadcrumbs: i.showBreadcrumbs,
                        pluginIcon: this.plugin.icon,
                        i18n: this.plugin.uppy.i18n
                    });
                return St(kt, {
                    onUnmount: this.clearSelection
                }, St(gt, o))
            }, e
        }(), ht.VERSION = "1.7.5", ft);

    function Ct() {
        return (Ct = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var Et = function () {
        function e(e) {
            var t;
            this._store = e.store, this._id = e.id || I(), this._selector = e.selector || (t = this._id, function (e) {
                return e.uppy[t]
            }), this.setState({})
        }
        var t = e.prototype;
        return t.setState = function (e) {
            this._store.dispatch({
                type: "uppy/STATE_UPDATE",
                id: this._id,
                payload: e
            })
        }, t.getState = function () {
            return this._selector(this._store.getState())
        }, t.subscribe = function (e) {
            var t = this,
                r = this.getState();
            return this._store.subscribe((function () {
                var n = t.getState();
                if (r !== n) {
                    var i = function (e, t) {
                        var r = Object.keys(t),
                            n = {};
                        return r.forEach((function (r) {
                            e[r] !== t[r] && (n[r] = t[r])
                        })), n
                    }(r, n);
                    e(r, n, i), r = n
                }
            }))
        }, e
    }();
    Et.VERSION = "1.2.4", (_t = function (e) {
        return new Et(e)
    }).STATE_UPDATE = "uppy/STATE_UPDATE", _t.reducer = function (e, t) {
        if (void 0 === e && (e = {}), "uppy/STATE_UPDATE" === t.type) {
            var r, n = Ct({}, e[t.id], t.payload);
            return Ct({}, e, ((r = {})[t.id] = n, r))
        }
        return e
    }, _t.middleware = function () {
        return function () {
            return function (e) {
                return function (t) {
                    e(t)
                }
            }
        }
    };
    var At = oe.h,
        Ft = function (e) {
            var t = {
                color: "#838999",
                icon: At("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    class: "uppy-c-icon",
                    width: "25",
                    height: "25",
                    viewBox: "0 0 25 25"
                }, At("g", {
                    fill: "#A7AFB7",
                    "fill-rule": "nonzero"
                }, At("path", {
                    d: "M5.5 22a.5.5 0 0 1-.5-.5v-18a.5.5 0 0 1 .5-.5h10.719a.5.5 0 0 1 .367.16l3.281 3.556a.5.5 0 0 1 .133.339V21.5a.5.5 0 0 1-.5.5h-14zm.5-1h13V7.25L16 4H6v17z"
                }), At("path", {
                    d: "M15 4v3a1 1 0 0 0 1 1h3V7h-3V4h-1z"
                })))
            };
            if (!e) return t;
            var r = e.split("/")[0],
                n = e.split("/")[1];
            return "text" === r ? {
                color: "#5a5e69",
                icon: At("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    class: "uppy-c-icon",
                    width: "25",
                    height: "25",
                    viewBox: "0 0 25 25"
                }, At("path", {
                    d: "M4.5 7h13a.5.5 0 1 1 0 1h-13a.5.5 0 0 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1z",
                    fill: "#5A5E69",
                    "fill-rule": "nonzero"
                }))
            } : "image" === r ? {
                color: "#686de0",
                icon: At("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    width: "25",
                    height: "25",
                    viewBox: "0 0 25 25"
                }, At("g", {
                    fill: "#686DE0",
                    "fill-rule": "evenodd"
                }, At("path", {
                    d: "M5 7v10h15V7H5zm0-1h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z",
                    "fill-rule": "nonzero"
                }), At("path", {
                    d: "M6.35 17.172l4.994-5.026a.5.5 0 0 1 .707 0l2.16 2.16 3.505-3.505a.5.5 0 0 1 .707 0l2.336 2.31-.707.72-1.983-1.97-3.505 3.505a.5.5 0 0 1-.707 0l-2.16-2.159-3.938 3.939-1.409.026z",
                    "fill-rule": "nonzero"
                }), At("circle", {
                    cx: "7.5",
                    cy: "9.5",
                    r: "1.5"
                })))
            } : "audio" === r ? {
                color: "#068dbb",
                icon: At("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    class: "uppy-c-icon",
                    width: "25",
                    height: "25",
                    viewBox: "0 0 25 25"
                }, At("path", {
                    d: "M9.5 18.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V7.25a.5.5 0 0 1 .379-.485l9-2.25A.5.5 0 0 1 18.5 5v11.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V8.67l-8 2v7.97zm8-11v-2l-8 2v2l8-2zM7 19.64c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1zm9-2c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1z",
                    fill: "#049BCF",
                    "fill-rule": "nonzero"
                }))
            } : "video" === r ? {
                color: "#19af67",
                icon: At("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    class: "uppy-c-icon",
                    width: "25",
                    height: "25",
                    viewBox: "0 0 25 25"
                }, At("path", {
                    d: "M16 11.834l4.486-2.691A1 1 0 0 1 22 10v6a1 1 0 0 1-1.514.857L16 14.167V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2.834zM15 9H5v8h10V9zm1 4l5 3v-6l-5 3z",
                    fill: "#19AF67",
                    "fill-rule": "nonzero"
                }))
            } : "application" === r && "pdf" === n ? {
                color: "#e25149",
                icon: At("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    class: "uppy-c-icon",
                    width: "25",
                    height: "25",
                    viewBox: "0 0 25 25"
                }, At("path", {
                    d: "M9.766 8.295c-.691-1.843-.539-3.401.747-3.726 1.643-.414 2.505.938 2.39 3.299-.039.79-.194 1.662-.537 3.148.324.49.66.967 1.055 1.51.17.231.382.488.629.757 1.866-.128 3.653.114 4.918.655 1.487.635 2.192 1.685 1.614 2.84-.566 1.133-1.839 1.084-3.416.249-1.141-.604-2.457-1.634-3.51-2.707a13.467 13.467 0 0 0-2.238.426c-1.392 4.051-4.534 6.453-5.707 4.572-.986-1.58 1.38-4.206 4.914-5.375.097-.322.185-.656.264-1.001.08-.353.306-1.31.407-1.737-.678-1.059-1.2-2.031-1.53-2.91zm2.098 4.87c-.033.144-.068.287-.104.427l.033-.01-.012.038a14.065 14.065 0 0 1 1.02-.197l-.032-.033.052-.004a7.902 7.902 0 0 1-.208-.271c-.197-.27-.38-.526-.555-.775l-.006.028-.002-.003c-.076.323-.148.632-.186.8zm5.77 2.978c1.143.605 1.832.632 2.054.187.26-.519-.087-1.034-1.113-1.473-.911-.39-2.175-.608-3.55-.608.845.766 1.787 1.459 2.609 1.894zM6.559 18.789c.14.223.693.16 1.425-.413.827-.648 1.61-1.747 2.208-3.206-2.563 1.064-4.102 2.867-3.633 3.62zm5.345-10.97c.088-1.793-.351-2.48-1.146-2.28-.473.119-.564 1.05-.056 2.405.213.566.52 1.188.908 1.859.18-.858.268-1.453.294-1.984z",
                    fill: "#E2514A",
                    "fill-rule": "nonzero"
                }))
            } : "application" === r && -1 !== ["zip", "x-7z-compressed", "x-rar-compressed", "x-gtar", "x-apple-diskimage", "x-diskcopy"].indexOf(n) ? {
                color: "#00C469",
                icon: At("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    width: "25",
                    height: "25",
                    viewBox: "0 0 25 25"
                }, At("path", {
                    d: "M10.45 2.05h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V2.55a.5.5 0 0 1 .5-.5zm2.05 1.024h1.05a.5.5 0 0 1 .5.5V3.6a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5v-.001zM10.45 0h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V.5a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 3.074h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 1.024h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm-2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-1.656 3.074l-.82 5.946c.52.302 1.174.458 1.976.458.803 0 1.455-.156 1.975-.458l-.82-5.946h-2.311zm0-1.025h2.312c.512 0 .946.378 1.015.885l.82 5.946c.056.412-.142.817-.501 1.026-.686.398-1.515.597-2.49.597-.974 0-1.804-.199-2.49-.597a1.025 1.025 0 0 1-.5-1.026l.819-5.946c.07-.507.503-.885 1.015-.885zm.545 6.6a.5.5 0 0 1-.397-.561l.143-.999a.5.5 0 0 1 .495-.429h.74a.5.5 0 0 1 .495.43l.143.998a.5.5 0 0 1-.397.561c-.404.08-.819.08-1.222 0z",
                    fill: "#00C469",
                    "fill-rule": "nonzero"
                }))
            } : t
        },
        Ot = oe.h,
        Ut = function (e) {
            var t = e.file;
            if (t.preview) return Ot("img", {
                class: "uppy-Dashboard-Item-previewImg",
                alt: t.name,
                src: t.preview
            });
            var r = Ft(t.type),
                n = r.color,
                i = r.icon;
            return Ot("div", {
                class: "uppy-Dashboard-Item-previewIconWrap"
            }, Ot("span", {
                class: "uppy-Dashboard-Item-previewIcon",
                style: {
                    color: n
                }
            }, i), Ot("svg", {
                "aria-hidden": "true",
                focusable: "false",
                class: "uppy-Dashboard-Item-previewIconBg",
                width: "58",
                height: "76",
                viewBox: "0 0 58 76"
            }, Ot("rect", {
                fill: "#FFF",
                width: "58",
                height: "76",
                rx: "3",
                "fill-rule": "evenodd"
            })))
        },
        Rt = oe.h,
        Tt = function (e) {
            return Rt("div", {
                class: "uppy-Dashboard-Item-previewInnerWrap",
                style: {
                    backgroundColor: Ft(e.file.type).color
                }
            }, e.showLinkToFileUploadResult && e.file.uploadURL && Rt("a", {
                class: "uppy-Dashboard-Item-previewLink",
                href: e.file.uploadURL,
                rel: "noreferrer noopener",
                target: "_blank",
                "aria-label": e.file.meta.name
            }), Rt(Ut, {
                file: e.file
            }))
        },
        xt = oe.h;

    function Dt(e) {
        return e.isUploaded ? e.i18n("uploadComplete") : e.error ? e.i18n("retryUpload") : e.resumableUploads ? e.file.isPaused ? e.i18n("resumeUpload") : e.i18n("pauseUpload") : e.individualCancellation ? e.i18n("cancelUpload") : ""
    }

    function Bt(e) {
        return xt("div", {
            class: "uppy-Dashboard-Item-progress"
        }, xt("button", {
            class: "uppy-u-reset uppy-Dashboard-Item-progressIndicator",
            type: "button",
            "aria-label": Dt(e),
            title: Dt(e),
            onclick: function () {
                return function (e) {
                    e.isUploaded || (!e.error || e.hideRetryButton ? e.resumableUploads && !e.hidePauseResumeButton ? e.pauseUpload(e.file.id) : e.individualCancellation && !e.hideCancelButton && e.cancelUpload(e.file.id) : e.retryUpload(e.file.id))
                }(e)
            }
        }, e.children))
    }

    function It(e) {
        var t = e.children;
        return xt("svg", {
            "aria-hidden": "true",
            focusable: "false",
            width: "70",
            height: "70",
            viewBox: "0 0 36 36",
            class: "uppy-c-icon uppy-Dashboard-Item-progressIcon--circle"
        }, t)
    }

    function jt(e) {
        var t = e.progress,
            r = 2 * Math.PI * 15;
        return xt("g", null, xt("circle", {
            class: "uppy-Dashboard-Item-progressIcon--bg",
            r: "15",
            cx: "18",
            cy: "18",
            "stroke-width": "2",
            fill: "none"
        }), xt("circle", {
            class: "uppy-Dashboard-Item-progressIcon--progress",
            r: "15",
            cx: "18",
            cy: "18",
            transform: "rotate(-90, 18, 18)",
            "stroke-width": "2",
            fill: "none",
            "stroke-dasharray": r,
            "stroke-dashoffset": r - r / 100 * t
        }))
    }
    var Lt = function (e) {
        return e.file.progress.uploadStarted ? e.isUploaded ? xt("div", {
            class: "uppy-Dashboard-Item-progress"
        }, xt("div", {
            class: "uppy-Dashboard-Item-progressIndicator"
        }, xt(It, null, xt("circle", {
            r: "15",
            cx: "18",
            cy: "18",
            fill: "#1bb240"
        }), xt("polygon", {
            class: "uppy-Dashboard-Item-progressIcon--check",
            transform: "translate(2, 3)",
            points: "14 22.5 7 15.2457065 8.99985857 13.1732815 14 18.3547104 22.9729883 9 25 11.1005634"
        })))) : e.error && !e.hideRetryButton ? xt(Bt, e, xt("svg", {
            "aria-hidden": "true",
            focusable: "false",
            class: "uppy-c-icon uppy-Dashboard-Item-progressIcon--retry",
            width: "28",
            height: "31",
            viewBox: "0 0 16 19"
        }, xt("path", {
            d: "M16 11a8 8 0 1 1-8-8v2a6 6 0 1 0 6 6h2z"
        }), xt("path", {
            d: "M7.9 3H10v2H7.9z"
        }), xt("path", {
            d: "M8.536.5l3.535 3.536-1.414 1.414L7.12 1.914z"
        }), xt("path", {
            d: "M10.657 2.621l1.414 1.415L8.536 7.57 7.12 6.157z"
        }))) : e.resumableUploads && !e.hidePauseResumeButton ? xt(Bt, e, xt(It, null, xt(jt, {
            progress: e.file.progress.percentage
        }), e.file.isPaused ? xt("polygon", {
            class: "uppy-Dashboard-Item-progressIcon--play",
            transform: "translate(3, 3)",
            points: "12 20 12 10 20 15"
        }) : xt("g", {
            class: "uppy-Dashboard-Item-progressIcon--pause",
            transform: "translate(14.5, 13)"
        }, xt("rect", {
            x: "0",
            y: "0",
            width: "2",
            height: "10",
            rx: "0"
        }), xt("rect", {
            x: "5",
            y: "0",
            width: "2",
            height: "10",
            rx: "0"
        })))) : e.resumableUploads || !e.individualCancellation || e.hideCancelButton ? xt("div", {
            class: "uppy-Dashboard-Item-progress"
        }, xt("div", {
            class: "uppy-Dashboard-Item-progressIndicator"
        }, xt(It, null, xt(jt, {
            progress: e.file.progress.percentage
        })))) : xt(Bt, e, xt(It, null, xt(jt, {
            progress: e.file.progress.percentage
        }), xt("polygon", {
            class: "cancel",
            transform: "translate(2, 2)",
            points: "19.8856516 11.0625 16 14.9481516 12.1019737 11.0625 11.0625 12.1143484 14.9481516 16 11.0625 19.8980263 12.1019737 20.9375 16 17.0518484 19.8856516 20.9375 20.9375 19.8980263 17.0518484 16 20.9375 12"
        }))) : null
    },
        Mt = oe.h,
        Nt = function (e) {
            var t = e.file,
                r = e.onClick;
            return t.error ? Mt("span", {
                class: "uppy-Dashboard-Item-errorDetails",
                "aria-label": t.error,
                "data-microtip-position": "bottom",
                "data-microtip-size": "medium",
                role: "tooltip",
                onclick: r
            }, "?") : null
        },
        zt = function (e) {
            return Mt("div", {
                class: "uppy-Dashboard-Item-fileInfo",
                "data-uppy-file-source": e.file.source
            }, function (e) {
                var t;
                return t = e.containerWidth <= 352 ? 35 : e.containerWidth <= 576 ? 60 : 30, Mt("div", {
                    class: "uppy-Dashboard-Item-name",
                    title: e.file.meta.name
                }, function (e, t) {
                    if (e.length <= t) return e;
                    if (t <= "...".length) return e.substr(0, t);
                    var r = t - "...".length,
                        n = Math.ceil(r / 2),
                        i = Math.floor(r / 2);
                    return e.substr(0, n) + "..." + e.substr(e.length - i)
                }(e.file.meta.name, t))
            }(e), Mt("div", {
                class: "uppy-Dashboard-Item-status"
            }, function (e) {
                return e.file.data.size && Mt("div", {
                    class: "uppy-Dashboard-Item-statusSize"
                }, V(e.file.data.size))
            }(e), function (e) {
                return e.file.source && e.file.source !== e.id && Mt("div", {
                    class: "uppy-Dashboard-Item-sourceIcon"
                }, e.acquirers.map((function (t) {
                    if (t.id === e.file.source) return function (e, t) {
                        return Mt("span", {
                            title: t.i18n("fileSource", {
                                name: e.name
                            })
                        }, e.icon())
                    }(t, e)
                })))
            }(e), Mt(Nt, {
                file: e.file,
                onClick: function () {
                    alert(e.file.error)
                }
            })))
        },
        qt = oe.h;

    function Ht(e) {
        var t = e.file,
            r = e.uploadInProgressOrComplete,
            n = e.metaFields,
            i = e.i18n,
            o = e.onClick;
        return !r && n && n.length > 0 ? qt("button", {
            class: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--edit",
            type: "button",
            "aria-label": i("editFile") + " " + t.meta.name,
            title: i("editFile"),
            onclick: function () {
                return o()
            }
        }, qt("svg", {
            "aria-hidden": "true",
            focusable: "false",
            class: "uppy-c-icon",
            width: "14",
            height: "14",
            viewBox: "0 0 14 14"
        }, qt("g", {
            "fill-rule": "evenodd"
        }, qt("path", {
            d: "M1.5 10.793h2.793A1 1 0 0 0 5 10.5L11.5 4a1 1 0 0 0 0-1.414L9.707.793a1 1 0 0 0-1.414 0l-6.5 6.5A1 1 0 0 0 1.5 8v2.793zm1-1V8L9 1.5l1.793 1.793-6.5 6.5H2.5z",
            "fill-rule": "nonzero"
        }), qt("rect", {
            x: "1",
            y: "12.293",
            width: "11",
            height: "1",
            rx: ".5"
        }), qt("path", {
            "fill-rule": "nonzero",
            d: "M6.793 2.5L9.5 5.207l.707-.707L7.5 1.793z"
        })))) : null
    }

    function Vt(e) {
        var t = e.i18n,
            r = e.onClick;
        return qt("button", {
            class: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--remove",
            type: "button",
            "aria-label": t("removeFile"),
            title: t("removeFile"),
            onclick: function () {
                return r()
            }
        }, qt("svg", {
            "aria-hidden": "true",
            focusable: "false",
            class: "uppy-c-icon",
            width: "18",
            height: "18",
            viewBox: "0 0 18 18"
        }, qt("path", {
            d: "M9 0C4.034 0 0 4.034 0 9s4.034 9 9 9 9-4.034 9-9-4.034-9-9-9z"
        }), qt("path", {
            fill: "#FFF",
            d: "M13 12.222l-.778.778L9 9.778 5.778 13 5 12.222 8.222 9 5 5.778 5.778 5 9 8.222 12.222 5l.778.778L9.778 9z"
        })))
    }
    var Wt = function (e, t) {
        var r, n;
        (r = t.file.uploadURL, n = t.i18n("copyLinkToClipboardFallback"), n = n || "Copy the URL below", new Promise((function (e) {
            var t = document.createElement("textarea");
            t.setAttribute("style", {
                position: "fixed",
                top: 0,
                left: 0,
                width: "2em",
                height: "2em",
                padding: 0,
                border: "none",
                outline: "none",
                boxShadow: "none",
                background: "transparent"
            }), t.value = r, document.body.appendChild(t), t.select();
            var i = function () {
                document.body.removeChild(t), window.prompt(n, r), e()
            };
            try {
                return document.execCommand("copy") ? (document.body.removeChild(t), e()) : i()
            } catch (yc) {
                return document.body.removeChild(t), i()
            }
        }))).then((function () {
            t.log("Link copied to clipboard."), t.info(t.i18n("copyLinkToClipboardSuccess"), "info", 3e3)
        })).catch(t.log).then((function () {
            return e.target.focus({
                preventScroll: !0
            })
        }))
    };

    function Xt(e) {
        return qt("button", {
            class: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--copyLink",
            type: "button",
            "aria-label": e.i18n("copyLink"),
            title: e.i18n("copyLink"),
            onclick: function (t) {
                return Wt(t, e)
            }
        }, qt("svg", {
            "aria-hidden": "true",
            focusable: "false",
            class: "uppy-c-icon",
            width: "14",
            height: "14",
            viewBox: "0 0 14 12"
        }, qt("path", {
            d: "M7.94 7.703a2.613 2.613 0 0 1-.626 2.681l-.852.851a2.597 2.597 0 0 1-1.849.766A2.616 2.616 0 0 1 2.764 7.54l.852-.852a2.596 2.596 0 0 1 2.69-.625L5.267 7.099a1.44 1.44 0 0 0-.833.407l-.852.851a1.458 1.458 0 0 0 1.03 2.486c.39 0 .755-.152 1.03-.426l.852-.852c.231-.231.363-.522.406-.824l1.04-1.038zm4.295-5.937A2.596 2.596 0 0 0 10.387 1c-.698 0-1.355.272-1.849.766l-.852.851a2.614 2.614 0 0 0-.624 2.688l1.036-1.036c.041-.304.173-.6.407-.833l.852-.852c.275-.275.64-.426 1.03-.426a1.458 1.458 0 0 1 1.03 2.486l-.852.851a1.442 1.442 0 0 1-.824.406l-1.04 1.04a2.596 2.596 0 0 0 2.683-.628l.851-.85a2.616 2.616 0 0 0 0-3.697zm-6.88 6.883a.577.577 0 0 0 .82 0l3.474-3.474a.579.579 0 1 0-.819-.82L5.355 7.83a.579.579 0 0 0 0 .819z"
        })))
    }
    var Gt = function (e) {
        var t = e.file,
            r = e.uploadInProgressOrComplete,
            n = e.metaFields,
            i = e.showLinkToFileUploadResult,
            o = e.showRemoveButton,
            s = e.i18n,
            a = e.removeFile,
            u = e.toggleFileCard,
            l = e.log,
            c = e.info;
        return qt("div", {
            className: "uppy-Dashboard-Item-actionWrapper"
        }, qt(Ht, {
            i18n: s,
            file: t,
            uploadInProgressOrComplete: r,
            metaFields: n,
            onClick: function () {
                return u(t.id)
            }
        }), i && t.uploadURL ? qt(Xt, {
            file: t,
            i18n: s,
            info: c,
            log: l
        }) : null, o ? qt(Vt, {
            i18n: s,
            info: e.info,
            log: e.log,
            onClick: function () {
                return a(t.id, "removed-by-user")
            }
        }) : null)
    },
        Kt = oe.h,
        $t = function (e) {
            var t, r;

            function n() {
                return e.apply(this, arguments) || this
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var i = n.prototype;
            return i.shouldComponentUpdate = function (e) {
                return ! function (e, t) {
                    if (e === t) return !0;
                    for (var r in e)
                        if (!(r in t)) return !1;
                    for (var r in t)
                        if (e[r] !== t[r]) return !1;
                    return !0
                }(this.props, e)
            }, i.componentDidMount = function () {
                var e = this.props.file;
                e.preview || this.props.handleRequestThumbnail(e)
            }, i.componentWillUnmount = function () {
                var e = this.props.file;
                e.preview || this.props.handleCancelThumbnail(e)
            }, i.render = function () {
                var e = this.props.file,
                    t = e.progress.preprocess || e.progress.postprocess,
                    r = e.progress.uploadComplete && !t && !e.error,
                    n = e.progress.uploadStarted || t,
                    i = e.progress.uploadStarted && !e.progress.uploadComplete || t,
                    o = e.error || !1,
                    s = (this.props.individualCancellation || !i) && !r;
                r && this.props.showRemoveButtonAfterComplete && (s = !0);
                var a = qe({
                    "uppy-Dashboard-Item": !0,
                    "is-inprogress": i,
                    "is-processing": t,
                    "is-complete": r,
                    "is-error": !!o,
                    "is-resumable": this.props.resumableUploads,
                    "is-noIndividualCancellation": !this.props.individualCancellation
                });
                return Kt("div", {
                    class: a,
                    id: "uppy_" + e.id,
                    role: this.props.role
                }, Kt("div", {
                    class: "uppy-Dashboard-Item-preview"
                }, Kt(Tt, {
                    file: e,
                    showLinkToFileUploadResult: this.props.showLinkToFileUploadResult
                }), Kt(Lt, {
                    file: e,
                    error: o,
                    isUploaded: r,
                    hideRetryButton: this.props.hideRetryButton,
                    hideCancelButton: this.props.hideCancelButton,
                    hidePauseResumeButton: this.props.hidePauseResumeButton,
                    showRemoveButtonAfterComplete: this.props.showRemoveButtonAfterComplete,
                    resumableUploads: this.props.resumableUploads,
                    individualCancellation: this.props.individualCancellation,
                    pauseUpload: this.props.pauseUpload,
                    cancelUpload: this.props.cancelUpload,
                    retryUpload: this.props.retryUpload,
                    i18n: this.props.i18n
                })), Kt("div", {
                    class: "uppy-Dashboard-Item-fileInfoAndButtons"
                }, Kt(zt, {
                    file: e,
                    id: this.props.id,
                    acquirers: this.props.acquirers,
                    containerWidth: this.props.containerWidth,
                    i18n: this.props.i18n
                }), Kt(Gt, {
                    file: e,
                    metaFields: this.props.metaFields,
                    showLinkToFileUploadResult: this.props.showLinkToFileUploadResult,
                    showRemoveButton: s,
                    uploadInProgressOrComplete: n,
                    removeFile: this.props.removeFile,
                    toggleFileCard: this.props.toggleFileCard,
                    i18n: this.props.i18n,
                    log: this.props.log,
                    info: this.props.info
                })))
            }, n
        }(oe.Component);

    function Yt() {
        return (Yt = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var Jt = oe.h,
        Qt = oe.Component,
        Zt = {
            position: "relative",
            width: "100%",
            minHeight: "100%"
        },
        er = {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            overflow: "visible"
        },
        tr = function (e) {
            var t, r;

            function n(t) {
                var r;
                return (r = e.call(this, t) || this).handleResize = function () {
                    r.resize()
                }, r.handleScroll = function () {
                    r.setState({
                        offset: r.base.scrollTop
                    }), r.props.sync && r.forceUpdate()
                }, r.focusElement = null, r.state = {
                    offset: 0,
                    height: 0
                }, r
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var i = n.prototype;
            return i.resize = function () {
                this.state.height !== this.base.offsetHeight && this.setState({
                    height: this.base.offsetHeight
                })
            }, i.componentWillUpdate = function () {
                this.base.contains(document.activeElement) && (this.focusElement = document.activeElement)
            }, i.componentDidUpdate = function () {
                this.focusElement && this.focusElement.parentNode && document.activeElement !== this.focusElement && this.focusElement.focus(), this.focusElement = null, this.resize()
            }, i.componentDidMount = function () {
                this.resize(), window.addEventListener("resize", this.handleResize)
            }, i.componentWillUnmount = function () {
                window.removeEventListener("resize", this.handleResize)
            }, i.render = function (e) {
                var t = e.data,
                    r = e.rowHeight,
                    n = e.renderRow,
                    i = e.overscanCount,
                    o = void 0 === i ? 10 : i,
                    s = (e.sync, function (e, t) {
                        if (null == e) return {};
                        var r, n, i = {},
                            o = Object.keys(e);
                        for (n = 0; n < o.length; n++) r = o[n], t.indexOf(r) >= 0 || (i[r] = e[r]);
                        return i
                    }(e, ["data", "rowHeight", "renderRow", "overscanCount", "sync"])),
                    a = this.state,
                    u = a.offset,
                    l = a.height,
                    c = Math.floor(u / r),
                    p = Math.floor(l / r);
                o && (c = Math.max(0, c - c % o), p += o);
                var d = c + p + 4,
                    h = t.slice(c, d),
                    f = Yt({}, Zt, {
                        height: t.length * r
                    }),
                    y = Yt({}, er, {
                        top: c * r
                    });
                return Jt("div", Yt({
                    onScroll: this.handleScroll
                }, s), Jt("div", {
                    role: "presentation",
                    style: f
                }, Jt("div", {
                    role: "presentation",
                    style: y
                }, h.map(n))))
            }, n
        }(Qt);

    function rr() {
        return (rr = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var nr = oe.h,
        ir = function (e) {
            var t, r, n, i, o = 0 === e.totalFileCount,
                s = qe("uppy-Dashboard-files", {
                    "uppy-Dashboard-files--noFiles": o
                }),
                a = 1 === e.itemsPerRow ? 71 : 200,
                u = {
                    id: e.id,
                    error: e.error,
                    i18n: e.i18n,
                    log: e.log,
                    info: e.info,
                    acquirers: e.acquirers,
                    resumableUploads: e.resumableUploads,
                    individualCancellation: e.individualCancellation,
                    hideRetryButton: e.hideRetryButton,
                    hidePauseResumeButton: e.hidePauseResumeButton,
                    hideCancelButton: e.hideCancelButton,
                    showLinkToFileUploadResult: e.showLinkToFileUploadResult,
                    showRemoveButtonAfterComplete: e.showRemoveButtonAfterComplete,
                    isWide: e.isWide,
                    metaFields: e.metaFields,
                    retryUpload: e.retryUpload,
                    pauseUpload: e.pauseUpload,
                    cancelUpload: e.cancelUpload,
                    toggleFileCard: e.toggleFileCard,
                    removeFile: e.removeFile,
                    handleRequestThumbnail: e.handleRequestThumbnail,
                    handleCancelThumbnail: e.handleCancelThumbnail
                },
                l = (t = Object.keys(e.files), r = e.itemsPerRow, n = [], i = [], t.forEach((function (e, t) {
                    i.length < r ? i.push(e) : (n.push(i), i = [e])
                })), i.length && n.push(i), n);
            return nr(tr, {
                class: s,
                role: "list",
                data: l,
                renderRow: function (t) {
                    return nr("div", {
                        role: "presentation",
                        key: t[0]
                    }, t.map((function (t) {
                        return nr($t, rr({
                            key: t
                        }, u, {
                            role: "listitem",
                            file: e.files[t]
                        }))
                    })))
                },
                rowHeight: a
            })
        },
        or = oe.h,
        sr = function (e) {
            var t, r;

            function n() {
                for (var t, r = arguments.length, n = new Array(r), i = 0; i < r; i++) n[i] = arguments[i];
                return (t = e.call.apply(e, [this].concat(n)) || this).triggerFileInputClick = function () {
                    t.fileInput.click()
                }, t.triggerFolderInputClick = function () {
                    t.folderInput.click()
                }, t.onFileInputChange = function (e) {
                    t.props.handleInputChange(e), e.target.value = null
                }, t.renderHiddenInput = function (e, r) {
                    return or("input", {
                        class: "uppy-Dashboard-input",
                        hidden: !0,
                        "aria-hidden": "true",
                        tabindex: -1,
                        webkitdirectory: e,
                        type: "file",
                        name: "files[]",
                        multiple: 1 !== t.props.maxNumberOfFiles,
                        onchange: t.onFileInputChange,
                        accept: t.props.allowedFileTypes,
                        ref: r
                    })
                }, t.renderMyDeviceAcquirer = function () {
                    return or("div", {
                        class: "uppy-DashboardTab",
                        role: "presentation",
                        "data-uppy-acquirer-id": "MyDevice"
                    }, or("button", {
                        type: "button",
                        class: "uppy-DashboardTab-btn",
                        role: "tab",
                        tabindex: 0,
                        "data-uppy-super-focusable": !0,
                        onclick: t.triggerFileInputClick
                    }, or("svg", {
                        "aria-hidden": "true",
                        focusable: "false",
                        width: "32",
                        height: "32",
                        viewBox: "0 0 32 32"
                    }, or("g", {
                        fill: "none",
                        "fill-rule": "evenodd"
                    }, or("rect", {
                        width: "32",
                        height: "32",
                        rx: "16",
                        fill: "#2275D7"
                    }), or("path", {
                        d: "M21.973 21.152H9.863l-1.108-5.087h14.464l-1.246 5.087zM9.935 11.37h3.958l.886 1.444a.673.673 0 0 0 .585.316h6.506v1.37H9.935v-3.13zm14.898 3.44a.793.793 0 0 0-.616-.31h-.978v-2.126c0-.379-.275-.613-.653-.613H15.75l-.886-1.445a.673.673 0 0 0-.585-.316H9.232c-.378 0-.667.209-.667.587V14.5h-.782a.793.793 0 0 0-.61.303.795.795 0 0 0-.155.663l1.45 6.633c.078.36.396.618.764.618h13.354c.36 0 .674-.246.76-.595l1.631-6.636a.795.795 0 0 0-.144-.675z",
                        fill: "#FFF"
                    }))), or("div", {
                        class: "uppy-DashboardTab-name"
                    }, t.props.i18n("myDevice"))))
                }, t.renderBrowseButton = function (e, r) {
                    var n = t.props.acquirers.length;
                    return or("button", {
                        type: "button",
                        class: "uppy-u-reset uppy-Dashboard-browse",
                        onclick: r,
                        "data-uppy-super-focusable": 0 === n
                    }, e)
                }, t.renderDropPasteBrowseTagline = function () {
                    var e = t.props.acquirers.length,
                        r = t.props.fileManagerSelectionType,
                        n = r.charAt(0).toUpperCase() + r.slice(1),
                        i = "browse",
                        o = "browse",
                        s = "browse";
                    if ("files" === r) try {
                        i = t.props.i18n("browse"), o = t.props.i18n("browse"), s = t.props.i18n("browse")
                    } catch (p) { }
                    try {
                        o = t.props.i18n("browseFiles"), s = t.props.i18n("browseFolders")
                    } catch (d) { }
                    var a, u = t.renderBrowseButton(i, t.triggerFileInputClick),
                        l = t.renderBrowseButton(o, t.triggerFileInputClick),
                        c = t.renderBrowseButton(s, t.triggerFolderInputClick);
                    if (a = e > 0 ? t.props.i18nArray("dropPasteImport" + n, {
                        browseFiles: l,
                        browseFolders: c,
                        browse: u
                    }) : t.props.i18nArray("dropPaste" + n, {
                        browseFiles: l,
                        browseFolders: c,
                        browse: u
                    }), "files" === r) try {
                        a = e > 0 ? t.props.i18nArray("dropPasteImport", {
                            browse: u
                        }) : t.props.i18nArray("dropPaste", {
                            browse: u
                        })
                    } catch (h) { }
                    return or("div", {
                        class: "uppy-Dashboard-AddFiles-title"
                    }, a)
                }, t.renderAcquirer = function (e) {
                    return or("div", {
                        class: "uppy-DashboardTab",
                        role: "presentation",
                        "data-uppy-acquirer-id": e.id
                    }, or("button", {
                        type: "button",
                        class: "uppy-DashboardTab-btn",
                        role: "tab",
                        tabindex: 0,
                        "aria-controls": "uppy-DashboardContent-panel--" + e.id,
                        "aria-selected": t.props.activePickerPanel.id === e.id,
                        "data-uppy-super-focusable": !0,
                        onclick: function () {
                            return t.props.showPanel(e.id)
                        }
                    }, e.icon(), or("div", {
                        class: "uppy-DashboardTab-name"
                    }, e.name)))
                }, t.renderAcquirers = function (e) {
                    var r = [].concat(e),
                        n = r.splice(e.length - 2, e.length);
                    return or("div", {
                        class: "uppy-Dashboard-AddFiles-list",
                        role: "tablist"
                    }, t.renderMyDeviceAcquirer(), r.map((function (e) {
                        return t.renderAcquirer(e)
                    })), or("span", {
                        role: "presentation",
                        style: "white-space: nowrap;"
                    }, n.map((function (e) {
                        return t.renderAcquirer(e)
                    }))))
                }, t
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var i = n.prototype;
            return i.renderPoweredByUppy = function () {
                var e = or("span", null, or("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    class: "uppy-c-icon uppy-Dashboard-poweredByIcon",
                    width: "11",
                    height: "11",
                    viewBox: "0 0 11 11"
                }, or("path", {
                    d: "M7.365 10.5l-.01-4.045h2.612L5.5.806l-4.467 5.65h2.604l.01 4.044h3.718z",
                    "fill-rule": "evenodd"
                })), or("span", {
                    class: "uppy-Dashboard-poweredByUppy"
                }, "Uppy")),
                    t = this.props.i18nArray("poweredBy2", {
                        backwardsCompat: this.props.i18n("poweredBy"),
                        uppy: e
                    });
                return or("a", {
                    tabindex: "-1",
                    href: "https://uppy.io",
                    rel: "noreferrer noopener",
                    target: "_blank",
                    class: "uppy-Dashboard-poweredBy"
                }, t)
            }, i.render = function () {
                var e = this;
                return or("div", {
                    class: "uppy-Dashboard-AddFiles"
                }, this.renderHiddenInput(!1, (function (t) {
                    e.fileInput = t
                })), this.renderHiddenInput(!0, (function (t) {
                    e.folderInput = t
                })), this.renderDropPasteBrowseTagline(), this.props.acquirers.length > 0 && this.renderAcquirers(this.props.acquirers), or("div", {
                    class: "uppy-Dashboard-AddFiles-info"
                }, this.props.note && or("div", {
                    class: "uppy-Dashboard-note"
                }, this.props.note), this.props.proudlyDisplayPoweredByUppy && this.renderPoweredByUppy(this.props)))
            }, n
        }(oe.Component),
        ar = oe.h,
        ur = function (e) {
            return ar("div", {
                class: "uppy-Dashboard-AddFilesPanel",
                "data-uppy-panelType": "AddFiles",
                "aria-hidden": e.showAddFilesPanel
            }, ar("div", {
                class: "uppy-DashboardContent-bar"
            }, ar("div", {
                class: "uppy-DashboardContent-title",
                role: "heading",
                "aria-level": "1"
            }, e.i18n("addingMoreFiles")), ar("button", {
                class: "uppy-DashboardContent-back",
                type: "button",
                onclick: function (t) {
                    return e.toggleAddFilesPanel(!1)
                }
            }, e.i18n("back"))), ar(sr, e))
        },
        lr = function (e) {
            var t = e.target.tagName;
            "INPUT" !== t && "TEXTAREA" !== t ? (e.preventDefault(), e.stopPropagation()) : e.stopPropagation()
        },
        cr = oe.h,
        pr = function (e) {
            return cr("div", {
                class: "uppy-DashboardContent-panel",
                role: "tabpanel",
                "data-uppy-panelType": "PickerPanel",
                id: "uppy-DashboardContent-panel--" + e.activePickerPanel.id,
                onDragOver: lr,
                onDragLeave: lr,
                onDrop: lr,
                onPaste: lr
            }, cr("div", {
                class: "uppy-DashboardContent-bar"
            }, cr("div", {
                class: "uppy-DashboardContent-title",
                role: "heading",
                "aria-level": "1"
            }, e.i18n("importFrom", {
                name: e.activePickerPanel.name
            })), cr("button", {
                class: "uppy-DashboardContent-back",
                type: "button",
                onclick: e.hideAllPanels
            }, e.i18n("done"))), cr("div", {
                class: "uppy-DashboardContent-panelBody"
            }, e.getPlugin(e.activePickerPanel.id).render(e.state)))
        },
        dr = oe.h,
        hr = function (e) {
            var t = this.props.files[this.props.fileCardFor];
            return dr("div", {
                class: "uppy-DashboardContent-panel",
                role: "tabpanel",
                "data-uppy-panelType": "FileEditor",
                id: "uppy-DashboardContent-panel--editor"
            }, dr("div", {
                class: "uppy-DashboardContent-bar"
            }, dr("div", {
                class: "uppy-DashboardContent-title",
                role: "heading",
                "aria-level": "1"
            }, e.i18nArray("editing", {
                file: dr("span", {
                    class: "uppy-DashboardContent-titleFile"
                }, t.meta ? t.meta.name : t.name)
            })), dr("button", {
                class: "uppy-DashboardContent-back",
                type: "button",
                onclick: e.hideAllPanels
            }, e.i18n("done"))), dr("div", {
                class: "uppy-DashboardContent-panelBody"
            }, e.editors.map((function (t) {
                return e.getPlugin(t.id).render(e.state)
            }))))
        },
        fr = oe.h,
        yr = "error",
        gr = "waiting",
        vr = "preprocessing",
        mr = "uploading",
        br = "postprocessing",
        wr = "complete",
        _r = "paused";

    function Sr(e) {
        switch (function (e, t, r, n) {
            if (void 0 === n && (n = {}), e) return yr;
            if (t) return wr;
            if (r) return _r;
            for (var i = gr, o = Object.keys(n), s = 0; s < o.length; s++) {
                var a = n[o[s]].progress;
                if (a.uploadStarted && !a.uploadComplete) return mr;
                a.preprocess && i !== mr && (i = vr), a.postprocess && i !== mr && i !== vr && (i = br)
            }
            return i
        }(e.isAllErrored, e.isAllComplete, e.isAllPaused, e.files)) {
            case "uploading":
                return e.i18n("uploadingXFiles", {
                    smart_count: e.inProgressNotPausedFiles.length
                });
            case "preprocessing":
            case "postprocessing":
                return e.i18n("processingXFiles", {
                    smart_count: e.processingFiles.length
                });
            case "paused":
                return e.i18n("uploadPaused");
            case "waiting":
                return e.i18n("xFilesSelected", {
                    smart_count: e.newFiles.length
                });
            case "complete":
                return e.i18n("uploadComplete")
        }
    }
    var kr = function (e) {
        var t = e.allowNewUpload;
        return t && e.maxNumberOfFiles && (t = e.totalFileCount < e.maxNumberOfFiles), fr("div", {
            class: "uppy-DashboardContent-bar"
        }, e.isAllComplete || e.hideCancelButton ? fr("div", null) : fr("button", {
            class: "uppy-DashboardContent-back",
            type: "button",
            onclick: e.cancelAll
        }, e.i18n("cancel")), fr("div", {
            class: "uppy-DashboardContent-title",
            role: "heading",
            "aria-level": "1"
        }, fr(Sr, e)), t ? fr("button", {
            class: "uppy-DashboardContent-addMore",
            type: "button",
            "aria-label": e.i18n("addMoreFiles"),
            title: e.i18n("addMoreFiles"),
            onclick: function () {
                return e.toggleAddFilesPanel(!0)
            }
        }, fr("svg", {
            "aria-hidden": "true",
            focusable: "false",
            class: "uppy-c-icon",
            width: "15",
            height: "15",
            viewBox: "0 0 15 15"
        }, fr("path", {
            d: "M8 6.5h6a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H8v6a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V8h-6a.5.5 0 0 1-.5-.5V7a.5.5 0 0 1 .5-.5h6v-6A.5.5 0 0 1 7 0h.5a.5.5 0 0 1 .5.5v6z"
        })), fr("span", {
            class: "uppy-DashboardContent-addMoreCaption"
        }, e.i18n("addMore"))) : fr("div", null))
    };

    function Pr() {
        return (Pr = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var Cr, Er = oe.h,
        Ar = function (e) {
            var t, r;

            function n(t) {
                var r;
                (r = e.call(this, t) || this).saveOnEnter = function (e) {
                    if (13 === e.keyCode) {
                        e.stopPropagation(), e.preventDefault();
                        var t = r.props.files[r.props.fileCardFor];
                        r.props.saveFileCard(r.state.formState, t.id)
                    }
                }, r.updateMeta = function (e, t) {
                    var n;
                    r.setState({
                        formState: Pr({}, r.state.formState, (n = {}, n[t] = e, n))
                    })
                }, r.handleSave = function () {
                    var e = r.props.fileCardFor;
                    r.props.saveFileCard(r.state.formState, e)
                }, r.handleCancel = function () {
                    r.props.toggleFileCard()
                }, r.renderMetaFields = function () {
                    var e = r.props.metaFields || [],
                        t = {
                            text: "uppy-u-reset uppy-c-textInput uppy-Dashboard-FileCard-input"
                        };
                    return e.map((function (e) {
                        var n = "uppy-Dashboard-FileCard-input-" + e.id;
                        return Er("fieldset", {
                            key: e.id,
                            class: "uppy-Dashboard-FileCard-fieldset"
                        }, Er("label", {
                            class: "uppy-Dashboard-FileCard-label",
                            for: n
                        }, e.name), void 0 !== e.render ? e.render({
                            value: r.state.formState[e.id],
                            onChange: function (t) {
                                return r.updateMeta(t, e.id)
                            },
                            fieldCSSClasses: t
                        }, Er) : Er("input", {
                            class: t.text,
                            id: n,
                            type: e.type || "text",
                            value: r.state.formState[e.id],
                            placeholder: e.placeholder,
                            onkeyup: r.saveOnEnter,
                            onkeydown: r.saveOnEnter,
                            onkeypress: r.saveOnEnter,
                            oninput: function (t) {
                                return r.updateMeta(t.target.value, e.id)
                            },
                            "data-uppy-super-focusable": !0
                        }))
                    }))
                };
                var n = r.props.files[r.props.fileCardFor],
                    i = r.props.metaFields || [],
                    o = {};
                return i.forEach((function (e) {
                    o[e.id] = n.meta[e.id] || ""
                })), r.state = {
                    formState: o
                }, r
            }
            return r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r, n.prototype.render = function () {
                var e = this,
                    t = this.props.files[this.props.fileCardFor],
                    r = this.props.canEditFile(t);
                return Er("div", {
                    class: "uppy-Dashboard-FileCard",
                    "data-uppy-panelType": "FileCard",
                    onDragOver: lr,
                    onDragLeave: lr,
                    onDrop: lr,
                    onPaste: lr
                }, Er("div", {
                    class: "uppy-DashboardContent-bar"
                }, Er("div", {
                    class: "uppy-DashboardContent-title",
                    role: "heading",
                    "aria-level": "1"
                }, this.props.i18nArray("editing", {
                    file: Er("span", {
                        class: "uppy-DashboardContent-titleFile"
                    }, t.meta ? t.meta.name : t.name)
                })), Er("button", {
                    class: "uppy-DashboardContent-back",
                    type: "button",
                    title: this.props.i18n("finishEditingFile"),
                    onclick: this.handleSave
                }, this.props.i18n("done"))), Er("div", {
                    class: "uppy-Dashboard-FileCard-inner"
                }, Er("div", {
                    class: "uppy-Dashboard-FileCard-preview",
                    style: {
                        backgroundColor: Ft(t.type).color
                    }
                }, Er(Ut, {
                    file: t
                }), r && Er("button", {
                    type: "button",
                    class: "uppy-u-reset uppy-c-btn uppy-Dashboard-FileCard-edit",
                    onClick: function () {
                        return e.props.openFileEditor(t)
                    }
                }, this.props.i18n("editFile"))), Er("div", {
                    class: "uppy-Dashboard-FileCard-info"
                }, this.renderMetaFields()), Er("div", {
                    class: "uppy-Dashboard-FileCard-actions"
                }, Er("button", {
                    class: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Dashboard-FileCard-actionsBtn",
                    type: "button",
                    onclick: this.handleSave
                }, this.props.i18n("saveChanges")), Er("button", {
                    class: "uppy-u-reset uppy-c-btn uppy-c-btn-link uppy-Dashboard-FileCard-actionsBtn",
                    type: "button",
                    onclick: this.handleCancel
                }, this.props.i18n("cancel")))))
            }, n
        }(oe.Component),
        Fr = function () {
            var e = document.createElement("div");
            return "draggable" in e && "ondragstart" in e && "ondrop" in e && "FormData" in window && "FileReader" in window
        },
        Or = {
            exports: {}
        };

    function Ur() {
        return (Ur = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    Cr = function (e) {
        "use strict";

        function t(e) {
            return e.attributes && e.attributes.key
        }

        function r(e) {
            return e.base
        }

        function n(e) {
            return e && e.filter((function (e) {
                return null !== e
            }))
        }

        function i(e, t) {
            for (var r = e.length; r--;)
                if (t(e[r])) return !0;
            return !1
        }

        function o(e, r) {
            return i(e, (function (e) {
                return t(e) === r
            }))
        }

        function s(e, r) {
            return o(e, t(r))
        }

        function a(e, r, n) {
            return i(e, (function (e) {
                return t(e) === r && e.props[n]
            }))
        }

        function u(e, r, n) {
            return a(e, t(r), n)
        }
        var l = /[\n\t\r]+/g;

        function c(e, t) {
            var r;
            e.classList ? (r = e.classList).add.apply(r, t.split(" ")) : e.className += " " + t
        }

        function p(e, t) {
            if (t = t.trim(), e.classList) {
                var r;
                (r = e.classList).remove.apply(r, t.split(" "))
            } else {
                var n = function (e) {
                    return (" " + e + " ").replace(l, " ")
                }(e.className.trim());
                for (t = " " + t + " "; n.indexOf(t) >= 0;) n = n.replace(t, " ");
                e.className = n.trim()
            }
        }
        var d = {
            transitionend: {
                transition: "transitionend",
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "mozTransitionEnd",
                OTransition: "oTransitionEnd",
                msTransition: "MSTransitionEnd"
            },
            animationend: {
                animation: "animationend",
                WebkitAnimation: "webkitAnimationEnd",
                MozAnimation: "mozAnimationEnd",
                OAnimation: "oAnimationEnd",
                msAnimation: "MSAnimationEnd"
            }
        },
            h = [];
        "undefined" != typeof window && function () {
            var e = document.createElement("div").style;
            for (var t in "AnimationEvent" in window || delete d.animationend.animation, "TransitionEvent" in window || delete d.transitionend.transition, d) {
                var r = d[t];
                for (var n in r)
                    if (n in e) {
                        h.push(r[n]);
                        break
                    }
            }
        }();
        var f = function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        },
            y = function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            },
            g = function (e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            },
            v = function (e) {
                function t() {
                    var n, i;
                    f(this, t);
                    for (var o = arguments.length, s = Array(o), a = 0; a < o; a++) s[a] = arguments[a];
                    return n = i = g(this, e.call.apply(e, [this].concat(s))), i.flushClassNameQueue = function () {
                        r(i) && c(r(i), i.classNameQueue.join(" ")), i.classNameQueue.length = 0, i.timeout = null
                    }, g(i, n)
                }
                return y(t, e), t.prototype.transition = function (e, t, n) {
                    var i = this,
                        o = r(this),
                        s = this.props.name[e] || this.props.name + "-" + e,
                        a = this.props.name[e + "Active"] || s + "-active",
                        u = null;
                    this.endListener && this.endListener(), this.endListener = function (e) {
                        e && e.target !== o || (clearTimeout(u), p(o, s), p(o, a), function (e, t) {
                            h.length && h.forEach((function (r) {
                                e.removeEventListener(r, t, !1)
                            }))
                        }(o, i.endListener), i.endListener = null, t && t())
                    }, n ? (u = setTimeout(this.endListener, n), this.transitionTimeouts.push(u)) : function (e, t) {
                        if (!h.length) return window.setTimeout(t, 0);
                        h.forEach((function (r) {
                            e.addEventListener(r, t, !1)
                        }))
                    }(o, this.endListener), c(o, s), this.queueClass(a)
                }, t.prototype.queueClass = function (e) {
                    this.classNameQueue.push(e), this.timeout || (this.timeout = setTimeout(this.flushClassNameQueue, 17))
                }, t.prototype.stop = function () {
                    this.timeout && (clearTimeout(this.timeout), this.classNameQueue.length = 0, this.timeout = null), this.endListener && this.endListener()
                }, t.prototype.componentWillMount = function () {
                    this.classNameQueue = [], this.transitionTimeouts = []
                }, t.prototype.componentWillUnmount = function () {
                    this.timeout && clearTimeout(this.timeout), this.transitionTimeouts.forEach((function (e) {
                        clearTimeout(e)
                    }))
                }, t.prototype.componentWillEnter = function (e) {
                    this.props.enter ? this.transition("enter", e, this.props.enterTimeout) : e()
                }, t.prototype.componentWillLeave = function (e) {
                    this.props.leave ? this.transition("leave", e, this.props.leaveTimeout) : e()
                }, t.prototype.render = function () {
                    return (e = this.props.children) && e[0];
                    var e
                }, t
            }(e.Component),
            m = function (r) {
                function i(n) {
                    f(this, i);
                    var o = g(this, r.call(this));
                    return o.renderChild = function (r) {
                        var n = o.props,
                            i = n.transitionName,
                            s = n.transitionEnter,
                            a = n.transitionLeave,
                            u = n.transitionEnterTimeout,
                            l = n.transitionLeaveTimeout,
                            c = t(r);
                        return e.h(v, {
                            key: c,
                            ref: function (e) {
                                (o.refs[c] = e) || (r = null)
                            },
                            name: i,
                            enter: s,
                            leave: a,
                            enterTimeout: u,
                            leaveTimeout: l
                        }, r)
                    }, o.refs = {}, o.state = {
                        children: (n.children || []).slice()
                    }, o
                }
                return y(i, r), i.prototype.shouldComponentUpdate = function (e, t) {
                    return t.children !== this.state.children
                }, i.prototype.componentWillMount = function () {
                    this.currentlyTransitioningKeys = {}, this.keysToEnter = [], this.keysToLeave = []
                }, i.prototype.componentWillReceiveProps = function (r) {
                    var i, a, l, c, p = this,
                        d = r.children,
                        h = r.exclusive,
                        f = r.showProp,
                        y = n(d || []).slice(),
                        g = n(h ? this.props.children : this.state.children),
                        v = (i = y, a = [], l = {}, c = [], g.forEach((function (e) {
                            var r = t(e);
                            o(i, r) ? c.length && (l[r] = c, c = []) : c.push(e)
                        })), i.forEach((function (e) {
                            var r = t(e);
                            l.hasOwnProperty(r) && (a = a.concat(l[r])), a.push(e)
                        })), a.concat(c));
                    f && (v = v.map((function (t) {
                        var r;
                        return !t.props[f] && u(g, t, f) && (t = e.cloneElement(t, ((r = {})[f] = !0, r))), t
                    }))), h && v.forEach((function (e) {
                        return p.stop(t(e))
                    })), this.setState({
                        children: v
                    }), this.forceUpdate(), y.forEach((function (e) {
                        var t = e.key,
                            r = g && s(g, e);
                        if (f) {
                            if (r) {
                                var n = u(g, e, f),
                                    i = e.props[f];
                                n || !i || p.currentlyTransitioningKeys[t] || p.keysToEnter.push(t)
                            }
                        } else r || p.currentlyTransitioningKeys[t] || p.keysToEnter.push(t)
                    })), g.forEach((function (e) {
                        var t = e.key,
                            r = y && s(y, e);
                        if (f) {
                            if (r) {
                                var n = u(y, e, f),
                                    i = e.props[f];
                                n || !i || p.currentlyTransitioningKeys[t] || p.keysToLeave.push(t)
                            }
                        } else r || p.currentlyTransitioningKeys[t] || p.keysToLeave.push(t)
                    }))
                }, i.prototype.performEnter = function (e) {
                    var t = this;
                    this.currentlyTransitioningKeys[e] = !0;
                    var r = this.refs[e];
                    r.componentWillEnter ? r.componentWillEnter((function () {
                        return t._handleDoneEntering(e)
                    })) : this._handleDoneEntering(e)
                }, i.prototype._handleDoneEntering = function (e) {
                    delete this.currentlyTransitioningKeys[e];
                    var t = n(this.props.children),
                        r = this.props.showProp;
                    !t || !r && !o(t, e) || r && !a(t, e, r) ? this.performLeave(e) : this.setState({
                        children: t
                    })
                }, i.prototype.stop = function (e) {
                    delete this.currentlyTransitioningKeys[e];
                    var t = this.refs[e];
                    t && t.stop()
                }, i.prototype.performLeave = function (e) {
                    var t = this;
                    this.currentlyTransitioningKeys[e] = !0;
                    var r = this.refs[e];
                    r && r.componentWillLeave ? r.componentWillLeave((function () {
                        return t._handleDoneLeaving(e)
                    })) : this._handleDoneLeaving(e)
                }, i.prototype._handleDoneLeaving = function (e) {
                    delete this.currentlyTransitioningKeys[e];
                    var t = this.props.showProp,
                        r = n(this.props.children);
                    t && r && a(r, e, t) || !t && r && o(r, e) ? this.performEnter(e) : this.setState({
                        children: r
                    })
                }, i.prototype.componentDidUpdate = function () {
                    var e = this,
                        t = this.keysToEnter,
                        r = this.keysToLeave;
                    this.keysToEnter = [], t.forEach((function (t) {
                        return e.performEnter(t)
                    })), this.keysToLeave = [], r.forEach((function (t) {
                        return e.performLeave(t)
                    }))
                }, i.prototype.render = function (t, r) {
                    var i = t.component,
                        o = (t.transitionName, t.transitionEnter, t.transitionLeave, t.transitionEnterTimeout, t.transitionLeaveTimeout, t.children, function (e, t) {
                            var r = {};
                            for (var n in e) t.indexOf(n) >= 0 || Object.prototype.hasOwnProperty.call(e, n) && (r[n] = e[n]);
                            return r
                        }(t, ["component", "transitionName", "transitionEnter", "transitionLeave", "transitionEnterTimeout", "transitionLeaveTimeout", "children"])),
                        s = r.children;
                    return e.h(i, o, n(s).map(this.renderChild))
                }, i
            }(e.Component);
        return m.defaultProps = {
            component: "span",
            transitionEnter: !0,
            transitionLeave: !0
        }, m
    }, "object" == typeof Or.exports ? Or.exports = Cr(oe) : this.PreactCSSTransitionGroup = Cr(this.preact), Or = Or.exports;
    var Rr = oe.h;

    function Tr(e) {
        return Rr(Or, {
            transitionName: "uppy-transition-slideDownUp",
            transitionEnterTimeout: 250,
            transitionLeaveTimeout: 250
        }, e.children)
    }
    var xr = "error",
        Dr = "waiting",
        Br = "preprocessing",
        Ir = "uploading",
        jr = "postprocessing",
        Lr = "complete",
        Mr = function (e) {
            var t, r = (t = e, {
                hours: Math.floor(t / 3600) % 24,
                minutes: Math.floor(t / 60) % 60,
                seconds: Math.floor(t % 60)
            }),
                n = r.hours ? r.hours + "h " : "",
                i = r.hours ? ("0" + r.minutes).substr(-2) : r.minutes,
                o = i ? i + "m" : "",
                s = i ? ("0" + r.seconds).substr(-2) : r.seconds;
            return "" + n + o + (r.hours ? "" : i ? " " + s + "s" : s + "s")
        };

    function Nr() {
        return (Nr = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var zr, qr, Hr = oe.h,
        Vr = function (e) {
            var t = qe("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--upload", {
                "uppy-c-btn-primary": e.uploadState === Dr
            });
            return Hr("button", {
                type: "button",
                class: t,
                "aria-label": e.i18n("uploadXFiles", {
                    smart_count: e.newFiles
                }),
                onclick: e.startUpload,
                "data-uppy-super-focusable": !0
            }, e.newFiles && e.isUploadStarted ? e.i18n("uploadXNewFiles", {
                smart_count: e.newFiles
            }) : e.i18n("uploadXFiles", {
                smart_count: e.newFiles
            }))
        },
        Wr = function (e) {
            return Hr("button", {
                type: "button",
                class: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--retry",
                "aria-label": e.i18n("retryUpload"),
                onclick: e.retryAll,
                "data-uppy-super-focusable": !0
            }, Hr("svg", {
                "aria-hidden": "true",
                focusable: "false",
                class: "uppy-c-icon",
                width: "8",
                height: "10",
                viewBox: "0 0 8 10"
            }, Hr("path", {
                d: "M4 2.408a2.75 2.75 0 1 0 2.75 2.75.626.626 0 0 1 1.25.018v.023a4 4 0 1 1-4-4.041V.25a.25.25 0 0 1 .389-.208l2.299 1.533a.25.25 0 0 1 0 .416l-2.3 1.533A.25.25 0 0 1 4 3.316v-.908z"
            })), e.i18n("retry"))
        },
        Xr = function (e) {
            return Hr("button", {
                type: "button",
                class: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
                title: e.i18n("cancel"),
                "aria-label": e.i18n("cancel"),
                onclick: e.cancelAll,
                "data-uppy-super-focusable": !0
            }, Hr("svg", {
                "aria-hidden": "true",
                focusable: "false",
                class: "uppy-c-icon",
                width: "16",
                height: "16",
                viewBox: "0 0 16 16"
            }, Hr("g", {
                fill: "none",
                "fill-rule": "evenodd"
            }, Hr("circle", {
                fill: "#888",
                cx: "8",
                cy: "8",
                r: "8"
            }), Hr("path", {
                fill: "#FFF",
                d: "M9.283 8l2.567 2.567-1.283 1.283L8 9.283 5.433 11.85 4.15 10.567 6.717 8 4.15 5.433 5.433 4.15 8 6.717l2.567-2.567 1.283 1.283z"
            }))))
        },
        Gr = function (e) {
            var t = e.isAllPaused,
                r = (0, e.i18n)(t ? "resume" : "pause");
            return Hr("button", {
                title: r,
                "aria-label": r,
                class: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
                type: "button",
                onclick: function () {
                    return function (e) {
                        if (!e.isAllComplete) return e.resumableUploads ? e.isAllPaused ? e.resumeAll() : e.pauseAll() : e.cancelAll()
                    }(e)
                },
                "data-uppy-super-focusable": !0
            }, Hr("svg", {
                "aria-hidden": "true",
                focusable: "false",
                class: "uppy-c-icon",
                width: "16",
                height: "16",
                viewBox: "0 0 16 16"
            }, Hr("g", {
                fill: "none",
                "fill-rule": "evenodd"
            }, Hr("circle", {
                fill: "#888",
                cx: "8",
                cy: "8",
                r: "8"
            }), Hr("path", t ? {
                fill: "#FFF",
                d: "M6 4.25L11.5 8 6 11.75z"
            } : {
                    d: "M5 4.5h2v7H5v-7zm4 0h2v7H9v-7z",
                    fill: "#FFF"
                }))))
        },
        Kr = function () {
            return Hr("svg", {
                class: "uppy-StatusBar-spinner",
                "aria-hidden": "true",
                focusable: "false",
                width: "14",
                height: "14"
            }, Hr("path", {
                d: "M13.983 6.547c-.12-2.509-1.64-4.893-3.939-5.936-2.48-1.127-5.488-.656-7.556 1.094C.524 3.367-.398 6.048.162 8.562c.556 2.495 2.46 4.52 4.94 5.183 2.932.784 5.61-.602 7.256-3.015-1.493 1.993-3.745 3.309-6.298 2.868-2.514-.434-4.578-2.349-5.153-4.84a6.226 6.226 0 0 1 2.98-6.778C6.34.586 9.74 1.1 11.373 3.493c.407.596.693 1.282.842 1.988.127.598.073 1.197.161 1.794.078.525.543 1.257 1.15.864.525-.341.49-1.05.456-1.592-.007-.15.02.3 0 0",
                "fill-rule": "evenodd"
            }))
        },
        $r = function (e) {
            var t = Math.round(100 * e.value);
            return Hr("div", {
                class: "uppy-StatusBar-content"
            }, Hr(Kr, null), "determinate" === e.mode ? t + "% \xb7 " : "", e.message)
        },
        Yr = function (e) {
            return Hr("div", {
                class: "uppy-StatusBar-statusSecondary"
            }, e.i18n("filesUploadedOfTotal", {
                complete: e.complete,
                smart_count: e.numUploads
            }))
        },
        Jr = function (e) {
            var t = qe("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--uploadNewlyAdded");
            return Hr("div", {
                class: "uppy-StatusBar-statusSecondary"
            }, Hr("div", {
                class: "uppy-StatusBar-statusSecondaryHint"
            }, e.i18n("xMoreFilesAdded", {
                smart_count: e.newFiles
            })), Hr("button", {
                type: "button",
                class: t,
                "aria-label": e.i18n("uploadXFiles", {
                    smart_count: e.newFiles
                }),
                onclick: e.startUpload
            }, e.i18n("upload")))
        },
        Qr = q((function (e) {
            var t = e.numUploads > 1;
            return Hr("div", {
                class: "uppy-StatusBar-statusSecondary"
            }, t && e.i18n("filesUploadedOfTotal", {
                complete: e.complete,
                smart_count: e.numUploads
            }), Hr("span", {
                class: "uppy-StatusBar-additionalInfo"
            }, t && " \xb7 ", e.i18n("dataUploadedOfTotal", {
                complete: V(e.totalUploadedSize),
                total: V(e.totalSize)
            }), " \xb7 ", e.i18n("xTimeLeft", {
                time: Mr(e.totalETA)
            })))
        }), 500, {
            leading: !0,
            trailing: !0
        }),
        Zr = function (e) {
            if (!e.isUploadStarted || e.isAllComplete) return null;
            var t = e.isAllPaused ? e.i18n("paused") : e.i18n("uploading"),
                r = e.newFiles && e.isUploadStarted;
            return Hr("div", {
                class: "uppy-StatusBar-content",
                "aria-label": t,
                title: t
            }, e.isAllPaused ? null : Hr(Kr, null), Hr("div", {
                class: "uppy-StatusBar-status"
            }, Hr("div", {
                class: "uppy-StatusBar-statusPrimary"
            }, e.supportsUploadProgress ? t + ": " + e.totalProgress + "%" : t), e.isAllPaused || r || !e.showProgressDetails ? null : e.supportsUploadProgress ? Hr(Qr, e) : Hr(Yr, e), r ? Hr(Jr, e) : null))
        },
        en = function (e) {
            e.totalProgress;
            var t = e.i18n;
            return Hr("div", {
                class: "uppy-StatusBar-content",
                role: "status",
                title: t("complete")
            }, Hr("div", {
                class: "uppy-StatusBar-status"
            }, Hr("div", {
                class: "uppy-StatusBar-statusPrimary"
            }, Hr("svg", {
                "aria-hidden": "true",
                focusable: "false",
                class: "uppy-StatusBar-statusIndicator uppy-c-icon",
                width: "15",
                height: "11",
                viewBox: "0 0 15 11"
            }, Hr("path", {
                d: "M.414 5.843L1.627 4.63l3.472 3.472L13.202 0l1.212 1.213L5.1 10.528z"
            })), t("complete"))))
        },
        tn = function (e) {
            var t = e.error,
                r = (e.retryAll, e.hideRetryButton, e.i18n);
            return Hr("div", {
                class: "uppy-StatusBar-content",
                role: "alert",
                title: r("uploadFailed")
            }, Hr("div", {
                class: "uppy-StatusBar-status"
            }, Hr("div", {
                class: "uppy-StatusBar-statusPrimary"
            }, Hr("svg", {
                "aria-hidden": "true",
                focusable: "false",
                class: "uppy-StatusBar-statusIndicator uppy-c-icon",
                width: "11",
                height: "11",
                viewBox: "0 0 11 11"
            }, Hr("path", {
                d: "M4.278 5.5L0 1.222 1.222 0 5.5 4.278 9.778 0 11 1.222 6.722 5.5 11 9.778 9.778 11 5.5 6.722 1.222 11 0 9.778z"
            })), r("uploadFailed"))), Hr("span", {
                class: "uppy-StatusBar-details",
                "aria-label": t,
                "data-microtip-position": "top-right",
                "data-microtip-size": "medium",
                role: "tooltip",
                onclick: function () {
                    var e = r("uploadFailed") + " \n\n " + t;
                    alert(e)
                }
            }, "?"))
        };

    function rn() {
        return (rn = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function nn(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var on, sn, an = (qr = zr = function (e) {
        var t, r;

        function n(t, r) {
            var n;
            return (n = e.call(this, t, r) || this).startUpload = function () {
                return n.uppy.upload().catch((function () { }))
            }, n.id = n.opts.id || "StatusBar", n.title = "StatusBar", n.type = "progressindicator", n.defaultLocale = {
                strings: {
                    uploading: "Uploading",
                    upload: "Upload",
                    complete: "Complete",
                    uploadFailed: "Upload failed",
                    paused: "Paused",
                    retry: "Retry",
                    retryUpload: "Retry upload",
                    cancel: "Cancel",
                    pause: "Pause",
                    resume: "Resume",
                    filesUploadedOfTotal: {
                        0: "%{complete} of %{smart_count} file uploaded",
                        1: "%{complete} of %{smart_count} files uploaded"
                    },
                    dataUploadedOfTotal: "%{complete} of %{total}",
                    xTimeLeft: "%{time} left",
                    uploadXFiles: {
                        0: "Upload %{smart_count} file",
                        1: "Upload %{smart_count} files"
                    },
                    uploadXNewFiles: {
                        0: "Upload +%{smart_count} file",
                        1: "Upload +%{smart_count} files"
                    },
                    xMoreFilesAdded: {
                        0: "%{smart_count} more file added",
                        1: "%{smart_count} more files added"
                    }
                }
            }, n.opts = rn({}, {
                target: "body",
                hideUploadButton: !1,
                hideRetryButton: !1,
                hidePauseResumeButton: !1,
                hideCancelButton: !1,
                showProgressDetails: !1,
                hideAfterFinish: !0
            }, r), n.i18nInit(), n.render = n.render.bind(nn(n)), n.install = n.install.bind(nn(n)), n
        }
        r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
        var i = n.prototype;
        return i.setOptions = function (t) {
            e.prototype.setOptions.call(this, t), this.i18nInit()
        }, i.i18nInit = function () {
            this.translator = new E([this.defaultLocale, this.uppy.locale, this.opts.locale]), this.i18n = this.translator.translate.bind(this.translator), this.setPluginState()
        }, i.getTotalSpeed = function (e) {
            var t = 0;
            return e.forEach((function (e) {
                t += function (e) {
                    if (!e.bytesUploaded) return 0;
                    var t = new Date - e.uploadStarted;
                    return e.bytesUploaded / (t / 1e3)
                }(e.progress)
            })), t
        }, i.getTotalETA = function (e) {
            var t = this.getTotalSpeed(e);
            if (0 === t) return 0;
            var r = e.reduce((function (e, t) {
                return e + ((r = t.progress).bytesTotal - r.bytesUploaded);
                var r
            }), 0);
            return Math.round(r / t * 10) / 10
        }, i.getUploadingState = function (e, t, r) {
            if (e) return xr;
            if (t) return Lr;
            for (var n = Dr, i = Object.keys(r), o = 0; o < i.length; o++) {
                var s = r[i[o]].progress;
                if (s.uploadStarted && !s.uploadComplete) return Ir;
                s.preprocess && n !== Ir && (n = Br), s.postprocess && n !== Ir && n !== Br && (n = jr)
            }
            return n
        }, i.render = function (e) {
            var t = e.capabilities,
                r = e.files,
                n = e.allowNewUpload,
                i = e.totalProgress,
                o = e.error,
                s = Object.keys(r).map((function (e) {
                    return r[e]
                })),
                a = s.filter((function (e) {
                    return !e.progress.uploadStarted && !e.progress.preprocess && !e.progress.postprocess
                })),
                u = s.filter((function (e) {
                    return e.progress.uploadStarted
                })).filter((function (e) {
                    return e.isPaused
                })),
                l = s.filter((function (e) {
                    return e.progress.uploadComplete
                })),
                c = s.filter((function (e) {
                    return e.error
                })),
                p = s.filter((function (e) {
                    return !e.progress.uploadComplete && e.progress.uploadStarted
                })),
                d = p.filter((function (e) {
                    return !e.isPaused
                })),
                h = s.filter((function (e) {
                    return e.progress.uploadStarted || e.progress.preprocess || e.progress.postprocess
                })),
                f = s.filter((function (e) {
                    return e.progress.preprocess || e.progress.postprocess
                })),
                y = this.getTotalETA(d),
                g = 0,
                v = 0;
            h.forEach((function (e) {
                g += e.progress.bytesTotal || 0, v += e.progress.bytesUploaded || 0
            }));
            var m = h.length > 0,
                b = 100 === i && l.length === Object.keys(r).length && 0 === f.length,
                w = o && c.length === s.length,
                _ = 0 !== p.length && u.length === p.length,
                S = p.length > 0,
                k = t.resumableUploads || !1,
                P = !1 !== t.uploadProgress;
            return function (e) {
                var t, r, n = e = e || {},
                    i = n.newFiles,
                    o = n.allowNewUpload,
                    s = n.isUploadInProgress,
                    a = n.isAllPaused,
                    u = n.resumableUploads,
                    l = n.error,
                    c = n.hideUploadButton,
                    p = n.hidePauseResumeButton,
                    d = n.hideCancelButton,
                    h = n.hideRetryButton,
                    f = e.uploadState,
                    y = e.totalProgress;
                if (f === Br || f === jr) {
                    var g = function (e) {
                        var t = [];
                        Object.keys(e).forEach((function (r) {
                            var n = e[r].progress;
                            n.preprocess && t.push(n.preprocess), n.postprocess && t.push(n.postprocess)
                        }));
                        var r = t[0];
                        return {
                            mode: r.mode,
                            message: r.message,
                            value: t.filter((function (e) {
                                return "determinate" === e.mode
                            })).reduce((function (e, t, r, n) {
                                return e + t.value / n.length
                            }), 0)
                        }
                    }(e.files);
                    "determinate" === (t = g.mode) && (y = 100 * g.value), r = $r(g)
                } else f === Lr ? r = en(e) : f === Ir ? (e.supportsUploadProgress || (t = "indeterminate", y = null), r = Zr(e)) : f === xr && (y = void 0, r = tn(e));
                var v = "number" == typeof y ? y : 100,
                    m = f === Dr && e.hideUploadButton || f === Dr && !e.newFiles > 0 || f === Lr && e.hideAfterFinish,
                    b = !l && i && !s && !a && o && !c,
                    w = !d && f !== Dr && f !== Lr,
                    _ = u && !p && f === Ir,
                    S = l && !h,
                    k = "uppy-StatusBar-progress\n                           " + (t ? "is-" + t : ""),
                    P = qe({
                        "uppy-Root": e.isTargetDOMEl
                    }, "uppy-StatusBar", "is-" + f);
                return Hr("div", {
                    class: P,
                    "aria-hidden": m
                }, Hr("div", {
                    class: k,
                    style: {
                        width: v + "%"
                    },
                    role: "progressbar",
                    "aria-valuemin": "0",
                    "aria-valuemax": "100",
                    "aria-valuenow": y
                }), r, Hr("div", {
                    class: "uppy-StatusBar-actions"
                }, b ? Hr(Vr, Nr({}, e, {
                    uploadState: f
                })) : null, S ? Hr(Wr, e) : null, _ ? Hr(Gr, e) : null, w ? Hr(Xr, e) : null))
            }({
                error: o,
                uploadState: this.getUploadingState(w, b, e.files || {}),
                allowNewUpload: n,
                totalProgress: i,
                totalSize: g,
                totalUploadedSize: v,
                isAllComplete: b,
                isAllPaused: _,
                isAllErrored: w,
                isUploadStarted: m,
                isUploadInProgress: S,
                complete: l.length,
                newFiles: a.length,
                numUploads: h.length,
                totalETA: y,
                files: r,
                i18n: this.i18n,
                pauseAll: this.uppy.pauseAll,
                resumeAll: this.uppy.resumeAll,
                retryAll: this.uppy.retryAll,
                cancelAll: this.uppy.cancelAll,
                startUpload: this.startUpload,
                resumableUploads: k,
                supportsUploadProgress: P,
                showProgressDetails: this.opts.showProgressDetails,
                hideUploadButton: this.opts.hideUploadButton,
                hideRetryButton: this.opts.hideRetryButton,
                hidePauseResumeButton: this.opts.hidePauseResumeButton,
                hideCancelButton: this.opts.hideCancelButton,
                hideAfterFinish: this.opts.hideAfterFinish,
                isTargetDOMEl: this.isTargetDOMEl
            })
        }, i.install = function () {
            var e = this.opts.target;
            e && this.mount(e, this)
        }, i.uninstall = function () {
            this.unmount()
        }, n
    }(le.Plugin), zr.VERSION = "1.7.6", qr);

    function un() {
        return (un = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    for (var ln = le.Plugin, cn = oe.h, pn = (sn = on = function (e) {
        var t, r;

        function n(t, r) {
            var n;
            return (n = e.call(this, t, r) || this).render = function (e) {
                var t = e.info,
                    r = t.isHidden,
                    i = t.message,
                    o = t.details;
                return cn("div", {
                    class: "uppy uppy-Informer",
                    "aria-hidden": r
                }, cn("p", {
                    role: "alert"
                }, i, " ", o && cn("span", {
                    "aria-label": o,
                    "data-microtip-position": "top-left",
                    "data-microtip-size": "medium",
                    role: "tooltip",
                    onclick: function () {
                        alert(i + " \n\n " + o)
                    },
                    onMouseOver: function () {
                        clearTimeout(n.uppy.infoTimeoutID)
                    },
                    onMouseLeave: function () {
                        n.uppy.infoTimeoutID = setTimeout(n.uppy.hideInfo, 2e3)
                    }
                }, "?")))
            }, n.type = "progressindicator", n.id = n.opts.id || "Informer", n.title = "Informer", n.opts = un({}, {}, r), n
        }
        return r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r, n.prototype.install = function () {
            var e = this.opts.target;
            e && this.mount(e, this)
        }, n
    }(ln), on.VERSION = "1.5.11", sn), dn = function (e, t, r) {
        var n = e.split(",")[1],
            i = t.mimeType || e.split(",")[0].split(":")[1].split(";")[0];
        null == i && (i = "plain/text");
        for (var o, s = atob(n), a = [], u = 0; u < s.length; u++) a.push(s.charCodeAt(u));
        try {
            o = new Uint8Array(a)
        } catch (yc) {
            return null
        }
        return r ? new File([o], t.name || "", {
            type: i
        }) : new Blob([o], {
            type: i
        })
    }, hn = function (e) {
        return 0 === e.indexOf("blob:")
    }, fn = Math.log2 || function (e) {
        return Math.log(e) * Math.LOG2E
    }, yn = {
        toByteArray: function (e) {
            var t, r, n = Sn(e),
                i = n[0],
                o = n[1],
                s = new mn(function (e, t, r) {
                    return 3 * (t + r) / 4 - r
                }(0, i, o)),
                a = 0,
                u = o > 0 ? i - 4 : i;
            for (r = 0; r < u; r += 4) t = vn[e.charCodeAt(r)] << 18 | vn[e.charCodeAt(r + 1)] << 12 | vn[e.charCodeAt(r + 2)] << 6 | vn[e.charCodeAt(r + 3)], s[a++] = t >> 16 & 255, s[a++] = t >> 8 & 255, s[a++] = 255 & t;
            return 2 === o && (t = vn[e.charCodeAt(r)] << 2 | vn[e.charCodeAt(r + 1)] >> 4, s[a++] = 255 & t), 1 === o && (t = vn[e.charCodeAt(r)] << 10 | vn[e.charCodeAt(r + 1)] << 4 | vn[e.charCodeAt(r + 2)] >> 2, s[a++] = t >> 8 & 255, s[a++] = 255 & t), s
        },
        fromByteArray: function (e) {
            for (var t, r = e.length, n = r % 3, i = [], o = 0, s = r - n; o < s; o += 16383) i.push(kn(e, o, o + 16383 > s ? s : o + 16383));
            return 1 === n ? (t = e[r - 1], i.push(gn[t >> 2] + gn[t << 4 & 63] + "==")) : 2 === n && (t = (e[r - 2] << 8) + e[r - 1], i.push(gn[t >> 10] + gn[t >> 4 & 63] + gn[t << 2 & 63] + "=")), i.join("")
        }
    }, gn = [], vn = [], mn = "undefined" != typeof Uint8Array ? Uint8Array : Array, bn = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", wn = 0, _n = bn.length; wn < _n; ++wn) gn[wn] = bn[wn], vn[bn.charCodeAt(wn)] = wn;

    function Sn(e) {
        var t = e.length;
        if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
        var r = e.indexOf("=");
        return -1 === r && (r = t), [r, r === t ? 0 : 4 - r % 4]
    }

    function kn(e, t, r) {
        for (var n, i, o = [], s = t; s < r; s += 3) n = (e[s] << 16 & 16711680) + (e[s + 1] << 8 & 65280) + (255 & e[s + 2]), o.push(gn[(i = n) >> 18 & 63] + gn[i >> 12 & 63] + gn[i >> 6 & 63] + gn[63 & i]);
        return o.join("")
    }
    vn["-".charCodeAt(0)] = 62, vn["_".charCodeAt(0)] = 63;
    var Pn, Cn, En = {
        read: function (e, t, r, n, i) {
            var o, s, a = 8 * i - n - 1,
                u = (1 << a) - 1,
                l = u >> 1,
                c = -7,
                p = r ? i - 1 : 0,
                d = r ? -1 : 1,
                h = e[t + p];
            for (p += d, o = h & (1 << -c) - 1, h >>= -c, c += a; c > 0; o = 256 * o + e[t + p], p += d, c -= 8);
            for (s = o & (1 << -c) - 1, o >>= -c, c += n; c > 0; s = 256 * s + e[t + p], p += d, c -= 8);
            if (0 === o) o = 1 - l;
            else {
                if (o === u) return s ? NaN : 1 / 0 * (h ? -1 : 1);
                s += Math.pow(2, n), o -= l
            }
            return (h ? -1 : 1) * s * Math.pow(2, o - n)
        },
        write: function (e, t, r, n, i, o) {
            var s, a, u, l = 8 * o - i - 1,
                c = (1 << l) - 1,
                p = c >> 1,
                d = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                h = n ? 0 : o - 1,
                f = n ? 1 : -1,
                y = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
            for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0, s = c) : (s = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -s)) < 1 && (s--, u *= 2), (t += s + p >= 1 ? d / u : d * Math.pow(2, 1 - p)) * u >= 2 && (s++, u /= 2), s + p >= c ? (a = 0, s = c) : s + p >= 1 ? (a = (t * u - 1) * Math.pow(2, i), s += p) : (a = t * Math.pow(2, p - 1) * Math.pow(2, i), s = 0)); i >= 8; e[r + h] = 255 & a, h += f, a /= 256, i -= 8);
            for (s = s << i | a, l += i; l > 0; e[r + h] = 255 & s, h += f, s /= 256, l -= 8);
            e[r + h - f] |= 128 * y
        }
    },
        An = {
            exports: {}
        };

    function Fn() {
        return (Fn = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    } (function (e, t, r) {
        var n, i;
        n = this, i = function (n) {
            "use strict";

            function i(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function o(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }

            function s(e, t, r) {
                return t && o(e.prototype, t), r && o(e, r), e
            }

            function a(e, t, r) {
                return t in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }

            function u(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                });
                var r = ["prototype", "__proto__", "caller", "arguments", "length", "name"];
                Object.getOwnPropertyNames(t).forEach((function (n) {
                    -1 === r.indexOf(n) && e[n] !== t[n] && (e[n] = t[n])
                })), t && c(e, t)
            }

            function l(e) {
                return (l = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                })(e)
            }

            function c(e, t) {
                return (c = Object.setPrototypeOf || function (e, t) {
                    return e.__proto__ = t, e
                })(e, t)
            }

            function p(e, t, r) {
                return (p = function () {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Date.prototype.toString.call(Reflect.construct(Date, [], (function () { }))), !0
                    } catch (e) {
                        return !1
                    }
                }() ? Reflect.construct : function (e, t, r) {
                    var n = [null];
                    n.push.apply(n, t);
                    var i = new (Function.bind.apply(e, n));
                    return r && c(i, r.prototype), i
                }).apply(null, arguments)
            }

            function d(e) {
                var t = "function" == typeof Map ? new Map : void 0;
                return (d = function (e) {
                    if (null === e || (r = e, -1 === Function.toString.call(r).indexOf("[native code]"))) return e;
                    var r;
                    if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
                    if (void 0 !== t) {
                        if (t.has(e)) return t.get(e);
                        t.set(e, n)
                    }

                    function n() {
                        return p(e, arguments, l(this).constructor)
                    }
                    return n.prototype = Object.create(e.prototype, {
                        constructor: {
                            value: n,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), c(n, e)
                })(e)
            }

            function h(e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }

            function f(e, t) {
                return !t || "object" != typeof t && "function" != typeof t ? h(e) : t
            }

            function y(e, t, r) {
                return (y = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (e, t, r) {
                    var n = function (e, t) {
                        for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = l(e)););
                        return e
                    }(e, t);
                    if (n) {
                        var i = Object.getOwnPropertyDescriptor(n, t);
                        return i.get ? i.get.call(r) : i.value
                    }
                })(e, t, r || e)
            }
            var g = Object.values || function (e) {
                var t = [];
                for (var r in e) t.push(e[r]);
                return t
            },
                v = Object.entries || function (e) {
                    var t = [];
                    for (var r in e) t.push([r, e[r]]);
                    return t
                },
                m = Object.assign || function (e) {
                    for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) r[n - 1] = arguments[n];
                    return r.forEach((function (t) {
                        for (var r in t) e[r] = t[r]
                    })), e
                },
                b = Object.fromEntries || function (e) {
                    var t = {};
                    return w(e).forEach((function (e) {
                        var r = e[0],
                            n = e[1];
                        t[r] = n
                    })), t
                },
                w = Array.from || function (e) {
                    if (e instanceof E) {
                        var t = [];
                        return e.forEach((function (e, r) {
                            return t.push([r, e])
                        })), t
                    }
                    return Array.prototype.slice.call(e)
                };

            function _(e) {
                return -1 !== this.indexOf(e)
            }
            Array.prototype.includes || (Array.prototype.includes = _), String.prototype.includes || (String.prototype.includes = _), String.prototype.startsWith || (String.prototype.startsWith = function (e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                return this.substring(t, t + e.length) === e
            }), String.prototype.endsWith || (String.prototype.endsWith = function (e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.length;
                return this.substring(t - e.length, t) === e
            });
            var S = "undefined" != typeof self ? self : t,
                k = S.fetch || function (e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return new Promise((function (r, n) {
                        var i = new XMLHttpRequest;
                        if (i.open("get", e, !0), i.responseType = "arraybuffer", i.onerror = n, t.headers)
                            for (var o in t.headers) i.setRequestHeader(o, t.headers[o]);
                        i.onload = function () {
                            r({
                                ok: i.status >= 200 && i.status < 300,
                                status: i.status,
                                arrayBuffer: function () {
                                    return Promise.resolve(i.response)
                                }
                            })
                        }, i.send(null)
                    }))
                },
                P = function (e) {
                    var t = [];
                    if (Object.defineProperties(t, {
                        size: {
                            get: function () {
                                return this.length
                            }
                        },
                        has: {
                            value: function (e) {
                                return -1 !== this.indexOf(e)
                            }
                        },
                        add: {
                            value: function (e) {
                                this.has(e) || this.push(e)
                            }
                        },
                        delete: {
                            value: function (e) {
                                if (this.has(e)) {
                                    var t = this.indexOf(e);
                                    this.splice(t, 1)
                                }
                            }
                        }
                    }), Array.isArray(e))
                        for (var r = 0; r < e.length; r++) t.add(e[r]);
                    return t
                },
                C = function (e) {
                    return new E(e)
                },
                E = void 0 !== S.Map && void 0 !== S.Map.prototype.keys ? S.Map : function () {
                    function e(t) {
                        if (i(this, e), this.clear(), t)
                            for (var r = 0; r < t.length; r++) this.set(t[r][0], t[r][1])
                    }
                    return s(e, [{
                        key: "clear",
                        value: function () {
                            this._map = {}, this._keys = []
                        }
                    }, {
                        key: "get",
                        value: function (e) {
                            return this._map["map_" + e]
                        }
                    }, {
                        key: "set",
                        value: function (e, t) {
                            return this._map["map_" + e] = t, this._keys.indexOf(e) < 0 && this._keys.push(e), this
                        }
                    }, {
                        key: "has",
                        value: function (e) {
                            return this._keys.indexOf(e) >= 0
                        }
                    }, {
                        key: "delete",
                        value: function (e) {
                            var t = this._keys.indexOf(e);
                            return !(t < 0 || (delete this._map["map_" + e], this._keys.splice(t, 1), 0))
                        }
                    }, {
                        key: "keys",
                        value: function () {
                            return this._keys.slice(0)
                        }
                    }, {
                        key: "values",
                        value: function () {
                            var e = this;
                            return this._keys.map((function (t) {
                                return e.get(t)
                            }))
                        }
                    }, {
                        key: "entries",
                        value: function () {
                            var e = this;
                            return this._keys.map((function (t) {
                                return [t, e.get(t)]
                            }))
                        }
                    }, {
                        key: "forEach",
                        value: function (e, t) {
                            for (var r = 0; r < this._keys.length; r++) e.call(t, this._map["map_" + this._keys[r]], this._keys[r], this)
                        }
                    }, {
                        key: "size",
                        get: function () {
                            return this._keys.length
                        }
                    }]), e
                }(),
                A = "undefined" != typeof self ? self : t,
                F = "undefined" != typeof navigator,
                O = F && "undefined" == typeof HTMLImageElement,
                U = !(void 0 === t || void 0 === e || !e.versions || !e.versions.node),
                R = A.Buffer,
                T = !!R,
                x = function (e) {
                    return void 0 !== e
                };

            function D(e) {
                return void 0 === e || (e instanceof E ? 0 === e.size : 0 === g(e).filter(x).length)
            }

            function B(e) {
                var t = new Error(e);
                throw delete t.stack, t
            }

            function I(e) {
                var t = function (e) {
                    var t = 0;
                    return e.ifd0.enabled && (t += 1024), e.exif.enabled && (t += 2048), e.makerNote && (t += 2048), e.userComment && (t += 1024), e.gps.enabled && (t += 512), e.interop.enabled && (t += 100), e.ifd1.enabled && (t += 1024), t + 2048
                }(e);
                return e.jfif.enabled && (t += 50), e.xmp.enabled && (t += 2e4), e.iptc.enabled && (t += 14e3), e.icc.enabled && (t += 6e3), t
            }
            var j = "undefined" != typeof TextDecoder ? new TextDecoder("utf-8") : void 0,
                L = function () {
                    function e(t) {
                        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                            n = arguments.length > 2 ? arguments[2] : void 0,
                            o = arguments.length > 3 ? arguments[3] : void 0;
                        if (i(this, e), "boolean" == typeof o && (this.le = o), Array.isArray(t) && (t = new Uint8Array(t)), 0 === t) this.byteOffset = 0, this.byteLength = 0;
                        else if (t instanceof ArrayBuffer) {
                            void 0 === n && (n = t.byteLength - r);
                            var s = new DataView(t, r, n);
                            this._swapDataView(s)
                        } else if (t instanceof Uint8Array || t instanceof DataView || t instanceof e) {
                            void 0 === n && (n = t.byteLength - r), (r += t.byteOffset) + n > t.byteOffset + t.byteLength && B("Creating view outside of available memory in ArrayBuffer");
                            var a = new DataView(t.buffer, r, n);
                            this._swapDataView(a)
                        } else if ("number" == typeof t) {
                            var u = new DataView(new ArrayBuffer(t));
                            this._swapDataView(u)
                        } else B("Invalid input argument for BufferView: " + t)
                    }
                    return s(e, null, [{
                        key: "from",
                        value: function (t, r) {
                            return t instanceof this && t.le === r ? t : new e(t, void 0, void 0, r)
                        }
                    }]), s(e, [{
                        key: "_swapArrayBuffer",
                        value: function (e) {
                            this._swapDataView(new DataView(e))
                        }
                    }, {
                        key: "_swapBuffer",
                        value: function (e) {
                            this._swapDataView(new DataView(e.buffer, e.byteOffset, e.byteLength))
                        }
                    }, {
                        key: "_swapDataView",
                        value: function (e) {
                            this.dataView = e, this.buffer = e.buffer, this.byteOffset = e.byteOffset, this.byteLength = e.byteLength
                        }
                    }, {
                        key: "_lengthToEnd",
                        value: function (e) {
                            return this.byteLength - e
                        }
                    }, {
                        key: "set",
                        value: function (t, r) {
                            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : e;
                            return t instanceof DataView || t instanceof e ? t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : t instanceof ArrayBuffer && (t = new Uint8Array(t)), t instanceof Uint8Array || B("BufferView.set(): Invalid data argument."), this.toUint8().set(t, r), new n(this, r, t.byteLength)
                        }
                    }, {
                        key: "subarray",
                        value: function (t, r) {
                            return new e(this, t, r = r || this._lengthToEnd(t))
                        }
                    }, {
                        key: "toUint8",
                        value: function () {
                            return new Uint8Array(this.buffer, this.byteOffset, this.byteLength)
                        }
                    }, {
                        key: "getUint8Array",
                        value: function (e, t) {
                            return new Uint8Array(this.buffer, this.byteOffset + e, t)
                        }
                    }, {
                        key: "getString",
                        value: function () {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.byteLength;
                            return function (e) {
                                return j ? j.decode(e) : T ? r.from(e).toString("utf8") : decodeURIComponent(escape(String.fromCharCode.apply(null, e)))
                            }(this.getUint8Array(e, t))
                        }
                    }, {
                        key: "getUnicodeString",
                        value: function () {
                            for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.byteLength, r = [], n = 0; n < t && e + n < this.byteLength; n += 2) r.push(this.getUint16(e + n));
                            return r.map((function (e) {
                                return String.fromCharCode(e)
                            })).join("")
                        }
                    }, {
                        key: "getInt8",
                        value: function (e) {
                            return this.dataView.getInt8(e)
                        }
                    }, {
                        key: "getUint8",
                        value: function (e) {
                            return this.dataView.getUint8(e)
                        }
                    }, {
                        key: "getInt16",
                        value: function (e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.le;
                            return this.dataView.getInt16(e, t)
                        }
                    }, {
                        key: "getInt32",
                        value: function (e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.le;
                            return this.dataView.getInt32(e, t)
                        }
                    }, {
                        key: "getUint16",
                        value: function (e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.le;
                            return this.dataView.getUint16(e, t)
                        }
                    }, {
                        key: "getUint32",
                        value: function (e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.le;
                            return this.dataView.getUint32(e, t)
                        }
                    }, {
                        key: "getFloat32",
                        value: function (e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.le;
                            return this.dataView.getFloat32(e, t)
                        }
                    }, {
                        key: "getFloat64",
                        value: function (e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.le;
                            return this.dataView.getFloat64(e, t)
                        }
                    }, {
                        key: "getFloat",
                        value: function (e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.le;
                            return this.dataView.getFloat32(e, t)
                        }
                    }, {
                        key: "getDouble",
                        value: function (e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.le;
                            return this.dataView.getFloat64(e, t)
                        }
                    }, {
                        key: "getUintBytes",
                        value: function (e, t, r) {
                            switch (t) {
                                case 1:
                                    return this.getUint8(e, r);
                                case 2:
                                    return this.getUint16(e, r);
                                case 4:
                                    return this.getUint32(e, r);
                                case 8:
                                    return this.getUint64 && this.getUint64(e, r)
                            }
                        }
                    }, {
                        key: "getUint",
                        value: function (e, t, r) {
                            switch (t) {
                                case 8:
                                    return this.getUint8(e, r);
                                case 16:
                                    return this.getUint16(e, r);
                                case 32:
                                    return this.getUint32(e, r);
                                case 64:
                                    return this.getUint64 && this.getUint64(e, r)
                            }
                        }
                    }, {
                        key: "toString",
                        value: function (e) {
                            return this.dataView.toString(e, this.constructor.name)
                        }
                    }, {
                        key: "ensureChunk",
                        value: function () { }
                    }]), e
                }();

            function M(e, t) {
                B("".concat(e, " '").concat(t, "' was not loaded, try using full build of exifr."))
            }
            var N = function (e) {
                function t(e) {
                    var r;
                    return i(this, t), (r = f(this, l(t).call(this))).kind = e, r
                }
                return u(t, d(E)), s(t, [{
                    key: "get",
                    value: function (e, r) {
                        return this.has(e) || M(this.kind, e), r && (e in r || function (e, t) {
                            B("Unknown ".concat(e, " '").concat(t, "'."))
                        }(this.kind, e), r[e].enabled || M(this.kind, e)), y(l(t.prototype), "get", this).call(this, e)
                    }
                }, {
                    key: "keyList",
                    value: function () {
                        return w(this.keys())
                    }
                }]), t
            }(),
                z = new N("file parser"),
                q = new N("segment parser"),
                H = new N("file reader");

            function V(e) {
                return function () {
                    for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                    try {
                        return Promise.resolve(e.apply(this, t))
                    } catch (e) {
                        return Promise.reject(e)
                    }
                }
            }

            function W(e, t, r) {
                return r ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e)
            }
            var X = V((function (e) {
                return new Promise((function (t, r) {
                    var n = new FileReader;
                    n.onloadend = function () {
                        return t(n.result || new ArrayBuffer)
                    }, n.onerror = r, n.readAsArrayBuffer(e)
                }))
            })),
                G = V((function (e) {
                    return k(e).then((function (e) {
                        return e.arrayBuffer()
                    }))
                })),
                K = V((function (e, t) {
                    return W(t(e), (function (e) {
                        return new L(e)
                    }))
                })),
                $ = V((function (e, t, r) {
                    var n = new (H.get(r))(e, t);
                    return W(n.read(), (function () {
                        return n
                    }))
                })),
                Y = V((function (e, t, r, n) {
                    return H.has(r) ? $(e, t, r) : n ? K(e, n) : (B("Parser ".concat(r, " is not loaded")), W())
                }));

            function J(e, t) {
                return (r = e).startsWith("data:") || r.length > 1e4 ? $(e, t, "base64") : F ? Y(e, t, "url", G) : U ? $(e, t, "fs") : void B("Invalid input argument");
                var r
            }
            var Q = function (e) {
                function t() {
                    return i(this, t), f(this, l(t).apply(this, arguments))
                }
                return u(t, d(E)), s(t, [{
                    key: "tagKeys",
                    get: function () {
                        return this.allKeys || (this.allKeys = w(this.keys())), this.allKeys
                    }
                }, {
                    key: "tagValues",
                    get: function () {
                        return this.allValues || (this.allValues = w(this.values())), this.allValues
                    }
                }]), t
            }();

            function Z(e, t, r) {
                var n = new Q,
                    i = r;
                Array.isArray(i) || ("function" == typeof i.entries && (i = i.entries()), i = w(i));
                for (var o = 0; o < i.length; o++) {
                    var s = i[o],
                        a = s[0],
                        u = s[1];
                    n.set(a, u)
                }
                if (Array.isArray(t)) {
                    var l = t;
                    Array.isArray(l) || ("function" == typeof l.entries && (l = l.entries()), l = w(l));
                    for (var c = 0; c < l.length; c++) {
                        var p = l[c];
                        e.set(p, n)
                    }
                } else e.set(t, n);
                return n
            }

            function ee(e, t, r) {
                var n, i = e.get(t),
                    o = r;
                Array.isArray(o) || ("function" == typeof o.entries && (o = o.entries()), o = w(o));
                for (var s = 0; s < o.length; s++) n = o[s], i.set(n[0], n[1])
            }
            var te = C(),
                re = C(),
                ne = C(),
                ie = ["chunked", "firstChunkSize", "firstChunkSizeNode", "firstChunkSizeBrowser", "chunkSize", "chunkLimit"],
                oe = ["jfif", "xmp", "icc", "iptc"],
                se = ["tiff"].concat(oe),
                ae = ["ifd0", "ifd1", "exif", "gps", "interop"],
                ue = [].concat(se, ae),
                le = ["makerNote", "userComment"],
                ce = ["translateKeys", "translateValues", "reviveValues", "multiSegment"],
                pe = [].concat(ce, ["sanitize", "mergeOutput"]),
                de = function () {
                    function e() {
                        i(this, e)
                    }
                    return s(e, [{
                        key: "translate",
                        get: function () {
                            return this.translateKeys || this.translateValues || this.reviveValues
                        }
                    }]), e
                }(),
                he = function (e) {
                    function t(e, r, n, o) {
                        var s;
                        if (i(this, t), a(h(s = f(this, l(t).call(this))), "enabled", !1), a(h(s), "skip", P()), a(h(s), "pick", P()), a(h(s), "deps", P()), a(h(s), "translateKeys", !1), a(h(s), "translateValues", !1), a(h(s), "reviveValues", !1), s.key = e, s.enabled = r, s.parse = s.enabled, s.applyInheritables(o), s.canBeFiltered = ae.includes(e), s.canBeFiltered && (s.dict = te.get(e)), void 0 !== n)
                            if (Array.isArray(n)) s.parse = s.enabled = !0, s.canBeFiltered && n.length > 0 && s.translateTagSet(n, s.pick);
                            else if ("object" == typeof n) {
                                if (s.enabled = !0, s.parse = !1 !== n.parse, s.canBeFiltered) {
                                    var u = n.pick,
                                        c = n.skip;
                                    u && u.length > 0 && s.translateTagSet(u, s.pick), c && c.length > 0 && s.translateTagSet(c, s.skip)
                                }
                                s.applyInheritables(n)
                            } else !0 === n || !1 === n ? s.parse = s.enabled = n : B("Invalid options argument: ".concat(n));
                        return s
                    }
                    return u(t, de), s(t, [{
                        key: "needed",
                        get: function () {
                            return this.enabled || this.deps.size > 0
                        }
                    }]), s(t, [{
                        key: "applyInheritables",
                        value: function (e) {
                            var t, r, n = ce;
                            Array.isArray(n) || ("function" == typeof n.entries && (n = n.entries()), n = w(n));
                            for (var i = 0; i < n.length; i++) void 0 !== (r = e[t = n[i]]) && (this[t] = r)
                        }
                    }, {
                        key: "translateTagSet",
                        value: function (e, t) {
                            if (this.dict) {
                                var r, n, i = this.dict,
                                    o = i.tagKeys,
                                    s = i.tagValues,
                                    a = e;
                                Array.isArray(a) || ("function" == typeof a.entries && (a = a.entries()), a = w(a));
                                for (var u = 0; u < a.length; u++) "string" == typeof (r = a[u]) ? (-1 === (n = s.indexOf(r)) && (n = o.indexOf(Number(r))), -1 !== n && t.add(Number(o[n]))) : t.add(r)
                            } else {
                                var l = e;
                                Array.isArray(l) || ("function" == typeof l.entries && (l = l.entries()), l = w(l));
                                for (var c = 0; c < l.length; c++) {
                                    var p = l[c];
                                    t.add(p)
                                }
                            }
                        }
                    }, {
                        key: "finalizeFilters",
                        value: function () {
                            !this.enabled && this.deps.size > 0 ? (this.enabled = !0, be(this.pick, this.deps)) : this.enabled && this.pick.size > 0 && be(this.pick, this.deps)
                        }
                    }]), t
                }(),
                fe = {
                    jfif: !1,
                    tiff: !0,
                    xmp: !1,
                    icc: !1,
                    iptc: !1,
                    ifd0: !0,
                    ifd1: !1,
                    exif: !0,
                    gps: !0,
                    interop: !1,
                    makerNote: !1,
                    userComment: !1,
                    multiSegment: !1,
                    skip: [],
                    pick: [],
                    translateKeys: !0,
                    translateValues: !0,
                    reviveValues: !0,
                    sanitize: !0,
                    mergeOutput: !0,
                    silentErrors: !0,
                    chunked: !0,
                    firstChunkSize: void 0,
                    firstChunkSizeNode: 512,
                    firstChunkSizeBrowser: 65536,
                    chunkSize: 65536,
                    chunkLimit: 5
                },
                ye = C(),
                ge = function (e) {
                    function t(e) {
                        var r;
                        return i(this, t), r = f(this, l(t).call(this)), !0 === e ? r.setupFromTrue() : void 0 === e ? r.setupFromUndefined() : Array.isArray(e) ? r.setupFromArray(e) : "object" == typeof e ? r.setupFromObject(e) : B("Invalid options argument ".concat(e)), void 0 === r.firstChunkSize && (r.firstChunkSize = F ? r.firstChunkSizeBrowser : r.firstChunkSizeNode), r.mergeOutput && (r.ifd1.enabled = !1), r.filterNestedSegmentTags(), r.traverseTiffDependencyTree(), r.checkLoadedPlugins(), r
                    }
                    return u(t, de), s(t, null, [{
                        key: "useCached",
                        value: function (e) {
                            var t = ye.get(e);
                            return void 0 !== t || (t = new this(e), ye.set(e, t)), t
                        }
                    }]), s(t, [{
                        key: "setupFromUndefined",
                        value: function () {
                            var e, t = ie;
                            Array.isArray(t) || ("function" == typeof t.entries && (t = t.entries()), t = w(t));
                            for (var r = 0; r < t.length; r++) this[e = t[r]] = fe[e];
                            var n = pe;
                            Array.isArray(n) || ("function" == typeof n.entries && (n = n.entries()), n = w(n));
                            for (var i = 0; i < n.length; i++) this[e = n[i]] = fe[e];
                            var o = le;
                            Array.isArray(o) || ("function" == typeof o.entries && (o = o.entries()), o = w(o));
                            for (var s = 0; s < o.length; s++) this[e = o[s]] = fe[e];
                            var a = ue;
                            Array.isArray(a) || ("function" == typeof a.entries && (a = a.entries()), a = w(a));
                            for (var u = 0; u < a.length; u++) this[e = a[u]] = new he(e, fe[e], void 0, this)
                        }
                    }, {
                        key: "setupFromTrue",
                        value: function () {
                            var e, t = ie;
                            Array.isArray(t) || ("function" == typeof t.entries && (t = t.entries()), t = w(t));
                            for (var r = 0; r < t.length; r++) this[e = t[r]] = fe[e];
                            var n = pe;
                            Array.isArray(n) || ("function" == typeof n.entries && (n = n.entries()), n = w(n));
                            for (var i = 0; i < n.length; i++) this[e = n[i]] = fe[e];
                            var o = le;
                            Array.isArray(o) || ("function" == typeof o.entries && (o = o.entries()), o = w(o));
                            for (var s = 0; s < o.length; s++) this[e = o[s]] = !0;
                            var a = ue;
                            Array.isArray(a) || ("function" == typeof a.entries && (a = a.entries()), a = w(a));
                            for (var u = 0; u < a.length; u++) this[e = a[u]] = new he(e, !0, void 0, this)
                        }
                    }, {
                        key: "setupFromArray",
                        value: function (e) {
                            var t, r = ie;
                            Array.isArray(r) || ("function" == typeof r.entries && (r = r.entries()), r = w(r));
                            for (var n = 0; n < r.length; n++) this[t = r[n]] = fe[t];
                            var i = pe;
                            Array.isArray(i) || ("function" == typeof i.entries && (i = i.entries()), i = w(i));
                            for (var o = 0; o < i.length; o++) this[t = i[o]] = fe[t];
                            var s = le;
                            Array.isArray(s) || ("function" == typeof s.entries && (s = s.entries()), s = w(s));
                            for (var a = 0; a < s.length; a++) this[t = s[a]] = fe[t];
                            var u = ue;
                            Array.isArray(u) || ("function" == typeof u.entries && (u = u.entries()), u = w(u));
                            for (var l = 0; l < u.length; l++) this[t = u[l]] = new he(t, !1, void 0, this);
                            this.setupGlobalFilters(e, void 0, ae)
                        }
                    }, {
                        key: "setupFromObject",
                        value: function (e) {
                            var t;
                            ae.ifd0 = ae.ifd0 || ae.image, ae.ifd1 = ae.ifd1 || ae.thumbnail, m(this, e);
                            var r = ie;
                            Array.isArray(r) || ("function" == typeof r.entries && (r = r.entries()), r = w(r));
                            for (var n = 0; n < r.length; n++) this[t = r[n]] = me(e[t], fe[t]);
                            var i = pe;
                            Array.isArray(i) || ("function" == typeof i.entries && (i = i.entries()), i = w(i));
                            for (var o = 0; o < i.length; o++) this[t = i[o]] = me(e[t], fe[t]);
                            var s = le;
                            Array.isArray(s) || ("function" == typeof s.entries && (s = s.entries()), s = w(s));
                            for (var a = 0; a < s.length; a++) this[t = s[a]] = me(e[t], fe[t]);
                            var u = se;
                            Array.isArray(u) || ("function" == typeof u.entries && (u = u.entries()), u = w(u));
                            for (var l = 0; l < u.length; l++) this[t = u[l]] = new he(t, fe[t], e[t], this);
                            var c = ae;
                            Array.isArray(c) || ("function" == typeof c.entries && (c = c.entries()), c = w(c));
                            for (var p = 0; p < c.length; p++) this[t = c[p]] = new he(t, fe[t], e[t], this.tiff);
                            this.setupGlobalFilters(e.pick, e.skip, ae, ue), !0 === e.tiff ? this.batchEnableWithBool(ae, !0) : !1 === e.tiff ? this.batchEnableWithUserValue(ae, e) : Array.isArray(e.tiff) ? this.setupGlobalFilters(e.tiff, void 0, ae) : "object" == typeof e.tiff && this.setupGlobalFilters(e.tiff.pick, e.tiff.skip, ae)
                        }
                    }, {
                        key: "batchEnableWithBool",
                        value: function (e, t) {
                            var r = e;
                            Array.isArray(r) || ("function" == typeof r.entries && (r = r.entries()), r = w(r));
                            for (var n = 0; n < r.length; n++) this[r[n]].enabled = t
                        }
                    }, {
                        key: "batchEnableWithUserValue",
                        value: function (e, t) {
                            var r = e;
                            Array.isArray(r) || ("function" == typeof r.entries && (r = r.entries()), r = w(r));
                            for (var n = 0; n < r.length; n++) {
                                var i = r[n],
                                    o = t[i];
                                this[i].enabled = !1 !== o && void 0 !== o
                            }
                        }
                    }, {
                        key: "setupGlobalFilters",
                        value: function (e, t, r) {
                            var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : r;
                            if (e && e.length) {
                                var i = n;
                                Array.isArray(i) || ("function" == typeof i.entries && (i = i.entries()), i = w(i));
                                for (var o = 0; o < i.length; o++) this[i[o]].enabled = !1;
                                var s = ve(e, r);
                                Array.isArray(s) || ("function" == typeof s.entries && (s = s.entries()), s = w(s));
                                for (var a = 0; a < s.length; a++) {
                                    var u = s[a],
                                        l = u[0],
                                        c = u[1];
                                    be(this[l].pick, c), this[l].enabled = !0
                                }
                            } else if (t && t.length) {
                                var p = ve(t, r);
                                Array.isArray(p) || ("function" == typeof p.entries && (p = p.entries()), p = w(p));
                                for (var d = 0; d < p.length; d++) {
                                    var h = p[d],
                                        f = h[0],
                                        y = h[1];
                                    be(this[f].skip, y)
                                }
                            }
                        }
                    }, {
                        key: "filterNestedSegmentTags",
                        value: function () {
                            var e = this.ifd0,
                                t = this.exif,
                                r = this.xmp,
                                n = this.iptc,
                                i = this.icc;
                            this.makerNote ? t.deps.add(37500) : t.skip.add(37500), this.userComment ? t.deps.add(37510) : t.skip.add(37510), r.enabled || e.skip.add(700), n.enabled || e.skip.add(33723), i.enabled || e.skip.add(34675)
                        }
                    }, {
                        key: "traverseTiffDependencyTree",
                        value: function () {
                            var e = this,
                                t = this.ifd0,
                                r = this.exif,
                                n = this.gps;
                            this.interop.needed && (r.deps.add(40965), t.deps.add(40965)), r.needed && t.deps.add(34665), n.needed && t.deps.add(34853), this.tiff.enabled = ae.some((function (t) {
                                return !0 === e[t].enabled
                            })) || this.makerNote || this.userComment;
                            var i = ae;
                            Array.isArray(i) || ("function" == typeof i.entries && (i = i.entries()), i = w(i));
                            for (var o = 0; o < i.length; o++) this[i[o]].finalizeFilters()
                        }
                    }, {
                        key: "checkLoadedPlugins",
                        value: function () {
                            var e = se;
                            Array.isArray(e) || ("function" == typeof e.entries && (e = e.entries()), e = w(e));
                            for (var t = 0; t < e.length; t++) {
                                var r = e[t];
                                this[r].enabled && !q.has(r) && M("segment parser", r)
                            }
                        }
                    }, {
                        key: "onlyTiff",
                        get: function () {
                            var e = this;
                            return !oe.map((function (t) {
                                return e[t].enabled
                            })).some((function (e) {
                                return !0 === e
                            })) && this.tiff.enabled
                        }
                    }]), t
                }();

            function ve(e, t) {
                var r, n, i, o = [],
                    s = t;
                Array.isArray(s) || ("function" == typeof s.entries && (s = s.entries()), s = w(s));
                for (var a = 0; a < s.length; a++) {
                    n = s[a], r = [];
                    var u = te.get(n);
                    Array.isArray(u) || ("function" == typeof u.entries && (u = u.entries()), u = w(u));
                    for (var l = 0; l < u.length; l++) i = u[l], (e.includes(i[0]) || e.includes(i[1])) && r.push(i[0]);
                    r.length && o.push([n, r])
                }
                return o
            }

            function me(e, t) {
                return void 0 !== e ? e : void 0 !== t ? t : void 0
            }

            function be(e, t) {
                var r = t;
                Array.isArray(r) || ("function" == typeof r.entries && (r = r.entries()), r = w(r));
                for (var n = 0; n < r.length; n++) {
                    var i = r[n];
                    e.add(i)
                }
            }

            function we(e, t, r) {
                return r ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e)
            }

            function _e(e, t) {
                var r = e();
                return r && r.then ? r.then(t) : t(r)
            }

            function Se() { }
            a(ge, "default", fe);
            var ke, Pe = function () {
                function e(t) {
                    i(this, e), a(this, "parsers", {}), this.options = ge.useCached(t)
                }
                return s(e, [{
                    key: "setup",
                    value: function () {
                        if (!this.fileParser) {
                            var e = this.file,
                                t = e.getUint16(0),
                                r = z;
                            Array.isArray(r) || ("function" == typeof r.entries && (r = r.entries()), r = w(r));
                            for (var n = 0; n < r.length; n++) {
                                var i = r[n],
                                    o = i[0],
                                    s = i[1];
                                if (s.canHandle(e, t)) return this.fileParser = new s(this.options, this.file, this.parsers), e[o] = !0
                            }
                            B("Unknown file format")
                        }
                    }
                }, {
                    key: "read",
                    value: function (e) {
                        try {
                            var t = this;
                            return we(function (e, t) {
                                return "string" == typeof e ? J(e, t) : F && !O && e instanceof HTMLImageElement ? J(e.src, t) : e instanceof Uint8Array || e instanceof ArrayBuffer || e instanceof DataView ? new L(e) : F && e instanceof Blob ? Y(e, t, "blob", X) : void B("Invalid input argument")
                            }(e, t.options), (function (e) {
                                t.file = e
                            }))
                        } catch (e) {
                            return Promise.reject(e)
                        }
                    }
                }, {
                    key: "parse",
                    value: function () {
                        try {
                            var e = this;
                            return e.setup(), we(e.fileParser.parse(), (function () {
                                var t, r = {},
                                    n = [],
                                    i = g(e.parsers).map((t = function (t) {
                                        var i;
                                        return _e((function () {
                                            return e.options.silentErrors ? (o = function () {
                                                n.push.apply(n, t.errors)
                                            }, (r = function (e, t) {
                                                try {
                                                    var r = e()
                                                } catch (e) {
                                                    return t(e)
                                                }
                                                return r && r.then ? r.then(void 0, t) : r
                                            }((function () {
                                                return we(t.parse(), (function (e) {
                                                    i = e
                                                }))
                                            }), (function (e) {
                                                n.push(e)
                                            }))) && r.then ? r.then(o) : o()) : we(t.parse(), (function (e) {
                                                i = e
                                            }));
                                            var r, o
                                        }), (function () {
                                            t.assignToOutput(r, i)
                                        }))
                                    }, function () {
                                        for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
                                        try {
                                            return Promise.resolve(t.apply(this, e))
                                        } catch (e) {
                                            return Promise.reject(e)
                                        }
                                    }));
                                return we(Promise.all(i), (function () {
                                    return e.options.silentErrors && n.length > 0 && (r.errors = n), e.file.close && e.file.close(), D(t = r) ? void 0 : t;
                                    var t
                                }))
                            }))
                        } catch (e) {
                            return Promise.reject(e)
                        }
                    }
                }, {
                    key: "extractThumbnail",
                    value: function () {
                        try {
                            var e = this;
                            e.setup();
                            var t, r = e.options,
                                n = e.file,
                                i = q.get("tiff", r);
                            return _e((function () {
                                if (!n.tiff) return function (e) {
                                    var t = e();
                                    if (t && t.then) return t.then(Se)
                                }((function () {
                                    if (n.jpeg) return we(e.fileParser.getOrFindSegment("tiff"), (function (e) {
                                        t = e
                                    }))
                                }));
                                t = {
                                    start: 0,
                                    type: "tiff"
                                }
                            }), (function () {
                                if (void 0 !== t) return we(e.fileParser.ensureSegmentChunk(t), (function (t) {
                                    return we((e.parsers.tiff = new i(t, r, n)).extractThumbnail(), (function (e) {
                                        return n.close && n.close(), e
                                    }))
                                }))
                            }))
                        } catch (e) {
                            return Promise.reject(e)
                        }
                    }
                }]), e
            }(),
                Ce = (ke = function (e, t) {
                    var r, n, i = new Pe(t);
                    return n = function () {
                        return i.parse()
                    }, (r = i.read(e)) && r.then || (r = Promise.resolve(r)), n ? r.then(n) : r
                }, function () {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    try {
                        return Promise.resolve(ke.apply(this, e))
                    } catch (e) {
                        return Promise.reject(e)
                    }
                }),
                Ee = Object.freeze({
                    __proto__: null,
                    parse: Ce,
                    Exifr: Pe,
                    fileParsers: z,
                    segmentParsers: q,
                    fileReaders: H,
                    tagKeys: te,
                    tagValues: re,
                    tagRevivers: ne,
                    createDictionary: Z,
                    extendDictionary: ee,
                    fetchUrlAsArrayBuffer: G,
                    readBlobAsArrayBuffer: X,
                    chunkedProps: ie,
                    otherSegments: oe,
                    segments: se,
                    tiffBlocks: ae,
                    segmentsAndBlocks: ue,
                    tiffExtractables: le,
                    inheritables: ce,
                    allFormatters: pe,
                    Options: ge
                });

            function Ae() { }
            var Fe = function () {
                function e(t, r, n) {
                    var o = this;
                    i(this, e), a(this, "ensureSegmentChunk", (function () {
                        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                        try {
                            return Promise.resolve(function (e) {
                                var t, r, n, i = e.start,
                                    s = e.size || 65536;
                                return t = function () {
                                    if (o.file.chunked) return function (e) {
                                        var t = e();
                                        if (t && t.then) return t.then(Ae)
                                    }((function () {
                                        if (!o.file.available(i, s)) return function (e) {
                                            if (e && e.then) return e.then(Ae)
                                        }(function (e, t) {
                                            try {
                                                var r = e()
                                            } catch (e) {
                                                return t(e)
                                            }
                                            return r && r.then ? r.then(void 0, t) : r
                                        }((function () {
                                            return r = function (t) {
                                                e.chunk = t
                                            }, (t = o.file.readChunk(i, s)) && t.then || (t = Promise.resolve(t)), r ? t.then(r) : t;
                                            var t, r
                                        }), (function (t) {
                                            B("Couldn't read segment: ".concat(JSON.stringify(e), ". ").concat(t.message))
                                        })));
                                        e.chunk = o.file.subarray(i, s)
                                    }));
                                    o.file.byteLength > i + s ? e.chunk = o.file.subarray(i, s) : void 0 === e.size ? e.chunk = o.file.subarray(i) : B("Segment unreachable: " + JSON.stringify(e))
                                }, r = function () {
                                    return e.chunk
                                }, (n = t()) && n.then ? n.then(r) : r()
                            }.apply(this, t))
                        } catch (e) {
                            return Promise.reject(e)
                        }
                    })), this.extendOptions && this.extendOptions(t), this.options = t, this.file = r, this.parsers = n
                }
                return s(e, [{
                    key: "createParser",
                    value: function (e, t) {
                        var r = new (q.get(e))(t, this.options, this.file);
                        return this.parsers[e] = r
                    }
                }]), e
            }(),
                Oe = function () {
                    function e(t) {
                        var r = this,
                            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                            o = arguments.length > 2 ? arguments[2] : void 0;
                        i(this, e), a(this, "errors", []), a(this, "raw", C()), a(this, "handleError", (function (e) {
                            if (!r.options.silentErrors) throw e;
                            r.errors.push(e.message)
                        })), this.chunk = this.normalizeInput(t), this.file = o, this.type = this.constructor.type, this.globalOptions = this.options = n, this.localOptions = n[this.type], this.canTranslate = this.localOptions && this.localOptions.translate
                    }
                    return s(e, [{
                        key: "normalizeInput",
                        value: function (e) {
                            return e instanceof L ? e : new L(e)
                        }
                    }], [{
                        key: "findPosition",
                        value: function (e, t) {
                            var r = e.getUint16(t + 2) + 2,
                                n = "function" == typeof this.headerLength ? this.headerLength(e, t, r) : this.headerLength,
                                i = t + n,
                                o = r - n;
                            return {
                                offset: t,
                                length: r,
                                headerLength: n,
                                start: i,
                                size: o,
                                end: i + o
                            }
                        }
                    }, {
                        key: "parse",
                        value: function (e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            return new this(e, new ge(a({}, this.type, t))).parse()
                        }
                    }]), s(e, [{
                        key: "translate",
                        value: function () {
                            this.canTranslate && (this.translated = this.translateBlock(this.raw, this.type))
                        }
                    }, {
                        key: "translateBlock",
                        value: function (e, t) {
                            var r = ne.get(t),
                                n = re.get(t),
                                i = te.get(t),
                                o = this.options[t],
                                s = o.reviveValues && !!r,
                                a = o.translateValues && !!n,
                                u = o.translateKeys && !!i,
                                l = {},
                                c = e;
                            Array.isArray(c) || ("function" == typeof c.entries && (c = c.entries()), c = w(c));
                            for (var p = 0; p < c.length; p++) {
                                var d = c[p],
                                    h = d[0],
                                    f = d[1];
                                s && r.has(h) ? f = r.get(h)(f) : a && n.has(h) && (f = this.translateValue(f, n.get(h))), u && i.has(h) && (h = i.get(h) || h), l[h] = f
                            }
                            return l
                        }
                    }, {
                        key: "translateValue",
                        value: function (e, t) {
                            return t[e] || e
                        }
                    }, {
                        key: "assignToOutput",
                        value: function (e, t) {
                            this.assignObjectToOutput(e, this.constructor.type, t)
                        }
                    }, {
                        key: "assignObjectToOutput",
                        value: function (e, t, r) {
                            if (this.globalOptions.mergeOutput) return m(e, r);
                            e[t] ? m(e[t], r) : e[t] = r
                        }
                    }, {
                        key: "output",
                        get: function () {
                            return this.translated ? this.translated : this.raw ? b(this.raw) : void 0
                        }
                    }]), e
                }();

            function Ue(e, t, r) {
                return r ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e)
            }

            function Re() { }

            function Te(e, t) {
                if (!t) return e && e.then ? e.then(Re) : Promise.resolve()
            }

            function xe(e, t) {
                var r = e();
                return r && r.then ? r.then(t) : t(r)
            }

            function De(e, t, r) {
                if (!e.s) {
                    if (r instanceof Be) {
                        if (!r.s) return void (r.o = De.bind(null, e, t));
                        1 & t && (t = r.s), r = r.v
                    }
                    if (r && r.then) return void r.then(De.bind(null, e, t), De.bind(null, e, 2));
                    e.s = t, e.v = r;
                    var n = e.o;
                    n && n(e)
                }
            }
            a(Oe, "headerLength", 4), a(Oe, "type", void 0), a(Oe, "multiSegment", !1), a(Oe, "canHandle", (function () {
                return !1
            }));
            var Be = function () {
                function e() { }
                return e.prototype.then = function (t, r) {
                    var n = new e,
                        i = this.s;
                    if (i) {
                        var o = 1 & i ? t : r;
                        if (o) {
                            try {
                                De(n, 1, o(this.v))
                            } catch (e) {
                                De(n, 2, e)
                            }
                            return n
                        }
                        return this
                    }
                    return this.o = function (e) {
                        try {
                            var i = e.v;
                            1 & e.s ? De(n, 1, t ? t(i) : i) : r ? De(n, 1, r(i)) : De(n, 2, i)
                        } catch (e) {
                            De(n, 2, e)
                        }
                    }, n
                }, e
            }();

            function Ie(e) {
                return e instanceof Be && 1 & e.s
            }

            function je(e) {
                return 192 === e || 194 === e || 196 === e || 219 === e || 221 === e || 218 === e || 254 === e
            }

            function Le(e) {
                return e >= 224 && e <= 239
            }

            function Me(e, t) {
                var r = q;
                Array.isArray(r) || ("function" == typeof r.entries && (r = r.entries()), r = w(r));
                for (var n = 0; n < r.length; n++) {
                    var i = r[n],
                        o = i[0];
                    if (i[1].canHandle(e, t)) return o
                }
            }
            var Ne = function (e) {
                function t() {
                    var e, r;
                    i(this, t);
                    for (var n = arguments.length, o = new Array(n), s = 0; s < n; s++) o[s] = arguments[s];
                    return a(h(r = f(this, (e = l(t)).call.apply(e, [this].concat(o)))), "appSegments", []), a(h(r), "jpegSegments", []), a(h(r), "unknownSegments", []), r
                }
                return u(t, Fe), s(t, [{
                    key: "parse",
                    value: function () {
                        try {
                            var e = this;
                            return Ue(e.findAppSegments(), (function () {
                                return Ue(e.readSegments(), (function () {
                                    e.mergeMultiSegments(), e.createParsers()
                                }))
                            }))
                        } catch (e) {
                            return Promise.reject(e)
                        }
                    }
                }, {
                    key: "readSegments",
                    value: function () {
                        try {
                            var e = this.appSegments.map(this.ensureSegmentChunk);
                            return Te(Promise.all(e))
                        } catch (e) {
                            return Promise.reject(e)
                        }
                    }
                }, {
                    key: "setupSegmentFinderArgs",
                    value: function (e) {
                        var t = this;
                        !0 === e ? (this.findAll = !0, this.wanted = P(q.keyList())) : (e = void 0 === e ? q.keyList().filter((function (e) {
                            return t.options[e].enabled
                        })) : e.filter((function (e) {
                            return t.options[e].enabled && q.has(e)
                        })), this.findAll = !1, this.remaining = P(e), this.wanted = P(e)), this.unfinishedMultiSegment = !1
                    }
                }, {
                    key: "findAppSegments",
                    value: function () {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                            t = arguments.length > 1 ? arguments[1] : void 0;
                        try {
                            var r = this;
                            r.setupSegmentFinderArgs(t);
                            var n = r.file,
                                i = r.findAll,
                                o = r.wanted,
                                s = r.remaining;
                            return xe((function () {
                                if (!i && r.file.chunked) return i = w(o).some((function (e) {
                                    var t = q.get(e),
                                        n = r.options[e];
                                    return t.multiSegment && n.multiSegment
                                })),
                                    function (e) {
                                        var t = function () {
                                            if (i) return Te(r.file.readWhole())
                                        }();
                                        if (t && t.then) return t.then(Re)
                                    }()
                            }), (function () {
                                var t = !1;
                                if (e = r._findAppSegments(e, n.byteLength, i, o, s), !r.options.onlyTiff) return function () {
                                    if (n.chunked) {
                                        var i = !1;
                                        return function (e, t, r) {
                                            for (var n; ;) {
                                                var i = e();
                                                if (Ie(i) && (i = i.v), !i) return s;
                                                if (i.then) {
                                                    n = 0;
                                                    break
                                                }
                                                var o, s = r();
                                                if (s && s.then) {
                                                    if (!Ie(s)) {
                                                        n = 1;
                                                        break
                                                    }
                                                    s = s.s
                                                }
                                            }
                                            var a = new Be,
                                                u = De.bind(null, a, 2);
                                            return (0 === n ? i.then(c) : 1 === n ? s.then(l) : o.then(p)).then(void 0, u), a;

                                            function l(t) {
                                                s = t;
                                                do {
                                                    if (!(i = e()) || Ie(i) && !i.v) return void De(a, 1, s);
                                                    if (i.then) return void i.then(c).then(void 0, u);
                                                    Ie(s = r()) && (s = s.v)
                                                } while (!s || !s.then);
                                                s.then(l).then(void 0, u)
                                            }

                                            function c(e) {
                                                e ? (s = r()) && s.then ? s.then(l).then(void 0, u) : l(s) : De(a, 1, s)
                                            }

                                            function p() {
                                                (i = e()) ? i.then ? i.then(c).then(void 0, u) : c(i) : De(a, 1, s)
                                            }
                                        }((function () {
                                            return !t && s.size > 0 && !i && (!!n.canReadNextChunk || !!r.unfinishedMultiSegment)
                                        }), 0, (function () {
                                            var o = n.nextChunkOffset,
                                                s = r.appSegments.some((function (e) {
                                                    return !r.file.available(e.offset || e.start, e.length || e.size)
                                                }));
                                            return xe((function () {
                                                return Ue(e > o && !s ? n.readNextChunk(e) : n.readNextChunk(o), (function (e) {
                                                    i = !e
                                                }))
                                            }), (function () {
                                                void 0 === (e = r._findAppSegments(e, n.byteLength)) && (t = !0)
                                            }))
                                        }))
                                    }
                                }()
                            }))
                        } catch (e) {
                            return Promise.reject(e)
                        }
                    }
                }, {
                    key: "_findAppSegments",
                    value: function (e, t) {
                        t -= 2;
                        for (var r, n, i, o, s, a, u = this.file, l = this.findAll, c = this.wanted, p = this.remaining, d = this.options; e < t; e++)
                            if (255 === u.getUint8(e))
                                if (Le(r = u.getUint8(e + 1))) {
                                    if (n = u.getUint16(e + 2), (i = Me(u, e)) && c.has(i) && (s = (o = q.get(i)).findPosition(u, e), a = d[i], s.type = i, this.appSegments.push(s), !l && (o.multiSegment && a.multiSegment ? (this.unfinishedMultiSegment = s.chunkNumber < s.chunkCount, this.unfinishedMultiSegment || p.delete(i)) : p.delete(i), 0 === p.size))) break;
                                    d.recordUnknownSegments && ((s = Oe.findPosition(u, e)).marker = r, this.unknownSegments.push(s)), e += n + 1
                                } else if (je(r)) {
                                    if (n = u.getUint16(e + 2), 218 === r && !1 !== d.stopAfterSos) return;
                                    d.recordJpegSegments && this.jpegSegments.push({
                                        offset: e,
                                        length: n,
                                        marker: r
                                    }), e += n + 1
                                }
                        return e
                    }
                }, {
                    key: "mergeMultiSegments",
                    value: function () {
                        var e = this;
                        if (this.appSegments.some((function (e) {
                            return e.multiSegment
                        }))) {
                            var t = function (e, t) {
                                for (var r, n, i, o = C(), s = 0; s < e.length; s++) n = (r = e[s]).type, o.has(n) ? i = o.get(n) : o.set(n, i = []), i.push(r);
                                return w(o)
                            }(this.appSegments);
                            this.mergedAppSegments = t.map((function (t) {
                                var r = t[0],
                                    n = t[1],
                                    i = q.get(r, e.options);
                                return i.handleMultiSegments ? {
                                    type: r,
                                    chunk: i.handleMultiSegments(n)
                                } : n[0]
                            }))
                        }
                    }
                }, {
                    key: "createParsers",
                    value: function () {
                        try {
                            var e = this.mergedAppSegments || this.appSegments;
                            Array.isArray(e) || ("function" == typeof e.entries && (e = e.entries()), e = w(e));
                            for (var t = 0; t < e.length; t++) {
                                var r = e[t],
                                    n = r.type,
                                    i = r.chunk;
                                if (this.options[n].enabled) {
                                    var o = this.parsers[n];
                                    if (o && o.append);
                                    else if (!o) {
                                        var s = new (q.get(n, this.options))(i, this.options, this.file);
                                        this.parsers[n] = s
                                    }
                                }
                            }
                            return Ue()
                        } catch (e) {
                            return Promise.reject(e)
                        }
                    }
                }, {
                    key: "getSegment",
                    value: function (e) {
                        return this.appSegments.find((function (t) {
                            return t.type === e
                        }))
                    }
                }, {
                    key: "getOrFindSegment",
                    value: function (e) {
                        try {
                            var t = this,
                                r = t.getSegment(e);
                            return xe((function () {
                                if (void 0 === r) return Ue(t.findAppSegments(0, [e]), (function () {
                                    r = t.getSegment(e)
                                }))
                            }), (function () {
                                return r
                            }))
                        } catch (e) {
                            return Promise.reject(e)
                        }
                    }
                }], [{
                    key: "canHandle",
                    value: function (e, t) {
                        return 65496 === t
                    }
                }]), t
            }();

            function ze() { }

            function qe(e, t) {
                if (!t) return e && e.then ? e.then(ze) : Promise.resolve()
            }

            function He(e, t) {
                var r = e();
                return r && r.then ? r.then(t) : t(r)
            }
            a(Ne, "type", "jpeg"), z.set("jpeg", Ne);
            var Ve = [void 0, 1, 1, 2, 4, 8, 1, 1, 2, 4, 8, 4, 8, 4],
                We = function (e) {
                    function t() {
                        return i(this, t), f(this, l(t).apply(this, arguments))
                    }
                    return u(t, e), s(t, [{
                        key: "parse",
                        value: function () {
                            try {
                                var e = this;
                                e.parseHeader();
                                var t = e.options;
                                return He((function () {
                                    if (t.ifd0.enabled) return qe(e.parseIfd0Block())
                                }), (function () {
                                    return He((function () {
                                        if (t.exif.enabled) return qe(e.safeParse("parseExifBlock"))
                                    }), (function () {
                                        return He((function () {
                                            if (t.gps.enabled) return qe(e.safeParse("parseGpsBlock"))
                                        }), (function () {
                                            return He((function () {
                                                if (t.interop.enabled) return qe(e.safeParse("parseInteropBlock"))
                                            }), (function () {
                                                return He((function () {
                                                    if (t.ifd1.enabled) return qe(e.safeParse("parseThumbnailBlock"))
                                                }), (function () {
                                                    return e.createOutput()
                                                }))
                                            }))
                                        }))
                                    }))
                                }))
                            } catch (e) {
                                return Promise.reject(e)
                            }
                        }
                    }, {
                        key: "safeParse",
                        value: function (e) {
                            var t = this[e]();
                            return void 0 !== t.catch && (t = t.catch(this.handleError)), t
                        }
                    }, {
                        key: "findIfd0Offset",
                        value: function () {
                            void 0 === this.ifd0Offset && (this.ifd0Offset = this.chunk.getUint32(4))
                        }
                    }, {
                        key: "findIfd1Offset",
                        value: function () {
                            if (void 0 === this.ifd1Offset) {
                                this.findIfd0Offset();
                                var e = this.chunk.getUint16(this.ifd0Offset),
                                    t = this.ifd0Offset + 2 + 12 * e;
                                this.ifd1Offset = this.chunk.getUint32(t)
                            }
                        }
                    }, {
                        key: "parseBlock",
                        value: function (e, t) {
                            var r = C();
                            return this[t] = r, this.parseTags(e, t, r), r
                        }
                    }, {
                        key: "parseIfd0Block",
                        value: function () {
                            try {
                                var e = this;
                                if (e.ifd0) return;
                                var t = e.file;
                                return e.findIfd0Offset(), e.ifd0Offset < 8 && B("Malformed EXIF data"), !t.chunked && e.ifd0Offset > t.byteLength && B("IFD0 offset points to outside of file.\nthis.ifd0Offset: ".concat(e.ifd0Offset, ", file.byteLength: ").concat(t.byteLength)), He((function () {
                                    if (t.tiff) return qe(t.ensureChunk(e.ifd0Offset, I(e.options)))
                                }), (function () {
                                    var t = e.parseBlock(e.ifd0Offset, "ifd0");
                                    if (0 !== t.size) return e.exifOffset = t.get(34665), e.interopOffset = t.get(40965), e.gpsOffset = t.get(34853), e.xmp = t.get(700), e.iptc = t.get(33723), e.icc = t.get(34675), e.options.sanitize && (t.delete(34665), t.delete(40965), t.delete(34853), t.delete(700), t.delete(33723), t.delete(34675)), t
                                }))
                            } catch (e) {
                                return Promise.reject(e)
                            }
                        }
                    }, {
                        key: "parseExifBlock",
                        value: function () {
                            try {
                                var e = this;
                                if (e.exif) return;
                                return He((function () {
                                    if (!e.ifd0) return qe(e.parseIfd0Block())
                                }), (function () {
                                    if (void 0 !== e.exifOffset) return He((function () {
                                        if (e.file.tiff) return qe(e.file.ensureChunk(e.exifOffset, I(e.options)))
                                    }), (function () {
                                        var t = e.parseBlock(e.exifOffset, "exif");
                                        return e.interopOffset || (e.interopOffset = t.get(40965)), e.makerNote = t.get(37500), e.userComment = t.get(37510), e.options.sanitize && (t.delete(40965), t.delete(37500), t.delete(37510)), e.unpack(t, 41728), e.unpack(t, 41729), t
                                    }))
                                }))
                            } catch (e) {
                                return Promise.reject(e)
                            }
                        }
                    }, {
                        key: "unpack",
                        value: function (e, t) {
                            var r = e.get(t);
                            r && 1 === r.length && e.set(t, r[0])
                        }
                    }, {
                        key: "parseGpsBlock",
                        value: function () {
                            try {
                                var e = this;
                                if (e.gps) return;
                                return He((function () {
                                    if (!e.ifd0) return qe(e.parseIfd0Block())
                                }), (function () {
                                    if (void 0 !== e.gpsOffset) {
                                        var t = e.parseBlock(e.gpsOffset, "gps");
                                        return t && t.has(2) && t.has(4) && (t.set("latitude", Xe.apply(void 0, t.get(2).concat([t.get(1)]))), t.set("longitude", Xe.apply(void 0, t.get(4).concat([t.get(3)])))), t
                                    }
                                }))
                            } catch (e) {
                                return Promise.reject(e)
                            }
                        }
                    }, {
                        key: "parseInteropBlock",
                        value: function () {
                            try {
                                var e = this;
                                if (e.interop) return;
                                return He((function () {
                                    if (!e.ifd0) return qe(e.parseIfd0Block())
                                }), (function () {
                                    return He((function () {
                                        if (void 0 === e.interopOffset && !e.exif) return qe(e.parseExifBlock())
                                    }), (function () {
                                        if (void 0 !== e.interopOffset) return e.parseBlock(e.interopOffset, "interop")
                                    }))
                                }))
                            } catch (e) {
                                return Promise.reject(e)
                            }
                        }
                    }, {
                        key: "parseThumbnailBlock",
                        value: function () {
                            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                            try {
                                var t = this;
                                if (t.ifd1 || t.ifd1Parsed) return;
                                if (t.options.mergeOutput && !e) return;
                                return t.findIfd1Offset(), t.ifd1Offset > 0 && (t.parseBlock(t.ifd1Offset, "ifd1"), t.ifd1Parsed = !0), t.ifd1
                            } catch (e) {
                                return Promise.reject(e)
                            }
                        }
                    }, {
                        key: "extractThumbnail",
                        value: function () {
                            try {
                                var e = this;
                                return e.headerParsed || e.parseHeader(), He((function () {
                                    if (!e.ifd1Parsed) return qe(e.parseThumbnailBlock(!0))
                                }), (function () {
                                    if (void 0 !== e.ifd1) {
                                        var t = e.ifd1.get(513),
                                            r = e.ifd1.get(514);
                                        return e.chunk.getUint8Array(t, r)
                                    }
                                }))
                            } catch (e) {
                                return Promise.reject(e)
                            }
                        }
                    }, {
                        key: "createOutput",
                        value: function () {
                            var e, t, r, n = {},
                                i = ae;
                            Array.isArray(i) || ("function" == typeof i.entries && (i = i.entries()), i = w(i));
                            for (var o = 0; o < i.length; o++)
                                if (!D(e = this[t = i[o]]))
                                    if (r = this.canTranslate ? this.translateBlock(e, t) : b(e), this.options.mergeOutput) {
                                        if ("ifd1" === t) continue;
                                        m(n, r)
                                    } else n[t] = r;
                            return this.makerNote && (n.makerNote = this.makerNote), this.userComment && (n.userComment = this.userComment), n
                        }
                    }, {
                        key: "assignToOutput",
                        value: function (e, t) {
                            if (this.globalOptions.mergeOutput) m(e, t);
                            else {
                                var r = v(t);
                                Array.isArray(r) || ("function" == typeof r.entries && (r = r.entries()), r = w(r));
                                for (var n = 0; n < r.length; n++) {
                                    var i = r[n],
                                        o = i[0],
                                        s = i[1];
                                    this.assignObjectToOutput(e, o, s)
                                }
                            }
                        }
                    }, {
                        key: "image",
                        get: function () {
                            return this.ifd0
                        }
                    }, {
                        key: "thumbnail",
                        get: function () {
                            return this.ifd1
                        }
                    }], [{
                        key: "canHandle",
                        value: function (e, t) {
                            return 225 === e.getUint8(t + 1) && 1165519206 === e.getUint32(t + 4) && 0 === e.getUint16(t + 8)
                        }
                    }]), t
                }(function (e) {
                    function t() {
                        return i(this, t), f(this, l(t).apply(this, arguments))
                    }
                    return u(t, Oe), s(t, [{
                        key: "parseHeader",
                        value: function () {
                            var e = this.chunk.getUint16();
                            18761 === e ? this.le = !0 : 19789 === e && (this.le = !1), this.chunk.le = this.le, this.headerParsed = !0
                        }
                    }, {
                        key: "parseTags",
                        value: function (e, t) {
                            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : C(),
                                n = this.options[t],
                                i = n.pick,
                                o = n.skip,
                                s = (i = P(i)).size > 0,
                                a = 0 === o.size,
                                u = this.chunk.getUint16(e);
                            e += 2;
                            for (var l = 0; l < u; l++) {
                                var c = this.chunk.getUint16(e);
                                if (s) {
                                    if (i.has(c) && (r.set(c, this.parseTag(e, c, t)), i.delete(c), 0 === i.size)) break
                                } else !a && o.has(c) || r.set(c, this.parseTag(e, c, t));
                                e += 12
                            }
                            return r
                        }
                    }, {
                        key: "parseTag",
                        value: function (e, t, r) {
                            var n, i = this.chunk,
                                o = i.getUint16(e + 2),
                                s = i.getUint32(e + 4),
                                a = Ve[o];
                            if (a * s <= 4 ? e += 8 : e = i.getUint32(e + 8), (o < 1 || o > 13) && B("Invalid TIFF value type. block: ".concat(r.toUpperCase(), ", tag: ").concat(t.toString(16), ", type: ").concat(o, ", offset ").concat(e)), e > i.byteLength && B("Invalid TIFF value offset. block: ".concat(r.toUpperCase(), ", tag: ").concat(t.toString(16), ", type: ").concat(o, ", offset ").concat(e, " is outside of chunk size ").concat(i.byteLength)), 1 === o) return i.getUint8Array(e, s);
                            if (2 === o) return "" === (n = function (e) {
                                for (; e.endsWith("\0");) e = e.slice(0, -1);
                                return e
                            }(n = i.getString(e, s)).trim()) ? void 0 : n;
                            if (7 === o) return i.getUint8Array(e, s);
                            if (1 === s) return this.parseTagValue(o, e);
                            for (var u = new (function (e) {
                                switch (o) {
                                    case 1:
                                        return Uint8Array;
                                    case 3:
                                        return Uint16Array;
                                    case 4:
                                        return Uint32Array;
                                    case 5:
                                        return Array;
                                    case 6:
                                        return Int8Array;
                                    case 8:
                                        return Int16Array;
                                    case 9:
                                        return Int32Array;
                                    case 10:
                                        return Array;
                                    case 11:
                                        return Float32Array;
                                    case 12:
                                        return Float64Array;
                                    default:
                                        return Array
                                }
                            }())(s), l = a, c = 0; c < s; c++) u[c] = this.parseTagValue(o, e), e += l;
                            return u
                        }
                    }, {
                        key: "parseTagValue",
                        value: function (e, t) {
                            var r = this.chunk;
                            switch (e) {
                                case 1:
                                    return r.getUint8(t);
                                case 3:
                                    return r.getUint16(t);
                                case 4:
                                    return r.getUint32(t);
                                case 5:
                                    return r.getUint32(t) / r.getUint32(t + 4);
                                case 6:
                                    return r.getInt8(t);
                                case 8:
                                    return r.getInt16(t);
                                case 9:
                                    return r.getInt32(t);
                                case 10:
                                    return r.getInt32(t) / r.getInt32(t + 4);
                                case 11:
                                    return r.getFloat(t);
                                case 12:
                                    return r.getDouble(t);
                                case 13:
                                    return r.getUint32(t);
                                default:
                                    B("Invalid tiff type ".concat(e))
                            }
                        }
                    }]), t
                }());

            function Xe(e, t, r, n) {
                var i = e + t / 60 + r / 3600;
                return "S" !== n && "W" !== n || (i *= -1), i
            }
            a(We, "type", "tiff"), a(We, "headerLength", 10), q.set("tiff", We);
            var Ge = Object.freeze({
                __proto__: null,
                default: Ee,
                parse: Ce,
                Exifr: Pe,
                fileParsers: z,
                segmentParsers: q,
                fileReaders: H,
                tagKeys: te,
                tagValues: re,
                tagRevivers: ne,
                createDictionary: Z,
                extendDictionary: ee,
                fetchUrlAsArrayBuffer: G,
                readBlobAsArrayBuffer: X,
                chunkedProps: ie,
                otherSegments: oe,
                segments: se,
                tiffBlocks: ae,
                segmentsAndBlocks: ue,
                tiffExtractables: le,
                inheritables: ce,
                allFormatters: pe,
                Options: ge
            });

            function Ke(e, t, r) {
                return r ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e)
            }

            function $e(e) {
                return function () {
                    for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                    try {
                        return Promise.resolve(e.apply(this, t))
                    } catch (e) {
                        return Promise.reject(e)
                    }
                }
            }
            var Ye = $e((function (e) {
                var t = new Pe(rt);
                return Ke(t.read(e), (function () {
                    return Ke(t.parse(), (function (e) {
                        if (e && e.ifd0) return e.ifd0[274]
                    }))
                }))
            })),
                Je = $e((function (e) {
                    var t = new Pe(tt);
                    return Ke(t.read(e), (function () {
                        return Ke(t.parse(), (function (e) {
                            if (e && e.gps) {
                                var t = e.gps;
                                return {
                                    latitude: t.latitude,
                                    longitude: t.longitude
                                }
                            }
                        }))
                    }))
                })),
                Qe = $e((function (e) {
                    return Ke(this.thumbnail(e), (function (e) {
                        if (void 0 !== e) {
                            var t = new Blob([e]);
                            return URL.createObjectURL(t)
                        }
                    }))
                })),
                Ze = $e((function (e) {
                    var t = new Pe(nt);
                    return Ke(t.read(e), (function () {
                        return Ke(t.extractThumbnail(), (function (e) {
                            return e && T ? R.from(e) : e
                        }))
                    }))
                })),
                et = {
                    ifd0: !1,
                    ifd1: !1,
                    exif: !1,
                    gps: !1,
                    interop: !1,
                    sanitize: !1,
                    reviveValues: !0,
                    translateKeys: !1,
                    translateValues: !1,
                    mergeOutput: !1
                },
                tt = m({}, et, {
                    firstChunkSize: 4e4,
                    gps: [1, 2, 3, 4]
                }),
                rt = m({}, et, {
                    firstChunkSize: 4e4,
                    ifd0: [274]
                }),
                nt = m({}, et, {
                    tiff: !1,
                    ifd1: !0,
                    mergeOutput: !1
                }),
                it = {
                    1: {
                        dimensionSwapped: !1,
                        scaleX: 1,
                        scaleY: 1,
                        deg: 0,
                        rad: 0
                    },
                    2: {
                        dimensionSwapped: !1,
                        scaleX: -1,
                        scaleY: 1,
                        deg: 0,
                        rad: 0
                    },
                    3: {
                        dimensionSwapped: !1,
                        scaleX: 1,
                        scaleY: 1,
                        deg: 180,
                        rad: 180 * Math.PI / 180
                    },
                    4: {
                        dimensionSwapped: !1,
                        scaleX: -1,
                        scaleY: 1,
                        deg: 180,
                        rad: 180 * Math.PI / 180
                    },
                    5: {
                        dimensionSwapped: !0,
                        scaleX: 1,
                        scaleY: -1,
                        deg: 90,
                        rad: 90 * Math.PI / 180
                    },
                    6: {
                        dimensionSwapped: !0,
                        scaleX: 1,
                        scaleY: 1,
                        deg: 90,
                        rad: 90 * Math.PI / 180
                    },
                    7: {
                        dimensionSwapped: !0,
                        scaleX: 1,
                        scaleY: -1,
                        deg: 270,
                        rad: 270 * Math.PI / 180
                    },
                    8: {
                        dimensionSwapped: !0,
                        scaleX: 1,
                        scaleY: 1,
                        deg: 270,
                        rad: 270 * Math.PI / 180
                    }
                };
            if (n.rotateCanvas = !0, n.rotateCss = !0, "object" == typeof navigator) {
                var ot = navigator.userAgent;
                if (ot.includes("iPad") || ot.includes("iPhone")) {
                    var st = ot.match(/OS (\d+)_(\d+)/),
                        at = (st[0], st[1]),
                        ut = st[2],
                        lt = Number(at) + .1 * Number(ut);
                    n.rotateCanvas = lt < 13.4, n.rotateCss = !1
                }
                if (ot.includes("Chrome/")) {
                    var ct = ot.match(/Chrome\/(\d+)/),
                        pt = (ct[0], ct[1]);
                    Number(pt) >= 81 && (n.rotateCanvas = n.rotateCss = !1)
                }
            }

            function dt() { }
            var ht = function (e) {
                function t() {
                    var e, r;
                    i(this, t);
                    for (var n = arguments.length, o = new Array(n), s = 0; s < n; s++) o[s] = arguments[s];
                    return a(h(r = f(this, (e = l(t)).call.apply(e, [this].concat(o)))), "ranges", new ft), 0 !== r.byteLength && r.ranges.add(0, r.byteLength), r
                }
                return u(t, L), s(t, [{
                    key: "_tryExtend",
                    value: function (e, t, r) {
                        if (0 === e && 0 === this.byteLength && r) {
                            var n = new DataView(r.buffer || r, r.byteOffset, r.byteLength);
                            this._swapDataView(n)
                        } else {
                            var i = e + t;
                            if (i > this.byteLength) {
                                var o = this._extend(i).dataView;
                                this._swapDataView(o)
                            }
                        }
                    }
                }, {
                    key: "_extend",
                    value: function (e) {
                        var t;
                        t = T ? R.allocUnsafe(e) : new Uint8Array(e);
                        var r = new DataView(t.buffer, t.byteOffset, t.byteLength);
                        return t.set(new Uint8Array(this.buffer, this.byteOffset, this.byteLength), 0), {
                            uintView: t,
                            dataView: r
                        }
                    }
                }, {
                    key: "subarray",
                    value: function (e, r) {
                        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                        return r = r || this._lengthToEnd(e), n && this._tryExtend(e, r), this.ranges.add(e, r), y(l(t.prototype), "subarray", this).call(this, e, r)
                    }
                }, {
                    key: "set",
                    value: function (e, r) {
                        arguments.length > 2 && void 0 !== arguments[2] && arguments[2] && this._tryExtend(r, e.byteLength, e);
                        var n = y(l(t.prototype), "set", this).call(this, e, r);
                        return this.ranges.add(r, n.byteLength), n
                    }
                }, {
                    key: "ensureChunk",
                    value: function (e, t) {
                        try {
                            if (!this.chunked) return;
                            if (this.ranges.available(e, t)) return;
                            return function (e, t) {
                                return e && e.then ? e.then(dt) : Promise.resolve()
                            }(this.readChunk(e, t))
                        } catch (e) {
                            return Promise.reject(e)
                        }
                    }
                }, {
                    key: "available",
                    value: function (e, t) {
                        return this.ranges.available(e, t)
                    }
                }]), t
            }(),
                ft = function () {
                    function e() {
                        i(this, e), a(this, "list", [])
                    }
                    return s(e, [{
                        key: "add",
                        value: function (e, t) {
                            var r = e + t,
                                n = this.list.filter((function (t) {
                                    return yt(e, t.offset, r) || yt(e, t.end, r)
                                }));
                            if (n.length > 0) {
                                e = Math.min.apply(Math, [e].concat(n.map((function (e) {
                                    return e.offset
                                })))), t = (r = Math.max.apply(Math, [r].concat(n.map((function (e) {
                                    return e.end
                                }))))) - e;
                                var i = n.shift();
                                i.offset = e, i.length = t, i.end = r, this.list = this.list.filter((function (e) {
                                    return !n.includes(e)
                                }))
                            } else this.list.push({
                                offset: e,
                                length: t,
                                end: r
                            })
                        }
                    }, {
                        key: "available",
                        value: function (e, t) {
                            var r = e + t;
                            return this.list.some((function (t) {
                                return t.offset <= e && r <= t.end
                            }))
                        }
                    }, {
                        key: "length",
                        get: function () {
                            return this.list.length
                        }
                    }]), e
                }();

            function yt(e, t, r) {
                return e <= t && t <= r
            }

            function gt() { }

            function vt(e, t) {
                if (!t) return e && e.then ? e.then(gt) : Promise.resolve()
            }

            function mt(e, t, r) {
                return r ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e)
            }
            var bt = function (e) {
                function t() {
                    return i(this, t), f(this, l(t).apply(this, arguments))
                }
                return u(t, e), s(t, [{
                    key: "readWhole",
                    value: function () {
                        try {
                            var e = this;
                            return e.chunked = !1, mt(X(e.input), (function (t) {
                                e._swapArrayBuffer(t)
                            }))
                        } catch (e) {
                            return Promise.reject(e)
                        }
                    }
                }, {
                    key: "readChunked",
                    value: function () {
                        return this.chunked = !0, this.size = this.input.size, y(l(t.prototype), "readChunked", this).call(this)
                    }
                }, {
                    key: "_readChunk",
                    value: function (e, t) {
                        try {
                            var r = this,
                                n = t ? e + t : void 0,
                                i = r.input.slice(e, n);
                            return mt(X(i), (function (t) {
                                return r.set(t, e, !0)
                            }))
                        } catch (e) {
                            return Promise.reject(e)
                        }
                    }
                }]), t
            }(function (e) {
                function t(e, r) {
                    var n;
                    return i(this, t), a(h(n = f(this, l(t).call(this, 0))), "chunksRead", 0), n.input = e, n.options = r, n
                }
                return u(t, ht), s(t, [{
                    key: "readWhole",
                    value: function () {
                        try {
                            return this.chunked = !1, vt(this.readChunk(this.nextChunkOffset))
                        } catch (e) {
                            return Promise.reject(e)
                        }
                    }
                }, {
                    key: "readChunked",
                    value: function () {
                        try {
                            return this.chunked = !0, vt(this.readChunk(0, this.options.firstChunkSize))
                        } catch (e) {
                            return Promise.reject(e)
                        }
                    }
                }, {
                    key: "readNextChunk",
                    value: function (e) {
                        try {
                            if (void 0 === e && (e = this.nextChunkOffset), this.fullyRead) return this.chunksRead++, !1;
                            var t = this.options.chunkSize;
                            return r = this.readChunk(e, t), n = function (e) {
                                return !!e && e.byteLength === t
                            }, r && r.then || (r = Promise.resolve(r)), n ? r.then(n) : r
                        } catch (e) {
                            return Promise.reject(e)
                        }
                        var r, n
                    }
                }, {
                    key: "readChunk",
                    value: function (e, t) {
                        try {
                            if (this.chunksRead++, 0 === (t = this.safeWrapAddress(e, t))) return;
                            return this._readChunk(e, t)
                        } catch (e) {
                            return Promise.reject(e)
                        }
                    }
                }, {
                    key: "safeWrapAddress",
                    value: function (e, t) {
                        return void 0 !== this.size && e + t > this.size ? Math.max(0, this.size - e) : t
                    }
                }, {
                    key: "read",
                    value: function () {
                        return this.options.chunked ? this.readChunked() : this.readWhole()
                    }
                }, {
                    key: "close",
                    value: function () { }
                }, {
                    key: "nextChunkOffset",
                    get: function () {
                        if (0 !== this.ranges.list.length) return this.ranges.list[0].length
                    }
                }, {
                    key: "canReadNextChunk",
                    get: function () {
                        return this.chunksRead < this.options.chunkLimit
                    }
                }, {
                    key: "fullyRead",
                    get: function () {
                        return void 0 !== this.size && this.nextChunkOffset === this.size
                    }
                }]), t
            }());
            H.set("blob", bt), n.Exifr = Pe, n.Options = ge, n.allFormatters = pe, n.chunkedProps = ie, n.createDictionary = Z, n.default = Ge, n.disableAllOptions = et, n.extendDictionary = ee, n.fetchUrlAsArrayBuffer = G, n.fileParsers = z, n.fileReaders = H, n.gps = Je, n.gpsOnlyOptions = tt, n.inheritables = ce, n.orientation = Ye, n.orientationOnlyOptions = rt, n.otherSegments = oe, n.parse = Ce, n.readBlobAsArrayBuffer = X, n.rotation = function (e) {
                return Ke(Ye(e), (function (e) {
                    return m({
                        canvas: n.rotateCanvas,
                        css: n.rotateCss
                    }, it[e])
                }))
            }, n.rotations = it, n.segmentParsers = q, n.segments = se, n.segmentsAndBlocks = ue, n.tagKeys = te, n.tagRevivers = ne, n.tagValues = re, n.thumbnail = Ze, n.thumbnailOnlyOptions = nt, n.thumbnailUrl = Qe, n.tiffBlocks = ae, n.tiffExtractables = le, Object.defineProperty(n, "__esModule", {
                value: !0
            })
        }, "object" == typeof An.exports ? i(An.exports) : i((n = n || self).exifr = {})
    }).call(this, e, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, s({}).Buffer), An = An.exports;
    var On = (Cn = Pn = function (e) {
        var t, r;

        function n(t, r) {
            var n;
            if ((n = e.call(this, t, r) || this).onFileAdded = function (e) {
                e.preview || !bt(e.type) || e.isRemote || n.addToQueue(e.id)
            }, n.onCancelRequest = function (e) {
                var t = n.queue.indexOf(e.id); - 1 !== t && n.queue.splice(t, 1)
            }, n.onFileRemoved = function (e) {
                var t = n.queue.indexOf(e.id); - 1 !== t && n.queue.splice(t, 1), e.preview && hn(e.preview) && URL.revokeObjectURL(e.preview)
            }, n.onRestored = function () {
                var e = n.uppy.getState().files;
                Object.keys(e).forEach((function (e) {
                    var t = n.uppy.getFile(e);
                    t.isRestored && (t.preview && !hn(t.preview) || n.addToQueue(t.id))
                }))
            }, n.waitUntilAllProcessed = function (e) {
                e.forEach((function (e) {
                    var t = n.uppy.getFile(e);
                    n.uppy.emit("preprocess-progress", t, {
                        mode: "indeterminate",
                        message: n.i18n("generatingThumbnails")
                    })
                }));
                var t = function () {
                    e.forEach((function (e) {
                        var t = n.uppy.getFile(e);
                        n.uppy.emit("preprocess-complete", t)
                    }))
                };
                return new Promise((function (e, r) {
                    n.queueProcessing ? n.uppy.once("thumbnail:all-generated", (function () {
                        t(), e()
                    })) : (t(), e())
                }))
            }, n.type = "modifier", n.id = n.opts.id || "ThumbnailGenerator", n.title = "Thumbnail Generator", n.queue = [], n.queueProcessing = !1, n.defaultThumbnailDimension = 200, n.defaultLocale = {
                strings: {
                    generatingThumbnails: "Generating thumbnails..."
                }
            }, n.opts = Fn({}, {
                thumbnailWidth: null,
                thumbnailHeight: null,
                waitForThumbnailsBeforeUpload: !1,
                lazy: !1
            }, r), n.opts.lazy && n.opts.waitForThumbnailsBeforeUpload) throw new Error("ThumbnailGenerator: The `lazy` and `waitForThumbnailsBeforeUpload` options are mutually exclusive. Please ensure at most one of them is set to `true`.");
            return n.i18nInit(), n
        }
        r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
        var i = n.prototype;
        return i.setOptions = function (t) {
            e.prototype.setOptions.call(this, t), this.i18nInit()
        }, i.i18nInit = function () {
            this.translator = new E([this.defaultLocale, this.uppy.locale, this.opts.locale]), this.i18n = this.translator.translate.bind(this.translator), this.setPluginState()
        }, i.createThumbnail = function (e, t, r) {
            var n = this,
                i = URL.createObjectURL(e.data),
                o = new Promise((function (e, t) {
                    var r = new Image;
                    r.src = i, r.addEventListener("load", (function () {
                        URL.revokeObjectURL(i), e(r)
                    })), r.addEventListener("error", (function (e) {
                        URL.revokeObjectURL(i), t(e.error || new Error("Could not create thumbnail"))
                    }))
                })),
                s = An.rotation(e.data).catch((function (e) {
                    return 1
                }));
            return Promise.all([o, s]).then((function (e) {
                var i = e[0],
                    o = e[1],
                    s = n.getProportionalDimensions(i, t, r, o.deg),
                    a = n.rotateImage(i, o),
                    u = n.resizeImage(a, s.width, s.height);
                return n.canvasToBlob(u, "image/jpeg", 80)
            })).then((function (e) {
                return URL.createObjectURL(e)
            }))
        }, i.getProportionalDimensions = function (e, t, r, n) {
            var i = e.width / e.height;
            return 90 !== n && 270 !== n || (i = e.height / e.width), null != t ? {
                width: t,
                height: Math.round(t / i)
            } : null != r ? {
                width: Math.round(r * i),
                height: r
            } : {
                        width: this.defaultThumbnailDimension,
                        height: Math.round(this.defaultThumbnailDimension / i)
                    }
        }, i.protect = function (e) {
            var t = e.width / e.height,
                r = Math.floor(Math.sqrt(5e6 * t)),
                n = Math.floor(5e6 / Math.sqrt(5e6 * t));
            if (r > 4096 && (r = 4096, n = Math.round(r / t)), n > 4096 && (n = 4096, r = Math.round(t * n)), e.width > r) {
                var i = document.createElement("canvas");
                i.width = r, i.height = n, i.getContext("2d").drawImage(e, 0, 0, r, n), e = i
            }
            return e
        }, i.resizeImage = function (e, t, r) {
            e = this.protect(e);
            var n = Math.ceil(fn(e.width / t));
            n < 1 && (n = 1);
            for (var i = t * Math.pow(2, n - 1), o = r * Math.pow(2, n - 1); n--;) {
                var s = document.createElement("canvas");
                s.width = i, s.height = o, s.getContext("2d").drawImage(e, 0, 0, i, o), e = s, i = Math.round(i / 2), o = Math.round(o / 2)
            }
            return e
        }, i.rotateImage = function (e, t) {
            var r = e.width,
                n = e.height;
            90 !== t.deg && 270 !== t.deg || (r = e.height, n = e.width);
            var i = document.createElement("canvas");
            i.width = r, i.height = n;
            var o = i.getContext("2d");
            return o.translate(r / 2, n / 2), t.canvas && (o.rotate(t.rad), o.scale(t.scaleX, t.scaleY)), o.drawImage(e, -e.width / 2, -e.height / 2, e.width, e.height), i
        }, i.canvasToBlob = function (e, t, r) {
            try {
                e.getContext("2d").getImageData(0, 0, 1, 1)
            } catch (yc) {
                if (18 === yc.code) return Promise.reject(new Error("cannot read image, probably an svg with external resources"))
            }
            return e.toBlob ? new Promise((function (n) {
                e.toBlob(n, t, r)
            })).then((function (e) {
                if (null === e) throw new Error("cannot read image, probably an svg with external resources");
                return e
            })) : Promise.resolve().then((function () {
                return dn(e.toDataURL(t, r), {})
            })).then((function (e) {
                if (null === e) throw new Error("could not extract blob, probably an old browser");
                return e
            }))
        }, i.setPreviewURL = function (e, t) {
            this.uppy.setFileState(e, {
                preview: t
            })
        }, i.addToQueue = function (e) {
            this.queue.push(e), !1 === this.queueProcessing && this.processQueue()
        }, i.processQueue = function () {
            var e = this;
            if (this.queueProcessing = !0, this.queue.length > 0) {
                var t = this.uppy.getFile(this.queue.shift());
                return t ? this.requestThumbnail(t).catch((function (e) { })).then((function () {
                    return e.processQueue()
                })) : void this.uppy.log("[ThumbnailGenerator] file was removed before a thumbnail could be generated, but not removed from the queue. This is probably a bug", "error")
            }
            this.queueProcessing = !1, this.uppy.log("[ThumbnailGenerator] Emptied thumbnail queue"), this.uppy.emit("thumbnail:all-generated")
        }, i.requestThumbnail = function (e) {
            var t = this;
            return bt(e.type) && !e.isRemote ? this.createThumbnail(e, this.opts.thumbnailWidth, this.opts.thumbnailHeight).then((function (r) {
                t.setPreviewURL(e.id, r), t.uppy.log("[ThumbnailGenerator] Generated thumbnail for " + e.id), t.uppy.emit("thumbnail:generated", t.uppy.getFile(e.id), r)
            })).catch((function (r) {
                t.uppy.log("[ThumbnailGenerator] Failed thumbnail for " + e.id + ":", "warning"), t.uppy.log(r, "warning"), t.uppy.emit("thumbnail:error", t.uppy.getFile(e.id), r)
            })) : Promise.resolve()
        }, i.install = function () {
            this.uppy.on("file-removed", this.onFileRemoved), this.opts.lazy ? (this.uppy.on("thumbnail:request", this.onFileAdded), this.uppy.on("thumbnail:cancel", this.onCancelRequest)) : (this.uppy.on("file-added", this.onFileAdded), this.uppy.on("restored", this.onRestored)), this.opts.waitForThumbnailsBeforeUpload && this.uppy.addPreProcessor(this.waitUntilAllProcessed)
        }, i.uninstall = function () {
            this.uppy.off("file-removed", this.onFileRemoved), this.opts.lazy ? (this.uppy.off("thumbnail:request", this.onFileAdded), this.uppy.off("thumbnail:cancel", this.onCancelRequest)) : (this.uppy.off("file-added", this.onFileAdded), this.uppy.off("restored", this.onRestored)), this.opts.waitForThumbnailsBeforeUpload && this.uppy.removePreProcessor(this.waitUntilAllProcessed)
        }, n
    }(le.Plugin), Pn.VERSION = "1.6.7", Cn),
        Un = function (e) {
            if ("string" == typeof e) {
                var t = [].slice.call(document.querySelectorAll(e));
                return t.length > 0 ? t : null
            }
            if ("object" == typeof e && se(e)) return [e]
        },
        Rn = function (e) {
            return Array.prototype.slice.call(e || [], 0)
        },
        Tn = function (e, t) {
            var r = [],
                n = [];
            return Rn(e.items).forEach((function (e) {
                var i = e.webkitGetAsEntry();
                i && n.push(function e(n) {
                    return new Promise((function (i) {
                        if (n.isFile) n.file((function (e) {
                            var t;
                            e.relativePath = (t = n).fullPath && t.fullPath !== "/" + t.name ? t.fullPath : null, r.push(e), i()
                        }), (function (e) {
                            t(e), i()
                        }));
                        else if (n.isDirectory) {
                            ! function e(t, r, n, i) {
                                var o = i.onSuccess;
                                t.readEntries((function (i) {
                                    var s = [].concat(r, i);
                                    i.length ? setTimeout((function () {
                                        e(t, s, n, {
                                            onSuccess: o
                                        })
                                    }), 0) : o(s)
                                }), (function (e) {
                                    n(e), o(r)
                                }))
                            }(n.createReader(), [], t, {
                                onSuccess: function (t) {
                                    var r = t.map((function (t) {
                                        return e(t)
                                    }));
                                    Promise.all(r).then((function () {
                                        return i()
                                    }))
                                }
                            })
                        }
                    }))
                }(i))
            })), Promise.all(n).then((function () {
                return r
            }))
        },
        xn = function (e, t) {
            var r = (void 0 === t ? {} : t).logDropError,
                n = void 0 === r ? function () { } : r;
            return e.items && e.items[0] && "webkitGetAsEntry" in e.items[0] ? Tn(e, n) : function (e) {
                var t = Rn(e.files);
                return Promise.resolve(t)
            }(e)
        },
        Dn = function (e, t) {
            if (t) {
                var r = e.querySelector('[data-uppy-paneltype="' + t + '"]');
                if (r) return r
            }
            return e
        },
        Bn = ['a[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'area[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', "input:not([disabled]):not([inert]):not([aria-hidden])", "select:not([disabled]):not([inert]):not([aria-hidden])", "textarea:not([disabled]):not([inert]):not([aria-hidden])", "button:not([disabled]):not([inert]):not([aria-hidden])", 'iframe:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'object:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'embed:not([tabindex^="-"]):not([inert]):not([aria-hidden])', '[contenteditable]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', '[tabindex]:not([tabindex^="-"]):not([inert]):not([aria-hidden])'];

    function In(e, t) {
        var r = t[0];
        r && (r.focus(), e.preventDefault())
    }

    function jn(e, t, r) {
        var n = Dn(r, t),
            i = Rn(n.querySelectorAll(Bn)),
            o = i.indexOf(document.activeElement);
        ! function (e) {
            return e.contains(document.activeElement)
        }(n) ? In(e, i) : e.shiftKey && 0 === o ? function (e, t) {
            var r = t[t.length - 1];
            r && (r.focus(), e.preventDefault())
        }(e, i) : e.shiftKey || o !== i.length - 1 || In(e, i)
    }
    var Ln = function (e, t, r) {
        jn(e, t, r)
    },
        Mn = function (e, t, r) {
            null === t || jn(e, t, r)
        },
        Nn = {
            exports: {}
        };
    (function (e) {
        ! function (e, t) {
            "object" == typeof Nn.exports ? Nn.exports = t() : e.ResizeObserver = t()
        }(this, (function () {
            "use strict";
            var t = function () {
                if ("undefined" != typeof Map) return Map;

                function e(e, t) {
                    var r = -1;
                    return e.some((function (e, n) {
                        return e[0] === t && (r = n, !0)
                    })), r
                }
                return function () {
                    function t() {
                        this.__entries__ = []
                    }
                    return Object.defineProperty(t.prototype, "size", {
                        get: function () {
                            return this.__entries__.length
                        },
                        enumerable: !0,
                        configurable: !0
                    }), t.prototype.get = function (t) {
                        var r = e(this.__entries__, t),
                            n = this.__entries__[r];
                        return n && n[1]
                    }, t.prototype.set = function (t, r) {
                        var n = e(this.__entries__, t);
                        ~n ? this.__entries__[n][1] = r : this.__entries__.push([t, r])
                    }, t.prototype.delete = function (t) {
                        var r = this.__entries__,
                            n = e(r, t);
                        ~n && r.splice(n, 1)
                    }, t.prototype.has = function (t) {
                        return !!~e(this.__entries__, t)
                    }, t.prototype.clear = function () {
                        this.__entries__.splice(0)
                    }, t.prototype.forEach = function (e, t) {
                        void 0 === t && (t = null);
                        for (var r = 0, n = this.__entries__; r < n.length; r++) {
                            var i = n[r];
                            e.call(t, i[1], i[0])
                        }
                    }, t
                }()
            }(),
                r = "undefined" != typeof window && "undefined" != typeof document && window.document === document,
                n = void 0 !== e && e.Math === Math ? e : "undefined" != typeof self && self.Math === Math ? self : "undefined" != typeof window && window.Math === Math ? window : Function("return this")(),
                i = "function" == typeof requestAnimationFrame ? requestAnimationFrame.bind(n) : function (e) {
                    return setTimeout((function () {
                        return e(Date.now())
                    }), 1e3 / 60)
                },
                o = ["top", "right", "bottom", "left", "width", "height", "size", "weight"],
                s = "undefined" != typeof MutationObserver,
                a = function () {
                    function e() {
                        this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = function (e, t) {
                            var r = !1,
                                n = !1,
                                o = 0;

                            function s() {
                                r && (r = !1, e()), n && u()
                            }

                            function a() {
                                i(s)
                            }

                            function u() {
                                var e = Date.now();
                                if (r) {
                                    if (e - o < 2) return;
                                    n = !0
                                } else r = !0, n = !1, setTimeout(a, 20);
                                o = e
                            }
                            return u
                        }(this.refresh.bind(this))
                    }
                    return e.prototype.addObserver = function (e) {
                        ~this.observers_.indexOf(e) || this.observers_.push(e), this.connected_ || this.connect_()
                    }, e.prototype.removeObserver = function (e) {
                        var t = this.observers_,
                            r = t.indexOf(e);
                        ~r && t.splice(r, 1), !t.length && this.connected_ && this.disconnect_()
                    }, e.prototype.refresh = function () {
                        this.updateObservers_() && this.refresh()
                    }, e.prototype.updateObservers_ = function () {
                        var e = this.observers_.filter((function (e) {
                            return e.gatherActive(), e.hasActive()
                        }));
                        return e.forEach((function (e) {
                            return e.broadcastActive()
                        })), e.length > 0
                    }, e.prototype.connect_ = function () {
                        r && !this.connected_ && (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), s ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
                            attributes: !0,
                            childList: !0,
                            characterData: !0,
                            subtree: !0
                        })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0)
                    }, e.prototype.disconnect_ = function () {
                        r && this.connected_ && (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1)
                    }, e.prototype.onTransitionEnd_ = function (e) {
                        var t = e.propertyName,
                            r = void 0 === t ? "" : t;
                        o.some((function (e) {
                            return !!~r.indexOf(e)
                        })) && this.refresh()
                    }, e.getInstance = function () {
                        return this.instance_ || (this.instance_ = new e), this.instance_
                    }, e.instance_ = null, e
                }(),
                u = function (e, t) {
                    for (var r = 0, n = Object.keys(t); r < n.length; r++) {
                        var i = n[r];
                        Object.defineProperty(e, i, {
                            value: t[i],
                            enumerable: !1,
                            writable: !1,
                            configurable: !0
                        })
                    }
                    return e
                },
                l = function (e) {
                    return e && e.ownerDocument && e.ownerDocument.defaultView || n
                },
                c = y(0, 0, 0, 0);

            function p(e) {
                return parseFloat(e) || 0
            }

            function d(e) {
                for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
                return t.reduce((function (t, r) {
                    return t + p(e["border-" + r + "-width"])
                }), 0)
            }
            var h = "undefined" != typeof SVGGraphicsElement ? function (e) {
                return e instanceof l(e).SVGGraphicsElement
            } : function (e) {
                return e instanceof l(e).SVGElement && "function" == typeof e.getBBox
            };

            function f(e) {
                return r ? h(e) ? function (e) {
                    var t = e.getBBox();
                    return y(0, 0, t.width, t.height)
                }(e) : function (e) {
                    var t = e.clientWidth,
                        r = e.clientHeight;
                    if (!t && !r) return c;
                    var n = l(e).getComputedStyle(e),
                        i = function (e) {
                            for (var t = {}, r = 0, n = ["top", "right", "bottom", "left"]; r < n.length; r++) {
                                var i = n[r],
                                    o = e["padding-" + i];
                                t[i] = p(o)
                            }
                            return t
                        }(n),
                        o = i.left + i.right,
                        s = i.top + i.bottom,
                        a = p(n.width),
                        u = p(n.height);
                    if ("border-box" === n.boxSizing && (Math.round(a + o) !== t && (a -= d(n, "left", "right") + o), Math.round(u + s) !== r && (u -= d(n, "top", "bottom") + s)), ! function (e) {
                        return e === l(e).document.documentElement
                    }(e)) {
                        var h = Math.round(a + o) - t,
                            f = Math.round(u + s) - r;
                        1 !== Math.abs(h) && (a -= h), 1 !== Math.abs(f) && (u -= f)
                    }
                    return y(i.left, i.top, a, u)
                }(e) : c
            }

            function y(e, t, r, n) {
                return {
                    x: e,
                    y: t,
                    width: r,
                    height: n
                }
            }
            var g = function () {
                function e(e) {
                    this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = y(0, 0, 0, 0), this.target = e
                }
                return e.prototype.isActive = function () {
                    var e = f(this.target);
                    return this.contentRect_ = e, e.width !== this.broadcastWidth || e.height !== this.broadcastHeight
                }, e.prototype.broadcastRect = function () {
                    var e = this.contentRect_;
                    return this.broadcastWidth = e.width, this.broadcastHeight = e.height, e
                }, e
            }(),
                v = function (e, t) {
                    var r, n, i, o, s, a, l, c = (n = (r = t).x, i = r.y, o = r.width, s = r.height, a = "undefined" != typeof DOMRectReadOnly ? DOMRectReadOnly : Object, l = Object.create(a.prototype), u(l, {
                        x: n,
                        y: i,
                        width: o,
                        height: s,
                        top: i,
                        right: n + o,
                        bottom: s + i,
                        left: n
                    }), l);
                    u(this, {
                        target: e,
                        contentRect: c
                    })
                },
                m = function () {
                    function e(e, r, n) {
                        if (this.activeObservations_ = [], this.observations_ = new t, "function" != typeof e) throw new TypeError("The callback provided as parameter 1 is not a function.");
                        this.callback_ = e, this.controller_ = r, this.callbackCtx_ = n
                    }
                    return e.prototype.observe = function (e) {
                        if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
                        if ("undefined" != typeof Element && Element instanceof Object) {
                            if (!(e instanceof l(e).Element)) throw new TypeError('parameter 1 is not of type "Element".');
                            var t = this.observations_;
                            t.has(e) || (t.set(e, new g(e)), this.controller_.addObserver(this), this.controller_.refresh())
                        }
                    }, e.prototype.unobserve = function (e) {
                        if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
                        if ("undefined" != typeof Element && Element instanceof Object) {
                            if (!(e instanceof l(e).Element)) throw new TypeError('parameter 1 is not of type "Element".');
                            var t = this.observations_;
                            t.has(e) && (t.delete(e), t.size || this.controller_.removeObserver(this))
                        }
                    }, e.prototype.disconnect = function () {
                        this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this)
                    }, e.prototype.gatherActive = function () {
                        var e = this;
                        this.clearActive(), this.observations_.forEach((function (t) {
                            t.isActive() && e.activeObservations_.push(t)
                        }))
                    }, e.prototype.broadcastActive = function () {
                        if (this.hasActive()) {
                            var e = this.callbackCtx_,
                                t = this.activeObservations_.map((function (e) {
                                    return new v(e.target, e.broadcastRect())
                                }));
                            this.callback_.call(e, t, e), this.clearActive()
                        }
                    }, e.prototype.clearActive = function () {
                        this.activeObservations_.splice(0)
                    }, e.prototype.hasActive = function () {
                        return this.activeObservations_.length > 0
                    }, e
                }(),
                b = "undefined" != typeof WeakMap ? new WeakMap : new t,
                w = function e(t) {
                    if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function.");
                    if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
                    var r = a.getInstance(),
                        n = new m(t, r, this);
                    b.set(this, n)
                };
            return ["observe", "unobserve", "disconnect"].forEach((function (e) {
                w.prototype[e] = function () {
                    var t;
                    return (t = b.get(this))[e].apply(t, arguments)
                }
            })), void 0 !== n.ResizeObserver ? n.ResizeObserver : w
        }))
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}), Nn = Nn.exports;
    var zn = {};
    (function (e) {
        var t = /^\s+|\s+$/g,
            r = /^[-+]0x[0-9a-f]+$/i,
            n = /^0b[01]+$/i,
            i = /^0o[0-7]+$/i,
            o = parseInt,
            s = "object" == typeof e && e && e.Object === Object && e,
            a = "object" == typeof self && self && self.Object === Object && self,
            u = s || a || Function("return this")(),
            l = Object.prototype.toString,
            c = Math.max,
            p = Math.min,
            d = function () {
                return u.Date.now()
            };

        function h(e) {
            var t = typeof e;
            return !!e && ("object" == t || "function" == t)
        }

        function f(e) {
            if ("number" == typeof e) return e;
            if (function (e) {
                return "symbol" == typeof e || function (e) {
                    return !!e && "object" == typeof e
                }(e) && "[object Symbol]" == l.call(e)
            }(e)) return NaN;
            if (h(e)) {
                var s = "function" == typeof e.valueOf ? e.valueOf() : e;
                e = h(s) ? s + "" : s
            }
            if ("string" != typeof e) return 0 === e ? e : +e;
            e = e.replace(t, "");
            var a = n.test(e);
            return a || i.test(e) ? o(e.slice(2), a ? 2 : 8) : r.test(e) ? NaN : +e
        }
        zn = function (e, t, r) {
            var n, i, o, s, a, u, l = 0,
                y = !1,
                g = !1,
                v = !0;
            if ("function" != typeof e) throw new TypeError("Expected a function");

            function m(t) {
                var r = n,
                    o = i;
                return n = i = void 0, l = t, s = e.apply(o, r)
            }

            function b(e) {
                var r = e - u;
                return void 0 === u || r >= t || r < 0 || g && e - l >= o
            }

            function w() {
                var e = d();
                if (b(e)) return _(e);
                a = setTimeout(w, function (e) {
                    var r = t - (e - u);
                    return g ? p(r, o - (e - l)) : r
                }(e))
            }

            function _(e) {
                return a = void 0, v && n ? m(e) : (n = i = void 0, s)
            }

            function S() {
                var e = d(),
                    r = b(e);
                if (n = arguments, i = this, u = e, r) {
                    if (void 0 === a) return function (e) {
                        return l = e, a = setTimeout(w, t), y ? m(e) : s
                    }(u);
                    if (g) return a = setTimeout(w, t), m(u)
                }
                return void 0 === a && (a = setTimeout(w, t)), s
            }
            return t = f(t) || 0, h(r) && (y = !!r.leading, o = (g = "maxWait" in r) ? c(f(r.maxWait) || 0, t) : o, v = "trailing" in r ? !!r.trailing : v), S.cancel = function () {
                void 0 !== a && clearTimeout(a), l = 0, n = u = i = a = void 0
            }, S.flush = function () {
                return void 0 === a ? s : _(d())
            }, S
        }
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});

    function qn(e, t) {
        if (e.length !== t.length) return !1;
        for (var r = 0; r < e.length; r++)
            if (e[r] !== t[r]) return !1;
        return !0
    }
    var Hn, Vn, Wn = function (e, t) {
        var r;
        void 0 === t && (t = qn);
        var n, i = [],
            o = !1;
        return function () {
            for (var s = [], a = 0; a < arguments.length; a++) s[a] = arguments[a];
            return o && r === this && t(s, i) || (n = e.apply(this, s), o = !0, r = this, i = s), n
        }
    };

    function Xn() {
        return (Xn = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function Gn(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var Kn = le.Plugin,
        $n = Nn.default || Nn,
        Yn = Wn.default || Wn;

    function Jn() {
        var e = {};
        return e.promise = new Promise((function (t, r) {
            e.resolve = t, e.reject = r
        })), e
    }

    function Qn() {
        return h("svg", {
            "aria-hidden": "true",
            focusable: "false",
            width: "30",
            height: "30",
            viewBox: "0 0 30 30"
        }, h("path", {
            d: "M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15zm4.258-12.676v6.846h-8.426v-6.846H5.204l9.82-12.364 9.82 12.364H19.26z"
        }))
    }
    var Zn, ei, ti = (Vn = Hn = function (e) {
        var t, r;

        function n(t, r) {
            var n;
            (n = e.call(this, t, r) || this).setOptions = function (t) {
                e.prototype.setOptions.call(Gn(n), t), n.i18nInit()
            }, n.i18nInit = function () {
                n.translator = new E([n.defaultLocale, n.uppy.locale, n.opts.locale]), n.i18n = n.translator.translate.bind(n.translator), n.i18nArray = n.translator.translateArray.bind(n.translator), n.setPluginState()
            }, n.removeTarget = function (e) {
                var t = n.getPluginState().targets.filter((function (t) {
                    return t.id !== e.id
                }));
                n.setPluginState({
                    targets: t
                })
            }, n.addTarget = function (e) {
                var t = e.id || e.constructor.name,
                    r = e.title || t,
                    i = e.type;
                if ("acquirer" === i || "progressindicator" === i || "editor" === i) {
                    var o = {
                        id: t,
                        name: r,
                        type: i
                    },
                        s = n.getPluginState().targets.slice();
                    return s.push(o), n.setPluginState({
                        targets: s
                    }), n.el
                }
                n.uppy.log("Dashboard: can only be targeted by plugins of types: acquirer, progressindicator, editor", "error")
            }, n.hideAllPanels = function () {
                var e = {
                    activePickerPanel: !1,
                    showAddFilesPanel: !1,
                    activeOverlayType: null,
                    fileCardFor: null,
                    showFileEditor: !1
                },
                    t = n.getPluginState();
                t.activePickerPanel === e.activePickerPanel && t.showAddFilesPanel === e.showAddFilesPanel && t.showFileEditor === e.showFileEditor && t.activeOverlayType === e.activeOverlayType || (console.log(e), n.setPluginState(e))
            }, n.showPanel = function (e) {
                var t = n.getPluginState().targets.filter((function (t) {
                    return "acquirer" === t.type && t.id === e
                }))[0];
                n.setPluginState({
                    activePickerPanel: t,
                    activeOverlayType: "PickerPanel"
                })
            }, n.canEditFile = function (e) {
                var t = n.getPluginState().targets;
                return n._getEditors(t).some((function (t) {
                    return n.uppy.getPlugin(t.id).canEditFile(e)
                }))
            }, n.openFileEditor = function (e) {
                var t = n.getPluginState().targets,
                    r = n._getEditors(t);
                n.setPluginState({
                    showFileEditor: !0,
                    activeOverlayType: "FileEditor"
                }), r.forEach((function (t) {
                    n.uppy.getPlugin(t.id).selectFile(e)
                }))
            }, n.openModal = function () {
                var e = Jn(),
                    t = e.promise,
                    r = e.resolve;
                return n.savedScrollPosition = window.pageYOffset, n.savedActiveElement = document.activeElement, n.opts.disablePageScrollWhenModalOpen && document.body.classList.add("uppy-Dashboard-isFixed"), n.opts.animateOpenClose && n.getPluginState().isClosing ? n.el.addEventListener("animationend", (function e() {
                    n.setPluginState({
                        isHidden: !1
                    }), n.el.removeEventListener("animationend", e, !1), r()
                }), !1) : (n.setPluginState({
                    isHidden: !1
                }), r()), n.opts.browserBackButtonClose && n.updateBrowserHistory(), document.addEventListener("keydown", n.handleKeyDownInModal), n.uppy.emit("dashboard:modal-open"), t
            }, n.closeModal = function (e) {
                void 0 === e && (e = {});
                var t = e.manualClose,
                    r = void 0 === t || t,
                    i = n.getPluginState(),
                    o = i.isHidden,
                    s = i.isClosing;
                if (!o && !s) {
                    var a = Jn(),
                        u = a.promise,
                        l = a.resolve;
                    return n.opts.disablePageScrollWhenModalOpen && document.body.classList.remove("uppy-Dashboard-isFixed"), n.opts.animateOpenClose ? (n.setPluginState({
                        isClosing: !0
                    }), n.el.addEventListener("animationend", (function e() {
                        n.setPluginState({
                            isHidden: !0,
                            isClosing: !1
                        }), n.superFocus.cancel(), n.savedActiveElement.focus(), n.el.removeEventListener("animationend", e, !1), l()
                    }), !1)) : (n.setPluginState({
                        isHidden: !0
                    }), n.superFocus.cancel(), n.savedActiveElement.focus(), l()), document.removeEventListener("keydown", n.handleKeyDownInModal), r && n.opts.browserBackButtonClose && history.state && history.state[n.modalName] && history.go(-1), n.uppy.emit("dashboard:modal-closed"), u
                }
            }, n.isModalOpen = function () {
                return !n.getPluginState().isHidden || !1
            }, n.requestCloseModal = function () {
                return n.opts.onRequestCloseModal ? n.opts.onRequestCloseModal() : n.closeModal()
            }, n.setDarkModeCapability = function (e) {
                var t = n.uppy.getState().capabilities;
                n.uppy.setState({
                    capabilities: Xn({}, t, {
                        darkMode: e
                    })
                })
            }, n.handleSystemDarkModeChange = function (e) {
                var t = e.matches;
                n.uppy.log("[Dashboard] Dark mode is " + (t ? "on" : "off")), n.setDarkModeCapability(t)
            }, n.toggleFileCard = function (e) {
                e ? n.uppy.emit("dashboard:file-edit-start") : n.uppy.emit("dashboard:file-edit-complete"), n.setPluginState({
                    fileCardFor: e || null,
                    activeOverlayType: e ? "FileCard" : null
                })
            }, n.toggleAddFilesPanel = function (e) {
                n.setPluginState({
                    showAddFilesPanel: e,
                    activeOverlayType: e ? "AddFiles" : null
                })
            }, n.addFiles = function (e) {
                var t = e.map((function (e) {
                    return {
                        source: n.id,
                        name: e.name,
                        type: e.type,
                        data: e,
                        meta: {
                            relativePath: e.relativePath || null
                        }
                    }
                }));
                try {
                    n.uppy.addFiles(t)
                } catch (yc) {
                    n.uppy.log(yc)
                }
            }, n.startListeningToResize = function () {
                n.resizeObserver = new $n((function (e, t) {
                    var r = e[0].contentRect,
                        i = r.width,
                        o = r.height;
                    n.uppy.log("[Dashboard] resized: " + i + " / " + o, "debug"), n.setPluginState({
                        containerWidth: i,
                        containerHeight: o,
                        areInsidesReadyToBeVisible: !0
                    })
                })), n.resizeObserver.observe(n.el.querySelector(".uppy-Dashboard-inner")), n.makeDashboardInsidesVisibleAnywayTimeout = setTimeout((function () {
                    var e = n.getPluginState(),
                        t = !n.opts.inline && e.isHidden;
                    e.areInsidesReadyToBeVisible || t || (n.uppy.log("[Dashboard] resize event didn't fire on time: defaulted to mobile layout", "debug"), n.setPluginState({
                        areInsidesReadyToBeVisible: !0
                    }))
                }), 1e3)
            }, n.stopListeningToResize = function () {
                n.resizeObserver.disconnect(), clearTimeout(n.makeDashboardInsidesVisibleAnywayTimeout)
            }, n.recordIfFocusedOnUppyRecently = function (e) {
                n.el.contains(e.target) ? n.ifFocusedOnUppyRecently = !0 : (n.ifFocusedOnUppyRecently = !1, n.superFocus.cancel())
            }, n.updateBrowserHistory = function () {
                var e;
                history.state && history.state[n.modalName] || history.pushState(Xn({}, history.state, ((e = {})[n.modalName] = !0, e)), ""), window.addEventListener("popstate", n.handlePopState, !1)
            }, n.handlePopState = function (e) {
                !n.isModalOpen() || e.state && e.state[n.modalName] || n.closeModal({
                    manualClose: !1
                }), !n.isModalOpen() && e.state && e.state[n.modalName] && history.go(-1)
            }, n.handleKeyDownInModal = function (e) {
                27 === e.keyCode && n.requestCloseModal(e), 9 === e.keyCode && Ln(e, n.getPluginState().activeOverlayType, n.el)
            }, n.handleClickOutside = function () {
                n.opts.closeModalOnClickOutside && n.requestCloseModal()
            }, n.handlePaste = function (e) {
                n.uppy.iteratePlugins((function (t) {
                    "acquirer" === t.type && t.handleRootPaste && t.handleRootPaste(e)
                }));
                var t = Rn(e.clipboardData.files);
                n.addFiles(t)
            }, n.handleInputChange = function (e) {
                e.preventDefault();
                var t = Rn(e.target.files);
                n.addFiles(t)
            }, n.handleDragOver = function (e) {
                e.preventDefault(), e.stopPropagation(), e.dataTransfer.dropEffect = "copy", clearTimeout(n.removeDragOverClassTimeout), n.setPluginState({
                    isDraggingOver: !0
                })
            }, n.handleDragLeave = function (e) {
                e.preventDefault(), e.stopPropagation(), clearTimeout(n.removeDragOverClassTimeout), n.removeDragOverClassTimeout = setTimeout((function () {
                    n.setPluginState({
                        isDraggingOver: !1
                    })
                }), 50)
            }, n.handleDrop = function (e, t) {
                e.preventDefault(), e.stopPropagation(), clearTimeout(n.removeDragOverClassTimeout), n.setPluginState({
                    isDraggingOver: !1
                }), n.uppy.iteratePlugins((function (t) {
                    "acquirer" === t.type && t.handleRootDrop && t.handleRootDrop(e)
                }));
                var r = !1;
                xn(e.dataTransfer, {
                    logDropError: function (e) {
                        n.uppy.log(e, "error"), r || (n.uppy.info(e.message, "error"), r = !0)
                    }
                }).then((function (e) {
                    e.length > 0 && (n.uppy.log("[Dashboard] Files were dropped"), n.addFiles(e))
                }))
            }, n.handleRequestThumbnail = function (e) {
                n.opts.waitForThumbnailsBeforeUpload || n.uppy.emit("thumbnail:request", e)
            }, n.handleCancelThumbnail = function (e) {
                n.opts.waitForThumbnailsBeforeUpload || n.uppy.emit("thumbnail:cancel", e)
            }, n.handleKeyDownInInline = function (e) {
                9 === e.keyCode && Mn(e, n.getPluginState().activeOverlayType, n.el)
            }, n.handlePasteOnBody = function (e) {
                n.el.contains(document.activeElement) && n.handlePaste(e)
            }, n.handleComplete = function (e) {
                var t = e.failed;
                e.uploadID, n.opts.closeAfterFinish && 0 === t.length && n.requestCloseModal()
            }, n.initEvents = function () {
                if (n.opts.trigger && !n.opts.inline) {
                    var e = Un(n.opts.trigger);
                    e ? e.forEach((function (e) {
                        return e.addEventListener("click", n.openModal)
                    })) : n.uppy.log("Dashboard modal trigger not found. Make sure `trigger` is set in Dashboard options, unless you are planning to call `dashboard.openModal()` method yourself", "warning")
                }
                n.startListeningToResize(), document.addEventListener("paste", n.handlePasteOnBody), n.uppy.on("plugin-remove", n.removeTarget), n.uppy.on("file-added", n.hideAllPanels), n.uppy.on("dashboard:modal-closed", n.hideAllPanels), n.uppy.on("file-editor:complete", n.hideAllPanels), n.uppy.on("complete", n.handleComplete), document.addEventListener("focus", n.recordIfFocusedOnUppyRecently, !0), document.addEventListener("click", n.recordIfFocusedOnUppyRecently, !0), n.opts.inline && n.el.addEventListener("keydown", n.handleKeyDownInInline)
            }, n.removeEvents = function () {
                var e = Un(n.opts.trigger);
                !n.opts.inline && e && e.forEach((function (e) {
                    return e.removeEventListener("click", n.openModal)
                })), n.stopListeningToResize(), document.removeEventListener("paste", n.handlePasteOnBody), window.removeEventListener("popstate", n.handlePopState, !1), n.uppy.off("plugin-remove", n.removeTarget), n.uppy.off("file-added", n.hideAllPanels), n.uppy.off("dashboard:modal-closed", n.hideAllPanels), n.uppy.off("complete", n.handleComplete), document.removeEventListener("focus", n.recordIfFocusedOnUppyRecently), document.removeEventListener("click", n.recordIfFocusedOnUppyRecently), n.opts.inline && n.el.removeEventListener("keydown", n.handleKeyDownInInline)
            }, n.superFocusOnEachUpdate = function () {
                var e = n.el.contains(document.activeElement),
                    t = document.activeElement === document.body || null === document.activeElement,
                    r = n.uppy.getState().info.isHidden,
                    i = !n.opts.inline;
                r && (i || e || t && n.ifFocusedOnUppyRecently) ? n.superFocus(n.el, n.getPluginState().activeOverlayType) : n.superFocus.cancel()
            }, n.afterUpdate = function () {
                n.superFocusOnEachUpdate()
            }, n.cancelUpload = function (e) {
                n.uppy.removeFile(e)
            }, n.saveFileCard = function (e, t) {
                n.uppy.setFileMeta(t, e), n.toggleFileCard()
            }, n._attachRenderFunctionToTarget = function (e) {
                var t = n.uppy.getPlugin(e.id);
                return Xn({}, e, {
                    icon: t.icon || n.opts.defaultPickerIcon,
                    render: t.render
                })
            }, n._isTargetSupported = function (e) {
                var t = n.uppy.getPlugin(e.id);
                return "function" != typeof t.isSupported || t.isSupported()
            }, n._getAcquirers = Yn((function (e) {
                return e.filter((function (e) {
                    return "acquirer" === e.type && n._isTargetSupported(e)
                })).map(n._attachRenderFunctionToTarget)
            })), n._getProgressIndicators = Yn((function (e) {
                return e.filter((function (e) {
                    return "progressindicator" === e.type
                })).map(n._attachRenderFunctionToTarget)
            })), n._getEditors = Yn((function (e) {
                return e.filter((function (e) {
                    return "editor" === e.type
                })).map(n._attachRenderFunctionToTarget)
            })), n.render = function (e) {
                var t, r = n.getPluginState(),
                    i = e.files,
                    o = e.capabilities,
                    s = e.allowNewUpload,
                    a = Object.keys(i).filter((function (e) {
                        return !i[e].progress.uploadStarted
                    })),
                    u = Object.keys(i).filter((function (e) {
                        return i[e].progress.uploadStarted
                    })),
                    l = Object.keys(i).filter((function (e) {
                        return i[e].isPaused
                    })),
                    c = Object.keys(i).filter((function (e) {
                        return i[e].progress.uploadComplete
                    })),
                    p = Object.keys(i).filter((function (e) {
                        return i[e].error
                    })),
                    d = Object.keys(i).filter((function (e) {
                        return !i[e].progress.uploadComplete && i[e].progress.uploadStarted
                    })),
                    h = d.filter((function (e) {
                        return !i[e].isPaused
                    })),
                    f = Object.keys(i).filter((function (e) {
                        return i[e].progress.preprocess || i[e].progress.postprocess
                    })),
                    y = u.length > 0,
                    g = 100 === e.totalProgress && c.length === Object.keys(i).length && 0 === f.length,
                    v = y && p.length === u.length,
                    m = 0 !== d.length && l.length === d.length,
                    b = n._getAcquirers(r.targets),
                    w = n._getProgressIndicators(r.targets),
                    _ = n._getEditors(r.targets);
                return t = "auto" === n.opts.theme ? o.darkMode ? "dark" : "light" : n.opts.theme, ["files", "folders", "both"].indexOf(n.opts.fileManagerSelectionType) < 0 && (n.opts.fileManagerSelectionType = "files", console.error('Unsupported option for "fileManagerSelectionType". Using default of "' + n.opts.fileManagerSelectionType + '".')),
                    function (e) {
                        var t = 0 === e.totalFileCount,
                            r = e.containerWidth > 576,
                            n = qe({
                                "uppy-Root": e.isTargetDOMEl,
                                "uppy-Dashboard": !0,
                                "uppy-Dashboard--animateOpenClose": e.animateOpenClose,
                                "uppy-Dashboard--isClosing": e.isClosing,
                                "uppy-Dashboard--isDraggingOver": e.isDraggingOver,
                                "uppy-Dashboard--modal": !e.inline,
                                "uppy-size--md": e.containerWidth > 576,
                                "uppy-size--lg": e.containerWidth > 700,
                                "uppy-size--xl": e.containerWidth > 900,
                                "uppy-size--height-md": e.containerHeight > 400,
                                "uppy-Dashboard--isAddFilesPanelVisible": e.showAddFilesPanel,
                                "uppy-Dashboard--isInnerWrapVisible": e.areInsidesReadyToBeVisible
                            }),
                            i = 1;
                        e.containerWidth > 900 ? i = 5 : e.containerWidth > 700 ? i = 4 : e.containerWidth > 576 && (i = 3);
                        var o = e.showSelectedFiles && !t;
                        return Rr("div", {
                            class: n,
                            "data-uppy-theme": e.theme,
                            "data-uppy-num-acquirers": e.acquirers.length,
                            "data-uppy-drag-drop-supported": Fr(),
                            "aria-hidden": e.inline ? "false" : e.isHidden,
                            "aria-label": e.inline ? e.i18n("dashboardTitle") : e.i18n("dashboardWindowTitle"),
                            onpaste: e.handlePaste,
                            onDragOver: e.handleDragOver,
                            onDragLeave: e.handleDragLeave,
                            onDrop: e.handleDrop
                        }, Rr("div", {
                            class: "uppy-Dashboard-overlay",
                            tabindex: -1,
                            onclick: e.handleClickOutside
                        }), Rr("div", {
                            class: "uppy-Dashboard-inner",
                            "aria-modal": !e.inline && "true",
                            role: !e.inline && "dialog",
                            style: {
                                width: e.inline && e.width ? e.width : "",
                                height: e.inline && e.height ? e.height : ""
                            }
                        }, e.inline ? null : Rr("button", {
                            class: "uppy-u-reset uppy-Dashboard-close",
                            type: "button",
                            "aria-label": e.i18n("closeModal"),
                            title: e.i18n("closeModal"),
                            onclick: e.closeModal
                        }, Rr("span", {
                            "aria-hidden": "true"
                        }, "\xd7")), Rr("div", {
                            class: "uppy-Dashboard-innerWrap"
                        }, Rr("div", {
                            class: "uppy-Dashboard-dropFilesHereHint"
                        }, e.i18n("dropHint")), o && Rr(kr, e), o ? Rr(ir, Ur({}, e, {
                            itemsPerRow: i
                        })) : Rr(sr, Ur({}, e, {
                            isSizeMD: r
                        })), Rr(Tr, null, e.showAddFilesPanel ? Rr(ur, Ur({
                            key: "AddFiles"
                        }, e, {
                            isSizeMD: r
                        })) : null), Rr(Tr, null, e.fileCardFor ? Rr(Ar, Ur({
                            key: "FileCard"
                        }, e)) : null), Rr(Tr, null, e.activePickerPanel ? Rr(pr, Ur({
                            key: "Picker"
                        }, e)) : null), Rr(Tr, null, e.showFileEditor ? Rr(hr, Ur({
                            key: "Editor"
                        }, e)) : null), Rr("div", {
                            class: "uppy-Dashboard-progressindicators"
                        }, e.progressindicators.map((function (t) {
                            return e.getPlugin(t.id).render(e.state)
                        }))))))
                    }({
                        state: e,
                        isHidden: r.isHidden,
                        files: i,
                        newFiles: a,
                        uploadStartedFiles: u,
                        completeFiles: c,
                        erroredFiles: p,
                        inProgressFiles: d,
                        inProgressNotPausedFiles: h,
                        processingFiles: f,
                        isUploadStarted: y,
                        isAllComplete: g,
                        isAllErrored: v,
                        isAllPaused: m,
                        totalFileCount: Object.keys(i).length,
                        totalProgress: e.totalProgress,
                        allowNewUpload: s,
                        acquirers: b,
                        theme: t,
                        activePickerPanel: r.activePickerPanel,
                        showFileEditor: r.showFileEditor,
                        animateOpenClose: n.opts.animateOpenClose,
                        isClosing: r.isClosing,
                        getPlugin: n.uppy.getPlugin,
                        progressindicators: w,
                        editors: _,
                        autoProceed: n.uppy.opts.autoProceed,
                        id: n.id,
                        closeModal: n.requestCloseModal,
                        handleClickOutside: n.handleClickOutside,
                        handleInputChange: n.handleInputChange,
                        handlePaste: n.handlePaste,
                        inline: n.opts.inline,
                        showPanel: n.showPanel,
                        hideAllPanels: n.hideAllPanels,
                        log: n.uppy.log,
                        i18n: n.i18n,
                        i18nArray: n.i18nArray,
                        removeFile: n.uppy.removeFile,
                        uppy: n.uppy,
                        info: n.uppy.info,
                        note: n.opts.note,
                        metaFields: r.metaFields,
                        resumableUploads: o.resumableUploads || !1,
                        individualCancellation: o.individualCancellation,
                        isMobileDevice: o.isMobileDevice,
                        pauseUpload: n.uppy.pauseResume,
                        retryUpload: n.uppy.retryUpload,
                        cancelUpload: n.cancelUpload,
                        cancelAll: n.uppy.cancelAll,
                        fileCardFor: r.fileCardFor,
                        toggleFileCard: n.toggleFileCard,
                        toggleAddFilesPanel: n.toggleAddFilesPanel,
                        showAddFilesPanel: r.showAddFilesPanel,
                        saveFileCard: n.saveFileCard,
                        openFileEditor: n.openFileEditor,
                        canEditFile: n.canEditFile,
                        width: n.opts.width,
                        height: n.opts.height,
                        showLinkToFileUploadResult: n.opts.showLinkToFileUploadResult,
                        fileManagerSelectionType: n.opts.fileManagerSelectionType,
                        proudlyDisplayPoweredByUppy: n.opts.proudlyDisplayPoweredByUppy,
                        hideCancelButton: n.opts.hideCancelButton,
                        hideRetryButton: n.opts.hideRetryButton,
                        hidePauseResumeButton: n.opts.hidePauseResumeButton,
                        showRemoveButtonAfterComplete: n.opts.showRemoveButtonAfterComplete,
                        containerWidth: r.containerWidth,
                        containerHeight: r.containerHeight,
                        areInsidesReadyToBeVisible: r.areInsidesReadyToBeVisible,
                        isTargetDOMEl: n.isTargetDOMEl,
                        parentElement: n.el,
                        allowedFileTypes: n.uppy.opts.restrictions.allowedFileTypes,
                        maxNumberOfFiles: n.uppy.opts.restrictions.maxNumberOfFiles,
                        showSelectedFiles: n.opts.showSelectedFiles,
                        handleRequestThumbnail: n.handleRequestThumbnail,
                        handleCancelThumbnail: n.handleCancelThumbnail,
                        isDraggingOver: r.isDraggingOver,
                        handleDragOver: n.handleDragOver,
                        handleDragLeave: n.handleDragLeave,
                        handleDrop: n.handleDrop
                    })
            }, n.discoverProviderPlugins = function () {
                n.uppy.iteratePlugins((function (e) {
                    e && !e.target && e.opts && e.opts.target === n.constructor && n.addTarget(e)
                }))
            }, n.install = function () {
                n.setPluginState({
                    isHidden: !0,
                    fileCardFor: null,
                    activeOverlayType: null,
                    showAddFilesPanel: !1,
                    activePickerPanel: !1,
                    showFileEditor: !1,
                    metaFields: n.opts.metaFields,
                    targets: [],
                    areInsidesReadyToBeVisible: !1,
                    isDraggingOver: !1
                });
                var e = n.opts,
                    t = e.inline,
                    r = e.closeAfterFinish;
                if (t && r) throw new Error("[Dashboard] `closeAfterFinish: true` cannot be used on an inline Dashboard, because an inline Dashboard cannot be closed at all. Either set `inline: false`, or disable the `closeAfterFinish` option.");
                n.uppy.opts.allowMultipleUploads && r && n.uppy.log("[Dashboard] When using `closeAfterFinish`, we recommended setting the `allowMultipleUploads` option to `false` in the Uppy constructor. See https://uppy.io/docs/uppy/#allowMultipleUploads-true", "warning");
                var i = n.opts.target;
                i && n.mount(i, Gn(n)), (n.opts.plugins || []).forEach((function (e) {
                    var t = n.uppy.getPlugin(e);
                    t && t.mount(Gn(n), t)
                })), n.opts.disableStatusBar || n.uppy.use(an, {
                    id: n.id + ":StatusBar",
                    target: Gn(n),
                    hideUploadButton: n.opts.hideUploadButton,
                    hideRetryButton: n.opts.hideRetryButton,
                    hidePauseResumeButton: n.opts.hidePauseResumeButton,
                    hideCancelButton: n.opts.hideCancelButton,
                    showProgressDetails: n.opts.showProgressDetails,
                    hideAfterFinish: n.opts.hideProgressAfterFinish,
                    locale: n.opts.locale
                }), n.opts.disableInformer || n.uppy.use(pn, {
                    id: n.id + ":Informer",
                    target: Gn(n)
                }), n.opts.disableThumbnailGenerator || n.uppy.use(On, {
                    id: n.id + ":ThumbnailGenerator",
                    thumbnailWidth: n.opts.thumbnailWidth,
                    waitForThumbnailsBeforeUpload: n.opts.waitForThumbnailsBeforeUpload,
                    lazy: !n.opts.waitForThumbnailsBeforeUpload
                }), n.darkModeMediaQuery = "undefined" != typeof window && window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
                var o = !!n.darkModeMediaQuery && n.darkModeMediaQuery.matches;
                n.uppy.log("[Dashboard] Dark mode is " + (o ? "on" : "off")), n.setDarkModeCapability(o), "auto" === n.opts.theme && n.darkModeMediaQuery.addListener(n.handleSystemDarkModeChange), n.discoverProviderPlugins(), n.initEvents()
            }, n.uninstall = function () {
                if (!n.opts.disableInformer) {
                    var e = n.uppy.getPlugin(n.id + ":Informer");
                    e && n.uppy.removePlugin(e)
                }
                if (!n.opts.disableStatusBar) {
                    var t = n.uppy.getPlugin(n.id + ":StatusBar");
                    t && n.uppy.removePlugin(t)
                }
                if (!n.opts.disableThumbnailGenerator) {
                    var r = n.uppy.getPlugin(n.id + ":ThumbnailGenerator");
                    r && n.uppy.removePlugin(r)
                } (n.opts.plugins || []).forEach((function (e) {
                    var t = n.uppy.getPlugin(e);
                    t && t.unmount()
                })), "auto" === n.opts.theme && n.darkModeMediaQuery.removeListener(n.handleSystemDarkModeChange), n.unmount(), n.removeEvents()
            }, n.id = n.opts.id || "Dashboard", n.title = "Dashboard", n.type = "orchestrator", n.modalName = "uppy-Dashboard-" + I(), n.defaultLocale = {
                strings: {
                    closeModal: "Close Modal",
                    importFrom: "Import from %{name}",
                    addingMoreFiles: "Adding more files",
                    addMoreFiles: "Add more files",
                    dashboardWindowTitle: "File Uploader Window (Press escape to close)",
                    dashboardTitle: "File Uploader",
                    copyLinkToClipboardSuccess: "Link copied to clipboard",
                    copyLinkToClipboardFallback: "Copy the URL below",
                    copyLink: "Copy link",
                    fileSource: "File source: %{name}",
                    done: "Done",
                    back: "Back",
                    addMore: "Thêm file",
                    removeFile: "Xóa file",
                    editFile: "Edit file",
                    editing: "Editing %{file}",
                    finishEditingFile: "Finish editing file",
                    saveChanges: "Save changes",
                    cancel: "Hủy",
                    myDevice: "My Device",
                    dropPasteFiles: "Kéo thả file vào đây, dán hoặc %{browseFiles}",
                    dropPasteFolders: "Drop files here, paste or %{browseFolders}",
                    dropPasteBoth: "Drop files here, paste, %{browseFiles} or %{browseFolders}",
                    dropPasteImportFiles: "Drop files here, paste, %{browseFiles} or import from:",
                    dropPasteImportFolders: "Drop files here, paste, %{browseFolders} or import from:",
                    dropPasteImportBoth: "Drop files here, paste, %{browseFiles}, %{browseFolders} or import from:",
                    dropHint: "Drop your files here",
                    browseFiles: "chọn file",
                    browseFolders: "browse folders",
                    uploadComplete: "Upload complete",
                    uploadPaused: "Upload paused",
                    resumeUpload: "Resume upload",
                    pauseUpload: "Pause upload",
                    retryUpload: "Retry upload",
                    cancelUpload: "Cancel upload",
                    xFilesSelected: {
                        0: "Đã chọn %{smart_count} file",
                        1: "Đã chọn %{smart_count} file"
                    },
                    uploadingXFiles: {
                        0: "Uploading %{smart_count} file",
                        1: "Uploading %{smart_count} files"
                    },
                    processingXFiles: {
                        0: "Processing %{smart_count} file",
                        1: "Processing %{smart_count} files"
                    },
                    poweredBy2: "%{backwardsCompat} %{uppy}",
                    poweredBy: "Powered by"
                }
            };
            var i, o = {
                target: "body",
                metaFields: [],
                trigger: "#uppy-select-files",
                inline: !1,
                width: 750,
                height: 550,
                thumbnailWidth: 280,
                waitForThumbnailsBeforeUpload: !1,
                defaultPickerIcon: Qn,
                showLinkToFileUploadResult: !0,
                showProgressDetails: !1,
                hideUploadButton: !1,
                hideCancelButton: !1,
                hideRetryButton: !1,
                hidePauseResumeButton: !1,
                hideProgressAfterFinish: !1,
                note: null,
                closeModalOnClickOutside: !1,
                closeAfterFinish: !1,
                disableStatusBar: !1,
                disableInformer: !1,
                disableThumbnailGenerator: !1,
                disablePageScrollWhenModalOpen: !0,
                animateOpenClose: !0,
                fileManagerSelectionType: "files",
                proudlyDisplayPoweredByUppy: !0,
                onRequestCloseModal: function () {
                    return n.closeModal()
                },
                showSelectedFiles: !0,
                showRemoveButtonAfterComplete: !1,
                browserBackButtonClose: !1,
                theme: "light"
            };
            return n.opts = Xn({}, o, r), n.i18nInit(), n.superFocus = (i = !1, zn((function (e, t) {
                var r = Dn(e, t),
                    n = r.contains(document.activeElement);
                if (!n || !i) {
                    var o = r.querySelector("[data-uppy-super-focusable]");
                    if (!n || o)
                        if (o) o.focus({
                            preventScroll: !0
                        }), i = !0;
                        else {
                            var s = r.querySelector(Bn);
                            s && s.focus({
                                preventScroll: !0
                            }), i = !1
                        }
                }
            }), 260)), n.ifFocusedOnUppyRecently = !1, n.makeDashboardInsidesVisibleAnywayTimeout = null, n.removeDragOverClassTimeout = null, n
        }
        return r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r, n
    }(Kn), Hn.VERSION = "1.12.6", Vn);

    function ri() {
        return (ri = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function ni(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var ii, oi, si = le.Plugin,
        ai = oe.h,
        ui = (ei = Zn = function (e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).type = "acquirer", n.id = n.opts.id || "DragDrop", n.title = "Drag & Drop", n.defaultLocale = {
                    strings: {
                        dropHereOr: "Drop files here or %{browse}",
                        browse: "browse"
                    }
                }, n.opts = ri({}, {
                    target: null,
                    inputName: "files[]",
                    width: "100%",
                    height: "100%",
                    note: null
                }, r), n.isDragDropSupported = Fr(), n.removeDragOverClassTimeout = null, n.i18nInit(), n.onInputChange = n.onInputChange.bind(ni(n)), n.handleDragOver = n.handleDragOver.bind(ni(n)), n.handleDragLeave = n.handleDragLeave.bind(ni(n)), n.handleDrop = n.handleDrop.bind(ni(n)), n.addFiles = n.addFiles.bind(ni(n)), n.render = n.render.bind(ni(n)), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var i = n.prototype;
            return i.setOptions = function (t) {
                e.prototype.setOptions.call(this, t), this.i18nInit()
            }, i.i18nInit = function () {
                this.translator = new E([this.defaultLocale, this.uppy.locale, this.opts.locale]), this.i18n = this.translator.translate.bind(this.translator), this.i18nArray = this.translator.translateArray.bind(this.translator), this.setPluginState()
            }, i.addFiles = function (e) {
                var t = this,
                    r = e.map((function (e) {
                        return {
                            source: t.id,
                            name: e.name,
                            type: e.type,
                            data: e,
                            meta: {
                                relativePath: e.relativePath || null
                            }
                        }
                    }));
                try {
                    this.uppy.addFiles(r)
                } catch (yc) {
                    this.uppy.log(yc)
                }
            }, i.onInputChange = function (e) {
                this.uppy.log("[DragDrop] Files selected through input");
                var t = Rn(e.target.files);
                this.addFiles(t), e.target.value = null
            }, i.handleDrop = function (e, t) {
                var r = this;
                e.preventDefault(), e.stopPropagation(), clearTimeout(this.removeDragOverClassTimeout), this.setPluginState({
                    isDraggingOver: !1
                }), this.uppy.log("[DragDrop] Files were dropped"), xn(e.dataTransfer, {
                    logDropError: function (e) {
                        r.uppy.log(e, "error")
                    }
                }).then((function (e) {
                    return r.addFiles(e)
                }))
            }, i.handleDragOver = function (e) {
                e.preventDefault(), e.stopPropagation(), e.dataTransfer.dropEffect = "copy", clearTimeout(this.removeDragOverClassTimeout), this.setPluginState({
                    isDraggingOver: !0
                })
            }, i.handleDragLeave = function (e) {
                var t = this;
                e.preventDefault(), e.stopPropagation(), clearTimeout(this.removeDragOverClassTimeout), this.removeDragOverClassTimeout = setTimeout((function () {
                    t.setPluginState({
                        isDraggingOver: !1
                    })
                }), 50)
            }, i.renderHiddenFileInput = function () {
                var e = this,
                    t = this.uppy.opts.restrictions;
                return ai("input", {
                    class: "uppy-DragDrop-input",
                    type: "file",
                    hidden: !0,
                    ref: function (t) {
                        e.fileInputRef = t
                    },
                    name: this.opts.inputName,
                    multiple: 1 !== t.maxNumberOfFiles,
                    accept: t.allowedFileTypes,
                    onchange: this.onInputChange
                })
            }, i.renderArrowSvg = function () {
                return ai("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    class: "uppy-c-icon uppy-DragDrop-arrow",
                    width: "16",
                    height: "16",
                    viewBox: "0 0 16 16"
                }, ai("path", {
                    d: "M11 10V0H5v10H2l6 6 6-6h-3zm0 0",
                    "fill-rule": "evenodd"
                }))
            }, i.renderLabel = function () {
                return ai("div", {
                    class: "uppy-DragDrop-label"
                }, this.i18nArray("dropHereOr", {
                    browse: ai("span", {
                        class: "uppy-DragDrop-browse"
                    }, this.i18n("browse"))
                }))
            }, i.renderNote = function () {
                return ai("span", {
                    class: "uppy-DragDrop-note"
                }, this.opts.note)
            }, i.render = function (e) {
                var t = this,
                    r = "uppy-Root\n      uppy-u-reset\n      uppy-DragDrop-container\n      " + (this.isDragDropSupported ? "uppy-DragDrop--isDragDropSupported" : "") + "\n      " + (this.getPluginState().isDraggingOver ? "uppy-DragDrop--isDraggingOver" : "") + "\n    ",
                    n = {
                        width: this.opts.width,
                        height: this.opts.height
                    };
                return ai("button", {
                    type: "button",
                    class: r,
                    style: n,
                    onClick: function () {
                        return t.fileInputRef.click()
                    },
                    onDragOver: this.handleDragOver,
                    onDragLeave: this.handleDragLeave,
                    onDrop: this.handleDrop
                }, this.renderHiddenFileInput(), ai("div", {
                    class: "uppy-DragDrop-inner"
                }, this.renderArrowSvg(), this.renderLabel(), this.renderNote()))
            }, i.install = function () {
                this.setPluginState({
                    isDraggingOver: !1
                });
                var e = this.opts.target;
                e && this.mount(e, this)
            }, i.uninstall = function () {
                this.unmount()
            }, n
        }(si), Zn.VERSION = "1.4.19", ei);

    function li() {
        return (li = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function ci(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var pi, di, hi = le.Plugin,
        fi = oe.h,
        yi = (oi = ii = function (e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).id = n.opts.id || "FileInput", n.title = "File Input", n.type = "acquirer", n.defaultLocale = {
                    strings: {
                        chooseFiles: "Choose files"
                    }
                }, n.opts = li({}, {
                    target: null,
                    pretty: !0,
                    inputName: "files[]"
                }, r), n.i18nInit(), n.render = n.render.bind(ci(n)), n.handleInputChange = n.handleInputChange.bind(ci(n)), n.handleClick = n.handleClick.bind(ci(n)), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var i = n.prototype;
            return i.setOptions = function (t) {
                e.prototype.setOptions.call(this, t), this.i18nInit()
            }, i.i18nInit = function () {
                this.translator = new E([this.defaultLocale, this.uppy.locale, this.opts.locale]), this.i18n = this.translator.translate.bind(this.translator), this.i18nArray = this.translator.translateArray.bind(this.translator), this.setPluginState()
            }, i.addFiles = function (e) {
                var t = this,
                    r = e.map((function (e) {
                        return {
                            source: t.id,
                            name: e.name,
                            type: e.type,
                            data: e
                        }
                    }));
                try {
                    this.uppy.addFiles(r)
                } catch (yc) {
                    this.uppy.log(yc)
                }
            }, i.handleInputChange = function (e) {
                this.uppy.log("[FileInput] Something selected through input...");
                var t = Rn(e.target.files);
                this.addFiles(t), e.target.value = null
            }, i.handleClick = function (e) {
                this.input.click()
            }, i.render = function (e) {
                var t = this,
                    r = this.uppy.opts.restrictions,
                    n = r.allowedFileTypes ? r.allowedFileTypes.join(",") : null;
                return fi("div", {
                    class: "uppy-Root uppy-FileInput-container"
                }, fi("input", {
                    class: "uppy-FileInput-input",
                    style: this.opts.pretty && {
                        width: "0.1px",
                        height: "0.1px",
                        opacity: 0,
                        overflow: "hidden",
                        position: "absolute",
                        zIndex: -1
                    },
                    type: "file",
                    name: this.opts.inputName,
                    onchange: this.handleInputChange,
                    multiple: 1 !== r.maxNumberOfFiles,
                    accept: n,
                    ref: function (e) {
                        t.input = e
                    }
                }), this.opts.pretty && fi("button", {
                    class: "uppy-FileInput-btn",
                    type: "button",
                    onclick: this.handleClick
                }, this.i18n("chooseFiles")))
            }, i.install = function () {
                var e = this.opts.target;
                e && this.mount(e, this)
            }, i.uninstall = function () {
                this.unmount()
            }, n
        }(hi), ii.VERSION = "1.4.17", oi);

    function gi() {
        return (gi = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var vi, mi, bi = le.Plugin,
        wi = oe.h,
        _i = (di = pi = function (e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).id = n.opts.id || "ProgressBar", n.title = "Progress Bar", n.type = "progressindicator", n.opts = gi({}, {
                    target: "body",
                    replaceTargetContent: !1,
                    fixed: !1,
                    hideAfterFinish: !0
                }, r), n.render = n.render.bind(function (e) {
                    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }(n)), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var i = n.prototype;
            return i.render = function (e) {
                var t = e.totalProgress || 0,
                    r = (0 === t || 100 === t) && this.opts.hideAfterFinish;
                return wi("div", {
                    class: "uppy uppy-ProgressBar",
                    style: {
                        position: this.opts.fixed ? "fixed" : "initial"
                    },
                    "aria-hidden": r
                }, wi("div", {
                    class: "uppy-ProgressBar-inner",
                    style: {
                        width: t + "%"
                    }
                }), wi("div", {
                    class: "uppy-ProgressBar-percentage"
                }, t))
            }, i.install = function () {
                var e = this.opts.target;
                e && this.mount(e, this)
            }, i.uninstall = function () {
                this.unmount()
            }, n
        }(bi), pi.VERSION = "1.3.19", di);

    function Si(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var ki, Pi, Ci = le.Plugin,
        Ei = Me.Provider,
        Ai = oe.h,
        Fi = (mi = vi = function (e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).id = n.opts.id || "Dropbox", Ei.initPlugin(Si(n), r), n.title = n.opts.title || "Dropbox", n.icon = function () {
                    return Ai("svg", {
                        "aria-hidden": "true",
                        focusable: "false",
                        width: "32",
                        height: "32",
                        viewBox: "0 0 32 32"
                    }, Ai("g", {
                        fill: "none",
                        "fill-rule": "evenodd"
                    }, Ai("rect", {
                        fill: "#0D2481",
                        width: "32",
                        height: "32",
                        rx: "16"
                    }), Ai("path", {
                        d: "M11 8l5 3.185-5 3.186-5-3.186L11 8zm10 0l5 3.185-5 3.186-5-3.186L21 8zM6 17.556l5-3.185 5 3.185-5 3.186-5-3.186zm15-3.185l5 3.185-5 3.186-5-3.186 5-3.185zm-10 7.432l5-3.185 5 3.185-5 3.186-5-3.186z",
                        fill: "#FFF",
                        "fill-rule": "nonzero"
                    })))
                }, n.provider = new Ei(t, {
                    companionUrl: n.opts.companionUrl,
                    companionHeaders: n.opts.companionHeaders || n.opts.serverHeaders,
                    provider: "dropbox",
                    pluginId: n.id
                }), n.onFirstRender = n.onFirstRender.bind(Si(n)), n.render = n.render.bind(Si(n)), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var i = n.prototype;
            return i.install = function () {
                this.view = new Pt(this, {
                    provider: this.provider
                });
                var e = this.opts.target;
                e && this.mount(e, this)
            }, i.uninstall = function () {
                this.view.tearDown(), this.unmount()
            }, i.onFirstRender = function () {
                return this.view.getFolder()
            }, i.render = function (e) {
                return this.view.render(e)
            }, n
        }(Ci), vi.VERSION = "1.4.14", mi),
        Oi = function (e) {
            var t, r;

            function n() {
                return e.apply(this, arguments) || this
            }
            return r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r, n.prototype.toggleCheckbox = function (t, r) {
                t.stopPropagation(), t.preventDefault(), r.custom.isTeamDrive || r.custom.isSharedDrive || e.prototype.toggleCheckbox.call(this, t, r)
            }, n
        }(Pt);

    function Ui(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var Ri, Ti, xi = le.Plugin,
        Di = Me.Provider,
        Bi = oe.h,
        Ii = (Pi = ki = function (e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).id = n.opts.id || "GoogleDrive", n.title = n.opts.title || "Google Drive", Di.initPlugin(Ui(n), r), n.title = n.opts.title || "Google Drive", n.icon = function () {
                    return Bi("svg", {
                        "aria-hidden": "true",
                        focusable: "false",
                        width: "32",
                        height: "32",
                        viewBox: "0 0 32 32"
                    }, Bi("g", {
                        fill: "none",
                        "fill-rule": "evenodd"
                    }, Bi("rect", {
                        fill: "#4285F4",
                        width: "32",
                        height: "32",
                        rx: "16"
                    }), Bi("path", {
                        d: "M10.324 23.3l3-5.1H25l-3 5.1H10.324zM13 18.2l-3 5.1-3-5.1 5.839-9.924 2.999 5.1L13 18.2zm11.838-.276h-6L13 8h6l5.84 9.924h-.002z",
                        fill: "#FFF"
                    })))
                }, n.provider = new Di(t, {
                    companionUrl: n.opts.companionUrl,
                    companionHeaders: n.opts.companionHeaders || n.opts.serverHeaders,
                    provider: "drive",
                    pluginId: n.id
                }), n.onFirstRender = n.onFirstRender.bind(Ui(n)), n.render = n.render.bind(Ui(n)), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var i = n.prototype;
            return i.install = function () {
                this.view = new Oi(this, {
                    provider: this.provider
                });
                var e = this.opts.target;
                e && this.mount(e, this)
            }, i.uninstall = function () {
                this.view.tearDown(), this.unmount()
            }, i.onFirstRender = function () {
                return this.view.getFolder("root", "/")
            }, i.render = function (e) {
                return this.view.render(e)
            }, n
        }(xi), ki.VERSION = "1.5.14", Pi);

    function ji(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var Li, Mi, Ni = le.Plugin,
        zi = Me.Provider,
        qi = oe.h,
        Hi = (Ti = Ri = function (e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).id = n.opts.id || "Instagram", zi.initPlugin(ji(n), r), n.title = n.opts.title || "Instagram", n.icon = function () {
                    return qi("svg", {
                        "aria-hidden": "true",
                        focusable: "false",
                        width: "32",
                        height: "32",
                        viewBox: "0 0 32 32"
                    }, qi("g", {
                        fill: "none",
                        "fill-rule": "evenodd"
                    }, qi("rect", {
                        fill: "#E1306C",
                        width: "32",
                        height: "32",
                        rx: "16"
                    }), qi("path", {
                        d: "M16 8.622c2.403 0 2.688.009 3.637.052.877.04 1.354.187 1.67.31.392.144.745.374 1.036.673.299.29.529.644.673 1.035.123.317.27.794.31 1.671.043.95.052 1.234.052 3.637s-.009 2.688-.052 3.637c-.04.877-.187 1.354-.31 1.671a2.98 2.98 0 0 1-1.708 1.708c-.317.123-.794.27-1.671.31-.95.043-1.234.053-3.637.053s-2.688-.01-3.637-.053c-.877-.04-1.354-.187-1.671-.31a2.788 2.788 0 0 1-1.035-.673 2.788 2.788 0 0 1-.673-1.035c-.123-.317-.27-.794-.31-1.671-.043-.949-.052-1.234-.052-3.637s.009-2.688.052-3.637c.04-.877.187-1.354.31-1.67.144-.392.374-.745.673-1.036.29-.299.644-.529 1.035-.673.317-.123.794-.27 1.671-.31.95-.043 1.234-.052 3.637-.052zM16 7c-2.444 0-2.75.01-3.71.054-.959.044-1.613.196-2.185.419-.6.225-1.145.58-1.594 1.038-.458.45-.813.993-1.039 1.594-.222.572-.374 1.226-.418 2.184C7.01 13.25 7 13.556 7 16s.01 2.75.054 3.71c.044.959.196 1.613.419 2.185.226.6.58 1.145 1.038 1.594.45.458.993.813 1.594 1.038.572.223 1.227.375 2.184.419.96.044 1.267.054 3.711.054s2.75-.01 3.71-.054c.959-.044 1.613-.196 2.185-.419a4.602 4.602 0 0 0 2.632-2.632c.223-.572.375-1.226.419-2.184.044-.96.054-1.267.054-3.711s-.01-2.75-.054-3.71c-.044-.959-.196-1.613-.419-2.185A4.412 4.412 0 0 0 23.49 8.51a4.412 4.412 0 0 0-1.594-1.039c-.572-.222-1.226-.374-2.184-.418C18.75 7.01 18.444 7 16 7zm0 4.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 7.421a2.921 2.921 0 1 1 0-5.842 2.921 2.921 0 0 1 0 5.842zm4.875-6.671a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25z",
                        fill: "#FFF"
                    })))
                }, n.provider = new zi(t, {
                    companionUrl: n.opts.companionUrl,
                    companionHeaders: n.opts.companionHeaders || n.opts.serverHeaders,
                    provider: "instagram",
                    pluginId: n.id
                }), n.onFirstRender = n.onFirstRender.bind(ji(n)), n.render = n.render.bind(ji(n)), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var i = n.prototype;
            return i.install = function () {
                this.view = new Pt(this, {
                    provider: this.provider,
                    viewType: "grid",
                    showTitles: !1,
                    showFilter: !1,
                    showBreadcrumbs: !1
                });
                var e = this.opts.target;
                e && this.mount(e, this)
            }, i.uninstall = function () {
                this.view.tearDown(), this.unmount()
            }, i.onFirstRender = function () {
                this.view.getFolder("recent")
            }, i.render = function (e) {
                return this.view.render(e)
            }, n
        }(Ni), Ri.VERSION = "1.4.14", Ti);

    function Vi(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var Wi, Xi, Gi = le.Plugin,
        Ki = Me.Provider,
        $i = oe.h,
        Yi = (Mi = Li = function (e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).id = n.opts.id || "OneDrive", Ki.initPlugin(Vi(n), r), n.title = n.opts.title || "OneDrive", n.icon = function () {
                    return $i("svg", {
                        "aria-hidden": "true",
                        focusable: "false",
                        width: "32",
                        height: "32",
                        viewBox: "0 0 32 32"
                    }, $i("g", {
                        fill: "none",
                        "fill-rule": "evenodd"
                    }, $i("rect", {
                        width: "32",
                        height: "32",
                        rx: "16",
                        fill: "#0262C0"
                    }), $i("g", {
                        fill: "#FFF",
                        "fill-rule": "nonzero"
                    }, $i("path", {
                        d: "M24.157 22s1.492-.205 1.79-1.655a2.624 2.624 0 0 0 .03-.878c-.22-1.64-1.988-2.01-1.988-2.01s.307-1.765-1.312-2.69c-1.62-.925-3.1 0-3.1 0S18.711 13 16.366 13c-3.016 0-3.519 3.448-3.519 3.448S10 16.618 10 19.14c0 2.523 2.597 2.86 2.597 2.86h11.56z"
                    }), $i("path", {
                        d: "M9.421 19.246c0-2.197 1.606-3.159 2.871-3.472.44-1.477 1.654-3.439 4.135-3.439H16.445c1.721 0 2.79.823 3.368 1.476a3.99 3.99 0 0 1 1.147-.171h.01l.03.002C21.017 13.5 20.691 10 16.757 10c-2.69 0-3.639 2.345-3.639 2.345s-1.95-1.482-3.955.567c-1.028 1.052-.79 2.669-.79 2.669S6 15.824 6 18.412C6 20.757 8.452 21 8.452 21h1.372a3.77 3.77 0 0 1-.403-1.754z"
                    }))))
                }, n.provider = new Ki(t, {
                    companionUrl: n.opts.companionUrl,
                    companionHeaders: n.opts.companionHeaders || n.opts.serverHeaders,
                    provider: "onedrive",
                    pluginId: n.id
                }), n.onFirstRender = n.onFirstRender.bind(Vi(n)), n.render = n.render.bind(Vi(n)), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var i = n.prototype;
            return i.install = function () {
                this.view = new Pt(this, {
                    provider: this.provider
                });
                var e = this.opts.target;
                e && this.mount(e, this)
            }, i.uninstall = function () {
                this.view.tearDown(), this.unmount()
            }, i.onFirstRender = function () {
                return this.view.getFolder()
            }, i.render = function (e) {
                return this.view.render(e)
            }, n
        }(Gi), Li.VERSION = "1.1.14", Mi);

    function Ji(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var Qi = le.Plugin,
        Zi = Me.Provider,
        eo = oe.h,
        to = (Xi = Wi = function (e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).id = n.opts.id || "Facebook", Zi.initPlugin(Ji(n), r), n.title = n.opts.title || "Facebook", n.icon = function () {
                    return eo("svg", {
                        "aria-hidden": "true",
                        focusable: "false",
                        width: "32",
                        height: "32",
                        viewBox: "0 0 32 32"
                    }, eo("g", {
                        fill: "none",
                        "fill-rule": "evenodd"
                    }, eo("rect", {
                        width: "32",
                        height: "32",
                        rx: "16",
                        fill: "#3C5A99"
                    }), eo("path", {
                        d: "M17.842 26v-8.667h2.653l.398-3.377h-3.051v-2.157c0-.978.248-1.644 1.527-1.644H21V7.132A19.914 19.914 0 0 0 18.623 7c-2.352 0-3.963 1.574-3.963 4.465v2.49H12v3.378h2.66V26h3.182z",
                        fill: "#FFF",
                        "fill-rule": "nonzero"
                    })))
                }, n.provider = new Zi(t, {
                    companionUrl: n.opts.companionUrl,
                    companionHeaders: n.opts.companionHeaders || n.opts.serverHeaders,
                    provider: "facebook",
                    pluginId: n.id
                }), n.onFirstRender = n.onFirstRender.bind(Ji(n)), n.render = n.render.bind(Ji(n)), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var i = n.prototype;
            return i.install = function () {
                this.view = new Pt(this, {
                    provider: this.provider
                });
                var e = this.opts.target;
                e && this.mount(e, this)
            }, i.uninstall = function () {
                this.view.tearDown(), this.unmount()
            }, i.onFirstRender = function () {
                return this.view.getFolder()
            }, i.render = function (e) {
                var t = {};
                return this.getPluginState().files.length && !this.getPluginState().folders.length && (t.viewType = "grid", t.showFilter = !1, t.showTitles = !1), this.view.render(e, t)
            }, n
        }(Qi), Wi.VERSION = "1.1.14", Xi);

    function ro(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var no, io, oo = oe.h,
        so = function (e) {
            var t, r;

            function n(t) {
                var r;
                return (r = e.call(this, t) || this).handleKeyPress = r.handleKeyPress.bind(ro(r)), r.handleClick = r.handleClick.bind(ro(r)), r
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var i = n.prototype;
            return i.componentDidMount = function () {
                this.input.value = ""
            }, i.handleKeyPress = function (e) {
                13 === e.keyCode && this.props.addFile(this.input.value)
            }, i.handleClick = function () {
                this.props.addFile(this.input.value)
            }, i.render = function () {
                var e = this;
                return oo("div", {
                    class: "uppy-Url"
                }, oo("input", {
                    class: "uppy-u-reset uppy-c-textInput uppy-Url-input",
                    type: "text",
                    "aria-label": this.props.i18n("enterUrlToImport"),
                    placeholder: this.props.i18n("enterUrlToImport"),
                    onkeyup: this.handleKeyPress,
                    ref: function (t) {
                        e.input = t
                    },
                    "data-uppy-super-focusable": !0
                }), oo("button", {
                    class: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Url-importButton",
                    type: "button",
                    onclick: this.handleClick
                }, this.props.i18n("import")))
            }, n
        }(oe.Component),
        ao = function (e, t, r) {
            var n, i = Rn(e.items);
            switch (t) {
                case "paste":
                    if (i.some((function (e) {
                        return "file" === e.kind
                    }))) return;
                    n = i.filter((function (e) {
                        return "string" === e.kind && "text/plain" === e.type
                    }));
                    break;
                case "drop":
                    n = i.filter((function (e) {
                        return "string" === e.kind && "text/uri-list" === e.type
                    }));
                    break;
                default:
                    throw new Error("isDropOrPaste must be either 'drop' or 'paste', but it's " + t)
            }
            n.forEach((function (e) {
                e.getAsString((function (e) {
                    return r(e)
                }))
            }))
        };

    function uo() {
        return (uo = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function lo(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var co = le.Plugin,
        po = oe.h,
        ho = Me.RequestClient;

    function fo() {
        return po("svg", {
            "aria-hidden": "true",
            focusable: "false",
            width: "32",
            height: "32",
            viewBox: "0 0 32 32"
        }, po("g", {
            fill: "none",
            "fill-rule": "evenodd"
        }, po("rect", {
            fill: "#FF753E",
            width: "32",
            height: "32",
            rx: "16"
        }), po("path", {
            d: "M22.788 15.389l-2.199 2.19a3.184 3.184 0 0 1-.513.437c-.806.584-1.686.876-2.638.876a4.378 4.378 0 0 1-3.519-1.752c-.22-.292-.146-.802.147-1.021.293-.22.806-.146 1.026.146.953 1.313 2.785 1.532 4.105.583a.571.571 0 0 0 .293-.292l2.199-2.189c1.1-1.167 1.1-2.992-.073-4.086a2.976 2.976 0 0 0-4.105 0l-1.246 1.24a.71.71 0 0 1-1.026 0 .703.703 0 0 1 0-1.022l1.246-1.24a4.305 4.305 0 0 1 6.083 0c1.833 1.605 1.906 4.451.22 6.13zm-7.183 5.035l-1.246 1.24a2.976 2.976 0 0 1-4.105 0c-1.172-1.094-1.172-2.991-.073-4.086l2.2-2.19.292-.291c.66-.438 1.393-.657 2.2-.584.805.146 1.465.51 1.905 1.168.22.292.733.365 1.026.146.293-.22.367-.73.147-1.022-.733-.949-1.76-1.532-2.859-1.678-1.1-.22-2.272.073-3.225.802l-.44.438-2.199 2.19c-1.686 1.75-1.612 4.524.074 6.202.88.803 1.979 1.241 3.078 1.241 1.1 0 2.199-.438 3.079-1.24l1.246-1.241a.703.703 0 0 0 0-1.022c-.294-.292-.807-.365-1.1-.073z",
            fill: "#FFF",
            "fill-rule": "nonzero"
        })))
    }
    var yo = (io = no = function (e) {
        var t, r;

        function n(t, r) {
            var n;
            if ((n = e.call(this, t, r) || this).id = n.opts.id || "Url", n.title = n.opts.title || "Link", n.type = "acquirer", n.icon = function () {
                return po(fo, null)
            }, n.defaultLocale = {
                strings: {
                    import: "Import",
                    enterUrlToImport: "Enter URL to import a file",
                    failedToFetch: "Companion failed to fetch this URL, please make sure it\u2019s correct",
                    enterCorrectUrl: "Incorrect URL: Please make sure you are entering a direct link to a file"
                }
            }, n.opts = uo({}, {}, r), n.i18nInit(), n.hostname = n.opts.companionUrl, !n.hostname) throw new Error("Companion hostname is required, please consult https://uppy.io/docs/companion");
            return n.getMeta = n.getMeta.bind(lo(n)), n.addFile = n.addFile.bind(lo(n)), n.handleRootDrop = n.handleRootDrop.bind(lo(n)), n.handleRootPaste = n.handleRootPaste.bind(lo(n)), n.client = new ho(t, {
                companionUrl: n.opts.companionUrl,
                companionHeaders: n.opts.companionHeaders || n.opts.serverHeaders
            }), n
        }
        r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
        var i = n.prototype;
        return i.setOptions = function (t) {
            e.prototype.setOptions.call(this, t), this.i18nInit()
        }, i.i18nInit = function () {
            this.translator = new E([this.defaultLocale, this.uppy.locale, this.opts.locale]), this.i18n = this.translator.translate.bind(this.translator), this.i18nArray = this.translator.translateArray.bind(this.translator), this.setPluginState()
        }, i.getFileNameFromUrl = function (e) {
            return e.substring(e.lastIndexOf("/") + 1)
        }, i.checkIfCorrectURL = function (e) {
            if (!e) return !1;
            var t = e.match(/^([a-z0-9]+):\/\//)[1];
            return "http" === t || "https" === t
        }, i.addProtocolToURL = function (e) {
            return /^[a-z0-9]+:\/\//.test(e) ? e : "http://" + e
        }, i.getMeta = function (e) {
            var t = this;
            return this.client.post("url/meta", {
                url: e
            }).then((function (e) {
                if (e.error) throw t.uppy.log("[URL] Error:"), t.uppy.log(e.error), new Error("Failed to fetch the file");
                return e
            }))
        }, i.addFile = function (e) {
            var t = this;
            return e = this.addProtocolToURL(e), this.checkIfCorrectURL(e) ? this.getMeta(e).then((function (r) {
                return {
                    source: t.id,
                    name: t.getFileNameFromUrl(e),
                    type: r.type,
                    data: {
                        size: r.size
                    },
                    isRemote: !0,
                    body: {
                        url: e
                    },
                    remote: {
                        companionUrl: t.opts.companionUrl,
                        url: t.hostname + "/url/get",
                        body: {
                            fileId: e,
                            url: e
                        },
                        providerOptions: t.client.opts
                    }
                }
            })).then((function (e) {
                t.uppy.log("[Url] Adding remote file");
                try {
                    t.uppy.addFile(e)
                } catch (yc) {
                    yc.isRestriction || t.uppy.log(yc)
                }
            })).catch((function (e) {
                t.uppy.log(e), t.uppy.info({
                    message: t.i18n("failedToFetch"),
                    details: e
                }, "error", 4e3)
            })) : (this.uppy.log("[URL] Incorrect URL entered: " + e), void this.uppy.info(this.i18n("enterCorrectUrl"), "error", 4e3))
        }, i.handleRootDrop = function (e) {
            var t = this;
            ao(e.dataTransfer, "drop", (function (e) {
                t.uppy.log("[URL] Adding file from dropped url: " + e), t.addFile(e)
            }))
        }, i.handleRootPaste = function (e) {
            var t = this;
            ao(e.clipboardData, "paste", (function (e) {
                t.uppy.log("[URL] Adding file from pasted url: " + e), t.addFile(e)
            }))
        }, i.render = function (e) {
            return po(so, {
                i18n: this.i18n,
                addFile: this.addFile
            })
        }, i.install = function () {
            var e = this.opts.target;
            e && this.mount(e, this)
        }, i.uninstall = function () {
            this.unmount()
        }, n
    }(co), no.VERSION = "1.5.11", io),
        go = {
            "audio/mp3": "mp3",
            "audio/ogg": "ogg",
            "audio/webm": "webm",
            "image/gif": "gif",
            "image/heic": "heic",
            "image/heif": "heif",
            "image/jpeg": "jpg",
            "image/png": "png",
            "image/svg+xml": "svg",
            "video/mp4": "mp4",
            "video/ogg": "ogv",
            "video/quicktime": "mov",
            "video/webm": "webm",
            "video/x-matroska": "mkv",
            "video/x-msvideo": "avi"
        },
        vo = function (e) {
            return e = e.replace(/;.*$/, ""), go[e] || null
        },
        mo = oe.h,
        bo = function (e) {
            return mo("svg", {
                "aria-hidden": "true",
                focusable: "false",
                fill: "#0097DC",
                width: "66",
                height: "55",
                viewBox: "0 0 66 55"
            }, mo("path", {
                d: "M57.3 8.433c4.59 0 8.1 3.51 8.1 8.1v29.7c0 4.59-3.51 8.1-8.1 8.1H8.7c-4.59 0-8.1-3.51-8.1-8.1v-29.7c0-4.59 3.51-8.1 8.1-8.1h9.45l4.59-7.02c.54-.54 1.35-1.08 2.16-1.08h16.2c.81 0 1.62.54 2.16 1.08l4.59 7.02h9.45zM33 14.64c-8.62 0-15.393 6.773-15.393 15.393 0 8.62 6.773 15.393 15.393 15.393 8.62 0 15.393-6.773 15.393-15.393 0-8.62-6.773-15.393-15.393-15.393zM33 40c-5.648 0-9.966-4.319-9.966-9.967 0-5.647 4.318-9.966 9.966-9.966s9.966 4.319 9.966 9.966C42.966 35.681 38.648 40 33 40z",
                "fill-rule": "evenodd"
            }))
        },
        wo = oe.h,
        _o = oe.h,
        So = oe.h,
        ko = function (e) {
            var t, r = e.recordingLengthSeconds,
                n = e.i18n,
                i = (t = r, Math.floor(t / 60) + ":" + String(t % 60).padStart(2, 0));
            return So("div", {
                class: "uppy-Webcam-recordingLength",
                "aria-label": n("recordingLength", {
                    recording_length: i
                })
            }, i)
        },
        Po = oe.h;

    function Co(e, t) {
        return -1 !== e.indexOf(t)
    }
    var Eo, Ao, Fo = function (e) {
        var t, r;

        function n() {
            return e.apply(this, arguments) || this
        }
        r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
        var i = n.prototype;
        return i.componentDidMount = function () {
            this.props.onFocus()
        }, i.componentWillUnmount = function () {
            this.props.onStop()
        }, i.render = function () {
            var e, t, r, n = this.props.supportsRecording && (Co(this.props.modes, "video-only") || Co(this.props.modes, "audio-only") || Co(this.props.modes, "video-audio")),
                i = Co(this.props.modes, "picture"),
                o = this.props.supportsRecording && this.props.showRecordingLength;
            return Po("div", {
                class: "uppy uppy-Webcam-container"
            }, Po("div", {
                class: "uppy-Webcam-videoContainer"
            }, Po("video", {
                class: "uppy-Webcam-video  " + (this.props.mirror ? "uppy-Webcam-video--mirrored" : ""),
                autoplay: !0,
                muted: !0,
                playsinline: !0,
                srcObject: this.props.src || ""
            })), Po("div", {
                class: "uppy-Webcam-buttonContainer"
            }, o ? ko(this.props) : null, " ", i ? (e = this.props, t = e.onSnapshot, r = e.i18n, wo("button", {
                class: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--picture",
                type: "button",
                title: r("takePicture"),
                "aria-label": r("takePicture"),
                onclick: t,
                "data-uppy-super-focusable": !0
            }, bo())) : null, " ", n ? function (e) {
                var t = e.recording,
                    r = e.onStartRecording,
                    n = e.onStopRecording,
                    i = e.i18n;
                return t ? _o("button", {
                    class: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--video",
                    type: "button",
                    title: i("stopRecording"),
                    "aria-label": i("stopRecording"),
                    onclick: n,
                    "data-uppy-super-focusable": !0
                }, _o("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    class: "uppy-c-icon",
                    width: "100",
                    height: "100",
                    viewBox: "0 0 100 100"
                }, _o("rect", {
                    x: "15",
                    y: "15",
                    width: "70",
                    height: "70"
                }))) : _o("button", {
                    class: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--video",
                    type: "button",
                    title: i("startRecording"),
                    "aria-label": i("startRecording"),
                    onclick: r,
                    "data-uppy-super-focusable": !0
                }, _o("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    class: "uppy-c-icon",
                    width: "100",
                    height: "100",
                    viewBox: "0 0 100 100"
                }, _o("circle", {
                    cx: "50",
                    cy: "50",
                    r: "40"
                })))
            }(this.props) : null))
        }, n
    }(oe.Component),
        Oo = oe.h,
        Uo = function (e) {
            return Oo("div", {
                class: "uppy-Webcam-permissons"
            }, Oo("div", {
                class: "uppy-Webcam-permissonsIcon"
            }, e.icon()), Oo("h1", {
                class: "uppy-Webcam-title"
            }, e.hasCamera ? e.i18n("allowAccessTitle") : e.i18n("noCameraTitle")), Oo("p", null, e.hasCamera ? e.i18n("allowAccessDescription") : e.i18n("noCameraDescription")))
        };

    function Ro() {
        return (Ro = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function To(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var xo = oe.h;

    function Do(e) {
        return "." === e[0] ? J[e.slice(1)] : e
    }

    function Bo(e) {
        return /^video\/[^*]+$/.test(e)
    }

    function Io(e) {
        return /^image\/[^*]+$/.test(e)
    }
    var jo = (Ao = Eo = function (e) {
        var t, r;

        function n(t, r) {
            var n;
            (n = e.call(this, t, r) || this).mediaDevices = function () {
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) return navigator.mediaDevices;
                var e = navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
                return e ? {
                    getUserMedia: function (t) {
                        return new Promise((function (r, n) {
                            e.call(navigator, t, r, n)
                        }))
                    }
                } : null
            }(), n.supportsUserMedia = !!n.mediaDevices, n.protocol = location.protocol.match(/https/i) ? "https" : "http", n.id = n.opts.id || "Webcam", n.title = n.opts.title || "Camera", n.type = "acquirer", n.icon = function () {
                return xo("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    width: "32",
                    height: "32",
                    viewBox: "0 0 32 32"
                }, xo("g", {
                    fill: "none",
                    "fill-rule": "evenodd"
                }, xo("rect", {
                    fill: "#03BFEF",
                    width: "32",
                    height: "32",
                    rx: "16"
                }), xo("path", {
                    d: "M22 11c1.133 0 2 .867 2 2v7.333c0 1.134-.867 2-2 2H10c-1.133 0-2-.866-2-2V13c0-1.133.867-2 2-2h2.333l1.134-1.733C13.6 9.133 13.8 9 14 9h4c.2 0 .4.133.533.267L19.667 11H22zm-6 1.533a3.764 3.764 0 0 0-3.8 3.8c0 2.129 1.672 3.801 3.8 3.801s3.8-1.672 3.8-3.8c0-2.13-1.672-3.801-3.8-3.801zm0 6.261c-1.395 0-2.46-1.066-2.46-2.46 0-1.395 1.065-2.461 2.46-2.461s2.46 1.066 2.46 2.46c0 1.395-1.065 2.461-2.46 2.461z",
                    fill: "#FFF",
                    "fill-rule": "nonzero"
                })))
            }, n.defaultLocale = {
                strings: {
                    smile: "Smile!",
                    takePicture: "Take a picture",
                    startRecording: "Begin video recording",
                    stopRecording: "Stop video recording",
                    allowAccessTitle: "Please allow access to your camera",
                    allowAccessDescription: "In order to take pictures or record video with your camera, please allow camera access for this site.",
                    noCameraTitle: "Camera Not Available",
                    noCameraDescription: "In order to take pictures or record video, please connect a camera device",
                    recordingStoppedMaxSize: "Recording stopped because the file size is about to exceed the limit",
                    recordingLength: "Recording length %{recording_length}"
                }
            };
            var i = {
                onBeforeSnapshot: function () {
                    return Promise.resolve()
                },
                countdown: !1,
                modes: ["video-audio", "video-only", "audio-only", "picture"],
                mirror: !0,
                facingMode: "user",
                preferredImageMimeType: null,
                preferredVideoMimeType: null,
                showRecordingLength: !1
            };
            return n.opts = Ro({}, i, r), n.i18nInit(), n.install = n.install.bind(To(n)), n.setPluginState = n.setPluginState.bind(To(n)), n.render = n.render.bind(To(n)), n._start = n._start.bind(To(n)), n._stop = n._stop.bind(To(n)), n._takeSnapshot = n._takeSnapshot.bind(To(n)), n._startRecording = n._startRecording.bind(To(n)), n._stopRecording = n._stopRecording.bind(To(n)), n._oneTwoThreeSmile = n._oneTwoThreeSmile.bind(To(n)), n._focus = n._focus.bind(To(n)), n.webcamActive = !1, n.opts.countdown && (n.opts.onBeforeSnapshot = n._oneTwoThreeSmile), n
        }
        r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
        var i = n.prototype;
        return i.setOptions = function (t) {
            e.prototype.setOptions.call(this, Ro({}, t, {
                videoConstraints: Ro({}, this.opts.videoConstraints, null == t ? void 0 : t.videoConstraints)
            })), this.i18nInit()
        }, i.i18nInit = function () {
            this.translator = new E([this.defaultLocale, this.uppy.locale, this.opts.locale]), this.i18n = this.translator.translate.bind(this.translator), this.i18nArray = this.translator.translateArray.bind(this.translator), this.setPluginState()
        }, i.hasCameraCheck = function () {
            return this.mediaDevices ? this.mediaDevices.enumerateDevices().then((function (e) {
                return e.some((function (e) {
                    return "videoinput" === e.kind
                }))
            })) : Promise.resolve(!1)
        }, i.getConstraints = function () {
            var e, t = -1 !== this.opts.modes.indexOf("video-audio") || -1 !== this.opts.modes.indexOf("audio-only"),
                r = -1 !== this.opts.modes.indexOf("video-audio") || -1 !== this.opts.modes.indexOf("video-only") || -1 !== this.opts.modes.indexOf("picture"),
                n = null != (e = this.opts.videoConstraints) ? e : {
                    facingMode: this.opts.facingMode
                };
            return {
                audio: t,
                video: !!r && n
            }
        }, i._start = function () {
            var e = this;
            if (!this.supportsUserMedia) return Promise.reject(new Error("Webcam access not supported"));
            this.webcamActive = !0;
            var t = this.getConstraints();
            this.hasCameraCheck().then((function (r) {
                return e.setPluginState({
                    hasCamera: r
                }), e.mediaDevices.getUserMedia(t).then((function (t) {
                    e.stream = t, e.setPluginState({
                        cameraReady: !0
                    })
                })).catch((function (t) {
                    e.setPluginState({
                        cameraReady: !1,
                        cameraError: t
                    }), e.uppy.info(t.message, "error")
                }))
            }))
        }, i._getMediaRecorderOptions = function () {
            var e = {};
            if (MediaRecorder.isTypeSupported) {
                var t = this.uppy.opts.restrictions,
                    r = [];
                this.opts.preferredVideoMimeType ? r = [this.opts.preferredVideoMimeType] : t.allowedFileTypes && (r = t.allowedFileTypes.map(Do).filter(Bo));
                var n = r.filter((function (e) {
                    return MediaRecorder.isTypeSupported(e) && vo(e)
                }));
                n.length > 0 && (e.mimeType = n[0])
            }
            return e
        }, i._startRecording = function () {
            var e = this;
            this.recorder = new MediaRecorder(this.stream, this._getMediaRecorderOptions()), this.recordingChunks = [];
            var t = !1;
            this.recorder.addEventListener("dataavailable", (function (r) {
                e.recordingChunks.push(r.data);
                var n = e.uppy.opts.restrictions;
                if (e.recordingChunks.length > 1 && null != n.maxFileSize && !t) {
                    var i = e.recordingChunks.reduce((function (e, t) {
                        return e + t.size
                    }), 0),
                        o = (i - e.recordingChunks[0].size) / (e.recordingChunks.length - 1) * 3;
                    i > Math.max(0, n.maxFileSize - o) && (t = !0, e.uppy.info(e.i18n("recordingStoppedMaxSize"), "warning", 4e3), e._stopRecording())
                }
            })), this.recorder.start(500), this.opts.showRecordingLength && (this.recordingLengthTimer = setInterval((function () {
                var t = e.getPluginState().recordingLengthSeconds;
                e.setPluginState({
                    recordingLengthSeconds: t + 1
                })
            }), 1e3)), this.setPluginState({
                isRecording: !0
            })
        }, i._stopRecording = function () {
            var e = this;
            return new Promise((function (t, r) {
                e.recorder.addEventListener("stop", (function () {
                    t()
                })), e.recorder.stop(), e.opts.showRecordingLength && (clearInterval(e.recordingLengthTimer), e.setPluginState({
                    recordingLengthSeconds: 0
                }))
            })).then((function () {
                return e.setPluginState({
                    isRecording: !1
                }), e.getVideo()
            })).then((function (t) {
                try {
                    e.uppy.addFile(t)
                } catch (yc) {
                    yc.isRestriction || e.uppy.log(yc)
                }
            })).then((function () {
                e.recordingChunks = null, e.recorder = null
            }), (function (t) {
                throw e.recordingChunks = null, e.recorder = null, t
            }))
        }, i._stop = function () {
            this.stream && (this.stream.getAudioTracks().forEach((function (e) {
                e.stop()
            })), this.stream.getVideoTracks().forEach((function (e) {
                e.stop()
            }))), this.webcamActive = !1, this.stream = null
        }, i._getVideoElement = function () {
            return this.el.querySelector(".uppy-Webcam-video")
        }, i._oneTwoThreeSmile = function () {
            var e = this;
            return new Promise((function (t, r) {
                var n = e.opts.countdown,
                    i = setInterval((function () {
                        if (!e.webcamActive) return clearInterval(i), e.captureInProgress = !1, r(new Error("Webcam is not active"));
                        n > 0 ? (e.uppy.info(n + "...", "warning", 800), n--) : (clearInterval(i), e.uppy.info(e.i18n("smile"), "success", 1500), setTimeout((function () {
                            return t()
                        }), 1500))
                    }), 1e3)
            }))
        }, i._takeSnapshot = function () {
            var e = this;
            this.captureInProgress || (this.captureInProgress = !0, this.opts.onBeforeSnapshot().catch((function (t) {
                var r = "object" == typeof t ? t.message : t;
                return e.uppy.info(r, "error", 5e3), Promise.reject(new Error("onBeforeSnapshot: " + r))
            })).then((function () {
                return e._getImage()
            })).then((function (t) {
                e.captureInProgress = !1;
                try {
                    e.uppy.addFile(t)
                } catch (yc) {
                    yc.isRestriction || e.uppy.log(yc)
                }
            }), (function (t) {
                throw e.captureInProgress = !1, t
            })))
        }, i._getImage = function () {
            var e = this,
                t = this._getVideoElement();
            if (!t) return Promise.reject(new Error("No video element found, likely due to the Webcam tab being closed."));
            var r = t.videoWidth,
                n = t.videoHeight,
                i = document.createElement("canvas");
            i.width = r, i.height = n, i.getContext("2d").drawImage(t, 0, 0);
            var o = this.uppy.opts.restrictions,
                s = [];
            this.opts.preferredImageMimeType ? s = [this.opts.preferredImageMimeType] : o.allowedFileTypes && (s = o.allowedFileTypes.map(Do).filter(Io));
            var a = s[0] || "image/jpeg",
                u = vo(a) || "jpg",
                l = "cam-" + Date.now() + "." + u;
            return function (e, t, r) {
                return e.toBlob ? new Promise((function (n) {
                    e.toBlob(n, t, r)
                })) : Promise.resolve().then((function () {
                    return dn(e.toDataURL(t, r), {})
                }))
            }(i, a).then((function (t) {
                return {
                    source: e.id,
                    name: l,
                    data: new Blob([t], {
                        type: a
                    }),
                    type: a
                }
            }))
        }, i.getVideo = function () {
            var e = this.recordingChunks[0].type,
                t = vo(e);
            if (!t) return Promise.reject(new Error('Could not retrieve recording: Unsupported media type "' + e + '"'));
            var r = "webcam-" + Date.now() + "." + t,
                n = new Blob(this.recordingChunks, {
                    type: e
                }),
                i = {
                    source: this.id,
                    name: r,
                    data: new Blob([n], {
                        type: e
                    }),
                    type: e
                };
            return Promise.resolve(i)
        }, i._focus = function () {
            var e = this;
            this.opts.countdown && setTimeout((function () {
                e.uppy.info(e.i18n("smile"), "success", 1500)
            }), 1e3)
        }, i.render = function () {
            this.webcamActive || this._start();
            var e = this.getPluginState();
            return e.cameraReady && e.hasCamera ? xo(Fo, Ro({}, e, {
                onSnapshot: this._takeSnapshot,
                onStartRecording: this._startRecording,
                onStopRecording: this._stopRecording,
                onFocus: this._focus,
                onStop: this._stop,
                i18n: this.i18n,
                modes: this.opts.modes,
                showRecordingLength: this.opts.showRecordingLength,
                supportsRecording: "function" == typeof MediaRecorder && !!MediaRecorder.prototype && "function" == typeof MediaRecorder.prototype.start,
                recording: e.isRecording,
                mirror: this.opts.mirror,
                src: this.stream
            })) : xo(Uo, {
                icon: bo,
                i18n: this.i18n,
                hasCamera: e.hasCamera
            })
        }, i.install = function () {
            this.setPluginState({
                cameraReady: !1,
                recordingLengthSeconds: 0
            });
            var e = this.opts.target;
            e && this.mount(e, this)
        }, i.uninstall = function () {
            this.stream && this._stop(), this.unmount()
        }, n
    }(le.Plugin), Eo.VERSION = "1.7.0", Ao),
        Lo = oe.h,
        Mo = function () {
            return Lo("svg", {
                "aria-hidden": "true",
                focusable: "false",
                width: "32",
                height: "32",
                viewBox: "0 0 32 32"
            }, Lo("g", {
                fill: "none",
                "fill-rule": "evenodd"
            }, Lo("rect", {
                fill: "#2C3E50",
                width: "32",
                height: "32",
                rx: "16"
            }), Lo("path", {
                d: "M24.182 9H7.818C6.81 9 6 9.742 6 10.667v10c0 .916.81 1.666 1.818 1.666h4.546V24h7.272v-1.667h4.546c1 0 1.809-.75 1.809-1.666l.009-10C26 9.742 25.182 9 24.182 9zM24 21H8V11h16v10z",
                fill: "#FFF",
                "fill-rule": "nonzero"
            }), Lo("circle", {
                fill: "#FFF",
                cx: "16",
                cy: "16",
                r: "2"
            })))
        },
        No = oe.h,
        zo = function (e) {
            var t = e.recording,
                r = e.onStartRecording,
                n = e.onStopRecording,
                i = e.i18n;
            return t ? No("button", {
                class: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--video uppy-ScreenCapture-button--stop-rec",
                type: "button",
                title: i("stopCapturing"),
                "aria-label": i("stopCapturing"),
                onclick: n,
                "data-uppy-super-focusable": !0
            }, No("svg", {
                "aria-hidden": "true",
                focusable: "false",
                class: "uppy-c-icon",
                width: "100",
                height: "100",
                viewBox: "0 0 100 100"
            }, No("rect", {
                x: "15",
                y: "15",
                width: "70",
                height: "70"
            }))) : No("button", {
                class: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--video",
                type: "button",
                title: i("startCapturing"),
                "aria-label": i("startCapturing"),
                onclick: r,
                "data-uppy-super-focusable": !0
            }, No("svg", {
                "aria-hidden": "true",
                focusable: "false",
                class: "uppy-c-icon",
                width: "100",
                height: "100",
                viewBox: "0 0 100 100"
            }, No("circle", {
                cx: "50",
                cy: "50",
                r: "40"
            })))
        },
        qo = oe.h,
        Ho = function (e) {
            var t = e.recording,
                r = e.recordedVideo,
                n = e.onSubmit,
                i = e.i18n;
            return r && !t ? qo("button", {
                class: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--submit",
                type: "button",
                title: i("submitRecordedFile"),
                "aria-label": i("submitRecordedFile"),
                onclick: n,
                "data-uppy-super-focusable": !0
            }, qo("svg", {
                "aria-hidden": "true",
                focusable: "false",
                class: "uppy-c-icon",
                width: "48",
                height: "48",
                viewBox: "0 0 48 48"
            }, qo("path", {
                d: "M0 0h48v48h-48z",
                fill: "none"
            }), qo("path", {
                d: "M38.71 20.07c-1.36-6.88-7.43-12.07-14.71-12.07-5.78 0-10.79 3.28-13.3 8.07-6.01.65-10.7 5.74-10.7 11.93 0 6.63 5.37 12 12 12h26c5.52 0 10-4.48 10-10 0-5.28-4.11-9.56-9.29-9.93zm-10.71 5.93v8h-8v-8h-6l10-10 10 10h-6z"
            }))) : null
        };

    function Vo() {
        return (Vo = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var Wo = oe.h,
        Xo = function (e) {
            var t, r;

            function n(t) {
                var r;
                return (r = e.call(this, t) || this).state = {
                    elapsedTime: 0
                }, r.wrapperStyle = {
                    width: "100%",
                    height: "100%",
                    display: "flex"
                }, r.overlayStyle = {
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: "black",
                    opacity: .7
                }, r.infoContainerStyle = {
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "auto",
                    marginBottom: "auto",
                    zIndex: 1,
                    color: "white"
                }, r.infotextStyle = {
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: "1rem",
                    fontSize: "1.5rem"
                }, r.timeStyle = {
                    display: "block",
                    fontWeight: "bold",
                    marginLeft: "auto",
                    marginRight: "auto",
                    fontSize: "3rem",
                    fontFamily: "Courier New"
                }, r
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var i = n.prototype;
            return i.startTimer = function () {
                this.timerTick(), this.timerRunning = !0
            }, i.resetTimer = function () {
                clearTimeout(this.timer), this.setState({
                    elapsedTime: 0
                }), this.timerRunning = !1
            }, i.timerTick = function () {
                var e = this;
                this.timer = setTimeout((function () {
                    e.setState({
                        elapsedTime: e.state.elapsedTime + 1
                    }), e.timerTick()
                }), 1e3)
            }, i.fmtMSS = function (e) {
                return (e - (e %= 60)) / 60 + (e > 9 ? ":" : ":0") + e
            }, i.render = function () {
                var e = Vo({}, this.props),
                    t = e.recording,
                    r = e.i18n,
                    n = this.fmtMSS(this.state.elapsedTime);
                return t && !this.timerRunning && this.startTimer(), !t && this.timerRunning && this.resetTimer(), t ? Wo("div", {
                    style: this.wrapperStyle
                }, Wo("div", {
                    style: this.overlayStyle
                }), Wo("div", {
                    style: this.infoContainerStyle
                }, Wo("div", {
                    style: this.infotextStyle
                }, r("recording")), Wo("div", {
                    style: this.timeStyle
                }, n))) : null
            }, n
        }(oe.Component),
        Go = oe.h,
        Ko = function (e) {
            var t = e.streamActive,
                r = e.i18n;
            return t ? Go("div", {
                title: r("streamActive"),
                "aria-label": r("streamActive"),
                class: "uppy-ScreenCapture-icon--stream uppy-ScreenCapture-icon--streamActive"
            }, Go("svg", {
                "aria-hidden": "true",
                focusable: "false",
                width: "24",
                height: "24",
                viewBox: "0 0 24 24"
            }, Go("path", {
                d: "M0 0h24v24H0z",
                opacity: ".1",
                fill: "none"
            }), Go("path", {
                d: "M0 0h24v24H0z",
                fill: "none"
            }), Go("path", {
                d: "M1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm18-7H5v1.63c3.96 1.28 7.09 4.41 8.37 8.37H19V7zM1 10v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11zm20-7H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
            }))) : Go("div", {
                title: r("streamPassive"),
                "aria-label": r("streamPassive"),
                class: "uppy-ScreenCapture-icon--stream"
            }, Go("svg", {
                "aria-hidden": "true",
                focusable: "false",
                width: "24",
                height: "24",
                viewBox: "0 0 24 24"
            }, Go("path", {
                d: "M0 0h24v24H0z",
                opacity: ".1",
                fill: "none"
            }), Go("path", {
                d: "M0 0h24v24H0z",
                fill: "none"
            }), Go("path", {
                d: "M21 3H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm0-4v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11z"
            })))
        };

    function $o() {
        return ($o = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var Yo, Jo, Qo = oe.h,
        Zo = function (e) {
            var t, r;

            function n() {
                return e.apply(this, arguments) || this
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var i = n.prototype;
            return i.componentWillUnmount = function () {
                this.props.onStop()
            }, i.render = function () {
                var e = this,
                    t = this.props,
                    r = t.recording,
                    n = t.stream,
                    i = t.recordedVideo,
                    o = {
                        playsinline: !0
                    };
                return (r || !i && !r) && (o.muted = !0, o.autoplay = !0, o.srcObject = n), i && !r && (o.muted = !1, o.controls = !0, o.src = i, this.videoElement && (this.videoElement.srcObject = void 0)), Qo("div", {
                    class: "uppy uppy-ScreenCapture-container"
                }, Qo("div", {
                    class: "uppy-ScreenCapture-videoContainer"
                }, Qo(Ko, this.props), Qo("video", $o({
                    ref: function (t) {
                        return e.videoElement = t
                    },
                    class: "uppy-ScreenCapture-video"
                }, o)), Qo(Xo, this.props)), Qo("div", {
                    class: "uppy-ScreenCapture-buttonContainer"
                }, Qo(zo, this.props), Qo(Ho, this.props)))
            }, n
        }(oe.Component);

    function es() {
        return (es = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function ts(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var rs = oe.h,
        ns = (Jo = Yo = function (e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).mediaDevices = navigator && navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia && window && window.MediaRecorder ? navigator.mediaDevices : null, n.protocol = location.protocol.match(/https/i) ? "https" : "http", n.id = n.opts.id || "ScreenCapture", n.title = n.opts.title || "Screencast", n.type = "acquirer", n.icon = Mo, n.defaultLocale = {
                    strings: {
                        startCapturing: "Begin screen capturing",
                        stopCapturing: "Stop screen capturing",
                        submitRecordedFile: "Submit captured video",
                        streamActive: "Stream active",
                        streamPassive: "Stream passive",
                        micDisabled: "Microphone access denied by user",
                        recording: "Recording"
                    }
                }, n.opts = es({}, {
                    displayMediaConstraints: {
                        video: {
                            width: 1280,
                            height: 720,
                            frameRate: {
                                ideal: 3,
                                max: 5
                            },
                            cursor: "motion",
                            displaySurface: "monitor"
                        }
                    },
                    userMediaConstraints: {
                        audio: !0
                    },
                    preferredVideoMimeType: "video/webm"
                }, r), n.translator = new E([n.defaultLocale, n.uppy.locale, n.opts.locale]), n.i18n = n.translator.translate.bind(n.translator), n.i18nArray = n.translator.translateArray.bind(n.translator), n.install = n.install.bind(ts(n)), n.setPluginState = n.setPluginState.bind(ts(n)), n.render = n.render.bind(ts(n)), n.start = n.start.bind(ts(n)), n.stop = n.stop.bind(ts(n)), n.startRecording = n.startRecording.bind(ts(n)), n.stopRecording = n.stopRecording.bind(ts(n)), n.submit = n.submit.bind(ts(n)), n.streamInterrupted = n.streamInactivated.bind(ts(n)), n.captureActive = !1, n.capturedMediaFile = null, n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var i = n.prototype;
            return i.install = function () {
                if (!this.mediaDevices) return this.uppy.log("Screen recorder access is not supported", "error"), null;
                this.setPluginState({
                    streamActive: !1,
                    audioStreamActive: !1
                });
                var e = this.opts.target;
                e && this.mount(e, this)
            }, i.uninstall = function () {
                this.videoStream && this.stop(), this.unmount()
            }, i.start = function () {
                var e = this;
                if (!this.mediaDevices) return Promise.reject(new Error("Screen recorder access not supported"));
                this.captureActive = !0, this.selectAudioStreamSource(), this.selectVideoStreamSource().then((function (t) {
                    !1 === t && e.parent && e.parent.hideAllPanels && (e.parent.hideAllPanels(), e.captureActive = !1)
                }))
            }, i.selectVideoStreamSource = function () {
                var e = this;
                return this.videoStream ? new Promise((function (t) {
                    return t(e.videoStream)
                })) : this.mediaDevices.getDisplayMedia(this.opts.displayMediaConstraints).then((function (t) {
                    return e.videoStream = t, e.videoStream.addEventListener("inactive", (function (t) {
                        e.streamInactivated()
                    })), e.setPluginState({
                        streamActive: !0
                    }), t
                })).catch((function (t) {
                    return e.setPluginState({
                        screenRecError: t
                    }), e.userDenied = !0, setTimeout((function () {
                        e.userDenied = !1
                    }), 1e3), !1
                }))
            }, i.selectAudioStreamSource = function () {
                var e = this;
                return this.audioStream ? new Promise((function (t) {
                    return t(e.audioStream)
                })) : this.mediaDevices.getUserMedia(this.opts.userMediaConstraints).then((function (t) {
                    return e.audioStream = t, e.setPluginState({
                        audioStreamActive: !0
                    }), t
                })).catch((function (t) {
                    return "NotAllowedError" === t.name && e.uppy.info(e.i18n("micDisabled"), "error", 5e3), !1
                }))
            }, i.startRecording = function () {
                var e = this,
                    t = {};
                this.capturedMediaFile = null, this.recordingChunks = [];
                var r = this.opts.preferredVideoMimeType;
                this.selectVideoStreamSource().then((function (n) {
                    r && MediaRecorder.isTypeSupported(r) && vo(r) && (t.mimeType = r);
                    var i = [n.getVideoTracks()[0]];
                    e.audioStream && i.push(e.audioStream.getAudioTracks()[0]), e.outputStream = new MediaStream(i), e.recorder = new MediaRecorder(e.outputStream, t), e.recorder.addEventListener("dataavailable", (function (t) {
                        e.recordingChunks.push(t.data)
                    })), e.recorder.start(), e.setPluginState({
                        recording: !0
                    })
                })).catch((function (t) {
                    e.uppy.log(t, "error")
                }))
            }, i.streamInactivated = function () {
                var e = es({}, this.getPluginState()),
                    t = e.recordedVideo,
                    r = e.recording;
                t || r ? r && (this.uppy.log("Capture stream inactive \u2014 stop recording"), this.stopRecording()) : this.parent && this.parent.hideAllPanels && this.parent.hideAllPanels(), this.videoStream = null, this.audioStream = null, this.setPluginState({
                    streamActive: !1,
                    audioStreamActive: !1
                })
            }, i.stopRecording = function () {
                var e = this;
                return new Promise((function (t, r) {
                    e.recorder.addEventListener("stop", (function () {
                        t()
                    })), e.recorder.stop()
                })).then((function () {
                    return e.setPluginState({
                        recording: !1
                    }), e.getVideo()
                })).then((function (t) {
                    e.capturedMediaFile = t, e.setPluginState({
                        recordedVideo: URL.createObjectURL(t.data)
                    })
                })).then((function () {
                    e.recordingChunks = null, e.recorder = null
                }), (function (t) {
                    throw e.recordingChunks = null, e.recorder = null, t
                }))
            }, i.submit = function () {
                try {
                    this.capturedMediaFile && this.uppy.addFile(this.capturedMediaFile)
                } catch (yc) {
                    yc.isRestriction || this.uppy.log(yc, "error")
                }
            }, i.stop = function () {
                this.videoStream && (this.videoStream.getVideoTracks().forEach((function (e) {
                    e.stop()
                })), this.videoStream.getAudioTracks().forEach((function (e) {
                    e.stop()
                })), this.videoStream = null), this.audioStream && (this.audioStream.getAudioTracks().forEach((function (e) {
                    e.stop()
                })), this.audioStream.getVideoTracks().forEach((function (e) {
                    e.stop()
                })), this.audioStream = null), this.outputStream && (this.outputStream.getAudioTracks().forEach((function (e) {
                    e.stop()
                })), this.outputStream.getVideoTracks().forEach((function (e) {
                    e.stop()
                })), this.outputStream = null), this.setPluginState({
                    recordedVideo: null
                }), this.captureActive = !1
            }, i.getVideo = function () {
                var e = this.recordingChunks[0].type,
                    t = vo(e);
                if (!t) return Promise.reject(new Error('Could not retrieve recording: Unsupported media type "' + e + '"'));
                var r = "screencap-" + Date.now() + "." + t,
                    n = new Blob(this.recordingChunks, {
                        type: e
                    }),
                    i = {
                        source: this.id,
                        name: r,
                        data: new Blob([n], {
                            type: e
                        }),
                        type: e
                    };
                return Promise.resolve(i)
            }, i.render = function (e) {
                var t = this.getPluginState();
                return t.streamActive || this.captureActive || this.userDenied || this.start(), rs(Zo, es({}, t, {
                    onStartRecording: this.startRecording,
                    onStopRecording: this.stopRecording,
                    onStop: this.stop,
                    onSubmit: this.submit,
                    i18n: this.i18n,
                    stream: this.videoStream
                }))
            }, n
        }(le.Plugin), Yo.VERSION = "1.0.8", Jo),
        is = function (e, t) {
            if (t = t.split(":")[0], !(e = +e)) return !1;
            switch (t) {
                case "http":
                case "ws":
                    return 80 !== e;
                case "https":
                case "wss":
                    return 443 !== e;
                case "ftp":
                    return 21 !== e;
                case "gopher":
                    return 70 !== e;
                case "file":
                    return !1
            }
            return 0 !== e
        },
        os = {},
        ss = Object.prototype.hasOwnProperty;

    function as(e) {
        try {
            return decodeURIComponent(e.replace(/\+/g, " "))
        } catch (t) {
            return null
        }
    }

    function us(e) {
        try {
            return encodeURIComponent(e)
        } catch (t) {
            return null
        }
    }
    os.stringify = function (e, t) {
        t = t || "";
        var r, n, i = [];
        for (n in "string" != typeof t && (t = "?"), e)
            if (ss.call(e, n)) {
                if ((r = e[n]) || null != r && !isNaN(r) || (r = ""), n = us(n), r = us(r), null === n || null === r) continue;
                i.push(n + "=" + r)
            } return i.length ? t + i.join("&") : ""
    }, os.parse = function (e) {
        for (var t, r = /([^=?#&]+)=?([^&]*)/g, n = {}; t = r.exec(e);) {
            var i = as(t[1]),
                o = as(t[2]);
            null === i || null === o || i in n || (n[i] = o)
        }
        return n
    };
    var ls = {};
    (function (e) {
        "use strict";
        var t = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//,
            r = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i,
            n = new RegExp("^[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]+");

        function i(e) {
            return (e || "").toString().replace(n, "")
        }
        var o = [
            ["#", "hash"],
            ["?", "query"],
            function (e) {
                return e.replace("\\", "/")
            },
            ["/", "pathname"],
            ["@", "auth", 1],
            [NaN, "host", void 0, 1, 1],
            [/:(\d+)$/, "port", void 0, 1],
            [NaN, "hostname", void 0, 1, 1]
        ],
            s = {
                hash: 1,
                query: 1
            };

        function a(r) {
            var n, i = ("undefined" != typeof window ? window : void 0 !== e ? e : "undefined" != typeof self ? self : {}).location || {},
                o = {},
                a = typeof (r = r || i);
            if ("blob:" === r.protocol) o = new l(unescape(r.pathname), {});
            else if ("string" === a)
                for (n in o = new l(r, {}), s) delete o[n];
            else if ("object" === a) {
                for (n in r) n in s || (o[n] = r[n]);
                void 0 === o.slashes && (o.slashes = t.test(r.href))
            }
            return o
        }

        function u(e) {
            e = i(e);
            var t = r.exec(e);
            return {
                protocol: t[1] ? t[1].toLowerCase() : "",
                slashes: !!t[2],
                rest: t[3]
            }
        }

        function l(e, t, r) {
            if (e = i(e), !(this instanceof l)) return new l(e, t, r);
            var n, s, c, p, d, h, f = o.slice(),
                y = typeof t,
                g = this,
                v = 0;
            for ("object" !== y && "string" !== y && (r = t, t = null), r && "function" != typeof r && (r = os.parse), t = a(t), n = !(s = u(e || "")).protocol && !s.slashes, g.slashes = s.slashes || n && t.slashes, g.protocol = s.protocol || t.protocol || "", e = s.rest, s.slashes || (f[3] = [/(.*)/, "pathname"]); v < f.length; v++) "function" != typeof (p = f[v]) ? (c = p[0], h = p[1], c != c ? g[h] = e : "string" == typeof c ? ~(d = e.indexOf(c)) && ("number" == typeof p[2] ? (g[h] = e.slice(0, d), e = e.slice(d + p[2])) : (g[h] = e.slice(d), e = e.slice(0, d))) : (d = c.exec(e)) && (g[h] = d[1], e = e.slice(0, d.index)), g[h] = g[h] || n && p[3] && t[h] || "", p[4] && (g[h] = g[h].toLowerCase())) : e = p(e);
            r && (g.query = r(g.query)), n && t.slashes && "/" !== g.pathname.charAt(0) && ("" !== g.pathname || "" !== t.pathname) && (g.pathname = function (e, t) {
                if ("" === e) return t;
                for (var r = (t || "/").split("/").slice(0, -1).concat(e.split("/")), n = r.length, i = r[n - 1], o = !1, s = 0; n--;) "." === r[n] ? r.splice(n, 1) : ".." === r[n] ? (r.splice(n, 1), s++) : s && (0 === n && (o = !0), r.splice(n, 1), s--);
                return o && r.unshift(""), "." !== i && ".." !== i || r.push(""), r.join("/")
            }(g.pathname, t.pathname)), is(g.port, g.protocol) || (g.host = g.hostname, g.port = ""), g.username = g.password = "", g.auth && (p = g.auth.split(":"), g.username = p[0] || "", g.password = p[1] || ""), g.origin = g.protocol && g.host && "file:" !== g.protocol ? g.protocol + "//" + g.host : "null", g.href = g.toString()
        }
        l.prototype = {
            set: function (e, t, r) {
                var n = this;
                switch (e) {
                    case "query":
                        "string" == typeof t && t.length && (t = (r || os.parse)(t)), n[e] = t;
                        break;
                    case "port":
                        n[e] = t, is(t, n.protocol) ? t && (n.host = n.hostname + ":" + t) : (n.host = n.hostname, n[e] = "");
                        break;
                    case "hostname":
                        n[e] = t, n.port && (t += ":" + n.port), n.host = t;
                        break;
                    case "host":
                        n[e] = t, /:\d+$/.test(t) ? (t = t.split(":"), n.port = t.pop(), n.hostname = t.join(":")) : (n.hostname = t, n.port = "");
                        break;
                    case "protocol":
                        n.protocol = t.toLowerCase(), n.slashes = !r;
                        break;
                    case "pathname":
                    case "hash":
                        if (t) {
                            var i = "pathname" === e ? "/" : "#";
                            n[e] = t.charAt(0) !== i ? i + t : t
                        } else n[e] = t;
                        break;
                    default:
                        n[e] = t
                }
                for (var s = 0; s < o.length; s++) {
                    var a = o[s];
                    a[4] && (n[a[1]] = n[a[1]].toLowerCase())
                }
                return n.origin = n.protocol && n.host && "file:" !== n.protocol ? n.protocol + "//" + n.host : "null", n.href = n.toString(), n
            },
            toString: function (e) {
                e && "function" == typeof e || (e = os.stringify);
                var t, r = this,
                    n = r.protocol;
                n && ":" !== n.charAt(n.length - 1) && (n += ":");
                var i = n + (r.slashes ? "//" : "");
                return r.username && (i += r.username, r.password && (i += ":" + r.password), i += "@"), i += r.host + r.pathname, (t = "object" == typeof r.query ? e(r.query) : r.query) && (i += "?" !== t.charAt(0) ? "?" + t : t), r.hash && (i += r.hash), i
            }
        }, l.extractProtocol = u, l.location = a, l.trimLeft = i, l.qs = os, ls = l
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    var cs = function () {
        function e(e) {
            this.limit = "number" != typeof e || 0 === e ? 1 / 0 : e, this.activeRequests = 0, this.queuedHandlers = []
        }
        var t = e.prototype;
        return t._call = function (e) {
            var t = this;
            this.activeRequests += 1;
            var r, n = !1;
            try {
                r = e()
            } catch (yc) {
                throw this.activeRequests -= 1, yc
            }
            return {
                abort: function () {
                    n || (n = !0, t.activeRequests -= 1, r(), t._queueNext())
                },
                done: function () {
                    n || (n = !0, t.activeRequests -= 1, t._queueNext())
                }
            }
        }, t._queueNext = function () {
            var e = this;
            Promise.resolve().then((function () {
                e._next()
            }))
        }, t._next = function () {
            if (!(this.activeRequests >= this.limit) && 0 !== this.queuedHandlers.length) {
                var e = this.queuedHandlers.shift(),
                    t = this._call(e.fn);
                e.abort = t.abort, e.done = t.done
            }
        }, t._queue = function (e, t) {
            var r = this;
            void 0 === t && (t = {});
            var n = {
                fn: e,
                priority: t.priority || 0,
                abort: function () {
                    r._dequeue(n)
                },
                done: function () {
                    throw new Error("Cannot mark a queued request as done: this indicates a bug")
                }
            },
                i = function (e, t) {
                    for (var r = 0; r < e.length; r++)
                        if (i = e[r], n.priority > i.priority) return r;
                    var i;
                    return -1
                }(this.queuedHandlers);
            return -1 === i ? this.queuedHandlers.push(n) : this.queuedHandlers.splice(i, 0, n), n
        }, t._dequeue = function (e) {
            var t = this.queuedHandlers.indexOf(e); - 1 !== t && this.queuedHandlers.splice(t, 1)
        }, t.run = function (e, t) {
            return this.activeRequests < this.limit ? this._call(e) : this._queue(e, t)
        }, t.wrapPromiseFunction = function (e, t) {
            var r = this;
            return function () {
                for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
                var s, a = new Promise((function (n, o) {
                    s = r.run((function () {
                        var t, r;
                        try {
                            r = Promise.resolve(e.apply(void 0, i))
                        } catch (yc) {
                            r = Promise.reject(yc)
                        }
                        return r.then((function (e) {
                            t ? o(t) : (s.done(), n(e))
                        }), (function (e) {
                            t ? o(t) : (s.done(), o(e))
                        })),
                            function () {
                                t = new Error("Cancelled")
                            }
                    }), t)
                }));
                return a.abort = function () {
                    s.abort()
                }, a
            }
        }, e
    }(),
        ps = function (e) {
            var t = [],
                r = [];

            function n(e) {
                t.push(e)
            }

            function i(e) {
                r.push(e)
            }
            return Promise.all(e.map((function (e) {
                return e.then(n, i)
            }))).then((function () {
                return {
                    successful: t,
                    failed: r
                }
            }))
        },
        ds = Object.prototype.hasOwnProperty,
        hs = q((function (e, t, r) {
            var n = t.progress,
                i = t.bytesUploaded,
                o = t.bytesTotal;
            n && (e.uppy.log("Upload progress: " + n), e.uppy.emit("upload-progress", r, {
                uploader: e,
                bytesUploaded: i,
                bytesTotal: o
            }))
        }), 300, {
            leading: !0,
            trailing: !0
        }),
        fs = function (e) {
            var t = /^(?:https?:\/\/|\/\/)?(?:[^@\n]+@)?(?:www\.)?([^\n]+)/i.exec(e)[1];
            return (/^http:\/\//i.test(e) ? "ws" : "wss") + "://" + t
        },
        ys = function () {
            function e(e) {
                this._events = [], this._emitter = e
            }
            var t = e.prototype;
            return t.on = function (e, t) {
                return this._events.push([e, t]), this._emitter.on(e, t)
            }, t.remove = function () {
                var e = this;
                this._events.forEach((function (t) {
                    var r = t[0],
                        n = t[1];
                    e._emitter.off(r, n)
                }))
            }, e
        }(),
        gs = function () {
            function e(e, t) {
                this._timeout = e, this._onTimedOut = t, this._isDone = !1, this._aliveTimer = null, this._onTimedOut = this._onTimedOut.bind(this)
            }
            var t = e.prototype;
            return t.progress = function () {
                this._isDone || this._timeout > 0 && (this._aliveTimer && clearTimeout(this._aliveTimer), this._aliveTimer = setTimeout(this._onTimedOut, this._timeout))
            }, t.done = function () {
                this._aliveTimer && (clearTimeout(this._aliveTimer), this._aliveTimer = null), this._isDone = !0
            }, e
        }(),
        vs = function (e) {
            return !!e && (0 !== e.readyState && 4 !== e.readyState || 0 === e.status)
        };

    function ms() {
        return (ms = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var bs = Me.Provider,
        ws = Me.RequestClient,
        _s = Me.Socket;

    function Ss(e, t) {
        return t || (t = new Error("Upload error")), "string" == typeof t && (t = new Error(t)), t instanceof Error || (t = ms(new Error("Upload error"), {
            data: t
        })), vs(e) ? t = new Te(t, e) : (t.request = e, t)
    }
    var ks, Ps, Cs = function () {
        function e(e, t) {
            this.uppy = e, this.opts = ms({
                validateStatus: function (e, t, r) {
                    return e >= 200 && e < 300
                }
            }, t), this.requests = t.__queue, this.uploaderEvents = Object.create(null), this.i18n = t.i18n
        }
        var t = e.prototype;
        return t._getOptions = function (e) {
            var t = this.uppy.getState().xhrUpload,
                r = ms({}, this.opts, t || {}, e.xhrUpload || {}, {
                    headers: {}
                });
            return ms(r.headers, this.opts.headers), t && ms(r.headers, t.headers), e.xhrUpload && ms(r.headers, e.xhrUpload.headers), r
        }, t.uploadFile = function (e, t, r) {
            var n = this.uppy.getFile(e);
            if (n.error) throw new Error(n.error);
            return n.isRemote ? this._uploadRemoteFile(n, t, r) : this._uploadLocalFile(n, t, r)
        }, t._addMetadata = function (e, t, r) {
            (Array.isArray(r.metaFields) ? r.metaFields : Object.keys(t)).forEach((function (r) {
                e.append(r, t[r])
            }))
        }, t._createFormDataUpload = function (e, t) {
            var r = new FormData;
            this._addMetadata(r, e.meta, t);
            var n = function (e) {
                return e.data.slice(0, e.data.size, e.meta.type)
            }(e);
            return e.name ? r.append(t.fieldName, n, e.meta.name) : r.append(t.fieldName, n), r
        }, t._createBareUpload = function (e, t) {
            return e.data
        }, t._onFileRemoved = function (e, t) {
            this.uploaderEvents[e].on("file-removed", (function (r) {
                e === r.id && t(r.id)
            }))
        }, t._onRetry = function (e, t) {
            this.uploaderEvents[e].on("upload-retry", (function (r) {
                e === r && t()
            }))
        }, t._onRetryAll = function (e, t) {
            var r = this;
            this.uploaderEvents[e].on("retry-all", (function (n) {
                r.uppy.getFile(e) && t()
            }))
        }, t._onCancelAll = function (e, t) {
            var r = this;
            this.uploaderEvents[e].on("cancel-all", (function () {
                r.uppy.getFile(e) && t()
            }))
        }, t._uploadLocalFile = function (e, t, r) {
            var n = this,
                i = this._getOptions(e);
            return this.uppy.log("uploading " + t + " of " + r), new Promise((function (t, r) {
                var o = i.formData ? n._createFormDataUpload(e, i) : n._createBareUpload(e, i),
                    s = new XMLHttpRequest;
                n.uploaderEvents[e.id] = new ys(n.uppy);
                var a = new gs(i.timeout, (function () {
                    s.abort(), l.done();
                    var t = new Error(n.i18n("timedOut", {
                        seconds: Math.ceil(i.timeout / 1e3)
                    }));
                    n.uppy.emit("upload-error", e, t), r(t)
                })),
                    u = I();
                s.upload.addEventListener("loadstart", (function (e) {
                    n.uppy.log("[AwsS3/XHRUpload] " + u + " started")
                })), s.upload.addEventListener("progress", (function (t) {
                    n.uppy.log("[AwsS3/XHRUpload] " + u + " progress: " + t.loaded + " / " + t.total), a.progress(), t.lengthComputable && n.uppy.emit("upload-progress", e, {
                        uploader: n,
                        bytesUploaded: t.loaded,
                        bytesTotal: t.total
                    })
                })), s.addEventListener("load", (function (o) {
                    if (n.uppy.log("[AwsS3/XHRUpload] " + u + " finished"), a.done(), l.done(), n.uploaderEvents[e.id] && (n.uploaderEvents[e.id].remove(), n.uploaderEvents[e.id] = null), i.validateStatus(o.target.status, s.responseText, s)) {
                        var c = i.getResponseData(s.responseText, s),
                            p = c[i.responseUrlFieldName],
                            d = {
                                status: o.target.status,
                                body: c,
                                uploadURL: p
                            };
                        return n.uppy.emit("upload-success", e, d), p && n.uppy.log("Download " + e.name + " from " + p), t(e)
                    }
                    var h = i.getResponseData(s.responseText, s),
                        f = Ss(s, i.getResponseError(s.responseText, s)),
                        y = {
                            status: o.target.status,
                            body: h
                        };
                    return n.uppy.emit("upload-error", e, f, y), r(f)
                })), s.addEventListener("error", (function (t) {
                    n.uppy.log("[AwsS3/XHRUpload] " + u + " errored"), a.done(), l.done(), n.uploaderEvents[e.id] && (n.uploaderEvents[e.id].remove(), n.uploaderEvents[e.id] = null);
                    var o = Ss(s, i.getResponseError(s.responseText, s));
                    return n.uppy.emit("upload-error", e, o), r(o)
                })), s.open(i.method.toUpperCase(), i.endpoint, !0), s.withCredentials = i.withCredentials, "" !== i.responseType && (s.responseType = i.responseType), Object.keys(i.headers).forEach((function (e) {
                    s.setRequestHeader(e, i.headers[e])
                }));
                var l = n.requests.run((function () {
                    return s.send(o),
                        function () {
                            a.done(), s.abort()
                        }
                }), {
                    priority: 1
                });
                n._onFileRemoved(e.id, (function () {
                    l.abort(), r(new Error("File removed"))
                })), n._onCancelAll(e.id, (function () {
                    l.abort(), r(new Error("Upload cancelled"))
                }))
            }))
        }, t._uploadRemoteFile = function (e, t, r) {
            var n = this,
                i = this._getOptions(e);
            return new Promise((function (t, r) {
                var o = {};
                (Array.isArray(i.metaFields) ? i.metaFields : Object.keys(e.meta)).forEach((function (t) {
                    o[t] = e.meta[t]
                })), new (e.remote.providerOptions.provider ? bs : ws)(n.uppy, e.remote.providerOptions).post(e.remote.url, ms({}, e.remote.body, {
                    endpoint: i.endpoint,
                    size: e.data.size,
                    fieldname: i.fieldName,
                    metadata: o,
                    httpMethod: i.method,
                    useFormData: i.formData,
                    headers: i.headers
                })).then((function (o) {
                    var s = o.token,
                        a = fs(e.remote.companionUrl),
                        u = new _s({
                            target: a + "/api/" + s,
                            autoOpen: !1
                        });
                    n.uploaderEvents[e.id] = new ys(n.uppy), n._onFileRemoved(e.id, (function () {
                        u.send("pause", {}), l.abort(), t("upload " + e.id + " was removed")
                    })), n._onCancelAll(e.id, (function () {
                        u.send("pause", {}), l.abort(), t("upload " + e.id + " was canceled")
                    })), n._onRetry(e.id, (function () {
                        u.send("pause", {}), u.send("resume", {})
                    })), n._onRetryAll(e.id, (function () {
                        u.send("pause", {}), u.send("resume", {})
                    })), u.on("progress", (function (t) {
                        return hs(n, t, e)
                    })), u.on("success", (function (r) {
                        var o = i.getResponseData(r.response.responseText, r.response),
                            s = o[i.responseUrlFieldName],
                            a = {
                                status: r.response.status,
                                body: o,
                                uploadURL: s
                            };
                        return n.uppy.emit("upload-success", e, a), l.done(), n.uploaderEvents[e.id] && (n.uploaderEvents[e.id].remove(), n.uploaderEvents[e.id] = null), t()
                    })), u.on("error", (function (t) {
                        var o = t.response,
                            s = o ? i.getResponseError(o.responseText, o) : ms(new Error(t.error.message), {
                                cause: t.error
                            });
                        n.uppy.emit("upload-error", e, s), l.done(), n.uploaderEvents[e.id] && (n.uploaderEvents[e.id].remove(), n.uploaderEvents[e.id] = null), r(s)
                    }));
                    var l = n.requests.run((function () {
                        return u.open(), e.isPaused && u.send("pause", {}),
                            function () {
                                return u.close()
                            }
                    }))
                })).catch((function (t) {
                    n.uppy.emit("upload-error", e, t), r(t)
                }))
            }))
        }, e
    }(),
        Es = function (e, t) {
            var r, n = t.headers ? t.headers["content-type"] : t.getResponseHeader("Content-Type");
            if ("string" == typeof n) {
                var i = (r = n, r.replace(/;.*$/, "")).toLowerCase();
                if ("application/xml" === i || "text/xml" === i) return !0;
                if ("text/html" === i && /^<\?xml /.test(e)) return !0
            }
            return !1
        };

    function As(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function Fs() {
        return (Fs = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var Os = "function" == typeof URL ? URL : ls,
        Us = Me.RequestClient;

    function Rs(e, t) {
        var r = e.indexOf("<" + t + ">"),
            n = e.indexOf("</" + t + ">", r);
        return -1 !== r && -1 !== n ? e.slice(r + t.length + 2, n) : ""
    }

    function Ts(e) {
        if (e && e.error) {
            var t = new Error(e.message);
            throw Fs(t, e.error), t
        }
        return e
    }
    var xs = !1,
        Ds = (Ps = ks = function (e) {
            var t, r;

            function n(t, r) {
                var n;
                (n = e.call(this, t, r) || this).type = "uploader", n.id = n.opts.id || "AwsS3", n.title = "AWS S3", n.defaultLocale = {
                    strings: {
                        timedOut: "Upload stalled for %{seconds} seconds, aborting."
                    }
                };
                var i = {
                    timeout: 3e4,
                    limit: 0,
                    metaFields: [],
                    getUploadParameters: n.getUploadParameters.bind(As(n))
                };
                return n.opts = Fs({}, i, r), n.i18nInit(), n.client = new Us(t, r), n.handleUpload = n.handleUpload.bind(As(n)), n.requests = new cs(n.opts.limit), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var i = n.prototype;
            return i.setOptions = function (t) {
                e.prototype.setOptions.call(this, t), this.i18nInit()
            }, i.i18nInit = function () {
                this.translator = new E([this.defaultLocale, this.uppy.locale, this.opts.locale]), this.i18n = this.translator.translate.bind(this.translator), this.setPluginState()
            }, i.getUploadParameters = function (e) {
                if (!this.opts.companionUrl) throw new Error("Expected a `companionUrl` option containing a Companion address.");
                var t = e.meta.name,
                    r = e.meta.type,
                    n = {};
                this.opts.metaFields.forEach((function (t) {
                    null != e.meta[t] && (n[t] = e.meta[t].toString())
                }));
                var i = function e(t, r) {
                    var n = [];
                    for (var i in t)
                        if (ds.call(t, i)) {
                            var o, s = t[i],
                                a = encodeURIComponent(i);
                            o = "object" == typeof s ? e(s, r ? r + "[" + a + "]" : a) : (r ? r + "[" + a + "]" : a) + "=" + encodeURIComponent(s), n.push(o)
                        } return n.join("&")
                }({
                    filename: t,
                    type: r,
                    metadata: n
                });
                return this.client.get("s3/params?" + i).then(Ts)
            }, i.validateParameters = function (e, t) {
                if ("object" != typeof t || !t || "string" != typeof t.url || "object" != typeof t.fields && null != t.fields || null != t.method && !/^(put|post)$/i.test(t.method)) {
                    var r = new TypeError("AwsS3: got incorrect result from 'getUploadParameters()' for file '" + e.name + "', expected an object '{ url, method, fields, headers }' but got '" + JSON.stringify(t) + "' instead.\nSee https://uppy.io/docs/aws-s3/#getUploadParameters-file for more on the expected format.");
                    throw console.error(r), r
                }
            }, i.handleUpload = function (e) {
                var t = this,
                    r = Object.create(null);

                function n(e) {
                    var t = e.id;
                    k(r, t) && r[t].abort()
                }
                this.uppy.on("file-removed", n), e.forEach((function (e) {
                    var r = t.uppy.getFile(e);
                    t.uppy.emit("upload-started", r)
                }));
                var i = this.requests.wrapPromiseFunction((function (e) {
                    return t.opts.getUploadParameters(e)
                })),
                    o = e.length;
                return ps(e.map((function (e, n) {
                    return r[e] = i(t.uppy.getFile(e)), r[e].then((function (i) {
                        delete r[e];
                        var s = t.uppy.getFile(e);
                        t.validateParameters(s, i);
                        var a = i.method,
                            u = void 0 === a ? "post" : a,
                            l = i.url,
                            c = i.fields,
                            p = i.headers,
                            d = {
                                method: u,
                                formData: "post" === u.toLowerCase(),
                                endpoint: l,
                                metaFields: c ? Object.keys(c) : []
                            };
                        return p && (d.headers = p), t.uppy.setFileState(s.id, {
                            meta: Fs({}, s.meta, c),
                            xhrUpload: d
                        }), t._uploader.uploadFile(s.id, n, o)
                    })).catch((function (n) {
                        delete r[e];
                        var i = t.uppy.getFile(e);
                        t.uppy.emit("upload-error", i, n)
                    }))
                }))).then((function (e) {
                    return t.uppy.off("file-removed", n), e
                }))
            }, i.install = function () {
                var e = this.uppy;
                this.uppy.addUploader(this.handleUpload);
                var t = {
                    fieldName: "file",
                    responseUrlFieldName: "location",
                    timeout: this.opts.timeout,
                    __queue: this.requests,
                    responseType: "text",
                    getResponseData: this.opts.getResponseData || function (t, r) {
                        var n, i;
                        return Es(t, r) ? {
                            location: (n = r.responseURL, i = Rs(t, "Location"), n ? new Os(i, n).toString() : new Os(i).toString()),
                            bucket: Rs(t, "Bucket"),
                            key: Rs(t, "Key"),
                            etag: Rs(t, "ETag")
                        } : "POST" === this.method.toUpperCase() ? (xs || (e.log("[AwsS3] No response data found, make sure to set the success_action_status AWS SDK option to 201. See https://uppy.io/docs/aws-s3/#POST-Uploads", "warning"), xs = !0), {
                            location: null
                        }) : r.responseURL ? {
                            location: r.responseURL.replace(/\?.*$/, "")
                        } : {
                                        location: null
                                    }
                    },
                    getResponseError: function (e, t) {
                        if (Es(e, t)) {
                            var r = Rs(e, "Message");
                            return new Error(r)
                        }
                    }
                };
                t.i18n = this.i18n, this._uploader = new Cs(this.uppy, t)
            }, i.uninstall = function () {
                this.uppy.removePreProcessor(this.handleUpload)
            }, n
        }(le.Plugin), ks.VERSION = "1.7.0", Ps),
        Bs = {};

    function Is(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function js(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function Ls(e, t, r) {
        return t && js(e.prototype, t), r && js(e, r), e
    }

    function Ms(e) {
        return (Ms = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function Ns(e, t) {
        return (Ns = Object.setPrototypeOf || function (e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }

    function zs(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function qs(e, t, r) {
        return (qs = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (e, t, r) {
            var n = function (e, t) {
                for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = Ms(e)););
                return e
            }(e, t);
            if (n) {
                var i = Object.getOwnPropertyDescriptor(n, t);
                return i.get ? i.get.call(r) : i.value
            }
        })(e, t, r || e)
    }
    Object.defineProperty(Bs, "__esModule", {
        value: !0
    });
    var Hs = function () {
        function e() {
            Is(this, e), Object.defineProperty(this, "listeners", {
                value: {},
                writable: !0,
                configurable: !0
            })
        }
        return Ls(e, [{
            key: "addEventListener",
            value: function (e, t) {
                e in this.listeners || (this.listeners[e] = []), this.listeners[e].push(t)
            }
        }, {
            key: "removeEventListener",
            value: function (e, t) {
                if (e in this.listeners)
                    for (var r = this.listeners[e], n = 0, i = r.length; n < i; n++)
                        if (r[n] === t) return void r.splice(n, 1)
            }
        }, {
            key: "dispatchEvent",
            value: function (e) {
                var t = this;
                if (e.type in this.listeners) {
                    for (var r = function (r) {
                        setTimeout((function () {
                            return r.call(t, e)
                        }))
                    }, n = this.listeners[e.type], i = 0, o = n.length; i < o; i++) r(n[i]);
                    return !e.defaultPrevented
                }
            }
        }]), e
    }(),
        Vs = function (e) {
            ! function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && Ns(e, t)
            }(i, Hs);
            var t, r, n = (t = i, r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], (function () { }))), !0
                } catch (e) {
                    return !1
                }
            }(), function () {
                var e, n, i, o = Ms(t);
                if (r) {
                    var s = Ms(this).constructor;
                    e = Reflect.construct(o, arguments, s)
                } else e = o.apply(this, arguments);
                return n = this, !(i = e) || "object" != typeof i && "function" != typeof i ? zs(n) : i
            });

            function i() {
                var e;
                return Is(this, i), (e = n.call(this)).listeners || Hs.call(zs(e)), Object.defineProperty(zs(e), "aborted", {
                    value: !1,
                    writable: !0,
                    configurable: !0
                }), Object.defineProperty(zs(e), "onabort", {
                    value: null,
                    writable: !0,
                    configurable: !0
                }), e
            }
            return Ls(i, [{
                key: "toString",
                value: function () {
                    return "[object AbortSignal]"
                }
            }, {
                key: "dispatchEvent",
                value: function (e) {
                    "abort" === e.type && (this.aborted = !0, "function" == typeof this.onabort && this.onabort.call(this, e)), qs(Ms(i.prototype), "dispatchEvent", this).call(this, e)
                }
            }]), i
        }(),
        Ws = function () {
            function e() {
                Is(this, e), Object.defineProperty(this, "signal", {
                    value: new Vs,
                    writable: !0,
                    configurable: !0
                })
            }
            return Ls(e, [{
                key: "abort",
                value: function () {
                    var e;
                    try {
                        e = new Event("abort")
                    } catch (t) {
                        "undefined" != typeof document ? document.createEvent ? (e = document.createEvent("Event")).initEvent("abort", !1, !1) : (e = document.createEventObject()).type = "abort" : e = {
                            type: "abort",
                            bubbles: !1,
                            cancelable: !1
                        }
                    }
                    this.signal.dispatchEvent(e)
                }
            }, {
                key: "toString",
                value: function () {
                    return "[object AbortController]"
                }
            }]), e
        }();
    "undefined" != typeof Symbol && Symbol.toStringTag && (Ws.prototype[Symbol.toStringTag] = "AbortController", Vs.prototype[Symbol.toStringTag] = "AbortSignal"), Bs.AbortController = Ws, Bs.AbortSignal = Vs;
    var Xs = {},
        Gs = Bs.AbortController;
    Bs.AbortSignal;
    Xs.AbortController = Gs, Xs.createAbortError = function (e) {
        void 0 === e && (e = "Aborted");
        try {
            return new DOMException(e, "AbortError")
        } catch (r) {
            var t = new Error(e);
            return t.name = "AbortError", t
        }
    };
    var Ks = Xs.createAbortError;

    function $s() {
        return ($s = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var Ys = Xs.AbortController,
        Js = Xs.createAbortError,
        Qs = {
            limit: 1,
            retryDelays: [0, 1e3, 3e3, 5e3],
            getChunkSize: function (e) {
                return Math.ceil(e.size / 1e4)
            },
            onStart: function () { },
            onProgress: function () { },
            onPartComplete: function () { },
            onSuccess: function () { },
            onError: function (e) {
                throw e
            }
        };

    function Zs(e) {
        if ("string" == typeof e) return parseInt(e, 10);
        if ("number" == typeof e) return e;
        throw new TypeError("Expected a number")
    }
    var ea, ta, ra = function () {
        function e(e, t) {
            this.options = $s({}, Qs, t), this.options.getChunkSize || (this.options.getChunkSize = Qs.getChunkSize), this.file = e, this.abortController = new Ys, this.key = this.options.key || null, this.uploadId = this.options.uploadId || null, this.parts = [], this.createdPromise = Promise.reject(), this.isPaused = !1, this.partsInProgress = 0, this.chunks = null, this.chunkState = null, this._initChunks(), this.createdPromise.catch((function () { }))
        }
        var t = e.prototype;
        return t._aborted = function () {
            return this.abortController.signal.aborted
        }, t._initChunks = function () {
            var e = [],
                t = this.options.getChunkSize(this.file),
                r = Math.max(5242880, Math.ceil(this.file.size / 1e4)),
                n = Math.max(t, r);
            if (0 === this.file.size) e.push(this.file);
            else
                for (var i = 0; i < this.file.size; i += n) {
                    var o = Math.min(this.file.size, i + n);
                    e.push(this.file.slice(i, o))
                }
            this.chunks = e, this.chunkState = e.map((function () {
                return {
                    uploaded: 0,
                    busy: !1,
                    done: !1
                }
            }))
        }, t._createUpload = function () {
            var e = this;
            return this.createdPromise = Promise.resolve().then((function () {
                return e.options.createMultipartUpload()
            })), this.createdPromise.then((function (t) {
                if (e._aborted()) throw Js();
                if ("object" != typeof t || !t || "string" != typeof t.uploadId || "string" != typeof t.key) throw new TypeError("AwsS3/Multipart: Got incorrect result from `createMultipartUpload()`, expected an object `{ uploadId, key }`.");
                e.key = t.key, e.uploadId = t.uploadId, e.options.onStart(t), e._uploadParts()
            })).catch((function (t) {
                e._onError(t)
            }))
        }, t._resumeUpload = function () {
            var e = this;
            return Promise.resolve().then((function () {
                return e.options.listParts({
                    uploadId: e.uploadId,
                    key: e.key
                })
            })).then((function (t) {
                if (e._aborted()) throw Js();
                t.forEach((function (t) {
                    var r = t.PartNumber - 1;
                    e.chunkState[r] = {
                        uploaded: Zs(t.Size),
                        etag: t.ETag,
                        done: !0
                    }, e.parts.some((function (e) {
                        return e.PartNumber === t.PartNumber
                    })) || e.parts.push({
                        PartNumber: t.PartNumber,
                        ETag: t.ETag
                    })
                })), e._uploadParts()
            })).catch((function (t) {
                e._onError(t)
            }))
        }, t._uploadParts = function () {
            var e = this;
            if (!this.isPaused) {
                var t = this.options.limit - this.partsInProgress;
                if (0 !== t)
                    if (this.chunkState.every((function (e) {
                        return e.done
                    }))) this._completeUpload();
                    else {
                        for (var r = [], n = 0; n < this.chunkState.length; n++) {
                            var i = this.chunkState[n];
                            if (!i.done && !i.busy && (r.push(n), r.length >= t)) break
                        }
                        r.forEach((function (t) {
                            e._uploadPartRetryable(t).then((function () {
                                e._uploadParts()
                            }), (function (t) {
                                e._onError(t)
                            }))
                        }))
                    }
            }
        }, t._retryable = function (e) {
            var t = this,
                r = e.before,
                n = e.attempt,
                i = e.after,
                o = this.options.retryDelays,
                s = this.abortController.signal;
            return r && r(),
                function e(r) {
                    return n().catch((function (n) {
                        if (t._aborted()) throw Js();
                        if (function (e) {
                            if (e.source && "number" == typeof e.source.status) {
                                var t = e.source.status;
                                return 0 === t || 409 === t || 423 === t || t >= 500 && t < 600
                            }
                            return !1
                        }(n) && r < o.length) return (i = o[r], a = {
                            signal: s
                        }, new Promise((function (e, t) {
                            if (a && a.signal && a.signal.aborted) return t(Ks());

                            function r() {
                                clearTimeout(n), o(), t(Ks())
                            }
                            var n = setTimeout((function () {
                                o(), e()
                            }), i);

                            function o() {
                                a && a.signal && a.signal.removeEventListener("abort", r)
                            }
                            a && a.signal && a.signal.addEventListener("abort", r)
                        }))).then((function () {
                            return e(r + 1)
                        }));
                        var i, a;
                        throw n
                    }))
                }(0).then((function (e) {
                    return i && i(), e
                }), (function (e) {
                    throw i && i(), e
                }))
        }, t._uploadPartRetryable = function (e) {
            var t = this;
            return this._retryable({
                before: function () {
                    t.partsInProgress += 1
                },
                attempt: function () {
                    return t._uploadPart(e)
                },
                after: function () {
                    t.partsInProgress -= 1
                }
            })
        }, t._uploadPart = function (e) {
            var t = this,
                r = this.chunks[e];
            return this.chunkState[e].busy = !0, Promise.resolve().then((function () {
                return t.options.prepareUploadPart({
                    key: t.key,
                    uploadId: t.uploadId,
                    body: r,
                    number: e + 1
                })
            })).then((function (e) {
                if ("object" != typeof e || !e || "string" != typeof e.url) throw new TypeError("AwsS3/Multipart: Got incorrect result from `prepareUploadPart()`, expected an object `{ url }`.");
                return e
            })).then((function (r) {
                var n = r.url,
                    i = r.headers;
                if (t._aborted()) throw t.chunkState[e].busy = !1, Js();
                return t._uploadPartBytes(e, n, i)
            }))
        }, t._onPartProgress = function (e, t, r) {
            this.chunkState[e].uploaded = Zs(t);
            var n = this.chunkState.reduce((function (e, t) {
                return e + t.uploaded
            }), 0);
            this.options.onProgress(n, this.file.size)
        }, t._onPartComplete = function (e, t) {
            this.chunkState[e].etag = t, this.chunkState[e].done = !0;
            var r = {
                PartNumber: e + 1,
                ETag: t
            };
            this.parts.push(r), this.options.onPartComplete(r)
        }, t._uploadPartBytes = function (e, t, r) {
            var n, i = this,
                o = this.chunks[e],
                s = this.abortController.signal,
                a = new Promise((function (e, t) {
                    n = {
                        resolve: e,
                        reject: t
                    }
                })),
                u = new XMLHttpRequest;

            function l() {
                s.removeEventListener("abort", c)
            }

            function c() {
                u.abort()
            }
            return u.open("PUT", t, !0), r && Object.keys(r).map((function (e) {
                u.setRequestHeader(e, r[e])
            })), u.responseType = "text", s.addEventListener("abort", c), u.upload.addEventListener("progress", (function (t) {
                t.lengthComputable && i._onPartProgress(e, t.loaded, t.total)
            })), u.addEventListener("abort", (function (t) {
                l(), i.chunkState[e].busy = !1, n.reject(Js())
            })), u.addEventListener("load", (function (t) {
                if (l(), i.chunkState[e].busy = !1, t.target.status < 200 || t.target.status >= 300) {
                    var r = new Error("Non 2xx");
                    return r.source = t.target, void n.reject(r)
                }
                i._onPartProgress(e, o.size, o.size);
                var s = t.target.getResponseHeader("ETag");
                null !== s ? (i._onPartComplete(e, s), n.resolve()) : n.reject(new Error("AwsS3/Multipart: Could not read the ETag header. This likely means CORS is not configured correctly on the S3 Bucket. Seee https://uppy.io/docs/aws-s3-multipart#S3-Bucket-Configuration for instructions."))
            })), u.addEventListener("error", (function (t) {
                l(), i.chunkState[e].busy = !1;
                var r = new Error("Unknown error");
                r.source = t.target, n.reject(r)
            })), u.send(o), a
        }, t._completeUpload = function () {
            var e = this;
            return this.parts.sort((function (e, t) {
                return e.PartNumber - t.PartNumber
            })), Promise.resolve().then((function () {
                return e.options.completeMultipartUpload({
                    key: e.key,
                    uploadId: e.uploadId,
                    parts: e.parts
                })
            })).then((function (t) {
                e.options.onSuccess(t)
            }), (function (t) {
                e._onError(t)
            }))
        }, t._abortUpload = function () {
            var e = this;
            this.abortController.abort(), this.createdPromise.then((function () {
                e.options.abortMultipartUpload({
                    key: e.key,
                    uploadId: e.uploadId
                })
            }), (function () { }))
        }, t._onError = function (e) {
            e && "AbortError" === e.name || this.options.onError(e)
        }, t.start = function () {
            this.isPaused = !1, this.uploadId ? this._resumeUpload() : this._createUpload()
        }, t.pause = function () {
            this.abortController.abort(), this.abortController = new Ys, this.isPaused = !0
        }, t.abort = function (e) {
            if (void 0 === e && (e = {}), !e.really) return this.pause();
            this._abortUpload()
        }, e
    }();

    function na(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function ia() {
        return (ia = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var oa = Me.Socket,
        sa = Me.Provider,
        aa = Me.RequestClient;

    function ua(e) {
        if (e && e.error) {
            var t = new Error(e.message);
            throw ia(t, e.error), t
        }
        return e
    }
    var la = (ta = ea = function (e) {
        var t, r;

        function n(t, r) {
            var n;
            (n = e.call(this, t, r) || this).type = "uploader", n.id = n.opts.id || "AwsS3Multipart", n.title = "AWS S3 Multipart", n.client = new aa(t, r);
            var i = {
                timeout: 3e4,
                limit: 0,
                retryDelays: [0, 1e3, 3e3, 5e3],
                createMultipartUpload: n.createMultipartUpload.bind(na(n)),
                listParts: n.listParts.bind(na(n)),
                prepareUploadPart: n.prepareUploadPart.bind(na(n)),
                abortMultipartUpload: n.abortMultipartUpload.bind(na(n)),
                completeMultipartUpload: n.completeMultipartUpload.bind(na(n))
            };
            return n.opts = ia({}, i, r), n.upload = n.upload.bind(na(n)), n.requests = new cs(n.opts.limit), n.uploaders = Object.create(null), n.uploaderEvents = Object.create(null), n.uploaderSockets = Object.create(null), n
        }
        r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
        var i = n.prototype;
        return i.resetUploaderReferences = function (e, t) {
            void 0 === t && (t = {}), this.uploaders[e] && (this.uploaders[e].abort({
                really: t.abort || !1
            }), this.uploaders[e] = null), this.uploaderEvents[e] && (this.uploaderEvents[e].remove(), this.uploaderEvents[e] = null), this.uploaderSockets[e] && (this.uploaderSockets[e].close(), this.uploaderSockets[e] = null)
        }, i.assertHost = function (e) {
            if (!this.opts.companionUrl) throw new Error("Expected a `companionUrl` option containing a Companion address, or if you are not using Companion, a custom `" + e + "` implementation.")
        }, i.createMultipartUpload = function (e) {
            this.assertHost("createMultipartUpload");
            var t = {};
            return Object.keys(e.meta).map((function (r) {
                null != e.meta[r] && (t[r] = e.meta[r].toString())
            })), this.client.post("s3/multipart", {
                filename: e.name,
                type: e.type,
                metadata: t
            }).then(ua)
        }, i.listParts = function (e, t) {
            var r = t.key,
                n = t.uploadId;
            this.assertHost("listParts");
            var i = encodeURIComponent(r);
            return this.client.get("s3/multipart/" + n + "?key=" + i).then(ua)
        }, i.prepareUploadPart = function (e, t) {
            var r = t.key,
                n = t.uploadId,
                i = t.number;
            this.assertHost("prepareUploadPart");
            var o = encodeURIComponent(r);
            return this.client.get("s3/multipart/" + n + "/" + i + "?key=" + o).then(ua)
        }, i.completeMultipartUpload = function (e, t) {
            var r = t.key,
                n = t.uploadId,
                i = t.parts;
            this.assertHost("completeMultipartUpload");
            var o = encodeURIComponent(r),
                s = encodeURIComponent(n);
            return this.client.post("s3/multipart/" + s + "/complete?key=" + o, {
                parts: i
            }).then(ua)
        }, i.abortMultipartUpload = function (e, t) {
            var r = t.key,
                n = t.uploadId;
            this.assertHost("abortMultipartUpload");
            var i = encodeURIComponent(r),
                o = encodeURIComponent(n);
            return this.client.delete("s3/multipart/" + o + "?key=" + i).then(ua)
        }, i.uploadFile = function (e) {
            var t = this;
            return new Promise((function (r, n) {
                var i = new ra(e.data, ia({
                    createMultipartUpload: t.opts.createMultipartUpload.bind(t, e),
                    listParts: t.opts.listParts.bind(t, e),
                    prepareUploadPart: t.opts.prepareUploadPart.bind(t, e),
                    completeMultipartUpload: t.opts.completeMultipartUpload.bind(t, e),
                    abortMultipartUpload: t.opts.abortMultipartUpload.bind(t, e),
                    getChunkSize: t.opts.getChunkSize ? t.opts.getChunkSize.bind(t) : null,
                    onStart: function (r) {
                        var n = t.uppy.getFile(e.id);
                        t.uppy.setFileState(e.id, {
                            s3Multipart: ia({}, n.s3Multipart, {
                                key: r.key,
                                uploadId: r.uploadId
                            })
                        })
                    },
                    onProgress: function (r, n) {
                        t.uppy.emit("upload-progress", e, {
                            uploader: t,
                            bytesUploaded: r,
                            bytesTotal: n
                        })
                    },
                    onError: function (r) {
                        t.uppy.log(r), t.uppy.emit("upload-error", e, r), o.done(), t.resetUploaderReferences(e.id), n(r)
                    },
                    onSuccess: function (n) {
                        var s = {
                            uploadURL: n.location
                        };
                        o.done(), t.resetUploaderReferences(e.id), t.uppy.emit("upload-success", e, s), n.location && t.uppy.log("Download " + i.file.name + " from " + n.location), r(i)
                    },
                    onPartComplete: function (r) {
                        var n = t.uppy.getFile(e.id);
                        n && t.uppy.emit("s3-multipart:part-uploaded", n, r)
                    },
                    limit: t.opts.limit || 5,
                    retryDelays: t.opts.retryDelays || []
                }, e.s3Multipart));
                t.uploaders[e.id] = i, t.uploaderEvents[e.id] = new ys(t.uppy);
                var o = t.requests.run((function () {
                    return e.isPaused || i.start(),
                        function () { }
                }));
                t.onFileRemove(e.id, (function (n) {
                    o.abort(), t.resetUploaderReferences(e.id, {
                        abort: !0
                    }), r("upload " + n.id + " was removed")
                })), t.onCancelAll(e.id, (function () {
                    o.abort(), t.resetUploaderReferences(e.id, {
                        abort: !0
                    }), r("upload " + e.id + " was canceled")
                })), t.onFilePause(e.id, (function (e) {
                    e ? (o.abort(), i.pause()) : (o.abort(), o = t.requests.run((function () {
                        return i.start(),
                            function () { }
                    })))
                })), t.onPauseAll(e.id, (function () {
                    o.abort(), i.pause()
                })), t.onResumeAll(e.id, (function () {
                    o.abort(), e.error && i.abort(), o = t.requests.run((function () {
                        return i.start(),
                            function () { }
                    }))
                })), e.isRestored || t.uppy.emit("upload-started", e, i)
            }))
        }, i.uploadRemote = function (e) {
            var t = this;
            return this.resetUploaderReferences(e.id), this.uppy.emit("upload-started", e), e.serverToken ? this.connectToServerSocket(e) : new Promise((function (r, n) {
                new (e.remote.providerOptions.provider ? sa : aa)(t.uppy, e.remote.providerOptions).post(e.remote.url, ia({}, e.remote.body, {
                    protocol: "s3-multipart",
                    size: e.data.size,
                    metadata: e.meta
                })).then((function (r) {
                    return t.uppy.setFileState(e.id, {
                        serverToken: r.token
                    }), e = t.uppy.getFile(e.id)
                })).then((function (e) {
                    return t.connectToServerSocket(e)
                })).then((function () {
                    r()
                })).catch((function (r) {
                    t.uppy.emit("upload-error", e, r), n(r)
                }))
            }))
        }, i.connectToServerSocket = function (e) {
            var t = this;
            return new Promise((function (r, n) {
                var i = e.serverToken,
                    o = fs(e.remote.companionUrl),
                    s = new oa({
                        target: o + "/api/" + i,
                        autoOpen: !1
                    });
                t.uploaderSockets[e.id] = s, t.uploaderEvents[e.id] = new ys(t.uppy), t.onFileRemove(e.id, (function (n) {
                    a.abort(), s.send("pause", {}), t.resetUploaderReferences(e.id, {
                        abort: !0
                    }), r("upload " + e.id + " was removed")
                })), t.onFilePause(e.id, (function (e) {
                    e ? (a.abort(), s.send("pause", {})) : (a.abort(), a = t.requests.run((function () {
                        return s.send("resume", {}),
                            function () { }
                    })))
                })), t.onPauseAll(e.id, (function () {
                    a.abort(), s.send("pause", {})
                })), t.onCancelAll(e.id, (function () {
                    a.abort(), s.send("pause", {}), t.resetUploaderReferences(e.id), r("upload " + e.id + " was canceled")
                })), t.onResumeAll(e.id, (function () {
                    a.abort(), e.error && s.send("pause", {}), a = t.requests.run((function () {
                        s.send("resume", {})
                    }))
                })), t.onRetry(e.id, (function () {
                    s.isOpen && (s.send("pause", {}), s.send("resume", {}))
                })), t.onRetryAll(e.id, (function () {
                    s.isOpen && (s.send("pause", {}), s.send("resume", {}))
                })), s.on("progress", (function (r) {
                    return hs(t, r, e)
                })), s.on("error", (function (r) {
                    t.uppy.emit("upload-error", e, new Error(r.error)), t.resetUploaderReferences(e.id), a.done(), n(new Error(r.error))
                })), s.on("success", (function (n) {
                    var i = {
                        uploadURL: n.url
                    };
                    t.uppy.emit("upload-success", e, i), t.resetUploaderReferences(e.id), a.done(), r()
                }));
                var a = t.requests.run((function () {
                    return s.open(), e.isPaused && s.send("pause", {}),
                        function () { }
                }))
            }))
        }, i.upload = function (e) {
            var t = this;
            if (0 === e.length) return Promise.resolve();
            var r = e.map((function (e) {
                var r = t.uppy.getFile(e);
                return r.isRemote ? t.uploadRemote(r) : t.uploadFile(r)
            }));
            return Promise.all(r)
        }, i.onFileRemove = function (e, t) {
            this.uploaderEvents[e].on("file-removed", (function (r) {
                e === r.id && t(r.id)
            }))
        }, i.onFilePause = function (e, t) {
            this.uploaderEvents[e].on("upload-pause", (function (r, n) {
                e === r && t(n)
            }))
        }, i.onRetry = function (e, t) {
            this.uploaderEvents[e].on("upload-retry", (function (r) {
                e === r && t()
            }))
        }, i.onRetryAll = function (e, t) {
            var r = this;
            this.uploaderEvents[e].on("retry-all", (function (n) {
                r.uppy.getFile(e) && t()
            }))
        }, i.onPauseAll = function (e, t) {
            var r = this;
            this.uploaderEvents[e].on("pause-all", (function () {
                r.uppy.getFile(e) && t()
            }))
        }, i.onCancelAll = function (e, t) {
            var r = this;
            this.uploaderEvents[e].on("cancel-all", (function () {
                r.uppy.getFile(e) && t()
            }))
        }, i.onResumeAll = function (e, t) {
            var r = this;
            this.uploaderEvents[e].on("resume-all", (function () {
                r.uppy.getFile(e) && t()
            }))
        }, i.install = function () {
            var e = this.uppy.getState().capabilities;
            this.uppy.setState({
                capabilities: ia({}, e, {
                    resumableUploads: !0
                })
            }), this.uppy.addUploader(this.upload)
        }, i.uninstall = function () {
            var e = this.uppy.getState().capabilities;
            this.uppy.setState({
                capabilities: ia({}, e, {
                    resumableUploads: !1
                })
            }), this.uppy.removeUploader(this.upload)
        }, n
    }(le.Plugin), ea.VERSION = "1.8.6", ta),
        ca = {
            exports: {}
        };
    (function (e) {
        ! function (e, t) {
            "object" == typeof ca.exports ? ca.exports = t(e) : t(e)
        }("undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== e ? e : this, (function (e) {
            "use strict";
            var t, r = (e = e || {}).Base64,
                n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                i = function (e) {
                    for (var t = {}, r = 0, n = e.length; r < n; r++) t[e.charAt(r)] = r;
                    return t
                }(n),
                o = String.fromCharCode,
                s = function (e) {
                    if (e.length < 2) return (t = e.charCodeAt(0)) < 128 ? e : t < 2048 ? o(192 | t >>> 6) + o(128 | 63 & t) : o(224 | t >>> 12 & 15) + o(128 | t >>> 6 & 63) + o(128 | 63 & t);
                    var t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
                    return o(240 | t >>> 18 & 7) + o(128 | t >>> 12 & 63) + o(128 | t >>> 6 & 63) + o(128 | 63 & t)
                },
                a = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
                u = function (e) {
                    return e.replace(a, s)
                },
                l = function (e) {
                    var t = [0, 2, 1][e.length % 3],
                        r = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0);
                    return [n.charAt(r >>> 18), n.charAt(r >>> 12 & 63), t >= 2 ? "=" : n.charAt(r >>> 6 & 63), t >= 1 ? "=" : n.charAt(63 & r)].join("")
                },
                c = e.btoa && "function" == typeof e.btoa ? function (t) {
                    return e.btoa(t)
                } : function (e) {
                    if (e.match(/[^\x00-\xFF]/)) throw new RangeError("The string contains invalid characters.");
                    return e.replace(/[\s\S]{1,3}/g, l)
                },
                p = function (e) {
                    return c(u(String(e)))
                },
                d = function (e) {
                    return e.replace(/[+\/]/g, (function (e) {
                        return "+" == e ? "-" : "_"
                    })).replace(/=/g, "")
                },
                h = function (e, t) {
                    return t ? d(p(e)) : p(e)
                };
            e.Uint8Array && (t = function (e, t) {
                for (var r = "", i = 0, o = e.length; i < o; i += 3) {
                    var s = e[i],
                        a = e[i + 1],
                        u = e[i + 2],
                        l = s << 16 | a << 8 | u;
                    r += n.charAt(l >>> 18) + n.charAt(l >>> 12 & 63) + (void 0 !== a ? n.charAt(l >>> 6 & 63) : "=") + (void 0 !== u ? n.charAt(63 & l) : "=")
                }
                return t ? d(r) : r
            });
            var f, y = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,
                g = function (e) {
                    switch (e.length) {
                        case 4:
                            var t = ((7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3)) - 65536;
                            return o(55296 + (t >>> 10)) + o(56320 + (1023 & t));
                        case 3:
                            return o((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));
                        default:
                            return o((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1))
                    }
                },
                v = function (e) {
                    return e.replace(y, g)
                },
                m = function (e) {
                    var t = e.length,
                        r = t % 4,
                        n = (t > 0 ? i[e.charAt(0)] << 18 : 0) | (t > 1 ? i[e.charAt(1)] << 12 : 0) | (t > 2 ? i[e.charAt(2)] << 6 : 0) | (t > 3 ? i[e.charAt(3)] : 0),
                        s = [o(n >>> 16), o(n >>> 8 & 255), o(255 & n)];
                    return s.length -= [0, 0, 2, 1][r], s.join("")
                },
                b = e.atob && "function" == typeof e.atob ? function (t) {
                    return e.atob(t)
                } : function (e) {
                    return e.replace(/\S{1,4}/g, m)
                },
                w = function (e) {
                    return b(String(e).replace(/[^A-Za-z0-9\+\/]/g, ""))
                },
                _ = function (e) {
                    return function (e) {
                        return v(b(e))
                    }(String(e).replace(/[-_]/g, (function (e) {
                        return "-" == e ? "+" : "/"
                    })).replace(/[^A-Za-z0-9\+\/]/g, ""))
                };
            if (e.Uint8Array && (f = function (e) {
                return Uint8Array.from(w(e), (function (e) {
                    return e.charCodeAt(0)
                }))
            }), e.Base64 = {
                VERSION: "2.6.2",
                atob: w,
                btoa: c,
                fromBase64: _,
                toBase64: h,
                utob: u,
                encode: h,
                encodeURI: function (e) {
                    return h(e, !0)
                },
                btou: v,
                decode: _,
                noConflict: function () {
                    var t = e.Base64;
                    return e.Base64 = r, t
                },
                fromUint8Array: t,
                toUint8Array: f
            }, "function" == typeof Object.defineProperty) {
                var S = function (e) {
                    return {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                };
                e.Base64.extendString = function () {
                    Object.defineProperty(String.prototype, "fromBase64", S((function () {
                        return _(this)
                    }))), Object.defineProperty(String.prototype, "toBase64", S((function (e) {
                        return h(this, e)
                    }))), Object.defineProperty(String.prototype, "toBase64URI", S((function () {
                        return h(this, !0)
                    })))
                }
            }
            return e.Meteor && (Base64 = e.Base64), !!ca.exports && (ca.exports.Base64 = e.Base64), {
                Base64: e.Base64
            }
        }))
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}), ca = ca.exports;
    var pa = {};

    function da(e) {
        return (da = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function ha(e) {
        var t = "function" == typeof Map ? new Map : void 0;
        return (ha = function (e) {
            if (null === e || (r = e, -1 === Function.toString.call(r).indexOf("[native code]"))) return e;
            var r;
            if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== t) {
                if (t.has(e)) return t.get(e);
                t.set(e, n)
            }

            function n() {
                return fa(e, arguments, va(this).constructor)
            }
            return n.prototype = Object.create(e.prototype, {
                constructor: {
                    value: n,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), ga(n, e)
        })(e)
    }

    function fa(e, t, r) {
        return (fa = ya() ? Reflect.construct : function (e, t, r) {
            var n = [null];
            n.push.apply(n, t);
            var i = new (Function.bind.apply(e, n));
            return r && ga(i, r.prototype), i
        }).apply(null, arguments)
    }

    function ya() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], (function () { }))), !0
        } catch (e) {
            return !1
        }
    }

    function ga(e, t) {
        return (ga = Object.setPrototypeOf || function (e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }

    function va(e) {
        return (va = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }
    Object.defineProperty(pa, "__esModule", {
        value: !0
    }), pa.default = void 0;
    var ma = function (e) {
        ! function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), t && ga(e, t)
        }(n, ha(Error));
        var t, r = (t = n, function () {
            var e, r = va(t);
            if (ya()) {
                var n = va(this).constructor;
                e = Reflect.construct(r, arguments, n)
            } else e = r.apply(this, arguments);
            return function (e, t) {
                return !t || "object" !== da(t) && "function" != typeof t ? function (e) {
                    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }(e) : t
            }(this, e)
        });

        function n(e) {
            var t, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
            if (function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, n), (t = r.call(this, e)).originalRequest = o, t.originalResponse = s, t.causingError = i, null != i && (e += ", caused by ".concat(i.toString())), null != o) {
                var a = o.getHeader("X-Request-ID") || "n/a",
                    u = o.getMethod(),
                    l = o.getURL(),
                    c = s ? s.getStatus() : "n/a",
                    p = s ? s.getBody() || "" : "n/a";
                e += ", originated from request (method: ".concat(u, ", url: ").concat(l, ", response code: ").concat(c, ", response text: ").concat(p, ", request id: ").concat(a, ")")
            }
            return t.message = e, t
        }
        return n
    }();
    pa.default = ma;
    var ba = {};
    Object.defineProperty(ba, "__esModule", {
        value: !0
    }), ba.enableDebugLog = function () {
        wa = !0
    }, ba.log = function (e) {
        wa && console.log(e)
    };
    var wa = !1,
        _a = {};
    Object.defineProperty(_a, "__esModule", {
        value: !0
    }), _a.default = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function (e) {
            var t = 16 * Math.random() | 0;
            return ("x" == e ? t : 3 & t | 8).toString(16)
        }))
    };
    var Sa = {};
    Object.defineProperty(Sa, "__esModule", {
        value: !0
    }), Sa.default = void 0;
    var ka = Ea(ls),
        Pa = Ea(pa),
        Ca = Ea(_a);

    function Ea(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function Aa(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), r.push.apply(r, n)
        }
        return r
    }

    function Fa(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? Aa(Object(r), !0).forEach((function (t) {
                Oa(e, t, r[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Aa(Object(r)).forEach((function (t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            }))
        }
        return e
    }

    function Oa(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }

    function Ua(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    var Ra = function () {
        function e(t, r) {
            ! function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), "resume" in r && console.log("tus: The `resume` option has been removed in tus-js-client v2. Please use the URL storage API instead."), this.options = r, this._urlStorage = this.options.urlStorage, this.file = t, this.url = null, this._req = null, this._fingerprint = null, this._urlStorageKey = null, this._offset = null, this._aborted = !1, this._size = null, this._source = null, this._retryAttempt = 0, this._retryTimeout = null, this._offsetBeforeRetry = 0, this._parallelUploads = null, this._parallelUploadUrls = null
        }
        var t, r, n;
        return t = e, n = [{
            key: "terminate",
            value: function (t) {
                var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    n = arguments.length > 2 ? arguments[2] : void 0;
                if ("function" == typeof r || "function" == typeof n) throw new Error("tus: the terminate function does not accept a callback since v2 anymore; please use the returned Promise instead");
                var i = Da("DELETE", t, r);
                return Ba(i, null, r).then((function (e) {
                    if (204 !== e.getStatus()) throw new Pa.default("tus: unexpected response while terminating upload", null, i, e)
                })).catch((function (n) {
                    if (n instanceof Pa.default || (n = new Pa.default("tus: failed to terminate upload", n, i, null)), !Ia(n, 0, r)) throw n;
                    var o = r.retryDelays[0],
                        s = r.retryDelays.slice(1),
                        a = Fa({}, r, {
                            retryDelays: s
                        });
                    return new Promise((function (e) {
                        return setTimeout(e, o)
                    })).then((function () {
                        return e.terminate(t, a)
                    }))
                }))
            }
        }], (r = [{
            key: "findPreviousUploads",
            value: function () {
                var e = this;
                return this.options.fingerprint(this.file, this.options).then((function (t) {
                    return e._urlStorage.findUploadsByFingerprint(t)
                }))
            }
        }, {
            key: "resumeFromPreviousUpload",
            value: function (e) {
                this.url = e.uploadUrl || null, this._parallelUploadUrls = e.parallelUploadUrls || null, this._urlStorageKey = e.urlStorageKey
            }
        }, {
            key: "start",
            value: function () {
                var e = this,
                    t = this.file;
                if (t)
                    if (this.options.endpoint || this.options.uploadUrl) {
                        var r = this.options.retryDelays;
                        null == r || "[object Array]" === Object.prototype.toString.call(r) ? (this.options.parallelUploads > 1 && ["uploadUrl", "uploadSize", "uploadLengthDeferred"].forEach((function (t) {
                            e.options[t] && e._emitError(new Error("tus: cannot use the ".concat(t, " option when parallelUploads is enabled")))
                        })), this.options.fingerprint(t, this.options).then((function (r) {
                            return null == r ? (0, ba.log)("No fingerprint was calculated meaning that the upload cannot be stored in the URL storage.") : (0, ba.log)("Calculated fingerprint: ".concat(r)), e._fingerprint = r, e._source ? e._source : e.options.fileReader.openFile(t, e.options.chunkSize)
                        })).then((function (t) {
                            e._source = t, e.options.parallelUploads > 1 || null != e._parallelUploadUrls ? e._startParallelUpload() : e._startSingleUpload()
                        })).catch((function (t) {
                            e._emitError(t)
                        }))) : this._emitError(new Error("tus: the `retryDelays` option must either be an array or null"))
                    } else this._emitError(new Error("tus: neither an endpoint or an upload URL is provided"));
                else this._emitError(new Error("tus: no file or stream to upload provided"))
            }
        }, {
            key: "_startParallelUpload",
            value: function () {
                var t = this,
                    r = this._size = this._source.size,
                    n = 0;
                this._parallelUploads = [];
                var i = null != this._parallelUploadUrls ? this._parallelUploadUrls.length : this.options.parallelUploads,
                    o = function (e, t, r) {
                        for (var n = Math.floor(e / t), i = [], o = 0; o < t; o++) i.push({
                            start: n * o,
                            end: n * (o + 1)
                        });
                        return i[t - 1].end = e, r && i.forEach((function (e, t) {
                            e.uploadUrl = r[t] || null
                        })), i
                    }(this._source.size, i, this._parallelUploadUrls);
                this._parallelUploadUrls = new Array(o.length);
                var s, a = o.map((function (i, s) {
                    var a = 0;
                    return t._source.slice(i.start, i.end).then((function (u) {
                        var l = u.value;
                        return new Promise((function (u, c) {
                            var p = Fa({}, t.options, {
                                uploadUrl: i.uploadUrl || null,
                                storeFingerprintForResuming: !1,
                                removeFingerprintOnSuccess: !1,
                                parallelUploads: 1,
                                metadata: {},
                                headers: Fa({}, t.options.headers, {
                                    "Upload-Concat": "partial"
                                }),
                                onSuccess: u,
                                onError: c,
                                onProgress: function (e) {
                                    n = n - a + e, a = e, t._emitProgress(n, r)
                                },
                                _onUploadUrlAvailable: function () {
                                    t._parallelUploadUrls[s] = d.url, t._parallelUploadUrls.filter((function (e) {
                                        return !!e
                                    })).length === o.length && t._saveUploadInUrlStorage()
                                }
                            }),
                                d = new e(l, p);
                            d.start(), t._parallelUploads.push(d)
                        }))
                    }))
                }));
                Promise.all(a).then((function () {
                    (s = t._openRequest("POST", t.options.endpoint)).setHeader("Upload-Concat", "final;".concat(t._parallelUploadUrls.join(" ")));
                    var e = Ta(t.options.metadata);
                    return "" !== e && s.setHeader("Upload-Metadata", e), t._sendRequest(s, null)
                })).then((function (e) {
                    if (xa(e.getStatus(), 200)) {
                        var r = e.getHeader("Location");
                        null != r ? (t.url = ja(t.options.endpoint, r), (0, ba.log)("Created upload at ".concat(t.url)), t._emitSuccess()) : t._emitHttpError(s, e, "tus: invalid or missing Location header")
                    } else t._emitHttpError(s, e, "tus: unexpected response while creating upload")
                })).catch((function (e) {
                    t._emitError(e)
                }))
            }
        }, {
            key: "_startSingleUpload",
            value: function () {
                if (this.options.uploadLengthDeferred) this._size = null;
                else if (null != this.options.uploadSize) {
                    if (this._size = +this.options.uploadSize, isNaN(this._size)) return void this._emitError(new Error("tus: cannot convert `uploadSize` option into a number"))
                } else if (this._size = this._source.size, null == this._size) return void this._emitError(new Error("tus: cannot automatically derive upload's size from input and must be specified manually using the `uploadSize` option"));
                return this._aborted = !1, null != this.url ? ((0, ba.log)("Resuming upload from previous URL: ".concat(this.url)), void this._resumeUpload()) : null != this.options.uploadUrl ? ((0, ba.log)("Resuming upload from provided URL: ".concat(this.options.url)), this.url = this.options.uploadUrl, void this._resumeUpload()) : ((0, ba.log)("Creating a new upload"), void this._createUpload())
            }
        }, {
            key: "abort",
            value: function (t, r) {
                var n = this;
                if ("function" == typeof r) throw new Error("tus: the abort function does not accept a callback since v2 anymore; please use the returned Promise instead");
                return null != this._parallelUploads && this._parallelUploads.forEach((function (e) {
                    e.abort(t)
                })), null !== this._req && (this._req.abort(), this._source.close()), this._aborted = !0, null != this._retryTimeout && (clearTimeout(this._retryTimeout), this._retryTimeout = null), t && null != this.url ? e.terminate(this.url, this.options).then((function () {
                    return n._removeFromUrlStorage()
                })) : Promise.resolve()
            }
        }, {
            key: "_emitHttpError",
            value: function (e, t, r, n) {
                this._emitError(new Pa.default(r, n, e, t))
            }
        }, {
            key: "_emitError",
            value: function (e) {
                var t = this;
                if (!this._aborted) {
                    if (null != this.options.retryDelays && (null != this._offset && this._offset > this._offsetBeforeRetry && (this._retryAttempt = 0), Ia(e, this._retryAttempt, this.options))) {
                        var r = this.options.retryDelays[this._retryAttempt++];
                        return this._offsetBeforeRetry = this._offset, void (this._retryTimeout = setTimeout((function () {
                            t.start()
                        }), r))
                    }
                    if ("function" != typeof this.options.onError) throw e;
                    this.options.onError(e)
                }
            }
        }, {
            key: "_emitSuccess",
            value: function () {
                this.options.removeFingerprintOnSuccess && this._removeFromUrlStorage(), "function" == typeof this.options.onSuccess && this.options.onSuccess()
            }
        }, {
            key: "_emitProgress",
            value: function (e, t) {
                "function" == typeof this.options.onProgress && this.options.onProgress(e, t)
            }
        }, {
            key: "_emitChunkComplete",
            value: function (e, t, r) {
                "function" == typeof this.options.onChunkComplete && this.options.onChunkComplete(e, t, r)
            }
        }, {
            key: "_createUpload",
            value: function () {
                var e = this;
                if (this.options.endpoint) {
                    var t = this._openRequest("POST", this.options.endpoint);
                    this.options.uploadLengthDeferred ? t.setHeader("Upload-Defer-Length", 1) : t.setHeader("Upload-Length", this._size);
                    var r, n = Ta(this.options.metadata);
                    "" !== n && t.setHeader("Upload-Metadata", n), this.options.uploadDataDuringCreation && !this.options.uploadLengthDeferred ? (this._offset = 0, r = this._addChunkToRequest(t)) : r = this._sendRequest(t, null), r.then((function (r) {
                        if (xa(r.getStatus(), 200)) {
                            var n = r.getHeader("Location");
                            if (null != n) {
                                if (e.url = ja(e.options.endpoint, n), (0, ba.log)("Created upload at ".concat(e.url)), "function" == typeof e.options._onUploadUrlAvailable && e.options._onUploadUrlAvailable(), 0 === e._size) return e._emitSuccess(), void e._source.close();
                                e._saveUploadInUrlStorage(), e.options.uploadDataDuringCreation ? e._handleUploadResponse(t, r) : (e._offset = 0, e._performUpload())
                            } else e._emitHttpError(t, r, "tus: invalid or missing Location header")
                        } else e._emitHttpError(t, r, "tus: unexpected response while creating upload")
                    })).catch((function (r) {
                        e._emitHttpError(t, null, "tus: failed to create upload", r)
                    }))
                } else this._emitError(new Error("tus: unable to create upload because no endpoint is provided"))
            }
        }, {
            key: "_resumeUpload",
            value: function () {
                var e = this,
                    t = this._openRequest("HEAD", this.url);
                this._sendRequest(t, null).then((function (r) {
                    var n = r.getStatus();
                    if (!xa(n, 200)) return xa(n, 400) && e._removeFromUrlStorage(), 423 === n ? void e._emitHttpError(t, r, "tus: upload is currently locked; retry later") : e.options.endpoint ? (e.url = null, void e._createUpload()) : void e._emitHttpError(t, r, "tus: unable to resume upload (new upload cannot be created without an endpoint)");
                    var i = parseInt(r.getHeader("Upload-Offset"), 10);
                    if (isNaN(i)) e._emitHttpError(t, r, "tus: invalid or missing offset value");
                    else {
                        var o = parseInt(r.getHeader("Upload-Length"), 10);
                        if (!isNaN(o) || e.options.uploadLengthDeferred) {
                            if ("function" == typeof e.options._onUploadUrlAvailable && e.options._onUploadUrlAvailable(), i === o) return e._emitProgress(o, o), void e._emitSuccess();
                            e._offset = i, e._performUpload()
                        } else e._emitHttpError(t, r, "tus: invalid or missing length value")
                    }
                })).catch((function (r) {
                    e._emitHttpError(t, null, "tus: failed to resume upload", r)
                }))
            }
        }, {
            key: "_performUpload",
            value: function () {
                var e, t = this;
                this._aborted || (this.options.overridePatchMethod ? (e = this._openRequest("POST", this.url)).setHeader("X-HTTP-Method-Override", "PATCH") : e = this._openRequest("PATCH", this.url), e.setHeader("Upload-Offset", this._offset), this._addChunkToRequest(e).then((function (r) {
                    xa(r.getStatus(), 200) ? t._handleUploadResponse(e, r) : t._emitHttpError(e, r, "tus: unexpected response while uploading chunk")
                })).catch((function (r) {
                    t._aborted || t._emitHttpError(e, null, "tus: failed to upload chunk at offset " + t._offset, r)
                })))
            }
        }, {
            key: "_addChunkToRequest",
            value: function (e) {
                var t = this,
                    r = this._offset,
                    n = this._offset + this.options.chunkSize;
                return e.setProgressHandler((function (e) {
                    t._emitProgress(r + e, t._size)
                })), e.setHeader("Content-Type", "application/offset+octet-stream"), (n === 1 / 0 || n > this._size) && !this.options.uploadLengthDeferred && (n = this._size), this._source.slice(r, n).then((function (r) {
                    var n = r.value,
                        i = r.done;
                    return t.options.uploadLengthDeferred && i && (t._size = t._offset + (n && n.size ? n.size : 0), e.setHeader("Upload-Length", t._size)), null === n ? t._sendRequest(e) : (t._emitProgress(t._offset, t._size), t._sendRequest(e, n))
                }))
            }
        }, {
            key: "_handleUploadResponse",
            value: function (e, t) {
                var r = parseInt(t.getHeader("Upload-Offset"), 10);
                if (isNaN(r)) this._emitHttpError(e, t, "tus: invalid or missing offset value");
                else {
                    if (this._emitProgress(r, this._size), this._emitChunkComplete(r - this._offset, r, this._size), this._offset = r, r == this._size) return this._emitSuccess(), void this._source.close();
                    this._performUpload()
                }
            }
        }, {
            key: "_openRequest",
            value: function (e, t) {
                var r = Da(e, t, this.options);
                return this._req = r, r
            }
        }, {
            key: "_removeFromUrlStorage",
            value: function () {
                var e = this;
                this._urlStorageKey && (this._urlStorage.removeUpload(this._urlStorageKey).catch((function (t) {
                    e._emitError(t)
                })), this._urlStorageKey = null)
            }
        }, {
            key: "_saveUploadInUrlStorage",
            value: function () {
                var e = this;
                if (this.options.storeFingerprintForResuming && this._fingerprint) {
                    var t = {
                        size: this._size,
                        metadata: this.options.metadata,
                        creationTime: (new Date).toString()
                    };
                    this._parallelUploads ? t.parallelUploadUrls = this._parallelUploadUrls : t.uploadUrl = this.url, this._urlStorage.addUpload(this._fingerprint, t).then((function (t) {
                        return e._urlStorageKey = t
                    })).catch((function (t) {
                        e._emitError(t)
                    }))
                }
            }
        }, {
            key: "_sendRequest",
            value: function (e) {
                return Ba(e, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, this.options)
            }
        }]) && Ua(t.prototype, r), n && Ua(t, n), e
    }();

    function Ta(e) {
        var t = [];
        for (var r in e) t.push(r + " " + ca.Base64.encode(e[r]));
        return t.join(",")
    }

    function xa(e, t) {
        return e >= t && e < t + 100
    }

    function Da(e, t, r) {
        var n = r.httpStack.createRequest(e, t);
        n.setHeader("Tus-Resumable", "1.0.0");
        var i = r.headers || {};
        for (var o in i) n.setHeader(o, i[o]);
        if (r.addRequestId) {
            var s = (0, Ca.default)();
            n.setHeader("X-Request-ID", s)
        }
        return n
    }

    function Ba(e, t, r) {
        return ("function" == typeof r.onBeforeRequest ? Promise.resolve(r.onBeforeRequest(e)) : Promise.resolve()).then((function () {
            return e.send(t).then((function (t) {
                return ("function" == typeof r.onAfterResponse ? Promise.resolve(r.onAfterResponse(e, t)) : Promise.resolve()).then((function () {
                    return t
                }))
            }))
        }))
    }

    function Ia(e, t, r) {
        if (null == r.retryDelays || t >= r.retryDelays.length || null == e.originalRequest) return !1;
        if (r && "function" == typeof r.onShouldRetry) return r.onShouldRetry(e, t, r);
        var n, i = e.originalResponse ? e.originalResponse.getStatus() : 0;
        return (!xa(i, 400) || 409 === i || 423 === i) && (n = !0, "undefined" != typeof window && "navigator" in window && !1 === window.navigator.onLine && (n = !1), n)
    }

    function ja(e, t) {
        return new ka.default(t, e).toString()
    }
    Ra.defaultOptions = {
        endpoint: null,
        uploadUrl: null,
        metadata: {},
        fingerprint: null,
        uploadSize: null,
        onProgress: null,
        onChunkComplete: null,
        onSuccess: null,
        onError: null,
        _onUploadUrlAvailable: null,
        overridePatchMethod: !1,
        headers: {},
        addRequestId: !1,
        onBeforeRequest: null,
        onAfterResponse: null,
        onShouldRetry: null,
        chunkSize: 1 / 0,
        retryDelays: [0, 1e3, 3e3, 5e3],
        parallelUploads: 1,
        storeFingerprintForResuming: !0,
        removeFingerprintOnSuccess: !1,
        uploadLengthDeferred: !1,
        uploadDataDuringCreation: !1,
        urlStorage: null,
        fileReader: null,
        httpStack: null
    };
    var La = Ra;
    Sa.default = La;
    var Ma = {};

    function Na(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    Object.defineProperty(Ma, "__esModule", {
        value: !0
    }), Ma.default = void 0;
    var za = function () {
        function e() {
            ! function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e)
        }
        var t, r;
        return t = e, (r = [{
            key: "listAllUploads",
            value: function () {
                return Promise.resolve([])
            }
        }, {
            key: "findUploadsByFingerprint",
            value: function (e) {
                return Promise.resolve([])
            }
        }, {
            key: "removeUpload",
            value: function (e) {
                return Promise.resolve()
            }
        }, {
            key: "addUpload",
            value: function (e, t) {
                return Promise.resolve(null)
            }
        }]) && Na(t.prototype, r), e
    }();
    Ma.default = za;
    var qa = {};

    function Ha(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    Object.defineProperty(qa, "__esModule", {
        value: !0
    }), qa.WebStorageUrlStorage = qa.canStoreURLs = void 0;
    var Va = !1;
    try {
        Va = "localStorage" in window;
        var Wa = "tusSupport";
        localStorage.setItem(Wa, localStorage.getItem(Wa))
    } catch (Rd) {
        if (Rd.code !== Rd.SECURITY_ERR && Rd.code !== Rd.QUOTA_EXCEEDED_ERR) throw Rd;
        Va = !1
    }
    var Xa = Va;
    qa.canStoreURLs = Xa;
    var Ga = function () {
        function e() {
            ! function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e)
        }
        var t, r;
        return t = e, (r = [{
            key: "findAllUploads",
            value: function () {
                var e = this._findEntries("tus::");
                return Promise.resolve(e)
            }
        }, {
            key: "findUploadsByFingerprint",
            value: function (e) {
                var t = this._findEntries("tus::".concat(e, "::"));
                return Promise.resolve(t)
            }
        }, {
            key: "removeUpload",
            value: function (e) {
                return localStorage.removeItem(e), Promise.resolve()
            }
        }, {
            key: "addUpload",
            value: function (e, t) {
                var r = Math.round(1e12 * Math.random()),
                    n = "tus::".concat(e, "::").concat(r);
                return localStorage.setItem(n, JSON.stringify(t)), Promise.resolve(n)
            }
        }, {
            key: "_findEntries",
            value: function (e) {
                for (var t = [], r = 0; r < localStorage.length; r++) {
                    var n = localStorage.key(r);
                    if (0 === n.indexOf(e)) try {
                        var i = JSON.parse(localStorage.getItem(n));
                        i.urlStorageKey = n, t.push(i)
                    } catch (Rd) { }
                }
                return t
            }
        }]) && Ha(t.prototype, r), e
    }();
    qa.WebStorageUrlStorage = Ga;
    var Ka = {};

    function $a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function Ya(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function Ja(e, t, r) {
        return t && Ya(e.prototype, t), r && Ya(e, r), e
    }
    Object.defineProperty(Ka, "__esModule", {
        value: !0
    }), Ka.default = void 0;
    var Qa = function () {
        function e() {
            $a(this, e)
        }
        return Ja(e, [{
            key: "createRequest",
            value: function (e, t) {
                return new Za(e, t)
            }
        }, {
            key: "getName",
            value: function () {
                return "XHRHttpStack"
            }
        }]), e
    }();
    Ka.default = Qa;
    var Za = function () {
        function e(t, r) {
            $a(this, e), this._xhr = new XMLHttpRequest, this._xhr.open(t, r, !0), this._method = t, this._url = r, this._headers = {}
        }
        return Ja(e, [{
            key: "getMethod",
            value: function () {
                return this._method
            }
        }, {
            key: "getURL",
            value: function () {
                return this._url
            }
        }, {
            key: "setHeader",
            value: function (e, t) {
                this._xhr.setRequestHeader(e, t), this._headers[e] = t
            }
        }, {
            key: "getHeader",
            value: function (e) {
                return this._headers[e]
            }
        }, {
            key: "setProgressHandler",
            value: function (e) {
                "upload" in this._xhr && (this._xhr.upload.onprogress = function (t) {
                    t.lengthComputable && e(t.loaded)
                })
            }
        }, {
            key: "send",
            value: function () {
                var e = this,
                    t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                return new Promise((function (r, n) {
                    e._xhr.onload = function () {
                        r(new eu(e._xhr))
                    }, e._xhr.onerror = function (e) {
                        n(e)
                    }, e._xhr.send(t)
                }))
            }
        }, {
            key: "abort",
            value: function () {
                return this._xhr.abort(), Promise.resolve()
            }
        }, {
            key: "getUnderlyingObject",
            value: function () {
                return this._xhr
            }
        }]), e
    }(),
        eu = function () {
            function e(t) {
                $a(this, e), this._xhr = t
            }
            return Ja(e, [{
                key: "getStatus",
                value: function () {
                    return this._xhr.status
                }
            }, {
                key: "getHeader",
                value: function (e) {
                    return this._xhr.getResponseHeader(e)
                }
            }, {
                key: "getBody",
                value: function () {
                    return this._xhr.responseText
                }
            }, {
                key: "getUnderlyingObject",
                value: function () {
                    return this._xhr
                }
            }]), e
        }(),
        tu = {};
    Object.defineProperty(tu, "__esModule", {
        value: !0
    }), tu.default = void 0;
    tu.default = function () {
        return "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase()
    };
    var ru = {};
    Object.defineProperty(ru, "__esModule", {
        value: !0
    }), ru.default = function (e) {
        return new Promise((function (t, r) {
            var n = new XMLHttpRequest;
            n.responseType = "blob", n.onload = function () {
                var e = n.response;
                t(e)
            }, n.onerror = function (e) {
                r(e)
            }, n.open("GET", e), n.send()
        }))
    };
    var nu = {};
    Object.defineProperty(nu, "__esModule", {
        value: !0
    }), nu.default = void 0;
    nu.default = function () {
        return "undefined" != typeof window && (void 0 !== window.PhoneGap || void 0 !== window.Cordova || void 0 !== window.cordova)
    };
    var iu = {};
    Object.defineProperty(iu, "__esModule", {
        value: !0
    }), iu.default = function (e) {
        return new Promise((function (t, r) {
            var n = new FileReader;
            n.onload = function () {
                var e = new Uint8Array(n.result);
                t({
                    value: e
                })
            }, n.onerror = function (e) {
                r(e)
            }, n.readAsArrayBuffer(e)
        }))
    };
    var ou = {};
    Object.defineProperty(ou, "__esModule", {
        value: !0
    }), ou.default = void 0;
    var su = cu(tu),
        au = cu(ru),
        uu = cu(nu),
        lu = cu(iu);

    function cu(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function pu(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function du(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function hu(e, t, r) {
        return t && du(e.prototype, t), r && du(e, r), e
    }
    var fu = function () {
        function e(t) {
            pu(this, e), this._file = t, this.size = t.size
        }
        return hu(e, [{
            key: "slice",
            value: function (e, t) {
                if ((0, uu.default)()) return (0, lu.default)(this._file.slice(e, t));
                var r = this._file.slice(e, t);
                return Promise.resolve({
                    value: r
                })
            }
        }, {
            key: "close",
            value: function () { }
        }]), e
    }(),
        yu = function () {
            function e(t, r) {
                pu(this, e), this._chunkSize = r, this._buffer = void 0, this._bufferOffset = 0, this._reader = t, this._done = !1
            }
            return hu(e, [{
                key: "slice",
                value: function (e, t) {
                    return e < this._bufferOffset ? Promise.reject(new Error("Requested data is before the reader's current offset")) : this._readUntilEnoughDataOrDone(e, t)
                }
            }, {
                key: "_readUntilEnoughDataOrDone",
                value: function (e, t) {
                    var r = this,
                        n = t <= this._bufferOffset + gu(this._buffer);
                    if (this._done || n) {
                        var i = this._getDataFromBuffer(e, t),
                            o = null == i && this._done;
                        return Promise.resolve({
                            value: i,
                            done: o
                        })
                    }
                    return this._reader.read().then((function (n) {
                        var i = n.value;
                        return n.done ? r._done = !0 : void 0 === r._buffer ? r._buffer = i : r._buffer = function (e, t) {
                            if (e.concat) return e.concat(t);
                            if (e instanceof Blob) return new Blob([e, t], {
                                type: e.type
                            });
                            if (e.set) {
                                var r = new e.constructor(e.length + t.length);
                                return r.set(e), r.set(t, e.length), r
                            }
                            throw new Error("Unknown data type")
                        }(r._buffer, i), r._readUntilEnoughDataOrDone(e, t)
                    }))
                }
            }, {
                key: "_getDataFromBuffer",
                value: function (e, t) {
                    e > this._bufferOffset && (this._buffer = this._buffer.slice(e - this._bufferOffset), this._bufferOffset = e);
                    var r = 0 === gu(this._buffer);
                    return this._done && r ? null : this._buffer.slice(0, t - e)
                }
            }, {
                key: "close",
                value: function () {
                    this._reader.cancel && this._reader.cancel()
                }
            }]), e
        }();

    function gu(e) {
        return void 0 === e ? 0 : void 0 !== e.size ? e.size : e.length
    }
    var vu = function () {
        function e() {
            pu(this, e)
        }
        return hu(e, [{
            key: "openFile",
            value: function (e, t) {
                return (0, su.default)() && e && void 0 !== e.uri ? (0, au.default)(e.uri).then((function (e) {
                    return new fu(e)
                })).catch((function (e) {
                    throw new Error("tus: cannot fetch `file.uri` as Blob, make sure the uri is correct and accessible. " + e)
                })) : "function" == typeof e.slice && void 0 !== e.size ? Promise.resolve(new fu(e)) : "function" == typeof e.read ? (t = +t, isFinite(t) ? Promise.resolve(new yu(e, t)) : Promise.reject(new Error("cannot create source for stream without a finite value for the `chunkSize` option"))) : Promise.reject(new Error("source object may only be an instance of File, Blob, or Reader in this environment"))
            }
        }]), e
    }();
    ou.default = vu;
    var mu = {};
    Object.defineProperty(mu, "__esModule", {
        value: !0
    }), mu.default = function (e, t) {
        return (0, wu.default)() ? Promise.resolve(function (e, t) {
            var r = e.exif ? function (e) {
                var t = 0;
                if (0 === e.length) return t;
                for (var r = 0; r < e.length; r++) {
                    t = (t << 5) - t + e.charCodeAt(r), t &= t
                }
                return t
            }(JSON.stringify(e.exif)) : "noexif";
            return ["tus-rn", e.name || "noname", e.size || "nosize", r, t.endpoint].join("/")
        }(e, t)) : Promise.resolve(["tus-br", e.name, e.type, e.size, e.lastModified, t.endpoint].join("-"))
    };
    var bu, wu = (bu = tu) && bu.__esModule ? bu : {
        default: bu
    },
        _u = {};
    Object.defineProperty(_u, "__esModule", {
        value: !0
    }), Object.defineProperty(_u, "enableDebugLog", {
        enumerable: !0,
        get: function () {
            return ba.enableDebugLog
        }
    }), Object.defineProperty(_u, "canStoreURLs", {
        enumerable: !0,
        get: function () {
            return qa.canStoreURLs
        }
    }), Object.defineProperty(_u, "HttpStack", {
        enumerable: !0,
        get: function () {
            return Pu.default
        }
    }), _u.defaultOptions = _u.Upload = void 0;
    var Su = Au(Sa),
        ku = Au(Ma),
        Pu = Au(Ka),
        Cu = Au(ou),
        Eu = Au(mu);

    function Au(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function Fu(e) {
        return (Fu = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function Ou(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function Uu(e, t) {
        return (Uu = Object.setPrototypeOf || function (e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }

    function Ru(e) {
        return (Ru = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function Tu(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), r.push.apply(r, n)
        }
        return r
    }

    function xu(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? Tu(Object(r), !0).forEach((function (t) {
                Du(e, t, r[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Tu(Object(r)).forEach((function (t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            }))
        }
        return e
    }

    function Du(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }
    var Bu = xu({}, Su.default.defaultOptions, {
        httpStack: new Pu.default,
        fileReader: new Cu.default,
        urlStorage: qa.canStoreURLs ? new qa.WebStorageUrlStorage : new ku.default,
        fingerprint: Eu.default
    });
    _u.defaultOptions = Bu;
    var Iu = function (e) {
        ! function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), t && Uu(e, t)
        }(o, Su.default);
        var t, r, n, i = (n = o, function () {
            var e, t = Ru(n);
            if (function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], (function () { }))), !0
                } catch (Rd) {
                    return !1
                }
            }()) {
                var r = Ru(this).constructor;
                e = Reflect.construct(t, arguments, r)
            } else e = t.apply(this, arguments);
            return function (e, t) {
                return !t || "object" !== Fu(t) && "function" != typeof t ? function (e) {
                    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }(e) : t
            }(this, e)
        });

        function o() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, o), t = xu({}, Bu, {}, t), i.call(this, e, t)
        }
        return t = o, r = [{
            key: "terminate",
            value: function (e, t, r) {
                return t = xu({}, Bu, {}, t), Su.default.terminate(e, t, r)
            }
        }], null && Ou(t.prototype, null), r && Ou(t, r), o
    }();
    _u.Upload = Iu;
    var ju, Lu, Mu = window,
        Nu = Mu.XMLHttpRequest,
        zu = Mu.Blob;
    Nu && zu && zu.prototype.slice;

    function qu() {
        return (qu = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function Hu(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var Vu = Me.Provider,
        Wu = Me.RequestClient,
        Xu = Me.Socket,
        Gu = {
            endpoint: "",
            uploadUrl: null,
            metadata: {},
            uploadSize: null,
            onProgress: null,
            onChunkComplete: null,
            onSuccess: null,
            onError: null,
            overridePatchMethod: !1,
            headers: {},
            addRequestId: !1,
            chunkSize: 1 / 0,
            retryDelays: [0, 1e3, 3e3, 5e3],
            parallelUploads: 1,
            storeFingerprintForResuming: !0,
            removeFingerprintOnSuccess: !1,
            uploadLengthDeferred: !1,
            uploadDataDuringCreation: !1
        },
        Ku = (Lu = ju = function (e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).type = "uploader", n.id = n.opts.id || "Tus", n.title = "Tus", n.opts = qu({}, {
                    autoRetry: !0,
                    resume: !0,
                    useFastRemoteRetry: !0,
                    limit: 0,
                    retryDelays: [0, 1e3, 3e3, 5e3]
                }, r), n.requests = new cs(n.opts.limit), n.uploaders = Object.create(null), n.uploaderEvents = Object.create(null), n.uploaderSockets = Object.create(null), n.handleResetProgress = n.handleResetProgress.bind(Hu(n)), n.handleUpload = n.handleUpload.bind(Hu(n)), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var i = n.prototype;
            return i.handleResetProgress = function () {
                var e = qu({}, this.uppy.getState().files);
                Object.keys(e).forEach((function (t) {
                    if (e[t].tus && e[t].tus.uploadUrl) {
                        var r = qu({}, e[t].tus);
                        delete r.uploadUrl, e[t] = qu({}, e[t], {
                            tus: r
                        })
                    }
                })), this.uppy.setState({
                    files: e
                })
            }, i.resetUploaderReferences = function (e, t) {
                if (void 0 === t && (t = {}), this.uploaders[e]) {
                    var r = this.uploaders[e];
                    r.abort(), t.abort && setTimeout((function () {
                        return r.abort(!0)
                    }), 1e3), this.uploaders[e] = null
                }
                this.uploaderEvents[e] && (this.uploaderEvents[e].remove(), this.uploaderEvents[e] = null), this.uploaderSockets[e] && (this.uploaderSockets[e].close(), this.uploaderSockets[e] = null)
            }, i.upload = function (e, t, r) {
                var n = this;
                return this.resetUploaderReferences(e.id), new Promise((function (t, r) {
                    n.uppy.emit("upload-started", e);
                    var i, o = qu({}, n.opts, e.tus || {}),
                        s = qu({}, Gu, o);
                    delete s.resume, o.resume && (s.storeFingerprintForResuming = !0), s.fingerprint = (i = e, function (e, t) {
                        if ("undefined" != typeof window && (void 0 !== window.PhoneGap || void 0 !== window.Cordova || void 0 !== window.cordova) || "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase()) return _u.defaultOptions.fingerprint(e, t);
                        var r = ["tus", i.id, t.endpoint].join("-");
                        return Promise.resolve(r)
                    }), s.onError = function (t) {
                        n.uppy.log(t);
                        var i = t.originalRequest ? t.originalRequest.getUnderlyingObject() : null;
                        vs(i) && (t = new Te(t, i)), n.resetUploaderReferences(e.id), c.done(), n.uppy.emit("upload-error", e, t), r(t)
                    }, s.onProgress = function (t, r) {
                        n.onReceiveUploadUrl(e, l.url), n.uppy.emit("upload-progress", e, {
                            uploader: n,
                            bytesUploaded: t,
                            bytesTotal: r
                        })
                    }, s.onSuccess = function () {
                        var r = {
                            uploadURL: l.url
                        };
                        n.resetUploaderReferences(e.id), c.done(), n.uppy.emit("upload-success", e, r), l.url && n.uppy.log("Download " + l.file.name + " from " + l.url), t(l)
                    };
                    var a = function (e, t, r) {
                        k(e, t) && !k(e, r) && (e[r] = e[t])
                    },
                        u = {};
                    (Array.isArray(o.metaFields) ? o.metaFields : Object.keys(e.meta)).forEach((function (t) {
                        u[t] = e.meta[t]
                    })), a(u, "type", "filetype"), a(u, "name", "filename"), s.metadata = u;
                    var l = new _u.Upload(e.data, s);
                    n.uploaders[e.id] = l, n.uploaderEvents[e.id] = new ys(n.uppy), o.resume && l.findPreviousUploads().then((function (t) {
                        var r = t[0];
                        r && (n.uppy.log("[Tus] Resuming upload of " + e.id + " started at " + r.creationTime), l.resumeFromPreviousUpload(r))
                    }));
                    var c = n.requests.run((function () {
                        return e.isPaused || Promise.resolve().then((function () {
                            l.start()
                        })),
                            function () { }
                    }));
                    n.onFileRemove(e.id, (function (r) {
                        c.abort(), n.resetUploaderReferences(e.id, {
                            abort: !!l.url
                        }), t("upload " + r + " was removed")
                    })), n.onPause(e.id, (function (e) {
                        e ? (c.abort(), l.abort()) : (c.abort(), c = n.requests.run((function () {
                            return l.start(),
                                function () { }
                        })))
                    })), n.onPauseAll(e.id, (function () {
                        c.abort(), l.abort()
                    })), n.onCancelAll(e.id, (function () {
                        c.abort(), n.resetUploaderReferences(e.id, {
                            abort: !!l.url
                        }), t("upload " + e.id + " was canceled")
                    })), n.onResumeAll(e.id, (function () {
                        c.abort(), e.error && l.abort(), c = n.requests.run((function () {
                            return l.start(),
                                function () { }
                        }))
                    }))
                })).catch((function (t) {
                    throw n.uppy.emit("upload-error", e, t), t
                }))
            }, i.uploadRemote = function (e, t, r) {
                var n = this;
                this.resetUploaderReferences(e.id);
                var i = qu({}, this.opts);
                return e.tus && qu(i, e.tus), this.uppy.emit("upload-started", e), this.uppy.log(e.remote.url), e.serverToken ? this.connectToServerSocket(e) : new Promise((function (t, r) {
                    new (e.remote.providerOptions.provider ? Vu : Wu)(n.uppy, e.remote.providerOptions).post(e.remote.url, qu({}, e.remote.body, {
                        endpoint: i.endpoint,
                        uploadUrl: i.uploadUrl,
                        protocol: "tus",
                        size: e.data.size,
                        headers: i.headers,
                        metadata: e.meta
                    })).then((function (t) {
                        return n.uppy.setFileState(e.id, {
                            serverToken: t.token
                        }), e = n.uppy.getFile(e.id), n.connectToServerSocket(e)
                    })).then((function () {
                        t()
                    })).catch((function (t) {
                        n.uppy.emit("upload-error", e, t), r(t)
                    }))
                }))
            }, i.connectToServerSocket = function (e) {
                var t = this;
                return new Promise((function (r, n) {
                    var i = e.serverToken,
                        o = fs(e.remote.companionUrl),
                        s = new Xu({
                            target: o + "/api/" + i,
                            autoOpen: !1
                        });
                    t.uploaderSockets[e.id] = s, t.uploaderEvents[e.id] = new ys(t.uppy), t.onFileRemove(e.id, (function () {
                        a.abort(), s.send("pause", {}), s.send("cancel", {}), t.resetUploaderReferences(e.id), r("upload " + e.id + " was removed")
                    })), t.onPause(e.id, (function (e) {
                        e ? (a.abort(), s.send("pause", {})) : (a.abort(), a = t.requests.run((function () {
                            return s.send("resume", {}),
                                function () { }
                        })))
                    })), t.onPauseAll(e.id, (function () {
                        a.abort(), s.send("pause", {})
                    })), t.onCancelAll(e.id, (function () {
                        a.abort(), s.send("pause", {}), s.send("cancel", {}), t.resetUploaderReferences(e.id), r("upload " + e.id + " was canceled")
                    })), t.onResumeAll(e.id, (function () {
                        a.abort(), e.error && s.send("pause", {}), a = t.requests.run((function () {
                            return s.send("resume", {}),
                                function () { }
                        }))
                    })), t.onRetry(e.id, (function () {
                        s.isOpen && (s.send("pause", {}), s.send("resume", {}))
                    })), t.onRetryAll(e.id, (function () {
                        s.isOpen && (s.send("pause", {}), s.send("resume", {}))
                    })), s.on("progress", (function (r) {
                        return hs(t, r, e)
                    })), s.on("error", (function (r) {
                        var i = r.error.message,
                            o = qu(new Error(i), {
                                cause: r.error
                            });
                        t.opts.useFastRemoteRetry ? s.close() : (t.resetUploaderReferences(e.id), t.uppy.setFileState(e.id, {
                            serverToken: null
                        })), t.uppy.emit("upload-error", e, o), a.done(), n(o)
                    })), s.on("success", (function (n) {
                        var i = {
                            uploadURL: n.url
                        };
                        t.uppy.emit("upload-success", e, i), t.resetUploaderReferences(e.id), a.done(), r()
                    }));
                    var a = t.requests.run((function () {
                        return s.open(), e.isPaused && s.send("pause", {}),
                            function () { }
                    }))
                }))
            }, i.onReceiveUploadUrl = function (e, t) {
                var r = this.uppy.getFile(e.id);
                r && (r.tus && r.tus.uploadUrl === t || (this.uppy.log("[Tus] Storing upload url"), this.uppy.setFileState(r.id, {
                    tus: qu({}, r.tus, {
                        uploadUrl: t
                    })
                })))
            }, i.onFileRemove = function (e, t) {
                this.uploaderEvents[e].on("file-removed", (function (r) {
                    e === r.id && t(r.id)
                }))
            }, i.onPause = function (e, t) {
                this.uploaderEvents[e].on("upload-pause", (function (r, n) {
                    e === r && t(n)
                }))
            }, i.onRetry = function (e, t) {
                this.uploaderEvents[e].on("upload-retry", (function (r) {
                    e === r && t()
                }))
            }, i.onRetryAll = function (e, t) {
                var r = this;
                this.uploaderEvents[e].on("retry-all", (function (n) {
                    r.uppy.getFile(e) && t()
                }))
            }, i.onPauseAll = function (e, t) {
                var r = this;
                this.uploaderEvents[e].on("pause-all", (function () {
                    r.uppy.getFile(e) && t()
                }))
            }, i.onCancelAll = function (e, t) {
                var r = this;
                this.uploaderEvents[e].on("cancel-all", (function () {
                    r.uppy.getFile(e) && t()
                }))
            }, i.onResumeAll = function (e, t) {
                var r = this;
                this.uploaderEvents[e].on("resume-all", (function () {
                    r.uppy.getFile(e) && t()
                }))
            }, i.uploadFiles = function (e) {
                var t = this,
                    r = e.map((function (r, n) {
                        var i = n + 1,
                            o = e.length;
                        return "error" in r && r.error ? Promise.reject(new Error(r.error)) : r.isRemote ? t.uploadRemote(r, i, o) : t.upload(r, i, o)
                    }));
                return ps(r)
            }, i.handleUpload = function (e) {
                var t = this;
                if (0 === e.length) return this.uppy.log("[Tus] No files to upload"), Promise.resolve();
                0 === this.opts.limit && this.uppy.log("[Tus] When uploading multiple files at once, consider setting the `limit` option (to `10` for example), to limit the number of concurrent uploads, which helps prevent memory and network issues: https://uppy.io/docs/tus/#limit-0", "warning"), this.uppy.log("[Tus] Uploading...");
                var r = e.map((function (e) {
                    return t.uppy.getFile(e)
                }));
                return this.uploadFiles(r).then((function () {
                    return null
                }))
            }, i.install = function () {
                this.uppy.setState({
                    capabilities: qu({}, this.uppy.getState().capabilities, {
                        resumableUploads: !0
                    })
                }), this.uppy.addUploader(this.handleUpload), this.uppy.on("reset-progress", this.handleResetProgress), this.opts.autoRetry && this.uppy.on("back-online", this.uppy.retryAll)
            }, i.uninstall = function () {
                this.uppy.setState({
                    capabilities: qu({}, this.uppy.getState().capabilities, {
                        resumableUploads: !1
                    })
                }), this.uppy.removeUploader(this.handleUpload), this.opts.autoRetry && this.uppy.off("back-online", this.uppy.retryAll)
            }, n
        }(le.Plugin), ju.VERSION = "1.7.6", Lu),
        $u = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
        Yu = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
        Ju = function (e) {
            var t = e,
                r = e.indexOf("["),
                n = e.indexOf("]"); - 1 != r && -1 != n && (e = e.substring(0, r) + e.substring(r, n).replace(/:/g, ";") + e.substring(n, e.length));
            for (var i = $u.exec(e || ""), o = {}, s = 14; s--;) o[Yu[s]] = i[s] || "";
            return -1 != r && -1 != n && (o.source = t, o.host = o.host.substring(1, o.host.length - 1).replace(/;/g, ":"), o.authority = o.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), o.ipv6uri = !0), o
        },
        Qu = 1e3,
        Zu = 6e4,
        el = 864e5;

    function tl(e, t, r) {
        if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + r : Math.ceil(e / t) + " " + r + "s"
    }
    var rl = {};

    function nl(e) {
        var t;

        function r() {
            if (r.enabled) {
                var e = r,
                    n = +new Date,
                    i = n - (t || n);
                e.diff = i, e.prev = t, e.curr = n, t = n;
                for (var o = new Array(arguments.length), s = 0; s < o.length; s++) o[s] = arguments[s];
                o[0] = rl.coerce(o[0]), "string" != typeof o[0] && o.unshift("%O");
                var a = 0;
                o[0] = o[0].replace(/%([a-zA-Z%])/g, (function (t, r) {
                    if ("%%" === t) return t;
                    a++;
                    var n = rl.formatters[r];
                    if ("function" == typeof n) {
                        var i = o[a];
                        t = n.call(e, i), o.splice(a, 1), a--
                    }
                    return t
                })), rl.formatArgs.call(e, o), (r.log || rl.log || console.log.bind(console)).apply(e, o)
            }
        }
        return r.namespace = e, r.enabled = rl.enabled(e), r.useColors = rl.useColors(), r.color = function (e) {
            var t, r = 0;
            for (t in e) r = (r << 5) - r + e.charCodeAt(t), r |= 0;
            return rl.colors[Math.abs(r) % rl.colors.length]
        }(e), r.destroy = il, "function" == typeof rl.init && rl.init(r), rl.instances.push(r), r
    }

    function il() {
        var e = rl.instances.indexOf(this);
        return -1 !== e && (rl.instances.splice(e, 1), !0)
    } (rl = rl = nl.debug = nl.default = nl).coerce = function (e) {
        return e instanceof Error ? e.stack || e.message : e
    }, rl.disable = function () {
        rl.enable("")
    }, rl.enable = function (e) {
        var t;
        rl.save(e), rl.names = [], rl.skips = [];
        var r = ("string" == typeof e ? e : "").split(/[\s,]+/),
            n = r.length;
        for (t = 0; t < n; t++) r[t] && ("-" === (e = r[t].replace(/\*/g, ".*?"))[0] ? rl.skips.push(new RegExp("^" + e.substr(1) + "$")) : rl.names.push(new RegExp("^" + e + "$")));
        for (t = 0; t < rl.instances.length; t++) {
            var i = rl.instances[t];
            i.enabled = rl.enabled(i.namespace)
        }
    }, rl.enabled = function (e) {
        if ("*" === e[e.length - 1]) return !0;
        var t, r;
        for (t = 0, r = rl.skips.length; t < r; t++)
            if (rl.skips[t].test(e)) return !1;
        for (t = 0, r = rl.names.length; t < r; t++)
            if (rl.names[t].test(e)) return !0;
        return !1
    }, rl.humanize = function (e, t) {
        t = t || {};
        var r, n = typeof e;
        if ("string" === n && e.length > 0) return function (e) {
            if (!((e = String(e)).length > 100)) {
                var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
                if (t) {
                    var r = parseFloat(t[1]);
                    switch ((t[2] || "ms").toLowerCase()) {
                        case "years":
                        case "year":
                        case "yrs":
                        case "yr":
                        case "y":
                            return 315576e5 * r;
                        case "days":
                        case "day":
                        case "d":
                            return r * el;
                        case "hours":
                        case "hour":
                        case "hrs":
                        case "hr":
                        case "h":
                            return 36e5 * r;
                        case "minutes":
                        case "minute":
                        case "mins":
                        case "min":
                        case "m":
                            return r * Zu;
                        case "seconds":
                        case "second":
                        case "secs":
                        case "sec":
                        case "s":
                            return r * Qu;
                        case "milliseconds":
                        case "millisecond":
                        case "msecs":
                        case "msec":
                        case "ms":
                            return r;
                        default:
                            return
                    }
                }
            }
        }(e);
        if ("number" === n && !1 === isNaN(e)) return t.long ? tl(r = e, el, "day") || tl(r, 36e5, "hour") || tl(r, Zu, "minute") || tl(r, Qu, "second") || r + " ms" : function (e) {
            return e >= el ? Math.round(e / el) + "d" : e >= 36e5 ? Math.round(e / 36e5) + "h" : e >= Zu ? Math.round(e / Zu) + "m" : e >= Qu ? Math.round(e / Qu) + "s" : e + "ms"
        }(e);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
    }, rl.instances = [], rl.names = [], rl.skips = [], rl.formatters = {};
    var ol = {};
    (function (e) {
        function t() {
            var t;
            try {
                t = ol.storage.debug
            } catch (Rd) { }
            return !t && void 0 !== e && "env" in e && (t = e.env.DEBUG), t
        } (ol = ol = rl).log = function () {
            return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
        }, ol.formatArgs = function (e) {
            var t = this.useColors;
            if (e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + ol.humanize(this.diff), t) {
                var r = "color: " + this.color;
                e.splice(1, 0, r, "color: inherit");
                var n = 0,
                    i = 0;
                e[0].replace(/%[a-zA-Z%]/g, (function (e) {
                    "%%" !== e && (n++, "%c" === e && (i = n))
                })), e.splice(i, 0, r)
            }
        }, ol.save = function (e) {
            try {
                null == e ? ol.storage.removeItem("debug") : ol.storage.debug = e
            } catch (Rd) { }
        }, ol.load = t, ol.useColors = function () {
            return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
        }, ol.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function () {
            try {
                return window.localStorage
            } catch (Rd) { }
        }(), ol.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], ol.formatters.j = function (e) {
            try {
                return JSON.stringify(e)
            } catch (yc) {
                return "[UnexpectedJSONParseError]: " + yc.message
            }
        }, ol.enable(t())
    }).call(this, e);
    var sl = ol("socket.io-client:url"),
        al = function (e, t) {
            var r = e;
            t = t || "undefined" != typeof location && location, null == e && (e = t.protocol + "//" + t.host), "string" == typeof e && ("/" === e.charAt(0) && (e = "/" === e.charAt(1) ? t.protocol + e : t.host + e), /^(https?|wss?):\/\//.test(e) || (sl("protocol-less url %s", e), e = void 0 !== t ? t.protocol + "//" + e : "https://" + e), sl("parse %s", e), r = Ju(e)), r.port || (/^(http|ws)$/.test(r.protocol) ? r.port = "80" : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")), r.path = r.path || "/";
            var n = -1 !== r.host.indexOf(":") ? "[" + r.host + "]" : r.host;
            return r.id = r.protocol + "://" + n + ":" + r.port, r.href = r.protocol + "://" + n + (t && t.port === r.port ? "" : ":" + r.port), r
        };

    function ul(e, t, r) {
        if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + r : Math.ceil(e / t) + " " + r + "s"
    }
    var ll = {};

    function cl(e) {
        var t;

        function r() {
            if (r.enabled) {
                var e = r,
                    n = +new Date,
                    i = n - (t || n);
                e.diff = i, e.prev = t, e.curr = n, t = n;
                for (var o = new Array(arguments.length), s = 0; s < o.length; s++) o[s] = arguments[s];
                o[0] = ll.coerce(o[0]), "string" != typeof o[0] && o.unshift("%O");
                var a = 0;
                o[0] = o[0].replace(/%([a-zA-Z%])/g, (function (t, r) {
                    if ("%%" === t) return t;
                    a++;
                    var n = ll.formatters[r];
                    if ("function" == typeof n) {
                        var i = o[a];
                        t = n.call(e, i), o.splice(a, 1), a--
                    }
                    return t
                })), ll.formatArgs.call(e, o), (r.log || ll.log || console.log.bind(console)).apply(e, o)
            }
        }
        return r.namespace = e, r.enabled = ll.enabled(e), r.useColors = ll.useColors(), r.color = function (e) {
            var t, r = 0;
            for (t in e) r = (r << 5) - r + e.charCodeAt(t), r |= 0;
            return ll.colors[Math.abs(r) % ll.colors.length]
        }(e), r.destroy = pl, "function" == typeof ll.init && ll.init(r), ll.instances.push(r), r
    }

    function pl() {
        var e = ll.instances.indexOf(this);
        return -1 !== e && (ll.instances.splice(e, 1), !0)
    } (ll = ll = cl.debug = cl.default = cl).coerce = function (e) {
        return e instanceof Error ? e.stack || e.message : e
    }, ll.disable = function () {
        ll.enable("")
    }, ll.enable = function (e) {
        var t;
        ll.save(e), ll.names = [], ll.skips = [];
        var r = ("string" == typeof e ? e : "").split(/[\s,]+/),
            n = r.length;
        for (t = 0; t < n; t++) r[t] && ("-" === (e = r[t].replace(/\*/g, ".*?"))[0] ? ll.skips.push(new RegExp("^" + e.substr(1) + "$")) : ll.names.push(new RegExp("^" + e + "$")));
        for (t = 0; t < ll.instances.length; t++) {
            var i = ll.instances[t];
            i.enabled = ll.enabled(i.namespace)
        }
    }, ll.enabled = function (e) {
        if ("*" === e[e.length - 1]) return !0;
        var t, r;
        for (t = 0, r = ll.skips.length; t < r; t++)
            if (ll.skips[t].test(e)) return !1;
        for (t = 0, r = ll.names.length; t < r; t++)
            if (ll.names[t].test(e)) return !0;
        return !1
    }, ll.humanize = function (e, t) {
        t = t || {};
        var r, n = typeof e;
        if ("string" === n && e.length > 0) return function (e) {
            if (!((e = String(e)).length > 100)) {
                var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
                if (t) {
                    var r = parseFloat(t[1]);
                    switch ((t[2] || "ms").toLowerCase()) {
                        case "years":
                        case "year":
                        case "yrs":
                        case "yr":
                        case "y":
                            return 315576e5 * r;
                        case "days":
                        case "day":
                        case "d":
                            return 864e5 * r;
                        case "hours":
                        case "hour":
                        case "hrs":
                        case "hr":
                        case "h":
                            return 36e5 * r;
                        case "minutes":
                        case "minute":
                        case "mins":
                        case "min":
                        case "m":
                            return 6e4 * r;
                        case "seconds":
                        case "second":
                        case "secs":
                        case "sec":
                        case "s":
                            return 1e3 * r;
                        case "milliseconds":
                        case "millisecond":
                        case "msecs":
                        case "msec":
                        case "ms":
                            return r;
                        default:
                            return
                    }
                }
            }
        }(e);
        if ("number" === n && !1 === isNaN(e)) return t.long ? ul(r = e, 864e5, "day") || ul(r, 36e5, "hour") || ul(r, 6e4, "minute") || ul(r, 1e3, "second") || r + " ms" : function (e) {
            return e >= 864e5 ? Math.round(e / 864e5) + "d" : e >= 36e5 ? Math.round(e / 36e5) + "h" : e >= 6e4 ? Math.round(e / 6e4) + "m" : e >= 1e3 ? Math.round(e / 1e3) + "s" : e + "ms"
        }(e);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
    }, ll.instances = [], ll.names = [], ll.skips = [], ll.formatters = {};
    var dl = {};
    (function (e) {
        function t() {
            var t;
            try {
                t = dl.storage.debug
            } catch (Rd) { }
            return !t && void 0 !== e && "env" in e && (t = e.env.DEBUG), t
        } (dl = dl = ll).log = function () {
            return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
        }, dl.formatArgs = function (e) {
            var t = this.useColors;
            if (e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + dl.humanize(this.diff), t) {
                var r = "color: " + this.color;
                e.splice(1, 0, r, "color: inherit");
                var n = 0,
                    i = 0;
                e[0].replace(/%[a-zA-Z%]/g, (function (e) {
                    "%%" !== e && (n++, "%c" === e && (i = n))
                })), e.splice(i, 0, r)
            }
        }, dl.save = function (e) {
            try {
                null == e ? dl.storage.removeItem("debug") : dl.storage.debug = e
            } catch (Rd) { }
        }, dl.load = t, dl.useColors = function () {
            return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
        }, dl.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function () {
            try {
                return window.localStorage
            } catch (Rd) { }
        }(), dl.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], dl.formatters.j = function (e) {
            try {
                return JSON.stringify(e)
            } catch (yc) {
                return "[UnexpectedJSONParseError]: " + yc.message
            }
        }, dl.enable(t())
    }).call(this, e);
    var hl = {
        exports: {}
    };

    function fl(e) {
        if (e) return function (e) {
            for (var t in fl.prototype) e[t] = fl.prototype[t];
            return e
        }(e)
    }
    hl.exports = fl, fl.prototype.on = fl.prototype.addEventListener = function (e, t) {
        return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this
    }, fl.prototype.once = function (e, t) {
        function r() {
            this.off(e, r), t.apply(this, arguments)
        }
        return r.fn = t, this.on(e, r), this
    }, fl.prototype.off = fl.prototype.removeListener = fl.prototype.removeAllListeners = fl.prototype.removeEventListener = function (e, t) {
        if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
        var r, n = this._callbacks["$" + e];
        if (!n) return this;
        if (1 == arguments.length) return delete this._callbacks["$" + e], this;
        for (var i = 0; i < n.length; i++)
            if ((r = n[i]) === t || r.fn === t) {
                n.splice(i, 1);
                break
            } return this
    }, fl.prototype.emit = function (e) {
        this._callbacks = this._callbacks || {};
        var t = [].slice.call(arguments, 1),
            r = this._callbacks["$" + e];
        if (r)
            for (var n = 0, i = (r = r.slice(0)).length; n < i; ++n) r[n].apply(this, t);
        return this
    }, fl.prototype.listeners = function (e) {
        return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || []
    }, fl.prototype.hasListeners = function (e) {
        return !!this.listeners(e).length
    }, hl = hl.exports;
    var yl = {}.toString,
        gl = Array.isArray || function (e) {
            return "[object Array]" == yl.call(e)
        },
        vl = {};
    (function (e) {
        vl = function (i) {
            return t && e.isBuffer(i) || r && (i instanceof ArrayBuffer || n(i))
        };
        var t = "function" == typeof e && "function" == typeof e.isBuffer,
            r = "function" == typeof ArrayBuffer,
            n = function (e) {
                return "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(e) : e.buffer instanceof ArrayBuffer
            }
    }).call(this, s({}).Buffer);
    var ml = {},
        bl = Object.prototype.toString,
        wl = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === bl.call(Blob),
        _l = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === bl.call(File);
    ml.deconstructPacket = function (e) {
        var t = [],
            r = e.data,
            n = e;
        return n.data = function e(t, r) {
            if (!t) return t;
            if (vl(t)) {
                var n = {
                    _placeholder: !0,
                    num: r.length
                };
                return r.push(t), n
            }
            if (gl(t)) {
                for (var i = new Array(t.length), o = 0; o < t.length; o++) i[o] = e(t[o], r);
                return i
            }
            if ("object" == typeof t && !(t instanceof Date)) {
                i = {};
                for (var s in t) i[s] = e(t[s], r);
                return i
            }
            return t
        }(r, t), n.attachments = t.length, {
            packet: n,
            buffers: t
        }
    }, ml.reconstructPacket = function (e, t) {
        return e.data = function e(t, r) {
            if (!t) return t;
            if (t && t._placeholder) return r[t.num];
            if (gl(t))
                for (var n = 0; n < t.length; n++) t[n] = e(t[n], r);
            else if ("object" == typeof t)
                for (var i in t) t[i] = e(t[i], r);
            return t
        }(e.data, t), e.attachments = void 0, e
    }, ml.removeBlobs = function (e, t) {
        var r = 0,
            n = e;
        ! function e(i, o, s) {
            if (!i) return i;
            if (wl && i instanceof Blob || _l && i instanceof File) {
                r++;
                var a = new FileReader;
                a.onload = function () {
                    s ? s[o] = this.result : n = this.result, --r || t(n)
                }, a.readAsArrayBuffer(i)
            } else if (gl(i))
                for (var u = 0; u < i.length; u++) e(i[u], u, i);
            else if ("object" == typeof i && !vl(i))
                for (var l in i) e(i[l], l, i)
        }(n), r || t(n)
    };
    var Sl = {},
        kl = dl("socket.io-parser");

    function Pl() { }
    Sl.protocol = 4, Sl.types = ["CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK"], Sl.CONNECT = 0, Sl.DISCONNECT = 1, Sl.EVENT = 2, Sl.ACK = 3, Sl.ERROR = 4, Sl.BINARY_EVENT = 5, Sl.BINARY_ACK = 6, Sl.Encoder = Pl, Sl.Decoder = Al;
    var Cl = Sl.ERROR + '"encode error"';

    function El(e) {
        var t = "" + e.type;
        if (Sl.BINARY_EVENT !== e.type && Sl.BINARY_ACK !== e.type || (t += e.attachments + "-"), e.nsp && "/" !== e.nsp && (t += e.nsp + ","), null != e.id && (t += e.id), null != e.data) {
            var r = function (e) {
                try {
                    return JSON.stringify(e)
                } catch (Rd) {
                    return !1
                }
            }(e.data);
            if (!1 === r) return Cl;
            t += r
        }
        return kl("encoded %j as %s", e, t), t
    }

    function Al() {
        this.reconstructor = null
    }

    function Fl(e) {
        this.reconPack = e, this.buffers = []
    }

    function Ol(e) {
        return {
            type: Sl.ERROR,
            data: "parser error: " + e
        }
    }
    Pl.prototype.encode = function (e, t) {
        kl("encoding packet %j", e), Sl.BINARY_EVENT === e.type || Sl.BINARY_ACK === e.type ? function (e, t) {
            ml.removeBlobs(e, (function (e) {
                var r = ml.deconstructPacket(e),
                    n = El(r.packet),
                    i = r.buffers;
                i.unshift(n), t(i)
            }))
        }(e, t) : t([El(e)])
    }, hl(Al.prototype), Al.prototype.add = function (e) {
        var t;
        if ("string" == typeof e) t = function (e) {
            var t = 0,
                r = {
                    type: Number(e.charAt(0))
                };
            if (null == Sl.types[r.type]) return Ol("unknown packet type " + r.type);
            if (Sl.BINARY_EVENT === r.type || Sl.BINARY_ACK === r.type) {
                for (var n = "";
                    "-" !== e.charAt(++t) && (n += e.charAt(t), t != e.length););
                if (n != Number(n) || "-" !== e.charAt(t)) throw new Error("Illegal attachments");
                r.attachments = Number(n)
            }
            if ("/" === e.charAt(t + 1))
                for (r.nsp = ""; ++t;) {
                    if ("," === (o = e.charAt(t))) break;
                    if (r.nsp += o, t === e.length) break
                } else r.nsp = "/";
            var i = e.charAt(t + 1);
            if ("" !== i && Number(i) == i) {
                for (r.id = ""; ++t;) {
                    var o;
                    if (null == (o = e.charAt(t)) || Number(o) != o) {
                        --t;
                        break
                    }
                    if (r.id += e.charAt(t), t === e.length) break
                }
                r.id = Number(r.id)
            }
            if (e.charAt(++t)) {
                var s = function (e) {
                    try {
                        return JSON.parse(e)
                    } catch (Rd) {
                        return !1
                    }
                }(e.substr(t));
                if (!(!1 !== s && (r.type === Sl.ERROR || gl(s)))) return Ol("invalid payload");
                r.data = s
            }
            return kl("decoded %s as %j", e, r), r
        }(e), Sl.BINARY_EVENT === t.type || Sl.BINARY_ACK === t.type ? (this.reconstructor = new Fl(t), 0 === this.reconstructor.reconPack.attachments && this.emit("decoded", t)) : this.emit("decoded", t);
        else {
            if (!vl(e) && !e.base64) throw new Error("Unknown type: " + e);
            if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
            (t = this.reconstructor.takeBinaryData(e)) && (this.reconstructor = null, this.emit("decoded", t))
        }
    }, Al.prototype.destroy = function () {
        this.reconstructor && this.reconstructor.finishedReconstruction()
    }, Fl.prototype.takeBinaryData = function (e) {
        if (this.buffers.push(e), this.buffers.length === this.reconPack.attachments) {
            var t = ml.reconstructPacket(this.reconPack, this.buffers);
            return this.finishedReconstruction(), t
        }
        return null
    }, Fl.prototype.finishedReconstruction = function () {
        this.reconPack = null, this.buffers = []
    };
    var Ul = {
        exports: {}
    };

    function Rl(e) {
        if (e) return function (e) {
            for (var t in Rl.prototype) e[t] = Rl.prototype[t];
            return e
        }(e)
    }
    Ul.exports = Rl, Rl.prototype.on = Rl.prototype.addEventListener = function (e, t) {
        return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this
    }, Rl.prototype.once = function (e, t) {
        function r() {
            this.off(e, r), t.apply(this, arguments)
        }
        return r.fn = t, this.on(e, r), this
    }, Rl.prototype.off = Rl.prototype.removeListener = Rl.prototype.removeAllListeners = Rl.prototype.removeEventListener = function (e, t) {
        if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
        var r, n = this._callbacks["$" + e];
        if (!n) return this;
        if (1 == arguments.length) return delete this._callbacks["$" + e], this;
        for (var i = 0; i < n.length; i++)
            if ((r = n[i]) === t || r.fn === t) {
                n.splice(i, 1);
                break
            } return this
    }, Rl.prototype.emit = function (e) {
        this._callbacks = this._callbacks || {};
        var t = [].slice.call(arguments, 1),
            r = this._callbacks["$" + e];
        if (r)
            for (var n = 0, i = (r = r.slice(0)).length; n < i; ++n) r[n].apply(this, t);
        return this
    }, Rl.prototype.listeners = function (e) {
        return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || []
    }, Rl.prototype.hasListeners = function (e) {
        return !!this.listeners(e).length
    }, Ul = Ul.exports;
    var Tl = [].indexOf,
        xl = function (e, t) {
            if (Tl) return e.indexOf(t);
            for (var r = 0; r < e.length; ++r)
                if (e[r] === t) return r;
            return -1
        },
        Dl = {
            encode: function (e) {
                var t = "";
                for (var r in e) e.hasOwnProperty(r) && (t.length && (t += "&"), t += encodeURIComponent(r) + "=" + encodeURIComponent(e[r]));
                return t
            },
            decode: function (e) {
                for (var t = {}, r = e.split("&"), n = 0, i = r.length; n < i; n++) {
                    var o = r[n].split("=");
                    t[decodeURIComponent(o[0])] = decodeURIComponent(o[1])
                }
                return t
            }
        },
        Bl = Object.keys || function (e) {
            var t = [],
                r = Object.prototype.hasOwnProperty;
            for (var n in e) r.call(e, n) && t.push(n);
            return t
        },
        Il = {}.toString,
        jl = Array.isArray || function (e) {
            return "[object Array]" == Il.call(e)
        },
        Ll = {};
    (function (e) {
        var t = Object.prototype.toString,
            r = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === t.call(Blob),
            n = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === t.call(File);
        Ll = function t(i) {
            if (!i || "object" != typeof i) return !1;
            if (jl(i)) {
                for (var o = 0, s = i.length; o < s; o++)
                    if (t(i[o])) return !0;
                return !1
            }
            if ("function" == typeof e && e.isBuffer && e.isBuffer(i) || "function" == typeof ArrayBuffer && i instanceof ArrayBuffer || r && i instanceof Blob || n && i instanceof File) return !0;
            if (i.toJSON && "function" == typeof i.toJSON && 1 === arguments.length) return t(i.toJSON(), !0);
            for (var a in i)
                if (Object.prototype.hasOwnProperty.call(i, a) && t(i[a])) return !0;
            return !1
        }
    }).call(this, s({}).Buffer);
    var Ml = function (e, t, r) {
        var n = e.byteLength;
        if (t = t || 0, r = r || n, e.slice) return e.slice(t, r);
        if (t < 0 && (t += n), r < 0 && (r += n), r > n && (r = n), t >= n || t >= r || 0 === n) return new ArrayBuffer(0);
        for (var i = new Uint8Array(e), o = new Uint8Array(r - t), s = t, a = 0; s < r; s++, a++) o[a] = i[s];
        return o.buffer
    };

    function Nl() { }
    var zl, ql, Hl, Vl = String.fromCharCode;

    function Wl(e) {
        for (var t, r, n = [], i = 0, o = e.length; i < o;)(t = e.charCodeAt(i++)) >= 55296 && t <= 56319 && i < o ? 56320 == (64512 & (r = e.charCodeAt(i++))) ? n.push(((1023 & t) << 10) + (1023 & r) + 65536) : (n.push(t), i--) : n.push(t);
        return n
    }

    function Xl(e, t) {
        if (e >= 55296 && e <= 57343) {
            if (t) throw Error("Lone surrogate U+" + e.toString(16).toUpperCase() + " is not a scalar value");
            return !1
        }
        return !0
    }

    function Gl(e, t) {
        return Vl(e >> t & 63 | 128)
    }

    function Kl(e, t) {
        if (0 == (4294967168 & e)) return Vl(e);
        var r = "";
        return 0 == (4294965248 & e) ? r = Vl(e >> 6 & 31 | 192) : 0 == (4294901760 & e) ? (Xl(e, t) || (e = 65533), r = Vl(e >> 12 & 15 | 224), r += Gl(e, 6)) : 0 == (4292870144 & e) && (r = Vl(e >> 18 & 7 | 240), r += Gl(e, 12), r += Gl(e, 6)), r + Vl(63 & e | 128)
    }

    function $l() {
        if (Hl >= ql) throw Error("Invalid byte index");
        var e = 255 & zl[Hl];
        if (Hl++, 128 == (192 & e)) return 63 & e;
        throw Error("Invalid continuation byte")
    }

    function Yl(e) {
        var t, r;
        if (Hl > ql) throw Error("Invalid byte index");
        if (Hl == ql) return !1;
        if (t = 255 & zl[Hl], Hl++, 0 == (128 & t)) return t;
        if (192 == (224 & t)) {
            if ((r = (31 & t) << 6 | $l()) >= 128) return r;
            throw Error("Invalid continuation byte")
        }
        if (224 == (240 & t)) {
            if ((r = (15 & t) << 12 | $l() << 6 | $l()) >= 2048) return Xl(r, e) ? r : 65533;
            throw Error("Invalid continuation byte")
        }
        if (240 == (248 & t) && (r = (7 & t) << 18 | $l() << 12 | $l() << 6 | $l()) >= 65536 && r <= 1114111) return r;
        throw Error("Invalid UTF-8 detected")
    }
    var Jl = function (e, t) {
        for (var r = !1 !== (t = t || {}).strict, n = Wl(e), i = n.length, o = -1, s = ""; ++o < i;) s += Kl(n[o], r);
        return s
    },
        Ql = function (e, t) {
            var r = !1 !== (t = t || {}).strict;
            zl = Wl(e), ql = zl.length, Hl = 0;
            for (var n, i = []; !1 !== (n = Yl(r));) i.push(n);
            return function (e) {
                for (var t, r = e.length, n = -1, i = ""; ++n < r;)(t = e[n]) > 65535 && (i += Vl((t -= 65536) >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), i += Vl(t);
                return i
            }(i)
        },
        Zl = {};
    ! function () {
        "use strict";
        for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", t = new Uint8Array(256), r = 0; r < e.length; r++) t[e.charCodeAt(r)] = r;
        Zl.encode = function (t) {
            var r, n = new Uint8Array(t),
                i = n.length,
                o = "";
            for (r = 0; r < i; r += 3) o += e[n[r] >> 2], o += e[(3 & n[r]) << 4 | n[r + 1] >> 4], o += e[(15 & n[r + 1]) << 2 | n[r + 2] >> 6], o += e[63 & n[r + 2]];
            return i % 3 == 2 ? o = o.substring(0, o.length - 1) + "=" : i % 3 == 1 && (o = o.substring(0, o.length - 2) + "=="), o
        }, Zl.decode = function (e) {
            var r, n, i, o, s, a = .75 * e.length,
                u = e.length,
                l = 0;
            "=" === e[e.length - 1] && (a--, "=" === e[e.length - 2] && a--);
            var c = new ArrayBuffer(a),
                p = new Uint8Array(c);
            for (r = 0; r < u; r += 4) n = t[e.charCodeAt(r)], i = t[e.charCodeAt(r + 1)], o = t[e.charCodeAt(r + 2)], s = t[e.charCodeAt(r + 3)], p[l++] = n << 2 | i >> 4, p[l++] = (15 & i) << 4 | o >> 2, p[l++] = (3 & o) << 6 | 63 & s;
            return c
        }
    }();
    var ec = {},
        tc = void 0 !== tc ? tc : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder && MozBlobBuilder,
        rc = function () {
            try {
                return 2 === new Blob(["hi"]).size
            } catch (Rd) {
                return !1
            }
        }(),
        nc = rc && function () {
            try {
                return 2 === new Blob([new Uint8Array([1, 2])]).size
            } catch (Rd) {
                return !1
            }
        }(),
        ic = tc && tc.prototype.append && tc.prototype.getBlob;

    function oc(e) {
        return e.map((function (e) {
            if (e.buffer instanceof ArrayBuffer) {
                var t = e.buffer;
                if (e.byteLength !== t.byteLength) {
                    var r = new Uint8Array(e.byteLength);
                    r.set(new Uint8Array(t, e.byteOffset, e.byteLength)), t = r.buffer
                }
                return t
            }
            return e
        }))
    }

    function sc(e, t) {
        t = t || {};
        var r = new tc;
        return oc(e).forEach((function (e) {
            r.append(e)
        })), t.type ? r.getBlob(t.type) : r.getBlob()
    }

    function ac(e, t) {
        return new Blob(oc(e), t || {})
    }
    "undefined" != typeof Blob && (sc.prototype = Blob.prototype, ac.prototype = Blob.prototype), ec = rc ? nc ? Blob : ac : ic ? sc : void 0;
    var uc, lc = {};
    "undefined" != typeof ArrayBuffer && (uc = Zl);
    var cc = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent),
        pc = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent),
        dc = cc || pc;
    lc.protocol = 3;
    var hc = lc.packets = {
        open: 0,
        close: 1,
        ping: 2,
        pong: 3,
        message: 4,
        upgrade: 5,
        noop: 6
    },
        fc = Bl(hc),
        yc = {
            type: "error",
            data: "parser error"
        };

    function gc(e, t, r) {
        for (var n = new Array(e.length), i = function (e, t, r) {
            var n = !1;
            return r = r || Nl, i.count = e, 0 === e ? t() : i;

            function i(e, o) {
                if (i.count <= 0) throw new Error("after called too many times");
                --i.count, e ? (n = !0, t(e), t = r) : 0 !== i.count || n || t(null, o)
            }
        }(e.length, r), o = function (e, r, i) {
            t(r, (function (t, r) {
                n[e] = r, i(t, n)
            }))
        }, s = 0; s < e.length; s++) o(s, e[s], i)
    }
    lc.encodePacket = function (e, t, r, n) {
        "function" == typeof t && (n = t, t = !1), "function" == typeof r && (n = r, r = null);
        var i = void 0 === e.data ? void 0 : e.data.buffer || e.data;
        if ("undefined" != typeof ArrayBuffer && i instanceof ArrayBuffer) return function (e, t, r) {
            if (!t) return lc.encodeBase64Packet(e, r);
            var n = e.data,
                i = new Uint8Array(n),
                o = new Uint8Array(1 + n.byteLength);
            o[0] = hc[e.type];
            for (var s = 0; s < i.length; s++) o[s + 1] = i[s];
            return r(o.buffer)
        }(e, t, n);
        if (void 0 !== ec && i instanceof ec) return function (e, t, r) {
            if (!t) return lc.encodeBase64Packet(e, r);
            if (dc) return function (e, t, r) {
                if (!t) return lc.encodeBase64Packet(e, r);
                var n = new FileReader;
                return n.onload = function () {
                    lc.encodePacket({
                        type: e.type,
                        data: n.result
                    }, t, !0, r)
                }, n.readAsArrayBuffer(e.data)
            }(e, t, r);
            var n = new Uint8Array(1);
            return n[0] = hc[e.type], r(new ec([n.buffer, e.data]))
        }(e, t, n);
        if (i && i.base64) return function (e, t) {
            return t("b" + lc.packets[e.type] + e.data.data)
        }(e, n);
        var o = hc[e.type];
        return void 0 !== e.data && (o += r ? Jl(String(e.data), {
            strict: !1
        }) : String(e.data)), n("" + o)
    }, lc.encodeBase64Packet = function (e, t) {
        var r, n = "b" + lc.packets[e.type];
        if (void 0 !== ec && e.data instanceof ec) {
            var i = new FileReader;
            return i.onload = function () {
                var e = i.result.split(",")[1];
                t(n + e)
            }, i.readAsDataURL(e.data)
        }
        try {
            r = String.fromCharCode.apply(null, new Uint8Array(e.data))
        } catch (Rd) {
            for (var o = new Uint8Array(e.data), s = new Array(o.length), a = 0; a < o.length; a++) s[a] = o[a];
            r = String.fromCharCode.apply(null, s)
        }
        return n += btoa(r), t(n)
    }, lc.decodePacket = function (e, t, r) {
        if (void 0 === e) return yc;
        if ("string" == typeof e) {
            if ("b" === e.charAt(0)) return lc.decodeBase64Packet(e.substr(1), t);
            if (r && !1 === (e = function (e) {
                try {
                    e = Ql(e, {
                        strict: !1
                    })
                } catch (Rd) {
                    return !1
                }
                return e
            }(e))) return yc;
            var n = e.charAt(0);
            return Number(n) == n && fc[n] ? e.length > 1 ? {
                type: fc[n],
                data: e.substring(1)
            } : {
                    type: fc[n]
                } : yc
        }
        n = new Uint8Array(e)[0];
        var i = Ml(e, 1);
        return ec && "blob" === t && (i = new ec([i])), {
            type: fc[n],
            data: i
        }
    }, lc.decodeBase64Packet = function (e, t) {
        var r = fc[e.charAt(0)];
        if (!uc) return {
            type: r,
            data: {
                base64: !0,
                data: e.substr(1)
            }
        };
        var n = uc.decode(e.substr(1));
        return "blob" === t && ec && (n = new ec([n])), {
            type: r,
            data: n
        }
    }, lc.encodePayload = function (e, t, r) {
        "function" == typeof t && (r = t, t = null);
        var n = Ll(e);
        return t && n ? ec && !dc ? lc.encodePayloadAsBlob(e, r) : lc.encodePayloadAsArrayBuffer(e, r) : e.length ? void gc(e, (function (e, r) {
            lc.encodePacket(e, !!n && t, !1, (function (e) {
                r(null, function (e) {
                    return e.length + ":" + e
                }(e))
            }))
        }), (function (e, t) {
            return r(t.join(""))
        })) : r("0:")
    }, lc.decodePayload = function (e, t, r) {
        if ("string" != typeof e) return lc.decodePayloadAsBinary(e, t, r);
        var n;
        if ("function" == typeof t && (r = t, t = null), "" === e) return r(yc, 0, 1);
        for (var i, o, s = "", a = 0, u = e.length; a < u; a++) {
            var l = e.charAt(a);
            if (":" === l) {
                if ("" === s || s != (i = Number(s))) return r(yc, 0, 1);
                if (s != (o = e.substr(a + 1, i)).length) return r(yc, 0, 1);
                if (o.length) {
                    if (n = lc.decodePacket(o, t, !1), yc.type === n.type && yc.data === n.data) return r(yc, 0, 1);
                    if (!1 === r(n, a + i, u)) return
                }
                a += i, s = ""
            } else s += l
        }
        return "" !== s ? r(yc, 0, 1) : void 0
    }, lc.encodePayloadAsArrayBuffer = function (e, t) {
        if (!e.length) return t(new ArrayBuffer(0));
        gc(e, (function (e, t) {
            lc.encodePacket(e, !0, !0, (function (e) {
                return t(null, e)
            }))
        }), (function (e, r) {
            var n = r.reduce((function (e, t) {
                var r;
                return e + (r = "string" == typeof t ? t.length : t.byteLength).toString().length + r + 2
            }), 0),
                i = new Uint8Array(n),
                o = 0;
            return r.forEach((function (e) {
                var t = "string" == typeof e,
                    r = e;
                if (t) {
                    for (var n = new Uint8Array(e.length), s = 0; s < e.length; s++) n[s] = e.charCodeAt(s);
                    r = n.buffer
                }
                i[o++] = t ? 0 : 1;
                var a = r.byteLength.toString();
                for (s = 0; s < a.length; s++) i[o++] = parseInt(a[s]);
                for (i[o++] = 255, n = new Uint8Array(r), s = 0; s < n.length; s++) i[o++] = n[s]
            })), t(i.buffer)
        }))
    }, lc.encodePayloadAsBlob = function (e, t) {
        gc(e, (function (e, t) {
            lc.encodePacket(e, !0, !0, (function (e) {
                var r = new Uint8Array(1);
                if (r[0] = 1, "string" == typeof e) {
                    for (var n = new Uint8Array(e.length), i = 0; i < e.length; i++) n[i] = e.charCodeAt(i);
                    e = n.buffer, r[0] = 0
                }
                var o = (e instanceof ArrayBuffer ? e.byteLength : e.size).toString(),
                    s = new Uint8Array(o.length + 1);
                for (i = 0; i < o.length; i++) s[i] = parseInt(o[i]);
                if (s[o.length] = 255, ec) {
                    var a = new ec([r.buffer, s.buffer, e]);
                    t(null, a)
                }
            }))
        }), (function (e, r) {
            return t(new ec(r))
        }))
    }, lc.decodePayloadAsBinary = function (e, t, r) {
        "function" == typeof t && (r = t, t = null);
        for (var n = e, i = []; n.byteLength > 0;) {
            for (var o = new Uint8Array(n), s = 0 === o[0], a = "", u = 1; 255 !== o[u]; u++) {
                if (a.length > 310) return r(yc, 0, 1);
                a += o[u]
            }
            n = Ml(n, 2 + a.length), a = parseInt(a);
            var l = Ml(n, 0, a);
            if (s) try {
                l = String.fromCharCode.apply(null, new Uint8Array(l))
            } catch (Rd) {
                var c = new Uint8Array(l);
                for (l = "", u = 0; u < c.length; u++) l += String.fromCharCode(c[u])
            }
            i.push(l), n = Ml(n, a)
        }
        var p = i.length;
        i.forEach((function (e, n) {
            r(lc.decodePacket(e, t, !0), n, p)
        }))
    };
    var vc = {};

    function mc(e) {
        this.path = e.path, this.hostname = e.hostname, this.port = e.port, this.secure = e.secure, this.query = e.query, this.timestampParam = e.timestampParam, this.timestampRequests = e.timestampRequests, this.readyState = "", this.agent = e.agent || !1, this.socket = e.socket, this.enablesXDR = e.enablesXDR, this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, this.cert = e.cert, this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized, this.forceNode = e.forceNode, this.isReactNative = e.isReactNative, this.extraHeaders = e.extraHeaders, this.localAddress = e.localAddress
    }
    vc = mc, Ul(mc.prototype), mc.prototype.onError = function (e, t) {
        var r = new Error(e);
        return r.type = "TransportError", r.description = t, this.emit("error", r), this
    }, mc.prototype.open = function () {
        return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", this.doOpen()), this
    }, mc.prototype.close = function () {
        return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this
    }, mc.prototype.send = function (e) {
        if ("open" !== this.readyState) throw new Error("Transport not open");
        this.write(e)
    }, mc.prototype.onOpen = function () {
        this.readyState = "open", this.writable = !0, this.emit("open")
    }, mc.prototype.onData = function (e) {
        var t = lc.decodePacket(e, this.socket.binaryType);
        this.onPacket(t)
    }, mc.prototype.onPacket = function (e) {
        this.emit("packet", e)
    }, mc.prototype.onClose = function () {
        this.readyState = "closed", this.emit("close")
    };
    var bc = {};
    try {
        bc = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest
    } catch (yc) {
        bc = !1
    }
    var wc, _c = function (e) {
        var t = e.xdomain,
            r = e.xscheme,
            n = e.enablesXDR;
        try {
            if ("undefined" != typeof XMLHttpRequest && (!t || bc)) return new XMLHttpRequest
        } catch (Rd) { }
        try {
            if ("undefined" != typeof XDomainRequest && !r && n) return new XDomainRequest
        } catch (Rd) { }
        if (!t) try {
            return new (self[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
        } catch (Rd) { }
    },
        Sc = function (e, t) {
            var r = function () { };
            r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e
        },
        kc = {},
        Pc = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),
        Cc = {},
        Ec = 0,
        Ac = 0;

    function Fc(e) {
        var t = "";
        do {
            t = Pc[e % 64] + t, e = Math.floor(e / 64)
        } while (e > 0);
        return t
    }

    function Oc() {
        var e = Fc(+new Date);
        return e !== wc ? (Ec = 0, wc = e) : e + "." + Fc(Ec++)
    }
    for (; Ac < 64; Ac++) Cc[Pc[Ac]] = Ac;
    Oc.encode = Fc, Oc.decode = function (e) {
        var t = 0;
        for (Ac = 0; Ac < e.length; Ac++) t = 64 * t + Cc[e.charAt(Ac)];
        return t
    }, kc = Oc;
    var Uc = ol("engine.io-client:polling"),
        Rc = xc,
        Tc = null != new _c({
            xdomain: !1
        }).responseType;

    function xc(e) {
        var t = e && e.forceBase64;
        Tc && !t || (this.supportsBinary = !1), vc.call(this, e)
    }
    Sc(xc, vc), xc.prototype.name = "polling", xc.prototype.doOpen = function () {
        this.poll()
    }, xc.prototype.pause = function (e) {
        var t = this;

        function r() {
            Uc("paused"), t.readyState = "paused", e()
        }
        if (this.readyState = "pausing", this.polling || !this.writable) {
            var n = 0;
            this.polling && (Uc("we are currently polling - waiting to pause"), n++, this.once("pollComplete", (function () {
                Uc("pre-pause polling complete"), --n || r()
            }))), this.writable || (Uc("we are currently writing - waiting to pause"), n++, this.once("drain", (function () {
                Uc("pre-pause writing complete"), --n || r()
            })))
        } else r()
    }, xc.prototype.poll = function () {
        Uc("polling"), this.polling = !0, this.doPoll(), this.emit("poll")
    }, xc.prototype.onData = function (e) {
        var t = this;
        Uc("polling got data %s", e), lc.decodePayload(e, this.socket.binaryType, (function (e, r, n) {
            if ("opening" === t.readyState && t.onOpen(), "close" === e.type) return t.onClose(), !1;
            t.onPacket(e)
        })), "closed" !== this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" === this.readyState ? this.poll() : Uc('ignoring poll - transport state "%s"', this.readyState))
    }, xc.prototype.doClose = function () {
        var e = this;

        function t() {
            Uc("writing close packet"), e.write([{
                type: "close"
            }])
        }
        "open" === this.readyState ? (Uc("transport open - closing"), t()) : (Uc("transport not open - deferring close"), this.once("open", t))
    }, xc.prototype.write = function (e) {
        var t = this;
        this.writable = !1;
        var r = function () {
            t.writable = !0, t.emit("drain")
        };
        lc.encodePayload(e, this.supportsBinary, (function (e) {
            t.doWrite(e, r)
        }))
    }, xc.prototype.uri = function () {
        var e = this.query || {},
            t = this.secure ? "https" : "http",
            r = "";
        return !1 !== this.timestampRequests && (e[this.timestampParam] = kc()), this.supportsBinary || e.sid || (e.b64 = 1), e = Dl.encode(e), this.port && ("https" === t && 443 !== Number(this.port) || "http" === t && 80 !== Number(this.port)) && (r = ":" + this.port), e.length && (e = "?" + e), t + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + r + this.path + e
    };
    var Dc = {},
        Bc = ol("engine.io-client:polling-xhr");

    function Ic() { }

    function jc(e) {
        if (Rc.call(this, e), this.requestTimeout = e.requestTimeout, this.extraHeaders = e.extraHeaders, "undefined" != typeof location) {
            var t = "https:" === location.protocol,
                r = location.port;
            r || (r = t ? 443 : 80), this.xd = "undefined" != typeof location && e.hostname !== location.hostname || r !== e.port, this.xs = e.secure !== t
        }
    }

    function Lc(e) {
        this.method = e.method || "GET", this.uri = e.uri, this.xd = !!e.xd, this.xs = !!e.xs, this.async = !1 !== e.async, this.data = void 0 !== e.data ? e.data : null, this.agent = e.agent, this.isBinary = e.isBinary, this.supportsBinary = e.supportsBinary, this.enablesXDR = e.enablesXDR, this.requestTimeout = e.requestTimeout, this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, this.cert = e.cert, this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized, this.extraHeaders = e.extraHeaders, this.create()
    }
    if ((Dc = jc).Request = Lc, Sc(jc, Rc), jc.prototype.supportsBinary = !0, jc.prototype.request = function (e) {
        return (e = e || {}).uri = this.uri(), e.xd = this.xd, e.xs = this.xs, e.agent = this.agent || !1, e.supportsBinary = this.supportsBinary, e.enablesXDR = this.enablesXDR, e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized, e.requestTimeout = this.requestTimeout, e.extraHeaders = this.extraHeaders, new Lc(e)
    }, jc.prototype.doWrite = function (e, t) {
        var r = "string" != typeof e && void 0 !== e,
            n = this.request({
                method: "POST",
                data: e,
                isBinary: r
            }),
            i = this;
        n.on("success", t), n.on("error", (function (e) {
            i.onError("xhr post error", e)
        })), this.sendXhr = n
    }, jc.prototype.doPoll = function () {
        Bc("xhr poll");
        var e = this.request(),
            t = this;
        e.on("data", (function (e) {
            t.onData(e)
        })), e.on("error", (function (e) {
            t.onError("xhr poll error", e)
        })), this.pollXhr = e
    }, Ul(Lc.prototype), Lc.prototype.create = function () {
        var e = {
            agent: this.agent,
            xdomain: this.xd,
            xscheme: this.xs,
            enablesXDR: this.enablesXDR
        };
        e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized;
        var t = this.xhr = new _c(e),
            r = this;
        try {
            Bc("xhr open %s: %s", this.method, this.uri), t.open(this.method, this.uri, this.async);
            try {
                if (this.extraHeaders)
                    for (var n in t.setDisableHeaderCheck && t.setDisableHeaderCheck(!0), this.extraHeaders) this.extraHeaders.hasOwnProperty(n) && t.setRequestHeader(n, this.extraHeaders[n])
            } catch (Rd) { }
            if ("POST" === this.method) try {
                this.isBinary ? t.setRequestHeader("Content-type", "application/octet-stream") : t.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
            } catch (Rd) { }
            try {
                t.setRequestHeader("Accept", "*/*")
            } catch (Rd) { }
            "withCredentials" in t && (t.withCredentials = !0), this.requestTimeout && (t.timeout = this.requestTimeout), this.hasXDR() ? (t.onload = function () {
                r.onLoad()
            }, t.onerror = function () {
                r.onError(t.responseText)
            }) : t.onreadystatechange = function () {
                if (2 === t.readyState) try {
                    var e = t.getResponseHeader("Content-Type");
                    r.supportsBinary && "application/octet-stream" === e && (t.responseType = "arraybuffer")
                } catch (Rd) { }
                4 === t.readyState && (200 === t.status || 1223 === t.status ? r.onLoad() : setTimeout((function () {
                    r.onError(t.status)
                }), 0))
            }, Bc("xhr data %s", this.data), t.send(this.data)
        } catch (Rd) {
            return void setTimeout((function () {
                r.onError(Rd)
            }), 0)
        }
        "undefined" != typeof document && (this.index = Lc.requestsCount++, Lc.requests[this.index] = this)
    }, Lc.prototype.onSuccess = function () {
        this.emit("success"), this.cleanup()
    }, Lc.prototype.onData = function (e) {
        this.emit("data", e), this.onSuccess()
    }, Lc.prototype.onError = function (e) {
        this.emit("error", e), this.cleanup(!0)
    }, Lc.prototype.cleanup = function (e) {
        if (void 0 !== this.xhr && null !== this.xhr) {
            if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = Ic : this.xhr.onreadystatechange = Ic, e) try {
                this.xhr.abort()
            } catch (Rd) { }
            "undefined" != typeof document && delete Lc.requests[this.index], this.xhr = null
        }
    }, Lc.prototype.onLoad = function () {
        var e;
        try {
            var t;
            try {
                t = this.xhr.getResponseHeader("Content-Type")
            } catch (Rd) { }
            e = "application/octet-stream" === t && this.xhr.response || this.xhr.responseText
        } catch (Rd) {
            this.onError(Rd)
        }
        null != e && this.onData(e)
    }, Lc.prototype.hasXDR = function () {
        return "undefined" != typeof XDomainRequest && !this.xs && this.enablesXDR
    }, Lc.prototype.abort = function () {
        this.cleanup()
    }, Lc.requestsCount = 0, Lc.requests = {}, "undefined" != typeof document)
        if ("function" == typeof attachEvent) attachEvent("onunload", Nc);
        else if ("function" == typeof addEventListener) {
            var Mc = "onpagehide" in self ? "pagehide" : "unload";
            addEventListener(Mc, Nc, !1)
        }

    function Nc() {
        for (var e in Lc.requests) Lc.requests.hasOwnProperty(e) && Lc.requests[e].abort()
    }
    var zc = {};
    (function (e) {
        zc = s;
        var t, r = /\n/g,
            n = /\\n/g;

        function i() { }

        function o() {
            return "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== e ? e : {}
        }

        function s(e) {
            if (Rc.call(this, e), this.query = this.query || {}, !t) {
                var r = o();
                t = r.___eio = r.___eio || []
            }
            this.index = t.length;
            var n = this;
            t.push((function (e) {
                n.onData(e)
            })), this.query.j = this.index, "function" == typeof addEventListener && addEventListener("beforeunload", (function () {
                n.script && (n.script.onerror = i)
            }), !1)
        }
        Sc(s, Rc), s.prototype.supportsBinary = !1, s.prototype.doClose = function () {
            this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), Rc.prototype.doClose.call(this)
        }, s.prototype.doPoll = function () {
            var e = this,
                t = document.createElement("script");
            this.script && (this.script.parentNode.removeChild(this.script), this.script = null), t.async = !0, t.src = this.uri(), t.onerror = function (t) {
                e.onError("jsonp poll error", t)
            };
            var r = document.getElementsByTagName("script")[0];
            r ? r.parentNode.insertBefore(t, r) : (document.head || document.body).appendChild(t), this.script = t, "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout((function () {
                var e = document.createElement("iframe");
                document.body.appendChild(e), document.body.removeChild(e)
            }), 100)
        }, s.prototype.doWrite = function (e, t) {
            var i = this;
            if (!this.form) {
                var o, s = document.createElement("form"),
                    a = document.createElement("textarea"),
                    u = this.iframeId = "eio_iframe_" + this.index;
                s.className = "socketio", s.style.position = "absolute", s.style.top = "-1000px", s.style.left = "-1000px", s.target = u, s.method = "POST", s.setAttribute("accept-charset", "utf-8"), a.name = "d", s.appendChild(a), document.body.appendChild(s), this.form = s, this.area = a
            }

            function l() {
                c(), t()
            }

            function c() {
                if (i.iframe) try {
                    i.form.removeChild(i.iframe)
                } catch (Rd) {
                    i.onError("jsonp polling iframe removal error", Rd)
                }
                try {
                    var e = '<iframe src="javascript:0" name="' + i.iframeId + '">';
                    o = document.createElement(e)
                } catch (Rd) {
                    (o = document.createElement("iframe")).name = i.iframeId, o.src = "javascript:0"
                }
                o.id = i.iframeId, i.form.appendChild(o), i.iframe = o
            }
            this.form.action = this.uri(), c(), e = e.replace(n, "\\\n"), this.area.value = e.replace(r, "\\n");
            try {
                this.form.submit()
            } catch (Rd) { }
            this.iframe.attachEvent ? this.iframe.onreadystatechange = function () {
                "complete" === i.iframe.readyState && l()
            } : this.iframe.onload = l
        }
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    var qc = {};
    (function (e) {
        var t, r, n = ol("engine.io-client:websocket");
        if ("undefined" != typeof WebSocket) t = WebSocket;
        else if ("undefined" != typeof self) t = self.WebSocket || self.MozWebSocket;
        else try {
            r = o({})
        } catch (Rd) { }
        var i = t || r;

        function s(e) {
            e && e.forceBase64 && (this.supportsBinary = !1), this.perMessageDeflate = e.perMessageDeflate, this.usingBrowserWebSocket = t && !e.forceNode, this.protocols = e.protocols, this.usingBrowserWebSocket || (i = r), vc.call(this, e)
        }
        qc = s, Sc(s, vc), s.prototype.name = "websocket", s.prototype.supportsBinary = !0, s.prototype.doOpen = function () {
            if (this.check()) {
                var e = this.uri(),
                    t = this.protocols,
                    r = {
                        agent: this.agent,
                        perMessageDeflate: this.perMessageDeflate
                    };
                r.pfx = this.pfx, r.key = this.key, r.passphrase = this.passphrase, r.cert = this.cert, r.ca = this.ca, r.ciphers = this.ciphers, r.rejectUnauthorized = this.rejectUnauthorized, this.extraHeaders && (r.headers = this.extraHeaders), this.localAddress && (r.localAddress = this.localAddress);
                try {
                    this.ws = this.usingBrowserWebSocket && !this.isReactNative ? t ? new i(e, t) : new i(e) : new i(e, t, r)
                } catch (yc) {
                    return this.emit("error", yc)
                }
                void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners()
            }
        }, s.prototype.addEventListeners = function () {
            var e = this;
            this.ws.onopen = function () {
                e.onOpen()
            }, this.ws.onclose = function () {
                e.onClose()
            }, this.ws.onmessage = function (t) {
                e.onData(t.data)
            }, this.ws.onerror = function (t) {
                e.onError("websocket error", t)
            }
        }, s.prototype.write = function (t) {
            var r = this;
            this.writable = !1;
            for (var i = t.length, o = 0, s = i; o < s; o++) ! function (t) {
                lc.encodePacket(t, r.supportsBinary, (function (o) {
                    if (!r.usingBrowserWebSocket) {
                        var s = {};
                        t.options && (s.compress = t.options.compress), r.perMessageDeflate && ("string" == typeof o ? e.byteLength(o) : o.length) < r.perMessageDeflate.threshold && (s.compress = !1)
                    }
                    try {
                        r.usingBrowserWebSocket ? r.ws.send(o) : r.ws.send(o, s)
                    } catch (Rd) {
                        n("websocket closed before onclose event")
                    } --i || (r.emit("flush"), setTimeout((function () {
                        r.writable = !0, r.emit("drain")
                    }), 0))
                }))
            }(t[o])
        }, s.prototype.onClose = function () {
            vc.prototype.onClose.call(this)
        }, s.prototype.doClose = function () {
            void 0 !== this.ws && this.ws.close()
        }, s.prototype.uri = function () {
            var e = this.query || {},
                t = this.secure ? "wss" : "ws",
                r = "";
            return this.port && ("wss" === t && 443 !== Number(this.port) || "ws" === t && 80 !== Number(this.port)) && (r = ":" + this.port), this.timestampRequests && (e[this.timestampParam] = kc()), this.supportsBinary || (e.b64 = 1), (e = Dl.encode(e)).length && (e = "?" + e), t + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + r + this.path + e
        }, s.prototype.check = function () {
            return !(!i || "__initialize" in i && this.name === s.prototype.name)
        }
    }).call(this, s({}).Buffer);
    var Hc = {
        polling: function (e) {
            var t = !1,
                r = !1,
                n = !1 !== e.jsonp;
            if ("undefined" != typeof location) {
                var i = "https:" === location.protocol,
                    o = location.port;
                o || (o = i ? 443 : 80), t = e.hostname !== location.hostname || o !== e.port, r = e.secure !== i
            }
            if (e.xdomain = t, e.xscheme = r, "open" in new _c(e) && !e.forceJSONP) return new Dc(e);
            if (!n) throw new Error("JSONP disabled");
            return new zc(e)
        }
    };
    Hc.websocket = qc;
    var Vc, Wc = ol("engine.io-client:socket");

    function Xc(e, t) {
        if (!(this instanceof Xc)) return new Xc(e, t);
        t = t || {}, e && "object" == typeof e && (t = e, e = null), e ? (e = Ju(e), t.hostname = e.host, t.secure = "https" === e.protocol || "wss" === e.protocol, t.port = e.port, e.query && (t.query = e.query)) : t.host && (t.hostname = Ju(t.host).host), this.secure = null != t.secure ? t.secure : "undefined" != typeof location && "https:" === location.protocol, t.hostname && !t.port && (t.port = this.secure ? "443" : "80"), this.agent = t.agent || !1, this.hostname = t.hostname || ("undefined" != typeof location ? location.hostname : "localhost"), this.port = t.port || ("undefined" != typeof location && location.port ? location.port : this.secure ? 443 : 80), this.query = t.query || {}, "string" == typeof this.query && (this.query = Dl.decode(this.query)), this.upgrade = !1 !== t.upgrade, this.path = (t.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!t.forceJSONP, this.jsonp = !1 !== t.jsonp, this.forceBase64 = !!t.forceBase64, this.enablesXDR = !!t.enablesXDR, this.timestampParam = t.timestampParam || "t", this.timestampRequests = t.timestampRequests, this.transports = t.transports || ["polling", "websocket"], this.transportOptions = t.transportOptions || {}, this.readyState = "", this.writeBuffer = [], this.prevBufferLen = 0, this.policyPort = t.policyPort || 843, this.rememberUpgrade = t.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = t.onlyBinaryUpgrades, this.perMessageDeflate = !1 !== t.perMessageDeflate && (t.perMessageDeflate || {}), !0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024), this.pfx = t.pfx || null, this.key = t.key || null, this.passphrase = t.passphrase || null, this.cert = t.cert || null, this.ca = t.ca || null, this.ciphers = t.ciphers || null, this.rejectUnauthorized = void 0 === t.rejectUnauthorized || t.rejectUnauthorized, this.forceNode = !!t.forceNode, this.isReactNative = "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase(), ("undefined" == typeof self || this.isReactNative) && (t.extraHeaders && Object.keys(t.extraHeaders).length > 0 && (this.extraHeaders = t.extraHeaders), t.localAddress && (this.localAddress = t.localAddress)), this.id = null, this.upgrades = null, this.pingInterval = null, this.pingTimeout = null, this.pingIntervalTimer = null, this.pingTimeoutTimer = null, this.open()
    }
    Vc = Xc, Xc.priorWebsocketSuccess = !1, Ul(Xc.prototype), Xc.protocol = lc.protocol, Xc.Socket = Xc, Xc.Transport = vc, Xc.transports = Hc, Xc.parser = lc, Xc.prototype.createTransport = function (e) {
        Wc('creating transport "%s"', e);
        var t = function (e) {
            var t = {};
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
            return t
        }(this.query);
        t.EIO = lc.protocol, t.transport = e;
        var r = this.transportOptions[e] || {};
        return this.id && (t.sid = this.id), new Hc[e]({
            query: t,
            socket: this,
            agent: r.agent || this.agent,
            hostname: r.hostname || this.hostname,
            port: r.port || this.port,
            secure: r.secure || this.secure,
            path: r.path || this.path,
            forceJSONP: r.forceJSONP || this.forceJSONP,
            jsonp: r.jsonp || this.jsonp,
            forceBase64: r.forceBase64 || this.forceBase64,
            enablesXDR: r.enablesXDR || this.enablesXDR,
            timestampRequests: r.timestampRequests || this.timestampRequests,
            timestampParam: r.timestampParam || this.timestampParam,
            policyPort: r.policyPort || this.policyPort,
            pfx: r.pfx || this.pfx,
            key: r.key || this.key,
            passphrase: r.passphrase || this.passphrase,
            cert: r.cert || this.cert,
            ca: r.ca || this.ca,
            ciphers: r.ciphers || this.ciphers,
            rejectUnauthorized: r.rejectUnauthorized || this.rejectUnauthorized,
            perMessageDeflate: r.perMessageDeflate || this.perMessageDeflate,
            extraHeaders: r.extraHeaders || this.extraHeaders,
            forceNode: r.forceNode || this.forceNode,
            localAddress: r.localAddress || this.localAddress,
            requestTimeout: r.requestTimeout || this.requestTimeout,
            protocols: r.protocols || void 0,
            isReactNative: this.isReactNative
        })
    }, Xc.prototype.open = function () {
        var e;
        if (this.rememberUpgrade && Xc.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) e = "websocket";
        else {
            if (0 === this.transports.length) {
                var t = this;
                return void setTimeout((function () {
                    t.emit("error", "No transports available")
                }), 0)
            }
            e = this.transports[0]
        }
        this.readyState = "opening";
        try {
            e = this.createTransport(e)
        } catch (Rd) {
            return this.transports.shift(), void this.open()
        }
        e.open(), this.setTransport(e)
    }, Xc.prototype.setTransport = function (e) {
        Wc("setting transport %s", e.name);
        var t = this;
        this.transport && (Wc("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), this.transport = e, e.on("drain", (function () {
            t.onDrain()
        })).on("packet", (function (e) {
            t.onPacket(e)
        })).on("error", (function (e) {
            t.onError(e)
        })).on("close", (function () {
            t.onClose("transport close")
        }))
    }, Xc.prototype.probe = function (e) {
        Wc('probing transport "%s"', e);
        var t = this.createTransport(e, {
            probe: 1
        }),
            r = !1,
            n = this;

        function i() {
            if (n.onlyBinaryUpgrades) {
                var i = !this.supportsBinary && n.transport.supportsBinary;
                r = r || i
            }
            r || (Wc('probe transport "%s" opened', e), t.send([{
                type: "ping",
                data: "probe"
            }]), t.once("packet", (function (i) {
                if (!r)
                    if ("pong" === i.type && "probe" === i.data) {
                        if (Wc('probe transport "%s" pong', e), n.upgrading = !0, n.emit("upgrading", t), !t) return;
                        Xc.priorWebsocketSuccess = "websocket" === t.name, Wc('pausing current transport "%s"', n.transport.name), n.transport.pause((function () {
                            r || "closed" !== n.readyState && (Wc("changing transport and sending upgrade packet"), c(), n.setTransport(t), t.send([{
                                type: "upgrade"
                            }]), n.emit("upgrade", t), t = null, n.upgrading = !1, n.flush())
                        }))
                    } else {
                        Wc('probe transport "%s" failed', e);
                        var o = new Error("probe error");
                        o.transport = t.name, n.emit("upgradeError", o)
                    }
            })))
        }

        function o() {
            r || (r = !0, c(), t.close(), t = null)
        }

        function s(r) {
            var i = new Error("probe error: " + r);
            i.transport = t.name, o(), Wc('probe transport "%s" failed because of error: %s', e, r), n.emit("upgradeError", i)
        }

        function a() {
            s("transport closed")
        }

        function u() {
            s("socket closed")
        }

        function l(e) {
            t && e.name !== t.name && (Wc('"%s" works - aborting "%s"', e.name, t.name), o())
        }

        function c() {
            t.removeListener("open", i), t.removeListener("error", s), t.removeListener("close", a), n.removeListener("close", u), n.removeListener("upgrading", l)
        }
        Xc.priorWebsocketSuccess = !1, t.once("open", i), t.once("error", s), t.once("close", a), this.once("close", u), this.once("upgrading", l), t.open()
    }, Xc.prototype.onOpen = function () {
        if (Wc("socket open"), this.readyState = "open", Xc.priorWebsocketSuccess = "websocket" === this.transport.name, this.emit("open"), this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause) {
            Wc("starting upgrade probes");
            for (var e = 0, t = this.upgrades.length; e < t; e++) this.probe(this.upgrades[e])
        }
    }, Xc.prototype.onPacket = function (e) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (Wc('socket receive: type "%s", data "%s"', e.type, e.data), this.emit("packet", e), this.emit("heartbeat"), e.type) {
            case "open":
                this.onHandshake(JSON.parse(e.data));
                break;
            case "pong":
                this.setPing(), this.emit("pong");
                break;
            case "error":
                var t = new Error("server error");
                t.code = e.data, this.onError(t);
                break;
            case "message":
                this.emit("data", e.data), this.emit("message", e.data)
        } else Wc('packet received with socket readyState "%s"', this.readyState)
    }, Xc.prototype.onHandshake = function (e) {
        this.emit("handshake", e), this.id = e.sid, this.transport.query.sid = e.sid, this.upgrades = this.filterUpgrades(e.upgrades), this.pingInterval = e.pingInterval, this.pingTimeout = e.pingTimeout, this.onOpen(), "closed" !== this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
    }, Xc.prototype.onHeartbeat = function (e) {
        clearTimeout(this.pingTimeoutTimer);
        var t = this;
        t.pingTimeoutTimer = setTimeout((function () {
            "closed" !== t.readyState && t.onClose("ping timeout")
        }), e || t.pingInterval + t.pingTimeout)
    }, Xc.prototype.setPing = function () {
        var e = this;
        clearTimeout(e.pingIntervalTimer), e.pingIntervalTimer = setTimeout((function () {
            Wc("writing ping packet - expecting pong within %sms", e.pingTimeout), e.ping(), e.onHeartbeat(e.pingTimeout)
        }), e.pingInterval)
    }, Xc.prototype.ping = function () {
        var e = this;
        this.sendPacket("ping", (function () {
            e.emit("ping")
        }))
    }, Xc.prototype.onDrain = function () {
        this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush()
    }, Xc.prototype.flush = function () {
        "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (Wc("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
    }, Xc.prototype.write = Xc.prototype.send = function (e, t, r) {
        return this.sendPacket("message", e, t, r), this
    }, Xc.prototype.sendPacket = function (e, t, r, n) {
        if ("function" == typeof t && (n = t, t = void 0), "function" == typeof r && (n = r, r = null), "closing" !== this.readyState && "closed" !== this.readyState) {
            (r = r || {}).compress = !1 !== r.compress;
            var i = {
                type: e,
                data: t,
                options: r
            };
            this.emit("packetCreate", i), this.writeBuffer.push(i), n && this.once("flush", n), this.flush()
        }
    }, Xc.prototype.close = function () {
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            var e = this;
            this.writeBuffer.length ? this.once("drain", (function () {
                this.upgrading ? n() : t()
            })) : this.upgrading ? n() : t()
        }

        function t() {
            e.onClose("forced close"), Wc("socket closing - telling transport to close"), e.transport.close()
        }

        function r() {
            e.removeListener("upgrade", r), e.removeListener("upgradeError", r), t()
        }

        function n() {
            e.once("upgrade", r), e.once("upgradeError", r)
        }
        return this
    }, Xc.prototype.onError = function (e) {
        Wc("socket error %j", e), Xc.priorWebsocketSuccess = !1, this.emit("error", e), this.onClose("transport error", e)
    }, Xc.prototype.onClose = function (e, t) {
        "opening" !== this.readyState && "open" !== this.readyState && "closing" !== this.readyState || (Wc('socket close with reason: "%s"', e), clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", e, t), this.writeBuffer = [], this.prevBufferLen = 0)
    }, Xc.prototype.filterUpgrades = function (e) {
        for (var t = [], r = 0, n = e.length; r < n; r++) ~xl(this.transports, e[r]) && t.push(e[r]);
        return t
    };
    var Gc = {};
    (Gc = Vc).parser = lc;
    var Kc = {
        exports: {}
    };

    function $c(e) {
        if (e) return function (e) {
            for (var t in $c.prototype) e[t] = $c.prototype[t];
            return e
        }(e)
    }
    Kc.exports = $c, $c.prototype.on = $c.prototype.addEventListener = function (e, t) {
        return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this
    }, $c.prototype.once = function (e, t) {
        function r() {
            this.off(e, r), t.apply(this, arguments)
        }
        return r.fn = t, this.on(e, r), this
    }, $c.prototype.off = $c.prototype.removeListener = $c.prototype.removeAllListeners = $c.prototype.removeEventListener = function (e, t) {
        if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
        var r, n = this._callbacks["$" + e];
        if (!n) return this;
        if (1 == arguments.length) return delete this._callbacks["$" + e], this;
        for (var i = 0; i < n.length; i++)
            if ((r = n[i]) === t || r.fn === t) {
                n.splice(i, 1);
                break
            } return this
    }, $c.prototype.emit = function (e) {
        this._callbacks = this._callbacks || {};
        var t = [].slice.call(arguments, 1),
            r = this._callbacks["$" + e];
        if (r)
            for (var n = 0, i = (r = r.slice(0)).length; n < i; ++n) r[n].apply(this, t);
        return this
    }, $c.prototype.listeners = function (e) {
        return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || []
    }, $c.prototype.hasListeners = function (e) {
        return !!this.listeners(e).length
    }, Kc = Kc.exports;
    var Yc = function (e, t) {
        for (var r = [], n = (t = t || 0) || 0; n < e.length; n++) r[n - t] = e[n];
        return r
    },
        Jc = function (e, t, r) {
            return e.on(t, r), {
                destroy: function () {
                    e.removeListener(t, r)
                }
            }
        },
        Qc = [].slice,
        Zc = function (e, t) {
            if ("string" == typeof t && (t = e[t]), "function" != typeof t) throw new Error("bind() requires a function");
            var r = Qc.call(arguments, 2);
            return function () {
                return t.apply(e, r.concat(Qc.call(arguments)))
            }
        },
        ep = {},
        tp = ol("socket.io-client:socket");
    ep = ep = ip;
    var rp = {
        connect: 1,
        connect_error: 1,
        connect_timeout: 1,
        connecting: 1,
        disconnect: 1,
        error: 1,
        reconnect: 1,
        reconnect_attempt: 1,
        reconnect_failed: 1,
        reconnect_error: 1,
        reconnecting: 1,
        ping: 1,
        pong: 1
    },
        np = Kc.prototype.emit;

    function ip(e, t, r) {
        this.io = e, this.nsp = t, this.json = this, this.ids = 0, this.acks = {}, this.receiveBuffer = [], this.sendBuffer = [], this.connected = !1, this.disconnected = !0, this.flags = {}, r && r.query && (this.query = r.query), this.io.autoConnect && this.open()
    }
    Kc(ip.prototype), ip.prototype.subEvents = function () {
        if (!this.subs) {
            var e = this.io;
            this.subs = [Jc(e, "open", Zc(this, "onopen")), Jc(e, "packet", Zc(this, "onpacket")), Jc(e, "close", Zc(this, "onclose"))]
        }
    }, ip.prototype.open = ip.prototype.connect = function () {
        return this.connected || (this.subEvents(), this.io.open(), "open" === this.io.readyState && this.onopen(), this.emit("connecting")), this
    }, ip.prototype.send = function () {
        var e = Yc(arguments);
        return e.unshift("message"), this.emit.apply(this, e), this
    }, ip.prototype.emit = function (e) {
        if (rp.hasOwnProperty(e)) return np.apply(this, arguments), this;
        var t = Yc(arguments),
            r = {
                type: (void 0 !== this.flags.binary ? this.flags.binary : Ll(t)) ? Sl.BINARY_EVENT : Sl.EVENT,
                data: t,
                options: {}
            };
        return r.options.compress = !this.flags || !1 !== this.flags.compress, "function" == typeof t[t.length - 1] && (tp("emitting packet with ack id %d", this.ids), this.acks[this.ids] = t.pop(), r.id = this.ids++), this.connected ? this.packet(r) : this.sendBuffer.push(r), this.flags = {}, this
    }, ip.prototype.packet = function (e) {
        e.nsp = this.nsp, this.io.packet(e)
    }, ip.prototype.onopen = function () {
        if (tp("transport is open - connecting"), "/" !== this.nsp)
            if (this.query) {
                var e = "object" == typeof this.query ? Dl.encode(this.query) : this.query;
                tp("sending connect packet with query %s", e), this.packet({
                    type: Sl.CONNECT,
                    query: e
                })
            } else this.packet({
                type: Sl.CONNECT
            })
    }, ip.prototype.onclose = function (e) {
        tp("close (%s)", e), this.connected = !1, this.disconnected = !0, delete this.id, this.emit("disconnect", e)
    }, ip.prototype.onpacket = function (e) {
        var t = e.nsp === this.nsp,
            r = e.type === Sl.ERROR && "/" === e.nsp;
        if (t || r) switch (e.type) {
            case Sl.CONNECT:
                this.onconnect();
                break;
            case Sl.EVENT:
            case Sl.BINARY_EVENT:
                this.onevent(e);
                break;
            case Sl.ACK:
            case Sl.BINARY_ACK:
                this.onack(e);
                break;
            case Sl.DISCONNECT:
                this.ondisconnect();
                break;
            case Sl.ERROR:
                this.emit("error", e.data)
        }
    }, ip.prototype.onevent = function (e) {
        var t = e.data || [];
        tp("emitting event %j", t), null != e.id && (tp("attaching ack callback to event"), t.push(this.ack(e.id))), this.connected ? np.apply(this, t) : this.receiveBuffer.push(t)
    }, ip.prototype.ack = function (e) {
        var t = this,
            r = !1;
        return function () {
            if (!r) {
                r = !0;
                var n = Yc(arguments);
                tp("sending ack %j", n), t.packet({
                    type: Ll(n) ? Sl.BINARY_ACK : Sl.ACK,
                    id: e,
                    data: n
                })
            }
        }
    }, ip.prototype.onack = function (e) {
        var t = this.acks[e.id];
        "function" == typeof t ? (tp("calling ack %s with %j", e.id, e.data), t.apply(this, e.data), delete this.acks[e.id]) : tp("bad ack %s", e.id)
    }, ip.prototype.onconnect = function () {
        this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered()
    }, ip.prototype.emitBuffered = function () {
        var e;
        for (e = 0; e < this.receiveBuffer.length; e++) np.apply(this, this.receiveBuffer[e]);
        for (this.receiveBuffer = [], e = 0; e < this.sendBuffer.length; e++) this.packet(this.sendBuffer[e]);
        this.sendBuffer = []
    }, ip.prototype.ondisconnect = function () {
        tp("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect")
    }, ip.prototype.destroy = function () {
        if (this.subs) {
            for (var e = 0; e < this.subs.length; e++) this.subs[e].destroy();
            this.subs = null
        }
        this.io.destroy(this)
    }, ip.prototype.close = ip.prototype.disconnect = function () {
        return this.connected && (tp("performing disconnect (%s)", this.nsp), this.packet({
            type: Sl.DISCONNECT
        })), this.destroy(), this.connected && this.onclose("io client disconnect"), this
    }, ip.prototype.compress = function (e) {
        return this.flags.compress = e, this
    }, ip.prototype.binary = function (e) {
        return this.flags.binary = e, this
    };
    var op = {};

    function sp(e) {
        e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0
    }
    op = sp, sp.prototype.duration = function () {
        var e = this.ms * Math.pow(this.factor, this.attempts++);
        if (this.jitter) {
            var t = Math.random(),
                r = Math.floor(t * this.jitter * e);
            e = 0 == (1 & Math.floor(10 * t)) ? e - r : e + r
        }
        return 0 | Math.min(e, this.max)
    }, sp.prototype.reset = function () {
        this.attempts = 0
    }, sp.prototype.setMin = function (e) {
        this.ms = e
    }, sp.prototype.setMax = function (e) {
        this.max = e
    }, sp.prototype.setJitter = function (e) {
        this.jitter = e
    };
    var ap = {},
        up = ol("socket.io-client:manager"),
        lp = Object.prototype.hasOwnProperty;

    function cp(e, t) {
        if (!(this instanceof cp)) return new cp(e, t);
        e && "object" == typeof e && (t = e, e = void 0), (t = t || {}).path = t.path || "/socket.io", this.nsps = {}, this.subs = [], this.opts = t, this.reconnection(!1 !== t.reconnection), this.reconnectionAttempts(t.reconnectionAttempts || 1 / 0), this.reconnectionDelay(t.reconnectionDelay || 1e3), this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3), this.randomizationFactor(t.randomizationFactor || .5), this.backoff = new op({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor()
        }), this.timeout(null == t.timeout ? 2e4 : t.timeout), this.readyState = "closed", this.uri = e, this.connecting = [], this.lastPing = null, this.encoding = !1, this.packetBuffer = [];
        var r = t.parser || Sl;
        this.encoder = new r.Encoder, this.decoder = new r.Decoder, this.autoConnect = !1 !== t.autoConnect, this.autoConnect && this.open()
    }
    ap = cp, cp.prototype.emitAll = function () {
        for (var e in this.emit.apply(this, arguments), this.nsps) lp.call(this.nsps, e) && this.nsps[e].emit.apply(this.nsps[e], arguments)
    }, cp.prototype.updateSocketIds = function () {
        for (var e in this.nsps) lp.call(this.nsps, e) && (this.nsps[e].id = this.generateId(e))
    }, cp.prototype.generateId = function (e) {
        return ("/" === e ? "" : e + "#") + this.engine.id
    }, Kc(cp.prototype), cp.prototype.reconnection = function (e) {
        return arguments.length ? (this._reconnection = !!e, this) : this._reconnection
    }, cp.prototype.reconnectionAttempts = function (e) {
        return arguments.length ? (this._reconnectionAttempts = e, this) : this._reconnectionAttempts
    }, cp.prototype.reconnectionDelay = function (e) {
        return arguments.length ? (this._reconnectionDelay = e, this.backoff && this.backoff.setMin(e), this) : this._reconnectionDelay
    }, cp.prototype.randomizationFactor = function (e) {
        return arguments.length ? (this._randomizationFactor = e, this.backoff && this.backoff.setJitter(e), this) : this._randomizationFactor
    }, cp.prototype.reconnectionDelayMax = function (e) {
        return arguments.length ? (this._reconnectionDelayMax = e, this.backoff && this.backoff.setMax(e), this) : this._reconnectionDelayMax
    }, cp.prototype.timeout = function (e) {
        return arguments.length ? (this._timeout = e, this) : this._timeout
    }, cp.prototype.maybeReconnectOnOpen = function () {
        !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
    }, cp.prototype.open = cp.prototype.connect = function (e, t) {
        if (up("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;
        up("opening %s", this.uri), this.engine = Gc(this.uri, this.opts);
        var r = this.engine,
            n = this;
        this.readyState = "opening", this.skipReconnect = !1;
        var i = Jc(r, "open", (function () {
            n.onopen(), e && e()
        })),
            o = Jc(r, "error", (function (t) {
                if (up("connect_error"), n.cleanup(), n.readyState = "closed", n.emitAll("connect_error", t), e) {
                    var r = new Error("Connection error");
                    r.data = t, e(r)
                } else n.maybeReconnectOnOpen()
            }));
        if (!1 !== this._timeout) {
            var s = this._timeout;
            up("connect attempt will timeout after %d", s);
            var a = setTimeout((function () {
                up("connect attempt timed out after %d", s), i.destroy(), r.close(), r.emit("error", "timeout"), n.emitAll("connect_timeout", s)
            }), s);
            this.subs.push({
                destroy: function () {
                    clearTimeout(a)
                }
            })
        }
        return this.subs.push(i), this.subs.push(o), this
    }, cp.prototype.onopen = function () {
        up("open"), this.cleanup(), this.readyState = "open", this.emit("open");
        var e = this.engine;
        this.subs.push(Jc(e, "data", Zc(this, "ondata"))), this.subs.push(Jc(e, "ping", Zc(this, "onping"))), this.subs.push(Jc(e, "pong", Zc(this, "onpong"))), this.subs.push(Jc(e, "error", Zc(this, "onerror"))), this.subs.push(Jc(e, "close", Zc(this, "onclose"))), this.subs.push(Jc(this.decoder, "decoded", Zc(this, "ondecoded")))
    }, cp.prototype.onping = function () {
        this.lastPing = new Date, this.emitAll("ping")
    }, cp.prototype.onpong = function () {
        this.emitAll("pong", new Date - this.lastPing)
    }, cp.prototype.ondata = function (e) {
        this.decoder.add(e)
    }, cp.prototype.ondecoded = function (e) {
        this.emit("packet", e)
    }, cp.prototype.onerror = function (e) {
        up("error", e), this.emitAll("error", e)
    }, cp.prototype.socket = function (e, t) {
        var r = this.nsps[e];
        if (!r) {
            r = new ep(this, e, t), this.nsps[e] = r;
            var n = this;
            r.on("connecting", i), r.on("connect", (function () {
                r.id = n.generateId(e)
            })), this.autoConnect && i()
        }

        function i() {
            ~xl(n.connecting, r) || n.connecting.push(r)
        }
        return r
    }, cp.prototype.destroy = function (e) {
        var t = xl(this.connecting, e);
        ~t && this.connecting.splice(t, 1), this.connecting.length || this.close()
    }, cp.prototype.packet = function (e) {
        up("writing packet %j", e);
        var t = this;
        e.query && 0 === e.type && (e.nsp += "?" + e.query), t.encoding ? t.packetBuffer.push(e) : (t.encoding = !0, this.encoder.encode(e, (function (r) {
            for (var n = 0; n < r.length; n++) t.engine.write(r[n], e.options);
            t.encoding = !1, t.processPacketQueue()
        })))
    }, cp.prototype.processPacketQueue = function () {
        if (this.packetBuffer.length > 0 && !this.encoding) {
            var e = this.packetBuffer.shift();
            this.packet(e)
        }
    }, cp.prototype.cleanup = function () {
        up("cleanup");
        for (var e = this.subs.length, t = 0; t < e; t++) this.subs.shift().destroy();
        this.packetBuffer = [], this.encoding = !1, this.lastPing = null, this.decoder.destroy()
    }, cp.prototype.close = cp.prototype.disconnect = function () {
        up("disconnect"), this.skipReconnect = !0, this.reconnecting = !1, "opening" === this.readyState && this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close()
    }, cp.prototype.onclose = function (e) {
        up("onclose"), this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", e), this._reconnection && !this.skipReconnect && this.reconnect()
    }, cp.prototype.reconnect = function () {
        if (this.reconnecting || this.skipReconnect) return this;
        var e = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) up("reconnect failed"), this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1;
        else {
            var t = this.backoff.duration();
            up("will wait %dms before reconnect attempt", t), this.reconnecting = !0;
            var r = setTimeout((function () {
                e.skipReconnect || (up("attempting reconnect"), e.emitAll("reconnect_attempt", e.backoff.attempts), e.emitAll("reconnecting", e.backoff.attempts), e.skipReconnect || e.open((function (t) {
                    t ? (up("reconnect attempt error"), e.reconnecting = !1, e.reconnect(), e.emitAll("reconnect_error", t.data)) : (up("reconnect success"), e.onreconnect())
                })))
            }), t);
            this.subs.push({
                destroy: function () {
                    clearTimeout(r)
                }
            })
        }
    }, cp.prototype.onreconnect = function () {
        var e = this.backoff.attempts;
        this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", e)
    };
    var pp = {
        exports: {}
    };

    function dp(e) {
        if (e) return function (e) {
            for (var t in dp.prototype) e[t] = dp.prototype[t];
            return e
        }(e)
    }
    pp.exports = dp, dp.prototype.on = dp.prototype.addEventListener = function (e, t) {
        return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this
    }, dp.prototype.once = function (e, t) {
        function r() {
            this.off(e, r), t.apply(this, arguments)
        }
        return r.fn = t, this.on(e, r), this
    }, dp.prototype.off = dp.prototype.removeListener = dp.prototype.removeAllListeners = dp.prototype.removeEventListener = function (e, t) {
        if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
        var r, n = this._callbacks["$" + e];
        if (!n) return this;
        if (1 == arguments.length) return delete this._callbacks["$" + e], this;
        for (var i = 0; i < n.length; i++)
            if ((r = n[i]) === t || r.fn === t) {
                n.splice(i, 1);
                break
            } return 0 === n.length && delete this._callbacks["$" + e], this
    }, dp.prototype.emit = function (e) {
        this._callbacks = this._callbacks || {};
        for (var t = new Array(arguments.length - 1), r = this._callbacks["$" + e], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        if (r) {
            n = 0;
            for (var i = (r = r.slice(0)).length; n < i; ++n) r[n].apply(this, t)
        }
        return this
    }, dp.prototype.listeners = function (e) {
        return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || []
    }, dp.prototype.hasListeners = function (e) {
        return !!this.listeners(e).length
    }, pp = pp.exports;

    function hp() {
        return (hp = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var fp, yp = ["ASSEMBLY_UPLOADING", "ASSEMBLY_EXECUTING", "ASSEMBLY_COMPLETED"];

    function gp(e, t) {
        return yp.indexOf(e) >= yp.indexOf(t)
    }
    var vp = function (e) {
        var t, r;

        function n(t) {
            var r;
            return (r = e.call(this) || this).status = t, r.socket = null, r.pollInterval = null, r.closed = !1, r
        }
        r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
        var o = n.prototype;
        return o.connect = function () {
            this._connectSocket(), this._beginPolling()
        }, o._onFinished = function () {
            this.emit("finished"), this.close()
        }, o._connectSocket = function () {
            var e = this,
                t = function (e) {
                    var t = /^\w+:\/\//.exec(e),
                        r = 0;
                    t && (r = t[0].length + 1);
                    var n = e.indexOf("/", r);
                    return -1 === n ? {
                        origin: e,
                        pathname: "/"
                    } : {
                            origin: e.slice(0, n),
                            pathname: e.slice(n)
                        }
                }(this.status.websocket_url),
                r = (fp || (fp = i({})), fp).connect(t.origin, {
                    transports: ["websocket"],
                    path: t.pathname
                });
            r.on("connect", (function () {
                r.emit("assembly_connect", {
                    id: e.status.assembly_id
                }), e.emit("connect")
            })), r.on("connect_failed", (function () {
                e._onError(new Te("Transloadit Socket.io connection error")), e.socket = null
            })), r.on("error", (function () {
                r.disconnect(), e.socket = null
            })), r.on("assembly_finished", (function () {
                e._onFinished()
            })), r.on("assembly_upload_finished", (function (t) {
                e.emit("upload", t), e.status.uploads.push(t)
            })), r.on("assembly_uploading_finished", (function () {
                e.emit("executing")
            })), r.on("assembly_upload_meta_data_extracted", (function () {
                e.emit("metadata"), e._fetchStatus({
                    diff: !1
                })
            })), r.on("assembly_result_finished", (function (t, r) {
                e.emit("result", t, r), e.status.results[t] || (e.status.results[t] = []), e.status.results[t].push(r)
            })), r.on("assembly_error", (function (t) {
                e._onError(t), e._fetchStatus({
                    diff: !1
                })
            })), this.socket = r
        }, o._onError = function (e) {
            this.emit("error", hp(new Error(e.message), e))
        }, o._beginPolling = function () {
            var e = this;
            this.pollInterval = setInterval((function () {
                e.socket && e.socket.connected || e._fetchStatus()
            }), 2e3)
        }, o._fetchStatus = function (e) {
            var t = this,
                r = (void 0 === e ? {} : e).diff,
                n = void 0 === r || r;
            return xe(this.status.assembly_ssl_url).then((function (e) {
                return e.json()
            })).then((function (e) {
                t.closed || (t.emit("status", e), n ? t.updateStatus(e) : t.status = e)
            })).catch((function (e) {
                return t._onError(e)
            }))
        }, o.update = function () {
            return this._fetchStatus({
                diff: !0
            })
        }, o.updateStatus = function (e) {
            this._diffStatus(this.status, e), this.status = e
        }, o._diffStatus = function (e, t) {
            var r = this,
                n = e.ok,
                i = t.ok;
            if (t.error && !e.error) return this._onError(t);
            var o = gp(i, "ASSEMBLY_EXECUTING") && !gp(n, "ASSEMBLY_EXECUTING");
            o && this.emit("executing"), Object.keys(t.uploads).filter((function (t) {
                return !k(e.uploads, t)
            })).map((function (e) {
                return t.uploads[e]
            })).forEach((function (e) {
                r.emit("upload", e)
            })), o && this.emit("metadata"), Object.keys(t.results).forEach((function (n) {
                var i = t.results[n],
                    o = e.results[n];
                i.filter((function (e) {
                    return !o || !o.some((function (t) {
                        return t.id === e.id
                    }))
                })).forEach((function (e) {
                    r.emit("result", n, e)
                }))
            })), gp(i, "ASSEMBLY_COMPLETED") && !gp(n, "ASSEMBLY_COMPLETED") && this.emit("finished")
        }, o.close = function () {
            this.closed = !0, this.socket && (this.socket.disconnect(), this.socket = null), clearInterval(this.pollInterval)
        }, n
    }(pp),
        mp = function () {
            function e(e) {
                void 0 === e && (e = {}), this.opts = e, this._reportError = this._reportError.bind(this), this._headers = {
                    "Transloadit-Client": this.opts.client
                }
            }
            var t = e.prototype;
            return t.createAssembly = function (e) {
                var t = this,
                    r = (e.templateId, e.params),
                    n = e.fields,
                    i = e.signature,
                    o = e.expectedFiles,
                    s = new FormData;
                s.append("params", "string" == typeof r ? r : JSON.stringify(r)), i && s.append("signature", i), Object.keys(n).forEach((function (e) {
                    s.append(e, n[e])
                })), s.append("num_expected_upload_files", o);
                var a = this.opts.service + "/assemblies";
                return xe(a, {
                    method: "post",
                    headers: this._headers,
                    body: s
                }).then((function (e) {
                    return e.json()
                })).then((function (e) {
                    if (e.error) {
                        var t = new Error(e.error);
                        throw t.details = e.message, t.assembly = e, e.assembly_id && (t.details += " Assembly ID: " + e.assembly_id), t
                    }
                    return e
                })).catch((function (e) {
                    return t._reportError(e, {
                        url: a,
                        type: "API_ERROR"
                    })
                }))
            }, t.reserveFile = function (e, t) {
                var r = this,
                    n = encodeURIComponent(t.size),
                    i = e.assembly_ssl_url + "/reserve_file?size=" + n;
                return xe(i, {
                    method: "post",
                    headers: this._headers
                }).then((function (e) {
                    return e.json()
                })).catch((function (n) {
                    return r._reportError(n, {
                        assembly: e,
                        file: t,
                        url: i,
                        type: "API_ERROR"
                    })
                }))
            }, t.addFile = function (e, t) {
                var r = this;
                if (!t.uploadURL) return Promise.reject(new Error("File does not have an `uploadURL`."));
                var n = encodeURIComponent(t.size),
                    i = encodeURIComponent(t.uploadURL),
                    o = "size=" + n + "&filename=" + encodeURIComponent(t.name) + "&fieldname=file&s3Url=" + i,
                    s = e.assembly_ssl_url + "/add_file?" + o;
                return xe(s, {
                    method: "post",
                    headers: this._headers
                }).then((function (e) {
                    return e.json()
                })).catch((function (n) {
                    return r._reportError(n, {
                        assembly: e,
                        file: t,
                        url: s,
                        type: "API_ERROR"
                    })
                }))
            }, t.cancelAssembly = function (e) {
                var t = this,
                    r = e.assembly_ssl_url;
                return xe(r, {
                    method: "delete",
                    headers: this._headers
                }).then((function (e) {
                    return e.json()
                })).catch((function (e) {
                    return t._reportError(e, {
                        url: r,
                        type: "API_ERROR"
                    })
                }))
            }, t.getAssemblyStatus = function (e) {
                var t = this;
                return xe(e, {
                    headers: this._headers
                }).then((function (e) {
                    return e.json()
                })).catch((function (r) {
                    return t._reportError(r, {
                        url: e,
                        type: "STATUS_ERROR"
                    })
                }))
            }, t.submitError = function (e, t) {
                var r = t.endpoint,
                    n = t.instance,
                    i = t.assembly,
                    o = e.details ? e.message + " (" + e.details + ")" : e.message;
                return xe("https://status.transloadit.com/client_error", {
                    method: "post",
                    body: JSON.stringify({
                        endpoint: r,
                        instance: n,
                        assembly_id: i,
                        agent: "undefined" != typeof navigator ? navigator.userAgent : "",
                        client: this.opts.client,
                        error: o
                    })
                }).then((function (e) {
                    return e.json()
                }))
            }, t._reportError = function (e, t) {
                if (!1 === this.opts.errorReporting) throw e;
                var r = {
                    type: t.type
                };
                throw t.assembly && (r.assembly = t.assembly.assembly_id, r.instance = t.assembly.instance), t.url && (r.endpoint = t.url), this.submitError(e, r).catch((function (e) { })), e
            }, e
        }(),
        bp = {};

    function wp(e) {
        if (!e) throw new Error("Transloadit: The `params` option is required.");
        if ("string" == typeof e) try {
            e = JSON.parse(e)
        } catch (yc) {
            throw yc.message = "Transloadit: The `params` option is a malformed JSON string: " + yc.message, yc
        }
        if (!e.auth || !e.auth.key) throw new Error("Transloadit: The `params.auth.key` option is required. You can find your Transloadit API key at https://transloadit.com/account/api-settings.")
    }
    var _p = function () {
        function e(e, t) {
            this.files = e, this.opts = t
        }
        var t = e.prototype;
        return t._normalizeAssemblyOptions = function (e, t) {
            if (Array.isArray(t.fields)) {
                var r = t.fields;
                t.fields = {}, r.forEach((function (r) {
                    t.fields[r] = e.meta[r]
                }))
            }
            return t.fields || (t.fields = {}), t
        }, t._getAssemblyOptions = function (e) {
            var t = this,
                r = this.opts;
            return Promise.resolve().then((function () {
                return r.getAssemblyOptions(e, r)
            })).then((function (r) {
                return t._normalizeAssemblyOptions(e, r)
            })).then((function (t) {
                return wp(t.params), {
                    fileIDs: [e.id],
                    options: t
                }
            }))
        }, t._dedupe = function (e) {
            var t = Object.create(null);
            return e.forEach((function (e) {
                var r, n = e.fileIDs,
                    i = e.options,
                    o = JSON.stringify(i);
                t[o] ? (r = t[o].fileIDs).push.apply(r, n) : t[o] = {
                    options: i,
                    fileIDs: [].concat(n)
                }
            })), Object.keys(t).map((function (e) {
                return t[e]
            }))
        }, t.build = function () {
            var e = this,
                t = this.opts;
            return this.files.length > 0 ? Promise.all(this.files.map((function (t) {
                return e._getAssemblyOptions(t)
            }))).then((function (t) {
                return e._dedupe(t)
            })) : t.alwaysRunAssembly ? Promise.resolve(t.getAssemblyOptions(null, t)).then((function (t) {
                return wp(t.params), [{
                    fileIDs: e.files.map((function (e) {
                        return e.id
                    })),
                    options: t
                }]
            })) : Promise.resolve([])
        }, e
    }();

    function Sp(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    } (bp = _p).validateParams = wp;
    var kp, Pp, Cp = function (e) {
        var t, r;

        function n(t, r) {
            var n;
            return (n = e.call(this) || this)._uppy = t, n._assemblyIDs = r, n._remaining = r.length, n.promise = new Promise((function (e, t) {
                n._resolve = e, n._reject = t
            })), n._onAssemblyComplete = n._onAssemblyComplete.bind(Sp(n)), n._onAssemblyCancel = n._onAssemblyCancel.bind(Sp(n)), n._onAssemblyError = n._onAssemblyError.bind(Sp(n)), n._onImportError = n._onImportError.bind(Sp(n)), n._addListeners(), n
        }
        r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
        var i = n.prototype;
        return i._watching = function (e) {
            return -1 !== this._assemblyIDs.indexOf(e)
        }, i._onAssemblyComplete = function (e) {
            this._watching(e.assembly_id) && (this._uppy.log("[Transloadit] AssemblyWatcher: Got Assembly finish " + e.assembly_id), this.emit("assembly-complete", e.assembly_id), this._checkAllComplete())
        }, i._onAssemblyCancel = function (e) {
            this._watching(e.assembly_id) && this._checkAllComplete()
        }, i._onAssemblyError = function (e, t) {
            this._watching(e.assembly_id) && (this._uppy.log("[Transloadit] AssemblyWatcher: Got Assembly error " + e.assembly_id), this._uppy.log(t), this.emit("assembly-error", e.assembly_id, t), this._checkAllComplete())
        }, i._onImportError = function (e, t, r) {
            this._watching(e.assembly_id) && this._onAssemblyError(e, r)
        }, i._checkAllComplete = function () {
            this._remaining -= 1, 0 === this._remaining && (this._removeListeners(), this._resolve())
        }, i._removeListeners = function () {
            this._uppy.off("transloadit:complete", this._onAssemblyComplete), this._uppy.off("transloadit:assembly-cancel", this._onAssemblyCancel), this._uppy.off("transloadit:assembly-error", this._onAssemblyError), this._uppy.off("transloadit:import-error", this._onImportError)
        }, i._addListeners = function () {
            this._uppy.on("transloadit:complete", this._onAssemblyComplete), this._uppy.on("transloadit:assembly-cancel", this._onAssemblyCancel), this._uppy.on("transloadit:assembly-error", this._onAssemblyError), this._uppy.on("transloadit:import-error", this._onImportError)
        }, n
    }(pp),
        Ep = {};

    function Ap() {
        return (Ap = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function Fp(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function Op(e, t) {
        return {
            params: t.params,
            signature: t.signature,
            fields: t.fields
        }
    }
    var Up, Rp, Tp = "https://api2.transloadit.com/companion",
        xp = /https?:\/\/api2(?:-\w+)?\.transloadit\.com\/companion/,
        Dp = /https?:\/\/api2(?:-\w+)?\.transloadit\.com\/uppy-server/;

    function Bp() {
        return (Bp = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    Pp = kp = function (e) {
        var t, r;

        function n(t, r) {
            var n;
            (n = e.call(this, t, r) || this).type = "uploader", n.id = n.opts.id || "Transloadit", n.title = "Transloadit", n.defaultLocale = {
                strings: {
                    creatingAssembly: "Preparing upload...",
                    creatingAssemblyFailed: "Transloadit: Could not create Assembly",
                    encoding: "Encoding..."
                }
            };
            var i = {
                service: "https://api2.transloadit.com",
                errorReporting: !0,
                waitForEncoding: !1,
                waitForMetadata: !1,
                alwaysRunAssembly: !1,
                importFromUploadURLs: !1,
                signature: null,
                params: null,
                fields: {},
                getAssemblyOptions: Op,
                limit: 0
            };
            n.opts = Ap({}, i, r), n.i18nInit(), n._prepareUpload = n._prepareUpload.bind(Fp(n)), n._afterUpload = n._afterUpload.bind(Fp(n)), n._onError = n._onError.bind(Fp(n)), n._onTusError = n._onTusError.bind(Fp(n)), n._onCancelAll = n._onCancelAll.bind(Fp(n)), n._onFileUploadURLAvailable = n._onFileUploadURLAvailable.bind(Fp(n)), n._onRestored = n._onRestored.bind(Fp(n)), n._getPersistentData = n._getPersistentData.bind(Fp(n));
            var o = n.opts.getAssemblyOptions !== i.getAssemblyOptions;
            return n.opts.params ? bp.validateParams(n.opts.params) : o || bp.validateParams(null), n.client = new mp({
                service: n.opts.service,
                client: n._getClientVersion(),
                errorReporting: n.opts.errorReporting
            }), n.activeAssemblies = {}, n.assemblyWatchers = {}, n.completedFiles = Object.create(null), n
        }
        r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
        var i = n.prototype;
        return i.setOptions = function (t) {
            e.prototype.setOptions.call(this, t), this.i18nInit()
        }, i.i18nInit = function () {
            this.translator = new E([this.defaultLocale, this.uppy.locale, this.opts.locale]), this.i18n = this.translator.translate.bind(this.translator), this.i18nArray = this.translator.translateArray.bind(this.translator), this.setPluginState()
        }, i._getClientVersion = function () {
            var e = this,
                t = ["uppy-core:" + this.uppy.constructor.VERSION, "uppy-transloadit:" + this.constructor.VERSION, "uppy-tus:" + Ku.VERSION],
                r = function (r, n) {
                    var i = e.uppy.getPlugin(r);
                    i && t.push(n + ":" + i.constructor.VERSION)
                };
            return this.opts.importFromUploadURLs && (r("XHRUpload", "uppy-xhr-upload"), r("AwsS3", "uppy-aws-s3"), r("AwsS3Multipart", "uppy-aws-s3-multipart")), r("Dropbox", "uppy-dropbox"), r("Facebook", "uppy-facebook"), r("GoogleDrive", "uppy-google-drive"), r("Instagram", "uppy-instagram"), r("OneDrive", "uppy-onedrive"), r("Zoom", "uppy-zoom"), r("Url", "uppy-url"), t.join(",")
        }, i._attachAssemblyMetadata = function (e, t) {
            var r = Ap({}, e.meta, {
                assembly_url: t.assembly_url,
                filename: e.name,
                fieldname: "file"
            }),
                n = Ap({}, e.tus, {
                    endpoint: t.tus_url,
                    addRequestId: !0
                }),
                i = e.remote;
            if (e.remote && Dp.test(e.remote.companionUrl)) {
                var o = new Error("The https://api2.transloadit.com/uppy-server endpoint was renamed to https://api2.transloadit.com/companion, please update your `companionUrl` options accordingly.");
                throw this.uppy.log(o), o
            }
            if (e.remote && xp.test(e.remote.companionUrl)) {
                var s = t.companion_url.replace(/\/$/, ""),
                    a = e.remote.url.replace(e.remote.companionUrl, "").replace(/^\//, "");
                i = Ap({}, e.remote, {
                    companionUrl: s,
                    url: s + "/" + a
                })
            }
            var u = Ap({}, e, {
                transloadit: {
                    assembly: t.assembly_id
                }
            });
            return this.opts.importFromUploadURLs || Ap(u, {
                meta: r,
                tus: n,
                remote: i
            }), u
        }, i._createAssembly = function (e, t, r) {
            var n = this;
            return this.uppy.log("[Transloadit] Create Assembly"), this.client.createAssembly({
                params: r.params,
                fields: r.fields,
                expectedFiles: e.length,
                signature: r.signature
            }).then((function (r) {
                var i, o, s = new vp(r),
                    a = s.status,
                    u = a.assembly_id,
                    l = n.getPluginState(),
                    c = l.assemblies,
                    p = l.uploadsAssemblies;
                n.setPluginState({
                    assemblies: Ap({}, c, (i = {}, i[u] = a, i)),
                    uploadsAssemblies: Ap({}, p, (o = {}, o[t] = [].concat(p[t], [u]), o))
                });
                var d = n.uppy.getState().files,
                    h = {};
                return e.forEach((function (e) {
                    h[e] = n._attachAssemblyMetadata(n.uppy.getFile(e), a)
                })), n.uppy.setState({
                    files: Ap({}, d, h)
                }), n.uppy.emit("transloadit:assembly-created", a, e), n.uppy.log("[Transloadit] Created Assembly " + u), s
            })).catch((function (e) {
                throw e.message = n.i18n("creatingAssemblyFailed") + ": " + e.message, e
            }))
        }, i._createAssemblyWatcher = function (e, t, r) {
            var n = this,
                i = new Cp(this.uppy, e);
            i.on("assembly-complete", (function (e) {
                n.getAssemblyFiles(e).forEach((function (e) {
                    n.completedFiles[e.id] = !0, n.uppy.emit("postprocess-complete", e)
                }))
            })), i.on("assembly-error", (function (e, t) {
                n.getAssemblyFiles(e).forEach((function (e) {
                    n.uppy.emit("upload-error", e, t), n.uppy.emit("postprocess-complete", e)
                }))
            })), this.assemblyWatchers[r] = i
        }, i._shouldWaitAfterUpload = function () {
            return this.opts.waitForEncoding || this.opts.waitForMetadata
        }, i._reserveFiles = function (e, t) {
            var r = this;
            return Promise.all(t.map((function (t) {
                var n = r.uppy.getFile(t);
                return r.client.reserveFile(e, n)
            })))
        }, i._onFileUploadURLAvailable = function (e) {
            var t = this;
            if (e && e.transloadit && e.transloadit.assembly) {
                var r = this.getPluginState().assemblies[e.transloadit.assembly];
                this.client.addFile(r, e).catch((function (n) {
                    t.uppy.log(n), t.uppy.emit("transloadit:import-error", r, e.id, n)
                }))
            }
        }, i._findFile = function (e) {
            for (var t = this.uppy.getFiles(), r = 0; r < t.length; r++) {
                var n = t[r];
                if (n.uploadURL === e.tus_upload_url) return n;
                if (n.tus && n.tus.uploadUrl === e.tus_upload_url) return n;
                if (!e.is_tus_file && n.name === e.name && n.size === e.size) return n
            }
        }, i._onFileUploadComplete = function (e, t) {
            var r, n = this.getPluginState(),
                i = this._findFile(t);
            i ? (this.setPluginState({
                files: Ap({}, n.files, (r = {}, r[t.id] = {
                    assembly: e,
                    id: i.id,
                    uploadedFile: t
                }, r))
            }), this.uppy.emit("transloadit:upload", t, this.getAssembly(e))) : this.uppy.log("[Transloadit] Couldn\u2019t file the file, it was likely removed in the process")
        }, i._onResult = function (e, t, r) {
            var n = this.getPluginState(),
                i = n.files[r.original_id];
            r.localId = i ? i.id : null;
            var o = {
                result: r,
                stepName: t,
                id: r.id,
                assembly: e
            };
            this.setPluginState({
                results: [].concat(n.results, [o])
            }), this.uppy.emit("transloadit:result", t, r, this.getAssembly(e))
        }, i._onAssemblyFinished = function (e) {
            var t = this,
                r = e.assembly_ssl_url;
            this.client.getAssemblyStatus(r).then((function (e) {
                var r, n = e.assembly_id,
                    i = t.getPluginState();
                t.setPluginState({
                    assemblies: Ap({}, i.assemblies, (r = {}, r[n] = e, r))
                }), t.uppy.emit("transloadit:complete", e)
            }))
        }, i._cancelAssembly = function (e) {
            var t = this;
            return this.client.cancelAssembly(e).then((function () {
                t.uppy.emit("transloadit:assembly-cancelled", e)
            }))
        }, i._onCancelAll = function () {
            var e = this,
                t = this.getPluginState().uploadsAssemblies,
                r = Object.keys(t).reduce((function (e, r) {
                    return e.push.apply(e, t[r]), e
                }), []).map((function (t) {
                    var r = e.getAssembly(t);
                    return e._cancelAssembly(r)
                }));
            Promise.all(r).catch((function (t) {
                e.uppy.log(t)
            }))
        }, i._getPersistentData = function (e) {
            var t, r = this.getPluginState(),
                n = r.assemblies,
                i = r.uploadsAssemblies;
            e(((t = {})[this.id] = {
                assemblies: n,
                uploadsAssemblies: i
            }, t))
        }, i._onRestored = function (e) {
            var t = this,
                r = e && e[this.id] ? e[this.id] : {},
                n = r.assemblies || {},
                i = r.uploadsAssemblies || {};
            0 !== Object.keys(i).length && (this.restored = Promise.resolve().then((function () {
                var e, r, o;
                return e = n, r = {}, o = [], Object.keys(e).forEach((function (n) {
                    var i = e[n];
                    i.uploads.forEach((function (e) {
                        var i = t._findFile(e);
                        r[e.id] = {
                            id: i.id,
                            assembly: n,
                            uploadedFile: e
                        }
                    }));
                    var s = t.getPluginState();
                    Object.keys(i.results).forEach((function (e) {
                        i.results[e].forEach((function (t) {
                            var r = s.files[t.original_id];
                            t.localId = r ? r.id : null, o.push({
                                id: t.id,
                                result: t,
                                stepName: e,
                                assembly: n
                            })
                        }))
                    }))
                })), t.setPluginState({
                    assemblies: e,
                    files: r,
                    results: o,
                    uploadsAssemblies: i
                }),
                    function () {
                        var e = t.getPluginState(),
                            r = e.assemblies,
                            n = e.uploadsAssemblies;
                        Object.keys(n).forEach((function (e) {
                            var r = n[e],
                                i = r.reduce((function (e, r) {
                                    var n = t.getAssemblyFiles(r).map((function (e) {
                                        return e.id
                                    }));
                                    return e.push.apply(e, n), e
                                }), []);
                            t._createAssemblyWatcher(r, i, e)
                        })), Object.keys(r).forEach((function (e) {
                            var n = new vp(r[e]);
                            t._connectAssembly(n)
                        }))
                    }(),
                    function () {
                        var e = t.getPluginState().assemblies;
                        return Promise.all(Object.keys(e).map((function (e) {
                            return t.activeAssemblies[e].update()
                        })))
                    }()
            })), this.restored.then((function () {
                t.restored = null
            })))
        }, i._connectAssembly = function (e) {
            var t = this,
                r = e.status.assembly_id;
            return this.activeAssemblies[r] = e, e.on("status", (function (e) {
                var n, i = t.getPluginState().assemblies;
                t.setPluginState({
                    assemblies: Ap({}, i, (n = {}, n[r] = e, n))
                })
            })), e.on("upload", (function (e) {
                t._onFileUploadComplete(r, e)
            })), e.on("error", (function (r) {
                r.assembly = e.status, t.uppy.emit("transloadit:assembly-error", e.status, r)
            })), e.on("executing", (function () {
                t.uppy.emit("transloadit:assembly-executing", e.status)
            })), this.opts.waitForEncoding && e.on("result", (function (e, n) {
                t._onResult(r, e, n)
            })), this.opts.waitForEncoding ? e.on("finished", (function () {
                t._onAssemblyFinished(e.status)
            })) : this.opts.waitForMetadata && e.on("metadata", (function () {
                t._onAssemblyFinished(e.status)
            })), "ASSEMBLY_COMPLETE" === e.ok || (new Promise((function (t, r) {
                e.once("connect", t), e.once("status", t), e.once("error", r)
            })).then((function () {
                t.uppy.log("[Transloadit] Socket is ready")
            })), e.connect()), e
        }, i._prepareUpload = function (e, t) {
            var r, n = this;
            (e = e.filter((function (e) {
                return !e.error
            }))).forEach((function (e) {
                var t = n.uppy.getFile(e);
                n.uppy.emit("preprocess-progress", t, {
                    mode: "indeterminate",
                    message: n.i18n("creatingAssembly")
                })
            }));
            var i = function (e) {
                var r, i = e.fileIDs,
                    o = e.options;
                return n._createAssembly(i, t, o).then((function (e) {
                    if (r = e, n.opts.importFromUploadURLs) return n._reserveFiles(e, i)
                })).then((function () {
                    return i.forEach((function (e) {
                        var t = n.uppy.getFile(e);
                        n.uppy.emit("preprocess-complete", t)
                    })), r
                })).catch((function (e) {
                    throw i.forEach((function (t) {
                        var r = n.uppy.getFile(t);
                        n.uppy.emit("preprocess-complete", r), n.uppy.emit("upload-error", r, e)
                    })), e
                }))
            },
                o = this.getPluginState().uploadsAssemblies;
            this.setPluginState({
                uploadsAssemblies: Ap({}, o, (r = {}, r[t] = [], r))
            });
            var s = e.map((function (e) {
                return n.uppy.getFile(e)
            }));
            return new bp(s, this.opts).build().then((function (r) {
                return Promise.all(r.map(i)).then((function (r) {
                    var i = r.map((function (e) {
                        return e.status.assembly_id
                    }));
                    n._createAssemblyWatcher(i, e, t), r.map((function (e) {
                        return n._connectAssembly(e)
                    }))
                }))
            }), (function (t) {
                throw e.forEach((function (e) {
                    var r = n.uppy.getFile(e);
                    n.uppy.emit("preprocess-complete", r), n.uppy.emit("upload-error", r, t)
                })), t
            }))
        }, i._afterUpload = function (e, t) {
            var r = this,
                n = e.map((function (e) {
                    return r.uppy.getFile(e)
                }));
            e = n.filter((function (e) {
                return !e.error
            })).map((function (e) {
                return e.id
            }));
            var i = this.getPluginState();
            if (this.restored) return this.restored.then((function () {
                return r._afterUpload(e, t)
            }));
            var o = i.uploadsAssemblies[t];
            if (!this._shouldWaitAfterUpload()) {
                o.forEach((function (e) {
                    r.activeAssemblies[e].close(), delete r.activeAssemblies[e]
                }));
                var s = o.map((function (e) {
                    return r.getAssembly(e)
                }));
                return this.uppy.addResultData(t, {
                    transloadit: s
                }), Promise.resolve()
            }
            return 0 === o.length ? (this.uppy.addResultData(t, {
                transloadit: []
            }), Promise.resolve()) : (n.filter((function (e) {
                return !k(r.completedFiles, e.id)
            })).forEach((function (e) {
                r.uppy.emit("postprocess-progress", e, {
                    mode: "indeterminate",
                    message: r.i18n("encoding")
                })
            })), this.assemblyWatchers[t].promise.then((function () {
                var e = o.map((function (e) {
                    return r.getAssembly(e)
                })),
                    n = Ap({}, r.getPluginState().uploadsAssemblies);
                delete n[t], r.setPluginState({
                    uploadsAssemblies: n
                }), r.uppy.addResultData(t, {
                    transloadit: e
                })
            })))
        }, i._onError = function (e, t) {
            var r = this;
            void 0 === e && (e = null), this.getPluginState().uploadsAssemblies[t].forEach((function (e) {
                r.activeAssemblies[e] && r.activeAssemblies[e].close()
            }))
        }, i._onTusError = function (e) {
            if (e && /^tus: /.test(e.message)) {
                var t = e.originalRequest ? e.originalRequest.getUnderlyingObject() : null,
                    r = t && t.responseURL ? t.responseURL : null;
                this.client.submitError(e, {
                    url: r,
                    type: "TUS_ERROR"
                }).then((function (e) { }))
            }
        }, i.install = function () {
            this.uppy.addPreProcessor(this._prepareUpload), this.uppy.addPostProcessor(this._afterUpload), this.uppy.on("error", this._onError), this.uppy.on("cancel-all", this._onCancelAll), this.uppy.on("upload-error", this._onTusError), this.opts.importFromUploadURLs ? this.uppy.on("upload-success", this._onFileUploadURLAvailable) : this.uppy.use(Ku, {
                storeFingerprintForResuming: !1,
                resume: !1,
                useFastRemoteRetry: !1,
                metaFields: ["assembly_url", "filename", "fieldname"],
                limit: this.opts.limit
            }), this.uppy.on("restore:get-data", this._getPersistentData), this.uppy.on("restored", this._onRestored), this.setPluginState({
                assemblies: {},
                uploadsAssemblies: {},
                files: {},
                results: []
            });
            var e = this.uppy.getState().capabilities;
            this.uppy.setState({
                capabilities: Ap({}, e, {
                    individualCancellation: !1
                })
            })
        }, i.uninstall = function () {
            this.uppy.removePreProcessor(this._prepareUpload), this.uppy.removePostProcessor(this._afterUpload), this.uppy.off("error", this._onError), this.opts.importFromUploadURLs && this.uppy.off("upload-success", this._onFileUploadURLAvailable);
            var e = this.uppy.getState().capabilities;
            this.uppy.setState({
                capabilities: Ap({}, e, {
                    individualCancellation: !0
                })
            })
        }, i.getAssembly = function (e) {
            return this.getPluginState().assemblies[e]
        }, i.getAssemblyFiles = function (e) {
            return this.uppy.getFiles().filter((function (t) {
                return t && t.transloadit && t.transloadit.assembly === e
            }))
        }, n
    }(le.Plugin), kp.VERSION = "1.6.9", (Ep = Pp).COMPANION = Tp, Ep.UPPY_SERVER = Tp, Ep.COMPANION_PATTERN = /\.transloadit\.com$/;
    var Ip = Me.Provider,
        jp = Me.RequestClient,
        Lp = Me.Socket;

    function Mp(e, t) {
        return t || (t = new Error("Upload error")), "string" == typeof t && (t = new Error(t)), t instanceof Error || (t = Bp(new Error("Upload error"), {
            data: t
        })), vs(e) ? t = new Te(t, e) : (t.request = e, t)
    }

    function Np(e) {
        return e.data.slice(0, e.data.size, e.meta.type)
    }
    var zp = (Rp = Up = function (e) {
        var t, r;

        function n(t, r) {
            var n;
            (n = e.call(this, t, r) || this).type = "uploader", n.id = n.opts.id || "XHRUpload", n.title = "XHRUpload", n.defaultLocale = {
                strings: {
                    timedOut: "Upload stalled for %{seconds} seconds, aborting."
                }
            };
            var i = {
                formData: !0,
                fieldName: "files[]",
                method: "post",
                metaFields: null,
                responseUrlFieldName: "url",
                bundle: !1,
                headers: {},
                timeout: 3e4,
                limit: 0,
                withCredentials: !1,
                responseType: "",
                getResponseData: function (e, t) {
                    var r = {};
                    try {
                        r = JSON.parse(e)
                    } catch (yc) {
                        console.log(yc)
                    }
                    return r
                },
                getResponseError: function (e, t) {
                    var r = new Error("Upload error");
                    return vs(t) && (r = new Te(r, t)), r
                },
                validateStatus: function (e, t, r) {
                    return e >= 200 && e < 300
                }
            };
            if (n.opts = Bp({}, i, r), n.i18nInit(), n.handleUpload = n.handleUpload.bind(function (e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(n)), n.opts.__queue instanceof cs ? n.requests = n.opts.__queue : n.requests = new cs(n.opts.limit), n.opts.bundle && !n.opts.formData) throw new Error("`opts.formData` must be true when `opts.bundle` is enabled.");
            return n.uploaderEvents = Object.create(null), n
        }
        r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
        var i = n.prototype;
        return i.setOptions = function (t) {
            e.prototype.setOptions.call(this, t), this.i18nInit()
        }, i.i18nInit = function () {
            this.translator = new E([this.defaultLocale, this.uppy.locale, this.opts.locale]), this.i18n = this.translator.translate.bind(this.translator), this.setPluginState()
        }, i.getOptions = function (e) {
            var t = this.uppy.getState().xhrUpload,
                r = Bp({}, this.opts, t || {}, e.xhrUpload || {}, {
                    headers: {}
                });
            return Bp(r.headers, this.opts.headers), t && Bp(r.headers, t.headers), e.xhrUpload && Bp(r.headers, e.xhrUpload.headers), r
        }, i.addMetadata = function (e, t, r) {
            (Array.isArray(r.metaFields) ? r.metaFields : Object.keys(t)).forEach((function (r) {
                e.append(r, t[r])
            }))
        }, i.createFormDataUpload = function (e, t) {
            var r = new FormData;
            this.addMetadata(r, e.meta, t);
            var n = Np(e);
            return e.name ? r.append(t.fieldName, n, e.meta.name) : r.append(t.fieldName, n), r
        }, i.createBundledUpload = function (e, t) {
            var r = this,
                n = new FormData,
                i = this.uppy.getState().meta;
            return this.addMetadata(n, i, t), e.forEach((function (e) {
                var t = r.getOptions(e),
                    i = Np(e);
                e.name ? n.append(t.fieldName, i, e.name) : n.append(t.fieldName, i)
            })), n
        }, i.createBareUpload = function (e, t) {
            return e.data
        }, i.upload = function (e, t, r) {
            var n = this,
                i = this.getOptions(e);
            return this.uppy.log("uploading " + t + " of " + r), new Promise((function (t, r) {
                n.uppy.emit("upload-started", e);
                var o = i.formData ? n.createFormDataUpload(e, i) : n.createBareUpload(e, i),
                    s = new XMLHttpRequest;
                n.uploaderEvents[e.id] = new ys(n.uppy);
                var a = new gs(i.timeout, (function () {
                    s.abort(), l.done();
                    var t = new Error(n.i18n("timedOut", {
                        seconds: Math.ceil(i.timeout / 1e3)
                    }));
                    n.uppy.emit("upload-error", e, t), r(t)
                })),
                    u = I();
                s.upload.addEventListener("loadstart", (function (e) {
                    n.uppy.log("[XHRUpload] " + u + " started")
                })), s.upload.addEventListener("progress", (function (t) {
                    n.uppy.log("[XHRUpload] " + u + " progress: " + t.loaded + " / " + t.total), a.progress(), t.lengthComputable && n.uppy.emit("upload-progress", e, {
                        uploader: n,
                        bytesUploaded: t.loaded,
                        bytesTotal: t.total
                    })
                })), s.addEventListener("load", (function (o) {
                    if (n.uppy.log("[XHRUpload] " + u + " finished"), a.done(), l.done(), n.uploaderEvents[e.id] && (n.uploaderEvents[e.id].remove(), n.uploaderEvents[e.id] = null), i.validateStatus(o.target.status, s.responseText, s)) {
                        var c = i.getResponseData(s.responseText, s),
                            p = c[i.responseUrlFieldName],
                            d = {
                                status: o.target.status,
                                body: c,
                                uploadURL: p
                            };
                        return n.uppy.emit("upload-success", e, d), p && n.uppy.log("Download " + e.name + " from " + p), t(e)
                    }
                    var h = i.getResponseData(s.responseText, s),
                        f = Mp(s, i.getResponseError(s.responseText, s)),
                        y = {
                            status: o.target.status,
                            body: h
                        };
                    return n.uppy.emit("upload-error", e, f, y), r(f)
                })), s.addEventListener("error", (function (t) {
                    n.uppy.log("[XHRUpload] " + u + " errored"), a.done(), l.done(), n.uploaderEvents[e.id] && (n.uploaderEvents[e.id].remove(), n.uploaderEvents[e.id] = null);
                    var o = Mp(s, i.getResponseError(s.responseText, s));
                    return n.uppy.emit("upload-error", e, o), r(o)
                })), s.open(i.method.toUpperCase(), i.endpoint, !0), s.withCredentials = i.withCredentials, "" !== i.responseType && (s.responseType = i.responseType), Object.keys(i.headers).forEach((function (e) {
                    s.setRequestHeader(e, i.headers[e])
                }));
                var l = n.requests.run((function () {
                    return s.send(o),
                        function () {
                            a.done(), s.abort()
                        }
                }));
                n.onFileRemove(e.id, (function () {
                    l.abort(), r(new Error("File removed"))
                })), n.onCancelAll(e.id, (function () {
                    l.abort(), r(new Error("Upload cancelled"))
                }))
            }))
        }, i.uploadRemote = function (e, t, r) {
            var n = this,
                i = this.getOptions(e);
            return new Promise((function (t, r) {
                n.uppy.emit("upload-started", e);
                var o = {};
                (Array.isArray(i.metaFields) ? i.metaFields : Object.keys(e.meta)).forEach((function (t) {
                    o[t] = e.meta[t]
                })), new (e.remote.providerOptions.provider ? Ip : jp)(n.uppy, e.remote.providerOptions).post(e.remote.url, Bp({}, e.remote.body, {
                    endpoint: i.endpoint,
                    size: e.data.size,
                    fieldname: i.fieldName,
                    metadata: o,
                    httpMethod: i.method,
                    useFormData: i.formData,
                    headers: i.headers
                })).then((function (o) {
                    var s = o.token,
                        a = fs(e.remote.companionUrl),
                        u = new Lp({
                            target: a + "/api/" + s,
                            autoOpen: !1
                        });
                    n.uploaderEvents[e.id] = new ys(n.uppy), n.onFileRemove(e.id, (function () {
                        u.send("pause", {}), l.abort(), t("upload " + e.id + " was removed")
                    })), n.onCancelAll(e.id, (function () {
                        u.send("pause", {}), l.abort(), t("upload " + e.id + " was canceled")
                    })), n.onRetry(e.id, (function () {
                        u.send("pause", {}), u.send("resume", {})
                    })), n.onRetryAll(e.id, (function () {
                        u.send("pause", {}), u.send("resume", {})
                    })), u.on("progress", (function (t) {
                        return hs(n, t, e)
                    })), u.on("success", (function (r) {
                        var o = i.getResponseData(r.response.responseText, r.response),
                            s = o[i.responseUrlFieldName],
                            a = {
                                status: r.response.status,
                                body: o,
                                uploadURL: s
                            };
                        return n.uppy.emit("upload-success", e, a), l.done(), n.uploaderEvents[e.id] && (n.uploaderEvents[e.id].remove(), n.uploaderEvents[e.id] = null), t()
                    })), u.on("error", (function (t) {
                        var o = t.response,
                            s = o ? i.getResponseError(o.responseText, o) : Bp(new Error(t.error.message), {
                                cause: t.error
                            });
                        n.uppy.emit("upload-error", e, s), l.done(), n.uploaderEvents[e.id] && (n.uploaderEvents[e.id].remove(), n.uploaderEvents[e.id] = null), r(s)
                    }));
                    var l = n.requests.run((function () {
                        return u.open(), e.isPaused && u.send("pause", {}),
                            function () {
                                return u.close()
                            }
                    }))
                })).catch((function (t) {
                    n.uppy.emit("upload-error", e, t), r(t)
                }))
            }))
        }, i.uploadBundle = function (e) {
            var t = this;
            return new Promise((function (r, n) {
                var i = t.opts.endpoint,
                    o = t.opts.method,
                    s = t.uppy.getState().xhrUpload,
                    a = t.createBundledUpload(e, Bp({}, t.opts, s || {})),
                    u = new XMLHttpRequest,
                    l = new gs(t.opts.timeout, (function () {
                        u.abort();
                        var e = new Error(t.i18n("timedOut", {
                            seconds: Math.ceil(t.opts.timeout / 1e3)
                        }));
                        c(e), n(e)
                    })),
                    c = function (r) {
                        e.forEach((function (e) {
                            t.uppy.emit("upload-error", e, r)
                        }))
                    };
                u.upload.addEventListener("loadstart", (function (e) {
                    t.uppy.log("[XHRUpload] started uploading bundle"), l.progress()
                })), u.upload.addEventListener("progress", (function (r) {
                    l.progress(), r.lengthComputable && e.forEach((function (e) {
                        t.uppy.emit("upload-progress", e, {
                            uploader: t,
                            bytesUploaded: r.loaded / r.total * e.size,
                            bytesTotal: e.size
                        })
                    }))
                })), u.addEventListener("load", (function (i) {
                    if (l.done(), t.opts.validateStatus(i.target.status, u.responseText, u)) {
                        var o = t.opts.getResponseData(u.responseText, u),
                            s = {
                                status: i.target.status,
                                body: o
                            };
                        return e.forEach((function (e) {
                            t.uppy.emit("upload-success", e, s)
                        })), r()
                    }
                    var a = t.opts.getResponseError(u.responseText, u) || new Error("Upload error");
                    return a.request = u, c(a), n(a)
                })), u.addEventListener("error", (function (e) {
                    l.done();
                    var r = t.opts.getResponseError(u.responseText, u) || new Error("Upload error");
                    return c(r), n(r)
                })), t.uppy.on("cancel-all", (function () {
                    l.done(), u.abort()
                })), u.open(o.toUpperCase(), i, !0), u.withCredentials = t.opts.withCredentials, "" !== t.opts.responseType && (u.responseType = t.opts.responseType), Object.keys(t.opts.headers).forEach((function (e) {
                    u.setRequestHeader(e, t.opts.headers[e])
                })), u.send(a), e.forEach((function (e) {
                    t.uppy.emit("upload-started", e)
                }))
            }))
        }, i.uploadFiles = function (e) {
            var t = this,
                r = e.map((function (r, n) {
                    var i = parseInt(n, 10) + 1,
                        o = e.length;
                    return r.error ? Promise.reject(new Error(r.error)) : r.isRemote ? t.uploadRemote(r, i, o) : t.upload(r, i, o)
                }));
            return ps(r)
        }, i.onFileRemove = function (e, t) {
            this.uploaderEvents[e].on("file-removed", (function (r) {
                e === r.id && t(r.id)
            }))
        }, i.onRetry = function (e, t) {
            this.uploaderEvents[e].on("upload-retry", (function (r) {
                e === r && t()
            }))
        }, i.onRetryAll = function (e, t) {
            var r = this;
            this.uploaderEvents[e].on("retry-all", (function (n) {
                r.uppy.getFile(e) && t()
            }))
        }, i.onCancelAll = function (e, t) {
            var r = this;
            this.uploaderEvents[e].on("cancel-all", (function () {
                r.uppy.getFile(e) && t()
            }))
        }, i.handleUpload = function (e) {
            var t = this;
            if (0 === e.length) return this.uppy.log("[XHRUpload] No files to upload!"), Promise.resolve();
            0 !== this.opts.limit || this.opts.__queue || this.uppy.log("[XHRUpload] When uploading multiple files at once, consider setting the `limit` option (to `10` for example), to limit the number of concurrent uploads, which helps prevent memory and network issues: https://uppy.io/docs/xhr-upload/#limit-0", "warning"), this.uppy.log("[XHRUpload] Uploading...");
            var r = e.map((function (e) {
                return t.uppy.getFile(e)
            }));
            if (this.opts.bundle) {
                if (r.some((function (e) {
                    return e.isRemote
                }))) throw new Error("Can\u2019t upload remote files when bundle: true option is set");
                return this.uploadBundle(r)
            }
            return this.uploadFiles(r).then((function () {
                return null
            }))
        }, i.install = function () {
            if (this.opts.bundle) {
                var e = this.uppy.getState().capabilities;
                this.uppy.setState({
                    capabilities: Bp({}, e, {
                        individualCancellation: !1
                    })
                })
            }
            this.uppy.addUploader(this.handleUpload)
        }, i.uninstall = function () {
            if (this.opts.bundle) {
                var e = this.uppy.getState().capabilities;
                this.uppy.setState({
                    capabilities: Bp({}, e, {
                        individualCancellation: !0
                    })
                })
            }
            this.uppy.removeUploader(this.handleUpload)
        }, n
    }(le.Plugin), Up.VERSION = "1.6.4", Rp),
        qp = {
            __esModule: !0
        };
    qp.default = Jp, qp.getFieldData = Qp;
    var Hp, Vp, Wp = {
        "[object HTMLCollection]": !0,
        "[object NodeList]": !0,
        "[object RadioNodeList]": !0
    },
        Xp = {
            button: !0,
            fieldset: !0,
            reset: !0,
            submit: !0
        },
        Gp = {
            checkbox: !0,
            radio: !0
        },
        Kp = /^\s+|\s+$/g,
        $p = Array.prototype.slice,
        Yp = Object.prototype.toString;

    function Jp(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
            trim: !1
        };
        if (!e) throw new Error("A form is required by getFormData, was given form=" + e);
        for (var r = {}, n = void 0, i = [], o = {}, s = 0, a = e.elements.length; s < a; s++) {
            var u = e.elements[s];
            Xp[u.type] || u.disabled || (n = u.name || u.id) && !o[n] && (i.push(n), o[n] = !0)
        }
        for (var l = 0, c = i.length; l < c; l++) {
            var p = Qp(e, n = i[l], t);
            null != p && (r[n] = p)
        }
        return r
    }

    function Qp(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {
            trim: !1
        };
        if (!e) throw new Error("A form is required by getFieldData, was given form=" + e);
        if (!t && "[object String]" !== Yp.call(t)) throw new Error("A field name is required by getFieldData, was given fieldName=" + t);
        var n = e.elements[t];
        if (!n || n.disabled) return null;
        if (!Wp[Yp.call(n)]) return Zp(n, r.trim);
        for (var i = [], o = !0, s = 0, a = n.length; s < a; s++)
            if (!n[s].disabled) {
                o && "radio" !== n[s].type && (o = !1);
                var u = Zp(n[s], r.trim);
                null != u && (i = i.concat(u))
            } return o && 1 === i.length ? i[0] : i.length > 0 ? i : null
    }

    function Zp(e, t) {
        var r = null,
            n = e.type;
        if ("select-one" === n) return e.options.length && (r = e.options[e.selectedIndex].value), r;
        if ("select-multiple" === n) {
            r = [];
            for (var i = 0, o = e.options.length; i < o; i++) e.options[i].selected && r.push(e.options[i].value);
            return 0 === r.length && (r = null), r
        }
        return "file" === n && "files" in e ? (e.multiple ? 0 === (r = $p.call(e.files)).length && (r = null) : r = e.files[0], r) : (Gp[n] ? e.checked && (r = e.value) : r = t ? e.value.replace(Kp, "") : e.value, r)
    }

    function ed() {
        return (ed = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function td(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    Jp.getFieldData = Qp;
    var rd = le.Plugin,
        nd = qp.default || qp,
        id = (Vp = Hp = function (e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).type = "acquirer", n.id = n.opts.id || "Form", n.title = "Form", n.opts = ed({}, {
                    target: null,
                    resultName: "uppyResult",
                    getMetaFromForm: !0,
                    addResultToForm: !0,
                    multipleResults: !1,
                    submitOnSuccess: !1,
                    triggerUploadOnSubmit: !1
                }, r), n.handleFormSubmit = n.handleFormSubmit.bind(td(n)), n.handleUploadStart = n.handleUploadStart.bind(td(n)), n.handleSuccess = n.handleSuccess.bind(td(n)), n.addResultToForm = n.addResultToForm.bind(td(n)), n.getMetaFromForm = n.getMetaFromForm.bind(td(n)), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var i = n.prototype;
            return i.handleUploadStart = function () {
                this.opts.getMetaFromForm && this.getMetaFromForm()
            }, i.handleSuccess = function (e) {
                this.opts.addResultToForm && this.addResultToForm(e), this.opts.submitOnSuccess && this.form.submit()
            }, i.handleFormSubmit = function (e) {
                var t = this;
                if (this.opts.triggerUploadOnSubmit) {
                    e.preventDefault();
                    var r = Rn(e.target.elements),
                        n = [];
                    r.forEach((function (e) {
                        ("BUTTON" === e.tagName || "INPUT" === e.tagName && "submit" === e.type) && !e.disabled && (e.disabled = !0, n.push(e))
                    })), this.uppy.upload().then((function () {
                        n.forEach((function (e) {
                            e.disabled = !1
                        }))
                    }), (function (e) {
                        return n.forEach((function (e) {
                            e.disabled = !1
                        })), Promise.reject(e)
                    })).catch((function (e) {
                        t.uppy.log(e.stack || e.message || e)
                    }))
                }
            }, i.addResultToForm = function (e) {
                this.uppy.log("[Form] Adding result to the original form:"), this.uppy.log(e);
                var t = this.form.querySelector('[name="' + this.opts.resultName + '"]');
                if (t)
                    if (this.opts.multipleResults) {
                        var r;
                        try {
                            r = JSON.parse(t.value)
                        } catch (yc) { }
                        Array.isArray(r) || (r = []), r.push(e), t.value = JSON.stringify(r)
                    } else t.value = JSON.stringify(e);
                else (t = document.createElement("input")).name = this.opts.resultName, t.type = "hidden", this.opts.multipleResults ? t.value = JSON.stringify([e]) : t.value = JSON.stringify(e), this.form.appendChild(t)
            }, i.getMetaFromForm = function () {
                var e = nd(this.form);
                delete e[this.opts.resultName], this.uppy.setMeta(e)
            }, i.install = function () {
                this.form = ae(this.opts.target), this.form && "FORM" === this.form.nodeName ? (this.form.addEventListener("submit", this.handleFormSubmit), this.uppy.on("upload", this.handleUploadStart), this.uppy.on("complete", this.handleSuccess)) : this.uppy.log("Form plugin requires a <form> target element passed in options to operate, none was found", "error")
            }, i.uninstall = function () {
                this.form.removeEventListener("submit", this.handleFormSubmit), this.uppy.off("upload", this.handleUploadStart), this.uppy.off("complete", this.handleSuccess)
            }, n
        }(rd), Hp.VERSION = "1.3.20", Vp),
        od = {},
        sd = "undefined" != typeof navigator && "serviceWorker" in navigator,
        ad = function () {
            function e(e) {
                this.ready = new Promise((function (e, t) {
                    sd ? navigator.serviceWorker.controller ? e() : navigator.serviceWorker.addEventListener("controllerchange", (function () {
                        e()
                    })) : t(new Error("Unsupported"))
                })), this.name = e.storeName
            }
            var t = e.prototype;
            return t.list = function () {
                var e = this,
                    t = {},
                    r = new Promise((function (e, r) {
                        t.resolve = e, t.reject = r
                    }));
                console.log("Loading stored blobs from Service Worker");
                var n = function r(n) {
                    if (n.data.store === e.name) switch (n.data.type) {
                        case "uppy/ALL_FILES":
                            t.resolve(n.data.files), navigator.serviceWorker.removeEventListener("message", r)
                    }
                };
                return this.ready.then((function () {
                    navigator.serviceWorker.addEventListener("message", n), navigator.serviceWorker.controller.postMessage({
                        type: "uppy/GET_FILES",
                        store: e.name
                    })
                })), r
            }, t.put = function (e) {
                var t = this;
                return this.ready.then((function () {
                    navigator.serviceWorker.controller.postMessage({
                        type: "uppy/ADD_FILE",
                        store: t.name,
                        file: e
                    })
                }))
            }, t.delete = function (e) {
                var t = this;
                return this.ready.then((function () {
                    navigator.serviceWorker.controller.postMessage({
                        type: "uppy/REMOVE_FILE",
                        store: t.name,
                        fileID: e
                    })
                }))
            }, e
        }();
    ad.isSupported = sd, od = ad;
    var ud = {};

    function ld() {
        return (ld = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var cd = "undefined" != typeof window && (window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB),
        pd = !!cd;

    function dd(e) {
        var t = cd.open(e, 3);
        return new Promise((function (e, r) {
            t.onupgradeneeded = function (t) {
                var r = t.target.result,
                    n = t.currentTarget.transaction;
                if (t.oldVersion < 2 && r.createObjectStore("files", {
                    keyPath: "id"
                }).createIndex("store", "store", {
                    unique: !1
                }), t.oldVersion < 3) {
                    var i = n.objectStore("files");
                    i.createIndex("expires", "expires", {
                        unique: !1
                    }), i.openCursor().onsuccess = function (e) {
                        var t = e.target.result;
                        if (t) {
                            var r = t.value;
                            r.expires = Date.now() + 864e5, t.update(r)
                        }
                    }
                }
                n.oncomplete = function () {
                    e(r)
                }
            }, t.onsuccess = function (t) {
                e(t.target.result)
            }, t.onerror = r
        }))
    }

    function hd(e) {
        return new Promise((function (t, r) {
            e.onsuccess = function (e) {
                t(e.target.result)
            }, e.onerror = r
        }))
    }
    var fd = !1,
        yd = function () {
            function e(t) {
                var r = this;
                this.opts = ld({
                    dbName: "uppy-blobs",
                    storeName: "default",
                    expires: 864e5,
                    maxFileSize: 10485760,
                    maxTotalSize: 314572800
                }, t), this.name = this.opts.storeName;
                var n = function () {
                    return dd(r.opts.dbName)
                };
                fd ? this.ready = n() : (fd = !0, this.ready = e.cleanup().then(n, n))
            }
            var t = e.prototype;
            return t.key = function (e) {
                return this.name + "!" + e
            }, t.list = function () {
                var e = this;
                return this.ready.then((function (t) {
                    return hd(t.transaction(["files"], "readonly").objectStore("files").index("store").getAll(IDBKeyRange.only(e.name)))
                })).then((function (e) {
                    var t = {};
                    return e.forEach((function (e) {
                        t[e.fileID] = e.data
                    })), t
                }))
            }, t.get = function (e) {
                var t = this;
                return this.ready.then((function (r) {
                    return hd(r.transaction(["files"], "readonly").objectStore("files").get(t.key(e)))
                })).then((function (e) {
                    return {
                        id: e.data.fileID,
                        data: e.data.data
                    }
                }))
            }, t.getSize = function () {
                var e = this;
                return this.ready.then((function (t) {
                    var r = t.transaction(["files"], "readonly").objectStore("files").index("store").openCursor(IDBKeyRange.only(e.name));
                    return new Promise((function (e, t) {
                        var n = 0;
                        r.onsuccess = function (t) {
                            var r = t.target.result;
                            r ? (n += r.value.data.size, r.continue()) : e(n)
                        }, r.onerror = function () {
                            t(new Error("Could not retrieve stored blobs size"))
                        }
                    }))
                }))
            }, t.put = function (e) {
                var t = this;
                return e.data.size > this.opts.maxFileSize ? Promise.reject(new Error("File is too big to store.")) : this.getSize().then((function (e) {
                    return e > t.opts.maxTotalSize ? Promise.reject(new Error("No space left")) : t.ready
                })).then((function (r) {
                    return hd(r.transaction(["files"], "readwrite").objectStore("files").add({
                        id: t.key(e.id),
                        fileID: e.id,
                        store: t.name,
                        expires: Date.now() + t.opts.expires,
                        data: e.data
                    }))
                }))
            }, t.delete = function (e) {
                var t = this;
                return this.ready.then((function (r) {
                    return hd(r.transaction(["files"], "readwrite").objectStore("files").delete(t.key(e)))
                }))
            }, e.cleanup = function () {
                return dd("uppy-blobs").then((function (e) {
                    var t = e.transaction(["files"], "readwrite").objectStore("files").index("expires").openCursor(IDBKeyRange.upperBound(Date.now()));
                    return new Promise((function (r, n) {
                        t.onsuccess = function (t) {
                            var n = t.target.result;
                            if (n) {
                                var i = n.value;
                                console.log("[IndexedDBStore] Deleting record", i.fileID, "of size", V(i.data.size), "- expired on", new Date(i.expires)), n.delete(), n.continue()
                            } else r(e)
                        }, t.onerror = n
                    }))
                })).then((function (e) {
                    e.close()
                }))
            }, e
        }();

    function gd() {
        return (gd = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function vd(e) {
        try {
            return JSON.parse(e)
        } catch (yc) {
            return null
        }
    }
    yd.isSupported = pd, ud = yd;
    var md, bd, wd = !1,
        _d = function () {
            function e(t) {
                this.opts = gd({
                    expires: 864e5
                }, t), this.name = "uppyState:" + t.storeName, wd || (wd = !0, e.cleanup())
            }
            var t = e.prototype;
            return t.load = function () {
                var e = localStorage.getItem(this.name);
                if (!e) return null;
                var t = vd(e);
                return t ? t.metadata ? t.metadata : (this.save(t), t) : null
            }, t.save = function (e) {
                var t = Date.now() + this.opts.expires,
                    r = JSON.stringify({
                        metadata: e,
                        expires: t
                    });
                localStorage.setItem(this.name, r)
            }, e.cleanup = function () {
                var e = function () {
                    for (var e = [], t = 0; t < localStorage.length; t++) {
                        var r = localStorage.key(t);
                        /^uppyState:/.test(r) && e.push(r.slice("uppyState:".length))
                    }
                    return e
                }(),
                    t = Date.now();
                e.forEach((function (e) {
                    var r = localStorage.getItem("uppyState:" + e);
                    if (!r) return null;
                    var n = vd(r);
                    if (!n) return null;
                    n.expires && n.expires < t && localStorage.removeItem("uppyState:" + e)
                }))
            }, e
        }();

    function Sd() {
        return (Sd = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function kd(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var Pd, Cd, Ed = (bd = md = function (e) {
        var t, r;

        function n(t, r) {
            var n;
            return (n = e.call(this, t, r) || this).type = "debugger", n.id = n.opts.id || "GoldenRetriever", n.title = "Golden Retriever", n.opts = Sd({}, {
                expires: 864e5,
                serviceWorker: !1
            }, r), n.MetaDataStore = new _d({
                expires: n.opts.expires,
                storeName: t.getID()
            }), n.ServiceWorkerStore = null, n.opts.serviceWorker && (n.ServiceWorkerStore = new od({
                storeName: t.getID()
            })), n.IndexedDBStore = new ud(Sd({
                expires: n.opts.expires
            }, n.opts.indexedDB || {}, {
                storeName: t.getID()
            })), n.saveFilesStateToLocalStorage = n.saveFilesStateToLocalStorage.bind(kd(n)), n.loadFilesStateFromLocalStorage = n.loadFilesStateFromLocalStorage.bind(kd(n)), n.loadFileBlobsFromServiceWorker = n.loadFileBlobsFromServiceWorker.bind(kd(n)), n.loadFileBlobsFromIndexedDB = n.loadFileBlobsFromIndexedDB.bind(kd(n)), n.onBlobsLoaded = n.onBlobsLoaded.bind(kd(n)), n
        }
        r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
        var i = n.prototype;
        return i.loadFilesStateFromLocalStorage = function () {
            var e = this.MetaDataStore.load();
            e && (this.uppy.log("[GoldenRetriever] Recovered some state from Local Storage"), this.uppy.setState({
                currentUploads: e.currentUploads || {},
                files: e.files || {}
            }), this.savedPluginData = e.pluginData)
        }, i.getWaitingFiles = function () {
            var e = {};
            return this.uppy.getFiles().forEach((function (t) {
                t.progress && t.progress.uploadStarted || (e[t.id] = t)
            })), e
        }, i.getUploadingFiles = function () {
            var e = this,
                t = {},
                r = this.uppy.getState().currentUploads;
            return r && Object.keys(r).forEach((function (n) {
                r[n].fileIDs.forEach((function (r) {
                    t[r] = e.uppy.getFile(r)
                }))
            })), t
        }, i.saveFilesStateToLocalStorage = function () {
            var e = Sd(this.getWaitingFiles(), this.getUploadingFiles()),
                t = {};
            this.uppy.emit("restore:get-data", (function (e) {
                Sd(t, e)
            }));
            var r = this.uppy.getState().currentUploads;
            this.MetaDataStore.save({
                currentUploads: r,
                files: e,
                pluginData: t
            })
        }, i.loadFileBlobsFromServiceWorker = function () {
            var e = this;
            this.ServiceWorkerStore.list().then((function (t) {
                var r = Object.keys(t).length;
                return r === e.uppy.getFiles().length ? (e.uppy.log("[GoldenRetriever] Successfully recovered " + r + " blobs from Service Worker!"), e.uppy.info("Successfully recovered " + r + " files", "success", 3e3), e.onBlobsLoaded(t)) : (e.uppy.log("[GoldenRetriever] No blobs found in Service Worker, trying IndexedDB now..."), e.loadFileBlobsFromIndexedDB())
            })).catch((function (t) {
                e.uppy.log("[GoldenRetriever] Failed to recover blobs from Service Worker", "warning"), e.uppy.log(t)
            }))
        }, i.loadFileBlobsFromIndexedDB = function () {
            var e = this;
            this.IndexedDBStore.list().then((function (t) {
                var r = Object.keys(t).length;
                if (r > 0) return e.uppy.log("[GoldenRetriever] Successfully recovered " + r + " blobs from IndexedDB!"), e.uppy.info("Successfully recovered " + r + " files", "success", 3e3), e.onBlobsLoaded(t);
                e.uppy.log("[GoldenRetriever] No blobs found in IndexedDB")
            })).catch((function (t) {
                e.uppy.log("[GoldenRetriever] Failed to recover blobs from IndexedDB", "warning"), e.uppy.log(t)
            }))
        }, i.onBlobsLoaded = function (e) {
            var t = this,
                r = [],
                n = Sd({}, this.uppy.getState().files);
            Object.keys(e).forEach((function (i) {
                var o = t.uppy.getFile(i);
                if (o) {
                    var s = Sd({}, o, {
                        data: e[i],
                        isRestored: !0
                    });
                    n[i] = s
                } else r.push(i)
            })), this.uppy.setState({
                files: n
            }), this.uppy.emit("restored", this.savedPluginData), r.length && this.deleteBlobs(r).then((function () {
                t.uppy.log("[GoldenRetriever] Cleaned up " + r.length + " old files")
            })).catch((function (e) {
                t.uppy.log("[GoldenRetriever] Could not clean up " + r.length + " old files", "warning"), t.uppy.log(e)
            }))
        }, i.deleteBlobs = function (e) {
            var t = this,
                r = [];
            return e.forEach((function (e) {
                t.ServiceWorkerStore && r.push(t.ServiceWorkerStore.delete(e)), t.IndexedDBStore && r.push(t.IndexedDBStore.delete(e))
            })), Promise.all(r)
        }, i.install = function () {
            var e = this;
            this.loadFilesStateFromLocalStorage(), this.uppy.getFiles().length > 0 ? this.ServiceWorkerStore ? (this.uppy.log("[GoldenRetriever] Attempting to load files from Service Worker..."), this.loadFileBlobsFromServiceWorker()) : (this.uppy.log("[GoldenRetriever] Attempting to load files from Indexed DB..."), this.loadFileBlobsFromIndexedDB()) : (this.uppy.log("[GoldenRetriever] No files need to be loaded, only restoring processing state..."), this.onBlobsLoaded([])), this.uppy.on("file-added", (function (t) {
                t.isRemote || (e.ServiceWorkerStore && e.ServiceWorkerStore.put(t).catch((function (t) {
                    e.uppy.log("[GoldenRetriever] Could not store file", "warning"), e.uppy.log(t)
                })), e.IndexedDBStore.put(t).catch((function (t) {
                    e.uppy.log("[GoldenRetriever] Could not store file", "warning"), e.uppy.log(t)
                })))
            })), this.uppy.on("file-removed", (function (t) {
                e.ServiceWorkerStore && e.ServiceWorkerStore.delete(t.id).catch((function (t) {
                    e.uppy.log("[GoldenRetriever] Failed to remove file", "warning"), e.uppy.log(t)
                })), e.IndexedDBStore.delete(t.id).catch((function (t) {
                    e.uppy.log("[GoldenRetriever] Failed to remove file", "warning"), e.uppy.log(t)
                }))
            })), this.uppy.on("complete", (function (t) {
                var r = t.successful,
                    n = r.map((function (e) {
                        return e.id
                    }));
                e.deleteBlobs(n).then((function () {
                    e.uppy.log("[GoldenRetriever] Removed " + r.length + " files that finished uploading")
                })).catch((function (t) {
                    e.uppy.log("[GoldenRetriever] Could not remove " + r.length + " files that finished uploading", "warning"), e.uppy.log(t)
                }))
            })), this.uppy.on("state-update", this.saveFilesStateToLocalStorage), this.uppy.on("restored", (function () {
                var t = e.uppy.getState().currentUploads;
                t && Object.keys(t).forEach((function (r) {
                    e.uppy.restore(r, t[r])
                }))
            }))
        }, n
    }(le.Plugin), md.VERSION = "1.3.19", bd);

    function Ad() {
        return (Ad = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function Fd(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var Od = (Cd = Pd = function (e) {
        var t, r;

        function n(t, r) {
            var n;
            return (n = e.call(this, t, r) || this).type = "debugger", n.id = n.opts.id || "ReduxDevTools", n.title = "Redux DevTools", n.opts = Ad({}, {}, r), n.handleStateChange = n.handleStateChange.bind(Fd(n)), n.initDevTools = n.initDevTools.bind(Fd(n)), n
        }
        r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
        var i = n.prototype;
        return i.handleStateChange = function (e, t, r) {
            this.devTools.send("UPPY_STATE_UPDATE", t)
        }, i.initDevTools = function () {
            var e = this;
            this.devTools = window.devToolsExtension.connect(), this.devToolsUnsubscribe = this.devTools.subscribe((function (t) {
                if ("DISPATCH" === t.type) switch (console.log(t.payload.type), t.payload.type) {
                    case "RESET":
                        return void e.uppy.reset();
                    case "IMPORT_STATE":
                        var r = t.payload.nextLiftedState.computedStates;
                        return e.uppy.store.state = Ad({}, e.uppy.getState(), r[r.length - 1].state), void e.uppy.updateAll(e.uppy.getState());
                    case "JUMP_TO_STATE":
                    case "JUMP_TO_ACTION":
                        e.uppy.store.state = Ad({}, e.uppy.getState(), JSON.parse(t.state)), e.uppy.updateAll(e.uppy.getState())
                }
            }))
        }, i.install = function () {
            this.withDevTools = "undefined" != typeof window && window.__REDUX_DEVTOOLS_EXTENSION__, this.withDevTools && (this.initDevTools(), this.uppy.on("state-update", this.handleStateChange))
        }, i.uninstall = function () {
            this.withDevTools && (this.devToolsUnsubscribe(), this.uppy.off("state-update", this.handleStateUpdate))
        }, n
    }(le.Plugin), Pd.VERSION = "1.3.5", Cd),
        Ud = {};
    Ud.Core = le, Ud.debugLogger = Ud.Core.debugLogger, Ud.server = Me, Ud.views = {
        ProviderView: Pt
    }, Ud.DefaultStore = X, Ud.ReduxStore = _t, Ud.Dashboard = ti, Ud.DragDrop = ui, Ud.FileInput = yi, Ud.Informer = pn, Ud.ProgressBar = _i, Ud.StatusBar = an, Ud.Dropbox = Fi, Ud.GoogleDrive = Ii, Ud.Instagram = Hi, Ud.OneDrive = Yi, Ud.Facebook = to, Ud.Url = yo, Ud.Webcam = jo, Ud.ScreenCapture = ns, Ud.AwsS3 = Ds, Ud.AwsS3Multipart = la, Ud.Transloadit = Ep, Ud.Tus = Ku, Ud.XHRUpload = zp, Ud.Form = id, Ud.GoldenRetriever = Ed, Ud.ReduxDevTools = Od, Ud.ThumbnailGenerator = On, Ud.locales = {};
    return Ud
}));