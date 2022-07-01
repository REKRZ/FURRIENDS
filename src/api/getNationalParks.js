import axios from 'axios';

export const getNationalPark = async (state) => {
  try {
    const { data } = await axios.get(`https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=30&api_key=${process.env.REACT_APP_NPS_API_KEY}`);
    return data;
  } catch (err) {
    console.error(err);
  }
};
