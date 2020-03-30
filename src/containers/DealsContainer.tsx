import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  Grid,
  TextField,
  Paper,
  Switch,
  Button,
  Snackbar
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
import { useDiscountsApi } from "hooks/apiServiceHook";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Alert } from "@material-ui/lab";
import { isEmpty } from "utils/general";

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
  type: string | null;
  dealName: string;
  dealDesc: string;
  notes: string;
  category: string;
  imageUrl?: string;
  typeChecked: boolean;
};
const initalState: newDealState = {
  typeChecked: false,
  name: null,
  lat: null,
  lng: null,
  address: null,
  type: null,
  dealName: null,
  dealDesc: null,
  notes: null,
  category: null,
  imageUrl: null
};
export const DealsContainer = (props: any) => {
  const [newDeal, setNewDeal] = useState(initalState);
  const [openSnackbar, setOpenSnackBar] = useState(false);
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
    tempDeal.category = isEmpty(tempDeal.category)
      ? "Other"
      : tempDeal.category;
    const rep = await postData(tempDeal);
    // clear entries, doesn't handle errors
    if (rep.statusCode === 200) {
      setOpenSnackBar(true);
      setNewDeal(initalState);
    }
  };
  const setFilter = (data: any) => {
    const value = data?.[0] ? data?.[0] : "";
    handleChange("category", value);
  };

  // display the filter images
  const getFilters = () => {
    return filterTileData.map((tile, idx) => (
      <>
        <Grid key={idx} item xs={3}>
          <div className="newDealFilter">
            <FilterType
              disabled={
                newDeal.category &&
                tile.title !== newDeal.category &&
                newDeal.category.length > 0
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

  const closeSnackBar = () => {
    setOpenSnackBar(false);
  };

  return (
    <>
      {isLoading && <LinearProgress />}
      <Grid container justify="center">
        <Grid item className="autoComplete" xs={10} md={4}>
          <PlacesAutocomplete
            value={newDeal.dealName}
            onChange={handleAutoChange}
            onSelect={handleSelect}
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
      <Snackbar
        open={openSnackbar}
        onClose={closeSnackBar}
        autoHideDuration={3000}
      >
        <Alert severity="success">The deal has been added!</Alert>
      </Snackbar>
    </>
  );
};
