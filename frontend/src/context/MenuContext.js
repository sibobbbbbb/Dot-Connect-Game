import React, { createContext, useState } from "react";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [mode, setMode] = useState('manual');
  const [difficulty, setDifficulty] = useState('beginner');

  return (
    <MenuContext.Provider value={{ mode, setMode,difficulty,setDifficulty }}>
      {children}
    </MenuContext.Provider>
  );
};