const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [{ model: User }],
    });

    const postData = dbPostData.map((post) =>
      post.get({ plain: true })
    );

    res.render('homepage', {
      postData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one post
router.get('/posts/:id', async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [{ model: Comment }],
    });

    const postData = dbPostData.get({ plain: true });
    res.render('post', { postData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

module.exports = router;
