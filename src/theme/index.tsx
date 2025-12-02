import React, { createContext, PropsWithChildren, useContext } from 'react';
import { Colors, Spacing, Typography, Radii, Shadows } from './tokens';

const ThemeContext = createContext({ Colors, Spacing, Typography, Radii, Shadows });

export const ThemeProvider = ({ children }: PropsWithChildren) => (
  <ThemeContext.Provider value={{ Colors, Spacing, Typography, Radii, Shadows }}>{children}</ThemeContext.Provider>
);

export const useTheme = () => useContext(ThemeContext);
