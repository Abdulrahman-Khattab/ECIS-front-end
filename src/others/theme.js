import { createTheme } from '@mui/material';
import { red, blue, brown, green } from '@mui/material/colors';

export const appTheme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: brown[500],
    },
    bw: { main: '#ffffff' },
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: { main: green[500] },
    bw: { main: '#000000' },
  },
});
