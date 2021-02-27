const PI2 = Math.PI * 2;

export class Polygon {
    constructor(x, y, radius, sides) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.sides = sides;
        this.rotate = 0;
    }

    // ctx.save() / ctx.restore() 사용이유
    // 기존에 스타일을 저장해서 나중에 다시 쓰고 싶은 경우
    // 아래의 경우는 기존의 스타일을 저장한 후에 도형에 새로운 스타일을 입하고
    // 도형 스타일이 끝났을때 기존의 스타일을 복구해주었다.
    animate(ctx, moveX) {
        ctx.save();
        ctx.fillStyle = "#000";
        ctx.beginPath();

        // 중심각
        // 360 / 변의 개수
        const angle = PI2 / this.sides;

        ctx.translate(this.x, this.y);

        // moveX 값이 바뀜에 따라서 회전하며
        // 애니메이션 프레임 안에서 돌아가므로 자연스럽게 회전하는 것처럼 보인다.
        this.rotate -= moveX * 0.008;
        ctx.rotate(this.rotate);

        // 각도에 따른 x, y 의 값을 이어줘서 도형을 만든다.
        for (let i = 0; i < this.sides; i++) {
            const x = this.radius * Math.cos(angle * i);
            const y = this.radius * Math.sin(angle * i);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }

        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}
