import React, { useState, useEffect } from 'react';
import Dice from './Dice';
import PlayerCard from './PlayerCard';

const GameBoard: React.FC = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentTurn, setCurrentTurn] = useState<'player' | 'computer'>('player');

  useEffect(() => {
    if (currentTurn === 'computer' && !isGameOver) {
      handleComputerTurn();
    }
  }, [currentTurn]);

  const rollDice = () => {
    setIsRolling(true);
    const newDiceValue = Math.ceil(Math.random() * 6);

    setTimeout(() => {
      setDiceValue(newDiceValue);

      if (currentTurn === 'player') {
        const newPlayerScore = playerScore + newDiceValue;
        setPlayerScore(newPlayerScore);

        if (newPlayerScore >= 20) {
          setIsGameOver(true);
        } else {
          setCurrentTurn('computer');
        }
      } else if (currentTurn === 'computer') {
        const newComputerScore = computerScore + newDiceValue;
        setComputerScore(newComputerScore);

        if (newComputerScore >= 20) {
          setIsGameOver(true);
        } else {
          setCurrentTurn('player');
        }
      }

      setIsRolling(false);
    }, 1000);
  };

  const handleComputerTurn = () => {
    if (isGameOver) return;
    setTimeout(() => {
      if (!isGameOver) {
        rollDice();
      }
    }, 1500);
  };

  const resetGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setDiceValue(1);
    setCurrentTurn('player');
    setIsGameOver(false);
  };

  return (
    <div className="game-board">
      <h1>Dice Game 🎲</h1>
      <p>
        {!isGameOver
          ? `It's ${currentTurn === 'player' ? 'Player' : 'Computer'}'s Turn!`
          : `${playerScore >= 20 ? 'Player Wins! 🏆' : 'Computer Wins! 🤖'}`}
      </p>
      <div className="players">
        <PlayerCard
          name="Player"
          score={playerScore}
          isWinner={playerScore >= 20}
          isActive={currentTurn === 'player'}
          isLoser={playerScore < 20 && isGameOver && computerScore >= 20}
        />
        <PlayerCard
          name="Computer"
          score={computerScore}
          isWinner={computerScore >= 20}
          isActive={currentTurn === 'computer'}
          isLoser={computerScore < 20 && isGameOver && playerScore >= 20}
        />
      </div>
      <div className="dice-section">
        <Dice value={diceValue} isRolling={isRolling} />
        {!isGameOver ? (
          <button
            onClick={rollDice}
            disabled={isRolling || currentTurn === 'computer'}
          >
            {isRolling ? 'Rolling...' : 'Roll Dice'}
          </button>
        ) : (
          <button onClick={resetGame}>Restart Game</button>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
