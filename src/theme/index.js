// src/theme/index.js
import { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

// Definizione delle palette di colori
export const tokens = (mode) => ({
  ...(mode === 'dark'
    ? {
        primary: {
          100: '#d0d1e6',
          200: '#a1a4ce',
          300: '#7376b5',
          400: '#44499d',
          500: '#151c84',
          600: '#11166a',
          700: '#0d114f',
          800: '#080b35',
          900: '#04061a'
        },
        secondary: {
          100: '#f9d8e6',
          200: '#f3b1cd',
          300: '#ed8bb3',
          400: '#e7649a',
          500: '#e13d81',
          600: '#b43167',
          700: '#87254d',
          800: '#5a1834',
          900: '#2d0c1a'
        },
        neutral: {
          100: '#f5f5f5',
          200: '#ecebeb',
          300: '#e2e1e1',
          400: '#d9d7d7',
          500: '#cfcdcd',
          600: '#a6a4a4',
          700: '#7c7b7b',
          800: '#535252',
          900: '#292929'
        },
        background: {
          100: '#121212',
          200: '#1e1e1e',
          300: '#2a2a2a',
          400: '#3a3a3a',
          500: '#4a4a4a',
          600: '#6c6c6c',
          700: '#8e8e8e',
          800: '#afafaf',
          900: '#d7d7d7'
        }
      }
    : {
        primary: {
          100: '#04061a',
          200: '#080b35',
          300: '#0d114f',
          400: '#11166a',
          500: '#151c84',
          600: '#44499d',
          700: '#7376b5',
          800: '#a1a4ce',
          900: '#d0d1e6'
        },
        secondary: {
          100: '#2d0c1a',
          200: '#5a1834',
          300: '#87254d',
          400: '#b43167',
          500: '#e13d81',
          600: '#e7649a',
          700: '#ed8bb3',
          800: '#f3b1cd',
          900: '#f9d8e6'
        },
        neutral: {
          100: '#292929',
          200: '#535252',
          300: '#7c7b7b',
          400: '#a6a4a4',
          500: '#cfcdcd',
          600: '#d9d7d7',
          700: '#e2e1e1',
          800: '#ecebeb',
          900: '#f5f5f5'
        },
        background: {
          100: '#ffffff',
          200: '#fafafa',
          300: '#f5f5f5',
          400: '#f0f0f0',
          500: '#e0e0e0',
          600: '#b3b3b3',
          700: '#878787',
          800: '#5a5a5a',
          900: '#2d2d2d'
        }
      })
});

// Configurazione del tema
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            primary: {
              main: colors.primary[500],
              light: colors.primary[300],
              dark: colors.primary[700]
            },
            secondary: {
              main: colors.secondary[500],
              light: colors.secondary[300],
              dark: colors.secondary[700]
            },
            background: {
              default: colors.background[100],
              paper: colors.background[200]
            },
            text: {
              primary: colors.neutral[900],
              secondary: colors.neutral[700],
              disabled: colors.neutral[500]
            }
          }
        : {
            primary: {
              main: colors.primary[500],
              light: colors.primary[300],
              dark: colors.primary[700]
            },
            secondary: {
              main: colors.secondary[500],
              light: colors.secondary[300],
              dark: colors.secondary[700]
            },
            background: {
              default: colors.background[100],
              paper: colors.background[100]
            },
            text: {
              primary: colors.neutral[100],
              secondary: colors.neutral[200],
              disabled: colors.neutral[400]
            }
          })
    },
    typography: {
      fontFamily: [
        '"Inter"',
        'sans-serif'
      ].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['"Inter"', 'sans-serif'].join(','),
        fontSize: 40,
        fontWeight: 600
      },
      h2: {
        fontFamily: ['"Inter"', 'sans-serif'].join(','),
        fontSize: 32,
        fontWeight: 600
      },
      h3: {
        fontFamily: ['"Inter"', 'sans-serif'].join(','),
        fontSize: 24,
        fontWeight: 600
      },
      h4: {
        fontFamily: ['"Inter"', 'sans-serif'].join(','),
        fontSize: 20,
        fontWeight: 600
      },
      h5: {
        fontFamily: ['"Inter"', 'sans-serif'].join(','),
        fontSize: 16,
        fontWeight: 600
      },
      h6: {
        fontFamily: ['"Inter"', 'sans-serif'].join(','),
        fontSize: 14,
        fontWeight: 600
      },
      subtitle1: {
        fontFamily: ['"Inter"', 'sans-serif'].join(','),
        fontSize: 14,
        fontWeight: 500
      },
      subtitle2: {
        fontFamily: ['"Inter"', 'sans-serif'].join(','),
        fontSize: 12,
        fontWeight: 500
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            fontWeight: 600
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: mode === 'dark' 
              ? '0px 4px 10px rgba(0, 0, 0, 0.25)' 
              : '0px 2px 10px rgba(0, 0, 0, 0.05)'
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 4,
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          }
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: mode === 'dark'
              ? `1px solid ${colors.background[300]}`
              : `1px solid ${colors.background[300]}`
          }
        }
      }
    }
  };
};

// Contesto per la gestione del tema
export const ColorModeContext = createContext({
  toggleColorMode: () => {}
});

// Hook personalizzato per utilizzare il tema
export const useMode = () => {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
      }
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};

// Esporta il tema di default
export default function createMuiTheme() {
  const [theme] = useMode();
  return theme;
}