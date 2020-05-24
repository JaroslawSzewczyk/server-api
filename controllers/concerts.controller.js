const Concert = require('../models/concerts.models');

exports.getConcerts = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch {
    res.status(500).json({ message: err });
  }
  // res.json(db.concerts);
}

exports.getId = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  } catch {
    res.status(500).json({ message: err });
  }
  // res.json(db.concerts[req.params.id - 1]);
}

exports.newConcert = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newCon = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
    await newCon.save();
    res.json({ message: 'ok' });
  }catch {
    res.status(500).json({ message: err });
  }
  
  // db.concerts.push({
  //   id: uuid.v4(),
  //   performer: req.body.performer,
  //   genre: req.body.genre,
  //   price: req.body.price,
  //   day: req.body.day,
  //   image: req.body.image,
  // });
};

exports.updateConcert = async (req, res) => {
  try {
    const { price, day } = req.body;
    const findConcert = await Concert.findById(req.body.id);
    if (findConcert) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { price: price, image: image } });
      res.json({ message: 'ok' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  };
  // db.concerts = db.concerts.map(item => {
  //   if (item.id == req.params.id) {
  //     return {
  //       id: req.params.id,
  //       performer: req.body.performer,
  //       genre: req.body.genre,
  //       price: req.body.price,
  //       day: req.body.day,
  //       image: req.body.image,
  //     };
  //   } else {
  //     return item;
  //   };
  // });
};

exports.delateConcert = async (req, res) => {
  try {
    const findConcert = await Concert.findById(req.body.id);
    if (findConcert) {
      await Concert.deleteOne({ _id: req.body.id });
      res.json({ message: 'ok' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  };

  // db.concerts.splice(req.params.id, 1);
}