import React, { useState } from "react";
import { createStyles, Theme, Grid, ButtonBase } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../themes/theme";

type FilterTypeProps = {
  disabled: boolean;
  title: any;
  icon: any;
  selected: boolean;
  toggleFilter: Function;
};

export const FilterType = (props: FilterTypeProps) => {
  const { title, icon, disabled, selected } = props;
  const initColor: string = selected ? theme.palette.primary.light : "#fafafa";
  const [buttonColor, setButtonColor] = useState<string>(initColor);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        height: "100%",
        width: "100%"
        // paddingTop: '20px',
      },
      gridList: {
        width: "100%",
        height: "100%",
        borderWidth: "10px",
        borderBottom: "#000000",
        fontSize: "8px",
        outline: "1px solid #9e9e9e"
      },
      gridTitle: {
        marginTop: "2px"
      },
      buttonBase: {
        width: "100%",
        height: "100%",
        backgroundColor: buttonColor,
        outline: "1px solid #9e9e9e"
      }
    })
  );

  const classes = useStyles();

  // support toggling
  const handleClick = (event: any) => {
    const { toggleFilter } = props;
    if (buttonColor !== "#fafafa") {
      setButtonColor("#fafafa");
    } else {
      setButtonColor(theme.palette.primary.light);
    }
    toggleFilter(event.currentTarget.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <ButtonBase
        focusRipple
        key={title}
        value={title}
        className={classes.buttonBase}
        onClick={handleClick}
        disabled={disabled}
      >
        <Grid
          alignContent={"center"}
          container
          direction="row"
          justify="center"
          alignItems="baseline"
        >
          {icon}
          <Grid
            item
            alignContent={"center"}
            alignItems={"baseline"}
            justify="center"
            direction="row"
            container
            className={classes.gridTitle}
          >
            {title}
          </Grid>
        </Grid>
      </ButtonBase>
    </ThemeProvider>
  );
};
