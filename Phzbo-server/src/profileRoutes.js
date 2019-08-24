const router = require('express').Router();

const authCheck = (req, res, next) => {
  if(!req.user){
    res.redirect('/auth/google');
  } else { 
    next();
  }
};

router.get('/', authCheck, (req, res)=> {
  res.send(req.user.data[0]);
});

module.exports = router;