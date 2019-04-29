import React from 'react';
import c from 'classnames';
import './style.css';

export default function({timer, defaultTime}) {
  return (
    <header className="header">
      <time
        className={c("header__countdown", {
          "--last": timer < 10,
          "--finished": timer === 0,
        })}
      >{timer}</time>

      <span className="header__timer" style={{transform: `translateX(-${((defaultTime * 7) - timer) / (defaultTime * 7) * 100}%)`}} />
    </header>
  );
}
