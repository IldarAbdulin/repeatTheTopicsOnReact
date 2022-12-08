import React from 'react';

function MyModal({ children, visible, setVisible }) {
  return (
    <div
      className={visible ? 'myModal active' : 'myModal'}
      onClick={() => setVisible(false)}
    >
      <div className="myModalContent" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default MyModal;
