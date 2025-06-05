import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  PostcardItemContainer,
  PostcardImage,
  PostcardOverlay,
  PostcardTitle
} from './styles';

const PostcardItem = ({ postcard, onClick }) => {
  const { t } = useTranslation();
  
  const title = postcard.titleKey ? t(postcard.titleKey) : postcard.title;
  
  return (
    <PostcardItemContainer onClick={() => onClick(postcard)}>
      <PostcardImage src={postcard.image} alt={title} />
      <PostcardOverlay>
        <PostcardTitle>{title}</PostcardTitle>
      </PostcardOverlay>
    </PostcardItemContainer>
  );
};

PostcardItem.propTypes = {
  postcard: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    titleKey: PropTypes.string,
    image: PropTypes.string.isRequired,
    description: PropTypes.string,
    descriptionKey: PropTypes.string,
    location: PropTypes.string,
    locationKey: PropTypes.string,
    author: PropTypes.string,
    authorKey: PropTypes.string,
    year: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default PostcardItem;
