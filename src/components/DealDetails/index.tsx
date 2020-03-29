import React, { useContext } from 'react';
import {
  makeStyles,
  ThemeProvider,
  Card,
  CardActionArea,
  CardMedia,
  CardContent, Typography, CardActions, Grid, Tooltip
} from '@material-ui/core';
import { theme } from '../../themes/theme';
import { Star } from "@material-ui/icons";
import MapView from '../Search/Map';
import './details.css'
import { DealsList } from '../DealsList';
import tileData from '../SingleLineGridList/tileData';
import { SearchContainerContext } from '../../containers/SearchContainer';
import GoogleMapReact from 'google-map-react';
import { GOOGLE_API_KEY } from '../../utils/google';
import RoomIcon from '@material-ui/core/SvgIcon/SvgIcon';
import MapDetailView from './mapDetail';

type DealDetailsProps = {
  deal: any;
};

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

export const DealDetails = (props: DealDetailsProps) => {
  const { deal } = props
  const classes = useStyles();

  //TODO incorporate real ratings
  const randomRate = Math.floor(Math.random() * 5) + 1
  const rating = getRatings(randomRate, classes)

  // this css is needed or the markers will shift!!!
  const CustomMarker = ({ result }: any) =>
    <Tooltip title={result.name} aria-label="add">
      <div style={{ cursor: 'pointer', position: 'absolute', transform: 'translate(-50%, -100%)' }}>
        <RoomIcon />
      </div>
    </Tooltip>

  const getMarkers = () => {
    return <CustomMarker key={deal.lat} lat={deal.lat} lng={deal.lng} result={deal} />
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={ deal.imageUrl
                ? deal.imageUrl
                : 'https://homepages.cae.wisc.edu/~ece533/images/monarch.png'}
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
                Description: {deal.dealDesc ? deal.dealDesc : 'None'}
              </Typography>
            </CardContent>

            <CardActions className={classes.map}>
              { deal.lat && deal.lng ? <MapDetailView deal={deal}/> : <MapView/>}

              {/*<Grid item xs={10} md={7} lg={4}>*/}
              {/*  <div className="mapContainer">*/}

              {/*    <GoogleMapReact*/}
              {/*      key={position.lng}*/}
              {/*      bootstrapURLKeys={{ key: GOOGLE_API_KEY }}*/}
              {/*      defaultCenter={position}*/}
              {/*      defaultZoom={15}*/}
              {/*    >*/}
              {/*      {getMarkers()}*/}
              {/*    </GoogleMapReact>*/}
              {/*  </div>*/}
              {/*</Grid>*/}


              {/*<MapView/>*/}
            </CardActions>
            <CardContent>
              <Typography variant="caption" color="textPrimary" component="p" className={classes.dealDesc}>
                Address: {deal.address ? deal.address : 'Visit website for more details'}
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

