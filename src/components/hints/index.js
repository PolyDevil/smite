import React from 'react';
import Hint from './hint';
import './style.css';

export default function({history, questionId, hints, defaultTime, firstHintTime, secondHintTime}) {
  return (
    <div className="hints">
      <Hint
        hint={hints.class}
        type="Class"
        time={history[questionId].time}
        defaultTime={defaultTime}
        triggerTime={firstHintTime}
      />

      <Hint
        hint={hints.pantheon}
        type="Pantheon"
        time={history[questionId].time}
        defaultTime={defaultTime}
        triggerTime={secondHintTime}
      />
    </div>
  );
}
