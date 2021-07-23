import React, { useState } from 'react';
import { lightTheme, darkTheme } from '../../Utils/colorTheme';
import ThemeContext from './Theme';

export const Theme = ({ children }) => {
  
  const [theme,setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    if (theme.backgroundPrimary === '#fbfbfb') setTheme(darkTheme);
    else setTheme(lightTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => React.useContext(ThemeContext);