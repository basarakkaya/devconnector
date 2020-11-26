import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 16,
    margin: '16px 0px',
  },
}));

const Dashboard = ({
  auth: { user, isAuthenticated },
  deleteAccount,
  getCurrentProfile,
  profile: { profile, loading },
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (isAuthenticated && user) getCurrentProfile();
  }, [isAuthenticated, user, getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <Paper className={classes.paper} elevation={3}>
        <p className='lead'>
          <i className='fas fa-user'></i> Welcome {user && user.name}
        </p>
        {profile !== null && <DashboardActions />}
      </Paper>
      {profile !== null ? (
        <Fragment>
          <Paper className={classes.paper} elevation={3}>
            <Experience experience={profile.experience} />
          </Paper>
          <Paper className={classes.paper} elevation={3}>
            <Education education={profile.education} />
          </Paper>
          <Button
            variant='outlined'
            color='secondary'
            onClick={deleteAccount}
            startIcon={<i className='fas fa-user-minus'></i>}
          >
            Delete My Account
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>{' '}
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { deleteAccount, getCurrentProfile })(
  Dashboard
);
