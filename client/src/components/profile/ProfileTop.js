import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 16,
    margin: '16px 0px',
  },
}));

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  const classes = useStyles();

  return (
    <Paper className={[classes.paper, 'profile-top p-2']} elevation={3}>
      <img className='round-img my-1' src={avatar} alt='' />
      <h1 className='large'>{name}</h1>
      <p className='lead'>
        {status} {company && <span>at {company}</span>}
      </p>
      <p>{location}</p>
      <div className='icons my-1'>
        {website && (
          <a href={website} target='_blank' rel='noopener noreferrer'>
            <Icon color='primary' className='fas fa-globe'></Icon>
          </a>
        )}
        {social && social.twitter && (
          <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
            <Icon color='primary' className='fab fa-twitter'></Icon>
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <Icon color='primary' className='fab fa-facebook'></Icon>
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
            <Icon color='primary' className='fab fa-linkedin'></Icon>
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
            <Icon color='primary' className='fab fa-youtube'></Icon>
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            <Icon color='primary' className='fab fa-instagram'></Icon>
          </a>
        )}
      </div>
    </Paper>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
