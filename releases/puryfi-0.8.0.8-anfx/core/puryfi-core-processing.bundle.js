/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 466:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "halftone_bg.wasm";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			30: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ImageProcessor: () => (/* reexport */ ImageProcessor),
  Line: () => (/* reexport */ Line),
  Point: () => (/* reexport */ Point),
  Rectangle: () => (/* reexport */ Rectangle),
  RotatedRectangle: () => (/* reexport */ RotatedRectangle),
  checkBufferMime: () => (/* reexport */ checkBufferMime),
  checkMime: () => (/* reexport */ checkMime),
  checkMimeHeader: () => (/* reexport */ checkMimeHeader),
  computeFontSizeToFitWidth: () => (/* reexport */ computeFontSizeToFitWidth),
  createCanvas: () => (/* reexport */ createCanvas),
  createDiffusionBlurProgram: () => (/* reexport */ createDiffusionBlurProgram),
  createGLFilterPrograms: () => (/* reexport */ createGLFilterPrograms),
  createGaussianBlurProgram: () => (/* reexport */ createGaussianBlurProgram),
  diffusionBlurImage: () => (/* reexport */ diffusionBlurImage),
  drawBoxBorder: () => (/* reexport */ drawBoxBorder),
  drawTextBox: () => (/* reexport */ drawTextBox),
  filterDetections: () => (/* reexport */ filterDetections),
  gaussianBlurImage: () => (/* reexport */ gaussianBlurImage),
  inferDetections: () => (/* reexport */ inferDetections),
  inferDetectionsFromFrame: () => (/* reexport */ inferDetectionsFromFrame),
  initHalftoneProcessor: () => (/* reexport */ initHalftoneProcessor),
  loadModel: () => (/* reexport */ loadModel),
  mergeImageData: () => (/* reexport */ mergeImageData),
  model: () => (/* reexport */ model),
  modelHeight: () => (/* reexport */ modelHeight),
  modelWidth: () => (/* reexport */ modelWidth),
  paintCensor: () => (/* reexport */ paintCensor),
  paintCensorGivenModelOutput: () => (/* reexport */ paintCensorGivenModelOutput),
  paintCensorRequest: () => (/* reexport */ paintCensorRequest),
  paintMissingFeaturesBlock: () => (/* reexport */ paintMissingFeaturesBlock),
  parseModelOutput: () => (/* reexport */ parseModelOutput),
  pixelsToTensors: () => (/* reexport */ pixelsToTensors),
  pixelsToTensorsBilinear: () => (/* reexport */ pixelsToTensorsBilinear),
  prepareFetch: () => (/* reexport */ prepareFetch),
  processableContentType: () => (/* reexport */ processableContentType),
  requestContentType: () => (/* reexport */ requestContentType),
  runModel: () => (/* reexport */ runModel),
  runModelOnImage: () => (/* reexport */ runModelOnImage),
  runModelOnPixels: () => (/* reexport */ runModelOnPixels),
  scaleBoxes: () => (/* reexport */ scaleBoxes),
  sortDetectionsByClass: () => (/* reexport */ sortDetectionsByClass),
  tf: () => (/* reexport */ external_tf_namespaceObject_0),
  toBlobWithMimeHeader: () => (/* reexport */ toBlobWithMimeHeader),
  toBlobWithMimeHeaderNoReq: () => (/* reexport */ toBlobWithMimeHeaderNoReq),
  toDataURL: () => (/* reexport */ toDataURL),
  toFractionBoxes: () => (/* reexport */ toFractionBoxes),
  toPixelBoxes: () => (/* reexport */ toPixelBoxes),
  triangulateImage: () => (/* reexport */ triangulateImage),
  validateDetections: () => (/* reexport */ validateDetections)
});

