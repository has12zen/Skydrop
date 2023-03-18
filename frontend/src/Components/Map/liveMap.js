import * as React from 'react';
import Map, {
  Marker,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
  Source,
  Layer,
  useMap,
} from 'react-map-gl';
import { MAPBOX_TOKEN } from '../../constants';
import './marker.css';

import DronePin from './Markers/drone';
import WarehousePin from './Markers/warehouse';

import 'mapbox-gl/dist/mapbox-gl.css';

function NavigationPin(props) {
  const { drones, keyhash } = props;
  const { current } = useMap();
  const _onClickFocus = (pin) => {
    current.flyTo({ center: [pin.longitude, pin.latitude] });
  };
  return (
    <>
      {drones &&
        drones.map((drone, index) => {
          return (
            <Marker
              key={`marker-drone-${index}`}
              longitude={drone.longitude}
              latitude={drone.latitude}
              color={drone.color}
              onClick={() => _onClickFocus(drone)}
            >
              {keyhash === 'drone' && <DronePin fill={drone.color} size={30} />}
              {keyhash === 'warehouse' && <WarehousePin size={30} />}
            </Marker>
          );
        })}
    </>
  );
}

function LiveMap(props) {
  const { viewState, setViewState, markers, warehouses, drones, dataOne } =
    props;
  const _onViewportChange = (viewport) => {
    viewport.zoom = 3;
    setViewState(viewport);
  };
  return (
    <Map
      id="myMapA"
      className="modalMap"
      style={props?.style ?? {}}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <NavigationPin drones={drones} keyhash="drone" />
      <NavigationPin drones={warehouses} keyhash="warehouse" />
      <NavigationPin drones={markers} keyhash="marker" />
      <GeolocateControl
        onViewportChange={_onViewportChange}
        showAccuracyCircle={false}
      />
      <NavigationControl />
      <ScaleControl />
      {dataOne && (
        <Source id="polylineLayer" type="geojson" data={dataOne}>
          <Layer
            id="lineLayer"
            type="line"
            source="my-data"
            layout={{
              'line-join': 'round',
              'line-cap': 'round',
            }}
            paint={{
              'line-color': 'rgba(3, 170, 238, 0.5)',
              'line-width': 5,
            }}
          />
        </Source>
      )}
    </Map>
  );
}

export { LiveMap };
