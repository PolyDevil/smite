import React from 'react';
import c from 'classnames';
import './style.css';

export default function({ value, isCorrect, isFinished, gods, onChange, onKeyDown, next, skip, playAgain }) {
  return (
    <label className="search__label">
      <input
        className="search__input"
        placeholder="Start typing..."
        list="gods"
        onChange={e => onChange(e)}
        onKeyDown={e => onKeyDown(e)}
        value={value}
      />

      {isFinished
        ? (<button
          title="Play Again"
          onClick={() => playAgain()}
          className="action__next --valid"
        >Play Again</button>)
        : (<button
          title="Answer"
          onClick={() => next()}
          className={c("action__next", {
            "--valid": isCorrect,
          })}
        >Next</button>)
      }

      <button
        title="Skip"
        onClick={() => skip()}
        className={c("action__skip", {
          "--disabled": isCorrect,
        })}
      >Skip</button>

      <datalist id="gods">
        {gods.map(e => <option key={e} value={e} />)}
      </datalist>
    </label>
  );
}
