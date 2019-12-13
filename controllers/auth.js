const checkUser = (req, res, next) => {
  if (req.cookies.usertype === '1') return next();
// next의 역할 : 다음 유저나 다음 라우터로 넘어가도록 하는 것.
// next는 인자가 비어있거나 에러가 추정되는 값이 들어가거나 둘 중 하나여야 함.
// 속에 값이 들어가면 error로 처리.. 그래서 next안에 err넣은것임
// 그래서 라우터 타지 않고 에러 타는 미들웨어 작동하는 것
// next 흐름제어로 권한체크 뿐만 아니라 validation  같은것도 함
// qeury string으로 받을건데, 잘못된 query 받으면 에러 띄울수도 있음
// 
  const err = new Error('권한이 없네용');
  err.status = 401;
  next(err);
};

module.exports = {
  checkUser,
};