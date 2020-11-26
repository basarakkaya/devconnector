import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Paper,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { addExperience } from '../../actions/profile';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 16,
    margin: '16px 0px',
  },
  submit: {
    marginTop: 16,
  },
}));

const AddExperience = ({ addExperience, history }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    addExperience(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add An Experience</h1>
      <Paper className={classes.paper} elevation={3}>
        <p className='lead'>
          <i className='fas fa-code-branch'></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form onSubmit={onSubmit}>
          <TextField
            margin='normal'
            variant='outlined'
            type='text'
            label='Job Title'
            name='title'
            onChange={onChange}
            value={title}
            fullWidth
            required
          />
          <TextField
            margin='normal'
            variant='outlined'
            type='text'
            label='Company'
            name='company'
            onChange={onChange}
            value={company}
            fullWidth
            required
          />
          <TextField
            margin='normal'
            variant='outlined'
            type='text'
            label='Location'
            name='location'
            onChange={onChange}
            value={location}
            fullWidth
          />
          <TextField
            margin='normal'
            variant='outlined'
            type='date'
            label='From'
            name='from'
            defaultValue={new Date()}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
            value={from}
            fullWidth
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  name='current'
                  checked={current}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      to: '',
                      current: !current,
                    });
                    toggleDisabled(!toDateDisabled);
                  }}
                  color='primary'
                />
              }
              label='Current'
            />
          </FormGroup>
          <TextField
            margin='normal'
            variant='outlined'
            type='date'
            label='To'
            name='to'
            defaultValue={new Date()}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
            value={to}
            disabled={toDateDisabled}
            fullWidth
          />
          <TextField
            margin='normal'
            variant='outlined'
            name='description'
            rows={1}
            rowsMax={3}
            label='Job Description'
            onChange={onChange}
            value={description}
            multiline
            fullWidth
          ></TextField>
          <Button
            className={classes.submit}
            variant='contained'
            color='primary'
            type='submit'
            fullWidth
          >
            Submit
          </Button>
          <Link to='/dashboard'>
            <Button
              className={classes.submit}
              variant='outlined'
              color='primary'
              fullWidth
            >
              Go Back
            </Button>
          </Link>
        </form>
      </Paper>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
