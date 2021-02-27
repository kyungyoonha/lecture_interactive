import { Ripple } from "./ripple.js";
import { Dot } from "./dot.js";
import { collide } from "./utils.js";

class App {
    constructor() {
        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");

        this.tempCanvas = document.createElement("canvas");
        this.tempCtx = this.tempCanvas.getContext("2d");

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        // ripple: 잔물결
        this.ripple = new Ripple();

        window.addEventListener("resize", this.resize.bind(this), false);
        this.resize();

        this.radius = 10;
        this.pixelSize = 30;
        this.dots = [];

        this.isLoaded = false;
        this.imgPos = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };

        this.image = new Image();
        this.image.src = "img2.jpg";
        this.image.onload = () => {
            this.isLoaded = true;
            this.drawImage();
        };

        window.requestAnimationFrame(this.animate.bind(this));
        this.canvas.addEventListener("click", this.onClick.bind(this), false);
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.tempCanvas.width = this.stageWidth;
        this.tempCanvas.height = this.stageHeight;

        if (this.isLoaded) {
            this.drawImage();
        }
    }

    drawImage() {
        const stageRatio = this.stageWidth / this.stageHeight;
        const imageRatio = this.image.width / this.image.height;

        this.imgPos.width = this.stageWidth;
        this.imgPos.height = this.stageHeight;

        this.ripple.resize(this.stageWidth, this.stageHeight);

        // imageRatio > stageRatio인 경우
        // 같은 높이로 맞췄을 때 이미지의 가로 길이가 더크다
        // 즉 캔버스의 가로 길이를 좀더 크게 해줘야한다.
        // 여기서는 이미지의 시작 x값을 -66으로 하여 캔버스 크기를 더 크게 해주고 화면 왼쪽으로 숨겼음
        if (imageRatio > stageRatio) {
            this.imgPos.width = Math.round(
                this.image.width * (this.stageHeight / this.image.height)
            );
            this.imgPos.x = Math.round(
                (this.stageWidth - this.imgPos.width) / 2
            );
        } else {
            this.imgPos.height = Math.round(
                this.image.height * (this.stageWidth / this.image.width)
            );
            this.imgPos.y = Math.round(
                (this.stageHeight - this.imgPos.height) / 2
            );
        }
        this.ctx.drawImage(
            this.image,
            0, // 불러온 이미지의 어느 x 좌표부터 이미지를 가져올건지
            0, // 불러온 이미지의 어느 y 좌표부터 이미지를 가져울건지
            this.image.width,
            this.image.height,
            this.imgPos.x, // 화면에 그려질 실제 캔버스의 시작 x
            this.imgPos.y, // 화면에 그려질 실제 캔버스의 시작 y
            this.imgPos.width,
            this.imgPos.height
        );

        this.tempCtx.drawImage(
            this.image,
            0,
            0,
            this.image.width,
            this.image.height,
            this.imgPos.x,
            this.imgPos.y,
            this.imgPos.width,
            this.imgPos.height
        );

        this.imgData = this.tempCtx.getImageData(
            0,
            0,
            this.stageWidth,
            this.stageHeight
        );

        this.drawDots();
    }

    drawDots() {
        this.dots = [];

        this.columns = Math.ceil(this.stageWidth / this.pixelSize);
        this.rows = Math.ceil(this.stageHeight / this.pixelSize);

        for (let i = 0; i < this.rows; i++) {
            const y = (i + 0.5) * this.pixelSize; // 굳이 0.5 안더해줘도 될듯
            const pixelY = Math.max(Math.min(y, this.stageHeight), 0);

            for (let j = 0; j < this.columns; j++) {
                const x = (j + 0.5) * this.pixelSize;
                const pixelX = Math.max(Math.min(x, this.stageWidth), 0);

                const pixelIndex = (pixelX + pixelY * this.stageWidth) * 4;
                const red = this.imgData.data[pixelIndex + 0];
                const green = this.imgData.data[pixelIndex + 1];
                const blue = this.imgData.data[pixelIndex + 2];

                const dot = new Dot(
                    x,
                    y,
                    this.radius,
                    this.pixelSize,
                    red,
                    green,
                    blue
                );
                this.dots.push(dot);
            }
        }
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));

        this.ripple.animate(this.ctx);

        for (let i = 0; i < this.dots.length; i++) {
            const dot = this.dots[i];
            // 퍼지는 물결안에 dot이 있는 경우 점의 애니메이션을 적용
            // 점의 애니메이션은 점을 1.5배 키웠다가 원래 사이즈로 돌아감
            if (
                collide(
                    dot.x,
                    dot.y,
                    this.ripple.x,
                    this.ripple.y,
                    this.ripple.radius
                )
            ) {
                dot.animate(this.ctx);
            }
        }
    }

    onClick(e) {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].reset();
        }

        this.ctx.drawImage(
            this.image,
            0,
            0,
            this.image.width,
            this.image.height,
            this.imgPos.x,
            this.imgPos.y,
            this.imgPos.width,
            this.imgPos.height
        );

        // 물결 시작
        this.ripple.start(e.offsetX, e.offsetY);
    }
}

window.onload = () => {
    new App();
};
