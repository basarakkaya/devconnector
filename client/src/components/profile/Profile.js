import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Icon, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { getProfileById } from '../../actions/profile';

import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '0px 4px',
  },
  paper: {
    padding: 16,
    margin: '16px 0px',
  },
}));

const Profile = ({
  auth,
  profile: { profile, loading },
  getProfileById,
  match,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles'>
            <Button
              variant='outlined'
              color='primary'
              className={classes.button}
            >
              Back To Profiles
            </Button>
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile'>
                <Button
                  variant='contained'
                  color='primary'
                  startIcon={<Icon>create</Icon>}
                  className={classes.button}
                >
                  Edit Profile
                </Button>
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />

            <Paper
              className={[classes.paper, 'profile-exp bg-white p-2']}
              elevation={3}
            >
              <h2 className='text-primary'>Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Experience Credentials</h4>
              )}
            </Paper>

            <Paper
              className={[classes.paper, 'profile-edu bg-white p-2']}
              elevation={3}
            >
              <h2 className='text-primary'>Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Education Credentials</h4>
              )}
            </Paper>

            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
