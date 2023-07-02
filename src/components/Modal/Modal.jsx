import PropTypes from 'prop-types';
import { Overlay, ModalBox, Image } from './Modal.styled';

const Modal = ({ image, onClose }) => (
  <Overlay onClick={onClose}>
    <ModalBox>
      <Image src={image.largeImageURL} />
    </ModalBox>
  </Overlay>
);

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
