const { User } = require('../models');

const userdata = [
  {
    username: 'Kaitlin',
    email: 'kaitlin.hogan@gmail.com',
    password: 'sharknado',
  },
  {
    username: 'Laura',
    email: 'lauradev@pacbell.net',
    password: 'coriolanus',
  },
  {
    username: 'Kevin',
    email: 'kchogan@pacbell.net',
    password: 'defenistration',
  },
];

const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;
