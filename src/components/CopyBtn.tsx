'use client';
import React, { useState } from 'react';

export interface Props {
  copyText: string;
}

export default function CopyBtn(props: Props) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(props.copyText);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 1000); 
  };

  return (
    <button
      className={`transition-transform ${isClicked ? 'animate-customSpinAnimation' : ''}`}
      onClick={handleClick}
    >
      <i className="fa-regular fa-copy text-plum-300"></i>
    </button>
  );
}