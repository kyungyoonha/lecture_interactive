import { Polygon } from "./polygon.js";
import { Polygon2 } from "./polygon2.js";
import { Polygon3 } from "./polygon3.js";

class App {
    constructor() {
        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
        window.addEventListener("resize", this.resize.bind(this), false);
        this.resize();

        this.isDown = false;
        this.moveX = 0;
        this.offsetX = 0;
        document.addEventListener("pointerdown", this.onDown.bind(this));
        document.addEventListener("pointermove", this.onMove.bind(this));
        document.addEventListener("pointerup", this.onUp.bind(this));

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);
        // this.polygon = new Polygon(
        //     this.stageWidth / 2,
        //     this.stageHeight / 2,
        //     this.stageHeight / 3,
        //     10
        // );

        // this.polygon = new Polygon2(
        //     this.stageWidth / 2,
        //     this.stageHeight / 2,
        //     this.stageHeight / 3,
        //     10
        // );

        this.polygon = new Polygon3(
            this.stageWidth / 2,
            this.stageHeight + this.stageHeight / 4,
            this.stageHeight / 1.5,
            15
        );
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.moveX *= 0.92;
        this.polygon.animate(this.ctx, this.moveX);
    }

    onDown(e) {
        this.isDown = true;
        this.moveX = 0;
        this.offsetX = e.clientX;
    }

    onMove(e) {
        if (this.isDown) {
            this.moveX = e.clientX - this.offsetX;
            this.offsetX = e.clientX;
        }
    }

    onUp(e) {
        this.isDown = false;
    }
}

window.onload = () => {
    new App();
};
