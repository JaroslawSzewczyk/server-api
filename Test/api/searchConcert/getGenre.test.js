const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concerts = require('../../../models/concerts.models');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /concerts/genre/:genre', () => {
  before(async () => {
    const performerOne = new Concerts({ performer: 'Metallica', genre: 'Metal', price: 50, day: 1, image: 'address to image' });
    await performerOne.save();

    const performerTwo = new Concerts({ performer: 'Sepultura', genre: 'Metal', price: 30, day: 1, image: 'address to image' });
    await performerTwo.save();

    const performerThree = new Concerts({ performer: 'Britney Spears', genre: 'Pop', price: 10, day: 2, image: 'address to image' });
    await performerThree.save();
  });

  it('should return performers by genre ', async () => {
    const performer = await request(server).get('/concerts/genre/Metal');
    expect(performer.status).to.be.equal(200);
    expect(performer.body).to.be.an('array');
    expect(performer.body.length).to.be.equal(2);
  });

  after (async () => {
    await Concerts.deleteMany();
  });
});