;// external "tf"
const external_tf_namespaceObject = window["tf"];
var external_tf_namespaceObject_0 = /*#__PURE__*/__webpack_require__.t(external_tf_namespaceObject, 2);
;// ../PuryFi-Core/processing/node_modules/puryfi-wasm-halftone/dist/browser/halftone.js
let wasm;

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}
/**
* @param {Uint8Array} src_data
* @param {number} dot_size
* @param {number} dot_res
* @param {number} data_x
* @param {number} data_y
* @param {number} data_w
* @param {number} data_h
* @param {number} rect_x
* @param {number} rect_y
* @param {number} rect_w
* @param {number} rect_h
* @param {number} r
* @param {number} g
* @param {number} b
* @param {number} alpha
* @param {number} bg_r
* @param {number} bg_g
* @param {number} bg_b
* @param {number} bg_alpha
* @param {boolean} accurate_sampling
* @param {boolean} cmyk_color_mode
* @returns {Uint8Array}
*/
function halftone_pixel(src_data, dot_size, dot_res, data_x, data_y, data_w, data_h, rect_x, rect_y, rect_w, rect_h, r, g, b, alpha, bg_r, bg_g, bg_b, bg_alpha, accurate_sampling, cmyk_color_mode) {
    const ret = wasm.halftone_pixel(addHeapObject(src_data), dot_size, dot_res, data_x, data_y, data_w, data_h, rect_x, rect_y, rect_w, rect_h, r, g, b, alpha, bg_r, bg_g, bg_b, bg_alpha, accurate_sampling, cmyk_color_mode);
    return takeObject(ret);
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbg_new_abda76e883ba8a5f = function() {
        const ret = new Error();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_stack_658279fe44541cf6 = function(arg0, arg1) {
        const ret = getObject(arg1).stack;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_error_f851667af71bcfc6 = function(arg0, arg1) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbg_buffer_12d079cc21e14bdb = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb = function(arg0, arg1, arg2) {
        const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_63b92bc8671ed464 = function(arg0) {
        const ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_a47bac70306a19a7 = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_length_c20a40f15020d68a = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return addHeapObject(ret);
    };

    return imports;
}

function __wbg_init_memory(imports, maybe_memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = null;
    cachedUint8Memory0 = null;


    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(input) {
    if (wasm !== undefined) return wasm;

    if (typeof input === 'undefined') {
        input = new URL(/* asset import */ __webpack_require__(466), __webpack_require__.b);
    }
    const imports = __wbg_get_imports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await input, imports);

    return __wbg_finalize_init(instance, module);
}


/* harmony default export */ const halftone = ((/* unused pure expression or super */ null && (__wbg_init)));

;// ../PuryFi-Core/processing/dist/image-processor.browser.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

function createCanvas(width, height) {
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}
var glCanvas;
var gl;
function createGlProgram(vertexShaderSource, fragmentShaderSource) {
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  if (!vertexShader) throw new Error("Failed to create vertex shader");
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(vertexShader));
  }
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  if (!fragmentShader) throw new Error("Failed to create fragment shader");
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(fragmentShader));
  }
  var program = gl.createProgram();
  if (!program) throw new Error("Failed to create program");
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
  }
  return program;
}
var gaussianBlurImageInternal;
function createGaussianBlurProgram() {
  function makeGaussKernel(sigma) {
    var maxKernelSize = 128;
    var GAUSSKERN = 6.0;
    var actualDim = Math.round(Math.max(3.0, GAUSSKERN * sigma));
    actualDim = actualDim - !(actualDim & 1);
    var dim = actualDim;
    if (maxKernelSize < dim) {
      sigma = maxKernelSize / GAUSSKERN;
      dim = Math.round(Math.max(3.0, GAUSSKERN * sigma));
      dim = dim - !(dim & 1);
    }
    var sqrtSigmaPi2 = Math.sqrt(Math.PI * 2.0) * sigma;
    var s2 = 2.0 * sigma * sigma;
    var sum = 0.0;
    var kernel = new Float32Array(dim);
    var half = Math.round(kernel.length / 2);
    for (var j = 0, i = -half; j < kernel.length; i++, j++) {
      kernel[j] = Math.exp(-(i * i) / s2) / sqrtSigmaPi2;
      sum += kernel[j];
    }
    for (var i = 0; i < kernel.length; i++) {
      kernel[i] /= sum;
    }
    return {
      kernel: kernel,
      actualDim: actualDim
    };
  }
  var vertexShaderSource = "#version 300 es\n      in vec2 a_position;\n      out vec2 v_texCoord;\n\n      void main() {\n         v_texCoord = a_position.xy * 0.5 + 0.5;\n         gl_Position = vec4(a_position, 0.0, 1.0);\n      }\n   ";
  var fragmentShaderSource = "#version 300 es \n      precision highp float;\n\n      const int MAX_KERNEL_SIZE = 128;\n\n      uniform sampler2D u_image;\n      uniform vec2 u_textureSize;\n      uniform int u_direction;\n      uniform float u_kernel[MAX_KERNEL_SIZE];\n      uniform int u_kernelSize;\n      uniform bool u_grayscale;\n      in vec2 v_texCoord;\n      out vec4 outColor;\n\n      void main() {\n         vec2 onePixel = ((u_direction == 0) ? vec2(1.0, 0.0) : vec2(0.0, 1.0)) / u_textureSize;\n         vec2 texCoord = v_texCoord;\n\n         // We vertically flip the texture for one of the two passes\n         if (u_direction == 1) {\n            texCoord.y = v_texCoord.y * -1.0 + 1.0;\n         }\n\n         float step = 1.0;\n         if (MAX_KERNEL_SIZE < u_kernelSize) {\n            step = float(u_kernelSize) / float(MAX_KERNEL_SIZE);\n         } \n\n         float relCoord = -(float(u_kernelSize) / 2.0);\n         vec4 meanColor = vec4(0);\n         int maxSteps = min(u_kernelSize, MAX_KERNEL_SIZE);\n         for (int i = 0; i < maxSteps; i++) {\n            meanColor += texture(u_image, texCoord + onePixel * relCoord) * u_kernel[i];\n            relCoord += step;\n         }\n\n         if (u_grayscale) {\n            float luminance = dot(meanColor.rgb, vec3(0.299, 0.587, 0.114));\n            meanColor = vec4(luminance, luminance, luminance, 1.0);\n         }\n         outColor = meanColor;\n      }\n   ";
  var program = createGlProgram(vertexShaderSource, fragmentShaderSource);
  var a_position = gl.getAttribLocation(program, "a_position");
  var u_textureSize = gl.getUniformLocation(program, "u_textureSize");
  var u_kernel = gl.getUniformLocation(program, "u_kernel");
  var u_kernelSize = gl.getUniformLocation(program, "u_kernelSize");
  var u_direction = gl.getUniformLocation(program, "u_direction");
  var u_grayscale = gl.getUniformLocation(program, "u_grayscale");
  gl.enableVertexAttribArray(a_position);
  gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);
  var framebuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  var texture1 = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture1);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  var texture2 = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture2);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gaussianBlurImageInternal = function gaussianBlurImageInternal(img, strength, grayscale) {
    gl.useProgram(program);
    glCanvas.width = img.width;
    glCanvas.height = img.height;
    gl.viewport(0, 0, glCanvas.width, glCanvas.height);
    gl.uniform2f(u_textureSize, img.width, img.height);
    gl.uniform1i(u_grayscale, grayscale ? 1 : 0);
    var _makeGaussKernel = makeGaussKernel(strength),
      kernel = _makeGaussKernel.kernel,
      actualDim = _makeGaussKernel.actualDim;
    gl.uniform1fv(u_kernel, kernel);
    gl.uniform1i(u_kernelSize, actualDim);
    gl.bindTexture(gl.TEXTURE_2D, texture2);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, img.width, img.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture2, 0);
    gl.bindTexture(gl.TEXTURE_2D, texture1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.uniform1i(u_direction, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, texture2);
    gl.uniform1i(u_direction, 1);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    return glCanvas;
  };
}
var diffusionBlurImageInternal;
function createDiffusionBlurProgram() {
  var vertexShaderSource = "#version 300 es \n      in vec2 a_position;\n      out vec2 v_texCoord;\n      \n      void main() {\n         v_texCoord = vec2(a_position.x * 0.5 + 0.5, (a_position.y * 0.5 + 0.5) * -1.0 + 1.0);\n         gl_Position = vec4(a_position, 0.0, 1.0);\n      }\n   ";
  var fragmentShaderSource = "#version 300 es \n      precision highp float;\n\n      uniform sampler2D u_image;\n      uniform float u_radius;\n      uniform bool u_grayscale;\n      in vec2 v_texCoord;\n      out vec4 outColor;\n\n      float random(vec2 st) {\n         return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);\n      }\n\n      void main() {\n         vec2 uv = v_texCoord;\n         vec4 currentColor = texture(u_image, uv);\n         float angle = random(uv * currentColor.rb) * 6.28318530718; // 2 * PI\n         float radius = sqrt(random(uv)) * u_radius;\n         vec2 offset = vec2(cos(angle), sin(angle)) * radius;\n         vec4 color = texture(u_image, uv + offset);\n         if (u_grayscale) {\n            float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));\n            color = vec4(luminance, luminance, luminance, 1.0);\n         }\n         outColor = color;\n      }\n   ";
  var program = createGlProgram(vertexShaderSource, fragmentShaderSource);
  var a_position = gl.getAttribLocation(program, "a_position");
  var u_radius = gl.getUniformLocation(program, "u_radius");
  var u_grayscale = gl.getUniformLocation(program, "u_grayscale");
  gl.enableVertexAttribArray(a_position);
  gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);
  var texture = gl.createTexture();
  diffusionBlurImageInternal = function diffusionBlurImageInternal(img, strength, grayscale) {
    gl.useProgram(program);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    glCanvas.width = img.width;
    glCanvas.height = img.height;
    gl.viewport(0, 0, glCanvas.width, glCanvas.height);
    gl.uniform1f(u_radius, strength);
    gl.uniform1i(u_grayscale, grayscale ? 1 : 0);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    return glCanvas;
  };
}
function createGLFilterPrograms() {
  glCanvas = document.createElement("canvas");
  gl = glCanvas.getContext("webgl2");
  if (!gl) {
    throw new Error("WebGL2 not supported");
  }
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  createGaussianBlurProgram();
  createDiffusionBlurProgram();
}
function gaussianBlurImage(outctx, img, rect, strength) {
  var grayscale = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  gaussianBlurImageInternal(img, strength, grayscale);
  outctx.drawImage(glCanvas, rect.x, rect.y, rect.w, rect.h, rect.x, rect.y, rect.w, rect.h);
}
function diffusionBlurImage(outctx, img, rect, strength) {
  var grayscale = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  diffusionBlurImageInternal(img, strength, grayscale);
  outctx.drawImage(glCanvas, rect.x, rect.y, rect.w, rect.h, rect.x, rect.y, rect.w, rect.h);
}
function initHalftoneProcessor(url) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var response, buffer;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return fetch(url);
        case 2:
          response = _context.sent;
          _context.next = 5;
          return response.arrayBuffer();
        case 5:
          buffer = _context.sent;
          initSync(buffer);
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
}
function triangulateImage(args, img_data) {
  return window.triangulate(args).fromImageDataSync(img_data).toImageDataSync();
}
;// external "puryfiCoreContext"
const external_puryfiCoreContext_namespaceObject = window["puryfiCoreContext"];
;// ../PuryFi-Core/processing/dist/rectangle.js
function rectangle_typeof(o) { "@babel/helpers - typeof"; return rectangle_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, rectangle_typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == rectangle_typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != rectangle_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != rectangle_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Rectangle = /*#__PURE__*/function () {
  function Rectangle(x, y, w, h) {
    _classCallCheck(this, Rectangle);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  return _createClass(Rectangle, [{
    key: "coordinateInside",
    value: function coordinateInside(x, y) {
      return !(x < this.x || y < this.y || x >= this.x + this.w || y >= this.y + this.h);
    }
  }, {
    key: "merged",
    value: function merged(other) {
      var min_x = Math.min(this.x, other.x);
      var min_y = Math.min(this.y, other.y);
      var max_x = Math.max(this.x + this.w, other.x + other.w);
      var max_y = Math.max(this.y + this.h, other.y + other.h);
      return new Rectangle(min_x, min_y, max_x - min_x, max_y - min_y);
    }
  }, {
    key: "intersects",
    value: function intersects(other) {
      return !(this.x + this.w < other.x || other.x + other.w < this.x || this.y + this.h < other.y || other.y + other.h < this.y);
    }
  }, {
    key: "area",
    value: function area() {
      return this.w * this.h;
    }
  }, {
    key: "scale",
    value: function scale(w_scalar, h_scalar) {
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "ceil";
      var width_increase = Math[method](this.w * w_scalar) - this.w;
      var height_increase = Math[method](this.h * h_scalar) - this.h;
      this.x -= Math[method](width_increase / 2.0);
      this.y -= Math[method](height_increase / 2.0);
      this.w += width_increase;
      this.h += height_increase;
    }
  }, {
    key: "scaled",
    value: function scaled(w_scalar, h_scalar) {
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "ceil";
      var new_rect = this.clone();
      new_rect.scale(w_scalar, h_scalar, method);
      return new_rect;
    }
  }, {
    key: "stretch",
    value: function stretch(width, height) {
      this.x -= width;
      this.w += 2 * width;
      this.y -= height;
      this.h += 2 * height;
    }
  }, {
    key: "stretched",
    value: function stretched(width, height) {
      var new_rect = new Rectangle(this.x, this.y, this.w, this.h);
      new_rect.stretch(width, height);
      return new_rect;
    }
  }, {
    key: "resize",
    value: function resize(width, height) {
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "ceil";
      this.x -= Math[method](width / 2);
      this.w += width;
      this.y -= Math[method](height / 2);
      this.h += height;
    }
  }, {
    key: "resized",
    value: function resized(width, height) {
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "ceil";
      var new_rect = new Rectangle(this.x, this.y, this.w, this.h);
      new_rect.resize(width, height, method);
      return new_rect;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Rectangle(this.x, this.y, this.w, this.h);
    }
  }, {
    key: "global_cropped",
    value: function global_cropped(x, y, w, h) {
      var result = this.clone();
      result.x = Math.max(result.x, x);
      result.y = Math.max(result.y, y);
      var x2 = x + w;
      var y2 = y + h;
      var result_x2 = result.x + result.w;
      var result_y2 = result.y + result.h;
      var target_result_x2 = Math.min(x2, result_x2);
      var target_result_y2 = Math.min(y2, result_y2);
      result.w = target_result_x2 - result.x;
      result.h = target_result_y2 - result.y;
      return result;
    }
  }, {
    key: "shifted",
    value: function shifted(x, y) {
      var result = this.clone();
      result.x += x;
      result.y += y;
      return result;
    }
  }, {
    key: "x2",
    get: function get() {
      return this.x + this.w;
    }
  }, {
    key: "y2",
    get: function get() {
      return this.y + this.h;
    }
  }, {
    key: "cx",
    get: function get() {
      return this.x + this.w / 2;
    }
  }, {
    key: "cy",
    get: function get() {
      return this.y + this.h / 2;
    }
  }, {
    key: "tl",
    get: function get() {
      return [this.x, this.y];
    }
  }, {
    key: "tr",
    get: function get() {
      return [this.x + this.w, this.y];
    }
  }, {
    key: "bl",
    get: function get() {
      return [this.x, this.y + this.h];
    }
  }, {
    key: "br",
    get: function get() {
      return [this.x + this.w, this.y + this.h];
    }
  }]);
}();
;// ../PuryFi-Core/processing/dist/image-processor.js
function image_processor_typeof(o) { "@babel/helpers - typeof"; return image_processor_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, image_processor_typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function image_processor_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function image_processor_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, image_processor_toPropertyKey(o.key), o); } }
function image_processor_createClass(e, r, t) { return r && image_processor_defineProperties(e.prototype, r), t && image_processor_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function image_processor_toPropertyKey(t) { var i = image_processor_toPrimitive(t, "string"); return "symbol" == image_processor_typeof(i) ? i : i + ""; }
function image_processor_toPrimitive(t, r) { if ("object" != image_processor_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != image_processor_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }




var canvasesPool = [createCanvas(1, 1), createCanvas(1, 1), createCanvas(1, 1)];
function safe_key_union(sourceA, sourceB) {
  var aBad = sourceA === undefined || sourceA === null;
  var bBad = sourceB === undefined || sourceB === null;
  if (aBad && bBad) return new Set();
  if (aBad) {
    var _bKeys = Object.keys(sourceB);
    return new Set(_bKeys);
  }
  var aKeys = Object.keys(sourceA);
  if (bBad) {
    return new Set(aKeys);
  }
  var bKeys = Object.keys(sourceB);
  var setA = new Set(aKeys);
  var setB = new Set(bKeys);
  var _iterator = _createForOfIteratorHelper(setB),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var elem = _step.value;
      setA.add(elem);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return setA;
}
function arrIntersects(a, b) {
  return a.some(function (item) {
    return b.includes(item);
  });
}
var Mask = /*#__PURE__*/function () {
  function Mask() {
    image_processor_classCallCheck(this, Mask);
    this.container = {};
  }
  return image_processor_createClass(Mask, [{
    key: "setRed",
    value: function setRed(x, y) {
      this.ensureAvailable(x, y);
      this.container[x][y] |= 0x00ff0000;
    }
  }, {
    key: "setGreen",
    value: function setGreen(x, y) {
      this.ensureAvailable(x, y);
      this.container[x][y] |= 0x0000ff00;
    }
  }, {
    key: "setBlue",
    value: function setBlue(x, y) {
      this.ensureAvailable(x, y);
      this.container[x][y] |= 0x000000ff;
    }
  }, {
    key: "clearRed",
    value: function clearRed(x, y) {
      this.ensureAvailable(x, y);
      this.container[x][y] &= ~0x00ff0000;
    }
  }, {
    key: "clearGreen",
    value: function clearGreen(x, y) {
      this.ensureAvailable(x, y);
      this.container[x][y] &= ~0x0000ff00;
    }
  }, {
    key: "clearBlue",
    value: function clearBlue(x, y) {
      this.ensureAvailable(x, y);
      this.container[x][y] &= ~0x000000ff;
    }
  }, {
    key: "testRed",
    value: function testRed(x, y) {
      return x in this.container && y in this.container[x] && (this.container[x][y] & 0x00ff0000) !== 0;
    }
  }, {
    key: "testGreen",
    value: function testGreen(x, y) {
      return x in this.container && y in this.container[x] && (this.container[x][y] & 0x0000ff00) !== 0;
    }
  }, {
    key: "testBlue",
    value: function testBlue(x, y) {
      return x in this.container && y in this.container[x] && (this.container[x][y] & 0x000000ff) !== 0;
    }
  }, {
    key: "ensureAvailable",
    value: function ensureAvailable(x, y) {
      if (!(x in this.container)) {
        this.container[x] = {};
      }
      if (!(y in this.container[x])) {
        this.container[x][y] = 0xff000000;
      }
    }
  }, {
    key: "getMask",
    value: function getMask(x, y) {
      if (!(x in this.container)) return null;
      if (!(y in this.container[x])) return null;
      return this.container[x][y];
    }
  }, {
    key: "setMask",
    value: function setMask(xKey, yKey, value) {
      this.ensureAvailable(xKey, yKey);
      this.container[xKey][yKey] = value;
    }
  }, {
    key: "union",
    value: function union(that) {
      var result = new Mask();
      var xKeys = safe_key_union(this.container, that.container);
      var _iterator2 = _createForOfIteratorHelper(xKeys),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var xKey = _step2.value;
          var yKeys = safe_key_union(this.container[xKey], that.container[xKey]);
          var _iterator3 = _createForOfIteratorHelper(yKeys),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var yKey = _step3.value;
              var thisValue = this.getMask(xKey, yKey);
              var thatValue = that.getMask(xKey, yKey);
              var value = void 0;
              if (thisValue === null || thisValue === undefined) {
                value = thatValue;
              } else if (thatValue === null || thatValue === undefined) {
                value = thisValue;
              } else {
                value = thisValue | thatValue;
              }
              result.setMask(xKey, yKey, value);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return result;
    }
  }, {
    key: "calcWidth",
    value: function calcWidth() {
      var min_x = Number.MAX_VALUE;
      var max_x = -Number.MAX_VALUE;
      for (var key in this.container) {
        if (!this.container.hasOwnProperty(key)) continue;
        var x = parseInt(key);
        if (x < min_x) {
          min_x = x;
        }
        if (x > max_x) {
          max_x = x;
        }
      }
      return max_x - min_x;
    }
  }, {
    key: "calcHeight",
    value: function calcHeight() {
      var min_y = Number.MAX_VALUE;
      var max_y = -Number.MAX_VALUE;
      for (var key in this.container) {
        if (!this.container.hasOwnProperty(key)) continue;
        var x = parseInt(key);
        for (var _key in this.container[x]) {
          if (!this.container[x].hasOwnProperty(_key)) continue;
          var y = parseInt(_key);
          if (y < min_y) {
            min_y = y;
          }
          if (y > max_y) {
            max_y = y;
          }
        }
      }
      return max_y - min_y;
    }
  }]);
}();
var GlitchConfig = /*#__PURE__*/function () {
  function GlitchConfig() {
    image_processor_classCallCheck(this, GlitchConfig);
    this.r_channel_intensity = 0;
    this.g_channel_intensity = 0;
    this.b_channel_intensity = 0;
    this.r_negate_intensity = 0;
    this.g_negate_intensity = 0;
    this.b_negate_intensity = 0;
    this.shift_horizontal = false;
    this.shift_vertical = false;
    this.h_bar_size_range = [0, 0];
    this.v_bar_size_range = [0, 0];
    this.shift_intensity_range = [0, 0];
  }
  return image_processor_createClass(GlitchConfig, [{
    key: "set_channel_intensities",
    value: function set_channel_intensities(value) {
      this.r_channel_intensity = value;
      this.g_channel_intensity = value;
      this.b_channel_intensity = value;
    }
  }, {
    key: "set_negation_intensities",
    value: function set_negation_intensities(value) {
      this.r_negate_intensity = value;
      this.g_negate_intensity = value;
      this.b_negate_intensity = value;
    }
  }, {
    key: "set_all_intensities",
    value: function set_all_intensities(value) {
      this.set_channel_intensities(value);
      this.set_negation_intensities(value);
    }
  }]);
}();
var Line = /*#__PURE__*/image_processor_createClass(function Line(width, slope, point) {
  image_processor_classCallCheck(this, Line);
  this.width = width;
  this.slope = slope;
  this.point = point;
});
var Point = /*#__PURE__*/image_processor_createClass(function Point(x, y) {
  image_processor_classCallCheck(this, Point);
  this.x = x;
  this.y = y;
});
var RotatedRectangle = /*#__PURE__*/function () {
  function RotatedRectangle(cx, cy, w, h, theta, corners) {
    image_processor_classCallCheck(this, RotatedRectangle);
    this.cx = cx;
    this.cy = cy;
    this.w = w;
    this.h = h;
    this.theta = theta;
    this.corners = corners;
  }
  return image_processor_createClass(RotatedRectangle, [{
    key: "resizedBoundingRect",
    value: function resizedBoundingRect(w, h) {
      var min_x = Math.min(this.corners[0].x, this.corners[1].x, this.corners[2].x, this.corners[3].x) - w / 2;
      var min_y = Math.min(this.corners[0].y, this.corners[1].y, this.corners[2].y, this.corners[3].y) - h / 2;
      var max_x = Math.max(this.corners[0].x, this.corners[1].x, this.corners[2].x, this.corners[3].x) + w / 2;
      var max_y = Math.max(this.corners[0].y, this.corners[1].y, this.corners[2].y, this.corners[3].y) + h / 2;
      var rect = new Rectangle(min_x, min_y, max_x - min_x, max_y - min_y);
      return rect;
    }
  }]);
}();
function isRotatedNonLineEntry(entry) {
  return entry.shape_rect.theta !== undefined;
}
function isShapeResult(result) {
  return result.smoothing !== undefined;
}
function isLineResult(result) {
  return result.preset_config.shape === external_puryfiCoreContext_namespaceObject.CensorShape.LINE;
}
var ImageProcessor = /*#__PURE__*/function () {
  function ImageProcessor(out, outctx, config) {
    var img_data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    image_processor_classCallCheck(this, ImageProcessor);
    this.sobelAreas = this.sobelAreasPrewitt;
    this.out = out;
    this.outctx = outctx;
    this.orig_img_data = img_data;
    this.natural_width = out.width;
    this.natural_height = out.height;
    this.aux = canvasesPool[0];
    if (this.aux.width !== this.natural_width || this.aux.height !== this.natural_height) {
      this.aux.width = this.natural_width;
      this.aux.height = this.natural_height;
    }
    this.auxctx = this.aux.getContext("2d");
    this.auxctx.imageSmoothingEnabled = false;
    this.fill = canvasesPool[1];
    if (this.fill.width !== this.natural_width || this.fill.height !== this.natural_height) {
      this.fill.width = this.natural_width;
      this.fill.height = this.natural_height;
    }
    this.fillctx = this.fill.getContext("2d");
    this.fillctx.imageSmoothingEnabled = false;
    this.sticker_collections = config.sticker_collections;
    this.caption_configuration = config.caption_configuration;
    this.word_wall_configuration = config.word_wall_configuration;
  }
  return image_processor_createClass(ImageProcessor, [{
    key: "clipdata",
    get: function get() {
      if (this._clipdata == null) {
        this._clipdata = this.clipctx.getImageData(0, 0, this.natural_width, this.natural_height);
      }
      return this._clipdata;
    },
    set: function set(value) {
      this._clipdata = value;
    }
  }, {
    key: "splitAmount",
    value: function splitAmount(amount, n) {
      var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      if (n === 1) {
        if (amount > 0) {
          return [[].concat(_toConsumableArray(prefix), [amount])];
        } else {
          return [];
        }
      }
      var splits = [];
      for (var i = 1; i <= amount; i++) {
        var new_splits = this.splitAmount(amount - i, n - 1, [].concat(_toConsumableArray(prefix), [i]));
        new_splits.forEach(function (split) {
          if (!splits.find(function (s) {
            return s.every(function (item, index) {
              return item === split.sort(function (a, b) {
                return a - b;
              })[index];
            });
          })) {
            splits.push(split);
          }
        });
      }
      return splits;
    }
  }, {
    key: "combinations",
    value: function combinations(arr, n) {
      var stack = [];
      var results = [];
      for (var i = 0; i < arr.length; i++) {
        stack.push({
          start: i,
          data: [arr[i]]
        });
      }
      while (stack.length > 0) {
        var _stack$pop = stack.pop(),
          start = _stack$pop.start,
          data = _stack$pop.data;
        if (data.length === n) {
          results.push(data);
        } else {
          for (var _i = start + 1; _i < arr.length; _i++) {
            stack.push({
              start: _i,
              data: [].concat(_toConsumableArray(data), [arr[_i]])
            });
          }
        }
      }
      return results;
    }
  }, {
    key: "finishReverse",
    value: function finishReverse(cache, preset_config) {
      if (this.word_wall_configuration.enabled && preset_config.word_wall) {
        var word_wall_preset_index = preset_config.word_wall_preset_index;
        if (this.word_wall_configuration.presets[preset_config.word_wall_preset_index] == null) word_wall_preset_index = 0;
        var _this$prepareTextMask = this.prepareTextMask(this.word_wall_configuration.presets[word_wall_preset_index].config, word_wall_preset_index, cache),
          _this$prepareTextMask2 = _slicedToArray(_this$prepareTextMask, 2),
          ww_ctx = _this$prepareTextMask2[0],
          ww_alpha = _this$prepareTextMask2[1];
        this.outctx.globalCompositeOperation = "source-over";
        this.outctx.globalAlpha = ww_alpha;
        this.outctx.drawImage(ww_ctx.canvas, 0, 0);
        this.outctx.globalAlpha = 1;
      }
    }
  }, {
    key: "finishAreas",
    value: function finishAreas(bounding_rect, result, cache) {
      var preset_config = result.preset_config;
      if (this.word_wall_configuration.enabled && preset_config.word_wall) {
        this.fillctx.save();
        var word_wall_preset_index = preset_config.word_wall_preset_index;
        if (this.word_wall_configuration.presets[preset_config.word_wall_preset_index] == null) word_wall_preset_index = 0;
        var _this$prepareTextMask3 = this.prepareTextMask(this.word_wall_configuration.presets[word_wall_preset_index].config, word_wall_preset_index, cache),
          _this$prepareTextMask4 = _slicedToArray(_this$prepareTextMask3, 2),
          ww_ctx = _this$prepareTextMask4[0],
          ww_alpha = _this$prepareTextMask4[1];
        this.fillctx.globalCompositeOperation = "source-atop";
        this.fillctx.globalAlpha = ww_alpha;
        this.fillctx.drawImage(ww_ctx.canvas, bounding_rect.x, bounding_rect.y, bounding_rect.w, bounding_rect.h, bounding_rect.x, bounding_rect.y, bounding_rect.w, bounding_rect.h);
        this.fillctx.restore();
      }
      if (this.caption_configuration.enabled && preset_config.caption && (!isShapeResult(result) || !isLineResult(result))) {
        var caption_preset_index = preset_config.caption_preset_index;
        if (this.caption_configuration.presets[preset_config.caption_preset_index] == null) caption_preset_index = 0;
        this.paintCaption(this.fillctx, bounding_rect, result, this.caption_configuration.presets[caption_preset_index].config, caption_preset_index, cache);
      }
      this.outctx.drawImage(this.fill, bounding_rect.x, bounding_rect.y, bounding_rect.w, bounding_rect.h, bounding_rect.x, bounding_rect.y, bounding_rect.w, bounding_rect.h);
    }
  }, {
    key: "getSingleCaptions",
    value: function getSingleCaptions(entries, min_font_size, preset_ident, cache) {
      var preset_cache = cache.captionCache[preset_ident];
      var weightedSingleEntriesByTags = preset_cache.weightedSingleEntriesByTags.filter(function (weightedCaptionEntries) {
        return weightedCaptionEntries.entries.length >= entries.length;
      });
      var weightedCaptionEntries;
      if (0 < weightedSingleEntriesByTags.length) {
        var total_weight = weightedSingleEntriesByTags.reduce(function (sum, captionEntriesByTags) {
          return sum + captionEntriesByTags.weight;
        }, 0);
        var rand = Math.random() * total_weight;
        var weight_sum = 0;
        weightedCaptionEntries = weightedSingleEntriesByTags.find(function (_ref) {
          var weight = _ref.weight;
          weight_sum += weight;
          return rand < weight_sum;
        });
      } else {
        weightedCaptionEntries = (0,external_puryfiCoreContext_namespaceObject.maxOf)(preset_cache.weightedSingleEntriesByTags, function (weighted_caption_entries) {
          return weighted_caption_entries.entries.length;
        });
        if (weightedCaptionEntries == null) {
          var _iterator4 = _createForOfIteratorHelper(entries),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var entry = _step4.value;
              entry.caption.value = null;
              entry.caption.scale = null;
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
          return;
        }
      }
      var captionEntries = _toConsumableArray(weightedCaptionEntries.entries);
      var _iterator5 = _createForOfIteratorHelper(entries),
        _step5;
      try {
        var _loop = function _loop() {
          var entry = _step5.value;
          if (captionEntries.length === 0) {
            captionEntries = _toConsumableArray(weightedCaptionEntries.entries);
          }
          var candidates = [];
          var candidates_weight_sum = 0;
          var best_aspect_ratio_fit = Number.MAX_VALUE;
          var best_entry_i;
          var best_value;
          var _loop2 = function _loop2(i) {
            var _captionEntries$i = captionEntries[i],
              values = _captionEntries$i.values,
              on_content = _captionEntries$i.on_content,
              weight = _captionEntries$i.weight;
            if (!on_content.includes(entry.klass.index)) return 1; // continue
            var candidate = (0,external_puryfiCoreContext_namespaceObject.findMap)(values, function (value) {
              var fit = value.aspect_ratio < entry.caption.ideal_aspect_ratio ? entry.caption.ideal_aspect_ratio / value.aspect_ratio : value.aspect_ratio / entry.caption.ideal_aspect_ratio;
              if (fit < 1.333) {
                var _scale2 = Math.min(entry.caption.max_w / value.width, entry.caption.max_h / value.width * value.aspect_ratio);
                var _font_size = external_puryfiCoreContext_namespaceObject.CAPTION_BASE_FONT_SIZE * _scale2;
                if (min_font_size < _font_size) {
                  return {
                    value: value,
                    scale: _scale2
                  };
                }
              } else if (fit < best_aspect_ratio_fit) {
                best_aspect_ratio_fit = fit;
                best_entry_i = i;
                best_value = value;
              }
              return undefined;
            });
            if (candidate) {
              candidate.index = i;
              candidate.weight = weight;
              candidates.push(candidate);
              candidates_weight_sum += weight;
            }
          };
          for (var i = 0; i < captionEntries.length; i++) {
            if (_loop2(i)) continue;
          }
          if (!candidates.length) {
            if (best_value != null) {
              var scale = Math.min(entry.caption.max_w / best_value.width, entry.caption.max_h / best_value.width * best_value.aspect_ratio);
              var font_size = external_puryfiCoreContext_namespaceObject.CAPTION_BASE_FONT_SIZE * scale;
              if (min_font_size < font_size) {
                captionEntries.splice(best_entry_i, 1)[0];
                entry.caption.value = best_value;
                entry.caption.scale = scale;
              } else {
                entry.caption.value = null;
                entry.caption.scale = null;
              }
            } else {
              entry.caption.value = null;
              entry.caption.scale = null;
            }
          } else {
            var _rand = Math.random() * candidates_weight_sum;
            var sum = 0;
            var _iterator6 = _createForOfIteratorHelper(candidates),
              _step6;
            try {
              for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                var _step6$value = _step6.value,
                  value = _step6$value.value,
                  _scale = _step6$value.scale,
                  index = _step6$value.index,
                  weight = _step6$value.weight;
                sum += weight;
                if (_rand < sum) {
                  captionEntries.splice(index, 1)[0];
                  entry.caption.value = value;
                  entry.caption.scale = _scale;
                  break;
                }
              }
            } catch (err) {
              _iterator6.e(err);
            } finally {
              _iterator6.f();
            }
          }
        };
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      cache["preset_ident_".concat(preset_ident, "_picked_caption_global_scale")] = null;
    }
  }, {
    key: "getSpreadOutCaptions",
    value: function getSpreadOutCaptions(entries, min_font_size, presetIdent, cache) {
      var presetCache = cache.captionCache[presetIdent];
      var weightedSpreadOutEntriesByTags = presetCache.weightedSpreadOutEntriesByTags;
      var totalWeight = weightedSpreadOutEntriesByTags.reduce(function (sum, captionEntriesByTags) {
        return sum + captionEntriesByTags.weight;
      }, 0);
      var rand = Math.random() * totalWeight;
      var weightSum = 0;
      var caption_entries = weightedSpreadOutEntriesByTags.find(function (_ref2) {
        var weight = _ref2.weight;
        weightSum += weight;
        return rand < weightSum;
      }).entries;
      entries.sort(function (a, b) {
        var xDist = (a.shape_rect.cx - b.shape_rect.cx) / 6;
        var yDist = a.shape_rect.cy - b.shape_rect.cy;
        return xDist + yDist;
      });
      var baseline_rect_width = entries[0].shape_rect.w;
      var rect_rel_widths = entries.map(function (_ref3) {
        var shape_rect = _ref3.shape_rect;
        return shape_rect.w / baseline_rect_width;
      });
      var disqualifier = entries.length === 2 ? 0.325 : 0.45;
      var candidates = [];
      var candidates_weight_sum = 0;
      caption_entries.forEach(function (_ref4) {
        var values = _ref4.values,
          on_content = _ref4.on_content,
          weight = _ref4.weight;
        if (entries.length !== values.length || entries.some(function (entry) {
          return !on_content.includes(entry.klass.index);
        })) return;
        var baseline_value_width = values[0].width;
        for (var i = 1; i < values.length; i++) {
          var value = values[i];
          var value_rel_width = value.width / baseline_value_width;
          var diff = Math.abs(value_rel_width - rect_rel_widths[i]);
          if (disqualifier < diff) return;
        }
        var scale = (0,external_puryfiCoreContext_namespaceObject.mapMinOf)(entries, function (entry, i) {
          return Math.min(entry.caption.max_w / values[i].width, entry.caption.max_h / values[i].width * values[i].aspect_ratio);
        });
        var font_size = external_puryfiCoreContext_namespaceObject.CAPTION_BASE_FONT_SIZE * scale;
        if (font_size < min_font_size) return;
        for (var _i2 = 0; _i2 < entries.length; _i2++) {
          var entry = entries[_i2];
          var wRatio = values[_i2].width * scale / entry.caption.max_w;
          if (wRatio < 0.45) return;
        }
        candidates.push({
          values: values,
          scale: scale,
          weight: weight
        });
        candidates_weight_sum += weight;
      });
      if (0 < candidates.length) {
        var _rand2 = Math.random() * candidates_weight_sum;
        var sum = 0;
        var _iterator7 = _createForOfIteratorHelper(candidates),
          _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var _step7$value = _step7.value,
              values = _step7$value.values,
              scale = _step7$value.scale,
              weight = _step7$value.weight;
            sum += weight;
            if (_rand2 < sum) {
              for (var i = 0; i < entries.length; i++) {
                entries[i].caption.value = values[i];
              }
              cache["preset_ident_".concat(presetIdent, "_picked_caption_global_scale")] = scale;
              return true;
            }
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      } else {
        return false;
      }
    }
  }, {
    key: "getCaptions",
    value: function getCaptions(all_entries, preset_config, preset_ident, cache) {
      var natural_size = (this.natural_width + this.natural_height) / 2;
      var padding = preset_config.padding * (natural_size / 1024);
      var min_font_size = 24 * (natural_size / 1024);
      var _iterator8 = _createForOfIteratorHelper(all_entries),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var entry = _step8.value;
          var max_w = entry.shape_rect.w - padding * 2;
          var max_h = entry.shape_rect.h - padding * 2;
          if (Math.PI / 4 < Math.abs(entry.shape_rect.theta)) {
            var _ref5 = [max_h, max_w];
            max_w = _ref5[0];
            max_h = _ref5[1];
          }
          var ideal_aspect_ratio = max_w / max_h;
          entry.caption = {
            max_w: max_w,
            max_h: max_h,
            ideal_aspect_ratio: ideal_aspect_ratio
          };
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
      if (all_entries.length <= 1 || Math.random() < 0.5) {
        this.getSingleCaptions(all_entries, min_font_size, preset_ident, cache);
      } else {
        var success = this.getSpreadOutCaptions(all_entries, min_font_size, preset_ident, cache);
        if (!success) {
          this.getSingleCaptions(all_entries, min_font_size, preset_ident, cache);
        }
      }
    }
  }, {
    key: "paintSingleCaptions",
    value: function paintSingleCaptions(ctx, result, preset_config, preset_ident, shadow_size, cache) {
      var _a, _b;
      var presetCache = cache.captionCache[preset_ident];
      var font = (0,external_puryfiCoreContext_namespaceObject.escapeQuotes)(preset_config.font);
      for (var i = 0; i < result.entries.length; i++) {
        var entry = result.entries[i];
        var rect = entry.shape_rect;
        var value = entry.caption.value;
        var scale = entry.caption.scale;
        if (isShapeResult(result)) {
          ctx.save();
          ctx.globalCompositeOperation = "destination-out";
          ctx.fillStyle = "black";
          ctx.filter = "blur(".concat(result.smoothing, "px)");
          ctx.lineWidth = result.border_width * 2;
          var shape_path = void 0;
          if (isRotatedNonLineEntry(entry)) {
            shape_path = this.prepareRotatedShapePath(ctx, entry.shape_rect, result.preset_config.shape, (_a = result.rounding) !== null && _a !== void 0 ? _a : 0);
          } else {
            shape_path = this.prepareShapePath(ctx, entry.shape_rect, result.preset_config.shape, (_b = result.rounding) !== null && _b !== void 0 ? _b : 0);
          }
          if (shape_path) {
            ctx.fill(shape_path);
            ctx.stroke(shape_path);
          } else {
            ctx.fill();
            ctx.stroke();
          }
          ctx.restore();
        }
        if (!value) continue;
        ctx.save();
        var font_size = external_puryfiCoreContext_namespaceObject.CAPTION_BASE_FONT_SIZE * scale;
        var font_height = presetCache.fontHeight * scale;
        var font_hanging_height = presetCache.fontHangingHeight * scale;
        var line_height = font_hanging_height * preset_config.lineHeight;
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = preset_config.color;
        ctx.font = "".concat(preset_config.fontStyle, " ").concat(font_size, "px ").concat(font);
        ctx.shadowBlur = shadow_size;
        ctx.translate((0,external_puryfiCoreContext_namespaceObject.previousMultiple)(rect.cx - value.x_offset * scale, 0.5), (0,external_puryfiCoreContext_namespaceObject.previousMultiple)(rect.cy, 0.5));
        if (isRotatedNonLineEntry(entry)) {
          var theta = entry.shape_rect.theta;
          if (Math.PI / 4 < Math.abs(theta)) {
            theta -= Math.PI / 2 * Math.sign(theta);
          }
          ctx.rotate(theta);
        }
        this.paintMultilineText(ctx, 0, 0, value.lines, line_height, font_height);
        ctx.restore();
      }
    }
  }, {
    key: "paintSpreadOutCaptions",
    value: function paintSpreadOutCaptions(ctx, result, scale, preset_config, presetIdent, shadow_size, cache) {
      var _a, _b;
      var presetCache = cache.captionCache[presetIdent];
      var font_size = external_puryfiCoreContext_namespaceObject.CAPTION_BASE_FONT_SIZE * scale;
      var font_height = presetCache.fontHeight * scale;
      var font_hanging_height = presetCache.fontHangingHeight * scale;
      var line_height = font_hanging_height * preset_config.lineHeight;
      ctx.font = "".concat(preset_config.fontStyle, " ").concat(font_size, "px ").concat((0,external_puryfiCoreContext_namespaceObject.escapeQuotes)(preset_config.font));
      for (var i = 0; i < result.entries.length; i++) {
        var entry = result.entries[i];
        var rect = entry.shape_rect;
        var value = entry.caption.value;
        if (isShapeResult(result)) {
          ctx.save();
          ctx.globalCompositeOperation = "destination-out";
          ctx.fillStyle = "black";
          ctx.filter = "blur(".concat(result.smoothing, "px)");
          ctx.lineWidth = result.border_width * 2;
          var shape_path = void 0;
          if (isRotatedNonLineEntry(entry)) {
            shape_path = this.prepareRotatedShapePath(ctx, entry.shape_rect, result.preset_config.shape, (_a = result.rounding) !== null && _a !== void 0 ? _a : 0);
          } else {
            shape_path = this.prepareShapePath(ctx, entry.shape_rect, result.preset_config.shape, (_b = result.rounding) !== null && _b !== void 0 ? _b : 0);
          }
          if (shape_path) {
            ctx.fill(shape_path);
            ctx.stroke(shape_path);
          } else {
            ctx.fill();
            ctx.stroke();
          }
          ctx.restore();
        }
        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = preset_config.color;
        ctx.shadowBlur = shadow_size;
        ctx.translate((0,external_puryfiCoreContext_namespaceObject.previousMultiple)(rect.cx - value.x_offset * scale, 0.5), (0,external_puryfiCoreContext_namespaceObject.previousMultiple)(rect.cy, 0.5));
        if (isRotatedNonLineEntry(entry)) {
          var theta = entry.shape_rect.theta;
          if (Math.PI / 4 < Math.abs(theta)) {
            theta -= Math.PI / 2 * Math.sign(theta);
          }
          ctx.rotate(theta);
        }
        this.paintMultilineText(ctx, 0, 0, value.lines, line_height, font_height);
        ctx.restore();
      }
    }
  }, {
    key: "paintCaption",
    value: function paintCaption(outctx, bounding_rect, results, preset_config, preset_ident, cache) {
      var natural_size = (this.natural_width + this.natural_height) / 2;
      var shadow_size = preset_config.mode === 1 ? preset_config.shadowSize * (natural_size / 1024) : 0;
      var ctx = this.auxctx;
      ctx.save();
      ctx.clearRect(0, 0, this.natural_width, this.natural_height);
      ctx.textAlign = "center";
      ctx.shadowColor = preset_config.shadowColor;
      var global_scale = cache["preset_ident_".concat(preset_ident, "_picked_caption_global_scale")];
      if (global_scale == null) {
        this.paintSingleCaptions(ctx, results, preset_config, preset_ident, shadow_size, cache);
      } else {
        this.paintSpreadOutCaptions(ctx, results, global_scale, preset_config, preset_ident, shadow_size, cache);
      }
      if (preset_config.mode === 0) {
        ctx.globalCompositeOperation = "source-in";
        ctx.drawImage(this.clipctx.canvas, bounding_rect.x, bounding_rect.y, bounding_rect.w, bounding_rect.h, bounding_rect.x, bounding_rect.y, bounding_rect.w, bounding_rect.h);
      }
      ctx.restore();
      outctx.save();
      outctx.globalCompositeOperation = "source-over";
      outctx.drawImage(ctx.canvas, bounding_rect.x, bounding_rect.y, bounding_rect.w, bounding_rect.h, bounding_rect.x, bounding_rect.y, bounding_rect.w, bounding_rect.h);
      outctx.restore();
    }
  }, {
    key: "paintMultilineText",
    value: function paintMultilineText(ctx, x, y, lines, line_height, font_height) {
      y += -(line_height * (lines.length - 1)) / 2 + font_height / 2;
      var _iterator9 = _createForOfIteratorHelper(lines),
        _step9;
      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var line = _step9.value;
          ctx.fillText(line, x, y);
          y += line_height;
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
    }
  }, {
    key: "cornerIntersectionsWithEllipse",
    value: function cornerIntersectionsWithEllipse(h, k, a, b, m) {
      var d = a / b;
      var c = Math.sign(m) - m * d;
      var A = 1 / Math.pow(d, 2) + Math.pow(m, 2);
      var B = 2 * m * c;
      var C = Math.pow(c, 2) - 1;
      var x = (-B + Math.sqrt(Math.pow(B, 2) - 4 * A * C)) / (2 * A);
      var y = m * x + c;
      b *= -Math.sign(m);
      x *= b;
      y *= b;
      return [[h + x, k + y], [h - x, k - y]];
    }
  }, {
    key: "handleLineShapes",
    value: function handleLineShapes(result, cache, paintFill) {
      var _this = this;
      var entries = result.entries,
        preset_config = result.preset_config,
        border_width = result.border_width,
        smoothing = result.smoothing;
      var feather_growth = smoothing * 3;
      var should_draw_border = preset_config.border_width && !(0,external_puryfiCoreContext_namespaceObject.isHexColorTransparent)(preset_config.border_color);
      var path = new Path2D();
      var addLinePath = function addLinePath(line) {
        var extra_extension;
        if (0 < smoothing) {
          line.width += smoothing * 2.4;
          extra_extension = (line.width + feather_growth) / 2;
        } else {
          extra_extension = line.width / 2;
        }
        var point = line.point,
          slope = line.slope,
          width = line.width;
        var _this$extendLine = _this.extendLine(point, slope, -extra_extension, _this.natural_width + extra_extension, -extra_extension, _this.natural_height + extra_extension),
          _this$extendLine2 = _slicedToArray(_this$extendLine, 2),
          start = _this$extendLine2[0],
          end = _this$extendLine2[1];
        var angle = Math.atan(slope);
        var shift_x = width / 2 * Math.sin(angle);
        var shift_y = width / 2 * Math.cos(angle);
        var tl = {
          x: start.x + shift_x,
          y: start.y - shift_y
        };
        var tr = {
          x: end.x + shift_x,
          y: end.y - shift_y
        };
        var br = {
          x: end.x - shift_x,
          y: end.y + shift_y
        };
        var bl = {
          x: start.x - shift_x,
          y: start.y + shift_y
        };
        path.moveTo(tl.x, tl.y);
        path.lineTo(tr.x, tr.y);
        path.lineTo(br.x, br.y);
        path.lineTo(bl.x, bl.y);
        path.closePath();
        var min_x = Math.min(tl.x, bl.x);
        var min_y = Math.min(tl.y, tr.y);
        var max_x = Math.max(tr.x, br.x);
        var max_y = Math.max(bl.y, br.y);
        return {
          min_x: min_x,
          min_y: min_y,
          max_x: max_x,
          max_y: max_y
        };
      };
      var min_x = Infinity,
        min_y = Infinity,
        max_x = -Infinity,
        max_y = -Infinity;
      var addToBoundaries = function addToBoundaries(boundaries) {
        if (!should_draw_border || border_width <= feather_growth) {
          min_x = Math.min(min_x, boundaries.min_x - feather_growth);
          min_y = Math.min(min_y, boundaries.min_y - feather_growth);
          max_x = Math.max(max_x, boundaries.max_x + feather_growth);
          max_y = Math.max(max_y, boundaries.max_y + feather_growth);
        } else {
          min_x = Math.min(min_x, boundaries.min_x - preset_config.border_width);
          min_y = Math.min(min_y, boundaries.min_y - preset_config.border_width);
          max_x = Math.max(max_x, boundaries.max_x + preset_config.border_width);
          max_y = Math.max(max_y, boundaries.max_y + preset_config.border_width);
        }
      };
      var _iterator10 = _createForOfIteratorHelper(entries),
        _step10;
      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var line = _step10.value.line;
          var boundaries = addLinePath(line);
          addToBoundaries(boundaries);
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }
      min_x = Math.max(0, Math.floor(min_x));
      min_y = Math.max(0, Math.floor(min_y));
      max_x = Math.min(this.natural_width, Math.ceil(max_x));
      max_y = Math.min(this.natural_height, Math.ceil(max_y));
      var bounding_rect = new Rectangle(min_x, min_y, max_x - min_x, max_y - min_y);
      this.fillctx.clearRect(0, 0, this.natural_width, this.natural_height);
      this.fillctx.save();
      var are_areas_finished = paintFill({
        bounding_rect: bounding_rect,
        path: path,
        smoothing: smoothing
      });
      this.fillctx.restore();
      if (!are_areas_finished) {
        this.fillctx.globalCompositeOperation = "destination-in";
        this.fillctx.filter = "blur(".concat(smoothing, "px)");
        this.fillctx.fill(path);
        this.fillctx.filter = "none";
        this.fillctx.globalCompositeOperation = "source-over";
        this.finishAreas(bounding_rect, result, cache);
      }
      if (should_draw_border) {
        this.fillctx.save();
        this.fillctx.clearRect(0, 0, this.natural_width, this.natural_height);
        this.fillctx.globalCompositeOperation = "source-over";
        this.fillctx.lineWidth = border_width * 2;
        this.fillctx.strokeStyle = preset_config.border_color;
        this.fillctx.stroke(path);
        this.fillctx.globalCompositeOperation = "destination-out";
        this.fillctx.fillStyle = "#000";
        this.fillctx.fill(path);
        this.outctx.drawImage(this.fill, bounding_rect.x, bounding_rect.y, bounding_rect.w, bounding_rect.h, bounding_rect.x, bounding_rect.y, bounding_rect.w, bounding_rect.h);
        this.fillctx.restore();
      }
    }
  }, {
    key: "handleShapes",
    value: function handleShapes(result, cache, paintFill) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var _a;
      if (isLineResult(result)) {
        this.handleLineShapes(result, cache, paintFill);
        return;
      }
      var entries = result.entries,
        preset_config = result.preset_config,
        border_width = result.border_width,
        smoothing = result.smoothing,
        rounding = result.rounding;
      var feather_growth = smoothing * 3;
      var should_draw_border = border_width > 0 && !(0,external_puryfiCoreContext_namespaceObject.isHexColorTransparent)(preset_config.border_color);
      var min_x = Infinity,
        min_y = Infinity,
        max_x = -Infinity,
        max_y = -Infinity;
      var path = new Path2D();
      var _iterator11 = _createForOfIteratorHelper(entries),
        _step11;
      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var _entry = _step11.value;
          if (isRotatedNonLineEntry(_entry)) {
            var corners = _entry.shape_rect.corners;
            this.addRotatedShapePath(path, preset_config.shape, _entry.shape_rect, rounding);
            var growth = !should_draw_border || border_width <= feather_growth ? feather_growth : border_width;
            min_x = Math.min(min_x, Math.min(corners[0].x, corners[1].x, corners[2].x, corners[3].x) - growth);
            min_y = Math.min(min_y, Math.min(corners[0].y, corners[1].y, corners[2].y, corners[3].y) - growth);
            max_x = Math.max(max_x, Math.max(corners[0].x, corners[1].x, corners[2].x, corners[3].x) + growth);
            max_y = Math.max(max_y, Math.max(corners[0].y, corners[1].y, corners[2].y, corners[3].y) + growth);
          } else {
            this.addShapePath(path, _entry.shape_rect, preset_config.shape, rounding);
            if (!should_draw_border || border_width <= feather_growth) {
              min_x = Math.min(min_x, _entry.effect_rect.x);
              min_y = Math.min(min_y, _entry.effect_rect.y);
              max_x = Math.max(max_x, _entry.effect_rect.x + _entry.effect_rect.w);
              max_y = Math.max(max_y, _entry.effect_rect.y + _entry.effect_rect.h);
            } else {
              min_x = Math.min(min_x, _entry.shape_rect.x - border_width);
              min_y = Math.min(min_y, _entry.shape_rect.y - border_width);
              max_x = Math.max(max_x, _entry.shape_rect.x + _entry.shape_rect.w + border_width);
              max_y = Math.max(max_y, _entry.shape_rect.y + _entry.shape_rect.h + border_width);
            }
          }
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }
      min_x = Math.max(0, Math.floor(min_x));
      min_y = Math.max(0, Math.floor(min_y));
      max_x = Math.min(this.natural_width, Math.ceil(max_x));
      max_y = Math.min(this.natural_height, Math.ceil(max_y));
      var bounding_rect = new Rectangle(min_x, min_y, max_x - min_x, max_y - min_y);
      this.fillctx.clearRect(0, 0, this.natural_width, this.natural_height);
      this.fillctx.save();
      var are_areas_finished = paintFill({
        bounding_rect: bounding_rect,
        path: path,
        smoothing: smoothing
      });
      this.fillctx.restore();
      if (!are_areas_finished) {
        this.fillctx.globalCompositeOperation = "destination-in";
        this.fillctx.filter = "blur(".concat(smoothing, "px)");
        this.fillctx.fill(path);
        this.fillctx.globalCompositeOperation = "source-over";
        this.fillctx.filter = "none";
        this.finishAreas(bounding_rect, result, cache);
      }
      if (should_draw_border) {
        var should_stack_borders = (_a = options.should_stack_borders) !== null && _a !== void 0 ? _a : this.caption_configuration.enabled && preset_config.caption;
        this.fillctx.save();
        this.fillctx.clearRect(0, 0, this.natural_width, this.natural_height);
        if (should_stack_borders) {
          this.fillctx.lineWidth = border_width * 2;
          var _toHexAndAlpha = (0,external_puryfiCoreContext_namespaceObject.toHexAndAlpha)(preset_config.border_color),
            _toHexAndAlpha2 = _slicedToArray(_toHexAndAlpha, 2),
            border_color = _toHexAndAlpha2[0],
            border_alpha = _toHexAndAlpha2[1];
          var _iterator12 = _createForOfIteratorHelper(entries),
            _step12;
          try {
            for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
              var entry = _step12.value;
              this.fillctx.save();
              this.fillctx.globalCompositeOperation = "source-over";
              this.fillctx.strokeStyle = border_color;
              var shape_path = void 0;
              if (isRotatedNonLineEntry(entry)) {
                shape_path = this.prepareRotatedShapePath(this.fillctx, entry.shape_rect, result.preset_config.shape, result.rounding);
              } else {
                shape_path = this.prepareShapePath(this.fillctx, entry.shape_rect, preset_config.shape, rounding);
              }
              if (shape_path) {
                this.fillctx.stroke(shape_path);
              } else {
                this.fillctx.stroke();
              }
              this.fillctx.globalCompositeOperation = "destination-out";
              this.fillctx.fillStyle = "black";
              if (shape_path) {
                this.fillctx.fill(shape_path);
              } else {
                this.fillctx.fill();
              }
              this.fillctx.restore();
            }
          } catch (err) {
            _iterator12.e(err);
          } finally {
            _iterator12.f();
          }
          this.outctx.globalAlpha = border_alpha;
          this.outctx.drawImage(this.fill, bounding_rect.x, bounding_rect.y, bounding_rect.w, bounding_rect.h, bounding_rect.x, bounding_rect.y, bounding_rect.w, bounding_rect.h);
          this.outctx.globalAlpha = 1;
        } else {
          this.fillctx.globalCompositeOperation = "source-over";
          this.fillctx.lineWidth = border_width * 2;
          this.fillctx.strokeStyle = preset_config.border_color;
          this.fillctx.stroke(path);
          this.fillctx.globalCompositeOperation = "destination-out";
          this.fillctx.fillStyle = "#000";
          this.fillctx.fill(path);
          this.outctx.drawImage(this.fill, bounding_rect.x, bounding_rect.y, bounding_rect.w, bounding_rect.h, bounding_rect.x, bounding_rect.y, bounding_rect.w, bounding_rect.h);
        }
        this.fillctx.restore();
      }
    }
  }, {
    key: "handleShapesIndividually",
    value: function handleShapesIndividually(result, cache, paintFill) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var entries = result.entries,
        preset_config = result.preset_config,
        border_width = result.border_width,
        smoothing = result.smoothing,
        rounding = result.rounding;
      var feather_growth = smoothing * 3;
      var should_draw_border = border_width > 0 && !(0,external_puryfiCoreContext_namespaceObject.isHexColorTransparent)(preset_config.border_color);
      var growth = !should_draw_border || border_width <= feather_growth ? feather_growth : border_width;
      this.fillctx.clearRect(0, 0, this.natural_width, this.natural_height);
      var min_x = Infinity,
        min_y = Infinity,
        max_x = -Infinity,
        max_y = -Infinity;
      if (smoothing === 0) {
        for (var i = 0; i < result.entries.length; i++) {
          var entry = result.entries[i];
          this.fillctx.save();
          var rect = void 0;
          var shape_path = void 0;
          if (isRotatedNonLineEntry(entry)) {
            rect = entry.shape_rect.resizedBoundingRect(growth, growth);
            shape_path = this.prepareRotatedShapePath(this.fillctx, entry.shape_rect, preset_config.shape, result.rounding);
          } else {
            rect = entry.shape_rect.resized(growth, growth);
            shape_path = this.prepareShapePath(this.fillctx, entry.shape_rect, preset_config.shape, rounding);
          }
          if (shape_path) {
            this.fillctx.clip(shape_path);
          } else {
            this.fillctx.clip();
          }
          paintFill({
            rect: rect,
            index: i,
            smoothing: smoothing
          });
          this.fillctx.restore();
          min_x = Math.min(min_x, rect.x);
          min_y = Math.min(min_y, rect.y);
          max_x = Math.max(max_x, rect.x + rect.w);
          max_y = Math.max(max_y, rect.y + rect.h);
        }
      } else {
        var temp = createCanvas(this.natural_width, this.natural_height);
        var tempctx = temp.getContext("2d");
        for (var _i3 = 0; _i3 < result.entries.length; _i3++) {
          var _entry2 = result.entries[_i3];
          var _rect = void 0;
          var _shape_path = void 0;
          if (isRotatedNonLineEntry(_entry2)) {
            _rect = _entry2.shape_rect.resizedBoundingRect(growth, growth);
            this.fillctx.save();
            paintFill({
              rect: _rect,
              index: _i3,
              smoothing: smoothing
            });
            this.fillctx.restore();
            _shape_path = this.prepareRotatedShapePath(this.fillctx, _entry2.shape_rect, preset_config.shape, result.rounding);
          } else {
            _rect = _entry2.shape_rect.resized(growth, growth);
            this.fillctx.save();
            paintFill({
              rect: _rect,
              index: _i3,
              smoothing: smoothing
            });
            this.fillctx.restore();
            _shape_path = this.prepareShapePath(this.fillctx, _entry2.shape_rect, preset_config.shape, rounding);
          }
          this.fillctx.globalCompositeOperation = "destination-in";
          this.fillctx.filter = "blur(".concat(smoothing, "px)");
          if (_shape_path) {
            this.fillctx.fill(_shape_path);
          } else {
            this.fillctx.fill();
          }
          this.fillctx.globalCompositeOperation = "source-over";
          this.fillctx.filter = "none";
          tempctx.drawImage(this.fill, _rect.x, _rect.y, _rect.w, _rect.h, _rect.x, _rect.y, _rect.w, _rect.h);
          min_x = Math.min(min_x, _rect.x);
          min_y = Math.min(min_y, _rect.y);
          max_x = Math.max(max_x, _rect.x + _rect.w);
          max_y = Math.max(max_y, _rect.y + _rect.h);
        }
        this.fill = temp;
        this.fillctx = tempctx;
      }
      min_x = Math.max(0, Math.floor(min_x));
      min_y = Math.max(0, Math.floor(min_y));
      max_x = Math.min(this.natural_width, Math.ceil(max_x));
      max_y = Math.min(this.natural_height, Math.ceil(max_y));
      var bounding_rect = new Rectangle(min_x, min_y, max_x - min_x, max_y - min_y);
      this.finishAreas(bounding_rect, result, cache);
      if (should_draw_border) {
        this.fillctx.clearRect(0, 0, this.natural_width, this.natural_height);
        this.fillctx.save();
        this.fillctx.lineWidth = border_width * 2;
        var _toHexAndAlpha3 = (0,external_puryfiCoreContext_namespaceObject.toHexAndAlpha)(preset_config.border_color),
          _toHexAndAlpha4 = _slicedToArray(_toHexAndAlpha3, 2),
          border_color = _toHexAndAlpha4[0],
          border_alpha = _toHexAndAlpha4[1];
        var _iterator13 = _createForOfIteratorHelper(entries),
          _step13;
        try {
          for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
            var _entry3 = _step13.value;
            this.fillctx.save();
            this.fillctx.globalCompositeOperation = "source-over";
            this.fillctx.strokeStyle = border_color;
            var _shape_path2 = void 0;
            if (isRotatedNonLineEntry(_entry3)) {
              _shape_path2 = this.prepareRotatedShapePath(this.fillctx, _entry3.shape_rect, result.preset_config.shape, result.rounding);
            } else {
              _shape_path2 = this.prepareShapePath(this.fillctx, _entry3.shape_rect, preset_config.shape, rounding);
            }
            if (_shape_path2) {
              this.fillctx.stroke(_shape_path2);
            } else {
              this.fillctx.stroke();
            }
            this.fillctx.globalCompositeOperation = "destination-out";
            this.fillctx.fillStyle = "black";
            if (_shape_path2) {
              this.fillctx.fill(_shape_path2);
            } else {
              this.fillctx.fill();
            }
            this.fillctx.restore();
          }
        } catch (err) {
          _iterator13.e(err);
        } finally {
          _iterator13.f();
        }
        this.outctx.globalAlpha = border_alpha;
        this.outctx.drawImage(this.fill, bounding_rect.x, bounding_rect.y, bounding_rect.w, bounding_rect.h, bounding_rect.x, bounding_rect.y, bounding_rect.w, bounding_rect.h);
        this.outctx.globalAlpha = 1;
        this.fillctx.restore();
      }
    }
  }, {
    key: "getRotatedRectCorners",
    value: function getRotatedRectCorners(cx, cy, w, h, theta) {
      var hw = w / 2;
      var hh = h / 2;
      var cos_theta = Math.cos(theta);
      var sin_theta = Math.sin(theta);
      return [{
        x: -hw,
        y: -hh
      }, {
        x: hw,
        y: -hh
      }, {
        x: hw,
        y: hh
      }, {
        x: -hw,
        y: hh
      }].map(function (corner) {
        var x = corner.x * cos_theta - corner.y * sin_theta;
        var y = corner.x * sin_theta + corner.y * cos_theta;
        return {
          x: x + cx,
          y: y + cy
        };
      });
    }
  }, {
    key: "rotatedRoundRect",
    value: function rotatedRoundRect(path, rect, rounding) {
      var corners = rect.corners,
        w = rect.w,
        h = rect.h,
        theta = rect.theta;
      rounding = Math.min(rounding, w / 2, h / 2);
      path.moveTo(corners[0].x + rounding * Math.cos(theta), corners[0].y + rounding * Math.sin(theta));
      path.arcTo(corners[1].x, corners[1].y, corners[2].x, corners[2].y, rounding);
      path.arcTo(corners[2].x, corners[2].y, corners[3].x, corners[3].y, rounding);
      path.arcTo(corners[3].x, corners[3].y, corners[0].x, corners[0].y, rounding);
      path.arcTo(corners[0].x, corners[0].y, corners[1].x, corners[1].y, rounding);
      path.closePath();
    }
  }, {
    key: "addRotatedShapePath",
    value: function addRotatedShapePath(path, shape, rect, rounding) {
      switch (shape) {
        case external_puryfiCoreContext_namespaceObject.CensorShape.RECTANGLE:
          {
            this.rotatedRoundRect(path, rect, rounding);
            break;
          }
        case external_puryfiCoreContext_namespaceObject.CensorShape.CIRCLE:
        case external_puryfiCoreContext_namespaceObject.CensorShape.ELLIPSE:
          {
            path.ellipse(rect.cx, rect.cy, rect.w / 2, rect.h / 2, rect.theta, 0, 2 * Math.PI);
            path.closePath();
            break;
          }
        case external_puryfiCoreContext_namespaceObject.CensorShape.HEART:
          {
            var heart_path = new Path2D("M12,24l-1.7-1.7C4.1,16.2,0,12.1,0,7.2C0,3.2,2.9,0,6.6,0c2.1,0,4.1,1.1,5.4,2.7C13.3,1.1,15.3,0,17.4,0C21.1,0,24,3.2,24,7.2c0,4.9-4.1,9-10.3,15.1L12,24z");
            var matrix = new DOMMatrix();
            matrix.translateSelf(rect.cx, rect.cy);
            matrix.rotateSelf(rect.theta * 180 / Math.PI);
            matrix.translateSelf(-rect.w / 2, -rect.h / 2);
            matrix.scaleSelf(rect.w / 24, rect.h / 24);
            path.addPath(heart_path, matrix);
            break;
          }
      }
    }
  }, {
    key: "prepareRotatedShapePath",
    value: function prepareRotatedShapePath(ctx, rect, shape, rounding) {
      switch (shape) {
        case external_puryfiCoreContext_namespaceObject.CensorShape.RECTANGLE:
          {
            ctx.beginPath();
            this.rotatedRoundRect(ctx, rect, rounding);
            break;
          }
        case external_puryfiCoreContext_namespaceObject.CensorShape.CIRCLE:
        case external_puryfiCoreContext_namespaceObject.CensorShape.ELLIPSE:
          {
            ctx.beginPath();
            ctx.ellipse(rect.cx, rect.cy, rect.w / 2, rect.h / 2, rect.theta, 0, 2 * Math.PI);
            ctx.closePath();
            break;
          }
        case external_puryfiCoreContext_namespaceObject.CensorShape.HEART:
          {
            var matrix = new DOMMatrix();
            matrix.translateSelf(rect.cx, rect.cy);
            matrix.rotateSelf(rect.theta * 180 / Math.PI);
            matrix.translateSelf(-rect.w / 2, -rect.h / 2);
            matrix.scaleSelf(rect.w / 24, rect.h / 24);
            var heart_path = new Path2D();
            heart_path.addPath(new Path2D("M12,24l-1.7-1.7C4.1,16.2,0,12.1,0,7.2C0,3.2,2.9,0,6.6,0c2.1,0,4.1,1.1,5.4,2.7C13.3,1.1,15.3,0,17.4,0C21.1,0,24,3.2,24,7.2c0,4.9-4.1,9-10.3,15.1L12,24z"), matrix);
            return heart_path;
          }
      }
    }
  }, {
    key: "addShapePath",
    value: function addShapePath(path, rect, shape, rounding) {
      switch (shape) {
        case external_puryfiCoreContext_namespaceObject.CensorShape.RECTANGLE:
          {
            path.roundRect(rect.x, rect.y, rect.w, rect.h, rounding);
            break;
          }
        case external_puryfiCoreContext_namespaceObject.CensorShape.CIRCLE:
          {
            path.moveTo(rect.x + rect.w, rect.y + rect.h / 2);
            path.arc(rect.x + rect.w / 2, rect.y + rect.h / 2, rect.w / 2, 0, 2 * Math.PI);
            path.closePath();
            break;
          }
        case external_puryfiCoreContext_namespaceObject.CensorShape.ELLIPSE:
          {
            path.moveTo(rect.x + rect.w, rect.y + rect.h / 2);
            path.ellipse(rect.x + rect.w / 2, rect.y + rect.h / 2, rect.w / 2, rect.h / 2, 0, 0, 2 * Math.PI);
            path.closePath();
            break;
          }
        case external_puryfiCoreContext_namespaceObject.CensorShape.HEART:
          {
            var heart_path = new Path2D("M12,24l-1.7-1.7C4.1,16.2,0,12.1,0,7.2C0,3.2,2.9,0,6.6,0c2.1,0,4.1,1.1,5.4,2.7C13.3,1.1,15.3,0,17.4,0C21.1,0,24,3.2,24,7.2c0,4.9-4.1,9-10.3,15.1L12,24z");
            var matrix = new DOMMatrix();
            matrix.translateSelf(rect.x, rect.y);
            matrix.scaleSelf(rect.w / 24, rect.h / 24);
            path.addPath(heart_path, matrix);
            break;
          }
      }
    }
  }, {
    key: "prepareShapePath",
    value: function prepareShapePath(ctx, rect, shape, rounding) {
      switch (shape) {
        case 0:
          {
            ctx.beginPath();
            ctx.roundRect(rect.x, rect.y, rect.w, rect.h, rounding);
            return;
          }
        case 1:
          {
            ctx.beginPath();
            ctx.moveTo(rect.x + rect.w, rect.y + rect.h / 2);
            ctx.arc(rect.x + rect.w / 2, rect.y + rect.h / 2, rect.w / 2, 0, 2 * Math.PI);
            ctx.closePath();
            return;
          }
        case 2:
          {
            ctx.beginPath();
            ctx.moveTo(rect.x + rect.w, rect.y + rect.h / 2);
            ctx.ellipse(rect.x + rect.w / 2, rect.y + rect.h / 2, rect.w / 2, rect.h / 2, 0, 0, 2 * Math.PI);
            ctx.closePath();
            return;
          }
        case 3:
          {
            var matrix = new DOMMatrix();
            matrix.translateSelf(rect.x, rect.y);
            matrix.scaleSelf(rect.w / 24, rect.h / 24);
            var heart_path = new Path2D();
            heart_path.addPath(new Path2D("M12,24l-1.7-1.7C4.1,16.2,0,12.1,0,7.2C0,3.2,2.9,0,6.6,0c2.1,0,4.1,1.1,5.4,2.7C13.3,1.1,15.3,0,17.4,0C21.1,0,24,3.2,24,7.2c0,4.9-4.1,9-10.3,15.1L12,24z"), matrix);
            return heart_path;
          }
      }
    }
  }, {
    key: "prepareLineShapeEntries",
    value: function prepareLineShapeEntries(results, cache) {
      var _this2 = this;
      var LOOSENESSS_PENALTY = 1;
      var LOOSENESS_PENALTY_DISQUALIFIER = 1;
      var POINT_DIST_PENALTY = 1;
      var TWO_POINTS_PENALTY = 2;
      var SINGLE_POINT_PENALTY = 3;
      results.smoothing = Math.round((this.natural_width + this.natural_height) / 2 / 1024 * results.preset_config.feathering);
      results.border_width = results.preset_config.border_width !== 0 ? Math.round(Math.max(1, (this.natural_width + this.natural_height) / 2 / 1024 * results.preset_config.border_width)) : 0;
      var envelopingLines = function envelopingLines(entries) {
        var bestEnvelopingLine = function bestEnvelopingLine(entries) {
          var _this2$bestFitLine = _this2.bestFitLine(entries.map(function (entry) {
              return entry.shape_rect.cx;
            }), entries.map(function (entry) {
              return entry.shape_rect.cy;
            })),
            point = _this2$bestFitLine.point,
            slope = _this2$bestFitLine.slope;
          var inv_slope = -slope;
          var y_intercept = slope * point.x - point.y;
          var denominator = Math.sqrt(Math.pow(inv_slope, 2) + 1);
          var theta = Math.atan(slope);
          var leftmost = Infinity,
            rightmost = -Infinity,
            avg_width = 0;
          var _iterator14 = _createForOfIteratorHelper(entries),
            _step14;
          try {
            for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
              var shape_rect = _step14.value.shape_rect;
              var _this2$cornerIntersec = _this2.cornerIntersectionsWithEllipse(shape_rect.cx, shape_rect.cy, shape_rect.w / 2, shape_rect.h / 2, inv_slope),
                _this2$cornerIntersec2 = _slicedToArray(_this2$cornerIntersec, 2),
                p1 = _this2$cornerIntersec2[0],
                p2 = _this2$cornerIntersec2[1];
              var left = (inv_slope * p1[0] + p1[1] + y_intercept) / denominator;
              var right = (inv_slope * p2[0] + p2[1] + y_intercept) / denominator;
              leftmost = Math.min(leftmost, left);
              rightmost = Math.max(rightmost, right);
              avg_width += right - left;
            }
          } catch (err) {
            _iterator14.e(err);
          } finally {
            _iterator14.f();
          }
          avg_width /= entries.length;
          var width = rightmost - leftmost;
          var penalty = (width / avg_width - 1) * LOOSENESSS_PENALTY;
          if (LOOSENESS_PENALTY_DISQUALIFIER < penalty) return null;
          point.x -= Math.sin(theta) * ((rightmost + leftmost) / 2);
          point.y += Math.cos(theta) * ((rightmost + leftmost) / 2);
          return {
            line: {
              point: point,
              slope: slope,
              width: width
            },
            used_entries: entries,
            penalty: penalty
          };
        };
        var _NEnvelopingLines2 = function NEnvelopingLines(i, curr_used_entries, curr_penalty, entries, entry_counts, calculated_instructions) {
          var entry_count = entry_counts[i];
          var instructions;
          if (calculated_instructions[entry_count] != null) {
            instructions = calculated_instructions[entry_count];
          } else {
            if (entry_count === 1) {
              instructions = entries.map(function (entry) {
                return {
                  used_entries: [entry],
                  penalty: SINGLE_POINT_PENALTY
                };
              });
            } else {
              var entry_combinations = _this2.combinations(entries, entry_count);
              if (2 < entry_count) {
                instructions = entry_combinations.reduce(function (out, entries) {
                  var instruction = bestEnvelopingLine(entries);
                  if (instruction != null) {
                    out.push(instruction);
                  }
                  return out;
                }, []);
              } else {
                instructions = entry_combinations.map(function (entries) {
                  var width = -Infinity;
                  var slope;
                  var y_dist = entries[1].shape_rect.cy - entries[0].shape_rect.cy;
                  var x_dist = entries[1].shape_rect.cx - entries[0].shape_rect.cx;
                  var dist = Math.hypot(y_dist, x_dist);
                  if (y_dist === 0) {
                    if (x_dist === 0) {
                      width = Math.max(entries[0].shape_rect.w, entries[1].shape_rect.w, entries[0].shape_rect.h, entries[1].shape_rect.h);
                    } else {
                      width = Math.max(entries[0].shape_rect.h, entries[1].shape_rect.h);
                    }
                    slope = 0;
                  } else if (x_dist === 0) {
                    width = Math.max(entries[0].shape_rect.w, entries[1].shape_rect.w);
                    slope = Infinity;
                  } else {
                    slope = y_dist / x_dist;
                    var inv_slope = -slope;
                    var y_intercept = slope * entries[0].shape_rect.cx - entries[0].shape_rect.cy;
                    var denominator = Math.sqrt(Math.pow(inv_slope, 2) + 1);
                    var _iterator15 = _createForOfIteratorHelper(entries),
                      _step15;
                    try {
                      for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
                        var entry = _step15.value;
                        var _this2$cornerIntersec3 = _this2.cornerIntersectionsWithEllipse(entry.shape_rect.cx, entry.shape_rect.cy, entry.shape_rect.w / 2, entry.shape_rect.h / 2, inv_slope),
                          _this2$cornerIntersec4 = _slicedToArray(_this2$cornerIntersec3, 2),
                          _ = _this2$cornerIntersec4[0],
                          p = _this2$cornerIntersec4[1];
                        width = Math.max(width, Math.abs((inv_slope * p[0] + p[1] + y_intercept) * 2 / denominator));
                      }
                    } catch (err) {
                      _iterator15.e(err);
                    } finally {
                      _iterator15.f();
                    }
                  }
                  return {
                    line: {
                      point: {
                        x: entries[0].shape_rect.cx,
                        y: entries[0].shape_rect.cy
                      },
                      slope: slope,
                      width: width
                    },
                    used_entries: entries,
                    penalty: TWO_POINTS_PENALTY + dist / Math.hypot(_this2.natural_width, _this2.natural_height) * POINT_DIST_PENALTY
                  };
                });
              }
            }
            calculated_instructions[entry_count] = instructions;
          }
          instructions = instructions.filter(function (line) {
            return !arrIntersects(curr_used_entries, line.used_entries);
          });
          if (instructions.length <= 0) {
            return {
              lines_with_entries: [],
              penalty: Infinity
            };
          }
          if (i < entry_counts.length - 1) {
            var min_penalty = Infinity;
            var best_lines_with_entries = [];
            var _iterator16 = _createForOfIteratorHelper(instructions),
              _step16;
            try {
              for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
                var instruction = _step16.value;
                var _NEnvelopingLines = _NEnvelopingLines2(i + 1, [].concat(_toConsumableArray(curr_used_entries), _toConsumableArray(instruction.used_entries)), curr_penalty + instruction.penalty, entries, entry_counts, calculated_instructions),
                  lines_with_entries = _NEnvelopingLines.lines_with_entries,
                  penalty = _NEnvelopingLines.penalty;
                if (penalty < min_penalty) {
                  min_penalty = penalty;
                  best_lines_with_entries = [{
                    line: instruction.line,
                    used_entries: instruction.used_entries
                  }].concat(_toConsumableArray(lines_with_entries));
                }
              }
            } catch (err) {
              _iterator16.e(err);
            } finally {
              _iterator16.f();
            }
            return {
              lines_with_entries: best_lines_with_entries,
              penalty: min_penalty
            };
          } else {
            var best_instruction = (0,external_puryfiCoreContext_namespaceObject.minOf)(instructions, function (instruction) {
              return instruction.penalty;
            });
            return {
              lines_with_entries: [{
                line: best_instruction.line,
                used_entries: best_instruction.used_entries
              }],
              penalty: (curr_penalty + best_instruction.penalty) / entries.length
            };
          }
        };
        var cached_possible_outputs = {};
        for (var section_count = 1; section_count < entries.length; section_count++) {
          var all_entry_counts = _this2.splitAmount(entries.length, section_count);
          var _iterator17 = _createForOfIteratorHelper(all_entry_counts.reverse()),
            _step17;
          try {
            for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
              var entry_counts = _step17.value;
              var _NEnvelopingLines3 = _NEnvelopingLines2(0, [], 0, entries, entry_counts, cached_possible_outputs),
                lines_with_entries = _NEnvelopingLines3.lines_with_entries,
                penalty = _NEnvelopingLines3.penalty;
              if (penalty !== Infinity) {
                return lines_with_entries;
              }
            }
          } catch (err) {
            _iterator17.e(err);
          } finally {
            _iterator17.f();
          }
        }
      };
      var entries_per_body_part = {};
      var _iterator18 = _createForOfIteratorHelper(results.entries),
        _step18;
      try {
        for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
          var entry = _step18.value;
          entry.shape_rect = entry.rect.scaled(results.preset_config.scale, results.preset_config.scale);
          if (!entries_per_body_part[entry.klass.body_part_index]) {
            entries_per_body_part[entry.klass.body_part_index] = [entry];
          } else {
            entries_per_body_part[entry.klass.body_part_index].push(entry);
          }
        }
      } catch (err) {
        _iterator18.e(err);
      } finally {
        _iterator18.f();
      }
      entries_per_body_part = Object.values(entries_per_body_part);
      var _partition = (0,external_puryfiCoreContext_namespaceObject.partition)(entries_per_body_part, function (entries) {
          return 1 < entries.length;
        }),
        _partition2 = _slicedToArray(_partition, 2),
        pairable_entries_by_body_part = _partition2[0],
        single_entries_by_body_part = _partition2[1];
      var new_entries = [];
      var lines_with_entries_from_pairing = [];
      var _iterator19 = _createForOfIteratorHelper(pairable_entries_by_body_part),
        _step19;
      try {
        for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
          var entries = _step19.value;
          var lines_with_entries = envelopingLines(entries);
          var _iterator21 = _createForOfIteratorHelper(lines_with_entries),
            _step21;
          try {
            for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
              var line_with_entries = _step21.value;
              if (line_with_entries.line == null) {
                single_entries_by_body_part.push(line_with_entries.used_entries);
                continue;
              }
              lines_with_entries_from_pairing.push(line_with_entries);
            }
          } catch (err) {
            _iterator21.e(err);
          } finally {
            _iterator21.f();
          }
        }
      } catch (err) {
        _iterator19.e(err);
      } finally {
        _iterator19.f();
      }
      var _iterator20 = _createForOfIteratorHelper(single_entries_by_body_part),
        _step20;
      try {
        var _loop3 = function _loop3() {
          var _step20$value = _slicedToArray(_step20.value, 1),
            entry = _step20$value[0];
          var point = {
            x: entry.shape_rect.cx,
            y: entry.shape_rect.cy
          };
          var slope = 0;
          if (0 < lines_with_entries_from_pairing.length) {
            var _minOf = (0,external_puryfiCoreContext_namespaceObject.minOf)(lines_with_entries_from_pairing, function (_ref6) {
              var line = _ref6.line;
              return Math.abs(_this2.pointToLineDist(point.x, point.y, line.slope, line.slope * line.point.x - line.point.y)) - line.width / 2;
            });
            var _minOf$line$slope = _minOf.line.slope;
            slope = _minOf$line$slope === void 0 ? 0 : _minOf$line$slope;
          }
          var width = slope === 0 ? entry.shape_rect.h : _this2.envelopingLineWidth(entry.shape_rect.w, entry.shape_rect.h, -1 / slope);
          entry.line = {
            point: point,
            slope: slope,
            width: width
          };
          new_entries.push(entry);
        };
        for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
          _loop3();
        }
      } catch (err) {
        _iterator20.e(err);
      } finally {
        _iterator20.f();
      }
      for (var _i4 = 0, _lines_with_entries_f = lines_with_entries_from_pairing; _i4 < _lines_with_entries_f.length; _i4++) {
        var _lines_with_entries_f2 = _lines_with_entries_f[_i4],
          line = _lines_with_entries_f2.line,
          used_entries = _lines_with_entries_f2.used_entries;
        var new_klass = used_entries[0].klass;
        var new_score = used_entries[0].score;
        for (var i = 1; i < used_entries.length; i++) {
          var other_entry = used_entries[i];
          new_klass = {
            key: new_klass.key,
            name: new_klass.name === other_entry.klass.name ? new_klass.name : new_klass.name + " & " + other_entry.klass.name,
            index: new_klass.index,
            nude: new_klass.nude || other_entry.klass.nude,
            erotic: new_klass.erotic || other_entry.klass.erotic
          };
          new_score = (new_score + other_entry.score) / 2;
        }
        new_entries.push({
          line: line,
          klass: new_klass,
          score: new_score,
          orig_rects: used_entries.map(function (entry) {
            return entry.rect;
          })
        });
      }
      results.entries = new_entries;
    }
  }, {
    key: "prepareEntries",
    value: function prepareEntries(censor_type, results_by_preset_ident, config, cache) {
      var _this3 = this;
      var _loop4 = function _loop4() {
        var result = results_by_preset_ident[preset_ident];
        var cluster_preset_config;
        if (config.clustering_configuration.enabled && result.preset_config.cluster) {
          cluster_preset_config = (0,external_puryfiCoreContext_namespaceObject.getPresetWithFallback)(config.clustering_configuration, result.preset_config.cluster_preset_index).config;
          cluster(result, cluster_preset_config);
        }
        switch (censor_type) {
          case external_puryfiCoreContext_namespaceObject.effects.BAR.index:
          case external_puryfiCoreContext_namespaceObject.effects.PIXEL.index:
          case external_puryfiCoreContext_namespaceObject.effects.BLUR.index:
          case external_puryfiCoreContext_namespaceObject.effects.TRIANGLE.index:
          case external_puryfiCoreContext_namespaceObject.effects.SOBEL.index:
            if (result.preset_config.shape === 4) {
              _this3.prepareLineShapeEntries(result, cache);
              break;
            }
            result.border_width = Math.round(Math.max(1, (_this3.natural_width + _this3.natural_height) / 2 / 1024) * result.preset_config.border_width);
            result.smoothing = Math.round((_this3.natural_width + _this3.natural_height) / 2 / 1024 * result.preset_config.feathering);
            result.rounding = 0;
            var _iterator22 = _createForOfIteratorHelper(result.entries),
              _step22;
            try {
              for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
                var entry = _step22.value;
                if (cluster_preset_config != null && cluster_preset_config.rotation && 1 < entry.orig_rects.length) {
                  if (result.preset_config.shape == external_puryfiCoreContext_namespaceObject.CensorShape.RECTANGLE) {
                    result.rounding = Math.round(Math.sqrt(_this3.natural_width * _this3.natural_height) / 1024 * result.preset_config.rounding);
                  }
                  var orig_scaled_rects = entry.orig_rects.map(function (rect) {
                    return rect.scaled(result.preset_config.scale, result.preset_config.scale);
                  });
                  var _this3$bestFitLine = _this3.bestFitLine(orig_scaled_rects.map(function (r) {
                      return r.cx;
                    }), orig_scaled_rects.map(function (r) {
                      return r.cy;
                    })),
                    point = _this3$bestFitLine.point,
                    slope = _this3$bestFitLine.slope;
                  if (slope === 0 || slope === Infinity) {
                    var rect = entry.rect.scaled(result.preset_config.scale, result.preset_config.scale);
                    var cx = rect.cx;
                    var cy = rect.cy;
                    var w = rect.w;
                    var h = rect.h;
                    var theta = 0;
                    if (0 < result.smoothing) {
                      w += result.smoothing * 2.4;
                      h += result.smoothing * 2.4;
                    }
                    var corners = _this3.getRotatedRectCorners(cx, cy, w, h, theta);
                    entry.shape_rect = new RotatedRectangle(cx, cy, w, h, theta, corners);
                  } else {
                    var y_intercept = slope * point.x - point.y;
                    var denominator = Math.sqrt(Math.pow(-slope, 2) + 1);
                    var _theta = Math.atan(slope);
                    var leftmost = Infinity,
                      rightmost = -Infinity;
                    var _iterator23 = _createForOfIteratorHelper(orig_scaled_rects),
                      _step23;
                    try {
                      for (_iterator23.s(); !(_step23 = _iterator23.n()).done;) {
                        var _rect2 = _step23.value;
                        var _this3$cornerIntersec = _this3.cornerIntersectionsWithEllipse(_rect2.cx, _rect2.cy, _rect2.w / 2, _rect2.h / 2, -slope),
                          _this3$cornerIntersec2 = _slicedToArray(_this3$cornerIntersec, 2),
                          p1 = _this3$cornerIntersec2[0],
                          p2 = _this3$cornerIntersec2[1];
                        var left = (-slope * p1[0] + p1[1] + y_intercept) / denominator;
                        var right = (-slope * p2[0] + p2[1] + y_intercept) / denominator;
                        leftmost = Math.min(leftmost, left);
                        rightmost = Math.max(rightmost, right);
                      }
                    } catch (err) {
                      _iterator23.e(err);
                    } finally {
                      _iterator23.f();
                    }
                    var _h = rightmost - leftmost;
                    point.x -= Math.sin(_theta) * ((rightmost + leftmost) / 2);
                    point.y += Math.cos(_theta) * ((rightmost + leftmost) / 2);
                    var inv_slope = 1 / slope;
                    var inv_y_intercept = -inv_slope * point.x - point.y;
                    var inv_denominator = Math.sqrt(Math.pow(-inv_slope, 2) + 1);
                    var furthermostNeg = Infinity,
                      furthermostPos = -Infinity;
                    var _iterator24 = _createForOfIteratorHelper(orig_scaled_rects),
                      _step24;
                    try {
                      for (_iterator24.s(); !(_step24 = _iterator24.n()).done;) {
                        var _rect3 = _step24.value;
                        var radial_dist = _this3.radialDist(_rect3.w / 2, _rect3.h / 2, _theta);
                        var center_dist = (inv_slope * _rect3.cx + _rect3.cy + inv_y_intercept) / inv_denominator;
                        furthermostNeg = Math.min(furthermostNeg, center_dist - radial_dist);
                        furthermostPos = Math.max(furthermostPos, center_dist + radial_dist);
                      }
                    } catch (err) {
                      _iterator24.e(err);
                    } finally {
                      _iterator24.f();
                    }
                    var _w = furthermostPos - furthermostNeg;
                    furthermostPos *= Math.sign(slope);
                    furthermostNeg *= Math.sign(slope);
                    var furthermostPointPos = new Point(point.x + Math.cos(_theta) * furthermostPos, point.y + Math.sin(_theta) * furthermostPos);
                    var furthermostPointNeg = new Point(point.x + Math.cos(_theta) * furthermostNeg, point.y + Math.sin(_theta) * furthermostNeg);
                    var _cx = (furthermostPointNeg.x + furthermostPointPos.x) / 2;
                    var _cy = (furthermostPointNeg.y + furthermostPointPos.y) / 2;
                    if (0 < result.smoothing) {
                      _w += result.smoothing * 2.4;
                      _h += result.smoothing * 2.4;
                    }
                    if (result.preset_config.shape === external_puryfiCoreContext_namespaceObject.CensorShape.HEART) {
                      _w = _h = Math.max(_w, _h);
                    }
                    var _corners = _this3.getRotatedRectCorners(_cx, _cy, _w, _h, _theta);
                    entry.shape_rect = new RotatedRectangle(_cx, _cy, _w, _h, _theta, _corners);
                  }
                } else {
                  entry.shape_rect = entry.rect.scaled(result.preset_config.scale, result.preset_config.scale);
                  switch (result.preset_config.shape) {
                    case 0:
                      {
                        result.rounding = Math.round(Math.sqrt(_this3.natural_width * _this3.natural_height) / 1024 * result.preset_config.rounding);
                        break;
                      }
                    case 1:
                      {
                        var rwh = (entry.shape_rect.w + entry.shape_rect.h) / 2;
                        entry.shape_rect.resize(rwh - entry.shape_rect.w, rwh - entry.shape_rect.h);
                        break;
                      }
                    case 2:
                      {
                        break;
                      }
                    case 3:
                      {
                        var _rwh = (entry.shape_rect.w + entry.shape_rect.h) / 2;
                        entry.shape_rect.resize(_rwh - entry.shape_rect.w, _rwh - entry.shape_rect.h);
                        break;
                      }
                  }
                  entry.effect_rect = entry.shape_rect;
                  if (0 < result.smoothing) {
                    entry.effect_rect = entry.effect_rect.resized(result.smoothing * 7.2, result.smoothing * 7.2);
                    entry.shape_rect.resize(result.smoothing * 2.4, result.smoothing * 2.4);
                  }
                }
              }
            } catch (err) {
              _iterator22.e(err);
            } finally {
              _iterator22.f();
            }
            break;
          case external_puryfiCoreContext_namespaceObject.effects.BOX.index:
            result.border_width = Math.round(Math.max(1, (_this3.natural_width + _this3.natural_height) / 2 / 1024) * result.preset_config.border_width);
            var _iterator25 = _createForOfIteratorHelper(result.entries),
              _step25;
            try {
              for (_iterator25.s(); !(_step25 = _iterator25.n()).done;) {
                var _entry4 = _step25.value;
                _entry4.shape_rect = _entry4.rect.scaled(result.preset_config.scale, result.preset_config.scale);
              }
            } catch (err) {
              _iterator25.e(err);
            } finally {
              _iterator25.f();
            }
          case external_puryfiCoreContext_namespaceObject.effects.GLITCH.index:
            var _iterator26 = _createForOfIteratorHelper(result.entries),
              _step26;
            try {
              for (_iterator26.s(); !(_step26 = _iterator26.n()).done;) {
                var _entry5 = _step26.value;
                _entry5.shape_rect = _entry5.rect.scaled(result.preset_config.scale, result.preset_config.scale);
              }
            } catch (err) {
              _iterator26.e(err);
            } finally {
              _iterator26.f();
            }
            break;
          case external_puryfiCoreContext_namespaceObject.effects.STICKER.index:
            var _iterator27 = _createForOfIteratorHelper(result.entries),
              _step27;
            try {
              for (_iterator27.s(); !(_step27 = _iterator27.n()).done;) {
                var _entry6 = _step27.value;
                _entry6.shape_rect = _entry6.rect.scaled(result.preset_config.scale, result.preset_config.scale);
              }
            } catch (err) {
              _iterator27.e(err);
            } finally {
              _iterator27.f();
            }
            break;
          case external_puryfiCoreContext_namespaceObject.effects.SPLATTER.index:
            var _iterator28 = _createForOfIteratorHelper(result.entries),
              _step28;
            try {
              for (_iterator28.s(); !(_step28 = _iterator28.n()).done;) {
                var _entry7 = _step28.value;
                _entry7.shape_rect = _entry7.rect.scaled(result.preset_config.scale, result.preset_config.scale);
              }
            } catch (err) {
              _iterator28.e(err);
            } finally {
              _iterator28.f();
            }
            break;
        }
      };
      for (var preset_ident in results_by_preset_ident) {
        _loop4();
      }
    }
  }, {
    key: "pointToLineDist",
    value: function pointToLineDist(x, y, m, c) {
      var A = -m;
      var n = A * x + y + c;
      var d = Math.sqrt(Math.pow(A, 2) + 1);
      return n / d;
    }
  }, {
    key: "envelopingLineWidth",
    value: function envelopingLineWidth(width, height, slope) {
      var w = width / 2;
      var h = height / 2;
      var m = slope;
      var L = Math.sqrt((Math.pow(h, 2) * Math.pow(m, 2) + Math.pow(w, 2)) / (Math.pow(m, 2) + 1));
      return L * 2;
    }
  }, {
    key: "radialDist",
    value: function radialDist(a, b, theta) {
      var intersectionLength = Math.sqrt(Math.pow(a, 2) * Math.pow(b, 2) / (Math.pow(a, 2) * Math.pow(Math.sin(theta), 2) + Math.pow(b, 2) * Math.pow(Math.cos(theta), 2)));
      return intersectionLength;
    }
  }, {
    key: "standardDev",
    value: function standardDev(V) {
      var n = V.length;
      var mean = V.reduce(function (a, b) {
        return a + b;
      }) / n;
      return Math.sqrt(V.map(function (x) {
        return Math.pow(x - mean, 2);
      }).reduce(function (a, b) {
        return a + b;
      }) / n);
    }
  }, {
    key: "bestFitLine",
    value: function bestFitLine(X, Y) {
      var greater_y_dev = this.standardDev(X) < this.standardDev(Y);
      if (greater_y_dev) {
        var _ref7 = [Y, X];
        X = _ref7[0];
        Y = _ref7[1];
      }
      var sum_x = 0;
      var sum_y = 0;
      var sum_xy = 0;
      var sum_xx = 0;
      var n = X.length;
      for (var i = 0; i < n; i++) {
        var x = X[i];
        var y = Y[i];
        sum_x += x;
        sum_y += y;
        sum_xx += x * x;
        sum_xy += x * y;
      }
      var m, b;
      var denominator = n * sum_xx - sum_x * sum_x;
      if (denominator !== 0) {
        m = (n * sum_xy - sum_x * sum_y) / denominator;
        b = sum_y / n - m * sum_x / n;
      } else {
        return {
          point: {
            x: X[0],
            y: Y[0]
          },
          slope: 0
        };
      }
      var point, slope;
      if (greater_y_dev) {
        point = {
          x: X[0] * m + b,
          y: X[0]
        };
        slope = 1 / m;
      } else {
        point = {
          x: X[0],
          y: X[0] * m + b
        };
        slope = m;
      }
      return {
        point: point,
        slope: slope
      };
    }
  }, {
    key: "extendLine",
    value: function extendLine(point, slope, left, right, top, bottom) {
      var y_at_left = slope * (left - point.x) + point.y;
      var y_at_right = slope * (right - point.x) + point.y;
      var x_at_top = (top - point.y) / slope + point.x;
      var x_at_bottom = (bottom - point.y) / slope + point.x;
      var py1 = {
        x: x_at_top,
        y: top
      };
      var py2 = {
        x: x_at_bottom,
        y: bottom
      };
      var px1 = {
        x: left,
        y: y_at_left
      };
      var px2 = {
        x: right,
        y: y_at_right
      };
      var r, s;
      if (y_at_left < top) {
        r = py1;
      } else if (y_at_left <= bottom) {
        r = px1;
      } else {
        r = py2;
      }
      if (y_at_right < top) {
        s = py1;
      } else if (y_at_right <= bottom) {
        s = px2;
      } else {
        s = py2;
      }
      return [r, s];
    }
  }, {
    key: "degreesToRadians",
    value: function degreesToRadians(degrees) {
      return degrees * Math.PI / 180;
    }
  }, {
    key: "parallelLinesDist",
    value: function parallelLinesDist(angle, x1, y1, x2, y2) {
      var direction_x = Math.cos(angle);
      var direction_y = Math.sin(angle);
      var point_dist_x = x1 - x2;
      var point_dist_y = y1 - y2;
      return Math.abs((point_dist_x * direction_x + point_dist_y * direction_y) / Math.sqrt(Math.pow(direction_x, 2) + Math.pow(direction_y, 2)));
    }
  }, {
    key: "pointAtAngle",
    value: function pointAtAngle(center_x, center_y, h_radius, v_radius, angle) {
      var x = center_x + h_radius * Math.cos(angle);
      var y = center_y + v_radius * Math.sin(angle);
      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "prepareTextMask",
    value: function prepareTextMask(preset_config, preset_ident, cache) {
      var _this4 = this;
      var paintTextMask = function paintTextMask(ctx, color_override) {
        if (preset_config.word_pool) {
          ctx.save();
          var raw_angle = preset_config.angle;
          if (Math.random() < 0.5) {
            raw_angle *= -1;
          }
          var angle = raw_angle < 0 ? raw_angle + 360 : raw_angle;
          var quarter_rotations = Math.floor(angle / 90);
          var quarter_angle_rem = angle % 90;
          var quarter_folded_angle = angle;
          quarter_folded_angle -= Math.max(0, quarter_folded_angle - 180) * 2;
          quarter_folded_angle -= Math.max(0, quarter_folded_angle - 90) * 2;
          var length = _this4.parallelLinesDist(_this4.degreesToRadians(quarter_folded_angle), 0, 0, _this4.natural_width, _this4.natural_height);
          var natural_size = (_this4.natural_width + _this4.natural_height) / 2;
          var font_size = Math.ceil(natural_size / 100 * preset_config.size);
          ctx.font = "".concat(preset_config.font_style, " ").concat(font_size, "px ").concat((0,external_puryfiCoreContext_namespaceObject.escapeQuotes)(preset_config.font));
          var gap = preset_config.horizontal_spacing;
          gap = new Array(gap + 1).join(" ");
          var line_h = Math.ceil(font_size * preset_config.vertical_spacing);
          var offset = ctx.measureText(" ").width * preset_config.offset;
          var textpool = _toConsumableArray(preset_config.word_pool);
          var txt = textpool.sort(function () {
            return 0.5 - Math.random();
          })[0];
          if (preset_config.draw_mode === 1) {
            var r = [];
            for (var i = 0; i < preset_config.word_pool.length; i++) {
              r.push(textpool.sort(function () {
                return 0.5 - Math.random();
              })[0]);
            }
            txt = r.join(gap);
          } else if (preset_config.draw_mode === 2) {
            txt = textpool.join(gap);
          }
          var width = Math.ceil(ctx.measureText(txt + gap).width);
          var half_natural_width = _this4.natural_width / 2;
          var half_natural_height = _this4.natural_height / 2;
          var center = _this4.pointAtAngle(half_natural_width, half_natural_height, half_natural_width, half_natural_height, _this4.degreesToRadians((quarter_rotations - 1) * 90));
          var radius = quarter_rotations % 2 === 0 ? half_natural_width : half_natural_height;
          var _final = _this4.pointAtAngle(center.x, center.y, radius, radius, _this4.degreesToRadians(quarter_angle_rem * 2 + (quarter_rotations - 2) * 90));
          ctx.translate(_final.x, _final.y);
          ctx.rotate(angle * Math.PI / 180);
          ctx.fillStyle = color_override || (preset_config.color_mode === 0 ? "#000" : preset_config.color);
          ctx.textBaseline = "top";
          var w_required = length;
          var repeats = Math.max(1, Math.ceil(w_required / width)) + 1;
          var line = new Array(repeats + 1).join(txt + gap);
          var line_w = ctx.measureText(line).width;
          var temp = createCanvas(line_w, line_h);
          var temp_ctx = temp.getContext("2d");
          temp_ctx.fillStyle = color_override || (preset_config.color_mode === 0 ? "#000" : preset_config.color);
          temp_ctx.font = "".concat(preset_config.font_style, " ").concat(font_size, "px ").concat((0,external_puryfiCoreContext_namespaceObject.escapeQuotes)(preset_config.font));
          temp_ctx.textBaseline = "top";
          temp_ctx.fillText(line, 0, 0);
          for (var _i5 = 0; _i5 < length; _i5++) {
            ctx.drawImage(temp, _i5 * offset % width, 0, line_w, line_h, 0, _i5 * line_h, line_w, line_h);
          }
          ctx.restore();
        }
      };
      if (cache.mixed_mode || cache.video_frame) {
        var ctx, alpha;
        if (cache["preset_ident_".concat(preset_ident, "_word_wall_output")]) {
          ctx = cache["preset_ident_".concat(preset_ident, "_word_wall_output")];
          alpha = (0,external_puryfiCoreContext_namespaceObject.getHexAlpha)(preset_config.color);
        } else {
          var canvas = createCanvas(this.natural_width, this.natural_height);
          ctx = canvas.getContext("2d");
          var color;
          if (preset_config.color_mode === 0) {
            color = "#000";
            alpha = 1;
          } else {
            var _toHexAndAlpha5 = (0,external_puryfiCoreContext_namespaceObject.toHexAndAlpha)(preset_config.color);
            var _toHexAndAlpha6 = _slicedToArray(_toHexAndAlpha5, 2);
            color = _toHexAndAlpha6[0];
            alpha = _toHexAndAlpha6[1];
          }
          paintTextMask(ctx, color);
        }
        if (preset_config.color_mode === 0) {
          ctx.globalCompositeOperation = "source-atop";
          ctx.drawImage(this.clip, 0, 0, this.natural_width, this.natural_height);
        }
        cache["preset_ident_".concat(preset_ident, "_word_wall_output")] = ctx;
        return [ctx, alpha];
      } else {
        var _ctx = this.auxctx;
        _ctx.clearRect(0, 0, this.natural_width, this.natural_height);
        paintTextMask(_ctx);
        if (preset_config.color_mode === 0) {
          _ctx.globalCompositeOperation = "source-atop";
          _ctx.drawImage(this.clip, 0, 0, this.natural_width, this.natural_height);
          _ctx.globalCompositeOperation = "source-over";
        }
        return [_ctx, 1];
      }
    }
  }, {
    key: "pixelateCanvas",
    value: function pixelateCanvas(preset_config, cache) {
      var rect = new Rectangle(0, 0, this.natural_width, this.natural_height);
      var natural_size = (this.natural_width + this.natural_height) / 2;
      var strength = preset_config.strength;
      strength = Math.max(1, Math.round(natural_size / 1024 * strength));
      if (preset_config.ty === 3) {
        halftonePixel(this.outctx, this.clipctx, rect, strength, preset_config.density, preset_config.color, preset_config.bg_color, preset_config.accurate_sampling, preset_config.color_mode);
      } else {
        var color_precision = 256 / (preset_config.channel_colors - 1);
        var grid_width = preset_config.grid_width;
        if (grid_width) {
          grid_width = preset_config.grid_width ? Math.round(Math.max(1, natural_size / 1024 * preset_config.grid_width)) : 0;
          this.outctx.fillStyle = preset_config.grid_color;
          this.outctx.fillRect(0, 0, this.natural_width, this.natural_height);
        }
        if (preset_config.ty === 2) {
          glitchPixel(this.outctx, rect, strength, grid_width, this.clipdata, preset_config.grayscale, color_precision, preset_config.accurate_sampling);
        } else if (preset_config.ty === 1) {
          if (grid_width) {
            this.auxctx.clearRect(0, 0, this.natural_width, this.natural_height);
            hexagonPixel(this.auxctx, rect, strength, grid_width, this.clipdata, preset_config.grayscale, color_precision, preset_config.accurate_sampling);
            this.outctx.drawImage(this.aux, 0, 0);
          } else {
            hexagonPixel(this.outctx, rect, strength, grid_width, this.clipdata, preset_config.grayscale, color_precision, preset_config.accurate_sampling);
          }
        } else {
          mosaicPixel(this.outctx, rect, strength, grid_width, this.clipdata, preset_config.grayscale, color_precision, preset_config.accurate_sampling);
        }
      }
      this.finishReverse(cache, preset_config);
    }
  }, {
    key: "pixelateAreas",
    value: function pixelateAreas(results_by_preset_ident, cache) {
      var _this5 = this;
      var paintPixels = function paintPixels(rect, strength, grid_width, preset_config) {
        var x = Math.max(0, rect.x);
        var y = Math.max(0, rect.y);
        var w = Math.min(_this5.natural_width, rect.x + rect.w) - x;
        var h = Math.min(_this5.natural_height, rect.y + rect.h) - y;
        rect = new Rectangle(x, y, w, h);
        if (preset_config.ty === 3) {
          halftonePixel(_this5.fillctx, _this5.clipctx, rect, strength, preset_config.density, preset_config.color, preset_config.bg_color, preset_config.accurate_sampling, preset_config.color_mode);
        } else {
          if (grid_width && !(0,external_puryfiCoreContext_namespaceObject.isHexColorOpaque)(preset_config.grid_color)) {
            _this5.fillctx.drawImage(_this5.clip, rect.x, rect.y, rect.w, rect.h, rect.x, rect.y, rect.w, rect.h);
          }
          if (grid_width) {
            _this5.fillctx.fillStyle = preset_config.grid_color;
            _this5.fillctx.fillRect(rect.x, rect.y, rect.w, rect.h);
          }
          var color_precision = 256 / (preset_config.channel_colors - 1);
          if (preset_config.ty === 2) {
            glitchPixel(_this5.fillctx, rect, strength, grid_width, _this5.clipdata, preset_config.grayscale, color_precision, preset_config.accurate_sampling);
          } else if (preset_config.ty === 1) {
            hexagonPixel(_this5.fillctx, rect, strength, grid_width, _this5.clipdata, preset_config.grayscale, color_precision, preset_config.accurate_sampling);
          } else {
            mosaicPixel(_this5.fillctx, rect, strength, grid_width, _this5.clipdata, preset_config.grayscale, color_precision, preset_config.accurate_sampling);
          }
        }
      };
      var _loop5 = function _loop5() {
        var result = results_by_preset_ident[preset_ident];
        var preset_config = result.preset_config;
        var natural_size = (_this5.natural_width + _this5.natural_height) / 2;
        var base_strength = natural_size / 1024 * preset_config.strength;
        var grid_width = preset_config.grid_width ? Math.max(1, Math.round(natural_size / 1024 * preset_config.grid_width)) : 0;
        var strength = Math.max(1, Math.round(base_strength));
        var handle_shapes_options = {};
        if (!isLineResult(result) && preset_config.ty !== external_puryfiCoreContext_namespaceObject.PixelType.HALFTONE && preset_config.scale_with_detection) {
          _this5.handleShapesIndividually(result, cache, function (_ref8) {
            var i = _ref8.index,
              rect = _ref8.rect;
            var entry = result.entries[i];
            var threshold = natural_size / 4;
            var largest_orig_rect_size = (0,external_puryfiCoreContext_namespaceObject.mapMaxOf)(entry.orig_rects, function (rect) {
              return (rect.w + rect.h) / 2;
            });
            var ratio = largest_orig_rect_size / threshold;
            strength = Math.max(1, Math.round(base_strength * ratio));
            paintPixels(rect, strength, grid_width, preset_config);
          }, handle_shapes_options);
        } else {
          _this5.handleShapes(result, cache, function (_ref9) {
            var bounding_rect = _ref9.bounding_rect;
            paintPixels(bounding_rect, strength, grid_width, preset_config);
          }, handle_shapes_options);
        }
      };
      for (var preset_ident in results_by_preset_ident) {
        _loop5();
      }
    }
  }, {
    key: "blurCanvas",
    value: function blurCanvas(preset_config, cache) {
      var strength = preset_config.strength;
      var natural_size = (this.natural_width + this.natural_height) / 2;
      strength = Math.max(1, Math.round(natural_size / 1024 * preset_config.strength));
      if (preset_config.ty === 0) {
        gaussianBlurImage(this.outctx, this.clip, new Rectangle(0, 0, this.natural_width, this.natural_height), strength, preset_config.grayscale);
      } else {
        diffusionBlurImage(this.outctx, this.clip, new Rectangle(0, 0, this.natural_width, this.natural_height), strength / natural_size, preset_config.grayscale);
      }
      this.finishReverse(cache, preset_config);
      this.fill.width = this.natural_width;
      this.fill.height = this.natural_height;
    }
  }, {
    key: "blurAreas",
    value: function blurAreas(results_by_preset_ident, cache) {
      var _this6 = this;
      var _loop6 = function _loop6() {
        var result = results_by_preset_ident[preset_ident];
        var preset_config = result.preset_config;
        var strength = preset_config.strength;
        var natural_size = (_this6.natural_width + _this6.natural_height) / 2;
        strength = Math.round(natural_size / 1024 * preset_config.strength);
        strength = Math.max(1, strength);
        _this6.handleShapes(result, cache, function (_ref10) {
          var bounding_rect = _ref10.bounding_rect;
          if (preset_config.ty === 0) {
            gaussianBlurImage(_this6.fillctx, _this6.clip, bounding_rect, strength, preset_config.grayscale);
          } else {
            diffusionBlurImage(_this6.fillctx, _this6.clip, bounding_rect, strength / natural_size, preset_config.grayscale);
          }
        });
      };
      for (var preset_ident in results_by_preset_ident) {
        _loop6();
      }
      this.fill.width = this.natural_width;
      this.fill.height = this.natural_height;
    }
  }, {
    key: "triangulateCanvas",
    value: function triangulateCanvas(preset_config, cache) {
      var vertex_count = preset_config.vertex_count;
      var natural_size = this.natural_width * this.natural_height;
      if (natural_size <= 1) return;
      vertex_count = (0,external_puryfiCoreContext_namespaceObject.clamp)(vertex_count, 1, natural_size);
      var fill = preset_config.fill_color_mode === 0 ? true : (0,external_puryfiCoreContext_namespaceObject.isHexColorTransparent)(preset_config.fill_color) ? false : preset_config.fill_color;
      var stroke = preset_config.stroke_color_mode === 0 ? true : (0,external_puryfiCoreContext_namespaceObject.isHexColorTransparent)(preset_config.stroke_color) ? false : preset_config.stroke_color;
      var triangulation_params = {
        accuracy: preset_config.accuracy,
        blur: Math.round(preset_config.blurring),
        threshold: preset_config.threshold,
        vertexCount: vertex_count,
        fill: fill,
        stroke: stroke,
        strokeWidth: Math.max(0.1, (this.natural_width + this.natural_height) / 2 / 2048) * preset_config.stroke_width,
        gradients: preset_config.gradients,
        gradientStops: preset_config.gradient_stops,
        lineJoin: ["miter", "round", "bevel"][preset_config.line_join],
        transparentColor: preset_config.transparent_color
      };
      var image_data = this.clipdata;
      var triangulized_image_data = triangulateImage(triangulation_params, image_data);
      this.outctx.putImageData(triangulized_image_data, 0, 0);
      this.finishReverse(cache, preset_config);
    }
  }, {
    key: "triangulateAreas",
    value: function triangulateAreas(results_by_preset_ident, cache) {
      var _this7 = this;
      var _loop7 = function _loop7() {
        var result = results_by_preset_ident[preset_ident];
        var preset_config = result.preset_config;
        _this7.handleShapes(result, cache, function (_ref11) {
          var rect = _ref11.bounding_rect;
          var rect_coverage = rect.w * rect.h / (_this7.natural_width * _this7.natural_height);
          var vertex_count = Math.round(preset_config.vertex_count * rect_coverage);
          var size = rect.w * rect.h;
          if (size <= 1) return;
          vertex_count = (0,external_puryfiCoreContext_namespaceObject.clamp)(vertex_count, 1, size);
          var fill = preset_config.fill_color_mode === 0 ? true : (0,external_puryfiCoreContext_namespaceObject.isHexColorTransparent)(preset_config.fill_color) ? false : preset_config.fill_color;
          var stroke = preset_config.stroke_color_mode === 0 ? true : (0,external_puryfiCoreContext_namespaceObject.isHexColorTransparent)(preset_config.stroke_color) ? false : preset_config.stroke_color;
          var triangulation_params = {
            accuracy: preset_config.accuracy,
            blur: Math.round(preset_config.blurring),
            threshold: preset_config.threshold,
            vertexCount: vertex_count,
            fill: fill,
            stroke: stroke,
            strokeWidth: Math.max(0.1, (_this7.natural_width + _this7.natural_height) / 2 / 2048) * preset_config.stroke_width,
            gradients: preset_config.gradients,
            gradientStops: preset_config.gradient_stops,
            lineJoin: ["miter", "round", "bevel"][preset_config.line_join],
            transparentColor: preset_config.transparent_color
          };
          var rect_with_margin = rect.scaled(1.05, 1.05);
          var image_data = _this7.clipctx.getImageData(rect_with_margin.x, rect_with_margin.y, rect_with_margin.w, rect_with_margin.h);
          var triangulized_image_data = triangulateImage(triangulation_params, image_data);
          _this7.fillctx.putImageData(triangulized_image_data, rect_with_margin.x, rect_with_margin.y);
        });
      };
      for (var preset_ident in results_by_preset_ident) {
        _loop7();
      }
    }
  }, {
    key: "barOnCanvas",
    value: function barOnCanvas(preset_config, cache) {
      if (preset_config.ty === 0) {
        this.outctx.fillStyle = preset_config.color;
        this.outctx.globalCompositeOperation = "source-over";
      } else {
        this.outctx.globalAlpha = preset_config.opacity;
        this.outctx.globalCompositeOperation = "destination-out";
      }
      this.outctx.fillRect(0, 0, this.natural_width, this.natural_height);
      this.outctx.globalCompositeOperation = "source-over";
      this.finishReverse(cache, preset_config);
    }
  }, {
    key: "barOnAreas",
    value: function barOnAreas(results_by_preset_ident, cache) {
      var _this8 = this;
      var _loop8 = function _loop8() {
        var result = results_by_preset_ident[preset_ident];
        var preset_config = result.preset_config;
        _this8.handleShapes(result, cache, function (_ref12) {
          var bounding_rect = _ref12.bounding_rect,
            path = _ref12.path,
            smoothing = _ref12.smoothing;
          if (preset_config.ty === 0) {
            if (!(0,external_puryfiCoreContext_namespaceObject.isHexColorOpaque)(preset_config.color)) {
              _this8.fillctx.filter = "blur(".concat(smoothing, "px)");
              _this8.fillctx.fill(path);
              _this8.fillctx.filter = "none";
              _this8.fillctx.globalCompositeOperation = "source-atop";
              _this8.fillctx.drawImage(_this8.clip, bounding_rect.x, bounding_rect.y, bounding_rect.w, bounding_rect.h, bounding_rect.x, bounding_rect.y, bounding_rect.w, bounding_rect.h);
              _this8.fillctx.globalCompositeOperation = "source-atop";
              _this8.fillctx.fillStyle = preset_config.color;
              _this8.fillctx.fillRect(bounding_rect.x, bounding_rect.y, bounding_rect.w, bounding_rect.h);
            } else {
              _this8.fillctx.filter = "blur(".concat(smoothing, "px)");
              _this8.fillctx.fillStyle = preset_config.color;
              _this8.fillctx.fill(path);
              _this8.fillctx.filter = "none";
            }
            _this8.finishAreas(bounding_rect, result, cache);
          } else {
            if (_this8.clipctx === _this8.outctx) {
              _this8.clip = createCanvas(_this8.natural_width, _this8.natural_height);
              _this8.clipctx = _this8.clip.getContext("2d");
              _this8.clipctx.drawImage(_this8.out, 0, 0);
            }
            _this8.outctx.filter = "blur(".concat(smoothing, "px)");
            _this8.outctx.globalCompositeOperation = "destination-out";
            _this8.outctx.fill(path);
            _this8.outctx.filter = "none";
            _this8.outctx.globalCompositeOperation = "source-over";
            var paint_fill = false;
            if (preset_config.opacity < 1) {
              _this8.fillctx.globalAlpha = 1 - preset_config.opacity;
              _this8.fillctx.drawImage(_this8.clip, bounding_rect.x, bounding_rect.y, bounding_rect.w, bounding_rect.h, bounding_rect.x, bounding_rect.y, bounding_rect.w, bounding_rect.h);
              _this8.fillctx.globalAlpha = 1;
              paint_fill = true;
            }
            if (_this8.word_wall_configuration.enabled && preset_config.word_wall) {
              var word_wall_preset_index = preset_config.word_wall_preset_index;
              if (_this8.word_wall_configuration.presets[preset_config.word_wall_preset_index] == null) word_wall_preset_index = 0;
              var _this8$prepareTextMas = _this8.prepareTextMask(_this8.word_wall_configuration.presets[word_wall_preset_index].config, word_wall_preset_index, cache),
                _this8$prepareTextMas2 = _slicedToArray(_this8$prepareTextMas, 2),
                ww_ctx = _this8$prepareTextMas2[0],
                ww_alpha = _this8$prepareTextMas2[1];
              _this8.fillctx.globalAlpha = ww_alpha;
              _this8.fillctx.drawImage(ww_ctx.canvas, bounding_rect.x, bounding_rect.y, bounding_rect.w, bounding_rect.h, bounding_rect.x, bounding_rect.y, bounding_rect.w, bounding_rect.h);
              _this8.fillctx.globalAlpha = 1;
              paint_fill = true;
            }
            if (paint_fill) {
              _this8.fillctx.globalCompositeOperation = "destination-in";
              _this8.fillctx.filter = "blur(".concat(smoothing, "px)");
              _this8.fillctx.fill(path);
              _this8.fillctx.globalCompositeOperation = "source-over";
              _this8.fillctx.filter = "none";
              _this8.outctx.drawImage(_this8.fill, bounding_rect.x, bounding_rect.y, bounding_rect.w, bounding_rect.h, bounding_rect.x, bounding_rect.y, bounding_rect.w, bounding_rect.h);
            }
            if (_this8.caption_configuration.enabled && preset_config.caption && preset_config.shape !== 4) {
              var caption_preset_index = preset_config.caption_preset_index;
              if (_this8.caption_configuration.presets[preset_config.caption_preset_index] == null) caption_preset_index = 0;
              _this8.paintCaption(_this8.outctx, bounding_rect, result, _this8.caption_configuration.presets[caption_preset_index].config, caption_preset_index, cache);
            }
          }
          return true;
        });
      };
      for (var preset_ident in results_by_preset_ident) {
        _loop8();
      }
    }
  }, {
    key: "sobelCanvasPrewitt",
    value: function sobelCanvasPrewitt(preset_config, cache) {
      var sobel_img_data = this.gradient(this.clipdata);
      if (preset_config.inverted_color) {
        var temp_canvas = createCanvas(this.natural_width, this.natural_height);
        var temp_ctx = temp_canvas.getContext("2d");
        temp_ctx.putImageData(sobel_img_data, 0, 0);
        temp_ctx.globalCompositeOperation = "exclusion";
        temp_ctx.fillStyle = "white";
        temp_ctx.fillRect(0, 0, this.natural_width, this.natural_height);
        this.outctx.drawImage(temp_canvas, 0, 0, this.natural_width, this.natural_height);
      } else {
        this.outctx.putImageData(sobel_img_data, 0, 0);
      }
      this.finishReverse(cache, preset_config);
    }
  }, {
    key: "sobelAreasPrewitt",
    value: function sobelAreasPrewitt(results_by_preset_ident, cache) {
      var _this9 = this;
      var _loop9 = function _loop9() {
        var result = results_by_preset_ident[preset_ident];
        var preset_config = result.preset_config;
        _this9.handleShapes(result, cache, function (_ref13) {
          var rect = _ref13.bounding_rect;
          var sobel_img_data = _this9.gradient(_this9.clipctx.getImageData(rect.x, rect.y, rect.w, rect.h));
          _this9.fillctx.putImageData(sobel_img_data, rect.x, rect.y);
          if (preset_config.inverted_color) {
            _this9.fillctx.globalCompositeOperation = "exclusion";
            _this9.fillctx.fillStyle = "white";
            _this9.fillctx.fillRect(rect.x, rect.y, rect.w, rect.h);
          }
        });
      };
      for (var preset_ident in results_by_preset_ident) {
        _loop9();
      }
    }
  }, {
    key: "splatterCanvas",
    value: function splatterCanvas(preset_config, cache) {
      if (cache.mixed_mode) {
        this.outctx.save();
        this.splatter(this.outctx, this.clipdata, true, new Rectangle(0, 0, this.natural_width, this.natural_height), preset_config);
        this.outctx.restore();
      } else {
        this.auxctx.save();
        this.auxctx.clearRect(0, 0, this.natural_width, this.natural_height);
        this.splatter(this.auxctx, this.clipdata, true, new Rectangle(0, 0, this.natural_width, this.natural_height), preset_config);
        this.auxctx.restore();
        this.outctx.drawImage(this.aux, 0, 0);
      }
      this.finishReverse(cache, preset_config);
    }
  }, {
    key: "clipAreasWithSplatter",
    value: function clipAreasWithSplatter(results_by_preset_ident, cache) {
      this.fillctx.save();
      this.fillctx.clearRect(0, 0, this.natural_width, this.natural_height);
      var clipdata = this.clipdata;
      for (var preset_ident in results_by_preset_ident) {
        var result = results_by_preset_ident[preset_ident];
        var entries = result.entries,
          preset_config = result.preset_config;
        var _iterator29 = _createForOfIteratorHelper(entries),
          _step29;
        try {
          for (_iterator29.s(); !(_step29 = _iterator29.n()).done;) {
            var shape_rect = _step29.value.shape_rect;
            this.splatter(this.fillctx, clipdata, false, shape_rect, preset_config);
          }
        } catch (err) {
          _iterator29.e(err);
        } finally {
          _iterator29.f();
        }
      }
      this.fillctx.globalCompositeOperation = "source-atop";
      this.fillctx.drawImage(this.clip, 0, 0);
      this.outctx.drawImage(this.fill, 0, 0);
      this.fillctx.restore();
    }
  }, {
    key: "splatterAreas",
    value: function splatterAreas(results_by_preset_ident, cache) {
      var clipdata = this.clipdata;
      for (var preset_ident in results_by_preset_ident) {
        var result = results_by_preset_ident[preset_ident];
        var entries = result.entries,
          preset_config = result.preset_config;
        this.fillctx.save();
        this.fillctx.clearRect(0, 0, this.natural_width, this.natural_height);
        var _iterator30 = _createForOfIteratorHelper(entries),
          _step30;
        try {
          for (_iterator30.s(); !(_step30 = _iterator30.n()).done;) {
            var shape_rect = _step30.value.shape_rect;
            this.splatter(this.fillctx, clipdata, true, shape_rect, preset_config);
          }
        } catch (err) {
          _iterator30.e(err);
        } finally {
          _iterator30.f();
        }
        this.fillctx.restore();
        this.finishAreas(new Rectangle(0, 0, this.natural_width, this.natural_height), result, cache);
      }
    }
  }, {
    key: "sampleColor",
    value: function sampleColor(clipdata, x, y, preset_config) {
      x = (0,external_puryfiCoreContext_namespaceObject.clamp)(x, 0, this.natural_width);
      y = (0,external_puryfiCoreContext_namespaceObject.clamp)(y, 0, this.natural_height);
      var index = (y * clipdata.width + x) * 4;
      return "rgba(" + clipdata.data[index] + "," + clipdata.data[index + 1] + "," + clipdata.data[index + 2] + "," + preset_config.opacity + ")";
    }
  }, {
    key: "subSplatter",
    value: function subSplatter(ctx, clipdata, colored, parent_x, parent_y, parent_size, size_modifier, angle, remaining_iterations, preset_config) {
      remaining_iterations--;
      var color;
      if (colored) {
        if (preset_config.color_mode === 1) {
          var weights = preset_config.color_pool.map(function (item) {
            return item.weight;
          });
          color = preset_config.color_pool[(0,external_puryfiCoreContext_namespaceObject.randomWeighted)(weights)].color;
        }
      } else {
        color = "#000";
      }
      for (var i = 0; i < preset_config.sub_amount; i += 1) {
        var dist = Math.floor(Math.random() * parent_size * 0.8 + parent_size);
        angle = this.angleRND(angle);
        var rect_size = (parent_size * 1.5 - dist * 0.5) * preset_config.sub_size;
        var x = parent_x + dist * Math.cos(angle);
        var y = parent_y + dist * Math.sin(angle);
        if (rect_size <= 2) {
          continue;
        }
        var d = rect_size * 2 / size_modifier;
        var size = Math.floor(Math.random() * (d - 1)) + 1;
        ctx.beginPath();
        ctx.fillStyle = color !== null && color !== void 0 ? color : this.sampleColor(clipdata, x, y, preset_config);
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.fill();
        if (0 < remaining_iterations) {
          this.subSplatter(ctx, clipdata, colored, x, y, size, size_modifier, angle, remaining_iterations, preset_config);
        }
      }
    }
  }, {
    key: "splatter",
    value: function splatter(ctx, clipdata, colored, rect, preset_config) {
      var size_modifier = 8 / preset_config.size;
      var splatters_num = Math.ceil(Math.sqrt(rect.w * rect.h) / 10 * preset_config.amount);
      var iterations = preset_config.recursions;
      var color;
      if (colored) {
        if (preset_config.color_mode === 1) {
          var weights = preset_config.color_pool.map(function (item) {
            return item.weight;
          });
          color = preset_config.color_pool[(0,external_puryfiCoreContext_namespaceObject.randomWeighted)(weights)].color;
        }
      } else {
        color = "#000";
      }
      for (var i = 0; i < splatters_num; i++) {
        var _this$centeredRND = this.centeredRND(rect.x, rect.w, rect.y, rect.h, preset_config.centering),
          _this$centeredRND2 = _slicedToArray(_this$centeredRND, 2),
          x = _this$centeredRND2[0],
          y = _this$centeredRND2[1];
        var d = (rect.w + rect.h) / size_modifier;
        var size = Math.floor(Math.random() * (d - 1)) + 1;
        ctx.beginPath();
        ctx.fillStyle = color !== null && color !== void 0 ? color : this.sampleColor(clipdata, x, y, preset_config);
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.fill();
        if (0 < iterations) {
          this.subSplatter(ctx, clipdata, colored, x, y, size, size_modifier, null, iterations, preset_config);
        }
      }
    }
  }, {
    key: "centeredRND",
    value: function centeredRND(x, w, y, h, wdh) {
      var rndY = Math.floor(Math.random() * h) + y;
      var rndX = Math.floor(Math.random() * w) + x;
      if (wdh > 0) {
        for (var i = 0; i < wdh - 1; i++) {
          rndY = rndY + Math.floor(Math.random() * h) + y;
          rndX = rndX + Math.floor(Math.random() * w) + x;
        }
        rndY /= wdh;
        rndX /= wdh;
        rndY = Math.floor(rndY);
        rndX = Math.floor(rndX);
      }
      return [rndX, rndY];
    }
  }, {
    key: "angleRND",
    value: function angleRND(angle) {
      var new_angle;
      if (angle) {
        new_angle = angle + (Math.round(Math.random()) * 2 - 1) * Math.floor(Math.random() * 90);
      } else {
        new_angle = Math.floor(Math.random() * 360);
      }
      return new_angle;
    }
  }, {
    key: "conv3x",
    value: function conv3x(data, idx, w, m) {
      return m[0] * data[idx - w - 4] + m[1] * data[idx - 4] + m[2] * data[idx + w - 4] - m[0] * data[idx - w + 4] - m[1] * data[idx + 4] - m[2] * data[idx + 4 + 4];
    }
  }, {
    key: "conv3y",
    value: function conv3y(data, idx, w, m) {
      return m[0] * data[idx - w - 4] + m[1] * data[idx - w] + m[2] * data[idx - w + 4] - (m[0] * data[idx + w - 4] + m[1] * data[idx + w] + m[2] * data[idx + w + 4]);
    }
  }, {
    key: "gradient_internal",
    value: function gradient_internal(pixels, mask) {
      var data = pixels.data;
      var w = pixels.width * 4;
      var l = data.length - w - 4;
      var buff = new Uint8ClampedArray(new ArrayBuffer(data.length));
      for (var i = w + 4; i < l; i += 4) {
        var dx = this.conv3x(data, i, w, mask);
        var dy = this.conv3y(data, i, w, mask);
        buff[i] = buff[i + 1] = buff[i + 2] = Math.sqrt(dx * dx + dy * dy);
        buff[i + 3] = 255;
      }
      pixels.data.set(buff);
    }
  }, {
    key: "gradient",
    value: function gradient(imagedata) {
      this.gradient_internal(imagedata, [1, 2, 1]);
      return imagedata;
    }
  }, {
    key: "stickerOnCanvas",
    value: function stickerOnCanvas(preset_config, preset_ident, cache) {
      var rect = new Rectangle(0, 0, this.natural_width, this.natural_height);
      var sticker = this.pickSticker(preset_config, preset_ident, {}, rect, cache);
      if (sticker == null) return;
      rect = this.paintSticker(this.outctx, rect, sticker, "contain");
      this.finishReverse(cache, preset_config);
    }
  }, {
    key: "clipAreasWithSticker",
    value: function clipAreasWithSticker(results_by_preset_ident, cache) {
      this.fillctx.clearRect(0, 0, this.natural_width, this.natural_height);
      for (var preset_ident in results_by_preset_ident) {
        var _results_by_preset_id = results_by_preset_ident[preset_ident],
          entries = _results_by_preset_id.entries,
          preset_config = _results_by_preset_id.preset_config;
        var _iterator31 = _createForOfIteratorHelper(entries),
          _step31;
        try {
          for (_iterator31.s(); !(_step31 = _iterator31.n()).done;) {
            var _step31$value = _step31.value,
              klass = _step31$value.klass,
              shape_rect = _step31$value.shape_rect;
            var sticker = this.pickSticker(preset_config, preset_ident, klass, shape_rect, cache);
            if (sticker == null) continue;
            shape_rect = this.paintSticker(this.fillctx, shape_rect, sticker);
            this.fillctx.globalCompositeOperation = "source-atop";
            this.fillctx.drawImage(this.clip, shape_rect.x, shape_rect.y, shape_rect.w, shape_rect.h, shape_rect.x, shape_rect.y, shape_rect.w, shape_rect.h);
            this.fillctx.globalCompositeOperation = "source-over";
            this.outctx.drawImage(this.fill, shape_rect.x, shape_rect.y, shape_rect.w, shape_rect.h, shape_rect.x, shape_rect.y, shape_rect.w, shape_rect.h);
          }
        } catch (err) {
          _iterator31.e(err);
        } finally {
          _iterator31.f();
        }
      }
    }
  }, {
    key: "stickerOnAreas",
    value: function stickerOnAreas(results_by_preset_ident, cache) {
      for (var preset_ident in results_by_preset_ident) {
        var result = results_by_preset_ident[preset_ident];
        var entries = result.entries,
          preset_config = result.preset_config;
        this.fillctx.clearRect(0, 0, this.natural_width, this.natural_height);
        var _iterator32 = _createForOfIteratorHelper(entries),
          _step32;
        try {
          for (_iterator32.s(); !(_step32 = _iterator32.n()).done;) {
            var _step32$value = _step32.value,
              klass = _step32$value.klass,
              shape_rect = _step32$value.shape_rect;
            var sticker = this.pickSticker(preset_config, preset_ident, klass, shape_rect, cache);
            if (sticker == null) continue;
            this.paintSticker(this.fillctx, shape_rect, sticker);
          }
        } catch (err) {
          _iterator32.e(err);
        } finally {
          _iterator32.f();
        }
        this.finishAreas(new Rectangle(0, 0, this.natural_width, this.natural_height), result, cache);
      }
    }
  }, {
    key: "paintSticker",
    value: function paintSticker(ctx, rect, sticker) {
      var imgFit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "cover";
      var dstScale;
      switch (imgFit) {
        case "contain":
          {
            dstScale = Math.max(rect.w / sticker.width, rect.h / sticker.height);
          }
        case "cover":
          {
            dstScale = Math.min(rect.w / sticker.width, rect.h / sticker.height);
          }
      }
      var dst_w = sticker.width * dstScale;
      var dst_h = sticker.height * dstScale;
      var dstRect = new Rectangle(rect.cx - dst_w / 2.0, rect.cy - dst_h / 2.0, dst_w, dst_h);
      dstRect.scale(sticker.scale, sticker.scale);
      var buffer = sticker.file;
      var sticker_canvas = createCanvas(sticker.width, sticker.height);
      var sticker_ctx = sticker_canvas.getContext("2d");
      if (buffer) {
        var sticker_data = new ImageData(buffer, sticker.width, sticker.height);
        sticker_ctx.putImageData(sticker_data, 0, 0);
      } else {
        console.error("Sticker buffer is null");
      }
      ctx.drawImage(sticker_canvas, 0, 0, sticker.width, sticker.height, dstRect.x, dstRect.y, dstRect.w, dstRect.h);
      return rect;
    }
  }, {
    key: "pickSticker",
    value: function pickSticker(preset_config, preset_ident, klass, rect, cache) {
      if (preset_config.draw_mode === 0 && cache["preset_ident_".concat(preset_ident, "_sticker_for_").concat(klass.key)] != null) {
        return cache["preset_ident_".concat(preset_ident, "_sticker_for_").concat(klass.key)];
      }
      var stickers = [];
      if (cache["preset_ident_".concat(preset_ident, "_stickers")] != null) {
        stickers = cache["preset_ident_".concat(preset_ident, "_stickers")];
      } else {
        var source_names = preset_config.enabled_sources;
        if (preset_config.sample_single_source) {
          source_names = [source_names[Math.floor(Math.random() * source_names.length)]];
          var collection = this.sticker_collections.find(function (collection) {
            return source_names[0] === collection._name;
          });
          if (collection != null) {
            stickers = collection._stickers;
          } else {
            this.sticker_collections.forEach(function (collection) {
              var _stickers;
              (_stickers = stickers).push.apply(_stickers, _toConsumableArray((0,external_puryfiCoreContext_namespaceObject.getStickersByGroup)(collection, source_names)));
            });
          }
        } else {
          this.sticker_collections.forEach(function (collection) {
            if (source_names.some(function (name) {
              return collection._name === name;
            })) {
              var _stickers2;
              (_stickers2 = stickers).push.apply(_stickers2, _toConsumableArray(collection._stickers));
            } else {
              var _stickers3;
              (_stickers3 = stickers).push.apply(_stickers3, _toConsumableArray((0,external_puryfiCoreContext_namespaceObject.getStickersByGroup)(collection, source_names)));
            }
          });
        }
        cache["preset_ident_".concat(preset_ident, "_stickers")] = stickers;
      }
      if (klass.index >= 0) {
        stickers = stickers.filter(function (sticker) {
          return sticker.klasses.some(function (other_klass) {
            return other_klass.key === klass.key;
          });
        });
      }
      if (stickers.length === 0) {
        return null;
      }
      var sticker = this.randomSticker(stickers);
      if (preset_config.draw_mode == 0) {
        cache["preset_ident_".concat(preset_ident, "_sticker_for_").concat(klass.key)] = sticker;
      }
      return sticker;
    }
  }, {
    key: "randomSticker",
    value: function randomSticker(stickers) {
      if (stickers.length === 0) {
        return null;
      }
      var i;
      var weights = [];
      for (i = 0; i < stickers.length; i++) {
        if (!stickers[i].chance && stickers[i].chance !== 0) {
          stickers[i].chance = 1;
        }
        weights[i] = stickers[i].chance + (weights[i - 1] || 0);
      }
      var random = Math.random() * weights[weights.length - 1];
      for (i = 0; i < weights.length; i++) {
        if (weights[i] > random) {
          break;
        }
      }
      return stickers[i];
    }
  }, {
    key: "boxOnCanvas",
    value: function boxOnCanvas(preset_config, cache) {
      this.outctx.fillStyle = preset_config.fill_color;
      this.outctx.fillRect(0, 0, this.natural_width, this.natural_height);
      this.outctx.fillStyle = "#000000";
      this.finishReverse(cache, preset_config);
    }
  }, {
    key: "clipAreasWithBox",
    value: function clipAreasWithBox(results_by_preset_ident, cache) {
      this.fillctx.clearRect(0, 0, this.natural_width, this.natural_height);
      var border_width = Math.max(2, Math.round(2 * (this.natural_width + this.natural_height) / 2 / 2048) * 2);
      this.outctx.save();
      for (var preset_ident in results_by_preset_ident) {
        var _results_by_preset_id2 = results_by_preset_ident[preset_ident],
          entries = _results_by_preset_id2.entries,
          preset_config = _results_by_preset_id2.preset_config;
        entries.sort(function (a, b) {
          if (a.shape_rect.y < b.shape_rect.y) return -1;else if (b.shape_rect.y < a.shape_rect.y) return 1;else return 0;
        });
        var _iterator33 = _createForOfIteratorHelper(entries),
          _step33;
        try {
          for (_iterator33.s(); !(_step33 = _iterator33.n()).done;) {
            var shape_rect = _step33.value.shape_rect;
            var rect = shape_rect.resized(border_width, border_width);
            this.outctx.drawImage(this.clip, rect.x, rect.y, rect.w, rect.h, rect.x, rect.y, rect.w, rect.h);
          }
        } catch (err) {
          _iterator33.e(err);
        } finally {
          _iterator33.f();
        }
        var _iterator34 = _createForOfIteratorHelper(entries),
          _step34;
        try {
          for (_iterator34.s(); !(_step34 = _iterator34.n()).done;) {
            var _step34$value = _step34.value,
              _shape_rect = _step34$value.shape_rect,
              klass = _step34$value.klass,
              score = _step34$value.score;
            drawBoxBorder(this.outctx, border_width, this.natural_width, this.natural_height, _shape_rect, klass, score, preset_config);
          }
        } catch (err) {
          _iterator34.e(err);
        } finally {
          _iterator34.f();
        }
      }
      this.outctx.restore();
    }
  }, {
    key: "boxOnAreas",
    value: function boxOnAreas(results_by_preset_ident, cache) {
      var border_width = Math.max(2, Math.round(2 * (this.natural_width + this.natural_height) / 2 / 2048) * 2);
      this.fillctx.save();
      for (var preset_ident in results_by_preset_ident) {
        var result = results_by_preset_ident[preset_ident];
        var entries = result.entries,
          preset_config = result.preset_config;
        var border_canvas = createCanvas(this.natural_width, this.natural_height);
        var border_ctx = border_canvas.getContext("2d");
        this.fillctx.clearRect(0, 0, this.natural_width, this.natural_height);
        entries.sort(function (a, b) {
          if (a.shape_rect.y < b.shape_rect.y) return -1;else if (b.shape_rect.y < a.shape_rect.y) return 1;else return 0;
        });
        this.fillctx.globalCompositeOperation = "source-over";
        this.fillctx.fillStyle = preset_config.fill_color;
        var isFillColorOpaque = (0,external_puryfiCoreContext_namespaceObject.isHexColorOpaque)(preset_config.fill_color);
        var _iterator35 = _createForOfIteratorHelper(entries),
          _step35;
        try {
          for (_iterator35.s(); !(_step35 = _iterator35.n()).done;) {
            var _step35$value = _step35.value,
              shape_rect = _step35$value.shape_rect,
              klass = _step35$value.klass,
              score = _step35$value.score;
            if (!isFillColorOpaque) {
              this.fillctx.drawImage(this.clip, shape_rect.x, shape_rect.y, shape_rect.w, shape_rect.h, shape_rect.x, shape_rect.y, shape_rect.w, shape_rect.h);
            }
            this.fillctx.fillRect(shape_rect.x, shape_rect.y, shape_rect.w, shape_rect.h);
            drawBoxBorder(border_ctx, border_width, this.natural_width, this.natural_height, shape_rect, klass, score, preset_config);
          }
        } catch (err) {
          _iterator35.e(err);
        } finally {
          _iterator35.f();
        }
        this.finishAreas(new Rectangle(0, 0, this.natural_width, this.natural_height), result, cache);
        this.outctx.globalCompositeOperation = "source-over";
        this.outctx.drawImage(border_canvas, 0, 0);
      }
      this.fillctx.restore();
    }
  }, {
    key: "neppyfiArea",
    value: function neppyfiArea(klass, rect, preset_config, cache) {
      var dummyConfig = {};
      dummyConfig.number_of_layers = preset_config.multiple_panels_amount;
      dummyConfig.gradient_configuration = preset_config.multiple_panels_gradient;
      dummyConfig.is_border_enabled = preset_config.multiple_panels_border;
      dummyConfig.min_size = preset_config.multiple_panels_min_size;
      dummyConfig.max_size = preset_config.scale + (preset_config.multiple_panels_max_size - 1.0);
      dummyConfig.scatter = preset_config.multiple_panels_scatter;
      dummyConfig.split_chance = preset_config.multiple_panels_split_chance;
      if (klass.erotic) {
        dummyConfig.number_of_layers += 1;
      }
      var random_width_scale = 1;
      var random_height_scale = 1;
      var x_shift = 0;
      var y_shift = 0;
      for (var i = 0; i < dummyConfig.number_of_layers; i++) {
        if (i > 0 && Math.random() < dummyConfig.split_chance) {
          this.neppySplit(rect, dummyConfig);
        } else {
          var random_rect = rect.scaled(random_width_scale, random_height_scale).shifted(x_shift, y_shift).global_cropped(0, 0, this.natural_width, this.natural_height);
          this.neppyFiOnce(random_rect, dummyConfig);
        }
        random_width_scale = generate_random_float_in_range(dummyConfig.min_size, dummyConfig.max_size);
        random_height_scale = generate_random_float_in_range(dummyConfig.min_size, dummyConfig.max_size);
        x_shift = generate_random_in_range(-rect.w * dummyConfig.scatter, rect.w * dummyConfig.scatter);
        y_shift = generate_random_in_range(-rect.h * dummyConfig.scatter, rect.h * dummyConfig.scatter);
      }
    }
  }, {
    key: "neppySplit",
    value: function neppySplit(rect, dummyConfig) {
      var rect1, rect2;
      if (Math.random() < 0.5) {
        rect1 = rect.scaled(1, 0.5);
        rect2 = rect1.shifted(0, rect1.h / 2);
        rect1 = rect1.shifted(0, -rect1.h / 2);
      } else {
        rect1 = rect.scaled(0.5, 1);
        rect2 = rect1.shifted(rect1.w / 2, 0);
        rect1 = rect1.shifted(-rect1.w / 2, 0);
      }
      var x_shift = generate_random_in_range(-rect1.w * dummyConfig.scatter, rect1.w * dummyConfig.scatter);
      var y_shift = generate_random_in_range(-rect1.h * dummyConfig.scatter, rect1.h * dummyConfig.scatter);
      var random_width_scale = generate_random_float_in_range(dummyConfig.min_size, dummyConfig.max_size);
      var random_height_scale = generate_random_float_in_range(dummyConfig.min_size, dummyConfig.max_size);
      rect1 = rect1.scaled(random_width_scale, random_height_scale).shifted(x_shift, y_shift).global_cropped(0, 0, this.natural_width, this.natural_height);
      this.neppyFiOnce(rect1, dummyConfig);
      x_shift = generate_random_in_range(-rect2.w * dummyConfig.scatter, rect2.w * dummyConfig.scatter);
      y_shift = generate_random_in_range(-rect2.h * dummyConfig.scatter, rect2.h * dummyConfig.scatter);
      random_width_scale = generate_random_float_in_range(dummyConfig.min_size, dummyConfig.max_size);
      random_height_scale = generate_random_float_in_range(dummyConfig.min_size, dummyConfig.max_size);
      rect2 = rect2.scaled(random_width_scale, random_height_scale).shifted(x_shift, y_shift).global_cropped(0, 0, this.natural_width, this.natural_height);
      this.neppyFiOnce(rect2, dummyConfig);
    }
  }, {
    key: "neppyFiOnce",
    value: function neppyFiOnce(random_rect, dummyConfig) {
      var diagonal = Math.sqrt(random_rect.w * random_rect.w + random_rect.h * random_rect.h);
      var fill_gradient = this.fillctx.createRadialGradient(random_rect.x, random_rect.y, 0, random_rect.x, random_rect.y, diagonal);
      var _iterator36 = _createForOfIteratorHelper(dummyConfig.gradient_configuration),
        _step36;
      try {
        for (_iterator36.s(); !(_step36 = _iterator36.n()).done;) {
          var gradientConfigurationElement = _step36.value;
          fill_gradient.addColorStop(gradientConfigurationElement.offset, gradientConfigurationElement.color);
        }
      } catch (err) {
        _iterator36.e(err);
      } finally {
        _iterator36.f();
      }
      var edge_gradient_top = this.fillctx.createLinearGradient(random_rect.x, random_rect.y, random_rect.x2, random_rect.y);
      edge_gradient_top.addColorStop(0.9, "#FFFFFFCF");
      edge_gradient_top.addColorStop(0.98, "#FFFFFF00");
      var edge_gradient_left = this.fillctx.createLinearGradient(random_rect.x, random_rect.y, random_rect.x, random_rect.y2);
      edge_gradient_left.addColorStop(0.9, "#FFFFFFCF");
      edge_gradient_left.addColorStop(0.98, "#FFFFFF00");
      this.fillctx.fillStyle = fill_gradient;
      this.fillctx.fillRect(random_rect.x, random_rect.y, random_rect.w, random_rect.h);
      if (dummyConfig.is_border_enabled) {
        this.fillctx.lineWidth = 2;
        this.fillctx.beginPath();
        this.fillctx.strokeStyle = edge_gradient_top;
        this.fillctx.moveTo(random_rect.x + 1, random_rect.y + 1);
        this.fillctx.lineTo(random_rect.x2 - 1, random_rect.y + 1);
        this.fillctx.stroke();
        this.fillctx.beginPath();
        this.fillctx.strokeStyle = edge_gradient_left;
        this.fillctx.moveTo(random_rect.x + 1, random_rect.y2 - 1);
        this.fillctx.lineTo(random_rect.x + 1, random_rect.y + 1);
        this.fillctx.stroke();
      }
    }
  }, {
    key: "fettyfiArea",
    value: function fettyfiArea(image_data, rect, klass, preset_config, cache) {
      rect = rect.scaled(preset_config.scale, preset_config.scale);
      var effect_range = Math.ceil(0.3 * Math.min(rect.h, rect.w) * preset_config.chromatic_aberration_shift_intensity);
      var effect_bounds = rect.stretched(effect_range, effect_range);
      rect = rect.global_cropped(0, 0, this.natural_width, this.natural_height);
      effect_bounds = effect_bounds.global_cropped(0, 0, this.natural_width, this.natural_height);
      var mul = 1;
      if (klass.erotic) {
        mul = 5;
      }
      mul = Math.ceil(mul * preset_config.chromatic_aberration_color_intensity);
      var source_canvas = createCanvas(effect_bounds.w, effect_bounds.h);
      var source_ctx = source_canvas.getContext("2d");
      var sx = effect_bounds.x;
      var sy = effect_bounds.y;
      var sw = effect_bounds.w;
      var sh = effect_bounds.h;
      var dx = 0;
      var dy = 0;
      var dw = effect_bounds.w;
      var dh = effect_bounds.h;
      source_ctx.putImageData(this.clipctx.getImageData(sx, sy, sw, sh), dx, dy);
      var source_data_obj = source_ctx.getImageData(0, 0, source_canvas.width, source_canvas.height);
      var config;
      config = new GlitchConfig();
      config.g_channel_intensity = 0.75 * mul;
      config.shift_horizontal = preset_config.chromatic_aberration_horizontal_shift;
      config.h_bar_size_range = [Math.floor(rect.h / 20), Math.ceil(rect.h / 10)];
      config.shift_intensity_range = [Math.round(effect_range / 4), effect_range];
      var t1_canvas = createCanvas(effect_bounds.w, effect_bounds.h);
      var t1_ctx = t1_canvas.getContext("2d");
      t1_ctx.putImageData(source_ctx.getImageData(dx, dy, dw, dh), dx, dy);
      var mask1 = this.neo_shift(source_ctx, source_data_obj, t1_ctx, t1_canvas, rect, effect_bounds, config);
      config = new GlitchConfig();
      config.r_channel_intensity = 0.85 * (1 + mul);
      config.shift_vertical = preset_config.chromatic_aberration_vertical_shift;
      config.v_bar_size_range = [Math.floor(rect.w / 20), Math.ceil(rect.w / 10)];
      config.shift_intensity_range = [Math.round(effect_range / 12), Math.round(effect_range / 2)];
      var t2_canvas = createCanvas(effect_bounds.w, effect_bounds.h);
      var t2_ctx = t2_canvas.getContext("2d");
      t2_ctx.putImageData(t1_ctx.getImageData(dx, dy, dw, dh), dx, dy);
      var t1_data_obj = t1_ctx.getImageData(0, 0, t1_canvas.width, t1_canvas.height);
      var mask2 = this.neo_shift(t1_ctx, t1_data_obj, t2_ctx, t2_canvas, rect, effect_bounds, config);
      var mask3 = mask1.union(mask2);
      var area = effect_bounds.area();
      var logSize = Math.log(area);
      var t2_ctx_data = t2_ctx.getImageData(0, 0, t2_canvas.width, t2_canvas.height).data;
      for (var key in mask3.container) {
        if (!mask3.container.hasOwnProperty(key)) continue;
        var x = parseInt(key);
        for (var _key2 in mask3.container[x]) {
          if (!mask3.container[x].hasOwnProperty(_key2)) continue;
          var y = parseInt(_key2);
          var coordinate_mask = mask3.container[x][y];
          var index = (x + y * t2_canvas.width) * 4;
          var fr = t2_ctx_data[index];
          var fg = t2_ctx_data[index + 1];
          var fb = t2_ctx_data[index + 2];
          var fg_color = argb_to_int([0xff, fr, fg, fb]) & coordinate_mask;
          var bg_color = (0,external_puryfiCoreContext_namespaceObject.getIntColor)(image_data, effect_bounds.x + x, effect_bounds.y + y) & ~coordinate_mask;
          (0,external_puryfiCoreContext_namespaceObject.setIntColor1)(image_data, effect_bounds.x + x, effect_bounds.y + y, fg_color | bg_color);
        }
      }
    }
  }, {
    key: "glitchAreas",
    value: function glitchAreas(results_by_preset_ident, cache) {
      for (var preset_ident in results_by_preset_ident) {
        var result = results_by_preset_ident[preset_ident];
        var entries = result.entries,
          preset_config = result.preset_config;
        this.fillctx.clearRect(0, 0, this.natural_width, this.natural_height);
        if (preset_config.ty === 0) {
          var image_data = this.outctx.getImageData(0, 0, this.natural_width, this.natural_height);
          var _iterator37 = _createForOfIteratorHelper(entries),
            _step37;
          try {
            for (_iterator37.s(); !(_step37 = _iterator37.n()).done;) {
              var _step37$value = _step37.value,
                shape_rect = _step37$value.shape_rect,
                klass = _step37$value.klass;
              this.fettyfiArea(image_data, shape_rect, klass, preset_config, cache);
            }
          } catch (err) {
            _iterator37.e(err);
          } finally {
            _iterator37.f();
          }
          this.outctx.putImageData(image_data, 0, 0);
        } else {
          var _iterator38 = _createForOfIteratorHelper(entries),
            _step38;
          try {
            for (_iterator38.s(); !(_step38 = _iterator38.n()).done;) {
              var _step38$value = _step38.value,
                _shape_rect2 = _step38$value.shape_rect,
                _klass = _step38$value.klass;
              this.neppyfiArea(_klass, _shape_rect2, preset_config, cache);
            }
          } catch (err) {
            _iterator38.e(err);
          } finally {
            _iterator38.f();
          }
          this.finishAreas(new Rectangle(0, 0, this.natural_width, this.natural_height), result, cache);
        }
      }
    }
  }, {
    key: "clipAreasWithShape",
    value: function clipAreasWithShape(results_by_preset_ident, cache) {
      var _this10 = this;
      for (var preset_ident in results_by_preset_ident) {
        var result = results_by_preset_ident[preset_ident];
        this.handleShapes(result, cache, function (_ref14) {
          var rect = _ref14.bounding_rect,
            path = _ref14.path,
            smoothing = _ref14.smoothing;
          _this10.fillctx.filter = "blur(".concat(smoothing, "px)");
          _this10.fillctx.fill(path);
          _this10.fillctx.filter = "none";
          _this10.fillctx.globalCompositeOperation = "source-atop";
          _this10.fillctx.drawImage(_this10.clip, rect.x, rect.y, rect.w, rect.h, rect.x, rect.y, rect.w, rect.h);
          _this10.outctx.drawImage(_this10.fill, rect.x, rect.y, rect.w, rect.h, rect.x, rect.y, rect.w, rect.h);
          return true;
        });
      }
    }
  }, {
    key: "applyEffects",
    value: function applyEffects(censor_type, results, cache) {
      switch (censor_type) {
        case external_puryfiCoreContext_namespaceObject.effects.PIXEL.index:
          this.pixelateAreas(results, cache);
          break;
        case external_puryfiCoreContext_namespaceObject.effects.BLUR.index:
          this.blurAreas(results, cache);
          break;
        case external_puryfiCoreContext_namespaceObject.effects.BAR.index:
          this.barOnAreas(results, cache);
          break;
        case external_puryfiCoreContext_namespaceObject.effects.BOX.index:
          this.boxOnAreas(results, cache);
          break;
        case external_puryfiCoreContext_namespaceObject.effects.TRIANGLE.index:
          !cache.video_frame && this.triangulateAreas(results, cache);
          break;
        case external_puryfiCoreContext_namespaceObject.effects.GLITCH.index:
          !cache.video_frame && this.glitchAreas(results, cache);
          break;
        case external_puryfiCoreContext_namespaceObject.effects.STICKER.index:
          this.stickerOnAreas(results, cache);
          break;
        case external_puryfiCoreContext_namespaceObject.effects.SOBEL.index:
          this.sobelAreas(results, cache);
          break;
        case external_puryfiCoreContext_namespaceObject.effects.SPLATTER.index:
          this.splatterAreas(results, cache);
          break;
        case external_puryfiCoreContext_namespaceObject.effects.NONE.index:
          break;
      }
    }
  }, {
    key: "applyNormalEffects",
    value: function applyNormalEffects(censor_type, normal_results, cache) {
      switch (censor_type) {
        case external_puryfiCoreContext_namespaceObject.effects.PIXEL.index:
          this.clipAreasWithShape(normal_results, cache);
          break;
        case external_puryfiCoreContext_namespaceObject.effects.BLUR.index:
          this.clipAreasWithShape(normal_results, cache);
          break;
        case external_puryfiCoreContext_namespaceObject.effects.BAR.index:
          this.clipAreasWithShape(normal_results, cache);
          break;
        case external_puryfiCoreContext_namespaceObject.effects.BOX.index:
          this.clipAreasWithBox(normal_results, cache);
          break;
        case external_puryfiCoreContext_namespaceObject.effects.TRIANGLE.index:
          this.clipAreasWithShape(normal_results, cache);
          break;
        case external_puryfiCoreContext_namespaceObject.effects.GLITCH.index:
          break;
        case external_puryfiCoreContext_namespaceObject.effects.STICKER.index:
          this.clipAreasWithSticker(normal_results, cache);
          break;
        case external_puryfiCoreContext_namespaceObject.effects.SOBEL.index:
          this.clipAreasWithShape(normal_results, cache);
          break;
        case external_puryfiCoreContext_namespaceObject.effects.SPLATTER.index:
          this.clipAreasWithSplatter(normal_results, cache);
          break;
        case external_puryfiCoreContext_namespaceObject.effects.NONE.index:
          break;
      }
    }
  }, {
    key: "applyReverseEffect",
    value: function applyReverseEffect(censor_type, preset_config, preset_ident, cache) {
      this.outctx.save();
      switch (censor_type) {
        case external_puryfiCoreContext_namespaceObject.effects.PIXEL.index:
          this.pixelateCanvas(preset_config, cache);
          break;
        case external_puryfiCoreContext_namespaceObject.effects.BLUR.index:
          this.blurCanvas(preset_config, cache);
          break;
        case external_puryfiCoreContext_namespaceObject.effects.BAR.index:
          this.barOnCanvas(preset_config, cache);
          break;
        case external_puryfiCoreContext_namespaceObject.effects.TRIANGLE.index:
          !cache.video_frame && this.triangulateCanvas(preset_config, cache);
          break;
        case external_puryfiCoreContext_namespaceObject.effects.SOBEL.index:
          this.sobelCanvasPrewitt(preset_config, cache);
          break;
        case external_puryfiCoreContext_namespaceObject.effects.BOX.index:
          this.boxOnCanvas(preset_config, cache);
          break;
        case external_puryfiCoreContext_namespaceObject.effects.GLITCH.index:
          break;
        case external_puryfiCoreContext_namespaceObject.effects.STICKER.index:
          this.stickerOnCanvas(preset_config, preset_ident, cache);
          break;
        case external_puryfiCoreContext_namespaceObject.effects.SPLATTER.index:
          this.splatterCanvas(preset_config, cache);
          break;
        case external_puryfiCoreContext_namespaceObject.effects.NONE.index:
          break;
      }
      this.outctx.restore();
    }
  }, {
    key: "before",
    value: function before(cache) {
      if (cache.mixed_mode || cache.reverse_mode) {
        this.clip = canvasesPool[2];
        if (this.clip.width !== this.natural_width || this.clip.height !== this.natural_height) {
          this.clip.width = this.natural_width;
          this.clip.height = this.natural_height;
        }
        this.clipctx = this.clip.getContext("2d");
        this.clipctx.imageSmoothingEnabled = false;
      } else {
        this.clip = this.out;
        this.clipctx = this.outctx;
      }
    }
  }, {
    key: "beforeLayer",
    value: function beforeLayer(layer_idx, cache) {
      if (cache.mixed_mode || cache.reverse_mode) {
        this.clipctx.drawImage(this.out, 0, 0, this.natural_width, this.natural_height);
      }
      if (layer_idx === 0) {
        this._clipdata = this.orig_img_data;
      } else {
        this._clipdata = null;
      }
    }
  }, {
    key: "neo_shift",
    value: function neo_shift(source_context, source_data, target_context, target_canvas, rect, effect_bounds, config) {
      var shift_range = config.shift_intensity_range;
      var hShifts = this.calculateShifts(rect.h, config.h_bar_size_range, shift_range);
      var vShifts = this.calculateShifts(rect.w, config.v_bar_size_range, shift_range);
      var mask = new Mask();
      var image_data_obj = source_context.getImageData(0, 0, effect_bounds.w, effect_bounds.h);
      var image_data = image_data_obj.data;
      var i = 0;
      for (var rect_y = 0; rect_y < rect.h; rect_y++) {
        var hShift = hShifts[rect_y];
        if (hShift === undefined) {
          break;
        }
        var eb_y = rect_y + (rect.y - effect_bounds.y);
        for (var rect_x = 0; rect_x < rect.w; rect_x++) {
          var vShift = vShifts[rect_x];
          if (vShift === undefined) {
            break;
          }
          var eb_x = rect_x + (rect.x - effect_bounds.x);
          var index = (eb_x + eb_y * source_data.width) * 4;
          var red = source_data.data[index];
          var green = source_data.data[index + 1];
          var blue = source_data.data[index + 2];
          var alpha = source_data.data[index + 3];
          var sr = Math.round(red * config.r_channel_intensity);
          var sg = Math.round(green * config.g_channel_intensity);
          var sb = Math.round(blue * config.b_channel_intensity);
          var tx = eb_x + hShift;
          var ty = eb_y + vShift;
          var t_index = (tx + ty * source_data.width) * 4;
          var tr = Math.round(source_data.data[t_index] * (1 - config.r_channel_intensity));
          var tg = Math.round(source_data.data[t_index + 1] * (1 - config.g_channel_intensity));
          var tb = Math.round(source_data.data[t_index + 2] * (1 - config.b_channel_intensity));
          var ta = alpha;
          if (config.r_channel_intensity > 0) mask.setRed(tx, ty);
          if (config.g_channel_intensity > 0) mask.setGreen(tx, ty);
          if (config.b_channel_intensity > 0) mask.setBlue(tx, ty);
          t_index = (tx + ty * image_data_obj.width) * 4;
          image_data_obj.data[t_index] = sr + tr;
          image_data_obj.data[t_index + 1] = sg + tg;
          image_data_obj.data[t_index + 2] = sb + tb;
          image_data_obj.data[t_index + 3] = ta;
        }
      }
      target_context.putImageData(image_data_obj, 0, 0);
      return mask;
    }
  }, {
    key: "calculateShifts",
    value: function calculateShifts(dimension, bar_range, shift_range) {
      if (bar_range[1] === 0 && bar_range[0] === 0) {
        return new Array(dimension).fill(0);
      }
      var bar_size = 0;
      var shift_intensity = 0;
      var indexed_shifts = [];
      for (var i = 0; i < dimension; i++) {
        if (bar_size > 0) {
          bar_size--;
        } else {
          if (dimension - i < bar_range[1]) {
            break;
          }
          bar_size = generate_random_in_range(bar_range[0], bar_range[1]);
          shift_intensity = generate_shift_intensity(shift_range[0], shift_range[1], shift_intensity);
        }
        indexed_shifts[i] = shift_intensity;
      }
      return indexed_shifts;
    }
  }]);
}();
function int_to_argb(int_color) {
  var a_channel = int_color >> 24 & 0xff;
  var r_channel = int_color >> 16 & 0xff;
  var g_channel = int_color >> 8 & 0xff;
  var b_channel = int_color & 0xff;
  return [a_channel, r_channel, g_channel, b_channel];
}
function argb_to_int(channels) {
  var a_channel = (channels[0] & 0xff) << 24;
  var r_channel = (channels[1] & 0xff) << 16;
  var g_channel = (channels[2] & 0xff) << 8;
  var b_channel = channels[3] & 0xff;
  return a_channel | r_channel | g_channel | b_channel;
}
function generate_random_in_range(min, max) {
  var random_value = Math.random() * (max - min);
  return Math.floor(min + random_value);
}
function generate_random_float_in_range(min, max) {
  return min + Math.random() * (max - min);
}
function generate_shift_intensity(min, max, previous) {
  var r_base = min + Math.round(Math.random() * (max - min));
  var r_sign = Math.round(Math.random()) === 0 ? -1 : 1;
  var random_delta = r_base * r_sign;
  var candidate_shift = previous + random_delta;
  if (candidate_shift < -max || max < candidate_shift) {
    candidate_shift = previous - random_delta;
  }
  return candidate_shift;
}
function areaToHexagonSide(area) {
  return Math.sqrt(area / (3 * Math.sqrt(3) / 2));
}
function hexagonPixel(ctx, rect, pixel_size, gap, clipdata, grayscale, color_precision, accurate_sampling) {
  var operation = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : "source-over";
  var a = 2 * Math.PI / 6;
  var r = areaToHexagonSide(Math.pow(pixel_size, 2));
  ctx.strokeStyle = "#000";
  ctx.lineWidth = gap;
  function paintPixel(ctx, x, y, r, a) {
    ctx.beginPath();
    for (var i = 0; i < 6; i++) {
      ctx.lineTo(x + (r + 0.5) * Math.cos(a * i), y + (r + 0.5) * Math.sin(a * i));
    }
    ctx.globalCompositeOperation = operation;
    ctx.fillStyle = calculatePixelBoxColor(clipdata.width, x, y, r * 2, clipdata.data, grayscale, color_precision, accurate_sampling);
    ctx.closePath();
    ctx.fill();
  }
  var x_step = (r + gap) * (1 + Math.cos(a));
  var y_step = 2 * ((r + gap) * Math.sin(a));
  var start_x_i = Math.floor(rect.x / x_step);
  var start_x = start_x_i * x_step;
  var start_y = (0,external_puryfiCoreContext_namespaceObject.previousMultiple)(rect.y, y_step) + 0.5 * (Math.pow(-1, start_x_i) * (r + gap) * Math.sin(a));
  for (var y = start_y; y < rect.y + rect.h + r; y += y_step) {
    for (var xc = start_x, j = 0; xc < rect.x + rect.w + r; xc += x_step) {
      var yc = y + 0.5 * (Math.pow(-1, j++) * (r + gap) * Math.sin(a));
      paintPixel(ctx, xc, yc, r, a);
    }
  }
}
function glitchPixel(ctx, rect, pixel_size, gap, clipdata, grayscale, color_precision, accurate_sampling) {
  var operation = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : "source-over";
  var a = Math.ceil(2 * Math.PI / 6);
  var r = areaToHexagonSide(Math.pow(pixel_size, 2));
  ctx.globalCompositeOperation = operation;
  function paintPixel(ctx, x, y, r, a) {
    ctx.beginPath();
    for (var i = 0; i < 6; i++) {
      ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
    }
    ctx.fillStyle = calculatePixelBoxColor(clipdata.width, x, y, r, clipdata.data, grayscale, color_precision, accurate_sampling);
    ctx.closePath();
    ctx.fill();
  }
  var x_step = (r + gap) * (1 + Math.cos(a));
  var y_step = 2 * ((r + gap) * Math.sin(a));
  var start_x_i = Math.floor(rect.x / x_step);
  var start_x = start_x_i * x_step;
  var start_y = (0,external_puryfiCoreContext_namespaceObject.previousMultiple)(rect.y, y_step) + 0.5 * (Math.pow(-1, start_x_i) * (r + gap) * Math.sin(a));
  for (var y = start_y; y < rect.y + rect.h + r; y += y_step) {
    for (var xc = start_x, j = 0; xc < rect.x + rect.w + r; xc += x_step) {
      var yc = y + 0.5 * (Math.pow(-1, j++) * (r + gap) * Math.sin(a));
      paintPixel(ctx, xc, yc, r, a);
    }
  }
}
function mosaicPixel(ctx, rect, pixel_size, gap, clipdata, grayscale, color_precision, accurate_sampling) {
  var operation = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : "source-over";
  ctx.globalCompositeOperation = operation;
  var start_x = (0,external_puryfiCoreContext_namespaceObject.previousMultiple)(rect.x, pixel_size + gap);
  var start_y = (0,external_puryfiCoreContext_namespaceObject.previousMultiple)(rect.y, pixel_size + gap);
  for (var x = start_x; x < rect.x + rect.w; x += pixel_size + gap) {
    for (var y = start_y; y < rect.y + rect.h; y += pixel_size + gap) {
      ctx.fillStyle = calculatePixelBoxColor(clipdata.width, x + pixel_size / 2, y + pixel_size / 2, pixel_size, clipdata.data, grayscale, color_precision, accurate_sampling);
      ctx.fillRect(x, y, pixel_size, pixel_size);
    }
  }
}
function halftonePixel(ctx, src_ctx, rect, pixel_size, density, color, bg_color, accurate_sampling, color_mode) {
  var dot_size = Math.sqrt(Math.pow(pixel_size, 2) / Math.PI);
  var dot_res = Math.round(Math.max(1, dot_size / density));
  var canvas_w = ctx.canvas.width;
  var canvas_h = ctx.canvas.height;
  var data_x = Math.max(0, Math.floor(rect.x - dot_size));
  var data_y = Math.max(0, Math.floor(rect.y - dot_size));
  var data_w = Math.ceil(Math.min(rect.x + rect.w + dot_size, canvas_w + dot_size) - rect.x + dot_size);
  var data_h = Math.ceil(Math.min(rect.y + rect.h + dot_size, canvas_h + dot_size) - rect.y + dot_size);
  var _hexaToRgba = (0,external_puryfiCoreContext_namespaceObject.hexaToRgba)(color),
    r = _hexaToRgba.r,
    g = _hexaToRgba.g,
    b = _hexaToRgba.b,
    a = _hexaToRgba.a;
  var _hexaToRgba2 = (0,external_puryfiCoreContext_namespaceObject.hexaToRgba)(bg_color),
    bg_r = _hexaToRgba2.r,
    bg_g = _hexaToRgba2.g,
    bg_b = _hexaToRgba2.b,
    bg_a = _hexaToRgba2.a;
  var img_data = src_ctx.getImageData(data_x, data_y, data_w, data_h);
  var out_data = halftone_pixel(new Uint8Array(img_data.data), dot_size, dot_res, data_x, data_y, data_w, data_h, rect.x, rect.y, rect.w, rect.h, r, g, b, a, bg_r, bg_g, bg_b, bg_a, accurate_sampling, color_mode === 0);
  img_data.data.set(out_data);
  ctx.putImageData(img_data, data_x, data_y);
}
function drawBoxBorder(ctx, border_width, img_w, img_h, rect, klass, score, preset_config) {
  var border_color = preset_config.border_color;
  if (!(0,external_puryfiCoreContext_namespaceObject.isHexColorTransparent)(border_color)) {
    ctx.strokeStyle = border_color;
    ctx.lineWidth = border_width;
    ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
    var min_font_size = 2 + Math.ceil(img_w * 7 / 1024);
    var max_font_size = 2 + Math.ceil(img_h * 14 / 1024);
    min_font_size = Math.max(8, min_font_size);
    max_font_size = Math.max(8, max_font_size);
    if (preset_config.display === 0 || preset_config.display === 1) {
      var text_to_write = klass.name;
      drawTextBox(ctx, border_width, rect.x, rect.y, rect.w, rect.h, text_to_write, border_color, "top", min_font_size, max_font_size);
    }
    if (preset_config.display === 0 || preset_config.display === 2) {
      drawTextBox(ctx, border_width, rect.x, rect.y, rect.w, rect.h, score.toFixed(2), border_color, "bottom", min_font_size - 2, max_font_size - 2);
    }
  }
}
function drawTextBox(ctx, padding, x, y, width, height, text, bg_color) {
  var y_baseline = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : "top";
  var min_font_size = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 8;
  var max_font_size = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 16;
  var font_family = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : "sans-serif";
  var fg_color = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : "#000000";
  ctx.textBaseline = y_baseline;
  var box_padding = padding / 2;
  var text_padding = padding;
  var max_string_width = width - box_padding * 2 - text_padding * 2;
  var font_size = computeFontSizeToFitWidth(ctx, text, max_string_width, font_family, min_font_size, max_font_size);
  ctx.font = "".concat(font_size, "px ").concat(font_family);
  var string_width = Math.ceil(ctx.measureText(text).width);
  if (max_string_width < string_width) return;
  var box_x, text_x;
  box_x = x + box_padding;
  text_x = box_x + text_padding;
  var box_y, text_y;
  if (y_baseline === "top") {
    box_y = y + box_padding;
    text_y = box_y + text_padding;
  } else {
    box_y = y + height - box_padding - text_padding * 2 - font_size;
    text_y = box_y + text_padding + font_size;
  }
  ctx.fillStyle = bg_color;
  var box_width = string_width + text_padding * 2;
  var box_height = font_size + text_padding * 2;
  ctx.fillRect(box_x, box_y, box_width, box_height);
  ctx.fillStyle = fg_color;
  ctx.fillText(text, text_x, text_y);
}
function computeFontSizeToFitWidth(ctx, text, max_width, family, min_size, max_size) {
  ctx.font = "".concat(max_size, "px ").concat(family);
  if (Math.ceil(ctx.measureText(text).width) <= max_width) {
    return max_size;
  }
  var low = min_size;
  var high = max_size;
  var lowest_fit = min_size;
  while (low <= high) {
    var size = Math.floor((low + high) / 2);
    ctx.font = "".concat(size, "px ").concat(family);
    var width = Math.ceil(ctx.measureText(text).width);
    if (max_width < width) {
      high = size - 1;
    } else {
      low = size + 1;
      lowest_fit = size;
    }
  }
  return lowest_fit;
}
function calculatePixelBoxColor(width, x, y, px_size, px_arr, grayscale, color_precision, accurate_sampling) {
  if (grayscale) {
    var avg_color, a;
    if (accurate_sampling) {
      var height = px_arr.length / (width * 4);
      avg_color = 0, a = 0;
      var px_count = 0;
      for (var i = Math.max(0, Math.round(x - px_size / 2)); i < Math.min(width, x + px_size / 2); i++) {
        for (var j = Math.max(0, Math.round(y - px_size / 2)); j < Math.min(height, y + px_size / 2); j++) {
          var index = (i + j * width) * 4;
          px_count++;
          avg_color += ((px_arr[index] + px_arr[index + 1] + px_arr[index + 2]) / 3 - avg_color) / px_count;
          a += (px_arr[index + 3] - a) / px_count;
        }
      }
    } else {
      var _index = (Math.round(x) + Math.round(y) * width) * 4;
      avg_color = (px_arr[_index] + px_arr[_index + 1] + px_arr[_index + 2]) / 3;
      a = px_arr[_index + 3];
    }
    return "rgba(" + Math.round((0,external_puryfiCoreContext_namespaceObject.nearestMultiple)(avg_color, color_precision)) + "," + Math.round((0,external_puryfiCoreContext_namespaceObject.nearestMultiple)(avg_color, color_precision)) + "," + Math.round((0,external_puryfiCoreContext_namespaceObject.nearestMultiple)(avg_color, color_precision)) + "," + a + ")";
  } else {
    var r, g, b, _a2;
    if (accurate_sampling) {
      var _height = px_arr.length / (width * 4);
      r = 0, g = 0, b = 0, _a2 = 0;
      var _px_count = 0;
      for (var _i6 = Math.max(0, Math.round(x - px_size / 2)); _i6 < Math.min(width, x + px_size / 2); _i6++) {
        for (var _j = Math.max(0, Math.round(y - px_size / 2)); _j < Math.min(_height, y + px_size / 2); _j++) {
          var _index2 = (_i6 + _j * width) * 4;
          _px_count++;
          r += (px_arr[_index2] - r) / _px_count;
          g += (px_arr[_index2 + 1] - g) / _px_count;
          b += (px_arr[_index2 + 2] - b) / _px_count;
          _a2 += (px_arr[_index2 + 3] - _a2) / _px_count;
        }
      }
    } else {
      var _index3 = (Math.round(x) + Math.round(y) * width) * 4;
      r = px_arr[_index3];
      g = px_arr[_index3 + 1];
      b = px_arr[_index3 + 2];
      _a2 = px_arr[_index3 + 3];
    }
    return "rgba(" + Math.round((0,external_puryfiCoreContext_namespaceObject.nearestMultiple)(r, color_precision)) + "," + Math.round((0,external_puryfiCoreContext_namespaceObject.nearestMultiple)(g, color_precision)) + "," + Math.round((0,external_puryfiCoreContext_namespaceObject.nearestMultiple)(b, color_precision)) + "," + _a2 + ")";
  }
}
function cluster(results, clustering_config) {
  var _iterator39 = _createForOfIteratorHelper(results.entries),
    _step39;
  try {
    for (_iterator39.s(); !(_step39 = _iterator39.n()).done;) {
      var entry = _step39.value;
      entry.cluster_rect = entry.rect.scaled(results.preset_config.scale, results.preset_config.scale);
      var extra_range = (entry.rect.w + entry.rect.h) / 2 * clustering_config.max_distance;
      entry.cluster_rect = entry.cluster_rect.resized(extra_range, extra_range);
    }
  } catch (err) {
    _iterator39.e(err);
  } finally {
    _iterator39.f();
  }
  function findIntersectingResults(_ref15, start) {
    var rect = _ref15.cluster_rect,
      klass = _ref15.klass;
    var entries_to_merge = [];
    for (var i = results.entries.length - 1; i >= start; i--) {
      var _results$entries$i = results.entries[i],
        other_rect = _results$entries$i.cluster_rect,
        other_klass = _results$entries$i.klass;
      if (clustering_config.only_matching_content && klass.body_part_index !== other_klass.body_part_index || !rect.intersects(other_rect)) continue;
      entries_to_merge.push(results.entries.splice(i, 1)[0]);
    }
    for (var _i7 = entries_to_merge.length - 1; _i7 >= 0; _i7--) {
      entries_to_merge.push.apply(entries_to_merge, _toConsumableArray(findIntersectingResults(entries_to_merge[_i7], start)));
    }
    return entries_to_merge;
  }
  for (var i = 0; i < results.entries.length - 1; i++) {
    var entries_to_merge = findIntersectingResults(results.entries[i], i + 1);
    if (entries_to_merge.length) {
      var new_rect = results.entries[i].rect;
      var new_klass = results.entries[i].klass;
      var new_score = results.entries[i].score;
      var _iterator40 = _createForOfIteratorHelper(entries_to_merge),
        _step40;
      try {
        for (_iterator40.s(); !(_step40 = _iterator40.n()).done;) {
          var other_entry = _step40.value;
          new_rect = new_rect.merged(other_entry.rect);
          new_klass = {
            key: new_klass.key,
            name: new_klass.name === other_entry.klass.name ? new_klass.name : new_klass.name + " & " + other_entry.klass.name,
            index: new_klass.index,
            nude: new_klass.nude || other_entry.klass.nude,
            erotic: new_klass.erotic || other_entry.klass.erotic
          };
          new_score = (new_score + other_entry.score) / 2;
        }
      } catch (err) {
        _iterator40.e(err);
      } finally {
        _iterator40.f();
      }
      results.entries[i] = {
        klass: new_klass,
        score: new_score,
        rect: new_rect,
        orig_rects: [results.entries[i].rect].concat(_toConsumableArray(entries_to_merge.map(function (entry) {
          return entry.rect;
        })))
      };
    }
  }
}
;// ../PuryFi-Core/processing/dist/scanning.js
function scanning_typeof(o) { "@babel/helpers - typeof"; return scanning_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, scanning_typeof(o); }
function scanning_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ scanning_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == scanning_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(scanning_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function scanning_slicedToArray(r, e) { return scanning_arrayWithHoles(r) || scanning_iterableToArrayLimit(r, e) || scanning_unsupportedIterableToArray(r, e) || scanning_nonIterableRest(); }
function scanning_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function scanning_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return scanning_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? scanning_arrayLikeToArray(r, a) : void 0; } }
function scanning_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function scanning_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function scanning_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var scanning_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};


