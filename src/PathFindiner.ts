import { Point } from "./Point";

export class PathFinder {
    private tab: Array<Array<string>>;
    private wallTab: Array<Array<string>>;
    private paths: Array<Array<Point>>;
    constructor(tab: Array<Array<string>>) {
        this.tab = tab;
    }
    find(beginning: Point, end: Point): Array<Point> {
        this.wallTab = [];
        this.init(beginning, end);
        return this.calc();;
    }

    private init(beginning: Point, end: Point): void {
        this.wallTab = [];
        this.paths = [];
        for (let i: number = 0; i < this.tab.length; i++) {
            this.wallTab.push([]);
            for (let j: number = 0; j < this.tab.length; j++) {
                if (this.tab[i][j] != "" && beginning.x == i && beginning.y == j) {
                    this.wallTab[i].push("S");
                }
                else if (this.tab[i][j] == "" && end.x == i && end.y == j) {
                    this.wallTab[i].push("M");
                }
                else if (this.tab[i][j] == "")
                    this.wallTab[i].push("0")
                else {
                    this.wallTab[i].push("X");
                }
            }
        }
    }
    private calc(): Array<Point> {
        for (let i: number = 0; i < this.tab.length; i++) {
            for (let j: number = 0; j < this.tab.length; j++) {
                if (this.wallTab[i][j] == "S") {
                    if (i < 8 && this.wallTab[i + 1][j] == "0") {
                        this.wallTab[i + 1][j] = "1";
                        this.paths.push([new Point(i + 1, j)])
                    }
                    else if (i < 8 && this.wallTab[i + 1][j] == "M") {
                        return [];
                    }
                    if (j < 8 && this.wallTab[i][j + 1] == "0") {
                        this.wallTab[i][j + 1] = "1";
                        this.paths.push([new Point(i, j + 1)])
                    }
                    else if (j < 8 && this.wallTab[i][j + 1] == "M") {
                        return [];
                    }
                    if (i > 0 && this.wallTab[i - 1][j] == "0") {
                        this.wallTab[i - 1][j] = "1";
                        this.paths.push([new Point(i - 1, j)])
                    }
                    else if (i > 0 && this.wallTab[i - 1][j] == "M") {
                        return [];
                    }
                    if (j > 0 && this.wallTab[i][j - 1] == "0") {
                        this.wallTab[i][j - 1] = "1";
                        this.paths.push([new Point(i, j - 1)])
                    }
                    else if (j > 0 && this.wallTab[i][j - 1] == "M") {
                        return [];
                    }
                }
            }
        }
        let searched: string = "1";
        let marked: string = "2";
        let lastLenght: number = this.paths.length
        do {
            for (let k: number = 0; k < lastLenght; k++) {
                let lastPoint: Point = this.paths[k][this.paths[k].length - 1];
                let alreadyUsed = false;

                if (lastPoint.x < 8 && this.wallTab[lastPoint.x + 1][lastPoint.y] == "0") {
                    this.wallTab[lastPoint.x + 1][lastPoint.y] = marked;

                    if (alreadyUsed == false) {
                        this.paths[k].push(new Point(lastPoint.x + 1, lastPoint.y))
                        alreadyUsed = true;
                    }
                    else {
                        let newPath: Array<Point> = JSON.parse(JSON.stringify(this.paths[k].slice(0, this.paths[k].length - 1)));
                        newPath.push(new Point(lastPoint.x + 1, lastPoint.y));
                        this.paths.push(newPath)
                    }
                }
                else if (lastPoint.x < 8 && this.wallTab[lastPoint.x + 1][lastPoint.y] == "M") {
                    if (alreadyUsed)
                        return this.paths[k].slice(0, this.paths[k].length - 1)
                    return this.paths[k];
                }
                //
                if (lastPoint.y < 8 && this.wallTab[lastPoint.x][lastPoint.y + 1] == "0") {
                    this.wallTab[lastPoint.x][lastPoint.y + 1] = marked;
                    if (alreadyUsed == false) {
                        this.paths[k].push(new Point(lastPoint.x, lastPoint.y + 1))
                        alreadyUsed = true;
                    }
                    else {
                        let newPath: Array<Point> = JSON.parse(JSON.stringify(this.paths[k].slice(0, this.paths[k].length - 1)));
                        newPath.push(new Point(lastPoint.x, lastPoint.y + 1));
                        this.paths.push(newPath);
                    }
                }
                else if (lastPoint.y < 8 && this.wallTab[lastPoint.x][lastPoint.y + 1] == "M") {
                    if (alreadyUsed)
                        return this.paths[k].slice(0, this.paths[k].length - 1)
                    return this.paths[k];
                }
                //
                if (lastPoint.x > 0 && this.wallTab[lastPoint.x - 1][lastPoint.y] == "0") {
                    this.wallTab[lastPoint.x - 1][lastPoint.y] = marked;
                    if (alreadyUsed == false) {
                        this.paths[k].push(new Point(lastPoint.x - 1, lastPoint.y))
                        alreadyUsed = true;
                    }
                    else {
                        let newPath: Array<Point> = JSON.parse(JSON.stringify(this.paths[k].slice(0, this.paths[k].length - 1)));
                        newPath.push(new Point(lastPoint.x - 1, lastPoint.y));
                        this.paths.push(newPath);
                    }
                }
                else if (lastPoint.x > 0 && this.wallTab[lastPoint.x - 1][lastPoint.y] == "M") {
                    if (alreadyUsed)
                        return this.paths[k].slice(0, this.paths[k].length - 1)
                    return this.paths[k];
                }
                //
                if (lastPoint.y > 0 && this.wallTab[lastPoint.x][lastPoint.y - 1] == "0") {
                    this.wallTab[lastPoint.x][lastPoint.y - 1] = marked;
                    if (alreadyUsed == false) {
                        this.paths[k].push(new Point(lastPoint.x, lastPoint.y - 1))
                        alreadyUsed = true;
                    }
                    else {
                        let newPath: Array<Point> = JSON.parse(JSON.stringify(this.paths[k].slice(0, this.paths[k].length - 1)));
                        newPath.push(new Point(lastPoint.x, lastPoint.y - 1));
                        this.paths.push(newPath);
                    }
                }
                else if (lastPoint.y > 0 && this.wallTab[lastPoint.x][lastPoint.y - 1] == "M") {
                    if (alreadyUsed)
                        return this.paths[k].slice(0, this.paths[k].length - 1)
                    return this.paths[k];
                }
                if (alreadyUsed == false) {
                    this.paths[k] = []
                }
            }
            searched = (parseInt(searched) + 1).toString();
            marked = (parseInt(marked) + 1).toString();
            this.paths = this.paths.filter((x: Array<Point>): boolean => x.length > 0)
            lastLenght = this.paths.length;
        } while (this.paths.length > 0);
        return null;
    }
}