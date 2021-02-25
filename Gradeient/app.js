import { GlowParticle } from "./glowparticle.js";
const COLORS = [
    { r: 45, g: 74, b: 277 }, // blue
    { r: 250, g: 255, b: 89 }, // yellow
    { r: 255, g: 104, b: 248 }, // pupple
    { r: 44, g: 209, b: 252 }, // skyblue
    { r: 54, g: 233, b: 84 }, //green
];

class App {
    constructor() {
        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");

        // 모바일 디바이스는 물리적 해상도(실제)와 논리적 해상도(CSS)가 다르다
        // 모바일은 작기 때문에 해상도가 높다 즉 데스크탑 픽셀 비율로 할경우 굉장히 작게보임
        // 모바일일 때는 그 크기를 2배로 키워준다.
        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        this.totalParticles = 15;
        this.particles = [];
        this.maxRadius = 900;
        this.minRadius = 400;

        window.addEventListener("resize", this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));
    }
    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth;
        this.canvas.height = this.stageHeight;
        this.ctx.scale(1, 1);
        // 겹치는 도형의 채도를 섞어줌?
        this.ctx.globalCompositeOperation = "saturation";

        this.createParticles();
    }

    createParticles() {
        let curColor = 0;
        this.particles = [];
        for (let i = 0; i < this.totalParticles; i++) {
            const item = new GlowParticle(
                Math.random() * this.stageWidth,
                Math.random() * this.stageHeight,
                Math.random() * (this.maxRadius - this.minRadius) +
                    this.minRadius,
                COLORS[curColor]
            );

            if (++curColor >= COLORS.length) {
                curColor = 0;
            }

            this.particles[i] = item;
        }
    }

    // 애니메이션 걸어줌
    animate() {
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        //this.ctx.strokeRect(10, 10, 30, 30);
        for (let i = 0; i < this.totalParticles; i++) {
            const item = this.particles[i];
            item.animate(this.ctx, this.stageWidth, this.stageHeight);
        }
    }
}

window.onload = () => {
    new App();
};
