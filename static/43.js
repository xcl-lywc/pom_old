webpackJsonplensyn_ui([43],{

/***/ 1146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_LeaderList_vue__ = __webpack_require__(1478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_LeaderList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_LeaderList_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_LeaderList_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_LeaderList_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_fff95e78_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_LeaderList_vue__ = __webpack_require__(1731);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1727)
  __webpack_require__(1729)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-fff95e78"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_LeaderList_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_fff95e78_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_LeaderList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/organization/LeaderList.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fff95e78", Component.options)
  } else {
    hotAPI.reload("data-v-fff95e78", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1339:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (isArray(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (isArray(target) && isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var encode = function encode(str, defaultEncoder, charset) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    merge: merge
};


/***/ }),

/***/ 1340:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),

/***/ 1347:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(1353);
var parse = __webpack_require__(1354);
var formats = __webpack_require__(1340);

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ 1353:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1339);
var formats = __webpack_require__(1340);
var has = Object.prototype.hasOwnProperty;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var isArray = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    formatter: formats.formatters[formats['default']],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly,
    charset
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
        obj = obj.join(',');
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (isArray(obj)) {
            pushToArray(values, stringify(
                obj[key],
                typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix,
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        } else {
            pushToArray(values, stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        }
    }

    return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    var format = formats['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats.formatters[format];

    var filter = defaults.filter;
    if (typeof opts.filter === 'function' || isArray(opts.filter)) {
        filter = opts.filter;
    }

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);

    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.formatter,
            options.encodeValuesOnly,
            options.charset
        ));
    }

    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),

