import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useMediaQuery,
  IconButton,
  Icon,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { logout } from '../../actions/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1000,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: 300,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 300,
  },
  toolbar: theme.mixins.toolbar,
}));

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const classes = useStyles();
  const collapse = useMediaQuery('(max-width:768px)');
  const [drawerOpen, toggleDrawerOpen] = useState(false);

  const appbarLinks = (links) => (
    <Fragment>
      {links.map((link) => (
        <Button color='inherit' key={link.slug}>
          <Link
            to={link.slug}
            {...(link.onclick ? { onClick: link.onclick } : {})}
          >
            {link.text}
          </Link>
        </Button>
      ))}{' '}
    </Fragment>
  );

  const drawerLinks = (links) => (
    <List>
      {links.map((link) => (
        <ListItem key={link.slug}>
          <Link
            to={link.slug}
            onClick={() => {
              toggleDrawerOpen(false);
              if (link.onclick) link.onclick();
            }}
          >
            <ListItemText primary={link.text} />
          </Link>
        </ListItem>
      ))}
    </List>
  );

  const authLinks = [
    { slug: '/profiles', text: 'Developers' },
    { slug: '/posts', text: 'Posts' },
    { slug: '/dashboard', text: 'Dashboard' },
    { slug: '/#!', text: 'Logout', onclick: logout },
  ];

  const guestLinks = [
    { slug: '/profiles', text: 'Developers' },
    { slug: '/register', text: 'Register' },
    { slug: '/login', text: 'Login' },
  ];

  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar>
        {collapse && (
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={() => toggleDrawerOpen(!drawerOpen)}
          >
            {drawerOpen ? <Icon>close</Icon> : <Icon>menu</Icon>}
          </IconButton>
        )}
        <Link to='/' className={classes.title}>
          <Typography variant='h6' color='inherit'>
            <i className='fas fa-code' />
            DevConnector
          </Typography>
        </Link>
        {!loading &&
          !collapse &&
          appbarLinks(isAuthenticated ? authLinks : guestLinks)}
      </Toolbar>
      {collapse && (
        <Drawer
          open={drawerOpen}
          onClose={() => toggleDrawerOpen(false)}
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
        >
          <div className={classes.toolbar}></div>
          {!loading && drawerLinks(isAuthenticated ? authLinks : guestLinks)}
        </Drawer>
      )}
    </AppBar>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
