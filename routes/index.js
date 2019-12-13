const express = require('express');

const router = express.Router();
const user = require('./user');
const post = require('./post');

// app은 말 그대로 앱이라 한번만 만들어야 함.

// router 함수에겐 router 가 app 처럼 보이는것
// app의 입장에선 router는 middleware인 것.
router.get('/login', (req, res, next) => {
  res
    .cookie('usertype', 1)
    .status(200)
    .json({ message: '로그인 테[스트 했습니다' });
});


// app.use((req, res, next) => {

//   // node.js에선 else를 안 쓰고 바로 리턴해버림. 중괄호를 최대한 줄이려는 관습이 있음
// });



router.use((req, res, next) => {
  console.log('매 요청마다 작도ㅓㅇ');
  next();
  // next 안 쓰고 res.json({}) 하면 빈객체가 페이지에 뜸.
});
// 경로가 같으면 앞쪽 라우터만 돈다.
// 한 개의 앤드포인트에 대해 한 개의 라우터만 사용하진 않음. 여러개 써도 됨.
router.get('/foo', (req, res, next) => {
  res.send('배고파');

//   res.status(401).json({ 둘둘쓰: '배곱' });
});


// 요런식으로 에러페이지 만들어주는 것
// app.use((req, res, next) => {
//   res.status(404).json({
//     message: '존재하지 않는 url입니다'
//   });
// });

// app.use((req, res, next) => {
//   const err = new Error('존재하지 않는 url 입니다');
//   err.status = 404;

//   next(err);
//   // next를 써서 다른 미들웨어를 작동시키던지
//   // res를 써서 작동시키던지 해야 함.
// });

// app.use((err, req, res, next) => {
//   // next로 참조했기 때문에 err에 대한 정보를 가져올 수 있음
//   // 첫번째 next!!!
//   console.log(err);
//   res.status(err.status || 500).json({
//     message: err.message || '에러가 발생했습니다',
//   });
// });

// user router만 붙은 애들만 일로 들어오는 것
router.use('/user', user);
router.use('/post', post);

module.exports = router;