var modelWidth = 320,
  modelHeight = 320;

var model = null;
function loadModel(modelUrl) {
  var do_warmup = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return new Promise(function (resolve, reject) {
    external_tf_namespaceObject.loadGraphModel(modelUrl).then(function (_model) {
      model = _model;
      external_tf_namespaceObject.enableProdMode();
      if (do_warmup) {
        var dummy = external_tf_namespaceObject.zeros([1, 320, 320, 3], "float32");
        model.executeAsync(dummy).then(function (res) {
          var _res = scanning_slicedToArray(res, 4),
            boxes = _res[0],
            scores = _res[1],
            classes = _res[2],
            valid_detections = _res[3];
          valid_detections.dispose();
          classes.dispose();
          scores.dispose();
          boxes.dispose();
          dummy.dispose();
          resolve(null);
        });
      } else {
        resolve(null);
      }
    });
  });
}
function pixelsToTensorsBilinear(pixels) {
  var fromPixels = external_tf_namespaceObject.browser.fromPixels(pixels);
  var resized = external_tf_namespaceObject.image.resizeBilinear(fromPixels, [modelWidth, modelHeight]);
  var divved = resized.div(255.0);
  var input = divved.expandDims(0);
  fromPixels.dispose();
  resized.dispose();
  divved.dispose();
  return input;
}
function pixelsToTensors(pixels) {
  var fromPixels = external_tf_namespaceObject.browser.fromPixels(pixels);
  var divved = fromPixels.div(255.0);
  var input = divved.expandDims(0);
  fromPixels.dispose();
  divved.dispose();
  return input;
}
function runModel(input_1) {
  return scanning_awaiter(this, arguments, void 0, function (input) {
    var stats = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return /*#__PURE__*/scanning_regeneratorRuntime().mark(function _callee() {
      var t0, modelOutput, _modelOutput, boxes, scores, classes, valid_detections, valid_detections_sync, classes_sync, boxes_sync, scores_sync;
      return scanning_regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            t0 = stats != null ? performance.now() : null;
            _context.next = 3;
            return model.executeAsync(input)["finally"](function () {
              input.dispose();
            });
          case 3:
            modelOutput = _context.sent;
            if (stats != null) {
              stats.images.total_average_ai_duration(performance.now() - t0);
            }
            _modelOutput = scanning_slicedToArray(modelOutput, 4), boxes = _modelOutput[0], scores = _modelOutput[1], classes = _modelOutput[2], valid_detections = _modelOutput[3];
            _context.next = 8;
            return Promise.all([boxes.data(), scores.data(), classes.data(), valid_detections.data()]).then(function (values) {
              var _values = scanning_slicedToArray(values, 4);
              boxes_sync = _values[0];
              scores_sync = _values[1];
              classes_sync = _values[2];
              valid_detections_sync = _values[3];
            });
          case 8:
            valid_detections.dispose();
            classes.dispose();
            scores.dispose();
            boxes.dispose();
            return _context.abrupt("return", {
              valid_detections_sync: valid_detections_sync,
              classes_sync: classes_sync,
              boxes_sync: boxes_sync,
              scores_sync: scores_sync
            });
          case 13:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })();
  });
}
function parseModelOutput(natural_w, natural_h, labels, valid_detections_sync, classes_sync, boxes_sync, scores_sync) {
  var boxes = [];
  var classes = [];
  var scores = [];
  var detections_count = valid_detections_sync[0];
  for (var i = 0; i < detections_count; i++) {
    var translated_class = external_puryfiCoreContext_namespaceObject.klasses_by_index[classes_sync[i]];
    if (!labels.includes(translated_class.key)) continue;
    classes.push(classes_sync[i]);
    var _boxes_sync$slice = boxes_sync.slice(i * 4, (i + 1) * 4),
      _boxes_sync$slice2 = scanning_slicedToArray(_boxes_sync$slice, 4),
      x1 = _boxes_sync$slice2[0],
      y1 = _boxes_sync$slice2[1],
      x2 = _boxes_sync$slice2[2],
      y2 = _boxes_sync$slice2[3];
    x1 *= natural_w;
    x2 *= natural_w;
    y1 *= natural_h;
    y2 *= natural_h;
    boxes.push([Math.ceil(x1), Math.ceil(y1), Math.ceil(x2), Math.ceil(y2)]);
    scores.push(scores_sync[i]);
  }
  return {
    boxes: boxes,
    classes: classes,
    scores: scores,
    detections_count: detections_count
  };
}
function mostSimilarDetection(src, entryI, otherSrc, confidence) {
  var highestSimilarity = confidence;
  var highestSimilarityEntryI = -1;
  for (var otherEntryI = 0; otherEntryI < otherSrc.boxes.length; otherEntryI++) {
    var similarity = compareDetections(src, entryI, otherSrc, otherEntryI);
    if (highestSimilarity <= similarity) {
      highestSimilarity = similarity;
      highestSimilarityEntryI = otherEntryI;
    }
  }
  return highestSimilarityEntryI;
}
function compareDetections(source, entry_i, other_source, other_entry_i) {
  if (external_puryfiCoreContext_namespaceObject.klasses_by_index[source.classes[entry_i]].body_part_index !== external_puryfiCoreContext_namespaceObject.klasses_by_index[other_source.classes[other_entry_i]].body_part_index) return 0;
  var box = source.boxes[entry_i],
    next_box = other_source.boxes[other_entry_i];
  var avg_box_area = Math.abs((box[2] - box[0]) * (box[3] - box[1]) + (next_box[2] - next_box[0]) * (next_box[3] - next_box[1])) / 2;
  var x_overlap = Math.max(box[0], next_box[0]);
  var y_overlap = Math.max(box[1], next_box[1]);
  var end_x_overlap = Math.min(box[2], next_box[2]);
  var end_y_overlap = Math.min(box[3], next_box[3]);
  var overlap_width = end_x_overlap - x_overlap;
  var overlap_height = end_y_overlap - y_overlap;
  if (overlap_width <= 0 || overlap_height <= 0) return 0;else return overlap_width * overlap_height / avg_box_area;
}
function inferDetectionsFromFrame(i, sources, output, scanRate, confidence, interpolateRange, extendRange) {
  var source = sources[i];
  for (var entry_i = 0; entry_i < source.boxes.length; entry_i++) {
    deducePrevDetections(i, entry_i);
    deduceNextDetections(i, entry_i);
  }
  function deduceNextDetections(srcI, entryI) {
    var src = sources[srcI];
    var highestSimilaritySrcI = -1;
    var highestSimilarityEntryI = -1;
    for (var otherSrcI = srcI + 1; otherSrcI < Math.min(sources.length, srcI + interpolateRange + 1); otherSrcI++) {
      var otherSrc = sources[otherSrcI];
      var otherEntryI = mostSimilarDetection(src, entryI, otherSrc, confidence);
      if (otherEntryI !== -1) {
        highestSimilaritySrcI = otherSrcI;
        highestSimilarityEntryI = otherEntryI;
        break;
      }
    }
    var toInterpolateSrcI = srcI;
    var toInterpolateEntryI = entryI;
    var toInterpolateSrc = sources[toInterpolateSrcI];
    if (highestSimilaritySrcI !== -1) {
      var highestSimilaritySrc = sources[highestSimilaritySrcI];
      for (var _otherSrcI = srcI + 1; _otherSrcI < highestSimilaritySrcI; _otherSrcI++) {
        var _otherSrc = sources[_otherSrcI];
        var _otherEntryI = mostSimilarDetection(highestSimilaritySrc, highestSimilarityEntryI, _otherSrc, confidence);
        if (_otherEntryI !== -1) {
          createInterpolatedDetections((_otherSrcI - toInterpolateSrcI) * scanRate, toInterpolateSrcI, toInterpolateEntryI, _otherSrcI, _otherEntryI);
          if (toInterpolateSrcI !== srcI) {
            toInterpolateSrc.boxes.splice(toInterpolateEntryI, 1);
            toInterpolateSrc.classes.splice(toInterpolateEntryI, 1);
            toInterpolateSrc.scores.splice(toInterpolateEntryI, 1);
            toInterpolateSrc.detections_count--;
          }
          toInterpolateSrcI = _otherSrcI;
          toInterpolateEntryI = _otherEntryI;
          toInterpolateSrc = _otherSrc;
        }
      }
      createInterpolatedDetections((highestSimilaritySrcI - toInterpolateSrcI) * scanRate, toInterpolateSrcI, toInterpolateEntryI, highestSimilaritySrcI, highestSimilarityEntryI);
      if (toInterpolateSrcI !== srcI) {
        toInterpolateSrc.boxes.splice(toInterpolateEntryI, 1);
        toInterpolateSrc.classes.splice(toInterpolateEntryI, 1);
        toInterpolateSrc.scores.splice(toInterpolateEntryI, 1);
        toInterpolateSrc.detections_count--;
      }
      return;
    }
    var cloneToEnd;
    if (srcI === sources.length - 1) {
      cloneToEnd = output.length;
    } else {
      cloneToEnd = Math.min(output.length, (srcI + extendRange) * scanRate + 1);
    }
    for (var cloneToI = srcI * scanRate; cloneToI < cloneToEnd; cloneToI++) {
      output[cloneToI].boxes.push(src.boxes[entryI]);
      output[cloneToI].classes.push(src.classes[entryI]);
      output[cloneToI].scores.push(src.scores[entryI]);
      output[cloneToI].detections_count++;
    }
  }
  function deducePrevDetections(srcI, entryI) {
    if (srcI === 0) return;
    var src = sources[srcI];
    var prevOut = output[(srcI - 1) * scanRate];
    for (var prevOutEntryI = 0; prevOutEntryI < prevOut.boxes.length; prevOutEntryI++) {
      if (confidence <= compareDetections(src, entryI, prevOut, prevOutEntryI)) {
        return;
      }
    }
    var cloneToEnd = Math.max(0, (srcI - extendRange) * scanRate);
    for (var cloneToI = srcI * scanRate - 1; cloneToI >= cloneToEnd; cloneToI--) {
      output[cloneToI].boxes.push(src.boxes[entryI]);
      output[cloneToI].classes.push(src.classes[entryI]);
      output[cloneToI].scores.push(src.scores[entryI]);
      output[cloneToI].detections_count++;
    }
  }
  function createInterpolatedDetections(length, srcI, entryI, otherSrcI, otherSrcEntryI) {
    var src = sources[srcI],
      box = src.boxes[entryI];
    var otherSrc = sources[otherSrcI],
      nBox = otherSrc.boxes[otherSrcEntryI];
    var intermediate_boxes = (0,external_puryfiCoreContext_namespaceObject.populateArray)(length, function () {
      return new Array(4);
    });
    for (var coord_i = 0; coord_i < 4; coord_i++) {
      var diff = (nBox[coord_i] - box[coord_i]) / length;
      for (var _i = 0; _i < length; _i++) {
        intermediate_boxes[_i][coord_i] = Math.round(box[coord_i] + diff * _i);
      }
    }
    var intersection = length;
    if (external_puryfiCoreContext_namespaceObject.klasses_by_index[src.classes[entryI]].nude && !external_puryfiCoreContext_namespaceObject.klasses_by_index[otherSrc.classes[otherSrcEntryI]].nude) {
      intersection = Math.min(length, Math.max(1, extendRange * scanRate));
    } else if (external_puryfiCoreContext_namespaceObject.klasses_by_index[otherSrc.classes[otherSrcEntryI]].nude && !external_puryfiCoreContext_namespaceObject.klasses_by_index[src.classes[entryI]].nude) {
      intersection = Math.max(0, length - Math.max(1, extendRange * scanRate));
    }
    var toInterpolateI = 0;
    for (; toInterpolateI < intersection; toInterpolateI++) {
      output[srcI * scanRate + toInterpolateI].boxes.push(intermediate_boxes[toInterpolateI]);
      output[srcI * scanRate + toInterpolateI].classes.push(src.classes[entryI]);
      output[srcI * scanRate + toInterpolateI].scores.push(src.scores[entryI]);
      output[srcI * scanRate + toInterpolateI].detections_count++;
    }
    for (; toInterpolateI < length; toInterpolateI++) {
      output[srcI * scanRate + toInterpolateI].boxes.push(intermediate_boxes[toInterpolateI]);
      output[srcI * scanRate + toInterpolateI].classes.push(otherSrc.classes[otherSrcEntryI]);
      output[srcI * scanRate + toInterpolateI].scores.push(otherSrc.scores[otherSrcEntryI]);
      output[srcI * scanRate + toInterpolateI].detections_count++;
    }
  }
}
function inferDetections(frame_count, sources, scanRate, confidence, interpolateRange, extendRange) {
  var output = (0,external_puryfiCoreContext_namespaceObject.populateArray)(frame_count, function () {
    return {
      boxes: [],
      classes: [],
      scores: [],
      detections_count: 0
    };
  });
  for (var i = 0; i < sources.length; i++) {
    inferDetectionsFromFrame(i, sources, output, scanRate, confidence, interpolateRange, extendRange);
  }
  return output;
}
function filterDetections(labels, detections) {
  var classes = detections.classes,
    scores = detections.scores,
    boxes = detections.boxes,
    detections_count = detections.detections_count;
  var n = detections_count;
  for (var i = 0; i < n;) {
    if (!labels.includes(external_puryfiCoreContext_namespaceObject.klasses_by_index[classes[i]].key)) {
      boxes.splice(i, 1);
      classes.splice(i, 1);
      scores.splice(i, 1);
      n--;
    } else {
      i++;
    }
  }
  return detections;
}
;// ../PuryFi-Core/processing/dist/painting.js
function painting_typeof(o) { "@babel/helpers - typeof"; return painting_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, painting_typeof(o); }
function _defineProperty(e, r, t) { return (r = painting_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function painting_toPropertyKey(t) { var i = painting_toPrimitive(t, "string"); return "symbol" == painting_typeof(i) ? i : i + ""; }
function painting_toPrimitive(t, r) { if ("object" != painting_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != painting_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function painting_toConsumableArray(r) { return painting_arrayWithoutHoles(r) || painting_iterableToArray(r) || painting_unsupportedIterableToArray(r) || painting_nonIterableSpread(); }
function painting_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function painting_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function painting_arrayWithoutHoles(r) { if (Array.isArray(r)) return painting_arrayLikeToArray(r); }
function painting_createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = painting_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function painting_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return painting_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? painting_arrayLikeToArray(r, a) : void 0; } }
function painting_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }




function paintCensorRequest(out, outctx, processed_req, detections, config, cache) {
  var labels = processed_req.labels;
  var classes, scores, boxes, detections_count;
  var censor_type = processed_req.censortype;
  if (detections != null) {
    classes = detections.classes;
    scores = detections.scores;
    boxes = detections.boxes;
    detections_count = detections.detections_count;
  } else {
    var _parseModelOutput = parseModelOutput(out.width, out.height, labels, processed_req.valid_detections, processed_req.classes, processed_req.boxes, processed_req.scores);
    boxes = _parseModelOutput.boxes;
    classes = _parseModelOutput.classes;
    scores = _parseModelOutput.scores;
    detections_count = _parseModelOutput.detections_count;
  }
  paintImageProcessor(out, outctx, censor_type, null, boxes, classes, scores, config, detections_count, cache);
}
function paintCensor(out, outctx, censor_type, censor_preset_index, _ref, config, cache) {
  var detections_count = _ref.detections_count,
    classes = _ref.classes,
    scores = _ref.scores,
    boxes = _ref.boxes;
  var img_data = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
  paintImageProcessor(out, outctx, censor_type, censor_preset_index, boxes, classes, scores, config, detections_count, cache, img_data);
}
function paintCensorGivenModelOutput(out, outctx, censor_type, labels, valid_detections_sync, classes_sync, scores_sync, boxes_sync, config, cache) {
  var _parseModelOutput2 = parseModelOutput(out.width, out.height, labels, valid_detections_sync, classes_sync, boxes_sync, scores_sync),
    boxes = _parseModelOutput2.boxes,
    classes = _parseModelOutput2.classes,
    scores = _parseModelOutput2.scores,
    detections_count = _parseModelOutput2.detections_count;
  paintImageProcessor(out, outctx, censor_type, null, boxes, classes, scores, config, detections_count, cache);
}
function paintMissingFeaturesBlock(out, outctx, configCache) {
  var img_scale = Math.sqrt(out.width * out.height) / 1024;
  outctx.fillStyle = "#000";
  outctx.fillRect(0, 0, out.width, out.height);
  outctx.fillStyle = "#D51F37";
  outctx.globalAlpha = 1 / 3;
  outctx.fillRect(0, 0, out.width, out.height);
  outctx.globalAlpha = 1;
  var lines = ["Missing Features:"];
  if (configCache.missing_features.heart_shape) {
    lines.push("• Heart Shape");
  }
  if (configCache.missing_features.reverse_mode) {
    lines.push("• Reverse Mode");
  }
  if (configCache.missing_features.only_once_mode) {
    lines.push("• Only Once Mode");
  }
  if (configCache.missing_features.gif_censoring) {
    lines.push("• GIF Censoring");
  }
  var font_size = img_scale * 38;
  var text_line_h = font_size * 1.2;
  outctx.font = "bold ".concat(font_size, "px Segoe UI");
  outctx.textBaseline = "middle";
  outctx.textAlign = "center";
  outctx.fillStyle = "#D51F37";
  var y = out.height / 2 - (lines.length - 1) / 2 * text_line_h;
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var y_pos = y + i * text_line_h;
    outctx.fillText(line, out.width / 2, y_pos);
  }
}
function paintImageProcessor(out, outctx, censor_type, censor_preset_index, boxes, classes, scores, config, detections_count, cache) {
  var img_data = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : null;
  if (cache.missing_features.heart_shape || cache.missing_features.reverse_mode) {
    paintMissingFeaturesBlock(out, outctx, cache);
    return;
  }
  var censor_effect = (0,external_puryfiCoreContext_namespaceObject.parseEffectFromName)(censor_type);
  var translated_classes = classes.map(function (klass) {
    return external_puryfiCoreContext_namespaceObject.klasses_by_index[klass];
  });
  cache.detections_count = detections_count;
  cache.enabled_detections_count = boxes.length;
  cache.reverse_mode = config.reverse_mode_configuration.enabled;
  if ((!cache.reverse_mode || config.reverse_mode_configuration.mode !== 0 && !cache.video_frame) && cache.detections_count === 0) return;
  cache.random = censor_effect.index === external_puryfiCoreContext_namespaceObject.effects.RANDOM.index;
  if (cache.random) {
    var random_preset_config = censor_preset_index ? config.random_configuration.presets[censor_preset_index].config : (0,external_puryfiCoreContext_namespaceObject.getSelectedPreset)(config.random_configuration).config;
    drawRandomModePrimary(config, random_preset_config, cache);
    censor_effect = (0,external_puryfiCoreContext_namespaceObject.parseEffectFromIndex)(cache["random_primary_drawn_censor_type"]);
  }
  if (censor_effect.index === external_puryfiCoreContext_namespaceObject.effects.NONE.index) return;
  cache.mixed_mode = censor_effect.index === external_puryfiCoreContext_namespaceObject.effects.MIXED.index;
  cache.censor_config = config[censor_effect.config_key];
  if (cache.random && cache["random_primary_drawn_censor_preset_config"]) {
    cache.censor_preset_config = cache["random_primary_drawn_censor_preset_config"];
    cache.censor_preset_ident = config.random_configuration.selectedPresetIndex;
  } else {
    if (censor_preset_index != null) {
      cache.censor_preset_config = cache.censor_config.presets[censor_preset_index].config;
      cache.censor_preset_ident = censor_preset_index;
    } else {
      cache.censor_preset_config = (0,external_puryfiCoreContext_namespaceObject.getSelectedPreset)(cache.censor_config).config;
      cache.censor_preset_ident = cache.censor_config.selectedPresetIndex;
    }
  }
  if (cache.mixed_mode && cache.mixed_cache[cache.censor_preset_ident].has_mixed_random_to_resolve && !cache.has_resolved_mixed_random) {
    resolveMixedRandomEntries(config, cache);
    cache.mixed_cache[cache.censor_preset_ident].has_resolved_mixed_random = true;
  } else {
    cache.active_normal_censors_count_per_layer = cache.active_normal_censors_count_per_layer_pre_solving_random;
    cache.active_censors_count_per_layer = cache.active_censors_count_per_layer_pre_solving_random;
  }
  if (!cache.reverse_mode || config.reverse_mode_configuration.mode === 2 && !cache.video_frame) {
    if (!containsContentToCensor(cache, classes)) return;
  }
  var image_processor = new ImageProcessor(out, outctx, config, img_data);
  paintMultiImageProcessor(image_processor, censor_effect, config, cache, boxes, translated_classes, scores);
}
function containsContentToCensor(cache, cls_indexes) {
  if (cache.mixed_mode) {
    var mixed_cache = cache.mixed_cache[cache.censor_preset_ident];
    for (var layer = 0; layer < external_puryfiCoreContext_namespaceObject.MIXED_CENSOR_LAYERS_COUNT; layer++) {
      var reverse_entry = mixed_cache.mixed_reverse_entries[layer];
      var has_reverse_entry = reverse_entry != null && reverse_entry.censor_type !== external_puryfiCoreContext_namespaceObject.effects.NONE.index;
      var _iterator = painting_createForOfIteratorHelper(cls_indexes),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var cls_index = _step.value;
          var entry = mixed_cache.mixed_entries[layer][cls_index];
          if (has_reverse_entry) {
            if (entry == null || entry.censor_type !== external_puryfiCoreContext_namespaceObject.effects.NONE.index) {
              return true;
            }
          } else if (entry != null && entry.censor_type !== external_puryfiCoreContext_namespaceObject.effects.NONE.index) {
            return true;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return false;
  } else {
    if (cache.reverse_mode && cache.enabled_detections_count === cache.detections_count) {
      return false;
    } else {
      return true;
    }
  }
}
function resolveMixedRandomEntries(config, cache) {
  var _a, _b, _c, _d;
  cache.mixed_cache = structuredClone(cache.mixed_cache);
  var mixed_cache = cache.mixed_cache[cache.censor_preset_ident];
  for (var layer in mixed_cache.mixed_reverse_entries) {
    if (mixed_cache.mixed_reverse_entries[layer] != null) {
      var reverse_entry = mixed_cache.mixed_reverse_entries[layer];
      if (reverse_entry.censor_type === external_puryfiCoreContext_namespaceObject.effects.RANDOM.index) {
        drawRandomModeSecondary(reverse_entry.preset_ident, config, cache);
        reverse_entry.censor_type = cache["random_preset_index_".concat(reverse_entry.preset_ident, "_secondary_drawn_censor_type")];
        if (cache["random_preset_index_".concat(reverse_entry.preset_ident, "_secondary_drawn_censor_preset_config")]) {
          reverse_entry.preset_ident = "random_".concat(reverse_entry.preset_ident);
          reverse_entry.preset_config = cache["random_preset_index_".concat(reverse_entry.preset_ident, "_secondary_drawn_censor_preset_config")];
        } else {
          reverse_entry.preset_ident = (_b = (_a = config[(0,external_puryfiCoreContext_namespaceObject.parseEffectFromIndex)(reverse_entry.censor_type).config_key]) === null || _a === void 0 ? void 0 : _a.selectedPresetIndex) !== null && _b !== void 0 ? _b : 0;
        }
      }
    }
  }
  mixed_cache.active_normal_censors_count_per_layer = painting_toConsumableArray(mixed_cache.active_normal_censors_count_per_layer_pre_solving_random);
  mixed_cache.active_censors_count_per_layer = painting_toConsumableArray(mixed_cache.active_censors_count_per_layer_pre_solving_random);
  for (var _layer in mixed_cache.mixed_entries) {
    for (var cls_index in mixed_cache.mixed_entries[_layer]) {
      var entry = mixed_cache.mixed_entries[_layer][cls_index];
      if (entry.censor_type === external_puryfiCoreContext_namespaceObject.effects.RANDOM.index) {
        drawRandomModeSecondary(entry.preset_ident, config, cache);
        entry.censor_type = cache["random_preset_index_".concat(entry.preset_ident, "_secondary_drawn_censor_type")];
        if (cache["random_preset_index_".concat(entry.preset_ident, "_secondary_drawn_censor_preset_config")]) {
          entry.preset_ident = "random_".concat(entry.preset_ident);
          entry.preset_config = cache["random_preset_index_".concat(entry.preset_ident, " _secondary_drawn_censor_preset_config")];
        } else {
          if (entry.censor_type === external_puryfiCoreContext_namespaceObject.effects.NONE.index) {
            mixed_cache.active_normal_censors_count_per_layer[_layer]++;
            mixed_cache.active_censors_count_per_layer[_layer]--;
            if (mixed_cache.mixed_reverse_entries[_layer] == null) {
              delete mixed_cache.mixed_entries[_layer][cls_index];
            } else {
              entry.preset_ident = mixed_cache.mixed_reverse_entries[_layer].preset_ident;
            }
          } else {
            entry.preset_ident = (_d = (_c = config[external_puryfiCoreContext_namespaceObject.effects_by_index[entry.censor_type].config_key]) === null || _c === void 0 ? void 0 : _c.selectedPresetIndex) !== null && _d !== void 0 ? _d : 0;
          }
        }
      }
    }
  }
}
function sortDetectionsByClass(detections) {
  return detections.sort(function (a, b) {
    return a.klass.index - b.klass.index;
  });
}
function getCensorPresetConfig(config, type, index) {
  if (type == external_puryfiCoreContext_namespaceObject.effects.NONE.index) return null;
  var config_key = external_puryfiCoreContext_namespaceObject.effects_by_index[type].config_key;
  return config[config_key].presets[index].config;
}
function paintMultiImageProcessor(image_processor, censor_effect, config, cache, boxes, translated_classes, scores) {
  var _a, _b;
  image_processor.before(cache);
  if (cache.mixed_mode) {
    var mixed_cache = cache.mixed_cache[cache.censor_preset_ident];
    var results_by_layer = {};
    for (var layer = 0; layer < external_puryfiCoreContext_namespaceObject.MIXED_CENSOR_LAYERS_COUNT; layer++) {
      results_by_layer[layer] = {};
      for (var i = 0; i < boxes.length; i++) {
        var cls = translated_classes[i];
        var mixed_entry = mixed_cache.mixed_entries[layer][cls.index];
        if (mixed_entry == null) continue;
        if (results_by_layer[layer][mixed_entry.censor_type] == null) {
          results_by_layer[layer][mixed_entry.censor_type] = {};
        }
        if (results_by_layer[layer][mixed_entry.censor_type][mixed_entry.preset_ident] == null) {
          results_by_layer[layer][mixed_entry.censor_type][mixed_entry.preset_ident] = {
            entries: [],
            preset_config: (_a = mixed_entry.preset_config) !== null && _a !== void 0 ? _a : getCensorPresetConfig(config, mixed_entry.censor_type, mixed_entry.preset_ident),
            preset_ident: mixed_entry.preset_ident
          };
        }
        var rect = new Rectangle(boxes[i][0], boxes[i][1], Math.max(1, boxes[i][2] - boxes[i][0]), Math.max(1, boxes[i][3] - boxes[i][1]));
        results_by_layer[layer][mixed_entry.censor_type][mixed_entry.preset_ident].entries.push({
          klass: cls,
          score: scores[i],
          rect: rect,
          orig_rects: [rect]
        });
      }
      for (var type in results_by_layer[layer]) {
        if (type == external_puryfiCoreContext_namespaceObject.effects.NONE.index) continue;
        image_processor.prepareEntries(parseInt(type), results_by_layer[layer][type], config, cache);
      }
    }
    if (config.caption_configuration.enabled) {
      var entries_by_caption_preset_index = {};
      for (var _layer2 = 0; _layer2 < external_puryfiCoreContext_namespaceObject.MIXED_CENSOR_LAYERS_COUNT; _layer2++) {
        for (var _type in results_by_layer[_layer2]) {
          if (_type === "0") continue;
          for (var preset_ident in results_by_layer[_layer2][_type]) {
            var preset_config = results_by_layer[_layer2][_type][preset_ident].preset_config;
            if (preset_config.caption && preset_config.shape !== 4) {
              var _entries_by_caption_p;
              var caption_preset_index = preset_config.caption_preset_index;
              if (config.caption_configuration.presets[preset_config.caption_preset_index] == null) caption_preset_index = 0;
              if (entries_by_caption_preset_index[caption_preset_index] == null) {
                entries_by_caption_preset_index[caption_preset_index] = [];
              }
              (_entries_by_caption_p = entries_by_caption_preset_index[caption_preset_index]).push.apply(_entries_by_caption_p, painting_toConsumableArray(results_by_layer[_layer2][_type][preset_ident].entries));
            }
          }
        }
      }
      for (var _caption_preset_index in entries_by_caption_preset_index) {
        var entries = entries_by_caption_preset_index[_caption_preset_index];
        image_processor.getCaptions(entries, config.caption_configuration.presets[_caption_preset_index].config, _caption_preset_index, cache);
      }
    }
    for (var _layer3 = 0; _layer3 < external_puryfiCoreContext_namespaceObject.MIXED_CENSOR_LAYERS_COUNT; _layer3++) {
      var results_by_censor = results_by_layer[_layer3];
      if (!Object.keys(results_by_censor).length && !(cache.reverse_mode || mixed_cache.mixed_reverse_entries[_layer3] != null)) continue;
      image_processor.beforeLayer(_layer3, cache);
      if (cache.reverse_mode && mixed_cache.mixed_reverse_entries[_layer3] != null) {
        var mixed_reverse_entry = mixed_cache.mixed_reverse_entries[_layer3];
        if (mixed_reverse_entry.censor_type != external_puryfiCoreContext_namespaceObject.effects.NONE.index) {
          mixed_reverse_entry.preset_config = (_b = mixed_reverse_entry.preset_config) !== null && _b !== void 0 ? _b : getCensorPresetConfig(config, mixed_reverse_entry.censor_type, mixed_reverse_entry.preset_ident);
          image_processor.applyReverseEffect(parseInt(mixed_reverse_entry.censor_type), mixed_reverse_entry.preset_config, mixed_reverse_entry.preset_ident, cache);
          var normal_results = results_by_censor[external_puryfiCoreContext_namespaceObject.effects.NONE.index];
          if (normal_results != null) {
            for (var ident in normal_results) {
              normal_results[ident].preset_config = mixed_reverse_entry.preset_config;
            }
            image_processor.prepareEntries(mixed_reverse_entry.censor_type, normal_results, config, cache);
            image_processor.applyNormalEffects(parseInt(mixed_reverse_entry.censor_type), normal_results, cache);
          }
        }
      }
      for (var _type2 in results_by_censor) {
        image_processor.applyEffects(parseInt(_type2), results_by_censor[_type2], cache);
      }
    }
  } else {
    var results = _defineProperty({}, cache.censor_preset_ident, {
      entries: boxes.map(function (_, i) {
        var rect = new Rectangle(boxes[i][0], boxes[i][1], Math.max(1, boxes[i][2] - boxes[i][0]), Math.max(1, boxes[i][3] - boxes[i][1]));
        return {
          klass: translated_classes[i],
          score: scores[i],
          rect: rect,
          orig_rects: [rect]
        };
      }),
      preset_config: cache.censor_preset_config,
      preset_ident: cache.censor_preset_ident
    });
    image_processor.prepareEntries(censor_effect.index, results, config, cache);
    if (config.caption_configuration.enabled && cache.censor_preset_config.caption && cache.censor_preset_config.shape !== 4) {
      var _caption_preset_index2 = cache.censor_preset_config.caption_preset_index;
      if (config.caption_configuration.presets[cache.censor_preset_config.caption_preset_index] == null) _caption_preset_index2 = 0;
      image_processor.getCaptions(results[cache.censor_preset_ident].entries, config.caption_configuration.presets[_caption_preset_index2].config, _caption_preset_index2, cache);
    }
    image_processor.beforeLayer(0, cache);
    if (cache.reverse_mode) {
      image_processor.applyReverseEffect(censor_effect.index, cache.censor_preset_config, cache.censor_preset_ident, cache);
      if (results[cache.censor_preset_ident].entries.length) {
        image_processor.applyNormalEffects(censor_effect.index, results, cache);
      }
    } else if (results[cache.censor_preset_ident].entries.length) {
      image_processor.applyEffects(censor_effect.index, results, cache);
    }
  }
}
function drawRandomModeSecondary(preset_index, config, cache) {
  if (cache["random_preset_index_".concat(preset_index, "_secondary_drawn_censor_type")] != null) return;
  var random_preset_config = config.random_configuration.presets[preset_index].config;
  var weights = Object.assign({}, random_preset_config.censor_weights);
  weights[external_puryfiCoreContext_namespaceObject.effects.MIXED.index] = 0;
  var effect = (0,external_puryfiCoreContext_namespaceObject.parseEffectFromIndex)((0,external_puryfiCoreContext_namespaceObject.randomWeighted)(weights));
  cache["random_preset_index_".concat(preset_index, "_secondary_drawn_censor_type")] = effect.index;
  if (random_preset_config.mode === 1 && effect.index !== external_puryfiCoreContext_namespaceObject.effects.NONE.index) {
    cache["random_preset_index_".concat(preset_index, "_secondary_drawn_censor_preset_config")] = (0,external_puryfiCoreContext_namespaceObject.randomizeConfigObject)((0,external_puryfiCoreContext_namespaceObject.getSelectedPreset)(config[effect.config_key]).config);
  }
}
function drawRandomModePrimary(config, random_preset_config, cache) {
  if (cache["random_primary_drawn_censor_type"] != null) return;
  var effect = (0,external_puryfiCoreContext_namespaceObject.parseEffectFromIndex)((0,external_puryfiCoreContext_namespaceObject.randomWeighted)(random_preset_config.censor_weights));
  cache["random_primary_drawn_censor_type"] = effect.index;
  if (random_preset_config.mode === 1 && effect.index !== external_puryfiCoreContext_namespaceObject.effects.NONE.index) {
    cache["random_primary_drawn_censor_preset_config"] = (0,external_puryfiCoreContext_namespaceObject.randomizeConfigObject)((0,external_puryfiCoreContext_namespaceObject.getSelectedPreset)(config[effect.config_key]).config);
  }
}
function mergeImageData(imageDatas) {
  var newImageData = imageDatas[0];
  for (var j = 0; j < imageDatas.length; j++) {
    for (var i = 0, bytes = imageDatas[j].data.length; i < bytes; i += 4) {
      var index = imageDatas[j].data[i + 3] === 0 ? 0 : j;
      newImageData.data[i] = imageDatas[index].data[i];
      newImageData.data[i + 1] = imageDatas[index].data[i + 1];
      newImageData.data[i + 2] = imageDatas[index].data[i + 2];
      newImageData.data[i + 3] = imageDatas[index].data[i + 3];
    }
  }
  return newImageData;
}
;// ../PuryFi-Core/processing/dist/scanning.browser.js
function scanning_browser_typeof(o) { "@babel/helpers - typeof"; return scanning_browser_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, scanning_browser_typeof(o); }
function scanning_browser_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ scanning_browser_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == scanning_browser_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(scanning_browser_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
var scanning_browser_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};


var resizingSrcCanvas = createCanvas(1, 1);
var resizingSrcCtx = resizingSrcCanvas.getContext("2d");
var resizingCanvas = createCanvas(modelWidth, modelHeight);
var resizingCtx = resizingCanvas.getContext("2d");
function resizeImage(img, w, h) {
  resizingCtx.drawImage(img, 0, 0, w, h);
  return resizingCtx.getImageData(0, 0, w, h);
}
function resizePixelData(data, src_w, src_h, w, h) {
  if (resizingSrcCanvas.width !== src_w || resizingSrcCanvas.height !== src_h) {
    resizingSrcCanvas.width = src_w;
    resizingSrcCanvas.height = src_h;
  }
  var imgData = new ImageData(data, src_w, src_h);
  resizingSrcCtx.putImageData(imgData, 0, 0);
  resizingCtx.drawImage(resizingSrcCanvas, 0, 0, w, h);
  return new Uint8Array(resizingCtx.getImageData(0, 0, w, h).data.buffer);
}
function runModelOnImage(img_1) {
  return scanning_browser_awaiter(this, arguments, void 0, function (img) {
    var stats = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return /*#__PURE__*/scanning_browser_regeneratorRuntime().mark(function _callee() {
      var pixels;
      return scanning_browser_regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            pixels = {
              data: new Uint8Array(resizeImage(img, modelWidth, modelHeight).data),
              width: modelWidth,
              height: modelHeight
            };
            _context.next = 3;
            return runModel(pixelsToTensors(pixels), stats);
          case 3:
            return _context.abrupt("return", _context.sent);
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })();
  });
}
function runModelOnPixels(pixelsBuffer_1, w_1, h_1) {
  return scanning_browser_awaiter(this, arguments, void 0, function (pixelsBuffer, w, h) {
    var stats = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    return /*#__PURE__*/scanning_browser_regeneratorRuntime().mark(function _callee2() {
      var pixels;
      return scanning_browser_regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            pixels = {
              data: new Uint8Array(resizePixelData(new Uint8ClampedArray(pixelsBuffer), w, h, modelWidth, modelHeight)),
              width: modelWidth,
              height: modelHeight
            };
            _context2.next = 3;
            return runModel(pixelsToTensors(pixels), stats);
          case 3:
            return _context2.abrupt("return", _context2.sent);
          case 4:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    })();
  });
}
;// ../PuryFi-Core/processing/dist/detections.js
function detections_createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = detections_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function detections_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return detections_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? detections_arrayLikeToArray(r, a) : void 0; } }
function detections_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function detections_typeof(o) { "@babel/helpers - typeof"; return detections_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, detections_typeof(o); }

