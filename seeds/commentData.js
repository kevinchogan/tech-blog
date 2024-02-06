const { Comment } = require('../models');

const commentdata = [
  {
    comment: 'I agree.  Without that organizational principle, it would be much more difficult to collaborate!',
    post_id: 1,
    user_id: 2,
    date: 'May 10, 2007',
  },
  {
    comment: 'Are people really confused by this?',
    post_id: 2,
    user_id: 3,
    date: 'July 22, 2018',
  },
  {
    comment: 'What are ORMs?',
    post_id: 3,
    user_id: 1,
    date: 'October 10, 2023',
  },
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;