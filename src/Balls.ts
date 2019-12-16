import { Point } from "./Point";
import { PathFinder } from "./PathFindiner";

export class Balls {
    private n: number = 9;
    private points: number = 0;
    private availibleColors: Array<string> = ["red", "green", "blue", "yellow", "pink", "black", "purple"]
    private nextBallsColors: Array<string> = this.randomizeBalls();;
    private tab: Array<Array<string>> = [];
    private choosenBall: Point = null;
    private pathFinder: PathFinder;
    constructor() {
        this.generateEmptyTab();
        this.displayOnBoardNextBalls();
        this.nextBallsColors = this.randomizeBalls();
        this.pathFinder = new PathFinder(this.tab);
    }

    displayOnBoardNextBalls(): void {
        this.nextBallsColors.forEach((element: string): void => {
            var position: Point = this.randomizePosition();
            this.tab[position.x][position.y] = element;
        });
    }

    randomizePosition(): Point {
        let point: Point = new Point(Math.floor(Math.random() * 9), Math.floor(Math.random() * 9));
        if (this.tab[point.x][point.y] != "") {
            return this.randomizePosition();
        }
        return point;
    }

    generateEmptyTab(): void {
        for (let i: number = 0; i < this.n; i++) {
            this.tab.push([])
            for (let j: number = 0; j < this.n; j++) {
                this.tab[i].push("");
            }
        }
    }

    randomizeBalls(): Array<string> {
        var result: Array<string> = [];
        for (let i: number = 0; i < 3; i++) {
            result.push(this.availibleColors[Math.floor((Math.random() * 7))])
        }
        return result;
    }

    render(): void {
        this.renderBoard();
        this.renderPoints();
        this.renderNextBallsColors();
    }

    private renderBoard(): void {
        document.getElementsByClassName("board")[0]?.remove();
        let board: HTMLElement = document.createElement("div")
        board.classList.add("board");
        for (let i: number = 0; i < this.n; i++) {
            for (let j: number = 0; j < this.n; j++) {
                let field: HTMLElement = document.createElement("div")

                field.classList.add("field")

                if (this.tab[i][j] != "") {
                    let ball: HTMLElement = this.getBallElement(this.tab[i][j]);
                    field.appendChild(ball);
                    if (this.choosenBall == null) {
                        field.style.cursor = "pointer";
                        field.addEventListener("click", (e: MouseEvent): void => {
                            this.choosenBall = new Point(i, j);
                            this.render();
                        })
                    }
                    else if (this.choosenBall.x != i && this.choosenBall.y != j) {
                        field.style.cursor = "pointer";
                        field.addEventListener("click", (e: MouseEvent): void => {
                            this.choosenBall = new Point(i, j);
                            this.render();
                        })
                    }
                    else if (this.choosenBall.x == i && this.choosenBall.y == j) {
                        ball.style.borderColor = "white";
                        field.style.cursor = "pointer";
                        field.style.backgroundColor = "red";
                        field.addEventListener("click", (e: MouseEvent): void => {
                            this.choosenBall = null;
                            this.render();
                        })
                    }
                }
                else if (this.tab[i][j] == "" && this.choosenBall != null) {
                    field.style.cursor = "pointer";
                    let path: Array<Point>;
                    let move = (e: MouseEvent): void => {
                        if ((<HTMLElement>e.currentTarget).style.backgroundColor == "red") {
                            this.tab[i][j] = this.tab[this.choosenBall.x][this.choosenBall.y];
                            this.tab[this.choosenBall.x][this.choosenBall.y] = "";
                            this.choosenBall = null;
                            if (!this.checkPoints()) {
                                this.displayOnBoardNextBalls();
                                this.nextBallsColors = this.randomizeBalls();
                            }

                            this.render();
                        }
                    }
                    field.addEventListener("mouseenter", (e: MouseEvent): void => {
                        path = this.pathFinder.find(this.choosenBall, new Point(i, j));
                        path.push(new Point(i, j))
                        path.forEach((element: Point): void => {
                            (<HTMLElement>document.getElementsByClassName("field")[element.x * 9 + element.y]).style.backgroundColor = "red";
                        });
                        field.addEventListener("click", move);
                    })
                    field.addEventListener("mouseleave", (e: MouseEvent): void => {
                        path.forEach((element: Point): void => {
                            (<HTMLElement>document.getElementsByClassName("field")[element.x * 9 + element.y]).style.backgroundColor = "white";
                        });
                        field.removeEventListener("click", move);
                    })
                }

                board.appendChild(field);
            }
        }
        document.body.appendChild(board);
    }

