const router = require("express").Router();
const {
  Workouts
} = require("../models/workouts.js");
const path = require("path");

router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

router.get("/exercise", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/exercise.html"))
);

router.get("/stats", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/stats.html"))
);

//this GET route will return the last workout in the array(the most recent workout)
router.get("/api/workouts", async (req, res) => {
  try {
    let dbWorkout = await Workouts.aggregate([{
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration"
        }
      }
    }])


    res.json(dbWorkout);

  } catch (err) {
    res.status(400).json(err);
  }
});

//this GET route will return all the workouts in a 7 day range and display their total duration and weight used
router.get("/api/workouts/range", async (req, res) => {
  try {
    let dbWorkout = await Workouts.aggregate({
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration"
        }
      }
    }).sort({
      _id: 1
    }).limit(7);

    res.json(dbWorkout);
  } catch (err) {
    res.status(400).json(err);
  }
});

//this PUT route will grab a workout by its ID, update it, and then push it to the array
router.put("/api/workouts/:id", async (req, res) => {
  try {
    let updateWorkout = await Workouts.findByIdAndUpdate(req.params.id,
      {$push: {
        exercises: req.body
      }},
    {
      new: true
    })
    
    res.json(updateWorkout);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//this POST route will allow the user to create a new workout and add it to the list
router.post("/api/workouts", async (req, res) => {
  try {
    let newWorkout = await Workouts.create({});
    res.json(newWorkout);
  } catch (err) {
    res.status(400).json(err)
  }
});




module.exports = router;