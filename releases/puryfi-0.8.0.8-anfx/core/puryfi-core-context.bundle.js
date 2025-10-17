/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 42:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_RESULT__;// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
// This work is free. You can redistribute it and/or modify it
// under the terms of the WTFPL, Version 2
// For more information see LICENSE.txt or http://www.wtfpl.net/
//
// For more information, the home page:
// http://pieroxy.net/blog/pages/lz-string/testing.html
//
// LZ-based compression algorithm, version 1.4.5
var LZString = (function() {

// private property
var f = String.fromCharCode;
var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
var baseReverseDic = {};

function getBaseValue(alphabet, character) {
  if (!baseReverseDic[alphabet]) {
    baseReverseDic[alphabet] = {};
    for (var i=0 ; i<alphabet.length ; i++) {
      baseReverseDic[alphabet][alphabet.charAt(i)] = i;
    }
  }
  return baseReverseDic[alphabet][character];
}

var LZString = {
  compressToBase64 : function (input) {
    if (input == null) return "";
    var res = LZString._compress(input, 6, function(a){return keyStrBase64.charAt(a);});
    switch (res.length % 4) { // To produce valid Base64
    default: // When could this happen ?
    case 0 : return res;
    case 1 : return res+"===";
    case 2 : return res+"==";
    case 3 : return res+"=";
    }
  },

  decompressFromBase64 : function (input) {
    if (input == null) return "";
    if (input == "") return null;
    return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrBase64, input.charAt(index)); });
  },

  compressToUTF16 : function (input) {
    if (input == null) return "";
    return LZString._compress(input, 15, function(a){return f(a+32);}) + " ";
  },

  decompressFromUTF16: function (compressed) {
    if (compressed == null) return "";
    if (compressed == "") return null;
    return LZString._decompress(compressed.length, 16384, function(index) { return compressed.charCodeAt(index) - 32; });
  },

  //compress into uint8array (UCS-2 big endian format)
  compressToUint8Array: function (uncompressed) {
    var compressed = LZString.compress(uncompressed);
    var buf=new Uint8Array(compressed.length*2); // 2 bytes per character

    for (var i=0, TotalLen=compressed.length; i<TotalLen; i++) {
      var current_value = compressed.charCodeAt(i);
      buf[i*2] = current_value >>> 8;
      buf[i*2+1] = current_value % 256;
    }
    return buf;
  },

  //decompress from uint8array (UCS-2 big endian format)
  decompressFromUint8Array:function (compressed) {
    if (compressed===null || compressed===undefined){
        return LZString.decompress(compressed);
    } else {
        var buf=new Array(compressed.length/2); // 2 bytes per character
        for (var i=0, TotalLen=buf.length; i<TotalLen; i++) {
          buf[i]=compressed[i*2]*256+compressed[i*2+1];
        }

        var result = [];
        buf.forEach(function (c) {
          result.push(f(c));
        });
        return LZString.decompress(result.join(''));

    }

  },


  //compress into a string that is already URI encoded
  compressToEncodedURIComponent: function (input) {
    if (input == null) return "";
    return LZString._compress(input, 6, function(a){return keyStrUriSafe.charAt(a);});
  },

  //decompress from an output of compressToEncodedURIComponent
  decompressFromEncodedURIComponent:function (input) {
    if (input == null) return "";
    if (input == "") return null;
    input = input.replace(/ /g, "+");
    return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrUriSafe, input.charAt(index)); });
  },

  compress: function (uncompressed) {
    return LZString._compress(uncompressed, 16, function(a){return f(a);});
  },
  _compress: function (uncompressed, bitsPerChar, getCharFromInt) {
    if (uncompressed == null) return "";
    var i, value,
        context_dictionary= {},
        context_dictionaryToCreate= {},
        context_c="",
        context_wc="",
        context_w="",
        context_enlargeIn= 2, // Compensate for the first entry which should not count
        context_dictSize= 3,
        context_numBits= 2,
        context_data=[],
        context_data_val=0,
        context_data_position=0,
        ii;

    for (ii = 0; ii < uncompressed.length; ii += 1) {
      context_c = uncompressed.charAt(ii);
      if (!Object.prototype.hasOwnProperty.call(context_dictionary,context_c)) {
        context_dictionary[context_c] = context_dictSize++;
        context_dictionaryToCreate[context_c] = true;
      }

      context_wc = context_w + context_c;
      if (Object.prototype.hasOwnProperty.call(context_dictionary,context_wc)) {
        context_w = context_wc;
      } else {
        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
          if (context_w.charCodeAt(0)<256) {
            for (i=0 ; i<context_numBits ; i++) {
              context_data_val = (context_data_val << 1);
              if (context_data_position == bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
            }
            value = context_w.charCodeAt(0);
            for (i=0 ; i<8 ; i++) {
              context_data_val = (context_data_val << 1) | (value&1);
              if (context_data_position == bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          } else {
            value = 1;
            for (i=0 ; i<context_numBits ; i++) {
              context_data_val = (context_data_val << 1) | value;
              if (context_data_position ==bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = 0;
            }
            value = context_w.charCodeAt(0);
            for (i=0 ; i<16 ; i++) {
              context_data_val = (context_data_val << 1) | (value&1);
              if (context_data_position == bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          }
          context_enlargeIn--;
          if (context_enlargeIn == 0) {
            context_enlargeIn = Math.pow(2, context_numBits);
            context_numBits++;
          }
          delete context_dictionaryToCreate[context_w];
        } else {
          value = context_dictionary[context_w];
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }


        }
        context_enlargeIn--;
        if (context_enlargeIn == 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
        // Add wc to the dictionary.
        context_dictionary[context_wc] = context_dictSize++;
        context_w = String(context_c);
      }
    }

    // Output the code for w.
    if (context_w !== "") {
      if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
        if (context_w.charCodeAt(0)<256) {
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
          }
          value = context_w.charCodeAt(0);
          for (i=0 ; i<8 ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        } else {
          value = 1;
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1) | value;
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = 0;
          }
          value = context_w.charCodeAt(0);
          for (i=0 ; i<16 ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        }
        context_enlargeIn--;
        if (context_enlargeIn == 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
        delete context_dictionaryToCreate[context_w];
      } else {
        value = context_dictionary[context_w];
        for (i=0 ; i<context_numBits ; i++) {
          context_data_val = (context_data_val << 1) | (value&1);
          if (context_data_position == bitsPerChar-1) {
            context_data_position = 0;
            context_data.push(getCharFromInt(context_data_val));
            context_data_val = 0;
          } else {
            context_data_position++;
          }
          value = value >> 1;
        }


      }
      context_enlargeIn--;
      if (context_enlargeIn == 0) {
        context_enlargeIn = Math.pow(2, context_numBits);
        context_numBits++;
      }
    }

    // Mark the end of the stream
    value = 2;
    for (i=0 ; i<context_numBits ; i++) {
      context_data_val = (context_data_val << 1) | (value&1);
      if (context_data_position == bitsPerChar-1) {
        context_data_position = 0;
        context_data.push(getCharFromInt(context_data_val));
        context_data_val = 0;
      } else {
        context_data_position++;
      }
      value = value >> 1;
    }

    // Flush the last char
    while (true) {
      context_data_val = (context_data_val << 1);
      if (context_data_position == bitsPerChar-1) {
        context_data.push(getCharFromInt(context_data_val));
        break;
      }
      else context_data_position++;
    }
    return context_data.join('');
  },

  decompress: function (compressed) {
    if (compressed == null) return "";
    if (compressed == "") return null;
    return LZString._decompress(compressed.length, 32768, function(index) { return compressed.charCodeAt(index); });
  },

  _decompress: function (length, resetValue, getNextValue) {
    var dictionary = [],
        next,
        enlargeIn = 4,
        dictSize = 4,
        numBits = 3,
        entry = "",
        result = [],
        i,
        w,
        bits, resb, maxpower, power,
        c,
        data = {val:getNextValue(0), position:resetValue, index:1};

    for (i = 0; i < 3; i += 1) {
      dictionary[i] = i;
    }

    bits = 0;
    maxpower = Math.pow(2,2);
    power=1;
    while (power!=maxpower) {
      resb = data.val & data.position;
      data.position >>= 1;
      if (data.position == 0) {
        data.position = resetValue;
        data.val = getNextValue(data.index++);
      }
      bits |= (resb>0 ? 1 : 0) * power;
      power <<= 1;
    }

    switch (next = bits) {
      case 0:
          bits = 0;
          maxpower = Math.pow(2,8);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
        c = f(bits);
        break;
      case 1:
          bits = 0;
          maxpower = Math.pow(2,16);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
        c = f(bits);
        break;
      case 2:
        return "";
    }
    dictionary[3] = c;
    w = c;
    result.push(c);
    while (true) {
      if (data.index > length) {
        return "";
      }

      bits = 0;
      maxpower = Math.pow(2,numBits);
      power=1;
      while (power!=maxpower) {
        resb = data.val & data.position;
        data.position >>= 1;
        if (data.position == 0) {
          data.position = resetValue;
          data.val = getNextValue(data.index++);
        }
        bits |= (resb>0 ? 1 : 0) * power;
        power <<= 1;
      }

      switch (c = bits) {
        case 0:
          bits = 0;
          maxpower = Math.pow(2,8);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }

          dictionary[dictSize++] = f(bits);
          c = dictSize-1;
          enlargeIn--;
          break;
        case 1:
          bits = 0;
          maxpower = Math.pow(2,16);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
          dictionary[dictSize++] = f(bits);
          c = dictSize-1;
          enlargeIn--;
          break;
        case 2:
          return result.join('');
      }

      if (enlargeIn == 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
      }

      if (dictionary[c]) {
        entry = dictionary[c];
      } else {
        if (c === dictSize) {
          entry = w + w.charAt(0);
        } else {
          return null;
        }
      }
      result.push(entry);

      // Add w+entry[0] to the dictionary.
      dictionary[dictSize++] = w + entry.charAt(0);
      enlargeIn--;

      w = entry;

      if (enlargeIn == 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
      }

    }
  }
};
  return LZString;
})();

if (true) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return LZString; }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {}


/***/ }),

/***/ 309:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
__webpack_unused_export__ = void 0;
exports._W = buildCheckerFromRaw;
exports.rs = buildCheckers;
function buildCheckerFromRaw(rawCheck) {
    let checker = {
        _rawCheck: rawCheck,
        check: (value, generic = []) => {
            let error = rawCheck(false, value, generic);
            if (error)
                throw new Error(error);
        },
        strictCheck: (value, generic = []) => {
            let error = rawCheck(true, value, generic);
            if (error)
                throw new Error(error);
        },
        bind: (generic) => {
            return {
                _rawCheck: (strict, value, _, options) => rawCheck(strict, value, generic, options),
                check: (value) => {
                    let error = rawCheck(false, value, generic);
                    if (error)
                        throw new Error(error);
                },
                strictCheck: (value) => (value) => {
                    let error = rawCheck(true, value, generic);
                    if (error)
                        throw new Error(error);
                },
            };
        },
    };
    return checker;
}
function buildCheckers(...fns) {
    let checkers = {};
    fns.forEach((createChecker) => {
        Object.assign(checkers, createChecker(checkers));
    });
    return checkers;
}
__webpack_unused_export__ = {
    string: buildCheckerFromRaw((strict, value, generic = [], { name = "value" } = {}) => {
        if (typeof value !== "string") {
            return `${name} must be a string`;
        }
    }),
    number: buildCheckerFromRaw((strict, value, generic = [], { name = "value" } = {}) => {
        if (typeof value !== "number") {
            return `${name} must be a number`;
        }
    }),
    boolean: buildCheckerFromRaw((strict, value, generic = [], { name = "value" } = {}) => {
        if (typeof value !== "boolean") {
            return `${name} must be a boolean`;
        }
    }),
    symbol: buildCheckerFromRaw((strict, value, generic = [], { name = "value" } = {}) => {
        if (typeof value !== "symbol") {
            return `${name} must be a symbol`;
        }
    }),
    bigint: buildCheckerFromRaw((strict, value, generic = [], { name = "value" } = {}) => {
        if (typeof value !== "bigint") {
            return `${name} must be a bigint`;
        }
    }),
    object: buildCheckerFromRaw((strict, value, generic = [], { name = "value" } = {}) => {
        if (value == null || typeof value !== "object") {
            return `${name} must be an object`;
        }
        // TODO: strict
    }),
    Array: buildCheckerFromRaw((strict, value, generic = [], { name = "value" } = {}) => {
        if (!Array.isArray(value)) {
            return `${name} must be an array`;
        }
        if (generic[0]) {
            for (let i = 0; i < value.length; i++) {
                let otherError = generic[0]._rawCheck(strict, value[i], [], {
                    name: name + "[" + i + "]",
                });
                if (otherError) {
                    return otherError;
                }
            }
        }
    }),
    undefined: buildCheckerFromRaw((strict, value, generic = [], { name = "value" } = {}) => {
        if (value !== undefined) {
            return `${name} must be undefined`;
        }
    }),
    Union: buildCheckerFromRaw((strict, value, generic = [], { name = "value" } = {}) => {
        let errors = generic.map((checker) => checker._rawCheck(strict, value, [], { name }));
        if (errors.every((error) => error)) {
            return errors.join(" or ");
        }
    }),
    Intersection: buildCheckerFromRaw((strict, value, generic = [], { name = "value" } = {}) => {
        for (let checker of generic) {
            let error = checker._rawCheck(strict, value, [], { name });
            if (error) {
                return error;
            }
        }
    }),
    // Map: buildCheckerFromRaw<[T: NoBindChecker]>(
    //    (
    //       strict: boolean,
    //       value: any,
    //       generic: [T?: NoBindChecker] = [],
    //       { name = "value" }: { name?: string } = {}
    //    ): string | undefined => {
    //       if (!(value instanceof Map)) {
    //          return `${name} must be a Map`;
    //       }
    //       if (generic[0]) {
    //          for (let [key, val] of value) {
    //             let error = generic[0]._rawCheck(
    //                strict,
    //                key,
    //                [],
    //                { name: name + "[\"" + key + "\"]" }
    //             )
    //             if (error) {
    //                return `key ${key} in ${value}`;
    //             }
    //             error = generic[0].check(val);
    //             if (error) {
    //                return `Map value ${name} ${error}`;
    //             }
    //          }
    //       }
    //    }
    // ),
};


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
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ALL_LABELS_COUNT: () => (/* reexport */ ALL_LABELS_COUNT),
  ALL_NON_EXPERIMENTAL_LABELS_COUNT: () => (/* reexport */ ALL_NON_EXPERIMENTAL_LABELS_COUNT),
  AVIFTypeConfiguration: () => (/* reexport */ AVIFTypeConfiguration),
  BMPTypeConfiguration: () => (/* reexport */ BMPTypeConfiguration),
  BarCensorTypePresetConfig: () => (/* reexport */ BarCensorTypePresetConfig),
  BarType: () => (/* reexport */ BarType),
  BlurCensorTypePresetConfig: () => (/* reexport */ BlurCensorTypePresetConfig),
  BlurType: () => (/* reexport */ BlurType),
  BoxCensorTypePresetConfig: () => (/* reexport */ BoxCensorTypePresetConfig),
  CAPTION_BASE_FONT_SIZE: () => (/* reexport */ CAPTION_BASE_FONT_SIZE),
  CAPTION_CONFIGURATION_KEYS: () => (/* reexport */ CAPTION_CONFIGURATION_KEYS),
  CAPTION_CONFIGURATION_STORAGE_QUOTA: () => (/* reexport */ CAPTION_CONFIGURATION_STORAGE_QUOTA),
  CAPTION_ENTRY_CHANCE_MAX: () => (/* reexport */ CAPTION_ENTRY_CHANCE_MAX),
  CAPTION_ENTRY_CHANCE_MIN: () => (/* reexport */ CAPTION_ENTRY_CHANCE_MIN),
  CAPTION_ENTRY_COUNT_LIMIT: () => (/* reexport */ CAPTION_ENTRY_COUNT_LIMIT),
  CAPTION_ENTRY_MAX_TAGS: () => (/* reexport */ CAPTION_ENTRY_MAX_TAGS),
  CAPTION_ENTRY_VALUE_CHAR_LIMIT: () => (/* reexport */ CAPTION_ENTRY_VALUE_CHAR_LIMIT),
  CAPTION_TAG_COUNT_LIMIT: () => (/* reexport */ CAPTION_TAG_COUNT_LIMIT),
  CAPTION_TAG_NAME_CHAR_LIMIT: () => (/* reexport */ CAPTION_TAG_NAME_CHAR_LIMIT),
  CaptionConfiguration: () => (/* reexport */ CaptionConfiguration),
  CaptionEntry: () => (/* reexport */ CaptionEntry),
  CaptionPresetConfiguration: () => (/* reexport */ CaptionPresetConfiguration),
  CaptionTag: () => (/* reexport */ CaptionTag),
  CensorPreset: () => (/* reexport */ CensorPreset),
  CensorShape: () => (/* reexport */ CensorShape),
  CensorType: () => (/* reexport */ CensorType),
  CensorTypeConfig: () => (/* reexport */ CensorTypeConfig),
  CensorTypePresetConfig: () => (/* reexport */ CensorTypePresetConfig),
  ClusteringConfiguration: () => (/* reexport */ ClusteringConfiguration),
  ClusteringPresetConfiguration: () => (/* reexport */ ClusteringPresetConfiguration),
  ContextCheckers: () => (/* binding */ ContextCheckers),
  EffectIndex: () => (/* reexport */ EffectIndex),
  FileTypeConfiguration: () => (/* reexport */ FileTypeConfiguration),
  FontDetector: () => (/* reexport */ FontDetector),
  GIFTypeConfiguration: () => (/* reexport */ GIFTypeConfiguration),
  GlitchCensorTypePresetConfig: () => (/* reexport */ GlitchCensorTypePresetConfig),
  JPGTypeConfiguration: () => (/* reexport */ JPGTypeConfiguration),
  LABELS: () => (/* reexport */ LABELS),
  LOCK_SALT: () => (/* reexport */ LOCK_SALT),
  LockConfiguration: () => (/* reexport */ LockConfiguration),
  LookAndFeelConfiguration: () => (/* reexport */ LookAndFeelConfiguration),
  MAX_CENSOR_PRESETS: () => (/* reexport */ MAX_CENSOR_PRESETS),
  MIXED_CENSOR_LAYERS_COUNT: () => (/* reexport */ MIXED_CENSOR_LAYERS_COUNT),
  MixedCensorTypePresetConfig: () => (/* reexport */ MixedCensorTypePresetConfig),
  OnlyOnceModeConfiguration: () => (/* reexport */ OnlyOnceModeConfiguration),
  OnlyOnceModeStorageManager: () => (/* reexport */ OnlyOnceModeStorageManager),
  OnlyOnceModeTree: () => (/* reexport */ OnlyOnceModeTree),
  PNGTypeConfiguration: () => (/* reexport */ PNGTypeConfiguration),
  PixelCensorTypePresetConfig: () => (/* reexport */ PixelCensorTypePresetConfig),
  PixelType: () => (/* reexport */ PixelType),
  RandomCensorTypePresetConfig: () => (/* reexport */ RandomCensorTypePresetConfig),
  RandomMode: () => (/* reexport */ RandomMode),
  RemoteConfiguration: () => (/* reexport */ RemoteConfiguration),
  ReverseModeConfiguration: () => (/* reexport */ ReverseModeConfiguration),
  SavingConfiguration: () => (/* reexport */ SavingConfiguration),
  ScanConfiguration: () => (/* reexport */ ScanConfiguration),
  SobelCensorTypePresetConfig: () => (/* reexport */ SobelCensorTypePresetConfig),
  SplatterCensorTypePresetConfig: () => (/* reexport */ SplatterCensorTypePresetConfig),
  StickerCensorTypeConfig: () => (/* reexport */ StickerCensorTypeConfig),
  StickerCensorTypePresetConfig: () => (/* reexport */ StickerCensorTypePresetConfig),
  TriangleCensorTypePresetConfig: () => (/* reexport */ TriangleCensorTypePresetConfig),
  VideoConfiguration: () => (/* reexport */ VideoConfiguration),
  VideoInactivityTimeout: () => (/* reexport */ VideoInactivityTimeout),
  VideoMode: () => (/* reexport */ VideoMode),
  VideoOverlayProcessingMode: () => (/* reexport */ VideoOverlayProcessingMode),
  WEBPTypeConfiguration: () => (/* reexport */ WEBPTypeConfiguration),
  WhiteBlackListConfiguration: () => (/* reexport */ WhiteBlackListConfiguration),
  WordWallConfiguration: () => (/* reexport */ WordWallConfiguration),
  WordWallPresetConfiguration: () => (/* reexport */ WordWallPresetConfiguration),
  addColorInHslSpace: () => (/* reexport */ addColorInHslSpace),
  addHsl: () => (/* reexport */ addHsl),
  addHslColorDifference: () => (/* reexport */ addHslColorDifference),
  addHslColorDifferenceToObject: () => (/* reexport */ addHslColorDifferenceToObject),
  areArraysEqual: () => (/* reexport */ areArraysEqual),
  bytesToSize: () => (/* reexport */ bytesToSize),
  calcHslColorDifference: () => (/* reexport */ calcHslColorDifference),
  capitalizeFirstLetter: () => (/* reexport */ capitalizeFirstLetter),
  checkImageDimensions: () => (/* reexport */ checkImageDimensions),
  checkImageFileSize: () => (/* reexport */ checkImageFileSize),
  checkWhiteBlacklist: () => (/* reexport */ checkWhiteBlacklist),
  clamp: () => (/* reexport */ clamp),
  collectMixedEntries: () => (/* reexport */ collectMixedEntries),
  compareVersions: () => (/* reexport */ compareVersions),
  compressObj: () => (/* reexport */ compressObj),
  config_keys_display_names: () => (/* reexport */ config_keys_display_names),
  config_keys_display_order: () => (/* reexport */ config_keys_display_order),
  countDecimals: () => (/* reexport */ countDecimals),
  createConfigCache: () => (/* reexport */ createConfigCache),
  createDefaultCensorTypePreset: () => (/* reexport */ createDefaultCensorTypePreset),
  createSetting: () => (/* reexport */ createSetting),
  crypt: () => (/* reexport */ crypt),
  decompressObj: () => (/* reexport */ decompressObj),
  decrypt: () => (/* reexport */ decrypt),
  delay: () => (/* reexport */ delay),
  disableMissingPatreonFeatures: () => (/* reexport */ disableMissingPatreonFeatures),
  doesMixedPresetConfigContainType: () => (/* reexport */ doesMixedPresetConfigContainType),
  downloadBlob: () => (/* reexport */ downloadBlob),
  effects: () => (/* reexport */ effects),
  effects_by_index: () => (/* reexport */ effects_by_index),
  encodeSetting: () => (/* reexport */ encodeSetting),
  escapeQuotes: () => (/* reexport */ escapeQuotes),
  escapeRegSpecialChars: () => (/* reexport */ escapeRegSpecialChars),
  extractImgConfig: () => (/* reexport */ extractImgConfig),
  findMap: () => (/* reexport */ findMap),
  fix: () => (/* reexport */ fix),
  formatBytes: () => (/* reexport */ formatBytes),
  generateSecurityToken: () => (/* reexport */ generateSecurityToken),
  getHexAlpha: () => (/* reexport */ getHexAlpha),
  getIntColor: () => (/* reexport */ getIntColor),
  getNameFromURL: () => (/* reexport */ getNameFromURL),
  getPresetWithFallback: () => (/* reexport */ getPresetWithFallback),
  getSavingConfigPatreonTierRequired: () => (/* reexport */ getSavingConfigPatreonTierRequired),
  getSelectedPreset: () => (/* reexport */ getSelectedPreset),
  getSettingsPatreonTierRequired: () => (/* reexport */ getSettingsPatreonTierRequired),
  getStickersByGroup: () => (/* reexport */ getStickersByGroup),
  getVersion: () => (/* reexport */ getVersion),
  hashFnv32a: () => (/* reexport */ hashFnv32a),
  hexToHsl: () => (/* reexport */ hexToHsl),
  hexaToRgba: () => (/* reexport */ hexaToRgba),
  hslObjectToHslString: () => (/* reexport */ hslObjectToHslString),
  hslStringToHslObject: () => (/* reexport */ hslStringToHslObject),
  indexOfMaxOf: () => (/* reexport */ indexOfMaxOf),
  indexOfMinOf: () => (/* reexport */ indexOfMinOf),
  intersects: () => (/* reexport */ intersects),
  isArray: () => (/* reexport */ isArray),
  isBoolean: () => (/* reexport */ isBoolean),
  isHexColorOpaque: () => (/* reexport */ isHexColorOpaque),
  isHexColorTransparent: () => (/* reexport */ isHexColorTransparent),
  isLastTwoWeeksOfYear: () => (/* reexport */ isLastTwoWeeksOfYear),
  isLockConfigNotValid: () => (/* reexport */ isLockConfigNotValid),
  isNumber: () => (/* reexport */ isNumber),
  isObject: () => (/* reexport */ isObject),
  isString: () => (/* reexport */ isString),
  isWeekAroundEaster: () => (/* reexport */ isWeekAroundEaster),
  keepArray: () => (/* reexport */ keepArray),
  keepKeys: () => (/* reexport */ keepKeys),
  klasses: () => (/* reexport */ klasses),
  klasses_by_index: () => (/* reexport */ klasses_by_index),
  klasses_by_key: () => (/* reexport */ klasses_by_key),
  mapMaxOf: () => (/* reexport */ mapMaxOf),
  mapMinOf: () => (/* reexport */ mapMinOf),
  maxOf: () => (/* reexport */ maxOf),
  minOf: () => (/* reexport */ minOf),
  msToDMHSObject: () => (/* reexport */ msToDMHSObject),
  msToTime: () => (/* reexport */ msToTime),
  nearestMultiple: () => (/* reexport */ nearestMultiple),
  nextMultiple: () => (/* reexport */ nextMultiple),
  objToJSON: () => (/* reexport */ objToJSON),
  parseEffectFromIndex: () => (/* reexport */ parseEffectFromIndex),
  parseEffectFromName: () => (/* reexport */ parseEffectFromName),
  parseEntryFromIndex: () => (/* reexport */ parseEntryFromIndex),
  parseEntryFromKey: () => (/* reexport */ parseEntryFromKey),
  parseKlassFromIndex: () => (/* reexport */ parseKlassFromIndex),
  parseKlassFromKey: () => (/* reexport */ parseKlassFromKey),
  partition: () => (/* reexport */ partition),
  populateArray: () => (/* reexport */ populateArray),
  populatePerKlassEntry: () => (/* reexport */ populatePerKlassEntry),
  populatePerKlassIndex: () => (/* reexport */ populatePerKlassIndex),
  prepareLockConfigForLocking: () => (/* reexport */ prepareLockConfigForLocking),
  previousMultiple: () => (/* reexport */ previousMultiple),
  processCaptionEntry: () => (/* reexport */ processCaptionEntry),
  randomWeighted: () => (/* reexport */ randomWeighted),
  randomizeConfigObject: () => (/* reexport */ randomizeConfigObject),
  removeItemAll: () => (/* reexport */ removeItemAll),
  removeItemOnce: () => (/* reexport */ removeItemOnce),
  replaceHtmlEntities: () => (/* reexport */ replaceHtmlEntities),
  roughSizeOfObject: () => (/* reexport */ roughSizeOfObject),
  roundToNearest: () => (/* reexport */ roundToNearest),
  sequence: () => (/* reexport */ sequence),
  setIntColor: () => (/* reexport */ setIntColor),
  setIntColor1: () => (/* reexport */ setIntColor1),
  setIntColor2: () => (/* reexport */ setIntColor2),
  setIntColor3: () => (/* reexport */ setIntColor3),
  setIntColor4: () => (/* reexport */ setIntColor4),
  settingsContainExperimentalContent: () => (/* reexport */ settingsContainExperimentalContent),
  shape_config_keys: () => (/* reexport */ shape_config_keys),
  shuffleArray: () => (/* reexport */ shuffleArray),
  skip_config_keys: () => (/* reexport */ skip_config_keys),
  splitTextIntoLines: () => (/* reexport */ splitTextIntoLines),
  storeCaptionConfiguration: () => (/* reexport */ storeCaptionConfiguration),
  substractArray: () => (/* reexport */ substractArray),
  throttle: () => (/* reexport */ throttle),
  toHexAndAlpha: () => (/* reexport */ toHexAndAlpha),
  tryStoreCaptionConfiguration: () => (/* reexport */ tryStoreCaptionConfiguration),
  unstoreCaptionConfiguration: () => (/* reexport */ unstoreCaptionConfiguration),
  utcToLocalDate: () => (/* reexport */ utcToLocalDate),
  videoInactivityTimeoutToMs: () => (/* reexport */ videoInactivityTimeoutToMs),
  weightedRandom: () => (/* reexport */ weightedRandom)
});

