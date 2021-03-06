import React, { useContext } from "react";
import {
  makeStyles,
  ThemeProvider,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions
} from "@material-ui/core";
import { theme } from "../../themes/theme";
import "./details.css";
import { DealsList } from "../DealsList";
import MapDetailView from "./mapDetail";
import StarRatingComponent from "react-star-rating-component";
import { AppContext } from "containers/AppContainer";
import { GOOGLE_API_KEY } from "../../utils/google";

type DealDetailsProps = {
  deal: any;
};

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  media: {
    height: 120
  },
  card: {
    padding: "10px"
  },
  name: {
    fontWeight: "bold",
    font: "Roboto",
    display: "flex",
    alignItems: "left",
    justifyContent: "left"
  },
  dealDesc: {
    fontStyle: "italic"
  },
  icon: {
    paddingLeft: "10px",
    marginBottom: -100
  },
  map: {
    justifyContent: "center",
    display: "flex",
    padding: "0px",
    width: "100%"
  },
  dealsContainer: {
    width: "100%",
    height: "100%",
    paddingBottom: "10px"
  }
});

const getRatings = (num: number, classes: any) => {
  return (
    <div className={classes.icon}>
      <StarRatingComponent
        name={"businessRating"}
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
  const { filterResults } = useContext(AppContext);
  const similarDeals = filterResults.filter(
    _deal => _deal.category === deal.category
  );

  //TODO incorporate real ratings
  const randomRate = Math.floor(Math.random() * 5) + 3;
  const rating = getRatings(randomRate, classes);

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
                  : `https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAXsRIKPwIMfKEpHr9R2GVyM6qzri2mOTSTEh3nJV4AkiJD7hvsP5fAJE7dXIdv6xKsv63N2of3o0NjKfoXhvbJ7oGkjpAMX1Wt1Pkl56bj3AwysyrOs09zpVTTQ4C8yYEEhC3T2haySoOWKQBifAoFaQKGhRKz7X9hAuJUGfGCevjwImJpDbx6g&3u4032&5m1&2e1&callback=none&key=${GOOGLE_API_KEY}&token=90529`
              }
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
                color={"primary"}
              >
                {deal.dealName}
              </Typography>

              <Typography
                variant="caption"
                color="textPrimary"
                component="p"
                className={classes.dealDesc}
              >
                Description: {deal.dealDesc ? deal.dealDesc : "None"}
              </Typography>
              <br />
              {deal.notes ? (
                <Typography variant="caption" color="textPrimary" component="p">
                  {deal.notes}
                </Typography>
              ) : (
                ""
              )}
            </CardContent>

            <CardActions className={classes.map}>
              <MapDetailView deal={deal} />
            </CardActions>

            <CardContent>
              <Typography
                variant="caption"
                color="textPrimary"
                component="p"
                className={classes.dealDesc}
              >
                Address:{" "}
                {deal.address ? deal.address : "Visit website for more details"}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <div className={classes.dealsContainer}>
          <DealsList title="Similar Deals" deals={similarDeals} />
        </div>
      </ThemeProvider>
    </>
  );
};
