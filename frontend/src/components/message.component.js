import React from 'react';

const MessageBox = ({ message, color, onClose }) => {
  return (
    <div className={`alert alert-${color}  my-2 alert-dismissible fade show`} role="alert">
      <span>{message}</span>
      <button type="button" className="close" aria-label="Close" onClick={onClose}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default MessageBox;
