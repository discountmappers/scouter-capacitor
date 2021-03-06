import React, { useContext, useMemo, useEffect, useState, ChangeEvent } from "react";
import TextField from "@material-ui/core/TextField";
import { ButtonGroup, Button } from "@material-ui/core";
import { useGeoPosition } from "hooks/useGeoPosition";
import { isEmpty } from "utils/general";
import RoomIcon from '@material-ui/icons/Room'
type MapContainerActionProps = {
    location: string
    search: (location: string) => void
};

const MapContainerActions = (props: MapContainerActionProps) => {
    const [location, setLocation] = useState(props.location)

    useEffect(() => {
        setLocation(props.location)
    }, [props.location])

    // when typing in the search bar, only allow enter
    const getCustomCoordinate = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13 && !isEmpty(location)) {
            props.search(location)
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value)
    }
    return (
        <>
            <TextField fullWidth onKeyPress={getCustomCoordinate} onChange={handleChange} value={location} label="Location" variant="outlined"
                InputProps={{

                    startAdornment: <RoomIcon />
                }} />
        </>
    )
}

export default MapContainerActions;
