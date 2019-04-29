import React from 'react';
import './style.css';

export default function({title}) {
  return (
    <header className="title__header">
      <h2 className="title__value"> - {title} - </h2>
    </header>
  );
}
