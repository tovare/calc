// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/hybrids/esm/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.camelToDash = camelToDash;
exports.pascalToDash = pascalToDash;
exports.dispatch = dispatch;
exports.shadyCSS = shadyCSS;
exports.stringifyElement = stringifyElement;
exports.deferred = exports.IS_IE = void 0;

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var camelToDashMap = new Map();

function camelToDash(str) {
  var result = camelToDashMap.get(str);

  if (result === undefined) {
    result = str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    camelToDashMap.set(str, result);
  }

  return result;
}

function pascalToDash(str) {
  return camelToDash(str.replace(/((?!([A-Z]{2}|^))[A-Z])/g, '-$1'));
}

function dispatch(host, eventType) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return host.dispatchEvent(new CustomEvent(eventType, _objectSpread({
    bubbles: false
  }, options)));
}

function shadyCSS(fn, fallback) {
  var shady = window.ShadyCSS;
  /* istanbul ignore next */

  if (shady && !shady.nativeShadow) {
    return fn(shady);
  }

  return fallback;
}

function stringifyElement(element) {
  var tagName = String(element.tagName).toLowerCase();
  return "<".concat(tagName, ">");
}

var IS_IE = 'ActiveXObject' in window;
exports.IS_IE = IS_IE;
var deferred = Promise.resolve();
exports.deferred = deferred;
},{}],"node_modules/hybrids/esm/property.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = property;

var _utils = require("./utils");

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var defaultTransform = function defaultTransform(v) {
  return v;
};

var objectTransform = function objectTransform(value) {
  if (_typeof(value) !== 'object') {
    throw TypeError("Assigned value must be an object: ".concat(_typeof(value)));
  }

  return value && Object.freeze(value);
};

function property(value, connect) {
  var type = _typeof(value);

  var transform = defaultTransform;

  switch (type) {
    case 'string':
      transform = String;
      break;

    case 'number':
      transform = Number;
      break;

    case 'boolean':
      transform = Boolean;
      break;

    case 'function':
      transform = value;
      value = transform();
      break;

    case 'object':
      if (value) Object.freeze(value);
      transform = objectTransform;
      break;

    default:
      break;
  }

  return {
    get: function get(host) {
      var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : value;
      return val;
    },
    set: function set(host, val, oldValue) {
      return transform(val, oldValue);
    },
    connect: type !== 'object' && type !== 'undefined' ? function (host, key, invalidate) {
      if (host[key] === value) {
        var attrName = (0, _utils.camelToDash)(key);

        if (host.hasAttribute(attrName)) {
          var attrValue = host.getAttribute(attrName);
          host[key] = attrValue === '' && transform === Boolean ? true : attrValue;
        }
      }

      return connect && connect(host, key, invalidate);
    } : connect
  };
}
},{"./utils":"node_modules/hybrids/esm/utils.js"}],"node_modules/hybrids/esm/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = render;

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function render(fn) {
  var customOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof fn !== 'function') {
    throw TypeError("The first argument must be a function: ".concat(_typeof(fn)));
  }

  var options = _objectSpread({
    shadowRoot: true
  }, customOptions);

  var shadowRootInit = {
    mode: 'open'
  };

  if (_typeof(options.shadowRoot) === 'object') {
    Object.assign(shadowRootInit, options.shadowRoot);
  }

  return {
    get: function get(host) {
      var update = fn(host);
      var target = host;

      if (options.shadowRoot) {
        if (!host.shadowRoot) host.attachShadow(shadowRootInit);
        target = host.shadowRoot;
      }

      return function flush() {
        update(host, target);
        return target;
      };
    },
    observe: function observe(host, flush) {
      flush();
    }
  };
}
},{}],"node_modules/hybrids/esm/emitter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dispatch = dispatch;
exports.subscribe = subscribe;
var callbacks = new WeakMap();
var queue = new Set();

function execute() {
  try {
    queue.forEach(function (target) {
      try {
        callbacks.get(target)();
        queue.delete(target);
      } catch (e) {
        queue.delete(target);
        throw e;
      }
    });
  } catch (e) {
    if (queue.size) execute();
    throw e;
  }
}

function dispatch(target) {
  if (!queue.size) {
    requestAnimationFrame(execute);
  }

  queue.add(target);
}

function subscribe(target, cb) {
  callbacks.set(target, cb);
  dispatch(target);
  return function unsubscribe() {
    queue.delete(target);
    callbacks.delete(target);
  };
}
},{}],"node_modules/hybrids/esm/cache.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEntry = getEntry;
exports.get = get;
exports.set = set;
exports.invalidate = invalidate;
exports.observe = observe;

var _utils = require("./utils");

