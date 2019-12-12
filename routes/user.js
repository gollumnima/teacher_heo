const express = require('express');

const router = express.Router();
const { checkUser } = require('../controllers/auth');
// const checkUser = require('../controllers/auth').checkUser 같은거임
const json = require('../services/json');

// 방법 1
router.use(checkUser);

// 방법 2
// index.js에 router.use('/user', checkUser, user)

// 보통은 router.use 쪽은 안 건드려서 user.js에 쓰는 방법 1을 선호함.

// export const 어쩌구 해야함. export default는 비구조화할당이 안됨

// 미들웨어는 함수를 넣어야해서 괄호를 쓰지 않고 이름만 써줌.
// 권한 체크하는게 원래 미들웨어였는데 변수화해서 아예 유저목록 보고싶을때만 권한을 주려고 이렇게 만듬
router.get('/', checkUser, (req, res, next) => {
  json.writeJSON('test', { test: '성공쓰' })
    .then((rs) => {
      console.log(rs);
    }).catch((er) => {
      console.log(er);
    });
  const page = req.query;
  console.log(req.query);
  res.status(200).json({ name: '유저 목록' });
});

// user에만 권한이 있고, user/id 에는 영향 안줌. 독립적으로 작동함
router.get('/:id', (req, res, next) => {
  const id = req.params;
  console.log(id);
  res.status(200).json({
    name: '허선생님',
    id
  }); // id: id 객체 값과 프로퍼티가 동일하면 지워짐.
});

module.exports = router;