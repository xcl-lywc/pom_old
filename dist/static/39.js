webpackJsonplensyn_ui([39],{

/***/ 1182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Home_vue__ = __webpack_require__(1521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Home_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Home_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Home_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Home_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_4b1e27ac_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Home_vue__ = __webpack_require__(1826);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1818)
  __webpack_require__(1820)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4b1e27ac"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Home_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_4b1e27ac_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Home_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/settings/Home.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4b1e27ac", Component.options)
  } else {
    hotAPI.reload("data-v-4b1e27ac", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1396:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */

(function sortableModule(factory) {
	"use strict";

	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else if (typeof module != "undefined" && typeof module.exports != "undefined") {
		module.exports = factory();
	}
	else {
		/* jshint sub:true */
		window["Sortable"] = factory();
	}
})(function sortableFactory() {
	"use strict";

	if (typeof window === "undefined" || !window.document) {
		return function sortableError() {
			throw new Error("Sortable.js requires a window with a document");
		};
	}

	var dragEl,
		parentEl,
		ghostEl,
		cloneEl,
		rootEl,
		nextEl,
		lastDownEl,

		scrollEl,
		scrollParentEl,
		scrollCustomFn,

		oldIndex,
		newIndex,
		oldDraggableIndex,
		newDraggableIndex,

		activeGroup,
		putSortable,

		autoScrolls = [],
		scrolling = false,

		awaitingDragStarted = false,
		ignoreNextClick = false,
		sortables = [],

		pointerElemChangedInterval,
		lastPointerElemX,
		lastPointerElemY,

		tapEvt,
		touchEvt,

		moved,


		lastTarget,
		lastDirection,
		pastFirstInvertThresh = false,
		isCircumstantialInvert = false,
		lastMode, // 'swap' or 'insert'

		targetMoveDistance,

		// For positioning ghost absolutely
		ghostRelativeParent,
		ghostRelativeParentInitialScroll = [], // (left, top)

		realDragElRect, // dragEl rect after current animation

		/** @const */
		R_SPACE = /\s+/g,

		expando = 'Sortable' + (new Date).getTime(),

		win = window,
		document = win.document,
		parseInt = win.parseInt,
		setTimeout = win.setTimeout,

		$ = win.jQuery || win.Zepto,
		Polymer = win.Polymer,

		captureMode = {
			capture: false,
			passive: false
		},

		IE11OrLess = !!navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie|iemobile)/i),
		Edge = !!navigator.userAgent.match(/Edge/i),
		FireFox = !!navigator.userAgent.match(/firefox/i),
		Safari = !!(navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i) && !navigator.userAgent.match(/android/i)),
		IOS = !!(navigator.userAgent.match(/iP(ad|od|hone)/i)),

		PositionGhostAbsolutely = IOS,

		CSSFloatProperty = Edge || IE11OrLess ? 'cssFloat' : 'float',

		// This will not pass for IE9, because IE9 DnD only works on anchors
		supportDraggable = ('draggable' in document.createElement('div')),

		supportCssPointerEvents = (function() {
			// false when <= IE11
			if (IE11OrLess) {
				return false;
			}
			var el = document.createElement('x');
			el.style.cssText = 'pointer-events:auto';
			return el.style.pointerEvents === 'auto';
		})(),

		_silent = false,
		_alignedSilent = false,

		abs = Math.abs,
		min = Math.min,
		max = Math.max,

		savedInputChecked = [],

		_detectDirection = function(el, options) {
			var elCSS = _css(el),
				elWidth = parseInt(elCSS.width)
					- parseInt(elCSS.paddingLeft)
					- parseInt(elCSS.paddingRight)
					- parseInt(elCSS.borderLeftWidth)
					- parseInt(elCSS.borderRightWidth),
				child1 = _getChild(el, 0, options),
				child2 = _getChild(el, 1, options),
				firstChildCSS = child1 && _css(child1),
				secondChildCSS = child2 && _css(child2),
				firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + _getRect(child1).width,
				secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + _getRect(child2).width;

			if (elCSS.display === 'flex') {
				return elCSS.flexDirection === 'column' || elCSS.flexDirection === 'column-reverse'
				? 'vertical' : 'horizontal';
			}

			if (elCSS.display === 'grid') {
				return elCSS.gridTemplateColumns.split(' ').length <= 1 ? 'vertical' : 'horizontal';
			}

			if (child1 && firstChildCSS.float !== 'none') {
				var touchingSideChild2 = firstChildCSS.float === 'left' ? 'left' : 'right';

				return child2 && (secondChildCSS.clear === 'both' || secondChildCSS.clear === touchingSideChild2) ?
					'vertical' : 'horizontal';
			}

			return (child1 &&
				(
					firstChildCSS.display === 'block' ||
					firstChildCSS.display === 'flex' ||
					firstChildCSS.display === 'table' ||
					firstChildCSS.display === 'grid' ||
					firstChildWidth >= elWidth &&
					elCSS[CSSFloatProperty] === 'none' ||
					child2 &&
					elCSS[CSSFloatProperty] === 'none' &&
					firstChildWidth + secondChildWidth > elWidth
				) ?
				'vertical' : 'horizontal'
			);
		},

		/**
		 * Detects first nearest empty sortable to X and Y position using emptyInsertThreshold.
		 * @param  {Number} x      X position
		 * @param  {Number} y      Y position
		 * @return {HTMLElement}   Element of the first found nearest Sortable
		 */
		_detectNearestEmptySortable = function(x, y) {
			for (var i = 0; i < sortables.length; i++) {
				if (_lastChild(sortables[i])) continue;

				var rect = _getRect(sortables[i]),
					threshold = sortables[i][expando].options.emptyInsertThreshold,
					insideHorizontally = x >= (rect.left - threshold) && x <= (rect.right + threshold),
					insideVertically = y >= (rect.top - threshold) && y <= (rect.bottom + threshold);

				if (threshold && insideHorizontally && insideVertically) {
					return sortables[i];
				}
			}
		},

		_isClientInRowColumn = function(x, y, el, axis, options) {
			var targetRect = _getRect(el),
				targetS1Opp = axis === 'vertical' ? targetRect.left : targetRect.top,
				targetS2Opp = axis === 'vertical' ? targetRect.right : targetRect.bottom,
				mouseOnOppAxis = axis === 'vertical' ? x : y;

			return targetS1Opp < mouseOnOppAxis && mouseOnOppAxis < targetS2Opp;
		},

		_isElInRowColumn = function(el1, el2, axis) {
			var el1Rect = el1 === dragEl && realDragElRect || _getRect(el1),
				el2Rect = el2 === dragEl && realDragElRect || _getRect(el2),
				el1S1Opp = axis === 'vertical' ? el1Rect.left : el1Rect.top,
				el1S2Opp = axis === 'vertical' ? el1Rect.right : el1Rect.bottom,
				el1OppLength = axis === 'vertical' ? el1Rect.width : el1Rect.height,
				el2S1Opp = axis === 'vertical' ? el2Rect.left : el2Rect.top,
				el2S2Opp = axis === 'vertical' ? el2Rect.right : el2Rect.bottom,
				el2OppLength = axis === 'vertical' ? el2Rect.width : el2Rect.height;

			return (
				el1S1Opp === el2S1Opp ||
				el1S2Opp === el2S2Opp ||
				(el1S1Opp + el1OppLength / 2) === (el2S1Opp + el2OppLength / 2)
			);
		},

		_getParentAutoScrollElement = function(el, includeSelf) {
			// skip to window
			if (!el || !el.getBoundingClientRect) return _getWindowScrollingElement();

			var elem = el;
			var gotSelf = false;
			do {
				// we don't need to get elem css if it isn't even overflowing in the first place (performance)
				if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
					var elemCSS = _css(elem);
					if (
						elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == 'auto' || elemCSS.overflowX == 'scroll') ||
						elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == 'auto' || elemCSS.overflowY == 'scroll')
					) {
						if (!elem || !elem.getBoundingClientRect || elem === document.body) return _getWindowScrollingElement();

						if (gotSelf || includeSelf) return elem;
						gotSelf = true;
					}
				}
			/* jshint boss:true */
			} while (elem = elem.parentNode);

			return _getWindowScrollingElement();
		},

		_getWindowScrollingElement = function() {
			if (IE11OrLess) {
				return document.documentElement;
			} else {
				return document.scrollingElement;
			}
		},

		_scrollBy = function(el, x, y) {
			el.scrollLeft += x;
			el.scrollTop += y;
		},

		_autoScroll = _throttle(function (/**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl, /**Boolean*/isFallback) {
			// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
			if (options.scroll) {
				var _this = rootEl ? rootEl[expando] : window,
					sens = options.scrollSensitivity,
					speed = options.scrollSpeed,

					x = evt.clientX,
					y = evt.clientY,

					winScroller = _getWindowScrollingElement(),

					scrollThisInstance = false;

				// Detect scrollEl
				if (scrollParentEl !== rootEl) {
					_clearAutoScrolls();

					scrollEl = options.scroll;
					scrollCustomFn = options.scrollFn;

					if (scrollEl === true) {
						scrollEl = _getParentAutoScrollElement(rootEl, true);
						scrollParentEl = scrollEl;
					}
				}


				var layersOut = 0;
				var currentParent = scrollEl;
				do {
					var	el = currentParent,
						rect = _getRect(el),

						top = rect.top,
						bottom = rect.bottom,
						left = rect.left,
						right = rect.right,

						width = rect.width,
						height = rect.height,

						scrollWidth,
						scrollHeight,

						css,

						vx,
						vy,

						canScrollX,
						canScrollY,

						scrollPosX,
						scrollPosY;


					scrollWidth = el.scrollWidth;
					scrollHeight = el.scrollHeight;

					css = _css(el);

					scrollPosX = el.scrollLeft;
					scrollPosY = el.scrollTop;

					if (el === winScroller) {
						canScrollX = width < scrollWidth && (css.overflowX === 'auto' || css.overflowX === 'scroll' || css.overflowX === 'visible');
						canScrollY = height < scrollHeight && (css.overflowY === 'auto' || css.overflowY === 'scroll' || css.overflowY === 'visible');
					} else {
						canScrollX = width < scrollWidth && (css.overflowX === 'auto' || css.overflowX === 'scroll');
						canScrollY = height < scrollHeight && (css.overflowY === 'auto' || css.overflowY === 'scroll');
					}

					vx = canScrollX && (abs(right - x) <= sens && (scrollPosX + width) < scrollWidth) - (abs(left - x) <= sens && !!scrollPosX);

					vy = canScrollY && (abs(bottom - y) <= sens && (scrollPosY + height) < scrollHeight) - (abs(top - y) <= sens && !!scrollPosY);


					if (!autoScrolls[layersOut]) {
						for (var i = 0; i <= layersOut; i++) {
							if (!autoScrolls[i]) {
								autoScrolls[i] = {};
							}
						}
					}

					if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
						autoScrolls[layersOut].el = el;
						autoScrolls[layersOut].vx = vx;
						autoScrolls[layersOut].vy = vy;

						clearInterval(autoScrolls[layersOut].pid);

						if (el && (vx != 0 || vy != 0)) {
							scrollThisInstance = true;
							/* jshint loopfunc:true */
							autoScrolls[layersOut].pid = setInterval((function () {
								// emulate drag over during autoscroll (fallback), emulating native DnD behaviour
								if (isFallback && this.layer === 0) {
									Sortable.active._emulateDragOver(true);
									Sortable.active._onTouchMove(touchEvt, true);
								}
								var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
								var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;

								if ('function' === typeof(scrollCustomFn)) {
									if (scrollCustomFn.call(_this, scrollOffsetX, scrollOffsetY, evt, touchEvt, autoScrolls[this.layer].el) !== 'continue') {
										return;
									}
								}

								_scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
							}).bind({layer: layersOut}), 24);
						}
					}
					layersOut++;
				} while (options.bubbleScroll && currentParent !== winScroller && (currentParent = _getParentAutoScrollElement(currentParent, false)));
				scrolling = scrollThisInstance; // in case another function catches scrolling as false in between when it is not
			}
		}, 30),

		_clearAutoScrolls = function () {
			autoScrolls.forEach(function(autoScroll) {
				clearInterval(autoScroll.pid);
			});
			autoScrolls = [];
		},

		_prepareGroup = function (options) {
			function toFn(value, pull) {
				return function(to, from, dragEl, evt) {
					var sameGroup = to.options.group.name &&
									from.options.group.name &&
									to.options.group.name === from.options.group.name;

					if (value == null && (pull || sameGroup)) {
						// Default pull value
						// Default pull and put value if same group
						return true;
					} else if (value == null || value === false) {
						return false;
					} else if (pull && value === 'clone') {
						return value;
					} else if (typeof value === 'function') {
						return toFn(value(to, from, dragEl, evt), pull)(to, from, dragEl, evt);
					} else {
						var otherGroup = (pull ? to : from).options.group.name;

						return (value === true ||
						(typeof value === 'string' && value === otherGroup) ||
						(value.join && value.indexOf(otherGroup) > -1));
					}
				};
			}

			var group = {};
			var originalGroup = options.group;

			if (!originalGroup || typeof originalGroup != 'object') {
				originalGroup = {name: originalGroup};
			}

			group.name = originalGroup.name;
			group.checkPull = toFn(originalGroup.pull, true);
			group.checkPut = toFn(originalGroup.put);
			group.revertClone = originalGroup.revertClone;

			options.group = group;
		},

		_checkAlignment = function(evt) {
			if (!dragEl || !dragEl.parentNode) return;
			dragEl.parentNode[expando] && dragEl.parentNode[expando]._computeIsAligned(evt);
		},

		_hideGhostForTarget = function() {
			if (!supportCssPointerEvents && ghostEl) {
				_css(ghostEl, 'display', 'none');
			}
		},

		_unhideGhostForTarget = function() {
			if (!supportCssPointerEvents && ghostEl) {
				_css(ghostEl, 'display', '');
			}
		};


	// #1184 fix - Prevent click event on fallback if dragged but item not changed position
	document.addEventListener('click', function(evt) {
		if (ignoreNextClick) {
			evt.preventDefault();
			evt.stopPropagation && evt.stopPropagation();
			evt.stopImmediatePropagation && evt.stopImmediatePropagation();
			ignoreNextClick = false;
			return false;
		}
	}, true);

	var nearestEmptyInsertDetectEvent = function(evt) {
		if (dragEl) {
			evt = evt.touches ? evt.touches[0] : evt;
			var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);

			if (nearest) {
				// Create imitation event
				var event = {};
				for (var i in evt) {
					event[i] = evt[i];
				}
				event.target = event.rootEl = nearest;
				event.preventDefault = void 0;
				event.stopPropagation = void 0;
				nearest[expando]._onDragOver(event);
			}
		}
	};

	/**
	 * @class  Sortable
	 * @param  {HTMLElement}  el
	 * @param  {Object}       [options]
	 */
	function Sortable(el, options) {
		if (!(el && el.nodeType && el.nodeType === 1)) {
			throw 'Sortable: `el` must be HTMLElement, not ' + {}.toString.call(el);
		}

		this.el = el; // root element
		this.options = options = _extend({}, options);


		// Export instance
		el[expando] = this;

		// Default options
		var defaults = {
			group: null,
			sort: true,
			disabled: false,
			store: null,
			handle: null,
			scroll: true,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			bubbleScroll: true,
			draggable: /[uo]l/i.test(el.nodeName) ? '>li' : '>*',
			swapThreshold: 1, // percentage; 0 <= x <= 1
			invertSwap: false, // invert always
			invertedSwapThreshold: null, // will be set to same as swapThreshold if default
			removeCloneOnHide: true,
			direction: function() {
				return _detectDirection(el, this.options);
			},
			ghostClass: 'sortable-ghost',
			chosenClass: 'sortable-chosen',
			dragClass: 'sortable-drag',
			ignore: 'a, img',
			filter: null,
			preventOnFilter: true,
			animation: 0,
			easing: null,
			setData: function (dataTransfer, dragEl) {
				dataTransfer.setData('Text', dragEl.textContent);
			},
			dropBubble: false,
			dragoverBubble: false,
			dataIdAttr: 'data-id',
			delay: 0,
			delayOnTouchOnly: false,
			touchStartThreshold: parseInt(window.devicePixelRatio, 10) || 1,
			forceFallback: false,
			fallbackClass: 'sortable-fallback',
			fallbackOnBody: false,
			fallbackTolerance: 0,
			fallbackOffset: {x: 0, y: 0},
			supportPointer: Sortable.supportPointer !== false && ('PointerEvent' in window),
			emptyInsertThreshold: 5
		};


		// Set default options
		for (var name in defaults) {
			!(name in options) && (options[name] = defaults[name]);
		}

		_prepareGroup(options);

		// Bind all private methods
		for (var fn in this) {
			if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
				this[fn] = this[fn].bind(this);
			}
		}

		// Setup drag mode
		this.nativeDraggable = options.forceFallback ? false : supportDraggable;

		if (this.nativeDraggable) {
			// Touch start threshold cannot be greater than the native dragstart threshold
			this.options.touchStartThreshold = 1;
		}

		// Bind events
		if (options.supportPointer) {
			_on(el, 'pointerdown', this._onTapStart);
		} else {
			_on(el, 'mousedown', this._onTapStart);
			_on(el, 'touchstart', this._onTapStart);
		}

		if (this.nativeDraggable) {
			_on(el, 'dragover', this);
			_on(el, 'dragenter', this);
		}

		sortables.push(this.el);

		// Restore sorting
		options.store && options.store.get && this.sort(options.store.get(this) || []);
	}

	Sortable.prototype = /** @lends Sortable.prototype */ {
		constructor: Sortable,

		_computeIsAligned: function(evt) {
			var target;

			if (ghostEl && !supportCssPointerEvents) {
				_hideGhostForTarget();
				target = document.elementFromPoint(evt.clientX, evt.clientY);
				_unhideGhostForTarget();
			} else {
				target = evt.target;
			}

			target = _closest(target, this.options.draggable, this.el, false);
			if (_alignedSilent) return;
			if (!dragEl || dragEl.parentNode !== this.el) return;

			var children = this.el.children;
			for (var i = 0; i < children.length; i++) {
				// Don't change for target in case it is changed to aligned before onDragOver is fired
				if (_closest(children[i], this.options.draggable, this.el, false) && children[i] !== target) {
					children[i].sortableMouseAligned = _isClientInRowColumn(evt.clientX, evt.clientY, children[i], this._getDirection(evt, null), this.options);
				}
			}
			// Used for nulling last target when not in element, nothing to do with checking if aligned
			if (!_closest(target, this.options.draggable, this.el, true)) {
				lastTarget = null;
			}

			_alignedSilent = true;
			setTimeout(function() {
				_alignedSilent = false;
			}, 30);

		},

		_getDirection: function(evt, target) {
			return (typeof this.options.direction === 'function') ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
		},

		_onTapStart: function (/** Event|TouchEvent */evt) {
			if (!evt.cancelable) return;
			var _this = this,
				el = this.el,
				options = this.options,
				preventOnFilter = options.preventOnFilter,
				type = evt.type,
				touch = evt.touches && evt.touches[0],
				target = (touch || evt).target,
				originalTarget = evt.target.shadowRoot && ((evt.path && evt.path[0]) || (evt.composedPath && evt.composedPath()[0])) || target,
				filter = options.filter,
				startIndex,
				startDraggableIndex;

			_saveInputCheckedState(el);

			// Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
			if (dragEl) {
				return;
			}

			if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
				return; // only left button and enabled
			}

			// cancel dnd if original target is content editable
			if (originalTarget.isContentEditable) {
				return;
			}

			target = _closest(target, options.draggable, el, false);


			if (lastDownEl === target) {
				// Ignoring duplicate `down`
				return;
			}

			// Get the index of the dragged element within its parent
			startIndex = _index(target);
			startDraggableIndex = _index(target, options.draggable);

			// Check filter
			if (typeof filter === 'function') {
				if (filter.call(this, evt, target, this)) {
					_dispatchEvent(_this, originalTarget, 'filter', target, el, el, startIndex, undefined, startDraggableIndex);
					preventOnFilter && evt.cancelable && evt.preventDefault();
					return; // cancel dnd
				}
			}
			else if (filter) {
				filter = filter.split(',').some(function (criteria) {
					criteria = _closest(originalTarget, criteria.trim(), el, false);

					if (criteria) {
						_dispatchEvent(_this, criteria, 'filter', target, el, el, startIndex, undefined, startDraggableIndex);
						return true;
					}
				});

				if (filter) {
					preventOnFilter && evt.cancelable && evt.preventDefault();
					return; // cancel dnd
				}
			}

			if (options.handle && !_closest(originalTarget, options.handle, el, false)) {
				return;
			}

			// Prepare `dragstart`
			this._prepareDragStart(evt, touch, target, startIndex, startDraggableIndex);
		},


		_handleAutoScroll: function(evt, fallback) {
			if (!dragEl || !this.options.scroll) return;
			var x = evt.clientX,
				y = evt.clientY,

				elem = document.elementFromPoint(x, y),
				_this = this;

			// IE does not seem to have native autoscroll,
			// Edge's autoscroll seems too conditional,
			// MACOS Safari does not have autoscroll,
			// Firefox and Chrome are good
			if (fallback || Edge || IE11OrLess || Safari) {
				_autoScroll(evt, _this.options, elem, fallback);

				// Listener for pointer element change
				var ogElemScroller = _getParentAutoScrollElement(elem, true);
				if (
					scrolling &&
					(
						!pointerElemChangedInterval ||
						x !== lastPointerElemX ||
						y !== lastPointerElemY
					)
				) {

					pointerElemChangedInterval && clearInterval(pointerElemChangedInterval);
					// Detect for pointer elem change, emulating native DnD behaviour
					pointerElemChangedInterval = setInterval(function() {
						if (!dragEl) return;
						// could also check if scroll direction on newElem changes due to parent autoscrolling
						var newElem = _getParentAutoScrollElement(document.elementFromPoint(x, y), true);
						if (newElem !== ogElemScroller) {
							ogElemScroller = newElem;
							_clearAutoScrolls();
							_autoScroll(evt, _this.options, ogElemScroller, fallback);
						}
					}, 10);
					lastPointerElemX = x;
					lastPointerElemY = y;
				}

			} else {
				// if DnD is enabled (and browser has good autoscrolling), first autoscroll will already scroll, so get parent autoscroll of first autoscroll
				if (!_this.options.bubbleScroll || _getParentAutoScrollElement(elem, true) === _getWindowScrollingElement()) {
					_clearAutoScrolls();
					return;
				}
				_autoScroll(evt, _this.options, _getParentAutoScrollElement(elem, false), false);
			}
		},

		_prepareDragStart: function (/** Event */evt, /** Touch */touch, /** HTMLElement */target, /** Number */startIndex, /** Number */startDraggableIndex) {
			var _this = this,
				el = _this.el,
				options = _this.options,
				ownerDocument = el.ownerDocument,
				dragStartFn;

			if (target && !dragEl && (target.parentNode === el)) {
				rootEl = el;
				dragEl = target;
				parentEl = dragEl.parentNode;
				nextEl = dragEl.nextSibling;
				lastDownEl = target;
				activeGroup = options.group;
				oldIndex = startIndex;
				oldDraggableIndex = startDraggableIndex;

				tapEvt = {
					target: dragEl,
					clientX: (touch || evt).clientX,
					clientY: (touch || evt).clientY
				};

				this._lastX = (touch || evt).clientX;
				this._lastY = (touch || evt).clientY;

				dragEl.style['will-change'] = 'all';
				// undo animation if needed
				dragEl.style.transition = '';
				dragEl.style.transform = '';

				dragStartFn = function () {
					// Delayed drag has been triggered
					// we can re-enable the events: touchmove/mousemove
					_this._disableDelayedDragEvents();

					if (!FireFox && _this.nativeDraggable) {
						dragEl.draggable = true;
					}

					// Bind the events: dragstart/dragend
					_this._triggerDragStart(evt, touch);

					// Drag start event
					_dispatchEvent(_this, rootEl, 'choose', dragEl, rootEl, rootEl, oldIndex, undefined, oldDraggableIndex);

					// Chosen item
					_toggleClass(dragEl, options.chosenClass, true);
				};

				// Disable "draggable"
				options.ignore.split(',').forEach(function (criteria) {
					_find(dragEl, criteria.trim(), _disableDraggable);
				});

				_on(ownerDocument, 'dragover', nearestEmptyInsertDetectEvent);
				_on(ownerDocument, 'mousemove', nearestEmptyInsertDetectEvent);
				_on(ownerDocument, 'touchmove', nearestEmptyInsertDetectEvent);

				_on(ownerDocument, 'mouseup', _this._onDrop);
				_on(ownerDocument, 'touchend', _this._onDrop);
				_on(ownerDocument, 'touchcancel', _this._onDrop);

				// Make dragEl draggable (must be before delay for FireFox)
				if (FireFox && this.nativeDraggable) {
					this.options.touchStartThreshold = 4;
					dragEl.draggable = true;
				}

				// Delay is impossible for native DnD in Edge or IE
				if (options.delay && (options.delayOnTouchOnly ? touch : true) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
					// If the user moves the pointer or let go the click or touch
					// before the delay has been reached:
					// disable the delayed drag
					_on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchend', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
					_on(ownerDocument, 'mousemove', _this._delayedDragTouchMoveHandler);
					_on(ownerDocument, 'touchmove', _this._delayedDragTouchMoveHandler);
					options.supportPointer && _on(ownerDocument, 'pointermove', _this._delayedDragTouchMoveHandler);

					_this._dragStartTimer = setTimeout(dragStartFn, options.delay);
				} else {
					dragStartFn();
				}
			}
		},

		_delayedDragTouchMoveHandler: function (/** TouchEvent|PointerEvent **/e) {
			var touch = e.touches ? e.touches[0] : e;
			if (max(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY))
					>= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))
			) {
				this._disableDelayedDrag();
			}
		},

		_disableDelayedDrag: function () {
			dragEl && _disableDraggable(dragEl);
			clearTimeout(this._dragStartTimer);

			this._disableDelayedDragEvents();
		},

		_disableDelayedDragEvents: function () {
			var ownerDocument = this.el.ownerDocument;
			_off(ownerDocument, 'mouseup', this._disableDelayedDrag);
			_off(ownerDocument, 'touchend', this._disableDelayedDrag);
			_off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
			_off(ownerDocument, 'mousemove', this._delayedDragTouchMoveHandler);
			_off(ownerDocument, 'touchmove', this._delayedDragTouchMoveHandler);
			_off(ownerDocument, 'pointermove', this._delayedDragTouchMoveHandler);
		},

		_triggerDragStart: function (/** Event */evt, /** Touch */touch) {
			touch = touch || (evt.pointerType == 'touch' ? evt : null);

			if (!this.nativeDraggable || touch) {
				if (this.options.supportPointer) {
					_on(document, 'pointermove', this._onTouchMove);
				} else if (touch) {
					_on(document, 'touchmove', this._onTouchMove);
				} else {
					_on(document, 'mousemove', this._onTouchMove);
				}
			} else {
				_on(dragEl, 'dragend', this);
				_on(rootEl, 'dragstart', this._onDragStart);
			}

			try {
				if (document.selection) {
					// Timeout neccessary for IE9
					_nextTick(function () {
						document.selection.empty();
					});
				} else {
					window.getSelection().removeAllRanges();
				}
			} catch (err) {
			}
		},

		_dragStarted: function (fallback, evt) {
			awaitingDragStarted = false;
			if (rootEl && dragEl) {
				if (this.nativeDraggable) {
					_on(document, 'dragover', this._handleAutoScroll);
					_on(document, 'dragover', _checkAlignment);
				}
				var options = this.options;

				// Apply effect
				!fallback && _toggleClass(dragEl, options.dragClass, false);
				_toggleClass(dragEl, options.ghostClass, true);

				// In case dragging an animated element
				_css(dragEl, 'transform', '');

				Sortable.active = this;

				fallback && this._appendGhost();

				// Drag start event
				_dispatchEvent(this, rootEl, 'start', dragEl, rootEl, rootEl, oldIndex, undefined, oldDraggableIndex, undefined, evt);
			} else {
				this._nulling();
			}
		},

		_emulateDragOver: function (forAutoScroll) {
			if (touchEvt) {
				if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY && !forAutoScroll) {
					return;
				}
				this._lastX = touchEvt.clientX;
				this._lastY = touchEvt.clientY;

				_hideGhostForTarget();

				var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
				var parent = target;

				while (target && target.shadowRoot) {
					target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
					if (target === parent) break;
					parent = target;
				}

				if (parent) {
					do {
						if (parent[expando]) {
							var inserted;

							inserted = parent[expando]._onDragOver({
								clientX: touchEvt.clientX,
								clientY: touchEvt.clientY,
								target: target,
								rootEl: parent
							});

							if (inserted && !this.options.dragoverBubble) {
								break;
							}
						}

						target = parent; // store last element
					}
					/* jshint boss:true */
					while (parent = parent.parentNode);
				}
				dragEl.parentNode[expando]._computeIsAligned(touchEvt);

				_unhideGhostForTarget();
			}
		},


		_onTouchMove: function (/**TouchEvent*/evt, forAutoScroll) {
			if (tapEvt) {
				var	options = this.options,
					fallbackTolerance = options.fallbackTolerance,
					fallbackOffset = options.fallbackOffset,
					touch = evt.touches ? evt.touches[0] : evt,
					matrix = ghostEl && _matrix(ghostEl),
					scaleX = ghostEl && matrix && matrix.a,
					scaleY = ghostEl && matrix && matrix.d,
					relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && _getRelativeScrollOffset(ghostRelativeParent),
					dx = ((touch.clientX - tapEvt.clientX)
							+ fallbackOffset.x) / (scaleX || 1)
							+ (relativeScrollOffset ? (relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0]) : 0) / (scaleX || 1),
					dy = ((touch.clientY - tapEvt.clientY)
							+ fallbackOffset.y) / (scaleY || 1)
							+ (relativeScrollOffset ? (relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1]) : 0) / (scaleY || 1),
					translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';

				// only set the status to dragging, when we are actually dragging
				if (!Sortable.active && !awaitingDragStarted) {
					if (fallbackTolerance &&
						min(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY)) < fallbackTolerance
					) {
						return;
					}
					this._onDragStart(evt, true);
				}

				!forAutoScroll && this._handleAutoScroll(touch, true);

				moved = true;
				touchEvt = touch;

				_css(ghostEl, 'webkitTransform', translate3d);
				_css(ghostEl, 'mozTransform', translate3d);
				_css(ghostEl, 'msTransform', translate3d);
				_css(ghostEl, 'transform', translate3d);

				evt.cancelable && evt.preventDefault();
			}
		},

		_appendGhost: function () {
			// Bug if using scale(): https://stackoverflow.com/questions/2637058
			// Not being adjusted for
			if (!ghostEl) {
				var container = this.options.fallbackOnBody ? document.body : rootEl,
					rect = _getRect(dragEl, true, container, !PositionGhostAbsolutely),
					css = _css(dragEl),
					options = this.options;

				// Position absolutely
				if (PositionGhostAbsolutely) {
					// Get relatively positioned parent
					ghostRelativeParent = container;

					while (
						_css(ghostRelativeParent, 'position') === 'static' &&
						_css(ghostRelativeParent, 'transform') === 'none' &&
						ghostRelativeParent !== document
					) {
						ghostRelativeParent = ghostRelativeParent.parentNode;
					}

					if (ghostRelativeParent !== document) {
						var ghostRelativeParentRect = _getRect(ghostRelativeParent, true);

						rect.top -= ghostRelativeParentRect.top;
						rect.left -= ghostRelativeParentRect.left;
					}

					if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
						if (ghostRelativeParent === document) ghostRelativeParent = _getWindowScrollingElement();

						rect.top += ghostRelativeParent.scrollTop;
						rect.left += ghostRelativeParent.scrollLeft;
					} else {
						ghostRelativeParent = _getWindowScrollingElement();
					}
					ghostRelativeParentInitialScroll = _getRelativeScrollOffset(ghostRelativeParent);
				}


				ghostEl = dragEl.cloneNode(true);

				_toggleClass(ghostEl, options.ghostClass, false);
				_toggleClass(ghostEl, options.fallbackClass, true);
				_toggleClass(ghostEl, options.dragClass, true);

				_css(ghostEl, 'box-sizing', 'border-box');
				_css(ghostEl, 'margin', 0);
				_css(ghostEl, 'top', rect.top);
				_css(ghostEl, 'left', rect.left);
				_css(ghostEl, 'width', rect.width);
				_css(ghostEl, 'height', rect.height);
				_css(ghostEl, 'opacity', '0.8');
				_css(ghostEl, 'position', (PositionGhostAbsolutely ? 'absolute' : 'fixed'));
				_css(ghostEl, 'zIndex', '100000');
				_css(ghostEl, 'pointerEvents', 'none');

				container.appendChild(ghostEl);
			}
		},

		_onDragStart: function (/**Event*/evt, /**boolean*/fallback) {
			var _this = this;
			var dataTransfer = evt.dataTransfer;
			var options = _this.options;

			// Setup clone
			cloneEl = _clone(dragEl);

			cloneEl.draggable = false;
			cloneEl.style['will-change'] = '';

			this._hideClone();

			_toggleClass(cloneEl, _this.options.chosenClass, false);


			// #1143: IFrame support workaround
			_this._cloneId = _nextTick(function () {
				if (!_this.options.removeCloneOnHide) {
					rootEl.insertBefore(cloneEl, dragEl);
				}
				_dispatchEvent(_this, rootEl, 'clone', dragEl);
			});


			!fallback && _toggleClass(dragEl, options.dragClass, true);

			// Set proper drop events
			if (fallback) {
				ignoreNextClick = true;
				_this._loopId = setInterval(_this._emulateDragOver, 50);
			} else {
				// Undo what was set in _prepareDragStart before drag started
				_off(document, 'mouseup', _this._onDrop);
				_off(document, 'touchend', _this._onDrop);
				_off(document, 'touchcancel', _this._onDrop);

				if (dataTransfer) {
					dataTransfer.effectAllowed = 'move';
					options.setData && options.setData.call(_this, dataTransfer, dragEl);
				}

				_on(document, 'drop', _this);

				// #1276 fix:
				_css(dragEl, 'transform', 'translateZ(0)');
			}

			awaitingDragStarted = true;

			_this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
			_on(document, 'selectstart', _this);
			if (Safari) {
				_css(document.body, 'user-select', 'none');
			}
		},


		// Returns true - if no further action is needed (either inserted or another condition)
		_onDragOver: function (/**Event*/evt) {
			var el = this.el,
				target = evt.target,
				dragRect,
				targetRect,
				revert,
				options = this.options,
				group = options.group,
				activeSortable = Sortable.active,
				isOwner = (activeGroup === group),
				canSort = options.sort,
				_this = this;

			if (_silent) return;

			// Return invocation when dragEl is inserted (or completed)
			function completed(insertion) {
				if (insertion) {
					if (isOwner) {
						activeSortable._hideClone();
					} else {
						activeSortable._showClone(_this);
					}

					if (activeSortable) {
						// Set ghost class to new sortable's ghost class
						_toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
						_toggleClass(dragEl, options.ghostClass, true);
					}

					if (putSortable !== _this && _this !== Sortable.active) {
						putSortable = _this;
					} else if (_this === Sortable.active) {
						putSortable = null;
					}

					// Animation
					dragRect && _this._animate(dragRect, dragEl);
					target && targetRect && _this._animate(targetRect, target);
				}


				// Null lastTarget if it is not inside a previously swapped element
				if ((target === dragEl && !dragEl.animated) || (target === el && !target.animated)) {
					lastTarget = null;
				}

				// no bubbling and not fallback
				if (!options.dragoverBubble && !evt.rootEl && target !== document) {
					_this._handleAutoScroll(evt);
					dragEl.parentNode[expando]._computeIsAligned(evt);

					// Do not detect for empty insert if already inserted
					!insertion && nearestEmptyInsertDetectEvent(evt);
				}

				!options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();

				return true;
			}

			// Call when dragEl has been inserted
			function changed() {
				_dispatchEvent(_this, rootEl, 'change', target, el, rootEl, oldIndex, _index(dragEl), oldDraggableIndex, _index(dragEl, options.draggable), evt);
			}


			if (evt.preventDefault !== void 0) {
				evt.cancelable && evt.preventDefault();
			}


			moved = true;

			target = _closest(target, options.draggable, el, true);

			// target is dragEl or target is animated
			if (dragEl.contains(evt.target) || target.animated) {
				return completed(false);
			}

			if (target !== dragEl) {
				ignoreNextClick = false;
			}

			if (activeSortable && !options.disabled &&
				(isOwner
					? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
					: (
						putSortable === this ||
						(
							(this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) &&
							group.checkPut(this, activeSortable, dragEl, evt)
						)
					)
				)
			) {
				var axis = this._getDirection(evt, target);

				dragRect = _getRect(dragEl);

				if (revert) {
					this._hideClone();
					parentEl = rootEl; // actualization

					if (nextEl) {
						rootEl.insertBefore(dragEl, nextEl);
					} else {
						rootEl.appendChild(dragEl);
					}

					return completed(true);
				}

				var elLastChild = _lastChild(el);

				if (!elLastChild || _ghostIsLast(evt, axis, el) && !elLastChild.animated) {
					// assign target only if condition is true
					if (elLastChild && el === evt.target) {
						target = elLastChild;
					}

					if (target) {
						targetRect = _getRect(target);
					}

					if (isOwner) {
						activeSortable._hideClone();
					} else {
						activeSortable._showClone(this);
					}

					if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
						el.appendChild(dragEl);
						parentEl = el; // actualization
						realDragElRect = null;

						changed();
						return completed(true);
					}
				}
				else if (target && target !== dragEl && target.parentNode === el) {
					var direction = 0,
						targetBeforeFirstSwap,
						aligned = target.sortableMouseAligned,
						differentLevel = dragEl.parentNode !== el,
						side1 = axis === 'vertical' ? 'top' : 'left',
						scrolledPastTop = _isScrolledPast(target, 'top') || _isScrolledPast(dragEl, 'top'),
						scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;


					if (lastTarget !== target) {
						lastMode = null;
						targetBeforeFirstSwap = _getRect(target)[side1];
						pastFirstInvertThresh = false;
					}

					// Reference: https://www.lucidchart.com/documents/view/10fa0e93-e362-4126-aca2-b709ee56bd8b/0
					if (
						_isElInRowColumn(dragEl, target, axis) && aligned ||
						differentLevel ||
						scrolledPastTop ||
						options.invertSwap ||
						lastMode === 'insert' ||
						// Needed, in the case that we are inside target and inserted because not aligned... aligned will stay false while inside
						// and lastMode will change to 'insert', but we must swap
						lastMode === 'swap'
					) {
						// New target that we will be inside
						if (lastMode !== 'swap') {
							isCircumstantialInvert = options.invertSwap || differentLevel;
						}

						direction = _getSwapDirection(evt, target, axis,
							options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold,
							isCircumstantialInvert,
							lastTarget === target);
						lastMode = 'swap';
					} else {
						// Insert at position
						direction = _getInsertDirection(target);
						lastMode = 'insert';
					}
					if (direction === 0) return completed(false);

					realDragElRect = null;
					lastTarget = target;

					lastDirection = direction;

					targetRect = _getRect(target);

					var nextSibling = target.nextElementSibling,
						after = false;

					after = direction === 1;

					var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

					if (moveVector !== false) {
						if (moveVector === 1 || moveVector === -1) {
							after = (moveVector === 1);
						}

						_silent = true;
						setTimeout(_unsilent, 30);

						if (isOwner) {
							activeSortable._hideClone();
						} else {
							activeSortable._showClone(this);
						}

						if (after && !nextSibling) {
							el.appendChild(dragEl);
						} else {
							target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
						}

						// Undo chrome's scroll adjustment
						if (scrolledPastTop) {
							_scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
						}

						parentEl = dragEl.parentNode; // actualization

						// must be done before animation
						if (targetBeforeFirstSwap !== undefined && !isCircumstantialInvert) {
							targetMoveDistance = abs(targetBeforeFirstSwap - _getRect(target)[side1]);
						}
						changed();

						return completed(true);
					}
				}

				if (el.contains(dragEl)) {
					return completed(false);
				}
			}

			return false;
		},

		_animate: function (prevRect, target) {
			var ms = this.options.animation;

			if (ms) {
				var currentRect = _getRect(target);

				if (target === dragEl) {
					realDragElRect = currentRect;
				}

				if (prevRect.nodeType === 1) {
					prevRect = _getRect(prevRect);
				}

				// Check if actually moving position
				if ((prevRect.left + prevRect.width / 2) !== (currentRect.left + currentRect.width / 2)
					|| (prevRect.top + prevRect.height / 2) !== (currentRect.top + currentRect.height / 2)
				) {
					var matrix = _matrix(this.el),
						scaleX = matrix && matrix.a,
						scaleY = matrix && matrix.d;

					_css(target, 'transition', 'none');
					_css(target, 'transform', 'translate3d('
						+ (prevRect.left - currentRect.left) / (scaleX ? scaleX : 1) + 'px,'
						+ (prevRect.top - currentRect.top) / (scaleY ? scaleY : 1) + 'px,0)'
					);

					this._repaint(target);
					_css(target, 'transition', 'transform ' + ms + 'ms' + (this.options.easing ? ' ' + this.options.easing : ''));
					_css(target, 'transform', 'translate3d(0,0,0)');
				}

				(typeof target.animated === 'number') && clearTimeout(target.animated);
				target.animated = setTimeout(function () {
					_css(target, 'transition', '');
					_css(target, 'transform', '');
					target.animated = false;
				}, ms);
			}
		},

		_repaint: function(target) {
			return target.offsetWidth;
		},

		_offMoveEvents: function() {
			_off(document, 'touchmove', this._onTouchMove);
			_off(document, 'pointermove', this._onTouchMove);
			_off(document, 'dragover', nearestEmptyInsertDetectEvent);
			_off(document, 'mousemove', nearestEmptyInsertDetectEvent);
			_off(document, 'touchmove', nearestEmptyInsertDetectEvent);
		},

		_offUpEvents: function () {
			var ownerDocument = this.el.ownerDocument;

			_off(ownerDocument, 'mouseup', this._onDrop);
			_off(ownerDocument, 'touchend', this._onDrop);
			_off(ownerDocument, 'pointerup', this._onDrop);
			_off(ownerDocument, 'touchcancel', this._onDrop);
			_off(document, 'selectstart', this);
		},

		_onDrop: function (/**Event*/evt) {
			var el = this.el,
				options = this.options;
			awaitingDragStarted = false;
			scrolling = false;
			isCircumstantialInvert = false;
			pastFirstInvertThresh = false;

			clearInterval(this._loopId);

			clearInterval(pointerElemChangedInterval);
			_clearAutoScrolls();
			_cancelThrottle();

			clearTimeout(this._dragStartTimer);

			_cancelNextTick(this._cloneId);
			_cancelNextTick(this._dragStartId);

			// Unbind events
			_off(document, 'mousemove', this._onTouchMove);


			if (this.nativeDraggable) {
				_off(document, 'drop', this);
				_off(el, 'dragstart', this._onDragStart);
				_off(document, 'dragover', this._handleAutoScroll);
				_off(document, 'dragover', _checkAlignment);
			}

			if (Safari) {
				_css(document.body, 'user-select', '');
			}

			this._offMoveEvents();
			this._offUpEvents();

			if (evt) {
				if (moved) {
					evt.cancelable && evt.preventDefault();
					!options.dropBubble && evt.stopPropagation();
				}

				ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

				if (rootEl === parentEl || (putSortable && putSortable.lastPutMode !== 'clone')) {
					// Remove clone
					cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
				}

				if (dragEl) {
					if (this.nativeDraggable) {
						_off(dragEl, 'dragend', this);
					}

					_disableDraggable(dragEl);
					dragEl.style['will-change'] = '';

					// Remove class's
					_toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
					_toggleClass(dragEl, this.options.chosenClass, false);

					// Drag stop event
					_dispatchEvent(this, rootEl, 'unchoose', dragEl, parentEl, rootEl, oldIndex, null, oldDraggableIndex, null, evt);

					if (rootEl !== parentEl) {
						newIndex = _index(dragEl);
						newDraggableIndex = _index(dragEl, options.draggable);

						if (newIndex >= 0) {
							// Add event
							_dispatchEvent(null, parentEl, 'add', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);

							// Remove event
							_dispatchEvent(this, rootEl, 'remove', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);

							// drag from one list and drop into another
							_dispatchEvent(null, parentEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);
							_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);
						}

						putSortable && putSortable.save();
					}
					else {
						if (dragEl.nextSibling !== nextEl) {
							// Get the index of the dragged element within its parent
							newIndex = _index(dragEl);
							newDraggableIndex = _index(dragEl, options.draggable);

							if (newIndex >= 0) {
								// drag & drop within the same list
								_dispatchEvent(this, rootEl, 'update', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);
								_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);
							}
						}
					}

					if (Sortable.active) {
						/* jshint eqnull:true */
						if (newIndex == null || newIndex === -1) {
							newIndex = oldIndex;
							newDraggableIndex = oldDraggableIndex;
						}
						_dispatchEvent(this, rootEl, 'end', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);

						// Save sorting
						this.save();
					}
				}

			}
			this._nulling();
		},

		_nulling: function() {
			rootEl =
			dragEl =
			parentEl =
			ghostEl =
			nextEl =
			cloneEl =
			lastDownEl =

			scrollEl =
			scrollParentEl =
			autoScrolls.length =

			pointerElemChangedInterval =
			lastPointerElemX =
			lastPointerElemY =

			tapEvt =
			touchEvt =

			moved =
			newIndex =
			oldIndex =

			lastTarget =
			lastDirection =

			realDragElRect =

			putSortable =
			activeGroup =
			Sortable.active = null;

			savedInputChecked.forEach(function (el) {
				el.checked = true;
			});

			savedInputChecked.length = 0;
		},

		handleEvent: function (/**Event*/evt) {
			switch (evt.type) {
				case 'drop':
				case 'dragend':
					this._onDrop(evt);
					break;

				case 'dragenter':
				case 'dragover':
					if (dragEl) {
						this._onDragOver(evt);
						_globalDragOver(evt);
					}
					break;

				case 'selectstart':
					evt.preventDefault();
					break;
			}
		},


		/**
		 * Serializes the item into an array of string.
		 * @returns {String[]}
		 */
		toArray: function () {
			var order = [],
				el,
				children = this.el.children,
				i = 0,
				n = children.length,
				options = this.options;

			for (; i < n; i++) {
				el = children[i];
				if (_closest(el, options.draggable, this.el, false)) {
					order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
				}
			}

			return order;
		},


		/**
		 * Sorts the elements according to the array.
		 * @param  {String[]}  order  order of the items
		 */
		sort: function (order) {
			var items = {}, rootEl = this.el;

			this.toArray().forEach(function (id, i) {
				var el = rootEl.children[i];

				if (_closest(el, this.options.draggable, rootEl, false)) {
					items[id] = el;
				}
			}, this);

			order.forEach(function (id) {
				if (items[id]) {
					rootEl.removeChild(items[id]);
					rootEl.appendChild(items[id]);
				}
			});
		},


		/**
		 * Save the current sorting
		 */
		save: function () {
			var store = this.options.store;
			store && store.set && store.set(this);
		},


		/**
		 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
		 * @param   {HTMLElement}  el
		 * @param   {String}       [selector]  default: `options.draggable`
		 * @returns {HTMLElement|null}
		 */
		closest: function (el, selector) {
			return _closest(el, selector || this.options.draggable, this.el, false);
		},


		/**
		 * Set/get option
		 * @param   {string} name
		 * @param   {*}      [value]
		 * @returns {*}
		 */
		option: function (name, value) {
			var options = this.options;

			if (value === void 0) {
				return options[name];
			} else {
				options[name] = value;

				if (name === 'group') {
					_prepareGroup(options);
				}
			}
		},


		/**
		 * Destroy
		 */
		destroy: function () {
			var el = this.el;

			el[expando] = null;

			_off(el, 'mousedown', this._onTapStart);
			_off(el, 'touchstart', this._onTapStart);
			_off(el, 'pointerdown', this._onTapStart);

			if (this.nativeDraggable) {
				_off(el, 'dragover', this);
				_off(el, 'dragenter', this);
			}
			// Remove draggable attributes
			Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
				el.removeAttribute('draggable');
			});

			this._onDrop();

			sortables.splice(sortables.indexOf(this.el), 1);

			this.el = el = null;
		},

		_hideClone: function() {
			if (!cloneEl.cloneHidden) {
				_css(cloneEl, 'display', 'none');
				cloneEl.cloneHidden = true;
				if (cloneEl.parentNode && this.options.removeCloneOnHide) {
					cloneEl.parentNode.removeChild(cloneEl);
				}
			}
		},

		_showClone: function(putSortable) {
			if (putSortable.lastPutMode !== 'clone') {
				this._hideClone();
				return;
			}

			if (cloneEl.cloneHidden) {
				// show clone at dragEl or original position
				if (rootEl.contains(dragEl) && !this.options.group.revertClone) {
					rootEl.insertBefore(cloneEl, dragEl);
				} else if (nextEl) {
					rootEl.insertBefore(cloneEl, nextEl);
				} else {
					rootEl.appendChild(cloneEl);
				}

				if (this.options.group.revertClone) {
					this._animate(dragEl, cloneEl);
				}
				_css(cloneEl, 'display', '');
				cloneEl.cloneHidden = false;
			}
		}
	};

	function _closest(/**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx, includeCTX) {
		if (el) {
			ctx = ctx || document;

			do {
				if (
					selector != null &&
					(
						selector[0] === '>' ?
						el.parentNode === ctx && _matches(el, selector) :
						_matches(el, selector)
					) ||
					includeCTX && el === ctx
				) {
					return el;
				}

				if (el === ctx) break;
				/* jshint boss:true */
			} while (el = _getParentOrHost(el));
		}

		return null;
	}


	function _getParentOrHost(el) {
		return (el.host && el !== document && el.host.nodeType)
			? el.host
			: el.parentNode;
	}


	function _globalDragOver(/**Event*/evt) {
		if (evt.dataTransfer) {
			evt.dataTransfer.dropEffect = 'move';
		}
		evt.cancelable && evt.preventDefault();
	}


	function _on(el, event, fn) {
		el.addEventListener(event, fn, IE11OrLess ? false : captureMode);
	}


	function _off(el, event, fn) {
		el.removeEventListener(event, fn, IE11OrLess ? false : captureMode);
	}


	function _toggleClass(el, name, state) {
		if (el && name) {
			if (el.classList) {
				el.classList[state ? 'add' : 'remove'](name);
			}
			else {
				var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
				el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
			}
		}
	}


	function _css(el, prop, val) {
		var style = el && el.style;

		if (style) {
			if (val === void 0) {
				if (document.defaultView && document.defaultView.getComputedStyle) {
					val = document.defaultView.getComputedStyle(el, '');
				}
				else if (el.currentStyle) {
					val = el.currentStyle;
				}

				return prop === void 0 ? val : val[prop];
			}
			else {
				if (!(prop in style) && prop.indexOf('webkit') === -1) {
					prop = '-webkit-' + prop;
				}

				style[prop] = val + (typeof val === 'string' ? '' : 'px');
			}
		}
	}

	function _matrix(el) {
		var appliedTransforms = '';
		do {
			var transform = _css(el, 'transform');

			if (transform && transform !== 'none') {
				appliedTransforms = transform + ' ' + appliedTransforms;
			}
			/* jshint boss:true */
		} while (el = el.parentNode);

		if (window.DOMMatrix) {
			return new DOMMatrix(appliedTransforms);
		} else if (window.WebKitCSSMatrix) {
			return new WebKitCSSMatrix(appliedTransforms);
		} else if (window.CSSMatrix) {
			return new CSSMatrix(appliedTransforms);
		}
	}


	function _find(ctx, tagName, iterator) {
		if (ctx) {
			var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;

			if (iterator) {
				for (; i < n; i++) {
					iterator(list[i], i);
				}
			}

			return list;
		}

		return [];
	}



	function _dispatchEvent(
		sortable, rootEl, name,
		targetEl, toEl, fromEl,
		startIndex, newIndex,
		startDraggableIndex, newDraggableIndex,
		originalEvt
	) {
		sortable = (sortable || rootEl[expando]);
		var evt,
			options = sortable.options,
			onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);
		// Support for new CustomEvent feature
		if (window.CustomEvent && !IE11OrLess && !Edge) {
			evt = new CustomEvent(name, {
				bubbles: true,
				cancelable: true
			});
		} else {
			evt = document.createEvent('Event');
			evt.initEvent(name, true, true);
		}

		evt.to = toEl || rootEl;
		evt.from = fromEl || rootEl;
		evt.item = targetEl || rootEl;
		evt.clone = cloneEl;

		evt.oldIndex = startIndex;
		evt.newIndex = newIndex;

		evt.oldDraggableIndex = startDraggableIndex;
		evt.newDraggableIndex = newDraggableIndex;

		evt.originalEvent = originalEvt;
		evt.pullMode = putSortable ? putSortable.lastPutMode : undefined;

		if (rootEl) {
			rootEl.dispatchEvent(evt);
		}

		if (options[onName]) {
			options[onName].call(sortable, evt);
		}
	}


	function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvt, willInsertAfter) {
		var evt,
			sortable = fromEl[expando],
			onMoveFn = sortable.options.onMove,
			retVal;
		// Support for new CustomEvent feature
		if (window.CustomEvent && !IE11OrLess && !Edge) {
			evt = new CustomEvent('move', {
				bubbles: true,
				cancelable: true
			});
		} else {
			evt = document.createEvent('Event');
			evt.initEvent('move', true, true);
		}

		evt.to = toEl;
		evt.from = fromEl;
		evt.dragged = dragEl;
		evt.draggedRect = dragRect;
		evt.related = targetEl || toEl;
		evt.relatedRect = targetRect || _getRect(toEl);
		evt.willInsertAfter = willInsertAfter;

		evt.originalEvent = originalEvt;

		fromEl.dispatchEvent(evt);

		if (onMoveFn) {
			retVal = onMoveFn.call(sortable, evt, originalEvt);
		}

		return retVal;
	}

	function _disableDraggable(el) {
		el.draggable = false;
	}

	function _unsilent() {
		_silent = false;
	}

	/**
	 * Gets nth child of el, ignoring hidden children, sortable's elements (does not ignore clone if it's visible)
	 * and non-draggable elements
	 * @param  {HTMLElement} el       The parent element
	 * @param  {Number} childNum      The index of the child
	 * @param  {Object} options       Parent Sortable's options
	 * @return {HTMLElement}          The child at index childNum, or null if not found
	 */
	function _getChild(el, childNum, options) {
		var currentChild = 0,
			i = 0,
			children = el.children;

		while (i < children.length) {
			if (
				children[i].style.display !== 'none' &&
				children[i] !== ghostEl &&
				children[i] !== dragEl &&
				_closest(children[i], options.draggable, el, false)
			) {
				if (currentChild === childNum) {
					return children[i];
				}
				currentChild++;
			}

			i++;
		}
		return null;
	}

	/**
	 * Gets the last child in the el, ignoring ghostEl or invisible elements (clones)
	 * @param  {HTMLElement} el       Parent element
	 * @return {HTMLElement}          The last child, ignoring ghostEl
	 */
	function _lastChild(el) {
		var last = el.lastElementChild;

		while (last && (last === ghostEl || _css(last, 'display') === 'none')) {
			last = last.previousElementSibling;
		}

		return last || null;
	}

	function _ghostIsLast(evt, axis, el) {
		var elRect = _getRect(_lastChild(el)),
			mouseOnAxis = axis === 'vertical' ? evt.clientY : evt.clientX,
			mouseOnOppAxis = axis === 'vertical' ? evt.clientX : evt.clientY,
			targetS2 = axis === 'vertical' ? elRect.bottom : elRect.right,
			targetS1Opp = axis === 'vertical' ? elRect.left : elRect.top,
			targetS2Opp = axis === 'vertical' ? elRect.right : elRect.bottom,
			spacer = 10;

		return (
			axis === 'vertical' ?
				(mouseOnOppAxis > targetS2Opp + spacer || mouseOnOppAxis <= targetS2Opp && mouseOnAxis > targetS2 && mouseOnOppAxis >= targetS1Opp) :
				(mouseOnAxis > targetS2 && mouseOnOppAxis > targetS1Opp || mouseOnAxis <= targetS2 && mouseOnOppAxis > targetS2Opp + spacer)
		);
	}

	function _getSwapDirection(evt, target, axis, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
		var targetRect = _getRect(target),
			mouseOnAxis = axis === 'vertical' ? evt.clientY : evt.clientX,
			targetLength = axis === 'vertical' ? targetRect.height : targetRect.width,
			targetS1 = axis === 'vertical' ? targetRect.top : targetRect.left,
			targetS2 = axis === 'vertical' ? targetRect.bottom : targetRect.right,
			dragRect = _getRect(dragEl),
			invert = false;


		if (!invertSwap) {
			// Never invert or create dragEl shadow when target movemenet causes mouse to move past the end of regular swapThreshold
			if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) { // multiplied only by swapThreshold because mouse will already be inside target by (1 - threshold) * targetLength / 2
				// check if past first invert threshold on side opposite of lastDirection
				if (!pastFirstInvertThresh &&
					(lastDirection === 1 ?
						(
							mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2
						) :
						(
							mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2
						)
					)
				)
				{
					// past first invert threshold, do not restrict inverted threshold to dragEl shadow
					pastFirstInvertThresh = true;
				}

				if (!pastFirstInvertThresh) {
					var dragS1 = axis === 'vertical' ? dragRect.top : dragRect.left,
						dragS2 = axis === 'vertical' ? dragRect.bottom : dragRect.right;
					// dragEl shadow (target move distance shadow)
					if (
						lastDirection === 1 ?
						(
							mouseOnAxis < targetS1 + targetMoveDistance // over dragEl shadow
						) :
						(
							mouseOnAxis > targetS2 - targetMoveDistance
						)
					)
					{
						return lastDirection * -1;
					}
				} else {
					invert = true;
				}
			} else {
				// Regular
				if (
					mouseOnAxis > targetS1 + (targetLength * (1 - swapThreshold) / 2) &&
					mouseOnAxis < targetS2 - (targetLength * (1 - swapThreshold) / 2)
				) {
					return _getInsertDirection(target);
				}
			}
		}

		invert = invert || invertSwap;

		if (invert) {
			// Invert of regular
			if (
				mouseOnAxis < targetS1 + (targetLength * invertedSwapThreshold / 2) ||
				mouseOnAxis > targetS2 - (targetLength * invertedSwapThreshold / 2)
			)
			{
				return ((mouseOnAxis > targetS1 + targetLength / 2) ? 1 : -1);
			}
		}

		return 0;
	}

	/**
	 * Gets the direction dragEl must be swapped relative to target in order to make it
	 * seem that dragEl has been "inserted" into that element's position
	 * @param  {HTMLElement} target       The target whose position dragEl is being inserted at
	 * @return {Number}                   Direction dragEl must be swapped
	 */
	function _getInsertDirection(target) {
		var dragElIndex = _index(dragEl),
			targetIndex = _index(target);

		if (dragElIndex < targetIndex) {
			return 1;
		} else {
			return -1;
		}
	}


	/**
	 * Generate id
	 * @param   {HTMLElement} el
	 * @returns {String}
	 * @private
	 */
	function _generateId(el) {
		var str = el.tagName + el.className + el.src + el.href + el.textContent,
			i = str.length,
			sum = 0;

		while (i--) {
			sum += str.charCodeAt(i);
		}

		return sum.toString(36);
	}

	/**
	 * Returns the index of an element within its parent for a selected set of
	 * elements
	 * @param  {HTMLElement} el
	 * @param  {selector} selector
	 * @return {number}
	 */
	function _index(el, selector) {
		var index = 0;

		if (!el || !el.parentNode) {
			return -1;
		}

		while (el && (el = el.previousElementSibling)) {
			if ((el.nodeName.toUpperCase() !== 'TEMPLATE') && el !== cloneEl && (!selector || _matches(el, selector))) {
				index++;
			}
		}

		return index;
	}

	function _matches(/**HTMLElement*/el, /**String*/selector) {
		if (!selector) return;

		selector[0] === '>' && (selector = selector.substring(1));

		if (el) {
			try {
				if (el.matches) {
					return el.matches(selector);
				} else if (el.msMatchesSelector) {
					return el.msMatchesSelector(selector);
				} else if (el.webkitMatchesSelector) {
					return el.webkitMatchesSelector(selector);
				}
			} catch(_) {
				return false;
			}
		}

		return false;
	}

	var _throttleTimeout;
	function _throttle(callback, ms) {
		return function () {
			if (!_throttleTimeout) {
				var args = arguments,
					_this = this;

				_throttleTimeout = setTimeout(function () {
					if (args.length === 1) {
						callback.call(_this, args[0]);
					} else {
						callback.apply(_this, args);
					}

					_throttleTimeout = void 0;
				}, ms);
			}
		};
	}

	function _cancelThrottle() {
		clearTimeout(_throttleTimeout);
		_throttleTimeout = void 0;
	}

	function _extend(dst, src) {
		if (dst && src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					dst[key] = src[key];
				}
			}
		}

		return dst;
	}

	function _clone(el) {
		if (Polymer && Polymer.dom) {
			return Polymer.dom(el).cloneNode(true);
		}
		else if ($) {
			return $(el).clone(true)[0];
		}
		else {
			return el.cloneNode(true);
		}
	}

	function _saveInputCheckedState(root) {
		savedInputChecked.length = 0;

		var inputs = root.getElementsByTagName('input');
		var idx = inputs.length;

		while (idx--) {
			var el = inputs[idx];
			el.checked && savedInputChecked.push(el);
		}
	}

	function _nextTick(fn) {
		return setTimeout(fn, 0);
	}

	function _cancelNextTick(id) {
		return clearTimeout(id);
	}


	/**
	 * Returns the "bounding client rect" of given element
	 * @param  {HTMLElement} el                The element whose boundingClientRect is wanted
	 * @param  {[HTMLElement]} container       the parent the element will be placed in
	 * @param  {[Boolean]} adjustForTransform  Whether the rect should compensate for parent's transform
	 * @return {Object}                        The boundingClientRect of el
	 */
	function _getRect(el, adjustForTransform, container, adjustForFixed) {
		if (!el.getBoundingClientRect && el !== win) return;

		var elRect,
			top,
			left,
			bottom,
			right,
			height,
			width;

		if (el !== win && el !== _getWindowScrollingElement()) {
			elRect = el.getBoundingClientRect();
			top = elRect.top;
			left = elRect.left;
			bottom = elRect.bottom;
			right = elRect.right;
			height = elRect.height;
			width = elRect.width;
		} else {
			top = 0;
			left = 0;
			bottom = window.innerHeight;
			right = window.innerWidth;
			height = window.innerHeight;
			width = window.innerWidth;
		}

		if (adjustForFixed && el !== win) {
			// Adjust for translate()
			container = container || el.parentNode;

			// solves #1123 (see: https://stackoverflow.com/a/37953806/6088312)
			// Not needed on <= IE11
			if (!IE11OrLess) {
				do {
					if (container && container.getBoundingClientRect && _css(container, 'transform') !== 'none') {
						var containerRect = container.getBoundingClientRect();

						// Set relative to edges of padding box of container
						top -= containerRect.top + parseInt(_css(container, 'border-top-width'));
						left -= containerRect.left + parseInt(_css(container, 'border-left-width'));
						bottom = top + elRect.height;
						right = left + elRect.width;

						break;
					}
					/* jshint boss:true */
				} while (container = container.parentNode);
			}
		}

		if (adjustForTransform && el !== win) {
			// Adjust for scale()
			var matrix = _matrix(container || el),
				scaleX = matrix && matrix.a,
				scaleY = matrix && matrix.d;

			if (matrix) {
				top /= scaleY;
				left /= scaleX;

				width /= scaleX;
				height /= scaleY;

				bottom = top + height;
				right = left + width;
			}
		}

		return {
			top: top,
			left: left,
			bottom: bottom,
			right: right,
			width: width,
			height: height
		};
	}


	/**
	 * Checks if a side of an element is scrolled past a side of it's parents
	 * @param  {HTMLElement}  el       The element who's side being scrolled out of view is in question
	 * @param  {String}       side     Side of the element in question ('top', 'left', 'right', 'bottom')
	 * @return {HTMLElement}           The parent scroll element that the el's side is scrolled past, or null if there is no such element
	 */
	function _isScrolledPast(el, side) {
		var parent = _getParentAutoScrollElement(el, true),
			elSide = _getRect(el)[side];

		/* jshint boss:true */
		while (parent) {
			var parentSide = _getRect(parent)[side],
				visible;

			if (side === 'top' || side === 'left') {
				visible = elSide >= parentSide;
			} else {
				visible = elSide <= parentSide;
			}

			if (!visible) return parent;

			if (parent === _getWindowScrollingElement()) break;

			parent = _getParentAutoScrollElement(parent, false);
		}

		return false;
	}

	/**
	 * Returns the scroll offset of the given element, added with all the scroll offsets of parent elements.
	 * The value is returned in real pixels.
	 * @param  {HTMLElement} el
	 * @return {Array}             Offsets in the format of [left, top]
	 */
	function _getRelativeScrollOffset(el) {
		var offsetLeft = 0,
			offsetTop = 0,
			winScroller = _getWindowScrollingElement();

		if (el) {
			do {
				var matrix = _matrix(el),
					scaleX = matrix.a,
					scaleY = matrix.d;

				offsetLeft += el.scrollLeft * scaleX;
				offsetTop += el.scrollTop * scaleY;
			} while (el !== winScroller && (el = el.parentNode));
		}

		return [offsetLeft, offsetTop];
	}

	// Fixed #973:
	_on(document, 'touchmove', function(evt) {
		if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
			evt.preventDefault();
		}
	});


	// Export utils
	Sortable.utils = {
		on: _on,
		off: _off,
		css: _css,
		find: _find,
		is: function (el, selector) {
			return !!_closest(el, selector, el, false);
		},
		extend: _extend,
		throttle: _throttle,
		closest: _closest,
		toggleClass: _toggleClass,
		clone: _clone,
		index: _index,
		nextTick: _nextTick,
		cancelNextTick: _cancelNextTick,
		detectDirection: _detectDirection,
		getChild: _getChild
	};


	/**
	 * Create sortable instance
	 * @param {HTMLElement}  el
	 * @param {Object}      [options]
	 */
	Sortable.create = function (el, options) {
		return new Sortable(el, options);
	};


	// Export
	Sortable.version = '1.9.0';
	return Sortable;
});