var emitter = _interopRequireWildcard(require("./emitter"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var entries = new WeakMap();

function getEntry(target, key) {
  var targetMap = entries.get(target);

  if (!targetMap) {
    targetMap = new Map();
    entries.set(target, targetMap);
  }

  var entry = targetMap.get(key);

  if (!entry) {
    entry = {
      target: target,
      key: key,
      value: undefined,
      contexts: undefined,
      deps: undefined,
      state: 0,
      checksum: 0,
      observed: false
    };
    targetMap.set(key, entry);
  }

  return entry;
}

function calculateChecksum(entry) {
  var checksum = entry.state;

  if (entry.deps) {
    entry.deps.forEach(function (depEntry) {
      checksum += depEntry.state;
    });
  }

  return checksum;
}

function dispatchDeep(entry) {
  if (entry.observed) emitter.dispatch(entry);
  if (entry.contexts) entry.contexts.forEach(dispatchDeep);
}

var contextStack = new Set();

function get(target, key, getter) {
  var entry = getEntry(target, key);

  if (contextStack.size && contextStack.has(entry)) {
    throw Error("Circular get invocation of the '".concat(key, "' property in '").concat((0, _utils.stringifyElement)(target), "'"));
  }

  contextStack.forEach(function (context) {
    context.deps = context.deps || new Set();
    context.deps.add(entry);

    if (context.observed) {
      entry.contexts = entry.contexts || new Set();
      entry.contexts.add(context);
    }
  });

  if (entry.checksum && entry.checksum === calculateChecksum(entry)) {
    return entry.value;
  }

  try {
    contextStack.add(entry);

    if (entry.observed && entry.deps && entry.deps.size) {
      entry.deps.forEach(function (depEntry) {
        depEntry.contexts.delete(entry);
      });
    }

    entry.deps = undefined;
    var nextValue = getter(target, entry.value);

    if (nextValue !== entry.value) {
      entry.state += 1;
      entry.value = nextValue;
      dispatchDeep(entry);
    }

    entry.checksum = calculateChecksum(entry);
    contextStack.delete(entry);
  } catch (e) {
    entry.checksum = 0;
    contextStack.delete(entry);
    contextStack.forEach(function (context) {
      context.deps.delete(entry);
      if (context.observed) entry.contexts.delete(context);
    });
    throw e;
  }

  return entry.value;
}

function set(target, key, setter, value, force) {
  if (contextStack.size && !force) {
    throw Error("Try to set '".concat(key, "' of '").concat((0, _utils.stringifyElement)(target), "' in get call"));
  }

  var entry = getEntry(target, key);
  var newValue = setter(target, value, entry.value);

  if (newValue !== entry.value) {
    entry.checksum = 0;
    entry.state += 1;
    entry.value = newValue;
    dispatchDeep(entry);
  }
}

function invalidate(target, key, clearValue) {
  if (contextStack.size) {
    throw Error("Try to invalidate '".concat(key, "' in '").concat((0, _utils.stringifyElement)(target), "' get call"));
  }

  var entry = getEntry(target, key);
  entry.checksum = 0;
  entry.state += 1;
  dispatchDeep(entry);

  if (clearValue) {
    entry.value = undefined;
  }
}

function observe(target, key, getter, fn) {
  var entry = getEntry(target, key);
  entry.observed = true;
  var lastValue;
  var unsubscribe = emitter.subscribe(entry, function () {
    var value = get(target, key, getter);

    if (value !== lastValue) {
      fn(target, value, lastValue);
      lastValue = value;
    }
  });
  return function unobserve() {
    unsubscribe();
    entry.observed = false;

    if (entry.deps && entry.deps.size) {
      entry.deps.forEach(function (depEntry) {
        depEntry.contexts.delete(entry);
      });
    }
  };
}
},{"./utils":"node_modules/hybrids/esm/utils.js","./emitter":"node_modules/hybrids/esm/emitter.js"}],"node_modules/hybrids/esm/define.js":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = define;

var _property = _interopRequireDefault(require("./property"));

var _render = _interopRequireDefault(require("./render"));

var cache = _interopRequireWildcard(require("./cache"));

var _utils = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

/* istanbul ignore next */
try {
  "development";
} catch (e) {
  var process = {
    env: {
      NODE_ENV: 'production'
    }
  };
} // eslint-disable-line


var defaultMethod = function defaultMethod(host, value) {
  return value;
};

function compile(Hybrid, descriptors) {
  Hybrid.hybrids = descriptors;
  Hybrid.callbacks = [];
  Object.keys(descriptors).forEach(function (key) {
    var desc = descriptors[key];

    var type = _typeof(desc);

    var config;

    if (type === 'function') {
      config = key === 'render' ? (0, _render.default)(desc) : {
        get: desc
      };
    } else if (type !== 'object' || desc === null || Array.isArray(desc)) {
      config = (0, _property.default)(desc);
    } else {
      config = {
        get: desc.get || defaultMethod,
        set: desc.set || !desc.get && defaultMethod || undefined,
        connect: desc.connect,
        observe: desc.observe
      };
    }

    Object.defineProperty(Hybrid.prototype, key, {
      get: function get() {
        return cache.get(this, key, config.get);
      },
      set: config.set && function set(newValue) {
        cache.set(this, key, config.set, newValue);
      },
      enumerable: true,
      configurable: "development" !== 'production'
    });

    if (config.observe) {
      Hybrid.callbacks.push(function (host) {
        return cache.observe(host, key, config.get, config.observe);
      });
    }

    if (config.connect) {
      Hybrid.callbacks.push(function (host) {
        return config.connect(host, key, function () {
          cache.invalidate(host, key);
        });
      });
    }
  });
}

var update;
/* istanbul ignore else */

if ("development" !== 'production') {
  var walkInShadow = function walkInShadow(node, fn) {
    fn(node);
    Array.from(node.children).forEach(function (el) {
      return walkInShadow(el, fn);
    });

    if (node.shadowRoot) {
      Array.from(node.shadowRoot.children).forEach(function (el) {
        return walkInShadow(el, fn);
      });
    }
  };

  var updateQueue = new Map();

  update = function update(Hybrid, lastHybrids) {
    if (!updateQueue.size) {
      _utils.deferred.then(function () {
        walkInShadow(document.body, function (node) {
          if (updateQueue.has(node.constructor)) {
            var hybrids = updateQueue.get(node.constructor);
            node.disconnectedCallback();
            Object.keys(node.constructor.hybrids).forEach(function (key) {
              cache.invalidate(node, key, node.constructor.hybrids[key] !== hybrids[key]);
            });
            node.connectedCallback();
          }
        });
        updateQueue.clear();
      });
    }

    updateQueue.set(Hybrid, lastHybrids);
  };
}

var disconnects = new WeakMap();

