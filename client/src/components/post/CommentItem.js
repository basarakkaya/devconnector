import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Icon,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { deleteComment } from '../../actions/post';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '8px 0px',
  },
}));

const CommentItem = ({
  auth,
  postId,
  comment: { _id, text, name, avatar, user, date },
  deleteComment,
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
            <IconButton
              aria-label='settings'
              onClick={(e) => deleteComment(postId, _id)}
            >
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
            Commented on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </span>
        }
      />
      <CardContent>
        <Typography variant='body1' color='textPrimary' component='p'>
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

CommentItem.propTypes = {
  postID: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
