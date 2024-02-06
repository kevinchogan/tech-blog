const { Post } = require('../models');

const postdata = [
  {
    title: 'Why MVC is so important',
    body: 'MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer data, the View layer for design, and the Controller layer for application logic',
    user_id: 1,
    date: 'April 02, 2007',
  },
  {
    title: 'Authentication vs. Authorization',
    body: 'There is a difference between authorization and authentication.  Authentication means confirming your own identity, whereas authorization means being able to access the system.',
    user_id: 2,
    date: 'May 02, 2018',
  },
  {
    title: 'Object-Relational Mapping',
    body: 'I have really loved learning about ORMs.  It has really simplified the way I run queries in SQL!',
    user_id: 3,
    date: 'June 12, 2023',
  },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;