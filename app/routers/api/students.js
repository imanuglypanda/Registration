const express = require('express');
const { json } = require('express/lib/response');
const router = express.Router();
const Student = require('../../models/student');

// Getting all
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/search', async (req, res) => {

  try {
    
    let data = req.body;
    data.keyword = data.keyword.toString();

    const students = await Student.find({
      $or: [
        { studentId: { $regex: data.keyword, $options: 'i' } },
        { studentThaName: { $regex: data.keyword, $options: 'i' } },
        { syllabus: { $regex: data.keyword, $options: 'i' } },
        { year: { $regex: data.keyword, $options: 'i' } },
        { status: { $regex: data.keyword, $options: 'i' } }
        // { keyIn: { $regex: data.keyword, $options: 'i' } }
      ]
    });

    res.status(200).json(students);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }

})


// Getting One
router.get('/:id', getStudent, (req, res) => {
  res.status(200).json(res.student);
});

// Creating one
router.post('/register', async (req, res) => {
  const student = new Student({
    studentId: req.body.studentId,
    studentThaName: req.body.studentThaName,
    studentEngName: req.body.studentEngName,
    sex: req.body.sex,
    degree: req.body.degree,
    faculty: req.body.faculty,
    syllabus: req.body.syllabus,
    date: req.body.date,
    campus: req.body.campus,
    year: req.body.year,
    status: req.body.status,
    citizenId: req.body.citizenId,
    race: req.body.race,
    birthDate: req.body.birthDate,
    address: req.body.address,
    moo: req.body.moo,
    road: req.body.road,
    county: req.body.county,
    local: req.body.local,
    district: req.body.district,
    province: req.body.province,
    postalCode: req.body.postalCode
  })
  try {
    const newStudent = await student.save();
    res.status(201).json({message: 'Add student success', newStudent});
  } catch (err) {
    res.status(400).json({ message: err.message });
  };
});

// Updating One
router.patch('/:id', getStudent, async (req, res) => {
  if (req.body.studentId != null) {
    res.student.studentId = req.body.studentId;
  };
  if (req.body.studentThaName != null) {
    res.student.studentThaName = req.body.studentThaName;
  };
  if (req.body.studentEngName != null) {
    res.student.studentEngName = req.body.studentEngName;
  };
  if (req.body.sex != null) {
    res.student.sex = req.body.sex;
  };
  if (req.body.degree != null) {
    res.student.degree = req.body.degree;
  };
  if (req.body.faculty != null) {
    res.student.faculty = req.body.faculty;
  };
  if (req.body.syllabus != null) {
    res.student.syllabus = req.body.syllabus;
  };
  if (req.body.date != null) {
    res.student.date = req.body.date;
  };
  if (req.body.campus != null) {
    res.student.campus = req.body.campus;
  };
  if (req.body.year != null) {
    res.student.year = req.body.year;
  };
  if (req.body.status != null) {
    res.student.status = req.body.status;
  };
  if (req.body.citizenId != null) {
    res.student.citizenId = req.body.citizenId;
  };
  if (req.body.race != null) {
    res.student.race = req.body.race;
  };
  if (req.body.birthDate != null) {
    res.student.birthDate = req.body.birthDate;
  };
  if (req.body.address != null) {
    res.student.address = req.body.address;
  };
  if (req.body.moo != null) {
    res.student.moo = req.body.moo;
  };
  if (req.body.road != null) {
    res.student.road = req.body.road;
  };
  if (req.body.county != null) {
    res.student.county = req.body.county;
  };
  if (req.body.local != null) {
    res.student.local = req.body.local;
  };
  if (req.body.district != null) {
    res.student.district = req.body.district;
  };
  if (req.body.province != null) {
    res.student.province = req.body.province;
  };
  if (req.body.postalCode != null) {
    res.student.postalCode = req.body.postalCode;
  };
  try {
    const updatedStudent = await res.student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  };
});

// Deleting One
router.delete('/:id', getStudent, async (req, res) => {
  try {
    let deletedStudent = res.student.studentEngName;
    await res.student.remove();
    res.json({ message: `Student '${deletedStudent}' has been deleted.`});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getStudent(req, res, next) {
  let student;
  try {
    student = await Student.findById(req.params.id);
    if (student == null) {
      return res.status(404).json({ message: 'Cannot find student' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.student = student;
  next();
};

module.exports = router;


