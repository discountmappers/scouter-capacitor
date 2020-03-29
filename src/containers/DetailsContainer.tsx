import React, { useState, useContext } from 'react';
import { DealDetails } from '../components/DealDetails';
import { mockResults } from 'utils/general';

export const DetailsContainer = (props: any) => {
  //handle defaults better
  const selectedDeal = props.location.state
    ? props.location.state
    : mockResults[0];

  return (
    <>
      <DealDetails deal={selectedDeal} />
    </>
  );
};
