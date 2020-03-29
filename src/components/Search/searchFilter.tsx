import React, { useState, useContext }  from "react";
import {
    createMuiTheme,
    createStyles, GridList, GridListTile, GridListTileBar, Theme, Grid, Icon, Paper, Button, Container, Box
} from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import foodImage from '../images/food.jpg';
import coffeeImage from '../images/coffee.jpg';
import laundryImage from '../images/laundry.jpg';
import servicesImage2 from '../images/services2.jpg';
import { Search, Restaurant, FreeBreakfastOutlined, LocalLaundryServiceOutlined, ExtensionOutlined } from "@material-ui/icons";
import { FilterType } from '../filterType'
import { SearchContainerContext } from '../../containers/SearchContainer'

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
            main: '#fafafa',
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
        icon: <FreeBreakfastOutlined />
    },
    {
        img: laundryImage,
        title: 'Services',
        icon: <LocalLaundryServiceOutlined />
    },
    {
        img: servicesImage2,
        title: 'Other',
        icon: <ExtensionOutlined />
    }
]

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingTop: '20px',
            width: '100%'
        },
        buttonContainer: {
            width: '100%',
            height: '100%',
            padding: '15px',
            // alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
        },
        button: {
            padding: '10px',
            width: '80%',
            fontSize: '12px',
            fontWeight: 'bold'
        },
        dealsContainer: {
            outline: '1px solid #9e9e9e',
            width: '100%',
            height: '100%'
        },
        dealsText: {
            paddingTop: '10px',
            paddingLeft: '10px',
            fontSize: '12px',
            fontWeight: 'bold'
        }
    }),
);




export const SearchFilter = (props: SearchFilterProps) => {
    const classes = useStyles();
    const { setResults } = useContext(SearchContainerContext)
    const [selectedFilters, setFilter] = useState<any>([])

    // make call to lambdas to get filtered results
    const getFilterResults = async (filters: any) => {
        const url = 'https://api.github.com/users'

        //call the fetch function
        let data = await fetch(url)
            .then(res => res.json())
            .then(data => {
                setResults(data)
            });
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container justify="center" spacing={0} className={classes.root}>
                {tileData.map((tile, idx) => (
                    <>
                        <FilterType
                            title={tile.title}
                            icon={tile.icon}
                            selectedFilters={selectedFilters}
                            setFilter={setFilter}
                    />
                        {/*Adds a new row after every 2 */ idx % 2 ? <Grid item xs={12} /> : ''}
                    </>
                ))}
            </Grid>
            <div className={classes.buttonContainer}>
                <Button
                    className={classes.button}
                    variant="contained"
                    color={'primary'}
                    onClick={event => { getFilterResults(selectedFilters)}}
                >
                    Submit
                </Button>
            </div>
            <div className={classes.dealsContainer}>
                <p className={classes.dealsText}> Popular Search Results</p>

                <div>
                    
                </div>

            </div>

        {/*    Horizontal sections */}
        </ThemeProvider>
    )
}


