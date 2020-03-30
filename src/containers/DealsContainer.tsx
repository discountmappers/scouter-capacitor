import React, { useState, useEffect } from "react";
import { TextSearch } from "../components/TextSearch";
import PlacesAutocomplete, {
  geocodeByPlaceId
} from "react-places-autocomplete";
import {
  Grid,
  TextField,
  Paper,
  Switch,
  FormControlLabel,
  FormGroup,
  InputBase,
  Button
} from "@material-ui/core";
import RoomIcon from "@material-ui/icons/Room";
import produce from "immer";
import {
  Restaurant,
  FreeBreakfastOutlined,
  LocalLaundryServiceOutlined,
  ExtensionOutlined
} from "@material-ui/icons";
import foodImage from "../components/images/food.jpg";
import coffeeImage from "../components/images/coffee.jpg";
import laundryImage from "../components/images/laundry.jpg";
import servicesImage2 from "../components/images/services2.jpg";
import { FilterType } from "components/FilterType";
import "./map.css";
import { showBack } from "services/backService";
import { useDiscountsApi } from "hooks/apiServiceHook";
const filterTileData = [
  {
    img: foodImage,
    title: "Food",
    icon: <Restaurant />
  },
  {
    img: coffeeImage,
    title: "Coffee",
    icon: <FreeBreakfastOutlined />
  },
  {
    img: laundryImage,
    title: "Services",
    icon: <LocalLaundryServiceOutlined />
  },
  {
    img: servicesImage2,
    title: "Other",
    icon: <ExtensionOutlined />
  }
];
type newDealState = {
  name: string;
  lat: number;
  lng: number;
  address: string;
  type: string;
  dealName: string;
  dealDesc: string;
  notes: string;
  category: string;
  imageUrl?: string;
  typeChecked: boolean;
};
const initalState: newDealState = {
  typeChecked: false,
  name: "",
  lat: 0,
  lng: 0,
  address: "",
  type: "",
  dealName: "",
  dealDesc: "",
  notes: "",
  category: "",
  imageUrl: ""
};
export const DealsContainer = (props: any) => {
  const [newDeal, setNewDeal] = useState(initalState);
  const { isLoading, postData } = useDiscountsApi();
  // the change for the typeahead
  const handleAutoChange = (value: any) => {
    const newState = produce(draft => {
      draft.name = value;
      draft.dealName = value;
    });
    setNewDeal(newState(newDeal));
  };
  // generic handle change
  const handleChange = (key: string, value: any) => {
    const newState = produce(draft => {
      draft[key] = value;
    });
    setNewDeal(newState(newDeal));
  };

  // handle thw switch
  const handleToggle = (event: any) => {
    const newState = produce(draft => {
      draft.type = event.target.checked ? "Chain" : "";
      draft.typeChecked = event.target.checked;
    });
    setNewDeal(newState(newDeal));
  };

  // handle the custom auto complete which gives us the place id selected
  const handleSelect = async (event: any, placeId: any) => {
    var request: any = {
      placeId
    };
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.getDetails(request, handleGoogleResponse);
  };

  // google response with all the details
  const handleGoogleResponse = (response: any) => {
    if (response !== null) {
      const newState = produce(draft => {
        draft.name = response.name;
        draft.dealName = response.name;
        draft.address = response.formatted_address;
        draft.lat = response.geometry.location.lat();
        draft.lng = response.geometry.location.lng();
        // just get the first photo for now
        draft.imageUrl = response.photos[0].getUrl();
      });
      setNewDeal(newState(newDeal));
    }
  };

  const persistDeal = async () => {
    const tempDeal = { ...newDeal };
    delete tempDeal.typeChecked;
    const rep = await postData(tempDeal);
    console.log(rep);
  };
  const setFilter = (data: any) => {
    const value = data?.[0] ? data?.[0] : "";
    handleChange("category", value);
  };
  console.log(newDeal);
  const getFilters = () => {
    return filterTileData.map((tile, idx) => (
      <>
        <Grid key={idx} item xs={3}>
          <div className="newDealFilter">
            <FilterType
              disabled={
                tile.title !== newDeal.category && newDeal.category.length > 0
              }
              title={tile.title}
              icon={tile.icon}
              selectedFilters={[]}
              setFilter={setFilter}
            />
          </div>
        </Grid>
      </>
    ));
  };
  console.log(newDeal);
  const searchOptions = {
    location: new google.maps.LatLng(40.7831, -73.9712),
    radius: 20000
  };
  return (
    <>
      <Grid container justify="center">
        <Grid item className="autoComplete" xs={10} md={4}>
          <PlacesAutocomplete
            value={newDeal.dealName}
            onChange={handleAutoChange}
            onSelect={handleSelect}
            searchOptions={searchOptions}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
              <div>
                <TextField
                  fullWidth
                  label="Search places.."
                  variant="outlined"
                  InputProps={{
                    ...getInputProps({
                      className: "location-search-input"
                    }),
                    startAdornment: <RoomIcon />
                  }}
                />
                <Paper className="paperAutoComplete">
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = {
                      padding: "12px 12px 12px 12px",
                      cursor: "pointer"
                    };
                    console.log(suggestion);
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                      >
                        <div>{suggestion.formattedSuggestion.mainText}</div>
                        <div>
                          {suggestion.formattedSuggestion.secondaryText}
                        </div>
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
          <Switch
            color="primary"
            checked={newDeal.typeChecked}
            onChange={handleToggle}
            name="type"
          />
          <span> Include all store locations</span>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={10} md={4} className="textArea">
          <TextField
            onChange={event => handleChange("dealDesc", event.target.value)}
            value={newDeal.dealDesc}
            variant="outlined"
            label="Deal info"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={10}></Grid>
        <Grid item xs={10} md={4}>
          <div className="label">
            <b>Select a category</b>
          </div>
        </Grid>
        <Grid item xs={10}></Grid>
        <Grid container item xs={10} md={4}>
          {getFilters()}
        </Grid>
        <Grid item xs={10}></Grid>
        <Grid item xs={10} md={4}>
          <div className="label">
            <b>Description</b>
          </div>
        </Grid>
        <Grid item xs={10}></Grid>
        <Grid item xs={10} md={4} className="textArea">
          <TextField
            onChange={event => handleChange("notes", event.target.value)}
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
            onClick={persistDeal}
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