/***/ 1354:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1339);

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    comma: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset);
            val = options.decoder(part.slice(pos + 1), defaults.decoder, charset);
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }

        if (val && options.comma && val.indexOf(',') > -1) {
            val = val.split(',');
        }

        if (has.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
                obj = { 0: leaf };
            } else if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new Error('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

    return {
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        depth: typeof opts.depth === 'number' ? opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (str, opts) {
    var options = normalizeParseOptions(opts);

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),

/***/ 1478:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = __webpack_require__(440);

var _promise2 = _interopRequireDefault(_promise);

var _axios = __webpack_require__(442);

var _axios2 = _interopRequireDefault(_axios);

var _qs = __webpack_require__(1347);

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  components: {},
  data: function data() {
    return {
      peopleLoading: false,
      leaderLoading: false,

      partyListData: [], //组织列表list
      leaderListData: [], //领导列表list
      orgId: null, //当前对应的组织代码
      partyId: null, //党组织的id, 用于查询领导人

      activeItem: {
        id: null,
        name: null
      },

      peopleDialogVisible: false,
      positionsListData: [], //职位select的列表
      position: null, //表单中选中的职位信息
      tablePeopleId: null, //当前选中的人员id
      peopleName: null, //表单输入的人员名称
      peopleTableListData: [], //人员表格数据

      resource: window.sessionStorage.getItem("resource")
    };
  },
  created: function created() {},
  mounted: function mounted() {
    var _this = this;

    this.orgId = window.sessionStorage.getItem("orgId");
    this.getPartyList().then(function (response) {
      _this.getLeaderListData();
      _this.getPositionsListData();
    });
  },

  methods: {
    /*
    * 刷新页面
    */
    pageLocalRefresh: function pageLocalRefresh() {
      var _this2 = this;

      this.orgId = window.sessionStorage.getItem("orgId");
      this.getPartyList().then(function (response) {
        _this2.getLeaderListData();
        _this2.getPositionsListData();
      });
    },

    /**
     * 获取组织结构列表(list)
     * @return {[type]} [description]
     */
    getPartyList: function getPartyList() {
      var self = this;

      var config = {
        url: basePath + "/party_orgs/chlidrensimple",
        method: "get",
        params: {
          id: self.orgId
        }
      };

      var p = new _promise2.default(function (resolve, reject) {
        (0, _axios2.default)(config).then(function (response) {
          if (response.data.data && response.data.meta.code == 0) {
            //验证数据非空
            self.partyListData = response.data.data;
            self.partyId = response.data.data[0].id;
            self.activeItem.id = response.data.data[0].id;
            resolve('成功');
          } else {
            self.partyListData = [];
            self.partyId = null;
          }
        }).catch(function (error) {
          console.log('查询党组织失败');
        });
      });
      return p;
    },

    /**
     * 获取领导人列表
     * @return {[type]} [description]
     */
    getLeaderListData: function getLeaderListData(id) {
      var self = this;
      self.leaderLoading = true;
      var config = {
        url: basePath + "/party_orgs/leader",
        method: "get",
        params: {
          id: id || self.partyId,
          type: "partyorg"
        }
      };
      (0, _axios2.default)(config).then(function (response) {
        if (response.data.meta.code == 0) {
          self.leaderListData = response.data.data;
        } else {
          self.$message.error(response.data.meta.message);
        }
        self.leaderLoading = false;
      }).catch(function (error) {
        self.leaderLoading = false;
        self.$message.error(error.data.meta.message);
      });
    },

    /**
     * 点击左侧组织, 查询职位和对应的人员
     * @return none
     */
    clickParty: function clickParty(item) {
      this.activeItem = item;
      this.getPositionsListData(item.id);
      this.getLeaderListData(item.id);
    },

    /**
     * 点击添加领导, 清空数据
     */
    addLeaderClicked: function addLeaderClicked() {
      this.position = null;
      this.peopleName = null;
      this.peopleDialogVisible = true;
      this.peopleTableListData = [];
    },

    /**
     * 获取职位
     * @param  {number} id 需要查询的组织id
     * @return {[type]}    [description]
     */
    getPositionsListData: function getPositionsListData(id) {
      var self = this;

      var config = {
        url: basePath + "/party_mem_positions/forOrg/" + (id || self.partyId),
        method: "get"
      };
      (0, _axios2.default)(config).then(function (response) {
        if (response.data.meta.code == 0) {
          self.positionsListData = response.data.data;
        } else {
          self.$message.error(response.data.meta.message);
        }
      }).catch(function (error) {
        self.$message.error(error.data.meta.message);
      });
    },

    /**
     * 获取人员列表
     * @return {[type]} [description]
     */
    getPeopleTableListData: function getPeopleTableListData() {
      var _this3 = this;

      var self = this;

      var config = {
        url: basePath + "/hr_users/forName/like",
        method: "get",
        params: {
          userName: self.peopleName
        }
      };
      self.peopleLoading = true;
      (0, _axios2.default)(config).then(function (response) {
        if (response.data.meta.code == 0) {
          self.peopleTableListData = response.data.data;
          _this3.tablePeopleId = null;
          self.peopleLoading = false;
        } else {
          self.$message.error(response.data.meta.message);
        }
      }).catch(function (error) {
        self.$message.error(error.response.data.meta.message);
        self.peopleLoading = false;
      });
    },

    /**
     * 点击单个人员, 将其选中
     * @param  {object} item 点击的表格对象
     * @return {[type]}      [description]
     */
    clickSingle: function clickSingle(item) {
      this.tablePeopleId = item.infoId;
    },

    /**
     * 确认提交人员
     * @return {[type]} [description]
     */
    submitPeople: function submitPeople() {
      var self = this;

      var config = {
        url: basePath + "/party_mem_positions/partymempos/info_id/add/" + self.tablePeopleId + "/from_org/" + self.partyId,
        method: "post",
        data: _qs2.default.stringify({
          positionId: self.position.id
        })
      };

      self.peopleLoading = true;
      (0, _axios2.default)(config).then(function (response) {
        if (response.data.meta.code == 0) {
          self.$message.success("添加成功");
          self.peopleDialogVisible = false;
          self.getLeaderListData();
        } else {
          self.$message.error(response.data.meta.message);
        }
        self.peopleLoading = false;
      }).catch(function (error) {
        self.$message.error(error.response.data.meta.message);
        self.peopleLoading = false;
      });
    },

    /**
     * 调离人员
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    deleteLeader: function deleteLeader(item) {

      var self = this;

      var idList = [];
      idList.push(item.mpId);
      var config = {
        url: basePath + "/party_mem_positions/batch/delete/from_org/" + self.partyId,
        method: "delete",
        data: {
          list: idList
        }
      };
      self.peopleLoading = true;

      self.$confirm("调离后需要重新添加", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error' }).then(function () {
        (0, _axios2.default)(config).then(function (response) {
          if (response.data.meta.code == 0) {
            self.$message.success("调离成功");
            self.getLeaderListData();
          } else {
            self.$message.error(response.data.meta.message);
          }
          self.peopleLoading = false;
        }).catch(function (error) {
          self.$message.error(error.response.data.meta.message);
          self.peopleLoading = false;
        });
      }).catch(function () {});
    }
  }
};

/***/ }),

/***/ 1727:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1728);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("161df87d", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-fff95e78\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./LeaderList.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-fff95e78\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./LeaderList.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1728:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.warning-icon[data-v-fff95e78] {\n  margin-right: 10px;\n  color: #E6A23C;\n}\n.tree-list-wrap[data-v-fff95e78] {\n  padding: 0;\n}\n.tree-list[data-v-fff95e78] {\n  position: fixed;\n  width: 200px;\n  background: #fff;\n  padding: 10px;\n}\n.tree-list li[data-v-fff95e78]{\n  margin: 5px;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n}\n.tree-list li.active[data-v-fff95e78] {\n  color: #409EFF;\n}\n.tree-list li[data-v-fff95e78]:hover {\n  cursor: pointer;\n  color: #409EFF;\n}\n.el-card[data-v-fff95e78] {\n  margin-bottom: 20px;\n}\n.leader-picture[data-v-fff95e78] {\n  width: 100px;\n  height: 100px;\n}\n.leader-title[data-v-fff95e78] {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: flex-end;\n}\n.leave-button[data-v-fff95e78] {\n  float: right;\n}\n.leader-name[data-v-fff95e78] {\n  font-size: 24px;\n  margin: 0 10px;\n}\n.leader-position[data-v-fff95e78] {\n  font-size: 16px;\n}\n.leader-description[data-v-fff95e78] {\n  margin-top: 20px;\n  max-height: 200px;\n  overflow-y: auto;\n}\n.search-name-wrap[data-v-fff95e78] {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  align-items: center;\n}\n.no-data-div[data-v-fff95e78] {\n  padding: 20px;\n  margin-top: 20px;\n  background: #fff;\n}\n", ""]);

// exports


/***/ }),

