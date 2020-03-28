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
            paddingTop: '20px',
        },
        gridList: {
            width: '100%',
            height: '100%',
            borderWidth: '10px',
            borderBottom: '#000000',
            fontSize: '8px'
        },
        grid: {
            background: '#fafafa',
            border: '#000000',
            borderBottom: '#000000',
        },
        gridTitle: {
            marginTop: '2px',
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
                <Grid container spacing={0}>
                    <Grid item xs={12} className={classes.root}>
                    <GridList cellHeight={80} className={classes.gridList} spacing={0}>
                        {tileData.map(tile => (
                            <Grid item
                                  alignContent={'center'}
                                  className={classes.grid}
                                  container
                                  direction="row"
                                  justify="center"
                                  alignItems="baseline">
                                {tile.icon}
                                <Grid
                                    item
                                    alignContent={'center'}
                                    alignItems={"baseline"}
                                    justify="center"
                                    direction="row"
                                    container
                                    className={classes.gridTitle}
                                >
                                    {tile.title}
                                </Grid>
                            </Grid>
                        ))}
                    </GridList>
                    </Grid>
                </Grid>
        </ThemeProvider>
    )
};