// EXTERNAL MODULE: ../PuryFi-Core/context/node_modules/lz-string/libs/lz-string.js
var lz_string = __webpack_require__(42);
;// ../PuryFi-Core/context/dist/config-keys.js
var skip_config_keys = ["settings", "saved_settings", "username", "user", "password", "statistics", "saving_configuration", "statistics_enabled", "option_page_view", "remote_configuration", "debug"];
var shape_config_keys = ["blur_configuration", "bar_configuration", "pixel_configuration", "glitch_configuration", "triangle_configuration", "sticker_configuration", "sobel_configuration", "splatter_configuration"];
var config_keys_display_names = {
  active: "Extension Enabled",
  labels: "Enabled Content",
  censor_type: "Enabled Censor",
  file_types: "Enabled File Types",
  debug: "Debug",
  do_cache: "Cache",
  video_configuration: "Video",
  prescale: "Prescale",
  prefer_edited_corrections: "Prefer Edited Detections",
  bar_configuration: "Bar",
  blur_configuration: "Blur",
  pixel_configuration: "Pixel",
  glitch_configuration: "Glitch",
  triangle_configuration: "Triangle",
  box_configuration: "Box",
  sticker_configuration: "Sticker",
  sobel_configuration: "Sobel",
  splatter_configuration: "Splatter",
  mixed_configuration: "Mixed",
  random_configuration: "Random",
  gif_configuration: "GIF",
  png_configuration: "PNG",
  jpg_configuration: "JPG",
  bmp_configuration: "BMP",
  webp_configuration: "WEBP",
  avif_configuration: "AVIF",
  whiteblacklist_configuration: "Whitelist & Blacklist",
  only_once_mode_configuration: "Only Once Mode",
  clustering_configuration: "Clustering",
  caption_configuration: "Caption",
  word_wall_configuration: "Word Wall",
  reverse_mode_configuration: "Reverse Mode",
  icon_configuration: "Icon",
  base64_scanner: "Base64 Support",
  statistics_enabled: "Statistics",
  lock_configuration: "Lock",
  remote_configuration: "Remote",
  look_and_feel_configuration: "Theme",
  scan_configuration: "Scan"
};
var config_keys_display_order = ["active", "labels", "censor_type", "bar_configuration", "pixel_configuration", "blur_configuration", "triangle_configuration", "box_configuration", "glitch_configuration", "sticker_configuration", "sobel_configuration", "splatter_configuration", "random_configuration", "mixed_configuration", "clustering_configuration", "caption_configuration", "word_wall_configuration", "reverse_mode_configuration", "scan_configuration", "file_types", "png_configuration", "jpg_configuration", "bmp_configuration", "webp_configuration", "avif_configuration", "gif_configuration", "video_configuration", "only_once_mode_configuration", "lock_configuration", "whiteblacklist_configuration", "icon_configuration", "prescale", "prefer_edited_corrections", "base64_scanner", "look_and_feel_configuration", "statistics_enabled", "do_cache", "debug", "remote_configuration"];
var CAPTION_CONFIGURATION_STORAGE_QUOTA = 8192 - "caption_configuration_0".length - 2;
var CAPTION_CONFIGURATION_KEYS = ["caption_configuration_0", "caption_configuration_1"];
;// ../PuryFi-Core/context/dist/content.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var klasses = {
  FACE_FEMALE: {
    key: "FACEFEMALE",
    name: "♀ Face",
    index: 12,
    body_part_index: 0,
    nude: false,
    erotic: false
  },
  FACE_MALE: {
    key: "FACEMALE",
    name: "♂ Face",
    index: 13,
    body_part_index: 1,
    nude: false,
    erotic: false
  },
  EYE: {
    key: "EYE",
    name: "Eye",
    index: 20,
    body_part_index: 2,
    nude: false,
    erotic: false,
    experimental: true
  },
  MOUTH: {
    key: "MOUTH",
    name: "Mouth",
    index: 21,
    body_part_index: 3,
    nude: false,
    erotic: false,
    experimental: true
  },
  ARMPITS_EXPOSED: {
    key: "ARMPITSEXPOSED",
    name: "Armpit",
    index: 17,
    body_part_index: 4,
    nude: true,
    erotic: false
  },
  ARMPITS_COVERED: {
    key: "ARMPITSCOVERED",
    name: "Armpit Covered",
    index: 16,
    body_part_index: 4,
    nude: false,
    erotic: false
  },
  FEMALE_BREAST_EXPOSED: {
    key: "FEMALEBREASTEXPOSED",
    name: "♀ Breast",
    index: 4,
    body_part_index: 5,
    nude: true,
    erotic: true
  },
  FEMALE_BREAST_COVERED: {
    key: "FEMALEBREASTCOVERED",
    name: "♀ Breast Covered",
    index: 5,
    body_part_index: 5,
    nude: false,
    erotic: false
  },
  MALE_BREAST_EXPOSED: {
    key: "MALEBREASTEXPOSED",
    name: "♂ Breast",
    index: 10,
    body_part_index: 6,
    nude: true,
    erotic: false
  },
  MALE_BREAST_COVERED: {
    key: "MALEBREASTCOVERED",
    name: "♂ Breast Covered",
    index: 11,
    body_part_index: 6,
    nude: false,
    erotic: false
  },
  NIPPLE_EXPOSED: {
    key: "NIPPLEEXPOSED",
    name: "Nipple",
    index: 23,
    body_part_index: 7,
    nude: true,
    erotic: false,
    experimental: true
  },
  NIPPLE_COVERED: {
    key: "NIPPLECOVERED",
    name: "Nipple Covered",
    index: 22,
    body_part_index: 7,
    nude: false,
    erotic: false,
    experimental: true
  },
  BELLY_EXPOSED: {
    key: "BELLYEXPOSED",
    name: "Tummy",
    index: 0,
    body_part_index: 8,
    nude: true,
    erotic: false
  },
  BELLY_COVERED: {
    key: "BELLYCOVERED",
    name: "Tummy Covered",
    index: 1,
    body_part_index: 8,
    nude: false,
    erotic: false
  },
  HAND_EXPOSED: {
    key: "HANDEXPOSED",
    name: "Hand",
    index: 25,
    body_part_index: 9,
    nude: true,
    erotic: false,
    experimental: true
  },
  HAND_COVERED: {
    key: "HANDCOVERED",
    name: "Hand Covered",
    index: 24,
    body_part_index: 9,
    nude: false,
    erotic: false,
    experimental: true
  },
  BUTTOCKS_EXPOSED: {
    key: "BUTTOCKSEXPOSED",
    name: "Buttocks",
    index: 2,
    body_part_index: 10,
    nude: true,
    erotic: false
  },
  BUTTOCKS_COVERED: {
    key: "BUTTOCKSCOVERED",
    name: "Buttocks Covered",
    index: 3,
    body_part_index: 10,
    nude: false,
    erotic: false
  },
  ANUS_EXPOSED: {
    key: "ANUSEXPOSED",
    name: "Anus",
    index: 19,
    body_part_index: 11,
    nude: true,
    erotic: true
  },
  ANUS_COVERED: {
    key: "ANUSCOVERED",
    name: "Anus Covered",
    index: 18,
    body_part_index: 11,
    nude: true,
    erotic: false
  },
  FEMALE_GENITALIA_EXPOSED: {
    key: "FEMALEGENITALIAEXPOSED",
    name: "♀ Genitals",
    index: 6,
    body_part_index: 12,
    nude: true,
    erotic: true
  },
  FEMALE_GENITALIA_COVERED: {
    key: "FEMALEGENITALIACOVERED",
    name: "♀ Genitals Covered",
    index: 7,
    body_part_index: 12,
    nude: false,
    erotic: false
  },
  MALE_GENITALIA_EXPOSED: {
    key: "MALEGENITALIAEXPOSED",
    name: "♂ Genitals",
    index: 9,
    body_part_index: 13,
    nude: true,
    erotic: true
  },
  MALE_GENITALIA_COVERED: {
    key: "MALEGENITALIACOVERED",
    name: "♂ Genitals Covered",
    index: 8,
    body_part_index: 13,
    nude: false,
    erotic: false
  },
  FEET_EXPOSED: {
    key: "FEETEXPOSED",
    name: "Foot",
    index: 15,
    body_part_index: 14,
    nude: true,
    erotic: false
  },
  FEET_COVERED: {
    key: "FEETCOVERED",
    name: "Foot Covered",
    index: 14,
    body_part_index: 14,
    nude: false,
    erotic: false
  },
  NONE: {
    key: null,
    name: "Invalid",
    index: -1,
    body_part_index: -1,
    nude: false,
    erotic: false
  }
};
var klasses_by_index = _defineProperty({
  0: klasses.BELLY_EXPOSED,
  1: klasses.BELLY_COVERED,
  2: klasses.BUTTOCKS_EXPOSED,
  3: klasses.BUTTOCKS_COVERED,
  4: klasses.FEMALE_BREAST_EXPOSED,
  5: klasses.FEMALE_BREAST_COVERED,
  6: klasses.FEMALE_GENITALIA_EXPOSED,
  7: klasses.FEMALE_GENITALIA_COVERED,
  8: klasses.MALE_GENITALIA_COVERED,
  9: klasses.MALE_GENITALIA_EXPOSED,
  10: klasses.MALE_BREAST_EXPOSED,
  11: klasses.MALE_BREAST_COVERED,
  12: klasses.FACE_FEMALE,
  13: klasses.FACE_MALE,
  14: klasses.FEET_COVERED,
  15: klasses.FEET_EXPOSED,
  16: klasses.ARMPITS_COVERED,
  17: klasses.ARMPITS_EXPOSED,
  18: klasses.ANUS_COVERED,
  19: klasses.ANUS_EXPOSED,
  20: klasses.EYE,
  21: klasses.MOUTH,
  22: klasses.NIPPLE_COVERED,
  23: klasses.NIPPLE_EXPOSED,
  24: klasses.HAND_COVERED,
  25: klasses.HAND_EXPOSED
}, -1, klasses.NONE);
var klasses_by_key = {
  FACEFEMALE: klasses.FACE_FEMALE,
  FACEMALE: klasses.FACE_MALE,
  EYE: klasses.EYE,
  MOUTH: klasses.MOUTH,
  ARMPITSCOVERED: klasses.ARMPITS_COVERED,
  ARMPITSEXPOSED: klasses.ARMPITS_EXPOSED,
  FEMALEBREASTCOVERED: klasses.FEMALE_BREAST_COVERED,
  FEMALEBREASTEXPOSED: klasses.FEMALE_BREAST_EXPOSED,
  MALEBREASTCOVERED: klasses.MALE_BREAST_COVERED,
  MALEBREASTEXPOSED: klasses.MALE_BREAST_EXPOSED,
  NIPPLECOVERED: klasses.NIPPLE_COVERED,
  NIPPLEEXPOSED: klasses.NIPPLE_EXPOSED,
  BELLYCOVERED: klasses.BELLY_COVERED,
  BELLYEXPOSED: klasses.BELLY_EXPOSED,
  HANDCOVERED: klasses.HAND_COVERED,
  HANDEXPOSED: klasses.HAND_EXPOSED,
  BUTTOCKSCOVERED: klasses.BUTTOCKS_COVERED,
  BUTTOCKSEXPOSED: klasses.BUTTOCKS_EXPOSED,
  ANUSCOVERED: klasses.ANUS_COVERED,
  ANUSEXPOSED: klasses.ANUS_EXPOSED,
  FEMALEGENITALIACOVERED: klasses.FEMALE_GENITALIA_COVERED,
  FEMALEGENITALIAEXPOSED: klasses.FEMALE_GENITALIA_EXPOSED,
  MALEGENITALIACOVERED: klasses.MALE_GENITALIA_COVERED,
  MALEGENITALIAEXPOSED: klasses.MALE_GENITALIA_EXPOSED,
  FEETCOVERED: klasses.FEET_COVERED,
  FEETEXPOSED: klasses.FEET_EXPOSED
};
var ALL_LABELS_COUNT = 26;
var ALL_NON_EXPERIMENTAL_LABELS_COUNT = 20;
function parseKlassFromIndex(index) {
  for (var entry in klasses) {
    var klass = klasses[entry];
    if (klass.index === index) {
      return klass;
    }
  }
  console.error("Returning empty klass!", index);
  return klasses.NONE;
}
function parseKlassFromKey(key) {
  for (var entry in klasses) {
    var klass = klasses[entry];
    if (klass.key === key) {
      return klass;
    }
  }
  console.error("Returning empty klass!", key);
  return klasses.NONE;
}
function parseEntryFromIndex(index) {
  for (var entry in klasses) {
    var klass = klasses[entry];
    if (klass.index === index) {
      return entry;
    }
  }
  console.error("Returning empty klass!", index);
  return "NONE";
}
function parseEntryFromKey(key) {
  for (var entry in klasses) {
    var klass = klasses[entry];
    if (klass.key === key) {
      return entry;
    }
  }
  console.error("Returning empty klass!", key);
  return "NONE";
}
function populatePerKlassIndex(fn) {
  var out = {};
  for (var i = 0; i < ALL_LABELS_COUNT; i++) {
    out[i] = fn();
  }
  return out;
}
function populatePerKlassEntry(fn) {
  var out = {};
  for (var entry in klasses) {
    if (klasses[entry].index !== -1) {
      out[entry] = fn();
    }
  }
  return out;
}
;// ../PuryFi-Core/context/dist/effects.js
var EffectIndex;
(function (EffectIndex) {
  EffectIndex[EffectIndex["NONE"] = 0] = "NONE";
  EffectIndex[EffectIndex["PIXEL"] = 1] = "PIXEL";
  EffectIndex[EffectIndex["BLUR"] = 2] = "BLUR";
  EffectIndex[EffectIndex["BAR"] = 3] = "BAR";
  EffectIndex[EffectIndex["TRIANGLE"] = 4] = "TRIANGLE";
  EffectIndex[EffectIndex["BOX"] = 5] = "BOX";
  EffectIndex[EffectIndex["GLITCH"] = 6] = "GLITCH";
  EffectIndex[EffectIndex["STICKER"] = 7] = "STICKER";
  EffectIndex[EffectIndex["SOBEL"] = 8] = "SOBEL";
  EffectIndex[EffectIndex["SPLATTER"] = 9] = "SPLATTER";
  EffectIndex[EffectIndex["MIXED"] = 10] = "MIXED";
  EffectIndex[EffectIndex["RANDOM"] = 11] = "RANDOM";
})(EffectIndex || (EffectIndex = {}));
var effects = {
  NONE: {
    name: "normal",
    index: EffectIndex.NONE,
    config_key: null
  },
  PIXEL: {
    name: "pixel",
    index: EffectIndex.PIXEL,
    config_key: "pixel_configuration"
  },
  BLUR: {
    name: "blur",
    index: EffectIndex.BLUR,
    config_key: "blur_configuration"
  },
  BAR: {
    name: "black",
    index: EffectIndex.BAR,
    config_key: "bar_configuration"
  },
  TRIANGLE: {
    name: "triangle",
    index: EffectIndex.TRIANGLE,
    config_key: "triangle_configuration"
  },
  BOX: {
    name: "box",
    index: EffectIndex.BOX,
    config_key: "box_configuration"
  },
  GLITCH: {
    name: "glitch",
    index: EffectIndex.GLITCH,
    config_key: "glitch_configuration"
  },
  STICKER: {
    name: "sticker",
    index: EffectIndex.STICKER,
    config_key: "sticker_configuration"
  },
  SOBEL: {
    name: "sobel",
    index: EffectIndex.SOBEL,
    config_key: "sobel_configuration"
  },
  SPLATTER: {
    name: "splatter",
    index: EffectIndex.SPLATTER,
    config_key: "splatter_configuration"
  },
  MIXED: {
    name: "mixed",
    index: EffectIndex.MIXED,
    config_key: "mixed_configuration"
  },
  RANDOM: {
    name: "random",
    index: EffectIndex.RANDOM,
    config_key: "random_configuration"
  }
};
var effects_by_index = {
  0: effects.NONE,
  1: effects.PIXEL,
  2: effects.BLUR,
  3: effects.BAR,
  4: effects.TRIANGLE,
  5: effects.BOX,
  6: effects.GLITCH,
  7: effects.STICKER,
  8: effects.SOBEL,
  9: effects.SPLATTER,
  10: effects.MIXED,
  11: effects.RANDOM
};
function parseEffectFromName(effect_string) {
  for (var entry in effects) {
    var effect = effects[entry];
    if (effect.name === effect_string) {
      return effect;
    }
  }
  console.error("Returning empty effect!", effect_string);
  return effects.NONE;
}
function parseEffectFromIndex(index) {
  for (var entry in effects) {
    var effect = effects[entry];
    if (effect.index === index) {
      return effect;
    }
  }
  console.error("Returning empty effect!", index);
  return effects.NONE;
}
;// ../PuryFi-Core/context/dist/util.js
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function util_typeof(o) { "@babel/helpers - typeof"; return util_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, util_typeof(o); }
function populateArray(len, func, arr) {
  arr = arr !== null && arr !== void 0 ? arr : new Array(len);
  for (var i = 0; i < len; i++) {
    arr[i] = func();
  }
  return arr;
}
function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}
function roundToNearest(val, a, b) {
  return Math.abs(val - a) < Math.abs(val - b) ? a : b;
}
function nearestMultiple(val, other) {
  return Math.round(val / other) * other;
}
function previousMultiple(val, other) {
  return Math.floor(val / other) * other;
}
function nextMultiple(val, other) {
  return Math.ceil(val / other) * other;
}
function fix(val) {
  return parseFloat(val.toFixed(7));
}
function countDecimals(val) {
  var _a;
  return ((_a = val.match(/(?<=\.)[0-9]+$/)) === null || _a === void 0 ? void 0 : _a[0].length) || 0;
}
function roughSizeOfObject(object) {
  var objectList = [];
  var stack = [object];
  var bytes = 0;
  while (stack.length) {
    var value = stack.pop();
    if (typeof value === "boolean") {
      bytes += 4;
    } else if (typeof value === "string") {
      bytes += value.length * 2;
    } else if (typeof value === "number") {
      bytes += 8;
    } else if (util_typeof(value) === "object" && objectList.indexOf(value) === -1) {
      objectList.push(value);
      for (var i in value) {
        stack.push(value[i]);
      }
    }
  }
  return bytes;
}
var FontDetector = function FontDetector() {
  var baseFonts = ["monospace", "sans-serif", "serif"];
  var testString = "mmmmmmmmmmlli";
  var testSize = "72px";
  var h = document.getElementsByTagName("body")[0];
  var s = document.createElement("span");
  s.style.fontSize = testSize;
  s.innerHTML = testString;
  var defaultWidth = {};
  var defaultHeight = {};
  for (var index in baseFonts) {
    s.style.fontFamily = baseFonts[index];
    h.appendChild(s);
    defaultWidth[baseFonts[index]] = s.offsetWidth;
    defaultHeight[baseFonts[index]] = s.offsetHeight;
    h.removeChild(s);
  }
  function detect(font) {
    var detected = false;
    for (var _index in baseFonts) {
      s.style.fontFamily = font + "," + baseFonts[_index];
      h.appendChild(s);
      var matched = s.offsetWidth !== defaultWidth[baseFonts[_index]] || s.offsetHeight !== defaultHeight[baseFonts[_index]];
      h.removeChild(s);
      detected = detected || matched;
    }
    return detected;
  }
  this.detect = detect;
};
function formatBytes(bytes) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  if (bytes === 0) return "0 Bytes";
  var k = 1024;
  var dm = decimals < 0 ? 0 : decimals;
  var sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
