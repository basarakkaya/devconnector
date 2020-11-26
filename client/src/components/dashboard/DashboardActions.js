import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '0px 4px',
  },
}));

const DashboardActions = () => {
  const classes = useStyles();

  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile'>
        <Button
          variant='outlined'
          color='primary'
          startIcon={<i className='fas fa-user-circle text-primary'></i>}
          className={classes.button}
        >
          Edit Profile
        </Button>
      </Link>
      <Link to='/add-experience'>
        <Button
          variant='outlined'
          color='primary'
          startIcon={<i className='fab fa-black-tie text-primary'></i>}
          className={classes.button}
        >
          Add Experience
        </Button>
      </Link>
      <Link to='/add-education'>
        <Button
          variant='outlined'
          color='primary'
          startIcon={<i className='fas fa-graduation-cap text-primary'></i>}
          className={classes.button}
        >
          Add Education
        </Button>
      </Link>
    </div>
  );
};

export default DashboardActions;
