export class Text {
    constructor() {
        this.canvas = document.createElement("canvas");
        // this.canvas.style.position = "absolute";
        // this.canvas.style.left = "0";
        // this.canvas.style.top = "0";
        // document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d");
    }

    setText(str, density, stageWidth, stageHeight) {
        this.canvas.width = stageWidth;
        this.canvas.height = stageHeight;

        const myText = str;
        const fontWidth = 700;
        const fontSize = 800;
        const fontName = "Hind";

        this.ctx.clearRect(0, 0, stageWidth, stageHeight);
        this.ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
        this.ctx.fillStyle = `rgba(0, 0, 0, 0.3)`;
        this.ctx.textBaseline = "middle"; // 텍스트 출력 기준선
        const fontPos = this.ctx.measureText(myText);
        console.log(fontPos);
        this.ctx.fillText(
            myText,
            (stageWidth - fontPos.width) / 2, // 이미지 사이즈만큼 왼쪽으로 이동해야 하므로 이미지 넓이를 빼준다.
            fontPos.actualBoundingBoxAscent + // 위에서부터 얼마나 떨어져있나
                fontPos.actualBoundingBoxDescent + // 밑에서부터 얼마나 떨어져 있나
                (stageHeight - fontSize) / 2
        );
        return this.dotPos(density, stageWidth, stageHeight);
    }

    dotPos(density, stageWidth, stageHeight) {
        // 픽셀 단위로 다루기
        //
        const imageData = this.ctx.getImageData(0, 0, stageWidth, stageHeight)
            .data;
        const particles = [];
        let i = 0;
        let width = 0;
        let pixel;

        // 입자로 쪼개기
        for (let height = 0; height < stageHeight; height += density) {
            ++i;
            const slide = i % 2 == 0;
            width = 0;
            if (!slide == 1) {
                width += 6;
            }
            for (width; width < stageWidth; width += density) {
                pixel = imageData[(width + height * stageWidth) * 4 - 1];
                if (
                    pixel != 0 &&
                    width > 0 &&
                    width < stageWidth &&
                    height > 0 &&
                    height < stageHeight
                ) {
                    particles.push({
                        x: width,
                        y: height,
                    });
                }
            }
        }
        return particles;
    }
}
