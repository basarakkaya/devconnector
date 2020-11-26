import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';

import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  return (
    <div className='post-form'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text });
          setText('');
        }}
      >
        <TextField
          margin='normal'
          variant='outlined'
          name='text'
          rows={3}
          rowsMax={5}
          label='Create a post'
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          multiline
          required
        ></TextField>
        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
