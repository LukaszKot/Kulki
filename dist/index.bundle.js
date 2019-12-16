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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Balls.ts":
/*!**********************!*\
  !*** ./src/Balls.ts ***!
  \**********************/
/*! exports provided: Balls */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Balls\", function() { return Balls; });\nvar Balls = /** @class */ (function () {\r\n    function Balls() {\r\n        this.n = 9;\r\n        this.points = 0;\r\n        this.availibleColors = [\"red\", \"green\", \"blue\", \"yellow\", \"pink\", \"black\", \"purple\"];\r\n        this.nextBallsColors = [\"red\", \"green\", \"blue\"];\r\n    }\r\n    Balls.prototype.render = function () {\r\n        this.renderBoard();\r\n        this.renderPoints();\r\n        this.renderNextBallsColors();\r\n    };\r\n    Balls.prototype.renderBoard = function () {\r\n        var _a;\r\n        (_a = document.getElementsByClassName(\"board\")[0]) === null || _a === void 0 ? void 0 : _a.remove();\r\n        var board = document.createElement(\"div\");\r\n        board.classList.add(\"board\");\r\n        for (var i = 0; i < this.n; i++) {\r\n            for (var j = 0; j < this.n; j++) {\r\n                var field = document.createElement(\"div\");\r\n                field.classList.add(\"field\");\r\n                board.appendChild(field);\r\n            }\r\n        }\r\n        document.body.appendChild(board);\r\n    };\r\n    Balls.prototype.renderPoints = function () {\r\n        var _a;\r\n        (_a = document.getElementsByClassName(\"points\")[0]) === null || _a === void 0 ? void 0 : _a.remove();\r\n        var pointsDiv = document.createElement(\"div\");\r\n        pointsDiv.innerHTML = \"Punkty: \" + this.points + \" \";\r\n        pointsDiv.classList.add(\"points\");\r\n        document.body.appendChild(pointsDiv);\r\n    };\r\n    Balls.prototype.renderNextBallsColors = function () {\r\n        var _this = this;\r\n        var _a;\r\n        (_a = document.getElementsByClassName(\"nextBalls\")[0]) === null || _a === void 0 ? void 0 : _a.remove();\r\n        var nextBallsDiv = document.createElement(\"div\");\r\n        this.nextBallsColors.forEach(function (element) {\r\n            var ball = _this.getBallElement(element);\r\n            nextBallsDiv.appendChild(ball);\r\n        });\r\n        nextBallsDiv.classList.add(\"nextBalls\");\r\n        document.body.appendChild(nextBallsDiv);\r\n    };\r\n    Balls.prototype.getBallElement = function (color) {\r\n        var element = document.createElement(\"div\");\r\n        element.classList.add(\"ball\");\r\n        element.style.backgroundColor = color;\r\n        return element;\r\n    };\r\n    return Balls;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/Balls.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Balls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Balls */ \"./src/Balls.ts\");\n\r\ndocument.addEventListener(\"DOMContentLoaded\", function (e) {\r\n    var balls = new _Balls__WEBPACK_IMPORTED_MODULE_0__[\"Balls\"]();\r\n    balls.render();\r\n});\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });