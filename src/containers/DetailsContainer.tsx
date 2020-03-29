import React, { useEffect } from 'react';
import { DealDetails } from '../components/DealDetails';
import tileData from '../components/SingleLineGridList/tileData';
import { handleObs, showBack } from '../services/backService';
import { useHistory } from 'react-router';

export const DetailsContainer = (props: any) => {
  //handle defaults better
  const selectedDeal = props.location.state ? props.location.state : tileData[0]
  const history = useHistory()
  useEffect(() => {
    showBack(true)
    const handle = handleObs.subscribe(val => {
      history.goBack()

    })
    return () => {
      handle.unsubscribe()
    }
  })
  return (
    <>
      <DealDetails deal={selectedDeal}/>
    </>
  );
};