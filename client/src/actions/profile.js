import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  UPDATE_PROFILE,
  PROFILE_ERROR,
  DELETE_ACCOUNT,
  CLEAR_PROFILE,
} from './types';

/**
 * @ReduxAction
 * @description Fetches the profile of authenticated user
 */
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({ type: CLEAR_PROFILE });

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

/**
 * @ReduxAction
 * @description Fetches all profiles
 */
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

/**
 * @ReduxAction
 * @description Fetches the profile of a specific user with given ID
 * @param {string} userId ID of the user of which profile is being fetched
 */
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

/**
 * @ReduxAction
 * @description Fetches last 5 repos of GitHub user with given username
 * @param {string} username GitHub username
 */
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

/**
 * @ReduxAction
 * @description Creates a new profile or updates an existing one with given data
 * @param {{
 *  company: String,
 *  website: String,
 *  location: String,
 *  status: String,
 *  skills: String,
 *  githubusername: String,
 *  bio: String,
 *  twitter: String,
 *  facebook: String,
 *  linkedin: String,
 *  youtube: String,
 *  instagram: String,
 * }} formData JSON in shape of Profile Schema
 * @param {object} history History object that comes from `withRouter` of `react-router-dom`
 * @param {boolean} edit Flag to indicate whether creating a new profile or updating an existing one
 * If `true`, that means an existing profile is being edited.
 */
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({ type: GET_PROFILE, payload: res.data });
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

/**
 * @ReduxAction
 * @description Adds experience to existing profile of authenticated user
 * @param {{
 *  company: String,
 *  title: String,
 *  location: String,
 *  from: String,
 *  to: String,
 *  current: boolean,
 *  description: String,
 * }} formData JSON in shape of Experience object
 * @param {object} history History object that comes from `withRouter` of `react-router-dom`
 */
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

/**
 * @ReduxAction
 * @description Adds education to existing profile of authenticated user
 * @param {{
 *  school: String,
 *  degree: String,
 *  fieldofstudy: String,
 *  from: String,
 *  current: boolean,
 *  to: String,
 *  description: String,
 * }} formData JSON in shape of Education Object
 * @param {object} history History object that comes from `withRouter` of `react-router-dom`
 */
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/profile/education', formData, config);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

/**
 * @ReduxAction
 * @description Deletes the selected experience information
 * @param {string} id ID of experience object to be deleted
 */
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

/**
 * @ReduxAction
 * @description Deletes the selected education information
 * @param {string} id ID of education object to be deleted
 */
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

/**
 * @ReduxAction
 * @description Logs out and deletes the currently authenticated account and its information permanently
 * @param {string} id ID of the authenticated user
 */
export const deleteAccount = (id) => async (dispatch) => {
  if (window.confirm('Are you sure? This process CANNOT be undone!')) {
    try {
      await axios.delete('/api/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: DELETE_ACCOUNT });

      dispatch(
        setAlert('Your Account Has Been Permanently Deleted', 'success')
      );
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
