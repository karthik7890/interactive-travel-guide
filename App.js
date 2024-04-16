import React, { useState, useEffect } from "react";
import { CssBaseline, Grid, Button } from "@material-ui/core";
// import axios from "axios";

import { getPlacesData } from "./api";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import ItineraryPlanner from "./components/ItineraryPlanner/ItineraryPlanner";

// const scrollToBottom = () => {
//   window.scrollTo({
//     top: document.documentElement.scrollHeight,
//     behavior: "smooth",
//   });
// };

const App = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [childClicked, setChildClicked] = useState(null);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  const [showPlanner, setShowPlanner] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filteredPlaces = places?.filter((place) => place.rating > rating);

    setFilteredPlaces(filteredPlaces);
  }, [rating, places]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);

      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setIsLoading(false);
      });
    }
  }, [type, bounds]);

  const togglePlanner = () => {
    setShowPlanner(!showPlanner);
  }

  return (
    // <>
    //   <CssBaseline />
    //   <Header setCoordinates={setCoordinates} />
    //   <Button
    //         variant="contained"
    //         color="secondary"
    //         style={{ marginLeft: "10px" }}
    //         // onClick={scrollToBottom && togglePlanner}
    //       >
    //         Itinerary Planner
    //       </Button>
    //   <Grid container spacing={3} style={{ paddingTop: 100 }}>
    //     <Grid item xs={12} md={4}>
    //       <List
    //         places={filteredPlaces?.length ? filteredPlaces : places}
    //         childClicked={childClicked}
    //         isLoading={isLoading}
    //         type={type}
    //         setType={setType}
    //         rating={rating}
    //         setRating={setRating}
    //       />
    //     </Grid>
    //     <Grid item xs={12} md={8}>
    //       <Map
    //         setChildClicked={setChildClicked}
    //         setCoordinates={setCoordinates}
    //         setBounds={setBounds}
    //         coordinates={coordinates}
    //         places={filteredPlaces?.length ? filteredPlaces : places}
    //       />
    //     </Grid>
    //   </Grid>
    // </>
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Button
        variant="contained"
        color="secondary"
        style={{ position: 'fixed', top: '70px', left: '10px', zIndex: 1000 }}
        onClick={togglePlanner}
      >
        Itinerary Planner
      </Button>
      <Grid container spacing={3} style={{ paddingTop: '100px' }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces?.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setChildClicked={setChildClicked}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces?.length ? filteredPlaces : places}
          />
        </Grid>
      </Grid>
      {true && <ItineraryPlanner />} {/* Render the ItineraryPlanner component conditionally based on the state variable */}
    </>

  );
};

export default App;
