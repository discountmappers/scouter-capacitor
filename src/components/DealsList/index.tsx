import React from 'react';
import SingleLineGridList from 'components/SingleLineGridList';
import {
  makeStyles,
  Theme,
  createStyles,
  ThemeProvider
} from '@material-ui/core';
import { theme } from '../../themes/theme';
import { mockResults } from 'utils/general';

type DealsList = {
  title: string;
  deals?: any;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      paddingLeft: '10px',
      margin: '20px 0 0'
    }
  })
);

export const DealsList = (props: DealsList) => {
  const { title, deals } = props;
  const classes = useStyles();

  return (
    <>
      <ThemeProvider theme={theme}>
        <h5 className={classes.title}>{title}</h5>
        <SingleLineGridList tiles={deals ? deals : mockResults} />
      </ThemeProvider>
    </>
  );
};
