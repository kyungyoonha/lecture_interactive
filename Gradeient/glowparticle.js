const PI2 = Math.PI * 2;

export class GlowParticle {
    constructor(x, y, radius, rgb) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.rgb = rgb;

        this.vx = Math.random() * 4;
        this.vy = Math.random() * 4;

        // 0 <= Math.random() < 1
        // 1은 포함되지 않는다.
        this.sinValue = Math.random();
    }

    animate(ctx, stageWidth, stageHeight) {
        this.sinValue += 0.01;

        // Math.sin(this.sinValue);
        // -1 < Math.sin(this.sinValue) < 1
        // 원이 커졌다가 작아졌다를 반복하기 위해서 설정했음
        this.radius += Math.sin(this.sinValue);

        this.x += this.vx;
        this.y += this.vy;

        // 입자의 방향전환
        if (this.x < 0) {
            this.vx *= -1;
            this.x += 10;
        } else if (this.x > stageWidth) {
            this.vx *= -1;
            this.x -= 10;
        }

        if (this.y < 0) {
            this.vy *= -1;
            this.y += 10;
        } else if (this.y > stageHeight) {
            this.vy *= -1;
            this.y -= 10;
        }

        ctx.beginPath();
        const g = ctx.createRadialGradient(
            this.x, // 시작원의 x 좌표
            this.y,
            this.radius * 0.01,
            this.x, // 종료 원의 x 좌표
            this.y,
            this.radius
        );
        // 애니메이션과 동일 0 -> 1 효과 어떻게 줄건지
        // 여기서는 그냥 시작과 종료 같은 색상으로 줬음
        // 어차피 프레임 바뀔때마다 그라데이션 크기 변함
        g.addColorStop(
            0,
            `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b},1)`
        );
        g.addColorStop(
            1,
            `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b},0)`
        );
        ctx.fillStyle = g;
        ctx.arc(this.x, this.y, this.radius, 0, PI2, false);
        ctx.fill();
    }
}
