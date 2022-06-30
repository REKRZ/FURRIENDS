import React, { useEffect, useState, useRef } from "react";
// import * as tt from "@tomtom-international/web-sdk-maps";
import "../../App.css";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";

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
        trafficFlow: true,
      },
      center: [lng, lat],
      zoom: 14,
    });

    const addMarker = () => {
      const element = document.createElement("div");
      element.className = "marker";

      //make this dynamic with user profile image
      element.style.backgroundImage = `url("https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/uk/advisor/wp-content/uploads/2021/05/short-coated-tan-puppy-stockpack-unsplash-scaled.jpg")`;
      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([lng, lat])
        .addTo(map);

      marker.on("dragend", () => {
        const lngLat = marker.getLngLat();
        setLng(lngLat.lng);
        setLat(lngLat.lat);
      });
    };
    setMap(map);
    addMarker();
    return () => map.remove();
  }, [lat, lng]);

  console.log(map);
  return (
    <>
      {map && (
        <div className="App">
          <div ref={mapElement} style={{ height: "80vh", width: "100%" }}></div>
        </div>
      )}
    </>
  );
};

export default App;
