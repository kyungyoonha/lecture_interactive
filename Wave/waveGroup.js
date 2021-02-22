import { Wave } from "./wave.js";

export class WaveGroup {
    constructor() {
        this.totalWaves = 3; // 웨이브 총 수
        this.totalPoints = 6; // 웨이브의 점 개수

        this.color = [
            "rgba(0, 199, 235, 0.4)", // 투명도 40%;
            "rgba(0, 146, 199, 0.4)",
            "rgba(0, 87, 158, 0.4)",
        ];

        this.waves = [];

        for (let i = 0; i < this.totalWaves; i++) {
            const wave = new Wave(i, this.totalPoints, this.color[i]);
            this.waves[i] = wave;
        }
    }

    resize(stageWidth, stageHeight) {
        for (let i = 0; i < this.totalWaves; i++) {
            const wave = this.waves[i];
            wave.resize(stageWidth, stageHeight);
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.totalWaves; i++) {
            const wave = this.waves[i];
            wave.draw(ctx);
        }
    }
}
