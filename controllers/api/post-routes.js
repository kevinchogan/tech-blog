const router = require('express').Router();
const { Post } = require('../../models');

// CREATE post
router.post('/', async (req, res) => {
  try {
    const dbPostData = await Post.create({
      title: req.body.title,
      body: req.body.body,
      user_id: req.body.user_id,
    });
    res.status(200).json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// update a post
router.put("/:id", async (req, res) => {
    try {
      const dbPostData = await Post.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!dbPostData[0]) {
        res.status(404).json({ message: "No category found with that id!" });
        return;
      }
      res.status(200).json(dbPostData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// delete a post by its `id` value
router.delete("/:id", async (req, res) => {
    try {
      // Delete the category
      const dbPostData = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
      console.log(dbPostData);
  
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with that id!" });
        return;
      }
  
      res.status(200).json(dbPostData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
