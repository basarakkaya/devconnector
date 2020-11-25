const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const logger = require('../../util/logger');

const Post = require('../../models/Post');
const User = require('../../models/User');

/**
 * @route       POST api/posts
 * @description Create a post
 * @access      Private
 */
router.post(
  '/',
  [auth, [check('text', 'Text is rquired').not().isEmpty()]],
  async (req, res) => {
    logger.http('Service called', {
      service: 'POST api/posts',
      user: req.user.id,
    });
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      logger.error('Validation error', {
        service: 'POST api/posts',
        user: req.user.id,
      });
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      logger.info('Request successful', {
        service: 'POST api/posts',
        user: req.user.id,
      });
      res.json(post);
    } catch (err) {
      logger.error(err.message, {
        service: 'POST api/posts',
        user: req.user.id,
      });
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route       GET api/posts
 * @description Get all posts
 * @access      Private
 */
router.get('/', auth, async (req, res) => {
  logger.http('Service called', {
    service: 'GET api/posts',
    user: req.user.id,
  });

  try {
    const posts = await Post.find().sort({ date: -1 });

    logger.info('Request successful', {
      service: 'GET api/posts',
      user: req.user.id,
    });
    res.json(posts);
  } catch (err) {
    logger.error(err.message, { service: 'GET api/posts', user: req.user.id });
    res.status(500).send('Server Error');
  }
});

/**
 * @route       GET api/posts/:id
 * @description Get post by ID
 * @access      Private
 */
router.get('/:id', auth, async (req, res) => {
  logger.http('Service called', {
    service: `GET api/posts/${req.params.id}`,
    user: req.user.id,
  });

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      logger.error('Post not found', {
        service: `GET api/posts/${req.params.id}`,
        user: req.user.id,
      });
      return res.status(404).json({ msg: 'Post not found ' });
    }

    logger.info('Request successful', {
      service: `GET api/posts/${req.params.id}`,
      user: req.user.id,
    });
    res.json(post);
  } catch (err) {
    logger.error(err.message, {
      service: `GET api/posts/${req.params.id}`,
      user: req.user.id,
    });

    if (err.kind === 'ObjectId') {
      logger.error('Post not found', {
        service: `GET api/posts/${req.params.id}`,
        user: req.user.id,
      });
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.status(500).send('Server Error');
  }
});

/**
 * @route       DELETE api/posts/:id
 * @description Delete post by ID
 * @access      Private
 */
router.delete('/:id', auth, async (req, res) => {
  logger.http('Service called', {
    service: `DELETE api/posts/${req.params.id}`,
    user: req.user.id,
  });

  try {
    const post = await Post.findById(req.params.id);

    // Check user
    if (post.user.toString() !== req.user.id) {
      logger.error('USer not authorized', {
        service: `DELETE api/posts/${req.params.id}`,
        user: req.user.id,
      });
      return res.status(401).json({ msg: 'User not authorized ' });
    }

    await post.remove();

    logger.info('Request successful', {
      service: `DELETE api/posts/${req.params.id}`,
      user: req.user.id,
    });
    res.json({ msg: 'Post removed' });
  } catch (err) {
    logger.error(err.message, {
      service: `DELETE api/posts/${req.params.id}`,
      user: req.user.id,
    });

    if (err.kind === 'ObjectId') {
      logger.error('Post not found', {
        service: `DELETE api/posts/${req.params.id}`,
        user: req.user.id,
      });
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.status(500).send('Server Error');
  }
});

/**
 * @route       PUT api/posts/like/:id
 * @description Like a post
 * @access      Private
 */
router.put('/like/:id', auth, async (req, res) => {
  logger.http('Service called', {
    service: `PUT api/posts/like/${req.params.id}`,
    user: req.user.id,
  });

  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      logger.error('Post has already been liked', {
        service: `PUT api/posts/like/${req.params.id}`,
        user: req.user.id,
      });
      return res.status(400).json({ msg: 'Post has already been liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    logger.info('Request successful', {
      service: `PUT api/posts/like/${req.params.id}`,
      user: req.user.id,
    });
    res.json(post.likes);
  } catch (err) {
    logger.error(err.message, {
      service: `PUT api/posts/like/${req.params.id}`,
      user: req.user.id,
    });
    res.status(500).send('Server Error');
  }
});

/**
 * @route       PUT api/posts/unlike/:id
 * @description Unlike a post
 * @access      Private
 */
router.put('/unlike/:id', auth, async (req, res) => {
  logger.http('Service called', {
    service: `PUT api/posts/unlike/${req.params.id}`,
    user: req.user.id,
  });

  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has not yet been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      logger.error('Post has not yet been liked', {
        service: `PUT api/posts/unlike/${req.params.id}`,
        user: req.user.id,
      });
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    logger.info('Request successful', {
      service: `PUT api/posts/unlike/${req.params.id}`,
      user: req.user.id,
    });
    res.json(post.likes);
  } catch (err) {
    logger.error(err.message, {
      service: `PUT api/posts/unlike/${req.params.id}`,
      user: req.user.id,
    });
    res.status(500).send('Server Error');
  }
});

/**
 * @route       POST api/posts/comment/:id
 * @description Comment on a post
 * @access      Private
 */
router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is rquired').not().isEmpty()]],
  async (req, res) => {
    logger.http('Service called', {
      service: `POST api/posts/comment/${req.params.id}`,
      user: req.user.id,
    });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      logger.error('Validation error', {
        service: `POST api/posts/comment/${req.params.id}`,
        user: req.user.id,
      });
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      logger.info('Request successful', {
        service: `POST api/posts/comment/${req.params.id}`,
        user: req.user.id,
      });
      res.json(post.comments);
    } catch (err) {
      logger.error(err.message, {
        service: `POST api/posts/comment/${req.params.id}`,
        user: req.user.id,
      });
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route       DELETE api/posts/comment/:id/:comment_id
 * @description Delete a comment
 * @access      Private
 */
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  logger.http('Service called', {
    service: `DELETE api/posts/comment/${req.params.id}/${req.params.comment_id}`,
    user: req.user.id,
  });

  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      logger.error('Comment does not exist', {
        service: `DELETE api/posts/comment/${req.params.id}/${req.params.comment_id}`,
        user: req.user.id,
      });
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      logger.error('User not authorized', {
        service: `DELETE api/posts/comment/${req.params.id}/${req.params.comment_id}`,
        user: req.user.id,
      });
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Get remove index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    logger.info('Request successful', {
      service: `DELETE api/posts/comment/${req.params.id}/${req.params.comment_id}`,
      user: req.user.id,
    });
    res.json(post.comments);
  } catch (err) {
    logger.error(err.message, {
      service: `DELETE api/posts/comment/${req.params.id}/${req.params.comment_id}`,
      user: req.user.id,
    });
    res.status(500).send('Server Error');
  }
});

module.exports = router;
