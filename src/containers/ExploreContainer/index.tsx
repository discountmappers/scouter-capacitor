import React from 'react';
import { Grid } from '@material-ui/core';
import { DealsList } from 'components/DealsList';

type ExploreContainerProps = {
  deals: any;
};

export const ExploreContainer = (props: ExploreContainerProps) => {
  return (
    <Grid container justify="flex-start" alignItems="center">
      <DealsList title="Food" />
      <DealsList title="Coffee" />
      <DealsList title="Services" />
      <DealsList title="Other" />
    </Grid>
  );
};
