const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controller');

const app = express();

router.route('/seats').get(SeatController.getSeats);

router.route('/seats/:id').get(SeatController.getId);

router.route('/seats').post(SeatController.newSeat);

router.route('/seats/:id').put(SeatController.updateSeat);

router.route('/seats/:id').delete(SeatController.delateSeat);

module.exports = router;