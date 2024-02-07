const router = require('express').Router();
const { Comment } = require('../../models');

// CREATE comment
router.post('/', async (req, res) => {
  try {
    const dbCommentData = await Comment.create({
      comment: req.body.comment,
      post_id: req.body.post_id,
      user_id: req.body.user_id,
    });
    res.status(200).json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
