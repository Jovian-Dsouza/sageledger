import React from 'react'

function GradientButton({children, onClick, className=''}) {
  return (
    <button onClick={onClick} className={`gradient-button ${className}`}>
      {children}
    </button>
  );
}

export default GradientButton