/***/ 1729:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1730);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("45c73569", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-fff95e78\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=1!./LeaderList.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-fff95e78\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=1!./LeaderList.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1730:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.left-margin-50 .el-form-item__content {\n  margin-left: 50px!important;\n}\n.el-tree-node__expand-icon.el-icon-caret-right{\n  font-size: 18px;\n  color: #000;\n}\n.el-tree-node__expand-icon.el-icon-caret-right.is-leaf{\n  color: transparent;\n}\n", ""]);

// exports


/***/ }),

/***/ 1731:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "content-manage" },
    [
      _vm.partyListData.length > 0
        ? _c(
            "el-container",
            [
              _c(
                "el-aside",
                { staticClass: "tree-list-wrap", attrs: { width: "200px" } },
                [
                  _c(
                    "ul",
                    { staticClass: "tree-list" },
                    _vm._l(_vm.partyListData, function(item) {
                      return _c(
                        "li",
                        {
                          key: _vm.index + "party",
                          class: { active: _vm.activeItem.id == item.id },
                          on: {
                            click: function($event) {
                              return _vm.clickParty(item)
                            }
                          }
                        },
                        [
                          _vm._v(_vm._s(item.name) + " "),
                          _c("i", { staticClass: "el-icon-d-arrow-right" })
                        ]
                      )
                    }),
                    0
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "el-main",
                {
                  directives: [
                    {
                      name: "loading",
                      rawName: "v-loading",
                      value: _vm.leaderLoading,
                      expression: "leaderLoading"
                    }
                  ]
                },
                [
                  _c(
                    "el-row",
                    { attrs: { gutter: 20 } },
                    [
                      _c(
                        "el-col",
                        { attrs: { span: 24 } },
                        [
                          _c(
                            "el-card",
                            [
                              _c(
                                "el-button",
                                {
                                  staticClass: "fill-width",
                                  attrs: {
                                    disabled: _vm.resource.indexOf(16) == -1,
                                    type: "primary"
                                  },
                                  on: { click: _vm.addLeaderClicked }
                                },
                                [_vm._v("添加 +")]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _vm._l(_vm.leaderListData, function(item, index) {
                        return _c(
                          "el-col",
                          { key: index + "leader", attrs: { span: 24 } },
                          [
                            _c(
                              "el-card",
                              [
                                _c(
                                  "el-button",
                                  {
                                    staticClass: "leave-button",
                                    attrs: {
                                      disabled: _vm.resource.indexOf(18) == -1,
                                      type: "danger",
                                      size: "mini"
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.deleteLeader(item)
                                      }
                                    }
                                  },
                                  [_vm._v("调离")]
                                ),
                                _vm._v(" "),
                                _c("p", { staticClass: "leader-title" }, [
                                  _c("img", {
                                    staticClass: "leader-picture",
                                    attrs: { src: item.picture, alt: "头像" }
                                  }),
                                  _vm._v(" "),
                                  _c("span", { staticClass: "leader-name" }, [
                                    _vm._v(_vm._s(item.name))
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "span",
                                    { staticClass: "leader-position" },
                                    [_vm._v(_vm._s(item.positionName))]
                                  )
                                ]),
                                _vm._v(" "),
                                _c("p", { staticClass: "leader-description" }, [
                                  _vm._v(_vm._s(item.description))
                                ])
                              ],
                              1
                            )
                          ],
                          1
                        )
                      })
                    ],
                    2
                  )
                ],
                1
              )
            ],
            1
          )
        : _c("div", { staticClass: "no-data-div" }, [
            _c("i", { staticClass: "el-icon-warning warning-icon" }),
            _vm._v("该组织下没有子组织, 请先添加党组织后再添加领导角色")
          ]),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: "添加领导",
            "close-on-click-modal": false,
            visible: _vm.peopleDialogVisible,
            width: "40vw"
          },
          on: {
            "update:visible": function($event) {
              _vm.peopleDialogVisible = $event
            }
          }
        },
        [
          _c(
            "el-form",
            { ref: "leaderForm", attrs: { "label-width": "80px" } },
            [
              _c(
                "el-form-item",
                { attrs: { label: "职位", required: "" } },
                [
                  _c(
                    "el-select",
                    {
                      staticClass: "fill-width",
                      attrs: {
                        type: "text",
                        "value-key": "id",
                        palceholder: "请选择职位"
                      },
                      model: {
                        value: _vm.position,
                        callback: function($$v) {
                          _vm.position = $$v
                        },
                        expression: "position"
                      }
                    },
                    _vm._l(_vm.positionsListData, function(option) {
                      return _c("el-option", {
                        key: "position" + _vm.index,
                        attrs: { value: option, label: option.name }
                      })
                    }),
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c("el-form-item", { attrs: { label: "姓名" } }, [
                _c(
                  "div",
                  { staticClass: "search-name-wrap" },
                  [
                    _c("el-input", {
                      attrs: { type: "text", palceholder: "请输入人员姓名" },
                      nativeOn: {
                        keyup: function($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k(
                              $event.keyCode,
                              "enter",
                              13,
                              $event.key,
                              "Enter"
                            )
                          ) {
                            return null
                          }
                          return _vm.getPeopleTableListData($event)
                        }
                      },
                      model: {
                        value: _vm.peopleName,
                        callback: function($$v) {
                          _vm.peopleName = $$v
                        },
                        expression: "peopleName"
                      }
                    }),
                    _c(
                      "el-button",
                      {
                        attrs: { type: "primary", size: "small" },
                        on: { click: _vm.getPeopleTableListData }
                      },
                      [_vm._v("搜索")]
                    )
                  ],
                  1
                )
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c("span", { staticClass: "tip-text" }, [
            _vm._v("搜索人员之后需要点击将其选中")
          ]),
          _vm._v(" "),
          _c(
            "el-table",
            {
              directives: [
                {
                  name: "loading",
                  rawName: "v-loading",
                  value: _vm.peopleLoading,
                  expression: "peopleLoading"
                }
              ],
              ref: "peopleTable",
              staticStyle: { width: "100%" },
              attrs: {
                data: _vm.peopleTableListData,
                stripe: "",
                "tooltip-effect": "dark"
              },
              on: { "cell-click": _vm.clickSingle }
            },
            [
              _c("el-table-column", {
                attrs: { prop: "name", label: "姓名", width: "120" }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: {
                  prop: "partyOrgName",
                  label: "支部",
                  "show-overflow-tooltip": ""
                }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { width: "100" },
                scopedSlots: _vm._u(
                  [
                    {
                      key: "default",
                      fn: function(scope) {
                        return _vm.tablePeopleId == scope.row.infoId
                          ? [
                              _vm._v("已选择"),
                              _c("i", { staticClass: "el-icon-success" })
                            ]
                          : undefined
                      }
                    }
                  ],
                  null,
                  true
                )
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "span",
            { attrs: { slot: "footer" }, slot: "footer" },
            [
              _c(
                "el-button",
                {
                  on: {
                    click: function($event) {
                      _vm.peopleDialogVisible = false
                    }
                  }
                },
                [_vm._v("取 消")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: {
                    type: "primary",
                    disabled: !_vm.tablePeopleId || !_vm.position
                  },
                  on: { click: _vm.submitPeople }
                },
                [_vm._v("确 定")]
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-fff95e78", esExports)
  }
}

/***/ })

});