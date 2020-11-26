import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Avatar,
  Button,
  Chip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '8px 0px',
  },
  chips: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Link to={`/profile/${_id}`}>
            <Avatar src={avatar} alt='' />
          </Link>
        }
        title={
          <Link to={`/profile/${_id}`}>
            <span>{name}</span>
          </Link>
        }
        subheader={
          <p>
            {status} {company && <span>at {company}</span>}
            {' - '}
            {location}
          </p>
        }
      />
      <CardContent className={classes.chips}>
        {skills.slice(0, 4).map((skill, index) => (
          <Chip key={index} label={skill} />
        ))}
      </CardContent>
      <CardActions disableSpacing>
        <Link to={`/profile/${_id}`}>
          <Button color='primary'>View Profile</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
