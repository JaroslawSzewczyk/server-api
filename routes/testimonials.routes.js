const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller');

router.route('/testimonials').get(TestimonialController.getAll);

router.route('/testimonials/random').get(TestimonialController.randomTestimonial);

router.route('/testimonials/:id').get(TestimonialController.getId);

router.route('/testimonials').post(TestimonialController.newTestimonial);

router.route('/testimonials/:id').put(TestimonialController.updateTestimonial);

router.route('/testimonials/:id').delete(TestimonialController.delateTestimonial);

module.exports = router;