function defineElement(tagName, hybridsOrConstructor) {
  var type = _typeof(hybridsOrConstructor);

  if (type !== 'object' && type !== 'function') {
    throw TypeError("Second argument must be an object or a function: ".concat(type));
  }

  var CustomElement = window.customElements.get(tagName);

  if (type === 'function') {
    if (CustomElement !== hybridsOrConstructor) {
      return window.customElements.define(tagName, hybridsOrConstructor);
    }

    return CustomElement;
  }

  if (CustomElement) {
    if (CustomElement.hybrids === hybridsOrConstructor) {
      return CustomElement;
    }

    if ("development" !== 'production' && CustomElement.hybrids) {
      Object.keys(CustomElement.hybrids).forEach(function (key) {
        delete CustomElement.prototype[key];
      });
      var lastHybrids = CustomElement.hybrids;
      compile(CustomElement, hybridsOrConstructor);
      update(CustomElement, lastHybrids);
      return CustomElement;
    }

    throw Error("Element '".concat(tagName, "' already defined"));
  }

  var Hybrid =
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(Hybrid, _HTMLElement);

    function Hybrid() {
      _classCallCheck(this, Hybrid);

      return _possibleConstructorReturn(this, _getPrototypeOf(Hybrid).apply(this, arguments));
    }

    _createClass(Hybrid, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var callbacks = this.constructor.callbacks;
        var list = [];

        for (var index = 0; index < callbacks.length; index += 1) {
          var cb = callbacks[index](this);
          if (cb) list.push(cb);
        }

        disconnects.set(this, list);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        var list = disconnects.get(this);

        for (var index = 0; index < list.length; index += 1) {
          list[index]();
        }
      }
    }], [{
      key: "name",
      get: function get() {
        return tagName;
      }
    }]);

    return Hybrid;
  }(_wrapNativeSuper(HTMLElement));

  compile(Hybrid, hybridsOrConstructor);
  customElements.define(tagName, Hybrid);
  return Hybrid;
}

function defineMap(elements) {
  return Object.keys(elements).reduce(function (acc, key) {
    var tagName = (0, _utils.pascalToDash)(key);
    acc[key] = defineElement(tagName, elements[key]);
    return acc;
  }, {});
}

function define() {
  if (_typeof(arguments.length <= 0 ? undefined : arguments[0]) === 'object') {
    return defineMap(arguments.length <= 0 ? undefined : arguments[0]);
  }

  return defineElement.apply(void 0, arguments);
}
},{"./property":"node_modules/hybrids/esm/property.js","./render":"node_modules/hybrids/esm/render.js","./cache":"node_modules/hybrids/esm/cache.js","./utils":"node_modules/hybrids/esm/utils.js"}],"node_modules/hybrids/esm/parent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parent;

function walk(node, fn) {
  var parentElement = node.parentElement || node.parentNode.host;

  while (parentElement) {
    var hybrids = parentElement.constructor.hybrids;

    if (hybrids && fn(hybrids)) {
      return parentElement;
    }

    parentElement = parentElement.parentElement || parentElement.parentNode && parentElement.parentNode.host;
  }

  return parentElement || null;
}

function parent(hybridsOrFn) {
  var fn = typeof hybridsOrFn === 'function' ? hybridsOrFn : function (hybrids) {
    return hybrids === hybridsOrFn;
  };
  return {
    get: function get(host) {
      return walk(host, fn);
    },
    connect: function connect(host, key, invalidate) {
      var target = host[key];

      if (target) {
        return invalidate;
      }

      return false;
    }
  };
}
},{}],"node_modules/hybrids/esm/children.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = children;

function walk(node, fn, options) {
  var items = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  Array.from(node.children).forEach(function (child) {
    var hybrids = child.constructor.hybrids;

    if (hybrids && fn(hybrids)) {
      items.push(child);

      if (options.deep && options.nested) {
        walk(child, fn, options, items);
      }
    } else if (options.deep) {
      walk(child, fn, options, items);
    }
  });
  return items;
}

function children(hybridsOrFn) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    deep: false,
    nested: false
  };
  var fn = typeof hybridsOrFn === 'function' ? hybridsOrFn : function (hybrids) {
    return hybrids === hybridsOrFn;
  };
  return {
    get: function get(host) {
      return walk(host, fn, options);
    },
    connect: function connect(host, key, invalidate) {
      var observer = new MutationObserver(invalidate);
      observer.observe(host, {
        childList: true,
        subtree: !!options.deep
      });
      return function () {
        observer.disconnect();
      };
    }
  };
}
},{}],"node_modules/hybrids/esm/template/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTemplateEnd = getTemplateEnd;
exports.removeTemplate = removeTemplate;
exports.dataMap = void 0;
var map = new WeakMap();
var dataMap = {
  get: function get(key, defaultValue) {
    var value = map.get(key);
    if (value) return value;

    if (defaultValue) {
      map.set(key, defaultValue);
    }

    return defaultValue;
  },
  set: function set(key, value) {
    map.set(key, value);
    return value;
  }
};
exports.dataMap = dataMap;

function getTemplateEnd(node) {
  var data; // eslint-disable-next-line no-cond-assign

  while (node && (data = dataMap.get(node)) && data.endNode) {
    node = data.endNode;
  }

  return node;
}

function removeTemplate(target) {
  if (target.nodeType !== Node.TEXT_NODE) {
    var child = target.childNodes[0];

    while (child) {
      target.removeChild(child);
      child = target.childNodes[0];
    }
  } else {
    var data = dataMap.get(target);

    if (data.startNode) {
      var endNode = getTemplateEnd(data.endNode);
      var node = data.startNode;
      var lastNextSibling = endNode.nextSibling;

      while (node) {
        var nextSibling = node.nextSibling;
        node.parentNode.removeChild(node);
        node = nextSibling !== lastNextSibling && nextSibling;
      }
    }
  }
}
},{}],"node_modules/hybrids/esm/template/resolvers/array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveArray;
exports.arrayMap = void 0;

var _utils = require("../utils");

