import PropTypes from 'prop-types';
import { LoadButton } from './Button.styled';

const Button = ({ onLoadMore }) => {
  return (
    <LoadButton type="button" onClick={onLoadMore}>
      Load more
    </LoadButton>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
