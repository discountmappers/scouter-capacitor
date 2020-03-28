import React, { useState }  from "react";
import {
    createMuiTheme,
    createStyles, GridList, GridListTile, GridListTileBar, Theme, Grid, Icon, Paper, ButtonBase
} from "@material-ui/core";
import {makeStyles, ThemeProvider} from "@material-ui/core/styles";
import foodImage from '../images/food.jpg';
import coffeeImage from '../images/coffee.jpg';
import laundryImage from '../images/laundry.jpg';
import servicesImage2 from '../images/services2.jpg';
import { Search, Restaurant } from "@material-ui/icons";
import { FilterType } from '../filterType'

type SearchFilterProps = {

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
        icon: <Restaurant/>
    },
    {
        img: coffeeImage,
        title: 'Coffee',
        icon: <Restaurant/>
    },
    {
        img: laundryImage,
        title: 'Transportation & Services',
        icon: <Restaurant/>
    },
    {
        img: servicesImage2,
        title: 'Other',
        icon: <Restaurant/>
    }
]

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
            fontSize: '8px',
            outline: '1px solid #9e9e9e'
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
        buttonBase: {
            backgroundColor: '#fafafa',
            outline: '1px solid #9e9e9e'
        },
    }),
);



const SearchFilter = (props: SearchFilterProps) => {
    const classes = useStyles();
    const [selectedFilters, setFilter] = useState<any>([])
    console.log(selectedFilters)

    return (
        <ThemeProvider theme={theme}>
            {tileData.map(tile => (
                <FilterType
                    title={tile.title}
                    icon={tile.icon}
                    selectedFilters={selectedFilters}
                    setFilter={setFilter}
                />
            ))}
        {/*    submit button */}
        {/* ajax call to the lambda (does the filters)  */}
        {/* store filtered results in context api */}
        {/* send to search container for display */}

        </ThemeProvider>
    )
}

export default SearchFilter



