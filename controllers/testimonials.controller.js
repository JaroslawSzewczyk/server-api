const Testimonial = require('../models/testimonials.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch {
    res.status(500).json({ message: err });
  }
  // res.json(db.testimonials[req.params.id - 1]);
};

exports.randomTestimonial = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const testimonial = await Testimonial.find().skip(rand);
    if (!testimonial) res.status(404).json({ message: 'Not found' });
    else res.json(testimonial);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
  // let randomTestimonials = Math.floor(Math.random() * 2);
  // res.json(db.testimonials[randomTestimonials]);
};

exports.getId = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) res.status(404).json({ message: 'Not found' });
    else res.json(testimonial);
  } catch {
    res.status(500).json({ message: err });
  }
  // res.json(db.testimonials[req.params.id - 1]);
};

exports.newTestimonial = async (req, res) => {
  try {
    const { author, text } = req.body;
    const newTes = new Testimonial({ author: author, text: text });
    await newTes.save();
    res.json({ message: 'ok' });
  }catch {
    res.status(500).json({ message: err });
  }
  // db.testimonials.push({
  //   id: uuid.v4(),
  //   author: req.body.author,
  //   text: req.body.text,
  // });
};

exports.updateTestimonial = async (req, res) => {
  try {
    const { text } = req.body;
    const findTestimonial = await Testimonial.findById(req.body.id);
    if (findTestimonial) {
      await Testimonial.updateOne({ _id: req.params.id }, { $set: { text: text }});
      res.json({ message: 'ok' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  };
  // db.testimonials = db.testimonials.map(item => {
  //   if (item.id == req.params.id) {
  //     return {
  //       id: req.params.id,
  //       author: req.body.author,
  //       text: req.body.text,
  //     };
  //   } else {
  //     return item;
  //   };
  // })
};

exports.delateTestimonial = async (req, res) => {
  try {
    const findTestimonial = await Testimonial.findById(req.body.id);
    if (findTestimonial) {
      await Testimonial.deleteOne({ _id: req.body.id });
      res.json({ message: 'ok' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  };
  // db.testimonials.splice(req.params.id, 1);
};