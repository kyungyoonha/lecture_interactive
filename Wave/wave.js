import { Point } from "./point.js";

export class Wave {
    constructor(index, totalPoints, color) {
        this.index = index;
        this.totalPoints = totalPoints;
        this.color = color;
        this.points = [];
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.centerX = stageWidth / 2;
        this.centerY = stageHeight / 2;

        // 점과 점 사이 거리
        this.pointGap = this.stageWidth / (this.totalPoints - 1);
        this.init();
    }

    init() {
        this.points = [];
        // 여러개의 포인트 생성
        for (let i = 0; i < this.totalPoints; i++) {
            this.point = new Point(
                this.index + i,
                this.pointGap * i,
                this.centerY
            );
            this.points[i] = this.point;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;

        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX, prevY);

        // 제일 처음과 마지막은 y가 고정이므로 제외해준다.
        for (let i = 1; i < this.totalPoints; i++) {
            if (i < this.totalPoints - 1) {
                this.points[i].update();
            }

            // 부드러운 곡선 만들기
            // 곡선을 해야하므로 이전값과 현재값의 중간값을 곡선의 중간값으로 넣어줘야한다.
            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;

            ctx.quadraticCurveTo(prevX, prevY, cx, cy);
            prevX = this.points[i].x;
            prevY = this.points[i].y;
        }

        // 파동 밑에 라인 그리기
        ctx.lineTo(prevX, prevY);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();
        ctx.closePath();
    }
}
