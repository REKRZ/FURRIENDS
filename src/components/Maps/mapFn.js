export const convertCoords = (lngLat) => {
  return {
    point: {
      longitude: lngLat.lng,
      latitude: lngLat.lat,
    },
  };
};

export const drawRoute = (GeoJSON, map) => {
  if (map.getLayer('route')) {
    map.removeLayer('route');
    map.removeSource('route');
  }
  map.addLayer({
    id: 'route',
    type: 'line',
    source: {
      type: 'geojson',
      data: GeoJSON,
    },
    paint: {
      'line-color': '#1145AC',
      'line-width': 6,
    },
  });
};
