import React from 'react';
import c from 'classnames';
import './style.css';

export default function({history, questionId}) {
  return (
    <div className="history">
      {history.map((e, i) => (
        <div
          key={`${e.answer}__${i}`}
          className={c("history_status", {
            "--current": i === questionId,
            "--valid": e.answer && e.isValid,
            "--invalid": e.answer && !e.isValid,
          })}
        />
      ))}
    </div>
  );
}
