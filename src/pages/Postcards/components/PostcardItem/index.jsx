import React from 'react';
import PropTypes from 'prop-types';
import {
  PostcardItemContainer,
  PostcardImage,
  PostcardOverlay,
  PostcardTitle
} from './styles';

const PostcardItem = ({ postcard, onClick }) => {
  return (
    <PostcardItemContainer onClick={() => onClick(postcard)}>
      <PostcardImage src={postcard.image} alt={postcard.title} />
      <PostcardOverlay>
        <PostcardTitle>{postcard.title}</PostcardTitle>
      </PostcardOverlay>
    </PostcardItemContainer>
  );
};

PostcardItem.propTypes = {
  postcard: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default PostcardItem;