function msToTime(ms) {
  var seconds = (ms / 1000).toFixed(1);
  var minutes = (ms / (1000 * 60)).toFixed(1);
  var hours = (ms / (1000 * 60 * 60)).toFixed(1);
  var days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
  if (parseInt(seconds) < 60) return seconds + " Sec";else if (parseInt(minutes) < 60) return minutes + " Min";else if (parseInt(hours) < 24) return hours + " Hrs";else return days + " Days";
}
function msToDMHSObject(ms) {
  var days = Math.floor(ms / (1000 * 60 * 60 * 24));
  var hours = Math.floor(ms % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
  var minutes = Math.floor(ms % (1000 * 60 * 60) / (1000 * 60));
  var seconds = Math.floor(ms % (1000 * 60) / 1000);
  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}
function downloadBlob(blob) {
  var ext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var blobUrl = URL.createObjectURL(blob);
  var link = document.createElement("a");
  link.href = blobUrl;
  if (name) {
    link.download = name + "." + ext;
  } else {
    link.download = blobUrl.substring(blobUrl.length - 12) + "." + ext;
  }
  document.body.appendChild(link);
  link.dispatchEvent(new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window
  }));
  document.body.removeChild(link);
  delay(5000).then(function () {
    URL.revokeObjectURL(blobUrl);
  });
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function delay(time) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, time);
  });
}
function objToJSON(filename, dataObjToWrite) {
  var blob = new Blob([JSON.stringify(dataObjToWrite)], {
    type: "text/json"
  });
  var link = document.createElement("a");
  link.download = filename;
  link.href = window.URL.createObjectURL(blob);
  link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");
  var evt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true
  });
  link.dispatchEvent(evt);
  link.remove();
}
function removeItemAll(arr, value) {
  var i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
}
function bytesToSize(bytes) {
  bytes = parseInt(bytes);
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Byte";
  var i = Math.floor(Math.log(bytes) / Math.log(1000));
  return bytes / Math.pow(1000, i) + " " + sizes[i];
}
function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
function compareVersions(a_components, b_components) {
  if (a_components === b_components) {
    return 0;
  }
  var partsNumberA = a_components.replace("v", "").split(".");
  var partsNumberB = b_components.replace("v", "").split(".");
  for (var i = 0; i < partsNumberA.length; i++) {
    var valueA = parseInt(partsNumberA[i]);
    var valueB = parseInt(partsNumberB[i]);
    if (valueA > valueB || isNaN(valueB)) {
      return 1;
    }
    if (valueA < valueB) {
      return -1;
    }
  }
}
function utcToLocalDate(utcTimestampString) {
  var utcDate = new Date(utcTimestampString);
  var utcTimestamp = utcDate.getTime();
  var timezoneOffsetMinutes = new Date().getTimezoneOffset();
  var adjustedTimestamp = utcTimestamp - timezoneOffsetMinutes * 60 * 1000;
  var localDate = new Date(adjustedTimestamp);
  return localDate;
}
function crypt(salt, text) {
  var textToChars = function textToChars(text) {
    return text.split("").map(function (c) {
      return c.charCodeAt(0);
    });
  };
  var byteHex = function byteHex(n) {
    return ("0" + Number(n).toString(16)).substr(-2);
  };
  var applySaltToChar = function applySaltToChar(code) {
    return textToChars(salt).reduce(function (a, b) {
      return a ^ b;
    }, code);
  };
  return text.split("").map(textToChars).map(applySaltToChar).map(byteHex).join("");
}
function decrypt(salt, encoded) {
  var textToChars = function textToChars(text) {
    return text.split("").map(function (c) {
      return c.charCodeAt(0);
    });
  };
  var applySaltToChar = function applySaltToChar(code) {
    return textToChars(salt).reduce(function (a, b) {
      return a ^ b;
    }, code);
  };
  return encoded.match(/.{1,2}/g).map(function (hex) {
    return parseInt(hex, 16);
  }).map(applySaltToChar).map(function (charCode) {
    return String.fromCharCode(charCode);
  }).join("");
}
function checkWhiteBlacklist(whiteblacklist_configuration, url, origin_url) {
  if (url.match(/^https:\/\/pury\.fi/)) return false;
  if (origin_url === null || origin_url === void 0 ? void 0 : origin_url.match(/^https:\/\/mega\.nz/)) return false;
  if (whiteblacklist_configuration.mode == 0) {
    var _iterator = _createForOfIteratorHelper(whiteblacklist_configuration.white_list),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var entry = _step.value;
        if (entry.mode === 0) {
          if (url.includes(entry.value) || (origin_url === null || origin_url === void 0 ? void 0 : origin_url.includes(entry.value))) {
            return false;
          }
        } else {
          var reg = new RegExp(entry.value);
          if (reg.test(url) || origin_url && reg.test(origin_url)) {
            return false;
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return true;
  } else {
    var _iterator2 = _createForOfIteratorHelper(whiteblacklist_configuration.black_list),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _entry = _step2.value;
        if (_entry.mode === 0) {
          if (url.includes(_entry.value) || (origin_url === null || origin_url === void 0 ? void 0 : origin_url.includes(_entry.value))) {
            return true;
          }
        } else {
          var _reg = new RegExp(_entry.value);
          if (_reg.test(url) || origin_url && _reg.test(origin_url)) {
            return true;
          }
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return false;
  }
}
function getNameFromURL(url) {
  var isLocalFile = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var name = url.split("/").pop();
  if (!isLocalFile) {
    name = name.split("?")[0];
  }
  return name;
}
function hashFnv32a(str, asString, seed) {
  var i,
    l,
    hval = seed === undefined ? 0x811c9dc5 : seed;
  for (i = 0, l = str.length; i < l; i++) {
    hval ^= str.charCodeAt(i);
    hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
  }
  if (asString) {
    return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
  }
  return hval >>> 0;
}
if (!Object.hasOwnProperty("groupBy")) {
  Object.groupBy = function (items, callbackFn) {
    return items.reduce(function (acc, item, i) {
      var key = callbackFn(item, i);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
  };
}
function escapeQuotes(str) {
  var special_chars = /['"\\]/g;
  return str.replace(special_chars, "\\$&");
}
function escapeRegSpecialChars(str) {
  var special_chars = /[.*+?^${}()|[\]\\/]/g;
  return str.replace(special_chars, "\\$&");
}
function replaceHtmlEntities(str) {
  var entities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    " ": "&nbsp;"
  };
  return str.replace(/[&<>"' ]/g, function (_char) {
    return entities[_char];
  });
}
function substractArray(a, b) {
  var cmp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  b = _toConsumableArray(b);
  var _loop = function _loop(_i) {
    var j = a.findIndex(function (x) {
      return cmp ? cmp(x, b[_i]) : x === b[_i];
    });
    if (j >= 0) {
      a.splice(j, 1);
      b.splice(_i, 1);
      _i--;
    }
    i = _i;
  };
  for (var i = 0; i < b.length; i++) {
    _loop(i);
  }
  return a;
}
function keepArray(a, b) {
  var cmp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  b = _toConsumableArray(b);
  var _loop2 = function _loop2(_i2) {
    var j = b.findIndex(function (x) {
      return cmp ? cmp(a[_i2], x) : a[_i2] === x;
    });
    if (j < 0) {
      a.splice(_i2, 1);
      b.splice(j, 1);
      _i2--;
    }
    i = _i2;
  };
  for (var i = 0; i < a.length; i++) {
    _loop2(i);
  }
  return a;
}
function keepKeys(obj, cmp) {
  for (var key in obj) {
    if (!cmp(obj[key], key)) {
      delete obj[key];
    }
  }
  return obj;
}
function areArraysEqual(a, b) {
  var cmp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return a.length === b.length && a.every(function (v, i) {
    return cmp ? cmp(v, b[i]) : v === b[i];
  });
}
function mapMaxOf(arr) {
  var get = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return arr.reduce(function (acc, val, i) {
    return Math.max(acc, get ? get(val, i) : val);
  }, -Infinity);
}
function mapMinOf(arr) {
  var get = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return arr.reduce(function (acc, val, i) {
    return Math.min(acc, get ? get(val, i) : val);
  }, Infinity);
}
function maxOf(arr) {
  var get = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var item = undefined;
  var max = -Infinity;
  for (var i = 0; i < arr.length; i++) {
    var val = get ? get(arr[i], i) : arr[i];
    if (val > max) {
      max = val;
      item = arr[i];
    }
  }
  return item;
}
function minOf(arr) {
  var get = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var item = undefined;
  var min = Infinity;
  for (var i = 0; i < arr.length; i++) {
    var val = get ? get(arr[i], i) : arr[i];
    if (val < min) {
      min = val;
      item = arr[i];
    }
  }
  return item;
}
function indexOfMaxOf(arr) {
  var get = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var index = -1;
  var max = -Infinity;
  for (var i = 0; i < arr.length; i++) {
    var val = get ? get(arr[i], i) : arr[i];
    if (val > max) {
      max = val;
      index = i;
    }
  }
  return index;
}
function indexOfMinOf(arr) {
  var get = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var index = -1;
  var min = Infinity;
  for (var i = 0; i < arr.length; i++) {
    var val = get ? get(arr[i], i) : arr[i];
    if (val < min) {
      min = val;
      index = i;
    }
  }
  return index;
}
function shuffleArray(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [arr[j], arr[i]];
    arr[i] = _ref[0];
    arr[j] = _ref[1];
  }
}
function splitTextIntoLines(text_width, words, word_widths, space_width, line_count) {
  var lines = new Array(line_count);
  var line_widths = new Array(line_count);
  var rem_text_width = text_width - (line_count - 1) * space_width;
  for (var i = line_count - 1; i > 0; i--) {
    var split = rem_text_width / (i + 1);
    var acc = word_widths[word_widths.length - 1];
    var closest_space_idx = word_widths.length - 1;
    var closest_space_dist = Math.abs(acc - split);
    for (var j = word_widths.length - 2; j >= i; j--) {
      acc += space_width + word_widths[j];
      var dist = Math.abs(acc - split);
      if (dist < closest_space_dist) {
        closest_space_dist = dist;
        closest_space_idx = j;
      }
    }
    line_widths[i] = word_widths[closest_space_idx];
    lines[i] = words[closest_space_idx];
    for (var _j = closest_space_idx + 1; _j < words.length; _j++) {
      lines[i] += " " + words[_j];
      line_widths[i] += space_width + word_widths[_j];
    }
    rem_text_width -= line_widths[i];
    words = words.slice(0, closest_space_idx);
    word_widths = word_widths.slice(0, closest_space_idx);
  }
  line_widths[0] = word_widths[0];
  lines[0] = words[0];
  for (var _j2 = 1; _j2 < words.length; _j2++) {
    lines[0] += " " + words[_j2];
    line_widths[0] += space_width + word_widths[_j2];
  }
  return [lines, line_widths];
}
function intersects(a, b) {
  return a.some(function (x) {
    return b.includes(x);
  });
}
function findMap(arr, func) {
  for (var i = 0; i < arr.length; i++) {
    var val = func(arr[i], i, arr);
    if (val !== undefined) return val;
  }
  return null;
}
function throttle(func, wait, onUnthrottle) {
  var isInThrottle;
  return function () {
    var args = arguments;
    var context = this;
    if (!isInThrottle) {
      func.apply(context, args);
      isInThrottle = true;
      setTimeout(function () {
        isInThrottle = false;
        onUnthrottle === null || onUnthrottle === void 0 ? void 0 : onUnthrottle.apply(context, args);
      }, wait);
    }
  };
}
function sequence(count) {
  var out = new Array(count);
  for (var i = 0; i < count; i++) {
    out[i] = i;
  }
  return out;
}
function isWeekAroundEaster() {
  function calculateEaster(year) {
    var a = year % 19;
    var b = Math.floor(year / 100);
    var c = year % 100;
    var d = Math.floor(b / 4);
    var e = b % 4;
    var f = Math.floor((b + 8) / 25);
    var g = Math.floor((b - f + 1) / 3);
    var h = (19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4);
    var k = c % 4;
    var l = (32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);
    var month = Math.floor((h + l - 7 * m + 114) / 31);
    var day = (h + l - 7 * m + 114) % 31 + 1;
    return new Date(year, month - 1, day);
  }
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var easterDate = calculateEaster(year);
  var startDate = new Date(easterDate);
  startDate.setDate(easterDate.getDate() - 3);
  var endDate = new Date(easterDate);
  endDate.setDate(easterDate.getDate() + 3);
  return currentDate >= startDate && currentDate <= endDate;
}
function isLastTwoWeeksOfYear() {
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var lastDayOfYear = new Date(year, 11, 31);
  var twoWeeksBeforeEndOfYear = new Date(lastDayOfYear);
  twoWeeksBeforeEndOfYear.setDate(lastDayOfYear.getDate() - 13);
  return currentDate >= twoWeeksBeforeEndOfYear && currentDate <= lastDayOfYear;
}
function isArray(value) {
  return value && util_typeof(value) === "object" && value.constructor === Array;
}
function isObject(value) {
  return value && util_typeof(value) === "object" && value.constructor === Object;
}
function isString(value) {
  return typeof value === "string" || value instanceof String;
}
function isBoolean(value) {
  return typeof value === "boolean";
}
function isNumber(value) {
  return typeof value === "number" && isFinite(value);
}
function weightedRandom(min, max, average) {
  if (!average) {
    return Math.random() * (max - min) + min;
  }
  var range = max - min;
  var weightedRange = range * 0.6;
  var randomValue = Math.random() * weightedRange + average - weightedRange / 2;
  return Math.min(Math.max(randomValue, min), max);
}
function partition(obj, rule) {
  var out = [[], []];
  for (var key in obj) {
    if (rule(obj[key], key)) {
      out[0].push(obj[key]);
    } else {
      out[1].push(obj[key]);
    }
  }
  return out;
}
function randomWeighted(weights) {
  var total_weight = Object.values(weights).reduce(function (weight_sum, weight) {
    return weight_sum + weight;
  }, 0);
  var random_value = Math.random() * total_weight;
  var curr_weight_sum = 0;
  for (var _i3 = 0, _Object$entries = Object.entries(weights); _i3 < _Object$entries.length; _i3++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i3], 2),
      index = _Object$entries$_i[0],
      weight = _Object$entries$_i[1];
    curr_weight_sum += weight;
    if (random_value <= curr_weight_sum) {
      return parseInt(index);
    }
  }
  return 0;
}
;// ../PuryFi-Core/context/dist/config.js
function config_typeof(o) { "@babel/helpers - typeof"; return config_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, config_typeof(o); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == config_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, config_toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function config_toPropertyKey(t) { var i = config_toPrimitive(t, "string"); return "symbol" == config_typeof(i) ? i : i + ""; }
function config_toPrimitive(t, r) { if ("object" != config_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != config_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function config_slicedToArray(r, e) { return config_arrayWithHoles(r) || config_iterableToArrayLimit(r, e) || config_unsupportedIterableToArray(r, e) || config_nonIterableRest(); }
function config_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function config_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function config_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function config_createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = config_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function config_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return config_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? config_arrayLikeToArray(r, a) : void 0; } }
function config_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }




var MAX_CENSOR_PRESETS = 4;
function getSelectedPreset(config) {
  return config.presets[config.selectedPresetIndex];
}
function getPresetWithFallback(config, index) {
  var _a;
  return (_a = config.presets[index]) !== null && _a !== void 0 ? _a : config.presets[0];
}
function settingsContainExperimentalContent(settings) {
  var labels = settings.labels,
    mixed_configuration = settings.mixed_configuration,
    only_once_mode_configuration = settings.only_once_mode_configuration,
    lock_configuration = settings.lock_configuration;
  return labels != null && labels.some(function (label) {
    return ["EYE", "MOUTH", "NIPPLECOVERED", "NIPPLEEXPOSED", "HANDCOVERED", "HANDEXPOSED"].includes(label);
  }) || mixed_configuration != null && mixed_configuration.presets.some(function (preset) {
    if (preset == null) return false;
    if (preset.config.censor_types[20].some(function (type) {
      return type != null;
    }) || preset.config.censor_types[21].some(function (type) {
      return type != null;
    }) || preset.config.censor_types[22].some(function (type) {
      return type != null;
    }) || preset.config.censor_types[23].some(function (type) {
      return type != null;
    }) || preset.config.censor_types[24].some(function (type) {
      return type != null;
    }) || preset.config.censor_types[25].some(function (type) {
      return type != null;
    })) {
      return true;
    }
  }) || only_once_mode_configuration != null && only_once_mode_configuration.trigger.some(function (trigger) {
    return [20, 21, 22, 23, 24, 25].includes(trigger);
  }) || lock_configuration != null && (lock_configuration.timer_plus_data["EYE"] !== 0 || lock_configuration.timer_plus_data["MOUTH"] !== 0 || lock_configuration.timer_plus_data["NIPPLE_COVERED"] !== 0 || lock_configuration.timer_plus_data["NIPPLE_EXPOSED"] !== 0 || lock_configuration.timer_plus_data["HAND_COVERED"] !== 0 || lock_configuration.timer_plus_data["HAND_EXPOSED"] !== 0);
}
function disableMissingPatreonFeatures(settings, user) {
  if (!user || user.permissions.permission_shape_heart > user.patreon_tier) {
    for (var _i = 0, _arr = [settings.bar_configuration, settings.blur_configuration, settings.pixel_configuration, settings.triangle_configuration, settings.sobel_configuration]; _i < _arr.length; _i++) {
      var censor_config = _arr[_i];
      if (censor_config == null) continue;
      var _iterator = config_createForOfIteratorHelper(censor_config.presets),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var preset = _step.value;
          if (preset != null) {
            if (preset.config.shape === 3) {
              preset.config.shape = CensorShape.RECTANGLE;
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }
  if (!user || user.permissions.permission_reverse_censoring > user.patreon_tier) {
    if (settings.reverse_mode_configuration) {
      settings.reverse_mode_configuration.enabled = false;
    }
  }
  if (!user || user.permissions.permission_only_once_mode > user.patreon_tier) {
    if (settings.only_once_mode_configuration) {
      settings.only_once_mode_configuration.enabled = false;
    }
  }
  if (!user || user.permissions.permission_file_type_gif > user.patreon_tier) {
    if (settings.gif_configuration) {
      settings.gif_configuration._thumbnails = true;
    }
  }
  return settings;
}
function processCaptionEntry(entry, ctx, metrics, font_height, line_height) {
  var value = entry.value,
    tags = entry.tags,
    onContent = entry.onContent,
    chance = entry.chance;
  var values = value.split(" ");
  var spread_out_entry = null;
  if (2 <= values.length) {
    spread_out_entry = {
      values: [],
      on_content: onContent
    };
    var _iterator2 = config_createForOfIteratorHelper(values),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _value = _step2.value;
        var section_metrics = ctx.measureText(_value);
        var section_width = section_metrics.actualBoundingBoxLeft + section_metrics.actualBoundingBoxRight;
        var section_x_offset = (section_metrics.actualBoundingBoxRight - section_metrics.actualBoundingBoxLeft) / 2;
        var extra_height = Math.max(Math.floor(section_metrics.actualBoundingBoxAscent) - metrics.actualBoundingBoxAscent, Math.ceil(section_metrics.actualBoundingBoxDescent) - metrics.actualBoundingBoxDescent, 0) * 2;
        spread_out_entry.values.push({
          lines: [_value],
          width: section_width,
          x_offset: section_x_offset,
          aspect_ratio: section_width / (font_height + extra_height)
        });
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
  var text_metrics = ctx.measureText(value);
  var text_width = text_metrics.actualBoundingBoxLeft + text_metrics.actualBoundingBoxRight;
  var text_x_offset = (text_metrics.actualBoundingBoxRight - text_metrics.actualBoundingBoxLeft) / 2;
  var text_extra_height = Math.max(Math.floor(text_metrics.actualBoundingBoxAscent) - metrics.actualBoundingBoxAscent, Math.ceil(text_metrics.actualBoundingBoxDescent) - metrics.actualBoundingBoxDescent, 0) * 2;
  var single_entry = {
    values: [{
      lines: [value],
      width: text_width,
      x_offset: text_x_offset,
      aspect_ratio: text_width / (font_height + text_extra_height)
    }],
    on_content: onContent
  };
  var words = value.split(" ");
  var word_widths = words.map(function (word) {
    var metrics = ctx.measureText(word);
    return metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
  });
  var space_width = ctx.measureText(" ").width;
  for (var i = 2; i <= Math.min(5, words.length); i++) {
    var _splitTextIntoLines = splitTextIntoLines(text_width, words, word_widths, space_width, i),
      _splitTextIntoLines2 = config_slicedToArray(_splitTextIntoLines, 2),
      lines = _splitTextIntoLines2[0],
      line_widths = _splitTextIntoLines2[1];
    var line_i = indexOfMaxOf(line_widths);
    var widest_line = lines[line_i];
    var widest_line_metrics = ctx.measureText(widest_line);
    var width = widest_line_metrics.actualBoundingBoxLeft + widest_line_metrics.actualBoundingBoxRight;
    var x_offset = (widest_line_metrics.actualBoundingBoxRight - widest_line_metrics.actualBoundingBoxLeft) / 2;
    var first_line_metrics = ctx.measureText(lines[0]);
    var last_line_metrics = ctx.measureText(lines[lines.length - 1]);
    var value_extra_height = Math.max(Math.floor(first_line_metrics.actualBoundingBoxAscent) - metrics.actualBoundingBoxAscent, Math.ceil(last_line_metrics.actualBoundingBoxDescent) - metrics.actualBoundingBoxDescent, 0) * 2;
    single_entry.values.push({
      lines: lines,
      width: width,
      x_offset: x_offset,
      aspect_ratio: width / (line_height * (i - 1) + font_height + value_extra_height)
    });
  }
  return {
    single_entry: single_entry,
    spread_out_entry: spread_out_entry
  };
}
function collectMixedEntries(config, cache) {
  var _a;
  var censorConfigsByTy = getCensorConfigsByType(config);
  cache.mixed_cache = {};
  for (var presetI = 0; presetI < MAX_CENSOR_PRESETS; presetI++) {
    var mixedPresetConfig = (_a = config.mixed_configuration.presets[presetI]) === null || _a === void 0 ? void 0 : _a.config;
    if (mixedPresetConfig == null) continue;
    var mixedCache = {};
    cache.mixed_cache[presetI] = mixedCache;
    mixedCache.mixed_reverse_entries = new Array(MIXED_CENSOR_LAYERS_COUNT);
    if (config.reverse_mode_configuration.enabled) {
      for (var layer = 0; layer < MIXED_CENSOR_LAYERS_COUNT; layer++) {
        var reverseCensorTy = mixedPresetConfig.reverse_censor_types[layer];
        if (reverseCensorTy == null || reverseCensorTy === effects.NONE.index) continue;
        var reverseCensorPresetI = mixedPresetConfig.reverse_censor_preset_indexes[layer];
        if (reverseCensorTy === effects.RANDOM.index) {
          mixedCache.has_mixed_random_to_resolve = true;
        }
        if (censorConfigsByTy[reverseCensorTy].presets[reverseCensorPresetI] == null) {
          reverseCensorPresetI = 0;
        }
        mixedCache.mixed_reverse_entries[layer] = {
          censor_type: reverseCensorTy,
          preset_ident: reverseCensorPresetI
        };
      }
    }
    mixedCache.active_normal_censors_count_per_layer_pre_solving_random = new Array(MIXED_CENSOR_LAYERS_COUNT).fill(0);
    mixedCache.active_censors_count_per_layer_pre_solving_random = new Array(MIXED_CENSOR_LAYERS_COUNT).fill(0);
    mixedCache.mixed_entries = new Array(MIXED_CENSOR_LAYERS_COUNT);
    for (var _layer = 0; _layer < MIXED_CENSOR_LAYERS_COUNT; _layer++) {
      mixedCache.mixed_entries[_layer] = new Array(ALL_LABELS_COUNT);
      for (var key in klasses) {
        var clsI = klasses[key].index;
        if (clsI === -1) continue;
        var censorTy = mixedPresetConfig.censor_types[clsI][_layer];
        if (censorTy == null) continue;
        var censorPresetI = mixedPresetConfig.censor_preset_indexes[clsI][_layer];
        if (censorTy === effects.RANDOM.index) {
          mixedCache.has_mixed_random_to_resolve = true;
        }
        if (censorTy === effects.NONE.index) {
          if (mixedCache.mixed_reverse_entries[_layer] == null) continue;
          mixedCache.active_normal_censors_count_per_layer_pre_solving_random[_layer]++;
          mixedCache.mixed_entries[_layer][clsI] = {
            censor_type: censorTy,
            preset_ident: mixedCache.mixed_reverse_entries[_layer].preset_ident
          };
        } else {
          mixedCache.active_censors_count_per_layer_pre_solving_random[_layer]++;
          if (censorConfigsByTy[censorTy].presets[censorPresetI] == null) {
            censorPresetI = 0;
          }
          mixedCache.mixed_entries[_layer][clsI] = {
            censor_type: censorTy,
            preset_ident: censorPresetI
          };
        }
      }
    }
  }
}
function createConfigCache(config) {
  var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  cache.missing_features = {};
  if (!config.user || config.user.permissions.permission_shape_heart > config.user.patreon_tier) {
    for (var _i2 = 0, _arr2 = [config.bar_configuration, config.blur_configuration, config.pixel_configuration, config.triangle_configuration, config.sobel_configuration]; _i2 < _arr2.length; _i2++) {
      var censor_config = _arr2[_i2];
      if (censor_config.presets.some(function (preset) {
        return preset != null && preset.config.shape === 3;
      })) {
        cache.missing_features.heart_shape = true;
        break;
      }
    }
  }
  if (config.reverse_mode_configuration.enabled && (!config.user || config.user.permissions.permission_reverse_censoring > config.user.patreon_tier)) {
    cache.missing_features.reverse_mode = true;
  }
  if (config.only_once_mode_configuration.enabled && (!config.user || config.user.permissions.permission_only_once_mode > config.user.patreon_tier)) {
    cache.missing_features.only_once_mode = true;
  }
  if (config.file_types.includes("gif") && !config.gif_configuration._thumbnails && (!config.user || config.user.permissions.permission_file_type_gif > config.user.patreon_tier)) {
    cache.missing_features.gif_censoring = true;
  }
  collectMixedEntries(config, cache);
  cache.captionCache = {};
  if (config.caption_configuration.enabled) {
    var ctx = document.createElement("canvas").getContext("2d");
    ctx.textAlign = "center";
    for (var presetIdent in config.caption_configuration.presets) {
      var preset_config = config.caption_configuration.presets[presetIdent].config;
      var font_size = CAPTION_BASE_FONT_SIZE;
      ctx.font = "".concat(preset_config.fontStyle, " ").concat(font_size, "px ").concat(escapeQuotes(preset_config.font));
      var metrics = ctx.measureText("N");
      var ascent = Math.floor(metrics.actualBoundingBoxAscent);
      var descent = Math.ceil(metrics.actualBoundingBoxDescent);
      var fontHeight = ascent + descent;
      var hanging_metrics = ctx.measureText("Ng");
      var hanging_ascent = Math.floor(hanging_metrics.actualBoundingBoxAscent);
      var hanging_descent = Math.ceil(hanging_metrics.actualBoundingBoxDescent);
      var fontHangingHeight = hanging_ascent + hanging_descent;
      var line_height = fontHangingHeight * preset_config.lineHeight;
      var single_entries_by_tags = {};
      var spread_out_entries_by_tags = {};
      for (var tag_id in preset_config.tags) {
        single_entries_by_tags[tag_id] = [];
        spread_out_entries_by_tags[tag_id] = [];
      }
      var total_tags_count = Object.keys(preset_config.tags).length;
      var entries = preset_config.entries;
      var weightedSingleEntriesByTags = [];
      var weightedSpreadOutEntriesByTags = [];
      if (0 < total_tags_count) {
        var tag_assignment_counts = {};
        for (var _tag_id in preset_config.tags) {
          tag_assignment_counts[_tag_id] = 0;
        }
        var total_tag_assignments = 0;
        for (var id in entries) {
          var entry = entries[id];
          var _processCaptionEntry = processCaptionEntry(entry, ctx, metrics, fontHeight, line_height),
            single_entry = _processCaptionEntry.single_entry,
            spread_out_entry = _processCaptionEntry.spread_out_entry;
          var tags = entry.tags,
            chance = entry.chance;
          var _iterator3 = config_createForOfIteratorHelper(tags),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var _tag_id2 = _step3.value;
              tag_assignment_counts[_tag_id2]++;
              total_tag_assignments++;
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          if (tags.length === 0) {
            tags = Object.keys(preset_config.tags);
          }
          var _iterator4 = config_createForOfIteratorHelper(tags),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var _tag_id3 = _step4.value;
              single_entry.weight = chance / (tags.length || total_tags_count);
              single_entries_by_tags[_tag_id3].push(single_entry);
              if (spread_out_entry != null) {
                spread_out_entry.weight = chance / (tags.length || total_tags_count);
                spread_out_entries_by_tags[_tag_id3].push(spread_out_entry);
              }
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }
        for (var _tag_id4 in preset_config.tags) {
          var weight = (tag_assignment_counts[_tag_id4] || 1) / (total_tag_assignments || 1);
          if (single_entries_by_tags[_tag_id4]) {
            weightedSingleEntriesByTags.push({
              entries: single_entries_by_tags[_tag_id4],
              weight: weight
            });
          }
          if (spread_out_entries_by_tags[_tag_id4]) {
            weightedSpreadOutEntriesByTags.push({
              entries: spread_out_entries_by_tags[_tag_id4],
              weight: weight
            });
          }
        }
      } else {
        var single_entries = [];
        var spread_out_entries = [];
        for (var _id in entries) {
          var _entry = entries[_id];
          var _processCaptionEntry2 = processCaptionEntry(_entry, ctx, metrics, fontHeight, line_height),
            _single_entry = _processCaptionEntry2.single_entry,
            _spread_out_entry = _processCaptionEntry2.spread_out_entry;
          var _chance = _entry.chance;
          _single_entry.weight = _chance;
          single_entries.push(_single_entry);
          if (_spread_out_entry != null) {
            _spread_out_entry.weight = _chance;
            spread_out_entries.push(_spread_out_entry);
          }
        }
        weightedSingleEntriesByTags.push({
          entries: single_entries,
          weight: 1
        });
        weightedSpreadOutEntriesByTags.push({
          entries: spread_out_entries,
          weight: 1
        });
      }
      cache.captionCache[presetIdent] = {
        fontHeight: fontHeight,
        fontHangingHeight: fontHangingHeight,
        weightedSingleEntriesByTags: weightedSingleEntriesByTags,
        weightedSpreadOutEntriesByTags: weightedSpreadOutEntriesByTags
      };
    }
  }
  return cache;
}
function getCensorConfigsByType(config) {
  return {
    1: config.pixel_configuration,
    2: config.blur_configuration,
    3: config.bar_configuration,
    4: config.triangle_configuration,
    5: config.box_configuration,
    6: config.glitch_configuration,
    7: config.sticker_configuration,
    8: config.sobel_configuration,
    9: config.splatter_configuration,
    10: config.mixed_configuration,
    11: config.random_configuration
  };
}
var LABELS = ["FACEFEMALE", "FACEMALE", "BELLYEXPOSED", "BELLYCOVERED", "BUTTOCKSEXPOSED", "BUTTOCKSCOVERED", "FEMALEBREASTEXPOSED", "FEMALEBREASTCOVERED", "FEMALEGENITALIAEXPOSED", "FEMALEGENITALIACOVERED", "MALEGENITALIACOVERED", "MALEGENITALIAEXPOSED", "MALEBREASTEXPOSED", "MALEBREASTCOVERED", "FEETCOVERED", "FEETEXPOSED", "ARMPITSCOVERED", "ARMPITSEXPOSED", "ANUSCOVERED", "ANUSEXPOSED", "EYE", "MOUTH", "NIPPLECOVERED", "NIPPLEEXPOSED", "HANDCOVERED", "HANDEXPOSED"];
var MIXED_CENSOR_LAYERS_COUNT = 3;
var CensorType;
(function (CensorType) {
  CensorType["BAR"] = "black";
  CensorType["BLUR"] = "blur";
  CensorType["PIXEL"] = "pixel";
  CensorType["TRIANGLE"] = "triangle";
  CensorType["BOX"] = "box";
  CensorType["GLITCH"] = "glitch";
  CensorType["STICKER"] = "sticker";
  CensorType["SOBEL"] = "sobel";
  CensorType["SPLATTER"] = "splatter";
  CensorType["RANDOM"] = "random";
  CensorType["MIXED"] = "mixed";
})(CensorType || (CensorType = {}));
var CensorShape;
(function (CensorShape) {
  CensorShape[CensorShape["RECTANGLE"] = 0] = "RECTANGLE";
  CensorShape[CensorShape["CIRCLE"] = 1] = "CIRCLE";
  CensorShape[CensorShape["ELLIPSE"] = 2] = "ELLIPSE";
  CensorShape[CensorShape["HEART"] = 3] = "HEART";
  CensorShape[CensorShape["LINE"] = 4] = "LINE";
})(CensorShape || (CensorShape = {}));
var CensorTypePresetConfig = /*#__PURE__*/_createClass(function CensorTypePresetConfig() {
  var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.0;
  var shape = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CensorShape.RECTANGLE;
  var feathering = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  _classCallCheck(this, CensorTypePresetConfig);
  this.scale = scale;
  this.shape = shape;
  this.feathering = feathering;
});
var CensorPreset = /*#__PURE__*/_createClass(function CensorPreset(config) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Preset 1";
  _classCallCheck(this, CensorPreset);
  this.config = config;
  this.name = name;
});
var CensorTypeConfig = /*#__PURE__*/_createClass(function CensorTypeConfig(_name) {
  var presets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var selectedPresetIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  _classCallCheck(this, CensorTypeConfig);
  this._name = _name;
  this.presets = presets;
  this.selectedPresetIndex = selectedPresetIndex;
});
var StickerCensorTypeConfig = /*#__PURE__*/function (_CensorTypeConfig) {
  function StickerCensorTypeConfig(_name, cached) {
    var _this;
    var presets = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var selectedPresetIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    _classCallCheck(this, StickerCensorTypeConfig);
    _this = _callSuper(this, StickerCensorTypeConfig, [_name, presets, selectedPresetIndex]);
    _this.cached = cached;
    return _this;
  }
  _inherits(StickerCensorTypeConfig, _CensorTypeConfig);
  return _createClass(StickerCensorTypeConfig);
}(CensorTypeConfig);
var BarType;
(function (BarType) {
  BarType[BarType["PAINT"] = 0] = "PAINT";
  BarType[BarType["ERASE"] = 1] = "ERASE";
})(BarType || (BarType = {}));
var BarCensorTypePresetConfig = /*#__PURE__*/function (_CensorTypePresetConf) {
  function BarCensorTypePresetConfig() {
    var _this2;
    var shape = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CensorShape.RECTANGLE;
    var rounding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var feathering = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var border_width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var border_color = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "#FFFFFF";
    var ty = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : BarType.PAINT;
    var color = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : "#000000";
    var opacity = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 1;
    var cluster = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : true;
    var cluster_preset_index = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 0;
    var caption = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : true;
    var caption_preset_index = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : 0;
    var word_wall = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : true;
    var word_wall_preset_index = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : 0;
    _classCallCheck(this, BarCensorTypePresetConfig);
    _this2 = _callSuper(this, BarCensorTypePresetConfig, [scale, shape, feathering]);
    _this2.rounding = rounding;
    _this2.border_width = border_width;
    _this2.border_color = border_color;
    _this2.ty = ty;
    _this2.color = color;
    _this2.opacity = opacity;
    _this2.cluster = cluster;
    _this2.cluster_preset_index = cluster_preset_index;
    _this2.caption = caption;
    _this2.caption_preset_index = caption_preset_index;
    _this2.word_wall = word_wall;
    _this2.word_wall_preset_index = word_wall_preset_index;
    return _this2;
  }
  _inherits(BarCensorTypePresetConfig, _CensorTypePresetConf);
  return _createClass(BarCensorTypePresetConfig);
}(CensorTypePresetConfig);
var PixelType;
(function (PixelType) {
  PixelType[PixelType["MOSAIC"] = 0] = "MOSAIC";
  PixelType[PixelType["HEXAGON"] = 1] = "HEXAGON";
  PixelType[PixelType["GLITCH"] = 2] = "GLITCH";
  PixelType[PixelType["HALFTONE"] = 3] = "HALFTONE";
})(PixelType || (PixelType = {}));
var PixelCensorTypePresetConfig = /*#__PURE__*/function (_CensorTypePresetConf2) {
  function PixelCensorTypePresetConfig() {
    var _this3;
    var shape = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CensorShape.RECTANGLE;
    var rounding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var feathering = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var border_width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var border_color = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "#FFFFFF";
    var ty = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : PixelType.MOSAIC;
    var strength = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 20;
    var grid_width = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
    var grid_color = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : "#FFFFFF";
    var density = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 1;
    var color = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : "#FFFFFF";
    var bg_color = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : "#000000";
    var channel_colors = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : 256;
    var grayscale = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : false;
    var scale_with_detection = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : true;
    var accurate_sampling = arguments.length > 16 && arguments[16] !== undefined ? arguments[16] : true;
    var color_mode = arguments.length > 17 && arguments[17] !== undefined ? arguments[17] : 1;
    var cluster = arguments.length > 18 && arguments[18] !== undefined ? arguments[18] : true;
    var cluster_preset_index = arguments.length > 19 && arguments[19] !== undefined ? arguments[19] : 0;
    var caption = arguments.length > 20 && arguments[20] !== undefined ? arguments[20] : true;
    var caption_preset_index = arguments.length > 21 && arguments[21] !== undefined ? arguments[21] : 0;
    var word_wall = arguments.length > 22 && arguments[22] !== undefined ? arguments[22] : true;
    var word_wall_preset_index = arguments.length > 23 && arguments[23] !== undefined ? arguments[23] : 0;
    _classCallCheck(this, PixelCensorTypePresetConfig);
    _this3 = _callSuper(this, PixelCensorTypePresetConfig, [scale, shape, feathering]);
    _this3.rounding = rounding;
    _this3.border_width = border_width;
    _this3.border_color = border_color;
    _this3.channel_colors = channel_colors;
    _this3.ty = ty;
    _this3.scale_with_detection = scale_with_detection;
    _this3.strength = strength;
    _this3.grayscale = grayscale;
    _this3.accurate_sampling = accurate_sampling;
    _this3.grid_width = grid_width;
    _this3.grid_color = grid_color;
    _this3.density = density;
    _this3.color = color;
    _this3.bg_color = bg_color;
    _this3.color_mode = color_mode;
    _this3.cluster = cluster;
    _this3.cluster_preset_index = cluster_preset_index;
    _this3.caption = caption;
    _this3.caption_preset_index = caption_preset_index;
    _this3.word_wall = word_wall;
    _this3.word_wall_preset_index = word_wall_preset_index;
    return _this3;
  }
  _inherits(PixelCensorTypePresetConfig, _CensorTypePresetConf2);
  return _createClass(PixelCensorTypePresetConfig);
}(CensorTypePresetConfig);
var BlurType;
(function (BlurType) {
  BlurType[BlurType["GAUSSIAN"] = 0] = "GAUSSIAN";
  BlurType[BlurType["DIFFUSION"] = 1] = "DIFFUSION";
})(BlurType || (BlurType = {}));
var BlurCensorTypePresetConfig = /*#__PURE__*/function (_CensorTypePresetConf3) {
  function BlurCensorTypePresetConfig() {
    var _this4;
    var shape = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CensorShape.RECTANGLE;
    var rounding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var feathering = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var border_width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var border_color = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "#FFFFFF";
    var ty = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : BlurType.GAUSSIAN;
    var strength = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 20;
    var grayscale = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
    var cluster = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : true;
    var cluster_preset_index = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 0;
    var caption = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : true;
    var caption_preset_index = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : 0;
    var word_wall = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : true;
    var word_wall_preset_index = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : 0;
    _classCallCheck(this, BlurCensorTypePresetConfig);
    _this4 = _callSuper(this, BlurCensorTypePresetConfig, [scale, shape, feathering]);
    _this4.rounding = rounding;
    _this4.border_width = border_width;
    _this4.border_color = border_color;
    _this4.ty = ty;
    _this4.strength = strength;
    _this4.grayscale = grayscale;
    _this4.cluster = cluster;
    _this4.cluster_preset_index = cluster_preset_index;
    _this4.caption = caption;
    _this4.caption_preset_index = caption_preset_index;
    _this4.word_wall = word_wall;
    _this4.word_wall_preset_index = word_wall_preset_index;
    return _this4;
  }
  _inherits(BlurCensorTypePresetConfig, _CensorTypePresetConf3);
  return _createClass(BlurCensorTypePresetConfig);
}(CensorTypePresetConfig);
var TriangleCensorTypePresetConfig = /*#__PURE__*/function (_CensorTypePresetConf4) {
  function TriangleCensorTypePresetConfig() {
    var _this5;
    var shape = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CensorShape.RECTANGLE;
    var rounding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var feathering = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var border_width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var border_color = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "#FFFFFF";
    var vertex_count = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 700;
    var threshold = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 50;
    var accuracy = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0.7;
    var blurring = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 1;
    var fill_color_mode = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 0;
    var fill_color = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : "#000000";
    var stroke_color_mode = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : 0;
    var stroke_color = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : "#000000";
    var stroke_width = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : 0.5;
    var gradients = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : false;
    var gradient_stops = arguments.length > 16 && arguments[16] !== undefined ? arguments[16] : 4;
    var line_join = arguments.length > 17 && arguments[17] !== undefined ? arguments[17] : 0;
    var transparent_color = arguments.length > 18 && arguments[18] !== undefined ? arguments[18] : false;
    var cluster = arguments.length > 19 && arguments[19] !== undefined ? arguments[19] : true;
    var cluster_preset_index = arguments.length > 20 && arguments[20] !== undefined ? arguments[20] : 0;
    var caption = arguments.length > 21 && arguments[21] !== undefined ? arguments[21] : true;
    var caption_preset_index = arguments.length > 22 && arguments[22] !== undefined ? arguments[22] : 0;
    var word_wall = arguments.length > 23 && arguments[23] !== undefined ? arguments[23] : true;
    var word_wall_preset_index = arguments.length > 24 && arguments[24] !== undefined ? arguments[24] : 0;
    _classCallCheck(this, TriangleCensorTypePresetConfig);
    _this5 = _callSuper(this, TriangleCensorTypePresetConfig, [scale, shape, feathering]);
    _this5.rounding = rounding;
    _this5.border_width = border_width;
    _this5.border_color = border_color;
    _this5.accuracy = accuracy;
    _this5.blurring = blurring;
    _this5.threshold = threshold;
    _this5.vertex_count = vertex_count;
    _this5.fill_color_mode = fill_color_mode;
    _this5.fill_color = fill_color;
    _this5.stroke_color_mode = stroke_color_mode;
    _this5.stroke_color = stroke_color;
    _this5.stroke_width = stroke_width;
    _this5.gradients = gradients;
    _this5.gradient_stops = gradient_stops;
    _this5.line_join = line_join;
    _this5.transparent_color = transparent_color;
    _this5.cluster = cluster;
    _this5.cluster_preset_index = cluster_preset_index;
    _this5.caption = caption;
    _this5.caption_preset_index = caption_preset_index;
    _this5.word_wall = word_wall;
    _this5.word_wall_preset_index = word_wall_preset_index;
    return _this5;
  }
  _inherits(TriangleCensorTypePresetConfig, _CensorTypePresetConf4);
  return _createClass(TriangleCensorTypePresetConfig);
}(CensorTypePresetConfig);
var BoxCensorTypePresetConfig = /*#__PURE__*/function (_CensorTypePresetConf5) {
  function BoxCensorTypePresetConfig() {
    var _this6;
    var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var display = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var fill_color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#00000000";
    var border_color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "#FFFFFF";
    var cluster = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    var cluster_preset_index = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var caption = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
    var caption_preset_index = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
    var word_wall = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : true;
    var word_wall_preset_index = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;
    _classCallCheck(this, BoxCensorTypePresetConfig);
    _this6 = _callSuper(this, BoxCensorTypePresetConfig, [scale, 0, 0]);
    _this6.display = display;
    _this6.fill_color = fill_color;
    _this6.border_color = border_color;
    _this6.cluster = cluster;
    _this6.cluster_preset_index = cluster_preset_index;
    _this6.caption = caption;
    _this6.caption_preset_index = caption_preset_index;
    _this6.word_wall = word_wall;
    _this6.word_wall_preset_index = word_wall_preset_index;
    return _this6;
  }
  _inherits(BoxCensorTypePresetConfig, _CensorTypePresetConf5);
  return _createClass(BoxCensorTypePresetConfig);
}(CensorTypePresetConfig);
var GlitchCensorTypePresetConfig = /*#__PURE__*/function (_CensorTypePresetConf6) {
  function GlitchCensorTypePresetConfig() {
    var _this7;
    var ty = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var chromatic_aberration_color_intensity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var chromatic_aberration_shift_intensity = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    var chromatic_aberration_vertical_shift = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    var chromatic_aberration_horizontal_shift = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
    var multiple_panels_amount = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 4;
    var multiple_panels_min_size = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0.85;
    var multiple_panels_max_size = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 1.45;
    var multiple_panels_scatter = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0.25;
    var multiple_panels_split_chance = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 0.2;
    var multiple_panels_border = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : false;
    var multiple_panels_gradient = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : [{
      color: "#0000007F",
      offset: 0
    }, {
      color: "#0000007F",
      offset: 0
    }, {
      color: "#0000007F",
      offset: 0
    }, {
      color: "#0000007F",
      offset: 0
    }];
    var cluster = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : true;
    var cluster_preset_index = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : 0;
    var caption = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : true;
    var caption_preset_index = arguments.length > 16 && arguments[16] !== undefined ? arguments[16] : 0;
    var word_wall = arguments.length > 17 && arguments[17] !== undefined ? arguments[17] : true;
    var word_wall_preset_index = arguments.length > 18 && arguments[18] !== undefined ? arguments[18] : 0;
    _classCallCheck(this, GlitchCensorTypePresetConfig);
    _this7 = _callSuper(this, GlitchCensorTypePresetConfig, [scale, 0, 0]);
    _this7.ty = ty;
    _this7.chromatic_aberration_shift_intensity = chromatic_aberration_shift_intensity;
    _this7.chromatic_aberration_color_intensity = chromatic_aberration_color_intensity;
    _this7.chromatic_aberration_vertical_shift = chromatic_aberration_vertical_shift;
    _this7.chromatic_aberration_horizontal_shift = chromatic_aberration_horizontal_shift;
    _this7.multiple_panels_amount = multiple_panels_amount;
    _this7.multiple_panels_min_size = multiple_panels_min_size;
    _this7.multiple_panels_max_size = multiple_panels_max_size;
    _this7.multiple_panels_scatter = multiple_panels_scatter;
    _this7.multiple_panels_split_chance = multiple_panels_split_chance;
    _this7.multiple_panels_gradient = multiple_panels_gradient.map(function (item) {
      return {
        color: item.color,
        offset: item.offset
      };
    });
    _this7.multiple_panels_border = multiple_panels_border;
    _this7.cluster = cluster;
    _this7.cluster_preset_index = cluster_preset_index;
    _this7.caption = caption;
    _this7.caption_preset_index = caption_preset_index;
    _this7.word_wall = word_wall;
    _this7.word_wall_preset_index = word_wall_preset_index;
    return _this7;
  }
  _inherits(GlitchCensorTypePresetConfig, _CensorTypePresetConf6);
  return _createClass(GlitchCensorTypePresetConfig);
}(CensorTypePresetConfig);
var StickerCensorTypePresetConfig = /*#__PURE__*/function (_CensorTypePresetConf7) {
  function StickerCensorTypePresetConfig() {
    var _this8;
    var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var draw_mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var sample_single_source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var enabled_sources = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ["emoji smilies", "emoji hearts", "emoji hands", "emoji other", "emoji signs", "fruits"];
    var cluster = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    var cluster_preset_index = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var caption = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
    var caption_preset_index = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
    var word_wall = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : true;
    var word_wall_preset_index = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;
    _classCallCheck(this, StickerCensorTypePresetConfig);
    _this8 = _callSuper(this, StickerCensorTypePresetConfig, [scale, 0, 0]);
    _this8.draw_mode = draw_mode;
    _this8.sample_single_source = sample_single_source;
    _this8.enabled_sources = enabled_sources;
    _this8.cluster = cluster;
    _this8.cluster_preset_index = cluster_preset_index;
    _this8.caption = caption;
    _this8.caption_preset_index = caption_preset_index;
    _this8.word_wall = word_wall;
    _this8.word_wall_preset_index = word_wall_preset_index;
    return _this8;
  }
  _inherits(StickerCensorTypePresetConfig, _CensorTypePresetConf7);
  return _createClass(StickerCensorTypePresetConfig);
}(CensorTypePresetConfig);
var SobelCensorTypePresetConfig = /*#__PURE__*/function (_CensorTypePresetConf8) {
  function SobelCensorTypePresetConfig() {
    var _this9;
    var shape = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CensorShape.RECTANGLE;
    var rounding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var feathering = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var border_width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var border_color = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "#FFFFFF";
    var inverted_color = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
    var cluster = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : true;
    var cluster_preset_index = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
    var caption = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : true;
    var caption_preset_index = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 0;
    var word_wall = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : true;
    var word_wall_preset_index = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : 0;
    _classCallCheck(this, SobelCensorTypePresetConfig);
    _this9 = _callSuper(this, SobelCensorTypePresetConfig, [scale, shape, feathering]);
    _this9.rounding = rounding;
    _this9.border_width = border_width;
    _this9.border_color = border_color;
    _this9.inverted_color = inverted_color;
    _this9.cluster = cluster;
    _this9.cluster_preset_index = cluster_preset_index;
    _this9.caption = caption;
    _this9.caption_preset_index = caption_preset_index;
    _this9.word_wall = word_wall;
    _this9.word_wall_preset_index = word_wall_preset_index;
    return _this9;
  }
  _inherits(SobelCensorTypePresetConfig, _CensorTypePresetConf8);
  return _createClass(SobelCensorTypePresetConfig);
}(CensorTypePresetConfig);
var SplatterCensorTypePresetConfig = /*#__PURE__*/function (_CensorTypePresetConf9) {
  function SplatterCensorTypePresetConfig() {
    var _this10;
    var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var color_mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var opacity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var color_pool = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [{
      color: "#000000",
      weight: 0
    }, {
      color: "#000000",
      weight: 0
    }, {
      color: "#000000",
      weight: 0
    }, {
      color: "#000000",
      weight: 0
    }, {
      color: "#000000",
      weight: 0
    }, {
      color: "#000000",
      weight: 0
    }];
    var centering = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 4;
    var size = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
    var amount = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 5;
    var sub_size = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;
    var sub_amount = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 10;
    var recursions = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 2;
    var cluster = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : true;
    var cluster_preset_index = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 0;
    var caption = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : true;
    var caption_preset_index = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : 0;
    var word_wall = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : true;
    var word_wall_preset_index = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : 0;
    _classCallCheck(this, SplatterCensorTypePresetConfig);
    _this10 = _callSuper(this, SplatterCensorTypePresetConfig, [scale, 0, 0]);
    _this10.color_mode = color_mode;
    _this10.opacity = opacity;
    _this10.color_pool = color_pool.map(function (item) {
      return {
        color: item.color,
        weight: item.weight
      };
    });
    _this10.centering = centering;
    _this10.size = size;
    _this10.amount = amount;
    _this10.sub_size = sub_size;
    _this10.sub_amount = sub_amount;
    _this10.recursions = recursions;
    _this10.cluster = cluster;
    _this10.cluster_preset_index = cluster_preset_index;
    _this10.caption = caption;
    _this10.caption_preset_index = caption_preset_index;
    _this10.word_wall = word_wall;
    _this10.word_wall_preset_index = word_wall_preset_index;
    return _this10;
  }
  _inherits(SplatterCensorTypePresetConfig, _CensorTypePresetConf9);
  return _createClass(SplatterCensorTypePresetConfig);
}(CensorTypePresetConfig);
var MixedCensorTypePresetConfig = /*#__PURE__*/function (_CensorTypePresetConf10) {
  function MixedCensorTypePresetConfig() {
    var _this11;
    var censor_types = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : populatePerKlassIndex(function () {
      return [null, null, null];
    });
    var censor_preset_indexes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : populatePerKlassIndex(function () {
      return [null, null, null];
    });
    var reverse_censor_types = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [null, null, null];
    var reverse_censor_preset_indexes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [null, null, null];
    _classCallCheck(this, MixedCensorTypePresetConfig);
    _this11 = _callSuper(this, MixedCensorTypePresetConfig);
    _this11.censor_types = censor_types;
    _this11.censor_preset_indexes = censor_preset_indexes;
    _this11.reverse_censor_types = reverse_censor_types;
    _this11.reverse_censor_preset_indexes = reverse_censor_preset_indexes;
    return _this11;
  }
  _inherits(MixedCensorTypePresetConfig, _CensorTypePresetConf10);
  return _createClass(MixedCensorTypePresetConfig);
}(CensorTypePresetConfig);
var RandomMode;
(function (RandomMode) {
  RandomMode[RandomMode["Random"] = 0] = "Random";
  RandomMode[RandomMode["SuperRandom"] = 1] = "SuperRandom";
})(RandomMode || (RandomMode = {}));
var RandomCensorTypePresetConfig = /*#__PURE__*/function (_CensorTypePresetConf11) {
  function RandomCensorTypePresetConfig() {
    var _this12;
    var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : RandomMode.Random;
    var censor_weights = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      0: 0,
      1: 1,
      2: 1,
      3: 1,
      4: 1,
      5: 0,
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      10: 0
    };
    _classCallCheck(this, RandomCensorTypePresetConfig);
    _this12 = _callSuper(this, RandomCensorTypePresetConfig);
    _this12.mode = mode;
    _this12.censor_weights = censor_weights;
    return _this12;
  }
  _inherits(RandomCensorTypePresetConfig, _CensorTypePresetConf11);
  return _createClass(RandomCensorTypePresetConfig);
}(CensorTypePresetConfig);
var FileTypeConfiguration = /*#__PURE__*/function () {
  function FileTypeConfiguration(name) {
    var filesize_min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
    var filesize_max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var width_min = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;
    var width_max = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var height_min = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 50;
    var height_max = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var file_output_type = arguments.length > 7 ? arguments[7] : undefined;
    _classCallCheck(this, FileTypeConfiguration);
    this._name = name;
    this._filesize_min = filesize_min;
    this._filesize_max = filesize_max;
    this._width_min = width_min;
    this._width_max = width_max;
    this._height_min = height_min;
    this._height_max = height_max;
    this._file_output_type = file_output_type;
  }
  return _createClass(FileTypeConfiguration, [{
    key: "file_output_type",
    get: function get() {
      return this._file_output_type;
    },
    set: function set(value) {
      this._file_output_type = value;
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    },
    set: function set(value) {
      this._name = value;
    }
  }, {
    key: "filesize_min",
    get: function get() {
      return this._filesize_min;
    },
    set: function set(value) {
      this._filesize_min = value;
    }
  }, {
    key: "filesize_max",
    get: function get() {
      return this._filesize_max;
    },
    set: function set(value) {
      this._filesize_max = value;
    }
  }, {
    key: "width_min",
    get: function get() {
      return this._width_min;
    },
    set: function set(value) {
      this._width_min = value;
    }
  }, {
    key: "width_max",
    get: function get() {
      return this._width_max;
    },
    set: function set(value) {
      this._width_max = value;
    }
  }, {
    key: "height_min",
    get: function get() {
      return this._height_min;
    },
    set: function set(value) {
      this._height_min = value;
    }
  }, {
    key: "height_max",
    get: function get() {
      return this._height_max;
    },
    set: function set(value) {
      this._height_max = value;
    }
  }]);
}();
var PNGTypeConfiguration = /*#__PURE__*/function (_FileTypeConfiguratio) {
  function PNGTypeConfiguration(name) {
    var filesize_min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;
    var filesize_max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var width_min = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;
    var width_max = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var height_min = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 50;
    var height_max = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var file_output_type = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : "image/png";
    _classCallCheck(this, PNGTypeConfiguration);
    return _callSuper(this, PNGTypeConfiguration, [name, filesize_min, filesize_max, width_min, width_max, height_min, height_max, file_output_type]);
  }
  _inherits(PNGTypeConfiguration, _FileTypeConfiguratio);
  return _createClass(PNGTypeConfiguration);
}(FileTypeConfiguration);
var JPGTypeConfiguration = /*#__PURE__*/function (_FileTypeConfiguratio2) {
  function JPGTypeConfiguration(name) {
    var filesize_min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2500;
    var filesize_max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var width_min = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;
    var width_max = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var height_min = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 50;
    var height_max = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var file_output_type = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : "image/jpeg";
    _classCallCheck(this, JPGTypeConfiguration);
    return _callSuper(this, JPGTypeConfiguration, [name, filesize_min, filesize_max, width_min, width_max, height_min, height_max, file_output_type]);
  }
  _inherits(JPGTypeConfiguration, _FileTypeConfiguratio2);
  return _createClass(JPGTypeConfiguration);
}(FileTypeConfiguration);
var BMPTypeConfiguration = /*#__PURE__*/function (_FileTypeConfiguratio3) {
  function BMPTypeConfiguration(name) {
    var filesize_min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;
    var filesize_max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var width_min = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;
    var width_max = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var height_min = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 50;
    var height_max = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var file_output_type = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : "image/bmp";
    _classCallCheck(this, BMPTypeConfiguration);
    return _callSuper(this, BMPTypeConfiguration, [name, filesize_min, filesize_max, width_min, width_max, height_min, height_max, file_output_type]);
  }
  _inherits(BMPTypeConfiguration, _FileTypeConfiguratio3);
  return _createClass(BMPTypeConfiguration);
}(FileTypeConfiguration);
var WEBPTypeConfiguration = /*#__PURE__*/function (_FileTypeConfiguratio4) {
  function WEBPTypeConfiguration(name) {
    var filesize_min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2500;
    var filesize_max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var width_min = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;
    var width_max = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var height_min = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 50;
    var height_max = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var file_output_type = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : "image/webp";
    _classCallCheck(this, WEBPTypeConfiguration);
    return _callSuper(this, WEBPTypeConfiguration, [name, filesize_min, filesize_max, width_min, width_max, height_min, height_max, file_output_type]);
  }
  _inherits(WEBPTypeConfiguration, _FileTypeConfiguratio4);
  return _createClass(WEBPTypeConfiguration);
}(FileTypeConfiguration);
var AVIFTypeConfiguration = /*#__PURE__*/function (_FileTypeConfiguratio5) {
  function AVIFTypeConfiguration(name) {
    var filesize_min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;
    var filesize_max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var width_min = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;
    var width_max = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var height_min = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 50;
    var height_max = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var file_output_type = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : "image/png";
    _classCallCheck(this, AVIFTypeConfiguration);
    return _callSuper(this, AVIFTypeConfiguration, [name, filesize_min, filesize_max, width_min, width_max, height_min, height_max, file_output_type]);
  }
  _inherits(AVIFTypeConfiguration, _FileTypeConfiguratio5);
  return _createClass(AVIFTypeConfiguration);
}(FileTypeConfiguration);
var GIFTypeConfiguration = /*#__PURE__*/function (_FileTypeConfiguratio6) {
  function GIFTypeConfiguration(name, memory_method, thumbnails, thumbnail_fallback) {
    var _this13;
    var frame_count_max = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var filesize_min = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 10000;
    var filesize_max = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 100000000;
    var width_min = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
    var width_max = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
    var height_min = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;
    var height_max = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 0;
    _classCallCheck(this, GIFTypeConfiguration);
    _this13 = _callSuper(this, GIFTypeConfiguration, [name, filesize_min, filesize_max, width_min, width_max, height_min, height_max, "image/gif"]);
    _this13._frame_count_max = frame_count_max;
    _this13._memory_method = memory_method;
    _this13._thumbnails = thumbnails;
    _this13._thumbnail_fallback = thumbnail_fallback;
    return _this13;
  }
  _inherits(GIFTypeConfiguration, _FileTypeConfiguratio6);
  return _createClass(GIFTypeConfiguration, [{
    key: "memory_method",
    get: function get() {
      return this._memory_method;
    },
    set: function set(value) {
      this._memory_method = value;
    }
  }, {
    key: "thumbnails",
    get: function get() {
      return this._thumbnails;
    },
    set: function set(value) {
      this._thumbnails = value;
    }
  }, {
    key: "frame_count_max",
    get: function get() {
      return this._frame_count_max;
    },
    set: function set(value) {
      this._frame_count_max = value;
    }
  }, {
    key: "thumbnail_fallback",
    get: function get() {
      return this._thumbnail_fallback;
    },
    set: function set(value) {
      this._thumbnail_fallback = value;
    }
  }]);
}(FileTypeConfiguration);
function videoInactivityTimeoutToMs(timeout) {
  switch (timeout) {
    case VideoInactivityTimeout.None:
      return -1;
    case VideoInactivityTimeout.OneMinute:
      return 60000;
    case VideoInactivityTimeout.TwoMinute:
      return 120000;
    case VideoInactivityTimeout.ThreeMinute:
      return 180000;
    case VideoInactivityTimeout.FiveMinute:
      return 300000;
    case VideoInactivityTimeout.TenMinute:
      return 600000;
    case VideoInactivityTimeout.FifteenMinute:
      return 900000;
    case VideoInactivityTimeout.TwentyMinute:
      return 1200000;
    case VideoInactivityTimeout.ThirtyMinute:
      return 1800000;
    case VideoInactivityTimeout.OneHour:
      return 3600000;
    case VideoInactivityTimeout.TwoHour:
      return 7200000;
  }
}
var VideoMode;
(function (VideoMode) {
  VideoMode[VideoMode["FileProcessor"] = 0] = "FileProcessor";
  VideoMode[VideoMode["Overlay"] = 1] = "Overlay";
})(VideoMode || (VideoMode = {}));
var VideoOverlayProcessingMode;
(function (VideoOverlayProcessingMode) {
  VideoOverlayProcessingMode[VideoOverlayProcessingMode["Sync"] = 0] = "Sync";
  VideoOverlayProcessingMode[VideoOverlayProcessingMode["Async"] = 1] = "Async";
})(VideoOverlayProcessingMode || (VideoOverlayProcessingMode = {}));
var VideoInactivityTimeout;
(function (VideoInactivityTimeout) {
  VideoInactivityTimeout[VideoInactivityTimeout["None"] = 0] = "None";
  VideoInactivityTimeout[VideoInactivityTimeout["OneMinute"] = 1] = "OneMinute";
  VideoInactivityTimeout[VideoInactivityTimeout["TwoMinute"] = 2] = "TwoMinute";
  VideoInactivityTimeout[VideoInactivityTimeout["ThreeMinute"] = 3] = "ThreeMinute";
  VideoInactivityTimeout[VideoInactivityTimeout["FiveMinute"] = 4] = "FiveMinute";
  VideoInactivityTimeout[VideoInactivityTimeout["TenMinute"] = 5] = "TenMinute";
  VideoInactivityTimeout[VideoInactivityTimeout["FifteenMinute"] = 6] = "FifteenMinute";
  VideoInactivityTimeout[VideoInactivityTimeout["TwentyMinute"] = 7] = "TwentyMinute";
  VideoInactivityTimeout[VideoInactivityTimeout["ThirtyMinute"] = 8] = "ThirtyMinute";
  VideoInactivityTimeout[VideoInactivityTimeout["OneHour"] = 9] = "OneHour";
  VideoInactivityTimeout[VideoInactivityTimeout["TwoHour"] = 10] = "TwoHour";
})(VideoInactivityTimeout || (VideoInactivityTimeout = {}));
var VideoConfiguration = /*#__PURE__*/_createClass(function VideoConfiguration() {
  var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var overlay_processing_mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var overlay_fps_ms_limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000 / 20;
  var overlay_gif_exporting_max_resolution = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 320;
  var overlay_gif_exporting_cache_size = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 314572800;
  var file_processor_max_fps = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 20;
  var file_processor_max_resolution = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 640;
  var file_processor_quality = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 2;
  var file_processor_threads = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 6;
  var file_processor_inactivity_timeout = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : VideoInactivityTimeout.TenMinute;
  _classCallCheck(this, VideoConfiguration);
  this.mode = mode;
  this.overlay_processing_mode = overlay_processing_mode;
  this.overlay_fps_ms_limit = overlay_fps_ms_limit;
  this.overlay_gif_exporting_max_resolution = overlay_gif_exporting_max_resolution;
  this.overlay_gif_exporting_cache_size = overlay_gif_exporting_cache_size;
  this.file_processor_max_fps = file_processor_max_fps;
  this.file_processor_max_resolution = file_processor_max_resolution;
  this.file_processor_quality = file_processor_quality;
  this.file_processor_threads = file_processor_threads;
  this.file_processor_inactivity_timeout = file_processor_inactivity_timeout;
});
var ScanConfiguration = /*#__PURE__*/_createClass(function ScanConfiguration() {
  var warmUp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var downscaleInput = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var preferEditedDetections = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var interpolate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var scanRate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 2;
  var confidence = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.2;
  var extraInterpolation = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 4;
  _classCallCheck(this, ScanConfiguration);
  this.warmUp = warmUp;
  this.downscaleInput = downscaleInput;
  this.preferEditedDetections = preferEditedDetections;
  this.interpolate = interpolate;
  this.scanRate = scanRate;
  this.confidence = confidence;
  this.extraInterpolation = extraInterpolation;
});
var WhiteBlackListConfiguration = /*#__PURE__*/_createClass(function WhiteBlackListConfiguration() {
  var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var white_list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var black_list = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  _classCallCheck(this, WhiteBlackListConfiguration);
  this.mode = mode;
  this.white_list = white_list;
  this.black_list = black_list;
});
var ReverseModeConfiguration = /*#__PURE__*/_createClass(function ReverseModeConfiguration(enabled, mode) {
  _classCallCheck(this, ReverseModeConfiguration);
  this.enabled = enabled;
  this.mode = mode;
});
var ClusteringConfiguration = /*#__PURE__*/_createClass(function ClusteringConfiguration() {
  var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var presets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [new CensorPreset(new ClusteringPresetConfiguration())];
  var selectedPresetIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  _classCallCheck(this, ClusteringConfiguration);
  this.enabled = enabled;
  this.presets = presets;
  this.selectedPresetIndex = selectedPresetIndex;
});
var ClusteringPresetConfiguration = /*#__PURE__*/_createClass(function ClusteringPresetConfiguration() {
  var max_distance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var only_matching_content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var rotation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  _classCallCheck(this, ClusteringPresetConfiguration);
  this.max_distance = max_distance;
  this.only_matching_content = only_matching_content;
  this.rotation = rotation;
});
var CAPTION_BASE_FONT_SIZE = 227;
var CAPTION_TAG_NAME_CHAR_LIMIT = 25;
var CAPTION_ENTRY_VALUE_CHAR_LIMIT = 100;
var CAPTION_ENTRY_CHANCE_MIN = 0.05;
var CAPTION_ENTRY_CHANCE_MAX = 20;
var CAPTION_ENTRY_MAX_TAGS = 6;
var CAPTION_TAG_COUNT_LIMIT = 25;
var CAPTION_ENTRY_COUNT_LIMIT = 200;
var CaptionConfiguration = /*#__PURE__*/_createClass(function CaptionConfiguration() {
  var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var presets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [new CensorPreset(new CaptionPresetConfiguration())];
  var selectedPresetIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  _classCallCheck(this, CaptionConfiguration);
  this.enabled = enabled;
  this.presets = presets;
  this.selectedPresetIndex = selectedPresetIndex;
});
var CaptionEntry = /*#__PURE__*/_createClass(function CaptionEntry() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var chance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var onContent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : sequence(ALL_NON_EXPERIMENTAL_LABELS_COUNT);
  var tags = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  _classCallCheck(this, CaptionEntry);
  this.value = value;
  this.onContent = onContent;
  this.chance = chance;
  this.tags = tags;
});
var CaptionTag = /*#__PURE__*/_createClass(function CaptionTag() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  _classCallCheck(this, CaptionTag);
  this.name = name;
  this.color = color;
});
var CaptionPresetConfiguration = /*#__PURE__*/_createClass(function CaptionPresetConfiguration() {
  var tags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var entries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    "00000000": new CaptionEntry("PURYFI")
  };
  var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "#FFFFFF";
  var font = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "Segoe UI";
  var fontStyle = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "Bold";
  var shadowSize = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
  var shadowColor = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : "#00000080";
  var lineHeight = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 1.2;
  var padding = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 15;
  _classCallCheck(this, CaptionPresetConfiguration);
  this.tags = tags;
  this.entries = entries;
  this.mode = mode;
  this.color = color;
  this.font = font;
  this.fontStyle = fontStyle;
  this.shadowSize = shadowSize;
  this.shadowColor = shadowColor;
  this.lineHeight = lineHeight;
  this.padding = padding;
});
var WordWallConfiguration = /*#__PURE__*/_createClass(function WordWallConfiguration() {
  var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var presets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [new CensorPreset(new WordWallPresetConfiguration())];
  var selectedPresetIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  _classCallCheck(this, WordWallConfiguration);
  this.enabled = enabled;
  this.presets = presets;
  this.selectedPresetIndex = selectedPresetIndex;
});
var WordWallPresetConfiguration = /*#__PURE__*/_createClass(function WordWallPresetConfiguration() {
  var word_pool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ["PURYFI"];
  var draw_mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var font = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Segoe UI";
  var font_style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "Bold";
  var size = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1.5;
  var horizontal_spacing = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 2;
  var vertical_spacing = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1.5;
  var offset = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 5;
  var angle = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
  var color_mode = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;
  var color = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : "#FFFFFF";
  _classCallCheck(this, WordWallPresetConfiguration);
  this.word_pool = word_pool;
  this.draw_mode = draw_mode;
  this.size = size;
  this.horizontal_spacing = horizontal_spacing;
  this.vertical_spacing = vertical_spacing;
  this.offset = offset;
  this.angle = angle;
  this.color_mode = color_mode;
  this.color = color;
  this.font = font;
  this.font_style = font_style;
});
var RemoteConfiguration = /*#__PURE__*/_createClass(function RemoteConfiguration() {
  var lock = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var send_statistics_data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var remote_token_identifier = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var last_updated = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var last_checked = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var check_mode = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
  var check_period = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 600000;
  var allow_older_settings = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : true;
  var subscriber_username = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : null;
  var subcription_id = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : null;
  _classCallCheck(this, RemoteConfiguration);
  this.lock = lock;
  this.error = null;
  this.remote_token_identifier = remote_token_identifier;
  this.last_updated = last_updated;
  this.last_checked = last_checked;
  this.send_statistics_data = send_statistics_data;
  this.check_mode = check_mode;
  this.check_period = check_period;
  this.allow_older_settings = allow_older_settings;
  this.subscriber_username = subscriber_username;
  this.subscription_id = subcription_id;
});
var OnlyOnceModeConfiguration = /*#__PURE__*/_createClass(function OnlyOnceModeConfiguration() {
  var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 62;
  var width_min = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;
  var height_min = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 50;
  var message = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "This image has been permanently blocked!";
  var date_time_format = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "local";
  var display_classes = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  _classCallCheck(this, OnlyOnceModeConfiguration);
  this.enabled = enabled;
  this.mode = mode;
  this.mode_configuration = {
    0: {},
    1: {
      transparency: 0.02
    },
    2: {
      distance: 0.5,
      radius: 0
    },
    3: {
      blur: 0.0
    },
    4: {
      strength: 0.3,
      color_1: "#000000",
      color_2: "#FFFFFF8C"
    },
    5: {
      blur: 0.05,
      grayscale: false
    },
    6: {
      allow_faces: false
    },
    7: {
      censor_type: 3,
      censor_preset_index: 0
    }
  };
  this.precision = precision;
  this.message = message;
  this.date_time_format = date_time_format;
  this.display_classes = display_classes;
  this.width_min = width_min;
  this.height_min = height_min;
  this.trigger = [];
  for (var i = 0; i < ALL_NON_EXPERIMENTAL_LABELS_COUNT; i++) {
    this.trigger.push(i);
  }
  this.timer = true;
  this.timer_autorefresh = true;
  this.timer_min_duration = 1000 * 10;
  this.timer_max_duration = 1000 * 20;
  this.timer_animation = 1;
});
var OnlyOnceModeTree = /*#__PURE__*/_createClass(function OnlyOnceModeTree() {
  _classCallCheck(this, OnlyOnceModeTree);
  this.tree = {};
  this.count = 0;
});
var OnlyOnceModeStorageManager = /*#__PURE__*/_createClass(function OnlyOnceModeStorageManager() {
  _classCallCheck(this, OnlyOnceModeStorageManager);
  this.trees = [];
});
var LOCK_SALT = 26794318;
var LockConfiguration = /*#__PURE__*/_createClass(function LockConfiguration() {
  _classCallCheck(this, LockConfiguration);
  this.enabled = false;
  this.password_enabled = false;
  this.timer_enabled = false;
  this.password = null;
  this.password_confirmation = null;
  this.duration = 0;
  this.initial_duration = 0;
  this.duration_timestamp = null;
  this.timestamp = null;
  this.token = null;
  this.locked_options = ["settings", "censor_type"];
  this.timer_plus = false;
  this.timer_plus_data = populatePerKlassEntry(function () {
    return 0;
  });
  this.timer_plus_weight_box = false;
  this.timer_plus_weight_box_size = 50000;
  this.timer_mode = 0;
  this.remote_lock = false;
});
function isLockConfigNotValid(lock_configuration) {
  var invalid_config_reason = null;
  if (!lock_configuration.timer_enabled && !lock_configuration.password_enabled) {
    invalid_config_reason = "Either a timer or a password must be enabled!";
  } else {
    if (lock_configuration.password_enabled) {
      if (!lock_configuration.password) {
        invalid_config_reason = "A password must be given!";
      } else if (!lock_configuration.enabled && lock_configuration.password !== lock_configuration.password_confirmation) {
        invalid_config_reason = "The password confirmation must match the password!";
      }
    }
    if (lock_configuration.timer_enabled) {
      if (lock_configuration.initial_duration == null || lock_configuration.initial_duration <= 0) {
        invalid_config_reason = "The timer cannot be set to no duration!";
      }
    }
  }
  return invalid_config_reason;
}
function prepareLockConfigForLocking(lock_configuration) {
  if (!lock_configuration.enabled) {
    lock_configuration.password = hashFnv32a(lock_configuration.password, true, LOCK_SALT);
  }
  lock_configuration.password_confirmation = null;
  lock_configuration.token = generateSecurityToken(lock_configuration.password);
  lock_configuration.duration = lock_configuration.initial_duration;
  lock_configuration.remote_lock = false;
  lock_configuration.timestamp = Date.now();
  lock_configuration.duration_timestamp = Date.now();
  lock_configuration.enabled = true;
  return lock_configuration;
}
function generateSecurityToken(password) {
  var i = performance.now();
  if (password == null) {
    password = i + "";
  }
  return hashFnv32a(password, false, i);
}
var createDefaultCensorTypePreset = {
  0: function _(name) {
    return null;
  },
  1: function _(name) {
    return new CensorPreset(new PixelCensorTypePresetConfig(), name);
  },
  2: function _(name) {
    return new CensorPreset(new BlurCensorTypePresetConfig(2, 0, 1.5, 2), name);
  },
  3: function _(name) {
    return new CensorPreset(new BarCensorTypePresetConfig(), name);
  },
  4: function _(name) {
    return new CensorPreset(new TriangleCensorTypePresetConfig(1, 0, 1.2), name);
  },
  5: function _(name) {
    return new CensorPreset(new BoxCensorTypePresetConfig(), name);
  },
  6: function _(name) {
    return new CensorPreset(new GlitchCensorTypePresetConfig(), name);
  },
  7: function _(name) {
    return new CensorPreset(new StickerCensorTypePresetConfig(), name);
  },
  8: function _(name) {
    return new CensorPreset(new SobelCensorTypePresetConfig(), name);
  },
  9: function _(name) {
    return new CensorPreset(new SplatterCensorTypePresetConfig(), name);
  },
  10: function _(name) {
    return new CensorPreset(new MixedCensorTypePresetConfig(), name);
  },
  11: function _(name) {
    return new CensorPreset(new RandomCensorTypePresetConfig(), name);
  }
};
function extractImgConfig(config, content_type) {
  var img_config = config.png_configuration;
  switch (content_type) {
    case "image/png":
      img_config = config.png_configuration;
      break;
    case "image/jpg":
      img_config = config.jpg_configuration;
      break;
    case "image/jpeg":
      img_config = config.jpg_configuration;
      break;
    case "image/bmp":
      img_config = config.bmp_configuration;
      break;
    case "image/webp":
      img_config = config.webp_configuration;
      break;
    case "image/avif":
      img_config = config.avif_configuration;
      break;
    case "image/gif":
      img_config = config.gif_configuration;
      break;
  }
  return img_config;
}
function checkImageDimensions(conf, width, height) {
  if (width < conf._width_min || conf._width_max > 0 && width > conf._width_max || height < conf._height_min || conf._height_max > 0 && height > conf._height_max) {
    return false;
  }
  return true;
}
function checkImageFileSize(conf, filesize) {
  if (filesize < conf._filesize_min || conf._filesize_max > 0 && filesize > conf._filesize_max) {
    return false;
  }
  return true;
}
function getSavingConfigPatreonTierRequired(config) {
  if (config.saving_configuration.keys.gif_configuration && !config.gif_configuration._thumbnails) {
    return 3;
  }
  if (config.saving_configuration.keys.reverse_mode_configuration && config.reverse_mode_configuration.enabled || config.saving_configuration.keys.only_once_mode_configuration && config.only_once_mode_configuration.enabled) {
    return 2;
  }
  var _iterator5 = config_createForOfIteratorHelper(shape_config_keys),
    _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var key = _step5.value;
      if (config.saving_configuration.keys[key] && config[key].shape === 3) {
        return 1;
      }
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  return null;
}
function getSettingsPatreonTierRequired(settings) {
  if (settings.gif_configuration && !settings.gif_configuration._thumbnails) {
    return 3;
  }
  if (settings.reverse_mode_configuration && settings.reverse_mode_configuration.enabled || settings.only_once_mode_configuration && settings.only_once_mode_configuration.enabled) {
    return 2;
  }
  var _iterator6 = config_createForOfIteratorHelper(shape_config_keys),
    _step6;
  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var key = _step6.value;
      if (settings[key] && settings[key].shape === 3) {
        return 1;
      }
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }
  return null;
}
var LookAndFeelConfiguration = /*#__PURE__*/_createClass(function LookAndFeelConfiguration() {
  _classCallCheck(this, LookAndFeelConfiguration);
  this.main_bg_color = "#0B0E11";
  this.secondary_bg_color = "#151719";
  this.secondary_bg_color_variant_1 = "#2C3135";
  this.secondary_bg_color_variant_2 = "#212428";
  this.secondary_bg_color_variant_3 = "#14161a";
  this.secondary_bg_color_variant_4 = "#15181B";
  this.main_accent_color = "#009879";
  this.main_accent_color_variant_1 = "#017A62";
  this.main_accent_color_variant_2 = "#0B5E50";
  this.main_accent_color_variant_3 = "#213E3A";
  this.main_accent_color_variant_4 = "#4AC193";
  this.main_input_color = "#2C3135";
  this.main_input_color_variant_1 = "#1F2A2D";
  this.main_text_color = "#BBC9DF";
  this.main_text_color_disabled = "#BBC9DF99";
  this.main_text_color_variant_1 = "#EEE";
  this.main_text_color_variant_1_disabled = "#EEEEEE99";
  this.tab_text_color = "#BBC9DF";
  this.header_text_color = "#009879";
  this.main_border_color = "#BBC9DF";
  this.border_color_variant_1 = "#646D78";
  this.border_color_variant_2 = "#3A3F45";
  this.border_color_variant_3 = "#111111";
});
var SavingConfiguration = /*#__PURE__*/_createClass(function SavingConfiguration() {
  _classCallCheck(this, SavingConfiguration);
  this.actions = {
    enable_extension: true,
    lock_extension: false
  };
  this.keys = {
    labels: true,
    censor_type: true,
    file_types: false,
    video_overlay: false,
    prescale: false,
    prefer_edited_corrections: false,
    scan_configuration: false,
    bar_configuration: true,
    blur_configuration: true,
    pixel_configuration: true,
    glitch_configuration: true,
    triangle_configuration: true,
    box_configuration: true,
    sticker_configuration: true,
    sobel_configuration: true,
    splatter_configuration: true,
    mixed_configuration: true,
    random_configuration: true,
    gif_configuration: false,
    png_configuration: false,
    jpg_configuration: false,
    bmp_configuration: false,
    webp_configuration: false,
    avif_configuration: false,
    whiteblacklist_configuration: false,
    only_once_mode_configuration: true,
    clustering_configuration: true,
    caption_configuration: true,
    word_wall_configuration: true,
    reverse_mode_configuration: true,
    icon_configuration: false,
    base64_scanner: false,
    look_and_feel_configuration: false
  };
});
var rnd_rules = {
  scale: {
    min: 1.0,
    max: 1.8,
    average: 1.3
  },
  shape: [0, 1, 2],
  feathering: {
    min: 0,
    max: 50,
    average: 0,
    integer: true
  },
  color: true,
  spacing: {
    min: 0,
    max: 5,
    integer: true
  },
  type: [0, 1, 2],
  strength: {
    min: 3,
    max: 50,
    average: 20,
    integer: true
  },
  channel_colors: {
    min: 1,
    max: 256,
    integer: true
  },
  grayscale: [0, 0, 0, 0, 0, 1],
  blurring: {
    min: 3,
    max: 50,
    average: 20,
    integer: true
  },
  inverted_color: [true, false],
  centering: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  opacity: {
    min: 0.1,
    max: 1,
    average: 0.8
  },
  color_pool: true,
  color_mode: [0, 1],
  amount: [1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 8, 9, 10],
  size: {
    min: 0.5,
    max: 5,
    average: 1
  },
  sub_amount: [1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 10, 11, 11, 12, 12, 13, 13, 14, 15],
  sub_size: {
    min: 0.5,
    max: 5,
    average: 1
  },
  accuracy: {
    min: 0,
    max: 1,
    average: 0.7
  },
  gradients: [true, false, false, false, false, false, false, false, false, false],
  stroke_width: {
    min: 0,
    max: 5,
    average: 0.5
  },
  threshold: {
    min: 0,
    max: 100,
    average: 50,
    integer: true
  },
  vertex_count: {
    min: 500,
    max: 3000,
    average: 1000,
    integer: true
  },
  fill: [1, 1, 1, 1, 1, 0],
  border: [0, 1],
  border_color: true,
  display: [0, 0, 0, 1, 2, 3, 3, 3],
  fill_color_mode: [0, 0, 0, 0, 0, 1],
  stroke_color_mode: [0, 0, 0, 0, 0, 1],
  stroke_color: true,
  fill_color: true
};
function getRandomColor() {
  var transparency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  var alphaHex = "";
  if (transparency) {
    var alpha = Math.floor(Math.random() * 256);
    alphaHex = alpha.toString(16).toUpperCase();
  }
  return color + alphaHex;
}
function randomizeConfigObject(obj) {
  var user = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var _a;
  var randomizedObj = Object.assign({}, obj);
  if (user && user.patreon_tier >= 0) {
    rnd_rules["shape"] = [0, 1, 2, 3];
  }
  for (var key in obj) {
    if (key in rnd_rules) {
      if (key === "color_pool" && rnd_rules[key] === true) {
        var randomColorCount = Math.floor(Math.random() * 5) + 1;
        var colors = [];
        for (var i = 0; i < randomColorCount; i++) {
          colors.push({
            color: getRandomColor(true),
            weight: Math.random() < 0.5 ? 1 : 0
          });
        }
        randomizedObj[key] = colors;
      } else if ((key === "color" || key === "fill_color" || key === "stroke_color" || key === "border_color") && rnd_rules[key] === true) {
        randomizedObj[key] = getRandomColor();
      } else if (Array.isArray(rnd_rules[key])) {
        var randomIndex = Math.floor(Math.random() * rnd_rules[key].length);
        randomizedObj[key] = rnd_rules[key][randomIndex];
      } else if (typeof obj[key] === "number" && Number.isFinite(obj[key])) {
        if (config_typeof(rnd_rules[key]) === "object" && "min" in rnd_rules[key] && "max" in rnd_rules[key]) {
          var min = rnd_rules[key].min;
          var max = rnd_rules[key].max;
          var average = (_a = rnd_rules[key].average) !== null && _a !== void 0 ? _a : null;
          randomizedObj[key] = rnd_rules[key].integer === true ? Math.min(Math.max(Math.floor(weightedRandom(min, max, average)), min), max) : weightedRandom(min, max, average);
        }
      }
    }
  }
  return randomizedObj;
}
function getStickersByGroup(collection, group_names) {
  var stickers = [];
  collection._stickers.forEach(function (sticker) {
    var intersection = sticker.groups.some(function (group_name) {
      return group_names.includes(group_name);
    });
    if (intersection) {
      stickers.push(sticker);
    }
  });
  return stickers;
}
function doesMixedPresetConfigContainType(config, type) {
  return Object.values(config.censor_types).some(function (censor_types_by_layer) {
    return censor_types_by_layer.includes(type);
  });
}
;// ../PuryFi-Core/context/dist/config.browser.js




