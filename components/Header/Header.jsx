import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles.js";

const Header = ({ setCoordinates }) => {
  const classes = useStyles();
  const [autocomplete, setAutocomplete] = useState(null);
  // const [showPlanner, setShowPlanner] = useState(false);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinates({ lat, lng });
  };

  // const scrollToBottom = () => {
  //   window.scrollTo({
  //     top: document.documentElement.scrollHeight,
  //     behavior: "smooth",
  //   });
  // };

  // const togglePlanner = () => {
  //   setShowPlanner(!showPlanner);
  // }

  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
      <Box display="flex" alignItems="center">
          <Typography variant="h5" className={classes.title}>
            Travel Advisor
          </Typography>
          {/* <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: "10px" }}
            onClick={scrollToBottom && togglePlanner}
          >
            Itinerary Planner
          </Button> */}
        </Box>
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            Explore new places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search..."
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