/***/ }),

/***/ 1414:
/***/ (function(module, exports, __webpack_require__) {

module.exports =
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "0390":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__("02f4")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ "07e3":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0fc9":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("3a38");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "1654":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("71c1")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("30f1")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "1691":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "1af6":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__("63b6");

$export($export.S, 'Array', { isArray: __webpack_require__("9003") });


/***/ }),

/***/ "1bc3":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("f772");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "1ec9":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("f772");
var document = __webpack_require__("e53d").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "20fd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__("d9f6");
var createDesc = __webpack_require__("aebd");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("b0c5");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");
var regexpExec = __webpack_require__("520a");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
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

/***/ "241e":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("25eb");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "25eb":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "294c":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2fdb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__("5ca1");
var context = __webpack_require__("d2c8");
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__("5147")(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "30f1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("b8e3");
var $export = __webpack_require__("63b6");
var redefine = __webpack_require__("9138");
var hide = __webpack_require__("35e8");
var Iterators = __webpack_require__("481b");
var $iterCreate = __webpack_require__("8f60");
var setToStringTag = __webpack_require__("45f2");
var getPrototypeOf = __webpack_require__("53e2");
var ITERATOR = __webpack_require__("5168")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "32a6":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("241e");
var $keys = __webpack_require__("c3a1");

__webpack_require__("ce7e")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "32fc":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("e53d").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "335c":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("6b4c");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "355d":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "35e8":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("d9f6");
var createDesc = __webpack_require__("aebd");
module.exports = __webpack_require__("8e60") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "36c3":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("335c");
var defined = __webpack_require__("25eb");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "3702":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("481b");
var ITERATOR = __webpack_require__("5168")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "3a38":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "40c3":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("6b4c");
var TAG = __webpack_require__("5168")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
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

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "45f2":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("d9f6").f;
var has = __webpack_require__("07e3");
var TAG = __webpack_require__("5168")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "469f":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("6c1c");
__webpack_require__("1654");
module.exports = __webpack_require__("7d7b");


/***/ }),

