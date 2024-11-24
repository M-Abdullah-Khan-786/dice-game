import React from 'react';
import { motion } from 'framer-motion';

interface PlayerCardProps {
  name: string;
  score: number;
  isWinner: boolean;
  isActive: boolean;
  isLoser?: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ name, score, isWinner, isActive, isLoser }) => {
  return (
    <motion.div
      className={`player-card ${isWinner ? 'winner' : ''} ${isLoser ? 'loser' : ''}`}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        scale: isActive ? 1.2 : 1,
        boxShadow: isActive
          ? '0 0 15px 5px gold'
          : isLoser
          ? '0 0 15px 5px #ff4d4d'
          : 'none',
      }}
      transition={{ duration: 0.5 }}
    >
      <h2>{name}</h2>
      <p>Score: {score}</p>
      {isWinner && <p className="winner-text">🎉 Winner!</p>}
      {isLoser && <p className="loser-text">😢 Loser</p>}
    </motion.div>
  );
};

export default PlayerCard;
