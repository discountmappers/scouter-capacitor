import React from "react";
import {
    createMuiTheme,
    createStyles, TextField,
    Theme,
} from "@material-ui/core";
import {makeStyles, ThemeProvider} from "@material-ui/core/styles";
import { theme } from '../themes/theme';

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
