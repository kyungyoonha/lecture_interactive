import { Hill } from "./Hill.js";
import { SheepController } from "./sheep-controller.js";

class App {
    constructor() {
        // 캔버스 생성 후 바디에 추가
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        // 뒤에 있는 언덕은 느리고 좌표도 촘촘하게
        this.hills = [
            new Hill("#fd6bea", 0.2, 12),
            new Hill("#ff59c2", 0.5, 8),
            new Hill("#ff4674", 1.4, 6),
        ];

        this.sheepController = new SheepController();

        // 스크롤 사이즈 가져옴
        window.addEventListener("resize", this.resize.bind(this), false);
        this.resize();
        requestAnimationFrame(this.animate.bind(this));

        // this.hills[0].draw(this.ctx);
    }
    // 캔버스의 사이즈를 두배로 해줘서 레티나 디스플레이에서도 선명하게 보이도록 함
    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);
        for (let i = 0; i < this.hills.length; i++) {
            this.hills[i].resize(this.stageWidth, this.stageHeight);
        }

        this.sheepController.resize(this.stageWidth, this.stageHeight);
    }

    animate(t) {
        requestAnimationFrame(this.animate.bind(this));
        // 캔버스 지움
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        let dots;
        for (let i = 0; i < this.hills.length; i++) {
            dots = this.hills[i].draw(this.ctx);
        }

        this.sheepController.draw(this.ctx, t, dots);
    }
}

window.onload = () => {
    new App();
};
