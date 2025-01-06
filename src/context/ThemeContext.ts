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
            main: '#78A1BB',
            contrastText: '#ffffff',
        },
        divider: '#d8d8d8',
    },
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: '18px !important',
                    maxWidth: '600px',
                    maxHeight: '600px',
                    overflowY: 'auto',
                    whiteSpace: 'pre-wrap',
                    paddingRight: '8px',
                    '& .MuiTooltip-tooltip': {
                        fontSize: '18px !important',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    height: '48px',
                    ':disabled': {
                        opacity: 0.75,
                        background: '#485879',
                        color: '#FFFFFF'
                    }
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-root': {
                        height: '48px',
                    },
                    '& .MuiInputBase-input': {
                        padding: '12.5px !important',
                        lineHeight: '1.5',
                    },
                    '& .MuiInputLabel-root': {
                        top: '-4px',
                    },
                    '& .MuiInputLabel-shrink': {
                        top: '0',
                    },
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    '&.sideNav': {
                        display: 'block',
                        '& .MuiListItemButton-root': {
                            minHeight: 48,
                            paddingLeft: '20px',
                            paddingRight: '20px',
                            '& .MuiListItemIcon-root': {
                                minWidth: 0,
                                justifyContent: 'center',
                            }
                        }
                    },


                }
            }
        },
        MuiSnackbar: {
            styleOverrides: {
                root: {

                    '& .MuiPaper-root': {
                        backgroundColor: '#485879',
                        color: '#fff',
                        height: '56px'
                    }
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    '&.table-edit-icon,&.table-delete-icon': {
                        width: '20px',
                        height: '20px'
                    },
                    '&.table-edit-icon': {
                        color: '#1D74A1'
                    },
                    '&.table-delete-icon': {
                        color: '#D84B4B'
                    }
                },
            },
        },
    },
})