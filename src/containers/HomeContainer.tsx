import React from 'react';
import { DiscountTypes } from '../components/DiscountTypes';
import { TextSearch } from '../components/TextSearch';

export const HomeContainer = (props: any) => {
  return (
    <>
      <TextSearch />
      <DiscountTypes />
    </>
  );
};
