const router = require("express").Router();
const Workouts = require("../models/workouts.js");


router.get("/api/workouts", async (req, res) => {
  try {
    let dbWorkout = await Workouts.find({}).sort({day: 1});
    res.json(dbWorkout);

  } catch (err) {
    res.status(400).json(err);
  }
});


router.get("/api/workouts/range", async (req, res) => {
  try {                                                                         
    let dbWorkout = await Workouts.find({}).sort({date: -1})
                                                                                   

    res.json(dbWorkout);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/api/workouts/:id', async (req, res) => {
  try {
    const workoutData = await Workouts.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!workoutData[0]) {
      res.status(404).json({
        message: 'No workout with this id!'
      });
      return;
    }
    res.status(200).json(workoutData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/api/workouts/bulk", async ({
  body
}, res) => {
  try {
    let dbWorkout = await Workouts.insertMany(body)

    res.json(dbWorkout);
  } catch (err) {

    res.status(400).json(err);
  }
});



module.exports = router;