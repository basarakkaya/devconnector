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

import { deleteEducation } from '../../actions/profile';

const Education = ({ deleteEducation, education }) => {
  const collapse = useMediaQuery('(max-width:480px)');

  return (
    <Fragment>
      <h2>Education Credentials</h2>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>School</TableCell>
              {!collapse && <TableCell>Degree</TableCell>}
              {!collapse && <TableCell>Years</TableCell>}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {education.map((edu) => (
              <TableRow key={edu._id}>
                <TableCell component='th' scope='row'>
                  {edu.school}
                </TableCell>
                {!collapse && <TableCell>{edu.degree}</TableCell>}
                {!collapse && (
                  <TableCell>
                    <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
                    {edu.to === null ? (
                      'Now'
                    ) : (
                      <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
                    )}
                  </TableCell>
                )}
                <TableCell align='right'>
                  <IconButton
                    edge='start'
                    color='secondary'
                    aria-label='delete'
                    onClick={() => deleteEducation(edu._id)}
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

Education.propTypes = {
  education: PropTypes.array.isRequired,
};

export default connect(null, { deleteEducation })(Education);