function compressObj(obj, Message) {
  var buffer = Message.encode(Message.fromObject(obj)).finish();
  var out = lz_string.compressToBase64(window.btoa(String.fromCharCode.apply(null, buffer)));
  return out;
}
function decompressObj(str, Message) {
  var buffer = Uint8Array.from(Array.from(window.atob(lz_string.decompressFromBase64(str))).map(function (l) {
    return l.charCodeAt(0);
  }));
  var out = Message.decode(buffer);
  return out;
}
function tryStoreCaptionConfiguration(caption_configuration, Message) {
  var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var str = compressObj(caption_configuration, Message);
  if (CAPTION_CONFIGURATION_STORAGE_QUOTA * 2 < str.length) {
    return {
      success: false,
      error: "STORAGE_QUOTA_EXCEEDED"
    };
  }
  settings.caption_configuration_0 = str.slice(0, CAPTION_CONFIGURATION_STORAGE_QUOTA);
  settings.caption_configuration_1 = str.slice(CAPTION_CONFIGURATION_STORAGE_QUOTA);
  return {
    success: true,
    settings: settings
  };
}
function storeCaptionConfiguration(caption_configuration, Message) {
  var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var str = compressObj(caption_configuration, Message);
  settings.caption_configuration_0 = str.slice(0, CAPTION_CONFIGURATION_STORAGE_QUOTA);
  settings.caption_configuration_1 = str.slice(CAPTION_CONFIGURATION_STORAGE_QUOTA);
  return settings;
}
function unstoreCaptionConfiguration(settings, Message) {
  var str = settings.caption_configuration_0 + settings.caption_configuration_1;
  return decompressObj(str, Message);
}
function createSetting(config) {
  var setting = {};
  for (var key in config) {
    var key_body = key.replace(/_\d$/, "");
    if (!skip_config_keys.includes(key_body) && config.saving_configuration.keys[key_body]) {
      setting[key] = config[key];
    }
  }
  if (config.saving_configuration.actions.enable_extension) {
    setting.active = true;
  }
  if (config.saving_configuration.actions.lock_extension && !isLockConfigNotValid(config.lock_configuration)) {
    setting.lock_configuration = structuredClone(config.lock_configuration);
    prepareLockConfigForLocking(setting.lock_configuration);
  }
  setting.version = browser.runtime.getManifest().version;
  return setting;
}
function encodeSetting(setting) {
  var v = getVersion();
  var jsonString = JSON.stringify(setting);
  var encoder = new TextEncoder();
  var uint8array = encoder.encode(jsonString);
  var base64String = window.btoa(String.fromCharCode.apply(null, uint8array));
  base64String = crypt(v, base64String);
  return base64String;
}
function getVersion() {
  var v = browser.runtime.getManifest().version;
  if (browser.runtime.getManifest().browser_specific_settings.gecko.id === "pury.fi@pury.fi") {
    v += "B";
  }
  return v;
}
;// ../PuryFi-Core/context/dist/color-util.js
function color_util_slicedToArray(r, e) { return color_util_arrayWithHoles(r) || color_util_iterableToArrayLimit(r, e) || color_util_unsupportedIterableToArray(r, e) || color_util_nonIterableRest(); }
function color_util_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function color_util_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return color_util_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? color_util_arrayLikeToArray(r, a) : void 0; } }
function color_util_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function color_util_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function color_util_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function addHsl(val, diff) {
  var h = val.h,
    s = val.s,
    l = val.l;
  h = (h + diff.h) % 360;
  s = Math.min(100, Math.max(0, s + diff.s));
  l = Math.min(100, Math.max(0, l + diff.l));
  return {
    h: h,
    s: s,
    l: l
  };
}
function addColorInHslSpace(a, b) {
  var result = addHsl(a, b);
  return "hsl(".concat(result.h, ", ").concat(result.s, "%, ").concat(result.l, "%)");
}
function hexToHsl(val) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(val);
  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;
  if (max == min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  var HSL = {
    h: h * 360,
    s: s * 100,
    l: l * 100
  };
  return HSL;
}
function hexaToRgba(val) {
  if (val.length === 7) {
    val = val + "ff";
  }
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(val);
  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);
  var a = parseInt(result[4], 16);
  a /= 255;
  return {
    r: r,
    g: g,
    b: b,
    a: a
  };
}
function calcHslColorDifference(val, other) {
  val = hexToHsl(val);
  other = hexToHsl(other);
  var h = other.s !== 0 && other.l !== 0 && other.l !== 100 ? other.h - val.h : 0;
  var s = other.s - val.s;
  var l = other.l - val.l;
  return {
    h: h,
    s: s,
    l: l
  };
}
function addHslColorDifference(val, diff) {
  var _hexToHsl = hexToHsl(val),
    h = _hexToHsl.h,
    s = _hexToHsl.s,
    l = _hexToHsl.l;
  h = (h + diff.h) % 360;
  s = Math.min(100, Math.max(0, s + diff.s));
  l = Math.min(100, Math.max(0, l + diff.l));
  return "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)");
}
function addHslColorDifferenceToObject(val, diff) {
  var _hexToHsl2 = hexToHsl(val),
    h = _hexToHsl2.h,
    s = _hexToHsl2.s,
    l = _hexToHsl2.l;
  h = (h + diff.h) % 360;
  s = Math.min(100, Math.max(0, s + diff.s));
  l = Math.min(100, Math.max(0, l + diff.l));
  return {
    h: h,
    s: s,
    l: l
  };
}
function hslStringToHslObject(str) {
  var _str$replace$replace$ = str.replace("hsl(", "").replace(")", "").split(",").map(function (x) {
      return parseInt(x);
    }),
    _str$replace$replace$2 = color_util_slicedToArray(_str$replace$replace$, 3),
    h = _str$replace$replace$2[0],
    s = _str$replace$replace$2[1],
    l = _str$replace$replace$2[2];
  return {
    h: h,
    s: s,
    l: l
  };
}
function hslObjectToHslString(obj) {
  return "hsl(".concat(obj.h, ", ").concat(obj.s, "%, ").concat(obj.l, "%)");
}
function isHexColorTransparent(hex) {
  var alpha = hex.substring(7);
  return alpha ? alpha === "00" : false;
}
function isHexColorOpaque(hex) {
  var alpha = hex.substring(7);
  return alpha ? alpha === "FF" : true;
}
function getHexAlpha(hex) {
  var alpha = hex.substring(7);
  return alpha ? parseInt(alpha, 16) / 256 : 1;
}
function toHexAndAlpha(full_color) {
  var color = full_color.slice(0, 7);
  var alpha = parseInt(full_color.slice(7), 16) / 256;
  return [color, isNaN(alpha) ? 1 : alpha];
}
function getIntColor(image_data, x, y) {
  var start = (y * image_data.width + x) * 4;
  return 0x100000000 + (image_data.data[start + 3] << 24) + (image_data.data[start] << 16) + (image_data.data[start + 1] << 8) + image_data.data[start + 2];
}
function setIntColor4(image_data, x, y, alpha, r, g, b) {
  var start = (y * image_data.width + x) * 4;
  image_data.data[start] = r;
  image_data.data[start + 1] = g;
  image_data.data[start + 2] = b;
  image_data.data[start + 3] = alpha;
}
function setIntColor3(image_data, x, y, r, g, b) {
  setIntColor4(image_data, x, y, 255, r, g, b);
}
function setIntColor2(image_data, x, y, alpha, color) {
  var r = (color & 0x00ff0000) >> 16;
  var g = (color & 0x0000ff00) >> 8;
  var b = color & 0x000000ff;
  setIntColor4(image_data, x, y, alpha, r, g, b);
}
function setIntColor1(image_data, x, y, color) {
  var a = (color & 0xff000000) >>> 24;
  var r = (color & 0x00ff0000) >> 16;
  var g = (color & 0x0000ff00) >> 8;
  var b = color & 0x000000ff;
  setIntColor4(image_data, x, y, a, r, g, b);
}
function setIntColor(image_data, x, y, a1, a2, a3, a4) {
  if (a2 == null) {
    setIntColor1(image_data, x, y, a1);
  } else if (a3 == null && a4 == null) {
    setIntColor2(image_data, x, y, a1, a2);
  } else if (a4 == null) {
    setIntColor3(image_data, x, y, a1, a2, a3);
  } else {
    setIntColor4(image_data, x, y, a1, a2, a3, a4);
  }
}
// EXTERNAL MODULE: ../PuryFi-Core/context/node_modules/ts-checker/dist/index.js
var dist = __webpack_require__(309);
;// ../PuryFi-Core/context/dist/config.checker.js
function config_checker_typeof(o) { "@babel/helpers - typeof"; return config_checker_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, config_checker_typeof(o); }

