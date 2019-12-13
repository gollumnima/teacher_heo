const validator = require('express-validator');

// $를 여기서 변수명으로 쓸 수 있는데, 미들웨어다! 하고 인식하는 것. $validate 이렇게
const validationMiddleware = (...validators) => {
    const result =  (req, res, next)=> {
        // req는 보통 요청을 조회하는데, 미들웨어 겹쳐서 쓸때 미들웨어끼리 값을 전달을 해야해서
        // 그걸 넘겨줘야하는데 전역변수에 넘겨주면 의미가 업성
        // 요청마다 정보를 제공하는 거라서 각가의 요청별로 처리해야 하는 내용이 있으면
        // 요청에 대한 걸로 바꿔주는 것. 커넥션에 대한 개인화.
        const errors = validator.validationResult(req).array()
      console.log(errors,'eerr')
      if (errors.length === 0) return res.status(400).json({
        message: "형식 잘못됐슈~",
        errors
      })
        next()
    }
    return [
        ... validators,
        result,
    ]
    // 결과를 취합하는 애가 제일 마지막에 있고
    // 인자들로 검사를 받을 것. 
    // 여러개를 동적으로 받을 때 spread 연산자로 여러개 받고
}

module.exports = {
    validationMiddleware
}

