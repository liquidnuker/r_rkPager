/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 48);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(18)('wks')
  , uid        = __webpack_require__(12)
  , Symbol     = __webpack_require__(1).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(9)
  , IE8_DOM_DEFINE = __webpack_require__(33)
  , toPrimitive    = __webpack_require__(19)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(5) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(11)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(64)
  , defined = __webpack_require__(16);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(1)
  , core      = __webpack_require__(0)
  , ctx       = __webpack_require__(32)
  , hide      = __webpack_require__(8)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(4)
  , createDesc = __webpack_require__(13);
module.exports = __webpack_require__(5) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(42)
  , enumBugKeys = __webpack_require__(24);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(18)('keys')
  , uid    = __webpack_require__(12);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(10);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(9)
  , dPs         = __webpack_require__(63)
  , enumBugKeys = __webpack_require__(24)
  , IE_PROTO    = __webpack_require__(17)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(34)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(68).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(4).f
  , has = __webpack_require__(3)
  , TAG = __webpack_require__(2)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(2);

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(1)
  , core           = __webpack_require__(0)
  , LIBRARY        = __webpack_require__(21)
  , wksExt         = __webpack_require__(26)
  , defineProperty = __webpack_require__(4).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(52), __esModule: true };

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(16);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(3)
  , toObject    = __webpack_require__(30)
  , IE_PROTO    = __webpack_require__(17)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(55);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(5) && !__webpack_require__(11)(function(){
  return Object.defineProperty(__webpack_require__(34)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10)
  , document = __webpack_require__(1).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(56);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(38);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(59);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(72);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(61)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(40)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(21)
  , $export        = __webpack_require__(7)
  , redefine       = __webpack_require__(41)
  , hide           = __webpack_require__(8)
  , has            = __webpack_require__(3)
  , Iterators      = __webpack_require__(14)
  , $iterCreate    = __webpack_require__(62)
  , setToStringTag = __webpack_require__(25)
  , getPrototypeOf = __webpack_require__(31)
  , ITERATOR       = __webpack_require__(2)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(3)
  , toIObject    = __webpack_require__(6)
  , arrayIndexOf = __webpack_require__(65)(false)
  , IE_PROTO     = __webpack_require__(17)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(69);
var global        = __webpack_require__(1)
  , hide          = __webpack_require__(8)
  , Iterators     = __webpack_require__(14)
  , TO_STRING_TAG = __webpack_require__(2)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 44 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(42)
  , hiddenKeys = __webpack_require__(24).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(28)
  , createDesc     = __webpack_require__(13)
  , toIObject      = __webpack_require__(6)
  , toPrimitive    = __webpack_require__(19)
  , has            = __webpack_require__(3)
  , IE8_DOM_DEFINE = __webpack_require__(33)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(5) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(83);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(87);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(38);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(49);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(50);

var _Home = __webpack_require__(51);

var _Home2 = _interopRequireDefault(_Home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

ReactDOM.render(React.createElement(_Home2.default, null), document.getElementById('root'));

// router with route config
// import "./components/Home+Router.jsx";

// default

/***/ }),
/* 50 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(29);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(35);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(36);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(37);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(47);

var _inherits3 = _interopRequireDefault(_inherits2);

var _RkPager = __webpack_require__(90);

var _RkPager2 = _interopRequireDefault(_RkPager);

var _RkPager3 = __webpack_require__(100);

var _RkPager4 = _interopRequireDefault(_RkPager3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function (_React$Component) {
  (0, _inherits3.default)(Home, _React$Component);

  function Home(props) {
    (0, _classCallCheck3.default)(this, Home);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).call(this, props));

    _this.state = {};

    // binders
    return _this;
  }
  // hooks

  // methods

  (0, _createClass3.default)(Home, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(_RkPager2.default, null),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement(_RkPager4.default, null)
      );
    }
  }]);
  return Home;
}(React.Component);

exports.default = Home;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(53);
module.exports = __webpack_require__(0).Object.getPrototypeOf;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(30)
  , $getPrototypeOf = __webpack_require__(31);

__webpack_require__(54)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(7)
  , core    = __webpack_require__(0)
  , fails   = __webpack_require__(11);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(57), __esModule: true };

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(58);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(7);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(5), 'Object', {defineProperty: __webpack_require__(4).f});

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(60), __esModule: true };

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39);
__webpack_require__(43);
module.exports = __webpack_require__(26).f('iterator');

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(20)
  , defined   = __webpack_require__(16);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(22)
  , descriptor     = __webpack_require__(13)
  , setToStringTag = __webpack_require__(25)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(8)(IteratorPrototype, __webpack_require__(2)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(4)
  , anObject = __webpack_require__(9)
  , getKeys  = __webpack_require__(15);

module.exports = __webpack_require__(5) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(23);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(6)
  , toLength  = __webpack_require__(66)
  , toIndex   = __webpack_require__(67);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(20)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(20)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1).document && document.documentElement;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(70)
  , step             = __webpack_require__(71)
  , Iterators        = __webpack_require__(14)
  , toIObject        = __webpack_require__(6);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(40)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(73), __esModule: true };

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(74);
__webpack_require__(80);
__webpack_require__(81);
__webpack_require__(82);
module.exports = __webpack_require__(0).Symbol;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(1)
  , has            = __webpack_require__(3)
  , DESCRIPTORS    = __webpack_require__(5)
  , $export        = __webpack_require__(7)
  , redefine       = __webpack_require__(41)
  , META           = __webpack_require__(75).KEY
  , $fails         = __webpack_require__(11)
  , shared         = __webpack_require__(18)
  , setToStringTag = __webpack_require__(25)
  , uid            = __webpack_require__(12)
  , wks            = __webpack_require__(2)
  , wksExt         = __webpack_require__(26)
  , wksDefine      = __webpack_require__(27)
  , keyOf          = __webpack_require__(76)
  , enumKeys       = __webpack_require__(77)
  , isArray        = __webpack_require__(78)
  , anObject       = __webpack_require__(9)
  , toIObject      = __webpack_require__(6)
  , toPrimitive    = __webpack_require__(19)
  , createDesc     = __webpack_require__(13)
  , _create        = __webpack_require__(22)
  , gOPNExt        = __webpack_require__(79)
  , $GOPD          = __webpack_require__(46)
  , $DP            = __webpack_require__(4)
  , $keys          = __webpack_require__(15)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(45).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(28).f  = $propertyIsEnumerable;
  __webpack_require__(44).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(21)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(8)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(12)('meta')
  , isObject = __webpack_require__(10)
  , has      = __webpack_require__(3)
  , setDesc  = __webpack_require__(4).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(11)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(15)
  , toIObject = __webpack_require__(6);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(15)
  , gOPS    = __webpack_require__(44)
  , pIE     = __webpack_require__(28);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(23);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(6)
  , gOPN      = __webpack_require__(45).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 80 */
/***/ (function(module, exports) {



/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('asyncIterator');

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('observable');

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(84), __esModule: true };

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(85);
module.exports = __webpack_require__(0).Object.setPrototypeOf;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(7);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(86).set});

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(10)
  , anObject = __webpack_require__(9);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(32)(Function.call, __webpack_require__(46).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(89);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(7)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(22)});

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(29);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(35);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(36);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(37);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(47);