var _value = _interopRequireDefault(require("./value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/no-cycle
var arrayMap = new WeakMap();
exports.arrayMap = arrayMap;

function movePlaceholder(target, previousSibling) {
  var data = _utils.dataMap.get(target);

  var startNode = data.startNode;
  var endNode = (0, _utils.getTemplateEnd)(data.endNode);
  previousSibling.parentNode.insertBefore(target, previousSibling.nextSibling);
  var prevNode = target;
  var node = startNode;

  while (node) {
    var nextNode = node.nextSibling;
    prevNode.parentNode.insertBefore(node, prevNode.nextSibling);
    prevNode = node;
    node = nextNode !== endNode.nextSibling && nextNode;
  }
}

function resolveArray(host, target, value) {
  var lastEntries = arrayMap.get(target);
  var entries = value.map(function (item, index) {
    return {
      id: Object.prototype.hasOwnProperty.call(item, 'id') ? item.id : index,
      value: item,
      placeholder: null,
      available: true
    };
  });
  arrayMap.set(target, entries);

  if (lastEntries) {
    var ids = new Set();
    entries.forEach(function (entry) {
      return ids.add(entry.id);
    });
    lastEntries = lastEntries.filter(function (entry) {
      if (!ids.has(entry.id)) {
        (0, _utils.removeTemplate)(entry.placeholder);
        entry.placeholder.parentNode.removeChild(entry.placeholder);
        return false;
      }

      return true;
    });
  }

  var previousSibling = target;
  var lastIndex = value.length - 1;

  var data = _utils.dataMap.get(target);

  for (var index = 0; index < entries.length; index += 1) {
    var entry = entries[index];
    var matchedEntry = void 0;

    if (lastEntries) {
      for (var i = 0; i < lastEntries.length; i += 1) {
        if (lastEntries[i].available && lastEntries[i].id === entry.id) {
          matchedEntry = lastEntries[i];
          break;
        }
      }
    }

    var placeholder = void 0;

    if (matchedEntry) {
      matchedEntry.available = false;
      placeholder = matchedEntry.placeholder;

      if (placeholder.previousSibling !== previousSibling) {
        movePlaceholder(placeholder, previousSibling);
      }

      if (matchedEntry.value !== entry.value) {
        (0, _value.default)(host, placeholder, entry.value);
      }
    } else {
      placeholder = document.createTextNode('');
      previousSibling.parentNode.insertBefore(placeholder, previousSibling.nextSibling);
      (0, _value.default)(host, placeholder, entry.value);
    }

    previousSibling = (0, _utils.getTemplateEnd)(_utils.dataMap.get(placeholder).endNode || placeholder);
    if (index === 0) data.startNode = placeholder;
    if (index === lastIndex) data.endNode = previousSibling;
    entry.placeholder = placeholder;
  }

  if (lastEntries) {
    lastEntries.forEach(function (entry) {
      if (entry.available) {
        (0, _utils.removeTemplate)(entry.placeholder);
        entry.placeholder.parentNode.removeChild(entry.placeholder);
      }
    });
  }
}
},{"../utils":"node_modules/hybrids/esm/template/utils.js","./value":"node_modules/hybrids/esm/template/resolvers/value.js"}],"node_modules/hybrids/esm/template/resolvers/value.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveValue;

var _utils = require("../utils");

var _array = _interopRequireWildcard(require("./array"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function resolveValue(host, target, value) {
  var type = Array.isArray(value) ? 'array' : _typeof(value);

  var data = _utils.dataMap.get(target, {});

  if (data.type !== type) {
    (0, _utils.removeTemplate)(target);
    if (type === 'array') _array.arrayMap.delete(target);
    data = _utils.dataMap.set(target, {
      type: type
    });

    if (target.textContent !== '') {
      target.textContent = '';
    }
  }

  switch (type) {
    case 'function':
      value(host, target);
      break;

    case 'array':
      (0, _array.default)(host, target, value);
      break;

    default:
      target.textContent = type === 'number' || value ? value : '';
  }
}
},{"../utils":"node_modules/hybrids/esm/template/utils.js","./array":"node_modules/hybrids/esm/template/resolvers/array.js"}],"node_modules/hybrids/esm/template/resolvers/event.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveEventListener;

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var targets = new WeakMap();

function resolveEventListener(eventType) {
  return function (host, target, value, lastValue) {
    if (lastValue) {
      var eventMap = targets.get(target);

      if (eventMap) {
        target.removeEventListener(eventType, eventMap.get(lastValue), lastValue.options !== undefined ? lastValue.options : false);
      }
    }

    if (value) {
      if (typeof value !== 'function') {
        throw Error("Event listener must be a function: ".concat(_typeof(value)));
      }

      var _eventMap = targets.get(target);

      if (!_eventMap) {
        _eventMap = new WeakMap();
        targets.set(target, _eventMap);
      }

      var callback = value.bind(null, host);

      _eventMap.set(value, callback);

      target.addEventListener(eventType, callback, value.options !== undefined ? value.options : false);
    }
  };
}
},{}],"node_modules/hybrids/esm/template/resolvers/class.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveClassList;

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function normalizeValue(value) {
  var set = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Set();

  if (Array.isArray(value)) {
    value.forEach(function (className) {
      return set.add(className);
    });
  } else if (value !== null && _typeof(value) === 'object') {
    Object.keys(value).forEach(function (key) {
      return value[key] && set.add(key);
    });
  } else {
    set.add(value);
  }

  return set;
}

var classMap = new WeakMap();

function resolveClassList(host, target, value) {
  var previousList = classMap.get(target) || new Set();
  var list = normalizeValue(value);
  classMap.set(target, list);
  list.forEach(function (className) {
    target.classList.add(className);
    previousList.delete(className);
  });
  previousList.forEach(function (className) {
    target.classList.remove(className);
  });
}
},{}],"node_modules/hybrids/esm/template/resolvers/style.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveStyle;

var _utils = require("../../utils");

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var styleMap = new WeakMap();

function resolveStyle(host, target, value) {
  if (value === null || _typeof(value) !== 'object') {
    throw TypeError("Style value must be an object in ".concat((0, _utils.stringifyElement)(target), ":"), value);
  }

  var previousMap = styleMap.get(target) || new Map();
  var nextMap = Object.keys(value).reduce(function (map, key) {
    var dashKey = (0, _utils.camelToDash)(key);
    var styleValue = value[key];

    if (!styleValue && styleValue !== 0) {
      target.style.removeProperty(dashKey);
    } else {
      target.style.setProperty(dashKey, styleValue);
    }

    map.set(dashKey, styleValue);
    previousMap.delete(dashKey);
    return map;
  }, new Map());
  previousMap.forEach(function (styleValue, key) {
    target.style[key] = '';
  });
  styleMap.set(target, nextMap);
}
},{"../../utils":"node_modules/hybrids/esm/utils.js"}],"node_modules/hybrids/esm/template/resolvers/property.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveProperty;

