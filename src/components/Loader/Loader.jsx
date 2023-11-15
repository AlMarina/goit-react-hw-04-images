import { BallTriangle } from 'react-loader-spinner';

const Loader = () => {
  return (
    <>
      <BallTriangle
        height={250}
        width={250}
        radius={5}
        color="#3f51b5"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle={{
          // marginTop: '50px',
          // marginBottom: '50px',
          margin: 'auto',
          justifyContent: 'center',
        }}
        visible={true}
      />
    </>
  );
};

export default Loader;
