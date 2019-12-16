import { Point } from "./Point";
import { PathFinder } from "./PathFindiner";
var Balls = /** @class */ (function () {
    function Balls() {
        this.n = 9;
        this.points = 0;
        this.availibleColors = ["red", "green", "blue", "yellow", "pink", "black", "purple"];
        this.nextBallsColors = this.randomizeBalls();
        this.tab = [];
        this.choosenBall = null;
        this.generateEmptyTab();
        this.displayOnBoardNextBalls();
        this.nextBallsColors = this.randomizeBalls();
        this.pathFinder = new PathFinder(this.tab);
    }
    ;
    Balls.prototype.displayOnBoardNextBalls = function () {
        var _this = this;
        this.nextBallsColors.forEach(function (element) {
            var position = _this.randomizePosition();
            _this.tab[position.x][position.y] = element;
        });
    };
    Balls.prototype.randomizePosition = function () {
        var point = new Point(Math.floor(Math.random() * 9), Math.floor(Math.random() * 9));
        if (this.tab[point.x][point.y] != "") {
            return this.randomizePosition();
        }
        return point;
    };
    Balls.prototype.generateEmptyTab = function () {
        for (var i = 0; i < this.n; i++) {
            this.tab.push([]);
            for (var j = 0; j < this.n; j++) {
                this.tab[i].push("");
            }
        }
    };
    Balls.prototype.randomizeBalls = function () {
        var result = [];
        for (var i = 0; i < 3; i++) {
            result.push(this.availibleColors[Math.floor((Math.random() * 7))]);
        }
        return result;
    };
    Balls.prototype.render = function () {
        this.renderBoard();
        this.renderPoints();
        this.renderNextBallsColors();
    };
    Balls.prototype.renderBoard = function () {
        var _this = this;
        var _a;
        (_a = document.getElementsByClassName("board")[0]) === null || _a === void 0 ? void 0 : _a.remove();
        var board = document.createElement("div");
        board.classList.add("board");
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                var field = document.createElement("div");
                field.classList.add("field");
                if (this_1.tab[i][j] != "") {
                    var ball = this_1.getBallElement(this_1.tab[i][j]);
                    field.appendChild(ball);
                    if (this_1.choosenBall == null) {
                        field.style.cursor = "pointer";
                        field.addEventListener("click", function (e) {
                            _this.choosenBall = new Point(i, j);
                            _this.render();
                        });
                    }
                    else if (this_1.choosenBall.x != i && this_1.choosenBall.y != j) {
                        field.style.cursor = "pointer";
                        field.addEventListener("click", function (e) {
                            _this.choosenBall = new Point(i, j);
                            _this.render();
                        });
                    }
                    else if (this_1.choosenBall.x == i && this_1.choosenBall.y == j) {
                        ball.style.borderColor = "white";
                        field.style.cursor = "pointer";
                        field.style.backgroundColor = "red";
                        field.addEventListener("click", function (e) {
                            _this.choosenBall = null;
                            _this.render();
                        });
                    }
                }
                else if (this_1.tab[i][j] == "" && this_1.choosenBall != null) {
                    field.style.cursor = "pointer";
                    var path_1;
                    var move_1 = function (e) {
                        if (e.currentTarget.style.backgroundColor == "red") {
                            _this.tab[i][j] = _this.tab[_this.choosenBall.x][_this.choosenBall.y];
                            _this.tab[_this.choosenBall.x][_this.choosenBall.y] = "";
                            _this.choosenBall = null;
                            if (!_this.checkPoints()) {
                                _this.displayOnBoardNextBalls();
                                _this.nextBallsColors = _this.randomizeBalls();
                            }
                            _this.render();
                        }
                    };
                    field.addEventListener("mouseenter", function (e) {
                        path_1 = _this.pathFinder.find(_this.choosenBall, new Point(i, j));
                        path_1.push(new Point(i, j));
                        path_1.forEach(function (element) {
                            document.getElementsByClassName("field")[element.x * 9 + element.y].style.backgroundColor = "red";
                        });
                        field.addEventListener("click", move_1);
                    });
                    field.addEventListener("mouseleave", function (e) {
                        path_1.forEach(function (element) {
                            document.getElementsByClassName("field")[element.x * 9 + element.y].style.backgroundColor = "white";
                        });
                        field.removeEventListener("click", move_1);
                    });
                }
                board.appendChild(field);
            };
            for (var j = 0; j < this_1.n; j++) {
                _loop_2(j);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.n; i++) {
            _loop_1(i);
        }
        document.body.appendChild(board);
    };
    Balls.prototype.checkPoints = function () {
        var lastSaved = null;
        for (var i = 0; i < this.n; i++) {
            lastSaved = null;
            var combo = 0;
            for (var j = 0; j < this.n; j++) {
                if (this.tab[i][j] == lastSaved) {
                    combo++;
                }
                else if (this.tab[i][j] != "") {
                    if (combo >= 5) {
                        this.points += combo;
                        for (var k = j - combo; k < j; k++) {
                            this.tab[i][k] = "";
                        }
                        return true;
                    }
                    combo = 1;
                    lastSaved = this.tab[i][j];
                }
                else {
                    if (combo >= 5) {
                        this.points += combo;
                        for (var k = j - combo; k < j; k++) {
                            this.tab[i][k] = "";
                        }
                        return true;
                    }
                    combo = 0;
                    lastSaved = null;
                }
                if (j == 8) {
                    if (combo >= 5) {
                        this.points += combo;
                        for (var k = j - combo + 1; k < j + 1; k++) {
                            this.tab[i][k] = "";
                        }
                        return true;
                    }
                }
            }
        }
        for (var i = 0; i < this.n; i++) {
            lastSaved = null;
            var combo = 0;
            for (var j = 0; j < this.n; j++) {
                if (this.tab[j][i] == lastSaved) {
                    combo++;
                }
                else if (this.tab[j][i] != "") {
                    if (combo >= 5) {
                        this.points += combo;
                        for (var k = j - combo; k < j; k++) {
                            this.tab[k][i] = "";
                        }
                        return true;
                    }
                    combo = 1;
                    lastSaved = this.tab[j][i];
                }
                else {
                    if (combo >= 5) {
                        this.points += combo;
                        for (var k = j - combo; k < j; k++) {
                            this.tab[k][i] = "";
                        }
                        return true;
                    }
                    combo = 0;
                    lastSaved = null;
                }
                if (j == 8) {
                    if (combo >= 5) {
                        this.points += combo;
                        for (var k = j - combo + 1; k < j + 1; k++) {
                            this.tab[k][i] = "";
                        }
                        return true;
                    }
                }
            }
        }
        for (var i = -8; i < 8; i++) {
            lastSaved = null;
            var combo = 0;
            for (var j = 0; j < this.n; j++) {
                if (this.tab[j][j + i] == lastSaved) {
                    combo++;
                }
                else if (this.tab[j][j + i] != "") {
                    if (combo >= 5) {
                        this.points += combo;
                        for (var k = j - combo; k < j; k++) {
                            this.tab[k][k + i] = "";
                        }
                        return true;
                    }
                    combo = 1;
                    lastSaved = this.tab[j][j + i];
                }
                else {
                    if (combo >= 5) {
                        this.points += combo;
                        for (var k = j - combo; k < j; k++) {
                            this.tab[k][k + i] = "";
                        }
                        return true;
                    }
                    combo = 0;
                    lastSaved = null;
                }
                if (j == 8) {
                    if (combo >= 5) {
                        this.points += combo;
                        for (var k = j - combo + 1; k < j + 1; k++) {
                            this.tab[j][j + i] = "";
                        }
                        return true;
                    }
                }
            }
        }
        return false;
    };
    Balls.prototype.renderPoints = function () {
        var _a;
        (_a = document.getElementsByClassName("points")[0]) === null || _a === void 0 ? void 0 : _a.remove();
        var pointsDiv = document.createElement("div");
        pointsDiv.innerHTML = "Punkty: " + this.points + " ";
        pointsDiv.classList.add("points");
        document.body.appendChild(pointsDiv);
    };
    Balls.prototype.renderNextBallsColors = function () {
        var _this = this;
        var _a;
        (_a = document.getElementsByClassName("nextBalls")[0]) === null || _a === void 0 ? void 0 : _a.remove();
        var nextBallsDiv = document.createElement("div");
        this.nextBallsColors.forEach(function (element) {
            var ball = _this.getBallElement(element);
            nextBallsDiv.appendChild(ball);
        });
        nextBallsDiv.classList.add("nextBalls");
        document.body.appendChild(nextBallsDiv);
    };
    Balls.prototype.getBallElement = function (color) {
        var element = document.createElement("div");
        element.classList.add("ball");
        element.style.backgroundColor = color;
        return element;
    };
    return Balls;
}());
export { Balls };
