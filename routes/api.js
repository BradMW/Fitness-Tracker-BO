const router = require("express").Router();
const Workouts = require("../models/workouts.js");


router.get("/api/workouts", async (req, res) => {
  try {
    let dbWorkout = await Workouts.find({}).sort({
      day: 1
    });
    res.json(dbWorkout);

  } catch (err) {
    res.status(400).json(err);
  }
});


router.get("/api/workouts/range", async (req, res) => {
  try {
    let dbWorkout = await Workouts.find({}).sort({
      day: 1
    })


    res.json(dbWorkout);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/api/workouts/:id", async (req, res) => {
  try {
    let updateWorkout = await Workouts.updateOne({
      _id: req.params.id
    }, {
      $push: {
        exercises: req.body
      }
    })
    res.json(updateWorkout);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/api/workouts", async ({
  body
}, res) => {
  try {
    let newWorkout = await Workouts.create(body);
    res.json(newWorkout);
  } catch (err) {
    res.status(400).json(err)
  }
});




module.exports = router;