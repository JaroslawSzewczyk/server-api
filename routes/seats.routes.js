const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const db = require('../db')

const app = express();

router.route('/seats').get((req, res) => {
  res.json(db.seats);
})

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats[req.params.id - 1]);
});

router.route('/seats').post((req, res) => {
  db.seats.push({
    id: uuid.v4(),
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  });
  res.json({ message: "ok" });
});

router.route('/seats/:id').put((req, res) => {
  db.seats[req.params.id - 1] = {
    id: req.params.id++,
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  }
  res.json({ message: "ok" });
});

router.route('/seats/:id').delete((req, res) => {
  db.seats.splice(req.params.id, 1);
  res.json({ message: "ok" });
});

module.exports = router;