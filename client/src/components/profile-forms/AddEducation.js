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
import { addEducation } from '../../actions/profile';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 16,
    margin: '16px 0px',
  },
  submit: {
    marginTop: 16,
  },
}));

const AddEducation = ({ addEducation, history }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    current: false,
    to: '',
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    current,
    to,
    description,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    addEducation(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add Your Education</h1>
      <Paper className={classes.paper} elevation={3}>
        <p className='lead'>
          <i className='fas fa-graduation-cap'></i> Add any school, bootcamp,
          etc that you have attended
        </p>
        <small>* = required field</small>
        <form onSubmit={onSubmit}>
          <TextField
            margin='normal'
            variant='outlined'
            type='text'
            label='School or Bootcamp'
            name='school'
            onChange={onChange}
            value={school}
            fullWidth
            required
          />
          <TextField
            margin='normal'
            variant='outlined'
            type='text'
            label='Degree or Certificate'
            name='degree'
            onChange={onChange}
            value={degree}
            fullWidth
            required
          />
          <TextField
            margin='normal'
            variant='outlined'
            type='text'
            label='Field Of Study'
            name='fieldofstudy'
            onChange={onChange}
            value={fieldofstudy}
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
            label='Program Description'
            onChange={onChange}
            value={description}
            multiline
            fullWidth
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.submit}
            fullWidth
          >
            Submit
          </Button>
          <Link to='/dashboard'>
            <Button
              variant='outlined'
              color='primary'
              className={classes.submit}
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
