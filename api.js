const express = require("express");
const router = express.Router();
const Spending = require("./spending");
const Categories = require("./categories");

router.get("/spending", (req, res) => {
  Spending.find({}).then((spending) => {
    res.send(spending);
  });
});

router.post("/spending", (req, res) => {
  Spending.create(req.body.params).then((spending) => {
    res.send(spending);
  });
});

router.put("/spending/:id", (req, res) => {
  Spending.findByIdAndUpdate({ _id: req.params.id }, req.body.params).then(
    () => {
      Spending.findOne({ _id: req.params.id }).then((spending) =>
        res.send(spending)
      );
    }
  );
});

// router.get("/categories", (req, res) => {
//   Spending.distinct(type).then((spending) =>
//     res.send(spending)
//   );image.png
// });

router.delete("/spending/:id", (req, res) => {
  Spending.deleteOne({ _id: req.params.id }, req.body).then((spending) =>
    res.send(spending)
  );
});

router.get("/categories", (req, res) => {
  Categories.find({}).then((categories) => {
    res.send(categories);
  });
});

router.post("/categories", (req, res) => {
  Categories.create(req.body.params).then((categories) => {
    res.send(categories);
  });
});

module.exports = router;
