import React from 'react';

export default function Button({ onClick, text }) {
  return (
    <button
      className='bg-brand text-white py-2 px-4 rounded-sm hover:brightness-110'
      onClick={onClick}
    >
      {text}
    </button>
  );
}