/***/ "481b":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "4aa6":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("dc62");

/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "4ee1":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("5168")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "50ed":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "5147":
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ "5168":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("dbdb")('wks');
var uid = __webpack_require__("62a0");
var Symbol = __webpack_require__("e53d").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "5176":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("51b6");

/***/ }),

/***/ "51b6":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("a3c3");
module.exports = __webpack_require__("584a").Object.assign;


/***/ }),

/***/ "520a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__("0bfb");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "53e2":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("07e3");
var toObject = __webpack_require__("241e");
var IE_PROTO = __webpack_require__("5559")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "549b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__("d864");
var $export = __webpack_require__("63b6");
var toObject = __webpack_require__("241e");
var call = __webpack_require__("b0dc");
var isArrayIter = __webpack_require__("3702");
var toLength = __webpack_require__("b447");
var createProperty = __webpack_require__("20fd");
var getIterFn = __webpack_require__("7cd6");

$export($export.S + $export.F * !__webpack_require__("4ee1")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ "54a1":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("6c1c");
__webpack_require__("1654");
module.exports = __webpack_require__("95d5");


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5559":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("dbdb")('keys');
var uid = __webpack_require__("62a0");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "584a":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "5b4e":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("36c3");
var toLength = __webpack_require__("b447");
var toAbsoluteIndex = __webpack_require__("0fc9");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
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

/***/ "5d73":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("469f");

/***/ }),

