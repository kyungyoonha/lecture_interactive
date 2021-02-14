export class Hill {
    constructor(color, speed, total) {
        this.color = color;
        this.speed = speed;
        this.total = total;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.points = [];
        // 양이 화면 밖에서 부터 걸어올 수 있도록
        // 양 사이의 갭은 전체의 길이를 전체 개수보다 적게 나눔으로써 간격을 좀더 넓게 정의
        this.gap = Math.ceil(this.stageWidth / (this.total - 2));
        for (let i = 0; i < this.total; i++) {
            this.points[i] = {
                x: i * this.gap,
                y: this.getY(), // random
            };
        }
    }

    // 실제로 언덕을 그림
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        let cur = this.points[0];
        let prev = cur;

        let dots = [];
        cur.x += this.speed;

        // 언덕 계속 연결
        // 언덕 x 좌표의 시작점이 화면 밖으로 나오기전에 새로운 배열을 기존 배열 앞에 추가
        if (cur.x > -this.gap) {
            this.points.unshift({
                x: -(this.gap * 2),
                y: this.getY(),
            });
        }
        // 화면 길이보다 길어지면 배열의 제일 마지막 값 지워줌
        else if (cur.x > this.stageWidth + this.gap) {
            this.points.splice(-1);
        }

        ctx.moveTo(cur.x, cur.y);

        let prevCx = cur.x;
        let prevCy = cur.y;

        for (let i = 1; i < this.points.length; i++) {
            cur = this.points[i];
            cur.x += this.speed;
            const cx = (prev.x + cur.x) / 2;
            const cy = (prev.y + cur.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);

            dots.push({
                x1: prevCx,
                y1: prevCy,
                x2: prev.x,
                y2: prev.y,
                x3: cx,
                y3: cy,
            });

            prev = cur;
            prevCx = cx;
            prevCy = cy;
        }

        ctx.lineTo(prev.x, prev.y);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();

        return dots;
    }

    // 언덕의 Y 값을 랜덤으로 준다
    getY() {
        const min = this.stageHeight / 8;
        const max = this.stageHeight - min;
        return min + Math.random() * max;
    }
}