var _event = _interopRequireDefault(require("./event"));

var _class = _interopRequireDefault(require("./class"));

var _style = _interopRequireDefault(require("./style"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveProperty(attrName, propertyName, isSVG) {
  if (propertyName.substr(0, 2) === 'on') {
    var eventType = propertyName.substr(2);
    return (0, _event.default)(eventType);
  }

  switch (attrName) {
    case 'class':
      return _class.default;

    case 'style':
      return _style.default;

    default:
      return function (host, target, value) {
        if (!isSVG && !(target instanceof SVGElement) && propertyName in target) {
          if (target[propertyName] !== value) {
            target[propertyName] = value;
          }
        } else if (value === false || value === undefined || value === null) {
          target.removeAttribute(attrName);
        } else {
          var attrValue = value === true ? '' : String(value);
          target.setAttribute(attrName, attrValue);
        }
      };
  }
}
},{"./event":"node_modules/hybrids/esm/template/resolvers/event.js","./class":"node_modules/hybrids/esm/template/resolvers/class.js","./style":"node_modules/hybrids/esm/template/resolvers/style.js"}],"node_modules/hybrids/esm/template/core.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInternalWalker = createInternalWalker;
exports.compileTemplate = compileTemplate;
exports.getPlaceholder = void 0;

var _utils = require("../utils");

var _utils2 = require("./utils");

var _value = _interopRequireDefault(require("./resolvers/value"));

