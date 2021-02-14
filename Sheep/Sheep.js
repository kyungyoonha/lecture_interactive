export class Sheep {
    // 양이 오른쪽 끝에서 출발하므로 stageWidth를 받아줌
    constructor(img, stageWidth) {
        this.img = img;

        this.totalFrame = 8;
        this.curFrame = 0;
        // 이미지 사이즈
        this.imgWidth = 360;
        this.imgHieght = 300;
        // 양의 실제 크기
        // 레티나 디스플레이를 고려하여 실제 이미지 사이즈의 1/2로
        this.sheepWidth = 180;
        this.sheepHeight = 150;

        this.sheepWidthHalf = this.sheepWidth / 2;
        this.x = stageWidth + this.sheepWidth;
        this.y = 0;
        // 속도 랜덤
        this.speed = Math.random() * 2 + 1;
        // 양의 fps
        this.fps = 24;
        this.fpsTime = 1000 / this.fps; // 실제로 timestamp와 비교값이 된다.
    }

    draw(ctx, t, dots) {
        if (!this.time) {
            this.time = t;
        }

        const now = t - this.time;
        // 프레임을 증가시키는 속도를 시간에 맞춰서 조절
        // now 가 24 fps프레임에 도달했을 경우에만 프레임을 증가시켜준다.
        // 양이 움직이는 속도를 조절할 수 있음
        if (now > this.fpsTime) {
            this.time = t;
            this.curFrame += 1;
            if (this.curFrame === this.totalFrame) {
                this.curFrame = 0;
            }
        }

        this.animate(ctx, dots);
    }

    animate(ctx, dots) {
        this.x -= this.speed;
        const closest = this.getY(this.x, dots);
        this.y = closest.y;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(closest.rotation);
        ctx.fillStyle = "#000000";
        // ctx.fillRect(
        //     -this.sheepWidthHalf, // 양의 중앙 맞춰줌
        //     -this.sheepHeight + 20, // 그림의 양 높이 더해줌
        //     this.sheepWidth, // 양의 크기 - 넓이
        //     this.sheepHeight // 양의 크기 - 높이
        // );
        ctx.drawImage(
            this.img,
            this.imgWidth * this.curFrame,
            0,
            this.imgWidth,
            this.imgHieght,
            -this.sheepWidthHalf,
            -this.sheepHeight + 20,
            this.sheepWidth,
            this.sheepHeight
        );
        ctx.restore(); // 저장했던 캔버스 복귀
    }

    // 곡선이 여러개 이므로 어떤 곡선에 해당하는지
    getY(x, dots) {
        for (let i = 1; i < dots.length; i++) {
            if (x >= dots[i].x1 && x <= dots[i].x3) {
                return this.getY2(x, dots[i]);
            }
        }

        return {
            y: 0,
            rotation: 0,
        };
    }

    // 곡선을 200개로 나누고 x 값과 가장 근사한 곡선값의 좌표를 가져온다.
    getY2(x, dot) {
        const total = 200;
        const { x1, y1, x2, y2, x3, y3 } = dot;
        let pt = this.getPointOnQuad(x1, y1, x2, y2, x3, y3, 0);
        let prevX = pt.x;
        for (let i = 1; i < total; i++) {
            const t = i / total;
            pt = this.getPointOnQuad(x1, y1, x2, y2, x3, y3, t);

            if (x >= prevX && x <= pt.x) {
                return pt;
            }
            prevX = pt.x;
        }
        return pt;
    }

    getQuadValue(p0, p1, p2, t) {
        return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
    }

    getPointOnQuad(x1, y1, x2, y2, x3, y3, t) {
        const tx = this.quadTangent(x1, x2, x3, t);
        const ty = this.quadTangent(y1, y2, y3, t);
        // 각도를 구함
        // 수직 각도이므로 수평으로 바꿔주려면 90도 더해줌
        // atan2의 리턴값은 라디안 이므로 90도를 라디안으로 변경해줌
        const rotation = -Math.atan2(tx, ty) + (90 * Math.PI) / 180;
        return {
            x: this.getQuadValue(x1, x2, x3, t),
            y: this.getQuadValue(y1, y2, y3, t),
            rotation: rotation,
        };
    }

    // 곡선 위 좌표에서 수직으로 된 기울기를 찾는 법
    quadTangent(a, b, c, t) {
        return 2 * (1 - t) * (b - a) + 2 * (c - b) * t;
    }
}
