import React from "react";
import {
    createMuiTheme,
    createStyles, GridList, GridListTile, GridListTileBar, Theme, Grid, Icon, Paper,
} from "@material-ui/core";
import {makeStyles, ThemeProvider} from "@material-ui/core/styles";
import foodImage from './images/food.jpg';
import coffeeImage from './images/coffee.jpg';
import laundryImage from './images/laundry.jpg';
import servicesImage2 from './images/services2.jpg';
import { Search, Restaurant } from "@material-ui/icons";

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
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.secondary.light,
            marginTop: '100px',
        },
        gridList: {
            width: '50%',
            height: 450,
            borderWidth: '10px'
        },
        gridListTileBar: {
            background: '#000000',
            // border: '#000000'
        },
        paper: {
            width: '500px',
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
    }),
);

const tileData = [
    {
        img: foodImage,
        title: 'Food',
        icon: <Restaurant/>
    },
    {
        img: coffeeImage,
        title: 'Coffee',
        icon: <Restaurant/>
    },
    {
        img: laundryImage,
        title: 'Laundry',
        icon: <Restaurant/>
    },
    {
        img: servicesImage2,
        title: 'Services',
        icon: <Restaurant/>
    }
]
export const DiscountTypes = (props: any) => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <GridList cellHeight={80} className={classes.gridList}>
                    {tileData.map(tile => (
                        <Grid item>
                            {tile.icon}
                            {tile.title}
                        </Grid>
                    ))}
                </GridList>
            </div>
        </ThemeProvider>
    )
};
