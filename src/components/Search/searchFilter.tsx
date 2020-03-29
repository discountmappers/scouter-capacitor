import React, { useState, useContext } from 'react';
import {
    createMuiTheme,
    createStyles,
    GridList,
    GridListTile,
    GridListTileBar,
    Theme,
    Grid,
    Icon,
    Paper,
    Button
} from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import foodImage from '../images/food.jpg';
import coffeeImage from '../images/coffee.jpg';
import laundryImage from '../images/laundry.jpg';
import servicesImage2 from '../images/services2.jpg';
import {
    Search,
    Restaurant,
    FreeBreakfastOutlined,
    LocalLaundryServiceOutlined,
    ExtensionOutlined
} from '@material-ui/icons';
import { FilterType } from '../FilterType';
import { SearchContainerContext } from '../../containers/SearchContainer';
import SingleLineGridList from 'components/SingleLineGridList';
import tileData from 'components/SingleLineGridList/tileData';
import { DealsList } from 'components/DealsList';
import { theme } from '../../themes/theme';

type SearchFilterProps = {};

const filterTileData = [
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
];

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
            height: '100%',
            background: '#f5f5f5',
            boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
        },
        dealsText: {
            paddingLeft: '10px',
            fontSize: '12px',
            fontWeight: 'bold',
            fontFamily: 'Roboto',
            marginBottom: '0px'
        }
    })
);

export const SearchFilter = (props: SearchFilterProps) => {
    const classes = useStyles();
    const { setResults } = useContext(SearchContainerContext);
    const [selectedFilters, setFilter] = useState<any>([]);

    // make call to lambdas to get filtered results
    const getFilterResults = async (filters: any) => {
        const url = 'https://api.github.com/users';

        //call the fetch function
        let data = await fetch(url)
            .then(res => res.json())
            .then(data => {
                setResults(data);
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container justify="center" className={classes.root}>
                {filterTileData.map((tile, idx) => (
                    <>
                        <Grid item xs={5} md={3}>
                            <div style={{ height: '90px', width: '100%' }}>
                                <FilterType
                                    disabled={false}
                                    title={tile.title}
                                    icon={tile.icon}
                                    selectedFilters={selectedFilters}
                                    setFilter={setFilter}
                                />
                            </div>
                        </Grid>
                        {/*Adds a new row after every 2 */ idx % 2 ? (
                            <Grid item xs={12} />
                        ) : (
                                ''
                            )}

                    </>
                ))}
            </Grid>
            <div className={classes.buttonContainer}>
                <Button
                    className={classes.button}
                    variant="contained"
                    color={'primary'}
                    onClick={event => {
                        getFilterResults(selectedFilters);
                    }}
                >
                    Submit
        </Button>
            </div>
            <div className={classes.dealsContainer}>
                {/*    Horizontal sections */}
                <DealsList title="Popular Search Results" deals={tileData} />
                <DealsList title="New Offers" deals={tileData} />
            </div>
        </ThemeProvider>
    );
};
