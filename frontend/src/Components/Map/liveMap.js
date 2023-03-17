import * as React from 'react';
import Map, {
    Marker,
    GeolocateControl,
    NavigationControl,
    ScaleControl,
    Source,
    Layer,
} from 'react-map-gl';
import { MAPBOX_TOKEN } from '../../constants';
import './marker.css';

import DronePin from './Markers/drone';
import WarehousePin from './Markers/warehouse';

import 'mapbox-gl/dist/mapbox-gl.css';

function LiveMap(props) {
    const { viewState, setViewState, markers, warehouses, drones, dataOne } =
        props;
    const _onViewportChange = (viewport) => {
        viewport.zoom = 3;
        setViewState(viewport);
    };
    const _renderDroneMarker = (drones, index) => {
        return (
            <>
                {drones &&
                    drones.map((drone, index) => {
                        return (
                            <Marker
                                key={`marker-drone-${index}`}
                                longitude={drone.longitude}
                                latitude={drone.latitude}
                            >
                                <DronePin size={30} />
                            </Marker>
                        );
                    })}
            </>
        );
    };
    const _renderWarehouseMarker = (warehouses, index) => {
        return (
            <>
                {warehouses &&
                    warehouses.map((warehouse, index) => {
                        return (<Marker
                            key={`marker-warehouse-${index}`}
                            longitude={warehouse.longitude}
                            latitude={warehouse.latitude}
                        >
                            <WarehousePin size={30} />
                        </Marker>)
                    })
                }
            </>
        );
    };
    const _renderMarkers = (markers, index) => {
        return (
            <>
                {markers && markers.map((marker, index) => {
                    return (
                        <Marker
                            key={`marker-customer-${index}`}
                            longitude={marker.longitude}
                            latitude={marker.latitude}
                        ></Marker>
                    )
                })}
            </>
        );
    };
    return (
        <Map
            id="map"
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={MAPBOX_TOKEN}
        >
            {_renderMarkers(markers)}
            {_renderWarehouseMarker(warehouses)}
            {_renderDroneMarker(drones)}
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
