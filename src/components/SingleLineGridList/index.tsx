import React, { useContext } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { AppContext } from "containers/AppContainer";
import { Link as RouterLink } from "react-router-dom";
import "typeface-roboto";
import { theme } from "../../themes/theme";

type TileType = {
  id: string;
  name: string;
  dealName: string;
  dealDesc: string;
  notes: string;
  distance?: string;
  address: string;
  category: string;
  imageUrl: string;
  onClick?: any;
};

type SingleLineGridListProps = {
  tiles: Array<TileType>;
  cols?: number;
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "start",
    overflow: "hidden",
    padding: "10px",
    "& ul": {
      width: "100%"
    }
  },
  gridList: {
    flexWrap: "nowrap",
    padding: "0 0 8px",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  tile: {
    "& > div": {
      borderRadius: "10px",
      boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
    }
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: "12px",
    fontWeight: "bold"
  },
  primarySubtitle: {
    color: theme.palette.secondary.contrastText,
    "& div": {
      "& div": {
        margin: "5px 0 0"
      },
      "& div:first-child": {
        margin: "2px 0 0"
      }
    }
  },
  secondarySubtitle: {
    "& svg": {
      height: "15px",
      width: "15px"
    }
  },
  titleBar: {
    background: "#ffffff",
    "& > div": {
      position: "absolute",
      top: "5px",
      left: "5px",
      margin: 0
    }
  }
}));

const SingleLineGridList: React.FC<SingleLineGridListProps> = props => {
  const { tiles, cols } = props;
  const classes = useStyles();
  const { device } = useContext(AppContext);
  const getCols = cols
    ? cols
    : device?.platform === "web" &&
      device?.operatingSystem !== "ios" &&
      device?.operatingSystem !== "android"
    ? 4.5
    : 2.5;

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={getCols}>
          {tiles.map((tile, index) => (
            <GridListTile
              className={classes.tile}
              key={Math.random()}
              component={RouterLink}
              to={{
                pathname: `/deals/${tile.id}`,
                state: tile
              }}
            >
              <img
                src={
                  tile.imageUrl
                    ? tile.imageUrl
                    : "https://homepages.cae.wisc.edu/~ece533/images/monarch.png"
                }
                alt={tile.name}
              />
              <GridListTileBar
                title={tile.dealName}
                subtitle={
                  <div className={classes.primarySubtitle}>
                    <div>
                      <span>{tile.name}</span>
                    </div>
                    {tile.distance ? (
                      <div className={classes.secondarySubtitle}>
                        <LocationOnOutlinedIcon />
                        <span>{tile.distance} miles away</span>
                      </div>
                    ) : null}
                  </div>
                }
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                  subtitle: classes.primarySubtitle
                }}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </ThemeProvider>
  );
};

export default SingleLineGridList;
