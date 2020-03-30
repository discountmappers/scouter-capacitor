import {
  makeStyles,
  CardContent,
  Typography,
  Card,
  Grid
} from "@material-ui/core";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import food from "../components/images/food.jpg";
import coffee from "../components/images/coffee.jpg";
import services2 from "../components/images/services2.jpg";
import laundry from "../components/images/services1.jpg";
import StarRatingComponent from "react-star-rating-component";
import { theme } from "../themes/theme";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    boxShadow: "1px 1px 1px 1px #888888",
    cursor: "pointer"
  },
  details: {
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto",
    padding: "0px",
    "&:last-child": {
      paddingBottom: "0px"
    }
  },
  img: {
    width: 90,
    height: 80,
    paddingRight: "20px",
    borderRadius: "10px"
  },
  padding: {
    padding: "10px"
  },
  title: {
    fontWeight: "bold",
    fontSize: "12px"
  },
  subtitle: {
    fontSize: "10px"
  }
});

type iconMap = {
  [value: string]: any;
};
const cardIcons: iconMap = {
  Food: food,
  Coffee: coffee,
  Services: services2,
  Other: laundry
};

type CardProps = {
  result: any;
};
const CustomCard = (props: CardProps) => {
  const { result } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push({
      pathname: `/deals/${result.id || "deal"}`,
      state: { ...result }
    });
  };
  const imageSrc = cardIcons[result.category];

  return (
    <Card className={classes.root} onClick={handleClick}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Grid container alignItems="center">
            <Grid item>
              <img className={classes.img} src={result.imageUrl} />
            </Grid>
            <Grid item xs={7} md={9}>
              <Typography
                variant="body2"
                color={"primary"}
                className={classes.title}
              >
                {result.dealDesc}
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className={classes.subtitle}
              >
                {result.name}
              </Typography>
              <StarRatingComponent
                name={"businessRating"}
                value={Math.floor(Math.random() * 5) + 3}
                starCount={5}
                starColor={theme.palette.primary.main}
                emptyStarColor={theme.palette.secondary.dark}
                editing={false}
              />
            </Grid>
          </Grid>
        </CardContent>
      </div>
    </Card>
  );
};

export default CustomCard;
