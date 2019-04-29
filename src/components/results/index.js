import React from 'react';
import './style.css';

export default function({ close, defaultTime, isModalOpen, history, playAgain }) {
  const time = history.map(e => e.time).reduce((p, c) => p + (defaultTime - c), 0);

  return isModalOpen && (
    <section className="results">
      <div className="results__container">
        <button className="action__close" onClick={() => close()}>✗</button>
        <header className="results__header">
          Results:&nbsp;
          <var className="results__header_counter">{history.filter(e => e.isValid).length}</var>/<var className="results__header_counter">{history.length}</var>
          &nbsp;|&nbsp;
          Average time:&nbsp;<time className="results__header_time">{Number(time / 7).toPrecision(2)}s</time>
          &nbsp;|&nbsp;
          Total time:&nbsp;<time className="results__header_time">{time}s</time>
        </header>

        <ul className="results__list">
          {history.map(e => (
            <li key={e.id} className="list__item">
              <div className="list__image_box">
                <img className="list__image" alt={e.god.god} src={`./images/gods/${e.god.image.toLowerCase()}`} />
              </div>
              <h5 className="list__title">{e.god.title}</h5>
              <hgroup className="list__headers">
                <h4 className="list__header --valid">{e.god.god}</h4>
                {!e.isValid && <h4 className="list__header --invalid">{e.answer}</h4>}
              </hgroup>
              <time className="list__time">{defaultTime - e.time}s</time>
              <figure className="list__figure">
                <img className="list__figure_image" alt={`class: ${e.god.class.toLowerCase()}`} src={`./images/class/${e.god.class.toLowerCase()}.png`} />
                <figcaption className="list__figure_label">{e.god.class.toLowerCase()}</figcaption>
              </figure>
              <figure className="list__figure">
                <img className="list__figure_image" alt={`pantheon: ${e.god.pantheon.toLowerCase()}`} src={`./images/pantheon/${e.god.pantheon.toLowerCase()}.png`} />
                <figcaption className="list__figure_label">{e.god.pantheon.toLowerCase()}</figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <footer className="results__footer">
          <button className="action__play_again" onClick={() => playAgain()}>Play Again</button>
        </footer>
      </div>
    </section>
  );
}
