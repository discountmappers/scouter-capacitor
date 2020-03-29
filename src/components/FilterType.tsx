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
import { theme } from '../themes/theme'

type FilterTypeProps = {
    disabled: boolean,
    title: any,
    icon: any,
    setFilter: Function,
    selectedFilters: Array<String>
};

export const FilterType = (props: any) => {
    const { title, icon, setFilter, selectedFilters, disabled } = props

    const [buttonColor, setButtonColor] = useState<string>(
        '#fafafa'
    );

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                height: '100%',
                width: '100%'
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
                width: '100%',
                height: '100%',
                backgroundColor: buttonColor,
                outline: '1px solid #9e9e9e'
            },
        }),
    );

    const classes = useStyles();

    // support toggling 
    const handleClick = (event: any) => {
        let newFilters = [...selectedFilters]
        if (buttonColor !== '#fafafa') {
            setButtonColor('#fafafa')
            newFilters = selectedFilters.filter((item: string) => item !== event.currentTarget.value)
        } else {
            setButtonColor(theme.palette.primary.light)
            newFilters.push(event.currentTarget.value)
        }
        setFilter(newFilters)
    }

    return (
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
    )
};
