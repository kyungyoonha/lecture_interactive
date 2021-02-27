import { Polygon } from "./polygon.js";
import { Polygon2 } from "./polygon2.js";
import { Polygon3 } from "./polygon3.js";

class App {
    constructor() {
        // 캔버스 그리기
        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        window.addEventListener("resize", this.resize.bind(this), false);
        this.resize();

        this.isDown = false;
        this.moveX = 0;
        this.offsetX = 0;
        document.addEventListener("pointerdown", this.onDown.bind(this)); // 마우스 누를 때
        document.addEventListener("pointermove", this.onMove.bind(this)); // 마우스 이동 시
        document.addEventListener("pointerup", this.onUp.bind(this)); // 마우스 뗄 때

        // 애니메이션 이벤트 시작
        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        // // [case 1]
        // this.polygon = new Polygon(
        //     this.stageWidth / 2,
        //     this.stageHeight / 2,
        //     this.stageHeight / 3,
        //     10
        // );

        // [case 2]
        // this.polygon = new Polygon2(
        //     this.stageWidth / 2,
        //     this.stageHeight / 2,
        //     this.stageHeight / 3,
        //     10
        // );

        // [case 3]
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

    // 마우스를 누르고 있을때 이벤트 발생
    // 화면 제일 왼쪽이 0
    onDown(e) {
        this.isDown = true;
        this.moveX = 0;
        this.offsetX = e.clientX;
        // 클릭 지점이 화면 왼쪽으로부터 어느정도 떨어져 있는지 x 값의 좌표를 알 수 있다.
        // 화면 제일 왼쪽이 0
        // 화면 제일 오른쪽이 clientWidth 사이즈랑 같음
    }

    // 마우스 이동시 이벤트 발생
    onMove(e) {
        if (this.isDown) {
            this.moveX = e.clientX - this.offsetX;
            this.offsetX = e.clientX;
            // moveX : 이동할때마다 마우스 변화를 체크
            // 클릭한 시점의 x위치 => this.offsetX
            // 이동시 e.clientX 값이 변경된다.
            // moveX는 +3 / +1 / + 37 / -3 처럼 순간순간 움직인 값으로 나타남
        }
    }

    // 마우스 뗄때 이벤트 발생
    onUp(e) {
        this.isDown = false;
    }
}

window.onload = () => {
    new App();
};
