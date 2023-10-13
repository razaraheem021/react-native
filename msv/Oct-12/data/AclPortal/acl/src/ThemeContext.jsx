// ThemeContext.js
import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isActivetheme, setIsActivetheme] = useState(false); // Default theme is light

  const toggleTheme = () => {
    setIsActivetheme(!isActivetheme);
  };

  return (
    <ThemeContext.Provider value={{ isActivetheme, toggleTheme, setIsActivetheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
