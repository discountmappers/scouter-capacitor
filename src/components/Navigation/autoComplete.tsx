import React, { useContext, useMemo, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import {
  typeService,
  fetchSelections
} from 'services/autoCompleteService'

type AutoCompleteProps = {
  endpoint: string;
};

const AutoComplete = (props: AutoCompleteProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [options, setOptions] = useState(["name"]);

  // subscribe to new results
  useEffect(() => {
    const typeahead$ = fetchSelections(props.endpoint).subscribe(
      (value: any) => {
        if (!value.error) {
          const reducedValues = value.map((val: any) => {
            return val.name;
          });
          setOptions(reducedValues);
        }
      }
    );
    // initialize the autocomplete list
    typeService.next("");
    return () => typeahead$.unsubscribe();
  }, []);

  // update the typeahead
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    // this is a stream so .next will trigger anything listening to this stream. which is the fetchSelections function above
    typeService.next(event.target.value);
  };
  return (
    <>
      <Autocomplete
        freeSolo
        options={options}
        className="autoCompleteSearch"
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            className="autoCompleteSearch"
            onChange={handleChange}
            value={searchValue}
          />
        )}
      />
    </>
  );
};

export default AutoComplete;
