const router = require('express').Router();
const Teacher = require('../../models/teacher');

const createError = (message) => {throw new Error(message)}; 

// Get all
router.get('/', async (req, res) => {
    try {
      const data = await Teacher.find();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    };
});


// search
router.get('/search', async (req, res) => {
    try {

      let data = req.body;
      data.keyword = data.keyword.toString();

      const teachers = await Teacher.find({
        $or: [
          { teacherName: { $regex: data.keyword, $options: 'i' } },
          // { username: { $regex: data.keyword, $options: 'i' } },
          // { password: { $regex: data.keyword, $options: 'i' } }
          // { keyIn: { $regex: data.keyword, $options: 'i' } }
        ]
      });

      res.status(200).json(teachers);

    } catch (err) {
      res.status(500).json({ message: err.message });
    };
});


// Get One
router.get('/:id', getTeacher, (req, res) => {
  res.status(200).json(res.teacher);
});

router.post('/register', async (req, res) => {
  const teacher = new Teacher({
    teacherName: req.body.teacherName,
    username: req.body.username,
    password: req.body.password
  })
  try {
    const newTeacher = await teacher.save();
    res.status(201).json({message: 'Add teacher success', newTeacher});
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

    const user = await Teacher.findOne({
      username: data.username, 
      password: data.password
    });

    if (user) {
      user.password = undefined;
      delete user.password;

      // Set user session
      req.session.userLogin = {
        user: user,
        statusAdmin: false
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

// Updating One
router.patch('/:id', getTeacher, async (req, res) => {
  if (req.body.teacherName != null) {
    res.teacher.teacherName = req.body.teacherName;
  };
  if (req.body.username != null) {
    res.teacher.username = req.body.username;
  };
  if (req.body.password != null) {
    res.teacher.password = req.body.password;
  };
  try {
    const updatedTeacher = await res.teacher.save();
    res.json(updatedTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  };
});

async function getTeacher(req, res, next) {
  let teacher;
  try {
    teacher = await Teacher.findById(req.params.id);
    if (teacher == null) {
      return res.status(404).json({ message: 'Cannot find teacher' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.teacher = teacher;
  next();
};

module.exports = router;

