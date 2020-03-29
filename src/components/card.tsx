import { makeStyles, CardContent, Typography, Card } from '@material-ui/core';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    boxShadow: '1px 1px 1px 1px #888888'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  img: {
    width: 60,
    height: 60,
    padding: '10px 10px 10px 10px'
  }
});

type CardProps = {
  result: any;
};
const CustomCard = (props: CardProps) => {
  const { result } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push({ pathname: `/deals/${result.id}`, state: { ...result } });
  };
  return (
    <Card className={classes.root} onClick={() => handleClick()}>
      <img
        className={classes.img}
        src="https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png"
      />

      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="body2">{result.dealDesc}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {result.name}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default CustomCard;
