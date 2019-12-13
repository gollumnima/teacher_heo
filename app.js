const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');


const routes = require('./routes');

// 주소를 user로 했어도 use는 맨날 작동하는 애라서 ..
// app.use((req, res, next) => {
//   res.json({ foo: 1 });
// });

app.use(express.json())
app.use(cookieParser());

app.use(routes);

app.use((req, res, next) => {
  const err = new Error('존재하지 않는 url 입니다');
  err.status = 404;

  next(err);
  // next를 써서 다른 미들웨어를 작동시키던지
  // res를 써서 작동시키던지 해야 함.
});

app.use((err, req, res, next) => {
  // next로 참조했기 때문에 err에 대한 정보를 가져올 수 있음
  // 첫번째 next!!!
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message || '에러가 발생했습니다',
  });
});

module.exports = app;


// jusuk

// // 인증로직 할 때 편함
// // 원래 post로 하는데 로그인은.. 일단 get으로 해봄
// app.get('/login', (req, res, next) => {
//   res
//     .cookie('usertype', 1)
//     .status(200)
//     .json({ message: '로그인 테[스트 했습니다' });
// });

// const checkUser = (req, res, next) => {
//   if (req.cookies.usertype === '1') return next();
//   const err = new Error('권한이 없네용');
//   err.status = 401;
//   next(err);
// };
// // app.use((req, res, next) => {

// //   // node.js에선 else를 안 쓰고 바로 리턴해버림. 중괄호를 최대한 줄이려는 관습이 있음
// // });

// app.use((req, res, next) => {
//   console.log('매 요청마다 작도ㅓㅇ');
//   next();
//   // next 안 쓰고 res.json({}) 하면 빈객체가 페이지에 뜸.
// });
// // 경로가 같으면 앞쪽 라우터만 돈다.
// // 한 개의 앤드포인트에 대해 한 개의 라우터만 사용하진 않음. 여러개 써도 됨.
// app.get('/foo', (req, res, next) => {
//   res.send('배고파');

// //   res.status(401).json({ 둘둘쓰: '배곱' });
// });


// // 미들웨어는 함수를 넣어야해서 괄호를 쓰지 않고 이름만 써줌.
// // 권한 체크하는게 원래 미들웨어였는데 변수화해서 아예 유저목록 보고싶을때만 권한을 주려고 이렇게 만듬
// app.get('/user', checkUser, (req, res, next) => {
//   const page = req.query;
//   console.log(req.query);
//   res.status(200).json({ name: '유저 목록' });
// });

// // user에만 권한이 있고, user/id 에는 영향 안줌. 독립적으로 작동함
// app.get('/user/:id', (req, res, next) => {
//   const id = req.params;
//   console.log(id);
//   res.status(200).json({
//     name: '허선생님',
//     id
//   }); // id: id 객체 값과 프로퍼티가 동일하면 지워짐.
// });

// // 요런식으로 에러페이지 만들어주는 것
// // app.use((req, res, next) => {
// //   res.status(404).json({
// //     message: '존재하지 않는 url입니다'
// //   });
// // });

// // app.use((req, res, next) => {
// //   const err = new Error('존재하지 않는 url 입니다');
// //   err.status = 404;

// //   next(err);
// //   // next를 써서 다른 미들웨어를 작동시키던지
// //   // res를 써서 작동시키던지 해야 함.
// // });

// // app.use((err, req, res, next) => {
// //   // next로 참조했기 때문에 err에 대한 정보를 가져올 수 있음
// //   // 첫번째 next!!!
// //   console.log(err);
// //   res.status(err.status || 500).json({
// //     message: err.message || '에러가 발생했습니다',
// //   });
// // });

// // module.exports = app;
