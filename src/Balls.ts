export class Balls {
    n: number = 9;
    points: number = 0;
    availibleColors: Array<string> = ["red", "green", "blue", "yellow", "pink", "black", "purple"]
    nextBallsColors: Array<string> = ["red", "green", "blue"]
    constructor() {
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
        for (var i: number = 0; i < this.n; i++) {
            for (var j: number = 0; j < this.n; j++) {
                let field: HTMLElement = document.createElement("div")

                field.classList.add("field")

                board.appendChild(field);
            }
        }
        document.body.appendChild(board);
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