/***/ "5f1b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__("23c6");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "62a0":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "63b6":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e53d");
var core = __webpack_require__("584a");
var ctx = __webpack_require__("d864");
var hide = __webpack_require__("35e8");
var has = __webpack_require__("07e3");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
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
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
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

/***/ "6762":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__("5ca1");
var $includes = __webpack_require__("c366")(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__("9c6c")('includes');


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "6b4c":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "6c1c":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("c367");
var global = __webpack_require__("e53d");
var hide = __webpack_require__("35e8");
var Iterators = __webpack_require__("481b");
var TO_STRING_TAG = __webpack_require__("5168")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ "71c1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("3a38");
var defined = __webpack_require__("25eb");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "774e":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("d2d5");

/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "794b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("8e60") && !__webpack_require__("294c")(function () {
  return Object.defineProperty(__webpack_require__("1ec9")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "79aa":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7cd6":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("40c3");
var ITERATOR = __webpack_require__("5168")('iterator');
var Iterators = __webpack_require__("481b");
module.exports = __webpack_require__("584a").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "7d7b":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("e4ae");
var get = __webpack_require__("7cd6");
module.exports = __webpack_require__("584a").getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),

/***/ "7e90":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("d9f6");
var anObject = __webpack_require__("e4ae");
var getKeys = __webpack_require__("c3a1");

module.exports = __webpack_require__("8e60") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "8436":
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8aae":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("32a6");
module.exports = __webpack_require__("584a").Object.keys;


/***/ }),

