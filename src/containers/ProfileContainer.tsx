import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ListItemIcon, MenuItem, MenuList } from '@material-ui/core';
import { SettingsOutlined, DraftsOutlined, FavoriteOutlined, NotificationsActiveOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: '#66bb6a',
    },
    menuItem: {
      boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    },
  }),
);

export const ProfileContainer = (props:any) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            Y
          </Avatar>
        }
        title="Baby Yoda"
        subheader="Role: Registered Nurse"
        titleTypographyProps={{variant:"h6"}}
      />
      <CardMedia
        className={classes.media}
        image="https://media13.s-nbcnews.com/j/MSNBC/Components/Video/201911/tdy_sat_baby_yoda_191123_1920x1080.focal-760x428.jpg"
      />
      <CardContent>
        <MenuList>
          <MenuItem className={classes.menuItem}>
            <ListItemIcon>
              <DraftsOutlined color={'primary'} fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Refer a friend</Typography>
          </MenuItem>
          <MenuItem className={classes.menuItem}>
            <ListItemIcon>
              <FavoriteOutlined color={'primary'} fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Favorite Deals</Typography>
          </MenuItem>
          <MenuItem className={classes.menuItem}>
            <ListItemIcon>
              <NotificationsActiveOutlined color={'primary'} fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Notifications</Typography>
          </MenuItem>
          <MenuItem className={classes.menuItem}>
            <ListItemIcon>
              <SettingsOutlined color={'primary'} fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Settings</Typography>
          </MenuItem>
        </MenuList>
      </CardContent>
    </Card>
  );
}
