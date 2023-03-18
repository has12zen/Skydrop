import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { render } from 'react-dom';
import Map, {
  Marker,
  GeolocateControl,
  NavigationControl,
  useMap,
  ScaleControl,
} from 'react-map-gl';
import { MAPBOX_TOKEN } from '../../constants';

import 'mapbox-gl/dist/mapbox-gl.css';

function DefaultMap() {
  const [viewState, setViewState] = useState({
    latitude: 40.75,
    longitude: -73.98,
    zoom: 12,
  });
  const [marker, setMarker] = useState({
    latitude: 40.75,
    longitude: -73.98,
  });
  const _onViewportChange = (viewport) => {
    viewport.zoom = 3; //Whatever zoom level you want
    setViewState(viewport);
  };
  const onMarkerDrag = useCallback((event) => {
    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    });
  }, []);
  return (
    <Map
      id="mapData"
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      // style={{ width: 800, height: 600 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <Marker
        longitude={marker.longitude}
        latitude={marker.latitude}
        color="red"
        draggable={true}
        onDrag={onMarkerDrag}
      />
      <GeolocateControl
        onViewportChange={_onViewportChange}
        onGeolocate={(position) => {
          setMarker({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          });
        }}
        showAccuracyCircle={false}
      />
      <NavigationControl />
      <ScaleControl />
    </Map>
  );
}

export { DefaultMap };
