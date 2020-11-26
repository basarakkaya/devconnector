import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  IconButton,
  Icon,
  useMediaQuery,
} from '@material-ui/core';

import { deleteExperience } from '../../actions/profile';

const Experience = ({ deleteExperience, experience }) => {
  const collapse = useMediaQuery('(max-width:480px)');

  return (
    <Fragment>
      <h2>Experience Credentials</h2>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              {!collapse && <TableCell>Title</TableCell>}
              {!collapse && <TableCell>Years</TableCell>}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {experience.map((exp) => (
              <TableRow key={exp._id}>
                <TableCell component='th' scope='row'>
                  {exp.company}
                </TableCell>
                {!collapse && <TableCell>{exp.title}</TableCell>}
                {!collapse && (
                  <TableCell>
                    <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
                    {exp.to === null ? (
                      'Now'
                    ) : (
                      <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
                    )}
                  </TableCell>
                )}
                <TableCell align='right'>
                  <IconButton
                    edge='start'
                    color='secondary'
                    aria-label='delete'
                    onClick={() => deleteExperience(exp._id)}
                  >
                    <Icon>delete</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
