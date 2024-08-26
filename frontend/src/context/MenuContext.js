import React, { createContext, useState } from "react";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [mode, setMode] = useState('manual');
  const [difficulty, setDifficulty] = useState('beginner');
  const [boardType, setBoardType] = useState("random"); 
  const [jsonFile, setJsonFile] = useState(null); 

  return (
    <MenuContext.Provider value={{ mode, setMode,difficulty,setDifficulty,boardType, setBoardType,jsonFile, setJsonFile }}>
      {children}
    </MenuContext.Provider>
  );
};