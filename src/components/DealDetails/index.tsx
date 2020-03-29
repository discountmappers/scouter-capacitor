import React from 'react';
import {
  makeStyles,
  ThemeProvider,
  Card,
  CardActionArea,
  CardMedia,
  CardContent, Typography, CardActions
} from '@material-ui/core';
import { theme } from '../../themes/theme';
import { mockAPIresults } from 'utils/general';
import { Star } from "@material-ui/icons";
import MapView from '../Search/Map';
import './details.css'
import { DealsList } from '../DealsList';
import tileData from '../SingleLineGridList/tileData';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  media: {
    height: 120,
  },
  card: {
    padding: '10px'
  },
  name: {
    fontWeight: 'bold',
    font: 'Roboto',
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'left',
  },
  dealDesc: {
    fontStyle: 'italic'
  },
  icon: {
    paddingLeft: '10px',
    marginBottom: -100
  },
  map: {
    justifyContent: 'center',
    display: 'flex',
    padding: '0px',
    width: '100%'
  },
  dealsContainer: {
    width: '100%',
    height: '100%',
    paddingBottom: '10px'
  },
});

const getRatings = (num: number, classes: any) => {
  const ratings:Array<any> = []
  if(num <= 5) {
    for(let i=0; i < num; i++){
      ratings.push(
        <Star color={'primary'} fontSize={'small'}/>
        )
    }
  }
  return <div className={classes.icon}>{ratings}</div>
}

export const DealDetails = (props: any) => {
  // const { deal } = props
  const classes = useStyles();

  //subject to change if data model changes
  const deal = mockAPIresults[0]

  const rating = getRatings(5, classes)

  return (
    <>
      <ThemeProvider theme={theme}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={deal.imgUrl}
            />
            <CardContent className={classes.card}>
              <Typography
                gutterBottom
                variant="body2"
                component="h2"
                align={"left"}
                className={classes.name}
              >
                {deal.name}
                {rating}
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                align={"left"}
                color={'primary'}
              >
                {deal.dealName}
              </Typography>

              <Typography variant="caption" color="textPrimary" component="p" className={classes.dealDesc}>
                Description: {deal.dealDesc}
              </Typography>
            </CardContent>

            <CardActions className={classes.map}>
              <MapView/>
            </CardActions>
            <CardContent>
              <Typography variant="caption" color="textPrimary" component="p" className={classes.dealDesc}>
                Address: {deal.address}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <div className={classes.dealsContainer}>
          <DealsList title="Similar Deals" deals={tileData} />
        </div>
      </ThemeProvider>
    </>
  );
};

