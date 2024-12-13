import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#E5E5E5',
            paper: '#ffffff',
        },
        primary: {
            main: '#485879',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#bb0706',
            contrastText: '#ffffff',
        },
        divider: '#d8d8d8',
    },
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: '14px',
                },
            },
        },
    },
})