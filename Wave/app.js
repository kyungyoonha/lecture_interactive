import { WaveGroup } from "./waveGroup.js";

class App {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.waveGroup = new WaveGroup();
        // false 옵션: 버블링 방식으로 이벤트가 진행,아래에서부터 부모로(window까지) 이벤트 진행
        // true 옵션: 캡처링 방식으로 이벤트가 진행, 위에서(window부터) 이벤트 일어나는 곳까지 찾아감
        window.addEventListener("resize", this.resize.bind(this), false);
        this.resize();
        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        // 레티나 디스플레이 에서도 잘 보이게 위해 2배로 키워준다.
        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);

        this.waveGroup.resize(this.stageWidth, this.stageHeight);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.waveGroup.draw(this.ctx);
        requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
};
