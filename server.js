console.log('1');

const http = require('http');
const app = require('./app');

// 경로를 안 붙이면 module이라고 생각하고, 경로를 붙이면 파일이라고 생각하면 됨
// listner를 가지고 있으면 app으로서 작동을 함.

console.log('2');

http.createServer(app).listen(8000, () => {
  console.log('3');
  console.log('서버 시작할게유~');
  // 비동기 코드라 가장 늦게 실행됨
});
// inbound 요청을 듣겠다. 리쓴
// 듣기 시작한 이후에 콘솔찍겠다

console.log('5');