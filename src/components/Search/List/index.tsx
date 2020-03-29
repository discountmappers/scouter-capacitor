import React, { useContext } from 'react';
import {
  Grid,
  Card,
  makeStyles,
  Typography,
  CardContent
} from '@material-ui/core';
import '../search.css';
import { SearchContainerContext } from 'containers/SearchContainer';
import CustomCard from 'components/card';
import { AppContext } from 'containers/AppContainer';
type ListViewProps = {};

const ListView = (props: ListViewProps) => {
  const { filterResults } = useContext(AppContext);
  const getItemCards = () => {
    let more = [...filterResults, ...filterResults];
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
