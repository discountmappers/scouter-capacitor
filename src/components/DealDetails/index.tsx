import React from 'react';
import {
  makeStyles,
  ThemeProvider,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions
} from '@material-ui/core';
import { theme } from '../../themes/theme';
import MapView from '../Search/Map';
import './details.css';
import { DealsList } from '../DealsList';
import MapDetailView from './mapDetail';
import StarRatingComponent from 'react-star-rating-component';
import { mockResults } from 'utils/general';

type DealDetailsProps = {
  deal: any;
};

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  media: {
    height: 120
  },
  card: {
    padding: '10px'
  },
  name: {
    fontWeight: 'bold',
    font: 'Roboto',
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'left'
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
  }
});

const getRatings = (num: number, classes: any) => {
  return (
    <div className={classes.icon}>
      <StarRatingComponent
        name={'businessRating'}
        value={num}
        starCount={5}
        starColor={theme.palette.primary.main}
        emptyStarColor={theme.palette.secondary.dark}
        editing={false}
      />
    </div>
  );
};

export const DealDetails = (props: DealDetailsProps) => {
  const { deal } = props;
  const classes = useStyles();

  //TODO incorporate real ratings
  const randomRate = Math.floor(Math.random() * 5) + 1
  const rating = getRatings(randomRate, classes)

  return (
    <>
      <ThemeProvider theme={theme}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={
                deal.imageUrl
                  ? deal.imageUrl
                  : 'https://homepages.cae.wisc.edu/~ece533/images/monarch.png'
              }
            />
            <CardContent className={classes.card}>
              <Typography
                gutterBottom
                variant="body2"
                component="h2"
                align={'left'}
                className={classes.name}
              >
                {deal.name}
                {rating}
              </Typography>

              <Typography
                gutterBottom
                variant="body1"
                align={'left'}
                color={'primary'}
              >
                {deal.dealName}
              </Typography>

              <Typography
                variant="caption"
                color="textPrimary"
                component="p"
                className={classes.dealDesc}
              >
                Description: {deal.dealDesc ? deal.dealDesc : 'None'}
              </Typography>
              <br />
              {deal.notes ? (
                <Typography variant="caption" color="textPrimary" component="p">
                  {deal.notes}
                </Typography>
              ) : (
                ''
              )}
            </CardContent>

            <CardActions className={classes.map}>
              { <MapDetailView deal={deal}/> }
            </CardActions>

            <CardContent>
              <Typography
                variant="caption"
                color="textPrimary"
                component="p"
                className={classes.dealDesc}
              >
                Address:{' '}
                {deal.address ? deal.address : 'Visit website for more details'}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <div className={classes.dealsContainer}>
          <DealsList title="Similar Deals" deals={mockResults} />
        </div>
      </ThemeProvider>
    </>
  );
};
