import React, { Component } from 'react';
import _setInterval from 'setinterval-plus';
import Header from './components/header';
import Hints from './components/hints';
import Title from './components/title';
import Answer from './components/answer';
import Input from './components/input';
import History from './components/history';
import Results from './components/results';
import { gods, HINT_TYPES } from './data';
import './App.css';

const godNames = gods.map(e => e.name);
const defaultTime = 9;
const firstHintTime = 6;
const secondHintTime = 3;

const defaultHints = {
  pantheon: {
    image: '',
    text: '',
    isActivated: false,
  },

  class: {
    image: '',
    text: '',
    isActivated: false,
  },
};

class App extends Component {
  state = {
    value: '',
    isCorrect: false,
    isModalOpen: false,
    gods: godNames.slice(0, 7),
    hints: defaultHints,
    timer: defaultTime * 7,

    history: Array.from(new Array(7)).map((e, i) => ({
      id: i,
      answer: "",
      god: {},
      time: defaultTime,
      isValid: false
    })),

    puzzle: gods.map((e, i) => i).sort(() => .5 - Math.random()).slice(0, 7).map(e => ({
      god: gods[e].name,
      title: gods[e].title,
      pantheon: gods[e].pantheon,
      class: gods[e].class,
      image: gods[e].image,
    })),

    questionId: 0,
  }

  componentDidMount() {
    this.interval = new _setInterval(() => {
      const { history, questionId, timer } = this.state;

      if(timer > 0) {
        if (history[questionId].time > 0) {
          this.setState({
            timer: timer - 1,

            history: history.map((item, index) => index !== questionId
              ? item
              : {
                ...item,
                ...{
                  time: item.time - 1,
                }
              }
            ),
          });
        } else {
          this.setState({
            timer: timer - 1,
          });
        }
      } else {
        this.interval.stop();
        this.finish();
      }
    }, 1000);
  }

  componentWillUnmount() {
    this.interval.stop();
  }

  componentDidUpdate(prevProps, prevState) {
    const { history, questionId, timer } = this.state;

    if (prevState.timer - timer === 1) {
      if (history[questionId].time + 1 === firstHintTime) {
        this.useHint('class');
      } else if (history[questionId].time + 1 === secondHintTime) {
        this.useHint('pantheon');
      }
    }
  }

  onChange(e) {
    const v = e.target.value;

    this.setState({
      value: v,
      gods: godNames.filter(e => e.toLowerCase().includes(v.toLowerCase()))
                    .sort((x, y) => x.indexOf(v.toLowerCase()) - y.indexOf(v.toLowerCase()))
                    .slice(0, 7),
    });

    const { puzzle, questionId } = this.state;

    if (godNames.map(e => e.toLowerCase()).filter(e => e.startsWith(v.toLowerCase())).length > 1) {
      if (v.toLowerCase() === puzzle[questionId].god.toLowerCase()) {
        this.interval.pause();
        this.setAnswerValid(v);
      }
    } else {
      if(godNames.map(e => e.toLowerCase()).includes(v.toLowerCase())) {
        if (v.toLowerCase() === puzzle[questionId].god.toLowerCase()) {
          this.interval.pause();
          this.setAnswerValid(v);
        } else {
          this.interval.pause();
          this.setAnswerInvalid(v);
        }
      }
    }
  }

  onKeyDown(e) {
    if (e.key === 'Enter') {
      this.next();
    }
  }

  setAnswerValid(v) {
    const { history, puzzle, questionId } = this.state;
    const god = puzzle[questionId];

    this.setState({
      isCorrect: true,
      gods: [],

      hints: {
        pantheon: {
          image: `./images/pantheon/${god.pantheon.toLowerCase()}.png`,
          text: god.pantheon,
          isActivated: true,
        },

        class: {
          image: `./images/class/${god.class.toLowerCase()}.png`,
          text: god.class,
          isActivated: true,
        },
      },

      history: history.map((item, index) => index !== questionId
        ? item
        : {
          ...item,
          ...{
            answer: v,
            god,
            isValid: true,
          }
        }
      ),
    });
  }

