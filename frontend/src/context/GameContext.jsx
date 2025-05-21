// GameContext.jsx
import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [game, setGame] = useState(null);
  const [ground, setGround] = useState(null);

  return (
    <GameContext.Provider value={{ game, setGame, ground, setGround }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
