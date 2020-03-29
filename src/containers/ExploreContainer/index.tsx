import React, { useContext, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { DealsList } from 'components/DealsList';
import { AppContext } from '../AppContainer';
import { MapContainerActions } from 'components/Search';
import { useGeoPosition } from 'hooks/useGeoPosition';
import { handleObs, showBack } from '../../services/backService';

type ExploreContainerProps = {
  deals: any;
};

export const ExploreContainer = (props: ExploreContainerProps) => {
  const { getLocation } = useGeoPosition();
  const { position, filterResults } = useContext(AppContext);
  const foodDeals = filterResults.filter(deal => deal.category === 'Food');
  const coffeeDeals = filterResults.filter(deal => deal.category === 'Coffee');
  const servicesDeals = filterResults.filter(
    deal => deal.category === 'Services'
  );
  const otherDeals = filterResults.filter(deal => deal.category === 'Other');

  useEffect(() => {
    getLocation();
  }, []);

  //do not show back
  useEffect(() => {
    showBack(false)
  })

  return (
    <Grid container justify="flex-start" alignItems="center">
      <DealsList title="Food" deals={foodDeals} />
      <DealsList title="Coffee" deals={coffeeDeals} />
      <DealsList title="Services" deals={servicesDeals} />
      <DealsList title="Other" deals={otherDeals} />
    </Grid>
  );
};