/* harmony default export */ function config_checker() {
  var CensorType = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? "value" : _ref$name;
    var error = "";
    if (value !== "black" && value !== "blur" && value !== "pixel" && value !== "triangle" && value !== "box" && value !== "glitch" && value !== "sticker" && value !== "sobel" && value !== "splatter" && value !== "random" && value !== "mixed") return name + " must be one of \"black\", \"blur\", \"pixel\", \"triangle\", \"box\", \"glitch\", \"sticker\", \"sobel\", \"splatter\", \"random\", or \"mixed\"";
  });
  var CensorShape = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref2$name = _ref2.name,
      name = _ref2$name === void 0 ? "value" : _ref2$name;
    var error = "";
    if (value !== 0 && value !== 1 && value !== 2 && value !== 3 && value !== 4) return name + " must be one of 0, 1, 2, 3, or 4";
  });
  var CensorExtraAssignable = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref3 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref3$name = _ref3.name,
      name = _ref3$name === void 0 ? "value" : _ref3$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    if (typeof value["cluster"] !== "boolean") return name + ".cluster" + " must be a boolean";
    if (typeof value["cluster_preset_index"] !== "number") return name + ".cluster_preset_index" + " must be a number";
    if (typeof value["caption"] !== "boolean") return name + ".caption" + " must be a boolean";
    if (typeof value["caption_preset_index"] !== "number") return name + ".caption_preset_index" + " must be a number";
    if (typeof value["word_wall"] !== "boolean") return name + ".word_wall" + " must be a boolean";
    if (typeof value["word_wall_preset_index"] !== "number") return name + ".word_wall_preset_index" + " must be a number";
  });
  var CensorTypePresetConfig = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref4 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref4$name = _ref4.name,
      name = _ref4$name === void 0 ? "value" : _ref4$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    if (typeof value["scale"] !== "number") return name + ".scale" + " must be a number";
    var otherError = CensorShape._rawCheck(strict, value["shape"], [], {
      name: name + ".shape"
    });
    if (otherError !== undefined) return otherError;
    if (typeof value["feathering"] !== "number") return name + ".feathering" + " must be a number";
  });
  var CensorPresetConfig = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref5 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref5$name = _ref5.name,
      name = _ref5$name === void 0 ? "value" : _ref5$name;
    var error = "";
    var prevError = error;
    var otherError = CensorTypePresetConfig._rawCheck(strict, value, [], {
      name: name
    });
    if (otherError !== undefined) {
      error += otherError;
      var otherError = ClusteringPresetConfiguration._rawCheck(strict, value, [], {
        name: name
      });
      if (otherError !== undefined) {
        error += " or " + otherError;
        var otherError = CaptionPresetConfiguration._rawCheck(strict, value, [], {
          name: name
        });
        if (otherError !== undefined) {
          error += " or " + otherError;
          var otherError = WordWallPresetConfiguration._rawCheck(strict, value, [], {
            name: name
          });
          if (otherError !== undefined) return error + " or " + otherError;else error = prevError;
        } else error = prevError;
      } else error = prevError;
    }
  });
  var CensorPreset = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref6 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref6$name = _ref6.name,
      name = _ref6$name === void 0 ? "value" : _ref6$name;
    var _a;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    var otherError = (_a = generic[0]) === null || _a === void 0 ? void 0 : _a._rawCheck(strict, value["config"], [], {
      name: name + ".config"
    });
    if (otherError !== undefined) return otherError;
    if (typeof value["name"] !== "string") return name + ".name" + " must be a string";
  });
  var CensorTypeConfig = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref7 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref7$name = _ref7.name,
      name = _ref7$name === void 0 ? "value" : _ref7$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    if (typeof value["_name"] !== "string") return name + "._name" + " must be a string";
    if (!Array.isArray(value["presets"])) return name + ".presets" + " must be an array";else for (var i = 0; i < value["presets"].length; i++) {
      var prevError = error;
      var otherError = CensorPreset._rawCheck(strict, value["presets"][i], [generic[0]], {
        name: name + ".presets" + "[" + i + "]"
      });
      if (otherError !== undefined) {
        error += otherError;
        if (value["presets"][i] !== null) return error + " or " + (name + ".presets" + "[" + i + "]") + " must be one of null";else error = prevError;
      }
    }
    if (typeof value["selectedPresetIndex"] !== "number") return name + ".selectedPresetIndex" + " must be a number";
  });
  var StickerCensorTypeConfig = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref8 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref8$name = _ref8.name,
      name = _ref8$name === void 0 ? "value" : _ref8$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    var otherError = CensorTypeConfig._rawCheck(strict, value, [StickerCensorTypePresetConfig], {
      name: name
    });
    if (otherError !== undefined) return otherError;
    if (typeof value["cached"] !== "boolean") return name + ".cached" + " must be a boolean";
  });
  var ShapeCensorTypePresetConfig = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref9 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref9$name = _ref9.name,
      name = _ref9$name === void 0 ? "value" : _ref9$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    var otherError = CensorExtraAssignable._rawCheck(strict, value, [], {
      name: name
    });
    if (otherError !== undefined) return otherError;
    var otherError = CensorShape._rawCheck(strict, value["shape"], [], {
      name: name + ".shape"
    });
    if (otherError !== undefined) return otherError;
    if (typeof value["rounding"] !== "number") return name + ".rounding" + " must be a number";
    if (typeof value["scale"] !== "number") return name + ".scale" + " must be a number";
    if (typeof value["feathering"] !== "number") return name + ".feathering" + " must be a number";
    if (typeof value["border_width"] !== "number") return name + ".border_width" + " must be a number";
    if (typeof value["border_color"] !== "string") return name + ".border_color" + " must be a string";
  });
  var BarType = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref10 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref10$name = _ref10.name,
      name = _ref10$name === void 0 ? "value" : _ref10$name;
    var error = "";
    if (value !== 0 && value !== 1) return name + " must be one of 0 or 1";
  });
  var BarCensorTypePresetConfig = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref11 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref11$name = _ref11.name,
      name = _ref11$name === void 0 ? "value" : _ref11$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    var otherError = CensorTypePresetConfig._rawCheck(strict, value, [], {
      name: name
    });
    if (otherError !== undefined) return otherError;
    if (typeof value["rounding"] !== "number") return name + ".rounding" + " must be a number";
    if (typeof value["border_width"] !== "number") return name + ".border_width" + " must be a number";
    if (typeof value["border_color"] !== "string") return name + ".border_color" + " must be a string";
    var otherError = BarType._rawCheck(strict, value["ty"], [], {
      name: name + ".ty"
    });
    if (otherError !== undefined) return otherError;
    if (typeof value["color"] !== "string") return name + ".color" + " must be a string";
    if (typeof value["opacity"] !== "number") return name + ".opacity" + " must be a number";
    if (typeof value["cluster"] !== "boolean") return name + ".cluster" + " must be a boolean";
    if (typeof value["cluster_preset_index"] !== "number") return name + ".cluster_preset_index" + " must be a number";
    if (typeof value["caption"] !== "boolean") return name + ".caption" + " must be a boolean";
    if (typeof value["caption_preset_index"] !== "number") return name + ".caption_preset_index" + " must be a number";
    if (typeof value["word_wall"] !== "boolean") return name + ".word_wall" + " must be a boolean";
    if (typeof value["word_wall_preset_index"] !== "number") return name + ".word_wall_preset_index" + " must be a number";
  });
  var PixelType = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref12 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref12$name = _ref12.name,
      name = _ref12$name === void 0 ? "value" : _ref12$name;
    var error = "";
    if (value !== 0 && value !== 1 && value !== 2 && value !== 3) return name + " must be one of 0, 1, 2, or 3";
  });
  var PixelCensorTypePresetConfig = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref13 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref13$name = _ref13.name,
      name = _ref13$name === void 0 ? "value" : _ref13$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    var otherError = CensorTypePresetConfig._rawCheck(strict, value, [], {
      name: name
    });
    if (otherError !== undefined) return otherError;
    if (typeof value["rounding"] !== "number") return name + ".rounding" + " must be a number";
    if (typeof value["border_width"] !== "number") return name + ".border_width" + " must be a number";
    if (typeof value["border_color"] !== "string") return name + ".border_color" + " must be a string";
    if (typeof value["channel_colors"] !== "number") return name + ".channel_colors" + " must be a number";
    var otherError = PixelType._rawCheck(strict, value["ty"], [], {
      name: name + ".ty"
    });
    if (otherError !== undefined) return otherError;
    if (typeof value["scale_with_detection"] !== "boolean") return name + ".scale_with_detection" + " must be a boolean";
    if (typeof value["strength"] !== "number") return name + ".strength" + " must be a number";
    if (typeof value["grayscale"] !== "boolean") return name + ".grayscale" + " must be a boolean";
    if (typeof value["accurate_sampling"] !== "boolean") return name + ".accurate_sampling" + " must be a boolean";
    if (typeof value["grid_width"] !== "number") return name + ".grid_width" + " must be a number";
    if (typeof value["grid_color"] !== "string") return name + ".grid_color" + " must be a string";
    if (typeof value["density"] !== "number") return name + ".density" + " must be a number";
    if (typeof value["color"] !== "string") return name + ".color" + " must be a string";
    if (typeof value["bg_color"] !== "string") return name + ".bg_color" + " must be a string";
    if (typeof value["color_mode"] !== "number") return name + ".color_mode" + " must be a number";
    if (typeof value["cluster"] !== "boolean") return name + ".cluster" + " must be a boolean";
    if (typeof value["cluster_preset_index"] !== "number") return name + ".cluster_preset_index" + " must be a number";
    if (typeof value["caption"] !== "boolean") return name + ".caption" + " must be a boolean";
    if (typeof value["caption_preset_index"] !== "number") return name + ".caption_preset_index" + " must be a number";
    if (typeof value["word_wall"] !== "boolean") return name + ".word_wall" + " must be a boolean";
    if (typeof value["word_wall_preset_index"] !== "number") return name + ".word_wall_preset_index" + " must be a number";
  });
  var BlurType = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref14 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref14$name = _ref14.name,
      name = _ref14$name === void 0 ? "value" : _ref14$name;
    var error = "";
    if (value !== 0 && value !== 1) return name + " must be one of 0 or 1";
  });
  var BlurCensorTypePresetConfig = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref15 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref15$name = _ref15.name,
      name = _ref15$name === void 0 ? "value" : _ref15$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    var otherError = CensorTypePresetConfig._rawCheck(strict, value, [], {
      name: name
    });
    if (otherError !== undefined) return otherError;
    if (typeof value["rounding"] !== "number") return name + ".rounding" + " must be a number";
    if (typeof value["border_width"] !== "number") return name + ".border_width" + " must be a number";
    if (typeof value["border_color"] !== "string") return name + ".border_color" + " must be a string";
    var otherError = BlurType._rawCheck(strict, value["ty"], [], {
      name: name + ".ty"
    });
    if (otherError !== undefined) return otherError;
    if (typeof value["strength"] !== "number") return name + ".strength" + " must be a number";
    if (typeof value["grayscale"] !== "boolean") return name + ".grayscale" + " must be a boolean";
    if (typeof value["cluster"] !== "boolean") return name + ".cluster" + " must be a boolean";
    if (typeof value["cluster_preset_index"] !== "number") return name + ".cluster_preset_index" + " must be a number";
    if (typeof value["caption"] !== "boolean") return name + ".caption" + " must be a boolean";
    if (typeof value["caption_preset_index"] !== "number") return name + ".caption_preset_index" + " must be a number";
    if (typeof value["word_wall"] !== "boolean") return name + ".word_wall" + " must be a boolean";
    if (typeof value["word_wall_preset_index"] !== "number") return name + ".word_wall_preset_index" + " must be a number";
  });
  var TriangleCensorTypePresetConfig = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref16 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref16$name = _ref16.name,
      name = _ref16$name === void 0 ? "value" : _ref16$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    var otherError = CensorTypePresetConfig._rawCheck(strict, value, [], {
      name: name
    });
    if (otherError !== undefined) return otherError;
    if (typeof value["rounding"] !== "number") return name + ".rounding" + " must be a number";
    if (typeof value["border_width"] !== "number") return name + ".border_width" + " must be a number";
    if (typeof value["border_color"] !== "string") return name + ".border_color" + " must be a string";
    if (typeof value["accuracy"] !== "number") return name + ".accuracy" + " must be a number";
    if (typeof value["blurring"] !== "number") return name + ".blurring" + " must be a number";
    if (typeof value["threshold"] !== "number") return name + ".threshold" + " must be a number";
    if (typeof value["vertex_count"] !== "number") return name + ".vertex_count" + " must be a number";
    if (typeof value["fill_color_mode"] !== "number") return name + ".fill_color_mode" + " must be a number";
    if (typeof value["fill_color"] !== "string") return name + ".fill_color" + " must be a string";
    if (typeof value["stroke_color_mode"] !== "number") return name + ".stroke_color_mode" + " must be a number";
    if (typeof value["stroke_color"] !== "string") return name + ".stroke_color" + " must be a string";
    if (typeof value["stroke_width"] !== "number") return name + ".stroke_width" + " must be a number";
    if (typeof value["gradients"] !== "boolean") return name + ".gradients" + " must be a boolean";
    if (typeof value["gradient_stops"] !== "number") return name + ".gradient_stops" + " must be a number";
    if (typeof value["line_join"] !== "number") return name + ".line_join" + " must be a number";
    if (typeof value["transparent_color"] !== "boolean") return name + ".transparent_color" + " must be a boolean";
    if (typeof value["cluster"] !== "boolean") return name + ".cluster" + " must be a boolean";
    if (typeof value["cluster_preset_index"] !== "number") return name + ".cluster_preset_index" + " must be a number";
    if (typeof value["caption"] !== "boolean") return name + ".caption" + " must be a boolean";
    if (typeof value["caption_preset_index"] !== "number") return name + ".caption_preset_index" + " must be a number";
    if (typeof value["word_wall"] !== "boolean") return name + ".word_wall" + " must be a boolean";
    if (typeof value["word_wall_preset_index"] !== "number") return name + ".word_wall_preset_index" + " must be a number";
  });
  var BoxCensorTypePresetConfig = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref17 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref17$name = _ref17.name,
      name = _ref17$name === void 0 ? "value" : _ref17$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    var otherError = CensorTypePresetConfig._rawCheck(strict, value, [], {
      name: name
    });
    if (otherError !== undefined) return otherError;
    if (typeof value["display"] !== "number") return name + ".display" + " must be a number";
    if (typeof value["fill_color"] !== "string") return name + ".fill_color" + " must be a string";
    if (typeof value["border_color"] !== "string") return name + ".border_color" + " must be a string";
    if (typeof value["cluster"] !== "boolean") return name + ".cluster" + " must be a boolean";
    if (typeof value["cluster_preset_index"] !== "number") return name + ".cluster_preset_index" + " must be a number";
    if (typeof value["caption"] !== "boolean") return name + ".caption" + " must be a boolean";
    if (typeof value["caption_preset_index"] !== "number") return name + ".caption_preset_index" + " must be a number";
    if (typeof value["word_wall"] !== "boolean") return name + ".word_wall" + " must be a boolean";
    if (typeof value["word_wall_preset_index"] !== "number") return name + ".word_wall_preset_index" + " must be a number";
  });
  var GlitchCensorTypePresetConfig = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref18 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref18$name = _ref18.name,
      name = _ref18$name === void 0 ? "value" : _ref18$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    var otherError = CensorTypePresetConfig._rawCheck(strict, value, [], {
      name: name
    });
    if (otherError !== undefined) return otherError;
    if (typeof value["ty"] !== "number") return name + ".ty" + " must be a number";
    if (typeof value["chromatic_aberration_shift_intensity"] !== "number") return name + ".chromatic_aberration_shift_intensity" + " must be a number";
    if (typeof value["chromatic_aberration_color_intensity"] !== "number") return name + ".chromatic_aberration_color_intensity" + " must be a number";
    if (typeof value["chromatic_aberration_vertical_shift"] !== "boolean") return name + ".chromatic_aberration_vertical_shift" + " must be a boolean";
    if (typeof value["chromatic_aberration_horizontal_shift"] !== "boolean") return name + ".chromatic_aberration_horizontal_shift" + " must be a boolean";
    if (typeof value["multiple_panels_amount"] !== "number") return name + ".multiple_panels_amount" + " must be a number";
    if (typeof value["multiple_panels_min_size"] !== "number") return name + ".multiple_panels_min_size" + " must be a number";
    if (typeof value["multiple_panels_max_size"] !== "number") return name + ".multiple_panels_max_size" + " must be a number";
    if (typeof value["multiple_panels_scatter"] !== "number") return name + ".multiple_panels_scatter" + " must be a number";
    if (typeof value["multiple_panels_split_chance"] !== "number") return name + ".multiple_panels_split_chance" + " must be a number";
    if (!Array.isArray(value["multiple_panels_gradient"])) return name + ".multiple_panels_gradient" + " must be an array";else for (var i = 0; i < value["multiple_panels_gradient"].length; i++) {
      if (value["multiple_panels_gradient"][i] == null || config_checker_typeof(value["multiple_panels_gradient"][i]) !== "object") return name + ".multiple_panels_gradient" + "[" + i + "]" + " must be an object";else {
        if (typeof value["multiple_panels_gradient"][i]["color"] !== "string") return name + ".multiple_panels_gradient" + "[" + i + "]" + ".color" + " must be a string";
        if (typeof value["multiple_panels_gradient"][i]["offset"] !== "number") return name + ".multiple_panels_gradient" + "[" + i + "]" + ".offset" + " must be a number";
      }
    }
    if (typeof value["multiple_panels_border"] !== "boolean") return name + ".multiple_panels_border" + " must be a boolean";
    if (typeof value["cluster"] !== "boolean") return name + ".cluster" + " must be a boolean";
    if (typeof value["cluster_preset_index"] !== "number") return name + ".cluster_preset_index" + " must be a number";
    if (typeof value["caption"] !== "boolean") return name + ".caption" + " must be a boolean";
    if (typeof value["caption_preset_index"] !== "number") return name + ".caption_preset_index" + " must be a number";
    if (typeof value["word_wall"] !== "boolean") return name + ".word_wall" + " must be a boolean";
    if (typeof value["word_wall_preset_index"] !== "number") return name + ".word_wall_preset_index" + " must be a number";
  });
  var StickerCensorTypePresetConfig = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref19 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref19$name = _ref19.name,
      name = _ref19$name === void 0 ? "value" : _ref19$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    var otherError = CensorTypePresetConfig._rawCheck(strict, value, [], {
      name: name
    });
    if (otherError !== undefined) return otherError;
    if (typeof value["draw_mode"] !== "number") return name + ".draw_mode" + " must be a number";
    if (typeof value["sample_single_source"] !== "boolean") return name + ".sample_single_source" + " must be a boolean";
    if (!Array.isArray(value["enabled_sources"])) return name + ".enabled_sources" + " must be an array";else for (var i = 0; i < value["enabled_sources"].length; i++) {
      if (typeof value["enabled_sources"][i] !== "string") return name + ".enabled_sources" + "[" + i + "]" + " must be a string";
    }
    if (typeof value["cluster"] !== "boolean") return name + ".cluster" + " must be a boolean";
    if (typeof value["cluster_preset_index"] !== "number") return name + ".cluster_preset_index" + " must be a number";
    if (typeof value["caption"] !== "boolean") return name + ".caption" + " must be a boolean";
    if (typeof value["caption_preset_index"] !== "number") return name + ".caption_preset_index" + " must be a number";
    if (typeof value["word_wall"] !== "boolean") return name + ".word_wall" + " must be a boolean";
    if (typeof value["word_wall_preset_index"] !== "number") return name + ".word_wall_preset_index" + " must be a number";
  });
  var SobelCensorTypePresetConfig = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref20 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref20$name = _ref20.name,
      name = _ref20$name === void 0 ? "value" : _ref20$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    var otherError = CensorTypePresetConfig._rawCheck(strict, value, [], {
      name: name
    });
    if (otherError !== undefined) return otherError;
    if (typeof value["rounding"] !== "number") return name + ".rounding" + " must be a number";
    if (typeof value["border_width"] !== "number") return name + ".border_width" + " must be a number";
    if (typeof value["border_color"] !== "string") return name + ".border_color" + " must be a string";
    if (typeof value["inverted_color"] !== "boolean") return name + ".inverted_color" + " must be a boolean";
    if (typeof value["cluster"] !== "boolean") return name + ".cluster" + " must be a boolean";
    if (typeof value["cluster_preset_index"] !== "number") return name + ".cluster_preset_index" + " must be a number";
    if (typeof value["caption"] !== "boolean") return name + ".caption" + " must be a boolean";
    if (typeof value["caption_preset_index"] !== "number") return name + ".caption_preset_index" + " must be a number";
    if (typeof value["word_wall"] !== "boolean") return name + ".word_wall" + " must be a boolean";
    if (typeof value["word_wall_preset_index"] !== "number") return name + ".word_wall_preset_index" + " must be a number";
  });
  var SplatterCensorTypePresetConfig = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref21 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref21$name = _ref21.name,
      name = _ref21$name === void 0 ? "value" : _ref21$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    var otherError = CensorTypePresetConfig._rawCheck(strict, value, [], {
      name: name
    });
    if (otherError !== undefined) return otherError;
    if (typeof value["color_mode"] !== "number") return name + ".color_mode" + " must be a number";
    if (typeof value["opacity"] !== "number") return name + ".opacity" + " must be a number";
    if (!Array.isArray(value["color_pool"])) return name + ".color_pool" + " must be an array";else for (var i = 0; i < value["color_pool"].length; i++) {
      if (value["color_pool"][i] == null || config_checker_typeof(value["color_pool"][i]) !== "object") return name + ".color_pool" + "[" + i + "]" + " must be an object";else {
        if (typeof value["color_pool"][i]["color"] !== "string") return name + ".color_pool" + "[" + i + "]" + ".color" + " must be a string";
        if (typeof value["color_pool"][i]["weight"] !== "number") return name + ".color_pool" + "[" + i + "]" + ".weight" + " must be a number";
      }
    }
    if (typeof value["centering"] !== "number") return name + ".centering" + " must be a number";
    if (typeof value["size"] !== "number") return name + ".size" + " must be a number";
    if (typeof value["amount"] !== "number") return name + ".amount" + " must be a number";
    if (typeof value["sub_size"] !== "number") return name + ".sub_size" + " must be a number";
    if (typeof value["sub_amount"] !== "number") return name + ".sub_amount" + " must be a number";
    if (typeof value["recursions"] !== "number") return name + ".recursions" + " must be a number";
    if (typeof value["cluster"] !== "boolean") return name + ".cluster" + " must be a boolean";
    if (typeof value["cluster_preset_index"] !== "number") return name + ".cluster_preset_index" + " must be a number";
    if (typeof value["caption"] !== "boolean") return name + ".caption" + " must be a boolean";
    if (typeof value["caption_preset_index"] !== "number") return name + ".caption_preset_index" + " must be a number";
    if (typeof value["word_wall"] !== "boolean") return name + ".word_wall" + " must be a boolean";
    if (typeof value["word_wall_preset_index"] !== "number") return name + ".word_wall_preset_index" + " must be a number";
  });
  var MixedCensorTypePresetConfig = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref22 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref22$name = _ref22.name,
      name = _ref22$name === void 0 ? "value" : _ref22$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    var otherError = CensorTypePresetConfig._rawCheck(strict, value, [], {
      name: name
    });
    if (otherError !== undefined) return otherError;
    if (!Array.isArray(value["reverse_censor_types"])) return name + ".reverse_censor_types" + " must be an array";else {
      var prevError = error;
      if (typeof value["reverse_censor_types"]["0"] !== "number") {
        error += name + ".reverse_censor_types" + "[0]" + " must be a number";
        if (value["reverse_censor_types"]["0"] !== null) return error + " or " + (name + ".reverse_censor_types" + "[0]") + " must be one of null";else error = prevError;
      }
      var prevError = error;
      if (typeof value["reverse_censor_types"]["1"] !== "number") {
        error += name + ".reverse_censor_types" + "[1]" + " must be a number";
        if (value["reverse_censor_types"]["1"] !== null) return error + " or " + (name + ".reverse_censor_types" + "[1]") + " must be one of null";else error = prevError;
      }
      var prevError = error;
      if (typeof value["reverse_censor_types"]["2"] !== "number") {
        error += name + ".reverse_censor_types" + "[2]" + " must be a number";
        if (value["reverse_censor_types"]["2"] !== null) return error + " or " + (name + ".reverse_censor_types" + "[2]") + " must be one of null";else error = prevError;
      }
    }
    if (!Array.isArray(value["reverse_censor_preset_indexes"])) return name + ".reverse_censor_preset_indexes" + " must be an array";else {
      var prevError = error;
      if (typeof value["reverse_censor_preset_indexes"]["0"] !== "number") {
        error += name + ".reverse_censor_preset_indexes" + "[0]" + " must be a number";
        if (value["reverse_censor_preset_indexes"]["0"] !== null) return error + " or " + (name + ".reverse_censor_preset_indexes" + "[0]") + " must be one of null";else error = prevError;
      }
      var prevError = error;
      if (typeof value["reverse_censor_preset_indexes"]["1"] !== "number") {
        error += name + ".reverse_censor_preset_indexes" + "[1]" + " must be a number";
        if (value["reverse_censor_preset_indexes"]["1"] !== null) return error + " or " + (name + ".reverse_censor_preset_indexes" + "[1]") + " must be one of null";else error = prevError;
      }
      var prevError = error;
      if (typeof value["reverse_censor_preset_indexes"]["2"] !== "number") {
        error += name + ".reverse_censor_preset_indexes" + "[2]" + " must be a number";
        if (value["reverse_censor_preset_indexes"]["2"] !== null) return error + " or " + (name + ".reverse_censor_preset_indexes" + "[2]") + " must be one of null";else error = prevError;
      }
    }
  });
  var RandomMode = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref23 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref23$name = _ref23.name,
      name = _ref23$name === void 0 ? "value" : _ref23$name;
    var error = "";
    if (value !== 0 && value !== 1) return name + " must be one of 0 or 1";
  });
  var RandomCensorTypePresetConfig = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref24 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref24$name = _ref24.name,
      name = _ref24$name === void 0 ? "value" : _ref24$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    var otherError = CensorTypePresetConfig._rawCheck(strict, value, [], {
      name: name
    });
    if (otherError !== undefined) return otherError;
    if (typeof value["mode"] !== "number") return name + ".mode" + " must be a number";
    if (value["censor_weights"] == null || config_checker_typeof(value["censor_weights"]) !== "object") return name + ".censor_weights" + " must be an object";else {
      if (typeof value["censor_weights"]["0"] !== "number") return name + ".censor_weights" + ".0" + " must be a number";
      if (typeof value["censor_weights"]["1"] !== "number") return name + ".censor_weights" + ".1" + " must be a number";
      if (typeof value["censor_weights"]["2"] !== "number") return name + ".censor_weights" + ".2" + " must be a number";
      if (typeof value["censor_weights"]["3"] !== "number") return name + ".censor_weights" + ".3" + " must be a number";
      if (typeof value["censor_weights"]["4"] !== "number") return name + ".censor_weights" + ".4" + " must be a number";
      if (typeof value["censor_weights"]["5"] !== "number") return name + ".censor_weights" + ".5" + " must be a number";
      if (typeof value["censor_weights"]["6"] !== "number") return name + ".censor_weights" + ".6" + " must be a number";
      if (typeof value["censor_weights"]["7"] !== "number") return name + ".censor_weights" + ".7" + " must be a number";
      if (typeof value["censor_weights"]["8"] !== "number") return name + ".censor_weights" + ".8" + " must be a number";
      if (typeof value["censor_weights"]["9"] !== "number") return name + ".censor_weights" + ".9" + " must be a number";
      if (typeof value["censor_weights"]["10"] !== "number") return name + ".censor_weights" + ".10" + " must be a number";
    }
  });
  var FileTypeConfiguration = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref25 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref25$name = _ref25.name,
      name = _ref25$name === void 0 ? "value" : _ref25$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    if (typeof value["_file_output_type"] !== "string") return name + "._file_output_type" + " must be a string";
    if (typeof value["_name"] !== "string") return name + "._name" + " must be a string";
    if (typeof value["_filesize_min"] !== "number") return name + "._filesize_min" + " must be a number";
    if (typeof value["_filesize_max"] !== "number") return name + "._filesize_max" + " must be a number";
    if (typeof value["_width_min"] !== "number") return name + "._width_min" + " must be a number";
    if (typeof value["_width_max"] !== "number") return name + "._width_max" + " must be a number";
    if (typeof value["_height_min"] !== "number") return name + "._height_min" + " must be a number";
    if (typeof value["_height_max"] !== "number") return name + "._height_max" + " must be a number";
  });
  var PNGTypeConfiguration = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref26 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref26$name = _ref26.name,
      name = _ref26$name === void 0 ? "value" : _ref26$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    var otherError = FileTypeConfiguration._rawCheck(strict, value, [], {
      name: name
    });
    if (otherError !== undefined) return otherError;
  });
  var JPGTypeConfiguration = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref27 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref27$name = _ref27.name,
      name = _ref27$name === void 0 ? "value" : _ref27$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    var otherError = FileTypeConfiguration._rawCheck(strict, value, [], {
      name: name
    });
    if (otherError !== undefined) return otherError;
  });
  var BMPTypeConfiguration = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref28 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref28$name = _ref28.name,
      name = _ref28$name === void 0 ? "value" : _ref28$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    var otherError = FileTypeConfiguration._rawCheck(strict, value, [], {
      name: name
    });
    if (otherError !== undefined) return otherError;
  });
  var WEBPTypeConfiguration = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref29 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref29$name = _ref29.name,
      name = _ref29$name === void 0 ? "value" : _ref29$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    var otherError = FileTypeConfiguration._rawCheck(strict, value, [], {
      name: name
    });
    if (otherError !== undefined) return otherError;
  });
  var AVIFTypeConfiguration = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref30 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref30$name = _ref30.name,
      name = _ref30$name === void 0 ? "value" : _ref30$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    var otherError = FileTypeConfiguration._rawCheck(strict, value, [], {
      name: name
    });
    if (otherError !== undefined) return otherError;
  });
  var GIFTypeConfiguration = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref31 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref31$name = _ref31.name,
      name = _ref31$name === void 0 ? "value" : _ref31$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    var otherError = FileTypeConfiguration._rawCheck(strict, value, [], {
      name: name
    });
    if (otherError !== undefined) return otherError;
    if (typeof value["_frame_count_max"] !== "number") return name + "._frame_count_max" + " must be a number";
    if (false) {}
    if (false) {}
    if (false) {}
  });
  var VideoMode = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref32 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref32$name = _ref32.name,
      name = _ref32$name === void 0 ? "value" : _ref32$name;
    var error = "";
    if (value !== 0 && value !== 1) return name + " must be one of 0 or 1";
  });
  var VideoOverlayProcessingMode = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref33 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref33$name = _ref33.name,
      name = _ref33$name === void 0 ? "value" : _ref33$name;
    var error = "";
    if (value !== 0 && value !== 1) return name + " must be one of 0 or 1";
  });
  var VideoInactivityTimeout = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref34 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref34$name = _ref34.name,
      name = _ref34$name === void 0 ? "value" : _ref34$name;
    var error = "";
    if (value !== 0 && value !== 1 && value !== 2 && value !== 3 && value !== 4 && value !== 5 && value !== 6 && value !== 7 && value !== 8 && value !== 9 && value !== 10) return name + " must be one of 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, or 10";
  });
  var VideoConfiguration = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref35 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref35$name = _ref35.name,
      name = _ref35$name === void 0 ? "value" : _ref35$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    var otherError = VideoMode._rawCheck(strict, value["mode"], [], {
      name: name + ".mode"
    });
    if (otherError !== undefined) return otherError;
    var otherError = VideoOverlayProcessingMode._rawCheck(strict, value["overlay_processing_mode"], [], {
      name: name + ".overlay_processing_mode"
    });
    if (otherError !== undefined) return otherError;
    if (typeof value["overlay_fps_ms_limit"] !== "number") return name + ".overlay_fps_ms_limit" + " must be a number";
    if (typeof value["overlay_gif_exporting_max_resolution"] !== "number") return name + ".overlay_gif_exporting_max_resolution" + " must be a number";
    if (typeof value["overlay_gif_exporting_cache_size"] !== "number") return name + ".overlay_gif_exporting_cache_size" + " must be a number";
    if (typeof value["file_processor_max_fps"] !== "number") return name + ".file_processor_max_fps" + " must be a number";
    if (typeof value["file_processor_max_resolution"] !== "number") return name + ".file_processor_max_resolution" + " must be a number";
    if (typeof value["file_processor_quality"] !== "number") return name + ".file_processor_quality" + " must be a number";
    if (typeof value["file_processor_threads"] !== "number") return name + ".file_processor_threads" + " must be a number";
    var otherError = VideoInactivityTimeout._rawCheck(strict, value["file_processor_inactivity_timeout"], [], {
      name: name + ".file_processor_inactivity_timeout"
    });
    if (otherError !== undefined) return otherError;
  });
  var ScanConfiguration = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref36 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref36$name = _ref36.name,
      name = _ref36$name === void 0 ? "value" : _ref36$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    if (typeof value["warmUp"] !== "boolean") return name + ".warmUp" + " must be a boolean";
    if (typeof value["downscaleInput"] !== "boolean") return name + ".downscaleInput" + " must be a boolean";
    if (typeof value["preferEditedDetections"] !== "boolean") return name + ".preferEditedDetections" + " must be a boolean";
    if (typeof value["interpolate"] !== "boolean") return name + ".interpolate" + " must be a boolean";
    if (typeof value["scanRate"] !== "number") return name + ".scanRate" + " must be a number";
    if (typeof value["confidence"] !== "number") return name + ".confidence" + " must be a number";
    if (typeof value["extraInterpolation"] !== "number") return name + ".extraInterpolation" + " must be a number";
  });
  var WhiteBlackListConfiguration = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref37 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref37$name = _ref37.name,
      name = _ref37$name === void 0 ? "value" : _ref37$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    if (typeof value["mode"] !== "number") return name + ".mode" + " must be a number";
    if (!Array.isArray(value["white_list"])) return name + ".white_list" + " must be an array";else for (var i = 0; i < value["white_list"].length; i++) {
      if (value["white_list"][i] == null || config_checker_typeof(value["white_list"][i]) !== "object") return name + ".white_list" + "[" + i + "]" + " must be an object";else {
        if (typeof value["white_list"][i]["mode"] !== "number") return name + ".white_list" + "[" + i + "]" + ".mode" + " must be a number";
        if (typeof value["white_list"][i]["value"] !== "string") return name + ".white_list" + "[" + i + "]" + ".value" + " must be a string";
      }
    }
    if (!Array.isArray(value["black_list"])) return name + ".black_list" + " must be an array";else for (var i = 0; i < value["black_list"].length; i++) {
      if (value["black_list"][i] == null || config_checker_typeof(value["black_list"][i]) !== "object") return name + ".black_list" + "[" + i + "]" + " must be an object";else {
        if (typeof value["black_list"][i]["mode"] !== "number") return name + ".black_list" + "[" + i + "]" + ".mode" + " must be a number";
        if (typeof value["black_list"][i]["value"] !== "string") return name + ".black_list" + "[" + i + "]" + ".value" + " must be a string";
      }
    }
  });
  var ReverseModeConfiguration = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref38 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref38$name = _ref38.name,
      name = _ref38$name === void 0 ? "value" : _ref38$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    if (false) {}
    if (false) {}
  });
  var ClusteringConfiguration = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref39 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref39$name = _ref39.name,
      name = _ref39$name === void 0 ? "value" : _ref39$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    if (typeof value["enabled"] !== "boolean") return name + ".enabled" + " must be a boolean";
    if (!Array.isArray(value["presets"])) return name + ".presets" + " must be an array";else for (var i = 0; i < value["presets"].length; i++) {
      var prevError = error;
      var otherError = CensorPreset._rawCheck(strict, value["presets"][i], [ClusteringPresetConfiguration], {
        name: name + ".presets" + "[" + i + "]"
      });
      if (otherError !== undefined) {
        error += otherError;
        if (value["presets"][i] !== null) return error + " or " + (name + ".presets" + "[" + i + "]") + " must be one of null";else error = prevError;
      }
    }
    if (typeof value["selectedPresetIndex"] !== "number") return name + ".selectedPresetIndex" + " must be a number";
  });
  var ClusteringPresetConfiguration = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref40 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref40$name = _ref40.name,
      name = _ref40$name === void 0 ? "value" : _ref40$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    if (typeof value["max_distance"] !== "number") return name + ".max_distance" + " must be a number";
    if (typeof value["only_matching_content"] !== "boolean") return name + ".only_matching_content" + " must be a boolean";
    if (typeof value["rotation"] !== "boolean") return name + ".rotation" + " must be a boolean";
  });
  var CaptionConfiguration = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref41 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref41$name = _ref41.name,
      name = _ref41$name === void 0 ? "value" : _ref41$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    if (typeof value["enabled"] !== "boolean") return name + ".enabled" + " must be a boolean";
    if (!Array.isArray(value["presets"])) return name + ".presets" + " must be an array";else for (var i = 0; i < value["presets"].length; i++) {
      var prevError = error;
      var otherError = CensorPreset._rawCheck(strict, value["presets"][i], [CaptionPresetConfiguration], {
        name: name + ".presets" + "[" + i + "]"
      });
      if (otherError !== undefined) {
        error += otherError;
        if (value["presets"][i] !== null) return error + " or " + (name + ".presets" + "[" + i + "]") + " must be one of null";else error = prevError;
      }
    }
    if (typeof value["selectedPresetIndex"] !== "number") return name + ".selectedPresetIndex" + " must be a number";
  });
  var CaptionEntry = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref42 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref42$name = _ref42.name,
      name = _ref42$name === void 0 ? "value" : _ref42$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    if (typeof value["value"] !== "string") return name + ".value" + " must be a string";
    if (false) {}
    if (typeof value["chance"] !== "number") return name + ".chance" + " must be a number";
    if (!Array.isArray(value["tags"])) return name + ".tags" + " must be an array";else for (var i = 0; i < value["tags"].length; i++) {
      if (false) {}
    }
  });
  var CaptionTag = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref43 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref43$name = _ref43.name,
      name = _ref43$name === void 0 ? "value" : _ref43$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    if (typeof value["name"] !== "string") return name + ".name" + " must be a string";
    if (typeof value["color"] !== "string") return name + ".color" + " must be a string";
  });
  var CaptionPresetConfiguration = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref44 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref44$name = _ref44.name,
      name = _ref44$name === void 0 ? "value" : _ref44$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    if (value["tags"] == null || config_checker_typeof(value["tags"]) !== "object") return name + ".tags" + " must be an object";else {
      for (var key in value["tags"]) {
        if (typeof key === "string") {
          var otherError = CaptionTag._rawCheck(strict, value["tags"][key], [], {
            name: name + ".tags" + "." + key
          });
          if (otherError !== undefined) return otherError;
        }
      }
    }
    if (value["entries"] == null || config_checker_typeof(value["entries"]) !== "object") return name + ".entries" + " must be an object";else {
      for (var key in value["entries"]) {
        if (typeof key === "string") {
          var otherError = CaptionEntry._rawCheck(strict, value["entries"][key], [], {
            name: name + ".entries" + "." + key
          });
          if (otherError !== undefined) return otherError;
        }
      }
    }
    if (typeof value["mode"] !== "number") return name + ".mode" + " must be a number";
    if (typeof value["color"] !== "string") return name + ".color" + " must be a string";
    if (typeof value["font"] !== "string") return name + ".font" + " must be a string";
    if (typeof value["fontStyle"] !== "string") return name + ".fontStyle" + " must be a string";
    if (typeof value["shadowSize"] !== "number") return name + ".shadowSize" + " must be a number";
    if (typeof value["shadowColor"] !== "string") return name + ".shadowColor" + " must be a string";
    if (typeof value["lineHeight"] !== "number") return name + ".lineHeight" + " must be a number";
    if (typeof value["padding"] !== "number") return name + ".padding" + " must be a number";
  });
  var WordWallConfiguration = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref45 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref45$name = _ref45.name,
      name = _ref45$name === void 0 ? "value" : _ref45$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    if (typeof value["enabled"] !== "boolean") return name + ".enabled" + " must be a boolean";
    if (!Array.isArray(value["presets"])) return name + ".presets" + " must be an array";else for (var i = 0; i < value["presets"].length; i++) {
      var prevError = error;
      var otherError = CensorPreset._rawCheck(strict, value["presets"][i], [CensorPresetConfig], {
        name: name + ".presets" + "[" + i + "]"
      });
      if (otherError !== undefined) {
        error += otherError;
        if (value["presets"][i] !== null) return error + " or " + (name + ".presets" + "[" + i + "]") + " must be one of null";else error = prevError;
      }
    }
    if (typeof value["selectedPresetIndex"] !== "number") return name + ".selectedPresetIndex" + " must be a number";
  });
  var WordWallPresetConfiguration = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref46 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref46$name = _ref46.name,
      name = _ref46$name === void 0 ? "value" : _ref46$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    if (!Array.isArray(value["word_pool"])) return name + ".word_pool" + " must be an array";else for (var i = 0; i < value["word_pool"].length; i++) {
      if (typeof value["word_pool"][i] !== "string") return name + ".word_pool" + "[" + i + "]" + " must be a string";
    }
    if (typeof value["draw_mode"] !== "number") return name + ".draw_mode" + " must be a number";
    if (typeof value["size"] !== "number") return name + ".size" + " must be a number";
    if (typeof value["horizontal_spacing"] !== "number") return name + ".horizontal_spacing" + " must be a number";
    if (typeof value["vertical_spacing"] !== "number") return name + ".vertical_spacing" + " must be a number";
    if (typeof value["offset"] !== "number") return name + ".offset" + " must be a number";
    if (typeof value["angle"] !== "number") return name + ".angle" + " must be a number";
    if (typeof value["color_mode"] !== "number") return name + ".color_mode" + " must be a number";
    if (typeof value["color"] !== "string") return name + ".color" + " must be a string";
    if (typeof value["font"] !== "string") return name + ".font" + " must be a string";
    if (typeof value["font_style"] !== "string") return name + ".font_style" + " must be a string";
  });
  var RemoteConfiguration = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref47 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref47$name = _ref47.name,
      name = _ref47$name === void 0 ? "value" : _ref47$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    if (typeof value["lock"] !== "boolean") return name + ".lock" + " must be a boolean";
    var prevError = error;
    if (typeof value["error"] !== "string") {
      error += name + ".error" + " must be a string";
      if (value["error"] !== null) return error + " or " + (name + ".error") + " must be one of null";else error = prevError;
    }
    if (false) {}
    if (false) {}
    if (false) {}
    if (typeof value["send_statistics_data"] !== "boolean") return name + ".send_statistics_data" + " must be a boolean";
    if (typeof value["check_mode"] !== "number") return name + ".check_mode" + " must be a number";
    if (typeof value["check_period"] !== "number") return name + ".check_period" + " must be a number";
    if (typeof value["allow_older_settings"] !== "boolean") return name + ".allow_older_settings" + " must be a boolean";
    var prevError = error;
    if (typeof value["subscriber_username"] !== "string") {
      error += name + ".subscriber_username" + " must be a string";
      if (value["subscriber_username"] !== null) return error + " or " + (name + ".subscriber_username") + " must be one of null";else error = prevError;
    }
    var prevError = error;
    if (typeof value["subscription_id"] !== "number") {
      error += name + ".subscription_id" + " must be a number";
      if (value["subscription_id"] !== null) return error + " or " + (name + ".subscription_id") + " must be one of null";else error = prevError;
    }
  });
  var OnlyOnceModeConfiguration = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref48 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref48$name = _ref48.name,
      name = _ref48$name === void 0 ? "value" : _ref48$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    if (typeof value["enabled"] !== "boolean") return name + ".enabled" + " must be a boolean";
    if (typeof value["mode"] !== "number") return name + ".mode" + " must be a number";
    if (value["mode_configuration"] == null || config_checker_typeof(value["mode_configuration"]) !== "object") return name + ".mode_configuration" + " must be an object";else {
      if (value["mode_configuration"]["0"] == null || config_checker_typeof(value["mode_configuration"]["0"]) !== "object") return name + ".mode_configuration" + ".0" + " must be an object";else {}
      if (value["mode_configuration"]["1"] == null || config_checker_typeof(value["mode_configuration"]["1"]) !== "object") return name + ".mode_configuration" + ".1" + " must be an object";else {
        if (typeof value["mode_configuration"]["1"]["transparency"] !== "number") return name + ".mode_configuration" + ".1" + ".transparency" + " must be a number";
      }
      if (value["mode_configuration"]["2"] == null || config_checker_typeof(value["mode_configuration"]["2"]) !== "object") return name + ".mode_configuration" + ".2" + " must be an object";else {
        if (typeof value["mode_configuration"]["2"]["distance"] !== "number") return name + ".mode_configuration" + ".2" + ".distance" + " must be a number";
        if (typeof value["mode_configuration"]["2"]["radius"] !== "number") return name + ".mode_configuration" + ".2" + ".radius" + " must be a number";
      }
      if (value["mode_configuration"]["3"] == null || config_checker_typeof(value["mode_configuration"]["3"]) !== "object") return name + ".mode_configuration" + ".3" + " must be an object";else {
        if (typeof value["mode_configuration"]["3"]["blur"] !== "number") return name + ".mode_configuration" + ".3" + ".blur" + " must be a number";
      }
      if (value["mode_configuration"]["4"] == null || config_checker_typeof(value["mode_configuration"]["4"]) !== "object") return name + ".mode_configuration" + ".4" + " must be an object";else {
        if (typeof value["mode_configuration"]["4"]["strength"] !== "number") return name + ".mode_configuration" + ".4" + ".strength" + " must be a number";
        if (typeof value["mode_configuration"]["4"]["color_1"] !== "string") return name + ".mode_configuration" + ".4" + ".color_1" + " must be a string";
        if (typeof value["mode_configuration"]["4"]["color_2"] !== "string") return name + ".mode_configuration" + ".4" + ".color_2" + " must be a string";
      }
      if (value["mode_configuration"]["5"] == null || config_checker_typeof(value["mode_configuration"]["5"]) !== "object") return name + ".mode_configuration" + ".5" + " must be an object";else {
        if (typeof value["mode_configuration"]["5"]["blur"] !== "number") return name + ".mode_configuration" + ".5" + ".blur" + " must be a number";
        if (typeof value["mode_configuration"]["5"]["grayscale"] !== "boolean") return name + ".mode_configuration" + ".5" + ".grayscale" + " must be a boolean";
      }
      if (value["mode_configuration"]["6"] == null || config_checker_typeof(value["mode_configuration"]["6"]) !== "object") return name + ".mode_configuration" + ".6" + " must be an object";else {
        if (typeof value["mode_configuration"]["6"]["allow_faces"] !== "boolean") return name + ".mode_configuration" + ".6" + ".allow_faces" + " must be a boolean";
      }
      if (value["mode_configuration"]["7"] == null || config_checker_typeof(value["mode_configuration"]["7"]) !== "object") return name + ".mode_configuration" + ".7" + " must be an object";else {
        if (typeof value["mode_configuration"]["7"]["censor_type"] !== "number") return name + ".mode_configuration" + ".7" + ".censor_type" + " must be a number";
        if (typeof value["mode_configuration"]["7"]["censor_preset_index"] !== "number") return name + ".mode_configuration" + ".7" + ".censor_preset_index" + " must be a number";
      }
    }
    if (typeof value["precision"] !== "number") return name + ".precision" + " must be a number";
    if (typeof value["message"] !== "string") return name + ".message" + " must be a string";
    if (typeof value["date_time_format"] !== "string") return name + ".date_time_format" + " must be a string";
    if (typeof value["display_classes"] !== "boolean") return name + ".display_classes" + " must be a boolean";
    if (typeof value["width_min"] !== "number") return name + ".width_min" + " must be a number";
    if (typeof value["height_min"] !== "number") return name + ".height_min" + " must be a number";
    if (!Array.isArray(value["trigger"])) return name + ".trigger" + " must be an array";else for (var i = 0; i < value["trigger"].length; i++) {
      if (false) {}
    }
    if (typeof value["timer"] !== "boolean") return name + ".timer" + " must be a boolean";
    if (typeof value["timer_autorefresh"] !== "boolean") return name + ".timer_autorefresh" + " must be a boolean";
    if (typeof value["timer_min_duration"] !== "number") return name + ".timer_min_duration" + " must be a number";
    if (typeof value["timer_max_duration"] !== "number") return name + ".timer_max_duration" + " must be a number";
    if (typeof value["timer_animation"] !== "number") return name + ".timer_animation" + " must be a number";
  });
  var OnlyOnceModeTree = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref49 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref49$name = _ref49.name,
      name = _ref49$name === void 0 ? "value" : _ref49$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    if (value["tree"] == null || config_checker_typeof(value["tree"]) !== "object") return name + ".tree" + " must be an object";else {}
    if (typeof value["count"] !== "number") return name + ".count" + " must be a number";
  });
  var OnlyOnceModeStorageManager = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref50 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref50$name = _ref50.name,
      name = _ref50$name === void 0 ? "value" : _ref50$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    if (!Array.isArray(value["trees"])) return name + ".trees" + " must be an array";else for (var i = 0; i < value["trees"].length; i++) {
      if (false) {}
    }
  });
  var LockConfiguration = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref51 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref51$name = _ref51.name,
      name = _ref51$name === void 0 ? "value" : _ref51$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    if (typeof value["enabled"] !== "boolean") return name + ".enabled" + " must be a boolean";
    if (typeof value["password_enabled"] !== "boolean") return name + ".password_enabled" + " must be a boolean";
    if (typeof value["timer_enabled"] !== "boolean") return name + ".timer_enabled" + " must be a boolean";
    var prevError = error;
    if (typeof value["password"] !== "undefined") {
      error += name + ".password" + " must be undefined";
      if (typeof value["password"] !== "string") {
        error += " or " + (name + ".password") + " must be a string";
        if (value["password"] !== null) return error + " or " + (name + ".password") + " must be one of null";else error = prevError;
      } else error = prevError;
    }
    var prevError = error;
    if (typeof value["password_confirmation"] !== "undefined") {
      error += name + ".password_confirmation" + " must be undefined";
      if (typeof value["password_confirmation"] !== "string") {
        error += " or " + (name + ".password_confirmation") + " must be a string";
        if (value["password_confirmation"] !== null) return error + " or " + (name + ".password_confirmation") + " must be one of null";else error = prevError;
      } else error = prevError;
    }
    if (typeof value["duration"] !== "number") return name + ".duration" + " must be a number";
    if (typeof value["initial_duration"] !== "number") return name + ".initial_duration" + " must be a number";
    var prevError = error;
    if (typeof value["duration_timestamp"] !== "undefined") {
      error += name + ".duration_timestamp" + " must be undefined";
      if (typeof value["duration_timestamp"] !== "number") {
        error += " or " + (name + ".duration_timestamp") + " must be a number";
        if (value["duration_timestamp"] !== null) return error + " or " + (name + ".duration_timestamp") + " must be one of null";else error = prevError;
      } else error = prevError;
    }
    var prevError = error;
    if (typeof value["timestamp"] !== "undefined") {
      error += name + ".timestamp" + " must be undefined";
      if (typeof value["timestamp"] !== "number") {
        error += " or " + (name + ".timestamp") + " must be a number";
        if (value["timestamp"] !== null) return error + " or " + (name + ".timestamp") + " must be one of null";else error = prevError;
      } else error = prevError;
    }
    var prevError = error;
    if (typeof value["token"] !== "undefined") {
      error += name + ".token" + " must be undefined";
      if (typeof value["token"] !== "number") {
        error += " or " + (name + ".token") + " must be a number";
        if (value["token"] !== null) return error + " or " + (name + ".token") + " must be one of null";else error = prevError;
      } else error = prevError;
    }
    if (!Array.isArray(value["locked_options"])) return name + ".locked_options" + " must be an array";else for (var i = 0; i < value["locked_options"].length; i++) {
      if (typeof value["locked_options"][i] !== "string") return name + ".locked_options" + "[" + i + "]" + " must be a string";
    }
    if (typeof value["timer_plus"] !== "boolean") return name + ".timer_plus" + " must be a boolean";
    if (false) {}
    if (typeof value["timer_plus_weight_box"] !== "boolean") return name + ".timer_plus_weight_box" + " must be a boolean";
    if (typeof value["timer_plus_weight_box_size"] !== "number") return name + ".timer_plus_weight_box_size" + " must be a number";
    if (typeof value["timer_mode"] !== "number") return name + ".timer_mode" + " must be a number";
    if (typeof value["remote_lock"] !== "boolean") return name + ".remote_lock" + " must be a boolean";
  });
  var LookAndFeelConfiguration = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref52 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref52$name = _ref52.name,
      name = _ref52$name === void 0 ? "value" : _ref52$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    if (typeof value["main_bg_color"] !== "string") return name + ".main_bg_color" + " must be a string";
    if (typeof value["secondary_bg_color"] !== "string") return name + ".secondary_bg_color" + " must be a string";
    if (typeof value["secondary_bg_color_variant_1"] !== "string") return name + ".secondary_bg_color_variant_1" + " must be a string";
    if (typeof value["secondary_bg_color_variant_2"] !== "string") return name + ".secondary_bg_color_variant_2" + " must be a string";
    if (typeof value["secondary_bg_color_variant_3"] !== "string") return name + ".secondary_bg_color_variant_3" + " must be a string";
    if (typeof value["secondary_bg_color_variant_4"] !== "string") return name + ".secondary_bg_color_variant_4" + " must be a string";
    if (typeof value["main_accent_color"] !== "string") return name + ".main_accent_color" + " must be a string";
    if (typeof value["main_accent_color_variant_1"] !== "string") return name + ".main_accent_color_variant_1" + " must be a string";
    if (typeof value["main_accent_color_variant_2"] !== "string") return name + ".main_accent_color_variant_2" + " must be a string";
    if (typeof value["main_accent_color_variant_3"] !== "string") return name + ".main_accent_color_variant_3" + " must be a string";
    if (typeof value["main_accent_color_variant_4"] !== "string") return name + ".main_accent_color_variant_4" + " must be a string";
    if (typeof value["main_input_color"] !== "string") return name + ".main_input_color" + " must be a string";
    if (typeof value["main_input_color_variant_1"] !== "string") return name + ".main_input_color_variant_1" + " must be a string";
    if (typeof value["main_text_color"] !== "string") return name + ".main_text_color" + " must be a string";
    if (typeof value["main_text_color_disabled"] !== "string") return name + ".main_text_color_disabled" + " must be a string";
    if (typeof value["main_text_color_variant_1"] !== "string") return name + ".main_text_color_variant_1" + " must be a string";
    if (typeof value["main_text_color_variant_1_disabled"] !== "string") return name + ".main_text_color_variant_1_disabled" + " must be a string";
    if (typeof value["tab_text_color"] !== "string") return name + ".tab_text_color" + " must be a string";
    if (typeof value["header_text_color"] !== "string") return name + ".header_text_color" + " must be a string";
    if (typeof value["main_border_color"] !== "string") return name + ".main_border_color" + " must be a string";
    if (typeof value["border_color_variant_1"] !== "string") return name + ".border_color_variant_1" + " must be a string";
    if (typeof value["border_color_variant_2"] !== "string") return name + ".border_color_variant_2" + " must be a string";
    if (typeof value["border_color_variant_3"] !== "string") return name + ".border_color_variant_3" + " must be a string";
  });
  var SavingConfiguration = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref53 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref53$name = _ref53.name,
      name = _ref53$name === void 0 ? "value" : _ref53$name;
    var error = "";
    if (value == null || config_checker_typeof(value) !== "object") return name + " must be an object";
    if (value["actions"] == null || config_checker_typeof(value["actions"]) !== "object") return name + ".actions" + " must be an object";else {
      if (typeof value["actions"]["enable_extension"] !== "boolean") return name + ".actions" + ".enable_extension" + " must be a boolean";
      if (typeof value["actions"]["lock_extension"] !== "boolean") return name + ".actions" + ".lock_extension" + " must be a boolean";
    }
    if (value["keys"] == null || config_checker_typeof(value["keys"]) !== "object") return name + ".keys" + " must be an object";else {
      if (typeof value["keys"]["labels"] !== "boolean") return name + ".keys" + ".labels" + " must be a boolean";
      if (typeof value["keys"]["censor_type"] !== "boolean") return name + ".keys" + ".censor_type" + " must be a boolean";
      if (typeof value["keys"]["file_types"] !== "boolean") return name + ".keys" + ".file_types" + " must be a boolean";
      if (typeof value["keys"]["video_overlay"] !== "boolean") return name + ".keys" + ".video_overlay" + " must be a boolean";
      if (typeof value["keys"]["prescale"] !== "boolean") return name + ".keys" + ".prescale" + " must be a boolean";
      if (typeof value["keys"]["prefer_edited_corrections"] !== "boolean") return name + ".keys" + ".prefer_edited_corrections" + " must be a boolean";
      if (typeof value["keys"]["scan_configuration"] !== "boolean") return name + ".keys" + ".scan_configuration" + " must be a boolean";
      if (typeof value["keys"]["bar_configuration"] !== "boolean") return name + ".keys" + ".bar_configuration" + " must be a boolean";
      if (typeof value["keys"]["blur_configuration"] !== "boolean") return name + ".keys" + ".blur_configuration" + " must be a boolean";
      if (typeof value["keys"]["pixel_configuration"] !== "boolean") return name + ".keys" + ".pixel_configuration" + " must be a boolean";
      if (typeof value["keys"]["glitch_configuration"] !== "boolean") return name + ".keys" + ".glitch_configuration" + " must be a boolean";
      if (typeof value["keys"]["triangle_configuration"] !== "boolean") return name + ".keys" + ".triangle_configuration" + " must be a boolean";
      if (typeof value["keys"]["box_configuration"] !== "boolean") return name + ".keys" + ".box_configuration" + " must be a boolean";
      if (typeof value["keys"]["sticker_configuration"] !== "boolean") return name + ".keys" + ".sticker_configuration" + " must be a boolean";
      if (typeof value["keys"]["sobel_configuration"] !== "boolean") return name + ".keys" + ".sobel_configuration" + " must be a boolean";
      if (typeof value["keys"]["splatter_configuration"] !== "boolean") return name + ".keys" + ".splatter_configuration" + " must be a boolean";
      if (typeof value["keys"]["mixed_configuration"] !== "boolean") return name + ".keys" + ".mixed_configuration" + " must be a boolean";
      if (typeof value["keys"]["random_configuration"] !== "boolean") return name + ".keys" + ".random_configuration" + " must be a boolean";
      if (typeof value["keys"]["gif_configuration"] !== "boolean") return name + ".keys" + ".gif_configuration" + " must be a boolean";
      if (typeof value["keys"]["png_configuration"] !== "boolean") return name + ".keys" + ".png_configuration" + " must be a boolean";
      if (typeof value["keys"]["jpg_configuration"] !== "boolean") return name + ".keys" + ".jpg_configuration" + " must be a boolean";
      if (typeof value["keys"]["bmp_configuration"] !== "boolean") return name + ".keys" + ".bmp_configuration" + " must be a boolean";
      if (typeof value["keys"]["webp_configuration"] !== "boolean") return name + ".keys" + ".webp_configuration" + " must be a boolean";
      if (typeof value["keys"]["avif_configuration"] !== "boolean") return name + ".keys" + ".avif_configuration" + " must be a boolean";
      if (typeof value["keys"]["whiteblacklist_configuration"] !== "boolean") return name + ".keys" + ".whiteblacklist_configuration" + " must be a boolean";
      if (typeof value["keys"]["only_once_mode_configuration"] !== "boolean") return name + ".keys" + ".only_once_mode_configuration" + " must be a boolean";
      if (typeof value["keys"]["clustering_configuration"] !== "boolean") return name + ".keys" + ".clustering_configuration" + " must be a boolean";
      if (typeof value["keys"]["caption_configuration"] !== "boolean") return name + ".keys" + ".caption_configuration" + " must be a boolean";
      if (typeof value["keys"]["word_wall_configuration"] !== "boolean") return name + ".keys" + ".word_wall_configuration" + " must be a boolean";
      if (typeof value["keys"]["reverse_mode_configuration"] !== "boolean") return name + ".keys" + ".reverse_mode_configuration" + " must be a boolean";
      if (typeof value["keys"]["icon_configuration"] !== "boolean") return name + ".keys" + ".icon_configuration" + " must be a boolean";
      if (typeof value["keys"]["base64_scanner"] !== "boolean") return name + ".keys" + ".base64_scanner" + " must be a boolean";
      if (typeof value["keys"]["look_and_feel_configuration"] !== "boolean") return name + ".keys" + ".look_and_feel_configuration" + " must be a boolean";
    }
  });
  return {
    CensorType: CensorType,
    CensorShape: CensorShape,
    CensorExtraAssignable: CensorExtraAssignable,
    CensorTypePresetConfig: CensorTypePresetConfig,
    CensorPresetConfig: CensorPresetConfig,
    CensorPreset: CensorPreset,
    CensorTypeConfig: CensorTypeConfig,
    StickerCensorTypeConfig: StickerCensorTypeConfig,
    ShapeCensorTypePresetConfig: ShapeCensorTypePresetConfig,
    BarType: BarType,
    BarCensorTypePresetConfig: BarCensorTypePresetConfig,
    PixelType: PixelType,
    PixelCensorTypePresetConfig: PixelCensorTypePresetConfig,
    BlurType: BlurType,
    BlurCensorTypePresetConfig: BlurCensorTypePresetConfig,
    TriangleCensorTypePresetConfig: TriangleCensorTypePresetConfig,
    BoxCensorTypePresetConfig: BoxCensorTypePresetConfig,
    GlitchCensorTypePresetConfig: GlitchCensorTypePresetConfig,
    StickerCensorTypePresetConfig: StickerCensorTypePresetConfig,
    SobelCensorTypePresetConfig: SobelCensorTypePresetConfig,
    SplatterCensorTypePresetConfig: SplatterCensorTypePresetConfig,
    MixedCensorTypePresetConfig: MixedCensorTypePresetConfig,
    RandomMode: RandomMode,
    RandomCensorTypePresetConfig: RandomCensorTypePresetConfig,
    FileTypeConfiguration: FileTypeConfiguration,
    PNGTypeConfiguration: PNGTypeConfiguration,
    JPGTypeConfiguration: JPGTypeConfiguration,
    BMPTypeConfiguration: BMPTypeConfiguration,
    WEBPTypeConfiguration: WEBPTypeConfiguration,
    AVIFTypeConfiguration: AVIFTypeConfiguration,
    GIFTypeConfiguration: GIFTypeConfiguration,
    VideoMode: VideoMode,
    VideoOverlayProcessingMode: VideoOverlayProcessingMode,
    VideoInactivityTimeout: VideoInactivityTimeout,
    VideoConfiguration: VideoConfiguration,
    ScanConfiguration: ScanConfiguration,
    WhiteBlackListConfiguration: WhiteBlackListConfiguration,
    ReverseModeConfiguration: ReverseModeConfiguration,
    ClusteringConfiguration: ClusteringConfiguration,
    ClusteringPresetConfiguration: ClusteringPresetConfiguration,
    CaptionConfiguration: CaptionConfiguration,
    CaptionEntry: CaptionEntry,
    CaptionTag: CaptionTag,
    CaptionPresetConfiguration: CaptionPresetConfiguration,
    WordWallConfiguration: WordWallConfiguration,
    WordWallPresetConfiguration: WordWallPresetConfiguration,
    RemoteConfiguration: RemoteConfiguration,
    OnlyOnceModeConfiguration: OnlyOnceModeConfiguration,
    OnlyOnceModeTree: OnlyOnceModeTree,
    OnlyOnceModeStorageManager: OnlyOnceModeStorageManager,
    LockConfiguration: LockConfiguration,
    LookAndFeelConfiguration: LookAndFeelConfiguration,
    SavingConfiguration: SavingConfiguration
  };
}
;// ../PuryFi-Core/context/dist/content.checker.js
function content_checker_typeof(o) { "@babel/helpers - typeof"; return content_checker_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, content_checker_typeof(o); }

