import React from 'react';
import './style.css';

export default function({answer}) {
  return (
    <footer className="answer">
      {answer.answer && (
        <div className="answer__titles">
          <h3 className="answer__valid">{answer.god.god}</h3>
          {!answer.isValid && <h3 className="answer__invalid">{answer.answer}</h3>}
        </div>
      )}
    </footer>
  );
}