var _inherits3 = _interopRequireDefault(_inherits2);

var _pager_tempdata = __webpack_require__(91);

var _pager = __webpack_require__(92);

var _pager2 = _interopRequireDefault(_pager);

var _pagebtns = __webpack_require__(93);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RkPager1_jumpToPage = function (_React$Component) {
  (0, _inherits3.default)(RkPager1_jumpToPage, _React$Component);

  function RkPager1_jumpToPage(props) {
    (0, _classCallCheck3.default)(this, RkPager1_jumpToPage);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RkPager1_jumpToPage.__proto__ || (0, _getPrototypeOf2.default)(RkPager1_jumpToPage)).call(this, props));

    _this.state = {
      value: ""
    };

    // binders
    _this.handleChange = _this.handleChange.bind(_this);
    _this.keyPress = _this.keyPress.bind(_this);
    return _this;
  }
  // hooks

  // methods


  (0, _createClass3.default)(RkPager1_jumpToPage, [{
    key: "handleChange",
    value: function handleChange(event) {
      this.setState({
        value: event.target.value
      });
    }
  }, {
    key: "keyPress",
    value: function keyPress(event) {
      if (event.keyCode == 13) {
        this.setState({
          value: event.target.value
        });

        this.props.pr_val_showItems(Number(this.state.value));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "aside",
        { className: "jspager1_jumptopageholder" },
        React.createElement(
          "label",
          { "for": "jspager1_jump" },
          "Jump to page\xA0"
        ),
        React.createElement("input", { type: "tel", name: "jspager1_jump",
          className: " jspager1_jump", placeholder: "", tabindex: "0",
          value: this.state.value,
          onChange: this.handleChange,
          onKeyDown: this.keyPress }),
        React.createElement(
          "button",
          { className: "btn", "data-message": "jump to page",
            onClick: function onClick() {
              _this2.props.pr_val_showItems(Number(_this2.state.value));
            } },
          "Go"
        )
      );
    }
  }]);
  return RkPager1_jumpToPage;
}(React.Component);

var RkPager1_itemsPerPage = function (_React$Component2) {
  (0, _inherits3.default)(RkPager1_itemsPerPage, _React$Component2);

  function RkPager1_itemsPerPage(props) {
    (0, _classCallCheck3.default)(this, RkPager1_itemsPerPage);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (RkPager1_itemsPerPage.__proto__ || (0, _getPrototypeOf2.default)(RkPager1_itemsPerPage)).call(this, props));

    _this3.state = {};

    // binders
    _this3.handleChange = _this3.handleChange.bind(_this3);

    return _this3;
  }
  // hooks

  // methods


  (0, _createClass3.default)(RkPager1_itemsPerPage, [{
    key: "handleChange",
    value: function handleChange(event) {
      this.props.pr_val_setPerPage(event.target.value);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "aside",
        { className: "jspager1_perpageholder" },
        React.createElement(
          "label",
          { "for": "jspager1_perpage" },
          "perPage:\xA0"
        ),
        React.createElement(
          "select",
          { name: "jspager1_perpage", className: "jspager1_perpage",
            tabindex: "0", onChange: this.handleChange,
            value: this.props.pr_perPage },
          this.props.pr_perPageItems.map(function (i) {
            return React.createElement(
              "option",
              { key: i, value: i },
              i
            );
          })
        )
      );
    }
  }]);
  return RkPager1_itemsPerPage;
}(React.Component);

