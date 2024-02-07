const router = require("express").Router();
const { User, Post, Comment } = require("../models");

// GET all posts for homepage
router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [{ model: User }],
    });

    const postData = dbPostData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      postData,
      loggedIn: req.session.loggedIn,
      pageTitle: "The Tech Blog",
      isDashboard: false,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET user posts for homepage
router.get("/dashboard", async (req, res) => {
  if (req.session.loggedIn) {
    try {
      const dbPostData = await Post.findAll({
        where: {
          user_id: req.session.user_id,
        },
        include: [{ model: User }],
      });

      const postData = dbPostData.map((post) => post.get({ plain: true }));

      res.render("homepage", {
        postData,
        loggedIn: req.session.loggedIn,
        pageTitle: "Dashboard",
        isDashboard: true,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.redirect("/login");
  }
});

// GET one post
router.get("/posts/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [{ model: Comment }, { model: User }],
    });

    const postData = dbPostData.get({ plain: true });

    if (req.session.user_id === postData.user.id) {
      res.render("my-post", {
        postData,
      });
    } else {
      let userComment = {};
      postData.comments.map((comment) => {
        if (comment.user_id === req.session.user_id) {
          userComment = {
            body: comment.comment,
            author: req.session.username,
            date: comment.createdAt,
          };
        }
      });
      res.render("post", {
        postData,
        loggedIn: req.session.loggedIn,
        comment: userComment,
        userId: req.session.user_id,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'login' template
  res.render("login");
});

// Sign up route
router.get("/signup", (req, res) => {
  res.render("signup");
});
module.exports = router;
