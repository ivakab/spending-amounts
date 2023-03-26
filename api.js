const express = require("express");
const router = express.Router();
const Spending = require("./spending");
const Categories = require("./categories");

router.get("/spending", (req, res) => {
  let filter = {};
  if (req.query.filter) {
    filter = { ...filter, ...JSON.parse(req.query.filter) };
  }
  console.log(filter);
  Spending.find(filter).then((spending) => {
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

router.delete("/categories/:id", (req, res) => {
  Categories.deleteOne({ _id: req.params.id }, req.body).then((spending) =>
    res.send(spending)
  );
});

router.get("/amounts", (req, res) => {
  console.log(req.query);
  Spending.find({
    $and: [
      { date: { $gte: req.query.startDate } },
      { date: { $lte: req.query.endDate } },
    ],
  }).then((spending) => {
    const totalAmount = {};
    spending.map((item) => {
      if (totalAmount[item.type]) {
        totalAmount[item.type] += item.amount;
      } else {
        totalAmount[item.type] = item.amount;
      }
    });
    res.send(totalAmount);
  });
});

router.get("/filter", (req, res) => {
  console.log(req.query);
  Spending.find({
    $and: [
      { amount: { $gte: req.query.filter.minAmount } },
      { amount: { $lte: req.query.filter.maxAmount } },
      // { $or: [req.query.filter.types.map((item) => ({ type: item }))] },
    ],
  }).then((spending) => {
    res.send(spending);
  });
});

module.exports = router;
