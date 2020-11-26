import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Icon,
  Badge,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { addLike, removeLike, deletePost } from '../../actions/post';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '8px 0px',
  },
}));

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
  addLike,
  removeLike,
  deletePost,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Link to={`/profile/${user}`}>
            <Avatar src={avatar} alt='' />
          </Link>
        }
        action={
          !auth.loading &&
          user === auth.user._id && (
            <IconButton aria-label='settings' onClick={(e) => deletePost(_id)}>
              <Icon color='secondary'>delete</Icon>
            </IconButton>
          )
        }
        title={
          <Link to={`/profile/${user}`}>
            <span>{name}</span>
          </Link>
        }
        subheader={
          <span>
            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </span>
        }
      />
      <CardContent>
        <Typography variant='body1' color='textPrimary' component='p'>
          {text}
        </Typography>
      </CardContent>
      {showActions && (
        <CardActions disableSpacing>
          <IconButton aria-label='like' onClick={(e) => addLike(_id)}>
            <Badge badgeContent={likes.length} color='primary'>
              <Icon>thumb_up</Icon>
            </Badge>
          </IconButton>
          <IconButton aria-label='unlike' onClick={(e) => removeLike(_id)}>
            <Icon>thumb_down</Icon>
          </IconButton>
          <Link to={`/post/${_id}`}>
            <IconButton aria-label='comments'>
              <Badge badgeContent={comments.length} color='primary'>
                <Icon>mode_comment</Icon>
              </Badge>
            </IconButton>
          </Link>
        </CardActions>
      )}
    </Card>
  );
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  showActions: PropTypes.bool,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
