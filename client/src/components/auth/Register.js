import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Paper, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 16,
    margin: '16px 0px',
  },
  submit: {
    marginTop: 16,
  },
}));

const Register = ({ isAuthenticated, setAlert, register }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <Paper className={classes.paper} elevation={3}>
        <p className='lead'>
          <i className='fas fa-user'></i> Create Your Account
        </p>
        <form onSubmit={onSubmit}>
          <TextField
            margin='normal'
            variant='outlined'
            type='text'
            label='Name'
            name='name'
            value={name}
            onChange={onChange}
            fullWidth
            required
          />
          <TextField
            margin='normal'
            variant='outlined'
            type='email'
            label='Email Address'
            name='email'
            value={email}
            onChange={onChange}
            helperText='This site uses Gravatar so if you want a profile image, use a
            Gravatar email'
            fullWidth
          />
          <TextField
            margin='normal'
            variant='outlined'
            type='password'
            label='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={onChange}
            fullWidth
          />
          <TextField
            margin='normal'
            variant='outlined'
            type='password'
            label='Confirm Password'
            name='password2'
            minLength='6'
            value={password2}
            onChange={onChange}
            fullWidth
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.submit}
            fullWidth
          >
            Register
          </Button>
        </form>
        <p className='my-1'>
          Already have an account?{' '}
          <Link to='/login'>
            <Button color='primary'>Sign In</Button>
          </Link>
        </p>
      </Paper>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
