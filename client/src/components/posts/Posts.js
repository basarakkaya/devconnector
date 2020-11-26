import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

import { getPosts } from '../../actions/post';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 16,
    margin: '16px 0px',
  },
}));

const Posts = ({
  auth: { isAuthenticated },
  post: { posts, loading },
  getPosts,
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (isAuthenticated) getPosts();
  }, [isAuthenticated, getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <Paper className={classes.paper} elevation={3}>
        <p className='lead'>
          <i className='fas fa-user'></i> Welcome to the community!
        </p>
        <PostForm />
        <div className='posts'>
          {posts.map((post) => (
            <PostItem key={post._id} post={post} showActions />
          ))}
        </div>
      </Paper>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
