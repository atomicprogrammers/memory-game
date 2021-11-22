import './Modal.css';

const Modal = () => {
  return (
    <div className='modal-backdrop'>
      <div className='modal'>
        <h2>Congratulations! You Won.</h2>
        <p>Play again?</p>
        <div className='modal-button'>
          <button>Yes</button>
          <button>No</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
