import React, { useEffect } from 'react';
import { DealDetails } from '../components/DealDetails';
import { handleObs, showBack } from '../services/backService';
import { useHistory } from 'react-router';

export const DetailsContainer = (props: any) => {
  //handle defaults better
  const selectedDeal = props.location.state
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
