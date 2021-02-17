import { Visual } from "./visual.js";

class App {
    constructor() {
        this.setWebgl();
        // Google Web Font Loader
        // name: Font famillies 이름 사용
        // FVD는 지원하지 않으므로 custom으로 사용해야한다.
        WebFont.load({
            google: {
                families: ["Hind:700"],
            },
            // This event is triggered once for each font that renders.
            fontactive: () => {
                this.visual = new Visual();

                window.addEventListener(
                    "resize",
                    this.resize.bind(this),
                    false
                );
                this.resize();

                requestAnimationFrame(this.animate.bind(this));
            },
        });
    }

    setWebgl() {
        this.renderer = new PIXI.Renderer({
            width: document.body.clientWidth,
            height: document.body.clientHeight,
            antialias: true,
            transparent: false,
            resolution: window.devicePixelRatio > 1 ? 2 : 1,
            autoDensity: true,
            powerPreference: "high-performance",
            backgroundColor: 0xffffff,
        });
        document.body.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();
    }

    // 브라우저 크기가 바뀔 경우 실행된다.
    // 처음 한번 실행되고 이후에는 브라우저 크기가 변경될 경우 실행된다.
    resize() {
        console.log("resize");
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.renderer.resize(this.stageWidth, this.stageHeight);
        this.visual.show(this.stageWidth, this.stageHeight, this.stage);
    }

    animate(t) {
        // 자기 자신을 재귀함수로 실행시켜주어야 한다.
        // 보통 1초에 60번 콜백
        requestAnimationFrame(this.animate.bind(this));

        this.visual.animate();
        this.renderer.render(this.stage);
    }
}

window.onload = () => {
    new App();
};
