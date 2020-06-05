const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

const app = express();

router.route('/concerts').get(ConcertController.getConcerts);

router.route('/concerts/:id').get(ConcertController.getId);

router.route('/concerts').post(ConcertController.newConcert);

router.route('/concerts/:id').put(ConcertController.updateConcert);

router.route('/concerts/:id').delete(ConcertController.delateConcert);


module.exports = router;