import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ProfileItem from './ProfileItem';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 16,
    margin: '16px 0px',
  },
}));

const Profiles = ({ auth, getProfiles, profile: { profiles, loading } }) => {
  const classes = useStyles();

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Developers</h1>
          <Paper className={classes.paper} elevation={3}>
            <p className='lead'>
              <i className='fab fa-connectdevelop'></i> Browse and connect with
              developers
            </p>
            <div className='profiles'>
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <h4>No Profiles found...</h4>
              )}
            </div>
          </Paper>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
