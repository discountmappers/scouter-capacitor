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
import services1 from "../components/images/services1.jpg";
import laundry from "../components/images/services1.jpg";

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
    flex: "1 0 auto"
  },
  img: {
    width: 60,
    height: 60,
    padding: "10px 10px 10px 10px"
  },
  padding: {
    paddingTop: "12px"
  }
});

type iconMap = {
  [value: string]: any;
};
const cardIcons: iconMap = {
  Food: food,
  Coffee: coffee,
  Services: services1,
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
    <Card className={classes.root} onClick={() => handleClick()}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Grid container>
            <img className={classes.img} src={imageSrc} />
            <Grid item xs={7} md={9}>
              <Typography variant="body2">{result.dealDesc}</Typography>
              <Typography
                className={classes.padding}
                variant="subtitle2"
                color="textSecondary"
              >
                {result.name}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </div>
    </Card>
  );
};

export default CustomCard;
