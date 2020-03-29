import React from "react";
import { Grid } from "@material-ui/core";
import "../search.css";
import CustomCard from "components/card";
import { Deal } from "utils/general";
type ListViewProps = {
  results: Array<Deal>;
};

const ListView = (props: ListViewProps) => {
  const getItemCards = () => {
    let more = [...props.results];
    const cards = more.map(result => {
      return (
        <>
          <Grid key={result.lat} item xs={10} md={7} lg={4}>
            <CustomCard result={result} />
          </Grid>
          <Grid item xs={12}></Grid>
        </>
      );
    });
    return cards;
  };
  return (
    <Grid container justify="center" spacing={1} className="listViewContainer">
      {getItemCards()}
    </Grid>
  );
};

export default ListView;
