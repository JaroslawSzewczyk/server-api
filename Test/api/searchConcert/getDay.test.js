const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concerts = require('../../../models/concerts.models');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /concerts/performer/:performer', () => {
  before(async () => {
    const performerOne = new Concerts({ performer: 'Metallica', genre: 'Metal', price: 50, day: 1, image: 'address to image' });
    await performerOne.save();

    const performerTwo = new Concerts({ performer: 'AC/DC', genre: 'Rock', price: 30, day: 1, image: 'address to image' });
    await performerTwo.save();

    const performerThree = new Concerts({ performer: 'Britney Spears', genre: 'Pop', price: 10, day: 2, image: 'address to image' });
    await performerThree.save();
  });

  it('/:id should return one performer by name ', async () => {
    const performer = await request(server).get('/concerts/performer/Metallica');
    expect(performer.status).to.be.equal(200);
    expect(performer.body).to.be.an('object');
    expect(performer.body).to.not.be.null;
  });

  (async () => {
    await Concerts.deleteMany();
  });
});