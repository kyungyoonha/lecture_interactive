export class Ball {
    constructor(stageWidth, stageHeight, radius, speed) {
        this.radius = radius;
        this.vx = speed;
        this.vy = speed;

        // 양 옆과 위 아래 각각 반지름 만큼의사이즈를 빼준 캔버스 내에서 x, y 값을 임의로 만든다.
        const diameter = this.radius * 2;
        this.x = this.radius + Math.random() * (stageWidth - diameter);
        this.y = this.radius + Math.random() * (stageHeight - diameter);
    }
    draw(ctx, stageWidth, stageHeight, block) {
        // 프레임 변화할때마다 이동하는 좌표를 더해줌.
        this.x += this.vx;
        this.y += this.vy;

        // 충돌시 방향 전환
        this.bounceWindow(stageWidth, stageHeight);
        this.bounceBlock(block);

        // 공 그리기
        // 각도가 아닌 호도법 사용 radian
        ctx.fillStyle = "#fdd700";
        ctx.beginPath();
        // ctx.arc(x, y, 반지름, 시작 각도, 종료 각도, 그리는 방향: default는 false)
        // 2 * Math.PI => 360도
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    bounceWindow(stageWidth, stageHeight) {
        const minX = this.radius;
        const maxX = stageWidth - this.radius;
        const minY = this.radius;
        const maxY = stageHeight - this.radius;

        if (this.x <= minX || this.x >= maxX) {
            this.vx *= -1;
            this.x += this.vx;
        } else if (this.y <= minY || this.y >= maxY) {
            this.vy *= -1;
            this.y += this.vy;
        }
    }

    bounceBlock(block) {
        const minX = block.x - this.radius;
        const maxX = block.maxX + this.radius;
        const minY = block.y - this.radius;
        const maxY = block.maxY + this.radius;

        // 블락에 좌,우, 상,하 반지름씩을 더한 사각형 범위 안에 들어올때 이벤트 발생
        if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
            const x1 = Math.abs(minX - this.x);
            const x2 = Math.abs(this.x - maxX);
            const y1 = Math.abs(minY - this.y);
            const y2 = Math.abs(this.y - maxY);
            const min1 = Math.min(x1, x2); // 왼쪽과 오른쪽 어디에 충돌됐는지 모르므로 min으로 체크
            const min2 = Math.min(y1, y2); // 위와 아래 어디에 충돌됐는지 모르므로 min으로 체크
            const min = Math.min(min1, min2);

            if (min == min1) {
                // 최소값이 좌우에서 나왔다면 좌우 방향 변경
                this.vx *= -1;
                this.x += this.vx;
            } else if (min === min2) {
                // 최소값이 위아래에서 나왔다면 상하 방향 변경
                this.vy *= -1;
                this.y += this.vy;
            }
        }
    }
}
