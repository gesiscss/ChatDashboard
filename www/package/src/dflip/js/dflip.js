/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 101:
/***/ (function() {

function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
//region TWEEN.js required for animation
/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 */ (function TweenJs() {
    var TWEEN = TWEEN || function() {
        var _tweens = [];
        return {
            getAll: function getAll() {
                return _tweens;
            },
            removeAll: function removeAll() {
                _tweens = [];
            },
            add: function add(tween) {
                _tweens.push(tween);
            },
            remove: function remove(tween) {
                var i = _tweens.indexOf(tween);
                if (i !== -1) {
                    _tweens.splice(i, 1);
                }
            },
            update: function update(time) {
                if (_tweens.length === 0) {
                    return false;
                }
                var i = 0;
                //noinspection JSUnresolvedVariable
                time = time != null ? time : window.performance.now();
                while(i < _tweens.length){
                    if (_tweens[i].update(time)) {
                        i++;
                    } else {
                        _tweens.splice(i, 1);
                    }
                }
                return true;
            }
        };
    }();
    TWEEN.Tween = function(object) {
        var _object = object;
        var _valuesStart = {};
        var _valuesEnd = {};
        var _valuesStartRepeat = {};
        var _duration = 1000;
        var _repeat = 0;
        var _yoyo = false;
        var _isPlaying = false;
        var _reversed = false;
        var _delayTime = 0;
        var _startTime = null;
        var _easingFunction = TWEEN.Easing.Linear.None;
        var _interpolationFunction = TWEEN.Interpolation.Linear;
        var _chainedTweens = [];
        var _onStartCallback = null;
        var _onStartCallbackFired = false;
        var _onUpdateCallback = null;
        var _onCompleteCallback = null;
        var _onStopCallback = null;
        // Set all starting values present on the target object
        for(var field in object){
            //noinspection JSUnfilteredForInLoop
            _valuesStart[field] = parseFloat(object[field], 10);
        }
        this.to = function(properties, duration) {
            if (duration != null) {
                _duration = duration;
            }
            _valuesEnd = properties;
            return this;
        };
        this.start = function(time) {
            TWEEN.add(this);
            _isPlaying = true;
            _onStartCallbackFired = false;
            _startTime = time != null ? time : window.performance.now();
            _startTime += _delayTime;
            for(var property in _valuesEnd){
                // Check if an Array was provided as property value
                if (_instanceof(_valuesEnd[property], Array)) {
                    if (_valuesEnd[property].length === 0) {
                        continue;
                    }
                    // Create a local copy of the Array with the start value at the front
                    _valuesEnd[property] = [
                        _object[property]
                    ].concat(_valuesEnd[property]);
                }
                // If `to()` specifies a property that doesn't exist in the source object,
                // we should not set that property in the object
                if (_valuesStart[property] == null) {
                    continue;
                }
                _valuesStart[property] = _object[property];
                if (_instanceof(_valuesStart[property], Array) === false) {
                    _valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
                }
                _valuesStartRepeat[property] = _valuesStart[property] || 0;
            }
            return this;
        };
        this.stop = function() {
            if (!_isPlaying) {
                return this;
            }
            TWEEN.remove(this);
            _isPlaying = false;
            if (_onStopCallback != null) {
                _onStopCallback.call(_object);
            }
            this.stopChainedTweens();
            return this;
        };
        this.stopChainedTweens = function() {
            for(var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++){
                _chainedTweens[i].stop();
            }
        };
        this.complete = function() {
            if (!_isPlaying) {
                return this;
            }
            TWEEN.remove(this);
            _isPlaying = false;
            if (_onCompleteCallback != null) {
                _onCompleteCallback.call(_object);
            }
            this.completeChainedTweens();
            return this;
        };
        this.completeChainedTweens = function() {
            for(var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++){
                _chainedTweens[i].complete();
            }
        };
        this.delay = function(amount) {
            _delayTime = amount;
            return this;
        };
        this.repeat = function(times) {
            _repeat = times;
            return this;
        };
        //noinspection JSUnusedGlobalSymbols
        this.yoyo = function(yoyo) {
            _yoyo = yoyo;
            return this;
        };
        this.easing = function(easing) {
            _easingFunction = easing == null ? _easingFunction : easing;
            return this;
        };
        this.interpolation = function(interpolation) {
            _interpolationFunction = interpolation;
            return this;
        };
        //noinspection JSUnusedGlobalSymbols
        this.chain = function() {
            _chainedTweens = arguments;
            return this;
        };
        this.onStart = function(callback) {
            _onStartCallback = callback;
            return this;
        };
        this.onUpdate = function(callback) {
            _onUpdateCallback = callback;
            return this;
        };
        this.onComplete = function(callback) {
            _onCompleteCallback = callback;
            return this;
        };
        //noinspection JSUnusedGlobalSymbols
        this.onStop = function(callback) {
            _onStopCallback = callback;
            return this;
        };
        this.update = function(time) {
            var property;
            var elapsed;
            var value;
            if (time < _startTime) {
                return true;
            }
            if (_onStartCallbackFired === false) {
                if (_onStartCallback != null) {
                    _onStartCallback.call(_object);
                }
                _onStartCallbackFired = true;
            }
            elapsed = (time - _startTime) / _duration;
            elapsed = elapsed > 1 ? 1 : elapsed;
            value = _easingFunction(elapsed);
            for(property in _valuesEnd){
                // Don't update properties that do not exist in the source object
                if (_valuesStart[property] == null) {
                    continue;
                }
                var start = _valuesStart[property] || 0;
                var end = _valuesEnd[property];
                if (_instanceof(end, Array)) {
                    _object[property] = _interpolationFunction(end, value);
                } else {
                    // Parses relative end values with start as base (e.g.: +10, -3)
                    if (typeof end === 'string') {
                        if (end.startsWith('+') || end.startsWith('-')) {
                            end = start + parseFloat(end, 10);
                        } else {
                            end = parseFloat(end, 10);
                        }
                    }
                    // Protect against non-numeric properties.
                    if (typeof end === 'number') {
                        _object[property] = start + (end - start) * value;
                    }
                }
            }
            if (_onUpdateCallback != null) {
                _onUpdateCallback.call(_object, value);
            }
            if (elapsed === 1) {
                if (_repeat > 0) {
                    if (isFinite(_repeat)) {
                        _repeat--;
                    }
                    // Reassign starting values, restart by making startTime = now
                    for(property in _valuesStartRepeat){
                        if (typeof _valuesEnd[property] === 'string') {
                            _valuesStartRepeat[property] = _valuesStartRepeat[property] + parseFloat(_valuesEnd[property], 10);
                        }
                        if (_yoyo) {
                            var tmp = _valuesStartRepeat[property];
                            _valuesStartRepeat[property] = _valuesEnd[property];
                            _valuesEnd[property] = tmp;
                        }
                        _valuesStart[property] = _valuesStartRepeat[property];
                    }
                    if (_yoyo) {
                        _reversed = !_reversed;
                    }
                    _startTime = time + _delayTime;
                    return true;
                } else {
                    if (_onCompleteCallback != null) {
                        _onCompleteCallback.call(_object);
                    }
                    for(var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++){
                        // Make the chained tweens start exactly at the time they should,
                        // even if the `update()` method was called way past the duration of the tween
                        _chainedTweens[i].start(_startTime + _duration);
                    }
                    return false;
                }
            }
            return true;
        };
    };
    TWEEN.Easing = {
        Linear: {
            None: function None(k) {
                return k;
            }
        },
        Quadratic: {
            In: function In(k) {
                return k * k;
            },
            Out: function Out(k) {
                return k * (2 - k);
            },
            InOut: function InOut(k) {
                if ((k *= 2) < 1) {
                    return 0.5 * k * k;
                }
                return -0.5 * (--k * (k - 2) - 1);
            }
        },
        Quartic: {
            In: function In(k) {
                return k * k * k * k;
            },
            Out: function Out(k) {
                return 1 - --k * k * k * k;
            },
            InOut: function InOut(k) {
                if ((k *= 2) < 1) {
                    return 0.5 * k * k * k * k;
                }
                return -0.5 * ((k -= 2) * k * k * k - 2);
            }
        },
        Sinusoidal: {
            In: function In(k) {
                return 1 - Math.cos(k * Math.PI / 2);
            },
            Out: function Out(k) {
                return Math.sin(k * Math.PI / 2);
            },
            InOut: function InOut(k) {
                return 0.5 * (1 - Math.cos(Math.PI * k));
            }
        },
        Cubic: {
            In: function In(k) {
                return k * k * k;
            },
            Out: function Out(k) {
                return --k * k * k + 1;
            },
            InOut: function InOut(k) {
                if ((k *= 2) < 1) {
                    return 0.5 * k * k * k;
                }
                return 0.5 * ((k -= 2) * k * k + 2);
            }
        }
    };
    //noinspection JSUnusedGlobalSymbols
    TWEEN.Interpolation = {
        Linear: function Linear(v, k) {
            var m = v.length - 1;
            var f = m * k;
            var i = Math.floor(f);
            var fn = TWEEN.Interpolation.Utils.Linear;
            if (k < 0) {
                return fn(v[0], v[1], f);
            }
            if (k > 1) {
                return fn(v[m], v[m - 1], m - f);
            }
            return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
        },
        Bezier: function Bezier(v, k) {
            var b = 0;
            var n = v.length - 1;
            var pw = Math.pow;
            var bn = TWEEN.Interpolation.Utils.Bernstein;
            for(var i = 0; i <= n; i++){
                b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
            }
            return b;
        },
        Utils: {
            Linear: function Linear(p0, p1, t) {
                return (p1 - p0) * t + p0;
            },
            Bernstein: function Bernstein(n, i) {
                var fc = TWEEN.Interpolation.Utils.Factorial;
                return fc(n) / fc(i) / fc(n - i);
            },
            Factorial: function() {
                var a = [
                    1
                ];
                return function(n) {
                    var s = 1;
                    if (a[n]) {
                        return a[n];
                    }
                    for(var i = n; i > 1; i--){
                        s *= i;
                    }
                    a[n] = s;
                    return s;
                };
            }(),
            CatmullRom: function CatmullRom(p0, p1, p2, p3, t) {
                var v0 = (p2 - p0) * 0.5;
                var v1 = (p3 - p1) * 0.5;
                var t2 = t * t;
                var t3 = t * t2;
                return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
            }
        }
    };
    window.TWEEN = TWEEN;
})();


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
/******/ 	/* webpack/runtime/amd options */
/******/ 	!function() {
/******/ 		__webpack_require__.amdO = {};
/******/ 	}();
/******/ 	
/************************************************************************/
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";

// UNUSED EXPORTS: default

;// CONCATENATED MODULE: ./src/js/dearviewer/defaults.js
/* globals jQuery */ var defaults_DEARVIEWER = {
    jQuery: jQuery,
    version: '2.3.47',
    autoDetectLocation: true,
    slug: undefined,
    locationVar: "dearViewerLocation",
    locationFile: undefined,
    MOUSE_CLICK_ACTIONS: {
        NONE: "none",
        NAV: "nav"
    },
    ARROW_KEYS_ACTIONS: {
        NONE: "none",
        NAV: "nav"
    },
    MOUSE_DBL_CLICK_ACTIONS: {
        NONE: "none",
        ZOOM: "zoom"
    },
    MOUSE_SCROLL_ACTIONS: {
        NONE: "none",
        ZOOM: "zoom",
        NAV: "nav"
    },
    PAGE_SCALE: {
        PAGE_FIT: "fit",
        PAGE_WIDTH: 'width',
        AUTO: "auto",
        ACTUAL: 'actual',
        MANUAL: 'manual'
    },
    READ_DIRECTION: {
        LTR: 'ltr',
        RTL: 'rtl'
    },
    TURN_DIRECTION: {
        LEFT: 'left',
        RIGHT: 'right',
        NONE: 'none'
    },
    INFO_TYPE: {
        INFO: "info",
        ERROR: "error"
    },
    FLIPBOOK_PAGE_MODE: {
        SINGLE: "single",
        DOUBLE: "double",
        AUTO: "auto"
    },
    FLIPBOOK_SINGLE_PAGE_MODE: {
        ZOOM: "zoom",
        BOOKLET: "booklet",
        AUTO: "auto"
    },
    FLIPBOOK_PAGE_SIZE: {
        AUTO: "auto",
        SINGLE: "single",
        DOUBLE_INTERNAL: "dbl_int",
        DOUBLE: "dbl",
        DOUBLE_COVER_BACK: "dbl_cover_back" // |8-1|, |2-3|, |4-5|, |6-7| -- used in printing , cannot be autodetected
    },
    LINK_TARGET: {
        NONE: 0,
        SELF: 1,
        BLANK: 2,
        PARENT: 3,
        TOP: 4
    },
    CONTROLS_POSITION: {
        HIDDEN: 'hidden',
        TOP: 'top',
        BOTTOM: 'bottom'
    },
    //internals
    TURN_CORNER: {
        TL: "tl",
        TR: "tr",
        BL: "bl",
        BR: "br",
        L: "l",
        R: "r",
        NONE: "none"
    },
    REQUEST_STATUS: {
        OFF: "none",
        ON: "pending",
        COUNT: "counting"
    },
    TEXTURE_TARGET: {
        THUMB: 0,
        VIEWER: 1,
        ZOOM: 2
    },
    FLIPBOOK_CENTER_SHIFT: {
        RIGHT: 1,
        LEFT: -1,
        NONE: 0
    },
    FLIPBOOK_COVER_TYPE: {
        NONE: "none",
        PLAIN: "plain",
        BASIC: "basic",
        RIDGE: "ridge"
    }
};
//_defaults that can be referenced but should not be changed
defaults_DEARVIEWER._defaults = {
    // When viewer is set to flipbook
    // use 3D flipbook(true) or normal CSS flipbook(false)
    is3D: true,
    // When viewer is set to flipbook, and 3D is on.
    // if you want to turn off shadow in 3d set it to false
    has3DShadow: true,
    color3DCover: "#aaaaaa",
    color3DSheets: "#fff",
    cover3DType: defaults_DEARVIEWER.FLIPBOOK_COVER_TYPE.NONE,
    flexibility: 0.9,
    drag3D: false,
    // height of the container
    // value(eg: 320) or percentage (eg: '50%')
    // calculation limit: minimum 320, max window height
    height: 'auto',
    // set to true to show outline on open (true|false)
    autoOpenOutline: false,
    // set to true to show thumbnail on open (true|false)
    autoOpenThumbnail: false,
    // enableDownload of PDF files (true|false)
    showDownloadControl: true,
    showSearchControl: true,
    showPrintControl: true,
    // if enable sound at start (true|false)
    enableSound: true,
    // duration of page turn in milliseconds
    duration: 800,
    pageRotation: 0,
    flipbook3DTiltAngleUp: 0,
    flipbook3DTiltAngleLeft: 0,
    readDirection: defaults_DEARVIEWER.READ_DIRECTION.LTR,
    pageMode: defaults_DEARVIEWER.FLIPBOOK_PAGE_MODE.AUTO,
    singlePageMode: defaults_DEARVIEWER.FLIPBOOK_SINGLE_PAGE_MODE.AUTO,
    //resizes the underlying pages to suit the top cover page after flip
    flipbookFitPages: false,
    //color value in hexadecimal
    backgroundColor: "transparent",
    flipbookHardPages: "none",
    openPage: 1,
    annotationClass: "",
    // texture settings
    maxTextureSize: 3200,
    minTextureSize: 256,
    rangeChunkSize: 524288,
    //pdf related options
    disableAutoFetch: true,
    disableStream: true,
    disableFontFace: false,
    // icons for the buttons
    icons: {
        'altnext': 'df-icon-arrow-right1',
        'altprev': 'df-icon-arrow-left1',
        'next': 'df-icon-arrow-right1',
        'prev': 'df-icon-arrow-left1',
        'end': 'df-icon-last-page',
        'start': 'df-icon-first-page',
        'share': 'df-icon-share',
        'outline-open': 'df-icon-arrow-right',
        'outline-close': 'df-icon-arrow-down',
        'help': 'df-icon-help',
        'more': 'df-icon-more',
        'download': 'df-icon-download',
        'zoomin': 'df-icon-add-circle',
        'zoomout': 'df-icon-minus-circle',
        'resetzoom': 'df-icon-minus-circle',
        'fullscreen': 'df-icon-fullscreen',
        'fullscreen-off': 'df-icon-fit-screen',
        'fitscreen': 'df-icon-fit-screen',
        'thumbnail': 'df-icon-grid-view',
        'outline': 'df-icon-list',
        'close': 'df-icon-close',
        'doublepage': 'df-icon-double-page',
        'singlepage': 'df-icon-file',
        'print': 'df-icon-print',
        'play': 'df-icon-play',
        'pause': 'df-icon-pause',
        'search': 'df-icon-search',
        'sound': 'df-icon-volume',
        'sound-off': 'df-icon-volume',
        'facebook': 'df-icon-facebook',
        'google': 'df-icon-google',
        'twitter': 'df-icon-twitter',
        'whatsapp': 'df-icon-whatsapp',
        'linkedin': 'df-icon-linkedin',
        'pinterest': 'df-icon-pinterest',
        'mail': 'df-icon-mail'
    },
    // TRANSLATION text to be displayed
    text: {
        toggleSound: "Turn on/off Sound",
        toggleThumbnails: "Toggle Thumbnails",
        toggleOutline: "Toggle Outline/Bookmark",
        previousPage: "Previous Page",
        nextPage: "Next Page",
        toggleFullscreen: "Toggle Fullscreen",
        zoomIn: "Zoom In",
        zoomOut: "Zoom Out",
        resetZoom: "Reset Zoom",
        pageFit: 'Fit Page',
        widthFit: 'Fit Width',
        toggleHelp: "Toggle Help",
        search: "Search in PDF",
        singlePageMode: "Single Page Mode",
        doublePageMode: "Double Page Mode",
        downloadPDFFile: "Download PDF File",
        gotoFirstPage: "Goto First Page",
        gotoLastPage: "Goto Last Page",
        print: "Print",
        play: "Start AutoPlay",
        pause: "Pause AutoPlay",
        share: "Share",
        close: "Close",
        mailSubject: "Check out this FlipBook",
        mailBody: "Check out this site {{url}}",
        loading: "Loading",
        thumbTitle: "Thumbnails",
        outlineTitle: "Table of Contents",
        searchTitle: "Search",
        searchPlaceHolder: "Search",
        analyticsEventCategory: "DearFlip",
        analyticsViewerReady: "Document Ready",
        analyticsViewerOpen: "Document Opened",
        analyticsViewerClose: "Document Closed",
        analyticsFirstPageChange: "First Page Changed"
    },
    share: {
        'facebook': 'https://www.facebook.com/sharer/sharer.php?u={{url}}&t={{mailsubject}}',
        'twitter': 'https://twitter.com/share?url={{url}}&text={{mailsubject}}',
        'mail': undefined,
        'whatsapp': 'https://api.whatsapp.com/send/?text={{mailsubject}}+{{url}}&type=custom_url&app_absent=0',
        'linkedin': 'https://www.linkedin.com/shareArticle?url={{url}}&title={{mailsubject}}',
        'pinterest': 'https://www.pinterest.com/pin/create/button/?url={{url}}&media=&description={{mailsubject}}'
    },
    //valid control-names:
    //altPrev,pageNumber,altNext,outline,thumbnail,zoomIn,zoomOut,fullScreen,share
    //more,download,pageMode,startPage,endPage,sound
    allControls: "altPrev,pageNumber,altNext,play,outline,thumbnail,zoomIn,zoomOut,zoom,fullScreen,share,download,search,pageMode,startPage,endPage,sound,search,print,more",
    moreControls: "download,pageMode,pageFit,startPage,endPage,sound",
    leftControls: "outline,thumbnail",
    rightControls: "fullScreen,share,download,more",
    hideControls: "",
    hideShareControls: "",
    controlsPosition: defaults_DEARVIEWER.CONTROLS_POSITION.BOTTOM,
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
    enableAnalytics: false,
    zoomRatio: 2,
    maxDPI: 2,
    fakeZoom: 1,
    pageScale: defaults_DEARVIEWER.PAGE_SCALE.PAGE_FIT,
    controlsFloating: true,
    sideMenuOverlay: true,
    enableAnnotation: true,
    enableAutoLinks: true,
    //ACTIONS
    arrowKeysAction: defaults_DEARVIEWER.ARROW_KEYS_ACTIONS.NAV,
    clickAction: defaults_DEARVIEWER.MOUSE_CLICK_ACTIONS.NAV,
    dblClickAction: defaults_DEARVIEWER.MOUSE_DBL_CLICK_ACTIONS.NONE,
    mouseScrollAction: defaults_DEARVIEWER.MOUSE_SCROLL_ACTIONS.NONE,
    linkTarget: defaults_DEARVIEWER.LINK_TARGET.BLANK,
    //Resources settings
    soundFile: "sound/turn2.mp3",
    imagesLocation: "images",
    imageResourcesPath: "images/pdfjs/",
    popupThumbPlaceholder: 'data:image/svg+xml,' + escape('<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297"><rect width="210" height="297" style="fill:#f1f2f2"/><circle cx="143" cy="95" r="12" style="fill:#e3e8ed"/><polygon points="131 138 120 149 95 124 34 184 176 185 131 138" style="fill:#e3e8ed"/></svg>'),
    cMapUrl: "js/libs/cmaps/",
    logo: "",
    logoUrl: "",
    sharePrefix: '',
    pageSize: defaults_DEARVIEWER.FLIPBOOK_PAGE_SIZE.AUTO,
    // link to the images file that you want as background.
    // supported files are jpgs,png. smaller files are preffered for performance
    backgroundImage: "",
    pixelRatio: window.devicePixelRatio || 1,
    /*3D settings*/ spotLightIntensity: 0.22,
    ambientLightColor: "#fff",
    ambientLightIntensity: 0.8,
    shadowOpacity: 0.1,
    slug: undefined,
    headerElementSelector: undefined,
    //callbacks
    onReady: function onReady(app) {
    // after document and viewer is loaded
    },
    onPageChanged: function onPageChanged(app) {
    // when page change is detected
    },
    beforePageChanged: function beforePageChanged(app) {
    // when page change validated but before pages are changed
    },
    onCreate: function onCreate(app) {
    // after app is created and initialized, viewer and document loading is not included
    },
    onCreateUI: function onCreateUI(app) {
    // after UI is created
    },
    onFlip: function onFlip(app) {
    // after flip event is fired
    },
    beforeFlip: function beforeFlip(app) {
    // before flip event is fired
    },
    autoPDFLinktoViewer: false,
    autoLightBoxFullscreen: false,
    thumbLayout: 'book-title-hover',
    cleanupAfterRender: true,
    canvasWillReadFrequently: true,
    providerType: 'pdf',
    loadMoreCount: -1,
    autoPlay: false,
    autoPlayDuration: 1000,
    autoPlayStart: false,
    popupBackGroundColor: "#eee",
    mockupMode: false,
    instantTextureProcess: false,
    cachePDFTexture: false,
    pdfVersion: "default"
};
//options that can be changed by users
//Needed for: When user changed text or icons and just changed one, it impacted all others.
defaults_DEARVIEWER.defaults = {};
defaults_DEARVIEWER.jQuery.extend(true, defaults_DEARVIEWER.defaults, defaults_DEARVIEWER._defaults);
defaults_DEARVIEWER.viewers = {};
defaults_DEARVIEWER.providers = {};
defaults_DEARVIEWER.openFileOptions = {};
defaults_DEARVIEWER.executeCallback = function() {};


;// CONCATENATED MODULE: ./src/js/dearviewer/utils/utils.js
/* globals requirejs, jQuery*/ function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}

var DV = defaults_DEARVIEWER;
var utils_jQuery = defaults_DEARVIEWER.jQuery;
/*VARIABLES*/ var has3d = 'WebKitCSSMatrix' in window || document.body && 'MozPerspective' in document.body.style, hasMouse = 'onmousedown' in window;
var utils = DV.utils = {
    mouseEvents: hasMouse ? {
        type: "mouse",
        start: "mousedown",
        move: "mousemove",
        end: "mouseup"
    } : {
        type: "touch",
        start: "touchstart",
        move: "touchmove",
        end: "touchend"
    },
    html: {
        div: "<div></div>",
        a: "<a>",
        input: "<input type='text'/>",
        select: "<select></select>"
    },
    //functions or so
    getSharePrefix: function getSharePrefix() {
        var prefixes = utils.getSharePrefixes();
        return prefixes[0];
    },
    /**
   *
   * @returns {array}
   */ getSharePrefixes: function getSharePrefixes() {
        return (DV.defaults.sharePrefix + ',dflip-,flipbook-,dearflip-,dearpdf-').split(",").map(function(e) {
            return e.trim();
        });
    },
    toRad: function toRad(deg) {
        return deg * Math.PI / 180;
    },
    toDeg: function toDeg(rad) {
        return rad * 180 / Math.PI;
    },
    /**
   * Object Fallback when empty
   * @param {Object} checkVal Object to check if it's empty
   * @param {Object} ifEmpty Object to use if checkVal is empty
   * @returns {*}
   */ ifdef: function ifdef(checkVal) {
        var ifEmpty = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        if (checkVal === null || checkVal === void 0) {
            return ifEmpty;
        }
        return checkVal;
    },
    createBtn: function createBtn(name, icon, text) {
        // icon = options.icons[icon];
        // text = options.text[text];
        // noinspection CheckTagEmptyBody
        var btn = utils_jQuery(utils.html.div, {
            class: "df-ui-btn df-ui-" + name,
            title: text,
            html: text !== void 0 ? '<span>' + text + '</span>' : ''
        });
        if (icon !== void 0 && icon.indexOf('<svg') > -1) {
            btn.html(icon.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg" '));
        } else {
            btn.addClass(icon);
        }
        return btn;
    },
    transition: function transition(hasTransition, duration) {
        return hasTransition ? duration / 1000 + "s ease-out" : "0s none";
    },
    display: function display(hasDisplay) {
        return hasDisplay ? "block" : "none";
    },
    resetTranslate: function resetTranslate() {
        return utils.translateStr(0, 0);
    },
    bgImage: function bgImage(src) {
        return src == null || src === "blank" ? '' : ' url("' + src + '")';
    },
    translateStr: function translateStr(x, y) {
        return has3d ? ' translate3d(' + x + 'px,' + y + 'px, 0px) ' : ' translate(' + x + 'px, ' + y + 'px) ';
    },
    httpsCorrection: function httpsCorrection(url) {
        try {
            if (url === null || url === void 0) return null;
            if (typeof url !== "string") return url;
            var location = window.location;
            if (location.href.split(".")[0] === url.split(".")[0]) return url;
            var urlHostName = url.split("://")[1].split("/")[0];
            var isSameDomain = urlHostName.replace("www.", "") === location.hostname.replace("www.", "");
            if (isSameDomain && url.indexOf(location.hostname.replace("www.", "")) > -1) {
                if (location.href.indexOf("https://") > -1) {
                    url = url.replace("http://", "https://");
                } else if (location.href.indexOf("http://") > -1) {
                    url = url.replace("https://", "http://");
                }
                //correct www and non www
                //match to www
                if (location.href.indexOf("://www.") > -1 && url.indexOf("://www.") === -1) {
                    url = url.replace("://", "://www.");
                }
                //match to non www
                if (location.href.indexOf("://www.") === -1 && url.indexOf("://www.") > -1) {
                    url = url.replace("://www.", "://");
                }
            }
        } catch (e) {
            console.log("Skipping URL correction: " + url);
        }
        return url;
    },
    rotateStr: function rotateStr(deg) {
        return ' rotateZ(' + deg + 'deg) ';
    },
    lowerPowerOfTwo: function lowerPowerOfTwo(value) {
        return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
    },
    nearestPowerOfTwo: function nearestPowerOfTwo(value, max) {
        return Math.min(max || 2048, Math.pow(2, Math.ceil(Math.log(value) / Math.LN2)));
    },
    getFullscreenElement: function getFullscreenElement() {
        //noinspection JSUnresolvedVariable
        return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    },
    hasFullscreenEnabled: function hasFullscreenEnabled() {
        //noinspection JSUnresolvedVariable
        return document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled;
    },
    fixMouseEvent: function fixMouseEvent(event) {
        if (event) {
            var originalEvent = event.originalEvent || event;
            //noinspection JSUnresolvedVariable
            if (originalEvent.changedTouches && originalEvent.changedTouches.length > 0) {
                var _event = utils_jQuery.event.fix(event);
                //noinspection JSUnresolvedVariable
                var touch = originalEvent.changedTouches[0];
                _event.clientX = touch.clientX;
                _event.clientY = touch.clientY;
                _event.pageX = touch.pageX;
                _event.touches = originalEvent.touches;
                _event.pageY = touch.pageY;
                _event.movementX = touch.movementX;
                _event.movementY = touch.movementY;
                return _event;
            } else {
                return event;
            }
        } else {
            return event;
        }
    },
    limitAt: function limitAt(x, min, max) {
        return x < min ? min : x > max ? max : x;
    },
    distOrigin: function distOrigin(x, y) {
        return utils.distPoints(0, 0, x, y);
    },
    distPoints: function distPoints(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    },
    angleByDistance: function angleByDistance(distance, fullWidth) {
        var h = fullWidth / 2;
        var d = utils.limitAt(distance, 0, fullWidth);
        return d < h ? utils.toDeg(Math.asin(d / h)) : 90 + utils.toDeg(Math.asin((d - h) / h));
    },
    calculateScale: function calculateScale(startTouches, endTouches) {
        var startDistance = utils.distPoints(startTouches[0].x, startTouches[0].y, startTouches[1].x, startTouches[1].y), endDistance = utils.distPoints(endTouches[0].x, endTouches[0].y, endTouches[1].x, endTouches[1].y);
        return endDistance / startDistance;
    },
    /**
   * Calculates the average of multiple vectors (x, y values)
   */ getVectorAvg: function getVectorAvg(vectors) {
        return {
            x: vectors.map(function(v) {
                return v.x;
            }).reduce(utils.sum) / vectors.length,
            y: vectors.map(function(v) {
                return v.y;
            }).reduce(utils.sum) / vectors.length
        };
    },
    sum: function sum(a, b) {
        return a + b;
    },
    /**
   * Returns the touches of an event relative to the container offset
   * @param event
   * @param position
   * @return array touches
   */ getTouches: function getTouches(event, position) {
        position = position || {
            left: 0,
            top: 0
        };
        return Array.prototype.slice.call(event.touches).map(function(touch) {
            return {
                x: touch.pageX - position.left,
                y: touch.pageY - position.top
            };
        });
    },
    getScriptCallbacks: [],
    getScript: function getScript(source, callback, errorCallback, isModule) {
        var _callbacks = utils.getScriptCallbacks[source], script;
        function clean() {
            script.removeEventListener("load", load, false);
            script.removeEventListener("readystatechange", load, false);
            script.removeEventListener("complete", load, false);
            script.removeEventListener("error", onError, false);
            script.onload = script.onreadystatechange = null;
            script = null;
            script = null;
        }
        function load(_, isAbort) {
            if (script != null) {
                if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                    //console.log("aborted loading :" + source);
                    if (!isAbort) {
                        for(var i = 0; i < _callbacks.length; i++){
                            if (_callbacks[i]) _callbacks[i]();
                            _callbacks[i] = null;
                        }
                        errorCallback = null;
                    }
                    clean();
                }
            }
        }
        function onError() {
            errorCallback();
            clean();
            errorCallback = null;
        }
        if (utils_jQuery("script[src='" + source + "']").length === 0) {
            _callbacks = utils.getScriptCallbacks[source] = [];
            _callbacks.push(callback);
            script = document.createElement('script');
            var prior = document.body.getElementsByTagName('script')[0];
            script.async = true;
            script.setAttribute("data-cfasync", "false");
            if (isModule === true) {
                script.setAttribute("type", "module");
            }
            if (prior != null) {
                prior.parentNode.insertBefore(script, prior);
                prior = null;
            } else {
                document.body.appendChild(script);
            }
            script.addEventListener("load", load, false);
            script.addEventListener("readystatechange", load, false);
            script.addEventListener("complete", load, false);
            if (errorCallback) {
                script.addEventListener("error", onError, false);
            }
            //Todo check if removing random(1) to random() has any effect
            script.src = source + (utils.prefix.dom === "MS" ? "?" + Math.random() : "");
        } else {
            _callbacks.push(callback);
        }
    },
    detectScriptLocation: function detectScriptLocation() {
        //Auto-detection if the folder structure is copied properly
        if (typeof window[defaults_DEARVIEWER.locationVar] == 'undefined') {
            utils_jQuery("script").each(function() {
                var src = utils_jQuery(this)[0].src;
                // noinspection HttpUrlsUsage
                if ((src.indexOf("/" + defaults_DEARVIEWER.locationFile + ".js") > -1 || src.indexOf("/" + defaults_DEARVIEWER.locationFile + ".min.js") > -1 || src.indexOf("js/" + defaults_DEARVIEWER.locationFile + ".") > -1) && (src.indexOf("https://") > -1 || src.indexOf("http://") > -1)) {
                    var splits = src.split("/");
                    window[defaults_DEARVIEWER.locationVar] = splits.slice(0, -2).join("/");
                }
            });
        } else if (window[defaults_DEARVIEWER.locationVar].indexOf(":") == -1) {
            var a = document.createElement("a");
            a.href = window[defaults_DEARVIEWER.locationVar];
            window[defaults_DEARVIEWER.locationVar] = a.href;
            a = null;
        }
        if (typeof window[defaults_DEARVIEWER.locationVar] !== 'undefined') {
            //add ending forward slash trail for safety
            if (window[defaults_DEARVIEWER.locationVar].length > 2 && window[defaults_DEARVIEWER.locationVar].slice(-1) !== "/") {
                window.window[defaults_DEARVIEWER.locationVar] += "/";
            }
        }
    },
    disposeObject: function disposeObject(object) {
        if (object && object.dispose) {
            object.dispose();
        }
        object = null;
        return object;
    },
    log: function log() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        var _console;
        if (DV.defaults.enableDebugLog === true && window.console) (_console = console).log.apply(_console, _to_consumable_array(args));
    },
    color: {
        getBrightness: function getBrightness(hex) {
            var rgb = hex.replace("#", "").match(/.{1,2}/g).map(function(e) {
                return parseInt(e, 16);
            });
            return rgb[0] * .299 + rgb[1] * .587 + rgb[2] * .114;
        },
        isLight: function isLight(hex) {
            return !utils.color.isDark(hex);
        },
        isDark: function isDark(hex) {
            return utils.color.getBrightness(hex) < 128;
        }
    },
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /(iPad|iPhone|iPod)/g.test(navigator.userAgent),
    isIPad: function() {
        return navigator.platform === "iPad" || typeof navigator.maxTouchPoints !== "undefined" && navigator.maxTouchPoints > 2 && /Mac/.test(navigator.platform);
    }(),
    isMac: navigator.platform.toUpperCase().indexOf('MAC') >= 0,
    isSafari: function() {
        // noinspection JSCheckFunctionSignatures
        return /constructor/i.test(window.HTMLElement) || function(p) {
            return p.toString() === "[object SafariRemoteNotification]";
        }(!window['safari'] || window['safari']['pushNotification']);
    }(),
    isIEUnsupported: !!navigator.userAgent.match(/(MSIE|Trident)/),
    isSafariWindows: function isSafariWindows() {
        return !utils.isMac && utils.isSafari;
    },
    //self Execution
    hasWebgl: function() {
        try {
            var canvas = document.createElement('canvas');
            //noinspection JSUnresolvedVariable
            return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    }(),
    hasES2022: function() {
        return Array.prototype.at !== undefined;
    }(),
    canSupport3D: function canSupport3D() {
        var canSupport = true;
        try {
            if (utils.hasWebgl == false) {
                canSupport = false;
                console.log("Proper Support for Canvas webgl 3D not detected!");
            } else if (utils.hasES2022 == false) {
                canSupport = false;
                console.log("Proper Support for 3D not extpected in older browser!");
            } else if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
                canSupport = false;
                console.log("Proper Support for 3D not detected for IE!");
            } else if (utils.isSafariWindows()) {
                canSupport = false;
                console.log("Proper Support for 3D not detected for Safari!");
            } else {
                var android = navigator.userAgent.toString().toLowerCase().match(/android\s([0-9\.]*)/i);
                android = android ? android[1] : undefined;
                if (android) {
                    android = parseInt(android, 10);
                    if (!isNaN(android) && android < 9) {
                        canSupport = false;
                        console.log("Proper Support for 3D not detected for Android below 9.0!");
                    }
                }
            }
        } catch (error) {}
        return canSupport;
    },
    prefix: function() {
        var styles = window.getComputedStyle(document.documentElement, ''), pre = Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/)[1], dom = 'WebKit|Moz|MS'.match(new RegExp('(' + pre + ')', 'i'))[1];
        return {
            dom: dom,
            lowercase: pre,
            css: '-' + pre + '-',
            js: pre[0].toUpperCase() + pre.substr(1)
        };
    }(),
    scrollIntoView: function scrollIntoView(element, reference, align) {
        reference = reference || element.parentNode;
        reference.scrollTop = element.offsetTop + (align === false ? element.offsetHeight - reference.offsetHeight : 0);
        reference.scrollLeft = element.offsetLeft - reference.offsetLeft;
    },
    getVisibleElements: function getVisibleElements(options) {
        var container = options.container;
        var elements = options.elements;
        var visible = options.visible || [];
        var top = container.scrollTop, bottom = top + container.clientHeight;
        if (bottom == 0) return visible;
        var minIndex = 0, maxIndex = elements.length - 1;
        var element = elements[minIndex];
        var elementBottom = element.offsetTop + element.clientTop + element.clientHeight;
        if (elementBottom < top) {
            while(minIndex < maxIndex){
                var currentIndex = minIndex + maxIndex >> 1;
                element = elements[currentIndex];
                elementBottom = element.offsetTop + element.clientTop + element.clientHeight;
                if (elementBottom > top) {
                    maxIndex = currentIndex;
                } else {
                    minIndex = currentIndex + 1;
                }
            }
        }
        for(var i = minIndex; i < elements.length; i++){
            element = elements[i];
            var elementTop = element.offsetTop + element.clientTop;
            if (elementTop <= bottom) {
                visible.push(i + 1);
            } else {
                break;
            }
        }
        return visible;
    },
    getMouseDelta: function getMouseDelta(event) {
        var delta = 0;
        if (event['wheelDelta'] != null) {
            delta = event['wheelDelta'];
        } else if (event.detail != null) {
            delta = -event.detail;
        }
        return delta;
    },
    pan: function pan(viewer, point) {
        var reset = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        var origin = viewer.startPoint;
        var scale = viewer.app.zoomValue;
        var left = viewer.left + (reset === true ? 0 : point.raw.x - origin.raw.x), top = viewer.top + (reset === true ? 0 : point.raw.y - origin.raw.y);
        //round removes blur due to decimal value in transform.
        viewer.left = Math.ceil(utils.limitAt(left, -viewer.shiftWidth, viewer.shiftWidth));
        viewer.top = Math.ceil(utils.limitAt(top, -viewer.shiftHeight, viewer.shiftHeight));
        if (scale === 1) {
            viewer.left = 0;
            viewer.top = 0;
        }
        if (reset === false) {
            viewer.startPoint = point;
        }
    //requires updatePan to update in DOM
    }
};
utils.isChromeExtension = function() {
    return window.location.href.indexOf("chrome-extension://") === 0;
};
var NullCharactersRegExp = /\x00+/g;
var InvisibleCharactersRegExp = /[\x01-\x1F]/g;
utils.removeNullCharacters = function(str) {
    var replaceInvisible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (typeof str !== "string") {
        warn("The argument for removeNullCharacters must be a string.");
        return str;
    }
    if (replaceInvisible) {
        str = str.replace(InvisibleCharactersRegExp, " ");
    }
    return str.replace(NullCharactersRegExp, "");
};
defaults_DEARVIEWER.hashFocusBookFound = false;
utils.detectHash = function() {
    defaults_DEARVIEWER.preParseHash = window.location.hash;
    //parse hash and check if any exists
    /**
   * @type {boolean} - Introduced due to a user case where the same hash was detected twice and clicked twice.
   */ var prefixes = utils.getSharePrefixes();
    if (prefixes.indexOf("") == -1) prefixes.push("");
    Array.prototype.forEach.call(prefixes, function(prefix) {
        var hash = defaults_DEARVIEWER.preParseHash;
        if (hash && hash.indexOf(prefix) >= 0 && defaults_DEARVIEWER.hashFocusBookFound === false) {
            if (prefix.length > 0) {
                hash = hash.split(prefix)[1];
            }
            var id = hash.split('/')[0].replace("#", "");
            if (id.length > 0) {
                var page = hash.split('/')[1];
                if (page != null) {
                    page = page.split('/')[0];
                }
                var book;
                //first check for slug pattern
                book = utils_jQuery("[data-df-slug=" + id + "]");
                //then check for old slug pattern
                if (book.length === 0) book = utils_jQuery("[data-slug=" + id + "]");
                //then id pattern
                if (book.length === 0) book = utils_jQuery('#df-' + id + ",#" + id);
                //then _slug pattern
                if (book.length === 0) book = utils_jQuery("[data-_slug=" + id + "]");
                if (book.length > 0 && book.is("._df_thumb,._df_button,._df_custom,._df_link,._df_book,.df-element,.dp-element")) {
                    book = utils_jQuery(book[0]);
                    defaults_DEARVIEWER.hashFocusBookFound = true;
                    page = parseInt(page, 10);
                    utils.focusHash(book);
                    //case : flipbook is already created, in-page links are clicked, thus link moves the page
                    var app = defaults_DEARVIEWER.activeLightBox && defaults_DEARVIEWER.activeLightBox.app || book.data("df-app");
                    if (app != null) {
                        app.gotoPage(page);
                        app.hashNavigationEnabled = true;
                        utils.focusHash(app.element);
                        return false;
                    } else if (page != null) {
                        book.attr("data-hash-page", page); //data-has-page shall be removed after it is used
                    //data added attribues cannot be searched or fetched using selectors annd attr()
                    //when shortcode specifies page 1, but url says page 5, page 1 is added using attr data-df-page
                    }
                    book.addClass("df-hash-focused", true);
                    if (book.data('lightbox') != null || book.data('df-lightbox') != null) {
                        book.trigger("click");
                    } else if (book.attr("href") != null && book.attr("href").indexOf(".pdf") > -1) {
                        book.trigger("click");
                    }
                }
            }
        }
    });
};
utils.focusHash = function(element) {
    var _element__scrollIntoView, _element_;
    (_element__scrollIntoView = (_element_ = element[0]).scrollIntoView) === null || _element__scrollIntoView === void 0 ? void 0 : _element__scrollIntoView.call(_element_, {
        behavior: "smooth",
        block: "nearest",
        inline: "nearest"
    });
};
/**
 * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
 * images to fit into a certain area.
 *
 * @param {Number} srcWidth width of source image
 * @param {Number} srcHeight height of source image
 * @param {Number} maxWidth maximum available width
 * @param {Number} maxHeight maximum available height
 * @return {Object} { width, height }
 */ utils.contain = function(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return {
        width: srcWidth * ratio,
        height: srcHeight * ratio
    };
};
utils.containUnStretched = function(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = Math.min(1, maxWidth / srcWidth, maxHeight / srcHeight);
    return {
        width: srcWidth * ratio,
        height: srcHeight * ratio
    };
};
utils.fallbackOptions = function(options) {
    //todo this could work without fallback
    if (options.share['mail'] === undefined) {
        options.share['mail'] = 'mailto:?subject=' + options.text.mailSubject + '&body=' + options.text.mailBody;
    }
    if (options.openPage) {
        options.openPage = parseInt(options.openPage, 10);
    }
    return options;
};
var getAttributes = function getAttributes(element) {
    var attrOptions = {};
    var attrKeys = {
        'id': '',
        'thumb': '',
        'openPage': 'data-hash-page,df-page,data-df-page,data-page,page',
        'target': '',
        'height': '',
        'showDownloadControl': 'data-download',
        'source': 'pdf-source,df-source,source',
        'is3D': 'webgl,is3d',
        'viewerType': 'viewertype,viewer-type',
        'pagemode': ''
    };
    for(var key in attrKeys){
        var aliases = (key + "," + attrKeys[key]).split(",");
        for(var i = 0; i < aliases.length; i++){
            var alias = aliases[i];
            if (alias !== '') {
                var val = element.data(alias);
                if (val !== null && val != "" && val != void 0) {
                    attrOptions[key] = val;
                    break;
                }
                val = element.attr(alias);
                if (val !== null && val != "" && val != void 0) {
                    attrOptions[key] = val;
                    break;
                }
            }
        }
    }
    //clear temporary attributes
    element.removeAttr('data-hash-page');
    return attrOptions;
};
//getOptions of a specific book in DOM and merge with respective variable
utils.getOptions = function(element) {
    element = utils_jQuery(element);
    if (element.data("df-option") == void 0 & element.data("option") == void 0) {
        element.data("df-option", "option_" + element.attr("id"));
    }
    if (element.attr("source") !== void 0) {
        element.data("df-source", element.attr("source"));
    }
    //GetOption Variable
    var optionVar = element.data("df-option") || element.data("option");
    var options = void 0;
    if ((typeof optionVar === "undefined" ? "undefined" : _type_of(optionVar)) === "object") {
        options = optionVar;
    } else {
        options = optionVar == null || optionVar === "" || window[optionVar] == null ? {} : window[optionVar];
    }
    //get all options defined in attributes
    var attrOptions = getAttributes(element);
    //merge options, attribute options override variable options
    options = utils_jQuery.extend(true, {}, options, attrOptions);
    return options;
};
utils.isTrue = function(val) {
    return val === "true" || val === true;
};
utils.parseInt = function(option) {
    return parseInt(option, 10);
};
utils.parseFloat = function(option) {
    return parseFloat(option);
};
utils.parseIntIfExists = function(option) {
    if (option !== void 0) {
        option = parseInt(option, 10);
    }
    return option;
};
utils.parseFloatIfExists = function(option) {
    if (option !== void 0) {
        option = parseFloat(option);
    }
    return option;
};
utils.parseBoolIfExists = function(option) {
    if (option !== void 0) {
        option = utils.isTrue(option);
    }
    return option;
};
utils.getCurveAngle = function(isRight, angle) {
    var threshold = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    var cangle;
    if (isRight) {
        if (angle > 135) cangle = 180 - (180 - angle) * 2;
        else if (angle > 45) cangle = angle - 45;
        else cangle = 0;
        cangle = utils.limitAt(cangle, threshold, 180);
    } else {
        if (angle < 45) cangle = angle * 2;
        else if (angle < 135) cangle = angle + 45;
        else cangle = 180;
        cangle = utils.limitAt(cangle, 0, 180 - threshold);
    }
    return cangle;
};
utils.sanitizeOptions = function(options) {
    options.showDownloadControl = utils.parseBoolIfExists(options.showDownloadControl);
    options.showSearchControl = utils.parseBoolIfExists(options.showSearchControl);
    options.showPrintControl = utils.parseBoolIfExists(options.showPrintControl);
    options.flipbook3DTiltAngleLeft = utils.parseIntIfExists(options.flipbook3DTiltAngleLeft);
    options.flipbook3DTiltAngleUp = utils.parseIntIfExists(options.flipbook3DTiltAngleUp);
    options.paddingLeft = utils.parseIntIfExists(options.paddingLeft);
    options.paddingRight = utils.parseIntIfExists(options.paddingRight);
    options.paddingTop = utils.parseIntIfExists(options.paddingTop);
    options.paddingBottom = utils.parseIntIfExists(options.paddingBottom);
    options.duration = utils.parseIntIfExists(options.duration);
    options.rangeChunkSize = utils.parseIntIfExists(options.rangeChunkSize);
    options.maxTextureSize = utils.parseIntIfExists(options.maxTextureSize);
    options.linkTarget = utils.parseIntIfExists(options.linkTarget);
    options.zoomRatio = utils.parseFloatIfExists(options.zoomRatio);
    // options.is3D = utils.parseBoolIfExists(options.is3D); //is3D is not a boolean
    options.enableAnalytics = utils.parseBoolIfExists(options.enableAnalytics);
    options.autoPlay = utils.parseBoolIfExists(options.autoPlay);
    options.autoPlayStart = utils.parseBoolIfExists(options.autoPlayStart);
    options.autoPlayDuration = utils.parseIntIfExists(options.autoPlayDuration);
    if (options.loadMoreCount !== void 0) {
        options.loadMoreCount = utils.parseInt(options.loadMoreCount);
        if (isNaN(options.loadMoreCount) || options.loadMoreCount === 0) options.loadMoreCount = -1;
    }
    if (options.source != null && (Array === options.source.constructor || Array.isArray(options.source) || _instanceof(options.source, Array))) {
        for(var _correct = 0; _correct < options.source.length; _correct++){
            options.source[_correct] = utils.httpsCorrection(options.source[_correct]);
        }
    } else {
        options.source = utils.httpsCorrection(options.source);
    }
    return options;
};
utils.finalizeOptions = function(options) {
    return options;
};
//Possible improvements: https://www.npmjs.com/package/linkifyjs
utils.urlify = function(text) {
    var myRegexp = /[a-zA-Z0-9][^\s,]{3,}\.[^\s,]+[a-zA-Z0-9]/gi;
    var result, urlLowCase, hits = [];
    while(result = myRegexp.exec(text)){
        var url = result[0];
        if ((url.match(/@/g) || []).length == 1) {
            if (url.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,7})+/gi)) {
                hits.push({
                    index: result.index,
                    length: url.length,
                    text: url
                });
            }
        } else if (url.match(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&//=]*/g)) {
            urlLowCase = url.toLowerCase();
            if (urlLowCase.indexOf('http:') === 0 || urlLowCase.indexOf('https:') === 0 || urlLowCase.indexOf('www.') === 0) {
                hits.push({
                    index: result.index,
                    length: url.length,
                    text: url
                });
            }
        }
    }
    return hits;
    //can have multiple match in a text
    return text.replace(myRegexp, function(url, a, b) {
        if (url.indexOf("@") > -1) {
            //this is a mail just verify if valid
            if (url.match(/^((?!\.)[\w_.-]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gi)) {
                var url2 = url.toLowerCase();
                if (url.indexOf("mailto:" === -1)) url2 = "mailto:" + url;
                utils.log("AutoLink: " + url2 + " for " + url);
                return '<a href="' + url2 + '" ' + 'class="df-autolink" target="_blank">' + url + '</a>';
            }
        } else {
            //this is a domain like just verify if valid
            if (url.match(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&//=]*/g)) {
                var url2 = url;
                if (url.indexOf('www.') === 0) {
                    url2 = 'http://' + url;
                } else if (url2.indexOf('http:') === -1 && url2.indexOf('https:') === -1) {
                    return url;
                }
                utils.log("AutoLink: " + url2 + " for " + url);
                return '<a href="' + url2 + '" class="df-autolink" target="_blank">' + url + '</a>';
            }
        }
        return url;
    });
};
utils.oldurlify = function(text) {
    //https://regex101.com/r/cX0pJ8/1
    var urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/g;
    // urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    // noinspection HttpUrlsUsage
    return text.replace(urlRegex, function(url, b, c, d, e) {
        url = url.toLowerCase();
        var url2 = url;
        if (url.indexOf(':') > 0 && url.indexOf('http:') === -1 && url.indexOf('https:') === -1) {
            utils.log("AutoLink Rejected: " + url2 + " for " + url);
            return url;
        } else if (url.indexOf('www.') === 0) {
            url2 = 'http://' + url;
        } else if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {} else if (url.indexOf('mailto:') === 0) {} else if (url.indexOf('@') > 0) {
            url2 = 'mailto:' + url;
            var mailformat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
            if (url.match(mailformat) === null) {
                utils.log("AutoLink Rejected: " + url2 + " for " + url);
                return url;
            }
        }
        utils.log("AutoLink: " + url2 + " for " + url);
        return '<a href="' + url2 + '" class="df-autolink" target="_blank">' + url + '</a>';
    });
};
// Test via a getter in the options object to see if the passive property is accessed
utils.supportsPassive = false;
try {
    var opts = Object.defineProperty({}, 'passive', {
        get: function get() {
            utils.supportsPassive = true;
        }
    });
    window.addEventListener("testPassive", null, opts);
    window.removeEventListener("testPassive", null, opts);
} catch (e) {}
function getDataFromClass(el) {
    var prefix = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "dvcss_e_";
    var classList = el.classList, className;
    for(var i = 0; i < classList.length; i++){
        className = classList[i];
        if (className.indexOf(prefix) === 0) return className;
    }
    return null;
}
defaults_DEARVIEWER.parseCSSElements = function() {
    utils_jQuery(".dvcss").each(function() {
        var el = utils_jQuery(this);
        var cssData = getDataFromClass(el[0]);
        el.removeClass(cssData).removeClass("dvcss");
        cssData = cssData.replace("dvcss_e_", "");
        var data;
        try {
            data = JSON.parse(atob(cssData));
        } catch (e) {}
        if (data) {
            var option_id = "df_option_" + data.id;
            window[option_id] = utils_jQuery.extend(true, {}, window[option_id], data);
            el.addClass("df-element");
            if (data.lightbox !== "none") {
                el.attr("data-df-lightbox", data.lightbox === void 0 ? "custom" : data.lightbox);
                if (data.lightbox == "thumb") el.attr("data-df-thumb", data.pdfThumb);
                if (data.thumbLayout) el.attr("data-df-thumb-layout", data.thumbLayout);
                if (data.apl) el.attr("apl", data.apl);
            }
            el.data("df-option", option_id);
            //attr is required, data("slug") cannot be used in selector
            el.attr("data-df-slug", data.slug);
            el.attr("id", "df_" + data.id);
        }
    });
};
defaults_DEARVIEWER.parseThumbs = function(args) {
    args.element.html("");
    if (args.thumbURL == null || args.thumbURL.toString().trim() == '') {
        args.element.addClass("df-thumb-not-found");
        args.thumbURL = defaults_DEARVIEWER.defaults.popupThumbPlaceholder;
    }
    var titleElement = utils_jQuery("<span class='df-book-title'>").html(args.title);
    var wrapperElement = utils_jQuery("<div class='df-book-wrapper'>").appendTo(args.element);
    wrapperElement.append(utils_jQuery("<div class='df-book-page1'>"));
    wrapperElement.append(utils_jQuery("<div class='df-book-page2'>"));
    var coverElement = utils_jQuery("<div class='df-book-cover'>").append(titleElement).appendTo(wrapperElement);
    var image = utils_jQuery('<img width="210px" height="297px" class="df-lazy" alt="' + args.title + '"/>');
    image.attr('data-src', args.thumbURL);
    image.attr('src', defaults_DEARVIEWER.defaults.popupThumbPlaceholder);
    coverElement.prepend(image);
    defaults_DEARVIEWER.addLazyElement(image[0]);
    if (defaults_DEARVIEWER.defaults.displayLightboxPlayIcon === true) coverElement.addClass("df-icon-play-popup");
    if (args.thumbLayout === "book-title-top") {
        titleElement.prependTo(args.element);
    } else if (args.thumbLayout === "book-title-bottom" || args.thumbLayout === "cover-title") {
        if (args.hasShelf) {
            args.thumbLayout = "book-title-fixed";
        } else {
            titleElement.appendTo(args.element);
        }
        if (defaults_DEARVIEWER.defaults.displayLightboxPlayIcon === true) {
            args.element.removeClass("df-icon-play-popup");
            wrapperElement.addClass("df-icon-play-popup");
        }
    }
    args.element.addClass("df-tl-" + args.thumbLayout);
    args.element.attr("title", args.title);
};
defaults_DEARVIEWER.initId = 10;
defaults_DEARVIEWER.embeds = [];
defaults_DEARVIEWER.activeEmbeds = [];
defaults_DEARVIEWER.removeEmbeds = [];
defaults_DEARVIEWER.removeEmbedsLimit = utils.isMobile ? 1 : 2;
defaults_DEARVIEWER.parseNormalElements = function() {
    utils_jQuery('.df-posts').each(function() {
        if (defaults_DEARVIEWER.defaults.loadMoreCount === false || defaults_DEARVIEWER.defaults.loadMoreCount === -1) return;
        var postsWrapper = utils_jQuery(this);
        var parsed = postsWrapper.data("df-parsed");
        //skip if already parsed or failed
        if (parsed !== "true") {
            postsWrapper.data("df-parsed", "true");
            postsWrapper.attr("df-parsed", "true"); //backward-compatibility - issue #374 https://github.com/deepak-ghimire/dearviewer/issues/374
            var count = 0;
            var books = postsWrapper.find('.df-element');
            var totalBooks = books.length;
            books.each(function() {
                //skip first n books
                count++;
                if (count > defaults_DEARVIEWER.defaults.loadMoreCount) utils_jQuery(this).attr("skip-parse", "true");
            });
            if (totalBooks > defaults_DEARVIEWER.defaults.loadMoreCount) {
                postsWrapper.append("<div class='df-load-more-button-wrapper'><div class='df-load-more-button'>Load More..</div></div>");
            }
        }
    });
    defaults_DEARVIEWER.triggerId = 10;
    utils_jQuery('.df-element').each(function() {
        var element = utils_jQuery(this);
        if (element.attr("skip-parse") === "true") return;
        var isParsed = element.data("df-parsed");
        if (isParsed !== "true") {
            element.data("df-parsed", "true");
            element.attr("df-parsed", "true"); //backward-compatibility
            var lightboxType = element.data("df-lightbox") || element.data("lightbox");
            if (lightboxType === void 0) {
                element.addClass("df-lazy-embed");
                defaults_DEARVIEWER.addLazyElement(element[0]);
            //element.dearviewer();
            } else {
                element.addClass("df-popup-" + lightboxType);
                if (lightboxType === "thumb") {
                    var thumbLayout = element.data("df-thumb-layout") || defaults_DEARVIEWER.defaults.thumbLayout;
                    var thumbURL = utils.httpsCorrection(element.data("df-thumb"));
                    element.removeAttr("data-thumb").removeAttr("data-thumb-layout");
                    var innerText = element.html().trim();
                    if (innerText === undefined || innerText === "") {
                        innerText = "Click to Open";
                    }
                    var hasShelf = element.parent().hasClass('df-has-shelf');
                    defaults_DEARVIEWER.parseThumbs({
                        element: element,
                        thumbURL: thumbURL,
                        title: innerText,
                        thumbLayout: thumbLayout,
                        hasShelf: hasShelf
                    });
                    if (hasShelf) element.after(utils_jQuery("<df-post-shelf>"));
                } else if (lightboxType === "button") {
                    if (defaults_DEARVIEWER.defaults.buttonClass) {
                        element.addClass(defaults_DEARVIEWER.defaults.buttonClass);
                    }
                }
            }
            var triggers = element.attr("data-trigger");
            if (triggers != null && triggers.length > 1) {
                triggers = triggers.split(",");
                defaults_DEARVIEWER.triggerId++;
                triggers.forEach(function(trigger) {
                    element.attr("df-trigger-id", defaults_DEARVIEWER.triggerId);
                    utils_jQuery("#" + trigger).addClass("df-trigger").attr("df-trigger", defaults_DEARVIEWER.triggerId);
                });
            }
        }
    });
    defaults_DEARVIEWER.handleLazy = function() {
        //remove removeembeds
        var appId;
        if (defaults_DEARVIEWER.removeEmbeds.length > defaults_DEARVIEWER.removeEmbedsLimit) {
            appId = defaults_DEARVIEWER.removeEmbeds.shift();
            if (appId) {
                var element = utils_jQuery("[initID='" + appId + "']");
                if (element.length > 0) {
                    var app = element.data("df-app");
                    if (app) {
                        element.attr("data-df-page", app.currentPageNumber);
                        utils.log("Removed app id " + appId);
                        app.dispose();
                        app = null;
                        var _ind = defaults_DEARVIEWER.activeEmbeds.indexOf(appId);
                        if (_ind > -1) {
                            defaults_DEARVIEWER.activeEmbeds.splice(_ind, 1);
                        }
                    }
                }
            }
        }
        //add embeds
        appId = defaults_DEARVIEWER.embeds.shift();
        if (appId) {
            var element1 = utils_jQuery("[initID='" + appId + "']");
            if (element1.length > 0) {
                if (element1.is("img")) {
                    if (element1.hasClass("df-lazy")) {
                        element1.attr("src", element1.attr("data-src"));
                        element1.removeAttr("data-src");
                        element1.removeClass("df-lazy");
                        defaults_DEARVIEWER.lazyObserver.unobserve(element1[0]);
                        defaults_DEARVIEWER.handleLazy();
                    } else {
                        utils.log("Prevent this");
                        defaults_DEARVIEWER.handleLazy();
                    }
                } else {
                    var app1 = element1.data("df-app");
                    if (app1 == null) {
                        element1.dearviewer();
                    } else {
                        app1.softInit();
                    }
                    utils.log("Created app id " + appId);
                    defaults_DEARVIEWER.activeEmbeds.push(appId);
                }
            }
        }
        if (defaults_DEARVIEWER.removeEmbeds.length <= defaults_DEARVIEWER.removeEmbedsLimit && defaults_DEARVIEWER.embeds.length == 0) {
            defaults_DEARVIEWER.checkRequestQueue = null;
        }
    };
};
/** Then we set up an intersection observer watching over those images and whenever any of those becomes visible on the view then replace the placeholder image with actual one, remove the non-loaded class and then unobserve for that element **/ defaults_DEARVIEWER.lazyObserver = {
    observe: function observe(element) {
        element = utils_jQuery(element);
        if (element.is("img")) {
            if (element.hasClass("df-lazy")) {
                element.attr("src", element.attr("data-src"));
                element.removeAttr("data-src");
                element.removeClass("df-lazy");
            }
        } else {
            element.dearviewer();
        }
    }
};
if (typeof IntersectionObserver === 'function') {
    defaults_DEARVIEWER.lazyObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            var lazyImage = utils_jQuery(entry.target);
            var initId = lazyImage.attr("initID"), index;
            if (entry.isIntersecting) {
                if (!lazyImage.attr("initID")) {
                    lazyImage.attr("initID", defaults_DEARVIEWER.initId);
                    initId = defaults_DEARVIEWER.initId.toString();
                    defaults_DEARVIEWER.initId++;
                }
                index = defaults_DEARVIEWER.removeEmbeds.indexOf(initId);
                if (index > -1) {
                    defaults_DEARVIEWER.removeEmbeds.splice(index, 1); // 2nd parameter means remove one item only
                    utils.log("Removed id " + initId + "from Removal list");
                } else {
                    index = defaults_DEARVIEWER.embeds.indexOf(initId);
                    if (index == -1) {
                        defaults_DEARVIEWER.embeds.push(initId);
                        utils.log("Added id " + initId + "to Add list");
                    }
                }
            } else {
                if (initId) {
                    index = defaults_DEARVIEWER.embeds.indexOf(initId);
                    if (index > -1) {
                        defaults_DEARVIEWER.embeds.splice(index, 1); // 2nd parameter means remove one item only
                        utils.log("Removed id " + initId + " from Add list");
                    } else {
                        index = defaults_DEARVIEWER.removeEmbeds.indexOf(initId);
                        if (index == -1) {
                            defaults_DEARVIEWER.removeEmbeds.push(initId);
                            utils.log("Added id " + initId + " to Removal list");
                        }
                    }
                }
            }
            requestCount = 0;
            if ((defaults_DEARVIEWER.removeEmbeds.length > defaults_DEARVIEWER.removeEmbedsLimit || defaults_DEARVIEWER.embeds.length > 0) && defaults_DEARVIEWER.checkRequestQueue == null) {
                //start the requestQueue
                defaults_DEARVIEWER.checkRequestQueue = function() {
                    requestCount++;
                    if (defaults_DEARVIEWER.checkRequestQueue) {
                        requestAnimationFrame(function() {
                            if (defaults_DEARVIEWER && defaults_DEARVIEWER.checkRequestQueue) defaults_DEARVIEWER.checkRequestQueue();
                        });
                    }
                    if (requestCount > 20) {
                        requestCount = 0;
                        defaults_DEARVIEWER.handleLazy();
                    }
                };
                defaults_DEARVIEWER.checkRequestQueue();
            }
        });
    });
}
var requestCount = 0;
defaults_DEARVIEWER.addLazyElement = function(element) {
    defaults_DEARVIEWER.lazyObserver.observe(element);
};
//scan the whole document for un-parsed PDFs and convert them to viewer and flipbooks
defaults_DEARVIEWER.parseElements = utils.parseElements = function() {
    defaults_DEARVIEWER.parseCSSElements();
    defaults_DEARVIEWER.parseNormalElements();
};
//jQuery events
defaults_DEARVIEWER.initUtils = function() {
    utils.detectScriptLocation();
    var body = utils_jQuery('body');
    //assign webkit so that thumbs and other functions can be optimized
    if (utils.isSafari || utils.isIOS) {
        body.addClass("df-ios");
    }
    body.on('click', function() {});
    body.on('click', '.df-posts .df-load-more-button', function() {
        var postsWrapper = utils_jQuery(this).closest(".df-posts");
        if (postsWrapper.length > 0) {
            var count = 0;
            var posts = postsWrapper.find('.df-element');
            posts.each(function() {
                var post = utils_jQuery(this);
                if (post.attr("skip-parse") === "true") {
                    //skip first 10
                    if (count < defaults_DEARVIEWER.defaults.loadMoreCount) post.removeAttr("skip-parse");
                    count++;
                }
            });
            defaults_DEARVIEWER.parseNormalElements();
        }
    });
    if (defaults_DEARVIEWER.defaults.shelfImage && defaults_DEARVIEWER.defaults.shelfImage != '') {
        body.append("<style>.df-has-shelf df-post-shelf:before, .df-has-shelf df-post-shelf:after{background-image: url('" + defaults_DEARVIEWER.defaults.shelfImage + "');}</style>");
    }
};


;// CONCATENATED MODULE: ./src/js/dearviewer/viewers/base-viewer.js
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

var base_viewer_DV = defaults_DEARVIEWER;
var base_viewer_utils = defaults_DEARVIEWER.utils;
var BaseViewer = /*#__PURE__*/ function() {
    "use strict";
    function BaseViewer(options, appContext) {
        _class_call_check(this, BaseViewer);
        this.pages = [];
        this.app = appContext;
        this.parentElement = this.app.viewerContainer;
        var viewerClass = "df-viewer " + (options.viewerClass || "");
        this.element = jQuery('<div>', {
            class: viewerClass
        });
        this.parentElement.append(this.element);
        this.wrapper = jQuery('<div>', {
            class: 'df-viewer-wrapper'
        });
        this.element.append(this.wrapper);
        this.oldBasePageNumber = 0;
        this.pages = [];
        this.minZoom = 1;
        this.maxZoom = 4;
        this.swipeThreshold = 20;
        this.stageDOM = null;
        this.events = {};
        this.arrowKeysAction = options.arrowKeysAction;
        this.clickAction = options.clickAction;
        this.scrollAction = options.scrollAction;
        this.dblClickAction = options.dblClickAction;
        this.pageBuffer = [];
        this.pageBufferSize = 10;
    }
    _create_class(BaseViewer, [
        {
            key: "init",
            value: function init() {}
        },
        {
            key: "softDispose",
            value: function softDispose() {}
        },
        {
            key: "updateBuffer",
            value: function updateBuffer(page) {}
        },
        {
            key: "pageResetCallback",
            value: function pageResetCallback(page) {}
        },
        {
            key: "initCustomControls",
            value: function initCustomControls() {}
        },
        {
            key: "_getInnerWidth",
            value: function _getInnerWidth() {
                return this.app.dimensions.containerWidth - this.app.dimensions.padding.width - this.app.dimensions.offset.width;
            }
        },
        {
            key: "_getInnerHeight",
            value: function _getInnerHeight() {
                //individual viewers don't calculate on maxHeight
                return this.app.dimensions.maxHeight - this.app.dimensions.padding.height;
            }
        },
        {
            key: "_getOuterHeight",
            value: function _getOuterHeight(height) {
                return height;
            }
        },
        {
            key: "dispose",
            value: function dispose() {
                if (this.stageDOM) {
                    this.stageDOM.removeEventListener("mousemove", this.events.mousemove, false);
                    this.stageDOM.removeEventListener("mousedown", this.events.mousedown, false);
                    this.stageDOM.removeEventListener("mouseup", this.events.mouseup, false);
                    this.stageDOM.removeEventListener("touchmove", this.events.mousemove, false);
                    this.stageDOM.removeEventListener("touchstart", this.events.mousedown, false);
                    this.stageDOM.removeEventListener("touchend", this.events.mouseup, false);
                    this.stageDOM.removeEventListener("dblclick", this.events.dblclick, false);
                    this.stageDOM.removeEventListener("scroll", this.events.scroll, false);
                    this.stageDOM.removeEventListener("mousewheel", this.events.mousewheel, false);
                    this.stageDOM.removeEventListener("DOMMouseScroll", this.events.mousewheel, false);
                }
                this.events = null;
                this.stageDOM = null;
                this.element.remove();
            }
        },
        {
            /**
   * Verify page size differences in the document
   */ key: "checkDocumentPageSizes",
            value: function checkDocumentPageSizes() {}
        },
        {
            /**
   * Determines which page to jump in viewer when a PDF link is clicked. Pagenumber passed from PDF provider.
   * Clicked link provides absolute number but a number relatiev to viewer is required.
   * @param pageNumber
   * @returns {number}
   */ key: "getViewerPageNumber",
            value: function getViewerPageNumber(pageNumber) {
                return pageNumber;
            }
        },
        {
            /**
   * Determines which page to render from PDF document. Pagenumber passed from viewer.
   * PDF document page and viewer page numbers are different in some cases.
   * @param pageNumber
   * @returns {number}
   */ key: "getDocumentPageNumber",
            value: function getDocumentPageNumber(pageNumber) {
                return pageNumber;
            }
        },
        {
            key: "getRenderContext",
            value: function getRenderContext(pdfPage, param) {
                var app = this.app, provider = app.provider, pageNumber = param.pageNumber, textureTarget = base_viewer_utils.ifdef(param.textureTarget, defaults_DEARVIEWER.TEXTURE_TARGET.VIEWER);
                var pageFit = app.dimensions.pageFit;
                var pageViewport = provider.viewPorts[pageNumber];
                var dimen = app.viewer.getTextureSize(param);
                var textureCacheIndex = null;
                if (textureTarget === defaults_DEARVIEWER.TEXTURE_TARGET.THUMB) {
                    textureCacheIndex = app.thumbSize;
                } else {
                    textureCacheIndex = Math.floor(dimen.height);
                }
                if (provider.getCache(pageNumber, textureCacheIndex) !== undefined) {
                    return;
                }
                var scale = dimen.height / pageViewport.height;
                var canvas = document.createElement('canvas'), viewport = this.filterViewPort(pdfPage.getViewport({
                    scale: scale,
                    rotation: pdfPage._pageInfo.rotate + app.options.pageRotation
                }), pageNumber);
                if (textureTarget === defaults_DEARVIEWER.TEXTURE_TARGET.THUMB) {
                    // in-case the thumb size is wider
                    if (viewport.width / viewport.height > 180 / app.thumbSize) {
                        scale = scale * 180 / viewport.width;
                    } else {
                        scale = scale * app.thumbSize / viewport.height;
                    }
                    viewport = this.filterViewPort(pdfPage.getViewport({
                        scale: scale,
                        rotation: pdfPage._pageInfo.rotate + app.options.pageRotation
                    }), pageNumber);
                }
                canvas.height = Math.floor(viewport.height);
                canvas.width = Math.floor(viewport.width);
                // if (app.pageScaling === DEARVIEWER.PAGE_SCALE.PAGE_FIT) {
                var error = Math.abs(canvas.width - dimen.width) / dimen.width * 100;
                if (error > 0.001 && error < 2) {
                    canvas.width = Math.floor(dimen.width);
                    canvas.height = Math.floor(dimen.height);
                }
                // }
                app.viewer.filterViewPortCanvas(viewport, canvas, pageNumber);
                return {
                    canvas: canvas,
                    canvasContext: canvas.getContext('2d', {
                        willReadFrequently: defaults_DEARVIEWER.defaults.canvasWillReadFrequently === true
                    }),
                    viewport: viewport
                };
            }
        },
        {
            key: "filterViewPort",
            value: function filterViewPort(viewport, pageNumber) {
                return viewport;
            }
        },
        {
            key: "getViewPort",
            value: function getViewPort(pageNumber) {
                var fallback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                var viewPort = this.app.provider.viewPorts[pageNumber];
                if (fallback) return viewPort !== null && viewPort !== void 0 ? viewPort : this.app.provider.defaultPage.viewPort;
                return viewPort;
            }
        },
        {
            key: "pagesReady",
            value: function pagesReady() {}
        },
        {
            key: "onReady",
            value: function onReady() {}
        },
        {
            key: "filterViewPortCanvas",
            value: function filterViewPortCanvas(viewport) {}
        },
        {
            key: "finalizeAnnotations",
            value: function finalizeAnnotations() {}
        },
        {
            key: "finalizeTextContent",
            value: function finalizeTextContent() {}
        },
        {
            key: "updateTextContent",
            value: function updateTextContent(pageNumber) {
                if (pageNumber == void 0) {
                    pageNumber = this.getBasePage(pageNumber);
                }
                this.app.provider.processTextContent(pageNumber, this.getTextElement(pageNumber, true));
            }
        },
        {
            key: "isActivePage",
            value: function isActivePage(pageNumber) {
                return pageNumber === this.app.currentPageNumber;
            }
        },
        {
            key: "initEvents",
            value: function initEvents() {
                var viewer = this;
                var stageDOM = viewer.stageDOM = base_viewer_utils.ifdef(viewer.stageDOM, viewer.parentElement[0]);
                if (stageDOM) {
                    // Use our detect's results. passive applied if supported, capture will be false either way.
                    // let opts = utils.supportsPassive ? {passive: true} : false; //passive is not possible. like it's in https://www.google.com/maps/
                    var opts = false;
                    stageDOM.addEventListener("mousemove", viewer.events.mousemove = viewer.mouseMove.bind(viewer), false);
                    stageDOM.addEventListener("mousedown", viewer.events.mousedown = viewer.mouseDown.bind(viewer), false);
                    stageDOM.addEventListener("mouseup", viewer.events.mouseup = viewer.mouseUp.bind(viewer), false);
                    stageDOM.addEventListener("touchmove", viewer.events.mousemove = viewer.mouseMove.bind(viewer), opts);
                    stageDOM.addEventListener("touchstart", viewer.events.mousedown = viewer.mouseDown.bind(viewer), opts);
                    stageDOM.addEventListener("touchend", viewer.events.mouseup = viewer.mouseUp.bind(viewer), false);
                    stageDOM.addEventListener("dblclick", viewer.events.dblclick = viewer.dblclick.bind(viewer), false);
                    stageDOM.addEventListener("scroll", viewer.events.scroll = viewer.onScroll.bind(viewer), false);
                    stageDOM.addEventListener("mousewheel", viewer.events.mousewheel = viewer.mouseWheel.bind(viewer), opts);
                    stageDOM.addEventListener('DOMMouseScroll', viewer.events.mousewheel = viewer.mouseWheel.bind(viewer), false);
                }
                this.startTouches = null;
                this.lastScale = null;
                this.startPoint = null;
            }
        },
        {
            key: "refresh",
            value: function refresh() {}
        },
        {
            key: "reset",
            value: function reset() {}
        },
        {
            key: "eventToPoint",
            value: function eventToPoint(event) {
                var point = {
                    x: event.clientX,
                    y: event.clientY
                };
                point.x = point.x - this.app.viewerContainer[0].getBoundingClientRect().left;
                point.y = point.y - this.app.viewerContainer[0].getBoundingClientRect().top;
                return {
                    raw: point
                };
            }
        },
        {
            key: "mouseMove",
            value: function mouseMove(event) {
                event = base_viewer_utils.fixMouseEvent(event);
                this.pinchMove(event);
                if (this.pinchZoomDirty === true) {
                    event.preventDefault();
                }
                if (this.startPoint && this.pinchZoomDirty != true) {
                    this.pan(this.eventToPoint(event));
                    event.preventDefault();
                }
            }
        },
        {
            key: "mouseDown",
            value: function mouseDown(event) {
                event = base_viewer_utils.fixMouseEvent(event);
                this.pinchDown(event);
                this.startPoint = this.eventToPoint(event);
            }
        },
        {
            key: "mouseUp",
            value: function mouseUp(event) {
                event = base_viewer_utils.fixMouseEvent(event);
                var viewer = this;
                if (viewer.pinchZoomDirty === true) {
                    event.preventDefault();
                }
                var point = viewer.eventToPoint(event);
                var element = event.target || event.originalTarget; //check to see if the clicked element is a link, if so skip turn
                var isClick = viewer.startPoint && point.x === viewer.startPoint.x && point.y === viewer.startPoint.y && element.nodeName !== "A";
                if (event.ctrlKey === true && isClick) {
                    this.zoomOnPoint(point);
                }
                this.pinchUp(event);
                this.startPoint = null;
            }
        },
        {
            key: "pinchDown",
            value: function pinchDown(event) {
            //extened in pro
            }
        },
        {
            key: "pinchUp",
            value: function pinchUp(event) {
            //extened in pro
            }
        },
        {
            key: "pinchMove",
            value: function pinchMove(event) {
            //extened in pro
            }
        },
        {
            key: "updateTemporaryScale",
            value: function updateTemporaryScale() {
                var reset = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
                // return;
                if (reset === true) {
                    this.parentElement[0].style.transform = "none";
                } else if (this.app.viewer.zoomCenter) {
                    var scale = this.app.viewer.pinchZoomUpdateScale;
                    this.parentElement[0].style.transformOrigin = this.app.viewer.zoomCenter.x + "px " + this.app.viewer.zoomCenter.y + "px";
                    this.parentElement[0].style.transform = "scale3d(" + scale + "," + scale + ",1)";
                }
            }
        },
        {
            key: "pan",
            value: function pan(point) {
                var reset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                this.panRequestStatus = defaults_DEARVIEWER.REQUEST_STATUS.ON;
                base_viewer_utils.pan(this, point, reset);
            }
        },
        {
            key: "updatePan",
            value: function updatePan() {
                this.element.css({
                    transform: "translate3d(" + this.left + "px," + this.top + "px,0)"
                });
            }
        },
        {
            key: "dblclick",
            value: function dblclick(event) {}
        },
        {
            key: "onScroll",
            value: function onScroll(event) {}
        },
        {
            key: "mouseWheel",
            value: function mouseWheel(event) {
                var viewer = this, app = this.app, delta = base_viewer_utils.getMouseDelta(event);
                //detect trackpad or CTRL + mouse scroll zoom, both use CTRL + scroll method
                var isValidZoomKey = event.ctrlKey === true;
                var isValidZoomOption = app.options.mouseScrollAction === defaults_DEARVIEWER.MOUSE_SCROLL_ACTIONS.ZOOM && (app.options.isLightBox === true || app.isFullscreen === true);
                //if it CTRL mousewheel. it is zoom.
                if (isValidZoomKey || isValidZoomOption) {
                    if (delta > 0 || delta < 0) {
                        event.preventDefault();
                        app.viewer.zoomCenter = this.eventToPoint(event).raw;
                        app.zoom(delta);
                        app.ui.update();
                    }
                } else if (app.options.mouseScrollAction === defaults_DEARVIEWER.MOUSE_SCROLL_ACTIONS.NAV) {
                    if (delta > 0) {
                        app.next();
                    } else if (delta < 0) {
                        app.prev();
                    }
                }
            }
        },
        {
            key: "zoomOnPoint",
            value: function zoomOnPoint(point) {
                this.app.viewer.zoomCenter = point.raw;
                this.app.zoom(1);
            }
        },
        {
            key: "getVisiblePages",
            value: function getVisiblePages() {
                this.visiblePagesCache = [];
                return {
                    main: this.visiblePagesCache,
                    buffer: []
                };
            }
        },
        {
            key: "getBasePage",
            value: function getBasePage() {
                return this.app.currentPageNumber;
            }
        },
        {
            key: "isFirstPage",
            value: function isFirstPage(pageNumber) {
                if (pageNumber === void 0) pageNumber = this.app.currentPageNumber;
                return pageNumber === 1;
            }
        },
        {
            key: "isLastPage",
            value: function isLastPage(pageNumber) {
                if (pageNumber === void 0) pageNumber = this.app.currentPageNumber;
                return pageNumber === this.app.pageCount;
            }
        },
        {
            key: "isEdgePage",
            value: function isEdgePage(pageNumber) {
                if (pageNumber === void 0) pageNumber = this.app.currentPageNumber;
                return pageNumber === 1 || pageNumber === this.app.pageCount;
            }
        },
        {
            key: "checkRequestQueue",
            value: function checkRequestQueue() {
                var REQUEST_STATUS = defaults_DEARVIEWER.REQUEST_STATUS;
                if (this.panRequestStatus === REQUEST_STATUS.ON) {
                    this.updatePan();
                    this.panRequestStatus = REQUEST_STATUS.OFF;
                }
                if (this.app.viewer.pinchZoomRequestStatus === REQUEST_STATUS.ON) {
                    this.app.viewer.updateTemporaryScale();
                    this.app.viewer.pinchZoomRequestStatus = REQUEST_STATUS.OFF;
                }
            }
        },
        {
            key: "isAnimating",
            value: function isAnimating() {
                return false;
            }
        },
        {
            key: "updatePendingStatusClass",
            value: function updatePendingStatusClass(status) {
                if (status === void 0) status = this.isAnimating();
                this.app.container.toggleClass("df-pending", status);
            }
        },
        {
            key: "initPages",
            value: function initPages() {}
        },
        {
            key: "resize",
            value: function resize() {}
        },
        {
            key: "determinePageMode",
            value: function determinePageMode() {}
        },
        {
            key: "zoom",
            value: function zoom() {}
        },
        {
            key: "gotoPageCallBack",
            value: function gotoPageCallBack() {
                this.requestRefresh();
            }
        },
        {
            key: "requestRefresh",
            value: function requestRefresh() {
                var status = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
                this.app.refreshRequestStatus = status === true ? base_viewer_DV.REQUEST_STATUS.ON : base_viewer_DV.REQUEST_STATUS.OFF;
            }
        },
        {
            key: "getPageByNumber",
            value: function getPageByNumber(pageNumber) {
                var pages = this.pages, page = undefined;
                if (this.app.isValidPage(pageNumber)) {
                    for(var count = 0; count < pages.length; count++){
                        if (pageNumber === pages[count].pageNumber) {
                            page = pages[count];
                            break;
                        }
                    }
                }
                return page;
            }
        },
        {
            key: "changeAnnotation",
            value: function changeAnnotation() {
                return false;
            }
        },
        {
            key: "getAnnotationElement",
            value: function getAnnotationElement(pageNumber) {
                var clean = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                var page = this.getPageByNumber(pageNumber);
                if (page === undefined) return undefined;
                if (page.annotationElement === undefined) {
                    page.annotationElement = jQuery("<div class='df-link-content'>");
                    page.contentLayer.append(page.annotationElement);
                }
                if (clean === true) {
                    page.annotationElement.html("");
                }
                return page.annotationElement[0];
            }
        },
        {
            key: "getTextElement",
            value: function getTextElement(pageNumber) {
                var clean = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                var page = this.getPageByNumber(pageNumber);
                if (page === undefined) return undefined;
                if (page.textElement === undefined) {
                    page.textElement = jQuery("<div class='df-text-content'>");
                    page.contentLayer.append(page.textElement);
                }
                if (clean === true) {
                    page.textElement.html("");
                    page.textElement.siblings(".df-auto-link-content").html("");
                }
                return page.textElement[0];
            }
        },
        {
            key: "render",
            value: function render() {}
        },
        {
            key: "textureLoadedCallback",
            value: function textureLoadedCallback(param) {}
        },
        {
            key: "handleZoom",
            value: function handleZoom() {}
        },
        {
            key: "getTextureSize",
            value: function getTextureSize(param) {
                console.error("Texture calculation missing!");
            }
        },
        {
            key: "textureHeightLimit",
            value: function textureHeightLimit(height) {
                return base_viewer_utils.limitAt(height, 1, this.app.dimensions.maxTextureHeight);
            }
        },
        {
            key: "textureWidthLimit",
            value: function textureWidthLimit(width) {
                return base_viewer_utils.limitAt(width, 1, this.app.dimensions.maxTextureWidth);
            }
        },
        {
            key: "setPage",
            value: function setPage(param) {
                base_viewer_utils.log("Set Page detected", param.pageNumber);
                var page = this.getPageByNumber(param.pageNumber);
                if (page) {
                    // page.texturePageNumber = param.pageNumber;
                    param.callback = this.textureLoadedCallback.bind(this);
                    page.loadTexture(param);
                    this.updateBuffer(page);
                    return true;
                }
                return false;
            }
        },
        {
            key: "cleanPage",
            value: function cleanPage(pageNumber) {
                return true;
            }
        },
        {
            /**
   * Check if the Page change request really makes a page change if not returns false
   * @param pageNumber
   * @returns {boolean}
   */ key: "validatePageChange",
            value: function validatePageChange(pageNumber) {
                //Fixes issue #40 - validates only if the pageNumber has changed
                return pageNumber !== this.app.currentPageNumber;
            }
        },
        {
            key: "afterControlUpdate",
            value: function afterControlUpdate() {}
        },
        {
            key: "searchPage",
            value: function searchPage(pageNumber) {
                return {
                    include: true,
                    label: this.app.provider.getLabelforPage(pageNumber)
                };
            }
        }
    ]);
    return BaseViewer;
}();


;// CONCATENATED MODULE: ./src/js/dearviewer/viewers/page.js
/* globals jQuery, pdfjsLib,THREE  */ function _assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function page_class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function page_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function page_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) page_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) page_defineProperties(Constructor, staticProps);
    return Constructor;
}
function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of(o);
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
    if (superClass) _set_prototype_of(subClass, superClass);
}
function _possible_constructor_return(self, call) {
    if (call && (page_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized(self);
}
function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of(o, p);
}
function page_type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _is_native_reflect_construct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _create_super(Derived) {
    var hasNativeReflectConstruct = _is_native_reflect_construct();
    return function _createSuperInternal() {
        var Super = _get_prototype_of(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _get_prototype_of(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possible_constructor_return(this, result);
    };
}

var page_DV = (/* unused pure expression or super */ null && (DEARVIEWER));
var page_utils = defaults_DEARVIEWER.utils;
var Page = /*#__PURE__*/ function() {
    "use strict";
    function Page() {
        page_class_call_check(this, Page);
        this.textureLoadFallback = "blank";
        this.textureStamp = "-1";
        this.textureLoaded = false;
        this.texture = "blank";
        this.textureSrc = "blank";
        this.pageNumber = undefined;
        this.contentLayer = jQuery('<div>', {
            class: "df-page-content"
        });
    }
    page_create_class(Page, [
        {
            key: "reset",
            value: function reset() {
                this.resetTexture();
                this.resetContent();
            }
        },
        {
            key: "resetTexture",
            value: function resetTexture() {
                this.textureLoaded = false;
                this.textureStamp = "-1";
                this.loadTexture({
                    texture: this.textureLoadFallback
                });
                this.contentLayer.removeClass("df-content-loaded");
            }
        },
        {
            key: "clearTexture",
            value: function clearTexture() {
                this.loadTexture({
                    texture: this.textureLoadFallback
                });
            }
        },
        {
            key: "resetContent",
            value: function resetContent() {}
        },
        {
            key: "loadTexture",
            value: function loadTexture(param) {}
        },
        {
            key: "getTexture",
            value: function getTexture() {
                var clone = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
                var texture = this.textureSrc;
                if (clone === true && texture && texture.cloneNode) {
                    texture = texture.cloneNode();
                    if (texture.getContext) texture.getContext('2d').drawImage(this.textureSrc, 0, 0);
                }
                return texture;
            }
        },
        {
            key: "setLoading",
            value: function setLoading() {}
        },
        {
            key: "updateTextureLoadStatus",
            value: function updateTextureLoadStatus(textureLoaded) {
                this.textureLoaded = textureLoaded === true;
                page_utils.log((this.textureLoaded === true ? "Loaded " : "Loading ") + this.textureStamp + " for " + this.pageNumber);
                this.contentLayer.toggleClass("df-content-loaded", textureLoaded === true);
                this.setLoading();
            }
        },
        {
            /**
   *
   * @param pageNumber
   * @param textureSize
   * @returns {boolean} true if new stamp is set
   */ key: "changeTexture",
            value: function changeTexture(pageNumber, textureSize) {
                var page = this;
                var reqStamp = pageNumber + "|" + textureSize;
                if (page.textureStamp !== reqStamp) {
                    page_utils.log("Page " + pageNumber + " : texture changed from - " + page.textureStamp + " to " + reqStamp);
                    page.textureLoaded = false;
                    // page.element.attr("stamp", reqStamp);
                    page.textureStamp = reqStamp;
                    page.updateTextureLoadStatus(false);
                    return true;
                }
                return false;
            }
        }
    ]);
    return Page;
}();
var Page2D = /*#__PURE__*/ function(Page) {
    "use strict";
    _inherits(Page2D, Page);
    var _super = _create_super(Page2D);
    function Page2D(options) {
        page_class_call_check(this, Page2D);
        var _this;
        _this = _super.call(this);
        _this.canvasMode = null;
        if (options && options.parentElement) _this.parentElement = options.parentElement;
        _this.init();
        return _this;
    }
    page_create_class(Page2D, [
        {
            key: "init",
            value: function init() {
                var element = this.element = jQuery('<div>', {
                    class: 'df-page'
                });
                element[0].appendChild(this.contentLayer[0]);
                this.texture = new Image();
                if (this.parentElement) this.parentElement[0].append(element[0]);
            }
        },
        {
            key: "resetContent",
            value: function resetContent() {
                if (this.annotationElement !== undefined) this.annotationElement.html("");
                if (this.textElement !== undefined) this.textElement.html("");
            }
        },
        {
            key: "setLoading",
            value: function setLoading() {
                this.element.toggleClass("df-loading", this.textureLoaded !== true);
            }
        },
        {
            key: "loadTexture",
            value: function loadTexture(param) {
                var page = this, texture = param.texture, callback = param.callback;
                function completed() {
                    page.textureSrc = texture;
                    page.element.css({
                        backgroundImage: page_utils.bgImage(texture)
                    });
                    page.updateTextureLoadStatus(true);
                    if (typeof callback == 'function') callback(param);
                }
                if (page.canvasMode === null && texture && texture.nodeName === "CANVAS") page.canvasMode = true;
                if (page.canvasMode === true) {
                    page.element.find(">canvas").remove();
                    if (texture !== page.textureLoadFallback) {
                        page.textureSrc = texture;
                        page.element.append(jQuery(texture));
                    // page.element.width(texture.width).height(texture.height);
                    }
                    page.updateTextureLoadStatus(true);
                    if (typeof callback == 'function') callback(param);
                } else {
                    if (texture === page.textureLoadFallback) {
                        completed();
                    } else {
                        page.texture.onload = completed;
                        page.texture.src = texture;
                    }
                }
            }
        },
        {
            key: "updateCSS",
            value: function updateCSS(css) {
                var page = this;
                page.element.css(css);
            }
        },
        {
            key: "resetCSS",
            value: function resetCSS() {
                var page = this;
                page.element.css({
                    transform: '',
                    boxShadow: '',
                    display: "block"
                });
            }
        }
    ]);
    return Page2D;
}(Page);


;// CONCATENATED MODULE: ./src/js/dearviewer/viewers/reader.js
function reader_assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function reader_class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function reader_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function reader_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) reader_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) reader_defineProperties(Constructor, staticProps);
    return Constructor;
}
function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
    } else {
        _get = function get(target, property, receiver) {
            var base = _super_prop_base(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver || target);
            }
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
}
function reader_get_prototype_of(o) {
    reader_get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return reader_get_prototype_of(o);
}
function reader_inherits(subClass, superClass) {
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
    if (superClass) reader_set_prototype_of(subClass, superClass);
}
function reader_possible_constructor_return(self, call) {
    if (call && (reader_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return reader_assert_this_initialized(self);
}
function reader_set_prototype_of(o, p) {
    reader_set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return reader_set_prototype_of(o, p);
}
function _super_prop_base(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = reader_get_prototype_of(object);
        if (object === null) break;
    }
    return object;
}
function reader_type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function reader_is_native_reflect_construct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function reader_create_super(Derived) {
    var hasNativeReflectConstruct = reader_is_native_reflect_construct();
    return function _createSuperInternal() {
        var Super = reader_get_prototype_of(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = reader_get_prototype_of(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return reader_possible_constructor_return(this, result);
    };
}



var reader_utils = defaults_DEARVIEWER.utils;
var Reader = /*#__PURE__*/ function(BaseViewer) {
    "use strict";
    reader_inherits(Reader, BaseViewer);
    var _super = reader_create_super(Reader);
    function Reader(options, appContext) {
        reader_class_call_check(this, Reader);
        var _this;
        options.viewerClass = "df-reader";
        appContext.options.mouseScrollAction = defaults_DEARVIEWER.MOUSE_SCROLL_ACTIONS.NONE;
        _this = _super.call(this, options, appContext);
        _this.app.jumpStep = 1;
        _this.minZoom = 0.25;
        _this.stackCount = _this.app.pageCount;
        _this.app.options.paddingLeft = 0;
        _this.app.options.paddingRight = 0;
        _this.app.options.paddingTop = 10;
        _this.app.options.paddingBottom = _this.app.options.controlsFloating === true ? 20 : 10;
        _this.app.pageScaling = _this.app.options.pageScale;
        _this.acceptAppMouseEvents = true; //fixes #236 doublemouse events were passed
        _this.scrollStatus = defaults_DEARVIEWER.REQUEST_STATUS.OFF;
        _this.deltaPanX = 0;
        _this.deltaPanY = 0;
        // this.app.options.pageSize = DEARVIEWER.PAGE_
        // this.app.options.hideControls = "zoomIn,zoomOut";
        appContext._viewerPrepared();
        _this.zoomViewer = reader_assert_this_initialized(_this); //todo zoomviewer is a bad idea at base
        return _this;
    }
    reader_create_class(Reader, [
        {
            key: "init",
            value: function init() {
                _get(reader_get_prototype_of(Reader.prototype), "init", this).call(this);
                this.initEvents();
                this.initPages();
                this.initScrollBar();
            }
        },
        {
            key: "initEvents",
            value: function initEvents() {
                this.stageDOM = this.element[0];
                _get(reader_get_prototype_of(Reader.prototype), "initEvents", this).call(this);
            }
        },
        {
            key: "initPages",
            value: function initPages() {
                this.stackCount = this.app.pageCount;
                for(var count = 0; count < this.stackCount; count++){
                    var page = new Page2D({
                        parentElement: this.wrapper
                    });
                    page.index = count; //just reference for debugging
                    page.viewer = this;
                    this.pages.push(page);
                }
            }
        },
        {
            key: "initScrollBar",
            value: function initScrollBar() {
                this.scrollBar = jQuery("<div class='df-reader-scrollbar'>");
                //adding scrollbar to viewer.wrapper doesn't fit properly with mobile momentum scroll, shaky movement is detected
                this.scrollBar.appendTo(this.app.container);
                //solved #237
                this.scrollPageNumber = jQuery("<div class='df-reader-scroll-page-number'>").appendTo(this.app.container);
            }
        },
        {
            key: "afterControlUpdate",
            value: function afterControlUpdate() {
                if (this.scrollBar === void 0) return;
                this.scrollBar[0].innerHTML = this.app.getCurrentLabel();
                if (this.app.provider.pageLabels) {
                    this.scrollPageNumber[0].innerHTML = this.app.getCurrentLabel() + "<div>(" + this.app.currentPageNumber + " of " + this.app.pageCount + ")</div>";
                } else {
                    this.scrollPageNumber[0].innerHTML = this.app.getCurrentLabel() + "<div>of " + this.app.pageCount + "</div>";
                }
            }
        },
        {
            key: "updateBuffer",
            value: function updateBuffer(page) {
                if (page.textureStamp === "-1" || page.pageNumber === void 0) return;
                var index = page.pageNumber, farthest = page.pageNumber, farthestIndex = 0;
                for(var count = 0; count < this.pageBuffer.length; count++){
                    var _pageNumber = this.pageBuffer[count].pageNumber;
                    if (index === _pageNumber) {
                        reader_utils.log("Page " + index + " already in buffer, skipping");
                        return;
                    }
                    if (Math.abs(this.app.currentPageNumber - _pageNumber) > Math.abs(this.app.currentPageNumber - farthest)) {
                        farthest = _pageNumber;
                        farthestIndex = count;
                    }
                }
                this.pageBuffer.push(page);
                if (this.pageBuffer.length > this.pageBufferSize) {
                    reader_utils.log("Farthest buffer: " + farthest);
                    this.pageBuffer[farthestIndex].reset();
                    this.pageBuffer.splice(farthestIndex, 1);
                }
            }
        },
        {
            key: "initCustomControls",
            value: function initCustomControls() {
                var ui = this.app.ui;
                var controls = ui.controls;
                controls.openRight.hide();
                controls.openLeft.hide();
            }
        },
        {
            key: "dispose",
            value: function dispose() {
                _get(reader_get_prototype_of(Reader.prototype), "dispose", this).call(this);
                if (this.scrollBar) this.scrollBar.remove();
                if (this.scrollPageNumber) this.scrollPageNumber.remove();
                this.element.remove();
            }
        },
        {
            key: "_getInnerHeight",
            value: function _getInnerHeight() {
                var height = _get(reader_get_prototype_of(Reader.prototype), "_getInnerHeight", this).call(this), appHeight = this.app.dimensions.maxHeight - this.app.dimensions.padding.height;
                var viewPort = this.app.dimensions.defaultPage.viewPort;
                var maxWidth = this.app.dimensions.containerWidth - 20 - this.app.dimensions.padding.width;
                if (this.app.pageScaling === defaults_DEARVIEWER.PAGE_SCALE.ACTUAL) maxWidth = this.app.provider.defaultPage.viewPort.width * 1;
                //if it's page fit it's from the available height
                var maxHeight = appHeight;
                if (this.app.pageScaling === defaults_DEARVIEWER.PAGE_SCALE.PAGE_WIDTH) maxHeight = viewPort.height * 100;
                else if (this.app.pageScaling === defaults_DEARVIEWER.PAGE_SCALE.AUTO) maxHeight = viewPort.height * 1.5;
                else if (this.app.pageScaling === defaults_DEARVIEWER.PAGE_SCALE.ACTUAL) maxHeight = viewPort.height * 1;
                maxHeight = maxHeight - 2;
                this._containCover = reader_utils.contain(viewPort.width, viewPort.height, maxWidth, maxHeight);
                maxHeight = Math.min(appHeight, this._containCover.height + 2);
                this.app.pageScaleValue = this._containCover.height / viewPort.height;
                return this.app.dimensions.isFixedHeight ? appHeight : maxHeight;
            }
        },
        {
            key: "handleZoom",
            value: function handleZoom() {
                var app = this.app;
                var maxZoom = this.maxZoom = 4, // todo find a solution than can land properly in zoom value 1.
                zoomValue = app.zoomValue;
                if (app.pendingZoom === true && app.zoomDelta != null) {
                    var delta = app.zoomDelta;
                    zoomValue = delta > 0 ? zoomValue * app.options.zoomRatio : zoomValue / app.options.zoomRatio;
                } else if (this.lastScale != null) {
                    zoomValue *= this.lastScale;
                    this.lastScale = null;
                }
                zoomValue = reader_utils.limitAt(zoomValue, this.minZoom, maxZoom);
                app.zoomValueChange = zoomValue / app.zoomValue;
                app.zoomChanged = app.zoomValue !== zoomValue;
                app.zoomValue = zoomValue;
            }
        },
        {
            key: "resize",
            value: function resize() {
                var viewer = this;
                var app = viewer.app;
                var dimensions = app.dimensions, padding = app.dimensions.padding;
                var shiftHeight = this.shiftHeight = 0, shiftWidth = 0;
                this.element.css({
                    top: -shiftHeight,
                    bottom: -shiftHeight,
                    right: -shiftWidth,
                    left: -shiftWidth,
                    paddingTop: padding.top,
                    paddingRight: padding.right,
                    paddingBottom: padding.bottom,
                    paddingLeft: padding.left
                });
                var topVisiblePage = viewer.getVisiblePages().main[0] - 1;
                topVisiblePage = viewer.pages[topVisiblePage].element[0];
                var rect = topVisiblePage.getBoundingClientRect();
                var rectParent = this.parentElement[0].getBoundingClientRect();
                for(var count = 0; count < viewer.pages.length; count++){
                    var page = viewer.pages[count];
                    var viewPort = viewer.getViewPort(count + 1, true);
                    // page.element
                    var els = page.element[0].style;
                    els.height = Math.floor(viewPort.height * app.pageScaleValue * app.zoomValue) + "px";
                    els.width = Math.floor(viewPort.width * app.pageScaleValue * app.zoomValue) + "px";
                }
                if (viewer.oldScrollHeight != viewer.element[0].scrollHeight && viewer.oldScrollHeight !== void 0) {
                    var delta = viewer.element[0].scrollHeight / viewer.oldScrollHeight;
                    viewer.skipScrollCheck = true;
                    var top = topVisiblePage.offsetTop + topVisiblePage.clientTop - (rect.top - rectParent.top + topVisiblePage.clientTop) * delta, left = topVisiblePage.offsetLeft + topVisiblePage.clientLeft - (rect.left - rectParent.left + topVisiblePage.clientLeft) * delta;
                    //10 is margin that zooms too and reset to 10
                    top += (delta - 1) * 10 / 2;
                    left += (delta - 1) * 10 / 2;
                    var _this_zoomCenter;
                    this.zoomCenter = (_this_zoomCenter = this.zoomCenter) !== null && _this_zoomCenter !== void 0 ? _this_zoomCenter : {
                        x: 0,
                        y: 0 //(viewer.element[0].offsetHeight) / 2
                    };
                    //if pinch zoom , then move to center
                    top += (delta - 1) * this.zoomCenter.y;
                    left += (delta - 1) * this.zoomCenter.x;
                    this.zoomCenter = null;
                    viewer.element[0].scrollTop = top;
                    viewer.element[0].scrollLeft = left;
                    viewer.skipScrollCheck = false;
                }
                viewer.oldScrollHeight = viewer.element[0].scrollHeight;
                // this.updatePendingStatusClass();
                this.scrollBar[0].style.transform = "none";
                this.updateScrollBar();
            }
        },
        {
            key: "onReady",
            value: function onReady() {
                this.gotoPageCallBack();
                this.oldScrollHeight = this.element[0].scrollHeight;
            }
        },
        {
            key: "refresh",
            value: function refresh() {
                var viewer = this;
                var app = this.app;
                var visible = viewer.getVisiblePages().main;
                for(var _pageCount = 0; _pageCount < visible.length; _pageCount++){
                    var page = void 0, _pageNumber = visible[_pageCount];
                    page = viewer.pages[_pageNumber - 1];
                    var pageChanged = _pageNumber !== page.pageNumber;
                    //Determine Page Situation
                    if (pageChanged) {
                        //texture reset
                        page.resetTexture();
                        this.app.textureRequestStatus = defaults_DEARVIEWER.REQUEST_STATUS.ON;
                    }
                    page.element.attr("number", _pageNumber);
                    page.pageNumber = _pageNumber;
                // page.name = _pageNumber.toString();
                }
                viewer.requestRefresh(false);
                app.textureRequestStatus = defaults_DEARVIEWER.REQUEST_STATUS.ON;
            // viewer.element.toggleClass("df-noscroll", !(viewer.element[0].scrollHeight > viewer.element[0].offsetHeight));
            }
        },
        {
            key: "isAnimating",
            value: function isAnimating() {
                // if (this.scrollStatus === DEARVIEWER.REQUEST_STATUS.ON) console.log("animating");
                return this.scrollStatus === defaults_DEARVIEWER.REQUEST_STATUS.ON || this.scrollStatus === defaults_DEARVIEWER.REQUEST_STATUS.COUNT;
            }
        },
        {
            key: "checkRequestQueue",
            value: function checkRequestQueue() {
                _get(reader_get_prototype_of(Reader.prototype), "checkRequestQueue", this).call(this);
                if (this.scrollStatus === defaults_DEARVIEWER.REQUEST_STATUS.ON) {
                    this.scrollStatus = defaults_DEARVIEWER.REQUEST_STATUS.OFF;
                }
                if (this.scrollStatus === defaults_DEARVIEWER.REQUEST_STATUS.COUNT) {
                    this.scrollStatus = defaults_DEARVIEWER.REQUEST_STATUS.ON;
                }
            }
        },
        {
            key: "isActivePage",
            value: function isActivePage(pageNumber) {
                return this.visiblePagesCache !== void 0 && this.visiblePagesCache.includes(pageNumber);
            }
        },
        {
            key: "getVisiblePages",
            value: function getVisiblePages() {
                var visiblePages = reader_utils.getVisibleElements({
                    container: this.element[0],
                    elements: this.wrapper[0].children
                });
                if (visiblePages.length === 0) {
                    visiblePages = [
                        this.app.currentPageNumber
                    ];
                } else {
                    visiblePages = visiblePages.splice(0, this.pageBufferSize);
                }
                this.visiblePagesCache = visiblePages;
                return {
                    main: visiblePages,
                    buffer: []
                };
            }
        },
        {
            key: "getPageByNumber",
            value: function getPageByNumber(pageNumber) {
                var page = this.pages[pageNumber - 1];
                if (page === undefined) {
                    reader_utils.log("Page Not found for: " + pageNumber);
                }
                return page;
            }
        },
        {
            key: "onScroll",
            value: function onScroll(event) {
                var viewer = this;
                var center = viewer.element[0].scrollTop + viewer.app.dimensions.containerHeight / 2; // Triggers reflow
                var visible = viewer.getVisiblePages().main;
                var pageIndex = visible[0];
                for(var i = 0; i < visible.length; i++){
                    pageIndex = visible[i];
                    var element = viewer.pages[pageIndex - 1].element[0];
                    var top = element.offsetTop + element.clientTop;
                    if (top <= center && element.clientHeight + top >= center) {
                        break;
                    } else if (i > 0 && top > center && element.clientHeight + top >= center) {
                        pageIndex = visible[i - 1];
                        break;
                    }
                }
                viewer.skipScrollIntoView = true;
                viewer.app.gotoPage(pageIndex);
                viewer.skipScrollIntoView = false;
                viewer.updateScrollBar();
                event.preventDefault && event.preventDefault();
                event.stopPropagation();
                viewer.requestRefresh();
                this.scrollStatus = defaults_DEARVIEWER.REQUEST_STATUS.COUNT;
                defaults_DEARVIEWER.handlePopup(viewer.element, false);
            }
        },
        {
            key: "updateScrollBar",
            value: function updateScrollBar() {
                var el = this.element[0], container = this.app.container[0], top = 60, bottom = 60, height = 40;
                // this.scrollBar[0].style.top = (el.scrollTop + ((el.offsetHeight - height) * el.scrollTop / (el.scrollHeight - el.offsetHeight))) + "px";
                // this.scrollBar[0].style.top = (el.scrollTop + top + ((el.offsetHeight - height - top - bottom) * el.scrollTop / (el.scrollHeight - el.offsetHeight))) + "px";
                // this.scrollBar[0].style.right = -el.scrollLeft + "px";
                var x = el.scrollLeft, y = top + (el.offsetHeight - height - top - bottom) * el.scrollTop / (el.scrollHeight - el.offsetHeight);
                if (isNaN(y)) {
                    y = top;
                }
                this.scrollBar.lastY = y;
                this.scrollBar[0].style.transform = 'translateY(' + y + 'px)';
            }
        },
        {
            key: "validatePageChange",
            value: function validatePageChange(pageNumber) {
                true;
            }
        },
        {
            key: "gotoPageCallBack",
            value: function gotoPageCallBack() {
                var viewer = this;
                if (viewer.skipScrollIntoView !== true) {
                    var page = viewer.getPageByNumber(viewer.app.currentPageNumber);
                    if (page != null) reader_utils.scrollIntoView(page.element[0], viewer.element[0]);
                }
                viewer.skipScrollIntoView = false;
                viewer.requestRefresh();
            }
        },
        {
            key: "getTextureSize",
            value: function getTextureSize(param) {
                var viewPort = this.app.provider.viewPorts[1];
                if (this.app.provider.viewPorts[param.pageNumber]) {
                    viewPort = this.app.provider.viewPorts[param.pageNumber];
                }
                var pixelRatio = this.app.options.pixelRatio;
                return {
                    height: viewPort.height * this.app.zoomValue * this.app.pageScaleValue * pixelRatio,
                    width: viewPort.width * this.app.zoomValue * this.app.pageScaleValue * pixelRatio
                };
            }
        },
        {
            key: "textureLoadedCallback",
            value: function textureLoadedCallback(param) {
                var page = this.getPageByNumber(param.pageNumber), app = this.app;
                var viewPort = this.getViewPort(param.pageNumber, true);
                page.element.height(Math.floor(viewPort.height * app.pageScaleValue * app.zoomValue)).width(Math.floor(viewPort.width * app.pageScaleValue * app.zoomValue));
            }
        },
        {
            key: "pan",
            value: function pan(point) {
                var reset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                var viewer = this;
                var origin = viewer.startPoint;
                var deltay = point.raw.y - origin.raw.y, deltax = point.raw.x - origin.raw.x;
                viewer.deltaPanY += deltay;
                viewer.deltaPanX += deltax;
                viewer.panRequestStatus = defaults_DEARVIEWER.REQUEST_STATUS.ON;
                if (reset === false) {
                    viewer.startPoint = point;
                }
            }
        },
        {
            key: "updatePan",
            value: function updatePan() {
                this.element[0].scrollTop = this.element[0].scrollTop - this.deltaPanY;
                this.element[0].scrollLeft = this.element[0].scrollLeft - this.deltaPanX;
                this.deltaPanY = 0;
                this.deltaPanX = 0;
            }
        },
        {
            key: "mouseMove",
            value: function mouseMove(event) {
                // check if scroll bar is moved.
                if (this.startPoint && this.isScrollBarPressed) {
                    var _event = reader_utils.fixMouseEvent(event);
                    var point = this.eventToPoint(_event);
                    var el = this.element[0], top = 60, bottom = 60, height = 40, estY = this.scrollBar.lastY - (this.startPoint.raw.y - point.raw.y);
                    this.scrollBar.lastY = estY;
                    el.scrollTop = (estY - top) * (el.scrollHeight - el.offsetHeight) / (el.offsetHeight - height - top - bottom);
                    this.startPoint = point;
                    event.preventDefault();
                    return;
                }
                //if it's swipe scroll we need to leave goign further and use system swipe-scroll
                if (event.touches && event.touches.length < 2) return;
                _get(reader_get_prototype_of(Reader.prototype), "mouseMove", this).call(this, event);
            }
        },
        {
            key: "mouseDown",
            value: function mouseDown(event) {
                _get(reader_get_prototype_of(Reader.prototype), "mouseDown", this).call(this, event);
                if (event.srcElement === this.scrollBar[0]) {
                    this.isScrollBarPressed = true;
                    this.scrollBar.addClass("df-active");
                    this.scrollPageNumber.addClass("df-active");
                }
            }
        },
        {
            key: "mouseUp",
            value: function mouseUp(event) {
                _get(reader_get_prototype_of(Reader.prototype), "mouseUp", this).call(this, event);
                if (this.isScrollBarPressed =  true && this.scrollBar) {
                    this.isScrollBarPressed = false;
                    this.scrollBar.removeClass("df-active");
                    this.scrollPageNumber.removeClass("df-active");
                }
            }
        }
    ]);
    return Reader;
}(BaseViewer);


;// CONCATENATED MODULE: ./src/js/dearviewer/viewers/flipbook.js
function flipbook_assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function flipbook_class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function flipbook_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function flipbook_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) flipbook_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) flipbook_defineProperties(Constructor, staticProps);
    return Constructor;
}
function flipbook_get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        flipbook_get = Reflect.get;
    } else {
        flipbook_get = function get(target, property, receiver) {
            var base = flipbook_super_prop_base(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver || target);
            }
            return desc.value;
        };
    }
    return flipbook_get(target, property, receiver || target);
}
function flipbook_get_prototype_of(o) {
    flipbook_get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return flipbook_get_prototype_of(o);
}
function flipbook_inherits(subClass, superClass) {
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
    if (superClass) flipbook_set_prototype_of(subClass, superClass);
}
function flipbook_possible_constructor_return(self, call) {
    if (call && (flipbook_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return flipbook_assert_this_initialized(self);
}
function flipbook_set_prototype_of(o, p) {
    flipbook_set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return flipbook_set_prototype_of(o, p);
}
function flipbook_super_prop_base(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = flipbook_get_prototype_of(object);
        if (object === null) break;
    }
    return object;
}
function flipbook_type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function flipbook_is_native_reflect_construct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function flipbook_create_super(Derived) {
    var hasNativeReflectConstruct = flipbook_is_native_reflect_construct();
    return function _createSuperInternal() {
        var Super = flipbook_get_prototype_of(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = flipbook_get_prototype_of(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return flipbook_possible_constructor_return(this, result);
    };
}



var flipbook_utils = defaults_DEARVIEWER.utils;
var BaseFlipBookViewer = /*#__PURE__*/ function(BaseViewer) {
    "use strict";
    flipbook_inherits(BaseFlipBookViewer, BaseViewer);
    var _super = flipbook_create_super(BaseFlipBookViewer);
    function BaseFlipBookViewer(options, appContext) {
        flipbook_class_call_check(this, BaseFlipBookViewer);
        var _this;
        options.viewerClass = "df-flipbook " + (options.viewerClass || "");
        _this = _super.call(this, options, appContext);
        _this.isFlipBook = true;
        _this.sheets = [];
        _this.isRTL = _this.app.isRTL;
        _this.foldSense = 50;
        _this.isOneSided = false;
        var _options_stackCount;
        _this.stackCount = (_options_stackCount = options.stackCount) !== null && _options_stackCount !== void 0 ? _options_stackCount : 6;
        _this.annotedPage = null;
        _this.pendingAnnotations = [];
        _this.seamPosition = 0;
        _this.dragSheet = null;
        _this.drag = null;
        _this.soundOn = options.enableSound === true;
        _this.soundFile = null;
        _this.minZoom = 1;
        _this.maxZoom = 4;
        _this.pureMaxZoom = 4;
        if (_this.app.options.pageSize === defaults_DEARVIEWER.FLIPBOOK_PAGE_SIZE.AUTO || _this.app.options.pageSize === defaults_DEARVIEWER.FLIPBOOK_PAGE_SIZE.DOUBLE_INTERNAL) {
            _this.app.checkSecondPage = true;
        }
        // if (this.app.options.pageScale === null) {
        _this.app.pageScaling = defaults_DEARVIEWER.PAGE_SCALE.PAGE_FIT;
        // }
        options.viewerClass = "";
        _this.zoomViewer = new ZoomViewer(options, appContext);
        return _this;
    }
    flipbook_create_class(BaseFlipBookViewer, [
        {
            key: "init",
            value: function init() {
                flipbook_get(flipbook_get_prototype_of(BaseFlipBookViewer.prototype), "init", this).call(this);
                this.initSound();
                var app = this.app;
                this.pageMode = app.options.pageMode === defaults_DEARVIEWER.FLIPBOOK_PAGE_MODE.AUTO ? flipbook_utils.isMobile || app.pageCount <= 2 ? defaults_DEARVIEWER.FLIPBOOK_PAGE_MODE.SINGLE : defaults_DEARVIEWER.FLIPBOOK_PAGE_MODE.DOUBLE : app.options.pageMode;
                this.singlePageMode = app.options.singlePageMode || (flipbook_utils.isMobile ? defaults_DEARVIEWER.FLIPBOOK_SINGLE_PAGE_MODE.BOOKLET : defaults_DEARVIEWER.FLIPBOOK_SINGLE_PAGE_MODE.ZOOM);
                this.updatePageMode();
                this.rightSheetHeight = this.leftSheetHeight = this._defaultPageSize.height;
                this.leftSheetWidth = this.rightSheetWidth = this._defaultPageSize.width;
                this.leftSheetTop = this.rightSheetTop = (this.availablePageHeight() - this._defaultPageSize.height) / 2;
                this.zoomViewer.rightSheetHeight = this.zoomViewer.leftSheetHeight = this._defaultPageSize.height;
                this.zoomViewer.leftSheetWidth = this.zoomViewer.rightSheetWidth = this._defaultPageSize.width;
            }
        },
        {
            key: "determineHeight",
            value: function determineHeight() {}
        },
        {
            key: "initCustomControls",
            value: function initCustomControls() {
                flipbook_get(flipbook_get_prototype_of(BaseFlipBookViewer.prototype), "initCustomControls", this).call(this);
                var viewer = this;
                var app = this.app;
                var ui = app.ui;
                var controls = ui.controls;
                var text = app.options.text, icons = app.options.icons;
                //region Sound Button
                controls.sound = flipbook_utils.createBtn('sound', icons['sound'], text.toggleSound).on("click", function() {
                    viewer.soundOn = !viewer.soundOn;
                    ui.updateSound();
                });
                //Updates sound on click of sound button
                ui.updateSound = function() {
                    if (viewer.soundOn === false) controls.sound.addClass("disabled");
                    else controls.sound.removeClass("disabled");
                };
                //immediate check
                ui.updateSound();
            }
        },
        {
            key: "dispose",
            value: function dispose() {
                flipbook_get(flipbook_get_prototype_of(BaseFlipBookViewer.prototype), "dispose", this).call(this);
                for(var count = 0; count < this.sheets.length; count++){
                    var sheet = this.sheets[count];
                    if (sheet && sheet.currentTween) {
                        sheet.currentTween.stop();
                        sheet.currentTween = null;
                    }
                }
                this.zoomViewer.dispose();
                this.soundFile = null;
            }
        },
        {
            key: "determinePageMode",
            value: function determinePageMode() {
                var app = this.app;
                var oldPageMode = this.pageMode;
                if (this.app.pageCount < 3) {
                    this.pageMode = defaults_DEARVIEWER.FLIPBOOK_PAGE_MODE.SINGLE;
                } else if (this.app.options.pageMode === defaults_DEARVIEWER.FLIPBOOK_PAGE_MODE.AUTO && this.pageModeChangedManually != true) {
                    if (flipbook_utils.isMobile === true) {
                        if (this.app.dimensions.isAutoHeight && this.app.dimensions.isFixedHeight == false) {
                            //when the flipbook is autoheight but the fullscreen mode is fixed height
                            var singlePageModeHeight = this._calculateInnerHeight(true);
                            var doublePageModeHeight = this._calculateInnerHeight(false);
                            var compareWidth = app.dimensions.stage.innerWidth + (app.options.sideMenuOverlay != true && app.isSideMenuOpen ? 220 : 0);
                            this.pageMode = singlePageModeHeight > doublePageModeHeight * 1.1 && compareWidth < 768 ? defaults_DEARVIEWER.FLIPBOOK_PAGE_MODE.SINGLE : defaults_DEARVIEWER.FLIPBOOK_PAGE_MODE.DOUBLE;
                            //calculating innerheight affects other calculations, like this._defaultPageSize, so if the end result is not single page mode, calculate normally.
                            this._calculateInnerHeight();
                        } else {
                            var compareWidth1 = app.dimensions.stage.innerWidth + (app.options.sideMenuOverlay != true && app.isSideMenuOpen ? 220 : 0);
                            this.pageMode = app.dimensions.stage.innerHeight > compareWidth1 * 1.1 && compareWidth1 < 768 ? defaults_DEARVIEWER.FLIPBOOK_PAGE_MODE.SINGLE : defaults_DEARVIEWER.FLIPBOOK_PAGE_MODE.DOUBLE;
                        }
                    }
                    if (this.pageMode != oldPageMode) {
                        this.setPageMode({
                            isSingle: this.pageMode == defaults_DEARVIEWER.FLIPBOOK_PAGE_MODE.SINGLE
                        });
                    }
                }
            }
        },
        {
            key: "initSound",
            value: function initSound() {
                this.soundFile = document.createElement("audio");
                this.soundFile.setAttribute("src", this.app.options.soundFile + "?ver=" + defaults_DEARVIEWER.version);
                this.soundFile.setAttribute("type", "audio/mpeg");
            }
        },
        {
            key: "playSound",
            value: function playSound() {
                var viewer = this;
                try {
                    if (viewer.app.userHasInteracted === true && viewer.soundOn === true) {
                        viewer.soundFile.currentTime = 0;
                        viewer.soundFile.play();
                    }
                } catch (error) {}
            }
        },
        {
            key: "checkDocumentPageSizes",
            value: function checkDocumentPageSizes() {
                var provider = this.app.provider;
                if (provider.pageSize === defaults_DEARVIEWER.FLIPBOOK_PAGE_SIZE.AUTO) {
                    if (provider._page2Ratio && provider._page2Ratio > provider.defaultPage.pageRatio * 1.5) {
                        provider.pageSize = defaults_DEARVIEWER.FLIPBOOK_PAGE_SIZE.DOUBLE_INTERNAL;
                    } else {
                        provider.pageSize = defaults_DEARVIEWER.FLIPBOOK_PAGE_SIZE.SINGLE;
                    }
                }
                if (provider.pageSize === defaults_DEARVIEWER.FLIPBOOK_PAGE_SIZE.DOUBLE_INTERNAL) {
                    provider.pageCount = provider.numPages === 1 ? 1 : provider.numPages * 2 - 2;
                }
                if (provider.pageSize === defaults_DEARVIEWER.FLIPBOOK_PAGE_SIZE.DOUBLE_COVER_BACK || provider.pageSize === defaults_DEARVIEWER.FLIPBOOK_PAGE_SIZE.DOUBLE) {
                    provider.pageCount = provider.numPages * 2;
                }
            }
        },
        {
            key: "getViewerPageNumber",
            value: function getViewerPageNumber(pageNumber) {
                //case double internal
                if (this.app.provider.pageSize === defaults_DEARVIEWER.FLIPBOOK_PAGE_SIZE.DOUBLE_INTERNAL && pageNumber > 2) {
                    pageNumber = pageNumber * 2 - 1;
                }
                if (this.app.provider.pageSize === defaults_DEARVIEWER.FLIPBOOK_PAGE_SIZE.DOUBLE_COVER_BACK && pageNumber > 2) {
                    pageNumber = pageNumber * 2 - 1; //todo not sure, we don't have a document yet with links. Since this layout is only intended with printing
                }
                return pageNumber;
            }
        },
        {
            key: "getDocumentPageNumber",
            value: function getDocumentPageNumber(pageNumber) {
                //case double internal
                if (this.app.provider.pageSize === defaults_DEARVIEWER.FLIPBOOK_PAGE_SIZE.DOUBLE_INTERNAL && pageNumber > 2) return Math.ceil((pageNumber - 1) / 2) + 1;
                //case double page
                if (this.app.provider.pageSize === defaults_DEARVIEWER.FLIPBOOK_PAGE_SIZE.DOUBLE_COVER_BACK && pageNumber > 1) {
                    //case double page last page, it's on page 1
                    if (pageNumber === this.app.pageCount) return 1;
                    //case double page
                    return Math.ceil((pageNumber - 1) / 2) + 1;
                }
                return pageNumber;
            }
        },
        {
            key: "getViewPort",
            value: function getViewPort(pageNumber) {
                var fallback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false, filter = arguments.length > 2 ? arguments[2] : void 0;
                return this.filterViewPort(flipbook_get(flipbook_get_prototype_of(BaseFlipBookViewer.prototype), "getViewPort", this).call(this, pageNumber, fallback), pageNumber, filter);
            }
        },
        {
            key: "isDoubleInternal",
            value: function isDoubleInternal() {
                return this.app.provider.pageSize === defaults_DEARVIEWER.FLIPBOOK_PAGE_SIZE.DOUBLE_INTERNAL;
            }
        },
        {
            key: "isDoubleCoverBack",
            value: function isDoubleCoverBack() {
                return this.app.provider.pageSize === defaults_DEARVIEWER.FLIPBOOK_PAGE_SIZE.DOUBLE_COVER_BACK;
            }
        },
        {
            key: "isDoubleInternalPage",
            value: function isDoubleInternalPage(pageNumber) {
                return this.isDoubleInternal() && pageNumber > 1 && pageNumber < this.app.provider.pageCount;
            }
        },
        {
            key: "getDoublePageWidthFix",
            value: function getDoublePageWidthFix(pageNumber) {
                return this.isDoubleInternalPage(pageNumber) || this.isDoubleCoverBack() ? 2 : 1;
            }
        },
        {
            key: "isDoublePageFix",
            value: function isDoublePageFix(pageNumber) {
                var fix = false;
                if (this.isDoubleCoverBack() || this.isDoubleInternalPage(pageNumber)) {
                    if (this.app.isRTL) {
                        if (pageNumber % 2 === 0) {
                            fix = true;
                        }
                    } else {
                        // canvas.width = canvas.width / doublePageWidthFix;
                        if (pageNumber % 2 === 1) {
                            fix = true;
                        }
                    }
                }
                return fix;
            }
        },
        {
            key: "finalizeAnnotations",
            value: function finalizeAnnotations(element, pageNumber) {
            // element.parentNode.classList.toggle('df-double-internal', this.isDoubleInternalPage(pageNumber));
            // element.parentNode.classList.toggle('df-double-internal-fix', this.isDoublePageFix(pageNumber));
            }
        },
        {
            key: "finalizeTextContent",
            value: function finalizeTextContent(element, pageNumber) {
                // element.parentNode.classList.toggle('df-double-internal', this.isDoubleInternalPage(pageNumber));
                // element.parentNode.classList.toggle('df-double-internal-fix', this.isDoublePageFix(pageNumber));
                if (this.app.zoomValue > this.app.viewer.pureMaxZoom) {
                    if (this.zoomViewer.leftViewPort) this.zoomViewer.leftPage.contentLayer[0].style.setProperty('--scale-factor', this.zoomViewer.leftSheetHeight / this.zoomViewer.leftViewPort.height);
                    if (this.zoomViewer.rightViewPort) this.zoomViewer.rightPage.contentLayer[0].style.setProperty('--scale-factor', this.zoomViewer.rightSheetHeight / this.zoomViewer.rightViewPort.height);
                }
            }
        },
        {
            key: "isActivePage",
            value: function isActivePage(pageNumber) {
                return this.visiblePagesCache !== void 0 && this.visiblePagesCache.includes(pageNumber);
            }
        },
        {
            key: "isSheetCover",
            value: function isSheetCover(sheetNumber) {
                var isBooklet = this.isBooklet;
                return sheetNumber === 0 || isBooklet && sheetNumber === 1 //front cover is 0
                 || sheetNumber === Math.ceil(this.app.pageCount / (isBooklet ? 1 : 2)) - (isBooklet ? 0 : 1); //start with 0 so 1 minus
            }
        },
        {
            key: "isSheetHard",
            value: function isSheetHard(sheetNumber) {
                var config = this.app.options.flipbookHardPages, isBooklet = this.isBooklet;
                if (config === "cover") {
                    return this.isSheetCover(sheetNumber);
                } else if (config === "all") {
                    return true;
                } else {
                    var baseTest = ("," + config + ",").indexOf("," + (sheetNumber * 2 + 1) + ",") > -1;
                    var nextTest = ("," + config + ",").indexOf("," + (sheetNumber * 2 + 2) + ",") > -1;
                    return baseTest || nextTest;
                }
            }
        },
        {
            key: "sheetsIndexShift",
            value: function sheetsIndexShift(oldBasePageNumber, basePageNumber, stackCount) {
                if (oldBasePageNumber > basePageNumber) {
                    this.sheets[stackCount - 1].skipFlip = true;
                    this.sheets.unshift(this.sheets.pop());
                } else if (oldBasePageNumber < basePageNumber) {
                    this.sheets[0].skipFlip = true;
                    this.sheets.push(this.sheets.shift());
                }
            }
        },
        {
            key: "checkSwipe",
            value: function checkSwipe(point, event) {
                var viewer = this;
                if (viewer.pinchZoomDirty === true) return;
                if (viewer.app.zoomValue === 1 && viewer.canSwipe === true) {
                    var swipe_dist = viewer.orientation == 'vertical' ? point.y - viewer.lastPosY : point.x - viewer.lastPosX;
                    if (Math.abs(swipe_dist) > viewer.swipeThreshold) {
                        //swipe has triggered
                        if (swipe_dist < 0) {
                            viewer.app.openRight();
                        } else {
                            viewer.app.openLeft();
                        }
                        viewer.canSwipe = false;
                        event.preventDefault();
                    }
                    viewer.lastPosX = point.x;
                    viewer.lastPosY = point.y;
                }
            }
        },
        {
            key: "checkCenter",
            value: function checkCenter() {
                var flag = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
                var viewer = this, app = this.app, SHIFT = defaults_DEARVIEWER.FLIPBOOK_CENTER_SHIFT;
                var centerShift, isEven = app.currentPageNumber % 2 === 0, basePage = viewer.getBasePage(), isRTL = viewer.isRTL, isSingle = viewer.isSingle;
                if (basePage === 0 || viewer.isBooklet) {
                    centerShift = viewer.isRTL ? SHIFT.RIGHT : SHIFT.LEFT;
                } else if (basePage === app.pageCount) {
                    centerShift = isRTL ? SHIFT.LEFT : SHIFT.RIGHT;
                } else {
                    centerShift = isSingle ? isRTL ? isEven ? SHIFT.LEFT : SHIFT.RIGHT : isEven ? SHIFT.RIGHT : SHIFT.LEFT : SHIFT.NONE;
                }
                if (viewer.centerNeedsUpdate !== true) {
                    viewer.centerNeedsUpdate = viewer.centerShift !== centerShift;
                }
                if (viewer.centerNeedsUpdate) {
                    viewer.centerShift = centerShift;
                    viewer.updateCenter(flag);
                    viewer.centerNeedsUpdate = false;
                }
            }
        },
        {
            key: "updateCenter",
            value: function updateCenter() {
                console.log("UpdateCenter: missing implementation.");
            }
        },
        {
            key: "reset",
            value: function reset() {
                var sheet;
                for(var count = 0; count < this.sheets.length; count++){
                    sheet = this.sheets[count];
                    sheet.reset();
                    sheet.pageNumber = -1;
                    if (sheet.frontPage) sheet.frontPage.pageNumber = -1;
                    if (sheet.backPage) sheet.backPage.pageNumber = -1;
                    sheet.resetTexture();
                }
                this.annotedPage = null;
                this.oldBasePageNumber = -1;
                this.centerShift = null;
                this.refresh();
            }
        },
        {
            key: "handleZoom",
            value: function handleZoom() {
                var app = this.app, dimensions = app.dimensions;
                //these dimension require raw values not the ones rouded up or newreast power of two, using isAnnnotation returns raw value.
                var leftDimen = this.getLeftPageTextureSize({
                    zoom: false,
                    isAnnotation: true
                }), rightDimen = this.getRightPageTextureSize({
                    zoom: false,
                    isAnnotation: true
                });
                var wasMaxZoomed = this.maxZoom === app.zoomValue;
                this.pureMaxZoom = app.dimensions.maxTextureSize / Math.max(leftDimen.height, leftDimen.width, rightDimen.height, rightDimen.width);
                var maxZoom = this.maxZoom = app.options.fakeZoom * this.pureMaxZoom, zoomValue = app.zoomValue, zoomChanged = false, exitZoom = false, enterZoom = false;
                if (maxZoom < this.minZoom) {
                    maxZoom = this.maxZoom = this.minZoom;
                }
                if (app.pendingZoom === true && app.zoomDelta != null) {
                    var delta = app.zoomDelta;
                    zoomValue = delta > 0 ? zoomValue * app.options.zoomRatio : zoomValue / app.options.zoomRatio;
                } else if (this.lastScale != null) {
                    zoomValue *= this.lastScale;
                    this.lastScale = null;
                }
                // else if (wasMaxZoomed === true) {
                //   zoomValue = app.zoomValue = maxZoom;
                //   console.log("Zoom value4: " + app.zoomValue);
                // }
                // While using maxZoomed, If the flipbook maxTexture is smaller than fullscreen page size. MaxZoomed is auto triggered and zoomValue is auto set to maxZoom value instead of original zoomValue 1
                zoomValue = flipbook_utils.limitAt(zoomValue, this.minZoom, maxZoom);
                app.zoomValueChange = zoomValue / app.zoomValue;
                zoomChanged = app.zoomChanged = app.zoomValue !== zoomValue;
                if (zoomChanged && (zoomValue === 1 || app.zoomValue === 1)) {
                    exitZoom = zoomValue === 1;
                    enterZoom = app.zoomValue === 1;
                }
                app.zoomValue = zoomValue;
                if (enterZoom || exitZoom) {
                    app.container.toggleClass("df-zoom-active", zoomValue !== 1);
                    enterZoom && this.enterZoom();
                    exitZoom && this.exitZoom();
                }
            }
        },
        {
            key: "refresh",
            value: function refresh() {
                var viewer = this, app = this.app;
                var stackCount = viewer.stackCount, isRTL = viewer.isRTL, isBooklet = viewer.isBooklet;
                var basePageNumber = viewer.getBasePage(), pageDivisor = isBooklet ? 1 : 2;
                if (isRTL) basePageNumber = app.pageCount - basePageNumber;
                var oldBasePageNumber = viewer.oldBasePageNumber, totalSheets = Math.ceil(app.pageCount / pageDivisor), _sheetCount, midPoint = Math.floor(stackCount / 2);
                if (basePageNumber !== viewer.oldBasePageNumber) {
                    viewer.pageNumberChanged = true;
                    this.updatePendingStatusClass(true);
                    viewer.zoomViewer.reset();
                }
                //Pages index shifting
                viewer.sheetsIndexShift(oldBasePageNumber, basePageNumber, stackCount);
                var baseSheetNumber = Math.ceil(basePageNumber / pageDivisor);
                for(_sheetCount = 0; _sheetCount < stackCount; _sheetCount++){
                    var _sheet = void 0, sheetNumber = baseSheetNumber - midPoint + _sheetCount;
                    if (isRTL) sheetNumber = totalSheets - sheetNumber - 1;
                    _sheet = viewer.sheets[_sheetCount];
                    if (_sheet == null) continue;
                    _sheet.targetSide = _sheetCount < midPoint ? defaults_DEARVIEWER.TURN_DIRECTION.LEFT : defaults_DEARVIEWER.TURN_DIRECTION.RIGHT;
                    var sideChanged = _sheet.side !== _sheet.targetSide, pageChanged = sheetNumber !== _sheet.pageNumber, needsFlip = sideChanged && _sheet.skipFlip === false && app.zoomValue === 1;
                    if (!sideChanged && pageChanged && _sheet.isFlipping && _sheet.currentTween) {
                        _sheet.currentTween.stop();
                    }
                    _sheet.isHard = viewer.isSheetHard(sheetNumber);
                    _sheet.isCover = viewer.isSheetCover(sheetNumber);
                    //Determine Page Situation
                    if (pageChanged) {
                        //texture reset
                        _sheet.resetTexture();
                        var firstPage = this.app.isRTL ? _sheet.backPage : _sheet.frontPage;
                        firstPage.pageNumber = this.isBooklet ? sheetNumber : sheetNumber * 2 + 1;
                        var secondPage = this.app.isRTL ? _sheet.frontPage : _sheet.backPage;
                        secondPage.pageNumber = this.isBooklet ? -1 : sheetNumber * 2 + 2;
                        app.textureRequestStatus = defaults_DEARVIEWER.REQUEST_STATUS.ON;
                    }
                    _sheet.pageNumber = sheetNumber;
                    viewer.refreshSheet({
                        sheet: _sheet,
                        sheetNumber: sheetNumber,
                        totalSheets: totalSheets,
                        zIndex: this.stackCount + (_sheetCount < midPoint ? _sheetCount - midPoint : midPoint - _sheetCount),
                        visible: isBooklet ? isRTL ? _sheetCount < midPoint || _sheet.isFlipping || needsFlip : _sheetCount >= midPoint || _sheet.isFlipping || needsFlip : sheetNumber >= 0 && sheetNumber < totalSheets || isBooklet && sheetNumber === totalSheets,
                        index: _sheetCount,
                        needsFlip: needsFlip,
                        midPoint: midPoint
                    });
                }
                viewer.requestRefresh(false);
                app.textureRequestStatus = defaults_DEARVIEWER.REQUEST_STATUS.ON;
                viewer.oldBasePageNumber = basePageNumber;
                this.checkCenter();
                this.zoomViewer.refresh();
                viewer.pageNumberChanged = false;
            }
        },
        {
            key: "validatePageChange",
            value: function validatePageChange(pageNumber) {
                if (pageNumber === this.app.currentPageNumber) return false;
                var app = this.app, valid = !this.isFlipping() || app.oldPageNumber === undefined;
                //for continuos same direction flip, even when flipping is not completed
                valid = valid || app.currentPageNumber < pageNumber && app.oldPageNumber < app.currentPageNumber;
                valid = valid || app.currentPageNumber > pageNumber && app.oldPageNumber > app.currentPageNumber;
                return valid;
            }
        },
        {
            key: "getVisiblePages",
            value: function getVisiblePages() {
                var viewer = this, visible = [];
                var page = viewer.getBasePage();
                var count = viewer.app.zoomValue > 1 ? 1 : viewer.isBooklet && flipbook_utils.isMobile ? Math.min(viewer.stackCount / 2, 2) : viewer.stackCount / 2;
                for(var _count = 0; _count < count; _count++){
                    visible.push(page - _count);
                    visible.push(page + _count + 1);
                }
                this.visiblePagesCache = visible;
                return {
                    main: visible,
                    buffer: []
                };
            }
        },
        {
            key: "getBasePage",
            value: function getBasePage(pageNumber) {
                if (pageNumber === void 0) pageNumber = this.app.currentPageNumber;
                if (this.isBooklet) return pageNumber;
                else return Math.floor(pageNumber / 2) * 2;
            }
        },
        {
            key: "getRightPageNumber",
            value: function getRightPageNumber() {
                return this.getBasePage() + (this.isBooklet ? 0 : this.isRTL ? 0 : 1);
            }
        },
        {
            key: "getLeftPageNumber",
            value: function getLeftPageNumber() {
                return this.getBasePage() + (this.isBooklet ? 0 : this.isRTL ? 1 : 0);
            }
        },
        {
            key: "afterFlip",
            value: function afterFlip() {
                var skip = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
                if (this.isAnimating() !== true) {
                    this.pagesReady();
                    this.updatePendingStatusClass();
                }
            }
        },
        {
            key: "isFlipping",
            value: function isFlipping() {
                var isFlipping = false;
                this.sheets.forEach(function(sheet) {
                    if (sheet.isFlipping === true) isFlipping = true;
                });
                return isFlipping;
            }
        },
        {
            key: "isAnimating",
            value: function isAnimating() {
                return this.isFlipping();
            }
        },
        {
            key: "mouseWheel",
            value: function mouseWheel(event) {
                if (this.app.options.mouseScrollAction === defaults_DEARVIEWER.MOUSE_SCROLL_ACTIONS.ZOOM) {
                    this.zoomViewer.mouseWheel(event);
                } else {
                    flipbook_get(flipbook_get_prototype_of(BaseFlipBookViewer.prototype), "mouseWheel", this).call(this, event);
                }
            }
        },
        {
            key: "checkRequestQueue",
            value: function checkRequestQueue() {
                if (this.app.zoomValue > 1) this.zoomViewer.checkRequestQueue();
                else flipbook_get(flipbook_get_prototype_of(BaseFlipBookViewer.prototype), "checkRequestQueue", this).call(this);
            }
        },
        {
            key: "updatePan",
            value: function updatePan() {}
        },
        {
            key: "resetPageTween",
            value: function resetPageTween() {}
        },
        {
            key: "gotoPageCallBack",
            value: function gotoPageCallBack() {
                this.resetPageTween();
                // this.app.options.resetZoomBeforeFlip = true;
                if (this.app.zoomValue !== 1 && this.app.options.resetZoomBeforeFlip === true) {
                    this.app.resetZoom();
                }
                this.beforeFlip();
                this.requestRefresh();
            }
        },
        {
            key: "beforeFlip",
            value: function beforeFlip() {
                var viewer = this;
                //callback for before flip
                viewer.app.executeCallback('beforeFlip');
                if (viewer.app.zoomValue === 1) viewer.playSound();
            }
        },
        {
            key: "onFlip",
            value: function onFlip() {
                var viewer = this;
                //callback for after flip
                viewer.app.executeCallback('onFlip');
            }
        },
        {
            //todo should be handled properly by zoomviewer directly
            key: "getAnnotationElement",
            value: function getAnnotationElement(pageNumber) {
                var clean = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false, isZoomViewer = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
                var annotationEl = undefined;
                if (this.app.zoomValue > 1 || isZoomViewer === true) annotationEl = this.zoomViewer.getAnnotationElement(pageNumber, clean);
                else annotationEl = flipbook_get(flipbook_get_prototype_of(BaseFlipBookViewer.prototype), "getAnnotationElement", this).call(this, pageNumber, clean);
                if (annotationEl) {
                    annotationEl.parentNode.classList.toggle('df-double-internal', this.isDoubleInternalPage(pageNumber));
                    annotationEl.parentNode.classList.toggle('df-double-internal-fix', this.isDoublePageFix(pageNumber));
                }
                return annotationEl;
            }
        },
        {
            key: "getTextElement",
            value: function getTextElement(pageNumber) {
                var clean = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false, isZoomViewer = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
                if (this.app.zoomValue > 1 || isZoomViewer === true) return this.zoomViewer.getTextElement(pageNumber, clean);
                else return flipbook_get(flipbook_get_prototype_of(BaseFlipBookViewer.prototype), "getTextElement", this).call(this, pageNumber, clean);
            }
        },
        {
            key: "enterZoom",
            value: function enterZoom() {
                this.exchangeTexture(this, this.zoomViewer);
            }
        },
        {
            key: "exitZoom",
            value: function exitZoom() {
                this.exchangeTexture(this.zoomViewer, this);
            }
        },
        {
            key: "exchangeTexture",
            value: function exchangeTexture(from, to) {
                var basePage = this.getBasePage();
                var fromPage = from.getPageByNumber(basePage);
                var toPage = to.getPageByNumber(basePage);
                if (toPage && toPage.textureStamp === "-1") {
                    toPage.textureStamp = fromPage.textureStamp;
                    toPage.loadTexture({
                        texture: fromPage.getTexture(true)
                    });
                    flipbook_utils.log("Texture Exchanging at " + basePage);
                } else {
                    flipbook_utils.log("Texture Exchanging Bypassed at " + basePage);
                }
                if (!this.isBooklet) {
                    var fromPage1 = from.getPageByNumber(basePage + 1);
                    var toPage1 = to.getPageByNumber(basePage + 1);
                    if (toPage1 && toPage1.textureStamp === "-1") {
                        toPage1.textureStamp = fromPage1.textureStamp;
                        toPage1.loadTexture({
                            texture: fromPage1.getTexture(true)
                        });
                        flipbook_utils.log("Texture Exchanging at " + (basePage + 1));
                    } else {
                        flipbook_utils.log("Texture Exchanging Bypassed at " + (basePage + 1));
                    }
                }
                to.pagesReady();
            }
        },
        {
            key: "setPageMode",
            value: function setPageMode(args) {
                var app = this.app;
                var isSingle = args.isSingle === true;
                this.pageMode = isSingle ? defaults_DEARVIEWER.FLIPBOOK_PAGE_MODE.SINGLE : defaults_DEARVIEWER.FLIPBOOK_PAGE_MODE.DOUBLE;
                this.updatePageMode();
                app.resizeRequestStart();
                // this.requestRefresh();
                if (app.viewer.pageMode === defaults_DEARVIEWER.FLIPBOOK_PAGE_MODE.DOUBLE && app.ui.controls.pageMode) {
                    app.ui.controls.pageMode.removeClass(app.options.icons['doublepage']).addClass(app.options.icons['singlepage']).attr('title', app.options.text.singlePageMode).html('<span>' + app.options.text.singlePageMode + '</span>');
                } else {
                    app.ui.controls.pageMode.addClass(app.options.icons['doublepage']).removeClass(app.options.icons['singlepage']).attr('title', app.options.text.doublePageMode).html('<span>' + app.options.text.doublePageMode + '</span>');
                }
            }
        },
        {
            key: "updatePageMode",
            value: function updatePageMode() {
                if (this.app.pageCount < 3) this.pageMode = defaults_DEARVIEWER.FLIPBOOK_PAGE_MODE.SINGLE;
                this.isSingle = this.pageMode === defaults_DEARVIEWER.FLIPBOOK_PAGE_MODE.SINGLE;
                this.isBooklet = this.isSingle && this.singlePageMode === defaults_DEARVIEWER.FLIPBOOK_SINGLE_PAGE_MODE.BOOKLET;
                this.app.jumpStep = this.isSingle ? 1 : 2;
                this.totalSheets = Math.ceil(this.app.pageCount / (this.isBooklet ? 1 : 2));
                if (this.sheets.length > 0) this.reset();
            }
        },
        {
            key: "setPage",
            value: function setPage(param) {
                if (param.textureTarget === defaults_DEARVIEWER.TEXTURE_TARGET.ZOOM) {
                    return this.zoomViewer.setPage(param);
                } else {
                    return flipbook_get(flipbook_get_prototype_of(BaseFlipBookViewer.prototype), "setPage", this).call(this, param);
                }
            }
        },
        {
            key: "_calculateInnerHeight",
            value: function _calculateInnerHeight() {
                var singleMode = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
                if (singleMode === void 0) {
                    singleMode = this.pageMode === defaults_DEARVIEWER.FLIPBOOK_PAGE_MODE.SINGLE;
                }
                var viewPort = this.app.dimensions.defaultPage.viewPort;
                var appWidth = this.availablePageWidth(false, true, singleMode), appHeightMax = this.app.dimensions.maxHeight - this.app.dimensions.padding.height;
                if (this.orientation == 'vertical' && singleMode == false) {
                    appHeightMax /= 2;
                }
                this._defaultPageSize = flipbook_utils.contain(viewPort.width, viewPort.height, appWidth, appHeightMax);
                this._pageFitArea = {
                    width: appWidth,
                    height: appHeightMax
                }; //do not use this value as reference, it's a midvalue
                //_pageFitArea is not the size of flipbook. It the size of possible viewport inside a browser when auto height. In short, it's the restricted area iside which flipbook lies
                /// ------------
                /// |      |     |
                /// --------------  this is flibpok size
                /// ______________  this is pagefit area, flipbook cannot go beyond the pagefit area
                var innerHeight = this.app.dimensions.isFixedHeight ? appHeightMax : this._pageFitArea.height;
                if (this.app.dimensions.isAutoHeight && this.app.dimensions.isFixedHeight == false) {
                    //when the flipbook is autoheight but the fullscreen mode is fixed height
                    innerHeight = Math.floor(this._defaultPageSize.height);
                }
                return innerHeight;
            }
        },
        {
            key: "_getInnerHeight",
            value: function _getInnerHeight() {
                var innerHeight = this._calculateInnerHeight();
                this.app.dimensions.stage.width = this.app.dimensions.stage.innerWidth + this.app.dimensions.padding.width;
                this.app.dimensions.stage.height = innerHeight + this.app.dimensions.padding.height;
                return innerHeight;
            }
        },
        {
            key: "availablePageWidth",
            value: function availablePageWidth() {
                var zoom = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true, ignoreSidemenuOverlay = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false, singleMode = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
                if (singleMode === void 0) {
                    singleMode = this.pageMode === defaults_DEARVIEWER.FLIPBOOK_PAGE_MODE.SINGLE;
                }
                var extraWidth = ignoreSidemenuOverlay === true ? this.app.dimensions.offset.width : 0;
                var pageWidth = this.app.dimensions.stage.innerWidth + extraWidth;
                pageWidth /= singleMode === true || this.orientation == 'vertical' ? 1 : 2;
                return Math.floor(pageWidth * (zoom ? this.app.zoomValue : 1));
            }
        },
        {
            key: "availablePageHeight",
            value: function availablePageHeight() {
                var zoom = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true, singleMode = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : void 0;
                if (singleMode === void 0) {
                    singleMode = this.pageMode === defaults_DEARVIEWER.FLIPBOOK_PAGE_MODE.SINGLE;
                }
                var pageHeight = this.app.dimensions.stage.innerHeight;
                if (singleMode === false && this.orientation == 'vertical') {
                    pageHeight /= 2;
                }
                return Math.floor(pageHeight * (zoom ? this.app.zoomValue : 1));
            }
        },
        {
            key: "getTextureSize",
            value: function getTextureSize(param) {
                var viewport = this.getViewPort(param.pageNumber, true);
                var pixelRatio = this.app.options.pixelRatio;
                var dimen = flipbook_utils.contain(viewport.width, viewport.height, pixelRatio * this.availablePageWidth(param.zoom), pixelRatio * this.availablePageHeight(param.zoom));
                dimen = flipbook_utils.containUnStretched(dimen.width, dimen.height, this.app.options.maxTextureSize, this.app.options.maxTextureSize);
                return {
                    height: dimen.height,
                    width: dimen.width
                };
            }
        },
        {
            key: "getLeftPageTextureSize",
            value: function getLeftPageTextureSize() {
                var param = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                param.pageNumber = this.getLeftPageNumber();
                return this.getTextureSize(param);
            }
        },
        {
            key: "getRightPageTextureSize",
            value: function getRightPageTextureSize() {
                var param = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                param.pageNumber = this.getRightPageNumber();
                return this.getTextureSize(param);
            }
        },
        {
            key: "filterViewPort",
            value: function filterViewPort(viewport, pageNumber) {
                var filter = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
                if (viewport === undefined) return undefined;
                if (filter != true) return viewport;
                var _viewport = viewport.clone();
                _viewport.width = _viewport.width / this.getDoublePageWidthFix(pageNumber);
                return _viewport;
            }
        },
        {
            key: "filterViewPortCanvas",
            value: function filterViewPortCanvas(viewport, canvas, pageNumber) {
                if (this.isDoublePageFix(pageNumber)) {
                    viewport.transform[4] = viewport.transform[4] - Math.floor(Math.min(canvas.width, viewport.width * 2 - canvas.width));
                }
                viewport.widthFix = this.isDoubleInternalPage(pageNumber) ? 2 : 1;
            }
        },
        {
            key: "isClosedPage",
            value: function isClosedPage(pageNumber) {
                if (pageNumber === void 0) pageNumber = this.app.currentPageNumber;
                return pageNumber === 1 || pageNumber === this.app.jumpStep * Math.ceil(this.app.pageCount / this.app.jumpStep) && !this.isBooklet;
            //Booklets never close on the end
            }
        },
        {
            key: "isLeftPage",
            value: function isLeftPage(pageNumber) {
                if (pageNumber === void 0) pageNumber = this.app.currentPageNumber;
                if (this.isBooklet) {
                    return this.isRTL;
                } else {
                    return pageNumber % 2 === (this.isRTL ? 1 : 0);
                }
            }
        },
        {
            key: "cleanPage",
            value: function cleanPage(pageNumber) {
                if (this.isDoubleInternalPage(pageNumber)) {
                    var otherPage = pageNumber + (pageNumber % 2 === 1 ? -1 : 1);
                    return this.app.provider.requestedPages[pageNumber] === false && this.app.provider.requestedPages[otherPage] === false;
                } else {
                    return flipbook_get(flipbook_get_prototype_of(BaseFlipBookViewer.prototype), "cleanPage", this).call(this, pageNumber);
                }
            }
        },
        {
            key: "onReady",
            value: function onReady() {
                flipbook_get(flipbook_get_prototype_of(BaseFlipBookViewer.prototype), "onReady", this).call(this);
            }
        },
        {
            key: "searchPage",
            value: function searchPage(pageNumber) {
                return {
                    include: !this.isDoublePageFix(pageNumber),
                    label: this.app.provider.getLabelforPage(pageNumber) + (this.isDoubleInternalPage(pageNumber) ? "-" + this.app.provider.getLabelforPage(pageNumber + 1) : "")
                };
            }
        }
    ]);
    return BaseFlipBookViewer;
}(BaseViewer);
var ZoomViewer = /*#__PURE__*/ function(BaseViewer) {
    "use strict";
    flipbook_inherits(ZoomViewer, BaseViewer);
    var _super = flipbook_create_super(ZoomViewer);
    function ZoomViewer(options, appContext) {
        flipbook_class_call_check(this, ZoomViewer);
        var _this;
        options.viewerClass = "df-zoomview " + (options.viewerClass || "");
        _this = _super.call(this, options, appContext);
        _this.viewer = _this.app.viewer;
        _this.events = {};
        _this.init();
        _this.initEvents();
        _this.left = 0;
        _this.top = 0;
        return _this;
    }
    flipbook_create_class(ZoomViewer, [
        {
            key: "init",
            value: function init() {
                this.leftPage = new Page2D();
                this.rightPage = new Page2D();
                this.pages.push(this.leftPage);
                this.pages.push(this.rightPage);
                this.leftPage.element.addClass('df-page-back');
                this.rightPage.element.addClass('df-page-front');
                this.wrapper.append(this.leftPage.element);
                this.wrapper.append(this.rightPage.element);
                this.bookShadow = jQuery('<div>', {
                    class: 'df-book-shadow'
                });
                this.wrapper.append(this.bookShadow);
                this.wrapper.addClass("df-sheet");
            }
        },
        {
            key: "initEvents",
            value: function initEvents() {
                this.stageDOM = this.element[0];
                flipbook_get(flipbook_get_prototype_of(ZoomViewer.prototype), "initEvents", this).call(this);
            }
        },
        {
            key: "dispose",
            value: function dispose() {
                this.element.remove();
            }
        },
        {
            key: "resize",
            value: function resize() {
                var viewer = this;
                var dimensions = viewer.app.dimensions;
                var padding = dimensions.padding;
                var zoomHeight = this.app.viewer.availablePageHeight(), zoomWidth = this.app.viewer.availablePageWidth(), zoomFullWidth = viewer.fullWidth = zoomWidth * (this.app.viewer.pageMode === defaults_DEARVIEWER.FLIPBOOK_PAGE_MODE.SINGLE ? 1 : 2), stageWidth = dimensions.stage.innerWidth, stageHeight = dimensions.stage.innerHeight;
                var shiftHeight = viewer.shiftHeight = Math.ceil(flipbook_utils.limitAt((zoomHeight - stageHeight) / 2, 0, zoomHeight)), shiftWidth = viewer.shiftWidth = Math.ceil(flipbook_utils.limitAt((zoomFullWidth - stageWidth) / 2, 0, zoomFullWidth));
                if (viewer.app.zoomValue === 1) {
                    viewer.left = 0;
                    viewer.top = 0;
                }
                viewer.element.css({
                    top: -shiftHeight,
                    bottom: -shiftHeight,
                    right: -shiftWidth,
                    left: -shiftWidth,
                    paddingTop: padding.top,
                    paddingRight: padding.right,
                    paddingBottom: padding.bottom,
                    paddingLeft: padding.left,
                    transform: "translate3d(" + viewer.left + "px," + viewer.top + "px,0)"
                });
                viewer.wrapper.css({
                    width: zoomFullWidth,
                    height: zoomHeight,
                    //marginTop when the flipbook is smaller than the ViewArea it has to center align vertically
                    marginTop: dimensions.height - zoomHeight - padding.height > 0 ? (dimensions.height - padding.height - zoomHeight) / 2 : 0
                });
                this.wrapper.height(zoomHeight).width(zoomFullWidth - zoomFullWidth % 2);
                if (viewer.app.pendingZoom === true) {
                    viewer.zoom();
                }
                this.app.viewer.annotedPage = null;
                this.pagesReady();
            }
        },
        {
            key: "zoom",
            value: function zoom() {
                var viewer = this, app = this.app;
                if (app.zoomChanged) {
                    var origin = app.dimensions.origin, dz = app.zoomValueChange;
                    //fix zoom to previous center
                    if (app.zoomValue === 1) {
                        viewer.left = 0;
                        viewer.top = 0;
                    } else {
                        viewer.left *= dz;
                        viewer.top *= dz;
                        if (!app.viewer.zoomCenter) {
                            app.viewer.zoomCenter = {
                                x: origin.x,
                                y: origin.y
                            };
                        }
                        var pointOld = {
                            raw: app.viewer.zoomCenter
                        }, pointNew = {
                            raw: {}
                        };
                        // pointOld.raw.x -= app.dimensions.offset.left / 2;
                        //fix zoom to previous pointer
                        var dx = (pointOld.raw.x - origin.x) * dz, dy = (pointOld.raw.y - origin.y) * dz;
                        pointNew.raw.x = origin.x + dx;
                        pointNew.raw.y = origin.y + dy;
                        viewer.startPoint = pointNew;
                        viewer.pan(pointOld);
                        viewer.startPoint = null;
                    }
                }
                app.viewer.zoomCenter = null;
            }
        },
        {
            key: "reset",
            value: function reset() {
                this.leftPage.resetTexture();
                this.rightPage.resetTexture();
            }
        },
        {
            key: "refresh",
            value: function refresh() {
                var app = this.app, viewer = app.viewer;
                var basePageNumber = viewer.getBasePage(), isLeftBase = viewer.isBooklet ? !app.isRTL : app.isRTL, basePage = isLeftBase ? this.rightPage : this.leftPage, nextPage = isLeftBase ? this.leftPage : this.rightPage;
                basePage.pageNumber = basePageNumber;
                nextPage.pageNumber = basePageNumber + 1;
                basePage.updateCSS({
                    display: basePageNumber === 0 ? "none" : "block"
                });
                nextPage.updateCSS({
                    display: nextPage.pageNumber > app.pageCount || viewer.isBooklet ? "none" : "block"
                });
            }
        },
        {
            key: "updateCenter",
            value: function updateCenter() {
                var viewer = this;
                if (viewer === null || viewer.app.viewer === null) return;
                var centerShift = viewer.app.viewer.centerShift, isRTL = viewer.app.viewer.isRTL, width = !isRTL && viewer.app.currentPageNumber > 1 || isRTL && viewer.app.currentPageNumber < viewer.app.pageCount ? viewer.leftSheetWidth : viewer.rightSheetWidth;
                var end = centerShift * width / 2;
                viewer.wrapper[0].style.left = end + "px";
            }
        },
        {
            key: "isDoubleInternalPage",
            value: function isDoubleInternalPage(pageNumber) {
                return this.app.viewer.isDoubleInternalPage(pageNumber);
            }
        },
        {
            key: "pagesReady",
            value: function pagesReady() {
                if (this.app.viewer.isFlipping()) return;
                if (this.app.zoomValue !== 1) this.app.viewer.updatePendingStatusClass(false);
                if (this.app.options.flipbookFitPages === false) {
                    var basePage = this.app.viewer.getBasePage();
                    var leftViewPort = this.leftViewPort = this.app.viewer.getViewPort(basePage + (this.app.viewer.isBooklet ? 0 : this.app.viewer.isRTL ? 1 : 0)), rightViewPort = this.rightViewPort = this.app.viewer.getViewPort(basePage + (this.app.viewer.isBooklet ? 0 : this.app.viewer.isRTL ? 0 : 1));
                    if (leftViewPort) {
                        var leftDimen = flipbook_utils.contain(leftViewPort.width, leftViewPort.height, this.app.viewer.availablePageWidth(), this.app.viewer.availablePageHeight());
                        this.leftSheetWidth = Math.floor(leftDimen.width);
                        this.leftSheetHeight = Math.floor(leftDimen.height);
                        this.leftSheetTop = (this.app.viewer.availablePageHeight() - this.leftSheetHeight) / 2;
                        if (this.app.zoomValue > this.app.viewer.pureMaxZoom) this.leftPage.contentLayer[0].style.setProperty('--scale-factor', this.leftSheetHeight / leftViewPort.height);
                    }
                    if (rightViewPort) {
                        var rightDimen = flipbook_utils.contain(rightViewPort.width, rightViewPort.height, this.app.viewer.availablePageWidth(), this.app.viewer.availablePageHeight());
                        this.rightSheetWidth = Math.floor(rightDimen.width);
                        this.rightSheetHeight = Math.floor(rightDimen.height);
                        this.rightSheetTop = (this.app.viewer.availablePageHeight() - this.rightSheetHeight) / 2;
                        if (this.app.zoomValue > this.app.viewer.pureMaxZoom) this.rightPage.contentLayer[0].style.setProperty('--scale-factor', this.rightSheetHeight / rightViewPort.height);
                    }
                    if (leftViewPort != void 0 || rightViewPort != void 0) {
                        this.totalSheetsWidth = this.leftSheetWidth + this.rightSheetWidth;
                        this.leftPage.element.height(Math.floor(this.leftSheetHeight)).width(Math.floor(this.leftSheetWidth)).css({
                            transform: 'translateY(' + Math.floor(this.leftSheetTop) + 'px)'
                        });
                        this.rightPage.element.height(Math.floor(this.rightSheetHeight)).width(Math.floor(this.rightSheetWidth)).css({
                            transform: 'translateY(' + Math.floor(this.rightSheetTop) + 'px)'
                        });
                    }
                }
            }
        },
        {
            key: "textureLoadedCallback",
            value: function textureLoadedCallback(param) {
                var page = this.getPageByNumber(param.pageNumber);
                //page.element.toggleClass("df-odd", param.oddPage === true);
                this.pagesReady();
            }
        }
    ]);
    return ZoomViewer;
}(BaseViewer);
var BookSheet = /*#__PURE__*/ function() {
    "use strict";
    function BookSheet(options) {
        flipbook_class_call_check(this, BookSheet);
        this.parentElement = options.parentElement;
        this.isFlipping = false;
        this.isOneSided = false;
        this.viewer = options.viewer;
        this.frontPage = null;
        this.backPage = null;
        this.pageNumber = void 0;
        this.animateToReset = null;
    }
    flipbook_create_class(BookSheet, [
        {
            key: "init",
            value: function init() {}
        },
        {
            key: "flip",
            value: function flip() {}
        },
        {
            key: "frontImage",
            value: function frontImage(param) {
                this.frontPage.loadTexture({
                    texture: param.texture,
                    callback: param.callback
                });
            }
        },
        {
            key: "backImage",
            value: function backImage(param) {
                this.backPage.loadTexture({
                    texture: param.texture,
                    callback: param.callback
                });
            }
        },
        {
            key: "resetTexture",
            value: function resetTexture() {
                this.frontPage.resetTexture();
                this.backPage.resetTexture();
            }
        },
        {
            key: "reset",
            value: function reset() {
                var sheet = this;
                sheet.animateToReset = null;
                sheet.isFlipping = false;
                // page.element[0].style.opacity = 1;
                sheet.currentTween = null;
                sheet.pendingPoint = null;
                sheet.magnetic = false;
                sheet.skipFlip = true;
                sheet.animateToReset = null;
                sheet.viewer.dragPage = null;
                sheet.viewer.flipPage = null;
                sheet.viewer.corner = defaults_DEARVIEWER.TURN_CORNER.NONE;
            }
        }
    ]);
    return BookSheet;
}();


;// CONCATENATED MODULE: ./src/js/dearviewer/viewers/flipbook-2d.js
/*Stage collects events and passed to respective implementation*/ function flipbook_2d_assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function flipbook_2d_class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function flipbook_2d_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function flipbook_2d_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) flipbook_2d_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) flipbook_2d_defineProperties(Constructor, staticProps);
    return Constructor;
}
function flipbook_2d_get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        flipbook_2d_get = Reflect.get;
    } else {
        flipbook_2d_get = function get(target, property, receiver) {
            var base = flipbook_2d_super_prop_base(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver || target);
            }
            return desc.value;
        };
    }
    return flipbook_2d_get(target, property, receiver || target);
}
function flipbook_2d_get_prototype_of(o) {
    flipbook_2d_get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return flipbook_2d_get_prototype_of(o);
}
function flipbook_2d_inherits(subClass, superClass) {
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
    if (superClass) flipbook_2d_set_prototype_of(subClass, superClass);
}
function flipbook_2d_possible_constructor_return(self, call) {
    if (call && (flipbook_2d_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return flipbook_2d_assert_this_initialized(self);
}
function flipbook_2d_set_prototype_of(o, p) {
    flipbook_2d_set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return flipbook_2d_set_prototype_of(o, p);
}
function flipbook_2d_super_prop_base(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = flipbook_2d_get_prototype_of(object);
        if (object === null) break;
    }
    return object;
}
function flipbook_2d_type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function flipbook_2d_is_native_reflect_construct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function flipbook_2d_create_super(Derived) {
    var hasNativeReflectConstruct = flipbook_2d_is_native_reflect_construct();
    return function _createSuperInternal() {
        var Super = flipbook_2d_get_prototype_of(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = flipbook_2d_get_prototype_of(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return flipbook_2d_possible_constructor_return(this, result);
    };
}



var flipbook_2d_DV = defaults_DEARVIEWER;
var flipbook_2d_utils = flipbook_2d_DV.utils;
var BookSheet2D = /*#__PURE__*/ function(BookSheet) {
    "use strict";
    flipbook_2d_inherits(BookSheet2D, BookSheet);
    var _super = flipbook_2d_create_super(BookSheet2D);
    function BookSheet2D(options) {
        flipbook_2d_class_call_check(this, BookSheet2D);
        var _this;
        _this = _super.call(this, options);
        _this.init();
        return _this;
    }
    flipbook_2d_create_class(BookSheet2D, [
        {
            key: "init",
            value: function init() {
                var sheet = this, div = '<div>';
                var element = sheet.element = jQuery(div, {
                    class: 'df-sheet'
                });
                var frontPage = sheet.frontPage = new Page2D();
                frontPage.element.addClass('df-page-front');
                var backPage = sheet.backPage = new Page2D();
                backPage.element.addClass('df-page-back');
                var wrapper = sheet.wrapper = jQuery(div, {
                    class: "df-sheet-wrapper"
                });
                var foldInnerShadow = sheet.foldInnerShadow = jQuery(div, {
                    class: "df-sheet-fold-inner-shadow"
                });
                var foldOuterShadow = sheet.foldOuterShadow = jQuery(div, {
                    class: "df-sheet-fold-outer-shadow"
                });
                this.parentElement.append(element);
                element.append(wrapper);
                element.append(foldOuterShadow);
                wrapper.append(frontPage.element);
                wrapper.append(backPage.element);
                wrapper.append(foldInnerShadow);
            }
        },
        {
            key: "updateCSS",
            value: function updateCSS(css) {
                var page = this;
                page.element.css(css);
            }
        },
        {
            key: "resetCSS",
            value: function resetCSS() {
                var sheet = this;
                sheet.wrapper.css({
                    transform: ''
                });
                sheet.frontPage.resetCSS();
                sheet.backPage.resetCSS();
            }
        },
        {
            key: "updateSize",
            value: function updateSize(width, height, top) {
                width = Math.floor(width);
                height = Math.floor(height);
                top = Math.floor(top);
                this.wrapper[0].style.height = this.wrapper[0].style.width = Math.ceil(flipbook_2d_utils.distOrigin(width, height) * this.viewer.app.zoomValue) + "px";
                this.element[0].style.height = this.frontPage.element[0].style.height = this.backPage.element[0].style.height = this.foldInnerShadow[0].style.height = height + "px";
                this.element[0].style.width = this.frontPage.element[0].style.width = this.backPage.element[0].style.width = this.foldInnerShadow[0].style.width = width + "px";
                this.element[0].style.transform = 'translateY(' + top + 'px)';
            }
        },
        {
            key: "flip",
            value: function flip(point) {
                var sheet = this;
                //point is usually null if the flip was made by next or previous without folding
                point = point || sheet.pendingPoint;
                if (sheet == null || sheet.viewer == null) return;
                sheet.isFlipping = true;
                sheet.viewer.flipPage = sheet;
                var isBooklet = sheet.viewer.isBooklet, isRight = sheet.side === defaults_DEARVIEWER.TURN_DIRECTION.RIGHT, isRTL = sheet.viewer.isRTL, isBottom = sheet.viewer.corner === defaults_DEARVIEWER.TURN_CORNER.BL || sheet.viewer.corner === defaults_DEARVIEWER.TURN_CORNER.BR;
                var travelY = isBottom ? sheet.element.height() : 0;
                var fullWidth = sheet.viewer.leftSheetWidth + sheet.viewer.rightSheetWidth;
                var init, angle = 0, end; //stages of flip or fold cancel
                end = sheet.end = sheet && sheet.animateToReset === true ? {
                    x: isRight ? fullWidth : 0,
                    y: travelY
                } : {
                    x: isRight ? 0 : fullWidth,
                    y: travelY
                };
                sheet.flipEasing = sheet.isHard ? TWEEN.Easing.Quadratic.InOut : TWEEN.Easing.Linear.None;
                var flipDuration = sheet.viewer.app.options.duration; //duration that should take based on distance(calculated below)
                if (sheet.isHard === true) {
                    if (point != null) {
                        angle = flipbook_2d_utils.angleByDistance(point.distance, point.fullWidth);
                    }
                    init = sheet.init = {
                        angle: angle * (isRight ? -1 : 1)
                    };
                    end = sheet.end = sheet && sheet.animateToReset === true ? {
                        angle: isRight ? 0 : -0
                    } : {
                        angle: isRight ? -180 : 180
                    };
                } else {
                    if (point == null) {
                        init = sheet.init = sheet && sheet.animateToReset === true ? {
                            x: isRight ? 0 : fullWidth,
                            y: 0
                        } : {
                            x: isRight ? fullWidth : 0,
                            y: 0
                        };
                    } else {
                        init = sheet.init = {
                            x: point.x,
                            y: point.y,
                            opacity: 1
                        };
                        flipDuration = sheet.viewer.app.options.duration * flipbook_2d_utils.distPoints(init.x, init.y, end.x, end.y) / sheet.viewer.fullWidth;
                        flipDuration = flipbook_2d_utils.limitAt(flipDuration, sheet.viewer.app.options.duration / 3, sheet.viewer.duration);
                    }
                }
                init.index = 0;
                end.index = 1;
                sheet.isFlipping = true;
                if (isBooklet && (!isRight && !isRTL || isRight && isRTL)) sheet.element[0].style.opacity = 0;
                if (sheet.isHard === true) {
                    sheet.currentTween = new TWEEN.Tween(init).delay(0).to(end, sheet.viewer.app.options.duration).onUpdate(function() {
                        sheet.updateTween(this);
                    }).easing(sheet.flipEasing).onComplete(sheet.completeTween.bind(sheet)).start();
                } else {
                    if (point == null) {
                        sheet.currentTween = new TWEEN.Tween(init).delay(0).to(end, sheet.viewer.app.options.duration).onUpdate(function() {
                            sheet.updateTween(this);
                        }).easing(TWEEN.Easing.Sinusoidal.Out).onComplete(sheet.completeTween.bind(sheet)).start();
                    } else {
                        sheet.currentTween = new TWEEN.Tween(init).delay(0).to(end, flipDuration).onUpdate(function() {
                            sheet.updateTween(this);
                        }).easing(TWEEN.Easing.Sinusoidal.Out).onComplete(sheet.completeTween.bind(sheet)).start();
                    }
                }
            //page.currentTween.viewer= page;
            }
        },
        {
            key: "updatePoint",
            value: function updatePoint(point) {
                var sheet = this;
                if (point == null) return;
                //detect the current page
                // let page = page.viewer.dragPage != null ? page.viewer.dragPage
                //   : point.page != null ? point.page : this;
                //get the pageWidth and pageHeight
                var pageWidth = sheet.element.width(), pageHeight = sheet.element.height();
                //the corner where the drag started
                var corner = sheet.viewer.corner !== defaults_DEARVIEWER.TURN_CORNER.NONE ? sheet.viewer.corner : point.corner, corners = defaults_DEARVIEWER.TURN_CORNER;
                var isRight = sheet.side === defaults_DEARVIEWER.TURN_DIRECTION.RIGHT, isBottom = corner === corners.BL || corner === corners.BR;
                point.rx = isRight === true ? sheet.viewer.leftSheetWidth + pageWidth - point.x : point.x;
                point.ry = isBottom === true ? pageHeight - point.y : point.y;
                var radAngle = Math.atan2(point.ry, point.rx);
                radAngle = Math.PI / 2 - flipbook_2d_utils.limitAt(radAngle, 0, flipbook_2d_utils.toRad(90));
                var correctionX = pageWidth - point.rx / 2, correctionY = point.ry / 2, refLength = Math.max(0, Math.sin(radAngle - Math.atan2(correctionY, correctionX)) * flipbook_2d_utils.distOrigin(correctionX, correctionY)), //the distance from where the fold starts
                foldLength = 0.5 * flipbook_2d_utils.distOrigin(point.rx, point.ry);
                var x = Math.ceil(pageWidth - refLength * Math.sin(radAngle)), y = Math.ceil(refLength * Math.cos(radAngle)), angle = flipbook_2d_utils.toDeg(radAngle);
                var angle1 = isBottom ? isRight ? 180 + (90 - angle) : 180 + angle : isRight ? angle : 90 - angle;
                var angle2 = isBottom ? isRight ? 180 + (90 - angle) : angle : isRight ? angle + 180 : angle1, angleS = isBottom ? isRight ? 90 - angle : angle + 90 : isRight ? angle1 - 90 : angle1 + 180, x1 = isRight ? pageWidth - x : x, y1 = isBottom ? pageHeight + y : -y, x2 = isRight ? -x : x - pageWidth, y2 = isBottom ? -pageHeight - y : y;
                var opacity = flipbook_2d_utils.limitAt(point.distance * 0.5 / pageWidth, 0, 0.5);
                var foldOpacity = flipbook_2d_utils.limitAt((sheet.viewer.leftSheetWidth + pageWidth - point.rx) * 0.5 / pageWidth, 0.05, 0.3);
                sheet.element.addClass("df-folding");
                var front = isRight ? sheet.backPage.element : sheet.frontPage.element;
                var back = isRight ? sheet.frontPage.element : sheet.backPage.element;
                var outerShadow = sheet.foldOuterShadow;
                var innerShadow = sheet.foldInnerShadow;
                sheet.wrapper.css({
                    transform: flipbook_2d_utils.translateStr(x1, y1) + flipbook_2d_utils.rotateStr(angle1)
                });
                back.css({
                    transform: flipbook_2d_utils.rotateStr(-angle1) + flipbook_2d_utils.translateStr(-x1, -y1)
                });
                front.css({
                    transform: flipbook_2d_utils.rotateStr(angle2) + flipbook_2d_utils.translateStr(x2, y2),
                    boxShadow: "rgba(0, 0, 0, " + opacity + ") 0px 0px 20px"
                });
                innerShadow.css({
                    transform: flipbook_2d_utils.rotateStr(angle2) + flipbook_2d_utils.translateStr(x2, y2),
                    opacity: foldOpacity / 2,
                    backgroundImage: flipbook_2d_utils.prefix.css + "linear-gradient( " + angleS + "deg, rgba(0, 0, 0, 0.25) , rgb(0, 0, 0) " + foldLength * 0.7 + "px, rgb(255, 255, 255) " + foldLength + "px)"
                });
                outerShadow.css({
                    opacity: foldOpacity / 2,
                    left: isRight ? "auto" : 0,
                    right: isRight ? 0 : "auto",
                    backgroundImage: flipbook_2d_utils.prefix.css + "linear-gradient( " + (-angleS + 180) + "deg, rgba(0, 0, 0,0) " + foldLength / 3 + "px, rgb(0, 0, 0) " + foldLength + "px)"
                });
            }
        },
        {
            key: "updateAngle",
            value: function updateAngle(angle, isRight) {
                var sheet = this;
                var width = sheet.element.width() * 5;
                sheet.wrapper.css({
                    perspective: width,
                    perspectiveOrigin: isRight === true ? "0% 50%" : "100% 50%"
                });
                sheet.element.addClass("df-folding");
                sheet.backPage.updateCSS({
                    display: isRight === true ? angle <= -90 ? 'block' : 'none' : angle < 90 ? 'block' : 'none',
                    transform: (flipbook_2d_utils.prefix.dom !== 'MfS' ? "" : "perspective(" + width + "px) ") + (isRight === true ? "translateX(-100%) " : "") + "rotateY(" + ((isRight === true ? 180 : 0) + angle) + "deg)"
                });
                sheet.frontPage.updateCSS({
                    display: isRight === true ? angle > -90 ? 'block' : 'none' : angle >= 90 ? 'block' : 'none',
                    transform: (flipbook_2d_utils.prefix.dom !== 'MSd' ? "" : "perspective(" + width + "px) ") + (isRight === false ? "translateX(100%) " : "") + "rotateY(" + ((isRight === false ? -180 : 0) + angle) + "deg)"
                });
            }
        },
        {
            key: "updateTween",
            value: function updateTween(tween) {
                var sheet = this;
                var isBooklet = sheet.viewer.isBooklet, isRight = sheet.side === defaults_DEARVIEWER.TURN_DIRECTION.RIGHT, isRTL = sheet.viewer.isRTL;
                var isReset = sheet.animateToReset === true;
                if (sheet.isHard === true) {
                    sheet.updateAngle(tween.angle, isRight);
                    sheet.angle = tween.angle;
                } else {
                    sheet.updatePoint({
                        x: tween.x,
                        y: tween.y
                    });
                    sheet.x = tween.x;
                    sheet.y = tween.y;
                }
                if (isBooklet && !isReset) sheet.element[0].style.opacity = isRight && !isRTL || !isRight && isRTL ? tween.index > 0.5 ? 2 * (1 - tween.index) : 1 : tween.index < 0.5 ? 2 * tween.index : 1;
            }
        },
        {
            key: "completeTween",
            value: function completeTween() {
                var sheet = this;
                if (sheet.isHard === true) {
                    sheet.updateAngle(sheet.end.angle);
                    sheet.backPage.element.css({
                        display: "block"
                    });
                    sheet.frontPage.element.css({
                        display: "block"
                    });
                } else {
                    sheet.updatePoint({
                        x: sheet.end.x,
                        y: sheet.end.y
                    });
                }
                sheet.element[0].style.opacity = 1;
                if (sheet.animateToReset !== true) {
                    sheet.side = sheet.targetSide;
                }
                sheet.reset();
                sheet.viewer.onFlip();
                sheet.viewer.afterFlip();
                sheet.viewer.requestRefresh();
            }
        }
    ]);
    return BookSheet2D;
}(BookSheet);
var FlipBook2D = /*#__PURE__*/ function(BaseFlipBookViewer) {
    "use strict";
    flipbook_2d_inherits(FlipBook2D, BaseFlipBookViewer);
    var _super = flipbook_2d_create_super(FlipBook2D);
    function FlipBook2D(options, appContext) {
        flipbook_2d_class_call_check(this, FlipBook2D);
        var _this;
        var _options_viewerClass;
        options.viewerClass = (_options_viewerClass = options.viewerClass) !== null && _options_viewerClass !== void 0 ? _options_viewerClass : "df-flipbook-2d";
        options.skipViewerLoaded = true;
        _this = _super.call(this, options, appContext);
        _this.bookShadow = jQuery('<div>', {
            class: 'df-book-shadow'
        });
        _this.wrapper.append(_this.bookShadow);
        _this.corner = defaults_DEARVIEWER.TURN_CORNER.NONE;
        appContext._viewerPrepared();
        return _this;
    }
    flipbook_2d_create_class(FlipBook2D, [
        {
            key: "init",
            value: function init() {
                flipbook_2d_get(flipbook_2d_get_prototype_of(FlipBook2D.prototype), "init", this).call(this);
                this.initEvents();
                this.initPages();
            }
        },
        {
            key: "initEvents",
            value: function initEvents() {
                this.stageDOM = this.element[0];
                flipbook_2d_get(flipbook_2d_get_prototype_of(FlipBook2D.prototype), "initEvents", this).call(this);
            }
        },
        {
            key: "dispose",
            value: function dispose() {
                flipbook_2d_get(flipbook_2d_get_prototype_of(FlipBook2D.prototype), "dispose", this).call(this);
                this.element.remove();
            }
        },
        {
            key: "initPages",
            value: function initPages() {
                for(var count = 0; count < this.stackCount; count++){
                    var sheet = new BookSheet2D({
                        parentElement: this.wrapper
                    });
                    sheet.index = count; //just reference for debugging
                    sheet.viewer = this;
                    this.sheets.push(sheet);
                    this.pages.push(sheet.frontPage);
                    this.pages.push(sheet.backPage);
                }
            }
        },
        {
            key: "resize",
            value: function resize() {
                flipbook_2d_get(flipbook_2d_get_prototype_of(FlipBook2D.prototype), "resize", this).call(this);
                var viewer = this;
                var dimensions = viewer.app.dimensions;
                var padding = dimensions.padding;
                var zoomHeight = this.availablePageHeight(), zoomWidth = this.availablePageWidth(), zoomFullWidth = viewer.fullWidth = zoomWidth * 2, stageWidth = dimensions.width, stageHeight = dimensions.height;
                var shiftHeight = viewer.shiftHeight = Math.ceil(flipbook_2d_utils.limitAt((zoomHeight - stageHeight + padding.height) / 2, 0, zoomHeight)), shiftWidth = viewer.shiftWidth = Math.ceil(flipbook_2d_utils.limitAt((zoomFullWidth - stageWidth + padding.width) / 2, 0, zoomFullWidth));
                if (viewer.app.zoomValue === 1) {
                    viewer.left = 0;
                    viewer.top = 0;
                }
                viewer.element.css({
                    top: -shiftHeight,
                    bottom: -shiftHeight,
                    right: -shiftWidth,
                    left: -shiftWidth,
                    paddingTop: padding.top,
                    paddingRight: padding.right,
                    paddingBottom: padding.bottom,
                    paddingLeft: padding.left,
                    transform: "translate3d(" + viewer.left + "px," + viewer.top + "px,0)"
                });
                viewer.wrapper.css({
                    //marginTop when the flipbook is smaller than the ViewArea it has to center align vertically
                    marginTop: Math.max(dimensions.height - zoomHeight - padding.height) / 2,
                    height: zoomHeight,
                    width: zoomFullWidth - zoomFullWidth % 2
                });
                viewer.zoomViewer.resize();
                viewer.centerNeedsUpdate = true;
                viewer.checkCenter(true);
                viewer.pagesReady();
            }
        },
        {
            key: "updateCenter",
            value: function updateCenter() {
                var skipTransition = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
                var viewer = this;
                var centerShift = viewer.centerShift, isRTL = viewer.isRTL, width = this.isLeftPage() ? this.leftSheetWidth : this.rightSheetWidth;
                var end = centerShift * width / 2;
                viewer.seamPosition = (-viewer.app.dimensions.offset.width + viewer.app.dimensions.containerWidth) / 2 + end;
                viewer.wrapperShift = (viewer.isSingle ? -viewer.app.dimensions.stage.innerWidth / 2 : 0) + end;
                viewer.wrapper[0].style.left = viewer.wrapperShift + "px";
                viewer.wrapper[0].style.transition = skipTransition ? "none" : "";
                this.zoomViewer.updateCenter();
            }
        },
        {
            key: "refreshSheet",
            value: function refreshSheet(options) {
                var _sheet = options.sheet, sheetPageNumber = options.sheetNumber;
                //Render Pages & flip
                if (_sheet.isFlipping === false) {
                    if (options.needsFlip) {
                        //this.beforeFlip();
                        _sheet.element.addClass("df-flipping");
                        _sheet.flip();
                    } else {
                        // page.depth = depth;
                        _sheet.skipFlip = false;
                        _sheet.element.removeClass("df-flipping df-quick-turn df-folding df-left-side df-right-side");
                        _sheet.element.addClass(_sheet.targetSide === flipbook_2d_DV.TURN_DIRECTION.LEFT ? "df-left-side" : "df-right-side");
                        _sheet.side = _sheet.targetSide;
                        _sheet.targetSide === flipbook_2d_DV.TURN_DIRECTION.LEFT ? _sheet.updateSize(this.leftSheetWidth, this.leftSheetHeight, this.leftSheetTop) : _sheet.updateSize(this.rightSheetWidth, this.rightSheetHeight, this.rightSheetTop);
                    }
                }
                _sheet.visible = options.visible;
                if (_sheet.isHard) {
                    _sheet.element.addClass("df-hard-sheet");
                } else {
                    _sheet.element.removeClass("df-hard-sheet");
                    _sheet.frontPage.updateCSS({
                        display: "block"
                    });
                    _sheet.backPage.updateCSS({
                        display: "block"
                    });
                }
                _sheet.updateCSS({
                    display: _sheet.visible === true ? "block" : "none",
                    zIndex: options.zIndex
                });
                if (_sheet.pendingPoint == null && _sheet.isFlipping === false) {
                    _sheet.resetCSS();
                }
                if (sheetPageNumber !== _sheet.pageNumber) {
                    _sheet.element.attr("number", sheetPageNumber);
                    _sheet.backPage.element.attr("pagenumber", _sheet.backPage.pageNumber);
                    _sheet.frontPage.element.attr("pagenumber", _sheet.frontPage.pageNumber);
                }
            }
        },
        {
            key: "eventToPoint",
            value: function eventToPoint(event) {
                var viewer = this;
                event = flipbook_2d_utils.fixMouseEvent(event);
                // if(event.type==="mouseup"){
                //   let a = "mouseup";
                // }
                var wrapper = viewer.wrapper, bRect = wrapper[0].getBoundingClientRect(), webgl = viewer.is3D, sheets = viewer.sheets, dimen = viewer.app.dimensions, pageWidth, fullWidth, pageHeight, point = {
                    x: event.clientX,
                    y: event.clientY
                }, left, top, distance, sheet, sheetDrag, isRight;
                //calculate x and y relative to container
                var pRect = viewer.parentElement[0].getBoundingClientRect();
                point.x = point.x - pRect.left;
                point.y = point.y - pRect.top;
                if (viewer.dragSheet) isRight = viewer.dragSheet.side === flipbook_2d_DV.TURN_DIRECTION.RIGHT;
                else {
                    isRight = point.x > viewer.seamPosition;
                }
                pageWidth = isRight ? viewer.rightSheetWidth : viewer.leftSheetWidth;
                pageHeight = isRight ? viewer.rightSheetHeight : viewer.leftSheetHeight;
                fullWidth = viewer.rightSheetWidth + viewer.leftSheetWidth;
                top = isRight ? viewer.rightSheetTop : viewer.leftSheetTop;
                //region old
                //calculate x and y relative to wrapper
                left = point.x - (viewer.seamPosition - viewer.leftSheetWidth);
                top = point.y - (bRect.top - pRect.top) - top;
                distance = viewer.drag === flipbook_2d_DV.TURN_DIRECTION.NONE ? left < pageWidth ? left : fullWidth - left : viewer.drag === flipbook_2d_DV.TURN_DIRECTION.LEFT ? left : fullWidth - left;
                sheet = isRight ? sheets[viewer.stackCount / 2] : sheets[viewer.stackCount / 2 - 1];
                sheetDrag = left < viewer.foldSense ? flipbook_2d_DV.TURN_DIRECTION.LEFT : left > fullWidth - viewer.foldSense ? flipbook_2d_DV.TURN_DIRECTION.RIGHT : flipbook_2d_DV.TURN_DIRECTION.NONE;
                var x = left, y = top, h = pageHeight, w = fullWidth, delta = viewer.foldSense, corner;
                //determine the corner
                if (x >= 0 && x < delta) {
                    if (y >= 0 && y <= delta) corner = flipbook_2d_DV.TURN_CORNER.TL;
                    else if (y >= h - delta && y <= h) corner = flipbook_2d_DV.TURN_CORNER.BL;
                    else if (y > delta && y < h - delta) corner = flipbook_2d_DV.TURN_CORNER.L;
                    else corner = flipbook_2d_DV.TURN_CORNER.NONE;
                } else if (x >= w - delta && x <= w) {
                    if (y >= 0 && y <= delta) corner = flipbook_2d_DV.TURN_CORNER.TR;
                    else if (y >= h - delta && y <= h) corner = flipbook_2d_DV.TURN_CORNER.BR;
                    else if (y > delta && y < h - delta) corner = flipbook_2d_DV.TURN_CORNER.R;
                    else corner = flipbook_2d_DV.TURN_CORNER.NONE;
                } else corner = flipbook_2d_DV.TURN_CORNER.NONE;
                var returnPoint = {
                    isInsideSheet: x >= 0 && x <= w && y >= 0 && y <= h,
                    isInsideCorner: corner !== flipbook_2d_DV.TURN_CORNER.NONE && corner !== flipbook_2d_DV.TURN_CORNER.L && corner !== flipbook_2d_DV.TURN_CORNER.R,
                    x: webgl ? point.x : left,
                    y: webgl ? point.y : top,
                    fullWidth: fullWidth,
                    sheetWidth: pageWidth,
                    sheetHeight: pageHeight,
                    rawDistance: fullWidth - left,
                    distance: distance,
                    sheet: sheet,
                    drag: sheetDrag,
                    foldSense: viewer.foldSense,
                    event: event,
                    raw: point,
                    corner: corner
                };
                return returnPoint;
            }
        },
        {
            key: "pan",
            value: function pan(point) {
                var reset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                flipbook_2d_utils.pan(this, point, reset);
            }
        },
        {
            key: "mouseMove",
            value: function mouseMove(event) {
                var viewer = this;
                var point = viewer.eventToPoint(event);
                if (event.touches != null && event.touches.length == 2) {
                    this.pinchMove(event);
                    return;
                }
                //PAN
                if (viewer.app.zoomValue !== 1 && viewer.startPoint != null && viewer.canSwipe === true) {
                    viewer.pan(point);
                    event.preventDefault();
                }
                /*Magnetic Pull*/ var targetSheet = viewer.dragSheet || point.sheet;
                if (viewer.flipPage == null && (viewer.dragSheet != null || point.isInsideCorner === true)) {
                    if (viewer.dragSheet != null) {
                    // utils.log("set mouse down move");
                    } else {
                        point.y = flipbook_2d_utils.limitAt(point.y, 1, viewer.availablePageHeight() - 1);
                        point.x = flipbook_2d_utils.limitAt(point.x, 1, point.fullWidth - 1);
                    }
                    var corner = viewer.dragSheet != null ? viewer.corner : point.corner;
                    if (targetSheet.isHard) {
                        var isRight = corner === flipbook_2d_DV.TURN_CORNER.BR || corner === flipbook_2d_DV.TURN_CORNER.TR;
                        var angle = flipbook_2d_utils.angleByDistance(point.distance, point.fullWidth);
                        targetSheet.updateAngle(angle * (isRight ? -1 : 1), isRight);
                    } else {
                        targetSheet.updatePoint(point);
                    }
                    targetSheet.magnetic = true;
                    targetSheet.magneticCorner = point.corner;
                    event.preventDefault();
                //point.sheet.updatePoint(point);
                }
                /*Magnetic Release*/ if (viewer.dragSheet == null && targetSheet != null && point.isInsideCorner === false && targetSheet.magnetic === true) {
                    targetSheet.pendingPoint = point;
                    targetSheet.animateToReset = true;
                    targetSheet.magnetic = false;
                    viewer.corner = targetSheet.magneticCorner;
                    targetSheet.flip(targetSheet.pendingPoint);
                    targetSheet.pendingPoint = null;
                }
                //SWIPE
                viewer.checkSwipe(point, event);
            }
        },
        {
            /**
   * Performs:
   * 1. If click is in inside the corner - flip the page
   * 2. If drag is active - complete the flip
   * 3. Clear any swipe flags
   * @param event
   */ key: "mouseUp",
            value: function mouseUp(event) {
                var viewer = this;
                if (viewer.startPoint == null) return;
                if (!event.touches && event.button !== 0) return;
                if (viewer.dragSheet == null && event.touches != null && event.touches.length == 0) {
                    this.pinchUp(event);
                    return;
                }
                var point = viewer.eventToPoint(event);
                //1 - 2 : if there is any page dragging - finish it
                var element = event.target || event.originalTarget; //check to see if the clicked element is a link, if so skip turn
                var isClick = viewer.app.zoomValue === 1 && point.x === viewer.startPoint.x && point.y === viewer.startPoint.y && element.nodeName !== "A";
                if (event.ctrlKey === true && isClick) {
                    this.zoomOnPoint(point);
                } else if (viewer.dragSheet) {
                    event.preventDefault();
                    var sheet = viewer.dragSheet;
                    sheet.pendingPoint = point;
                    viewer.drag = point.drag;
                    /*it was a valid CLICK and was inside the corner*/ if (isClick && (point.isInsideCorner === true || point.isInsideSheet && viewer.clickAction === flipbook_2d_DV.MOUSE_CLICK_ACTIONS.NAV)) {
                        if (point.corner.indexOf("l") > -1) {
                            viewer.app.openLeft();
                        } else {
                            viewer.app.openRight();
                        }
                    } else {
                        var _currentPage = this.getBasePage();
                        if (point.distance > point.sheetWidth / 2) {
                            if (point.sheet.side === defaults_DEARVIEWER.TURN_DIRECTION.LEFT) {
                                viewer.app.openLeft();
                            } else {
                                viewer.app.openRight();
                            }
                        }
                        //if no flip occurred reset the pages.
                        if (_currentPage === this.getBasePage()) {
                            sheet.animateToReset = true;
                            sheet.flip(point);
                        }
                    }
                    viewer.dragSheet = null;
                    sheet.magnetic = false;
                } else if (isClick && !point.sheet.isFlipping && point.isInsideSheet && viewer.clickAction === flipbook_2d_DV.MOUSE_CLICK_ACTIONS.NAV) {
                    if (point.sheet.side === "left") {
                        viewer.app.openLeft();
                    } else {
                        viewer.app.openRight();
                    }
                }
                /*3 if there is swipe - clean*/ viewer.startPoint = null;
                viewer.canSwipe = false;
                viewer.drag = flipbook_2d_DV.TURN_DIRECTION.NONE;
            }
        },
        {
            key: "mouseDown",
            value: function mouseDown(event) {
                if (!event.touches && event.button !== 0) return;
                if (event.touches != null && event.touches.length == 2) {
                    this.pinchDown(event);
                    return;
                }
                var viewer = this;
                var point = viewer.eventToPoint(event);
                viewer.startPoint = point;
                viewer.lastPosX = point.x;
                viewer.lastPosY = point.y;
                if (point.isInsideCorner && viewer.flipPage == null) {
                    viewer.dragSheet = point.sheet;
                    viewer.drag = point.drag;
                    viewer.corner = point.corner;
                    if (point.sheet.pageNumber === 0) {
                        viewer.bookShadow.css({
                            width: '50%',
                            left: viewer.app.isRTL ? 0 : '50%',
                            transitionDelay: ''
                        });
                    } else if (point.sheet.pageNumber === Math.ceil(viewer.app.pageCount / 2) - 1) {
                        viewer.bookShadow.css({
                            width: '50%',
                            left: viewer.app.isRTL ? '50%' : 0,
                            transitionDelay: ''
                        });
                    }
                } else {
                    viewer.canSwipe = true;
                }
            }
        },
        {
            key: "onScroll",
            value: function onScroll(event) {}
        },
        {
            key: "resetPageTween",
            value: function resetPageTween() {
                var viewer = this;
                for(var _pageCount = 0; _pageCount < viewer.stackCount; _pageCount++){
                    var sheets = viewer.sheets[_pageCount];
                    if (sheets.currentTween) {
                        sheets.currentTween.complete(true);
                    }
                }
                viewer.requestRefresh();
            }
        },
        {
            key: "pagesReady",
            value: function pagesReady() {
                if (this.isFlipping()) return;
                if (this.app.options.flipbookFitPages === false) {
                    var basePage = this.app.viewer.getBasePage();
                    var leftViewPort = this.leftViewport = this.getViewPort(basePage + (this.isBooklet ? 0 : this.isRTL ? 1 : 0)), rightViewPort = this.rightViewPort = this.getViewPort(basePage + (this.isBooklet ? 0 : this.isRTL ? 0 : 1));
                    if (leftViewPort) {
                        var leftDimen = flipbook_2d_utils.contain(leftViewPort.width, leftViewPort.height, this.availablePageWidth(), this.availablePageHeight());
                        this.leftSheetWidth = Math.floor(leftDimen.width);
                        this.leftSheetHeight = Math.floor(leftDimen.height);
                        this.leftSheetTop = (this.availablePageHeight() - this.leftSheetHeight) / 2;
                    }
                    if (rightViewPort) {
                        var rightDimen = flipbook_2d_utils.contain(rightViewPort.width, rightViewPort.height, this.availablePageWidth(), this.availablePageHeight());
                        this.rightSheetWidth = Math.floor(rightDimen.width);
                        this.rightSheetHeight = Math.floor(rightDimen.height);
                        this.rightSheetTop = (this.availablePageHeight() - this.rightSheetHeight) / 2;
                    }
                    this.totalSheetsWidth = this.leftSheetWidth + this.rightSheetWidth;
                    for(var i = 0; i < this.sheets.length; i++){
                        var sheet = this.sheets[i];
                        if (sheet.side === flipbook_2d_DV.TURN_DIRECTION.LEFT) {
                            sheet.updateSize(this.leftSheetWidth, this.leftSheetHeight, this.leftSheetTop);
                        } else {
                            sheet.updateSize(this.rightSheetWidth, this.rightSheetHeight, this.rightSheetTop);
                        }
                    }
                }
                this.updateCenter();
                this.updatePendingStatusClass();
            }
        },
        {
            key: "textureLoadedCallback",
            value: function textureLoadedCallback(param) {
                var page = this.getPageByNumber(param.pageNumber);
                this.pagesReady();
            }
        }
    ]);
    return FlipBook2D;
}(BaseFlipBookViewer);


;// CONCATENATED MODULE: ./src/js/dearviewer/viewers/slider.js
function slider_assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function slider_class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function slider_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function slider_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) slider_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) slider_defineProperties(Constructor, staticProps);
    return Constructor;
}
function slider_get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        slider_get = Reflect.get;
    } else {
        slider_get = function get(target, property, receiver) {
            var base = slider_super_prop_base(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver || target);
            }
            return desc.value;
        };
    }
    return slider_get(target, property, receiver || target);
}
function slider_get_prototype_of(o) {
    slider_get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return slider_get_prototype_of(o);
}
function slider_inherits(subClass, superClass) {
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
    if (superClass) slider_set_prototype_of(subClass, superClass);
}
function slider_possible_constructor_return(self, call) {
    if (call && (slider_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return slider_assert_this_initialized(self);
}
function slider_set_prototype_of(o, p) {
    slider_set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return slider_set_prototype_of(o, p);
}
function slider_super_prop_base(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = slider_get_prototype_of(object);
        if (object === null) break;
    }
    return object;
}
function slider_type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function slider_is_native_reflect_construct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function slider_create_super(Derived) {
    var hasNativeReflectConstruct = slider_is_native_reflect_construct();
    return function _createSuperInternal() {
        var Super = slider_get_prototype_of(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = slider_get_prototype_of(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return slider_possible_constructor_return(this, result);
    };
}



var slider_utils = defaults_DEARVIEWER.utils;
var SliderPage = /*#__PURE__*/ function(BookSheet2D) {
    "use strict";
    slider_inherits(SliderPage, BookSheet2D);
    var _super = slider_create_super(SliderPage);
    function SliderPage() {
        slider_class_call_check(this, SliderPage);
        return _super.apply(this, arguments);
    }
    slider_create_class(SliderPage, [
        {
            key: "init",
            value: function init() {
                var sheet = this, div = '<div>';
                var element = sheet.element = jQuery(div, {
                    class: 'df-sheet'
                });
                var frontPage = sheet.frontPage = new Page2D();
                frontPage.element.addClass('df-page-front').appendTo(sheet.element);
                var backPage = sheet.backPage = new Page2D();
                backPage.element.addClass('df-page-back').appendTo(sheet.element);
                this.parentElement.append(element);
                this.frontPage.sheet = this.backPage.sheet = this;
            }
        },
        {
            key: "completeTween",
            value: function completeTween() {
                var sheet = this;
                sheet.isFlipping = false;
                sheet.viewer.onFlip();
                sheet.viewer.afterFlip();
                sheet.viewer.requestRefresh();
                sheet.element[0].style.opacity = 1;
            }
        },
        {
            key: "flip",
            value: function flip(point) {
                var sheet = this;
                sheet.side = sheet.targetSide;
                this.completeTween();
            }
        },
        {
            key: "updateSize",
            value: function updateSize(width, height, top) {
                width = Math.floor(width);
                height = Math.floor(height);
                top = Math.floor(top);
                this.element[0].style.height = this.frontPage.element[0].style.height = height + "px";
                this.element[0].style.width = this.frontPage.element[0].style.width = width + "px";
                this.element[0].style.transform = 'translateX(' + this.positionX + 'px) translateY(' + top + 'px)';
            }
        }
    ]);
    return SliderPage;
}(BookSheet2D);
var Slider = /*#__PURE__*/ function(FlipBook2D) {
    "use strict";
    slider_inherits(Slider, FlipBook2D);
    var _super = slider_create_super(Slider);
    function Slider(options, appContext) {
        slider_class_call_check(this, Slider);
        var _this;
        options.viewerClass = "df-slider";
        options.pageMode = defaults_DEARVIEWER.FLIPBOOK_PAGE_MODE.SINGLE;
        options.singlePageMode = defaults_DEARVIEWER.FLIPBOOK_SINGLE_PAGE_MODE.BOOKLET;
        options.pageSize = defaults_DEARVIEWER.FLIPBOOK_PAGE_SIZE.SINGLE;
        _this = _super.call(this, options, appContext);
        _this.stackCount = 10;
        _this.soundOn = false;
        _this.foldSense = 0;
        appContext._viewerPrepared();
        return _this;
    }
    slider_create_class(Slider, [
        {
            key: "initPages",
            value: function initPages() {
                for(var count = 0; count < this.stackCount; count++){
                    var sheet = new SliderPage({
                        parentElement: this.wrapper
                    });
                    sheet.index = count; //just reference for debugging
                    sheet.viewer = this;
                    this.sheets.push(sheet);
                    this.pages.push(sheet.frontPage);
                    this.pages.push(sheet.backPage);
                }
            }
        },
        {
            key: "resize",
            value: function resize() {
                slider_get(slider_get_prototype_of(Slider.prototype), "resize", this).call(this);
                this.skipTransition = true;
            }
        },
        {
            key: "refreshSheet",
            value: function refreshSheet(options) {
                var _sheet = options.sheet, sheetPageNumber = options.sheetNumber;
                _sheet.element.toggleClass("df-no-transition", _sheet.skipFlip || this.skipTransition);
                //Render Pages & flip
                if (_sheet.isFlipping === false) {
                    if (options.needsFlip) {
                        _sheet.flip();
                    } else {
                        // page.depth = depth;
                        _sheet.skipFlip = false;
                        _sheet.element.removeClass("df-flipping df-quick-turn df-folding df-left-side df-right-side");
                        _sheet.element.addClass(_sheet.targetSide === defaults_DEARVIEWER.TURN_DIRECTION.LEFT ? "df-left-side" : "df-right-side");
                        _sheet.side = _sheet.targetSide;
                    }
                }
                _sheet.visible = options.visible;
                _sheet.updateCSS({
                    display: options.sheetNumber > 0 && options.sheetNumber <= this.app.pageCount ? "block" : "none",
                    zIndex: options.zIndex
                });
                if (sheetPageNumber !== _sheet.pageNumber) {
                    _sheet.element.attr("number", sheetPageNumber);
                    _sheet.backPage.element.attr("pagenumber", _sheet.backPage.pageNumber);
                    _sheet.frontPage.element.attr("pagenumber", _sheet.frontPage.pageNumber);
                }
            }
        },
        {
            key: "refresh",
            value: function refresh() {
                slider_get(slider_get_prototype_of(Slider.prototype), "refresh", this).call(this);
                this.skipTransition = false;
            }
        },
        {
            key: "eventToPoint",
            value: function eventToPoint(event) {
                var point = slider_get(slider_get_prototype_of(Slider.prototype), "eventToPoint", this).call(this, event);
                //setting isInsideSheet == true call every other match as right page slide
                point.isInsideSheet = jQuery(event.srcElement).closest(".df-page").length > 0;
                point.isInsideCorner = false;
                return point;
            }
        },
        {
            key: "initCustomControls",
            value: function initCustomControls() {
                //added so that sound is removed
                var ui = this.app.ui;
                var controls = ui.controls;
                if (controls.pageMode) controls.pageMode.hide();
            }
        },
        {
            key: "setPageMode",
            value: function setPageMode(args) {
                args.isSingle = true;
                slider_get(slider_get_prototype_of(Slider.prototype), "setPageMode", this).call(this, args);
            }
        },
        {
            key: "pagesReady",
            value: function pagesReady() {
                if (this.isFlipping()) return;
                var leftPos = 0, rightPos = 0;
                var app = this.app;
                var midpoint = Math.floor(this.stackCount / 2);
                var pages = [];
                var page = app.currentPageNumber;
                for(var _count = 0; _count < this.stackCount / 2; _count++){
                    pages.push(page + _count);
                    pages.push(page - _count - 1);
                }
                for(var i = 0; i < this.stackCount; i++){
                    var pageNumber = pages[i];
                    var page1 = this.getPageByNumber(pageNumber);
                    if (page1) {
                        var sheet = this.getPageByNumber(pageNumber).sheet;
                        var viewPort = this.getViewPort(sheet.pageNumber, true);
                        var size = slider_utils.contain(viewPort.width, viewPort.height, this.availablePageWidth(), this.availablePageHeight());
                        if (app.currentPageNumber === sheet.pageNumber) {
                            this.leftSheetWidth = this.rightSheetWidth = Math.floor(size.width);
                        }
                        if (app.currentPageNumber > sheet.pageNumber) {
                            leftPos -= Math.floor(size.width) + 10;
                            sheet.positionX = leftPos;
                        } else {
                            sheet.positionX = rightPos;
                            rightPos += Math.floor(size.width) + 10;
                        }
                        var top = (this.availablePageHeight() - size.height) / 2;
                        sheet.updateSize(Math.floor(size.width * app.zoomValue), Math.floor(size.height * app.zoomValue), top);
                    }
                }
                this.updateCenter();
                this.updatePendingStatusClass();
            }
        }
    ]);
    return Slider;
}(FlipBook2D);


;// CONCATENATED MODULE: ./src/js/dearviewer/viewers/mockup.js
function mockup_assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function mockup_class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function mockup_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function mockup_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) mockup_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) mockup_defineProperties(Constructor, staticProps);
    return Constructor;
}
function mockup_get_prototype_of(o) {
    mockup_get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return mockup_get_prototype_of(o);
}
function mockup_inherits(subClass, superClass) {
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
    if (superClass) mockup_set_prototype_of(subClass, superClass);
}
function mockup_instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function mockup_possible_constructor_return(self, call) {
    if (call && (mockup_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return mockup_assert_this_initialized(self);
}
function mockup_set_prototype_of(o, p) {
    mockup_set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return mockup_set_prototype_of(o, p);
}
function mockup_type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function mockup_is_native_reflect_construct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function mockup_create_super(Derived) {
    var hasNativeReflectConstruct = mockup_is_native_reflect_construct();
    return function _createSuperInternal() {
        var Super = mockup_get_prototype_of(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = mockup_get_prototype_of(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return mockup_possible_constructor_return(this, result);
    };
}

var MOCKUP = {};
MOCKUP.init = function() {
    //region MOCKUP
    if (MOCKUP.initialized === true) return;
    var THREE = window.THREE;
    MOCKUP = {
        init: function init() {},
        initialized: true,
        GEOMETRY_TYPE: {
            PLANE: 0,
            BOX: 1,
            MODEL: 2
        },
        MATERIAL_FACE: {
            FRONT: 5,
            BACK: 4
        },
        WHITE_COLOR: new THREE.Color("white"),
        defaults: {
            anisotropy: 8,
            maxTextureSize: 2048,
            groundTexture: "blank",
            color: 0xffffff,
            shininess: 15,
            width: 210,
            height: 297,
            depth: 0.2,
            segments: 150,
            textureLoadFallback: "blank"
        },
        textureLoader: new THREE.TextureLoader(),
        clearChild: function clearChild(child) {
            var material = child.material;
            child.parent.remove(child);
            var texture;
            child = utils.disposeObject(child);
            if (material == null) return;
            if (material.length == null) {
                if (material.map) {
                    texture = material.map;
                    material.dispose();
                    texture.dispose();
                }
                if (material.bumpMap) {
                    texture = material.bumpMap;
                    material.dispose();
                    texture.dispose();
                }
                if (material.normalMap) {
                    texture = material.normalMap;
                    material.dispose();
                    texture.dispose();
                }
            } else {
                for(var matCount = 0; matCount < material.length; matCount++){
                    if (material[matCount]) {
                        if (material[matCount].map) {
                            texture = material[matCount].map;
                            material[matCount].dispose();
                            texture.dispose();
                        }
                        if (material[matCount].bumpMap) {
                            texture = material[matCount].bumpMap;
                            material[matCount].dispose();
                            texture.dispose();
                        }
                        if (material[matCount].normalMap) {
                            texture = material[matCount].normalMap;
                            material[matCount].dispose();
                            texture.dispose();
                        }
                    }
                    material[matCount] = null;
                }
            }
            material = null;
            texture = null;
        },
        /**
     * @param {Paper} object
     * @param image
     * @param faceNumber
     * @param mapType
     * @param callback
     * @returns {number|*}
     */ loadImage: function loadImage(object, image, faceNumber, mapType, callback) {
            if (image == null) {
                var value = object.material[faceNumber] == null ? null : object.material[faceNumber][mapType] ? object.material[faceNumber][mapType].sourceFile : null;
                return value == null ? null : value.indexOf("data:image") > -1 ? null : value;
            } else {
                var _texture = null;
                if (image.nodeName === "CANVAS" || image.nodeName === "IMG") {
                    _texture = new THREE.Texture(image);
                    _texture.needsUpdate = true;
                    MOCKUP.loadTexture(_texture, object, mapType, faceNumber);
                    if (typeof callback === "function") callback(object, _texture);
                } else {
                    if (image !== "blank") {
                        _texture = image == null ? null : MOCKUP.textureLoader.load(image, function textureOnLoad(texture) {
                            texture.sourceFile = image;
                            MOCKUP.loadTexture(texture, object, mapType, faceNumber);
                            if (typeof callback === "function") callback(object, texture);
                        }, void 0, function textureOnError() {
                            if (_texture.image == null) {
                                MOCKUP.loadImage(object, MOCKUP.defaults.textureLoadFallback, faceNumber, mapType);
                            }
                            MOCKUP.loadTextureFailed();
                        });
                        if (_texture) _texture.mapping = THREE.UVMapping;
                    } else {
                        MOCKUP.loadTexture(null, object, mapType, faceNumber);
                        if (typeof callback === "function") callback(object, _texture);
                    }
                }
                return 0;
            }
        },
        //load image to texture
        loadTexture: function loadTexture(texture, object, mapType, faceNumber) {
            if (texture) {
                var img = texture.image;
                texture.naturalWidth = img.naturalWidth;
                texture.naturalHeight = img.naturalHeight;
                texture.needsUpdate = true;
                if (object.textureRotation != void 0) {
                    texture.rotation = THREE.MathUtils.degToRad(object.textureRotation);
                    texture.center = object.textureCenter;
                }
            }
            if (texture !== null && mapType === "map") {
                texture.anisotropy = 0;
                if (MOCKUP.defaults.anisotropy > 0) texture.anisotropy = MOCKUP.defaults.anisotropy;
                if (THREE.skipPowerOfTwo === true) {
                    texture.minFilter = THREE.LinearFilter;
                    texture.magFilter = THREE.LinearFilter;
                }
                texture.name = new Date().toTimeString();
            }
            MOCKUP.clearTexture(object.material[faceNumber][mapType]);
            object.material[faceNumber][mapType] = texture;
            if (mapType === "bumpMap") object.material[faceNumber].bumpScale = object.sheet.getBumpScale(faceNumber);
            // if (mapType === "normalMap")
            //   object.material[faceNumber].normalScale = object.sheet.getBumpScale(faceNumber);
            object.material[faceNumber].needsUpdate = true;
        },
        //load image to texture
        loadTextureFailed: function loadTextureFailed() {
            //console.log("Failed to load texture:" + image);
            return null;
        },
        clearTexture: function clearTexture(texture) {
            if (texture) {
                if (texture.image) {
                    if (texture.image.nodeName === "CANVAS") {
                        if (texture.image.remove) texture.image.remove();
                        delete texture.image;
                    }
                }
                texture = utils.disposeObject(texture);
            }
        }
    };
    THREE.skipPowerOfTwo = true;
    /**
   * @typedef {Object} Paper
   * @property material
   */ var Paper = /*#__PURE__*/ function(_THREE_Mesh) {
        "use strict";
        mockup_inherits(Paper, _THREE_Mesh);
        var _super = mockup_create_super(Paper);
        function Paper(options) {
            mockup_class_call_check(this, Paper);
            var _this;
            var width = options.width || MOCKUP.defaults.width, height = options.height || MOCKUP.defaults.height, color = options.color || MOCKUP.defaults.color, segments = options.segments || MOCKUP.defaults.segments, depth = options.depth || MOCKUP.defaults.depth;
            var _matParameters = {
                color: color,
                flatShading: false,
                shininess: options.shininess || MOCKUP.defaults.shininess
            };
            var _material = new THREE.MeshPhongMaterial(_matParameters);
            // _matParameters.flatShading = false; smooth-shading causes shadow in the middle of books - solved with extra vertex in updateAngle()
            var _materials = [
                _material,
                _material,
                _material,
                _material,
                new THREE.MeshPhongMaterial(_matParameters),
                new THREE.MeshPhongMaterial(_matParameters)
            ];
            _this = _super.call(this, new THREE.BoxGeometry(width, height, depth, segments, 1, 1), _materials);
            _this.material[5].transparent = true;
            _this.material[4].transparent = true;
            _this.baseType = "Paper";
            _this.type = "Paper";
            _this.castShadow = true;
            _this.receiveShadow = true;
            options.parent3D.add(mockup_assert_this_initialized(_this));
            return _this;
        }
        mockup_create_class(Paper, [
            {
                key: "loadImage",
                value: function loadImage(texture, face, callback) {
                    MOCKUP.loadImage(this, texture, face, "map", callback);
                }
            },
            {
                key: "frontImage",
                value: function frontImage(texture, callback) {
                    MOCKUP.loadImage(this, texture, MOCKUP.MATERIAL_FACE.FRONT, "map", callback);
                }
            },
            {
                key: "backImage",
                value: function backImage(texture, callback) {
                    MOCKUP.loadImage(this, texture, MOCKUP.MATERIAL_FACE.BACK, "map", callback);
                }
            },
            {
                key: "loadBump",
                value: function loadBump(texture) {
                    MOCKUP.loadImage(this, texture, MOCKUP.MATERIAL_FACE.FRONT, "bumpMap", null);
                    MOCKUP.loadImage(this, texture, MOCKUP.MATERIAL_FACE.BACK, "bumpMap", null);
                }
            },
            {
                key: "loadNormalMap",
                value: function loadNormalMap(texture, face) {
                    if (face !== void 0) {
                        MOCKUP.loadImage(this, texture, face, "normalMap", null);
                        return;
                    }
                    MOCKUP.loadImage(this, texture, MOCKUP.MATERIAL_FACE.FRONT, "normalMap", null);
                    MOCKUP.loadImage(this, texture, MOCKUP.MATERIAL_FACE.BACK, "normalMap", null);
                }
            }
        ]);
        return Paper;
    }(THREE.Mesh);
    var Ground = /*#__PURE__*/ function(Paper) {
        "use strict";
        mockup_inherits(Ground, Paper);
        var _super = mockup_create_super(Ground);
        function Ground(options) {
            mockup_class_call_check(this, Ground);
            var _this;
            _this = _super.call(this, options);
            _this.receiveShadow = true;
            _this.frontImage(MOCKUP.defaults.groundTexture);
            _this.backImage(MOCKUP.defaults.groundTexture);
            _this.type = "Ground";
            return _this;
        }
        return Ground;
    }(Paper);
    var Stage = /*#__PURE__*/ function(_THREE_Scene) {
        "use strict";
        mockup_inherits(Stage, _THREE_Scene);
        var _super = mockup_create_super(Stage);
        function Stage(parameters) {
            mockup_class_call_check(this, Stage);
            var _this;
            _this = _super.call(this);
            var stage = mockup_assert_this_initialized(_this);
            //currently canvas is compulsory
            stage.canvas = parameters.canvas || document.createElement('canvas');
            stage.canvas = jQuery(_this.canvas);
            stage.camera = new THREE.PerspectiveCamera(20, stage.width / stage.height, 4, 50000);
            stage.renderer = new THREE.WebGLRenderer({
                canvas: stage.canvas[0],
                antialias: true,
                alpha: true
            });
            stage.renderer.setPixelRatio(parameters.pixelRatio);
            stage.renderer.setSize(stage.width, stage.height);
            stage.renderer.setClearColor(0xffffff, 0);
            // let orbitControl = stage.orbitControl = new THREE.SimpleOrbitControls(stage.renderer, stage, stage.camera);
            stage.renderer.shadowMap.enabled = true;
            stage.renderer.shadowMap.type = 1;
            stage.ground = new Ground({
                color: 0xffffff,
                height: stage.camera.far / 10,
                width: stage.camera.far / 10,
                segments: 2,
                parent3D: stage
            });
            stage.ambientLight = new THREE.AmbientLight(0x444444);
            stage.add(stage.ambientLight);
            var spotLight = stage.spotLight = new THREE.DirectionalLight(0xffffff, 0.25);
            spotLight.position.set(0, 1, 0);
            if (parameters.castShadow !== false) {
                spotLight.castShadow = true;
                spotLight.shadow.camera.near = 200;
                spotLight.shadow.camera.far = 2000;
                spotLight.shadow.camera.top = 1350;
                spotLight.shadow.camera.bottom = -1350;
                spotLight.shadow.camera.left = -1350;
                spotLight.shadow.camera.right = 1350;
                spotLight.shadow.radius = 2;
                spotLight.shadow.mapSize.width = 1024;
                spotLight.shadow.mapSize.height = 1024;
                spotLight.shadow.needsUpdate = true;
            }
            stage.add(spotLight);
            stage.animateCount = 0;
            stage.renderCount = 0;
            stage.camera.position.set(-300, 300, 300);
            stage.camera.lookAt(new THREE.Vector3(0, 0, 0));
            return _this;
        }
        mockup_create_class(Stage, [
            {
                key: "resizeCanvas",
                value: function resizeCanvas(width, height) {
                    this.renderer.setSize(width, height);
                    this.camera.aspect = width / height;
                    this.camera.updateProjectionMatrix();
                }
            },
            {
                key: "render",
                value: function render() {
                    this.animateCount++;
                    this.renderer.render(this, this.camera);
                    if (this.stats != null) this.stats.update();
                }
            },
            {
                key: "clearMaterials",
                value: function clearMaterials() {
                    var totalChild = this.children.length;
                    for(var count = totalChild - 1; count >= 0; count--){
                        var child = this.children[count];
                        if (child.baseType && child.baseType === "Paper") {
                            if (child.material) {
                                if (child.material.length) {
                                    for(var countMat = 0; countMat < child.material.length; countMat++)child.material[countMat].needsUpdate = true;
                                } else {
                                    child.material.needsUpdate = true;
                                }
                            }
                        }
                    }
                }
            },
            {
                key: "clearChild",
                value: function clearChild() {
                    this.spotLight.shadow.map = utils.disposeObject(this.spotLight.shadow.map);
                    this.spotLight.castShadow = false;
                    this.clearMaterials();
                    var totalChild = this.children.length;
                    for(var count = totalChild - 1; count >= 0; count--){
                        var child = this.children[count];
                        if (child.children && child.children.length > 0) {
                            for(var stackCount = child.children.length - 1; stackCount >= 0; stackCount--){
                                MOCKUP.clearChild(child.children[stackCount]);
                            }
                        }
                        MOCKUP.clearChild(child);
                        child = null;
                    }
                    this.render();
                }
            }
        ]);
        return Stage;
    }(THREE.Scene);
    MOCKUP.Paper = Paper;
    MOCKUP.Stage = Stage;
    //endregion
    //region CSS3DObject
    var CSS3DObject = /*#__PURE__*/ function(_THREE_Object3D) {
        "use strict";
        mockup_inherits(CSS3DObject, _THREE_Object3D);
        var _super = mockup_create_super(CSS3DObject);
        function CSS3DObject(e) {
            mockup_class_call_check(this, CSS3DObject);
            var _this;
            _this = _super.call(this);
            _this.element = e;
            _this.element.style.position = "absolute";
            _this.addEventListener("removed", function() {
                if (this.element.parentNode !== null) {
                    this.element.parentNode.removeChild(this.element);
                }
            });
            return _this;
        }
        return CSS3DObject;
    }(THREE.Object3D);
    THREE.CSS3DObject = CSS3DObject;
    var CSS3DSprite = /*#__PURE__*/ function(_THREE_CSS3DObject) {
        "use strict";
        mockup_inherits(CSS3DSprite, _THREE_CSS3DObject);
        var _super = mockup_create_super(CSS3DSprite);
        function CSS3DSprite(e) {
            mockup_class_call_check(this, CSS3DSprite);
            return _super.call(this, e);
        }
        return CSS3DSprite;
    }(THREE.CSS3DObject);
    THREE.CSS3DSprite = CSS3DSprite;
    if (THREE.MathUtils) THREE.Math = THREE.MathUtils;
    THREE.CSS3DRenderer = function() {
        utils.log("THREE.CSS3DRenderer", THREE.REVISION);
        var e, t;
        var r, i;
        var n = new THREE.Matrix4;
        var a = {
            camera: {
                fov: 0,
                style: ""
            },
            objects: {}
        };
        var o = document.createElement("div");
        o.style.overflow = "hidden";
        o.style.WebkitTransformStyle = "preserve-3d";
        o.style.MozTransformStyle = "preserve-3d";
        o.style.oTransformStyle = "preserve-3d";
        o.style.transformStyle = "preserve-3d";
        this.domElement = o;
        var s = document.createElement("div");
        s.style.WebkitTransformStyle = "preserve-3d";
        s.style.MozTransformStyle = "preserve-3d";
        s.style.oTransformStyle = "preserve-3d";
        s.style.transformStyle = "preserve-3d";
        o.appendChild(s);
        this.setClearColor = function() {};
        this.getSize = function() {
            return {
                width: e,
                height: t
            };
        };
        this.setSize = function(n, a) {
            e = n;
            t = a;
            r = e / 2;
            i = t / 2;
            o.style.width = n + "px";
            o.style.height = a + "px";
            s.style.width = n + "px";
            s.style.height = a + "px";
        };
        var h = function h(e) {
            return Math.abs(e) < Number.EPSILON ? 0 : e;
        };
        var u = function u(e) {
            var t = e.elements;
            return "matrix3d(" + h(t[0]) + "," + h(-t[1]) + "," + h(t[2]) + "," + h(t[3]) + "," + h(t[4]) + "," + h(-t[5]) + "," + h(t[6]) + "," + h(t[7]) + "," + h(t[8]) + "," + h(-t[9]) + "," + h(t[10]) + "," + h(t[11]) + "," + h(t[12]) + "," + h(-t[13]) + "," + h(t[14]) + "," + h(t[15]) + ")";
        };
        var c = function c(e) {
            var t = e.elements;
            return "translate3d(-50%,-50%,0) matrix3d(" + h(t[0]) + "," + h(t[1]) + "," + h(t[2]) + "," + h(t[3]) + "," + h(-t[4]) + "," + h(-t[5]) + "," + h(-t[6]) + "," + h(-t[7]) + "," + h(t[8]) + "," + h(t[9]) + "," + h(t[10]) + "," + h(t[11]) + "," + h(t[12]) + "," + h(t[13]) + "," + h(t[14]) + "," + h(t[15]) + ")";
        };
        var l = function l1(e, t) {
            if (mockup_instanceof(e, THREE.CSS3DObject)) {
                var r;
                if (mockup_instanceof(e, THREE.CSS3DSprite)) {
                    n.copy(t.matrixWorldInverse);
                    n.transpose();
                    n.copyPosition(e.matrixWorld);
                    n.scale(e.scale);
                    n.elements[3] = 0;
                    n.elements[7] = 0;
                    n.elements[11] = 0;
                    n.elements[15] = 1;
                    r = c(n);
                } else {
                    r = c(e.matrixWorld);
                }
                var i = e.element;
                var o = a.objects[e.id];
                if (o === undefined || o !== r) {
                    i.style.WebkitTransform = r;
                    i.style.MozTransform = r;
                    i.style.oTransform = r;
                    i.style.transform = r;
                    a.objects[e.id] = r;
                }
                if (i.parentNode !== s) {
                    s.appendChild(i);
                }
            }
            for(var h = 0, u = e.children.length; h < u; h++){
                l(e.children[h], t);
            }
        };
        this.render = function(e, n) {
            var h = .5 / Math.tan(THREE.Math.degToRad(n.fov * .5)) * t;
            if (a.camera.fov !== h) {
                o.style.WebkitPerspective = h + "px";
                o.style.MozPerspective = h + "px";
                o.style.oPerspective = h + "px";
                o.style.perspective = h + "px";
                a.camera.fov = h;
            }
            e.updateMatrixWorld();
            if (n.parent === null) n.updateMatrixWorld();
            if (n.matrixWorldInverse.invert) n.matrixWorldInverse.copy(n.matrixWorld).invert();
            else n.matrixWorldInverse.getInverse(n.matrixWorld);
            var c = "translate3d(0,0," + h + "px)" + u(n.matrixWorldInverse) + " translate3d(" + r + "px," + i + "px, 0)";
            if (a.camera.style !== c) {
                s.style.WebkitTransform = c;
                s.style.MozTransform = c;
                s.style.oTransform = c;
                s.style.transform = c;
                a.camera.style = c;
            }
            l(e, n);
        };
    };
//endregion
};


;// CONCATENATED MODULE: ./src/js/dearviewer/viewers/flipbook-3d.js
/* globals jQuery, pdfjsLib,THREE  */ function flipbook_3d_assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function flipbook_3d_class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function flipbook_3d_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function flipbook_3d_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) flipbook_3d_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) flipbook_3d_defineProperties(Constructor, staticProps);
    return Constructor;
}
function flipbook_3d_get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        flipbook_3d_get = Reflect.get;
    } else {
        flipbook_3d_get = function get(target, property, receiver) {
            var base = flipbook_3d_super_prop_base(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver || target);
            }
            return desc.value;
        };
    }
    return flipbook_3d_get(target, property, receiver || target);
}
function flipbook_3d_get_prototype_of(o) {
    flipbook_3d_get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return flipbook_3d_get_prototype_of(o);
}
function flipbook_3d_inherits(subClass, superClass) {
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
    if (superClass) flipbook_3d_set_prototype_of(subClass, superClass);
}
function flipbook_3d_possible_constructor_return(self, call) {
    if (call && (flipbook_3d_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return flipbook_3d_assert_this_initialized(self);
}
function flipbook_3d_set_prototype_of(o, p) {
    flipbook_3d_set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return flipbook_3d_set_prototype_of(o, p);
}
function flipbook_3d_super_prop_base(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = flipbook_3d_get_prototype_of(object);
        if (object === null) break;
    }
    return object;
}
function flipbook_3d_type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function flipbook_3d_is_native_reflect_construct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function flipbook_3d_create_super(Derived) {
    var hasNativeReflectConstruct = flipbook_3d_is_native_reflect_construct();
    return function _createSuperInternal() {
        var Super = flipbook_3d_get_prototype_of(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = flipbook_3d_get_prototype_of(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return flipbook_3d_possible_constructor_return(this, result);
    };
}




var flipbook_3d_DV = defaults_DEARVIEWER;
var flipbook_3d_utils = flipbook_3d_DV.utils;
var BookSheet3D = /*#__PURE__*/ function(BookSheet) {
    "use strict";
    flipbook_3d_inherits(BookSheet3D, BookSheet);
    var _super = flipbook_3d_create_super(BookSheet3D);
    function BookSheet3D(options) {
        flipbook_3d_class_call_check(this, BookSheet3D);
        var _this;
        _this = _super.call(this, options);
        _this.flexibility = options.flexibility;
        _this.sheetAngle = 180;
        _this.curveAngle = 0;
        _this.parent3D = options.parent3D;
        _this.segments = options.segments || 50;
        _this.width = options.width || 100;
        _this.height = options.height || 100;
        _this.depth = options.depth || 0.5; //is overridden from options
        _this.matColor = "white";
        _this.fallbackMatColor = MOCKUP.WHITE_COLOR;
        _this.init();
        _this.bumpScale = [
            0,
            0,
            0,
            0,
            1,
            1
        ];
        return _this;
    }
    flipbook_3d_create_class(BookSheet3D, [
        {
            key: "init",
            value: function init() {
                var sheet = this;
                sheet.element = new MOCKUP.Paper({
                    parent3D: sheet.parent3D,
                    segments: sheet.segments,
                    depth: sheet.depth,
                    height: sheet.height,
                    width: sheet.width,
                    flatShading: sheet.flexibility === 0 ? true : false
                });
                sheet.element.sheet = sheet;
                sheet.frontPage = new Page3D({
                    sheet: sheet,
                    face: 5
                });
                sheet.backPage = new Page3D({
                    sheet: sheet,
                    face: 4
                });
                sheet.reset();
                sheet.updateAngle();
            //sheet.element.loadBump("http://localhost/tmp/cardboard.png");
            }
        },
        {
            key: "setMatColor",
            value: function setMatColor(val, face) {
                this.matColor = new THREE.Color(val);
                if (face === void 0) {
                    for(var i = 0; i < 6; i++){
                        this.element.material[i].color = this.matColor;
                    }
                } else {
                    this.element.material[face].color = this.matColor;
                }
            }
        },
        {
            key: "getBumpScale",
            value: function getBumpScale(face) {
                return this.bumpScale[face];
            }
        },
        {
            key: "resetMatColor",
            value: function resetMatColor(face, applyMatColor) {
                this.element.material[face].color = applyMatColor ? this.matColor : this.fallbackMatColor;
            }
        },
        {
            key: "frontImage",
            value: function frontImage(texture, callback) {
                this.element.frontImage(texture, callback);
            }
        },
        {
            key: "backImage",
            value: function backImage(texture, callback) {
                this.element.backImage(texture, callback);
            }
        },
        {
            key: "updateAngle",
            value: function updateAngle() {
                var sheet = this;
                if (this.viewer === undefined || this.viewer === null) return;
                var flexibility = sheet.isHard === true ? 0 : sheet.flexibility;
                var width = (this.viewer.orientation === 'vertical' ? this.height : this.width) * (1 - Math.sin(flexibility / 2 * (flexibility / 2)) / 2 - flexibility / 20);
                this.element.scale.y = (this.viewer.orientation === 'vertical' ? this.width : this.height) / this.element.geometry.parameters.height;
                // this.element.scale.x = this.width / this.element.geometry.parameters.width;
                // this.element.scale.z = 1;
                var segments = sheet.segments;
                var foldCount = 1;
                var foldWidth = width / foldCount; //fold-width
                var curveHandlePoint = foldWidth * flexibility; //bend control point distance
                var curveWidth = foldWidth; //curve width still not perfect
                //control pointsFront are a list of at least (degree+1)
                var curvesFront = [];
                var curvesBack = [];
                var verticesFront = [];
                var verticesBack = [];
                var pointsFront = [];
                var pointsBack = [];
                var sheetDepth = sheet.depth; // distance Bias
                //calculate folds controls points
                var sum = 0, distances = [];
                distances.push(sum);
                // let test = false;
                // region CalcPoints
                pointsFront[0] = [];
                pointsBack[0] = [];
                var sheetAngle = sheet.sheetAngle * Math.PI / 180; // the angle at which the sheet will turn
                // if (this.viewer.pageOffset && this.viewer.hasSpiral) {
                if (this.viewer.orientation !== 'vertical') {
                    this.element.position.x = -Math.cos(sheetAngle) * this.viewer.pageOffset;
                }
                if (this.viewer.orientation === 'vertical') {
                    this.element.position.y = Math.cos(sheetAngle) * this.viewer.pageOffset;
                }
                // }
                var curveAngle = sheet.isHard === true ? sheetAngle : sheet.curveAngle * Math.PI / 180; // the angle at which curve will form due to curve handle point
                var pointAngle = sheet.sheetAngle * Math.PI / 180;
                var pointAngleB = pointAngle - Math.PI / 2, zShift = Math.sin(pointAngleB) * sheetDepth / 2;
                pointsFront[0][0] = pointsFront[0][1] = new THREE.Vector3(-curveWidth * Math.cos(sheetAngle), 0, Math.sin(sheetAngle) * curveWidth - zShift);
                pointsBack[0][0] = pointsBack[0][1] = new THREE.Vector3(pointsFront[0][0].x - Math.cos(pointAngleB) * sheetDepth, 0, pointsFront[0][0].z + zShift * 2);
                pointsFront[0][1] = new THREE.Vector3(-curveWidth / 2 * Math.cos(curveAngle), 0, curveWidth / 2 * Math.sin(curveAngle) - zShift);
                pointsBack[0][1] = new THREE.Vector3(pointsFront[0][1].x - Math.cos(pointAngleB) * sheetDepth, 0, pointsFront[0][1].z + zShift * 2);
                pointAngle = (45 + sheet.sheetAngle / 2) * Math.PI / 180;
                pointsFront[0][2] = new THREE.Vector3(-Math.cos(pointAngle) * curveHandlePoint / 2, 0, Math.sin(pointAngle) * curveHandlePoint - zShift);
                pointsBack[0][2] = new THREE.Vector3(pointsFront[0][2].x + Math.cos(pointAngleB) * sheetDepth, 0, pointsFront[0][2].z + zShift * 2);
                if (Math.abs(pointsBack[0][2].x - 0) < 0.0005) pointsBack[0][2].x = 0;
                pointsFront[0][3] = new THREE.Vector3(0, 0, -zShift);
                pointsBack[0][3] = new THREE.Vector3(pointsFront[0][3].x - Math.cos(pointAngleB) * sheetDepth, 0, pointsFront[0][3].z + zShift * 2); //pointsFront[0][3];
                if (Math.abs(pointsBack[0][3].x - 0) < 0.0005) pointsBack[0][3].x = 0;
                //endregion
                for(var curveCount = 0; curveCount < foldCount; curveCount++){
                    var length = Math.max(sheet.segments - 1, 1);
                    curvesFront[curveCount] = new THREE.CubicBezierCurve3(pointsFront[curveCount][0], pointsFront[curveCount][1], pointsFront[curveCount][2], pointsFront[curveCount][3]);
                    verticesFront[curveCount] = curvesFront[curveCount].getPoints(length);
                    if (length > 2) {
                        verticesFront[curveCount].push(new THREE.Vector3().copy(verticesFront[curveCount][length]));
                    }
                    var current = void 0, last = verticesFront[curveCount][0];
                    for(var vcount = 1; vcount < verticesFront[curveCount].length; vcount++){
                        current = verticesFront[curveCount][vcount];
                        sum += current.distanceTo(last);
                        distances.push(sum);
                        last = current;
                    }
                    curvesBack[curveCount] = new THREE.CubicBezierCurve3(pointsBack[curveCount][0], pointsBack[curveCount][1], pointsBack[curveCount][2], pointsBack[curveCount][3]);
                    verticesBack[curveCount] = curvesBack[curveCount].getPoints(length);
                    if (length > 2) {
                        verticesBack[curveCount].push(new THREE.Vector3().copy(verticesBack[curveCount][length]));
                    }
                }
                /*var test = true;
    if (test === true) {
      if (sheet.handlesf === void 0) {

        let material = new THREE.LineBasicMaterial({color: 0x00ff00});

        let geometry = new THREE.Geometry();
        geometry.vertices.push(
          pointsFront[0][0], pointsFront[0][1], pointsFront[0][2], pointsFront[0][3]
        );

        sheet.handlesf = new THREE.Line(geometry, material);
        sheet.element.add(sheet.handlesf);

      }
      else {
        let hvs = sheet.handlesf.geometry.vertices;
        for (let hcount = 0; hcount < hvs.length; hcount++) {
          hvs[hcount] = pointsFront[0][hcount];
        }
        sheet.handlesf.geometry.verticesNeedUpdate = true;
      }
      if (sheet.handlesb === void 0) {

        let material = new THREE.LineBasicMaterial({color: 0x0000ff});

        let geometry = new THREE.Geometry();
        geometry.vertices.push(
          pointsBack[0][0], pointsBack[0][1], pointsBack[0][2], pointsBack[0][3]
        );

        sheet.handlesb = new THREE.Line(geometry, material);
        sheet.element.add(sheet.handlesb);

      }
      else {
        let hvs = sheet.handlesb.geometry.vertices;
        for (let hcount = 0; hcount < hvs.length; hcount++) {
          hvs[hcount] = pointsBack[0][hcount];
        }
        sheet.handlesb.geometry.verticesNeedUpdate = true;
      }
    }

*/ var bodyG = sheet.element.geometry;
                if (bodyG.attributes !== void 0) {
                    //5 segments have 56 vertices
                    /*
      * 5 segments have 56 vertices
      * 8 are side vertices
      * remaining 48 in 4 faces
      * each 12 vertices
      *rowvertices = segments + 1
      * 1,7   -   2,8   -   3,9   -   4,10  -   5,11  -   6,12    x + rowvertices*0 + count, x + rowvertices*1 + count
      * 13,19 -   14,20 -   15,21 -   16,22 -   17,23 -   18,24   x + rowvertices*2 + 1, x + rowvertices*3 + 1
      * 25,31 -   26,32 -   27,33 -   28,34 -   29,35 -   30,36
      * 37,43 -   38,44 -   39,45 -   40,46 -   41,47 -   42,48
      *
      * */ var positions = bodyG.attributes.position;
                    var uvs = bodyG.attributes.uv;
                    var rowVertices = segments + 1;
                    var offset = 8;
                    //region basic side vertices
                    //Update the geometry based on angles
                    positions.setZ(0, verticesFront[0][segments].z);
                    positions.setZ(2, verticesFront[0][segments].z);
                    positions.setX(0, verticesFront[0][segments].x);
                    positions.setX(2, verticesFront[0][segments].x);
                    // verts[0].z = verts[2].z = verticesFront[0][segments].z;
                    // verts[0].x = verts[2].x = verticesFront[0][segments].x;
                    positions.setZ(1, verticesBack[0][segments].z);
                    positions.setZ(3, verticesBack[0][segments].z);
                    positions.setX(1, verticesBack[0][segments].x);
                    positions.setX(3, verticesBack[0][segments].x);
                    // verts[1].z = verts[3].z = verticesBack[0][segments].z;
                    // verts[1].x = verts[3].x = verticesBack[0][segments].x;
                    positions.setZ(5, verticesFront[0][0].z);
                    positions.setZ(7, verticesFront[0][0].z);
                    positions.setX(5, verticesFront[0][0].x);
                    positions.setX(7, verticesFront[0][0].x);
                    // verts[5].z = verts[7].z = verticesFront[0][0].z;
                    // verts[5].x = verts[7].x = verticesFront[0][0].x;
                    positions.setZ(4, verticesBack[0][0].z);
                    positions.setZ(6, verticesBack[0][0].z);
                    positions.setX(4, verticesBack[0][0].x);
                    positions.setX(6, verticesBack[0][0].x);
                    // verts[4].z = verts[6].z = verticesBack[0][0].z;
                    // verts[4].x = verts[6].x = verticesBack[0][0].x;
                    //endregion
                    for(var fold = 0; fold < foldCount; fold++){
                        for(var count = 0; count < rowVertices; count++){
                            positions.setZ(offset + rowVertices * 0 + count, verticesFront[0][count].z);
                            positions.setX(offset + rowVertices * 0 + count, verticesFront[0][count].x);
                            positions.setZ(offset + rowVertices * 1 + count, verticesBack[0][count].z);
                            positions.setX(offset + rowVertices * 1 + count, verticesBack[0][count].x);
                            positions.setZ(offset + rowVertices * 2 + count, verticesFront[0][count].z);
                            positions.setX(offset + rowVertices * 2 + count, verticesFront[0][count].x);
                            positions.setZ(offset + rowVertices * 3 + count, verticesBack[0][count].z);
                            positions.setX(offset + rowVertices * 3 + count, verticesBack[0][count].x);
                            positions.setZ(offset + rowVertices * 4 + count, verticesFront[0][count].z);
                            positions.setX(offset + rowVertices * 4 + count, verticesFront[0][count].x);
                            positions.setZ(offset + rowVertices * 5 + count, verticesFront[0][count].z);
                            positions.setX(offset + rowVertices * 5 + count, verticesFront[0][count].x);
                            uvs.setX(offset + rowVertices * 4 + count, distances[count] / sum);
                            uvs.setX(offset + rowVertices * 5 + count, distances[count] / sum);
                            positions.setZ(offset + rowVertices * 6 + count, verticesBack[0][segments - count].z);
                            positions.setX(offset + rowVertices * 6 + count, verticesBack[0][segments - count].x);
                            positions.setZ(offset + rowVertices * 7 + count, verticesBack[0][segments - count].z);
                            positions.setX(offset + rowVertices * 7 + count, verticesBack[0][segments - count].x);
                            uvs.setX(offset + rowVertices * 6 + count, 1 - distances[segments - count] / sum);
                            uvs.setX(offset + rowVertices * 7 + count, 1 - distances[segments - count] / sum);
                        // verts[offset].z = verts[offset + rowVertices * 3].z = verticesBack[0][count].z;
                        // verts[offset].x = verts[offset + rowVertices * 3].x = verticesBack[0][count].x;
                        // verts[offset + rowVertices].z = verts[offset + rowVertices * 2].z = verticesFront[0][count].z;
                        // verts[offset + rowVertices].x = verts[offset + rowVertices * 2].x = verticesFront[0][count].x;
                        // offset++;
                        }
                    }
                    bodyG.computeBoundingBox();
                    sheet.element.scale.x = curveWidth * foldCount / sum;
                    // sheet.element.scale.z = sheet.element.scale.x;//1 + (Math.cos(pointAngleB) * sheet.element.scale.x / sheet.element.scale.x);
                    bodyG.computeBoundingSphere();
                    positions.needsUpdate = true;
                    uvs.needsUpdate = true;
                    bodyG.computeVertexNormals();
                } else {
                    var verts = bodyG.vertices;
                    var rowVertices1 = segments - 1;
                    var offset1 = 8;
                    //Update the geometry based on angles
                    verts[0].z = verts[2].z = verticesFront[0][segments].z;
                    verts[0].x = verts[2].x = verticesFront[0][segments].x;
                    verts[1].z = verts[3].z = verticesBack[0][segments].z;
                    verts[1].x = verts[3].x = verticesBack[0][segments].x;
                    verts[5].z = verts[7].z = verticesFront[0][0].z;
                    verts[5].x = verts[7].x = verticesFront[0][0].x;
                    verts[4].z = verts[6].z = verticesBack[0][0].z;
                    verts[4].x = verts[6].x = verticesBack[0][0].x;
                    for(var fold1 = 0; fold1 < foldCount; fold1++){
                        for(var count1 = 1; count1 < segments; count1++){
                            verts[offset1].z = verts[offset1 + rowVertices1 * 3].z = verticesBack[0][count1].z;
                            verts[offset1].x = verts[offset1 + rowVertices1 * 3].x = verticesBack[0][count1].x;
                            verts[offset1 + rowVertices1].z = verts[offset1 + rowVertices1 * 2].z = verticesFront[0][count1].z;
                            verts[offset1 + rowVertices1].x = verts[offset1 + rowVertices1 * 2].x = verticesFront[0][count1].x;
                            offset1++;
                        }
                    }
                    var uvs1 = bodyG.faceVertexUvs[0];
                    var faces = bodyG.faces;
                    var uvIndexFront = 0;
                    for(var count2 = 0; count2 < uvs1.length; count2++){
                        if (faces[count2].materialIndex === MOCKUP.MATERIAL_FACE.BACK) {
                            var dist = distances[uvIndexFront] / sum;
                            if (count2 % 2 === 0) {
                                uvs1[count2][0].x = uvs1[count2][1].x = uvs1[count2 + 1][0].x = dist;
                                uvIndexFront++;
                            } else {
                                uvs1[count2 - 1][2].x = uvs1[count2][1].x = uvs1[count2][2].x = dist;
                            }
                        } else if (faces[count2].materialIndex === MOCKUP.MATERIAL_FACE.FRONT) {
                            var dist1 = 1 - distances[uvIndexFront] / sum;
                            //console.log(dist);
                            if (count2 % 2 === 0) {
                                uvs1[count2][0].x = uvs1[count2][1].x = uvs1[count2 + 1][0].x = dist1;
                                uvIndexFront--;
                            } else {
                                uvs1[count2 - 1][2].x = uvs1[count2][1].x = uvs1[count2][2].x = dist1;
                            }
                        }
                    }
                    bodyG.computeBoundingBox();
                    sheet.element.scale.x = curveWidth * foldCount / sum;
                    // sheet.element.scale.z = sheet.element.scale.x;//1 + (Math.cos(pointAngleB) * sheet.element.scale.x / sheet.element.scale.x);
                    bodyG.computeBoundingSphere();
                    bodyG.verticesNeedUpdate = true;
                    bodyG.computeFaceNormals();
                    bodyG.computeVertexNormals();
                    bodyG.uvsNeedUpdate = true;
                    bodyG.normalsNeedUpdate = true;
                }
                curvesFront.forEach(function(curveF) {
                    curveF = null;
                });
                curvesBack.forEach(function(curveB) {
                    curveB = null;
                });
                verticesBack.forEach(function(vertexB) {
                    vertexB = null;
                });
                verticesFront.forEach(function(vertexF) {
                    vertexF = null;
                });
            }
        },
        {
            key: "flip",
            value: function flip(oldAngle, newAngle) {
                var sheet = this;
                var isBooklet = sheet.viewer.isBooklet;
                //https://github.com/deepak-ghimire/dearviewer/issues/494
                if (sheet.isCover === true) {
                    if (oldAngle === 0) oldAngle = sheet.viewer.flexibility * 2.5;
                    if (oldAngle === 180) oldAngle = oldAngle - sheet.viewer.flexibility * 2.5;
                }
                var diff = newAngle - oldAngle; //170 -5 == 165 :  5-170 = -165
                var isRight = oldAngle > 90;
                var isRTL = sheet.viewer.isRTL;
                var pageNumber = isRight ? sheet.backPage.pageNumber : sheet.frontPage.pageNumber;
                var viewport = this.viewer.getViewPort(pageNumber);
                if (viewport) viewport = flipbook_3d_utils.contain(viewport.width, viewport.height, sheet.viewer.availablePageWidth(), sheet.viewer.availablePageHeight());
                var coverAdjustmentWidth = -(sheet.viewer.has3DCover && sheet.viewer.isClosedPage() ? sheet.viewer.coverExtraWidth : 0), coverAdjustmentHeight = -(sheet.viewer.has3DCover && sheet.viewer.isClosedPage() ? sheet.viewer.coverExtraHeight : 0);
                sheet.init = {
                    angle: oldAngle,
                    height: isRight ? sheet.viewer.rightSheetHeight : sheet.viewer.leftSheetHeight,
                    width: isRight ? sheet.viewer.rightSheetWidth : sheet.viewer.leftSheetWidth,
                    index: isRight && !isRTL || !isRight && isRTL ? 1 : 0,
                    _index: 0
                };
                sheet.first = {
                    angle: oldAngle + diff / 4,
                    index: isRight && !isRTL || !isRight && isRTL ? 1 : 0.25
                };
                sheet.mid = {
                    angle: oldAngle + diff * 2 / 4,
                    index: isRight && !isRTL || !isRight && isRTL ? 0.5 : 0.5
                };
                sheet.mid2 = {
                    angle: oldAngle + diff * 3 / 4,
                    index: isRight && !isRTL || !isRight && isRTL ? 0.25 : 1
                };
                sheet.end = {
                    angle: newAngle,
                    index: isRight && !isRTL || !isRight && isRTL ? 0 : 1,
                    height: coverAdjustmentHeight + (viewport ? viewport.height : sheet.height),
                    width: coverAdjustmentWidth + (viewport ? viewport.width : sheet.width)
                };
                //console.log(sheet.init, sheet.first, sheet.mid, sheet.end);
                sheet.isFlipping = true;
                var update = function update(tween) {
                    sheet.sheetAngle = tween.angle;
                    sheet.curveAngle = sheet.isHard ? tween.angle : flipbook_3d_utils.getCurveAngle(isRight, tween.angle);
                    if (sheet.isHard === true) {
                        sheet.flexibility = 0;
                        if (sheet.isCover) {
                            sheet.viewer.flipCover(sheet);
                        }
                    } else {
                        sheet.flexibility = tween.angle < 90 ? sheet.leftFlexibility : sheet.rightFlexibility;
                    }
                    sheet.element.position.z = (tween.angle < 90 ? sheet.leftPos : sheet.rightPos) + sheet.depth;
                    if (isBooklet) {
                        sheet.element.material[5].opacity = sheet.element.material[4].opacity = tween.index;
                        sheet.element.castShadow = isRight && !isRTL || !isRight && isRTL ? tween.index > 0.5 : tween.index > 0.5;
                    }
                    sheet.height = tween.height;
                    sheet.width = tween.width;
                    sheet.updateAngle(true);
                };
                if (isBooklet && (!isRight && !isRTL || isRight && isRTL)) {
                    sheet.element.material[5].opacity = sheet.element.material[4].opacity = 0;
                    sheet.element.castShadow = false;
                }
                sheet.currentTween = new TWEEN.Tween(sheet.init).to({
                    angle: [
                        sheet.first.angle,
                        sheet.mid.angle,
                        sheet.mid2.angle,
                        sheet.end.angle
                    ],
                    index: [
                        sheet.first.index,
                        sheet.mid.index,
                        sheet.mid2.index,
                        sheet.end.index
                    ],
                    _index: 1,
                    height: sheet.end.height,
                    width: sheet.end.width
                }, sheet.viewer.app.options.duration * Math.abs(diff) / 180).onUpdate(function(event) {
                    update(this, event);
                }).easing(TWEEN.Easing.Sinusoidal.Out).onStop(function() {
                    sheet.currentTween = null;
                    sheet.isFlipping = false;
                    if (sheet.isCover) {
                        sheet.viewer.leftCover.isFlipping = false;
                        sheet.viewer.rightCover.isFlipping = false;
                    }
                    sheet.element.material[5].opacity = sheet.element.material[4].opacity = 1;
                }).onComplete(function() {
                    sheet.updateAngle();
                    sheet.element.material[5].opacity = sheet.element.material[4].opacity = 1;
                    sheet.element.castShadow = true;
                    sheet.isFlipping = false;
                    if (sheet.isCover) {
                        sheet.viewer.leftCover.isFlipping = false;
                        sheet.viewer.rightCover.isFlipping = false;
                    }
                    sheet.side = sheet.targetSide;
                    sheet.viewer.onFlip();
                    sheet.viewer.afterFlip();
                    sheet.currentTween = null;
                    if (sheet.viewer && sheet.viewer.requestRefresh) sheet.viewer.requestRefresh();
                }).start();
                //calling instantly will fix the render and postioning update issue
                //https://github.com/deepak-ghimire/dearviewer/issues/494
                sheet.currentTween.update(window.performance.now());
            }
        }
    ]);
    return BookSheet3D;
}(BookSheet);
var FlipBook3D = /*#__PURE__*/ function(BaseFlipBookViewer) {
    "use strict";
    flipbook_3d_inherits(FlipBook3D, BaseFlipBookViewer);
    var _super = flipbook_3d_create_super(FlipBook3D);
    function FlipBook3D(options, appContext) {
        flipbook_3d_class_call_check(this, FlipBook3D);
        var _this;
        options.viewerClass = "df-flipbook-3d";
        _this = _super.call(this, options, appContext);
        _this.pageOffset = 5; //space between pages in spiral book
        _this.spiralCount = 20;
        var _options_groundDistance;
        _this.groundDistance = (_options_groundDistance = options.groundDistance) !== null && _options_groundDistance !== void 0 ? _options_groundDistance : 2; //relative sizing distance of ground from book when cover is closed.
        _this.hasSpiral = options.hasSpiral === "true" || options.hasSpiral === true;
        var _options_flexibility;
        _this.flexibility = flipbook_3d_utils.limitAt((_options_flexibility = options.flexibility) !== null && _options_flexibility !== void 0 ? _options_flexibility : 0.9, 0, 10);
        if (_this.hasSpiral) {
            _this.flexibility = 0;
        }
        if (_this.flexibility === 0) options.sheetSegments = 8;
        _this.drag3D = flipbook_3d_utils.isTrue(options.drag3D);
        var _options_texturePowerOfTwo;
        //if it's mobile do not use power of two to save, overhead and device resources
        _this.texturePowerOfTwo = flipbook_3d_utils.isMobile ? false : (_options_texturePowerOfTwo = options.texturePowerOfTwo) !== null && _options_texturePowerOfTwo !== void 0 ? _options_texturePowerOfTwo : true;
        var _this_app_options_color3DSheets;
        _this.color3DSheets = (_this_app_options_color3DSheets = _this.app.options.color3DSheets) !== null && _this_app_options_color3DSheets !== void 0 ? _this_app_options_color3DSheets : 'white';
        _this.midPosition = 0;
        _this.initMOCKUP(function() {
            appContext._viewerPrepared();
        });
        return _this;
    }
    flipbook_3d_create_class(FlipBook3D, [
        {
            key: "initMOCKUP",
            value: function initMOCKUP(callback) {
                var app = this.app;
                if (typeof THREE === "undefined") {
                    app.updateInfo(app.options.text.loading + " WEBGL 3D ...");
                    if (typeof window.define === 'function' && window.define.amd && window.requirejs) {
                        window.requirejs.config({
                            "paths": {
                                "three": app.options.threejsSrc.replace(".js", "")
                            },
                            shim: {
                                'three': {
                                    exports: 'THREE'
                                }
                            }
                        });
                        window.require([
                            'three'
                        ], function(THREE1) {
                            window.THREE = THREE1;
                            MOCKUP.init();
                            if (typeof callback === "function") callback();
                            return THREE1;
                        });
                    } else if (typeof window.define === 'function' && window.define.amd) {
                        window.require([
                            "three",
                            app.options.threejsSrc.replace(".js", "")
                        ], function(ready) {
                            ready(function() {
                                MOCKUP.init();
                                if (typeof callback === "function") callback();
                            });
                        });
                    } else {
                        flipbook_3d_utils.getScript(app.options.threejsSrc + "?ver=" + flipbook_3d_DV.version, function() {
                            MOCKUP.init();
                            if (typeof callback === "function") callback();
                        }, function() {
                            app.updateInfo("Unable to load THREE.js...");
                        });
                    }
                } else {
                    MOCKUP.init();
                    if (typeof callback === "function") callback();
                }
            }
        },
        {
            key: "init",
            value: function init() {
                var app = this.app;
                flipbook_3d_get(flipbook_3d_get_prototype_of(FlipBook3D.prototype), "init", this).call(this);
                var _pageRatio = app.provider.defaultPage.pageRatio;
                this.pageScaleX = 1;
                this.initDepth();
                this.initStage();
                this.initPages();
                this.initEvents();
                this.render(); //until render is called none of the css pages are added.
            }
        },
        {
            key: "updatePageMode",
            value: function updatePageMode() {
                flipbook_3d_get(flipbook_3d_get_prototype_of(FlipBook3D.prototype), "updatePageMode", this).call(this);
                var app = this.app;
                this.has3DCover = app.options.cover3DType !== defaults_DEARVIEWER.FLIPBOOK_COVER_TYPE.NONE && app.pageCount > 7 && !this.isBooklet;
                if (this.has3DCover && app.options.flipbookHardPages === "none") {
                    app.options.flipbookHardPages = "cover";
                }
            }
        },
        {
            key: "initDepth",
            value: function initDepth() {
                var _this_app_options_sheetDepth;
                this.sheetDepth = this.pageScaleX * ((_this_app_options_sheetDepth = this.app.options.sheetDepth) !== null && _this_app_options_sheetDepth !== void 0 ? _this_app_options_sheetDepth : 0.5);
                var _this_app_options_sheetSegments;
                this.sheetSegments = (_this_app_options_sheetSegments = this.app.options.sheetSegments) !== null && _this_app_options_sheetSegments !== void 0 ? _this_app_options_sheetSegments : 20;
                this.coverDepth = 2 * this.sheetDepth;
                this.sheetsDepth = Math.min(10, this.app.pageCount / 4) * this.sheetDepth;
            }
        },
        {
            key: "initStage",
            value: function initStage() {
                var viewer = this;
                var stage = viewer.stage = new MOCKUP.Stage({
                    pixelRatio: viewer.app.options.pixelRatio
                });
                var canvas = stage.canvas = jQuery(stage.renderer.domElement).addClass("df-3dcanvas");
                canvas.appendTo(this.element);
                stage.camera.position.set(0, 0, 600);
                stage.camera.lookAt(new THREE.Vector3(0, 0, 0));
                viewer.camera = stage.camera;
                //shadows are zigzag due to shadow camera position
                stage.spotLight.position.set(-220, 220, 550);
                stage.spotLight.castShadow = flipbook_3d_utils.isMobile ? false : viewer.app.options.has3DShadow;
                if (stage.spotLight.shadow) {
                    stage.spotLight.shadow.bias = -0.005; //-0.0035 has artifacts in smaller size;
                }
                // stage.spotLight.intensity = 0.22;
                stage.ambientLight.color = new THREE.Color("#fff");
                stage.ambientLight.intensity = 0.82;
                var material = new THREE.ShadowMaterial();
                material.opacity = viewer.app.options.shadowOpacity;
                stage.ground.oldMaterial = stage.ground.material;
                stage.ground.material = material;
                stage.ground.position.z = this.has3DCover ? -6 : -4;
                stage.selectiveRendering = true;
                var cssRenderer = stage.cssRenderer = new THREE.CSS3DRenderer();
                jQuery(cssRenderer.domElement).css({
                    position: "absolute",
                    top: 0,
                    pointerEvents: "none"
                }).addClass("df-3dcanvas df-csscanvas");
                viewer.element[0].appendChild(cssRenderer.domElement);
                stage.cssScene = new THREE.Scene();
                viewer.wrapper.remove();
                viewer.wrapper = new THREE.Group();
                viewer.stage.add(viewer.wrapper);
                viewer.wrapper.add(stage.ground);
                viewer.bookWrapper = new THREE.Group();
                viewer.bookWrapper.name = "bookwrapper";
                // stage.bookWrapper.add(stage.camera);
                viewer.wrapper.add(viewer.bookWrapper);
                viewer.bookHelper = stage.bookHelper = new THREE.BoxHelper(viewer.bookWrapper, 0xffff00);
                stage.add(viewer.bookHelper);
                viewer.bookHelper.visible = false;
                viewer.cameraWrapper = new THREE.Group();
                viewer.cameraWrapper.add(stage.camera);
                stage.add(viewer.cameraWrapper);
                // viewer.wrapper.add(stage.spotLight);
                viewer.app.renderRequestStatus = flipbook_3d_DV.REQUEST_STATUS.ON;
            }
        },
        {
            key: "initPages",
            value: function initPages() {
                var options = {
                    parent3D: this.bookWrapper,
                    viewer: this,
                    segments: this.sheetSegments,
                    depth: this.sheetDepth,
                    flexibility: this.flexibility
                };
                for(var count = 0; count < this.stackCount; count++){
                    var sheet = new BookSheet3D(options);
                    sheet.index = count; //just reference for debugging
                    sheet.viewer = this;
                    this.sheets.push(sheet);
                    sheet.setMatColor(this.color3DSheets);
                    this.pages.push(sheet.frontPage);
                    this.pages.push(sheet.backPage);
                    this.stage.cssScene.add(sheet.frontPage.cssPage);
                    this.stage.cssScene.add(sheet.backPage.cssPage);
                }
                options.depth = this.sheetsDepth;
                options.segments = 1;
                options.flexibility = 0;
                this.leftSheets = new BookSheet3D(options); //to display sheet stack on left side of Realistic book
                this.rightSheets = new BookSheet3D(options); //to display sheet stack on right side of Realistic book
                this.leftSheets.setMatColor(this.color3DSheets);
                this.rightSheets.setMatColor(this.color3DSheets);
                options.depth = this.coverDepth;
                this.leftCover = new BookSheet3D(options);
                this.rightCover = new BookSheet3D(options);
                // this.leftCover.element.loadNormalMap(this.app.options.imagesLocation + "/book-cover-normal.jpg", MOCKUP.MATERIAL_FACE.FRONT);
                // this.rightCover.element.loadNormalMap(this.app.options.imagesLocation + "/book-cover-normal.jpg", MOCKUP.MATERIAL_FACE.BACK);
                this.leftCover.isHard = true;
                this.rightCover.isHard = true;
                this.set3DCoverNormal();
                this.setcolor3DCover(this.app.options.color3DCover);
                this.stage.cssScene.add(this.leftCover.frontPage.cssPage);
                this.stage.cssScene.add(this.rightCover.backPage.cssPage);
                this.zoomViewer.leftPage.element.css({
                    backgroundColor: this.color3DSheets
                });
                this.zoomViewer.rightPage.element.css({
                    backgroundColor: this.color3DSheets
                });
                if (this.orientation === 'vertical') {
                    this.bookWrapper.children.forEach(function(childPaper) {
                        childPaper.rotateZ(THREE.MathUtils.degToRad(-90));
                        childPaper.textureCenter = new THREE.Vector2(0.5, 0.5);
                        childPaper.textureRotation = 90;
                    });
                }
                this.initSpiral();
            }
        },
        {
            key: "initSpiral",
            value: function initSpiral() {
                this.hasSpiral = false;
            }
        },
        {
            key: "set3DCoverNormal",
            value: function set3DCoverNormal() {}
        },
        {
            key: "setcolor3DCover",
            value: function setcolor3DCover() {
                var val = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
            }
        },
        {
            key: "initEvents",
            value: function initEvents() {
                this.stageDOM = this.element[0];
                flipbook_3d_get(flipbook_3d_get_prototype_of(FlipBook3D.prototype), "initEvents", this).call(this);
            }
        },
        {
            key: "dispose",
            value: function dispose() {
                flipbook_3d_get(flipbook_3d_get_prototype_of(FlipBook3D.prototype), "dispose", this).call(this);
                var viewer = this;
                if (viewer.stage) {
                    viewer.stage.clearChild();
                    viewer.stage.cssRenderer.domElement.parentNode.removeChild(viewer.stage.cssRenderer.domElement);
                    viewer.stage.cssRenderer = null;
                    viewer.stage.orbitControl = flipbook_3d_utils.disposeObject(viewer.stage.orbitControl);
                    viewer.stage.renderer = flipbook_3d_utils.disposeObject(viewer.stage.renderer);
                    jQuery(viewer.stage.canvas).remove();
                    viewer.stage.canvas = null;
                    viewer.stage = flipbook_3d_utils.disposeObject(viewer.stage);
                }
                if (viewer.centerTween && viewer.centerTween.stop) viewer.centerTween.stop();
            }
        },
        {
            key: "render",
            value: function render() {
                this.stage.render();
                this.stage.cssRenderer.render(this.stage.cssScene, this.stage.camera);
            }
        },
        {
            key: "resize",
            value: function resize() {
                flipbook_3d_get(flipbook_3d_get_prototype_of(FlipBook3D.prototype), "resize", this).call(this);
                var viewer = this;
                var app = viewer.app, stage = viewer.stage;
                var dimensions = app.dimensions;
                var padding = dimensions.padding;
                var isSingle = viewer.isSingle;
                var zoomWidth = this.availablePageWidth(), zoomHeight = this.availablePageHeight();
                stage.resizeCanvas(dimensions.stage.width, dimensions.stage.height);
                stage.cssRenderer.setSize(dimensions.stage.width, dimensions.stage.height);
                this.pageScaleX = Math.max(Math.max(zoomWidth, zoomHeight) / 400, 1);
                this.initDepth();
                this.sheets.forEach(function(sheet) {
                    sheet.depth = viewer.sheetDepth;
                });
                app.refreshRequestStart();
                var ref = this.refSize = Math.min(zoomHeight, zoomWidth);
                this.coverExtraWidth = (viewer.orientation == 'vertical' ? 2 : 1) * ref * .025;
                this.coverExtraHeight = (viewer.orientation == 'vertical' ? 1 : 2) * ref * .025;
                if (this.has3DCover !== true) {
                    this.coverExtraWidth = 0;
                    this.coverExtraHeight = 0;
                }
                //viewer.app.renderRequestStatus = DV.REQUEST_STATUS.ON;
                viewer.zoomViewer.resize();
                viewer.cameraPositionDirty = true;
                viewer.centerNeedsUpdate = true;
                viewer.checkCenter(true);
                viewer.pagesReady();
                this.pageOffset = (this.hasSpiral ? 6 : 0) * Math.min(this._defaultPageSize.width, this._defaultPageSize.height) / 1000;
            }
        },
        {
            key: "fitCameraToCenteredObject",
            value: function fitCameraToCenteredObject(camera, object, offset, orbitControls) {
                var boundingBox = new THREE.Box3();
                boundingBox.setFromObject(object);
                var middle = new THREE.Vector3();
                var size = new THREE.Vector3();
                boundingBox.getSize(size);
                var coverExtraHeight = this.coverExtraHeight;
                var coverExtraWidth = this.coverExtraWidth * 2;
                if (this.isClosedPage()) {
                    coverExtraWidth = 0;
                    coverExtraHeight = 0;
                }
                size.x = size.x - coverExtraWidth + this.app.dimensions.padding.width;
                size.y = size.y - coverExtraHeight + this.app.dimensions.padding.height;
                // figure out how to fit the box in the view:
                // 1. figure out horizontal FOV (on non-1.0 aspects)
                // 2. figure out distance from the object in X and Y planes
                // 3. select the max distance (to fit both sides in)
                //
                // The reason is as follows:
                //
                // Imagine a bounding box (BB) is centered at (0,0,0).
                // Camera has vertical FOV (camera.fov) and horizontal FOV
                // (camera.fov scaled by aspect, see fovh below)
                //
                // Therefore if you want to put the entire object into the field of view,
                // you have to compute the distance as: z/2 (half of Z size of the BB
                // protruding towards us) plus for both X and Y size of BB you have to
                // figure out the distance created by the appropriate FOV.
                //
                // The FOV is always a triangle:
                //
                //  (size/2)
                // +--------+
                // |       /
                // |      /
                // |     /
                // | F° /
                // |   /
                // |  /
                // | /
                // |/
                //
                // F° is half of respective FOV, so to compute the distance (the length
                // of the straight line) one has to: `size/2 / Math.tan(F)`.
                //
                // FTR, from https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
                // the camera.fov is the vertical FOV.
                var fov = camera.fov * (Math.PI / 180);
                var fovh = 2 * Math.atan(Math.tan(fov / 2) * camera.aspect);
                var dx = size.z / 2 + Math.abs(size.x / 2 / Math.tan(fovh / 2));
                var dy = size.z / 2 + Math.abs(size.y / 2 / Math.tan(fov / 2));
                var cameraZ = Math.max(dx, dy);
                // offset the camera, if desired (to avoid filling the whole canvas)
                if (offset !== undefined && offset !== 0) cameraZ *= offset;
                camera.position.set(0, 0, cameraZ);
                // set the far plane of the camera so that it easily encompasses the whole object
                var minZ = boundingBox.min.z;
                var cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ;
                camera.far = cameraToFarEdge * 3;
                camera.updateProjectionMatrix();
                if (orbitControls !== undefined) {
                    // set camera to rotate around the center
                    orbitControls.target = new THREE.Vector3(0, 0, 0);
                    // prevent camera from zooming out far enough to create far plane cutoff
                    orbitControls.maxDistance = cameraToFarEdge * 2;
                }
            }
        },
        {
            key: "updateShadowSize",
            value: function updateShadowSize() {
                return;
                var shadowSize = this.pageScaleX > 2.5 ? 1024 : 512;
                var shadow = this.stage.spotLight.shadow;
                if (this.stage.spotLight.castShadow === true && shadow.mapSize.height != shadowSize) {
                    shadow.radius = shadowSize / 256;
                    shadow.mapSize.width = shadowSize;
                    shadow.mapSize.height = shadowSize;
                    shadow.needsUpdate = true;
                }
            }
        },
        {
            key: "refresh",
            value: function refresh() {
                var viewer = this, app = this.app, basePage = viewer.getBasePage();
                this.refreshRequested = true; //flag to check if refresh has beem requested
                var ratioStep = 1 / app.pageCount, ratio = ratioStep * basePage;
                var leftWeight = this.isRTL ? 1 - ratio : ratio, rightWeight = 1 - leftWeight;
                var minSheetStack = Math.min(viewer.stackCount, viewer.totalSheets);
                var maxSheetStack = flipbook_3d_utils.limitAt(viewer.totalSheets, viewer.stackCount, viewer.stackCount * 2);
                var midWeight = Math.max(leftWeight, rightWeight);
                var flexibilityFactor = this.isBooklet ? 0 : this.flexibility / maxSheetStack;
                viewer.leftFlexibility = flexibilityFactor * rightWeight;
                viewer.rightFlexibility = flexibilityFactor * leftWeight;
                viewer.midPosition = 0.5 * minSheetStack * viewer.sheetDepth;
                flipbook_3d_get(flipbook_3d_get_prototype_of(FlipBook3D.prototype), "refresh", this).call(this);
                var displayCover = this.has3DCover === true;
                this.leftCover.element.visible = this.rightCover.element.visible = this.leftSheets.element.visible = this.rightSheets.element.visible = displayCover;
                this.wrapper.position.z = -this.midPosition;
                var depthLeft = 0, depthRight = 0, isRTL = viewer.isRTL;
                var isFrontPage = this.isFirstPage(), isLastPage = this.isLastPage();
                var isLeftClosed = this.isLeftClosed = this.isClosedPage() && (isRTL && isLastPage || !isRTL && isFrontPage), isRightClosed = this.isRightClosed = this.isClosedPage() && (!isRTL && isLastPage || isRTL && isFrontPage);
                if (displayCover) {
                    viewer.leftSheets.depth = isRTL ? viewer.sheetsDepth * (1 - viewer.getBasePage() / app.pageCount) : viewer.sheetsDepth * basePage / app.pageCount;
                    viewer.leftSheets.element.visible = isRTL ? app.pageCount - viewer.getBasePage() > 2 : basePage > 2;
                    depthLeft -= viewer.leftSheets.depth / 2;
                    viewer.leftSheets.element.position.z = depthLeft;
                    depthLeft -= viewer.coverDepth + (viewer.leftSheets.element.visible ? viewer.leftSheets.depth / 2 : 0) + viewer.coverDepth * 3;
                    viewer.leftCover.depth = viewer.rightCover.depth = viewer.coverDepth;
                    var maxSheetHeight = Math.max(this.leftSheetHeight, this.rightSheetHeight);
                    if (isRightClosed) maxSheetHeight = this.leftSheetHeight;
                    if (isLeftClosed) maxSheetHeight = this.rightSheetHeight;
                    if (viewer.leftCover.isFlipping !== true) {
                        viewer.leftCover.element.position.z = isLeftClosed ? viewer.midPosition + viewer.coverDepth : depthLeft + viewer.coverDepth / 2;
                        viewer.leftCover.element.position.z = Math.max(viewer.leftCover.element.position.z, -viewer.refSize * 0.05);
                        viewer.leftCover.element.position.x = 0;
                        viewer.leftSheets.sheetAngle = viewer.leftCover.sheetAngle = isLeftClosed ? 180 : 0;
                        viewer.leftSheets.curveAngle = viewer.leftCover.curveAngle = isLeftClosed ? 180 : 0;
                        if (viewer.rightCover.isFlipping !== true) {
                            viewer.leftCover.height = maxSheetHeight;
                            viewer.leftCover.width = viewer.leftCover.sheetAngle < 90 ? this.leftSheetWidth : this.rightSheetWidth;
                            if (!this.isClosedPage()) {
                                viewer.leftCover.width += this.coverExtraWidth;
                                viewer.leftCover.height += this.coverExtraHeight;
                            }
                        }
                        viewer.leftSheets.updateAngle();
                        viewer.leftCover.updateAngle();
                    }
                    viewer.rightSheets.depth = viewer.sheetsDepth - viewer.leftSheets.depth;
                    viewer.rightSheets.element.visible = isRTL ? basePage > 2 : app.pageCount - viewer.getBasePage() > 2;
                    depthRight -= viewer.rightSheets.depth / 2;
                    viewer.rightSheets.element.position.z = depthRight;
                    depthRight -= viewer.coverDepth + (viewer.rightSheets.element.visible ? viewer.rightSheets.depth / 2 : 0) + viewer.coverDepth * 3;
                    if (viewer.rightCover.isFlipping !== true) {
                        viewer.rightCover.element.position.z = isRightClosed ? viewer.midPosition + viewer.coverDepth : depthRight + viewer.coverDepth / 2;
                        viewer.rightCover.element.position.z = Math.max(viewer.rightCover.element.position.z, -viewer.refSize * 0.05);
                        viewer.rightCover.element.position.x = 0;
                        viewer.rightSheets.sheetAngle = viewer.rightCover.sheetAngle = isRightClosed ? 0 : 180;
                        viewer.rightSheets.curveAngle = viewer.rightCover.curveAngle = isRightClosed ? 0 : 180;
                        if (viewer.leftCover.isFlipping !== true) {
                            viewer.rightCover.height = maxSheetHeight;
                            viewer.rightCover.width = viewer.rightCover.sheetAngle < 90 ? this.leftSheetWidth : this.rightSheetWidth;
                            if (!this.isClosedPage()) {
                                viewer.rightCover.width += this.coverExtraWidth;
                                viewer.rightCover.height += this.coverExtraHeight;
                            }
                        }
                        viewer.rightSheets.updateAngle();
                        viewer.rightCover.updateAngle();
                    }
                    viewer.updateSheets();
                    viewer.stage.ground.position.z = Math.min(depthLeft, depthRight) - viewer.refSize * viewer.groundDistance / 100;
                    // if (this.isClosedPage()) {
                    //   viewer.stage.ground.position.z -= viewer.coverDepth * 2;
                    // }
                    viewer.stage.ground.position.z = Math.max(viewer.stage.ground.position.z, -viewer.refSize * 0.1);
                } else {
                    viewer.stage.ground.position.z = -viewer.midPosition - viewer.sheetDepth * 15;
                }
                if (viewer.cameraPositionDirty === true) {
                    viewer.updateCameraPosition();
                }
                this.refreshSpiral();
            }
        },
        {
            key: "refreshSpiral",
            value: function refreshSpiral() {}
        },
        {
            key: "updateCameraPosition",
            value: function updateCameraPosition() {
                var viewer = this;
                var app = viewer.app, stage = viewer.stage;
                var dimensions = app.dimensions;
                var padding = dimensions.padding;
                var cameraZ = 1 / (2 * Math.tan(Math.PI * stage.camera.fov * 0.5 / 180) / (dimensions.stage.height / app.zoomValue)) + 2.2;
                this.updateShadowSize();
                this.stage.spotLight.position.x = -this.pageScaleX * 330;
                this.stage.spotLight.position.y = this.pageScaleX * 330;
                this.stage.spotLight.position.z = this.pageScaleX * 550;
                this.stage.spotLight.shadow.camera.far = this.pageScaleX * 1200;
                this.stage.spotLight.shadow.camera.updateProjectionMatrix();
                var shiftY = (padding.top - padding.bottom) / app.zoomValue / 2, shiftX = -(padding.left - padding.right) / app.zoomValue / 2;
                if (stage.camera.position.z !== cameraZ && app.pendingZoom === true) {
                    stage.camera.position.z = cameraZ;
                }
                if (app.zoomValue === 1) {
                    viewer.bookWrapper.rotation.set(0, 0, 0);
                    viewer.bookHelper.rotation.set(0, 0, 0);
                    viewer.cameraWrapper.rotation.set(0, 0, 0);
                    if (app.options.flipbook3DTiltAngleUp !== 0 || app.options.flipbook3DTiltAngleLeft !== 0) {
                        stage.camera.aspect = dimensions.stage.width / dimensions.stage.height;
                        stage.camera.updateProjectionMatrix();
                        //upward rotation is on X axis and is done after left Rotation , Z axis.
                        //Since book need to rotate upwward, rotate X later works
                        viewer.bookWrapper.rotateZ(THREE.Math.degToRad(-app.options.flipbook3DTiltAngleLeft)); //negative goes left
                        viewer.bookWrapper.rotateX(THREE.Math.degToRad(-app.options.flipbook3DTiltAngleUp)); //negative goes upward
                        if (viewer.orientation == 'vertical') {
                            viewer.bookWrapper.scale.y = 1 / (this.isSingle ? 2 : 1);
                        } else {
                            viewer.bookWrapper.scale.x = 1 / (this.isSingle ? 2 : 1);
                        }
                        viewer.bookHelper.update();
                        viewer.fitCameraToCenteredObject(stage.camera, viewer.bookWrapper);
                        viewer.bookWrapper.rotation.set(0, 0, 0);
                        viewer.bookWrapper.scale.x = 1;
                        viewer.bookWrapper.scale.y = 1;
                        //upward rotation is on X axis and is done after left Rotation , Z axis.
                        //Since book need to rotate upwward, rotate X later works
                        // viewer.bookHelper.rotateZ(THREE.Math.degToRad(app.options.flipbook3DTiltAngleLeft)); //negative goes left
                        // viewer.bookHelper.rotateX(THREE.Math.degToRad(-app.options.flipbook3DTiltAngleUp)); //negative goes upward
                        stage.camera.position.set(shiftX, shiftY, stage.camera.position.z + stage.ground.position.z);
                        this.camera.aspect = dimensions.stage.width / dimensions.stage.height;
                        this.camera.updateProjectionMatrix();
                        //upward rotation is on X axis and is done after left Rotation , Z axis.
                        //Since book need to rotate upwward, rotate X later works
                        viewer.cameraWrapper.rotateX(THREE.Math.degToRad(app.options.flipbook3DTiltAngleUp)); //negative goes upward
                        viewer.cameraWrapper.rotateZ(THREE.Math.degToRad(app.options.flipbook3DTiltAngleLeft)); //positive goes left
                    } else {
                        stage.camera.position.set(shiftX, shiftY, cameraZ);
                    }
                }
                stage.camera.updateProjectionMatrix();
                viewer.app.renderRequestStatus = flipbook_3d_DV.REQUEST_STATUS.ON;
                viewer.cameraPositionDirty = false;
            }
        },
        {
            key: "refreshSheet",
            value: function refreshSheet(options) {
                var viewer = this, _sheet = options.sheet, _sheetStackIndex = options.index;
                // region Determine Next Position, angle and Flexibility based on pageLocation
                var oldAngle = _sheet.sheetAngle, newAngle, isFlexible = !(_sheet.isHard || this.flexibility === 0);
                _sheet.leftFlexibility = !isFlexible ? 0 : viewer.leftFlexibility;
                _sheet.rightFlexibility = !isFlexible ? 0 : viewer.rightFlexibility;
                _sheet.leftPos = viewer.midPosition + (_sheetStackIndex - options.midPoint + 1) * viewer.sheetDepth - viewer.sheetDepth / 2;
                _sheet.rightPos = viewer.midPosition - (_sheetStackIndex - options.midPoint) * viewer.sheetDepth - viewer.sheetDepth / 2;
                newAngle = _sheet.targetSide === defaults_DEARVIEWER.TURN_DIRECTION.LEFT ? 0 : 180;
                //endregion
                if (_sheet.isFlipping === false) {
                    if (options.needsFlip) {
                        _sheet.isFlipping = true;
                        if (_sheet.isCover && options.sheetNumber === 0) if (viewer.isRTL) viewer.rightCover.isFlipping = true;
                        else viewer.leftCover.isFlipping = true;
                        if (_sheet.isCover && viewer.totalSheets - options.sheetNumber === 1) if (viewer.isRTL) viewer.leftCover.isFlipping = true;
                        else viewer.rightCover.isFlipping = true;
                        _sheet.element.position.z = Math.max(oldAngle < 90 ? _sheet.leftPos : _sheet.rightPos, viewer.midPosition) + viewer.sheetDepth;
                        //this.beforeFlip();
                        _sheet.flexibility = oldAngle < 90 ? _sheet.leftFlexibility : _sheet.rightFlexibility;
                        _sheet.flip(oldAngle, newAngle);
                    } else {
                        _sheet.skipFlip = false;
                        _sheet.sheetAngle = _sheet.curveAngle = newAngle;
                        _sheet.flexibility = newAngle < 90 ? _sheet.leftFlexibility : _sheet.rightFlexibility;
                        _sheet.element.position.z = newAngle < 90 ? _sheet.leftPos : _sheet.rightPos;
                        _sheet.side = _sheet.targetSide;
                        //sheets from left side coming to right should follow the right side dimension and vice versa
                        _sheet.height = newAngle < 90 ? this.leftSheetHeight : this.rightSheetHeight;
                        _sheet.width = newAngle < 90 ? this.leftSheetWidth : this.rightSheetWidth;
                    }
                    _sheet.updateAngle();
                    this.app.renderRequestStatus = flipbook_3d_DV.REQUEST_STATUS.ON;
                } else {
                // _sheet.element.position.z = oldAngle < 90 ? _sheet.leftPos : _sheet.rightPos;
                }
                //determine visibility
                _sheet.element.visible = options.visible;
            }
        },
        {
            key: "updateCenter",
            value: function updateCenter() {
                var viewer = this, app = this.app;
                var init = this.orientation == 'vertical' ? viewer.wrapper.position.y : viewer.wrapper.position.x, centerShift = (this.orientation === 'vertical' ? -1 : 1) * viewer.centerShift, length = this.isLeftPage() ? this.orientation == 'vertical' ? this.leftSheetHeight : this.leftSheetWidth : this.orientation == 'vertical' ? this.rightSheetHeight : this.rightSheetWidth;
                var end = centerShift * length / 2;
                viewer.seamPosition = (-app.dimensions.offset.width + app.dimensions.containerWidth) / 2 + end;
                //create a centerTween
                if (end !== viewer.centerEnd) {
                    if (viewer.centerTween && viewer.centerTween.stop) viewer.centerTween.stop();
                    viewer.onCenterStartAnimation(this); //solves issue 301 - called early so that waiting doesn't cause flicker
                    viewer.centerTween = new TWEEN.Tween({
                        x: init
                    }).delay(0).to({
                        x: end
                    }, app.zoomValue === 1 && viewer.skipCenterAnimation !== true ? viewer.app.options.duration : 1).onStart(function() {
                    /*viewer.onCenterStartAnimation(this); //is delayed for some reason - maybe waiting for request frame and causes flicker - issue 301*/ }).onUpdate(function() {
                        viewer.onCenterUpdateAnimation(this);
                    }).onComplete(function() {
                        viewer.onCenterCompleteAnimation(this);
                    }).onStop(function() {
                        viewer.onCenterStopAnimation(this);
                    }).easing(TWEEN.Easing.Cubic.InOut).start();
                    this.updatePendingStatusClass();
                    viewer.skipCenterAnimation = false;
                    viewer.centerEnd = end;
                }
                viewer.renderRequestStatus = flipbook_3d_DV.REQUEST_STATUS.ON;
                this.zoomViewer.updateCenter();
            }
        },
        {
            key: "onCenterUpdateAnimation",
            value: function onCenterUpdateAnimation(tween) {
                if (this.orientation == 'vertical') {
                    this.wrapper.position.y = tween.x;
                    //noinspection JSUnresolvedVariable
                    if (this.stage && this.stage.cssScene) this.stage.cssScene.position.y = tween.x;
                } else {
                    this.wrapper.position.x = tween.x;
                    //noinspection JSUnresolvedVariable
                    if (this.stage && this.stage.cssScene) this.stage.cssScene.position.x = tween.x;
                }
            }
        },
        {
            key: "onCenterStartAnimation",
            value: function onCenterStartAnimation(tween) {}
        },
        {
            key: "onCenterStopAnimation",
            value: function onCenterStopAnimation(tween) {}
        },
        {
            key: "onCenterCompleteAnimation",
            value: function onCenterCompleteAnimation(tween) {}
        },
        {
            key: "flipCover",
            value: function flipCover(sheet) {
                var viewer = this, cover = null, multiplier, diff;
                if (sheet.pageNumber === 0 || this.isBooklet && sheet.pageNumber === 1) {
                    cover = this.isRTL ? this.rightCover : this.leftCover;
                    multiplier = this.isRTL ? 1 : -1;
                } else if (sheet.pageNumber === this.totalSheets - 1) {
                    cover = this.isRTL ? this.leftCover : this.rightCover;
                    multiplier = this.isRTL ? -1 : 1;
                }
                if (cover === null) return;
                diff = cover.depth + sheet.depth + 1;
                cover.sheetAngle = sheet.sheetAngle;
                cover.curveAngle = sheet.curveAngle;
                this.rightCover.height = this.leftCover.height = sheet.height + this.coverExtraHeight;
                this.rightCover.width = this.leftCover.width = sheet.width + this.coverExtraWidth;
                cover.flexibility = sheet.flexibility;
                this.rightCover.updateAngle();
                this.leftCover.updateAngle();
                cover.element.position.x = sheet.element.position.x + multiplier * Math.sin(sheet.sheetAngle * Math.PI / 180) * diff;
                cover.element.position.z = sheet.element.position.z + multiplier * Math.cos(sheet.sheetAngle * Math.PI / 180) * diff;
            }
        },
        {
            key: "pagesReady",
            value: function pagesReady() {
                if (this.isAnimating()) return;
                if (this.refreshRequested !== true) return;
                if (this.app.options.flipbookFitPages === false) {
                    var basePage = this.app.viewer.getBasePage();
                    var leftViewPort = this.leftViewport = this.getViewPort(basePage + (this.isBooklet ? 0 : this.isRTL ? 1 : 0)), rightViewPort = this.rightViewPort = this.getViewPort(basePage + (this.isBooklet ? 0 : this.isRTL ? 0 : 1));
                    if (leftViewPort) {
                        var leftDimen = flipbook_3d_utils.contain(leftViewPort.width, leftViewPort.height, this.availablePageWidth(), this.availablePageHeight());
                        if (this.leftSheetWidth != Math.floor(leftDimen.width) || this.leftSheetHeight != Math.floor(leftDimen.height)) {
                            this.cameraPositionDirty = true;
                        }
                        this.leftSheetWidth = Math.floor(leftDimen.width);
                        this.leftSheetHeight = Math.floor(leftDimen.height);
                    }
                    if (rightViewPort) {
                        var rightDimen = flipbook_3d_utils.contain(rightViewPort.width, rightViewPort.height, this.availablePageWidth(), this.availablePageHeight());
                        if (this.rightSheetWidth != Math.floor(rightDimen.width) || this.rightSheetWidth != Math.floor(rightDimen.height)) {
                            this.cameraPositionDirty = true;
                        }
                        this.rightSheetWidth = Math.floor(rightDimen.width);
                        this.rightSheetHeight = Math.floor(rightDimen.height);
                    }
                    for(var i = 0; i < this.sheets.length; i++){
                        var sheet = this.sheets[i];
                        if (sheet.side === flipbook_3d_DV.TURN_DIRECTION.LEFT) {
                            sheet.height = this.leftSheetHeight;
                            sheet.width = this.leftSheetWidth;
                            sheet.updateAngle();
                        } else {
                            sheet.height = this.rightSheetHeight;
                            sheet.width = this.rightSheetWidth;
                            sheet.updateAngle();
                        }
                    }
                    if (this.isClosedPage()) {
                        var isClosedOnRight = this.isRTL && this.isLastPage() || !this.isRTL && this.isFirstPage();
                        this.leftCover.width = this.rightCover.width = isClosedOnRight ? this.rightSheetWidth : this.leftSheetWidth;
                        this.leftCover.height = this.rightCover.height = isClosedOnRight ? this.rightSheetHeight : this.leftSheetHeight;
                    } else {
                        this.leftCover.height = this.rightCover.height = this.coverExtraHeight + Math.max(this.leftSheetHeight, this.rightSheetHeight);
                        this.leftCover.width = this.coverExtraWidth + this.leftSheetWidth;
                        this.rightCover.width = this.coverExtraWidth + this.rightSheetWidth;
                    }
                    this.leftSheets.width = this.leftSheetWidth;
                    this.leftSheets.height = this.leftSheetHeight;
                    this.rightSheets.height = this.rightSheetHeight;
                    this.rightSheets.width = this.rightSheetWidth;
                    this.leftCover.updateAngle();
                    this.leftSheets.updateAngle();
                    this.rightCover.updateAngle();
                    this.rightSheets.updateAngle();
                    this.updateSheets(true);
                }
                this.updateCenter();
                this.updateCSSLayer();
                this.updatePendingStatusClass();
                this.refreshSpiral();
                if (this.cameraPositionDirty === true) {
                    this.updateCameraPosition();
                }
            }
        },
        {
            key: "updateSheets",
            value: function updateSheets(update) {
                if (this.isClosedPage() !== true) {
                    var rightPage = this.getPageByNumber(this.getRightPageNumber());
                    if (this.rightCover.isFlipping !== true && rightPage && rightPage.sheet.element.geometry.attributes) {
                        var pos = this.rightSheets.element.geometry.attributes.position, posX = update ? rightPage.sheet.element.geometry.boundingBox.max.x * rightPage.sheet.element.scale.x : this.rightSheets.lastSlopeX;
                        pos.setX(21, posX);
                        pos.setX(23, posX);
                        pos.setX(4, posX);
                        pos.setX(6, posX);
                        pos.setX(10, posX);
                        pos.setX(14, posX);
                        pos.needsUpdate = true;
                        this.rightSheets.element.geometry.attributes.uv.needsUpdate = true;
                        this.rightSheets.element.geometry.computeVertexNormals();
                        if (update) this.rightSheets.lastSlopeX = posX;
                    }
                    var leftPage = this.getPageByNumber(this.getLeftPageNumber());
                    if (this.leftCover.isFlipping !== true && leftPage && leftPage.sheet.element.geometry.attributes) {
                        var pos1 = this.leftSheets.element.geometry.attributes.position, posX1 = update ? leftPage.sheet.element.geometry.boundingBox.min.x * leftPage.sheet.element.scale.x : this.leftSheets.lastSlopeX;
                        pos1.setX(16, posX1);
                        pos1.setX(18, posX1);
                        pos1.setX(5, posX1);
                        pos1.setX(7, posX1);
                        pos1.setX(8, posX1);
                        pos1.setX(12, posX1);
                        pos1.needsUpdate = true;
                        this.leftSheets.element.geometry.attributes.uv.needsUpdate = true;
                        this.leftSheets.element.geometry.computeVertexNormals();
                        if (update) this.leftSheets.lastSlopeX = posX1;
                    }
                }
            }
        },
        {
            key: "updateCSSLayer",
            value: function updateCSSLayer() {}
        },
        {
            key: "mouseMove",
            value: function mouseMove(event) {
                event = flipbook_3d_utils.fixMouseEvent(event);
                this.app.renderRequestStatus = flipbook_3d_DV.REQUEST_STATUS.ON;
                if (event.touches != null && event.touches.length === 2) {
                    this.pinchMove(event);
                    return;
                }
                var viewer = this;
                var point = viewer.eventToPoint(event);
                if (viewer.dragSheet !== null && viewer.drag3D !== false) {
                    if (Math.abs(point.x - viewer.startPoint.x) > 2) {
                        if (viewer.isDragging !== true) {
                            viewer.updatePendingStatusClass(true);
                            viewer.isDragging = true;
                        }
                        var width = viewer.dragSheet.width;
                        var x = point.x - (this.app.dimensions.origin.x + viewer.centerEnd - width);
                        var distance = flipbook_3d_utils.limitAt(1 - x / width, -1, 1);
                        var angle = flipbook_3d_utils.toDeg(Math.acos(distance));
                        // angle = utils.limitAt(angle, 0, 180);
                        var sheet = viewer.dragSheet;
                        var isLeftPage = viewer.drag === flipbook_3d_DV.TURN_DIRECTION.LEFT;
                        sheet.sheetAngle = angle;
                        var curveAngle = flipbook_3d_utils.getCurveAngle(isLeftPage, angle, 45);
                        if (sheet.isCover) {
                            sheet.viewer.flipCover(sheet);
                        }
                        sheet.curveAngle = sheet.isHard ? angle : curveAngle;
                        sheet.updateAngle();
                    }
                }
                viewer.checkSwipe(point, event);
            }
        },
        {
            /**
   * @param {MouseEvent & jQueryMouseEvent} event
   */ key: "mouseUp",
            value: function mouseUp(event) {
                var viewer = this;
                event = flipbook_3d_utils.fixMouseEvent(event);
                if (!event.touches && event.button !== 0) return;
                if (viewer.dragSheet == null && event.touches != null && event.touches.length === 0) {
                    this.pinchUp(event);
                    return;
                }
                var point = viewer.eventToPoint(event);
                if (viewer.app.zoomValue === 1) {
                    if (viewer.dragSheet !== null) {
                        var distance = point.x - viewer.startPoint.x;
                        if (Math.abs(distance) > viewer.swipeThreshold * 2) {
                            if (viewer.drag === flipbook_3d_DV.TURN_DIRECTION.LEFT && distance > 0) {
                                viewer.app.openLeft();
                            } else if (viewer.drag === flipbook_3d_DV.TURN_DIRECTION.RIGHT && distance < 0) {
                                viewer.app.openRight();
                            }
                        }
                        viewer.requestRefresh();
                        viewer.updatePendingStatusClass();
                    }
                    var element = event.target || event.originalTarget; //check to see if the clicked element is a link, if so skip turn
                    var isClick = viewer.startPoint && point.x === viewer.startPoint.x && point.y === viewer.startPoint.y && element.nodeName !== "A";
                    if (event.ctrlKey === true && isClick) {
                        this.zoomOnPoint(point);
                    } else if (isClick && point.sheet && viewer.clickAction === flipbook_3d_DV.MOUSE_CLICK_ACTIONS.NAV) {
                        if (point.sheet.sheetAngle > 90) {
                            viewer.app.openRight();
                        } else {
                            viewer.app.openLeft();
                        }
                    }
                }
                viewer.dragSheet = null;
                viewer.drag = null;
                if (viewer.isDragging === true) {
                    viewer.isDragging = false;
                }
                /*3 if there is swipe - clean*/ viewer.startPoint = null;
                viewer.canSwipe = false;
                viewer.app.renderRequestStatus = flipbook_3d_DV.REQUEST_STATUS.ON;
            }
        },
        {
            key: "raycastCLick",
            value: function raycastCLick(event) {
                var viewer = this;
                viewer.mouse = new THREE.Vector2();
                viewer.raycaster = new THREE.Raycaster();
                viewer.mouse.x = event.offsetX / viewer.app.dimensions.stage.width * 2 - 1;
                viewer.mouse.y = 1 - event.offsetY / viewer.app.dimensions.stage.height * 2;
                viewer.raycaster.setFromCamera(viewer.mouse, viewer.camera);
                var intersects = viewer.raycaster.intersectObjects(viewer.bookWrapper.children, true);
                if (intersects.length > 0) {
                    var object, objectCount = 0;
                    do {
                        object = intersects[objectCount] != null ? intersects[objectCount].object : null;
                        if (object.sheet && object.sheet.index) {
                            if (object.sheet.isFlipping !== true) {
                                return object;
                            }
                        }
                        objectCount++;
                    }while (objectCount < intersects.length);
                }
            }
        },
        {
            key: "mouseDown",
            value: function mouseDown(event) {
                event = flipbook_3d_utils.fixMouseEvent(event);
                if (!event.touches && event.button !== 0) return;
                if (event.touches != null && event.touches.length === 2) {
                    this.pinchDown(event);
                } else {
                    event = flipbook_3d_utils.fixMouseEvent(event);
                    var viewer = this;
                    var point = viewer.eventToPoint(event);
                    viewer.startPoint = point;
                    viewer.lastPosX = point.x;
                    viewer.lastPosY = point.y;
                    var object = viewer.raycastCLick(event);
                    var edgeDistance = point.sheet ? point.sheet.width - Math.abs(point.x - (this.app.dimensions.origin.x + viewer.centerEnd)) : 0;
                    if (point.sheet && object && point.isInsideSheet && edgeDistance < point.sheet.width / 2) {
                        viewer.dragSheet = object.sheet;
                        viewer.drag = point.sheet.sheetAngle < 90 ? flipbook_3d_DV.TURN_DIRECTION.LEFT : flipbook_3d_DV.TURN_DIRECTION.RIGHT;
                    } else {
                        viewer.canSwipe = true;
                    }
                }
            }
        },
        {
            key: "eventToPoint",
            value: function eventToPoint(event) {
                var viewer = this, dimensions = this.app.dimensions;
                event = flipbook_3d_utils.fixMouseEvent(event);
                var point = {
                    x: event.clientX,
                    y: event.clientY
                };
                //calculate x and y relative to container
                point.x = point.x - viewer.parentElement[0].getBoundingClientRect().left;
                point.y = point.y - viewer.parentElement[0].getBoundingClientRect().top;
                var left = (-dimensions.offset.width + dimensions.containerWidth) / 2 - dimensions.stage.width / 2, right = (-dimensions.offset.width + dimensions.containerWidth) / 2 + dimensions.stage.width / 2, top = dimensions.padding.top, bottom = dimensions.padding.top + viewer.availablePageHeight();
                var isLeftSheet = point.x < viewer.seamPosition;
                var pageNumber = viewer.getBasePage() + (isLeftSheet ? 0 : 1);
                var sheet = this.getPageByNumber(pageNumber);
                if (sheet) sheet = sheet.sheet;
                var isInsideSheet = point.x > left && point.x < right && point.y > top && point.y < bottom;
                return {
                    isInsideSheet: isInsideSheet,
                    isInsideDragZone: isInsideSheet && point.x - left < viewer.foldSense || right - point.x < viewer.foldSense,
                    x: point.x,
                    y: point.y,
                    left: left,
                    top: top,
                    right: right,
                    bottom: bottom,
                    raw: point,
                    isLeftSheet: isLeftSheet,
                    sheet: sheet
                };
            }
        },
        {
            key: "checkPageLoading",
            value: function checkPageLoading() {
                var isLoaded = true;
                var pages = this.getVisiblePages().main;
                for(var index = 0; index < (this.isBooklet ? 1 : 2); index++){
                    var page = this.getPageByNumber(pages[index]);
                    if (page) {
                        isLoaded = page.textureLoaded && isLoaded;
                    }
                }
                this.element.toggleClass("df-loading", !isLoaded);
            }
        },
        {
            key: "textureLoadedCallback",
            value: function textureLoadedCallback(param) {
                this.app.renderRequestStart();
                this.pagesReady();
            }
        },
        {
            key: "getTextureSize",
            value: function getTextureSize(param) {
                var size = flipbook_3d_get(flipbook_3d_get_prototype_of(FlipBook3D.prototype), "getTextureSize", this).call(this, param);
                if (this.app.zoomValue !== 1 || param.isAnnotation === true) return size;
                var height = flipbook_3d_utils.nearestPowerOfTwo(size.height);
                var width = size.width * height / size.height;
                return this.texturePowerOfTwo ? {
                    height: height,
                    width: width
                } : size;
            }
        },
        {
            key: "getPageByNumber",
            value: function getPageByNumber(pageNumber) {
                if (this.has3DCover) {
                    var isLastPage = !this.isBooklet && pageNumber === this.app.pageCount && pageNumber % 2 === 0, isFirstPage = pageNumber === 1;
                    if (!this.isRTL && isFirstPage || this.isRTL && isLastPage) return this.leftCover.frontPage;
                    if (!this.isRTL && isLastPage || this.isRTL && isFirstPage) return this.rightCover.backPage;
                }
                return flipbook_3d_get(flipbook_3d_get_prototype_of(FlipBook3D.prototype), "getPageByNumber", this).call(this, pageNumber);
            }
        },
        {
            key: "setPage",
            value: function setPage(param) {
                return flipbook_3d_get(flipbook_3d_get_prototype_of(FlipBook3D.prototype), "setPage", this).call(this, param);
            }
        },
        {
            key: "beforeFlip",
            value: function beforeFlip() {
                flipbook_3d_get(flipbook_3d_get_prototype_of(FlipBook3D.prototype), "beforeFlip", this).call(this);
            }
        }
    ]);
    return FlipBook3D;
}(BaseFlipBookViewer);
/**
 * Page3D represents only the material side of the booksheet
 */ var Page3D = /*#__PURE__*/ function(Page2D) {
    "use strict";
    flipbook_3d_inherits(Page3D, Page2D);
    var _super = flipbook_3d_create_super(Page3D);
    function Page3D(options) {
        flipbook_3d_class_call_check(this, Page3D);
        var _this;
        _this = _super.call(this, options);
        var page = flipbook_3d_assert_this_initialized(_this);
        page.element = null;
        page.face = options.face;
        page.parent3D = options.sheet;
        page.sheet = options.sheet;
        page.cssPage = new THREE.CSS3DObject(page.contentLayer[0]);
        return _this;
    }
    flipbook_3d_create_class(Page3D, [
        {
            key: "setLoading",
            value: function setLoading() {
                this.sheet.viewer.checkPageLoading();
            }
        },
        {
            key: "clearMap",
            value: function clearMap() {
                this.sheet.element.material[this.face].map = null;
                this.sheet.element.material[this.face].needsUpdate = true;
            }
        },
        {
            key: "loadTexture",
            value: function loadTexture(param) {
                var page = this, texture = param.texture, callback = param.callback;
                page.textureSrc = texture;
                function completed(object, texture3D) {
                    page.updateTextureLoadStatus(true);
                    page.sheet.resetMatColor(page.face, param.texture === page.textureLoadFallback);
                    if (typeof callback == 'function') callback(param);
                }
                if (typeof flipbook_3d_DV.defaults.beforeLoadTexture == 'function') flipbook_3d_DV.defaults.beforeLoadTexture({
                    texture: texture,
                    page: page
                });
                if (this.face === 4) {
                    this.sheet.backImage(texture, completed);
                } else {
                    this.sheet.frontImage(texture, completed);
                }
            }
        }
    ]);
    return Page3D;
}(Page2D);


;// CONCATENATED MODULE: ./src/js/dearviewer/viewers/viewers-pro.js
function viewers_pro_assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function viewers_pro_class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function viewers_pro_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function viewers_pro_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) viewers_pro_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) viewers_pro_defineProperties(Constructor, staticProps);
    return Constructor;
}
function viewers_pro_get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        viewers_pro_get = Reflect.get;
    } else {
        viewers_pro_get = function get(target, property, receiver) {
            var base = viewers_pro_super_prop_base(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver || target);
            }
            return desc.value;
        };
    }
    return viewers_pro_get(target, property, receiver || target);
}
function viewers_pro_get_prototype_of(o) {
    viewers_pro_get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return viewers_pro_get_prototype_of(o);
}
function viewers_pro_inherits(subClass, superClass) {
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
    if (superClass) viewers_pro_set_prototype_of(subClass, superClass);
}
function viewers_pro_possible_constructor_return(self, call) {
    if (call && (viewers_pro_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return viewers_pro_assert_this_initialized(self);
}
function viewers_pro_set_prototype_of(o, p) {
    viewers_pro_set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return viewers_pro_set_prototype_of(o, p);
}
function viewers_pro_super_prop_base(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = viewers_pro_get_prototype_of(object);
        if (object === null) break;
    }
    return object;
}
function viewers_pro_type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function viewers_pro_is_native_reflect_construct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function viewers_pro_create_super(Derived) {
    var hasNativeReflectConstruct = viewers_pro_is_native_reflect_construct();
    return function _createSuperInternal() {
        var Super = viewers_pro_get_prototype_of(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = viewers_pro_get_prototype_of(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return viewers_pro_possible_constructor_return(this, result);
    };
}






var viewers_pro_utils = defaults_DEARVIEWER.utils;
//region Pinch To Zoom
BaseViewer.prototype.pinchDown = function(event) {
    if (event.touches != null && event.touches.length == 2 && this.startTouches == null) {
        this.startTouches = viewers_pro_utils.getTouches(event);
        this.app.viewer.zoomCenter = viewers_pro_utils.getVectorAvg(viewers_pro_utils.getTouches(event, this.parentElement.offset()));
        this.lastScale = 1;
    }
};
BaseViewer.prototype.pinchUp = function(event) {
    if (event.touches != null && event.touches.length < 2 && this.pinchZoomDirty == true) {
        this.app.viewer.lastScale = this.lastScale;
        this.app.container.removeClass("df-pinch-zoom");
        this.updateTemporaryScale(true);
        this.app.zoom();
        this.lastScale = null;
        this.app.viewer.canSwipe = false;
        this.pinchZoomDirty = false;
        this.app.viewer._pinchZoomLastScale = null;
        this.startTouches = null;
    }
};
BaseViewer.prototype.pinchMove = function(event) {
    if (event.touches != null && event.touches.length == 2 && this.startTouches != null) {
        this.pinchZoomDirty = true;
        this.app.container.addClass("df-pinch-zoom");
        var newScale = viewers_pro_utils.calculateScale(this.startTouches, viewers_pro_utils.getTouches(event)), scale = newScale / this.lastScale;
        this.lastScale = newScale;
        this.app.viewer.pinchZoomUpdateScale = viewers_pro_utils.limitAt(newScale, this.app.viewer.minZoom / this.app.zoomValue, this.app.viewer.maxZoom / this.app.zoomValue);
        if (this.app.viewer._pinchZoomLastScale != this.app.viewer.pinchZoomUpdateScale) {
            this.app.viewer.pinchZoomRequestStatus = defaults_DEARVIEWER.REQUEST_STATUS.ON;
            this.app.viewer._pinchZoomLastScale = this.app.viewer.pinchZoomUpdateScale;
        }
        event.preventDefault();
        return;
    }
};
//endregion
//region Flipbook3D Pro
FlipBook3D.prototype.resizeAnnotations = function(pageNumber) {
    //if there is no transform origin, update 2.15 and above, no need for resizing
    //https://github.com/mozilla/pdf.js/pull/15036
    var annotationElement = this.getAnnotationElement(pageNumber);
    if (annotationElement && annotationElement.style.width !== "") return;
    if (this.app.zoomValue !== 1) return;
    var page = this.getPageByNumber(pageNumber);
    var viewport = BaseFlipBookViewer.prototype.getViewPort.call(this, pageNumber);
    if (page && viewport) {
        viewport = viewport.clone({
            dontFlip: true
        });
        var reqStamp = pageNumber + "|" + this.rightSheetHeight;
        var cssPage = page.cssPage;
        if (cssPage.lastStamp !== reqStamp) {
            cssPage.lastStamp = reqStamp;
            var boundRight = page.sheet.element.geometry.boundingBox;
            var width = Math.abs(boundRight.max.x - boundRight.min.x) * page.sheet.element.scale.x;
            var widthX = this.getDoublePageWidthFix(pageNumber) * width / viewport.width, heightX = page.sheet.height / viewport.height;
            var links = cssPage.element.querySelectorAll("section");
            if (links.length > 0) {
                links.forEach(function(link) {
                    link.style.transform = "matrix(" + widthX + ", 0, 0, " + heightX + "," + viewport.transform[4] * widthX + "," + viewport.transform[5] * heightX + ")";
                });
            }
            this.app.provider.processTextContent(pageNumber, this.getTextElement(pageNumber, true));
        }
    }
};
FlipBook3D.prototype.finalizeAnnotations = function(element, pageNumber) {
    BaseFlipBookViewer.prototype.finalizeAnnotations.call(this, element, pageNumber);
    this.resizeAnnotations(pageNumber);
};
FlipBook3D.prototype.updateCSSLayer = function() {
    var viewer = this;
    var baseActive = viewer.getBasePage();
    var width, height;
    var leftPageNumber = baseActive + (viewer.isBooklet ? 0 : viewer.isRTL ? 1 : 0), rightPageNumber = baseActive + (viewer.isBooklet ? 0 : this.isRTL ? 0 : 1);
    var pageLeft = !this.isRTL && viewer.isBooklet ? undefined : viewer.getPageByNumber(leftPageNumber), pageRight = this.isRTL && viewer.isBooklet ? undefined : viewer.getPageByNumber(rightPageNumber);
    jQuery(viewer.stage.cssRenderer.domElement).find(".df-page-content").css({
        display: "none"
    });
    var isVertical = this.orientation == 'vertical';
    if (this.leftViewport && pageLeft != null && pageLeft.sheet.element.visible) {
        var divLeft = pageLeft.cssPage;
        if (divLeft != null) {
            var boundLeft = pageLeft.sheet.element.geometry.boundingBox;
            width = Math.abs(boundLeft.max.x - boundLeft.min.x) * pageLeft.sheet.element.scale.x;
            height = Math.abs(boundLeft.max.y - boundLeft.min.y) * pageLeft.sheet.element.scale.y;
            divLeft.rotation.y = 0; //-Math.atan2(height, width) * 0.9;
            divLeft.position.z = 0; //pageLeft.sheet.element.position.z + height * 0.5;
            divLeft.position.x = 0; //height / 2.5;
            jQuery(divLeft.element).css({
                width: isVertical ? height : width,
                height: isVertical ? width : height,
                top: isVertical ? this.pageOffset + width / 2 : 0,
                left: isVertical ? 0 : -this.pageOffset - width / 2,
                display: 'block'
            });
            // if (this.texturePowerOfTwo) {
            this.resizeAnnotations(leftPageNumber);
        // }
        }
    }
    if (this.rightViewPort && pageRight != null && pageRight.sheet.element.visible) {
        var divRight = pageRight.cssPage;
        if (divRight != null) {
            var boundRight = pageRight.sheet.element.geometry.boundingBox;
            width = Math.abs(boundRight.max.x - boundRight.min.x) * pageRight.sheet.element.scale.x;
            height = Math.abs(boundRight.max.y - boundRight.min.y) * pageRight.sheet.element.scale.y;
            divRight.rotation.y = 0; //Math.atan2(height, width) * 0.9;
            divRight.position.z = 0; //pageRight.sheet.element.position.z + height * 0.5;
            divRight.position.x = 0; //-height / 2.5;
            jQuery(divRight.element).css({
                width: isVertical ? height : width,
                height: isVertical ? width : height,
                top: isVertical ? -this.pageOffset - width / 2 : 0,
                left: isVertical ? 0 : this.pageOffset + width / 2,
                display: 'block'
            });
            // if (t/his.texturePowerOfTwo) {
            this.resizeAnnotations(rightPageNumber);
        // }
        }
    }
};
FlipBook3D.prototype.initSpiral = function() {
    if (this.app.pageCount < 3) this.hasSpiral = false;
    if (this.hasSpiral !== true) return;
    //TorusGeometry(radius : Float, tube : Float, radialSegments : Integer, tubularSegments : Integer, arc : Float)
    var spirals = this.spirals = new THREE.Group();
    var leftHoles = this.leftHoles = new THREE.Group();
    var rightHoles = this.rightHoles = new THREE.Group();
    var spiralGroup = this.spiralGroup = new THREE.Group();
    var geometry = new THREE.TorusGeometry(30, 2, 6, 20);
    var _this_app_options_spiralColor;
    var material = new THREE.MeshPhongMaterial({
        color: (_this_app_options_spiralColor = this.app.options.spiralColor) !== null && _this_app_options_spiralColor !== void 0 ? _this_app_options_spiralColor : 0x888888
    });
    var torus = new THREE.Mesh(geometry, material);
    torus.castShadow = true;
    torus.rotateX(-THREE.MathUtils.degToRad(-90));
    var box = new THREE.Mesh(new THREE.BoxGeometry(8, 15, 5, 1, 1, 1), new THREE.MeshBasicMaterial({
        color: 0x444444
    }));
    var box2 = new THREE.Mesh(new THREE.BoxGeometry(8, 15, 5, 1, 1, 1), new THREE.MeshBasicMaterial({
        color: 0x444444
    }));
    for(var count = 0; count < this.spiralCount; count++){
        var pos = -935 / 2 + count * 935 / this.spiralCount + 935 / this.spiralCount / 2;
        var clone = torus.clone();
        clone.position.y = pos - 4;
        this.spirals.add(clone);
        clone = torus.clone();
        clone.position.y = pos + 4;
        this.spirals.add(clone);
        clone = box.clone();
        clone.position.y = pos;
        clone.position.x = -28;
        this.leftHoles.add(clone);
        clone = box2.clone();
        clone.position.y = pos;
        clone.position.x = 28;
        this.rightHoles.add(clone);
    }
    this.spiralGroup.add(this.spirals);
    this.spiralGroup.add(this.leftHoles);
    this.spiralGroup.add(this.rightHoles);
    this.bookWrapper.add(this.spiralGroup);
    if (this.orientation === 'vertical') {
        this.spiralGroup.rotateZ(THREE.MathUtils.degToRad(-90));
    }
    this.spiralGroup.scale.set(0.1, 0.1, 0.1); //big spiral makes flipbook fitting wrong
};
FlipBook3D.prototype.set3DCoverNormal = function() {
    var cover3DType = this.app.options.cover3DType;
    if (cover3DType === defaults_DEARVIEWER.FLIPBOOK_COVER_TYPE.PLAIN) return;
    var hasRidge = cover3DType == defaults_DEARVIEWER.FLIPBOOK_COVER_TYPE.RIDGE, grd;
    if (this.hasSpiral && hasRidge == true) hasRidge = false;
    this.leftCover.fallbackMatColor = new THREE.Color("#f7f7f7");
    this.rightCover.fallbackMatColor = new THREE.Color("#f7f7f7");
    this.leftCover.setMatColor(this.color3DSheets, 5);
    this.rightCover.setMatColor(this.color3DSheets, 4);
    var resolution = 128;
    var centerColor = "rgb(127,127,255)";
    //region LeftCover
    var canvas = document.createElement("canvas");
    canvas.height = resolution;
    canvas.width = resolution;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = centerColor;
    ctx.fillRect(0, 0, resolution, resolution);
    var width = resolution * 1.5 / 100;
    //left shade
    grd = ctx.createLinearGradient(0, 0, width, 0);
    grd.addColorStop(0, centerColor);
    grd.addColorStop(1, "rgb(127,255,255)");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width, width);
    ctx.lineTo(width, resolution - width);
    ctx.lineTo(0, resolution - width);
    ctx.closePath();
    ctx.fill();
    if (hasRidge) {
        grd = ctx.createLinearGradient(width, 0, width * 4, 0);
        grd.addColorStop(0, "rgb(127,127,255)");
        grd.addColorStop(0.25, "rgb(255,127,255)");
        grd.addColorStop(0.5, "rgb(0,127,255)");
        grd.addColorStop(0.75, "rgb(127,127,255)");
        grd.addColorStop(1, "rgb(127,127,255)");
        ctx.fillStyle = grd;
        ctx.fillRect(width, 0, width * 4, resolution);
    }
    //top shade
    grd = ctx.createLinearGradient(0, width, 0, 0);
    grd.addColorStop(0, centerColor);
    grd.addColorStop(1, "rgb(127,255,255)");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.moveTo(hasRidge ? width * 3 : width, 0);
    ctx.lineTo(resolution, 0);
    ctx.lineTo(resolution - width, width);
    ctx.lineTo(hasRidge ? width * 4 : width, width);
    ctx.closePath();
    ctx.fill();
    //right shade
    grd = ctx.createLinearGradient(resolution - width, 0, resolution, 0);
    grd.addColorStop(0, centerColor);
    grd.addColorStop(1, "rgb(255,127,255)");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.moveTo(resolution - width, width);
    ctx.lineTo(resolution, 0);
    ctx.lineTo(resolution, resolution);
    ctx.lineTo(resolution - width, resolution - width);
    ctx.closePath();
    ctx.fill();
    //bottom shade
    grd = ctx.createLinearGradient(0, resolution - width, 0, resolution);
    grd.addColorStop(0, centerColor);
    grd.addColorStop(1, "rgb(127,0,255)");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.moveTo(hasRidge ? width * 4 : width, resolution - width);
    ctx.lineTo(resolution - width, resolution - width);
    ctx.lineTo(resolution, resolution);
    ctx.lineTo(hasRidge ? width * 3 : width, resolution);
    ctx.closePath();
    ctx.fill();
    this.leftCover.element.loadNormalMap(canvas, MOCKUP.MATERIAL_FACE.FRONT);
    //endregion
    //region RightCover
    var canvasRight = document.createElement("canvas");
    canvasRight.height = resolution;
    canvasRight.width = resolution;
    var ctxRight = canvasRight.getContext("2d");
    ctxRight.fillStyle = centerColor;
    ctxRight.fillRect(0, 0, resolution, resolution);
    //right shade
    grd = ctxRight.createLinearGradient(resolution - width, 0, resolution, 0);
    grd.addColorStop(0, centerColor);
    grd.addColorStop(1, "rgb(255,127,255)");
    ctxRight.fillStyle = grd;
    ctxRight.beginPath();
    ctxRight.moveTo(resolution - width, width);
    ctxRight.lineTo(resolution, 0);
    ctxRight.lineTo(resolution, resolution);
    ctxRight.lineTo(resolution - width, resolution - width);
    ctxRight.closePath();
    ctxRight.fill();
    if (hasRidge) {
        grd = ctxRight.createLinearGradient(resolution - width * 4, 0, resolution - width, 0);
        grd.addColorStop(0, "rgb(127,127,255)");
        grd.addColorStop(0.25, "rgb(127,127,255)");
        grd.addColorStop(0.5, "rgb(255,127,255)");
        grd.addColorStop(0.75, "rgb(0,127,255)");
        grd.addColorStop(1, "rgb(127,127,255)");
        ctxRight.fillStyle = grd;
        ctxRight.fillRect(resolution - width * 4, 0, width * 3, resolution);
    }
    //top shade
    grd = ctxRight.createLinearGradient(0, width, 0, 0);
    grd.addColorStop(0, centerColor);
    grd.addColorStop(1, "rgb(127,255,255)");
    ctxRight.fillStyle = grd;
    ctxRight.beginPath();
    ctxRight.moveTo(0, 0);
    ctxRight.lineTo(resolution - width * (hasRidge ? 3 : 0), 0);
    ctxRight.lineTo(resolution - width * (hasRidge ? 4 : 1), width);
    ctxRight.lineTo(width, width);
    ctxRight.closePath();
    ctxRight.fill();
    //left shade
    grd = ctxRight.createLinearGradient(0, 0, width, 0);
    grd.addColorStop(0, centerColor);
    grd.addColorStop(1, "rgb(127,255,255)");
    ctxRight.fillStyle = grd;
    ctxRight.beginPath();
    ctxRight.moveTo(0, 0);
    ctxRight.lineTo(width, width);
    ctxRight.lineTo(width, resolution - width);
    ctxRight.lineTo(0, resolution - width);
    ctxRight.closePath();
    ctxRight.fill();
    //bottom shade
    grd = ctxRight.createLinearGradient(0, resolution - width, 0, resolution);
    grd.addColorStop(0, centerColor);
    grd.addColorStop(1, "rgb(127,0,255)");
    ctxRight.fillStyle = grd;
    ctxRight.beginPath();
    ctxRight.moveTo(width, resolution - width);
    ctxRight.lineTo(resolution - width * (hasRidge ? 4 : 1), resolution - width);
    ctxRight.lineTo(resolution - width * (hasRidge ? 3 : 0), resolution);
    ctxRight.lineTo(0, resolution);
    ctxRight.closePath();
    ctxRight.fill();
    this.rightCover.element.loadNormalMap(canvasRight, MOCKUP.MATERIAL_FACE.BACK);
//endregion
};
/**
 * Creates the inside of 3D cover
 * @param val The color of Cover
 */ FlipBook3D.prototype.setcolor3DCover = function() {
    var val = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    val = val.trim();
    if (val.indexOf("#") == 0 && val.length === 4) {
        val = val.split("").map(function(item) {
            if (item == "#") {
                return item;
            }
            return item + item;
        }).join("");
    }
    var brightness = viewers_pro_utils.color.getBrightness(val);
    if (isNaN(brightness)) {
        console.log("Improper Color code value. Needs a hex value! Using default 0.25");
        brightness = 0.25;
    }
    //more dark more opacity, more bright less opacity
    var baseOpacity = (255 - brightness) / 255;
    // console.log(baseOpacity);
    // console.time("Texture Calculation");
    var resolution = 1024;
    var canvas = document.createElement('canvas');
    canvas.height = resolution;
    canvas.width = resolution;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = val;
    ctx.fillRect(0, 0, resolution, resolution);
    ctx.strokeStyle = 'rgba(50,50,50,' + (baseOpacity / 2 + 0.4) + ')';
    ctx.strokeRect(resolution * .1, resolution * .05, resolution * (this.hasSpiral ? 0.9 : 0.85), resolution * 0.9);
    //crease
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(50,50,50,' + (baseOpacity / 2 + 0.3) + ')';
    ctx.lineWidth = 2;
    ctx.moveTo(0, 0);
    ctx.lineTo(resolution * .1, resolution * .05);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(50,50,50,' + (baseOpacity / 2 + 0.4) + ')';
    ctx.moveTo(0, resolution);
    ctx.lineTo(resolution * .1, resolution * .95);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 4;
    ctx.moveTo(0, 0);
    ctx.lineTo(0, resolution);
    ctx.moveTo(0, 0);
    ctx.lineTo(resolution, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(50,50,50,' + (baseOpacity / 2 + 0.3) + ')';
    ctx.lineWidth = 4;
    ctx.moveTo(0, resolution);
    ctx.lineTo(resolution, resolution);
    ctx.stroke();
    if (this.hasSpiral === false) {
        ctx.beginPath();
        var grd = ctx.createLinearGradient(resolution * .95, 0, resolution, 0);
        grd.addColorStop(0, 'rgba(30,30,30,' + (baseOpacity + 0.3) + ')');
        // grd.addColorStop(0.2, "rgba(40,40,40,0.5)");
        grd.addColorStop(1, 'rgba(60,60,60,' + (baseOpacity + 0.3) + ')');
        ctx.fillStyle = grd;
        ctx.fillRect(resolution * .95, 0, resolution * .05, resolution);
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(40,40,40,' + (baseOpacity + 0.3) + ')';
        for(var count = 0; count < 17; count++){
            ctx.moveTo(resolution - count * 3, 0);
            ctx.lineTo(resolution - count * 3, resolution);
        }
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(50,50,50,0.2)';
        ctx.lineWidth = 4;
        ctx.moveTo(resolution, 0);
        ctx.lineTo(resolution, resolution);
        ctx.stroke();
    }
    this.leftCover.backImage(canvas);
    // console.timeLog("Texture Calculation");
    var canvas2 = document.createElement('canvas');
    canvas2.height = resolution;
    canvas2.width = resolution;
    var ctx2 = canvas2.getContext("2d");
    ctx2.fillStyle = val;
    ctx2.fillRect(0, 0, resolution, resolution);
    ctx2.strokeStyle = 'rgba(50,50,50,' + (baseOpacity / 2 + 0.5) + ')';
    ctx2.strokeRect(resolution * (this.hasSpiral ? 0 : 0.05), resolution * .05, resolution * (this.hasSpiral ? 0.9 : 0.85), resolution * 0.9);
    //crease
    ctx2.beginPath();
    ctx2.strokeStyle = 'rgba(50,50,50,' + (baseOpacity / 2 + 0.3) + ')';
    ctx2.lineWidth = 2;
    ctx2.moveTo(resolution, 0);
    ctx2.lineTo(resolution * .9, resolution * .05);
    ctx2.stroke();
    ctx2.beginPath();
    ctx2.strokeStyle = 'rgba(50,50,50,' + (baseOpacity / 2 + 0.5) + ')';
    ctx2.moveTo(resolution, resolution);
    ctx2.lineTo(resolution * .9, resolution * .95);
    ctx2.stroke();
    //outline
    ctx2.beginPath();
    ctx2.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx2.lineWidth = 4;
    ctx2.moveTo(0, 0);
    ctx2.lineTo(resolution, 0);
    ctx2.stroke();
    ctx2.beginPath();
    ctx2.strokeStyle = 'rgba(50,50,50,' + (baseOpacity / 2 + 0.3) + ')';
    ctx2.lineWidth = 4;
    ctx2.moveTo(resolution, 0);
    ctx2.lineTo(resolution, resolution);
    ctx2.moveTo(0, resolution);
    ctx2.lineTo(resolution, resolution);
    ctx2.stroke();
    if (this.hasSpiral === false) {
        ctx2.beginPath();
        var grd2 = ctx2.createLinearGradient(0, 0, resolution * .05, 0);
        grd2.addColorStop(0, 'rgba(0,0,0,' + (baseOpacity + 0.3) + ')');
        grd2.addColorStop(0.2, 'rgba(10,10,10,' + (baseOpacity + 0.3) + ')');
        grd2.addColorStop(1, 'rgba(80,80,80,' + (baseOpacity + 0.3) + ')');
        ctx2.fillStyle = grd2;
        ctx2.fillRect(0, 0, resolution * .05, resolution);
        ctx2.beginPath();
        ctx2.lineWidth = 1;
        ctx2.strokeStyle = 'rgba(40,40,40,' + (baseOpacity + 0.3) + ')';
        for(var count1 = 0; count1 < 17; count1++){
            ctx2.moveTo(count1 * 3, 0);
            ctx2.lineTo(count1 * 3, resolution);
        }
        ctx2.stroke();
    } else {
        ctx2.beginPath();
        ctx2.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx2.lineWidth = 4;
        ctx2.moveTo(0, 0);
        ctx2.lineTo(0, resolution);
        ctx2.stroke();
    }
    this.rightCover.frontImage(canvas2);
    // console.timeEnd("Texture Calculation");
    var canvas3 = document.createElement('canvas');
    resolution = 128;
    canvas3.height = resolution;
    canvas3.width = resolution;
    var ctx3 = canvas3.getContext("2d");
    ctx3.fillStyle = "#ffffff";
    ctx3.fillRect(0, 0, resolution, resolution);
    ctx3.strokeStyle = "#cccccc";
    ctx3.lineWidth = 1;
    for(var count2 = 0; count2 < resolution / 4; count2++){
        ctx3.moveTo(count2 * 4, 0);
        ctx3.lineTo(count2 * 4, resolution);
    }
    ctx3.stroke();
    this.leftSheets.element.loadImage(canvas3, 1, null);
    this.rightSheets.element.loadImage(canvas3, 3, null);
    this.app.renderRequestStatus = defaults_DEARVIEWER.REQUEST_STATUS.ON;
};
FlipBook3D.prototype.refreshSpiral = function() {
    if (this.hasSpiral !== true) return;
    var maxPos = this.midPosition + this.sheetDepth;
    this.bookWrapper.children.forEach(function(page) {
        if (page && page.sheetAngle) {
            if (page.position.z + page.depth / 2 > maxPos) maxPos = page.position.z + page.depth / 2;
        }
    });
    this.leftHoles.visible = this.isBooklet ? this.isRTL : this.isLeftClosed == false && this.leftCover.isFlipping == false;
    this.rightHoles.visible = this.isBooklet ? !this.isRTL : this.isRightClosed == false && this.rightCover.isFlipping == false;
    var scale = this.orientation === 'vertical' ? Math.max(this.leftHoles.visible ? this.leftSheetWidth : 0, this.rightHoles.visible ? this.rightSheetWidth : 0) : Math.max(this.leftHoles.visible ? this.leftSheetHeight : 0, this.rightHoles.visible ? this.rightSheetHeight : 0);
    scale /= 1000;
    this.leftHoles.position.z = this.rightHoles.position.z = maxPos + 2 / scale + (this.isClosedPage() ? 2 * this.leftCover.depth : 0) / scale; //(this.isBooklet ? 4 : 0) + (this.isClosedPage() ? 5 : 0);
    this.spiralGroup.scale.set(scale, scale, scale);
};
//endregion
var HybridFlipbook3D = /*#__PURE__*/ function(FlipBook3D) {
    "use strict";
    viewers_pro_inherits(HybridFlipbook3D, FlipBook3D);
    var _super = viewers_pro_create_super(HybridFlipbook3D);
    function HybridFlipbook3D(options, appContext) {
        viewers_pro_class_call_check(this, HybridFlipbook3D);
        options.flipbook3DTiltAngleUp = 0;
        options.flipbook3DTiltAngleLeft = 0;
        options.hasSpiral = false;
        options.flexibility = 0;
        if (options.cover3DType === defaults_DEARVIEWER.FLIPBOOK_COVER_TYPE.RIDGE || options.cover3DType === defaults_DEARVIEWER.FLIPBOOK_COVER_TYPE.BASIC) {
            options.cover3DType = defaults_DEARVIEWER.FLIPBOOK_COVER_TYPE.PLAIN;
        }
        return _super.call(this, options, appContext);
    }
    viewers_pro_create_class(HybridFlipbook3D, [
        {
            key: "init",
            value: function init() {
                viewers_pro_get(viewers_pro_get_prototype_of(HybridFlipbook3D.prototype), "init", this).call(this);
                this.texturePowerOfTwo = false;
                this.app.container.addClass("df-hybrid-viewer df-pending");
            }
        },
        {
            key: "getAnnotationElement",
            value: function getAnnotationElement(pageNumber) {
                var clean = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                return viewers_pro_get(viewers_pro_get_prototype_of(HybridFlipbook3D.prototype), "getAnnotationElement", this).call(this, pageNumber, clean, true);
            }
        },
        {
            key: "getTextElement",
            value: function getTextElement(pageNumber) {
                var clean = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                return viewers_pro_get(viewers_pro_get_prototype_of(HybridFlipbook3D.prototype), "getTextElement", this).call(this, pageNumber, clean, true);
            }
        },
        {
            key: "isAnimating",
            value: function isAnimating() {
                return this.isFlipping();
            }
        },
        {
            key: "onCenterStartAnimation",
            value: function onCenterStartAnimation(tween) {
                this.app.container.addClass("df-hide-zoomview");
            }
        },
        {
            key: "onCenterStopAnimation",
            value: function onCenterStopAnimation(tween) {
                this.finalizeCenterAnimation();
            }
        },
        {
            key: "onCenterCompleteAnimation",
            value: function onCenterCompleteAnimation(tween) {
                this.zoomViewer.updateCenter();
                this.finalizeCenterAnimation();
            }
        },
        {
            key: "finalizeCenterAnimation",
            value: function finalizeCenterAnimation() {
                this.app.container.removeClass("df-hide-zoomview");
            }
        },
        {
            key: "afterFlip",
            value: function afterFlip() {
                var skip = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
                var viewer = this;
                if (this.isAnimating() !== true) {
                    this.pagesReady();
                    this.updatePendingStatusClass();
                    this.updateZoomViewerTexture({
                        pageNumber: this.getBasePage()
                    });
                    this.updateZoomViewerTexture({
                        pageNumber: this.getBasePage() + 1
                    });
                }
            }
        },
        {
            key: "exchangeTexture",
            value: function exchangeTexture(from, to) {
                this.skipCenterAnimation = true;
                viewers_pro_get(viewers_pro_get_prototype_of(HybridFlipbook3D.prototype), "exchangeTexture", this).call(this, from, to);
                this.updateZoomViewerTextContent({
                    pageNumber: this.getBasePage()
                });
                this.updateZoomViewerTextContent({
                    pageNumber: this.getBasePage() + 1
                });
            }
        },
        {
            key: "updateZoomViewerTexture",
            value: function updateZoomViewerTexture(param) {
                var page = this.zoomViewer.getPageByNumber(param.pageNumber);
                if (page && page.textureStamp === "-1") {
                    var set = this.zoomViewer.setPage({
                        pageNumber: page.pageNumber,
                        texture: this.getPageByNumber(page.pageNumber).getTexture()
                    });
                    if (set) {
                        this.updateZoomViewerTextContent(param);
                    }
                }
            }
        },
        {
            key: "updateZoomViewerTextContent",
            value: function updateZoomViewerTextContent(param) {
                this.app.provider.processAnnotations(param.pageNumber, this.app.viewer.getAnnotationElement(param.pageNumber, true));
                this.app.provider.processTextContent(param.pageNumber, this.app.viewer.getTextElement(param.pageNumber, true));
            }
        },
        {
            key: "textureLoadedCallback",
            value: function textureLoadedCallback(param) {
                this.app.renderRequestStart();
                this.updateZoomViewerTexture(param);
                this.pagesReady();
            }
        },
        {
            key: "resizeAnnotations",
            value: function resizeAnnotations(pageNumber) {
            //nothing to resize
            }
        }
    ]);
    return HybridFlipbook3D;
}(FlipBook3D);
var Calendar3D = /*#__PURE__*/ function(FlipBook3D) {
    "use strict";
    viewers_pro_inherits(Calendar3D, FlipBook3D);
    var _super = viewers_pro_create_super(Calendar3D);
    function Calendar3D(options, appContext) {
        viewers_pro_class_call_check(this, Calendar3D);
        var _this;
        _this = _super.call(this, options, appContext);
        _this.orientation = 'vertical';
        return _this;
    }
    return Calendar3D;
}(FlipBook3D);
var FlipBook = function FlipBook(options, appContext) {
    "use strict";
    viewers_pro_class_call_check(this, FlipBook);
    if (defaults_DEARVIEWER.utils.canSupport3D() == false || options.is3D === void 0) {
        options.is3D = false; //IE 11
    }
    if (options.is3D === 'flat3D') {
        options.flexibility = 0;
        return new HybridFlipbook3D(options, appContext);
    } else if (options.is3D === 'calendar3D') {
        return new Calendar3D(options, appContext);
    } else if (viewers_pro_utils.isTrue(options.is3D)) {
        return new FlipBook3D(options, appContext);
    } else return new FlipBook2D(options, appContext);
};
defaults_DEARVIEWER.viewers = defaults_DEARVIEWER.viewers || {};
defaults_DEARVIEWER.viewers['flipbook'] = FlipBook;
defaults_DEARVIEWER.viewers['default'] = defaults_DEARVIEWER.viewers['reader'] = Reader;
defaults_DEARVIEWER.viewers['slider'] = Slider;

;// CONCATENATED MODULE: ./src/js/dearviewer/utils/provider.js
/* globals requirejs, jQuery*/ function provider_assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function provider_class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function provider_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function provider_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) provider_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) provider_defineProperties(Constructor, staticProps);
    return Constructor;
}
function provider_get_prototype_of(o) {
    provider_get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return provider_get_prototype_of(o);
}
function provider_inherits(subClass, superClass) {
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
    if (superClass) provider_set_prototype_of(subClass, superClass);
}
function provider_instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function provider_possible_constructor_return(self, call) {
    if (call && (provider_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return provider_assert_this_initialized(self);
}
function provider_set_prototype_of(o, p) {
    provider_set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return provider_set_prototype_of(o, p);
}
function provider_type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function provider_is_native_reflect_construct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function provider_create_super(Derived) {
    var hasNativeReflectConstruct = provider_is_native_reflect_construct();
    return function _createSuperInternal() {
        var Super = provider_get_prototype_of(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = provider_get_prototype_of(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return provider_possible_constructor_return(this, result);
    };
}

var provider_utils = defaults_DEARVIEWER.utils;
/**
 * @typedef {Object} PDFDocument
 * @property {Function} getPage - Gets the Page
 * @property {Function} numPages - Total number of pages
 * @property {Function} getPageIndex - Gets the Page Index
 * @property {Function} getOutline - Gets the Outline
 * @property {Function} getDestination - Gets the Destination
 */ /**
 * @typedef {Object} PDFPage
 * @property {Function} getViewport - Gets the Viewport
 * @property {Function} getAnnotations - Gets the Annotation
 */ //region Link Service
/**
 * Performs navigation functions inside PDF, such as opening specified page,
 * or destination.
 * @class
 */ var PDFLinkService = /*#__PURE__*/ function() {
    "use strict";
    function PDFLinkService() {
        provider_class_call_check(this, PDFLinkService);
        this.baseUrl = null;
        this.pdfDocument = null;
        this.pdfApp = null;
        this.pdfHistory = null;
        this.externalLinkRel = null;
        this.externalLinkEnabled = true;
        this._pagesRefCache = null;
    }
    provider_create_class(PDFLinkService, [
        {
            key: "dispose",
            value: function dispose() {
                this.baseUrl = null;
                this.pdfDocument = null;
                this.pdfApp = null;
                this.pdfHistory = null;
                this._pagesRefCache = null;
            }
        },
        {
            key: "setDocument",
            value: function setDocument(pdfDocument, baseUrl) {
                this.baseUrl = baseUrl;
                this.pdfDocument = pdfDocument;
                this._pagesRefCache = Object.create(null);
            }
        },
        {
            key: "setViewer",
            value: function setViewer(pdfApp) {
                this.pdfApp = pdfApp;
                this.externalLinkTarget = pdfApp.options.linkTarget;
            }
        },
        {
            key: "setHistory",
            value: function setHistory(pdfHistory) {
                this.pdfHistory = pdfHistory;
            }
        },
        {
            key: "pagesCount",
            get: /**
   * @returns {number}
   */ function get() {
                return this.pdfDocument.numPages;
            }
        },
        {
            key: "page",
            get: /**
   * @returns {number}
   */ function get() {
                return this.pdfApp.currentPageNumber;
            },
            set: /**
   * @param {number} value
   */ function set(value) {
                this.pdfApp.gotoPage(value);
            }
        },
        {
            key: "navigateTo",
            value: function navigateTo(dest) {
                this.goToDestination(dest);
            }
        },
        {
            /**
   * Wrapper around the `addLinkAttributes`-function in the API.
   * @param {HTMLAnchorElement} link
   * @param {string} url
   * @param {boolean} [newWindow]
   */ key: "addLinkAttributes",
            value: function addLinkAttributes(link, url) {
                var newWindow = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
                /*    pdfjsLib.addLinkAttributes(link, {
          url,
          target: this.externalLinkTarget,
          rel: this.externalLinkRel,
          enabled: this.externalLinkEnabled,
        });*/ var target = this.externalLinkTarget, rel = this.externalLinkRel, enabled = this.externalLinkEnabled;
                if (!url || typeof url !== "string") {
                    throw new Error('A valid "url" parameter must provided.');
                }
                var urlNullRemoved = (0, provider_utils.removeNullCharacters)(url);
                if (enabled) {
                    link.href = link.title = urlNullRemoved;
                } else {
                    link.href = "";
                    link.title = "Disabled: ".concat(urlNullRemoved);
                    link.onclick = function() {
                        return false;
                    };
                }
                var targetStr = "";
                switch(target){
                    case defaults_DEARVIEWER.LINK_TARGET.NONE:
                        break;
                    case defaults_DEARVIEWER.LINK_TARGET.SELF:
                        targetStr = "_self";
                        break;
                    case defaults_DEARVIEWER.LINK_TARGET.BLANK:
                        targetStr = "_blank";
                        break;
                    case defaults_DEARVIEWER.LINK_TARGET.PARENT:
                        targetStr = "_parent";
                        break;
                    case defaults_DEARVIEWER.LINK_TARGET.TOP:
                        targetStr = "_top";
                        break;
                }
                link.target = targetStr;
                link.rel = typeof rel === "string" ? rel : "noopener noreferrer nofollow";
            }
        },
        {
            /**
   * @param dest - The PDF destination object.
   */ key: "goToDestination",
            value: function goToDestination(dest) {
                var destString = '';
                var self = this;
                var goToDestination = function goToDestination1(destRef) {
                    provider_utils.log("Requested: ", destRef);
                    // dest array looks like that: <page-ref> </XYZ|FitXXX> <args..>
                    var pageNumber = provider_instanceof(destRef, Object) ? self._pagesRefCache[destRef.num + ' ' + destRef.gen + ' R'] : destRef + 1;
                    if (pageNumber) {
                        pageNumber = self.pdfApp.viewer.getViewerPageNumber(pageNumber);
                        if (pageNumber > self.pdfApp.pageCount) {
                            pageNumber = self.pdfApp.pageCount;
                        }
                        provider_utils.log("Loading for:", destRef, " at page ", pageNumber);
                        if (self.pdfApp.requestDestRefKey === destRef.num + ' ' + destRef.gen + ' R') {
                            self.pdfApp.gotoPage(pageNumber);
                            if (self.pdfHistory) {
                                // Update the browsing history.
                                self.pdfHistory.push({
                                    dest: dest,
                                    hash: destString,
                                    page: pageNumber
                                });
                            }
                        } else {
                            provider_utils.log("Expired Request for ", pageNumber, " with ", destRef);
                        }
                    } else {
                        self.pdfApp.container.addClass('df-fetch-pdf');
                        self.pdfDocument.getPageIndex(destRef).then(function(pageIndex) {
                            var pageNum = pageIndex + 1;
                            var cacheKey = destRef.num + ' ' + destRef.gen + ' R';
                            self._pagesRefCache[cacheKey] = pageNum;
                            goToDestination(destRef);
                        });
                    }
                };
                var destinationPromise;
                if (typeof dest === 'string') {
                    destString = dest;
                    destinationPromise = this.pdfDocument.getDestination(dest);
                } else {
                    destinationPromise = Promise.resolve(dest);
                }
                destinationPromise.then(function(destination) {
                    provider_utils.log("Started:", destination);
                    dest = destination;
                    if (!provider_instanceof(destination, Array)) {
                        return; // invalid destination
                    }
                    self.pdfApp.requestDestRefKey = destination[0].num + ' ' + destination[0].gen + ' R';
                    goToDestination(destination[0]);
                });
            }
        },
        {
            /**
   * @param dest - The PDF destination object.
   */ key: "customNavigateTo",
            value: function customNavigateTo(dest) {
                if (dest === '' || dest == null || dest === 'null') return;
                var pageNumber = null;
                if (!isNaN(Math.floor(dest))) {
                    pageNumber = dest;
                } else if (typeof dest === 'string') {
                    pageNumber = parseInt(dest.replace("#", ""), 10);
                    if (isNaN(pageNumber)) {
                        window.open(dest, this.pdfApp.options.linkTarget === defaults_DEARVIEWER.LINK_TARGET.SELF ? "_self" : "_blank");
                        return;
                    }
                }
                if (pageNumber != null) this.pdfApp.gotoPage(pageNumber);
            }
        },
        {
            /**
   * @param dest - The PDF destination object.
   * @returns {string} The hyperlink to the PDF object.
   */ key: "getDestinationHash",
            value: function getDestinationHash(dest) {
                if (typeof dest === 'string') {
                    return this.getAnchorUrl('#' + escape(dest));
                }
                if (provider_instanceof(dest, Array)) {
                    var destRef = dest[0]; // see navigateTo method for dest format
                    var pageNumber = provider_instanceof(destRef, Object) ? this._pagesRefCache[destRef.num + ' ' + destRef.gen + ' R'] : destRef + 1;
                    if (pageNumber) {
                        var pdfOpenParams = this.getAnchorUrl('#page=' + pageNumber);
                        var destKind = dest[1];
                        if ((typeof destKind === "undefined" ? "undefined" : provider_type_of(destKind)) === 'object' && 'name' in destKind && destKind.name === 'XYZ') {
                            var scale = dest[4] || this.pdfApp.pageScaleValue;
                            var scaleNumber = parseFloat(scale);
                            if (scaleNumber) {
                                scale = scaleNumber * 100;
                            }
                            pdfOpenParams += '&zoom=' + scale;
                            if (dest[2] || dest[3]) {
                                pdfOpenParams += ',' + (dest[2] || 0) + ',' + (dest[3] || 0);
                            }
                        }
                        return pdfOpenParams;
                    }
                }
                return this.getAnchorUrl('');
            }
        },
        {
            /**
   * @param dest - The PDF destination object.
   * @returns {string} The hyperlink to the PDF object.
   */ key: "getCustomDestinationHash",
            value: function getCustomDestinationHash(dest) {
                //if (typeof dest === 'string') {
                return '#' + escape(dest);
            //}
            //return this.getAnchorUrl('');
            }
        },
        {
            /**
   * Prefix the full url on anchor links to make sure that links are resolved
   * relative to the current URL instead of the one defined in <base href>.
   * @param {String} anchor The anchor hash, including the #.
   * @returns {string} The hyperlink to the PDF object.
   */ key: "getAnchorUrl",
            value: function getAnchorUrl(anchor) {
                return (this.baseUrl || '') + anchor;
            }
        },
        {
            /**
   * @param {string} action
   */ key: "executeNamedAction",
            value: function executeNamedAction(action) {
                // See PDF reference, table 8.45 - Named action
                switch(action){
                    case 'GoBack':
                        if (this.pdfHistory) {
                            this.pdfHistory.back();
                        }
                        break;
                    case 'GoForward':
                        if (this.pdfHistory) {
                            this.pdfHistory.forward();
                        }
                        break;
                    case 'NextPage':
                        this.page++;
                        break;
                    case 'PrevPage':
                        this.page--;
                        break;
                    case 'LastPage':
                        this.page = this.pagesCount;
                        break;
                    case 'FirstPage':
                        this.page = 1;
                        break;
                    default:
                        break; // No action according to spec
                }
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('namedaction', true, true, {
                    action: action
                });
                this.pdfApp.container.dispatchEvent(event);
            }
        },
        {
            // noinspection JSUnusedGlobalSymbols
            /**
   * @param {number} pageNum - page number.
   * @param {Object} pageRef - reference to the page.
   */ key: "cachePageRef",
            value: function cachePageRef(pageNum, pageRef) {
                var refStr = pageRef.num + ' ' + pageRef.gen + ' R';
                this._pagesRefCache[refStr] = pageNum;
            }
        }
    ]);
    return PDFLinkService;
}();
var DocumentProvider = /*#__PURE__*/ function() {
    "use strict";
    function DocumentProvider(props, context) {
        provider_class_call_check(this, DocumentProvider);
        this.props = props;
        this.app = context;
        this.textureCache = [];
        this.pageCount = 0;
        this.numPages = 0;
        this.outline = [];
        this.viewPorts = [];
        this.requestedPages = '';
        this.requestIndex = 0;
        this.pagesToClean = [];
        this.defaultPage = undefined;
        this.pageSize = this.app.options.pageSize;
        this._page1Pass = false;
        this._page2Pass = false;
        this.pageLabels = void 0;
        this.textSearchLength = 0;
        this.textSearch = "";
        this.textContentSearch = [];
        this.textContentJoinedSearch = [];
        this.textOffsetSearch = [];
        this.textContent = [];
        this.textContentJoined = [];
        this.textOffset = [];
        this.autoLinkItemsCache = [];
        this.autoLinkHitsCache = [];
        this.searchHitItemsCache = [];
        this.searchHits = [];
        this.PDFLinkItemsCache = [];
        this.canPrint = true;
        this.textPostion = [];
    }
    provider_create_class(DocumentProvider, [
        {
            key: "finalize",
            value: function finalize() {}
        },
        {
            key: "dispose",
            value: function dispose() {}
        },
        {
            key: "softDispose",
            value: function softDispose() {}
        },
        {
            key: "setCache",
            value: function setCache(index, src, cacheIndexSize) {
                var provider = this;
                var cacheIndex = cacheIndexSize;
                if (cacheIndexSize) {
                    if (provider.textureCache[cacheIndex] === undefined) provider.textureCache[cacheIndex] = [];
                    provider.textureCache[cacheIndex][index] = src;
                }
            }
        },
        {
            key: "getCache",
            value: function getCache(index, textureIndex) {
                var provider = this;
                return provider.textureCache[textureIndex] === undefined ? undefined : provider.textureCache[textureIndex][index];
            }
        },
        {
            key: "_isValidPage",
            value: function _isValidPage(pageNumber) {
                return pageNumber > 0 && pageNumber <= this.pageCount;
            }
        },
        {
            key: "getLabelforPage",
            value: function getLabelforPage(pageNumber) {
                if (this.pageLabels && this.pageLabels[pageNumber - 1] !== void 0) return this.pageLabels[pageNumber - 1];
                return pageNumber;
            }
        },
        {
            key: "getThumbLabel",
            value: function getThumbLabel(pageNumber) {
                var label = this.getLabelforPage(pageNumber);
                if (label !== pageNumber) {
                    return label + " (" + pageNumber + ")";
                }
                return pageNumber;
            }
        },
        {
            key: "getPageNumberForLabel",
            value: function getPageNumberForLabel(label) {
                if (!this.pageLabels) {
                    return label;
                }
                var i = this.pageLabels.indexOf(label);
                if (i < 0) {
                    return null;
                }
                return i + 1;
            }
        },
        {
            key: "processPage",
            value: function processPage(param) {}
        },
        {
            key: "cleanUpPages",
            value: function cleanUpPages() {}
        },
        {
            key: "checkRequestQueue",
            value: function checkRequestQueue() {}
        },
        {
            key: "processAnnotations",
            value: function processAnnotations() {}
        },
        {
            key: "processTextContent",
            value: function processTextContent() {}
        },
        {
            key: "loadDocument",
            value: function loadDocument() {}
        },
        {
            key: "pagesLoaded",
            value: function pagesLoaded() {
                var provider = this;
                if (provider._page1Pass && provider._page2Pass) {
                    provider.app.viewer.checkDocumentPageSizes();
                    provider.finalize();
                }
            }
        },
        {
            key: "_documentLoaded",
            value: function _documentLoaded() {
                this.finalizeOutLine();
                //checks so that new providers fulfill all the required steps
                if (this.app && this.app.dimensions && this.app.dimensions.pageFit === undefined) provider_utils.log("Provider needs to initialize page properties for the app");
                this.app._documentLoaded();
            }
        },
        {
            key: "finalizeOutLine",
            value: function finalizeOutLine() {
                if (this.app === null || this.app.options === null) return;
                var outline = this.app.options.outline, provider = this;
                if (outline) {
                    for(var count = 0; count < outline.length; count++){
                        outline[count].custom = true;
                        provider.outline.push(outline[count]);
                    }
                }
            }
        },
        {
            key: "search",
            value: function search() {}
        }
    ]);
    return DocumentProvider;
}();
var PDFDocumentProvider = /*#__PURE__*/ function(DocumentProvider) {
    "use strict";
    provider_inherits(PDFDocumentProvider, DocumentProvider);
    var _super = provider_create_super(PDFDocumentProvider);
    function PDFDocumentProvider(props, context) {
        provider_class_call_check(this, PDFDocumentProvider);
        var _this;
        var getPDFScript = function getPDFScript(callback) {
            if (typeof pdfjsLib === "undefined") {
                app.updateInfo(app.options.text.loading + " PDF Service ...");
                provider_utils.getScript(app.options.pdfjsSrc + provider.cacheBustParameters, function() {
                    if (typeof define === 'function' && __webpack_require__.amdO && window.requirejs && window.require && window.require.config) {
                        app.updateInfo(app.options.text.loading + " PDF Service (require) ...");
                        window.require.config({
                            paths: {
                                'pdfjs-dist/build/pdf.worker': app.options.pdfjsWorkerSrc.replace(".js", "")
                            }
                        });
                        window.require([
                            'pdfjs-dist/build/pdf'
                        ], function(pdfjsLib1) {
                            window.pdfjsLib = pdfjsLib1;
                            getWorkerScript(callback);
                        });
                    } else {
                        getWorkerScript(callback);
                    }
                }, function() {
                    app.updateInfo("Unable to load PDF service..");
                    provider.dispose();
                }, app.options.pdfjsSrc.indexOf("pdfjs-4") > 1);
            } else {
                if (typeof callback === "function") callback();
            }
        };
        var getWorkerScript = function getWorkerScript(callback) {
            app.updateInfo(app.options.text.loading + " PDF Worker ...");
            var tmp = document.createElement('a');
            tmp.href = app.options.pdfjsWorkerSrc + provider.cacheBustParameters;
            if (tmp.hostname !== window.location.hostname && defaults_DEARVIEWER['loadCorsPdfjsWorker'] === true) {
                app.updateInfo(app.options.text.loading + " PDF Worker CORS ...");
                jQuery.ajax({
                    url: app.options.pdfjsWorkerSrc + provider.cacheBustParameters,
                    cache: true,
                    success: function success(data) {
                        app.options.pdfjsWorkerSrc = provider_utils.createObjectURL(data, "text/javascript");
                        if (typeof callback === "function") callback();
                    }
                });
            } else {
                if (typeof callback === "function") callback();
            }
        };
        _this = _super.call(this, props, context);
        var app = _this.app, provider = provider_assert_this_initialized(_this);
        provider.pdfDocument = undefined;
        provider._page2Ratio = undefined;
        provider.cacheBustParameters = "?ver=" + defaults_DEARVIEWER.version + "&pdfver=" + app.options.pdfVersion;
        getPDFScript(function() {
            pdfjsLib.GlobalWorkerOptions.workerSrc = app.options.pdfjsWorkerSrc + provider.cacheBustParameters;
            pdfjsLib.canvasWillReadFrequently = defaults_DEARVIEWER.defaults.canvasWillReadFrequently;
            provider.loadDocument();
        });
        return _this;
    }
    provider_create_class(PDFDocumentProvider, [
        {
            key: "dispose",
            value: function dispose() {
                if (this.pdfDocument) this.pdfDocument.destroy();
                this.linkService = provider_utils.disposeObject(this.linkService);
                if (this.pdfLoadProgress) this.pdfLoadProgress.destroy();
                this.pdfLoadProgress = null;
                this.pdfDocument = null;
            }
        },
        {
            key: "loadDocument",
            value: function loadDocument() {
                var app = this.app, options = this.app.options, provider = this;
                var parameters = options.pdfParameters || {};
                parameters.url = provider_utils.httpsCorrection(parameters.url || options.source);
                parameters.rangeChunkSize = options.rangeChunkSize;
                parameters.cMapPacked = true;
                parameters.disableAutoFetch = options.disableAutoFetch;
                parameters.disableStream = options.disableStream;
                parameters.disableRange = options.disableRange === true;
                parameters.disableFontFace = options.disableFontFace;
                parameters.isEvalSupported = false;
                parameters.cMapUrl = options.cMapUrl;
                parameters.imagesLocation = options.imagesLocation;
                parameters.imageResourcesPath = options.imageResourcesPath;
                //region Loading Document
                if (!parameters.url && !parameters.data && !parameters.range) {
                    //Display No PDF file found error
                    app.updateInfo("ERROR : No PDF File provided! ", "df-error");
                    return;
                }
                // app.updateInfo(app.options.text.loading + " PDF ...");
                var pdfLoadProcess = provider.pdfLoadProgress = pdfjsLib.getDocument(parameters);
                pdfLoadProcess._worker.promise.then(function(a) {
                    app.updateInfo(app.options.text.loading + " PDF ...");
                });
                pdfLoadProcess.onPassword = function(updatePassword, reason) {
                    switch(reason){
                        case pdfjsLib.PasswordResponses.NEED_PASSWORD:
                            var password = prompt("Enter the password to open the PDF file.");
                            if (password === null) {
                                throw new Error("No password givsen.");
                            }
                            updatePassword(password);
                            break;
                        case pdfjsLib.PasswordResponses.INCORRECT_PASSWORD:
                            var password = prompt("Invalid password. Please try again.");
                            if (!password) {
                                throw new Error("No password givaen.");
                            }
                            updatePassword(password);
                            break;
                    }
                };
                pdfLoadProcess.promise.then(/**
       * @constructs pdfLoaded
       * @param {PDFDocument} pdf
       */ function pdfLoaded(pdf) {
                    provider.pdfDocument = pdf;
                    pdf.getPage(1).then(function(page) {
                        //set defaultPage details
                        provider.defaultPage = page;
                        var _defaultViewPort = provider.defaultPage.viewPort = page.getViewport({
                            scale: 1,
                            rotation: page._pageInfo.rotate + app.options.pageRotation
                        });
                        var _defaultPageRatio = provider.defaultPage.pageRatio = _defaultViewPort.width / _defaultViewPort.height;
                        var _isDefaultPageWide = _defaultPageRatio > 1;
                        provider.viewPorts[1] = _defaultViewPort;
                        app.dimensions.defaultPage = {
                            ratio: _defaultPageRatio,
                            viewPort: _defaultViewPort,
                            width: _defaultViewPort.width,
                            height: _defaultViewPort.height
                        };
                        var _options_maxTextureSize;
                        app.dimensions.maxTextureHeight = ((_options_maxTextureSize = options.maxTextureSize) !== null && _options_maxTextureSize !== void 0 ? _options_maxTextureSize : 3200) / (!_isDefaultPageWide ? 1 : _defaultPageRatio);
                        app.dimensions.maxTextureWidth = app.dimensions.maxTextureHeight * _defaultPageRatio;
                        app.dimensions.autoHeightRatio = 1 / _defaultPageRatio;
                        provider.pageCount = pdf.numPages;
                        provider.numPages = pdf.numPages;
                        provider._page1Pass = true;
                        provider.pagesLoaded();
                    });
                    //check if internal pages are of double sizes.
                    if (pdf.numPages > 1 && app.checkSecondPage === true) {
                        /**
           * @constructs checkInternalPages
           * @param {PDFPageProxy} page
           */ pdf.getPage(2).then(function checkInternalPages(page) {
                            var _page2ViewPort = page.getViewport({
                                scale: 1,
                                rotation: page._pageInfo.rotate + app.options.pageRotation
                            });
                            provider._page2Ratio = _page2ViewPort.width / _page2ViewPort.height;
                            provider.viewPorts[2] = _page2ViewPort;
                            provider._page2Pass = true;
                            provider.pagesLoaded();
                        });
                    } else {
                        provider._page2Pass = true;
                        provider.pagesLoaded();
                    }
                }).catch(function(error) {
                    if (app !== null && app.options != null) {
                        var _app_options;
                        //Find errors condition
                        var cors = "", _a = document.createElement('a');
                        _a.href = app.options.source;
                        if (_a.hostname !== window.location.hostname && _a.href.indexOf("file://") === -1 && !provider_utils.isChromeExtension() && _a.href.indexOf("blob:") === -1) cors = "<strong>CROSS ORIGIN!! </strong>";
                        var fileName = ((_app_options = app.options) === null || _app_options === void 0 ? void 0 : _app_options.fileName) || _a.href;
                        //Display error reason
                        app.updateInfo(cors + "<strong>Error: Cannot access file!  </strong>" + fileName + "<br><br>" + error.message, "df-error");
                        console.log(error);
                        app.container.removeClass('df-loading').addClass("df-error");
                        provider.dispose();
                    }
                });
                pdfLoadProcess.getTotalLength = function() {
                    return provider.pdfLoadProgress._transport._networkStream._fullRequestReader.contentLength;
                };
                pdfLoadProcess.onProgress = function getDocumentProgress(progressData) {
                    if (app !== null) {
                        var percentage = 100 * progressData.loaded / pdfLoadProcess.getTotalLength();
                        if (isNaN(percentage)) {
                            if (progressData && progressData.loaded) {
                                // skip loading value if the differnces is less than 250kb,
                                // not required in percentage since percentage only updates in partial load chunk completion
                                if (pdfLoadProcess.lastLoaded === void 0 || pdfLoadProcess.lastLoaded + 250000 < progressData.loaded) {
                                    pdfLoadProcess.lastLoaded = progressData.loaded;
                                    app.updateInfo(app.options.text.loading + " PDF " + (Math.ceil(progressData.loaded / 10000) / 100).toFixed(2).toString() + "MB ...");
                                }
                            } else {
                                app.updateInfo(app.options.text.loading + " PDF ...");
                            }
                        } else {
                            app.updateInfo(app.options.text.loading + " PDF " + Math.ceil(Math.min(100, percentage)).toString().split(".")[0] + "% ...");
                        }
                    }
                };
            //endregion
            }
        },
        {
            key: "pdfFetchStarted",
            value: function pdfFetchStarted() {
                this.pdfFetchStatusCount = 0;
                this.app.container.addClass('df-fetch-pdf');
                this.pdfFetchStatus = defaults_DEARVIEWER.REQUEST_STATUS.COUNT;
            }
        },
        {
            key: "checkRequestQueue",
            value: function checkRequestQueue() {
                return;
                var REQUEST_STATUS = defaults_DEARVIEWER.REQUEST_STATUS;
                if (this.pdfFetchStatus === REQUEST_STATUS.ON) {
                    this.app.container.removeClass('df-fetch-pdf');
                    this.pdfFetchStatus = REQUEST_STATUS.OFF;
                } else if (this.pdfFetchStatus === REQUEST_STATUS.COUNT) {
                    this.pdfFetchStatusCount++;
                    if (this.pdfFetchStatusCount > 30) {
                        this.pdfFetchStatusCount = 0;
                        this.pdfFetchStatus = REQUEST_STATUS.ON;
                    }
                }
            }
        },
        {
            key: "finalize",
            value: function finalize() {
                var app = this.app, provider = this;
                if (app === null || app.options === null) return;
                provider.linkService = new PDFLinkService();
                provider.linkService.setDocument(provider.pdfDocument, null);
                provider.linkService.setViewer(app);
                provider.pdfDocument.getOutline().then(function(pdfOutline) {
                    if (app.options.overwritePDFOutline === true) {
                        pdfOutline = [];
                    }
                    pdfOutline = pdfOutline || [];
                    provider.outline = pdfOutline;
                }).finally(function() {
                    provider._getLabels();
                });
            }
        },
        {
            key: "_getLabels",
            value: function _getLabels() {
                var app = this.app, provider = this;
                provider.pdfDocument.getPageLabels().then(function(pageLabels) {
                    if (!pageLabels || app.options.disablePageLabels === true) {
                        return;
                    }
                    var numLabels = pageLabels.length;
                    // Ignore page labels that correspond to standard page numbering,
                    // or page labels that are all empty.
                    var standardLabels = 0, emptyLabels = 0;
                    for(var i = 0; i < numLabels; i++){
                        var label = pageLabels[i];
                        if (label === (i + 1).toString()) {
                            standardLabels++;
                        } else if (label === "") {
                            emptyLabels++;
                        } else {
                            break;
                        }
                    }
                    if (standardLabels >= numLabels || emptyLabels >= numLabels) {
                        return;
                    }
                    provider.pageLabels = pageLabels;
                }).finally(function() {
                    provider._getPermissions();
                });
            }
        },
        {
            key: "_getPermissions",
            value: function _getPermissions() {
                var app = this.app, provider = this;
                provider.pdfDocument.getPermissions().then(function(permissions) {
                    if (permissions !== null && Array.isArray(permissions)) {
                        provider.canPrint = permissions.indexOf(pdfjsLib.PermissionFlag.PRINT) > -1;
                        if (provider.canPrint == false) {
                            console.log("PDF printing is disabled.");
                            app.options.showPrintControl = app.options.showPrintControl && provider.canPrint;
                        }
                    }
                }).finally(function() {
                    provider._documentLoaded();
                });
            }
        },
        {
            key: "processPage",
            value: function processPage(param) {
                var app = this.app, provider = this, pageNumber = param.pageNumber, startTime = performance.now();
                var dimen = app.viewer.getTextureSize(param);
                if (DEARFLIP.defaults.cachePDFTexture === true) {
                    if (this.getCache(pageNumber, dimen.height) !== undefined) {
                        app.applyTexture(this.getCache(pageNumber, dimen.height), param);
                        provider_utils.log("Texture loaded from cache for : " + pageNumber);
                        return;
                    }
                }
                //region determine page to render
                var pdfPageNumberToRender = app.viewer.getDocumentPageNumber(pageNumber);
                //endregion
                provider_utils.log("Requesting PDF Page:" + pdfPageNumberToRender);
                provider.pdfDocument.getPage(pdfPageNumberToRender).then(function(pdfPage) {
                    if (!provider.viewPorts[pageNumber]) {
                        param.isFreshPage = true;
                        provider.viewPorts[pageNumber] = pdfPage.getViewport({
                            scale: 1,
                            rotation: pdfPage._pageInfo.rotate + app.options.pageRotation
                        });
                    }
                    //region Render the Page
                    var renderContext = app.viewer.getRenderContext(pdfPage, param);
                    if (param.isFreshPage) {
                        var _app_viewer_getPageByNumber;
                        (_app_viewer_getPageByNumber = app.viewer.getPageByNumber(param.pageNumber)) === null || _app_viewer_getPageByNumber === void 0 ? void 0 : _app_viewer_getPageByNumber.changeTexture(param.pageNumber, renderContext.canvas.height);
                    }
                    provider_utils.log("Page " + pageNumber + " rendering - " + renderContext.canvas.width + "x" + renderContext.canvas.height);
                    param.trace = provider.requestIndex++;
                    provider.requestedPages += "," + param.trace + "[" + pdfPageNumberToRender + "|" + renderContext.canvas.height + "]";
                    pdfPage.cleanupAfterRender = false; //needs to disable the cleanup after render code in pdf.js
                    var pageRendering = pdfPage.render(renderContext);
                    pageRendering.promise.then(function() {
                        app.applyTexture(renderContext.canvas, param);
                        if (DEARFLIP.defaults.cachePDFTexture === true) {
                            provider.setCache(param.pageNumber, renderContext.canvas, dimen.height);
                        }
                        if (app.options.cleanupAfterRender === true) {
                            var checkString = "," + param.trace + "[" + pdfPageNumberToRender + "|" + renderContext.canvas.height + "]";
                            provider_utils.log("CleanUp Requesting for (" + pageNumber + ") actual " + pdfPageNumberToRender);
                            if (provider.requestedPages.indexOf(checkString) > -1) {
                                provider.requestedPages = provider.requestedPages.replace(checkString, "");
                                if (provider.requestedPages.indexOf("[" + pdfPageNumberToRender + "|") == -1) {
                                    provider_utils.log("CleanUp Passed for (" + pageNumber + ") actual " + pdfPageNumberToRender);
                                    provider.pagesToClean.push(pdfPage);
                                    if (provider.pagesToClean.length > 0) provider.cleanUpPages();
                                } else {
                                    provider_utils.log("CleanUp Cancelled waiting for (" + pageNumber + ") actual " + pdfPageNumberToRender + " : " + provider.requestedPages);
                                }
                            }
                        }
                        renderContext = null;
                        provider_utils.log("Rendered " + pageNumber + " in " + (performance.now() - startTime) + " milliseconds");
                    }).catch(function(error) {
                        console.log(error);
                    });
                //endregion
                }).catch(function(error) {
                    console.log(error);
                });
            }
        },
        {
            key: "cleanUpPages",
            value: function cleanUpPages() {
                while(this.pagesToClean.length > 0){
                    var page = this.pagesToClean.splice(-1)[0];
                    provider_utils.log("Cleanup Completed for PDF page: " + (page._pageIndex + 1));
                    page.cleanup();
                }
            }
        },
        {
            key: "clearSearch",
            value: function clearSearch() {
                var provider = this;
                provider.searchHits = [];
                provider.searchHitItemsCache = [];
                provider.totalHits = 0;
                provider.app.searchResults.html("");
                provider.app.container.removeClass("df-search-open");
                provider.textSearch = "";
                provider.app.container.find(".df-search-hits").remove();
            }
        },
        {
            key: "search",
            value: function search(text) {
                var provider = this;
                if (provider.textSearch === text) return;
                provider.clearSearch();
                if (text.length < 3 && text != "") {
                    provider.app.updateSearchInfo("Minimum 3 letters required.");
                    return;
                }
                provider.textSearch = text;
                provider.textSearchLength = text.length;
                provider.app.searchContainer.addClass("df-searching");
                provider.app.container.addClass('df-fetch-pdf');
                provider._search(text, 1);
            }
        },
        {
            key: "_search",
            value: function _search(text) {
                var pageNumber = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
                var provider = this;
                provider.app.updateSearchInfo("Searching Page: " + pageNumber);
                provider.searchPage(pageNumber).then(function(textContent) {
                    // console.log(textContent);
                    var searchString = textContent, pos = 0, myRegexp = new RegExp(text, 'gi'), result;
                    var hits = [];
                    while(result = myRegexp.exec(searchString)){
                        hits.push({
                            index: result.index,
                            length: provider.textSearchLength
                        });
                    }
                    provider.searchHits[pageNumber] = hits;
                    if (hits.length > 0) {
                        var searchPage = provider.app.viewer.searchPage(pageNumber);
                        if (searchPage.include === true) {
                            provider.totalHits += hits.length;
                            provider.app.searchResults.append('<div class="df-search-result ' + (provider.app.currentPageNumber === pageNumber ? 'df-active' : '') + '" data-df-page="' + pageNumber + '">' + '<span>Page ' + searchPage.label + '</span><span>' + hits.length + ' ' + (hits.length > 1 ? 'results' : 'result') + '</span></div>');
                        }
                    }
                    if (provider.app.viewer.isActivePage(pageNumber)) {
                        provider.processTextContent(pageNumber, provider.app.viewer.getTextElement(pageNumber, true));
                        provider.app.ui.update();
                    }
                    provider._search(text, pageNumber + 1);
                }).catch(function() {}).finally(function() {
                    if (provider.totalHits == 0) {
                        provider.app.updateSearchInfo("No results Found!");
                    } else {
                        provider.app.updateSearchInfo(provider.totalHits + " results found");
                    }
                    provider.app.searchContainer.removeClass("df-searching");
                    provider.app.container.removeClass('df-fetch-pdf');
                });
            }
        },
        {
            key: "prepareTextContent",
            value: function prepareTextContent(textContent, pageNumbertoSearch) {
                var rePrepare = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
                var provider = this;
                if (provider.textContentJoinedSearch[pageNumbertoSearch] == void 0 || rePrepare) {
                    var provider = this;
                    var item, p = 0, p_search = 0, len = 0;
                    provider.textContentSearch[pageNumbertoSearch] = [];
                    provider.textContent[pageNumbertoSearch] = [];
                    provider.textOffsetSearch[pageNumbertoSearch] = [];
                    provider.textOffset[pageNumbertoSearch] = [];
                    provider.textContentJoinedSearch[pageNumbertoSearch] = [];
                    provider.textContentJoined[pageNumbertoSearch] = [];
                    for(var item_count = 0; item_count < textContent.items.length; item_count++){
                        item = textContent.items[item_count];
                        provider.textContentSearch[pageNumbertoSearch].push(item.hasEOL === true ? item.str + " " : item.str);
                        provider.textContent[pageNumbertoSearch].push(item.str + " ");
                        len = (item.str.length || 0) + (item.hasEOL === true ? 1 : 0);
                        p_search += len;
                        provider.textOffsetSearch[pageNumbertoSearch].push({
                            length: len,
                            offset: p_search - len
                        });
                        len = (item.str.length || 0) + 1;
                        p += len;
                        provider.textOffset[pageNumbertoSearch].push({
                            length: len,
                            offset: p - len
                        });
                    }
                    provider.textContentJoinedSearch[pageNumbertoSearch] = provider.textContentSearch[pageNumbertoSearch].join("");
                    provider.textContentJoined[pageNumbertoSearch] = provider.textContent[pageNumbertoSearch].join("");
                }
            }
        },
        {
            key: "searchPage",
            value: function searchPage(pageNumber) {
                var provider = this;
                return new Promise(function(resolve, reject) {
                    if (!provider._isValidPage(pageNumber)) {
                        reject();
                    } else {
                        try {
                            var pageNumbertoSearch = provider.app.viewer.getDocumentPageNumber(pageNumber);
                            if (provider.textContentJoinedSearch[pageNumbertoSearch] == void 0) {
                                provider.pdfDocument.getPage(pageNumbertoSearch).then(function(page) {
                                    page.getTextContent().then(function(textContent) {
                                        provider.prepareTextContent(textContent, pageNumbertoSearch);
                                        resolve(provider.textContentJoinedSearch[pageNumbertoSearch]);
                                    });
                                });
                            } else {
                                resolve(provider.textContentJoinedSearch[pageNumbertoSearch]);
                            }
                        } catch (error) {
                            provider_utils.log(error);
                            reject(error);
                        }
                    }
                });
            }
        }
    ]);
    return PDFDocumentProvider;
}(DocumentProvider);
defaults_DEARVIEWER.providers['pdf'] = PDFDocumentProvider;


;// CONCATENATED MODULE: ./src/js/dearviewer/utils/image-provider.js
function image_provider_assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function image_provider_class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function image_provider_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function image_provider_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) image_provider_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) image_provider_defineProperties(Constructor, staticProps);
    return Constructor;
}
function image_provider_get_prototype_of(o) {
    image_provider_get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return image_provider_get_prototype_of(o);
}
function image_provider_inherits(subClass, superClass) {
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
    if (superClass) image_provider_set_prototype_of(subClass, superClass);
}
function image_provider_possible_constructor_return(self, call) {
    if (call && (image_provider_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return image_provider_assert_this_initialized(self);
}
function image_provider_set_prototype_of(o, p) {
    image_provider_set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return image_provider_set_prototype_of(o, p);
}
function image_provider_type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function image_provider_is_native_reflect_construct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function image_provider_create_super(Derived) {
    var hasNativeReflectConstruct = image_provider_is_native_reflect_construct();
    return function _createSuperInternal() {
        var Super = image_provider_get_prototype_of(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = image_provider_get_prototype_of(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return image_provider_possible_constructor_return(this, result);
    };
}


var image_provider_utils = defaults_DEARVIEWER.utils;
var ImagePage = /*#__PURE__*/ function() {
    "use strict";
    function ImagePage(props) {
        image_provider_class_call_check(this, ImagePage);
        this._viewPort = new Viewport(0, 0);
        this._pageInfo = {
            rotate: 0
        };
        this.src = props.src;
    }
    image_provider_create_class(ImagePage, [
        {
            key: "getViewport",
            value: function getViewport() {
                var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
                    scale: 1
                };
                return new Viewport(this._viewPort.height * params.scale, this._viewPort.width * params.scale, params.scale);
            }
        }
    ]);
    return ImagePage;
}();
var ImageDocument = /*#__PURE__*/ function() {
    "use strict";
    function ImageDocument(source) {
        image_provider_class_call_check(this, ImageDocument);
        this.source = [];
        this.pages = [];
        this.numPages = source.length;
        for(var _correct = 0; _correct < source.length; _correct++){
            this.source[_correct] = image_provider_utils.httpsCorrection(source[_correct].toString());
            this.pages.push(new ImagePage({
                src: this.source[_correct]
            }));
        }
    }
    image_provider_create_class(ImageDocument, [
        {
            key: "getPage",
            value: function getPage(pageNumber) {
                var provider = this;
                return new Promise(function(resolve, reject) {
                    try {
                        jQuery("<img/>").attr("src", provider.source[pageNumber - 1]).prop("crossOrigin", "Anonymous").on('load', function() {
                            jQuery(this).off();
                            var page = new ImagePage({
                                src: this.src
                            });
                            page._viewPort.height = this.height;
                            page._viewPort.width = this.width;
                            page._viewPort.scale = 1;
                            page.image = this;
                            resolve(page);
                        });
                    } catch (error) {
                        reject(error);
                    }
                });
            }
        }
    ]);
    return ImageDocument;
}();
var Viewport = /*#__PURE__*/ function() {
    "use strict";
    function Viewport(height, width) {
        var scale = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
        image_provider_class_call_check(this, Viewport);
        this.scale = scale;
        this.height = height;
        this.width = width;
        this.scale = scale;
        this.transform = [
            0,
            0,
            0,
            0,
            0,
            this.height
        ];
    }
    image_provider_create_class(Viewport, [
        {
            key: "clone",
            value: function clone() {
                return new Viewport(this.height, this.width, this.scale);
            }
        }
    ]);
    return Viewport;
}();
var ImageDocumentProvider = /*#__PURE__*/ function(DocumentProvider) {
    "use strict";
    image_provider_inherits(ImageDocumentProvider, DocumentProvider);
    var _super = image_provider_create_super(ImageDocumentProvider);
    function ImageDocumentProvider(options, context) {
        image_provider_class_call_check(this, ImageDocumentProvider);
        var _this;
        _this = _super.call(this, options, context);
        var app = _this.app, provider = image_provider_assert_this_initialized(_this);
        provider.document = new ImageDocument(app.options.source);
        provider.pageCount = provider.document.numPages;
        provider.numPages = provider.document.numPages;
        provider.loadDocument();
        return _this;
    }
    image_provider_create_class(ImageDocumentProvider, [
        {
            key: "dispose",
            value: function dispose() {}
        },
        {
            key: "loadDocument",
            value: function loadDocument() {
                var app = this.app, options = this.app.options, provider = this;
                provider.document.getPage(1).then(function(page) {
                    provider.defaultPage = page;
                    var _defaultViewPort = provider.defaultPage.viewPort = page._viewPort;
                    var _defaultPageRatio = provider.defaultPage.pageRatio = _defaultViewPort.width / _defaultViewPort.height;
                    var _isdefaultPageWide = _defaultPageRatio > 1;
                    provider.viewPorts[1] = _defaultViewPort;
                    app.dimensions.defaultPage = {
                        ratio: _defaultPageRatio,
                        viewPort: _defaultViewPort,
                        width: _defaultViewPort.width,
                        height: _defaultViewPort.height
                    };
                    var _options_maxTextureSize;
                    app.dimensions.maxTextureHeight = ((_options_maxTextureSize = options.maxTextureSize) !== null && _options_maxTextureSize !== void 0 ? _options_maxTextureSize : 3200) / (!_isdefaultPageWide ? 1 : _defaultPageRatio);
                    app.dimensions.maxTextureWidth = app.dimensions.maxTextureHeight * _defaultPageRatio;
                    app.dimensions.autoHeightRatio = 1 / _defaultPageRatio;
                    provider._page1Pass = true;
                    provider.pagesLoaded();
                });
                //check if internal pages are of double sizes.
                if (provider.pageCount > 1 && app.checkSecondPage === true) {
                    provider.document.getPage(2).then(function(page) {
                        var _page2ViewPort = page._viewPort;
                        provider._page2Ratio = _page2ViewPort.width / _page2ViewPort.height;
                        provider.viewPorts[2] = _page2ViewPort;
                        provider._page2Pass = true;
                        provider.pagesLoaded();
                    });
                } else {
                    provider._page2Pass = true;
                    provider.pagesLoaded();
                }
            }
        },
        {
            key: "finalize",
            value: function finalize() {
                var app = this.app, provider = this;
                if (app === null || app.options === null) return;
                provider.linkService = new PDFLinkService();
                // provider.linkService.setDocument(provider.pdfDocument, null);
                provider.linkService.setViewer(app);
                provider._documentLoaded();
            }
        },
        {
            key: "processPage",
            value: function processPage(param) {
                var app = this.app, provider = this, pageNumber = param.pageNumber, startTime = performance.now();
                //region determine page to render
                var pdfPageNumberToRender = app.viewer.getDocumentPageNumber(pageNumber);
                image_provider_utils.log("Requesting PDF Page:" + pdfPageNumberToRender);
                provider.document.getPage(pdfPageNumberToRender).then(function(page) {
                    if (!provider.viewPorts[pageNumber]) {
                        param.isFreshPage = true;
                        provider.viewPorts[pageNumber] = page._viewPort;
                    }
                    var renderContext = app.viewer.getRenderContext(page, param);
                    if (param.isFreshPage) {
                        var _app_viewer_getPageByNumber;
                        (_app_viewer_getPageByNumber = app.viewer.getPageByNumber(param.pageNumber)) === null || _app_viewer_getPageByNumber === void 0 ? void 0 : _app_viewer_getPageByNumber.changeTexture(param.pageNumber, renderContext.canvas.height);
                    }
                    param.preferCanvas = true;
                    if (param.preferCanvas === true) {
                        var context = renderContext.canvas.getContext("2d");
                        var _renderContext_viewport_widthFix;
                        context.drawImage(page.image, renderContext.viewport.transform[4], 0, renderContext.canvas.width * ((_renderContext_viewport_widthFix = renderContext.viewport.widthFix) !== null && _renderContext_viewport_widthFix !== void 0 ? _renderContext_viewport_widthFix : 1), renderContext.canvas.height);
                        //todo cleanup page.image , don't keep in memory
                        app.applyTexture(renderContext.canvas, param);
                    } else {
                        app.applyTexture({
                            src: page.src,
                            height: renderContext.canvas.height,
                            width: renderContext.canvas.width
                        }, param);
                    }
                    image_provider_utils.log("Rendered " + pageNumber + " in " + (performance.now() - startTime) + " milliseconds");
                });
            }
        }
    ]);
    return ImageDocumentProvider;
}(DocumentProvider);
defaults_DEARVIEWER.providers['image'] = ImageDocumentProvider;


// EXTERNAL MODULE: ./src/js/dearviewer/utils/tween.js
var tween = __webpack_require__(101);
;// CONCATENATED MODULE: ./src/js/dearviewer/utils/controls.js
/* globals jQuery */ function controls_class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function controls_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function controls_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) controls_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) controls_defineProperties(Constructor, staticProps);
    return Constructor;
}
function controls_type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}

var controls_DV = (/* unused pure expression or super */ null && (DEARVIEWER));
var controls_jQuery = defaults_DEARVIEWER.jQuery;
var controls_utils = defaults_DEARVIEWER.utils, REQUEST_STATUS = defaults_DEARVIEWER.REQUEST_STATUS;
var UI = /*#__PURE__*/ function() {
    "use strict";
    function UI(options, appContext) {
        controls_class_call_check(this, UI);
        this.options = options;
        this.app = appContext;
        this.parentElement = this.app.container;
        this.element = controls_jQuery('<div>', {
            class: "df-ui"
        });
        this.leftElement = controls_jQuery('<div>', {
            class: "df-ui-left"
        }).appendTo(this.element);
        this.centerElement = controls_jQuery('<div>', {
            class: "df-ui-center"
        }).appendTo(this.element);
        this.rightElement = controls_jQuery('<div>', {
            class: "df-ui-right"
        }).appendTo(this.element);
        this.parentElement.append(this.element);
        this.events = {};
        this.controls = {};
    }
    controls_create_class(UI, [
        {
            key: "init",
            value: function init() {
                var ui = this, div = '<div>', app = this.app, controls = this.controls;
                var text = app.options.text, icons = app.options.icons;
                ui.createLogo();
                this.openRight = controls.openRight = controls_jQuery(div, {
                    class: "df-ui-nav df-ui-next",
                    title: app.isRTL ? text.previousPage : text.nextPage,
                    html: '<div class="df-ui-btn ' + icons['next'] + '"></div>'
                }).on("click", function() {
                    app.openRight();
                });
                this.openLeft = controls.openLeft = controls_jQuery(div, {
                    class: "df-ui-nav df-ui-prev",
                    title: app.isRTL ? text.nextPage : text.previousPage,
                    html: '<div class="df-ui-btn ' + icons['prev'] + '"></div>'
                }).on("click", function() {
                    app.openLeft();
                });
                if (app.options.autoPlay == true) {
                    this.play = controls.play = controls_utils.createBtn('play', icons['play'], text.play).on("click", function() {
                        var el = controls_jQuery(this);
                        app.setAutoPlay(!el.hasClass(app.options.icons['pause']));
                    });
                    app.setAutoPlay(app.options.autoPlayStart);
                }
                this.pageNumber = controls.pageNumber = controls_utils.createBtn('page').on("change", function() {
                    app.gotoPageLabel(controls.pageInput.val());
                }).on("keyup", function(event) {
                    if (event.keyCode === 13) {
                        app.gotoPageLabel(controls.pageInput.val());
                    }
                });
                var rnd_id = "df_book_page_number_" + Math.ceil(performance.now() / 10);
                this.pageInput = controls.pageInput = controls_jQuery('<input id="' + rnd_id + '" type="text"/>').appendTo(controls.pageNumber);
                this.pageLabel = controls.pageLabel = controls_jQuery('<label for="' + rnd_id + '"></label>').appendTo(controls.pageNumber);
                this.thumbnail = controls.thumbnail = controls_utils.createBtn('thumbnail', icons['thumbnail'], text.toggleThumbnails);
                controls.thumbnail.on("click", function() {
                    var el = controls_jQuery(this);
                    if (app.thumblist == null) {
                        app.initThumbs();
                    }
                    var thumbContainer = app.thumbContainer;
                    thumbContainer.toggleClass("df-sidemenu-visible");
                    el.toggleClass('df-active');
                    if (el.hasClass("df-active")) {
                        el.siblings(".df-active").trigger("click");
                        app.thumbRequestStatus = REQUEST_STATUS.ON;
                    }
                    ui.update();
                    if (app.options.sideMenuOverlay === false) app.resizeRequestStart();
                }).addClass("df-sidemenu-trigger");
                if (app.hasOutline()) {
                    this.outline = controls.outline = controls_utils.createBtn('outline', icons['outline'], text.toggleOutline);
                    controls.outline.on("click", function() {
                        var el = controls_jQuery(this);
                        if (app.outlineViewer == null) {
                            app.initOutline();
                        }
                        if (app.outlineContainer) {
                            var outlineContainer = app.outlineContainer;
                            el.toggleClass('df-active');
                            outlineContainer.toggleClass("df-sidemenu-visible");
                            if (el.hasClass("df-active")) {
                                el.siblings(".df-active").trigger("click");
                            }
                            ui.update();
                            if (app.options.sideMenuOverlay === false) app.resizeRequestStart();
                        }
                    }).addClass("df-sidemenu-trigger");
                }
                if (app.options.showSearchControl === true && controls_utils.isMobile !== true && typeof app.options.source === 'string') {
                    controls.search = controls_utils.createBtn('search', icons['search'], text.search);
                    controls.search.on("click", function() {
                        var el = controls_jQuery(this);
                        if (app.searchContainer == null) {
                            app.initSearch();
                        }
                        if (app.searchContainer) {
                            var searchContainer = app.searchContainer;
                            el.toggleClass('df-active');
                            searchContainer.toggleClass("df-sidemenu-visible");
                            if (el.hasClass("df-active")) {
                                el.siblings(".df-active").trigger("click");
                                app.searchBox.focus();
                            }
                            ui.update();
                            if (app.options.sideMenuOverlay === false) app.resizeRequestStart();
                        }
                    }).addClass("df-sidemenu-trigger");
                }
                var controlsContainer = ui.element;
                this.zoomIn = controls.zoomIn = controls_utils.createBtn('zoomin', icons['zoomin'], text.zoomIn).on("click", function() {
                    app.zoom(1);
                    ui.update();
                });
                this.zoomOut = controls.zoomOut = controls_utils.createBtn('zoomout', icons['zoomout'], text.zoomOut).on("click", function() {
                    app.zoom(-1);
                    ui.update();
                });
                this.resetZoom = controls.resetZoom = controls_utils.createBtn('resetzoom', icons['resetzoom'], text.resetZoom).on("click", function() {
                    app.resetZoom(-1);
                    ui.update();
                });
                /*PAGEMODE/PAGEFIT*/ if (app.viewer.isFlipBook) {
                    if (app.pageCount > 2) {
                        var isSingle = app.viewer.pageMode === defaults_DEARVIEWER.FLIPBOOK_PAGE_MODE.SINGLE;
                        this.pageMode = controls.pageMode = controls_utils.createBtn('pagemode', icons[isSingle ? 'doublepage' : 'singlepage'], isSingle ? text.doublePageMode : text.singlePageMode).on("click", function() {
                            var el = controls_jQuery(this);
                            app.viewer.setPageMode({
                                isSingle: !el.hasClass(icons['doublepage'])
                            });
                            app.viewer.pageModeChangedManually = true;
                        });
                    }
                } else {
                    this.pageFit = controls.pageFit = controls_utils.createBtn('pagefit', icons['pagefit'], text.pageFit).on("click", function() {
                        var pageFit = controls.pageFit;
                        var isPageFit = !pageFit.hasClass(icons['widthfit']);
                        if (isPageFit === true) {
                            pageFit.addClass(icons['widthfit']);
                            pageFit.html("<span>" + text.widthFit + "</span>");
                            pageFit.attr("title", text.widthFit);
                        } else {
                            pageFit.removeClass(icons['widthfit']);
                            pageFit.html("<span>" + text.pageFit + "</span>");
                            pageFit.attr("title", text.pageFit);
                        }
                    // jQuery(this).toggleClass(buttonClass + " " + uiClass + "-widthfit ");
                    });
                }
                ui.shareBox = new DV_Share(app.container, app.options);
                this.share = controls.share = controls_utils.createBtn('share', icons['share'], text.share).on("click", function() {
                    if (ui.shareBox.isOpen === true) ui.shareBox.close();
                    else {
                        ui.shareBox.update(app.getURLHash());
                        ui.shareBox.show();
                    }
                });
                //More button
                this.more = controls.more = controls_utils.createBtn('more', icons['more']).on("click", function(event) {
                    if (ui.moreContainerOpen !== true) {
                        controls_jQuery(this).addClass("df-active");
                        ui.moreContainerOpen = true;
                        event.stopPropagation();
                    }
                });
                this.startPage = controls.startPage = controls_utils.createBtn('start', icons['start'], text.gotoFirstPage).on("click", function() {
                    app.start();
                });
                this.endPage = controls.endPage = controls_utils.createBtn('end', icons['end'], text.gotoLastPage).on("click", function() {
                    app.end();
                });
                if (app.options.showPrintControl === true && controls_utils.isMobile !== true && typeof app.options.source === 'string') {
                    this.print = controls.print = controls_utils.createBtn('print', icons['print'], text.print).on("click", function() {
                        defaults_DEARVIEWER.printHandler = defaults_DEARVIEWER.printHandler || new PrintHandler();
                        defaults_DEARVIEWER.printHandler.printPDF(app.options.source);
                    });
                }
                if (app.options.showDownloadControl === true && typeof app.options.source === 'string') {
                    var downloadClass = "df-ui-btn df-ui" + "-download " + icons['download'];
                    this.download = controls.download = controls_jQuery('<a download target="_blank" class="' + downloadClass + '"><span>' + text.downloadPDFFile + '</span></a>');
                    controls.download.attr("href", controls_utils.httpsCorrection(app.options.source)).attr("title", text.downloadPDFFile);
                //moreContainer.append(download);
                }
                //endregion
                //region MoreContainer
                ui.moreContainer = controls_jQuery(div, {
                    class: "df-more-container"
                });
                controls.more.append(ui.moreContainer);
                //endregion
                if (!(app.options.isLightBox === true && app.fullscreenSupported !== true)) {
                    this.fullScreen = controls.fullScreen = controls_utils.createBtn('fullscreen', icons['fullscreen'], text.toggleFullscreen).on("click", app.switchFullscreen.bind(app));
                }
                app.viewer.initCustomControls();
                /**
     * Controls position and placement is determined by options.moreControls and options.hideControls
     */ var allControls = app.options.allControls.replace(/ /g, '').split(','), moreControls = ',' + app.options.moreControls.replace(/ /g, '') + ',', hideControls = ',' + app.options.hideControls.replace(/ /g, '') + ',', leftControls = ',' + app.options.leftControls.replace(/ /g, '') + ',', rightControls = ',' + app.options.rightControls.replace(/ /g, '') + ',', devControls = ','; // + app.options.devControls.replace(/ /g, '') + ',';
                // if (utils.isIOS) {
                //   hideControls += ",fullScreen,";
                // }
                hideControls += devControls;
                for(var controlCount = 0; controlCount < allControls.length; controlCount++){
                    //if hidden skip
                    var controlName = allControls[controlCount];
                    if (hideControls.indexOf(',' + controlName + ',') < 0) {
                        var control = controls[controlName];
                        if (control != null && (typeof control === "undefined" ? "undefined" : controls_type_of(control)) == "object") {
                            if (moreControls.indexOf(',' + controlName + ',') > -1 && controlName !== 'more' && controlName !== 'pageNumber') {
                                ui.moreContainer.append(control);
                            } else if (app.options.controlsFloating == true) {
                                controlsContainer.append(control);
                            } else {
                                this.centerElement.append(control);
                            }
                        }
                    }
                }
                if (ui.moreContainer.children().length == 0) {
                    this.more.addClass("df-hidden");
                }
                app.container.append(controlsContainer);
                app.container.append(controls.openLeft);
                app.container.append(this.controls.openRight);
                //register a click event on window to close the more-options and search options
                window.addEventListener('click', ui.events.closePanels = ui.closePanels.bind(ui), false);
                window.addEventListener('keyup', ui.events.keyup = ui.keyUp.bind(ui), false);
                document.addEventListener('fullscreenchange', ui.events.fullscreenChange = ui.fullscreenChange.bind(ui), false);
                if (app.options.autoOpenThumbnail === true) {
                    ui.controls.thumbnail.trigger("click");
                }
                if (app.hasOutline() && app.options.autoOpenOutline === true) {
                    ui.controls.outline.trigger("click");
                }
                app.executeCallback('onCreateUI');
            }
        },
        {
            key: "closePanels",
            value: function closePanels(event) {
                if (this.moreContainerOpen === true) {
                    var _this_controls_more;
                    (_this_controls_more = this.controls.more) === null || _this_controls_more === void 0 ? void 0 : _this_controls_more.removeClass("df-active");
                    this.moreContainerOpen = false;
                }
            }
        },
        {
            key: "fullscreenChange",
            value: function fullscreenChange(event) {
                var isExit = controls_utils.getFullscreenElement() === void 0;
                if (isExit && this.app.isFullscreen === true) {
                    this.app.switchFullscreen();
                }
            }
        },
        {
            key: "keyUp",
            value: function keyUp(event) {
                var ui = this, app = this.app;
                //bail out if the keys are getting entered in some input box.
                if (event.target.nodeName === "INPUT") return;
                var navKeysValid = false;
                if (app.options.arrowKeysAction === defaults_DEARVIEWER.ARROW_KEYS_ACTIONS.NAV) {
                    if (app.isFullscreen === true || app.options.isLightBox === true) {
                        navKeysValid = true;
                    }
                    if (app.options.isLightBox != true && defaults_DEARVIEWER.activeEmbeds.length < 2 && controls_jQuery("body").hasClass("df-lightbox-open") === false) {
                        navKeysValid = true;
                    }
                }
                switch(event.keyCode){
                    case 27:
                        if (defaults_DEARVIEWER.activeLightBox && defaults_DEARVIEWER.activeLightBox.app && !controls_utils.isChromeExtension()) {
                            defaults_DEARVIEWER.activeLightBox.closeButton.trigger("click");
                        }
                        break;
                    case 37:
                        if (navKeysValid) app.openLeft();
                        break;
                    case 39:
                        if (navKeysValid) app.openRight();
                        break;
                    default:
                        break;
                }
            }
        },
        {
            key: "createLogo",
            value: function createLogo() {
                var app = this.app;
                var logo = null;
                if (app.options.logo.indexOf("<") > -1) {
                    logo = controls_jQuery(app.options.logo).addClass("df-logo df-logo-html");
                } else if (app.options.logo.trim().length > 2) {
                    logo = controls_jQuery('<a class="df-logo df-logo-img" target="_blank" href="' + app.options.logoUrl + '"><img alt="" src="' + app.options.logo + '"/>');
                }
                this.element.append(logo);
            }
        },
        {
            key: "dispose",
            value: function dispose() {
                var ui = this;
                for(var key in this.controls){
                    if (this.controls.hasOwnProperty(key)) {
                        var control = this.controls[key];
                        if (control !== null && (typeof control === "undefined" ? "undefined" : controls_type_of(control)) == "object") control.off().remove();
                    }
                }
                ui.element.remove();
                ui.shareBox = controls_utils.disposeObject(ui.shareBox);
                window.removeEventListener('click', ui.events.closePanels, false);
                window.removeEventListener('keyup', ui.events.keyup, false);
                document.removeEventListener('fullscreenchange', ui.events.fullscreenChange, false);
            }
        },
        {
            key: "update",
            value: function update() {
                var app = this.app, controls = this.controls;
                if (this._pageLabelWidthSet !== true) {
                    //https://github.com/deepak-ghimire/dearviewer/issues/349
                    this.pageLabel.width("");
                    if (app.provider.pageLabels) {
                        this.pageLabel.html("88888888888888888".substring(0, app.pageCount.toString().length * 3 + 4));
                    } else {
                        this.pageLabel.html("88888888888".substring(0, app.pageCount.toString().length * 2 + 3));
                    }
                    this.pageNumber.width(this.pageLabel.width());
                    this.pageLabel.width(this.pageLabel.width());
                    this.pageLabel.html("");
                    this._pageLabelWidthSet = true;
                }
                var pageLabel = app.getCurrentLabel();
                if (pageLabel.toString() !== app.currentPageNumber.toString()) {
                    controls.pageLabel.html(pageLabel + "(" + app.currentPageNumber + "/" + app.pageCount + ")");
                } else {
                    controls.pageLabel.html(pageLabel + "/" + app.pageCount);
                }
                controls.pageInput.val(pageLabel);
                app.container.toggleClass("df-sidemenu-open", app.container.find(".df-sidemenu-visible").length > 0);
                var isSearchOpen = app.provider.totalHits > 0 && app.container.find(".df-sidemenu-visible.df-search-container").length > 0;
                app.container.toggleClass("df-search-open", isSearchOpen);
                if (isSearchOpen) {
                    var targetSearchresult = app.searchContainer.find(".df-search-result[data-df-page=" + app.currentPageNumber + "]");
                    app.searchContainer.find(".df-search-result.df-active").removeClass("df-active");
                    if (targetSearchresult.length > 0 && !targetSearchresult.hasClass(".df-active")) {
                        targetSearchresult.addClass("df-active");
                        var searchWrapper = app.searchResults[0];
                        var searchWrapperScrollTop = searchWrapper.scrollTop, searchWrapperScrollHeight = searchWrapper.getBoundingClientRect().height;
                        targetSearchresult = targetSearchresult[0];
                        //when the thumb is below the display area scroll so that just it's fully visible
                        if (searchWrapperScrollTop + searchWrapperScrollHeight < targetSearchresult.offsetTop + targetSearchresult.scrollHeight) controls_utils.scrollIntoView(targetSearchresult, null, false);
                        else if (searchWrapperScrollTop > targetSearchresult.offsetTop) controls_utils.scrollIntoView(targetSearchresult);
                    }
                }
                controls.zoomIn.toggleClass("disabled", app.zoomValue === app.viewer.maxZoom);
                controls.zoomOut.toggleClass("disabled", app.zoomValue === app.viewer.minZoom);
                var isRTL = app.isRTL, isStart = app.currentPageNumber === app.startPage, isEnd = app.currentPageNumber === app.endPage;
                var noPrev = isStart && !isRTL || isEnd && isRTL, noNext = isEnd && !isRTL || isStart && isRTL;
                controls.openRight.toggleClass("df-hidden", noNext);
                controls.openLeft.toggleClass("df-hidden", noPrev);
                app.viewer.afterControlUpdate();
            }
        }
    ]);
    return UI;
}();
var DV_Share = /*#__PURE__*/ function() {
    "use strict";
    function DV_Share(container, options) {
        controls_class_call_check(this, DV_Share);
        var dfShare = this;
        dfShare.isOpen = false;
        dfShare.shareUrl = "";
        dfShare.init(container, options);
    }
    controls_create_class(DV_Share, [
        {
            key: "init",
            value: function init(container, options) {
                var _loop = function(shareKey) {
                    if (options.share.hasOwnProperty(shareKey) && options.hideShareControls.indexOf(shareKey) < 0) {
                        var shareTemplate = options.share[shareKey];
                        if (shareTemplate !== null) {
                            dfShare[shareKey] = controls_jQuery('<div>', {
                                class: shareButtonClass + " df-share-" + shareKey + " " + options.icons[shareKey]
                            }).on("click", function(e) {
                                e.preventDefault();
                                window.open(shareTemplate.replace("{{url}}", encodeURIComponent(dfShare.shareUrl)).replace("{{mailsubject}}", options.text.mailSubject), "Sharer", windowParameters);
                                e.stopPropagation(); //so the default event is not cancelled by parent element
                            });
                            dfShare.box.append(dfShare[shareKey]);
                        }
                    }
                };
                var dfShare = this;
                var shareButtonClass = "df-share-button";
                var windowParameters = "width=500,height=400";
                dfShare.wrapper = controls_jQuery('<div class="df-share-wrapper" style="display: none;">').on("click", function() {
                    dfShare.close();
                });
                dfShare.box = controls_jQuery('<div class="df-share-box">');
                dfShare.box.on("click", function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                });
                dfShare.box.appendTo(dfShare.wrapper).html('<span class="df-share-title">' + options.text.share + '</span>');
                dfShare.urlInput = controls_jQuery('<textarea name="df-share-url" class="df-share-url">').on("click", function() {
                    controls_jQuery(this).select();
                });
                dfShare.box.append(dfShare.urlInput);
                for(var shareKey in options.share)_loop(shareKey);
                controls_jQuery(container).append(dfShare.wrapper);
            }
        },
        {
            key: "show",
            value: function show() {
                this.wrapper.fadeIn(300);
                this.urlInput.val(this.shareUrl);
                this.urlInput.trigger("click");
                this.isOpen = true;
            }
        },
        {
            key: "dispose",
            value: function dispose() {
                var dfShare = this;
                for(var key in dfShare){
                    if (dfShare.hasOwnProperty(key)) {
                        if (dfShare[key] && dfShare[key].off) dfShare[key].off();
                    }
                }
                dfShare.wrapper.remove();
            }
        },
        {
            key: "close",
            value: function close() {
                this.wrapper.fadeOut(300);
                this.isOpen = false;
            }
        },
        {
            key: "update",
            value: function update(url) {
                this.shareUrl = url;
            }
        }
    ]);
    return DV_Share;
}();
var DVLightBox = /*#__PURE__*/ function() {
    "use strict";
    function DVLightBox(closeCallback) {
        controls_class_call_check(this, DVLightBox);
        this.duration = 300;
        //cache this
        var lightbox = this;
        //lightbox wrapper div
        lightbox.lightboxWrapper = controls_jQuery("<div>").addClass("df-lightbox-wrapper");
        //lightbox background
        lightbox.backGround = controls_jQuery("<div>").addClass("df-lightbox-bg").appendTo(lightbox.lightboxWrapper);
        //lightbox element
        lightbox.element = controls_jQuery("<div>").addClass("df-app").appendTo(lightbox.lightboxWrapper);
        //lightbox controls
        lightbox.controls = controls_jQuery("<div>").addClass("df-lightbox-controls").appendTo(lightbox.lightboxWrapper);
        //lightbox close button
        lightbox.closeButton = controls_jQuery("<div>").addClass("df-lightbox-close df-ui-btn " + defaults_DEARVIEWER.defaults.icons['close']).on("click", function() {
            lightbox.close(closeCallback);
        }).appendTo(lightbox.controls);
        lightbox.lightboxWrapper.append(lightbox.element);
        return lightbox;
    }
    controls_create_class(DVLightBox, [
        {
            key: "show",
            value: function show(callback) {
                if (this.lightboxWrapper.parent().length === 0) controls_jQuery("body").append(this.lightboxWrapper);
                controls_jQuery("html,body").addClass("df-lightbox-open");
                this.lightboxWrapper.fadeIn(this.duration);
                if (typeof callback === "function") callback();
                return this;
            }
        },
        {
            key: "close",
            value: function close(callback) {
                this.lightboxWrapper.fadeOut(this.duration);
                Array.prototype.forEach.call(defaults_DEARVIEWER.utils.getSharePrefixes(), function(prefix) {
                    if (window.location.hash.indexOf("#" + prefix) === 0) history.replaceState(undefined, undefined, "#_");
                //window.location.hash = "#_";
                });
                if (typeof callback === "function") setTimeout(callback, this.duration);
                controls_jQuery("html,body").removeClass("df-lightbox-open");
                //cleanup any classes to remove old CSS classes
                this.element.attr("class", "df-app").attr("style", "");
                this.lightboxWrapper.attr("class", "df-lightbox-wrapper").attr("style", "");
                this.backGround.attr("style", "");
                return this;
            }
        }
    ]);
    return DVLightBox;
}();
var PrintHandler = /*#__PURE__*/ function() {
    "use strict";
    function PrintHandler() {
        controls_class_call_check(this, PrintHandler);
        //cache this
        var printHandler = this;
        printHandler.frame = controls_jQuery('<iframe id="df-print-frame" style="display:none">').appendTo(controls_jQuery("body"));
        printHandler.frame.on("load", function() {
            try {
                printHandler.frame[0].contentWindow.print();
            } catch (e) {
                console.log(e);
            }
        });
        return printHandler;
    }
    controls_create_class(PrintHandler, [
        {
            key: "printPDF",
            value: function printPDF(source) {
                this.frame[0].src = source;
            }
        }
    ]);
    return PrintHandler;
}();
var Sidemenu = /*#__PURE__*/ function() {
    "use strict";
    function Sidemenu(options, appContext) {
        controls_class_call_check(this, Sidemenu);
        this.options = options;
        this.app = appContext;
        this.parentElement = options.parentElement;
        this.element = controls_jQuery('<div>', {
            class: "df-sidemenu-wrapper"
        });
        this.parentElement.append(this.element);
        this.buttons = controls_jQuery('<div>', {
            class: "df-sidemenu-buttons df-ui-wrapper"
        }).appendTo(this.element);
        /*
        let icons = this.app.options.icons,
          text = this.app.options.text;

        this.thumbnail = utils.createBtn('thumbnail', icons['thumbnail'], text.toggleThumbnails);
        this.outline = utils.createBtn('outline', icons['outline'], text.toggleOutline);*/ this.close = controls_utils.createBtn('close', appContext.options.icons['close'], appContext.options.text.close); //todo
        this.buttons.append(this.close);
    }
    controls_create_class(Sidemenu, [
        {
            key: "dispose",
            value: function dispose() {
                this.element.remove();
            }
        }
    ]);
    return Sidemenu;
}();
var BookMarkViewer = /*#__PURE__*/ function() {
    "use strict";
    function BookMarkViewer(options) {
        controls_class_call_check(this, BookMarkViewer);
        this.outline = null;
        this.lastToggleIsShow = true;
        this.container = options.container;
        this.linkService = options.linkService;
        this.outlineItemClass = options.outlineItemClass || "outlineItem";
        this.outlineToggleClass = options.outlineToggleClass || "outlineItemToggler";
        this.outlineToggleHiddenClass = options.outlineToggleHiddenClass || "outlineItemsHidden";
    }
    controls_create_class(BookMarkViewer, [
        {
            key: "dispose",
            value: function dispose() {
                if (this.container) {
                    if (this.container.parentNode) {
                        this.container.parentNode.removeChild(this.container);
                    }
                }
                this.linkService = null;
            }
        },
        {
            key: "reset",
            value: function reset() {
                this.outline = null;
                this.lastToggleIsShow = true;
                var container = this.container;
                while(container.firstChild){
                    container.removeChild(container.firstChild);
                }
            }
        },
        {
            /**
   * @private
   */ key: "_dispatchEvent",
            value: function _dispatchEvent(outlineCount) {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('outlineloaded', true, true, {
                    outlineCount: outlineCount
                });
                this.container.dispatchEvent(event);
            }
        },
        {
            /**
   * @private
   */ key: "_bindLink",
            value: function _bindLink(element, item) {
                var linkService = this.linkService;
                if (item.custom === true) {
                    element.href = linkService.getCustomDestinationHash(item.dest);
                    element.onclick = function goToDestination() {
                        linkService.customNavigateTo(item.dest);
                        return false;
                    };
                } else {
                    if (item.url) {
                        pdfjsLib.addLinkAttributes(element, {
                            url: item.url
                        });
                        return;
                    }
                    element.href = linkService.getDestinationHash(item.dest);
                    element.onclick = function goToDestination() {
                        linkService.navigateTo(item.dest);
                        return false;
                    };
                }
            }
        },
        {
            /**
   * Prepend a button before an outline item which allows the user to toggle
   * the visibility of all outline items at that level.
   *
   * @private
   */ key: "_addToggleButton",
            value: function _addToggleButton(div) {
                var _bookMarkViewer = this;
                var toggler = document.createElement('div');
                toggler.className = this.outlineToggleClass + " " + this.outlineToggleHiddenClass;
                toggler.onclick = (function(event) {
                    event.stopPropagation();
                    toggler.classList.toggle(this.outlineToggleHiddenClass);
                    if (event.shiftKey) {
                        var shouldShowAll = !toggler.classList.contains(this.outlineToggleHiddenClass);
                        _bookMarkViewer._toggleOutlineItem(div, shouldShowAll);
                    }
                }).bind(this);
                div.insertBefore(toggler, div.firstChild);
            }
        },
        {
            /**
   * Toggle the visibility of the subtree of an outline item.
   *
   * @param {Element} root - the root of the outline (sub)tree.
   * @param {boolean} show - whether to show the outline (sub)tree. If false,
   *   the outline subtree rooted at |root| will be collapsed.
   *
   * @private
   */ key: "_toggleOutlineItem",
            value: function _toggleOutlineItem(root, show) {
                this.lastToggleIsShow = show;
                var togglers = root.querySelectorAll('.' + this.outlineToggleClass);
                for(var i = 0, ii = togglers.length; i < ii; ++i){
                    togglers[i].classList[show ? 'remove' : 'add'](this.outlineToggleHiddenClass);
                }
            }
        },
        {
            /**
   * @param {BookMarkViewerRenderParameters} params
   */ key: "render",
            value: function render(params) {
                var outline = params && params.outline || null;
                var outlineCount = 0;
                if (this.outline) {
                    this.reset();
                }
                this.outline = outline;
                if (!outline) {
                    //this._dispatchEvent(outlineCount);
                    return;
                }
                var fragment = document.createDocumentFragment();
                var queue = [
                    {
                        parent: fragment,
                        items: this.outline,
                        custom: false
                    }
                ];
                var hasAnyNesting = false;
                while(queue.length > 0){
                    var levelData = queue.shift();
                    var isCustom = levelData.custom;
                    for(var i = 0, len = levelData.items.length; i < len; i++){
                        var item = levelData.items[i];
                        var div = document.createElement('div');
                        div.className = this.outlineItemClass;
                        var element = document.createElement('a');
                        if (item.custom == null && isCustom != null) item.custom = isCustom;
                        this._bindLink(element, item);
                        //element.
                        element.textContent = item.title.replace(/\x00/g, '');
                        //pdfjsLib.removeNullCharacters(item.title) || "Untitled Bookmark";
                        div.appendChild(element);
                        if (item.items && item.items.length > 0) {
                            hasAnyNesting = true;
                            this._addToggleButton(div);
                            var itemsDiv = document.createElement('div');
                            itemsDiv.className = this.outlineItemClass + "s";
                            div.appendChild(itemsDiv);
                            // noinspection JSCheckFunctionSignatures
                            queue.push({
                                parent: itemsDiv,
                                custom: item.custom,
                                items: item.items
                            });
                        }
                        levelData.parent.appendChild(div);
                        outlineCount++;
                    }
                }
                if (hasAnyNesting) {
                    if (this.container.classList != null) {
                        this.container.classList.add(this.outlineItemClass + "s");
                    } else if (this.container.className != null) {
                        this.container.className += " picWindow";
                    }
                }
                this.container.appendChild(fragment);
                this._dispatchEvent(outlineCount);
            }
        }
    ]);
    return BookMarkViewer;
}();
var ThumbList = /*#__PURE__*/ function() {
    "use strict";
    function ThumbList(config) {
        controls_class_call_check(this, ThumbList);
        var onScroll = function onScroll() {
            app.thumbRequestCount = 0;
            app.thumbRequestStatus = REQUEST_STATUS.COUNT;
        };
        var itemHeight = this.itemHeight = config.itemHeight;
        var itemWidth = this.itemWidth = config.itemWidth;
        var app = this.app = config.app;
        this.items = config.items;
        this.generatorFn = config.generatorFn;
        this.totalRows = config.totalRows || config.items && config.items.length;
        this.addFn = config.addFn;
        this.scrollFn = config.scrollFn;
        this.container = document.createElement('div');
        var self = this;
        for(var count = 0; count < this.totalRows; count++){
            var el = document.createElement("div");
            var pageNumber = count + 1;
            el.id = "df-thumb" + pageNumber;
            var image = document.createElement("div"), thumbNumber = document.createElement("div"), wrapper = document.createElement("div");
            wrapper.className = "df-wrapper";
            thumbNumber.className = "df-thumb-number";
            el.className = "df-thumb";
            image.className = "df-bg-image";
            wrapper.style.height = itemHeight + 'px';
            wrapper.style.width = itemWidth + 'px';
            thumbNumber.innerText = app.provider.getLabelforPage(pageNumber);
            el.appendChild(wrapper);
            wrapper.appendChild(thumbNumber);
            wrapper.appendChild(image);
            this.container.appendChild(el);
        }
        self.dispose = function() {
            if (self.container) {
                if (self.container.parentNode) {
                    self.container.parentNode.removeChild(self.container);
                }
            }
            self.container.removeEventListener('scroll', onScroll);
        };
        self.container.addEventListener('scroll', onScroll);
    }
    controls_create_class(ThumbList, [
        {
            key: "processThumbRequest",
            value: function processThumbRequest() {
                controls_utils.log("Thumb Request Initiated");
                var app = this.app;
                app.thumbRequestStatus = REQUEST_STATUS.OFF;
                //move to thumb if thumb is on
                if (app.activeThumb !== app.currentPageNumber) {
                    var thumbVisible = app.thumbContainer != null && app.thumbContainer.hasClass("df-sidemenu-visible");
                    if (thumbVisible) {
                        var thumbWrapper = app.thumblist.container;
                        var thumbWrapperScrollTop = thumbWrapper.scrollTop, thumbWrapperScrollHeight = thumbWrapper.getBoundingClientRect().height;
                        var thumb = app.thumbContainer.find("#df-thumb" + app.currentPageNumber);
                        if (thumb.length > 0) {
                            app.thumbContainer.find(".df-selected").removeClass("df-selected");
                            thumb.addClass("df-selected");
                            //js calculation
                            thumb = thumb[0];
                            //when the thumb is below the display area scroll so that just it's fully visible
                            if (thumbWrapperScrollTop + thumbWrapperScrollHeight < thumb.offsetTop + thumb.scrollHeight) controls_utils.scrollIntoView(thumb, null, false);
                            else if (thumbWrapperScrollTop > thumb.offsetTop) controls_utils.scrollIntoView(thumb);
                            app.activeThumb = app.currentPageNumber;
                        } else {
                            //noinspection JSValidateTypes
                            controls_jQuery(thumbWrapper).scrollTop(app.currentPageNumber * 124);
                            app.thumbRequestStatus = REQUEST_STATUS.ON;
                        }
                    }
                }
                if (app.thumblist.container.getElementsByClassName("df-thumb-requested").length === 0) {
                    var visible = controls_utils.getVisibleElements({
                        container: app.thumblist.container,
                        elements: app.thumblist.container.children
                    });
                    if (controls_jQuery.inArray(visible)) visible.unshift(app.activeThumb);
                    for(var count = 0; count < visible.length; count++){
                        var thumb1 = app.thumblist.container.children[visible[count] - 1];
                        if (thumb1 !== void 0 && thumb1.classList.contains("df-thumb-loaded") === false && thumb1.classList.contains("df-thumb-requested") === false) {
                            thumb1.classList.add("df-thumb-requested");
                            controls_utils.log("Thumb Requested for " + visible[count]);
                            app.provider.processPage({
                                pageNumber: visible[count],
                                textureTarget: defaults_DEARVIEWER.TEXTURE_TARGET.THUMB
                            });
                            return false;
                        }
                    }
                }
            }
        },
        {
            key: "setPage",
            value: function setPage(param) {
                var app = this.app, pageNumber = param.pageNumber, texture = param.texture, textureTarget = param.textureTarget;
                if (textureTarget === defaults_DEARVIEWER.TEXTURE_TARGET.THUMB) {
                    var thumb = app.container.find("#df-thumb" + pageNumber);
                    thumb.find(".df-wrapper").css({
                        height: param.height,
                        width: param.width
                    });
                    thumb.find(".df-bg-image").css({
                        backgroundImage: controls_utils.bgImage(texture)
                    });
                    thumb.addClass("df-thumb-loaded").removeClass("df-thumb-requested");
                }
                controls_utils.log("Thumbnail set for " + param.pageNumber);
                app.thumbRequestStatus = REQUEST_STATUS.ON;
            }
        }
    ]);
    return ThumbList;
}();
defaults_DEARVIEWER.openLightBox = function openLightBox(app) {
    if (!defaults_DEARVIEWER.activeLightBox) {
        defaults_DEARVIEWER.activeLightBox = new DVLightBox(function() {
            if (defaults_DEARVIEWER.activeLightBox.app) {
                defaults_DEARVIEWER.activeLightBox.app.closeRequested = true;
                defaults_DEARVIEWER.activeLightBox.app.analytics({
                    eventAction: defaults_DEARVIEWER.activeLightBox.app.options.analyticsViewerClose,
                    options: defaults_DEARVIEWER.activeLightBox.app.options
                });
            }
            defaults_DEARVIEWER.activeLightBox.app = controls_utils.disposeObject(defaults_DEARVIEWER.activeLightBox.app);
        });
    }
    defaults_DEARVIEWER.activeLightBox.duration = 300;
    if (defaults_DEARVIEWER.activeLightBox.app === undefined || defaults_DEARVIEWER.activeLightBox.app === null || defaults_DEARVIEWER.activeLightBox.app.closeRequested === true || defaults_DEARVIEWER.openLocalFileInput == app // request is through OpenFile function
    ) {
        defaults_DEARVIEWER.activeLightBox.app = controls_utils.disposeObject(defaults_DEARVIEWER.activeLightBox.app);
        if (defaults_DEARVIEWER.activeLightBox.app === null) {
            defaults_DEARVIEWER.activeLightBox.show(function() {
                defaults_DEARVIEWER.activeLightBox.app = controls_jQuery(defaults_DEARVIEWER.activeLightBox.element).dearviewer({
                    transparent: false,
                    isLightBox: true,
                    hashNavigationEnabled: true,
                    height: "100%",
                    dataElement: app
                });
                history.pushState({}, null, "#");
                defaults_DEARVIEWER.activeLightBox.lightboxWrapper.toggleClass("df-lightbox-padded", defaults_DEARVIEWER.activeLightBox.app.options.popupFullsize === false);
                defaults_DEARVIEWER.activeLightBox.lightboxWrapper.toggleClass("df-rtl", defaults_DEARVIEWER.activeLightBox.app.options.readDirection === defaults_DEARVIEWER.READ_DIRECTION.RTL);
                defaults_DEARVIEWER.activeLightBox.backGround.css({
                    "backgroundColor": defaults_DEARVIEWER.activeLightBox.app.options.backgroundColor === "transparent" ? defaults_DEARVIEWER.defaults.popupBackGroundColor : defaults_DEARVIEWER.activeLightBox.app.options.backgroundColor
                });
            });
        }
    }
};
defaults_DEARVIEWER.checkBrowserURLforDefaults = function() {
    if (controls_utils.isIEUnsupported) return;
    var viewerType = new URL(location.href).searchParams.get('viewer-type') || new URL(location.href).searchParams.get('viewertype');
    var is3D = new URL(location.href).searchParams.get('is-3d') || new URL(location.href).searchParams.get('is3d');
    if (viewerType) {
        defaults_DEARVIEWER.defaults.viewerType = viewerType;
    }
    if (is3D === "true" || is3D === "false") {
        defaults_DEARVIEWER.defaults.is3D = is3D === "true";
    }
};
defaults_DEARVIEWER.checkBrowserURLforPDF = function() {
    var openFlipbook = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    if (controls_utils.isIEUnsupported) return;
    var pdf = new URL(location.href).searchParams.get('pdf-source');
    if (pdf) {
        pdf = decodeURI(pdf);
        if (openFlipbook) {
            defaults_DEARVIEWER.openURL(pdf);
        }
    }
    return pdf;
};
//Exists if there is need for open file and other lightbox present in the same page. They cannot share same settings.
//also is needed just be a dummy elemet for lightbox dataElement
function createFileInput() {
    if (defaults_DEARVIEWER.openLocalFileInput === void 0) {
        var input = defaults_DEARVIEWER.openLocalFileInput = controls_jQuery('<input type="file" accept=".pdf" style="display:none">').appendTo(controls_jQuery("body")).data('df-option', defaults_DEARVIEWER.openFileOptions);
        input.change(function() {
            var files = input[0].files;
            var file;
            if (files.length) {
                file = files[0];
                input.val("");
                defaults_DEARVIEWER.openFile(file);
            }
        });
    }
}
//default fileDropHandler
defaults_DEARVIEWER.fileDropHandler = function(files, e) {
    var file = files[0];
    if (file.type === "application/pdf") {
        e.preventDefault();
        e.stopPropagation();
        defaults_DEARVIEWER.openFile(file);
    }
};
defaults_DEARVIEWER.openFile = function(file) {
    if (file) {
        var //callback to handle any actions once file is selected.
        _DEARVIEWER_openFileSelected;
        if (defaults_DEARVIEWER.oldLocalFileObjectURL) window.URL.revokeObjectURL(defaults_DEARVIEWER.oldLocalFileObjectURL);
        defaults_DEARVIEWER.oldLocalFileObjectURL = window.URL.createObjectURL(file);
        (_DEARVIEWER_openFileSelected = defaults_DEARVIEWER['openFileSelected']) === null || _DEARVIEWER_openFileSelected === void 0 ? void 0 : _DEARVIEWER_openFileSelected.call(defaults_DEARVIEWER, {
            url: defaults_DEARVIEWER.oldLocalFileObjectURL,
            file: file
        });
        defaults_DEARVIEWER.openURL(defaults_DEARVIEWER.oldLocalFileObjectURL);
    } else {
        defaults_DEARVIEWER.openURL();
    }
};
defaults_DEARVIEWER.openURL = function(src) {
    createFileInput();
    if (src) {
        defaults_DEARVIEWER.openFileOptions.source = src;
        defaults_DEARVIEWER.openFileOptions.pdfParameters = null;
    }
    defaults_DEARVIEWER.openLightBox(defaults_DEARVIEWER.openLocalFileInput);
};
defaults_DEARVIEWER.openBase64 = function(data) {
    defaults_DEARVIEWER.openFileOptions.source = null;
    defaults_DEARVIEWER.openFileOptions.pdfParameters = {
        data: atob(data)
    };
    defaults_DEARVIEWER.openURL();
};
defaults_DEARVIEWER.openLocalFile = function() {
    createFileInput();
    defaults_DEARVIEWER.openLocalFileInput.click();
};
//jQuery events
defaults_DEARVIEWER.initControls = function() {
    //Lightbox Trigger
    var body = controls_jQuery('body');
    if (defaults_DEARVIEWER.defaults.autoPDFLinktoViewer !== false) {
        body.on('click', 'a[href$=".pdf"]', function(event) {
            var app = controls_jQuery(this);
            //prevent Download button to trigger Flipbook!
            if (app.attr("download") !== undefined || app.attr("target") === "_blank" || app.hasClass("df-ui-btn") || app.parents(".df-app").length > 0) {} else {
                event.preventDefault();
                app.data('df-source', app.attr('href'));
                defaults_DEARVIEWER.openLightBox(app);
            }
        });
    }
    window.addEventListener('popstate', function(event) {
        if (defaults_DEARVIEWER.activeLightBox && defaults_DEARVIEWER.activeLightBox.app && !controls_utils.isChromeExtension()) {
            defaults_DEARVIEWER.activeLightBox.closeButton.trigger("click");
        }
    });
    body.on('click', '.df-open-local-file', function(event) {
        defaults_DEARVIEWER.openLocalFile();
    });
    body.on('click', '.df-sidemenu-buttons .df-ui-close', function() {
        var el = controls_jQuery(this);
        el.closest(".df-app").find(".df-ui-btn.df-active").trigger("click");
    });
    body.on('mouseout', '.df-link-content section.squareAnnotation, .df-link-content section.textAnnotation, .df-link-content section.freeTextAnnotation', function() {
        var el = controls_jQuery(this);
        defaults_DEARVIEWER.handlePopup(el, false);
    });
    body.on('mouseover', '.df-link-content section.squareAnnotation, .df-link-content section.textAnnotation, .df-link-content section.freeTextAnnotation', function() {
        var el = controls_jQuery(this);
        defaults_DEARVIEWER.handlePopup(el, true);
    });
    defaults_DEARVIEWER.handlePopup = function(el) {
        var show = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        var container = el.closest('.df-container');
        var commentPopup = container.find('.df-comment-popup');
        commentPopup.toggleClass("df-active", show);
        if (show) {
            var elBounds = el[0].getBoundingClientRect();
            var containerBounds = container[0].getBoundingClientRect();
            var popup = el.find(".popupWrapper").first();
            if (el.hasClass("popupTriggerArea")) {
                var annotation_id = el.data("annotation-id");
                if (annotation_id !== void 0) {
                    popup = el.siblings("[data-annotation-id=popup_" + annotation_id + "]");
                }
            }
            commentPopup.html(popup.html());
            var left = elBounds.left - containerBounds.left;
            if (left + 360 > containerBounds.width) left = containerBounds.width - 360 - 10;
            else if (left < 10) left = 10;
            var top = elBounds.top - containerBounds.top + elBounds.height + 5;
            if (top + commentPopup.height() > containerBounds.height) top = elBounds.top - commentPopup.height() - elBounds.height - 10;
            else if (top < 10) top = 10;
            commentPopup.css({
                "left": left,
                "top": top
            });
        }
    };
    if (defaults_DEARVIEWER.fileDropElement != void 0) {
        var fileDropElement = controls_jQuery(defaults_DEARVIEWER.fileDropElement);
        if (fileDropElement.length > 0) {
            fileDropElement.on("dragover", function(event) {
                event.preventDefault();
                event.stopPropagation();
                controls_jQuery(this).addClass('df-dragging');
            });
            fileDropElement.on("dragleave", function(event) {
                event.preventDefault();
                event.stopPropagation();
                controls_jQuery(this).removeClass('df-dragging');
            });
            fileDropElement.on("drop", function(e) {
                var files = e.originalEvent.dataTransfer.files; // Array of all files
                var file;
                if (files.length) {
                    defaults_DEARVIEWER.fileDropHandler(files, e);
                }
            });
        }
    }
};


;// CONCATENATED MODULE: ./src/js/dearviewer/app.js
/* globals pdfjsLib,THREE  */ function app_class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function app_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function app_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) app_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) app_defineProperties(Constructor, staticProps);
    return Constructor;
}
function app_instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}



var app_DV = (/* unused pure expression or super */ null && (DEARVIEWER));
var app_jQuery = defaults_DEARVIEWER.jQuery;
var app_REQUEST_STATUS = defaults_DEARVIEWER.REQUEST_STATUS, app_utils = defaults_DEARVIEWER.utils;
var App = /*#__PURE__*/ function() {
    "use strict";
    function App(options) {
        app_class_call_check(this, App);
        this.options = options;
        this.viewerType = this.options.viewerType;
        this.startPage = 1;
        this.endPage = 1;
        this.element = app_jQuery(this.options.element);
        var _options_maxTextureSize;
        options.maxTextureSize = (_options_maxTextureSize = options.maxTextureSize) !== null && _options_maxTextureSize !== void 0 ? _options_maxTextureSize : 2048;
        if (app_utils.isMobile) {
            options.maxTextureSize = options.maxTextureSize === 4096 ? 3200 : options.maxTextureSize;
        }
        this.dimensions = {
            padding: {},
            offset: {},
            pageFit: {},
            stage: {},
            isAutoHeight: options.height === "auto",
            maxTextureSize: options.maxTextureSize
        };
        this.is3D = options.is3D;
        this.options.pixelRatio = app_utils.limitAt(this.options.pixelRatio, 1, this.options.maxDPI);
        var _this_options_fakeZoom;
        this.options.fakeZoom = (_this_options_fakeZoom = this.options.fakeZoom) !== null && _this_options_fakeZoom !== void 0 ? _this_options_fakeZoom : 1;
        this.events = {};
        this.links = options.links;
        this.thumbSize = 128;
        this.pendingZoom = true;
        this.currentPageNumber = this.options.openPage || this.startPage;
        this.hashNavigationEnabled = this.options.hashNavigationEnabled === true;
        this.pendingZoom = true;
        this.zoomValue = 1;
        this.pageScaling = defaults_DEARVIEWER.PAGE_SCALE.MANUAL;
        this.isRTL = options.readDirection === defaults_DEARVIEWER.READ_DIRECTION.RTL;
        this.jumpStep = 1;
        this.resizeRequestStatus = app_REQUEST_STATUS.OFF;
        this.refreshRequestStatus = app_REQUEST_STATUS.OFF;
        this.refreshRequestCount = 0;
        this.resizeRequestCount = 0;
        this.fullscreenSupported = app_utils.hasFullscreenEnabled();
        this.thumbRequestCount = 0;
        var _this_options_isExternalReady;
        this.isExternalReady = (_this_options_isExternalReady = this.options.isExternalReady) !== null && _this_options_isExternalReady !== void 0 ? _this_options_isExternalReady : true; //used when external document viewer or logic needs to wait
        this.init();
        if (this.options.autoLightBoxFullscreen === true && this.options.isLightBox === true) this.switchFullscreen(); //doesn't work properly https://github.com/deepak-ghimire/dearviewer/issues/332
        this.executeCallback('onCreate');
        this.target = this;
    }
    app_create_class(App, [
        {
            key: "init",
            value: function init() {
                var options = this.options, app = this;
                app.initDOM();
                app.initResourcesLocation();
                app.initInfo();
                //region Source Validation
                if ((options.source == null || options.source.length === 0) && options.pdfParameters == null) {
                    app.updateInfo("ERROR: Set a Valid Document Source.", defaults_DEARVIEWER.INFO_TYPE.ERROR);
                    app.container.removeClass('df-loading').addClass("df-error");
                    return;
                }
                //endregion
                //region Old Browsers
                if (app_utils.isIEUnsupported) {
                    app.updateInfo("Your browser (Internet Explorer) is out of date! <br><a href='https://browsehappy.com/'>Upgrade to a new browser.</a>", "df-old-browser");
                    app.container.removeClass('df-loading').addClass("df-error");
                    return;
                }
                //endregion
                app.commentPopup = app_jQuery('<div class="df-comment-popup">').appendTo(app.container);
                app.viewer = new app.viewerType(options, this);
                app.sideMenu = new Sidemenu({
                    parentElement: this.container
                }, app);
                app.provider = new defaults_DEARVIEWER.providers[options.providerType](options, app);
                app.state = 'loading';
                app.checkRequestQueue();
            }
        },
        {
            key: "initDOM",
            value: function initDOM() {
                this.element.addClass("df-app").removeClass("df-container df-loading");
                this.container = app_jQuery("<div>").appendTo(this.element);
                // Q. Why are this.element and this.container defined separately?
                // A. In IOS when fullscreen is used, then the whole this.container can be transferred to the pseudo fullscreen container that stays at the last of the DOM.
                this.container.addClass('df-container df-loading df-init' + " df-controls-" + this.options.controlsPosition + (this.options.controlsFloating === true ? " df-float" : " df-float-off") + (this.options.backgroundColor === 'transparent' ? " df-transparent" : "") + (this.isRTL === true ? " df-rtl" : "") + (app_utils.isIOS === true || app_utils.isIPad === true ? " df-ios" : ""));
                this._offsetParent = this.container[0].offsetParent;
                this.backGround = app_jQuery("<div class='df-bg'>").appendTo(this.container).css({
                    "backgroundColor": this.options.backgroundColor,
                    "backgroundImage": this.options.backgroundImage ? "url('" + this.options.backgroundImage + "')" : ''
                });
                this.viewerContainer = app_jQuery("<div>").appendTo(this.container);
                this.viewerContainer.addClass('df-viewer-container');
            }
        },
        {
            /**
   * Prepares Resource location based on the window[DEARVIEWER.locationVar]
   */ key: "initResourcesLocation",
            value: function initResourcesLocation() {
                var options = this.options;
                if (typeof window[defaults_DEARVIEWER.locationVar] !== 'undefined') {
                    options.pdfjsSrc = window[defaults_DEARVIEWER.locationVar] + "js/libs/pdf.min.js";
                    options.threejsSrc = window[defaults_DEARVIEWER.locationVar] + "js/libs/three.min.js";
                    options.pdfjsWorkerSrc = window[defaults_DEARVIEWER.locationVar] + "js/libs/pdf.worker.min.js";
                    options.soundFile = window[defaults_DEARVIEWER.locationVar] + options.soundFile;
                    options.imagesLocation = window[defaults_DEARVIEWER.locationVar] + options.imagesLocation;
                    options.imageResourcesPath = window[defaults_DEARVIEWER.locationVar] + options.imageResourcesPath;
                    options.cMapUrl = window[defaults_DEARVIEWER.locationVar] + options.cMapUrl;
                    if (options.pdfVersion !== undefined) {
                        var pdfDir = "";
                        if (options.pdfVersion == "latest" || options.pdfVersion == "beta") {
                            pdfDir = "latest";
                        } else if (options.pdfVersion == "stable") {
                            pdfDir = "stable";
                        }
                        //region checking if browser supports latest versions
                        if (options.pdfVersion == "latest" || options.pdfVersion == "default") {
                            var supports37 = Array.prototype.at !== undefined;
                            //if browser doesn't support pdf.js 3.7 it fallsback to stable version
                            //3.7 supported by 15.1+
                            //3.2 supported by 13.1+
                            //2.5 supported by most
                            if (Array.prototype.at === undefined) {
                                pdfDir = "stable";
                                console.log("Proper Support for Latest version PDF.js 3.7 not available. Switching to PDF.js 2.5!");
                            }
                        }
                        //endregion
                        if (pdfDir !== "default" && pdfDir !== "") {
                            options.pdfjsSrc = window[defaults_DEARVIEWER.locationVar] + "js/libs/pdfjs/" + pdfDir + "/pdf.min.js";
                            options.pdfjsWorkerSrc = window[defaults_DEARVIEWER.locationVar] + "js/libs/pdfjs/" + pdfDir + "/pdf.worker.min.js";
                        }
                        if (pdfDir === "stable") {
                            this.options.fakeZoom = 1;
                        }
                    }
                } else {
                    console.warn("DEARVIEWER locationVar not found!");
                }
                this.executeCallback('onInitResourcesLocation');
            }
        },
        {
            key: "initEvents",
            value: function initEvents() {
                var app = this, containerDOM = this.container[0];
                // Use our detect's results. passive applied if supported, capture will be false either way.
                // let opts = utils.supportsPassive ? {passive: true} : false;
                var opts = false; //passive is not possible. like it's in https://www.google.com/maps/
                window.addEventListener("resize", app.events.resize = app.resetResizeRequest.bind(app), false);
                containerDOM.addEventListener("mousemove", app.events.mousemove = app.mouseMove.bind(app), false);
                containerDOM.addEventListener("mousedown", app.events.mousedown = app.mouseDown.bind(app), false);
                window.addEventListener("mouseup", app.events.mouseup = app.mouseUp.bind(app), false);
                containerDOM.addEventListener("touchmove", app.events.touchmove = app.mouseMove.bind(app), opts);
                containerDOM.addEventListener("touchstart", app.events.touchstart = app.mouseDown.bind(app), opts);
                window.addEventListener("touchend", app.events.touchend = app.mouseUp.bind(app), false);
            }
        },
        {
            key: "mouseMove",
            value: function mouseMove(event) {
                if (event.touches && event.touches.length > 1) {
                    event.preventDefault();
                }
                if (this.viewer.acceptAppMouseEvents === true) this.viewer.mouseMove(event);
            }
        },
        {
            key: "mouseDown",
            value: function mouseDown(event) {
                this.userHasInteracted = true;
                if (this.viewer.acceptAppMouseEvents === true && app_jQuery(event.srcElement).closest(".df-sidemenu").length === 0) this.viewer.mouseDown(event);
            }
        },
        {
            key: "mouseUp",
            value: function mouseUp(event) {
                if (this.viewer && this.viewer.acceptAppMouseEvents === true) this.viewer.mouseUp(event);
            }
        },
        {
            key: "softDispose",
            value: function softDispose() {
                var app = this;
                app.softDisposed = true;
                app.provider.dispose();
                app.viewer.dispose();
            }
        },
        {
            key: "softInit",
            value: function softInit() {
                var app = this;
                app.viewer = new app.viewerType(app.options, this);
                app.provider = new defaults_DEARVIEWER.providers[app.options.providerType](app.options, app);
                app.softDisposed = false;
            }
        },
        {
            key: "dispose",
            value: function dispose() {
                var _app_info, _app_loadingIcon, _app_backGround, _app_outlineContainer, _app_commentPopup;
                var app = this, containerDOM = this.container[0];
                clearInterval(this.autoPlayTimer);
                this.autoPlayTimer = null;
                this.autoPlayFunction = null;
                app.provider = app_utils.disposeObject(app.provider);
                app.contentProvider = null;
                app.target = null;
                app.viewer = app_utils.disposeObject(app.viewer);
                app.sideMenu = app_utils.disposeObject(app.sideMenu);
                app.ui = app_utils.disposeObject(app.ui);
                app.thumblist = app_utils.disposeObject(app.thumblist);
                app.outlineViewer = app_utils.disposeObject(app.outlineViewer);
                if (this.events) {
                    window.removeEventListener("resize", app.events.resize, false);
                    containerDOM.removeEventListener("mousemove", app.events.mousemove, false);
                    containerDOM.removeEventListener("mousedown", app.events.mousedown, false);
                    window.removeEventListener("mouseup", app.events.mouseup, false);
                    containerDOM.removeEventListener("touchmove", app.events.touchmove, false);
                    containerDOM.removeEventListener("touchstart", app.events.touchstart, false);
                    window.removeEventListener("touchend", app.events.touchend, false);
                }
                app.events = null;
                app.options = null;
                app.element.removeClass("df-app");
                app.viewerType = null;
                app.checkRequestQueue = null;
                (_app_info = app.info) === null || _app_info === void 0 ? void 0 : _app_info.remove();
                app.info = null;
                (_app_loadingIcon = app.loadingIcon) === null || _app_loadingIcon === void 0 ? void 0 : _app_loadingIcon.remove();
                app.loadingIcon = null;
                (_app_backGround = app.backGround) === null || _app_backGround === void 0 ? void 0 : _app_backGround.remove();
                app.backGround = null;
                (_app_outlineContainer = app.outlineContainer) === null || _app_outlineContainer === void 0 ? void 0 : _app_outlineContainer.remove();
                app.outlineContainer = null;
                (_app_commentPopup = app.commentPopup) === null || _app_commentPopup === void 0 ? void 0 : _app_commentPopup.remove();
                app.commentPopup = null;
                app.viewerContainer.off();
                app.viewerContainer.remove();
                app.viewerContainer = null;
                app.container.off();
                app.container.remove();
                app.container = null;
                app.element.off();
                app.element.data("df-app", null);
                app.element = null;
                app._offsetParent = null;
                app.dimensions = null;
            }
        },
        {
            key: "resetResizeRequest",
            value: function resetResizeRequest() {
                this.resizeRequestStatus = app_REQUEST_STATUS.COUNT;
                this.resizeRequestCount = 0;
                this.container.addClass("df-pendingresize");
                this.pendingResize = true;
            }
        },
        {
            /**
   * Prepares the element for displaying Loading icon
   */ key: "initInfo",
            value: function initInfo() {
                this.info = app_jQuery('<div>', {
                    class: 'df-loading-info'
                });
                this.container.append(this.info);
                this.info.html(this.options.text.loading + "...");
                this.loadingIcon = app_jQuery('<div>', {
                    class: 'df-loading-icon'
                }).appendTo(this.container);
            }
        },
        {
            // noinspection JSUnusedLocalSymbols
            key: "updateInfo",
            value: function updateInfo(message, className) {
                app_utils.log(message);
                if (this.info !== void 0) {
                    this.info.html(message);
                }
            }
        },
        {
            key: "_documentLoaded",
            value: function _documentLoaded() {
                app_utils.log("Document Loaded");
                this.isDocumentReady = true;
                this.contentProvider = this.provider;
                this.executeCallback('onDocumentLoad');
                this.endPage = this.pageCount = this.provider.pageCount;
                this.currentPageNumber = this.getValidPage(this.currentPageNumber);
            }
        },
        {
            key: "_viewerPrepared",
            value: function _viewerPrepared() {
                app_utils.log("Viewer Prepared");
                this.isViewerPrepared = true;
                this.executeCallback('onViewerLoad');
            }
        },
        {
            key: "requestFinalize",
            value: function requestFinalize() {
                if (this.isDocumentReady !== true || this.isViewerPrepared !== true || this.isExternalReady !== true || this.finalizeRequested === true) return;
                this.finalizeRequested = true;
                this.finalize();
            }
        },
        {
            key: "finalizeComponents",
            value: function finalizeComponents() {
                this.ui = new UI({}, this);
                this.ui.init();
                this.calculateLayout();
                this.viewer.init();
            }
        },
        {
            key: "finalize",
            value: function finalize() {
                this.resize();
                this.ui.update();
                this.initEvents();
                if (this.options.isLightBox == true) {
                    this.analytics({
                        eventAction: this.options.analyticsViewerOpen,
                        options: this.options
                    });
                }
                this.container.removeClass('df-loading df-init');
                this.viewer.onReady();
                this.analytics({
                    eventAction: this.options.analyticsViewerReady,
                    options: this.options
                });
                this.executeCallback('onReady');
                if (this.options.dataElement.hasClass("df-hash-focused") === true) {
                    app_utils.focusHash(this.options.dataElement);
                    this.options.dataElement.removeClass("df-hash-focused");
                }
                if (this.hashNavigationEnabled === true) this.getURLHash();
                app_utils.log("App Finalized");
            }
        },
        {
            key: "initOutline",
            value: function initOutline() {
                var app = this;
                var outlineContainer = app_jQuery('<div>').addClass("df-outline-container df-sidemenu");
                outlineContainer.append('<div class="df-sidemenu-title">' + this.options.text.outlineTitle + '</div>');
                var outlineWrapper = app_jQuery('<div>').addClass("df-wrapper");
                outlineContainer.append(outlineWrapper);
                app.sideMenu.element.append(outlineContainer);
                app.outlineContainer = outlineContainer;
                app.outlineViewer = new BookMarkViewer({
                    container: outlineWrapper[0],
                    linkService: app.provider.linkService,
                    outlineItemClass: "df-outline-item",
                    outlineToggleClass: "df-outline-toggle",
                    outlineToggleHiddenClass: "df-outlines-hidden"
                });
                app.outlineViewer.render({
                    outline: app.provider.outline
                });
            }
        },
        {
            key: "initThumbs",
            value: function initThumbs() {
                var app = this;
                app.thumblist = new ThumbList({
                    app: app,
                    addFn: function addFn(row) {},
                    scrollFn: function scrollFn() {
                        app.thumbRequestStatus = app_REQUEST_STATUS.ON;
                    },
                    itemHeight: app.thumbSize,
                    itemWidth: app_utils.limitAt(Math.floor(app.dimensions.defaultPage.ratio * app.thumbSize), 32, 180),
                    totalRows: app.pageCount
                });
                app.thumblist.lastScrolled = Date.now();
                app.thumbRequestStatus = app_REQUEST_STATUS.ON;
                var thumbContainer = app_jQuery('<div>').addClass("df-thumb-container df-sidemenu");
                thumbContainer.append('<div class="df-sidemenu-title">' + this.options.text.thumbTitle + '</div>');
                thumbContainer.append(app_jQuery(app.thumblist.container).addClass("df-wrapper"));
                app.thumbContainer = thumbContainer;
                app.sideMenu.element.append(thumbContainer);
                app.container.on('click', '.df-thumb-container .df-thumb', function(e) {
                    e.stopPropagation();
                    var id = app_jQuery(this).attr("id").replace("df-thumb", "");
                    app.gotoPage(parseInt(id, 10));
                });
            }
        },
        {
            key: "initSearch",
            value: function initSearch() {
                var app = this;
                var searchContainer = app_jQuery('<div>').addClass("df-search-container df-sidemenu");
                searchContainer.append('<div class="df-sidemenu-title">' + this.options.text.searchTitle + '</div>');
                app.searchForm = app_jQuery('<div class="df-search-form">').appendTo(searchContainer);
                app.searchBox = app_jQuery('<input type="text" class="df-search-text" placeholder="' + this.options.text.searchPlaceHolder + '">').on("keyup", function(event) {
                    if (event.keyCode === 13) {
                        app.search();
                    }
                }).appendTo(app.searchForm);
                app.searchButton = app_jQuery('<div class="df-ui-btn df-search-btn df-icon-search">').on("click", function(event) {
                    app.search();
                }).appendTo(app.searchForm);
                app.clearButton = app_jQuery('<a class="df-search-clear">Clear</a>').on("click", function(event) {
                    app.clearSearch();
                }).appendTo(app.searchForm);
                app.searchInfo = app_jQuery('<div class="df-search-info">').appendTo(searchContainer);
                app.searchResults = app_jQuery('<div class="df-wrapper df-search-results">').appendTo(searchContainer);
                app.searchContainer = searchContainer;
                app.sideMenu.element.append(searchContainer);
                app.container.on('click', '.df-search-result', function(e) {
                    e.stopPropagation();
                    var element = app_jQuery(this);
                    var id = element.data("df-page");
                    app.gotoPage(parseInt(id, 10));
                });
            }
        },
        {
            key: "search",
            value: function search(text) {
                if (text == void 0) {
                    text = this.searchBox.val();
                }
                this.provider.search(text.trim());
            }
        },
        {
            key: "clearSearch",
            value: function clearSearch() {
                this.searchBox.val("");
                this.searchInfo.html("");
                this.provider.clearSearch();
            }
        },
        {
            key: "updateSearchInfo",
            value: function updateSearchInfo(message) {
                app_utils.log(message);
                if (this.searchInfo !== void 0) {
                    this.searchInfo.html(message);
                }
            }
        },
        {
            key: "checkRequestQueue",
            value: function checkRequestQueue() {
                var app = this;
                if (app.checkRequestQueue) {
                    requestAnimationFrame(function() {
                        if (app && app.checkRequestQueue) app.checkRequestQueue();
                    });
                }
                if (app.softDisposed) return;
                //region loading & initiaization
                if (app.state != 'ready') {
                    if (app.state === 'loading' && this.isDocumentReady === true && this.isViewerPrepared === true && this.isExternalReady === true) {
                        app.state = 'finalizing'; //need to add ahead else it can keep running multiple times if the funcion throws error.
                        this.finalizeComponents();
                    }
                    if (app.state === 'finalizing') {
                        app.state = 'ready';
                        app.finalize();
                    }
                    return;
                }
                //endregion
                //offsetParent changes when display : none to block changes, scenarios in tab
                if (app.container && app.container[0] && app._offsetParent !== app.container[0].offsetParent) {
                    app._offsetParent = app.container[0].offsetParent;
                    if (app._offsetParent !== null) {
                        app.resize();
                        app.resizeRequestStatus = app_REQUEST_STATUS.OFF;
                    }
                    app_utils.log("Visibility Resize Detected");
                }
                if (app._offsetParent === null && !app.isFullscreen) return;
                // Removed since stage.render() is called from app.viewer.render(); - encapsulated
                // if (app.viewer.stage && app.viewer.stage.render)
                //   app.viewer.stage.render();
                if (TWEEN.getAll().length > 0) {
                    TWEEN.update();
                    app.renderRequestStatus = app_REQUEST_STATUS.ON;
                }
                if (app.resizeRequestStatus === app_REQUEST_STATUS.ON) {
                    app.resizeRequestStatus = app_REQUEST_STATUS.OFF;
                    app.resize();
                } else if (app.resizeRequestStatus === app_REQUEST_STATUS.COUNT) {
                    app.resizeRequestCount++;
                    if (app.resizeRequestCount > 10) {
                        app.resizeRequestCount = 0;
                        app.resizeRequestStatus = app_REQUEST_STATUS.ON;
                    }
                }
                if (app.refreshRequestStatus === app_REQUEST_STATUS.ON) {
                    app.refreshRequestStatus = app_REQUEST_STATUS.OFF;
                    app.pendingResize = false;
                    app.viewer.refresh();
                    this.container.removeClass("df-pendingresize");
                } else if (app.refreshRequestStatus === app_REQUEST_STATUS.COUNT) {
                    app.refreshRequestCount++;
                    if (app.refreshRequestCount > 3) {
                        app.refreshRequestCount = 0;
                        app.refreshRequestStatus = app_REQUEST_STATUS.ON;
                    }
                }
                if (app.textureRequestStatus === app_REQUEST_STATUS.ON) {
                    app.processTextureRequest();
                }
                if (app.thumbRequestStatus === app_REQUEST_STATUS.ON) app.processThumbRequest();
                else if (app.thumbRequestStatus === app_REQUEST_STATUS.COUNT) {
                    app.thumbRequestCount++;
                    if (app.thumbRequestCount > 3) {
                        app.thumbRequestCount = 0;
                        app.thumbRequestStatus = app_REQUEST_STATUS.ON;
                    }
                }
                if (app.renderRequestStatus === app_REQUEST_STATUS.ON) {
                    app.viewer.render();
                    app.renderRequestStatus = app_REQUEST_STATUS.OFF;
                }
                app.provider.checkRequestQueue();
                app.viewer.checkRequestQueue();
            }
        },
        {
            key: "processTextureRequest",
            value: function processTextureRequest() {
                // utils.log("Texture Request Preparing");
                var app = this, viewer = this.viewer, provider = this.provider;
                var visible = viewer.getVisiblePages().main, page, textureSize, requestCount = 0, zoomView = app.zoomValue > 1; //this should be independent of zoomview
                if (!viewer.isAnimating() || DEARFLIP.defaults.instantTextureProcess === true) {
                    app_utils.log("Texture Request Working");
                    for(var i = 0; i < visible.length; i++){
                        requestCount = 0;
                        var pageNumber = visible[i];
                        if (pageNumber > 0 && pageNumber <= app.pageCount) {
                            page = zoomView ? viewer.zoomViewer.getPageByNumber(pageNumber) : viewer.getPageByNumber(pageNumber);
                            if (page) {
                                textureSize = viewer.getTextureSize({
                                    pageNumber: pageNumber
                                });
                                if (page.changeTexture(pageNumber, Math.floor(textureSize.height))) {
                                    provider.processPage({
                                        pageNumber: pageNumber,
                                        textureTarget: zoomView ? defaults_DEARVIEWER.TEXTURE_TARGET.ZOOM : defaults_DEARVIEWER.TEXTURE_TARGET.VIEWER
                                    });
                                    requestCount++;
                                    app.viewer.getAnnotationElement(pageNumber, true);
                                }
                            }
                            if (requestCount > 0) break;
                        }
                    }
                    if (requestCount === 0) {
                        app.textureRequestStatus = app_REQUEST_STATUS.OFF;
                    }
                } else {
                    app.textureRequestStatus = app_REQUEST_STATUS.ON;
                }
            }
        },
        {
            key: "applyTexture",
            value: function applyTexture(canvas, param) {
                var app = this;
                var isCanvas = canvas.toDataURL !== void 0;
                if (param.textureTarget === defaults_DEARVIEWER.TEXTURE_TARGET.THUMB) {
                    param.height = canvas.height;
                    param.width = canvas.width;
                    if (!isCanvas) {
                        param.texture = canvas.src;
                    } else {
                        var src = canvas.toDataURL('image/png');
                        app.provider.setCache(param.pageNumber, src, app.thumbSize);
                        param.texture = src;
                    }
                    app.thumblist.setPage(param);
                } else {
                    param.texture = isCanvas ? canvas : canvas.src;
                    var set = app.viewer.setPage(param);
                    if (set === true) {
                        app.provider.processAnnotations(param.pageNumber, app.viewer.getAnnotationElement(param.pageNumber, true));
                        app.provider.processTextContent(param.pageNumber, app.viewer.getTextElement(param.pageNumber, true));
                    }
                }
            }
        },
        {
            key: "processThumbRequest",
            value: function processThumbRequest() {
                if (this.thumblist !== null && this.thumblist !== undefined) this.thumblist.processThumbRequest();
            }
        },
        {
            key: "refreshRequestStart",
            value: function refreshRequestStart() {
                this.refreshRequestStatus = app_REQUEST_STATUS.COUNT;
                this.refreshRequestCount = 0;
            }
        },
        {
            key: "renderRequestStart",
            value: function renderRequestStart() {
                this.renderRequestStatus = app_REQUEST_STATUS.ON;
            }
        },
        {
            key: "resizeRequestStart",
            value: function resizeRequestStart() {
                this.resizeRequestStatus = app_REQUEST_STATUS.ON;
            }
        },
        {
            key: "zoom",
            value: function zoom(delta) {
                var app = this;
                app.pendingZoom = true;
                app.zoomDelta = delta;
                app.resize();
            }
        },
        {
            key: "resetZoom",
            value: function resetZoom() {
                if (this.zoomValue !== 1) {
                    this.zoomValue = 1.001;
                    this.zoom(-1);
                }
            }
        },
        {
            key: "calculateLayout",
            value: function calculateLayout() {
                var app = this, isSideMenuOpen = app.isSideMenuOpen = app.container.hasClass("df-sidemenu-open"), dimensions = app.dimensions, padding = app.dimensions.padding, windowHeight = app_jQuery(window).height();
                // region Calculation of Offset and Padding
                dimensions.offset = {
                    top: 0,
                    left: !app.options.sideMenuOverlay && isSideMenuOpen && !app.isRTL ? 220 : 0,
                    right: !app.options.sideMenuOverlay && isSideMenuOpen && app.isRTL ? 220 : 0,
                    bottom: 0,
                    width: !app.options.sideMenuOverlay && isSideMenuOpen ? 220 : 0
                };
                app.viewerContainer.css({
                    left: dimensions.offset.left,
                    right: dimensions.offset.right
                });
                var controlsHeight = dimensions.controlsHeight = app.container.find(".df-ui").height();
                padding.top = app.options.paddingTop + (app.options.controlsPosition === defaults_DEARVIEWER.CONTROLS_POSITION.TOP ? controlsHeight : 0);
                padding.left = app.options.paddingLeft;
                padding.right = app.options.paddingRight;
                padding.bottom = app.options.paddingBottom + (app.options.controlsPosition === defaults_DEARVIEWER.CONTROLS_POSITION.BOTTOM ? controlsHeight : 0);
                padding.height = padding.top + padding.bottom;
                padding.width = padding.left + padding.right;
                padding.heightDiff = padding.top - padding.bottom;
                padding.widthDiff = padding.left - padding.right;
                //endregion
                //Priority: (isFullSize|isLockedHeight > isLockedHeight) > autoHeight
                dimensions.isFullSize = app.isFullscreen === true;
                dimensions.isFixedHeight = dimensions.isFullSize || !dimensions.isAutoHeight;
                dimensions.containerWidth = dimensions.isFullSize ? app_jQuery(window).width() : this.element.width();
                app.container.toggleClass('df-xs', dimensions.containerWidth < 400).toggleClass('df-xss', dimensions.containerWidth < 320);
                var _app_options_headerElementSelector, _jQuery_height;
                //region Determine MaxHeight
                dimensions.maxHeight = windowHeight - (dimensions.containerWidth > 600 ? (_jQuery_height = app_jQuery((_app_options_headerElementSelector = app.options.headerElementSelector) !== null && _app_options_headerElementSelector !== void 0 ? _app_options_headerElementSelector : "#wpadminbar").height()) !== null && _jQuery_height !== void 0 ? _jQuery_height : 0 : 0);
                if (dimensions.isFixedHeight) {
                    if (dimensions.isFullSize) {
                        dimensions.maxHeight = windowHeight;
                    } else {
                        //locked height but not in fullsize
                        //incase height is restricted by value provided by user, we need to determine that first
                        //test height on element, but apply on container.
                        app.element.height(app.options.height);
                        var _height = app.element.height();
                        dimensions.maxHeight = Math.min(_height, dimensions.maxHeight);
                    }
                } else {}
                //endregion
                //Reference size is not the cover page. IT IS THE VIRTUAL AVAILABLE ZONE
                //we have outerWidth, it gives innerwidth
                //with innerwidth we get innerheight and then outerHeight
                //app should only store outerWidth and outerHeight
                var outerWidth = dimensions.width, innerWidth = dimensions.stage.innerWidth = this.viewer._getInnerWidth(), innerHeight = dimensions.stage.innerHeight = this.viewer._getInnerHeight(), outerHeight = this.viewer._getOuterHeight(innerHeight + dimensions.padding.height);
                dimensions.containerHeight = dimensions.isFullSize ? windowHeight : outerHeight;
                app.element.height(dimensions.containerHeight);
                //Case when User sets height through CSS override.  #199
                var testHeight = app.element.height();
                if (!dimensions.isFullSize && testHeight != dimensions.containerHeight) {
                    dimensions.containerHeight = testHeight;
                    dimensions.stage.innerHeight = testHeight - dimensions.padding.height;
                    dimensions.stage.height = testHeight;
                }
                /*ZOOM values*/ dimensions.origin = {
                    x: (padding.widthDiff + dimensions.containerWidth - dimensions.offset.left - dimensions.offset.right) / 2,
                    y: (padding.heightDiff + dimensions.containerHeight) / 2
                };
                app.viewer.determinePageMode();
            }
        },
        {
            key: "resize",
            value: function resize() {
                var textureRefresh = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
                app_utils.log("Resize Request Initiated");
                var app = this;
                this.calculateLayout();
                app.viewer.handleZoom();
                app.viewer.resize();
                if (textureRefresh === false) return;
                if (app.pendingZoom) {
                    this.viewer.refresh();
                    app_utils.log("Pending Zoom updated");
                } else this.refreshRequestStart();
                this.ui.update();
                this.renderRequestStatus = app_REQUEST_STATUS.ON;
                app.zoomChanged = false;
                app.pendingZoom = false;
                this.executeCallback('afterResize');
            }
        },
        {
            key: "hasOutline",
            value: function hasOutline() {
                if (this.provider.outline.length > 0) return true;
            }
        },
        {
            key: "switchFullscreen",
            value: function switchFullscreen() {
                var _app_ui_controls, _app_ui;
                var app = this;
                // ui = viewer.ui;
                var element = app.container[0];
                app.container.toggleClass("df-fullscreen", app.isFullscreen !== true);
                if (app === null || app === void 0 ? void 0 : (_app_ui = app.ui) === null || _app_ui === void 0 ? void 0 : (_app_ui_controls = _app_ui.controls) === null || _app_ui_controls === void 0 ? void 0 : _app_ui_controls.fullscreen) app.ui.controls.fullScreen.toggleClass(app.options.icons["fullscreen-off"], app.isFullscreen !== true);
                if (app.isFullscreen !== true) {
                    var _promise = null;
                    //noinspection JSUnresolvedVariable
                    if (element['requestFullscreen']) {
                        _promise = element['requestFullscreen']();
                    } else if (element['msRequestFullscreen']) {
                        _promise = element['msRequestFullscreen']();
                    } else if (element['mozRequestFullScreen']) {
                        _promise = element['mozRequestFullScreen']();
                    } else if (element['webkitRequestFullscreen']) {
                        _promise = element['webkitRequestFullscreen']();
                    }
                    if (_promise && _promise["then"]) {
                        _promise.then(function() {
                            app.refreshRequestStatus === app_REQUEST_STATUS.ON;
                            app.resize();
                        });
                    }
                    app.isFullscreen = true;
                } else {
                    app.isFullscreen = false;
                    if (document['exitFullscreen']) {
                        if (document.fullscreenElement) document['exitFullscreen']();
                    } else if (document['msExitFullscreen']) {
                        document['msExitFullscreen']();
                    } else if (document['mozCancelFullScreen']) {
                        document['mozCancelFullScreen']();
                    } else if (document['webkitExitFullscreen']) {
                        document['webkitExitFullscreen']();
                    }
                    // if (app.options.autoLightBoxFullscreen === true && app.options.isLightBox === true) {
                    //   DEARFLIP.activeLightBox.close();
                    // }
                    if (!app_utils.hasFullscreenEnabled()) {
                        app.container[0].scrollIntoView();
                    }
                }
                if (!app_utils.hasFullscreenEnabled()) {
                    app.resizeRequestStatus = app_REQUEST_STATUS.ON;
                }
            }
        },
        {
            //region Navigation
            key: "next",
            value: function next() {
                this.jumpBy(this.jumpStep);
            }
        },
        {
            key: "prev",
            value: function prev() {
                this.jumpBy(-this.jumpStep);
            }
        },
        {
            key: "jumpBy",
            value: function jumpBy(step) {
                var nextPage = this.currentPageNumber + step;
                nextPage = app_utils.limitAt(nextPage, this.startPage, this.endPage);
                if (this.anyFirstPageChanged != true) {
                    this.analytics({
                        eventAction: this.options.analyticsFirstPageChange,
                        options: this.options
                    });
                    this.anyFirstPageChanged = true;
                }
                this.gotoPage(nextPage);
                this.ui.update();
            }
        },
        {
            key: "openRight",
            value: function openRight() {
                this.isRTL ? this.prev() : this.next();
            }
        },
        {
            key: "openLeft",
            value: function openLeft() {
                this.isRTL ? this.next() : this.prev();
            }
        },
        {
            key: "start",
            value: function start() {
                this.gotoPage(this.startPage);
            }
        },
        {
            key: "end",
            value: function end() {
                this.gotoPage(this.endPage);
            }
        },
        {
            key: "gotoPage",
            value: function gotoPage(pageNumber) {
                var app = this;
                pageNumber = app.getValidPage(parseInt(pageNumber, 10));
                if (app.viewer === null || app.viewer.validatePageChange(pageNumber) === false) return;
                this.executeCallback('beforePageChanged');
                app.requestDestRefKey = undefined;
                app.container.removeClass('df-fetch-pdf');
                app.oldPageNumber = app.currentPageNumber;
                app.currentPageNumber = pageNumber;
                app.thumbRequestStatus = app_REQUEST_STATUS.ON;
                if (app.viewer.gotoPageCallBack) app.viewer.gotoPageCallBack();
                app.ui.update();
                if (this.autoPlay == true) {
                    this.setAutoPlay(this.autoPlay);
                }
                if (this.hashNavigationEnabled === true) this.getURLHash();
                this.executeCallback('onPageChanged');
            }
        },
        {
            key: "gotoPageLabel",
            value: function gotoPageLabel(pageLabel) {
                this.gotoPage(this.provider.getPageNumberForLabel(pageLabel.toString().trim()));
            }
        },
        {
            key: "getCurrentLabel",
            value: function getCurrentLabel() {
                return this.provider.getLabelforPage(this.currentPageNumber);
            }
        },
        {
            key: "autoPlayFunction",
            value: function autoPlayFunction() {
                if (this && this.autoPlay) {
                    var nextPage = app_utils.limitAt(this.currentPageNumber + this.jumpStep, this.startPage, this.endPage);
                    if (nextPage !== this.currentPageNumber) {
                        this.next();
                    } else {
                        this.setAutoPlay(false);
                    }
                }
            }
        },
        {
            key: "setAutoPlay",
            value: function setAutoPlay(isPlay) {
                if (this.options.autoPlay) {
                    isPlay = isPlay == true;
                    var text = isPlay ? this.options.text.pause : this.options.text.play;
                    this.ui.controls.play.toggleClass(this.options.icons['pause'], isPlay);
                    this.ui.controls.play.html("<span>" + text + "</span>");
                    this.ui.controls.play.attr("title", text);
                    clearInterval(this.autoPlayTimer);
                    if (isPlay) {
                        this.autoPlayTimer = setInterval(this.autoPlayFunction.bind(this), this.options.autoPlayDuration);
                    }
                    this.autoPlay = isPlay;
                }
            }
        },
        {
            //endregion
            key: "isValidPage",
            value: function isValidPage(pageNumber) {
                return this.provider._isValidPage(pageNumber);
            }
        },
        {
            key: "getValidPage",
            value: function getValidPage(pageNumber) {
                var app = this;
                if (isNaN(pageNumber)) pageNumber = app.currentPageNumber;
                else if (pageNumber < 1) pageNumber = 1;
                else if (pageNumber > app.pageCount) pageNumber = app.pageCount;
                return pageNumber;
            }
        },
        {
            key: "getURLHash",
            value: function getURLHash() {
                if (this.options.id != null) {
                    var hash = app_utils.getSharePrefix(this.options.sharePrefix) + (this.options.slug != null ? this.options.slug : this.options.id) + "/";
                    if (this.currentPageNumber != null) {
                        hash += this.currentPageNumber + "/";
                    }
                    history.replaceState(undefined, undefined, "#" + hash);
                }
                return window.location.href;
            }
        },
        {
            key: "executeCallback",
            value: function executeCallback(callbackName) {}
        },
        {
            key: "analytics",
            value: function analytics(eventData) {}
        }
    ]);
    return App;
}();
defaults_DEARVIEWER.prepareOptions = function(options) {
    //convert the element to jQuery Element
    if (!app_instanceof(options.element, app_jQuery)) options.element = app_jQuery(options.element);
    var element = options.element;
    /**
   * @type {jQuery|HTMLElement} - is useful when lightbox is displayed in one location but the options are pulled from another button or thumb element. Used by internal lightbox. No external use.
   */ if (options.dataElement == null) {
        options.dataElement = element;
    }
    var dataElement = options.dataElement;
    //region Merge Options
    var elementOptions = defaults_DEARVIEWER.utils.getOptions(dataElement);
    var customOptions = app_jQuery.extend(true, {}, defaults_DEARVIEWER.defaults, options, elementOptions);
    customOptions = app_utils.fallbackOptions(customOptions);
    app_utils.log(customOptions);
    //Note: ... spread will overwrite undefined variables too and won't perform deep scan
    var opts = app_jQuery.extend(true, {}, defaults_DEARVIEWER._defaults, customOptions);
    //endregion
    //check for mobile ViewerType
    if (app_utils.isMobile && typeof defaults_DEARVIEWER.viewers[opts.mobileViewerType] == "function") {
        opts.viewerType = opts.mobileViewerType;
    }
    if (typeof defaults_DEARVIEWER.viewers[opts.viewerType] !== "function") {
        console.warn("Invalid Viewer Type! " + opts.viewerType + " | Using default Viewer!");
        opts.viewerType = defaults_DEARVIEWER.viewers.default;
    } else {
        opts.viewerType = defaults_DEARVIEWER.viewers[opts.viewerType];
    }
    opts = app_utils.finalizeOptions(app_utils.sanitizeOptions(opts));
    return opts;
};
defaults_DEARVIEWER.Application = function(options) {
    var opts = defaults_DEARVIEWER.prepareOptions(options);
    var app = new App(opts);
    options.element.data("df-app", app);
    if (opts.id != null && opts.isLightBox !== true) {
        window[opts.id.toString()] = app;
    }
    return app;
};
//region jQuery Extension and Triggers
//jQuery Extension
app_jQuery.fn.extend({
    dearviewer_options: function dearviewer_options(options) {
        if (options == null) options = {};
        options.element = app_jQuery(this);
        return new defaults_DEARVIEWER.prepareOptions(options);
    },
    dearviewer: function dearviewer(options) {
        if (options == null) options = {};
        options.element = app_jQuery(this);
        return new defaults_DEARVIEWER.Application(options);
    }
});


;// CONCATENATED MODULE: ./src/js/common-pro.js
function _define_property(obj, key, value) {
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
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}





defaults_DEARVIEWER.defaults.search = true;
App.prototype.executeCallback = function(callbackName) {
    if (this.options && typeof this.options[callbackName] === "function") this.options[callbackName](this);
};
App.prototype.analytics = function(eventData) {
    if (this.options.enableAnalytics == true) {
        try {
            var options = eventData.options, eventLabel = undefined;
            if (options) {
                eventLabel = options.bookTitle || options.slug || options.id;
            }
            var analyticsTag = window.gtag;
            if (analyticsTag) {
                analyticsTag('event', eventData.eventAction, {
                    'event_category': options.analyticsEventCategory,
                    'event_label': eventLabel
                });
            } else {
                var analytics = window.ga || window.__gaTracker;
                analytics("send", {
                    hitType: 'event',
                    eventCategory: options.analyticsEventCategory,
                    eventAction: eventData.eventAction,
                    eventLabel: eventLabel
                });
            }
        } catch (e) {
        //silent suppress
        }
    }
};
defaults_DEARVIEWER.executeCallback = function(functionName) {
    var context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : window;
    if (typeof context[functionName] === 'function') {
        context[functionName]();
    }
};
defaults_DEARVIEWER.openAttachmentLightBoxes = function() {
    //opening lightbox in attachment page.
    var attachments = jQuery("body .df-auto-open-lightbox");
    if (attachments.length > 0) {
        jQuery(attachments[0]).trigger("click");
    }
    //Deeplink on same page #392
    jQuery(window).on('hashchange', function(e) {
        var hash = location.hash;
        if (hash && hash.length > 5) {
            defaults_DEARVIEWER.hashFocusBookFound = false;
            utils.detectHash();
        }
    });
};
DocumentProvider.prototype.processCustomLinks = function(pageNumber, element) {
    var provider = this, app = this.app;
    if (app.options.enableAnnotation === false || !provider._isValidPage(pageNumber) || element == null) return;
    var pageNumberToRender = app.viewer.getDocumentPageNumber(pageNumber);
    var links = app.options.links;
    if (links != null && links[pageNumberToRender] != null) {
        var pageLinks = links[pageNumberToRender];
        for(var index = 0; index < pageLinks.length; index++){
            var pageLink = pageLinks[index];
            var annotation = void 0;
            if (pageLink.dest && pageLink.dest.indexOf && pageLink.dest.indexOf('[html]') == 0) {
                annotation = document.createElement('div');
                annotation.innerHTML = pageLink.dest.substr(6);
                annotation.className = "customHtmlAnnotation";
            } else {
                annotation = document.createElement('a');
                annotation.setAttribute("dest", pageLink.dest);
                annotation.className = "customLinkAnnotation";
                annotation.href = "#" + pageLink.dest;
                annotation.onclick = function() {
                    var dest = this.getAttribute("dest");
                    if (dest) {
                        provider.linkService.customNavigateTo(dest);
                    }
                    return false;
                };
            }
            annotation.style.left = pageLink.x + "%";
            annotation.style.top = pageLink.y + "%";
            annotation.style.width = pageLink.w + "%";
            annotation.style.height = pageLink.h + "%";
            element.appendChild(annotation);
        }
    }
};
function detectHitItems(items, textOffsets, searchHits) {
    var searchItems = [];
    var hitOverFlow = false, hitLength = 0, start = 0, end = 0, hitLocation = void 0, hitIndex = 0;
    for(var itemIndex = 0; itemIndex < items.length; itemIndex++){
        var item = _object_spread({}, items[itemIndex]);
        start = textOffsets[itemIndex].offset;
        end = start + textOffsets[itemIndex].length;
        if (hitOverFlow == false) {
            var _searchHits_hitIndex, _searchHits_hitIndex1;
            hitLocation = (_searchHits_hitIndex = searchHits[hitIndex]) === null || _searchHits_hitIndex === void 0 ? void 0 : _searchHits_hitIndex.index;
            hitLength = (_searchHits_hitIndex1 = searchHits[hitIndex]) === null || _searchHits_hitIndex1 === void 0 ? void 0 : _searchHits_hitIndex1.length;
        }
        while(hitLocation >= start && hitLocation < end){
            if (!item.searchHits) {
                item.searchHits = [];
            }
            item.searchHits.push({
                start: hitLocation - start,
                length: hitLength,
                text: searchHits[hitIndex].text
            });
            if (item.searchHits.length == 1) {
                searchItems.push(item);
            }
            if (hitLocation + hitLength > end) {
                hitLength = hitLocation + hitLength - end;
                hitLocation = end; //hitOverflow detected on the same hitIndexx
                hitOverFlow = true;
            } else {
                var _searchHits_hitIndex2, _searchHits_hitIndex3;
                hitIndex++;
                hitOverFlow = false;
                hitLocation = (_searchHits_hitIndex2 = searchHits[hitIndex]) === null || _searchHits_hitIndex2 === void 0 ? void 0 : _searchHits_hitIndex2.index;
                hitLength = (_searchHits_hitIndex3 = searchHits[hitIndex]) === null || _searchHits_hitIndex3 === void 0 ? void 0 : _searchHits_hitIndex3.length;
            }
        }
    }
    return searchItems;
}
PDFDocumentProvider.prototype.processTextContent = function(pageNumber, element) {
    // return; //too much costly https://github.com/deepak-ghimire/dearviewer/issues/337
    var provider = this, app = this.app;
    if (!provider._isValidPage(pageNumber) || element == null) return;
    var createAutoLinks = app.options.enableAnnotation === true && app.options.enableAutoLinks === true;
    if (!createAutoLinks && app.options.showSearchControl === false) return;
    var pageNumberToRender = app.viewer.getDocumentPageNumber(pageNumber);
    element.innerHTML = "";
    provider.pdfDocument.getPage(pageNumberToRender).then(/**
     * @param {PDFPage} page
     */ function(page) {
        var viewport = page.getViewport({
            scale: 1,
            rotation: page._pageInfo.rotate + app.options.pageRotation
        });
        viewport = page.getViewport({
            scale: app.viewer.getTextureSize({
                pageNumber: pageNumber,
                isAnnotation: true
            }).height / (viewport.height * app.options.pixelRatio),
            rotation: page._pageInfo.rotate + app.options.pageRotation
        });
        element.parentNode.style.setProperty('--scale-factor', viewport.scale);
        page.getTextContent().then(function(textData) {
            var // console.log(performance.now());
            _app_viewer;
            provider.prepareTextContent(textData, pageNumberToRender);
            var autoLinkItems = provider.autoLinkItemsCache[pageNumberToRender], autoLinkHits = provider.autoLinkHitsCache[pageNumberToRender], searchItems = provider.searchHitItemsCache[pageNumberToRender], searchHits = provider.searchHits[pageNumber], textOffsets = provider.textOffset[pageNumberToRender];
            if (createAutoLinks === true && autoLinkItems == void 0) {
                autoLinkItems = [];
                autoLinkHits = utils.urlify(provider.textContentJoined[pageNumberToRender]);
                // console.log(autoLinkHits);
                var PDFlinks = provider.PDFLinkItemsCache[pageNumberToRender];
                if (PDFlinks && PDFlinks.length < 5) {
                    PDFlinks = void 0;
                }
                /*          for (let itemIndex = 0; itemIndex < textData.items.length; itemIndex++) {
                      let item = textData.items[itemIndex];
                      if (item.str.length < 5) continue; //minimum url is ab.us
                      let test = utils.urlify(item.str);
                      if (test !== item.str) {
                        item.autolinkHTML = test;
                        autoLinkItems.push(item);
                      }
                    }*/ autoLinkItems = detectHitItems(textData.items, textOffsets, autoLinkHits);
                provider.autoLinkItemsCache[pageNumberToRender] = autoLinkItems;
                provider.autoLinkHitsCache[pageNumberToRender] = autoLinkHits;
            }
            //Find Items that match search hits
            if (searchItems == void 0 && provider.textOffsetSearch[pageNumberToRender] != void 0 && searchHits && searchHits.length > 0) {
                searchItems = detectHitItems(textData.items, provider.textOffsetSearch[pageNumberToRender], searchHits);
                provider.searchHitItemsCache[pageNumberToRender] = searchItems;
            }
            //Render Autolinks
            provider.renderAutoLinks(autoLinkItems, textData, element, viewport);
            //Render Search Items
            provider.renderSearchHits(searchItems, textData, element, viewport);
            app === null || app === void 0 ? void 0 : (_app_viewer = app.viewer) === null || _app_viewer === void 0 ? void 0 : _app_viewer.finalizeTextContent(element, pageNumber);
        });
    });
};
PDFDocumentProvider.prototype.renderAutoLinks = function(autoLinkItems, textData, element, viewport) {
    if (autoLinkItems && autoLinkItems.length > 0) {
        var divAutoLink = jQuery(element).siblings(".df-auto-link-content");
        if (divAutoLink.length === 0) {
            divAutoLink = jQuery('<div class="df-auto-link-content">');
            jQuery(element).parent().prepend(divAutoLink);
        }
        divAutoLink.html("");
        textData.items = autoLinkItems;
        var finalString = "";
        var task, taskPromise;
        if (pdfjsLib.TextLayer) {
            task = new pdfjsLib.TextLayer({
                textContentSource: textData,
                viewport: viewport,
                container: divAutoLink[0]
            });
            taskPromise = task.render();
        } else {
            task = pdfjsLib.renderTextLayer({
                textContentSource: textData,
                textContent: textData,
                container: divAutoLink[0],
                viewport: viewport,
                textDivs: []
            });
            taskPromise = task.promise;
        }
        // console.log(performance.now());
        var index = 0;
        taskPromise.then(function(data) {
            var _task_textDivs;
            var divs = (_task_textDivs = task.textDivs) !== null && _task_textDivs !== void 0 ? _task_textDivs : task._textDivs;
            divs.forEach(function(div) {
                var item = textData.items[index];
                var _html = "", pos = 0, length = 0, _searchPart = 0, text = '', url = '';
                for(_searchPart = 0; _searchPart < item.searchHits.length; _searchPart++){
                    _html += item.str.substring(pos, item.searchHits[_searchPart].start);
                    pos = item.searchHits[_searchPart].start;
                    length = item.searchHits[_searchPart].length;
                    text = item.str.substring(pos, pos + length);
                    url = item.searchHits[_searchPart].text;
                    if (url === void 0) continue;
                    if (text.indexOf("@") > 0) {
                        url = url.toLowerCase();
                        if (url.indexOf("mailto:" === -1)) url = "mailto:" + text;
                        _html += '<a href="' + url + '" ' + 'class="df-autolink" target="_blank">' + text + '</a>';
                    } else {
                        if (url.indexOf('www.') === 0) {
                            url = 'http://' + url;
                        }
                        _html += '<a href="' + url + '" class="df-autolink" target="_blank">' + text + '</a>';
                    }
                    utils.log("AutoLink: " + url + " for " + text);
                    pos += length;
                }
                //last remaining part
                _html += item.str.substring(pos, item.str.length);
                index++;
                div.innerHTML = _html;
            });
        });
    // for (let divCount = 0; divCount < task._textDivs.length; divCount++) {
    //   task._textDivs[divCount].innerHTML = autoLinkItems[divCount].autolinkHTML;
    // }
    }
};
PDFDocumentProvider.prototype.renderSearchHits = function(searchItems, textData, element, viewport) {
    if (searchItems && searchItems.length > 0) {
        textData.items = searchItems;
        var task, taskPromise;
        if (pdfjsLib.TextLayer) {
            task = new pdfjsLib.TextLayer({
                textContentSource: textData,
                viewport: viewport,
                container: element
            });
            taskPromise = task.render();
        } else {
            task = pdfjsLib.renderTextLayer({
                textContentSource: textData,
                textContent: textData,
                container: element,
                viewport: viewport,
                textDivs: []
            });
            taskPromise = task.promise;
        }
        var index = 0;
        taskPromise.then(function() {
            var _task_textDivs;
            var divs = (_task_textDivs = task.textDivs) !== null && _task_textDivs !== void 0 ? _task_textDivs : task._textDivs;
            divs.forEach(function(div) {
                var item = textData.items[index];
                var _html = "", pos = 0, length = 0, _searchPart = 0;
                for(_searchPart = 0; _searchPart < item.searchHits.length; _searchPart++){
                    _html += item.str.substring(pos, item.searchHits[_searchPart].start);
                    pos = item.searchHits[_searchPart].start;
                    length = item.searchHits[_searchPart].length;
                    _html += '<span class="df-search-highlight">' + item.str.substring(pos, pos + length) + '</span>';
                    pos += length;
                }
                //last remaining part
                _html += item.str.substring(pos, item.str.length);
                index++;
                div.innerHTML = _html;
                div.classList += " df-search-hits";
            });
        });
    }
};
PDFDocumentProvider.prototype.processAnnotations = function(pageNumber, element) {
    var provider = this, app = this.app;
    if (app.options.enableAnnotation === false || !provider._isValidPage(pageNumber) || element == null) return;
    var pageNumberToRender = app.viewer.getDocumentPageNumber(pageNumber);
    provider.pdfDocument.getPage(pageNumberToRender).then(/**
     * @param {PDFPage} page
     */ function(page) {
        var viewport = page.getViewport({
            scale: 1,
            rotation: page._pageInfo.rotate + app.options.pageRotation
        });
        viewport = page.getViewport({
            scale: app.viewer.getTextureSize({
                pageNumber: pageNumber,
                isAnnotation: true
            }).height / (viewport.height * app.options.pixelRatio),
            rotation: page._pageInfo.rotate + app.options.pageRotation
        });
        page.getAnnotations().then(function(annotationsData) {
            if (app.options === null || app.viewer === null || annotationsData.length == 0) return;
            viewport = viewport.clone({
                dontFlip: true
            });
            var parameters = {
                annotations: annotationsData,
                div: element,
                page: page,
                viewport: viewport,
                imageResourcesPath: app.options.imageResourcesPath,
                linkService: provider.linkService
            };
            //since 3.8 Annotation Layer is no more static
            if (pdfjsLib.AnnotationLayer.hasOwnProperty('render')) {
                pdfjsLib.AnnotationLayer.render(parameters);
            // pdfjsLib.AnnotationLayer.update(parameters);
            } else {
                //3.8 or more needs AnnoationLayer object
                var annotationLayer = new pdfjsLib.AnnotationLayer(parameters);
                annotationLayer.render(parameters);
            }
            if (app.options.annotationClass && app.options.annotationClass !== "") {
                jQuery(element).find(" > section").addClass(app.options.annotationClass);
            }
            if (provider.PDFLinkItemsCache[pageNumberToRender] == void 0) {
                var pdfLinks = "," + jQuery(element).find("a:not([href^='#'])").map(function() {
                    return jQuery(this).attr("href");
                }).get().join(",") + ",";
            // provider.PDFLinkItemsCache[pageNumberToRender] = pdfLinks.replaceAll("https://", "").replaceAll("http://", "").replaceAll("/", "");
            }
            provider.processCustomLinks(pageNumber, element);
            app.viewer.finalizeAnnotations(element, pageNumber);
        });
    });
};
ImageDocumentProvider.prototype.processAnnotations = function(pageNumber, element) {
    this.processCustomLinks(pageNumber, element);
    this.app.viewer.finalizeAnnotations(element, pageNumber);
};
defaults_DEARVIEWER.getPDFThumb = function(options) {
    var parameters = {};
    parameters.url = utils.httpsCorrection(options.pdfURL);
    parameters.rangeChunkSize = 524288;
    parameters.cMapPacked = true;
    parameters.disableAutoFetch = true;
    parameters.disableStream = true;
    parameters.disableFontFace = defaults_DEARVIEWER.defaults.disableFontFace;
    parameters.isEvalSupported = false;
    parameters.cMapUrl = defaults_DEARVIEWER.defaults.cMapUrl;
    parameters.imagesLocation = defaults_DEARVIEWER.defaults.imagesLocation;
    parameters.imageResourcesPath = defaults_DEARVIEWER.defaults.imageResourcesPath;
    var progress = pdfjsLib.getDocument(parameters);
    var pdfDoc = progress.promise.then(function(pdf) {
        pdf.getPage(1).then(function(pdfPage) {
            var scale = 1;
            var canvas = document.createElement('canvas'), viewport = pdfPage.getViewport({
                scale: scale
            });
            if (viewport.width > viewport.height) {
                scale = scale * 400 / viewport.width;
            } else {
                scale = scale * 400 / viewport.height;
            }
            viewport = pdfPage.getViewport({
                scale: scale
            });
            canvas.height = Math.floor(viewport.height);
            canvas.width = Math.floor(viewport.width);
            var pageRendering = pdfPage.render({
                canvas: canvas,
                canvasContext: canvas.getContext('2d'),
                viewport: viewport
            });
            pageRendering.promise.then(function() {
                var _options_callback;
                var src = canvas.toDataURL('image/jpeg', 0.9);
                (_options_callback = options.callback) === null || _options_callback === void 0 ? void 0 : _options_callback.call(options, src);
                if (pdfDoc.destroy) pdfDoc.destroy();
                if (progress.destroy) progress.destroy();
                pdfDoc = null;
                progress = null;
            });
        });
    });
    progress.onProgress = function getDocumentProgress(progressData) {
        // if (app !== null) {
        var percentage = 100 * progressData.loaded / progressData.total;
        if (isNaN(percentage)) {
            if (progressData && progressData.loaded) {
                options.updateInfo("Loading PDF " + (Math.ceil(progressData.loaded / 10000) / 100).toFixed(2).toString() + "MB ...");
            } else {
                options.updateInfo("Loading PDF ...");
            }
        } else {
            options.updateInfo("Loading PDF " + Math.ceil(percentage).toString().split(".")[0] + "% ...");
        }
    // }
    };
};

;// CONCATENATED MODULE: ./src/js/dflip-pro.js
/* globals jQuery, pdfjsLib, THREE */ function dflip_pro_instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}






var dflip_pro_jQuery = defaults_DEARVIEWER.jQuery;
var dflip_pro_DEARFLIP = window.DFLIP = window.DEARFLIP = defaults_DEARVIEWER;
dflip_pro_DEARFLIP.defaults.viewerType = 'flipbook';
dflip_pro_DEARFLIP.defaults.analyticsEventCategory = "Flipbook";
dflip_pro_DEARFLIP.defaults.analyticsViewerReady = "Book Ready";
dflip_pro_DEARFLIP.defaults.analyticsViewerOpen = "Open Book";
dflip_pro_DEARFLIP.defaults.analyticsViewerClose = "Book Closed";
dflip_pro_DEARFLIP.defaults.analyticsFirstPageChange = "First Page Flip";
dflip_pro_DEARFLIP.slug = 'dflip';
dflip_pro_DEARFLIP.locationVar = 'dFlipLocation';
dflip_pro_DEARFLIP.locationFile = "dflip";
//region old Constants
//These are depreciated , so do not use them anymore
dflip_pro_DEARFLIP.PAGE_MODE = {
    SINGLE: 1,
    DOUBLE: 2,
    AUTO: null
};
dflip_pro_DEARFLIP.SINGLE_PAGE_MODE = {
    ZOOM: 1,
    BOOKLET: 2,
    AUTO: null
};
dflip_pro_DEARFLIP.CONTROLSPOSITION = {
    HIDDEN: 'hide',
    TOP: 'top',
    BOTTOM: 'bottom'
};
dflip_pro_DEARFLIP.DIRECTION = {
    LTR: 1,
    RTL: 2
};
dflip_pro_DEARFLIP.PAGE_SIZE = {
    AUTO: 0,
    SINGLE: 1,
    DOUBLEINTERNAL: 2
};
//endregion
dflip_pro_DEARFLIP.ConvertPageLinks = function() {
    var w = arguments[0] / 100, h = arguments[1] / 100;
    var toPercent = function toPercent(_x, _y, _w, _h, _dest) {
        return {
            x: _x / w,
            y: _y / h,
            w: _w / w,
            h: _h / h,
            dest: _dest
        };
    };
    var percents = [];
    var input;
    for(var index = 2; index < arguments.length; index++){
        input = arguments[index];
        percents[index - 2] = toPercent.apply(this, input);
    }
    return percents;
};
dflip_pro_DEARFLIP.parseLinks = function(links) {
    var _links;
    if (links != null && links.length > 0) {
        for(var index = 0; index < links.length; index++){
            _links = links[index];
            if (_links != null && _links[0] != null && _links[0].dest == null) {
                _links = dflip_pro_DEARFLIP.ConvertPageLinks.apply(this, _links);
                links[index] = _links;
            }
        }
    }
    return links;
};
dflip_pro_DEARFLIP.parseFallBack = function() {
    //region pre-parse fix for DFLIP
    dflip_pro_jQuery('.df-posts').addClass("dflip-books"); //backward-compatibity
    dflip_pro_jQuery('.dflip-books').addClass("df-posts"); //backward-compatibity
    dflip_pro_jQuery('._df_button, ._df_thumb, ._df_custom, ._df_book, ._df_hidden, ._df_link').each(function() {
        var app = dflip_pro_jQuery(this);
        var isParsed = app.data("df-parsed");
        if (isParsed !== "true") {
            app.addClass("df-element");
            if (app.hasClass("_df_book")) {} else {
                if (app.hasClass("_df_thumb")) {
                    app.attr("data-df-lightbox", "thumb");
                    if (app.attr("thumb") !== void 0) {
                        app.data("df-thumb", app.attr("thumb"));
                    }
                } else if (app.hasClass("_df_button")) {
                    app.attr("data-df-lightbox", "button");
                } else if (app.hasClass("_df_hidden")) {
                    app.attr("data-df-lightbox", "hidden");
                } else if (app.hasClass("_df_link")) {
                    app.attr("data-df-lightbox", "link");
                } else {
                    app.attr("data-df-lightbox", "custom");
                }
            }
        }
    });
//todo update this so that - this is also done in ajax calls, better use in getOptions fallback
//endregion
};
dflip_pro_DEARFLIP.parseBooks = function() {
    dflip_pro_DEARFLIP.parseFallBack();
    dflip_pro_DEARFLIP.parseElements();
};
var updateOptions = function updateOptions(options) {
    if (options.source != null && (Array === options.source.constructor || Array.isArray(options.source) || dflip_pro_instanceof(options.source, Array))) {
        options.providerType = "image";
    }
    //Replaced with cover3DType
    //options.has3DCover = utils.isTrue(options.has3DCover);
    if (options.cover3DType != null) {
        if (options.cover3DType == true || options.cover3DType == "true") {
            options.cover3DType = dflip_pro_DEARFLIP.FLIPBOOK_COVER_TYPE.BASIC;
        } else if (options.cover3DType == false || options.cover3DType == "false") {
            options.cover3DType = dflip_pro_DEARFLIP.FLIPBOOK_COVER_TYPE.NONE;
        }
    }
    //existing but modified
    if (options.pageSize !== void 0) {
        if (options.pageSize === "1" || options.pageSize === 1 || options.pageSize === dflip_pro_DEARFLIP.FLIPBOOK_PAGE_SIZE.SINGLE) {
            options.pageSize = dflip_pro_DEARFLIP.FLIPBOOK_PAGE_SIZE.SINGLE;
        } else if (options.pageSize === "2" || options.pageSize === 2 || options.pageSize === dflip_pro_DEARFLIP.FLIPBOOK_PAGE_SIZE.DOUBLE_INTERNAL) {
            options.pageSize = dflip_pro_DEARFLIP.FLIPBOOK_PAGE_SIZE.DOUBLE_INTERNAL;
        } else if (options.pageSize === dflip_pro_DEARFLIP.FLIPBOOK_PAGE_SIZE.DOUBLE_COVER_BACK) {} else {
            options.pageSize = dflip_pro_DEARFLIP.FLIPBOOK_PAGE_SIZE.AUTO;
        }
    }
    if (options.pageMode !== void 0) {
        if (options.pageMode === "1" || options.pageMode === 1 || options.pageMode === dflip_pro_DEARFLIP.FLIPBOOK_PAGE_MODE.SINGLE) {
            options.pageMode = dflip_pro_DEARFLIP.FLIPBOOK_PAGE_MODE.SINGLE;
        } else if (options.pageMode === "2" || options.pageMode === 2 || options.pageMode === dflip_pro_DEARFLIP.FLIPBOOK_PAGE_MODE.DOUBLE) {
            options.pageMode = dflip_pro_DEARFLIP.FLIPBOOK_PAGE_MODE.DOUBLE;
        } else {
            options.pageMode = dflip_pro_DEARFLIP.FLIPBOOK_PAGE_MODE.AUTO;
        }
    }
    if (options.singlePageMode !== void 0) {
        if (options.singlePageMode === "1" || options.singlePageMode === 1 || options.singlePageMode === dflip_pro_DEARFLIP.FLIPBOOK_SINGLE_PAGE_MODE.ZOOM) {
            options.singlePageMode = dflip_pro_DEARFLIP.FLIPBOOK_SINGLE_PAGE_MODE.ZOOM;
        } else if (options.singlePageMode === "2" || options.singlePageMode === 2 || options.singlePageMode === dflip_pro_DEARFLIP.FLIPBOOK_SINGLE_PAGE_MODE.BOOKLET) {
            options.singlePageMode = dflip_pro_DEARFLIP.FLIPBOOK_SINGLE_PAGE_MODE.BOOKLET;
        } else {
            options.singlePageMode = dflip_pro_DEARFLIP.FLIPBOOK_SINGLE_PAGE_MODE.AUTO;
        }
    }
    if (options.controlsPosition !== void 0) {
        if (options.controlsPosition === "hide") {
            options.controlsPosition = dflip_pro_DEARFLIP.CONTROLS_POSITION.HIDDEN;
        }
    }
    if (options.overwritePDFOutline !== void 0) {
        options.overwritePDFOutline = utils.isTrue(options.overwritePDFOutline);
    }
    //replaced
    if (options.webgl !== void 0) {
        options.is3D = options.webgl = options.webgl;
        delete options.webgl;
    }
    if (options.webglShadow !== void 0) {
        options.has3DShadow = utils.isTrue(options.webglShadow);
        delete options.webglShadow;
    }
    if (options.scrollWheel !== void 0) {
        if (utils.isTrue(options.scrollWheel)) {
            options.mouseScrollAction = dflip_pro_DEARFLIP.MOUSE_SCROLL_ACTIONS.ZOOM;
        }
        delete options.scrollWheel;
    }
    if (options.stiffness !== void 0) {
        delete options.stiffness;
    }
    if (options.soundEnable !== void 0) {
        options.enableSound = utils.isTrue(options.soundEnable);
        delete options.soundEnable;
    }
    if (options.enableDownload !== void 0) {
        options.showDownloadControl = utils.isTrue(options.enableDownload);
        delete options.enableDownload;
    }
    if (options.autoEnableOutline !== void 0) {
        options.autoOpenOutline = utils.isTrue(options.autoEnableOutline);
        delete options.autoEnableOutline;
    }
    if (options.autoEnableThumbnail !== void 0) {
        options.autoOpenThumbnail = utils.isTrue(options.autoEnableThumbnail);
        delete options.autoEnableThumbnail;
    }
    if (options.direction !== void 0) {
        if (options.direction === "2" || options.direction === 2 || options.direction === dflip_pro_DEARFLIP.READ_DIRECTION.RTL) {
            options.readDirection = dflip_pro_DEARFLIP.READ_DIRECTION.RTL;
        } else {
            options.readDirection = dflip_pro_DEARFLIP.READ_DIRECTION.LTR;
        }
        delete options.direction;
    }
    if (options.hard !== void 0) {
        options.flipbookHardPages = options.hard;
        if (options.flipbookHardPages === "hard") {
            options.flipbookHardPages = "all";
        }
        delete options.hard;
    }
    //removed
    //forcefit is no longer required in DearFlip
    if (options.forceFit !== void 0) {
        delete options.forceFit;
    }
    //region ParseLinks
    if (typeof dFlipWPGlobal !== 'undefined' && options.wpOptions === 'true') {
        if (options.linksparsed !== true) {
            options.linksparsed = true;
            var links = [];
            try {
                for(var key in options.links){
                    var _pagelinks = options.links[key];
                    var pagelink = [
                        100,
                        100
                    ];
                    for(var l = 0; l < _pagelinks.length; l++){
                        var _link = _pagelinks[l];
                        var _values = _link.substr(1).slice(0, -1).split(",");
                        var _linkarr = [];
                        for(var v = 0; v < 5; v++){
                            _linkarr[v] = _values[v];
                        }
                        pagelink.push(_linkarr);
                    }
                    links[parseInt(key, 10) + 1] = pagelink;
                }
            } catch (error) {
                console.error(error.stack);
            }
            options.links = dflip_pro_DEARFLIP.parseLinks(links);
        }
    } else {
        options.links = dflip_pro_DEARFLIP.parseLinks(options.links);
    }
    //endregion
    return utils.sanitizeOptions(options);
};
//region jQuery Extension and Triggers
//jQuery Extension
dflip_pro_jQuery.fn.extend({
    flipBook: function flipBook(source, options) {
        if (options == null) options = {};
        options.source = source;
        options.element = dflip_pro_jQuery(this);
        return new defaults_DEARVIEWER.Application(options);
    }
});
//jQuery events
dflip_pro_jQuery(document).ready(function() {
    //Lightbox Trigger
    var body = dflip_pro_jQuery('body');
    dflip_pro_DEARFLIP.executeCallback("beforeDearFlipInit");
    if (typeof window['dFlipWPGlobal'] !== 'undefined') {
        dflip_pro_jQuery.extend(true, dflip_pro_DEARFLIP.defaults, updateOptions(window['dFlipWPGlobal']));
    }
    dflip_pro_DEARFLIP.initUtils();
    dflip_pro_DEARFLIP.initControls();
    body.on('click', '.df-element[data-df-lightbox],.df-element[data-lightbox]', function(event) {
        var element = dflip_pro_jQuery(this);
        var target = element.attr("target"), href = element.attr("href"), isPopup = false;
        if (href === '#' || href === void 0 || element.hasClass("df-hash-focused")) {
            isPopup = true;
        } else if (target === "_self" || target === "_blank") {} else if (target == void 0 && dflip_pro_DEARFLIP.defaults.targetWindow === "_self") {
            element.attr("target", "_self");
        } else if (target == void 0 && dflip_pro_DEARFLIP.defaults.targetWindow === "_blank") {
            element.attr("target", "_blank");
        } else {
            isPopup = true;
        }
        if (isPopup) {
            //incase the element is link type
            event.preventDefault();
            event.stopPropagation();
            dflip_pro_DEARFLIP.openLightBox(element);
        }
    });
    body.on('click', '.df-trigger', function(event) {
        var element = dflip_pro_jQuery(this);
        var target = element.attr("df-trigger");
        dflip_pro_jQuery("[df-trigger-id=" + target + "]").trigger("click");
    });
    dflip_pro_DEARFLIP.checkBrowserURLforDefaults();
    dflip_pro_DEARFLIP.parseCSSElements();
    dflip_pro_DEARFLIP.parseFallBack();
    utils.detectHash();
    dflip_pro_DEARFLIP.parseNormalElements();
    dflip_pro_DEARFLIP.checkBrowserURLforPDF(true);
    dflip_pro_DEARFLIP.openAttachmentLightBoxes();
    dflip_pro_DEARFLIP.executeCallback("afterDearFlipInit");
});
utils.finalizeOptions = function(options) {
    return updateOptions(options);
};
ImageDocumentProvider.prototype.processAnnotations = function(pageNumber, element) {
    this.processCustomLinks(pageNumber, element);
    this.app.viewer.finalizeAnnotations(element, pageNumber);
};
dflip_pro_DEARFLIP.executeCallback("onDearFlipLoad");
/* harmony default export */ var dflip_pro = ((/* unused pure expression or super */ null && (dflip_pro_DEARFLIP)));

}();
/******/ })()
;