import React from "react";
import {
    createMuiTheme,
    createStyles, GridList, GridListTile, GridListTileBar, Theme,
} from "@material-ui/core";
import {makeStyles, ThemeProvider} from "@material-ui/core/styles";
import foodImage from './images/food.jpg';
import coffeeImage from './images/coffee.jpg';
import laundryImage from './images/laundry.jpg';
import servicesImage2 from './images/services2.jpg';

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
            backgroundColor: theme.palette.background.paper,
            padding: '15px',
            marginTop: '100px',
        },
        gridList: {
            width: 500,
            height: 450,
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
    }),
);

const tileData = [
    {
        img: foodImage,
        title: 'Food'
    },
    {
        img: coffeeImage,
        title: 'Coffee'
    },
    {
        img: laundryImage,
        title: 'Laundry'
    },
    {
        img: servicesImage2,
        title: 'Services'
    }
]
export const DiscountTypes = (props: any) => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <GridList cellHeight={180} className={classes.gridList}>
                    {tileData.map(tile => (
                        <GridListTile key={tile.img}>
                            <img src={tile.img} alt={tile.title} />
                            <GridListTileBar
                                title={tile.title}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        </ThemeProvider>
    )
};