var RkPager1_btnFirst = function (_React$Component3) {
  (0, _inherits3.default)(RkPager1_btnFirst, _React$Component3);

  function RkPager1_btnFirst(props) {
    (0, _classCallCheck3.default)(this, RkPager1_btnFirst);

    var _this4 = (0, _possibleConstructorReturn3.default)(this, (RkPager1_btnFirst.__proto__ || (0, _getPrototypeOf2.default)(RkPager1_btnFirst)).call(this, props));

    _this4.state = {};

    // binders

    return _this4;
  }
  // hooks

  // methods

  (0, _createClass3.default)(RkPager1_btnFirst, [{
    key: "render",
    value: function render() {
      var _this5 = this;

      return React.createElement(
        "button",
        { className: "btn btn_first", tabindex: "0",
          onClick: function onClick() {
            _this5.props.pr_val_showItems(1);
          } },
        React.createElement(
          "svg",
          { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
          React.createElement("path", { d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" })
        ),
        React.createElement(
          "span",
          null,
          "First"
        )
      );
    }
  }]);
  return RkPager1_btnFirst;
}(React.Component);

var RkPager1_btnPrev = function (_React$Component4) {
  (0, _inherits3.default)(RkPager1_btnPrev, _React$Component4);

  function RkPager1_btnPrev(props) {
    (0, _classCallCheck3.default)(this, RkPager1_btnPrev);

    var _this6 = (0, _possibleConstructorReturn3.default)(this, (RkPager1_btnPrev.__proto__ || (0, _getPrototypeOf2.default)(RkPager1_btnPrev)).call(this, props));

    _this6.state = {};

    // binders

    return _this6;
  }
  // hooks

  // methods

  (0, _createClass3.default)(RkPager1_btnPrev, [{
    key: "render",
    value: function render() {
      var _this7 = this;

      return React.createElement(
        "button",
        { className: "btn btn_prev", tabindex: "0",
          onClick: function onClick() {
            _this7.props.pr_val_flip();
          } },
        React.createElement(
          "svg",
          { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
          React.createElement("path", { d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" })
        ),
        React.createElement(
          "span",
          null,
          "Prev"
        )
      );
    }
  }]);
  return RkPager1_btnPrev;
}(React.Component);

var RkPager1_btnNext = function (_React$Component5) {
  (0, _inherits3.default)(RkPager1_btnNext, _React$Component5);

  function RkPager1_btnNext(props) {
    (0, _classCallCheck3.default)(this, RkPager1_btnNext);

    var _this8 = (0, _possibleConstructorReturn3.default)(this, (RkPager1_btnNext.__proto__ || (0, _getPrototypeOf2.default)(RkPager1_btnNext)).call(this, props));

    _this8.state = {};

    // binders

    return _this8;
  }
  // hooks

  // methods

  (0, _createClass3.default)(RkPager1_btnNext, [{
    key: "render",
    value: function render() {
      var _this9 = this;

      return React.createElement(
        "button",
        { className: "btn btn_next", tabindex: "0",
          onClick: function onClick() {
            _this9.props.pr_val_flip("next");
          } },
        React.createElement(
          "span",
          null,
          "Next"
        ),
        React.createElement(
          "svg",
          { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
          React.createElement("path", { d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" })
        )
      );
    }
  }]);
  return RkPager1_btnNext;
}(React.Component);

var RkPager1_btnLast = function (_React$Component6) {
  (0, _inherits3.default)(RkPager1_btnLast, _React$Component6);

  function RkPager1_btnLast(props) {
    (0, _classCallCheck3.default)(this, RkPager1_btnLast);

    var _this10 = (0, _possibleConstructorReturn3.default)(this, (RkPager1_btnLast.__proto__ || (0, _getPrototypeOf2.default)(RkPager1_btnLast)).call(this, props));

    _this10.state = {};

    // binders

    return _this10;
  }
  // hooks

  // methods

  (0, _createClass3.default)(RkPager1_btnLast, [{
    key: "render",
    value: function render() {
      var _this11 = this;

      return React.createElement(
        "button",
        { className: "btn btn_last", tabindex: "0",
          onClick: function onClick() {
            _this11.props.pr_val_showItems(_this11.props.pr_totalPages);
          } },
        React.createElement(
          "span",
          null,
          "Last"
        ),
        React.createElement(
          "svg",
          { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
          React.createElement("path", { d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" })
        )
      );
    }
  }]);
  return RkPager1_btnLast;
}(React.Component);

var RkPager1_pageBtnItems = function (_React$Component7) {
  (0, _inherits3.default)(RkPager1_pageBtnItems, _React$Component7);

  function RkPager1_pageBtnItems(props) {
    (0, _classCallCheck3.default)(this, RkPager1_pageBtnItems);

    var _this12 = (0, _possibleConstructorReturn3.default)(this, (RkPager1_pageBtnItems.__proto__ || (0, _getPrototypeOf2.default)(RkPager1_pageBtnItems)).call(this, props));

    _this12.state = {};

    // binders

    return _this12;
  }
  // hooks

  // methods

  (0, _createClass3.default)(RkPager1_pageBtnItems, [{
    key: "render",
    value: function render() {
      var _this13 = this;

      if (this.props.pr_i === this.props.pr_currentPage) {
        return React.createElement(
          "a",
          { className: "jspager1_pagebtn \r jspager1_pagebtn--active", tabindex: "0",
            onClick: function onClick() {
              _this13.props.pr_val_showItems(_this13.props.pr_i);
            } },
          this.props.pr_i
        );
      } else {
        return React.createElement(
          "a",
          { className: "jspager1_pagebtn", tabindex: "0",
            onClick: function onClick() {
              _this13.props.pr_val_showItems(_this13.props.pr_i);
            } },
          this.props.pr_i
        );
      }
    }
  }]);
  return RkPager1_pageBtnItems;
}(React.Component);

var RkPager1_pageBtns = function (_React$Component8) {
  (0, _inherits3.default)(RkPager1_pageBtns, _React$Component8);

  function RkPager1_pageBtns(props) {
    (0, _classCallCheck3.default)(this, RkPager1_pageBtns);

    var _this14 = (0, _possibleConstructorReturn3.default)(this, (RkPager1_pageBtns.__proto__ || (0, _getPrototypeOf2.default)(RkPager1_pageBtns)).call(this, props));

    _this14.state = {};

    // binders

    return _this14;
  }
  // hooks

  // methods

  (0, _createClass3.default)(RkPager1_pageBtns, [{
    key: "render",
    value: function render() {
      var _this15 = this;

      return React.createElement(
        "aside",
        { className: "jspager1_pagebtnholder",
          "aria-atomic": "true", "aria-live": "polite",
          "aria-relevant": "additions" },
        this.props.pr_buttonSet.map(function (i) {
          return React.createElement(RkPager1_pageBtnItems, {
            pr_i: i,
            pr_currentPage: _this15.props.pr_currentPage,
            pr_val_showItems: _this15.props.pr_val_showItems });
        })
      );
    }
  }]);
  return RkPager1_pageBtns;
}(React.Component);

var RkPager1_pageSelector = function (_React$Component9) {
  (0, _inherits3.default)(RkPager1_pageSelector, _React$Component9);

  function RkPager1_pageSelector(props) {
    (0, _classCallCheck3.default)(this, RkPager1_pageSelector);

    var _this16 = (0, _possibleConstructorReturn3.default)(this, (RkPager1_pageSelector.__proto__ || (0, _getPrototypeOf2.default)(RkPager1_pageSelector)).call(this, props));

    _this16.state = {};

    // binders
    _this16.handleChange = _this16.handleChange.bind(_this16);

    return _this16;
  }
  // hooks

  // methods


  (0, _createClass3.default)(RkPager1_pageSelector, [{
    key: "createOptions",
    value: function createOptions() {
      var _this17 = this;

      var items = [];

      var _loop = function _loop(i) {
        items.push(React.createElement(
          "option",
          { onClick: function onClick() {
              _this17.props.pr_val_showItems(i);
            }, key: i, value: i },
          i
        ));
      };

      for (var i = 1; i <= this.props.pr_totalPages; i++) {
        _loop(i);
      }
      return items;
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      this.props.pr_val_showItems(event.target.value);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "aside",
        { className: "jspager1_totalpagesholder" },
        React.createElement(
          "label",
          { "for": "jspager1_select" },
          "Page:"
        ),
        React.createElement(
          "p",
          null,
          this.props.pr_currentPage
        ),
        React.createElement(
          "select",
          { className: "jspager1_select",
            name: "jspager1_select", value: this.props.pr_currentPage,
            onChange: this.handleChange, tabindex: "0" },
          this.createOptions()
        ),
        React.createElement(
          "p",
          null,
          "of ",
          this.props.pr_totalPages
        )
      );
    }
  }]);
  return RkPager1_pageSelector;
}(React.Component);

var RkPager1_itemList = function (_React$Component10) {
  (0, _inherits3.default)(RkPager1_itemList, _React$Component10);

  function RkPager1_itemList(props) {
    (0, _classCallCheck3.default)(this, RkPager1_itemList);

    var _this18 = (0, _possibleConstructorReturn3.default)(this, (RkPager1_itemList.__proto__ || (0, _getPrototypeOf2.default)(RkPager1_itemList)).call(this, props));

    _this18.state = {};

    // binders

    return _this18;
  }
  // hooks

  // methods

  (0, _createClass3.default)(RkPager1_itemList, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "row jspager1_items",
          "aria-atomic": "true", "aria-live": "assertive", "aria-relevant": "all" },
        this.props.pr_list.map(function (i) {
          return React.createElement(
            "span",
            null,
            i
          );
        })
      );
    }
  }]);
  return RkPager1_itemList;
}(React.Component);

var RkPager1 = function (_React$Component11) {
  (0, _inherits3.default)(RkPager1, _React$Component11);

  function RkPager1(props) {
    (0, _classCallCheck3.default)(this, RkPager1);

    var _this19 = (0, _possibleConstructorReturn3.default)(this, (RkPager1.__proto__ || (0, _getPrototypeOf2.default)(RkPager1)).call(this, props));

    _this19.items = []; // raw items
    _this19.pg = null;

    _this19.state = {
      itemList: [], // paginated items

      perPage: 10,
      perPageItems: [10, 20, 50, 100],
      totalPages: "",
      currentPage: "",

      buttonSet: []
    };

    // binders
    _this19.showItems = _this19.showItems.bind(_this19);
    _this19.setPerPage = _this19.setPerPage.bind(_this19);
    _this19.flip = _this19.flip.bind(_this19);

    return _this19;
  }
  // hooks


  (0, _createClass3.default)(RkPager1, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.items = _pager_tempdata.tempData;
      this.activatePager();
    }

    // methods

  }, {
    key: "activatePager",
    value: function activatePager() {
      var _this20 = this;

      this.pg = null;
      this.pg = new _pager2.default({
        perPage: this.state.perPage,
        data: this.items
      });

      this.setState(function (prevState) {
        return {
          totalPages: _this20.pg.getTotalPages()
        };
      });

      this.setPageBtns();
      this.showItems(1);
    }
  }, {
    key: "showItems",
    value: function showItems(num) {
      var _this21 = this;

      this.setState(function (prevState) {
        return {
          itemList: _this21.pg.page(num),
          currentPage: _this21.pg.currentPage
        };
      });

      this.changePageBtns();
    }
  }, {
    key: "flip",
    value: function flip(direction) {
      if (direction === "next") {
        this.showItems(this.pg.next());
      } else {
        this.showItems(this.pg.prev());
      }
    }
  }, {
    key: "setPerPage",
    value: function setPerPage(perPage) {
      this.state.perPage = perPage;
      this.activatePager();
    }
  }, {
    key: "setPageBtns",
    value: function setPageBtns() {
      this.temp = [];
      for (var i = 0, l = this.pg.getTotalPages(); i < l; i++) {
        this.temp.push((0, _pagebtns.pageBtns)(i, l));
      }
    }
  }, {
    key: "changePageBtns",
    value: function changePageBtns() {
      var _this22 = this;

      this.setState(function (prevState) {
        return {
          buttonSet: _this22.temp[_this22.pg.currentPage - 1]
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "jspager1_holder" },
        React.createElement(RkPager1_itemList, {
          pr_list: this.state.itemList }),
        React.createElement(
          "nav",
          { className: "jspager1" },
          React.createElement(RkPager1_pageSelector, {
            pr_totalPages: this.state.totalPages,
            pr_currentPage: this.state.currentPage,
            pr_val_showItems: this.showItems }),
          React.createElement(
            "aside",
            { className: "jspager1_prevnextholder" },
            React.createElement(RkPager1_btnFirst, {
              pr_val_showItems: this.showItems }),
            React.createElement(RkPager1_btnPrev, {
              pr_val_flip: this.flip }),
            React.createElement(RkPager1_btnNext, {
              pr_val_flip: this.flip }),
            React.createElement(RkPager1_btnLast, {
              pr_totalPages: this.state.totalPages,
              pr_val_showItems: this.showItems })
          ),
          React.createElement(RkPager1_pageBtns, {
            pr_buttonSet: this.state.buttonSet,
            pr_currentPage: this.state.currentPage,
            pr_val_showItems: this.showItems }),
          React.createElement(RkPager1_jumpToPage, {
            pr_val_showItems: this.showItems }),
          React.createElement(RkPager1_itemsPerPage, {
            pr_perPage: this.state.perPage,
            pr_perPageItems: this.state.perPageItems,
            pr_val_setPerPage: this.setPerPage })
        )
      );
    }
  }]);
  return RkPager1;
}(React.Component);

exports.default = RkPager1;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var tempData = [];
for (var i = 0, l = 162; i < l; i++) {
  tempData.push(i);
}

exports.tempData = tempData;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Pager;
// pagination helper
// ======================================================/

function Pager(opts) {
  this.data = opts.data;
  this.perPage = opts.perPage;
  this.currentPage = 1;
}

Pager.prototype = {
  getTotalPages: function getTotalPages() {
    // ret num
    return Math.ceil(this.data.length / this.perPage);
  },
  getCurrentOffset: function getCurrentOffset() {
    // ret num
    return (this.currentPage - 1) * this.perPage;
  },
  page: function page(num) {
    if (this.isValidPage(num)) {
      this.currentPage = num;

      var start = this.getCurrentOffset();
      // let end = start + this.perPage;
      var end = start + Number(this.perPage);

      return this.data.slice(start, end);
    } else {
      // default page
      this.currentPage = 1;
      return this.data.slice(0, this.perPage);
    }
  },
  hasNext: function hasNext() {
    // ret boolean
    return this.currentPage < this.getTotalPages();
  },
  hasPrev: function hasPrev() {
    // ret boolean
    return this.currentPage !== 1;
  },
  prev: function prev() {
    // ret num
    if (this.hasPrev()) {
      this.currentPage = this.currentPage - 1;
    } else {
      this.currentPage = this.getTotalPages();
    }
    return this.currentPage;
  },
  next: function next() {
    // ret num
    if (this.hasNext()) {
      this.currentPage++;
    } else {
      this.currentPage = 1;
    }
    // console.log(this.currentPage);
    return this.currentPage;
  },
  isValidPage: function isValidPage(num) {
    // ret boolean
    return num > 0 && num <= this.getTotalPages();
  }
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pageBtns = undefined;

var _getIterator2 = __webpack_require__(94);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 *  Generates paginator page buttons
 *
 *  Credits:
 *  https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
 *  
 *  ...returns an array of [1] if there is only 1 page. 
 *  - anotherstarburst
 *  
 */

var pageBtns = function pageBtns(currentPage, nrOfPages) {
  var delta = 2,
      range = [],
      rangeWithDots = [],
      l;

  range.push(1);

  if (nrOfPages <= 1) {
    return range;
  }

  for (var i = currentPage - delta; i <= currentPage + delta; i++) {
    if (i < nrOfPages && i > 1) {
      range.push(i);
    }
  }
  range.push(nrOfPages);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(range), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _i = _step.value;

      if (l) {
        if (_i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (_i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(_i);
      l = _i;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return rangeWithDots;
  // return range;
};

exports.pageBtns = pageBtns;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(95), __esModule: true };

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43);
__webpack_require__(39);
module.exports = __webpack_require__(96);

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(9)
  , get      = __webpack_require__(97);
module.exports = __webpack_require__(0).getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(98)
  , ITERATOR  = __webpack_require__(2)('iterator')
  , Iterators = __webpack_require__(14);
module.exports = __webpack_require__(0).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(23)
  , TAG = __webpack_require__(2)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 99 */,
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(29);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(35);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(36);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(37);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(47);

var _inherits3 = _interopRequireDefault(_inherits2);

var _pager_tempdata = __webpack_require__(91);

var _pager = __webpack_require__(92);

var _pager2 = _interopRequireDefault(_pager);

var _pagebtns = __webpack_require__(93);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RkPager2_itemsPerPage = function (_React$Component) {
  (0, _inherits3.default)(RkPager2_itemsPerPage, _React$Component);

  function RkPager2_itemsPerPage(props) {
    (0, _classCallCheck3.default)(this, RkPager2_itemsPerPage);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RkPager2_itemsPerPage.__proto__ || (0, _getPrototypeOf2.default)(RkPager2_itemsPerPage)).call(this, props));

    _this.state = {};

    // binders
    _this.handleChange = _this.handleChange.bind(_this);

    return _this;
  }
  // hooks

  // methods


  (0, _createClass3.default)(RkPager2_itemsPerPage, [{
    key: "handleChange",
    value: function handleChange(event) {
      this.props.pr_val_setPerPage(event.target.value);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "aside",
        { className: "jspager2_perpageholder" },
        React.createElement(
          "label",
          { "for": "jspager2_perpage" },
          "perPage:\xA0"
        ),
        React.createElement(
          "select",
          { name: "jspager2_perpage", className: "jspager2_perpage",
            tabindex: "0", onChange: this.handleChange,
            value: this.props.pr_perPage },
          this.props.pr_perPageItems.map(function (i) {
            return React.createElement(
              "option",
              { key: i, value: i },
              i
            );
          })
        )
      );
    }
  }]);
  return RkPager2_itemsPerPage;
}(React.Component);

var RkPager2_btnFirst = function (_React$Component2) {
  (0, _inherits3.default)(RkPager2_btnFirst, _React$Component2);

  function RkPager2_btnFirst(props) {
    (0, _classCallCheck3.default)(this, RkPager2_btnFirst);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (RkPager2_btnFirst.__proto__ || (0, _getPrototypeOf2.default)(RkPager2_btnFirst)).call(this, props));

    _this2.state = {};

    // binders

    return _this2;
  }
  // hooks

  // methods

  (0, _createClass3.default)(RkPager2_btnFirst, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement(
        "button",
        { className: "btn btn_first", tabindex: "0",
          onClick: function onClick() {
            _this3.props.pr_val_showItems(1);
          } },
        React.createElement(
          "svg",
          { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
          React.createElement("path", { d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" })
        ),
        React.createElement(
          "span",
          null,
          "First"
        )
      );
    }
  }]);
  return RkPager2_btnFirst;
}(React.Component);

var RkPager2_btnPrev = function (_React$Component3) {
  (0, _inherits3.default)(RkPager2_btnPrev, _React$Component3);

  function RkPager2_btnPrev(props) {
    (0, _classCallCheck3.default)(this, RkPager2_btnPrev);

    var _this4 = (0, _possibleConstructorReturn3.default)(this, (RkPager2_btnPrev.__proto__ || (0, _getPrototypeOf2.default)(RkPager2_btnPrev)).call(this, props));

    _this4.state = {};

    // binders

    return _this4;
  }
  // hooks

  // methods

  (0, _createClass3.default)(RkPager2_btnPrev, [{
    key: "render",
    value: function render() {
      var _this5 = this;

      return React.createElement(
        "button",
        { className: "btn btn_prev", tabindex: "0",
          onClick: function onClick() {
            _this5.props.pr_val_flip();
          } },
        React.createElement(
          "svg",
          { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
          React.createElement("path", { d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" })
        ),
        React.createElement(
          "span",
          null,
          "Prev"
        )
      );
    }
  }]);
  return RkPager2_btnPrev;
}(React.Component);

var RkPager2_btnNext = function (_React$Component4) {
  (0, _inherits3.default)(RkPager2_btnNext, _React$Component4);

  function RkPager2_btnNext(props) {
    (0, _classCallCheck3.default)(this, RkPager2_btnNext);

    var _this6 = (0, _possibleConstructorReturn3.default)(this, (RkPager2_btnNext.__proto__ || (0, _getPrototypeOf2.default)(RkPager2_btnNext)).call(this, props));

    _this6.state = {};

    // binders

    return _this6;
  }
  // hooks

  // methods

  (0, _createClass3.default)(RkPager2_btnNext, [{
    key: "render",
    value: function render() {
      var _this7 = this;

      return React.createElement(
        "button",
        { className: "btn btn_next", tabindex: "0",
          onClick: function onClick() {
            _this7.props.pr_val_flip("next");
          } },
        React.createElement(
          "span",
          null,
          "Next"
        ),
        React.createElement(
          "svg",
          { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
          React.createElement("path", { d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" })
        )
      );
    }
  }]);
  return RkPager2_btnNext;
}(React.Component);

var RkPager2_btnLast = function (_React$Component5) {
  (0, _inherits3.default)(RkPager2_btnLast, _React$Component5);

  function RkPager2_btnLast(props) {
    (0, _classCallCheck3.default)(this, RkPager2_btnLast);

    var _this8 = (0, _possibleConstructorReturn3.default)(this, (RkPager2_btnLast.__proto__ || (0, _getPrototypeOf2.default)(RkPager2_btnLast)).call(this, props));

    _this8.state = {};

    // binders

    return _this8;
  }
  // hooks

  // methods

  (0, _createClass3.default)(RkPager2_btnLast, [{
    key: "render",
    value: function render() {
      var _this9 = this;

      return React.createElement(
        "button",
        { className: "btn btn_last", tabindex: "0",
          onClick: function onClick() {
            _this9.props.pr_val_showItems(_this9.props.pr_totalPages);
          } },
        React.createElement(
          "span",
          null,
          "Last"
        ),
        React.createElement(
          "svg",
          { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
          React.createElement("path", { d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" })
        )
      );
    }
  }]);
  return RkPager2_btnLast;
}(React.Component);

var RkPager2_pageBtnItems = function (_React$Component6) {
  (0, _inherits3.default)(RkPager2_pageBtnItems, _React$Component6);

  function RkPager2_pageBtnItems(props) {
    (0, _classCallCheck3.default)(this, RkPager2_pageBtnItems);

    var _this10 = (0, _possibleConstructorReturn3.default)(this, (RkPager2_pageBtnItems.__proto__ || (0, _getPrototypeOf2.default)(RkPager2_pageBtnItems)).call(this, props));

    _this10.state = {};

    // binders

    return _this10;
  }
  // hooks

  // methods

  (0, _createClass3.default)(RkPager2_pageBtnItems, [{
    key: "render",
    value: function render() {
      var _this11 = this;

      if (this.props.pr_i === this.props.pr_currentPage) {
        return React.createElement(
          "a",
          { className: "jspager2_pagebtn \r jspager2_pagebtn--active", tabindex: "0",
            onClick: function onClick() {
              _this11.props.pr_val_showItems(_this11.props.pr_i);
            } },
          this.props.pr_i
        );
      } else {
        return React.createElement(
          "a",
          { className: "jspager2_pagebtn", tabindex: "0",
            onClick: function onClick() {
              _this11.props.pr_val_showItems(_this11.props.pr_i);
            } },
          this.props.pr_i
        );
      }
    }
  }]);
  return RkPager2_pageBtnItems;
}(React.Component);

var RkPager2_pageBtns = function (_React$Component7) {
  (0, _inherits3.default)(RkPager2_pageBtns, _React$Component7);

  function RkPager2_pageBtns(props) {
    (0, _classCallCheck3.default)(this, RkPager2_pageBtns);

    var _this12 = (0, _possibleConstructorReturn3.default)(this, (RkPager2_pageBtns.__proto__ || (0, _getPrototypeOf2.default)(RkPager2_pageBtns)).call(this, props));

    _this12.state = {};

    // binders

    return _this12;
  }
  // hooks

  // methods

  (0, _createClass3.default)(RkPager2_pageBtns, [{
    key: "render",
    value: function render() {
      var _this13 = this;

      return React.createElement(
        "aside",
        { className: "jspager2_pagebtnholder",
          "aria-atomic": "true", "aria-live": "polite",
          "aria-relevant": "additions" },
        this.props.pr_buttonSet.map(function (i) {
          return React.createElement(RkPager2_pageBtnItems, {
            pr_i: i,
            pr_currentPage: _this13.props.pr_currentPage,
            pr_val_showItems: _this13.props.pr_val_showItems });
        })
      );
    }
  }]);
  return RkPager2_pageBtns;
}(React.Component);

var RkPager2_pageSelector = function (_React$Component8) {
  (0, _inherits3.default)(RkPager2_pageSelector, _React$Component8);

  function RkPager2_pageSelector(props) {
    (0, _classCallCheck3.default)(this, RkPager2_pageSelector);

    var _this14 = (0, _possibleConstructorReturn3.default)(this, (RkPager2_pageSelector.__proto__ || (0, _getPrototypeOf2.default)(RkPager2_pageSelector)).call(this, props));

    _this14.state = {};

    // binders
    _this14.handleChange = _this14.handleChange.bind(_this14);

    return _this14;
  }
  // hooks

  // methods


  (0, _createClass3.default)(RkPager2_pageSelector, [{
    key: "createOptions",
    value: function createOptions() {
      var _this15 = this;

      var items = [];

      var _loop = function _loop(i) {
        items.push(React.createElement(
          "option",
          { onClick: function onClick() {
              _this15.props.pr_val_showItems(i);
            }, key: i, value: i },
          i
        ));
      };

      for (var i = 1; i <= this.props.pr_totalPages; i++) {
        _loop(i);
      }
      return items;
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      this.props.pr_val_showItems(event.target.value);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "aside",
        { className: "jspager2_totalpagesholder" },
        React.createElement(
          "label",
          { "for": "jspager2_select" },
          "Page:"
        ),
        React.createElement(
          "p",
          null,
          this.props.pr_currentPage
        ),
        React.createElement(
          "select",
          { className: "jspager2_select",
            name: "jspager2_select", value: this.props.pr_currentPage,
            onChange: this.handleChange, tabindex: "0" },
          this.createOptions()
        ),
        React.createElement(
          "p",
          null,
          "of ",
          this.props.pr_totalPages
        )
      );
    }
  }]);
  return RkPager2_pageSelector;
}(React.Component);

var RkPager2_itemList = function (_React$Component9) {
  (0, _inherits3.default)(RkPager2_itemList, _React$Component9);

  function RkPager2_itemList(props) {
    (0, _classCallCheck3.default)(this, RkPager2_itemList);

    var _this16 = (0, _possibleConstructorReturn3.default)(this, (RkPager2_itemList.__proto__ || (0, _getPrototypeOf2.default)(RkPager2_itemList)).call(this, props));

    _this16.state = {};

    // binders

    return _this16;
  }
  // hooks

  // methods

  (0, _createClass3.default)(RkPager2_itemList, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "row jspager2_items",
          "aria-atomic": "true", "aria-live": "assertive", "aria-relevant": "all" },
        this.props.pr_list.map(function (i) {
          return React.createElement(
            "span",
            null,
            i
          );
        })
      );
    }
  }]);
  return RkPager2_itemList;
}(React.Component);

var RkPager2 = function (_React$Component10) {
  (0, _inherits3.default)(RkPager2, _React$Component10);

  function RkPager2(props) {
    (0, _classCallCheck3.default)(this, RkPager2);

    var _this17 = (0, _possibleConstructorReturn3.default)(this, (RkPager2.__proto__ || (0, _getPrototypeOf2.default)(RkPager2)).call(this, props));

    _this17.items = []; // raw items
    _this17.pg = null;

    _this17.state = {
      itemList: [], // paginated items

      perPage: 10,
      perPageItems: [10, 20, 50, 100],
      totalPages: "",
      currentPage: "",

      buttonSet: []
    };

    // binders
    _this17.showItems = _this17.showItems.bind(_this17);
    _this17.setPerPage = _this17.setPerPage.bind(_this17);
    _this17.flip = _this17.flip.bind(_this17);

    return _this17;
  }
  // hooks


  (0, _createClass3.default)(RkPager2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.items = _pager_tempdata.tempData;
      this.activatePager();
    }

    // methods

  }, {
    key: "activatePager",
    value: function activatePager() {
      var _this18 = this;

      this.pg = null;
      this.pg = new _pager2.default({
        perPage: this.state.perPage,
        data: this.items
      });

      this.setState(function (prevState) {
        return {
          totalPages: _this18.pg.getTotalPages()
        };
      });

      this.setPageBtns();
      this.showItems(1);
    }
  }, {
    key: "showItems",
    value: function showItems(num) {
      var _this19 = this;

      this.setState(function (prevState) {
        return {
          itemList: _this19.pg.page(num),
          currentPage: _this19.pg.currentPage
        };
      });

      this.changePageBtns();
    }
  }, {
    key: "flip",
    value: function flip(direction) {
      if (direction === "next") {
        this.showItems(this.pg.next());
      } else {
        this.showItems(this.pg.prev());
      }
    }
  }, {
    key: "setPerPage",
    value: function setPerPage(perPage) {
      this.state.perPage = perPage;
      this.activatePager();
    }
  }, {
    key: "setPageBtns",
    value: function setPageBtns() {
      this.temp = [];
      for (var i = 0, l = this.pg.getTotalPages(); i < l; i++) {
        this.temp.push((0, _pagebtns.pageBtns)(i, l));
      }
    }
  }, {
    key: "changePageBtns",
    value: function changePageBtns() {
      var _this20 = this;

      this.setState(function (prevState) {
        return {
          buttonSet: _this20.temp[_this20.pg.currentPage - 1]
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "jspager2_holder" },
        React.createElement(RkPager2_itemList, {
          pr_list: this.state.itemList }),
        React.createElement(
          "nav",
          { className: "jspager2" },
          React.createElement(RkPager2_pageSelector, {
            pr_totalPages: this.state.totalPages,
            pr_currentPage: this.state.currentPage,
            pr_val_showItems: this.showItems }),
          React.createElement(
            "aside",
            { className: "jspager2_prevnextholder" },
            React.createElement(RkPager2_btnFirst, {
              pr_val_showItems: this.showItems }),
            React.createElement(RkPager2_btnPrev, {
              pr_val_flip: this.flip }),
            React.createElement(RkPager2_btnNext, {
              pr_val_flip: this.flip }),
            React.createElement(RkPager2_btnLast, {
              pr_totalPages: this.state.totalPages,
              pr_val_showItems: this.showItems })
          ),
          React.createElement(RkPager2_pageBtns, {
            pr_buttonSet: this.state.buttonSet,
            pr_currentPage: this.state.currentPage,
            pr_val_showItems: this.showItems }),
          React.createElement(RkPager2_itemsPerPage, {
            pr_perPage: this.state.perPage,
            pr_perPageItems: this.state.perPageItems,
            pr_val_setPerPage: this.setPerPage })
        )
      );
    }
  }]);
  return RkPager2;
}(React.Component);

exports.default = RkPager2;

/***/ })
/******/ ]);