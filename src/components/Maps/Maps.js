import React, { useEffect, useState, useRef } from "react";
// import * as tt from "@tomtom-international/web-sdk-maps";
import tt from "@tomtom-international/web-sdk-maps";

const App = () => {
  const [map, setMap] = useState({});
  const [lat, setLat] = useState(40.7567286);
  const [lng, setLng] = useState(-73.8810199);
  // const [mapElement, setMapElement] = useState({});
  const mapElement = useRef();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setLat(latitude);
      setLng(longitude);
      console.log(latitude, longitude);
    });
  }, []);

  useEffect(() => {
    let map = tt.map({
      key: process.env.REACT_APP_TOMTOM_API_KEY,
      container: mapElement.current,
      stylesVisibility: {
        poi: true,
      },
      center: [lng, lat],
      zoom: 14,
    });
    setMap(map);
    return () => map.remove();
  }, [lat, lng]);

  console.log(map);
  return (
    <div className="App">
      <div ref={mapElement} style={{ height: "80vh", width: "100%" }}></div>
    </div>
  );
};

export default App;
