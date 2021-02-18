import { Text } from "./text.js";
import { Particle } from "./Particle.js";

export class Visual {
    constructor() {
        this.text = new Text();
        // 구성될 입자 모양
        // 세모로 바꾸면 세모모양으로 쪼개진다.
        this.texture = PIXI.Texture.from("particle.png");
        this.particles = [];

        this.mouse = {
            x: 0,
            y: 0,
            radius: 50,
        };
        document.addEventListener("pointermove", this.onMove.bind(this), false);
    }

    show(stageWidth, stageHeight, stage) {
        if (this.container) {
            stage.removeChild(this.container);
        }
        // 입자 정보들 받아옴
        this.pos = this.text.setText("T", 2, stageWidth, stageHeight);

        // ParticleContainer => Container의 빠른 버전으로
        // 여러개의 Sprite particles를 이용할 경우 사용
        this.container = new PIXI.ParticleContainer(this.pos.length, {
            vertices: false,
            position: true,
            rotation: false,
            scale: false,
            uvs: false,
            tint: true, // 색조
        });

        // stage는 첯음 생선된 container
        stage.addChild(this.container);

        this.particles = [];
        for (let i = 0; i < this.pos.length; i++) {
            const item = new Particle(this.pos[i], this.texture);
            this.container.addChild(item.sprite);
            this.particles.push(item);
        }
    }

    animate() {
        for (let i = 0; i < this.particles.length; i++) {
            const item = this.particles[i];
            const dx = this.mouse.x - item.x;
            const dy = this.mouse.y - item.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            // 입자의 반지름 + 마우스 원의 반지름
            const minDist = item.radius + this.mouse.radius;

            // 마우스 포인트와의 실제 거리가 원과 원끼리 접촉중일 경우 interaction일어나도록 설정
            if (dist < minDist) {
                const angle = Math.atan2(dy, dx);
                const tx = item.x + Math.cos(angle) * minDist; // 실제 위치에서 마우스 포인트까지 x 거리 더해줌
                const ty = item.y + Math.sin(angle) * minDist; // 실제 위치에서 마우스 포인트까지 y 거리 더해줌
                const ax = tx - this.mouse.x;
                const ay = ty - this.mouse.y;
                item.vx -= ax;
                item.vy -= ay;
                item.collide();
            }

            item.draw();
        }
    }

    onMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }
}
