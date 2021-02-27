import { distance } from "./utils.js";

export class Ripple {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.radius = 0;
        this.maxRadius = 0;
        this.speed = 10;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    }

    start(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = this.getMax(x, y);
        // 시작점에서부터 화면의 각모서리 중 가장큰 길이를 퍼지는 원의 반지름으로 한다.
        // 왼쪽위에서 시작할 경우 오른쪽 아래 꼭지점까지가 반지름의 길이가된다.
        // maxRadius가 설정되면 animate()가 작동
    }

    animate(ctx) {
        if (this.radius < this.maxRadius) {
            this.radius += this.speed;
            // 원을 점점 크게해서 그려줌
        }

        ctx.beginPath();
        //ctx.fillStyle = "#00ff00";
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        ctx.fill();
    }

    getMax(x, y) {
        // 클릭한 지점의 x, y
        const c1 = distance(0, 0, x, y);
        const c2 = distance(this.stageWidth, 0, x, y);
        const c3 = distance(0, this.stageHeight, x, y);
        const c4 = distance(this.stageWidth, this.stageHeight, x, y);
        return Math.max(c1, c2, c3, c4);
    }
}
