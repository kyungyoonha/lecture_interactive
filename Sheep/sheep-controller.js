import { Sheep } from "./sheep.js";

export class SheepController {
    constructor() {
        // 양 이미지 가져오기
        this.img = new Image();
        this.img.onload = () => {
            this.loaded();
        };
        this.img.src = "sheep.png";

        this.items = [];

        this.cur = 0;
        this.isLoaded = false;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    }

    loaded() {
        this.isLoaded = true;
        this.addSheep();
    }

    addSheep() {
        this.items.push(new Sheep(this.img, this.stageWidth));
    }

    draw(ctx, t, dots) {
        if (this.isLoaded) {
            this.cur += 1;
            // 양 추가
            if (this.cur > 200) {
                this.cur = 0;
                this.addSheep();
            }
            for (let i = this.items.length - 1; i >= 0; i--) {
                const item = this.items[i];
                // 양이 왼쪽으로 벗어나면 지워준다.
                if (item.x < -item.width) {
                    this.items.splice(i, 1);
                } else {
                    item.draw(ctx, t, dots);
                }
            }
        }
    }
}
