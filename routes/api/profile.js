const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const logger = require('../../util/logger');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

/**
 * @route       GET api/profile/me
 * @description Get current user's profile
 * @access      Private
 */
router.get('/me', auth, async (req, res) => {
  logger.http('Service called', {
    service: `GET api/profile/me`,
    user: req.user.id,
  });

  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      logger.error('There is no profile for this user', {
        service: `GET api/profile/me`,
        user: req.user.id,
      });
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    logger.info('Request successful', {
      service: `GET api/profile/me`,
      user: req.user.id,
    });
    res.json(profile);
  } catch (err) {
    logger.error(err.message, {
      service: `GET api/profile/me`,
      user: req.user.id,
    });
    res.status(500).send('Server Error');
  }
});

/**
 * @route       POST api/profile
 * @description Create or update user profile
 * @access      Private
 */
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    logger.http('Service called', {
      service: `POST api/profile`,
      user: req.user.id,
    });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      logger.error('Validation error', {
        service: 'POST api/profile',
        user: req.user.id,
      });
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;

    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    // Build social object
    profileFields.social = {};

    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        logger.info('Request successful', {
          service: 'POST api/profile',
          user: req.user.id,
        });
        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);

      await profile.save();

      logger.info('Request successful', {
        service: 'POST api/profile',
        user: req.user.id,
      });
      res.json(profile);
    } catch (err) {
      logger.error(err.message, {
        service: 'POST api/profile',
        user: req.user.id,
      });
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route       GET api/profile
 * @description Get all profiles
 * @access      Public
 */
router.get('/', async (req, res) => {
  logger.http('Service called', {
    service: `GET api/profile`,
  });

  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    logger.info('Request successful', {
      service: 'GET api/profile',
    });
    res.json(profiles);
  } catch (err) {
    logger.error(err.message, { service: 'GET api/profile' });
    res.status(500).send('Server Error');
  }
});

/**
 * @route       GET api/profile/user/:user_id
 * @description Get profile by user ID
 * @access      Public
 */
router.get('/user/:user_id', async (req, res) => {
  logger.http('Service called', {
    service: `GET api/profile/user/${req.params.user_id}`,
  });

  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      logger.error('There is no profile for this user', {
        service: `GET api/profile/user/${req.params.user_id}`,
      });
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    logger.info('Request successful', {
      service: `GET api/profile/user/${req.params.user_id}`,
    });
    res.json(profile);
  } catch (err) {
    logger.error(err.message, {
      service: `GET api/profile/user/${req.params.user_id}`,
    });

    if (err.kind == 'ObjectId') {
      logger.error('There is no profile for this user', {
        service: `GET api/profile/user/${req.params.user_id}`,
      });
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.status(500).send('Server Error');
  }
});

/**
 * @route       DELETE api/profile
 * @description Delete profile, user & posts
 * @access      Private
 */
router.delete('/', auth, async (req, res) => {
  logger.http('Service called', {
    service: `DELETE api/profile`,
    user: req.user.id,
  });

  try {
    // Remove user's posts
    await Post.deleteMany({ user: req.user.id });

    // Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Remove Profile
    await User.findOneAndRemove({ _id: req.user.id });

    logger.info('Request successful', {
      service: `DELETE api/profile`,
      user: req.user.id,
    });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    logger.error(err.message, {
      service: `DELETE api/profile`,
      user: req.user.id,
    });
    res.status(500).send('Server Error');
  }
});

/**
 * @route       PUT api/profile/experience
 * @description Add Profile Experience
 * @access      Private
 */
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    logger.http('Service called', {
      service: `PUT api/profile/experience`,
      user: req.user.id,
    });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      logger.error('Validation error', {
        service: `PUT api/profile/experience`,
        user: req.user.id,
      });
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      logger.info('Request successful', {
        service: `PUT api/profile/experience`,
        user: req.user.id,
      });
      res.json(profile);
    } catch (err) {
      logger.error(err.message, {
        service: `PUT api/profile/experience`,
        user: req.user.id,
      });
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route       DELETE api/profile/experience/:exp_id
 * @description Delete Experience from profile
 * @access      Private
 */
router.delete('/experience/:exp_id', auth, async (req, res) => {
  logger.http('Service called', {
    service: `DELETE api/profile/experience/${req.params.exp_id}`,
    user: req.user.id,
  });

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    logger.info('Request successful', {
      service: `DELETE api/profile/experience/${req.params.exp_id}`,
      user: req.user.id,
    });
    res.json(profile);
  } catch (err) {
    logger.error(err.message, {
      service: `DELETE api/profile/experience/${req.params.exp_id}`,
      user: req.user.id,
    });
    res.status(500).send('Server Error');
  }
});

/**
 * @route       PUT api/profile/education
 * @description Add Profile Education
 * @access      Private
 */
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'Field of study is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    logger.http('Service called', {
      service: `PUT api/profile/education`,
      user: req.user.id,
    });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      logger.error('Validation error', {
        service: `PUT api/profile/education`,
        user: req.user.id,
      });
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      logger.info('Request successful', {
        service: `PUT api/profile/education`,
        user: req.user.id,
      });
      res.json(profile);
    } catch (err) {
      logger.error(err.message, {
        service: `PUT api/profile/education`,
        user: req.user.id,
      });
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route       DELETE api/profile/education/:edu_id
 * @description Delete education from profile
 * @access      Private
 */
router.delete('/education/:edu_id', auth, async (req, res) => {
  logger.http('Service called', {
    service: `DELETE api/profile/education/${req.params.edu_id}`,
    user: req.user.id,
  });

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    logger.info('Request successful', {
      service: `DELETE api/profile/education/${req.params.edu_id}`,
      user: req.user.id,
    });
    res.json(profile);
  } catch (err) {
    logger.error(err.message, {
      service: `DELETE api/profile/education/${req.params.edu_id}`,
      user: req.user.id,
    });
    res.status(500).send('Server Error');
  }
});

/**
 * @route       GET api/profile/github/:username
 * @description Get user repos from Github
 * @access      Public
 */
router.get('/github/:username', async (req, res) => {
  logger.http('Service called', {
    service: `GET api/profile/github/${req.params.username}`,
  });

  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_Secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(options, (error, response, body) => {
      if (error)
        logger.error(error, {
          service: `GET api/profile/github/${req.params.username}`,
        });

      if (response.statusCode !== 200) {
        logger.error('No Github profile found', {
          service: `GET api/profile/github/${req.params.username}`,
        });
        return res.status(404).json({ msg: 'No Github profile found' });
      }

      logger.info('Request successful', {
        service: `GET api/profile/github/${req.params.username}`,
      });
      res.json(JSON.parse(body));
    });
  } catch (err) {
    logger.error(err.message, {
      service: `GET api/profile/github/${req.params.username}`,
    });
    res.status(500).send('Server Error');
  }
});

module.exports = router;