/* harmony default export */ function content_checker() {
  var ContentKey = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? "value" : _ref$name;
    var error = "";
    var prevError = error;
    if (value !== "FACEFEMALE" && value !== "FACEMALE" && value !== "EYE" && value !== "MOUTH" && value !== "ARMPITSCOVERED" && value !== "ARMPITSEXPOSED" && value !== "FEMALEBREASTCOVERED" && value !== "FEMALEBREASTEXPOSED" && value !== "MALEBREASTCOVERED" && value !== "MALEBREASTEXPOSED" && value !== "NIPPLECOVERED" && value !== "NIPPLEEXPOSED" && value !== "BELLYCOVERED" && value !== "BELLYEXPOSED" && value !== "HANDCOVERED" && value !== "HANDEXPOSED" && value !== "BUTTOCKSCOVERED" && value !== "BUTTOCKSEXPOSED" && value !== "ANUSCOVERED" && value !== "ANUSEXPOSED" && value !== "FEMALEGENITALIACOVERED" && value !== "FEMALEGENITALIAEXPOSED" && value !== "MALEGENITALIACOVERED" && value !== "MALEGENITALIAEXPOSED" && value !== "FEETCOVERED" && value !== "FEETEXPOSED" && value !== null) return name + " must be one of \"FACEFEMALE\", \"FACEMALE\", \"EYE\", \"MOUTH\", \"ARMPITSCOVERED\", \"ARMPITSEXPOSED\", \"FEMALEBREASTCOVERED\", \"FEMALEBREASTEXPOSED\", \"MALEBREASTCOVERED\", \"MALEBREASTEXPOSED\", \"NIPPLECOVERED\", \"NIPPLEEXPOSED\", \"BELLYCOVERED\", \"BELLYEXPOSED\", \"HANDCOVERED\", \"HANDEXPOSED\", \"BUTTOCKSCOVERED\", \"BUTTOCKSEXPOSED\", \"ANUSCOVERED\", \"ANUSEXPOSED\", \"FEMALEGENITALIACOVERED\", \"FEMALEGENITALIAEXPOSED\", \"MALEGENITALIACOVERED\", \"MALEGENITALIAEXPOSED\", \"FEETCOVERED\", \"FEETEXPOSED\", or null";
  });
  var ContentIndex = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref2$name = _ref2.name,
      name = _ref2$name === void 0 ? "value" : _ref2$name;
    var error = "";
    var prevError = error;
    if (value !== 12 && value !== 13 && value !== 20 && value !== 21 && value !== 17 && value !== 16 && value !== 4 && value !== 5 && value !== 10 && value !== 11 && value !== 23 && value !== 22 && value !== 0 && value !== 1 && value !== 25 && value !== 24 && value !== 2 && value !== 3 && value !== 19 && value !== 18 && value !== 6 && value !== 7 && value !== 9 && value !== 8 && value !== 15 && value !== 14 && value !== -1) return name + " must be one of 12, 13, 20, 21, 17, 16, 4, 5, 10, 11, 23, 22, 0, 1, 25, 24, 2, 3, 19, 18, 6, 7, 9, 8, 15, 14, or -1";
  });
  var ContentBodyPartIndex = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref3 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref3$name = _ref3.name,
      name = _ref3$name === void 0 ? "value" : _ref3$name;
    var error = "";
    var prevError = error;
    if (value !== 0 && value !== 1 && value !== 2 && value !== 3 && value !== 4 && value !== 4 && value !== 5 && value !== 5 && value !== 6 && value !== 6 && value !== 7 && value !== 7 && value !== 8 && value !== 8 && value !== 9 && value !== 9 && value !== 10 && value !== 10 && value !== 11 && value !== 11 && value !== 12 && value !== 12 && value !== 13 && value !== 13 && value !== 14 && value !== 14 && value !== -1) return name + " must be one of 0, 1, 2, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, or -1";
  });
  var Content = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref4 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref4$name = _ref4.name,
      name = _ref4$name === void 0 ? "value" : _ref4$name;
    var error = "";
    if (value == null || content_checker_typeof(value) !== "object") return name + " must be an object";
    var otherError = ContentKey._rawCheck(strict, value["key"], [], {
      name: name + ".key"
    });
    if (otherError !== undefined) return otherError;
    if (typeof value["name"] !== "string") return name + ".name" + " must be a string";
    var otherError = ContentIndex._rawCheck(strict, value["index"], [], {
      name: name + ".index"
    });
    if (otherError !== undefined) return otherError;
    var otherError = ContentBodyPartIndex._rawCheck(strict, value["body_part_index"], [], {
      name: name + ".body_part_index"
    });
    if (otherError !== undefined) return otherError;
    if (typeof value["nude"] !== "boolean") return name + ".nude" + " must be a boolean";
    if (typeof value["erotic"] !== "boolean") return name + ".erotic" + " must be a boolean";
    var prevError = error;
    if (typeof value["experimental"] !== "undefined") {
      error += name + ".experimental" + " must be undefined";
      if (typeof value["experimental"] !== "boolean") return error + " or " + (name + ".experimental") + " must be a boolean";else error = prevError;
    }
  });
  return {
    ContentKey: ContentKey,
    ContentIndex: ContentIndex,
    ContentBodyPartIndex: ContentBodyPartIndex,
    Content: Content
  };
}
;// ../PuryFi-Core/context/dist/effects.checker.js

/* harmony default export */ function effects_checker() {
  var EffectIndex = (0,dist/* buildCheckerFromRaw */._W)(function (strict, value) {
    var generic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? "value" : _ref$name;
    var error = "";
    if (value !== 0 && value !== 1 && value !== 2 && value !== 3 && value !== 4 && value !== 5 && value !== 6 && value !== 7 && value !== 8 && value !== 9 && value !== 10 && value !== 11) return name + " must be one of 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, or 11";
  });
  return {
    EffectIndex: EffectIndex
  };
}
;// ../PuryFi-Core/context/dist/browser.js






var ContextCheckers = (0,dist/* buildCheckers */.rs)(config_checker, content_checker, effects_checker);





})();

window.puryfiCoreContext = __webpack_exports__;
/******/ })()
;