import React, { useContext, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { DealsList } from 'components/DealsList';
import { AppContext } from '../AppContainer';
import { MapContainerActions } from 'components/Search';
import { useGeoPosition } from 'hooks/useGeoPosition';

type ExploreContainerProps = {
  deals: any;
};

export const ExploreContainer = (props: ExploreContainerProps) => {
  const { getLocation } = useGeoPosition();
  const { position } = useContext(AppContext);

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <Grid container justify="flex-start" alignItems="center">
      <DealsList title="Food" />
      <DealsList title="Coffee" />
      <DealsList title="Services" />
      <DealsList title="Other" />
    </Grid>
  );
};
