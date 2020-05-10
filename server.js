const express = require('express');
const testimonials = require('./routes/testimonials.routes');
const concerts = require('./routes/concerts.routes');
const seats = require('./routes/seats.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', testimonials);
app.use('/api', concerts);
app.use('/api', seats);


app.use((req, res) => {
  res.status(404).json({message: '404 not found...'});
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});