/***/ "8e60":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("294c")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "8f60":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("a159");
var descriptor = __webpack_require__("aebd");
var setToStringTag = __webpack_require__("45f2");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("35e8")(IteratorPrototype, __webpack_require__("5168")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "9003":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("6b4c");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "9138":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("35e8");


/***/ }),

/***/ "9306":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__("c3a1");
var gOPS = __webpack_require__("9aa9");
var pIE = __webpack_require__("355d");
var toObject = __webpack_require__("241e");
var IObject = __webpack_require__("335c");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__("294c")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "9427":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("63b6");
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__("a159") });


/***/ }),

/***/ "95d5":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("40c3");
var ITERATOR = __webpack_require__("5168")('iterator');
var Iterators = __webpack_require__("481b");
module.exports = __webpack_require__("584a").isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),

/***/ "9aa9":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a159":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("e4ae");
var dPs = __webpack_require__("7e90");
var enumBugKeys = __webpack_require__("1691");
var IE_PROTO = __webpack_require__("5559")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("1ec9")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("32fc").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "a352":
/***/ (function(module, exports) {

module.exports = __webpack_require__(1396);

/***/ }),

/***/ "a3c3":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__("63b6");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__("9306") });


/***/ }),

/***/ "a481":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var toInteger = __webpack_require__("4588");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__("214f")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "a4bb":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("8aae");

/***/ }),

/***/ "a745":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("f410");

/***/ }),

/***/ "aae3":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("d3f4");
var cof = __webpack_require__("2d95");
var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "aebd":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "b0c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__("520a");
__webpack_require__("5ca1")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ "b0dc":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("e4ae");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "b447":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("3a38");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "b8e3":
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c367":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("8436");
var step = __webpack_require__("50ed");
var Iterators = __webpack_require__("481b");
var toIObject = __webpack_require__("36c3");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("30f1")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "c3a1":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("e6f3");
var enumBugKeys = __webpack_require__("1691");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "c649":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return insertNodeAt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return camelize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return console; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return removeNode; });
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a481");
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_Users_david_desmaisons_Documents_project_source_Vue_Draggable_node_modules_babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("4aa6");
/* harmony import */ var C_Users_david_desmaisons_Documents_project_source_Vue_Draggable_node_modules_babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(C_Users_david_desmaisons_Documents_project_source_Vue_Draggable_node_modules_babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_1__);



function getConsole() {
  if (typeof window !== "undefined") {
    return window.console;
  }

  return global.console;
}

var console = getConsole();

function cached(fn) {
  var cache = C_Users_david_desmaisons_Documents_project_source_Vue_Draggable_node_modules_babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_1___default()(null);

  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

var regex = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(regex, function (_, c) {
    return c ? c.toUpperCase() : "";
  });
});

function removeNode(node) {
  if (node.parentElement !== null) {
    node.parentElement.removeChild(node);
  }
}

function insertNodeAt(fatherNode, node, position) {
  var refNode = position === 0 ? fatherNode.children[0] : fatherNode.children[position - 1].nextSibling;
  fatherNode.insertBefore(node, refNode);
}


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "c8bb":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("54a1");

/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "ce7e":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("63b6");
var core = __webpack_require__("584a");
var fails = __webpack_require__("294c");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "d2c8":
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__("aae3");
var defined = __webpack_require__("be13");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ "d2d5":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("1654");
__webpack_require__("549b");
module.exports = __webpack_require__("584a").Array.from;


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d864":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("79aa");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "d9f6":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("e4ae");
var IE8_DOM_DEFINE = __webpack_require__("794b");
var toPrimitive = __webpack_require__("1bc3");
var dP = Object.defineProperty;

exports.f = __webpack_require__("8e60") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "dbdb":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("584a");
var global = __webpack_require__("e53d");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("b8e3") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "dc62":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("9427");
var $Object = __webpack_require__("584a").Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),

/***/ "e4ae":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("f772");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "e53d":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "e6f3":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("07e3");
var toIObject = __webpack_require__("36c3");
var arrayIndexOf = __webpack_require__("5b4e")(false);
var IE_PROTO = __webpack_require__("5559")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "f410":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("1af6");
module.exports = __webpack_require__("584a").Array.isArray;


/***/ }),

/***/ "f559":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__("5ca1");
var toLength = __webpack_require__("9def");
var context = __webpack_require__("d2c8");
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__("5147")(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),