var _property = _interopRequireDefault(require("./resolvers/property"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

/* istanbul ignore next */
try {
  "development";
} catch (e) {
  var process = {
    env: {
      NODE_ENV: 'production'
    }
  };
} // eslint-disable-line


var TIMESTAMP = Date.now();

var getPlaceholder = function getPlaceholder() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return "{{h-".concat(TIMESTAMP, "-").concat(id, "}}");
};

exports.getPlaceholder = getPlaceholder;
var PLACEHOLDER_REGEXP_TEXT = getPlaceholder('(\\d+)');
var PLACEHOLDER_REGEXP_EQUAL = new RegExp("^".concat(PLACEHOLDER_REGEXP_TEXT, "$"));
var PLACEHOLDER_REGEXP_ALL = new RegExp(PLACEHOLDER_REGEXP_TEXT, 'g');
var ATTR_PREFIX = "--".concat(TIMESTAMP, "--");
var ATTR_REGEXP = new RegExp(ATTR_PREFIX, 'g');
var preparedTemplates = new WeakMap();
/* istanbul ignore next */

function applyShadyCSS(template, tagName) {
  if (!tagName) return template;
  return (0, _utils.shadyCSS)(function (shady) {
    var map = preparedTemplates.get(template);

    if (!map) {
      map = new Map();
      preparedTemplates.set(template, map);
    }

    var clone = map.get(tagName);

    if (!clone) {
      clone = document.createElement('template');
      clone.content.appendChild(template.content.cloneNode(true));
      map.set(tagName, clone);
      var styles = clone.content.querySelectorAll('style');
      Array.from(styles).forEach(function (style) {
        var count = style.childNodes.length + 1;

        for (var i = 0; i < count; i += 1) {
          style.parentNode.insertBefore(document.createTextNode(getPlaceholder()), style);
        }
      });
      shady.prepareTemplate(clone, tagName.toLowerCase());
    }

    return clone;
  }, template);
}

function createSignature(parts, styles) {
  var signature = parts.reduce(function (acc, part, index) {
    if (index === 0) {
      return part;
    }

    if (parts.slice(index).join('').match(/^\s*<\/\s*(table|tr|thead|tbody|tfoot|colgroup)>/)) {
      return "".concat(acc, "<!--").concat(getPlaceholder(index - 1), "-->").concat(part);
    }

    return acc + getPlaceholder(index - 1) + part;
  }, '');

  if (styles) {
    signature += "<style>\n".concat(styles.join('\n/*------*/\n'), "\n</style>");
  }
  /* istanbul ignore if */


  if (_utils.IS_IE) {
    return signature.replace(/style\s*=\s*(["][^"]+["]|['][^']+[']|[^\s"'<>/]+)/g, function (match) {
      return "".concat(ATTR_PREFIX).concat(match);
    });
  }

  return signature;
}

function getPropertyName(string) {
  return string.replace(/\s*=\s*['"]*$/g, '').split(' ').pop();
}

function replaceComments(fragment) {
  var iterator = document.createNodeIterator(fragment, NodeFilter.SHOW_COMMENT, null, false);
  var node; // eslint-disable-next-line no-cond-assign

  while (node = iterator.nextNode()) {
    if (PLACEHOLDER_REGEXP_EQUAL.test(node.textContent)) {
      node.parentNode.insertBefore(document.createTextNode(node.textContent), node);
      node.parentNode.removeChild(node);
    }
  }
}

function createInternalWalker(context) {
  var node;
  return {
    get currentNode() {
      return node;
    },

    nextNode: function nextNode() {
      if (node === undefined) {
        node = context.childNodes[0];
      } else if (node.childNodes.length) {
        node = node.childNodes[0];
      } else if (node.nextSibling) {
        node = node.nextSibling;
      } else {
        var parentNode = node.parentNode;
        node = parentNode.nextSibling;

        while (!node && parentNode !== context) {
          parentNode = parentNode.parentNode;
          node = parentNode.nextSibling;
        }
      }

      return !!node;
    }
  };
}

function createExternalWalker(context) {
  return document.createTreeWalker(context, // eslint-disable-next-line no-bitwise
  NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null, false);
}
/* istanbul ignore next */


var createWalker = _typeof(window.ShadyDOM) === 'object' && window.ShadyDOM.inUse ? createInternalWalker : createExternalWalker;
var container = document.createElement('div');

function compileTemplate(rawParts, isSVG, styles) {
  var template = document.createElement('template');
  var parts = [];
  var signature = createSignature(rawParts, styles);
  if (isSVG) signature = "<svg>".concat(signature, "</svg>");
  /* istanbul ignore if */

  if (_utils.IS_IE) {
    template.innerHTML = signature;
  } else {
    container.innerHTML = "<template>".concat(signature, "</template>");
    template.content.appendChild(container.children[0].content);
  }

  if (isSVG) {
    var svgRoot = template.content.firstChild;
    template.content.removeChild(svgRoot);
    Array.from(svgRoot.childNodes).forEach(function (node) {
      return template.content.appendChild(node);
    });
  }

  replaceComments(template.content);
  var compileWalker = createWalker(template.content);
  var compileIndex = 0;

  var _loop = function _loop() {
    var node = compileWalker.currentNode;

    if (node.nodeType === Node.TEXT_NODE) {
      var text = node.textContent;

      if (!text.match(PLACEHOLDER_REGEXP_EQUAL)) {
        var results = text.match(PLACEHOLDER_REGEXP_ALL);

        if (results) {
          var currentNode = node;
          results.reduce(function (acc, placeholder) {
            var _acc$pop$split = acc.pop().split(placeholder),
                _acc$pop$split2 = _slicedToArray(_acc$pop$split, 2),
                before = _acc$pop$split2[0],
                next = _acc$pop$split2[1];

            if (before) acc.push(before);
            acc.push(placeholder);
            if (next) acc.push(next);
            return acc;
          }, [text]).forEach(function (part, index) {
            if (index === 0) {
              currentNode.textContent = part;
            } else {
              currentNode = currentNode.parentNode.insertBefore(document.createTextNode(part), currentNode.nextSibling);
            }
          });
        }
      }

      var equal = node.textContent.match(PLACEHOLDER_REGEXP_EQUAL);

      if (equal) {
        /* istanbul ignore else */
        if (!_utils.IS_IE) node.textContent = '';
        parts[equal[1]] = [compileIndex, _value.default];
      }
    } else {
      /* istanbul ignore else */
      // eslint-disable-next-line no-lonely-if
      if (node.nodeType === Node.ELEMENT_NODE) {
        Array.from(node.attributes).forEach(function (attr) {
          var value = attr.value.trim();
          /* istanbul ignore next */

          var name = _utils.IS_IE ? attr.name.replace(ATTR_PREFIX, '') : attr.name;
          var equal = value.match(PLACEHOLDER_REGEXP_EQUAL);

          if (equal) {
            var propertyName = getPropertyName(rawParts[equal[1]]);
            parts[equal[1]] = [compileIndex, (0, _property.default)(name, propertyName, isSVG)];
            node.removeAttribute(attr.name);
          } else {
            var _results = value.match(PLACEHOLDER_REGEXP_ALL);

            if (_results) {
              var partialName = "attr__".concat(name);

              _results.forEach(function (placeholder, index) {
                var _placeholder$match = placeholder.match(PLACEHOLDER_REGEXP_EQUAL),
                    _placeholder$match2 = _slicedToArray(_placeholder$match, 2),
                    id = _placeholder$match2[1];

                parts[id] = [compileIndex, function (host, target, attrValue) {
                  var data = _utils2.dataMap.get(target, {});

                  data[partialName] = (data[partialName] || value).replace(placeholder, attrValue == null ? '' : attrValue);

                  if (_results.length === 1 || index + 1 === _results.length) {
                    target.setAttribute(name, data[partialName]);
                    data[partialName] = undefined;
                  }
                }];
              });

              attr.value = '';
              /* istanbul ignore next */

              if (_utils.IS_IE && name !== attr.name) {
                node.removeAttribute(attr.name);
                node.setAttribute(name, '');
              }
            }
          }
        });
      }
    }

    compileIndex += 1;
  };

  while (compileWalker.nextNode()) {
    _loop();
  }

  return function updateTemplateInstance(host, target, args) {
    var data = _utils2.dataMap.get(target, {
      type: 'function'
    });

    if (template !== data.template) {
      if (data.template || target.nodeType === Node.ELEMENT_NODE) (0, _utils2.removeTemplate)(target);
      data.prevArgs = null;
      var fragment = document.importNode(applyShadyCSS(template, host.tagName).content, true);
      var renderWalker = createWalker(fragment);
      var clonedParts = parts.slice(0);
      var renderIndex = 0;
      var currentPart = clonedParts.shift();
      var markers = [];
      data.template = template;
      data.markers = markers;

      while (renderWalker.nextNode()) {
        var node = renderWalker.currentNode;

        if (node.nodeType === Node.TEXT_NODE) {
          /* istanbul ignore next */
          if (PLACEHOLDER_REGEXP_EQUAL.test(node.textContent)) {
            node.textContent = '';
          } else if (_utils.IS_IE) {
            node.textContent = node.textContent.replace(ATTR_REGEXP, '');
          }
        } else if ("development" !== 'production' && node.nodeType === Node.ELEMENT_NODE) {
          if (node.tagName.indexOf('-') > -1 && !customElements.get(node.tagName.toLowerCase())) {
            throw Error("Missing '".concat((0, _utils.stringifyElement)(node), "' element definition in '").concat((0, _utils.stringifyElement)(host), "'"));
          }
        }

        while (currentPart && currentPart[0] === renderIndex) {
          markers.push([node, currentPart[1]]);
          currentPart = clonedParts.shift();
        }

        renderIndex += 1;
      }

      if (target.nodeType === Node.TEXT_NODE) {
        data.startNode = fragment.childNodes[0];
        data.endNode = fragment.childNodes[fragment.childNodes.length - 1];
        var previousChild = target;
        var child = fragment.childNodes[0];

        while (child) {
          target.parentNode.insertBefore(child, previousChild.nextSibling);
          previousChild = child;
          child = fragment.childNodes[0];
        }
      } else {
        target.appendChild(fragment);
      }
    }

    var prevArgs = data.prevArgs;
    data.prevArgs = args;

    for (var index = 0; index < data.markers.length; index += 1) {
      var _data$markers$index = _slicedToArray(data.markers[index], 2),
          _node = _data$markers$index[0],
          marker = _data$markers$index[1];

      if (!prevArgs || prevArgs[index] !== args[index]) {
        marker(host, _node, args[index], prevArgs ? prevArgs[index] : undefined);
      }
    }

    if (target.nodeType !== Node.TEXT_NODE) {
      (0, _utils.shadyCSS)(function (shady) {
        if (host.shadowRoot) {
          if (prevArgs) {
            shady.styleSubtree(host);
          } else {
            shady.styleElement(host);
          }
        }
      });
    }
  };
}
},{"../utils":"node_modules/hybrids/esm/utils.js","./utils":"node_modules/hybrids/esm/template/utils.js","./resolvers/value":"node_modules/hybrids/esm/template/resolvers/value.js","./resolvers/property":"node_modules/hybrids/esm/template/resolvers/property.js"}],"node_modules/hybrids/esm/template/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = set;
exports.resolve = resolve;
var setCache = new Map();

function set(propertyName, value) {
  if (!propertyName) throw Error("Target property name missing: ".concat(propertyName));

  if (arguments.length === 2) {
    return function (host) {
      host[propertyName] = value;
    };
  }

  var fn = setCache.get(propertyName);

  if (!fn) {
    fn = function fn(host, _ref) {
      var target = _ref.target;
      host[propertyName] = target.value;
    };

    setCache.set(propertyName, fn);
  }

  return fn;
}

var promiseMap = new WeakMap();

function resolve(promise, placeholder) {
  var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
  return function (host, target) {
    var timeout;

    if (placeholder) {
      timeout = setTimeout(function () {
        timeout = undefined;
        requestAnimationFrame(function () {
          placeholder(host, target);
        });
      }, delay);
    }

    promiseMap.set(target, promise);
    promise.then(function (template) {
      if (timeout) clearTimeout(timeout);

      if (promiseMap.get(target) === promise) {
        template(host, target);
        promiseMap.set(target, null);
      }
    });
  };
}
},{}],"node_modules/hybrids/esm/template/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.html = html;
exports.svg = svg;

