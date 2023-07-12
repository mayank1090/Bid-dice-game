// import logo from './logo.svg';
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentscore1, setcurrent1] = useState(0);
  const [currentscore2, setcurrent2] = useState(0);
  const [player1score, setplayer1] = useState(0);
  const [player2score, setplayer2] = useState(0);
  const [activeplayer, setactive] = useState(0);
  const [dicenumber, setdice] = useState();
  const [gamefinished, setgamefinish] = useState(false);

  useEffect(() => {
    if (player1score > 99|| player2score > 99) {
      document.querySelector(".winnerhead").classList.remove("hidden");
      setgamefinish(true);
      document.querySelector(".dice").classList.toggle("hidden");
    }
  }, [player1score, player2score]);

  const rolldice = () => {
    if (!gamefinished) {
      let number = parseInt(Math.random() * 6 + 1);

      document.querySelector(".dice").classList.remove("hidden");

      setdice(number);

      if (number === 1) {
        if (activeplayer === 0) {
          setcurrent1(0);
          document
            .querySelector(".player--0")
            .classList.remove("player--active");
          document.querySelector(".player--1").classList.add("player--active");
        } else {
          setcurrent2(0);
          document
            .querySelector(".player--1")
            .classList.remove("player--active");
          document.querySelector(".player--0").classList.add("player--active");
        }

        activeplayer === 0 ? setactive(1) : setactive(0);
      } else {
        if (activeplayer === 0) {
          setcurrent1(currentscore1 + number);
        } else {
          setcurrent2(currentscore2 + number);
        }
      }
    }
  };

  const Holdbtn = () => {
    if (!gamefinished) {
      if (activeplayer === 0) {
        setplayer1(player1score + currentscore1);
        setcurrent1(0);
        document.querySelector(".player--0").classList.remove("player--active");
        document.querySelector(".player--1").classList.add("player--active");
      } else {
        setplayer2(player2score + currentscore2);
        setcurrent2(0);
        document.querySelector(".player--1").classList.remove("player--active");
        document.querySelector(".player--0").classList.add("player--active");
      }
      activeplayer === 0 ? setactive(1) : setactive(0);
    }
  };

  const resetgame = () => {
    setcurrent1(0);
    setcurrent2(0);
    setplayer1(0);
    setplayer2(0);
    setactive(0);
    setdice(undefined);
    setgamefinish(false);
    document.querySelector(".winnerhead").classList.add("hidden");
    document.querySelector(".dice").classList.add("hidden");
    document.querySelector(".player--1").classList.remove("player--active");
    document.querySelector(".player--0").classList.add("player--active");
  };

  const winnertext = player1score >= 100 ? "Player 1 winner" : "Player 2 winner";

  return (
    <main>
      <section class="player player--0 player--active">
        <h2 class="name" id="name--0">
          Player 1
        </h2>
        <p class="score" id="score--0">
          {player1score}
        </p>
        <div class="current">
          <p class="current-label">Current</p>
          <p class="current-score" id="current--0">
            {currentscore1}
          </p>
        </div>
      </section>
      <section class="player player--1">
        <h2 class="name" id="name--1">
          Player 2
        </h2>
        <p class="score" id="score--1">
          {player2score}
        </p>
        <div class="current">
          <p class="current-label">Current</p>
          <p class="current-score" id="current--1">
            {currentscore2}
          </p>
        </div>
      </section>

      <img
        src={`Pictures/dice-${dicenumber}.png`}
        alt="Playing dice"
        class="dice hidden"
      />
      <button class="btn btn--new" onClick={resetgame}>
        🔄 New game
      </button>
      <button class="btn btn--roll" onClick={rolldice}>
        🎲 Roll dice
      </button>
      <button class="btn btn--hold" onClick={Holdbtn}>
        📥 Hold
      </button>
      <div className="hidden winnerhead">
        <h1 className="winnertext">{winnertext}</h1>
      </div>
    </main>
  );
}

export default App;
