const router = require('express').Router();
const Admin = require('../../models/admin');

const createError = (message) => {throw new Error(message)}; 

router.get('/', async (req, res) => {
    try {
      const data = await Admin.find();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    };
});

router.post('/register', async (req, res) => {
    const admin = new Admin({
      adminName: req.body.adminName,
      username: req.body.username,
      password: req.body.password
    });
    try {
      const newAdmin = await admin.save();
      res.status(201).json({message: 'Add admin success', newAdmin});
    } catch (err) {
      res.status(400).json({ message: err.message });
    };
});

router.post('/login', async (req, res) => {
  try {
    const data = req.body;

    if(data.username === '' || data.password === '' ) {
      createError('Username or password should not be empty.');
    };

    const user = await Admin.findOne({
      username: data.username, 
      password: data.password
    });

    if (user) {
      user.password = undefined;
      delete user.password;

      // Set user session
      req.session.userLogin = {
          user: user,
          statusAdmin: true
      };

      res.status(200).json({
        message: 'Login Success.',
        value: user 
      });
    } else {
      res.status(400).json({
        message: 'Login failed, username or password is invalid.',
        vaule: user
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