  setAnswerInvalid(v) {
    const { history, puzzle, questionId } = this.state;

    this.setState({
      history: history.map((item, index) => index !== questionId
        ? item
        : {
          ...item,
          ...{
            answer: v,
            god: puzzle[questionId],
            isValid: false,
          }
        }
      ),
    });
  }

  useHint(type) {
    const { hints, puzzle, questionId } = this.state;

    if (HINT_TYPES[type] && !hints[type].isActivated) {
      const image = `./images/${type}/${(type === HINT_TYPES.class ? puzzle[questionId].class : puzzle[questionId].pantheon).toLowerCase()}.png`;
      const text = type === HINT_TYPES.class ? puzzle[questionId].class : puzzle[questionId].pantheon;

      this.setState({
        hints: {
          ...hints,
          [type]: {
            image,
            text,
            isActivated: true,
          }
        }
      });
    }
  }

  next() {
    const { history, isCorrect, puzzle, questionId, value } = this.state;

    if (history.filter(e => !e.answer).length) {
      this.interval.resume();

      if (!isCorrect || value.toLowerCase() === puzzle[questionId].god.toLowerCase()) {
        this.skip();
      }
    } else {
      this.finish();
    }
  }

  skip() {
    const { history, puzzle, questionId } = this.state;

    const questions = [
      ...history.filter(e => e.id !== questionId && !e.answer && e.id > questionId),
      ...history.filter(e => e.id !== questionId && !e.answer),
    ];

    if (questions.length) {
      this.interval.resume();
      const god = puzzle[questions[0].id];
      const time = history[questions[0].id].time;

      this.setState({
        value: '',
        isCorrect: false,
        gods: godNames.slice(0, 7),
        questionId: questions[0].id,

        hints: {
          ...defaultHints,

          ...(time <= secondHintTime && {
            pantheon: {
              image: `./images/pantheon/${god.pantheon.toLowerCase()}.png`,
              text: god.pantheon,
              isActivated: true,
            },
          }),

          ...(time <= firstHintTime && {
            class: {
              image: `./images/class/${god.class.toLowerCase()}.png`,
              text: god.class,
              isActivated: true,
            },
          }),
        },
      });
    } else {
      this.interval.pause();
      this.finish();
    }
  }

  finish() {
    const { history, puzzle } = this.state;

    this.setState({
      history: history.map((item, index) => item.answer
        ? item
        : {
          ...item,
          ...{
            god: puzzle[index],
            isValid: false,
          }
        }
      ),
    });

    this.openModal();
  }

  openModal() {
    document.body.classList.remove('--modal_open');
    this.setState({
      isModalOpen: true,
    });
  }

  closeModal() {
    document.body.classList.add('--modal_open');
    setTimeout(() => {
      this.setState({
        isModalOpen: false,
      });
    }, 1000);
  }

  render () {
    const { gods, hints, history, isCorrect, isModalOpen, puzzle, questionId, timer, value } = this.state;

    return (
      <div className="app">
        <Header timer={timer} defaultTime={defaultTime} />

        <main className="app__main">
          <Hints
            history={history}
            questionId={questionId}
            hints={hints}
            defaultTime={defaultTime}
            firstHintTime={firstHintTime}
            secondHintTime={secondHintTime}
          />

          <Title title={puzzle[questionId].title} />

          <Input
            value={value}
            isCorrect={isCorrect}
            gods={gods}
            onChange={(e) => this.onChange(e)}
            onKeyDown={(e) => this.onKeyDown(e)}
            next={() => this.next()}
            skip={() => this.skip()}
          />

          <Answer answer={history[questionId]} />
        </main>

        <footer className="app__footer">
          <History history={history} questionId={questionId} />
        </footer>

        <Results
          close={() => this.closeModal()}
          isModalOpen={isModalOpen}
          defaultTime={defaultTime}
          history={history}
        />
      </div>
    );
  }
}

export default App;
