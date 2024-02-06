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
      loggedIn: req.session.loggedIn,
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
      include: [{ model: Comment }, {model: User}],
    });

    const postData = dbPostData.get({ plain: true });
    
    if(req.session.user_id === postData.user.id) {
      res.render('my-post', { 
        postData, 
       });
    } else {
      res.render('post', { 
        postData, 
        loggedIn: req.session.loggedIn,
       });
    }
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


// Sign up route
router.get('/signup', (req, res) => {
  res.render('signup');
});
module.exports = router;
