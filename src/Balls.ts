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
    private isFrozen: boolean = false;
    constructor() {
        this.generateEmptyTab();
        this.displayOnBoardNextBalls();
        this.nextBallsColors = this.randomizeBalls();
        this.pathFinder = new PathFinder(this.tab);
    }

    displayOnBoardNextBalls(): void {
        this.nextBallsColors.forEach((element: string): void => {
            var position: Point = this.randomizePosition();
            if (position == null) {
                this.end();
                return;
            }
            else {
                this.tab[position.x][position.y] = element;
            }

        });
        if (!this.isFreePlace()) {
            this.end();
        }
    }

    private end(): void {
        alert(`Zdobyłeś ${this.points} punktów!`);
    }

    private isFreePlace(): boolean {
        for (let i: number = 0; i < this.n; i++) {
            for (let j: number = 0; j < this.n; j++) {
                if (this.tab[i][j] == "") return true;
            }
        }
        return false;
    }

    randomizePosition(): Point {
        if (!this.isFreePlace()) {
            return null;
        }
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
                            if (this.isFrozen) return;
                            if (this.isBallLocked(new Point(i, j))) return;
                            this.choosenBall = new Point(i, j);
                            this.render();
                        })
                    }
                    else if (this.choosenBall.x != i && this.choosenBall.y != j) {
                        field.style.cursor = "pointer";
                        field.addEventListener("click", (e: MouseEvent): void => {
                            if (this.isFrozen) return;
                            if (this.isBallLocked(new Point(i, j))) return;
                            this.choosenBall = new Point(i, j);
                            this.render();
                        })
                    }
                    else if (this.choosenBall.x == i && this.choosenBall.y == j) {
                        ball.style.borderColor = "white";
                        field.style.cursor = "pointer";
                        field.style.backgroundColor = "red";
                        field.addEventListener("click", (e: MouseEvent): void => {
                            if (this.isFrozen) return;
                            this.choosenBall = null;
                            this.render();
                        })
                    }
                }
                else if (this.tab[i][j] == "" && this.choosenBall != null) {
                    field.style.cursor = "pointer";
                    let path: Array<Point>;
                    let move = (e: MouseEvent): void => {
                        if (this.isFrozen) return;
                        if ((<HTMLElement>e.currentTarget).style.backgroundColor == "red") {
                            path.push(new Point(i, j))
                            path.push(this.choosenBall);
                            path.forEach((element: Point): void => {
                                let field: HTMLElement = (<HTMLElement>document.getElementsByClassName("field")[element.x * 9 + element.y]);
                                field.style.backgroundColor = "#aaaaaa";
                                if (element.x == this.choosenBall.x && element.y == this.choosenBall.y) {
                                    let ball: HTMLElement = <HTMLElement>field.children[0];
                                    ball.style.borderColor = "black";
                                    field.removeChild(ball);
                                    (<HTMLElement>document.getElementsByClassName("field")[i * 9 + j]).appendChild(ball);
                                }
                            });
                            this.isFrozen = true;
                            setTimeout((): void => {
                                this.isFrozen = false;
                                this.tab[i][j] = this.tab[this.choosenBall.x][this.choosenBall.y];
                                this.tab[this.choosenBall.x][this.choosenBall.y] = "";
                                this.choosenBall = null;
                                if (!this.checkPoints()) {
                                    this.displayOnBoardNextBalls();
                                    this.nextBallsColors = this.randomizeBalls();
                                }

                                this.render();
                            }, 500)

                        }
                    }
                    field.addEventListener("mouseenter", (e: MouseEvent): void => {
                        if (this.isFrozen) return;
                        path = this.pathFinder.find(this.choosenBall, new Point(i, j));
                        path.push(new Point(i, j))
                        path.forEach((element: Point): void => {
                            (<HTMLElement>document.getElementsByClassName("field")[element.x * 9 + element.y]).style.backgroundColor = "red";
                        });
                        field.addEventListener("click", move);
                    })
                    field.addEventListener("mouseleave", (e: MouseEvent): void => {
                        if (this.isFrozen) return;
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

    private isBallLocked(ball: Point): boolean {
        let surrounded: number = 0;
        if (this.tab[ball.x][ball.y + 1] != "") surrounded++;
        if (this.tab[ball.x][ball.y - 1] != "") surrounded++;
        if (this.tab[ball.x + 1] == null || this.tab[ball.x + 1][ball.y] != "") surrounded++;
        if (this.tab[ball.x - 1] == null || this.tab[ball.x - 1][ball.y] != "") surrounded++;
        return surrounded == 4;
    }

    private checkPoints(): boolean {
        let result: boolean = false;
        let pointsToDelete: Array<Point> = [];
        //rows
        for (let i: number = 0; i < this.n; i++) {
            let combo: number = 0;
            let currentColor: string = null;
            for (let j: number = 0; j < this.n; j++) {
                if (this.tab[i][j] != "") {
                    if (currentColor != this.tab[i][j]) {
                        if (combo >= 5) {
                            let k: number = j - combo;
                            for (k; k < j; k++) {
                                pointsToDelete.push(new Point(i, k))
                            }
                            this.points += combo;
                            combo = 0;
                            result = true;
                        }
                        combo = 1;
                        currentColor = this.tab[i][j]

                    }
                    else if (currentColor == this.tab[i][j]) {
                        combo++;
                    }
                }
                else {
                    if (combo >= 5) {
                        let k: number = j - combo;
                        for (k; k < j; k++) {
                            pointsToDelete.push(new Point(i, k))
                        }
                        this.points += combo;
                        result = true;
                    }
                    combo = 0;
                    currentColor = null;
                }
                if (j == 8) {
                    if (combo >= 5) {
                        let k: number = j - combo + 1;
                        for (k; k < j + 1; k++) {
                            pointsToDelete.push(new Point(i, k))
                        }
                        this.points += combo;
                        result = true;
                    }
                }
            }

        }

        //columns
        for (let i: number = 0; i < this.n; i++) {
            let combo: number = 0;
            let currentColor: string = null;
            for (let j: number = 0; j < this.n; j++) {
                if (this.tab[j][i] != "") {
                    if (currentColor != this.tab[j][i]) {
                        if (combo >= 5) {
                            let k: number = j - combo;
                            for (k; k < j; k++) {
                                pointsToDelete.push(new Point(k, i))
                            }
                            this.points += combo;
                            combo = 0;
                            result = true;
                        }
                        combo = 1;
                        currentColor = this.tab[j][i]

                    }
                    else if (currentColor == this.tab[j][i]) {
                        combo++;
                    }
                }
                else {
                    if (combo >= 5) {
                        let k: number = j - combo;
                        for (k; k < j; k++) {
                            pointsToDelete.push(new Point(k, i))
                        }
                        this.points += combo;
                        result = true;
                    }
                    combo = 0;
                    currentColor = null;
                }
                if (j == 8) {
                    if (combo >= 5) {
                        let k: number = j - combo + 1;
                        for (k; k < j + 1; k++) {
                            pointsToDelete.push(new Point(k, i))
                        }
                        this.points += combo;
                        result = true;
                    }
                }
            }
        }

        //y=x
        for (let i: number = -4; i < 5; i++) {
            let combo: number = 0;
            let currentColor: string = null;
            for (let j: number = 0; j < this.n; j++) {
                if (this.tab[j][j + i] != "") {
                    if (currentColor != this.tab[j][j + i]) {
                        if (combo >= 5) {
                            let k: number = j - combo;
                            for (k; k < j; k++) {
                                pointsToDelete.push(new Point(k, k + i))
                            }
                            this.points += combo;
                            combo = 0;
                            result = true;
                        }
                        combo = 1;
                        currentColor = this.tab[j][j + i]
                    }
                    else if (currentColor == this.tab[j][j + i]) {
                        combo++;
                    }
                }
                else {
                    if (combo >= 5) {
                        let k: number = j - combo;
                        for (k; k < j; k++) {
                            pointsToDelete.push(new Point(k, k + i))
                        }
                        this.points += combo;
                        result = true;
                    }
                    combo = 0;
                    currentColor = null;
                }
                if (j == 8) {
                    if (combo >= 5) {
                        let k: number = j - combo + 1;
                        for (k; k < j + 1; k++) {
                            pointsToDelete.push(new Point(k, k + i))
                        }
                        this.points += combo;
                        result = true;
                    }
                }
            }
        }

        //y=-x

        for (let i: number = 4; i < 13; i++) {
            let combo: number = 0;
            let currentColor: string = null;
            for (let j: number = 0; j < this.n; j++) {
                if (this.tab[j][-j + i] != "") {
                    if (currentColor != this.tab[j][-j + i]) {
                        if (combo >= 5) {
                            let k: number = j - combo;
                            for (k; k < j; k++) {
                                pointsToDelete.push(new Point(k, -k + i))
                            }
                            this.points += combo;
                            combo = 0;
                            result = true;
                        }
                        combo = 1;
                        currentColor = this.tab[j][-j + i]
                    }
                    else if (currentColor == this.tab[j][-j + i]) {
                        combo++;
                    }
                }
                else {
                    if (combo >= 5) {
                        let k: number = j - combo;
                        for (k; k < j; k++) {
                            pointsToDelete.push(new Point(k, -k + i))
                        }
                        this.points += combo;
                        result = true;
                    }
                    combo = 0;
                    currentColor = null;
                }
                if (j == 8) {
                    if (combo >= 5) {
                        let k: number = j - combo + 1;
                        for (k; k < j + 1; k++) {
                            pointsToDelete.push(new Point(k, -k + i))
                        }
                        this.points += combo;
                        result = true;
                    }
                }
            }
        }

        pointsToDelete.forEach((element: Point): void => {
            this.tab[element.x][element.y] = "";
        });

        return result;
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