/***/ "f772":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/assign.js
var object_assign = __webpack_require__("5176");
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.starts-with.js
var es6_string_starts_with = __webpack_require__("f559");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/keys.js
var keys = __webpack_require__("a4bb");
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.array.includes.js
var es7_array_includes = __webpack_require__("6762");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.includes.js
var es6_string_includes = __webpack_require__("2fdb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js
var is_array = __webpack_require__("a745");
var is_array_default = /*#__PURE__*/__webpack_require__.n(is_array);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithHoles.js

function _arrayWithHoles(arr) {
  if (is_array_default()(arr)) return arr;
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/get-iterator.js
var get_iterator = __webpack_require__("5d73");
var get_iterator_default = /*#__PURE__*/__webpack_require__.n(get_iterator);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArrayLimit.js

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = get_iterator_default()(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
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
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js



function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (is_array_default()(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/array/from.js
var from = __webpack_require__("774e");
var from_default = /*#__PURE__*/__webpack_require__.n(from);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/is-iterable.js
var is_iterable = __webpack_require__("c8bb");
var is_iterable_default = /*#__PURE__*/__webpack_require__.n(is_iterable);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArray.js


function _iterableToArray(iter) {
  if (is_iterable_default()(Object(iter)) || Object.prototype.toString.call(iter) === "[object Arguments]") return from_default()(iter);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js



function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}
// EXTERNAL MODULE: external {"commonjs":"sortablejs","commonjs2":"sortablejs","amd":"sortablejs","root":"Sortable"}
var external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_ = __webpack_require__("a352");
var external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_);

// EXTERNAL MODULE: ./src/util/helper.js
var helper = __webpack_require__("c649");

// CONCATENATED MODULE: ./src/vuedraggable.js










function buildAttribute(object, propName, value) {
  if (value === undefined) {
    return object;
  }

  object = object || {};
  object[propName] = value;
  return object;
}

function computeVmIndex(vnodes, element) {
  return vnodes.map(function (elt) {
    return elt.elm;
  }).indexOf(element);
}

function _computeIndexes(slots, children, isTransition, footerOffset) {
  if (!slots) {
    return [];
  }

  var elmFromNodes = slots.map(function (elt) {
    return elt.elm;
  });
  var footerIndex = children.length - footerOffset;

  var rawIndexes = _toConsumableArray(children).map(function (elt, idx) {
    return idx >= footerIndex ? elmFromNodes.length : elmFromNodes.indexOf(elt);
  });

  return isTransition ? rawIndexes.filter(function (ind) {
    return ind !== -1;
  }) : rawIndexes;
}

function emit(evtName, evtData) {
  var _this = this;

  this.$nextTick(function () {
    return _this.$emit(evtName.toLowerCase(), evtData);
  });
}

function delegateAndEmit(evtName) {
  var _this2 = this;

  return function (evtData) {
    if (_this2.realList !== null) {
      _this2["onDrag" + evtName](evtData);
    }

    emit.call(_this2, evtName, evtData);
  };
}

function vuedraggable_isTransition(slots) {
  if (!slots || slots.length !== 1) {
    return false;
  }

  var _slots = _slicedToArray(slots, 1),
      componentOptions = _slots[0].componentOptions;

  if (!componentOptions) {
    return false;
  }

  return ["transition-group", "TransitionGroup"].includes(componentOptions.tag);
}

function computeChildrenAndOffsets(children, _ref) {
  var header = _ref.header,
      footer = _ref.footer;
  var headerOffset = 0;
  var footerOffset = 0;

  if (header) {
    headerOffset = header.length;
    children = children ? [].concat(_toConsumableArray(header), _toConsumableArray(children)) : _toConsumableArray(header);
  }

  if (footer) {
    footerOffset = footer.length;
    children = children ? [].concat(_toConsumableArray(children), _toConsumableArray(footer)) : _toConsumableArray(footer);
  }

  return {
    children: children,
    headerOffset: headerOffset,
    footerOffset: footerOffset
  };
}

function getComponentAttributes($attrs, componentData) {
  var attributes = null;

  var update = function update(name, value) {
    attributes = buildAttribute(attributes, name, value);
  };

  var attrs = keys_default()($attrs).filter(function (key) {
    return key === "id" || key.startsWith("data-");
  }).reduce(function (res, key) {
    res[key] = $attrs[key];
    return res;
  }, {});

  update("attrs", attrs);

  if (!componentData) {
    return attributes;
  }

  var on = componentData.on,
      props = componentData.props,
      componentDataAttrs = componentData.attrs;
  update("on", on);
  update("props", props);

  assign_default()(attributes.attrs, componentDataAttrs);

  return attributes;
}

var eventsListened = ["Start", "Add", "Remove", "Update", "End"];
var eventsToEmit = ["Choose", "Sort", "Filter", "Clone"];
var readonlyProperties = ["Move"].concat(eventsListened, eventsToEmit).map(function (evt) {
  return "on" + evt;
});
var draggingElement = null;
var vuedraggable_props = {
  options: Object,
  list: {
    type: Array,
    required: false,
    default: null
  },
  value: {
    type: Array,
    required: false,
    default: null
  },
  noTransitionOnDrag: {
    type: Boolean,
    default: false
  },
  clone: {
    type: Function,
    default: function _default(original) {
      return original;
    }
  },
  element: {
    type: String,
    default: "div"
  },
  tag: {
    type: String,
    default: null
  },
  move: {
    type: Function,
    default: null
  },
  componentData: {
    type: Object,
    required: false,
    default: null
  }
};
var draggableComponent = {
  name: "draggable",
  inheritAttrs: false,
  props: vuedraggable_props,
  data: function data() {
    return {
      transitionMode: false,
      noneFunctionalComponentMode: false,
      init: false
    };
  },
  render: function render(h) {
    var slots = this.$slots.default;
    this.transitionMode = vuedraggable_isTransition(slots);

    var _computeChildrenAndOf = computeChildrenAndOffsets(slots, this.$slots),
        children = _computeChildrenAndOf.children,
        headerOffset = _computeChildrenAndOf.headerOffset,
        footerOffset = _computeChildrenAndOf.footerOffset;

    this.headerOffset = headerOffset;
    this.footerOffset = footerOffset;
    var attributes = getComponentAttributes(this.$attrs, this.componentData);
    return h(this.getTag(), attributes, children);
  },
  created: function created() {
    if (this.list !== null && this.value !== null) {
      helper["b" /* console */].error("Value and list props are mutually exclusive! Please set one or another.");
    }

    if (this.element !== "div") {
      helper["b" /* console */].warn("Element props is deprecated please use tag props instead. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#element-props");
    }

    if (this.options !== undefined) {
      helper["b" /* console */].warn("Options props is deprecated, add sortable options directly as vue.draggable item, or use v-bind. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#options-props");
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.noneFunctionalComponentMode = this.getTag().toLowerCase() !== this.$el.nodeName.toLowerCase();

    if (this.noneFunctionalComponentMode && this.transitionMode) {
      throw new Error("Transition-group inside component is not supported. Please alter tag value or remove transition-group. Current tag value: ".concat(this.getTag()));
    }

    var optionsAdded = {};
    eventsListened.forEach(function (elt) {
      optionsAdded["on" + elt] = delegateAndEmit.call(_this3, elt);
    });
    eventsToEmit.forEach(function (elt) {
      optionsAdded["on" + elt] = emit.bind(_this3, elt);
    });

    var attributes = keys_default()(this.$attrs).reduce(function (res, key) {
      res[Object(helper["a" /* camelize */])(key)] = _this3.$attrs[key];
      return res;
    }, {});

    var options = assign_default()({}, this.options, attributes, optionsAdded, {
      onMove: function onMove(evt, originalEvent) {
        return _this3.onDragMove(evt, originalEvent);
      }
    });

    !("draggable" in options) && (options.draggable = ">*");
    this._sortable = new external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default.a(this.rootContainer, options);
    this.computeIndexes();
  },
  beforeDestroy: function beforeDestroy() {
    if (this._sortable !== undefined) this._sortable.destroy();
  },
  computed: {
    rootContainer: function rootContainer() {
      return this.transitionMode ? this.$el.children[0] : this.$el;
    },
    realList: function realList() {
      return this.list ? this.list : this.value;
    }
  },
  watch: {
    options: {
      handler: function handler(newOptionValue) {
        this.updateOptions(newOptionValue);
      },
      deep: true
    },
    $attrs: {
      handler: function handler(newOptionValue) {
        this.updateOptions(newOptionValue);
      },
      deep: true
    },
    realList: function realList() {
      this.computeIndexes();
    }
  },
  methods: {
    getTag: function getTag() {
      return this.tag || this.element;
    },
    updateOptions: function updateOptions(newOptionValue) {
      for (var property in newOptionValue) {
        var value = Object(helper["a" /* camelize */])(property);

        if (readonlyProperties.indexOf(value) === -1) {
          this._sortable.option(value, newOptionValue[property]);
        }
      }
    },
    getChildrenNodes: function getChildrenNodes() {
      if (!this.init) {
        this.noneFunctionalComponentMode = this.noneFunctionalComponentMode && this.$children.length === 1;
        this.init = true;
      }

      if (this.noneFunctionalComponentMode) {
        return this.$children[0].$slots.default;
      }

      var rawNodes = this.$slots.default;
      return this.transitionMode ? rawNodes[0].child.$slots.default : rawNodes;
    },
    computeIndexes: function computeIndexes() {
      var _this4 = this;

      this.$nextTick(function () {
        _this4.visibleIndexes = _computeIndexes(_this4.getChildrenNodes(), _this4.rootContainer.children, _this4.transitionMode, _this4.footerOffset);
      });
    },
    getUnderlyingVm: function getUnderlyingVm(htmlElt) {
      var index = computeVmIndex(this.getChildrenNodes() || [], htmlElt);

      if (index === -1) {
        //Edge case during move callback: related element might be
        //an element different from collection
        return null;
      }

      var element = this.realList[index];
      return {
        index: index,
        element: element
      };
    },
    getUnderlyingPotencialDraggableComponent: function getUnderlyingPotencialDraggableComponent(_ref2) {
      var __vue__ = _ref2.__vue__;

      if (!__vue__ || !__vue__.$options || __vue__.$options._componentTag !== "transition-group") {
        return __vue__;
      }

      return __vue__.$parent;
    },
    emitChanges: function emitChanges(evt) {
      var _this5 = this;

      this.$nextTick(function () {
        _this5.$emit("change", evt);
      });
    },
    alterList: function alterList(onList) {
      if (this.list) {
        onList(this.list);
        return;
      }

      var newList = _toConsumableArray(this.value);

      onList(newList);
      this.$emit("input", newList);
    },
    spliceList: function spliceList() {
      var _arguments = arguments;

      var spliceList = function spliceList(list) {
        return list.splice.apply(list, _toConsumableArray(_arguments));
      };

      this.alterList(spliceList);
    },
    updatePosition: function updatePosition(oldIndex, newIndex) {
      var updatePosition = function updatePosition(list) {
        return list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
      };

      this.alterList(updatePosition);
    },
    getRelatedContextFromMoveEvent: function getRelatedContextFromMoveEvent(_ref3) {
      var to = _ref3.to,
          related = _ref3.related;
      var component = this.getUnderlyingPotencialDraggableComponent(to);

      if (!component) {
        return {
          component: component
        };
      }

      var list = component.realList;
      var context = {
        list: list,
        component: component
      };

      if (to !== related && list && component.getUnderlyingVm) {
        var destination = component.getUnderlyingVm(related);

        if (destination) {
          return assign_default()(destination, context);
        }
      }

      return context;
    },
    getVmIndex: function getVmIndex(domIndex) {
      var indexes = this.visibleIndexes;
      var numberIndexes = indexes.length;
      return domIndex > numberIndexes - 1 ? numberIndexes : indexes[domIndex];
    },
    getComponent: function getComponent() {
      return this.$slots.default[0].componentInstance;
    },
    resetTransitionData: function resetTransitionData(index) {
      if (!this.noTransitionOnDrag || !this.transitionMode) {
        return;
      }

      var nodes = this.getChildrenNodes();
      nodes[index].data = null;
      var transitionContainer = this.getComponent();
      transitionContainer.children = [];
      transitionContainer.kept = undefined;
    },
    onDragStart: function onDragStart(evt) {
      this.context = this.getUnderlyingVm(evt.item);
      evt.item._underlying_vm_ = this.clone(this.context.element);
      draggingElement = evt.item;
    },
    onDragAdd: function onDragAdd(evt) {
      var element = evt.item._underlying_vm_;

      if (element === undefined) {
        return;
      }

      Object(helper["d" /* removeNode */])(evt.item);
      var newIndex = this.getVmIndex(evt.newIndex);
      this.spliceList(newIndex, 0, element);
      this.computeIndexes();
      var added = {
        element: element,
        newIndex: newIndex
      };
      this.emitChanges({
        added: added
      });
    },
    onDragRemove: function onDragRemove(evt) {
      Object(helper["c" /* insertNodeAt */])(this.rootContainer, evt.item, evt.oldIndex);

      if (evt.pullMode === "clone") {
        Object(helper["d" /* removeNode */])(evt.clone);
        return;
      }

      var oldIndex = this.context.index;
      this.spliceList(oldIndex, 1);
      var removed = {
        element: this.context.element,
        oldIndex: oldIndex
      };
      this.resetTransitionData(oldIndex);
      this.emitChanges({
        removed: removed
      });
    },
    onDragUpdate: function onDragUpdate(evt) {
      Object(helper["d" /* removeNode */])(evt.item);
      Object(helper["c" /* insertNodeAt */])(evt.from, evt.item, evt.oldIndex);
      var oldIndex = this.context.index;
      var newIndex = this.getVmIndex(evt.newIndex);
      this.updatePosition(oldIndex, newIndex);
      var moved = {
        element: this.context.element,
        oldIndex: oldIndex,
        newIndex: newIndex
      };
      this.emitChanges({
        moved: moved
      });
    },
    updateProperty: function updateProperty(evt, propertyName) {
      evt.hasOwnProperty(propertyName) && (evt[propertyName] += this.headerOffset);
    },
    computeFutureIndex: function computeFutureIndex(relatedContext, evt) {
      if (!relatedContext.element) {
        return 0;
      }

      var domChildren = _toConsumableArray(evt.to.children).filter(function (el) {
        return el.style["display"] !== "none";
      });

      var currentDOMIndex = domChildren.indexOf(evt.related);
      var currentIndex = relatedContext.component.getVmIndex(currentDOMIndex);
      var draggedInList = domChildren.indexOf(draggingElement) !== -1;
      return draggedInList || !evt.willInsertAfter ? currentIndex : currentIndex + 1;
    },
    onDragMove: function onDragMove(evt, originalEvent) {
      var onMove = this.move;

      if (!onMove || !this.realList) {
        return true;
      }

      var relatedContext = this.getRelatedContextFromMoveEvent(evt);
      var draggedContext = this.context;
      var futureIndex = this.computeFutureIndex(relatedContext, evt);

      assign_default()(draggedContext, {
        futureIndex: futureIndex
      });

      var sendEvt = assign_default()({}, evt, {
        relatedContext: relatedContext,
        draggedContext: draggedContext
      });

      return onMove(sendEvt, originalEvent);
    },
    onDragEnd: function onDragEnd() {
      this.computeIndexes();
      draggingElement = null;
    }
  }
};

if (typeof window !== "undefined" && "Vue" in window) {
  window.Vue.component("draggable", draggableComponent);
}

/* harmony default export */ var vuedraggable = (draggableComponent);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (vuedraggable);



/***/ })

/******/ })["default"];
//# sourceMappingURL=vuedraggable.common.js.map

/***/ }),

/***/ 1521:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(188);

var _stringify2 = _interopRequireDefault(_stringify);

var _vuedraggable = __webpack_require__(1414);

var _vuedraggable2 = _interopRequireDefault(_vuedraggable);

var _sortablejs = __webpack_require__(1396);

var _sortablejs2 = _interopRequireDefault(_sortablejs);

var _NewsList = __webpack_require__(1822);

