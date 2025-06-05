import React from 'react';
import PropTypes from 'prop-types';
import { FaShare, FaDownload, FaTimes, FaMapMarkerAlt, FaUser, FaCalendarAlt } from 'react-icons/fa';
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  ModalHeader,
  ModalBody,
  FullPostcardImage,
  PostcardInfo,
  PostcardDescription,
  PostcardMetadata,
  MetadataItem,
  ShareContainer,
  ShareButton,
  DownloadButton
} from './styles';

const PostcardModal = ({ postcard, onClose, onShare, onDownload }) => {
  // Impedir a rolagem do corpo quando o modal estiver aberto
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}><FaTimes /></CloseButton>
        
        <ModalHeader>
          <h2>{postcard.title}</h2>
        </ModalHeader>
        
        <ModalBody>
          <FullPostcardImage 
            src={postcard.image} 
            alt={postcard.title} 
          />
          
          <PostcardInfo>
            <PostcardDescription>
              {postcard.description}
            </PostcardDescription>
            
            <PostcardMetadata>
              <MetadataItem>
                <strong><FaMapMarkerAlt /> Local:</strong> {postcard.location}
              </MetadataItem>
              <MetadataItem>
                <strong><FaUser /> Autor:</strong> {postcard.author}
              </MetadataItem>
              <MetadataItem>
                <strong><FaCalendarAlt /> Ano:</strong> {postcard.year}
              </MetadataItem>
            </PostcardMetadata>
            
            <ShareContainer>
              <ShareButton onClick={onShare}>
                <FaShare /> Compartilhar
              </ShareButton>
              <DownloadButton onClick={onDownload}>
                <FaDownload /> Download
              </DownloadButton>
            </ShareContainer>
          </PostcardInfo>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

PostcardModal.propTypes = {
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
  onClose: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired
};

export default PostcardModal;