var _define = _interopRequireDefault(require("../define"));

var _core = require("./core");

var helpers = _interopRequireWildcard(require("./helpers"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PLACEHOLDER = (0, _core.getPlaceholder)();
var SVG_PLACEHOLDER = (0, _core.getPlaceholder)('svg');
var templatesMap = new Map();
var stylesMap = new WeakMap();
var methods = {
  define: function define(elements) {
    (0, _define.default)(elements);
    return this;
  },
  key: function key(id) {
    this.id = id;
    return this;
  },
  style: function style() {
    for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
      styles[_key] = arguments[_key];
    }

    stylesMap.set(this, styles);
    return this;
  }
};

function create(parts, args, isSVG) {
  var createTemplate = function createTemplate(host) {
    var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : host;
    var styles = stylesMap.get(createTemplate);
    var id = parts.join(PLACEHOLDER);
    if (styles) id += styles.join(PLACEHOLDER);
    if (isSVG) id += SVG_PLACEHOLDER;
    var render = templatesMap.get(id);

    if (!render) {
      render = (0, _core.compileTemplate)(parts, isSVG, styles);
      templatesMap.set(id, render);
    }

    render(host, target, args);
  };

  return Object.assign(createTemplate, methods);
}

function html(parts) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return create(parts, args);
}

function svg(parts) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return create(parts, args, true);
}

Object.assign(html, helpers);
Object.assign(svg, helpers);
},{"../define":"node_modules/hybrids/esm/define.js","./core":"node_modules/hybrids/esm/template/core.js","./helpers":"node_modules/hybrids/esm/template/helpers.js"}],"node_modules/hybrids/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "define", {
  enumerable: true,
  get: function () {
    return _define.default;
  }
});
Object.defineProperty(exports, "property", {
  enumerable: true,
  get: function () {
    return _property.default;
  }
});
Object.defineProperty(exports, "parent", {
  enumerable: true,
  get: function () {
    return _parent.default;
  }
});
Object.defineProperty(exports, "children", {
  enumerable: true,
  get: function () {
    return _children.default;
  }
});
Object.defineProperty(exports, "render", {
  enumerable: true,
  get: function () {
    return _render.default;
  }
});
Object.defineProperty(exports, "dispatch", {
  enumerable: true,
  get: function () {
    return _utils.dispatch;
  }
});
Object.defineProperty(exports, "html", {
  enumerable: true,
  get: function () {
    return _template.html;
  }
});
Object.defineProperty(exports, "svg", {
  enumerable: true,
  get: function () {
    return _template.svg;
  }
});

var _define = _interopRequireDefault(require("./define"));

var _property = _interopRequireDefault(require("./property"));

var _parent = _interopRequireDefault(require("./parent"));

var _children = _interopRequireDefault(require("./children"));

var _render = _interopRequireDefault(require("./render"));

var _utils = require("./utils");

var _template = require("./template");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./define":"node_modules/hybrids/esm/define.js","./property":"node_modules/hybrids/esm/property.js","./parent":"node_modules/hybrids/esm/parent.js","./children":"node_modules/hybrids/esm/children.js","./render":"node_modules/hybrids/esm/render.js","./utils":"node_modules/hybrids/esm/utils.js","./template":"node_modules/hybrids/esm/template/index.js"}],"calculator.js":[function(require,module,exports) {

"use strict";