var _NewsList2 = _interopRequireDefault(_NewsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      imgServer: basePath + '/sys/ueditor/file?action=uploadimage',
      token: { "Authorization": 'Bearer ' + JSON.parse(window.sessionStorage.getItem("userData")).token },
      imageUrl: '',

      orgCode: sessionStorage.getItem("orgCode"),
      //------------- 左侧分类 -------------//
      asideNavArray: [], //左侧分类列表
      asideTypeOption: [], //左侧 分类 > 新增/编辑 > select的option
      asideTypeOptionValue: null,
      asideTypeTempChoosed: null, //左侧 分类 > 新增 > select的option value完整对象

      asideChoosed: { //当前选中的左侧分类项
        atId: null,
        index: null
      },
      asideOperateType: null, //右键菜单操作类型 "new" 新增 "edit" 编辑
      asideDialogVisible: false, //左侧dialog显示

      rightMenuShow: false,
      rightMenuX: 0,
      rightMenuY: 0,

      //------------- 右侧主体 -------------//
      tempSwiperData: { //点击新增 编辑 后, 暂时的轮播数据
        type: 'swiper',
        swiperData: [//轮播数据(包含图片和文章地址,用于保存和编辑)
        ],
        title: null,
        interval: 3000 //轮播时间间隔
      },
      tempNewsData: { //点击新增 编辑 后, 暂时的新闻数据
        type: 'news',
        atName: null, //名称
        atId: null, //类型/专题对应的Id
        atType: "1" //类型种类
      },
      swiperHasImg: false,
      //页面主体 数据
      contentData: [],
      contentOperateType: null, //右侧主体操作类型 new 新增 edit 编辑
      tempContentIndex: null, //右侧主体的操作位置 用于添加
      tempSwiperIndex: null, //右侧主体的操作位置 > 操作的swiper的位置

      // 分类 或 主题的选项
      keyTpyeOptions: [{
        value: "1",
        label: '分类'
      }, {
        value: "2",
        label: '专题'
      }],

      // 分类名 (筛选条件)
      filterOptions: [],
      filterTypeTempChoosed: null, //当前过滤所选中的对象

      editDialogVisible: false, //主体 - 编辑dialog
      pictureDialogVisible: false, //主体 - 轮播dialog
      swiperDialogVisible: false,
      newsDialogVisible: false,

      loading: false,
      navLoading: false,
      newsLoading: false,
      clickChange: false //当点击了上层select, 此时需要刷新并重置下层, 将此值变为true
    };
  },

  components: {
    "news-list": _NewsList2.default,
    draggable: _vuedraggable2.default,
    Sortable: _sortablejs2.default
  },
  watch: {
    //监听左侧列表的diaolog, 关闭后取消选中
    asideDialogVisible: function asideDialogVisible(newV, oldV) {
      if (newV == false) {
        this.asideChoosed.atId = null;
        this.asideChoosed.index = null;
      }
    },

    tempSwiperData: {
      // 监听tempSwiperData, 如有某一条图片为空, 则无法提交
      handler: function handler(newV, oldV) {
        var self = this;
        self.swiperHasImg = true;
        self.tempSwiperData.swiperData.forEach(function (item, index) {
          if (!item.imgUrl) {
            //为空
            self.swiperHasImg = false;
          }
        });
      },
      deep: true
    },
    "tempNewsData.atType": {
      handler: function handler(newV, oldV) {
        this.getFilterOptions(newV);
        if (this.clickChange) {
          this.tempNewsData.atId = null;
        }
        this.clickChange = false; //结束点击切换, 此值变为false
      },
      deep: true
    }
  },
  created: function created() {},
  mounted: function mounted() {
    var self = this;
    document.addEventListener("click", function () {
      self.rightMenuShow = false;
    });
    //获取左侧列表 与 分类
    this.getAsideTypeList();
    this.getAsideTypeOption();
    this.getContentData();
  },

  methods: {
    /**
     * 获取主页数据
     * @return {[type]} [description]
     */
    getContentData: function getContentData() {
      this.loading = true;

      var self = this;
      self.$request.requestAxios('get', basePath + '/home/data/from_org/' + self.orgCode, null, function (response) {
        if (response.data.meta.code == 0) {
          self.contentData = response.data.data;
        } else {
          self.$message.error(response.data.meta.message);
        }
        self.loading = false;
      }, function (error) {
        self.loading = false;
        self.$message.error("失败");
      });
    },

    /**
     * 用户不点击确定, 点击了取消或者关闭了dialog, 则重新查询数据
     * @return {[type]} [description]
     */
    refreshData: function refreshData() {
      this.getContentData();
      this.newsDialogVisible = false;
      this.swiperDialogVisible = false;
    },

    /**
     * 右键菜单,禁用默认菜单,并显示自定义菜单
     * @param  {object} event 
     * @return none
     */
    rightClick: function rightClick(event, item, index) {
      event.preventDefault();

      this.rightMenuShow = true;
      this.rightMenuX = event.clientX + 10 + 'px';
      this.rightMenuY = event.clientY + 5 + 'px';
      this.asideChoosed.atId = item.atId;
      this.asideChoosed.index = index;
    },

    /**
     * 新增左侧类型导航, 控制dialog部分显示
     * @return {[type]} [description]
     */
    newAsideType: function newAsideType() {
      this.asideTypeOptionValue = null; //还原select选中
      this.rightMenuShow = false;
      this.asideOperateType = "new";
      this.asideDialogVisible = true;
    },

    /**
     * 编辑左侧类型导航, 控制dialog部分显示
     * @return {[type]} [description]
     */
    editAsideType: function editAsideType() {
      this.rightMenuShow = false;
      this.asideOperateType = "edit";
      this.asideDialogVisible = true;
      this.asideTypeOptionValue = this.asideChoosed.atId; //将当前选中的aside的id赋值到select中
    },

    /**
     * 点击类型列表,选中某一项, 记录此条完整对象,用于push进navArray
     * @param  {Number} value 当前选中的值atId
     * @return none
     */
    changeAsideOptionValue: function changeAsideOptionValue(value) {
      var obj = {};
      obj = this.asideTypeOption.find(function (item) {
        return item.atId === value;
      });
      this.asideTypeTempChoosed = obj;
    },

    /**
     * 提交左侧类型列表( 新增 / 编辑)
     * @return none
     */
    submitAsideType: function submitAsideType() {
      this.asideDialogVisible = false;
      if (this.asideOperateType == "new") {
        //新增分类, 末尾push
        this.asideNavArray.push(this.asideTypeTempChoosed);
        this.saveNavDataToServer();
      } else {
        //编辑分类, 删除本位置的item并重新插入新的item
        if (!this.asideTypeTempChoosed) {
          this.$message.success("成功");
        } else {
          this.asideNavArray.splice(this.asideChoosed.index, 1, this.asideTypeTempChoosed);
          this.saveNavDataToServer();
        }
      }
    },

    /**
     * 将修改的导航数组保存
     * @return {[type]} [description]
     */
    saveNavDataToServer: function saveNavDataToServer() {
      var _this = this;

      var self = this;

      self.$request.requestAxios('post', basePath + '/home/nav/from_org/' + self.orgCode, self.asideNavArray, function (response) {
        if (response.data.meta.code == 0) {
          self.$message.success("成功");
          _this.getAsideTypeList();
        } else {
          self.$message.error(response.data.meta.message);
        }
      }, function (error) {
        self.loading = false;
        _this.getAsideTypeList();
        self.$message.error("失败");
      });
    },

    /**
     * 删除左侧类型导航, 不需要传参, 当前操作的全局asideChoosed
     * @return none
     */
    deleteAsideType: function deleteAsideType() {
      var self = this;
      self.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        self.asideNavArray.splice(self.asideChoosed.index, 1);
        self.saveNavDataToServer();
        self.$message({
          type: 'success',
          message: '删除成功!'
        });
        self.getAsideTypeList();
      }).catch(function () {
        self.asideChoosed.atId = null;
        self.asideChoosed.index = null;
      });
    },

    /**
     * 在本类型下点击 写文章, 
     */
    addArticle: function addArticle(item) {
      sessionStorage.setItem("tempType", (0, _stringify2.default)(item));
      this.$router.push({ name: "Settings_Upload_Article" });
    },

    /**
     * 点击添加 主区域 内容
     * @param {String} typeName 类型名称 news 新闻 swiper 轮播
     * @param {Number} index    当前点击的顺序index
     * @return none
     */
    addContentButtonClicked: function addContentButtonClicked(typeName, index) {
      this.contentOperateType = "new";
      if (typeName == 'swiper') {
        this.swiperDialogVisible = true;
        //创建一个空的数据, 用于新增
        this.tempSwiperData = {
          type: 'swiper',
          swiperData: [],
          title: null,
          interval: 3000
        };
      } else {
        this.newsDialogVisible = true;
        //创建一个空的新闻对象, 使用前需要提前清空数据
        this.tempNewsData = {
          type: 'news',
          atType: "1",
          atId: null,
          atName: null
        };
        this.getFilterOptions("1"); // 新增时查询一次atType为1的 filterOptions
      }
      this.tempContentIndex = index;
    },


    /**
     * 编辑 主区域 内容
     * @param {String} typeName 类型名称 news 新闻 swiper 轮播
     * @param {Number} index    当前点击的顺序index
     * @return none
     */
    editContentButtonClicked: function editContentButtonClicked(item, index) {
      this.contentOperateType = "edit";
      //深拷贝, 避免影响原有数据
      if (item.type == 'swiper') {
        this.tempSwiperData = JSON.parse((0, _stringify2.default)(item));
        this.swiperDialogVisible = true;
      } else {
        this.tempNewsData = JSON.parse((0, _stringify2.default)(item));
        this.newsDialogVisible = true;
      }
      //记录操作的index
      this.tempContentIndex = index;
    },

    /**
     * 删除 主区域 内容
     * @param  {Number} index 删除内容索引值
     * @return none
     */
    deleteContentButtonClicked: function deleteContentButtonClicked(index) {
      var _this2 = this;

      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        _this2.contentData.splice(index, 1);
        _this2.saveContentDataToServer();
        _this2.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(function () {});
    },

    /**
     * 过滤select change事件
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    changeFilterOptionValue: function changeFilterOptionValue(value) {
      var obj = {};
      obj = this.filterOptions.find(function (item) {
        return item.atId === value;
      });
      this.filterTypeTempChoosed = obj;
    },

    /**
     * 点击确定保存新闻( 新增 / 编辑 ) 
     * @return {[type]} [description]
     */
    saveNews: function saveNews() {
      var _this3 = this;

      //判断是否重复
      var repeatedFlag = false; // 是否重复的标识
      this.contentData.forEach(function (item, index) {
        if (item.type == "news") {
          if (_this3.tempNewsData.atId == item.atId) {
            repeatedFlag = true;
          }
        }
      });
      //操作完contentData完成之后且没有重复内容, 将本次修改后的数据提交
      if (repeatedFlag) {
        this.$message.error("失败, 存在重复的分类/专题!");
      } else {
        if (this.contentOperateType == "new") {
          //无删除时index + 1
          this.contentData.splice(this.tempContentIndex + 1, 0, {
            type: 'news',
            atType: this.tempNewsData.atType,
            atId: this.tempNewsData.atId,
            atName: this.filterTypeTempChoosed.atName
          });
        } else {
          this.contentData.splice(this.tempContentIndex, 1, {
            type: 'news',
            atType: this.tempNewsData.atType,
            atId: this.filterTypeTempChoosed.atId,
            atName: this.filterTypeTempChoosed.atName
          });
        }
        this.saveContentDataToServer();
        this.newsDialogVisible = false;
      }
    },
    beforeAvatarUpload: function beforeAvatarUpload(file) {
      var isJPG = file.type === 'image/jpeg';
      var isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

    /**
     * 获取分类列表
     * @param  {String} typeStr 分类1 主题2
     * @return none
     */
    getAsideTypeList: function getAsideTypeList(typeStr) {
      var self = this;
      self.navLoading = true;

      self.$request.requestAxios('get', basePath + '/home/nav/from_org/' + self.orgCode, null, function (response) {
        if (response.data.meta.code == 0) {
          self.asideNavArray = response.data.data;
        } else {
          self.$message.error(response.data.meta.message);
        }
        self.navLoading = false;
      }, function (error) {
        self.loading = false;
        self.$message.error("失败");
      });
    },

    /**
     * 获取顶层分类(aside的select中使用)
     * @return {[type]} [description]
     */
    getAsideTypeOption: function getAsideTypeOption() {
      var self = this;

      self.$request.requestAxios('get', basePath + '/a_types/toparticletypes/from_org/' + self.orgCode, null, function (response) {
        if (response.data.meta.code == 0) {
          self.asideTypeOption = response.data.data;
        } else {
          self.$message.error(response.data.meta.message);
        }
      }, function (error) {
        self.loading = false;
        self.$message.error("失败");
      });
    },

    /**
     * 获取筛选条件的分类(content的select中使用)
     * @param  {String} typeValue 分类的type 1分类 2专题 默认分类
     * @return {[type]}           [description]
     */
    getFilterOptions: function getFilterOptions(typeValue) {
      var self = this;
      self.newsLoading = true;
      // 还原选中
      self.$request.requestAxios('get', basePath + '/a_types/articletypes/from_org/' + self.orgCode, { params: { type: typeValue } }, function (response) {
        if (response.data.meta.code == 0) {
          self.filterOptions = response.data.data;
        } else {
          self.$message.error(response.data.meta.message);
        }
        self.newsLoading = false;
      }, function (error) {
        self.loading = false;
        self.$message.error("失败");
      });
    },

    /**
     * 将修改的主体数组保存
     * @return {[type]} [description]
     */
    saveContentDataToServer: function saveContentDataToServer() {
      var self = this;
      self.$request.requestAxios('post', basePath + '/home/data/from_org/' + self.orgCode, {
        homeData: (0, _stringify2.default)(self.contentData)
      }, function (response) {
        self.$message.success("成功");
        self.refreshData();
      }, function (error) {
        self.loading = false;
        self.refreshData();
        self.$message.error("失败");
      });
    },

    /**
     * 添加轮播 > 点击添加一项
     */
    addSwiperItem: function addSwiperItem() {
      this.tempSwiperData.swiperData.unshift({
        link: null,
        imgUrl: null,
        title: null
      });
    },

    /**
     * 删除本条轮播小项目
     * @return {[type]} [description]
     */
    deleteSwiperItem: function deleteSwiperItem(item, index) {
      this.tempSwiperData.swiperData.splice(index, 1);
    },

    /**
     * 点击新增/编辑 轮播 点击对应的上传, 记录index
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */
    clickIndex: function clickIndex(index) {
      this.tempSwiperIndex = index;
    },
    clickIndexNew: function clickIndexNew(index) {
      this.tempSwiperIndex = index;
    },

    /**
     * 点击上移 或 下移(需要重新触发tempSwiperData的watch, 驱使页面刷新)
     * @param  {object} item     当前点击的对象
     * @param  {string} moveType 上移forward 或是 下移backword
     * @return {[type]}          [description]
     */
    changeIndex: function changeIndex(index, moveType) {
      if (moveType == "forward") {
        //点击上移
        var temp = this.tempSwiperData.swiperData[index - 1];
        this.tempSwiperData.swiperData[index - 1] = this.tempSwiperData.swiperData[index];
        this.tempSwiperData.swiperData[index] = temp;
      } else {
        //点击下移
        var _temp = this.tempSwiperData.swiperData[index + 1];
        this.tempSwiperData.swiperData[index + 1] = this.tempSwiperData.swiperData[index];
        this.tempSwiperData.swiperData[index] = _temp;
      }
      var swiper = JSON.parse((0, _stringify2.default)(this.tempSwiperData));
      this.tempSwiperData = swiper;
    },

    /**
     * 上传成功, 写入img对应的path
     * @param  {[type]} response [description]
     * @param  {[type]} file     [description]
     * @param  {[type]} fileList [description]
     * @return {[type]}          [description]
     */
    uploadSuccess: function uploadSuccess(response, file, fileList) {
      //上传完成后把信息写入对应tempSwiperData.swiperData的path
      this.tempSwiperData.swiperData[this.tempSwiperIndex].imgUrl = response.data.path;
    },

    /**
     * 点击确定, 保存数据
     * @return {[type]} [description]
     */
    saveSwiper: function saveSwiper() {
      if (this.contentOperateType == "new") {
        //无删除时index + 1
        this.contentData.splice(this.tempContentIndex + 1, 0, this.tempSwiperData);
      } else if (this.contentOperateType == "edit") {
        this.contentData.splice(this.tempContentIndex, 1, this.tempSwiperData);
      }
      this.saveContentDataToServer();
      this.swiperDialogVisible = false;
    }
  }
}; //
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

/***/ }),

/***/ 1522:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
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
  data: function data() {
    return {
      dataList: [],
      orgCode: sessionStorage.getItem("orgCode")
    };
  },

  props: {
    atId: {
      type: Number,
      required: true,
      default: function _default() {
        return null;
      }
    }
  },
  watch: {
    atId: function atId() {
      this.getNewsData();
    }
  },
  mounted: function mounted() {
    this.getNewsData();
  },

  methods: {
    getNewsData: function getNewsData() {
      var self = this;
      this.axios({
        url: basePath + "/a_info/article/list/from_org/" + self.orgCode,
        method: 'get',
        params: {
          type: this.atId,
          pageSize: 7,
          pageNum: 1
        }
      }).then(function (response) {
        self.dataList = response.data.data.rows;
      }).catch(function (error) {
        self.$message({
          message: "请求失败!",
          type: 'warning'
        });
      });
    }
  }
};

/***/ }),

/***/ 1818:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1819);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("5ceaa462", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4b1e27ac\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Home.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4b1e27ac\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Home.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1819:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/*侧边栏*/\n.el-aside[data-v-4b1e27ac] {\n  padding: 10px;\n}\n/*侧边栏 >> 类型列表*/\n.type-list-wrap[data-v-4b1e27ac] {\n  background: #fff;\n  border: 1px solid #eee;\n}\n.type-list-wrap .type-list[data-v-4b1e27ac]{\n  list-style: none;\n  padding: 0;\n  margin: 10px;\n}\n.type-list-wrap .type-list .list-item[data-v-4b1e27ac] {\n  padding: 8px 16px;\n}\n.type-list-wrap .type-list .list-item[data-v-4b1e27ac]:hover {\n  background: #e4e4e4;\n  cursor: pointer;\n}\n.type-list-wrap .type-list .list-item.active[data-v-4b1e27ac] {\n  color: #dc3a3a;\n  border-left: 3px solid #dc3a3a;\n}\n.qr-code-wrap[data-v-4b1e27ac] {\n  margin: 20px 0;\n}\n.qr-code-wrap img[data-v-4b1e27ac] {\n  width: 100%;\n  border: 1px solid #d8d8d8;\n}\n.qr-code-wrap p[data-v-4b1e27ac] {\n  margin: 0;\n  text-align: center;\n}\n/*侧边栏 >> 右键菜单*/\n#aside-right-menu[data-v-4b1e27ac] {\n  position: absolute;\n  z-index: 99;\n}\n#aside-right-menu ul[data-v-4b1e27ac]{\n  margin: 0;\n  padding: 5px;\n  list-style: none;\n  font-size: 14px;\n  background: #fff;\n  outline: 1px solid #ececec;\n}\n#aside-right-menu ul li[data-v-4b1e27ac] {\n  padding: 5px 10px;\n  cursor: pointer;\n}\n#aside-right-menu ul li[data-v-4b1e27ac]:hover {\n  background: #e4e4e4;\n}\n/*主体 >> 模块*/\n.el-main[data-v-4b1e27ac] {\n  max-height: calc(100vh - 115px);\n  padding: 10px;\n  overflow-y: auto;\n}\n.block-wrap[data-v-4b1e27ac] {\n  padding: 10px;\n}\n.block-wrap.swiper-wrap[data-v-4b1e27ac] {\n  padding: 0; \n  height: 373px; /*统一两种类型的高度*/\n}\n.block-wrap.news-wrap[data-v-4b1e27ac] {\n  padding-top: 32px;\n  height: 373px; /*统一两种类型的高度*/\n}\n.grid-content[data-v-4b1e27ac] {\n  position: relative;\n}\n.main-block-wrap[data-v-4b1e27ac] {\n  height: 328px;\n  border: 1px solid #d8d8d8;\n  border-top: 2px solid #dc3a3a;\n  background: #fff;\n}\n.main-block-wrap .btn-group[data-v-4b1e27ac] {\n  display: block;\n  height: 28px;\n  padding: 5px;\n  font-size: 14px;\n  text-align: right;\n}\n.btn-group button[data-v-4b1e27ac] {\n  margin: 0;\n  padding: 7px;\n}\n.block-wrap .swiper-title[data-v-4b1e27ac] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  padding: 0 30px 20px;\n  margin: 0;\n  width: 100%;\n  background: rgba(0, 0, 0, 0.8);\n  color: #fff;\n  line-height: 40px;\n  z-index: 99;\n  box-sizing: border-box;\n  overflow-x: hidden;\n}\n.block-wrap .btn-group.swiper-btn-group[data-v-4b1e27ac] {\n  position: relative;\n  z-index: 99;\n  text-align: right;\n  padding: 5px;\n}\n.main-block-wrap .main-block-title[data-v-4b1e27ac]{\n  position: absolute;\n  top: -31px;\n  left: 0;\n  padding: 5px 10px;\n  background: #dc3a3a;\n  color: #fff;\n}\n.el-carousel__item[data-v-4b1e27ac] {\n  background-color: #99a9bf;\n}\n.add-swiper-item[data-v-4b1e27ac] {\n  margin-bottom: 10px;\n}\n.divide-line[data-v-4b1e27ac] {\n  border-top: 1px solid #c7c7c7;\n  border-bottom: 1px solid #c7c7c7;\n  height: 0px;\n  padding-top: 2px;\n  margin: 20px 0;\n}\n.tips-text[data-v-4b1e27ac] {\n  display: block;\n  font-size: 14px;\n  color: #909090;\n  margin-bottom: 10px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1820:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1821);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("4ff02e24", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4b1e27ac\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=1!./Home.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4b1e27ac\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=1!./Home.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1821:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* 主体 > 新增/编辑 轮播 */\n.avatar-uploader .el-upload {\n  width: 100%;\n  border: 1px dashed #d9d9d9;\n  border-radius: 6px;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n}\n.avatar-uploader .el-upload:hover {\n  border-color: #409EFF;\n}\n.avatar-uploader-icon {\n  font-size: 28px;\n  color: #8c939d;\n  width: 178px;\n  height: 178px;\n  line-height: 178px;\n  text-align: center;\n}\n.avatar {\n  width: 100%;\n  height: 250px;\n  display: block;\n}\n", ""]);

// exports


/***/ }),

/***/ 1822:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_NewsList_vue__ = __webpack_require__(1522);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_NewsList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_NewsList_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_NewsList_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_NewsList_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_8d697a54_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_NewsList_vue__ = __webpack_require__(1825);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1823)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-8d697a54"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_NewsList_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_8d697a54_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_NewsList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/common/NewsList.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8d697a54", Component.options)
  } else {
    hotAPI.reload("data-v-8d697a54", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1823:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1824);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("e65e7c26", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8d697a54\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./NewsList.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8d697a54\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./NewsList.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1824:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.main-block-list[data-v-8d697a54]{\n  margin: 0;\n  padding: 10px;\n  list-style: none;\n  max-height: 272px;\n  overflow: auto;\n}\n.main-block-list .list-item[data-v-8d697a54] {\n  margin: 10px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.main-block-list .list-item[data-v-8d697a54]:before {\n  content: ' ';\n  vertical-align: middle;\n  display: inline-block;\n  border-left: 8px solid #555555;\n  border-top: 5px solid transparent;\n  border-bottom: 5px solid transparent;\n  border-right: 5px solid transparent;\n}\n", ""]);

// exports


/***/ }),

/***/ 1825:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "ul",
    { staticClass: "main-block-list" },
    _vm._l(_vm.dataList, function(newsItem) {
      return _c("li", { staticClass: "list-item" }, [
        _vm._v(_vm._s(newsItem.articleName))
      ])
    }),
    0
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-8d697a54", esExports)
  }
}

