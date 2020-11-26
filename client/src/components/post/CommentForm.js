import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';

import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <div className='post-form'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <TextField
          variant='outlined'
          margin='normal'
          name='text'
          rows={3}
          maxRows={5}
          label='Comment on this post'
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          fullWidth
          required
        ></TextField>
        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
