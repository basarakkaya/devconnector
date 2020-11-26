import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  Paper,
  TextField,
  Button,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { createProfile } from '../../actions/profile';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 16,
    margin: '16px 0px',
  },
  submit: {
    marginTop: 16,
  },
}));

const CreateProfile = ({ createProfile, history }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    createProfile(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <Paper className={classes.paper} elevation={3}>
        <p className='lead'>
          <i className='fas fa-user'></i> Let's get some information to make
          your profile stand out
        </p>
        <small>* = required field</small>
        <form onSubmit={onSubmit}>
          <TextField
            margin='normal'
            select
            label='Select Professional Status'
            name='status'
            value={status}
            onChange={onChange}
            helperText='Give us an idea of where you are at in your career'
            variant='outlined'
            fullWidth
            required
          >
            <MenuItem value={0}>* </MenuItem>
            <MenuItem value='Developer'>Developer</MenuItem>
            <MenuItem value='Junior Developer'>Junior Developer</MenuItem>
            <MenuItem value='Senior Developer'>Senior Developer</MenuItem>
            <MenuItem value='Manager'>Manager</MenuItem>
            <MenuItem value='Student or Learning'>Student or Learning</MenuItem>
            <MenuItem value='Instructor'>Instructor or Teacher</MenuItem>
            <MenuItem value='Intern'>Intern</MenuItem>
            <MenuItem value='Other'>Other</MenuItem>
          </TextField>
          <TextField
            margin='normal'
            variant='outlined'
            type='text'
            label='Company'
            name='company'
            onChange={onChange}
            value={company}
            helperText='Could be your own company or one you work for'
            fullWidth
          />
          <TextField
            margin='normal'
            variant='outlined'
            type='text'
            label='Website'
            name='website'
            onChange={onChange}
            value={website}
            helperText='Could be your own or a company website'
            fullWidth
          />
          <TextField
            margin='normal'
            variant='outlined'
            type='text'
            label='Location'
            name='location'
            onChange={onChange}
            value={location}
            helperText='City & state suggested (eg. Boston, MA)'
            fullWidth
          />
          <TextField
            margin='normal'
            variant='outlined'
            type='text'
            label='* Skills'
            name='skills'
            onChange={onChange}
            value={skills}
            helperText='Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)'
            fullWidth
          />
          <TextField
            margin='normal'
            variant='outlined'
            type='text'
            label='Github Username'
            name='githubusername'
            onChange={onChange}
            value={githubusername}
            helperText='If you want your latest repos and a Github link, include your username'
            fullWidth
          />
          <TextField
            margin='normal'
            variant='outlined'
            label='A short bio of yourself'
            name='bio'
            onChange={onChange}
            value={bio}
            rows={1}
            rowsMax={3}
            helperText='Tell us a little about yourself'
            fullWidth
            multiline
          ></TextField>
          <Button
            type='button'
            color='primary'
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
          >
            Add Social Network Links
          </Button>
          <span>Optional</span>
          {displaySocialInputs && (
            <Fragment>
              <TextField
                margin='normal'
                variant='outlined'
                type='text'
                label='Twitter URL'
                name='twitter'
                onChange={onChange}
                value={twitter}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <i className='fab fa-twitter  '></i>{' '}
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
              <TextField
                margin='normal'
                variant='outlined'
                type='text'
                label='Facebook URL'
                name='facebook'
                onChange={onChange}
                value={facebook}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <i className='fab fa-facebook  '></i>{' '}
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
              <TextField
                margin='normal'
                variant='outlined'
                type='text'
                label='YouTube URL'
                name='youtube'
                onChange={onChange}
                value={youtube}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <i className='fab fa-youtube  '></i>{' '}
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
              <TextField
                margin='normal'
                variant='outlined'
                type='text'
                label='Linkedin URL'
                name='linkedin'
                onChange={onChange}
                value={linkedin}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <i className='fab fa-linkedin  '></i>{' '}
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
              <TextField
                margin='normal'
                variant='outlined'
                type='text'
                label='Instagram URL'
                name='instagram'
                onChange={onChange}
                value={instagram}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <i className='fab fa-instagram  '></i>{' '}
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Fragment>
          )}
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
              type='submit'
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

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