/***/ }),

/***/ 1826:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "el-container",
        [
          _c("el-aside", { attrs: { width: "200px" } }, [
            _c("div", { staticClass: "type-list-wrap" }, [
              _c(
                "ul",
                {
                  directives: [
                    {
                      name: "loading",
                      rawName: "v-loading",
                      value: _vm.navLoading,
                      expression: "navLoading"
                    }
                  ],
                  staticClass: "type-list"
                },
                [
                  _vm.asideNavArray.length
                    ? _c(
                        "draggable",
                        {
                          attrs: { options: { animation: 100 } },
                          on: { end: _vm.saveNavDataToServer },
                          model: {
                            value: _vm.asideNavArray,
                            callback: function($$v) {
                              _vm.asideNavArray = $$v
                            },
                            expression: "asideNavArray"
                          }
                        },
                        _vm._l(_vm.asideNavArray, function(item, index) {
                          return _c(
                            "li",
                            {
                              key: "nav" + index,
                              staticClass: "list-item",
                              on: {
                                contextmenu: function($event) {
                                  $event.stopPropagation()
                                  return _vm.rightClick($event, item, index)
                                }
                              }
                            },
                            [_vm._v(_vm._s(item.atName))]
                          )
                        }),
                        0
                      )
                    : _c(
                        "el-button",
                        {
                          staticClass: "fill-width",
                          attrs: { type: "primary", size: "mini" },
                          on: { click: _vm.newAsideType }
                        },
                        [_vm._v("添加+")]
                      )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.rightMenuShow,
                      expression: "rightMenuShow"
                    }
                  ],
                  style: { left: _vm.rightMenuX, top: _vm.rightMenuY },
                  attrs: { id: "aside-right-menu" }
                },
                [
                  _c("ul", [
                    _c("li", { on: { click: _vm.newAsideType } }, [
                      _vm._v("新增")
                    ]),
                    _vm._v(" "),
                    _c("li", { on: { click: _vm.editAsideType } }, [
                      _vm._v("编辑")
                    ]),
                    _vm._v(" "),
                    _c(
                      "li",
                      {
                        attrs: { type: "danger" },
                        on: { click: _vm.deleteAsideType }
                      },
                      [_vm._v("删除")]
                    )
                  ])
                ]
              )
            ])
          ]),
          _vm._v(" "),
          _c(
            "el-main",
            {
              directives: [
                {
                  name: "loading",
                  rawName: "v-loading",
                  value: _vm.loading,
                  expression: "loading"
                }
              ]
            },
            [
              _vm.contentData && _vm.contentData.length > 0
                ? _c(
                    "el-row",
                    { attrs: { gutter: 20 } },
                    _vm._l(_vm.contentData, function(item, index) {
                      return item.type == "swiper"
                        ? _c(
                            "el-col",
                            {
                              key: index,
                              staticClass: "block-wrap swiper-wrap",
                              attrs: { span: 16 }
                            },
                            [
                              _c("div", { staticClass: "grid-content" }, [
                                _c(
                                  "div",
                                  {
                                    staticClass: "fix-padding",
                                    attrs: { xxx: index }
                                  },
                                  [
                                    _c(
                                      "el-carousel",
                                      { attrs: { height: "363px" } },
                                      [
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "btn-group swiper-btn-group"
                                          },
                                          [
                                            _c(
                                              "el-button",
                                              {
                                                attrs: { size: "mini" },
                                                on: {
                                                  click: function($event) {
                                                    return _vm.addContentButtonClicked(
                                                      "swiper",
                                                      index
                                                    )
                                                  }
                                                }
                                              },
                                              [_vm._v("添加轮播")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "el-button",
                                              {
                                                attrs: { size: "mini" },
                                                on: {
                                                  click: function($event) {
                                                    return _vm.addContentButtonClicked(
                                                      "news",
                                                      index
                                                    )
                                                  }
                                                }
                                              },
                                              [_vm._v("添加分类")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "el-button",
                                              {
                                                attrs: {
                                                  size: "mini",
                                                  type: "primary"
                                                },
                                                on: {
                                                  click: function($event) {
                                                    return _vm.editContentButtonClicked(
                                                      item,
                                                      index
                                                    )
                                                  }
                                                }
                                              },
                                              [_vm._v("编辑")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "el-button",
                                              {
                                                attrs: {
                                                  size: "mini",
                                                  type: "danger"
                                                },
                                                on: {
                                                  click: function($event) {
                                                    return _vm.deleteContentButtonClicked(
                                                      index
                                                    )
                                                  }
                                                }
                                              },
                                              [_vm._v("删除")]
                                            )
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _vm._l(item.swiperData, function(
                                          swiperItem,
                                          swiperIndex
                                        ) {
                                          return _c(
                                            "el-carousel-item",
                                            { key: swiperIndex },
                                            [
                                              _c(
                                                "p",
                                                { staticClass: "swiper-title" },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      swiperItem.title ||
                                                        "暂无标题"
                                                    )
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c("img", {
                                                staticStyle: { width: "100%" },
                                                attrs: {
                                                  src: swiperItem.imgUrl,
                                                  alt: swiperIndex
                                                },
                                                on: {
                                                  click: function($event) {
                                                    _vm.pictureDialogVisible = true
                                                  }
                                                }
                                              })
                                            ]
                                          )
                                        })
                                      ],
                                      2
                                    )
                                  ],
                                  1
                                )
                              ])
                            ]
                          )
                        : _c(
                            "el-col",
                            {
                              key: index,
                              staticClass: "block-wrap news-wrap",
                              attrs: { span: 8 }
                            },
                            [
                              _c("div", { staticClass: "grid-content" }, [
                                _c(
                                  "div",
                                  { staticClass: "main-block-wrap" },
                                  [
                                    _c(
                                      "span",
                                      { staticClass: "main-block-title" },
                                      [_vm._v(_vm._s(item.atName))]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "btn-group" },
                                      [
                                        _c(
                                          "el-button",
                                          {
                                            attrs: { size: "mini" },
                                            on: {
                                              click: function($event) {
                                                return _vm.addArticle(item)
                                              }
                                            }
                                          },
                                          [_vm._v("写文章")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "el-button",
                                          {
                                            attrs: { size: "mini" },
                                            on: {
                                              click: function($event) {
                                                return _vm.addContentButtonClicked(
                                                  "swiper",
                                                  index
                                                )
                                              }
                                            }
                                          },
                                          [_vm._v("添加轮播")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "el-button",
                                          {
                                            attrs: { size: "mini" },
                                            on: {
                                              click: function($event) {
                                                return _vm.addContentButtonClicked(
                                                  "news",
                                                  index
                                                )
                                              }
                                            }
                                          },
                                          [_vm._v("添加分类")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "el-button",
                                          {
                                            attrs: {
                                              size: "mini",
                                              type: "primary"
                                            },
                                            on: {
                                              click: function($event) {
                                                return _vm.editContentButtonClicked(
                                                  item,
                                                  index
                                                )
                                              }
                                            }
                                          },
                                          [_vm._v("编辑")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "el-button",
                                          {
                                            attrs: {
                                              size: "mini",
                                              type: "danger"
                                            },
                                            on: {
                                              click: function($event) {
                                                return _vm.deleteContentButtonClicked(
                                                  index
                                                )
                                              }
                                            }
                                          },
                                          [_vm._v("删除")]
                                        )
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    item.atId
                                      ? _c("news-list", {
                                          attrs: { atId: item.atId }
                                        })
                                      : _vm._e()
                                  ],
                                  1
                                )
                              ])
                            ]
                          )
                    }),
                    1
                  )
                : _c(
                    "div",
                    [
                      _c("p", [
                        _c("i", {
                          staticClass: "el-icon-warning warning-icon"
                        }),
                        _vm._v("当前主页没有内容, 请添加")
                      ]),
                      _vm._v(" "),
                      _c(
                        "el-button",
                        {
                          attrs: { size: "mini", type: "primary" },
                          on: {
                            click: function($event) {
                              return _vm.addContentButtonClicked("swiper", 0)
                            }
                          }
                        },
                        [_vm._v("添加轮播")]
                      ),
                      _vm._v(" "),
                      _c(
                        "el-button",
                        {
                          attrs: { size: "mini", type: "primary" },
                          on: {
                            click: function($event) {
                              return _vm.addContentButtonClicked("news", 0)
                            }
                          }
                        },
                        [_vm._v("添加分类")]
                      )
                    ],
                    1
                  )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: _vm.asideOperateType == "new" ? "新增" : "编辑",
            id: "aside-dialog",
            visible: _vm.asideDialogVisible,
            width: "30%",
            "close-on-click-modal": false
          },
          on: {
            "update:visible": function($event) {
              _vm.asideDialogVisible = $event
            }
          }
        },
        [
          _c(
            "el-form",
            {
              staticClass: "fill-width",
              attrs: { "label-width": "100px", size: "small" }
            },
            [
              _c(
                "el-form-item",
                {
                  attrs: {
                    label:
                      _vm.asideOperateType == "new" ? "添加：" : "修改为：",
                    required: ""
                  }
                },
                [
                  _c(
                    "el-select",
                    {
                      staticClass: "fill-width",
                      on: {
                        change: function($event) {
                          return _vm.changeAsideOptionValue($event)
                        }
                      },
                      model: {
                        value: _vm.asideTypeOptionValue,
                        callback: function($$v) {
                          _vm.asideTypeOptionValue = $$v
                        },
                        expression: "asideTypeOptionValue"
                      }
                    },
                    _vm._l(_vm.asideTypeOption, function(item) {
                      return _c("el-option", {
                        key: item.atId,
                        attrs: { label: item.atName, value: item.atId }
                      })
                    }),
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "span",
            {
              staticClass: "dialog-footer",
              attrs: { slot: "footer" },
              slot: "footer"
            },
            [
              _c(
                "el-button",
                {
                  attrs: {
                    type: "primary",
                    disabled: _vm.asideTypeOptionValue == null
                  },
                  on: { click: _vm.submitAsideType }
                },
                [_vm._v("确 定")]
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: _vm.contentOperateType == "new" ? "新增轮播" : "编辑轮播",
            id: "swiper-dialog",
            visible: _vm.swiperDialogVisible,
            width: "40%",
            "close-on-click-modal": false
          },
          on: {
            "update:visible": function($event) {
              _vm.swiperDialogVisible = $event
            }
          }
        },
        [
          _c(
            "el-form",
            {
              staticClass: "fill-width",
              attrs: { "label-width": "80px", size: "small" }
            },
            [
              _c(
                "el-button",
                {
                  staticClass: "fill-width add-swiper-item",
                  attrs: { type: "primary", size: "mini" },
                  on: { click: _vm.addSwiperItem }
                },
                [_vm._v("添加一项")]
              ),
              _vm._v(" "),
              _vm._l(_vm.tempSwiperData.swiperData, function(item, index) {
                return _c(
                  "div",
                  [
                    _c(
                      "el-form-item",
                      { attrs: { label: "文章:" } },
                      [
                        _c("el-input", {
                          attrs: { placeholder: "请输入文章地址" },
                          model: {
                            value: item.link,
                            callback: function($$v) {
                              _vm.$set(item, "link", $$v)
                            },
                            expression: "item.link"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "el-form-item",
                      { attrs: { label: "标题:" } },
                      [
                        _c("el-input", {
                          attrs: { placeholder: "请输入文章标题" },
                          model: {
                            value: item.title,
                            callback: function($$v) {
                              _vm.$set(item, "title", $$v)
                            },
                            expression: "item.title"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "el-form-item",
                      { attrs: { label: "图片:", required: "" } },
                      [
                        _c(
                          "el-upload",
                          {
                            staticClass: "avatar-uploader",
                            attrs: {
                              action: _vm.imgServer,
                              headers: _vm.token,
                              "show-file-list": false,
                              "on-success": _vm.uploadSuccess,
                              name: "upfile"
                            }
                          },
                          [
                            item.imgUrl
                              ? _c("img", {
                                  staticClass: "avatar",
                                  attrs: { src: item.imgUrl },
                                  on: {
                                    click: function($event) {
                                      return _vm.clickIndex(index)
                                    }
                                  }
                                })
                              : _c("i", {
                                  staticClass:
                                    "el-icon-plus avatar-uploader-icon",
                                  on: {
                                    click: function($event) {
                                      return _vm.clickIndexNew(index)
                                    }
                                  }
                                })
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "el-form-item",
                      [
                        _c(
                          "el-button",
                          {
                            attrs: {
                              type: "default",
                              disabled: index == 0,
                              size: "mini"
                            },
                            on: {
                              click: function($event) {
                                return _vm.changeIndex(index, "forward")
                              }
                            }
                          },
                          [_vm._v("上移一项")]
                        ),
                        _vm._v(" "),
                        _c(
                          "el-button",
                          {
                            attrs: {
                              type: "default",
                              disabled:
                                index ==
                                _vm.tempSwiperData.swiperData.length - 1,
                              size: "mini"
                            },
                            on: {
                              click: function($event) {
                                return _vm.changeIndex(index, "backword")
                              }
                            }
                          },
                          [_vm._v("下移一项")]
                        ),
                        _vm._v(" "),
                        _c(
                          "el-button",
                          {
                            attrs: { type: "danger", size: "mini" },
                            on: {
                              click: function($event) {
                                return _vm.deleteSwiperItem(item, index)
                              }
                            }
                          },
                          [_vm._v("删除")]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "divide-line" })
                  ],
                  1
                )
              })
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "span",
            {
              staticClass: "dialog-footer",
              attrs: { slot: "footer" },
              slot: "footer"
            },
            [
              _c(
                "el-button",
                {
                  attrs: {
                    type: "primary",
                    disabled:
                      _vm.tempSwiperData.swiperData.length <= 0 ||
                      !_vm.swiperHasImg
                  },
                  on: { click: _vm.saveSwiper }
                },
                [_vm._v("确 定")]
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: _vm.contentOperateType == "new" ? "新增" : "编辑",
            id: "news-dialog",
            visible: _vm.newsDialogVisible,
            width: "30%",
            "close-on-click-modal": false
          },
          on: {
            "update:visible": function($event) {
              _vm.newsDialogVisible = $event
            }
          }
        },
        [
          _c("small", { staticClass: "tips-text" }, [
            _vm._v("先选择(分类/专题), 再选择下方筛选条件")
          ]),
          _vm._v(" "),
          _c(
            "el-form",
            {
              directives: [
                {
                  name: "loading",
                  rawName: "v-loading",
                  value: _vm.newsLoading,
                  expression: "newsLoading"
                }
              ],
              staticClass: "fill-width",
              attrs: { "label-width": "100px", size: "small" }
            },
            [
              _c(
                "el-form-item",
                { attrs: { label: "分类/专题：", required: "" } },
                [
                  _c(
                    "el-select",
                    {
                      staticClass: "fill-width",
                      on: {
                        change: function($event) {
                          _vm.clickChange = true
                        }
                      },
                      model: {
                        value: _vm.tempNewsData.atType,
                        callback: function($$v) {
                          _vm.$set(_vm.tempNewsData, "atType", $$v)
                        },
                        expression: "tempNewsData.atType"
                      }
                    },
                    _vm._l(_vm.keyTpyeOptions, function(item) {
                      return _c("el-option", {
                        key: item.value,
                        attrs: { label: item.label, value: item.value }
                      })
                    }),
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "筛选条件：", required: "" } },
                [
                  _c(
                    "el-select",
                    {
                      staticClass: "fill-width",
                      on: {
                        change: function($event) {
                          return _vm.changeFilterOptionValue($event)
                        }
                      },
                      model: {
                        value: _vm.tempNewsData.atId,
                        callback: function($$v) {
                          _vm.$set(_vm.tempNewsData, "atId", $$v)
                        },
                        expression: "tempNewsData.atId"
                      }
                    },
                    _vm._l(_vm.filterOptions, function(item) {
                      return _c("el-option", {
                        key: item.atId,
                        attrs: { label: item.atName, value: item.atId }
                      })
                    }),
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "span",
            {
              staticClass: "dialog-footer",
              attrs: { slot: "footer" },
              slot: "footer"
            },
            [
              _c(
                "el-button",
                {
                  attrs: {
                    type: "primary",
                    disabled: _vm.tempNewsData.atId == null
                  },
                  on: { click: _vm.saveNews }
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-4b1e27ac", esExports)
  }
}

/***/ })

});