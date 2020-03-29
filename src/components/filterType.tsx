import React, { useState } from "react";
import {
    createMuiTheme,
    createStyles, GridList, GridListTile, GridListTileBar, Theme, Grid, Icon, Paper, ButtonBase
} from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import foodImage from './images/food.jpg';
import coffeeImage from './images/coffee.jpg';
import laundryImage from './images/laundry.jpg';
import servicesImage2 from './images/services2.jpg';
import { Search, Restaurant } from "@material-ui/icons";

type FilterTypeProps = {
    title: any,
    icon: any,
    setFilter: Function,
    selectedFilters: Array<String>
};

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#33abb8',
            main: '#0097a7',
            dark: '#006974',
            contrastText: '#fff'
        },
        secondary: {
            light: '#cfd8dc',
            main: '#b0bec5',
            dark: '#90a4ae',
            contrastText: '#000'
        }
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
            '"Segoe UI Symbol"'
        ].join(',')
    }
});

const tileData = [
    {
        img: foodImage,
        title: 'Food',
        icon: <Restaurant />
    },
    {
        img: coffeeImage,
        title: 'Coffee',
        icon: <Restaurant />
    },
    {
        img: laundryImage,
        title: 'Transportation & Services',
        icon: <Restaurant />
    },
    {
        img: servicesImage2,
        title: 'Other',
        icon: <Restaurant />
    }
]
export const FilterType = (props: any) => {
    const { title, icon, setFilter, selectedFilters } = props

    const [buttonColor, setButtonColor] = useState<string>(
        '#fafafa'
    );

    const [disabled, setDisabled] = useState<boolean>(false)

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                // paddingTop: '20px',
            },
            gridList: {
                width: '100%',
                height: '100%',
                borderWidth: '10px',
                borderBottom: '#000000',
                fontSize: '8px',
                outline: '1px solid #9e9e9e'
            },
            gridTitle: {
                marginTop: '2px',
            },
            buttonBase: {
                height: 120,
                width: '100%',
                backgroundColor: buttonColor,
                outline: '1px solid #9e9e9e'
            },
        }),
    );

    const classes = useStyles();

    const handleClick = (event: any) => {
        setButtonColor(theme.palette.primary.light)
        selectedFilters.push(event.currentTarget.value)
        setFilter(selectedFilters)
        setDisabled(true)
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid item xs={5} md={3} className={classes.root}>
                <ButtonBase
                    focusRipple
                    key={title}
                    value={title}
                    className={classes.buttonBase}
                    onClick={handleClick}
                    disabled={disabled}
                >
                    <Grid
                        alignContent={'center'}
                        container
                        direction="row"
                        justify="center"
                        alignItems="baseline"
                    >

                        {icon}
                        <Grid
                            item
                            alignContent={'center'}
                            alignItems={"baseline"}
                            justify="center"
                            direction="row"
                            container
                            className={classes.gridTitle}
                        >
                            {title}
                        </Grid>
                    </Grid>
                </ButtonBase>
            </Grid>
        </ThemeProvider>
    )
};
