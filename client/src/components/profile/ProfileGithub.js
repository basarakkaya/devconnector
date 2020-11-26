import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Badge,
  Icon,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Spinner from '../layout/Spinner';

import { getGithubRepos } from '../../actions/profile';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '8px 0px',
  },
}));

const ProfileGithub = ({ username, repos, getGithubRepos }) => {
  const classes = useStyles();

  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>
        <i className='fab fa-github'></i> Github Repos
      </h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo) => (
          <Card className={classes.root} key={repo._id} elevation={3}>
            <CardHeader
              title={
                <a
                  href={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {repo.name}
                </a>
              }
            />
            <CardContent>
              <Typography variant='body1' color='textPrimary' component='p'>
                {repo.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Badge
                badgeContent={repo.stargazers_count}
                color='primary'
                showZero
              >
                <Icon className='fas fa-star'></Icon>
              </Badge>
              <Badge
                badgeContent={repo.watchers_count}
                color='primary'
                showZero
              >
                <Icon className='fas fa-code-branch'></Icon>
              </Badge>
              <Badge badgeContent={repo.forks_count} color='primary' showZero>
                <Icon className='far fa-eye'></Icon>
              </Badge>
            </CardActions>
          </Card>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
