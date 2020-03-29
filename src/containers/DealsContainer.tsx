import React, { useState, useEffect } from 'react';
import { TextSearch } from '../components/TextSearch';
import PlacesAutocomplete, { geocodeByPlaceId } from 'react-places-autocomplete';
import { Grid, TextField, Paper, Switch, FormControlLabel, FormGroup, InputBase, Button } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room'
import produce from 'immer'
import { Restaurant, FreeBreakfastOutlined, LocalLaundryServiceOutlined, ExtensionOutlined } from '@material-ui/icons';
import foodImage from '../components/images/food.jpg';
import coffeeImage from '../components/images/coffee.jpg';
import laundryImage from '../components/images/laundry.jpg';
import servicesImage2 from '../components/images/services2.jpg';
import { FilterType } from 'components/FilterType';
import './map.css'
import { showBack, handleObs } from 'services/backService';
import { useHistory } from 'react-router-dom';
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
type newDealState = {
    name: string,
    lat: number,
    lng: number,
    address: string,
    type: string,
    dealName: string,
    dealDesc: string,
    notes: string,
    category: string,
    imageUrl?: string,
    typeChecked: boolean
}
const initalState: newDealState = {
    typeChecked: false,
    name: '',
    lat: 0,
    lng: 0,
    address: '',
    type: '',
    dealName: '',
    dealDesc: '',
    notes: '',
    category: '',
    imageUrl: ''

}
export const DealsContainer = (props: any) => {
    const [newDeal, setNewDeal] = useState(initalState)
    const history = useHistory()
    useEffect(() => {
        showBack(true)
        const handle = handleObs.subscribe(val => {
            history.goBack()

        })
        return () => {
            handle.unsubscribe()
        }
    })
    // the change for the typeahead
    const handleAutoChange = (value: any) => {
        const newState = produce(draft => {
            draft.name = value
        })
        setNewDeal(newState(newDeal))
    }
    // generic handle change 
    const handleChange = (key: string, value: any) => {
        const newState = produce(draft => {
            draft[key] = value
        })
        setNewDeal(newState(newDeal))
    }

    // handle thw switch
    const handleToggle = (event: any) => {
        const newState = produce(draft => {
            draft.type = event.target.checked ? 'Chain' : ''
            draft.typeChecked = event.target.checked
        })
        setNewDeal(newState(newDeal))
    }

    // handle the custom auto complete
    const handleSelect = async (event: any, placeId: any) => {
        const response = await geocodeByPlaceId(placeId)
        const newState = produce(draft => {
            draft.name = event.split(",")[0]
            draft.address = response[0].formatted_address
            draft.lat = response[0].geometry.location.lat()
            draft.lng = response[0].geometry.location.lng()
        })
        setNewDeal(newState(newDeal))

    }
    const setFilter = (data: any) => {
        const value = data?.[0] ? data?.[0] : ''
        handleChange('category', value)
    }

    const getFilters = () => {
        return filterTileData.map((tile, idx) => (
            <>
                <Grid key={idx} item xs={3}>
                    <div className="newDealFilter">
                        <FilterType
                            disabled={tile.title !== newDeal.category && newDeal.category.length > 0}
                            title={tile.title}
                            icon={tile.icon}
                            selectedFilters={[]}
                            setFilter={setFilter}
                        />
                    </div>
                </Grid>
            </>
        ))

    }
    console.log(newDeal)
    return (
        <>
            <Grid container justify="center">
                <Grid item className="autoComplete" xs={10} md={4}>
                    <PlacesAutocomplete
                        value={newDeal.name}
                        onChange={handleAutoChange}
                        onSelect={handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                            <div>
                                <TextField fullWidth label="Search places.." variant="outlined"
                                    InputProps={{
                                        ...getInputProps({
                                            className: 'location-search-input',
                                        }),
                                        startAdornment: <RoomIcon />
                                    }} />
                                <Paper className="paperAutoComplete">
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = {
                                            padding: '12px 12px 12px 12px', cursor: 'pointer'
                                        }

                                        return (

                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style
                                                })
                                                }
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>

                                        );
                                    })}
                                </Paper>
                            </div>
                        )}
                    </PlacesAutocomplete>
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={10} md={4}>
                    <Switch color="primary" checked={newDeal.typeChecked} onChange={handleToggle} name="type" />
                    <span> Include all store locations</span>
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={10} md={4} className="textArea">
                    <TextField
                        value={newDeal.dealDesc}
                        variant="outlined"
                        label="Deal info"
                        fullWidth
                    />

                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={10}></Grid>
                <Grid item xs={10} md={4}><div className="label"><b>Select a category</b></div></Grid>
                <Grid item xs={10}></Grid>
                <Grid container item xs={10} md={4}>
                    {getFilters()}
                </Grid>
                <Grid item xs={10}></Grid>
                <Grid item xs={10} md={4}><div className="label"><b>Description</b></div></Grid>
                <Grid item xs={10}></Grid>
                <Grid item xs={10} md={4} className="textArea">
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Additional details"
                        multiline
                        rows={4}
                    />
                </Grid>
                <Grid item xs={10}></Grid>
                <Grid item xs={10} md={4} className="textArea">
                    <Button
                        fullWidth
                        variant="contained"
                        color={"primary"}
                    >
                        Submit
                    </Button>
                </Grid>

            </Grid>
        </>
    );
};
