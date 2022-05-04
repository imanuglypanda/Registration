const router = require('express').Router();

router.use('/Admin', require('./admins'));

const studentRouter = require('./students');
router.use('/Student', studentRouter);

const teacherRouter = require('./teachers');
router.use('/Teacher', teacherRouter);


router.get('/checkSession', (req, res) => {
    try {
      if(req.session.userLogin) {
        res.status(200).json({
          message: 'User login',
          value: req.session.userLogin,
          status: true
        });
      } else {
        res.status(200).json({
          message: 'User not login',
          status: false
        });
      }
    } catch (err) {
      res.status(400).console.log(err);
    }
});

router.get('/logout', (req, res) => {
  try {
    req.session.userLogin = undefined;
    delete req.session.userLogin;
    res.status(200).json({message: 'ออกจากระบบสำเร็จ'});
  } catch (err) {
    res.status(400).console.log(err);
  };
});

router.get('/', (req, res) => {
  res.redirect('./login.html');
});

router.use(function(req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.json({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

module.exports = router;