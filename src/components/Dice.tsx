import React from 'react';
import { motion } from 'framer-motion';

interface DiceProps {
  value: number;
  isRolling: boolean;
}

const diceRollVariants = {
  rolling: { rotate: [0, 360, 720], scale: [1, 1.2, 1] },
  stopped: { rotate: 0, scale: 1 },
};

const Dice: React.FC<DiceProps> = ({ value, isRolling }) => {
  return (
    <motion.div
      className="dice"
      animate={isRolling ? 'rolling' : 'stopped'}
      variants={diceRollVariants}
      transition={{ duration: 1 }}
    >
      🎲 {value}
    </motion.div>
  );
};

export default Dice;
