import React from 'react';
import './style.css';

export default function({hint, type, time, defaultTime, triggerTime}) {
  return (
    <div className="hint">
      <figure className="hint__figure">
        {hint.isActivated ? (
          <img className="hint__image" alt={hint.text} src={hint.image} />
        ) : (
          <svg width="128" height="128">
            <circle
              cx="64"
              cy="64"
              r="62"
              fill="#383e4a"
              stroke="#262d3d"
              strokeWidth="4"
            />
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="hint__svg_time">{time - triggerTime}</text>
            <circle
              className="hint__svg_loader"
              cx="64"
              cy="64"
              r="62"
              stroke="#38e8de"
              fill="none"
              strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 62}`}
              strokeDashoffset={`${(2 * Math.PI * 62) * (1 - (
                time - triggerTime > 0
                ? (defaultTime - triggerTime - (time - triggerTime)) / (defaultTime - triggerTime)
                : 1
              ))}`}
            />
          </svg>
        )}
        <figcaption className="hint__description">{hint.isActivated ? hint.text : type}</figcaption>
      </figure>
    </div>
  );
}
