import { createTheme } from '@mui/material';
import { lightBlue, yellow } from '@mui/material/colors';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: yellow[500],
        },
        secondary: {
            main: lightBlue[500],
        },
    },
    typography: {
        fontSize: 16,
        button: {
            textTransform: 'none',
        },
    },
});
