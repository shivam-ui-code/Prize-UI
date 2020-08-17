import React, { useState } from 'react';
import './App.css';
import start from './music/Drum Roll - Gaming Sound Effect (HD).mp3';
import annoucement from './music/Party Horn Sound Effect.mp3'
import Confetti from 'react-dom-confetti';
import { winner } from './config/winnerConfig';

function App() {
  const [hurray, effect] = useState(false);
  const [winnerDetail, winnerDetails] = useState({
    placeholder: '',
    name: '',
    prize: '',
    className: ''
  })

  let count = 0;
  const toggle = () => {
    count ? phaseTwo() : phaseOne();
  }

  const phaseOne = () => {
    count++;
    effect(false);
    new Audio(start).play();
  }



  const phaseTwo = () => {
    console.log(winner());
    count = 0;
    new Audio(annoucement).play();
    setTimeout(() => {
      winnerDetails({ ...winner() });
      new Audio(annoucement).play();
      effect(true);
    }, 2000)



  }
  const config = {
    angle: 90,
    spread: 360,
    startVelocity: 20,
    elementCount: 200,
    dragFriction: 0.03,
    duration: 8000,
    stagger: 2,
    width: "20px",
    height: "15px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };



  return (

    <div className="App" onClick={toggle} >
      <Confetti active={hurray} config={config} />
      <p class='image'>And the winner is...</p>
      <div class="container">
        <Confetti active={hurray} config={config} />
        <div class="box">
          <p className={`react-transition ${winnerDetail.className}`}>{winnerDetail.placeholder}</p>
          <p className={`react-transition ${winnerDetail.className}`}>{winnerDetail.name}</p>
          <p className={`react-transition ${winnerDetail.className}`}>{winnerDetail.prize}</p>
          <Confetti active={hurray} config={config} />
        </div>
      </div>
      <div class='img'>
      </div>
    </div >

  );
}

export default App;
