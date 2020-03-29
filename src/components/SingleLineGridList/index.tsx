import React, { useContext } from 'react';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { AppContext } from 'containers/AppContainer';
import 'typeface-roboto';
import { theme } from '../../themes/theme';

type TileDataType = {
  img: string;
  title: string;
  primarySubtitle: string;
  secondarySubtitle?: string | number;
  onClick?: any;
};

type SingleLineGridListProps = {
  tileData: Array<TileDataType>;
  cols?: number;
};

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    padding: '10px',
  },
  gridList: {
    flexWrap: 'nowrap',
    padding: '0 0 8px',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  tile: {
    '& > div': {
      borderRadius: '10px',
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
    }
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: '12px',
    fontWeight: 'bold'
  },
  primarySubtitle: {
    color: theme.palette.secondary.contrastText,
    '& div': {
      '& div': {
        margin: '5px 0 0'
      },
      '& div:first-child': {
        margin: '2px 0 0'
      }
    }
  },
  secondarySubtitle: {
    '& svg': {
      height: '15px',
      width: '15px',
    }
  },
  titleBar: {
    background: '#ffffff',
    '& > div': {
      position: 'absolute',
      top: 0,
      left: '5px',
      margin: 0
    }
  }
}));

const SingleLineGridList: React.FC<SingleLineGridListProps> = props => {
  const { tileData, cols } = props;
  const classes = useStyles();
  const { device } = useContext(AppContext);
  const getCols = cols ? cols : device?.platform === 'web' ? 4.5 : 2.5;

  return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <GridList className={classes.gridList} cols={getCols}>
            {tileData.map((tile, index) => (
              <GridListTile
                className={classes.tile}
                key={tile.title + index}
                onClick={tile.onClick}
              >
                <img src={tile.img} alt={tile.title} />
                <GridListTileBar
                  title={tile.title}
                  subtitle={
                    <div className={classes.primarySubtitle}>
                      <div>
                        <span>{tile.primarySubtitle}</span>
                      </div>
                      {tile.secondarySubtitle ? (
                        <div className={classes.secondarySubtitle}>
                          <LocationOnOutlinedIcon />
                          <span>{tile.secondarySubtitle} miles away</span>
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
