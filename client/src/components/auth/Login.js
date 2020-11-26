import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { login } from '../../actions/auth';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 16,
    margin: '16px 0px',
  },
  submit: {
    marginTop: 16,
  },
}));

const Login = ({ isAuthenticated, login }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <Paper className={classes.paper} elevation={3}>
        <p className='lead'>
          <i className='fas fa-user'></i> Sign into Your Account
        </p>
        <form onSubmit={onSubmit}>
          <TextField
            margin='normal'
            variant='outlined'
            type='email'
            label='Email Address'
            name='email'
            value={email}
            onChange={onChange}
            fullWidth
            required
          />
          <TextField
            margin='normal'
            variant='outlined'
            type='password'
            label='Password'
            name='password'
            value={password}
            onChange={onChange}
            fullWidth
            required
          />
          <Button
            type='submit'
            color='primary'
            variant='contained'
            className={classes.submit}
            fullWidth
          >
            Login
          </Button>
        </form>
        <p className='my-1'>
          Don't have an account?{' '}
          <Link to='/register'>
            <Button color='primary'>Sign Up</Button>
          </Link>
        </p>
      </Paper>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
