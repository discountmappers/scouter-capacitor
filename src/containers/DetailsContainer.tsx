import React, { useState, useContext } from 'react';
import { DealDetails } from '../components/DealDetails';
import tileData from '../components/SingleLineGridList/tileData';

export const DetailsContainer = (props: any) => {
  //handle defaults better
  const selectedDeal = props.location.state ? props.location.state : tileData[0]

  return (
    <>
      <DealDetails deal={selectedDeal}/>
    </>
  );
};