    private checkPoints(): boolean {
        let lastSaved: string = null;
        for (let i: number = 0; i < this.n; i++) {
            lastSaved = null;
            let combo: number = 0;
            for (let j: number = 0; j < this.n; j++) {
                if (this.tab[i][j] == lastSaved) {
                    combo++;
                }
                else if (this.tab[i][j] != "") {
                    if (combo >= 5) {
                        this.points += combo;
                        for (let k: number = j - combo; k < j; k++) {
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
                        for (let k: number = j - combo; k < j; k++) {
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
                        for (let k: number = j - combo + 1; k < j + 1; k++) {
                            this.tab[i][k] = "";
                        }
                        return true;
                    }
                }
            }
        }

        for (let i: number = 0; i < this.n; i++) {
            lastSaved = null;
            let combo: number = 0;
            for (let j: number = 0; j < this.n; j++) {
                if (this.tab[j][i] == lastSaved) {
                    combo++;
                }
                else if (this.tab[j][i] != "") {
                    if (combo >= 5) {
                        this.points += combo;
                        for (let k: number = j - combo; k < j; k++) {
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
                        for (let k: number = j - combo; k < j; k++) {
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
                        for (let k: number = j - combo + 1; k < j + 1; k++) {
                            this.tab[k][i] = "";
                        }
                        return true;
                    }
                }
            }
        }

        for (let i: number = -8; i < 8; i++) {
            lastSaved = null;
            let combo: number = 0;
            for (let j: number = 0; j < this.n; j++) {
                if (this.tab[j][j + i] == lastSaved && this.tab[j][j + i] != null) {
                    combo++;
                }
                else if (this.tab[j][j + i] != "") {
                    if (combo >= 5) {
                        this.points += combo;
                        for (let k: number = j - combo; k < j; k++) {
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
                        for (let k: number = j - combo; k < j; k++) {
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
                        for (let k: number = j - combo + 1; k < j + 1; k++) {
                            this.tab[j][j + i] = "";
                        }
                        return true;
                    }
                }
            }
        }

        for (let i: number = -8; i < 8; i++) {
            lastSaved = null;
            let combo: number = 0;
            for (let j: number = 0; j < this.n; j++) {
                if (this.tab[j][-j + i] == lastSaved && this.tab[j][-j + i] != null) {
                    if (combo >= 5) {
                        this.points += combo;
                        for (let k: number = j - combo; k < j; k++) {
                            this.tab[k][-k + i] = "";
                        }
                        return true;
                    }
                    combo++;
                }
                else if (this.tab[j][-j + i] != "") {
                    if (combo >= 5) {
                        this.points += combo;
                        for (let k: number = j - combo; k < j; k++) {
                            this.tab[k][-k + i] = "";
                        }
                        return true;
                    }
                    combo = 1;
                    lastSaved = this.tab[j][-j + i];
                }
                else {
                    if (combo >= 5) {
                        this.points += combo;
                        for (let k: number = j - combo; k < j; k++) {
                            this.tab[k][-k + i] = "";
                        }
                        return true;
                    }
                    combo = 0;
                    lastSaved = null;
                }
                if (j == 8) {
                    if (combo >= 5) {
                        this.points += combo;
                        for (let k: number = j - combo + 1; k < j + 1; k++) {
                            this.tab[j][-j + i] = "";
                        }
                        return true;
                    }
                }
            }
        }

        return false;
    }


    private renderPoints(): void {
        document.getElementsByClassName("points")[0]?.remove();
        let pointsDiv: HTMLElement = document.createElement("div");
        pointsDiv.innerHTML = `Punkty: ${this.points} `;
        pointsDiv.classList.add("points")
        document.body.appendChild(pointsDiv);
    }

    private renderNextBallsColors(): void {
        document.getElementsByClassName("nextBalls")[0]?.remove();
        let nextBallsDiv: HTMLElement = document.createElement("div");

        this.nextBallsColors.forEach((element: string): void => {
            let ball: HTMLElement = this.getBallElement(element);
            nextBallsDiv.appendChild(ball);
        });
        nextBallsDiv.classList.add("nextBalls")
        document.body.appendChild(nextBallsDiv);
    }

    private getBallElement(color: string): HTMLElement {
        var element: HTMLElement = document.createElement("div");
        element.classList.add("ball");
        element.style.backgroundColor = color;
        return element;
    }
}