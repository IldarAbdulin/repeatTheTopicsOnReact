import React from 'react';
export function MyButton({ children, ...props }) {
  return (
    <button {...props} className="myBtn">
      {children}
    </button>
  );
}