var _hybrids = require("hybrids");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n<link href=\"https://fonts.googleapis.com/css?family=Orbitron&display=swap\" rel=\"stylesheet\">\n<style>\n    .display {\n      font-family: 'Orbitron', sans-serif;\n      font-size: 3.5em;\n      grid-column: 1 / 5;\n      text-align: right;\n      background: #D4E2E3;\n      padding-top: 10px;\n\n    }\n    .number-button {\n      font-family: 'Orbitron', sans-serif;\n      font-size: 2em;\n      background: #383737;\n      color: white;\n      padding-top: 10px;\n      padding-bottom: 10px;\n    }\n    .number-wide {\n      font-family: 'Orbitron', sans-serif;\n      font-size: 2em;\n      grid-column: 1 / 3;\n      background: #383737;\n      color: white;\n      padding-top: 10px;\n      padding-bottom: 10px;\n    }\n    .clear-button {\n      font-family: 'Orbitron', sans-serif;\n      font-size: 2em;\n      background: #C16F45;\n      color: white;\n      padding-top: 10px;\n      padding-bottom: 10px;\n    }\n\n    .operator-button {\n      font-family: 'Orbitron', sans-serif;\n      font-size: 2em;\n      background: #5C5A5A;\n      color: white;\n    }\n\n    .grid-container {\n      display: grid;\n      grid-template-columns: auto auto auto;\n      width: 30em;\n      height: 34em;\n      background: E1E0E0;\n    }\n    </style>\n    <div class=\"grid-container\">\n    <div class=\"display\">", "</div>\n    <button class=\"clear-button\"    onclick=\"", "\">AC</button>\n    <button class=\"operator-button\" onclick=\"", "\">\xB1</button>\n    <button class=\"operator-button\" onclick=", " value=\"", "\">\u221A</button>\n    <button class=\"operator-button\" onclick=", " value=\"", "\">\xF7</button>\n    <button class=\"number-button\"   onclick=\"", "\" value=\"1\">1</button>\n    <button class=\"number-button\"   onclick=\"", "\" value=\"2\">2</button>\n    <button class=\"number-button\"   onclick=\"", "\" value=\"3\">3</button>\n    <button class=\"operator-button\" onclick=", " value=\"", "\">\xD7</button>\n    <button class=\"number-button\"   onclick=\"", "\" value=\"4\">4</button>\n    <button class=\"number-button\"   onclick=\"", "\" value=\"5\">5</button>\n    <button class=\"number-button\"   onclick=\"", "\"value=\"6\">6</button>\n    <button class=\"operator-button\" onclick=", " value=\"", "\">-</button>\n    <button class=\"number-button\"   onclick=\"", "\" value=\"7\">7</button>\n    <button class=\"number-button\"   onclick=\"", "\" value=\"8\">8</button>\n    <button class=\"number-button\"   onclick=\"", "\" value=\"9\">9</button>\n    <button class=\"operator-button\" onclick=\"", "\" value=\"", "\">+</button>\n    <button class=\"number-wide\"     onclick=\"", "\" value=\"0\">0</button>\n    <button class=\"number-button\"   onclick=\"", "\">.</button>\n    <button class=\"operator-button\" onclick=", "  value=\"", "\">=</button>\n    </div>\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function clear_all(host) {
  host.op0 = 0;
  host.answer = 0;
  host.state = ENUM_NONE;
  host.inputBuffer = "";
}

function change_sign(host) {
  // If we are editing the buffer we need to change text,
  // else we just change the number on the screen.
  if (host.inputBuffer != "") {
    if (host.inputBuffer.startsWith("-")) {
      host.inputBuffer = host.inputBuffer.substr(1);
    } else {
      host.inputBuffer = "-" + host.inputBuffer;
    }
  } else {
    host.answer = -host.answer;
  }
}

function operator1(host, event) {
  if (host.inputBuffer != "") {
    host.answer = parseFloat(host.inputBuffer);
    host.inputBuffer = "";
  }

  host.answer = Math.sqrt(host.answer);
  host.previous = ENUM_SQRT;
}

function docalc(pending, a, b) {
  var c;

  switch (pending) {
    case ENUM_PLUS:
      c = a + b;
      break;

    case ENUM_MULT:
      c = a * b;
      break;

    case ENUM_MINUS:
      c = a - b;
      break;

    case ENUM_DIVIDE:
      c = a / b;
      break;

    default:
      c = b;
      break;
  }

  return c;
}

function operator(host, event) {
  if (host.inputBuffer != "") {
    host.op0 = parseFloat(host.inputBuffer);
    host.inputBuffer = "";
    host.answer = docalc(host.pending, host.answer, host.op0);
    host.previous = host.pending;

    if (event.target.value != ENUM_EQU) {
      host.op0 = 0;
    }
  } else if (event.target.value == ENUM_EQU) {
    host.answer = docalc(host.previous, host.answer, host.op0);
  }

  host.pending = event.target.value;
  console.log("Event ", event.target.value, "Answer: ", host.answer);
}

function keypad(host, event) {
  host.inputBuffer += event.target.value;
}

function comma(host) {
  if (host.inputBuffer.indexOf(".") == -1) {
    if (host.inputBuffer == "") {
      host.inputBuffer += "0.";
    } else {
      host.inputBuffer += ".";
    }
  }

  ;
}

function makeDisplay(inputBuffer, answer) {
  var tmp = inputBuffer;

  if (tmp == "") {
    tmp = answer;
  }

  return tmp;
}

var ENUM_NONE = 0,
    ENUM_PLUS = 1,
    ENUM_MINUS = 2,
    ENUM_DIVIDE = 3,
    ENUM_MULT = 4,
    ENUM_SQRT = 5,
    ENUM_EQU = 6;
var Calculator = {
  op0: 0,
  answer: 0,
  inputBuffer: "",
  pending: ENUM_NONE,
  previous: ENUM_NONE,
  prenum: 0,
  display: function display(_ref) {
    var inputBuffer = _ref.inputBuffer,
        answer = _ref.answer;
    return makeDisplay(inputBuffer, answer);
  },
  render: function render(_ref2) {
    var display = _ref2.display;
    return (0, _hybrids.html)(_templateObject(), display, clear_all, change_sign, operator1, ENUM_SQRT, operator, ENUM_DIVIDE, keypad, keypad, keypad, operator, ENUM_MULT, keypad, keypad, keypad, operator, ENUM_MINUS, keypad, keypad, keypad, operator, ENUM_PLUS, keypad, comma, operator, ENUM_EQU);
  }
};
(0, _hybrids.define)('my-calculator', Calculator);
},{"hybrids":"node_modules/hybrids/esm/index.js"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57141" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","calculator.js"], null)