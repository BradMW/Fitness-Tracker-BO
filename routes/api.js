const router = require("express").Router();
const Workouts = require("../models/workouts.js");

router.get("/api/workouts", (req, res) => {
  Workouts.find({})
    .sort({ date: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts", (req, res) => {
    Workouts.find({})
      .sort({ date: -1 })
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

  router.put('/:id', async (req, res) => {
    try {
      const categoryData = await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!categoryData[0]) {
        res.status(404).json({ message: 'No category with this id!' });
        return;
      }
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post("/api/workouts/bulk", ({ body }, res) => {
  Workouts.insertMany(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});



module.exports = router;