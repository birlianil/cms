import React, { createContext, PropsWithChildren, useContext } from 'react';
import { Colors, Spacing, Typography } from './tokens';

const ThemeContext = createContext({ Colors, Spacing, Typography });

export const ThemeProvider = ({ children }: PropsWithChildren) => (
  <ThemeContext.Provider value={{ Colors, Spacing, Typography }}>{children}</ThemeContext.Provider>
);

export const useTheme = () => useContext(ThemeContext);
