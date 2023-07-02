import { Spinner } from './Loader.styled';
import { RotatingLines } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Spinner>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="50"
        visible={true}
      >
        Loading...
      </RotatingLines>
    </Spinner>
  );
};

export default Loader;
