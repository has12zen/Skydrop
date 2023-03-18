const dataOne = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
      },
    },
  ],
};
export const getLines = (points) => {
  const new_features = [];
  points.map((point) => {
    const [src, dest] = point;
    new_features.push({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [
          [src.longitude, src.latitude],
          [dest.longitude, dest.latitude],
        ],
      },
    });
  });
  dataOne.features = new_features;
  return dataOne;
};
