import { useState, useEffect } from 'react';
import './App.css';
import Modal from './components/Modal';
import SingleCard from './components/SingleCard';

const cardImages = [
  { src: '/assets/card-angry.png', matched: false },
  { src: '/assets/card-frown.png', matched: false },
  { src: '/assets/card-happy.png', matched: false },
  { src: '/assets/card-joy.png', matched: false },
  { src: '/assets/card-kiss.png', matched: false },
  { src: '/assets/card-love.png', matched: false },
  { src: '/assets/card-sad.png', matched: false },
  { src: '/assets/card-smile.png', matched: false },
  { src: '/assets/card-yawn.png', matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [highscore, setHighscore] = useState(0);
  const [won, setWon] = useState(false);
  const [hint, setHint] = useState(false);
  const [numberOfHint, setNumberOfHint] = useState(3);
  const [disableHint, setDisableHint] = useState(false);

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setWon(false);
    setHint(false);
    setNumberOfHint(3);
  };

  // Start the game automaticlally
  useEffect(() => shuffleCards(), []);

  // Check whether user won
  useEffect(() => {
    cards.every((card) => card.matched === true) ? setWon(true) : setWon(false);
    if (won) setHighscore(turns);
  }, [cards, won, turns]);

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // Flip when asked for hint
  const handleFlip = () => {
    setHint(true);
    if (numberOfHint === 1) setDisableHint(true);
    setNumberOfHint((prevHint) => prevHint - 1);
    setTimeout(() => setHint(false), 2000);
  };

  return (
    <div className='App'>
      {won && <Modal handleReset={shuffleCards} />}
      <header>
        <div className='header'>
          <h1>Made for each other</h1>
        </div>
        <button onClick={shuffleCards}>New Game</button>
        <button disabled={disableHint} onClick={handleFlip}>
          Hint: {numberOfHint}
        </button>
        <div className='game-score'>
          <span className='best'>Best: {highscore}</span>
          <span className='score'>Score: {turns}</span>
        </div>
      </header>

      <div className='card-grid'>
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={
              card === choiceOne || card === choiceTwo || card.matched || hint
            }
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
