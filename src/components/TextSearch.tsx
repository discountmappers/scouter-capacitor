import React from "react";
import {
    createMuiTheme,
    createStyles, TextField,
    Theme,
} from "@material-ui/core";
import {makeStyles, ThemeProvider} from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#d0d4ed',
            main: '#3949ab',
            dark: '#121858',
            contrastText: '#fff',
        },
        secondary: {
            light: '#cfd8dc',
            main: '#b0bec5',
            dark: '#90a4ae',
            contrastText: '#000',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '95%',
                alignItems: 'center',
                top: '50px'
            },
        },
    }),
);

export const TextSearch = (props: any) => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Search..." variant="outlined" className={classes.root} />
            </form>
        </ThemeProvider>
    )
};
