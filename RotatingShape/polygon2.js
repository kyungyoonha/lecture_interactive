const PI2 = Math.PI * 2; // 360

export class Polygon2 {
    constructor(x, y, radius, sides) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.sides = sides;
        this.rotate = 0;
    }

    animate(ctx, moveX) {
        ctx.save();
        ctx.fillStyle = "#000";

        const angle = PI2 / this.sides;

        ctx.translate(this.x, this.y);

        this.rotate -= moveX * 0.008;
        ctx.rotate(this.rotate);

        for (let i = 0; i < this.sides; i++) {
            const x = this.radius * Math.cos(angle * i);
            const y = this.radius * Math.sin(angle * i);
            // 라인이 아니라 각각을 원으로 그려줬음
            // 0도부터 PI2 (360)까지
            ctx.beginPath();
            ctx.arc(x, y, 30, 0, PI2, false);
            ctx.fill();
        }

        ctx.restore();
    }
}
