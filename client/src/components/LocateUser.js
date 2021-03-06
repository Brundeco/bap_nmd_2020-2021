import React, { useState } from "react";

export default (props) => {
  const [userLocation, setLocation] = useState({
    coordinates: { lat: "", lng: "" },
  });
  const [response, setResponse] = useState();

  const onSuccess = async (userLoc) => {
    setResponse('')
    setLocation({
      coordinates: {
        lat: userLoc.coords.latitude,
        lng: userLoc.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setResponse('Location sharing is disabled')

    setLocation({
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  const locateUser = () => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  if (
    userLocation?.coordinates != undefined &&
    typeof userLocation?.coordinates?.lat != "number"
  ) {
    locateUser();
  }

  return <div data={props.coords(userLocation)} err={props.err(response)} ></div>;
};
