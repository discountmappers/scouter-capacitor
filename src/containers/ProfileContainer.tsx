import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import { ListItemIcon, MenuItem, MenuList, Grid } from "@material-ui/core";
import {
  SettingsOutlined,
  DraftsOutlined,
  FavoriteOutlined,
  NotificationsActiveOutlined
} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: "20px"
    },
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    avatar: {
      backgroundColor: "#66bb6a"
    },
    menuItem: {
      boxShadow: "0 2px 4px rgba(0,0,0,0.16), 0 2px 4px rgba(0,0,0,0.23)"
    }
  })
);

export const ProfileContainer = (props: any) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Grid container className={classes.root} justify="center">
      <Grid item xs={10} sm={7} md={4}>
        <Card>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                Y
              </Avatar>
            }
            title="Baby Yoda"
            subheader="Role: Registered Nurse"
            titleTypographyProps={{ variant: "h6" }}
          />
          <CardMedia
            className={classes.media}
            image="https://media13.s-nbcnews.com/j/MSNBC/Components/Video/201911/tdy_sat_baby_yoda_191123_1920x1080.focal-760x428.jpg"
          />
          <CardContent>
            <MenuList>
              <MenuItem className={classes.menuItem}>
                <ListItemIcon>
                  <DraftsOutlined color={"primary"} fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Refer a friend</Typography>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <ListItemIcon>
                  <FavoriteOutlined color={"primary"} fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Favorite Deals</Typography>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <ListItemIcon>
                  <NotificationsActiveOutlined
                    color={"primary"}
                    fontSize="small"
                  />
                </ListItemIcon>
                <Typography variant="inherit">Notifications</Typography>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <ListItemIcon>
                  <SettingsOutlined color={"primary"} fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Settings</Typography>
              </MenuItem>
            </MenuList>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