function toFractionBoxes(boxes, w, h) {
  return boxes.map(function (box) {
    return [(box[0] + box[2]) / 2 / w, (box[1] + box[3]) / 2 / h, (box[2] - box[0]) / w, (box[3] - box[1]) / h];
  });
}
function toPixelBoxes(fractionBoxes, w, h) {
  return fractionBoxes.map(function (fraction) {
    return [Math.round((fraction[0] - fraction[2] / 2) * w), Math.round((fraction[1] - fraction[3] / 2) * h), Math.round((fraction[0] + fraction[2] / 2) * w), Math.round((fraction[1] + fraction[3] / 2) * h)];
  });
}
function scaleBoxes(boxes, scale) {
  return boxes.map(function (box) {
    return [box[0] * scale, box[1] * scale, box[2] * scale, box[3] * scale];
  });
}
function validateDetections(detections) {
  var isFractionBoxes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var imgW = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var imgH = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  if (detections_typeof(detections) !== "object") return false;
  for (var key in detections) {
    if (key !== "boxes" && key !== "classes" && key !== "scores" && key !== "detections_count") {
      return false;
    }
  }
  if (!Array.isArray(detections.boxes)) return false;
  if (!Array.isArray(detections.classes)) return false;
  if (!Array.isArray(detections.scores)) return false;
  if (typeof detections.detections_count !== "number") return false;
  if (detections.boxes.length !== detections.classes.length || detections.boxes.length !== detections.scores.length) return false;
  if (isFractionBoxes) {
    var _iterator = detections_createForOfIteratorHelper(detections.boxes),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var box = _step.value;
        if (box[0] < 0 || box[1] < 0 || box[2] < 0 || box[3] < 0 || box[0] > 1 || box[1] > 1 || box[0] + box[2] / 2 > 1 || box[0] - box[2] / 2 < 0 || box[1] + box[3] / 2 > 1 || box[1] - box[3] / 2 < 0) {
          return false;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else {
    var _iterator2 = detections_createForOfIteratorHelper(detections.boxes),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _box = _step2.value;
        if (_box[0] < 0 || _box[1] < 0 || _box[2] < 0 || _box[3] < 0 || _box[0] > imgW || _box[1] > imgH || _box[0] + _box[2] > imgW || _box[1] + _box[3] > imgH) {
          return false;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
  var _iterator3 = detections_createForOfIteratorHelper(detections.scores),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var score = _step3.value;
      if (typeof score !== "number" || score < 0 || score > 1) return false;
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  var _iterator4 = detections_createForOfIteratorHelper(detections.classes),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var klass = _step4.value;
      if (typeof klass !== "number" || klass < 0 || klass >= external_puryfiCoreContext_namespaceObject.ALL_LABELS_COUNT) return false;
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  if (detections.detections_count < detections.boxes.length) return false;
  return true;
}
;// ../PuryFi-Core/processing/dist/mimetools.js
function mimetools_typeof(o) { "@babel/helpers - typeof"; return mimetools_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, mimetools_typeof(o); }
function mimetools_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ mimetools_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == mimetools_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(mimetools_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
var mimetools_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function requestContentType(url, callback, onerror) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("HEAD", url);
  xhttp.onreadystatechange = function () {
    if (this.readyState == this.DONE) {
      var content_type_header = this.getResponseHeader("Content-Type");
      callback(content_type_header);
    } else if (xhttp.status == 403) {
      onerror(xhttp.status);
    }
  };
  xhttp.send();
}
function toDataURL(url, callback, errorCallback) {
  var xhr1 = new XMLHttpRequest();
  var ct = "";
  function hand() {
    ct = this.getResponseHeader("content-type");
  }
  xhr1.onreadystatechange = hand;
  xhr1.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result, ct);
    };
    reader.readAsArrayBuffer(xhr1.response);
  };
  xhr1.onerror = function (err) {
    errorCallback === null || errorCallback === void 0 ? void 0 : errorCallback(err);
  };
  xhr1.open("GET", url);
  xhr1.responseType = "blob";
  xhr1.send();
}
function processableContentType(content_type, file_types, gif_configuration) {
  if (content_type === "image/png" && file_types.includes("png")) {
    return true;
  }
  if (content_type === "image/jpg" && file_types.includes("jpg")) {
    return true;
  }
  if (content_type === "image/jpeg" && file_types.includes("jpg")) {
    return true;
  }
  if (content_type === "image/webp" && file_types.includes("webp")) {
    return true;
  }
  if (content_type === "image/bmp" && file_types.includes("bmp")) {
    return true;
  }
  if (content_type === "image/avif" && file_types.includes("avif")) {
    return true;
  }
  if (content_type === "image/gif" && (file_types.includes("gif") || gif_configuration != null && gif_configuration._thumbnails)) {
    return true;
  }
  if (content_type === "video/webm" && file_types.includes("webm")) {
    return false;
  }
  return false;
}
function prepareFetch(urlStr) {
  var url = new URL(urlStr);
  switch (url.hostname) {
    case "i.pximg.net":
      return {
        referrer: "https://www.pixiv.net/"
      };
    case "cdn.sex.com":
      return {
        referrer: "https://www.sex.com/"
      };
    default:
      return {};
  }
}
function toBlobWithMimeHeaderNoReq(url) {
  return mimetools_awaiter(this, void 0, void 0, /*#__PURE__*/mimetools_regeneratorRuntime().mark(function _callee() {
    var res, blob, mime;
    return mimetools_regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return fetch(url);
        case 2:
          res = _context.sent;
          _context.next = 5;
          return res.blob();
        case 5:
          blob = _context.sent;
          _context.next = 8;
          return checkMime(blob);
        case 8:
          mime = _context.sent;
          return _context.abrupt("return", Object.assign({
            blob: blob
          }, mime));
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
}
function toBlobWithMimeHeader(url, req) {
  return mimetools_awaiter(this, void 0, void 0, /*#__PURE__*/mimetools_regeneratorRuntime().mark(function _callee2() {
    var res, blob, mime;
    return mimetools_regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return fetch(url, req);
        case 2:
          res = _context2.sent;
          _context2.next = 5;
          return res.blob();
        case 5:
          blob = _context2.sent;
          _context2.next = 8;
          return checkMime(blob);
        case 8:
          mime = _context2.sent;
          return _context2.abrupt("return", Object.assign({
            blob: blob
          }, mime));
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
}
function checkBufferMime(arrayBuffer) {
  var signatureArr = new Array(12);
  var arr = new Uint8Array(arrayBuffer);
  for (var i = 0; i < 12; i++) {
    signatureArr[i] = arr[i].toString(16).padStart(2, "0");
  }
  var header = signatureArr.join("");
  return checkMimeHeader(header, arrayBuffer);
}
function checkMime(blob) {
  return new Promise(function (resolve, reject) {
    var fileReader = new FileReader();
    fileReader.onloadend = function (e) {
      if (e.target == null) {
        reject("FileReader error");
        return;
      }
      var arr = new Uint8Array(e.target.result);
      var header = "";
      for (var i = 0; i < arr.length; i++) {
        header += arr[i].toString(16).padStart(2, "0");
      }
      resolve(checkMimeHeader(header, e.target.result));
    };
    fileReader.readAsArrayBuffer(blob.slice(0, 12));
  });
}
function checkMimeHeader(header, byteArr) {
  var type = "unknown";
  var ext = "";
  switch (header.slice(0, 8)) {
    case "89504e47":
      type = "image/png";
      ext = "png";
      return {
        type: type,
        ext: ext,
        header: header
      };
    case "47494638":
      type = "image/gif";
      ext = "gif";
      return {
        type: type,
        ext: ext,
        header: header
      };
    case "52494646":
      var mime_info = {};
      try {
        if (byteArr != null) {
          var arrWebp = new Uint8Array(byteArr).subarray(30, 34);
          var animWebp = "";
          for (var i = 0; i < arrWebp.length; i++) {
            animWebp += arrWebp[i].toString(16);
          }
          if (animWebp === "414e494d") {
            mime_info["ANIM"] = true;
          } else {
            mime_info["ANIM"] = false;
          }
        } else {
          mime_info["ANIM"] = false;
        }
      } catch (err) {
        console.log(err);
      }
      type = "image/webp";
      ext = "webp";
      return {
        type: type,
        ext: ext,
        header: header,
        mime_info: mime_info
      };
    case "ffd8ffe0":
    case "ffd8ffe1":
    case "ffd8ffe2":
    case "ffd8ffe3":
    case "ffd8ffdb":
    case "ffd8ffee":
      type = "image/jpeg";
      ext = "jpg";
      return {
        type: type,
        ext: ext,
        header: header
      };
    case "1a45dfa3":
      type = "video/webm";
      ext = "webm";
      return {
        type: type,
        ext: ext,
        header: header
      };
    case "25504446":
      type = "application/pdf";
      ext = "pdf";
      return {
        type: type,
        ext: ext,
        header: header
      };
  }
  switch (header.slice(8, 24)) {
    case "6674797061766966":
      {
        type = "image/avif";
        ext = "avif";
        return {
          type: type,
          ext: ext,
          header: header
        };
      }
    case "667479704d345620":
    case "6674797071742020":
    case "667479706d703432":
    case "6674797069736f6d":
    case "667479704d534e56":
      {
        type = "video/mp4";
        ext = "mp4";
        return {
          type: type,
          ext: ext,
          header: header
        };
      }
  }
  switch (header.slice(0, 14)) {
    case "234558544d3355":
      type = "application/m3u8";
      ext = "m3u8";
      return {
        type: type,
        ext: ext,
        header: header
      };
  }
  switch (header.slice(0, 10)) {
    case "3c3f786d6c":
      {
        type = "application/xml";
        ext = "xml";
        return {
          type: type,
          ext: ext,
          header: header
        };
      }
  }
  if (header.startsWith("424d")) {
    type = "image/bmp";
    ext = "bmp";
    return {
      type: type,
      ext: ext,
      header: header
    };
  }
  return {
    type: type,
    ext: ext,
    header: header,
    mime_info: false
  };
}
;// ../PuryFi-Core/processing/dist/browser.js










window.puryfiCoreProcessing = __webpack_exports__;
/******/ })()
;