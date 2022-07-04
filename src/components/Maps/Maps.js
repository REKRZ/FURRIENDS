import React, { useEffect, useState, useRef } from 'react';
import '../../App.css';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import * as tt from '@tomtom-international/web-sdk-maps';
import { getDogParks } from '../../api/getDogParks';
import PlacesCard from './PlacesCard';
import { useAuth } from '../../contexts/AuthContext';
import { query, getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

const Maps = () => {
  const [map, setMap] = useState({});
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [dogParks, setDogParks] = useState([]);
  const mapElement = useRef();
  const { currentUser } = useAuth();
  const { uid } = currentUser;

  const userInfoRef = doc(db, 'profiles', uid);
  const qUserInfo = query(userInfoRef);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setLat(latitude);
      setLng(longitude);
      console.log(latitude, longitude);
    });

    const getUserInfo = async () => {
      const userInfoSnapshot = await getDoc(qUserInfo);
      userInfoSnapshot ? setUserInfo(userInfoSnapshot.data()) : console.log('no such document!');
    };

    getUserInfo();
  }, []);

  useEffect(() => {
    getDogParks(lat, lng).then((parks) => {
      setDogParks(parks);
    });
  }, [lat, lng]);

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
      const element = document.createElement('div');
      element.className = 'marker';

      element.style.backgroundImage = `url("${userInfo.photoURL}")`;
      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([lng, lat])
        .addTo(map);

      marker.on('dragend', () => {
        const lngLat = marker.getLngLat();
        setLng(lngLat.lng);
        setLat(lngLat.lat);
      });
    };
    setMap(map);
    addMarker();
    return () => map.remove();
  }, [lat, lng, dogParks]);

  const { results } = dogParks;
  return (
    <div className='flex flex-row h-screen'>
      {map && (
        <div className='flex flex-row h-screen w-full lg:flex-row'>
          <div className='flex flex-col flex-grow overflow-y-auto w-1/3 border border-purple-300'>
            <div className='text-5xl border-b-4 border-purple-300 text-center content-center'>Places</div>
            {results?.map((park, i) => (
              <div key={i} className='w-full p-5'>
                <PlacesCard dogParks={park} num={i} />
              </div>
            ))}
          </div>
          <div ref={mapElement} style={{ height: '100%', width: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default Maps;
