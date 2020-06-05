const Seat = require('../models/seats.model');

exports.getSeats = async (req, res) => {
  try {
    const ticket = await Seat.find();
    res.json(ticket);
    console.log(ticket.length);
  } catch (err) {
    res.status(500).json({ message: err });
  }
  
  // res.json(db.seats);
};

exports.getId = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
  
  // res.json(db.seats[req.params.id - 1]);
};

exports.newSeat = async (req, res) => {
  
  try {
    const { day, seat, client, email } = req.body;
    const checkSeat = await Seat.findOne({ $and: [{ seat: { $eq: seat } }, { day: { $eq: day } }] });
    if (checkSeat) {
      return res.status(404).json({ message: '404 The slot is already taken...' });
    } else {
      const newSeat = new Seat({ day: day, seat: seat, client: client, email: email });
      await newSeat.save();
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
  
  // for (let item = 0; item < db.seats.length; item++){
  //   if (db.seats[item].seat == req.body.seat && db.seats[item].day == req.body.day) {
  //     return res.status(404).json({message: '404 The slot is already taken...'});
  //   }
  // }
  // db.seats.push({
  //   id: uuid.v4(),
  //   day: req.body.day,
  //   seat: req.body.seat,
  //   client: req.body.client,
  //   email: req.body.email,
  // });
  req.io.emit('seatsUpdate', (await Seat.find()));
  res.json({ message: "ok" });
};

exports.updateSeat = async (req, res) => {
  
  try {
    const {seat} = req.body;
    const checkSeat = await Seat.findById(req.body.id);
    if (checkSeat) {
      await Seat.updateOne({ _id: req.params.id }, { $set: { seat: seat }});
      res.json({ message: 'ok' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  };
  
  // db.seats = db.seats.map(item => {
  //   if (item.id == req.params.id) {
  //     return {
  //       id: req.params.id,
  //       day: req.body.day,
  //       seat: req.body.seat,
  //       client: req.body.client,
  //       email: req.body.email,
  //     };
  //   } else {
  //     return item;
  //   };
  // });
  // res.json({ message: "ok" });
};

exports.delateSeat = async (req, res) => {
  try {
    const findSeat = await Seat.findById(req.body.id);
    if (findSeat) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
  
  // db.seats.splice(req.params.id, 1);
  res.json({ message: "ok" });
};