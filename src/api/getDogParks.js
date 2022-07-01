import axios from 'axios';

export const getDogParks = async (lat, lng) => {
  try {
    const { data } = await axios.get(`https://api.tomtom.com/search/2/poiSearch/dog%20parks.json?lat=${lat}&lon=${lng}&radius=3218&categorySet=9362&view=Unified&relatedPois=off&key=${process.env.REACT_APP_TOMTOM_API_KEY}`);
    return data;
  } catch (err) {
    console.error(err);
  }
};
