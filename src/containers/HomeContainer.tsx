import React from 'react';
import { DiscountTypes } from '../components/DiscountTypes';
import { TextSearch } from '../components/TextSearch';
import { AppHeaderBar } from '../components/AppHeaderBar';

export const HomeContainer = (props: any) => {
  return (
    <>
      <AppHeaderBar />
      <TextSearch />
      <DiscountTypes />
    </>
  );
};
