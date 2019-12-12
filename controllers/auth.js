const checkUser = (req, res, next) => {
  if (req.cookies.usertype === '1') return next();
  const err = new Error('권한이 없네용');
  err.status = 401;
  next(err);
};

module.exports = {
  checkUser,
};