const FRICTION = 0.98;
const COLOR_SPEED = 0.12;
const MOVE_SPEED = 0.88;

export class Particle {
    constructor(pos, texture) {
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.scale.set(0.06);
        this.savedX = pos.x;
        this.savedY = pos.y;
        this.x = pos.x;
        this.y = pos.y;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.vx = 0;
        this.vy = 0;
        this.radius = 10;

        this.savedRgb = 0xf3316e;
        this.rgb = 0xf3316e;
    }

    collide() {
        this.rgb = 0x451966;
    }

    draw() {
        // 처음 애니메이션 실행될때 rgb가 0으로 됐다가 천천히 원래 색으로 돌아온다.
        // 매 프레임 마다 조금씩 색이 돌아옴 - color_speed
        this.rgb += (this.savedRgb - this.rgb) * COLOR_SPEED;

        this.x += (this.savedX - this.x) * MOVE_SPEED;
        this.y += (this.savedY - this.y) * MOVE_SPEED;

        this.vx *= FRICTION; // 실제 움직인 거리에서 매 프레임마다 0.98씩 곱해짐
        this.vy *= FRICTION; // -> 최대로 퍼졌을때 * 0.98 이므로 조금씩 원래 위치로 돌아온다

        this.x += this.vx;
        this.y += this.vy;

        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.tint = this.rgb;
    }
}
