## 실행
- 서버로 실행 시켜야 CORS에러 안생김
- 에러가 어디서 발생하는지 쉽게 알 수 있다.
- 에러는 강력새로고침으로 확인할 것
- ctrl + shift + R: 강력새로고침
```js
$ npm install http-server -g
$ npx http-server
```



## FPS란?
- 1초에 보여지는 프레임 수


## Google Web Font Loader
- https://github.com/typekit/webfontloader
- Google Web Font Loader
- name: Font famillies 이름 사용
- FVD는 지원하지 않으므로 custom으로 사용해야한다.
```js
<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
<script>
  WebFont.load({
    google: {
      families: ['Droid Sans', 'Droid Serif']
    }
  });
</script>
```

## 이벤트. 

### 1. Resize()
- 브라우저 크기가 바뀔 경우 실행된다.
- 처음 한번 실행되고 이후에는 브라우저 크기가 변경될 경우 실행된다.

### 2. animate() 애니메이션
- requestAnimationFrame
   - 화면에 새로운 애니메이션을 업데이트 할때마다 이 메소드를 호출
   - FPS 조절해준다.
   - 콜백의 수는 보통 1초에 60회 이지만 디스플레이 주사율과 일치시켜줌
   - 자기 자신을 재귀함수로 실행시켜주어야 한다.
   - 보통 1초에 60번 콜백

  ## PIXI.js
  - HTML5 Creation Engine2
  - 2d WebGL renderer
  ```js
  ```