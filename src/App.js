import React, { useState } from 'react';
import './App.css';
import start from './music/Drum Roll - Gaming Sound Effect (HD).mp3';
import annoucement from './music/Party Horn Sound Effect.mp3'
import Confetti from 'react-dom-confetti';
import { winner } from './config/winnerConfig';
import { useRef } from 'react';
function App() {
  let btnRef = useRef();
  const globalConfig = [...winner()];
  const [hurray, effect] = useState(false);
  const [i, x] = useState(0);
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
    if (globalConfig[i]) {
      effect(false);
      new Audio(start).play();
    }
  }



  const phaseTwo = () => {
    count = 0;
    if (globalConfig[i]) {
      new Audio(annoucement).play();
      setTimeout(() => {
        if (globalConfig[i]) {
          winnerDetails({ ...globalConfig[i] });
          new Audio(annoucement).play();
          effect(true);
        }
      }, 2000)

    }
  }


  const next = (e) => {
    if (btnRef.current) {
      btnRef.current.setAttribute("disabled", "disabled");
    }
    setTimeout(() => {
      btnRef.current.removeAttribute("disabled");
    }, 5000)
    e.stopPropagation();
    alert('Next Prize......');
    x(i + 1)
    count = 0;
    effect(false);
    if (globalConfig[i + 1]) {
      winnerDetails({
        placeholder: '',
        name: '',
        prize: '',
        className: ''
      });
    } else {
      winnerDetails({
        placeholder: 'Talent wins games, but teamwork and intelligence wins championships.',
        name: 'adieu Hackathon',
        prize: '',
        className: ''
      });
      effect(true);
    }
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
      <p className='image'>And the winner is...
      <button ref={btnRef} style={{
          padding: '10px 25px',
          background: 'border-box',
          color: 'bisque',
          position: 'relative',
          margin: '20px',
          fontSize: '15px',
          fontFamily: 'cursive',
          cursor: "pointer"
        }} onClick={next}>Next</button>
      </p>
      <div className="container">
        <Confetti active={hurray} config={config} />
        <div className="box">
          <p className={`react-transition ${winnerDetail.className}`}>{winnerDetail.placeholder}</p>
          <p className={`react-transition ${winnerDetail.className}`}>{winnerDetail.name}</p>
          <p className={`react-transition ${winnerDetail.className}`}>{winnerDetail.prize}</p>
          <Confetti active={hurray} config={config} />
        </div>
      </div>
      <div className='img'>
      </div>
    </div >

  );
}

export default App;
