import React, { useEffect, useState, useRef } from 'react';
import '../../App.css';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import * as tt from '@tomtom-international/web-sdk-maps';
import * as ttapi from '@tomtom-international/web-sdk-services';
import { useLocation } from 'react-router-dom';
import { getDogParks } from '../../api/getDogParks';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { convertCoords, drawRoute } from './mapFn';
import PlacesCard from './PlacesCard';

const Maps = () => {
  const [map, setMap] = useState({});
  const [dogParks, setDogParks] = useState([]);
  const mapElement = useRef();

  const userInfo = useLocation();
  const [lat, setLat] = useState(userInfo.state.user.lat);
  const [lng, setLng] = useState(userInfo.state.user.lng);
  const { id, photoURL } = userInfo.state.user;
  const friends = userInfo.state.friends;

  const userInfoRef = doc(db, 'profiles', id);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setLat(latitude);
      setLng(longitude);
      setDoc(userInfoRef, { lat: latitude, lng: longitude }, { merge: true });
    });
  }, []);

  useEffect(() => {
    getDogParks(lat, lng).then((parks) => {
      setDogParks(parks);
    });
  }, [lat, lng]);

  useEffect(() => {
    const origin = { lng: lng, lat: lat };
    let destinations = [];

    let map = tt.map({
      key: process.env.REACT_APP_TOMTOM_API_KEY,
      container: mapElement.current,
      stylesVisibility: {
        poi: true,
      },
      center: [lng, lat],
      zoom: 14,
    });

    map.addControl(new tt.FullscreenControl(), 'top-left');
    map.addControl(new tt.NavigationControl(), 'top-left');

    setMap(map);

    const addMarker = () => {
      const element = document.createElement('div');
      element.className = 'marker';
      element.style.backgroundImage = `url("${photoURL}")`;

      let popup = new tt.Popup({ offset: [0, -25], className: 'places-popup' }).setLngLat([lng, lat]).setHTML('<h2>You are here</h2>');

      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([lng, lat])
        .addTo(map)
        .setPopup(popup);

      marker.on('dragend', () => {
        const lngLat = marker.getLngLat();
        setLng(lngLat.lng);
        setLat(lngLat.lat);
      });
    };

    friends?.forEach((friend) => {
      let friendLng = Number(friend.lng);
      let friendLat = Number(friend.lat);
      let popup = new tt.Popup({ offset: [0, -25], className: 'places-popup' }).setLngLat([friendLng, friendLat]).setHTML(friend.displayName);

      let friendIcon = document.createElement('div');
      friendIcon.className = 'marker';
      friendIcon.style.backgroundImage = `url("${friend.photoURL}")`;

      new tt.Marker({
        element: friendIcon,
      })
        .setLngLat([friendLng, friendLat])
        .addTo(map)
        .setPopup(popup);
    });

    dogParks?.results?.forEach((park, i) => {
      let popup = new tt.Popup({ offset: [0, -40], className: 'places-popup' }).setLngLat([park.position.lon, park.position.lat]).setHTML(park.poi.name);

      let parkIcon = document.createElement('div');
      parkIcon.className = 'park-marker';
      parkIcon.style.backgroundImage = `url("https://866187.smushcdn.com/1921598/wp-content/uploads/2019/11/dealer_install_locator.png?lossy=0&strip=1&webp=1")`;

      let placesScroll = document.getElementById(i);
      parkIcon.addEventListener('click', () => {
        setTimeout(() => {
          placesScroll.scrollIntoView({ behavior: 'smooth' });
        });
      });

      new tt.Marker({
        element: parkIcon,
      })
        .setLngLat([park.position.lon, park.position.lat])
        .addTo(map)
        .setPopup(popup);
    });

    addMarker();

    const sortDestinations = async (parksArr) => {
      const placesCoords = parksArr.map((park) => convertCoords(park));

      const callParameters = {
        key: process.env.REACT_APP_TOMTOM_API_KEY,
        destinations: placesCoords,
        origins: [convertCoords(origin)],
      };

      return new Promise((resolve, reject) => {
        ttapi.services.matrixRouting(callParameters).then((matrixResults) => {
          const results = matrixResults.matrix[0];
          const resultsArr = results.map((result, i) => {
            return {
              location: parksArr[i],
              drivingtime: result.response.routeSummary.travelTimeInSeconds,
            };
          });
          resultsArr.sort((a, b) => a.drivingtime - b.drivingtime);
          const sortedPlaces = resultsArr.map((result) => result.location);
          resolve(sortedPlaces);
        });
      });
    };

    const calculateRoutes = () => {
      sortDestinations(destinations).then((sorted) => {
        sorted.unshift(origin);

        ttapi.services
          .calculateRoute({
            key: process.env.REACT_APP_TOMTOM_API_KEY,
            locations: sorted,
          })
          .then((routeData) => {
            const geoJSON = routeData.toGeoJson();
            drawRoute(geoJSON, map);
          });
      });
    };

    map.on('click', (evt) => {
      if (destinations.length) {
        destinations.pop();
      } else {
        destinations.push(evt.lngLat);
        calculateRoutes();
      }
    });

    return () => map.remove();
  }, [lat, lng, dogParks]);

  const { results } = dogParks;
  return (
    <div className='flex sm:flex-col lg:flex-row'>
      {map && (
        <div className='flex flex-col h-screen w-full lg:flex-row'>
          <div className='flex flex-row lg:flex-col lg:w-1/4 overflow-y-auto sm:w-full border border-purple-300'>
            <div className='text-2xl border-4 border-purple-300 text-center content-center'>Parks Near You</div>
            {results?.map((park, i) => (
              <div key={i} className='w-full p-5' id={i}>
                <PlacesCard dogParks={park} num={i} />
              </div>
            ))}
          </div>
          <div className='h-full w-full relative p-20'>
            <div ref={mapElement} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Maps;
