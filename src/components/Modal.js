import './Modal.css';

const Modal = ({ handleReset }) => {
  const handleNothing = () => {
    console.log('Thankyou');
  };

  return (
    <div className='modal-backdrop'>
      <div className='modal'>
        <h2>Congratulations! You Won.</h2>
        <p>Play again?</p>
        <div className='modal-button'>
          <button onClick={handleReset}>Yes</button>
          <button onClick={handleNothing}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
