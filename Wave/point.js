// 웨이브 생성
// 간격을 가진 좌표를 만들고 각각의 좌표를 아래 위로 이동시킴
// 좌표를 하나의 선으로 연결해주면 선처럼 보인다.

export class Point {
    constructor(index, x, y) {
        this.x = x;
        this.y = y;
        this.fixedY = y; // 가운데 점 높이
        this.speed = 0.1;
        this.cur = index;
        this.max = Math.random() * 100 + 150; // 최대 진폭
    }

    update() {
        this.cur += this.speed; // 현재 값을 스피드 만큼 증가
        // sin값 안에 값을 넣어주면 0부터 시작하여 1 -> -1을 반복하여 값을 준다.
        this.y = this.fixedY + Math.sin(this.cur) * this.max; // 사인함수로 아래위로 움직임
    }
}
