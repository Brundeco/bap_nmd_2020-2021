import React, { useState } from "react";

export default (props) => {
  const [userLocation, setLocation] = useState({
    coordinates: { lat: "", lng: "" },
  });
  const [loading, setLoading] = useState();

  const onSuccess = async (userLoc) => {
    setLocation({
      coordinates: {
        lat: userLoc.coords.latitude,
        lng: userLoc.coords.longitude,
      },
    });
  };

  const onError = (error) => {
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
    userLocation?.coordinates?.lat &&
    typeof userLocation?.coordinates?.lat != "number"
  )
    locateUser();

  return <div data={props.coords(userLocation)}></div>;
};
