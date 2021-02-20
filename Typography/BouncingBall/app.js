// 공의 중심점 => x, y
// 공의 중심점 +- 반지름 => 실제 벽에 닿았는지를 판단.
// 공의 움직임 => x, y에 vx, vy을 주어 이동시킨다.
// 왼쪽 벽에 부딛쳤을때 vx에 -1을 곱해준다.
// 위쪽 벽에 부딛쳤을때 vy에 -1을 곱해준다.

import { Ball } from "./ball.js";
import { Block } from "./block.js";
class App {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");

        document.body.appendChild(this.canvas);

        window.addEventListener("resize", this.resize.bind(this), false);
        this.resize();

        this.ball = new Ball(this.stageWidth, this.stageHeight, 60, 30);
        this.block = new Block(700, 30, 300, 450);

        window.requestAnimationFrame(this.animate.bind(this));
    }
    // 리사이즈 이벤트
    // 현재 에니매이션의 크기를 아는 것이 중요
    // -> 브라우저는 고정보다는 가변적으로 하기 위해 이벤트를 걸어준다.
    // 스크린 사이즈를 미리 정해놓지 않고
    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);
    }

    animate(t) {
        window.requestAnimationFrame(this.animate.bind(this));
        // 애니메이션은 계속 프레임을 생성하므로 이전 프레임은 지워줘야 한다.
        // 지워주지 않으면 공이 움직였던 모양이 화면에 그대로 남는다.
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        this.block.draw(this.ctx);
        this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block);
    }
}
window.onload = () => {
    new App();
};
