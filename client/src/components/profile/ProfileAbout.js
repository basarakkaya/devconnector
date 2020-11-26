import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Divider, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 16,
    margin: '16px 0px',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  divider: {
    margin: '16px 0px',
  },
}));

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  const classes = useStyles();

  return (
    <Paper
      className={[classes.paper, 'profile-about bg-light p-2']}
      elevation={3}
    >
      <h2>{name.trim('').split(' ')[0]}'s Bio</h2>
      <p>{bio}</p>
      <Divider className={classes.divider} />
      <h2>Skill Set</h2>
      <div className='skills'>
        {skills.map((skill, index) => (
          <Chip key={index} label={skill} className={classes.chip} />
        ))}
      </div>
    </Paper>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
