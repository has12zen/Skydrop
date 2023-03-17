import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import Map, { Marker, GeolocateControl, NavigationControl, useMap, ScaleControl, Source, Layer } from 'react-map-gl';
import { MAPBOX_TOKEN } from '../../constants';
// import PolylineOverlay from './drawPath';
import './marker.css'

import DronePin from './Markers/drone'
import WarehousePin from './Markers/warehouse';

import 'mapbox-gl/dist/mapbox-gl.css';

function LiveMap() {
    const [viewState, setViewState] = useState({
        latitude: 40.75,
        longitude: -73.98,
        zoom: 12,
    });
    const [marker, setMarker] = useState({
        latitude: 41.75,
        longitude: -73.98,
    });
    const [warehouse, setWarehouse] = useState({
        latitude: 39,
        longitude: -73.98,
    });
    const [drone, setDrone] = useState({
        latitude: 40.75,
        longitude: -73.98,
    })
    const timer = setTimeout(() => {
        if (drone.latitude > 41.75) {
            clearInterval(timer)
        }
        else {
            setDrone({
                latitude: drone.latitude + 0.00001,
                longitude: drone.longitude
            })
        }
    }, 4)
    const _onViewportChange = (viewport) => {
        viewport.zoom = 3
        setViewState(viewport);
    }
    const _renderDroneMarker = (drone, index) => {
        return (
            <Marker
                key={`marker-drone-${index}`}
                longitude={drone.longitude}
                latitude={drone.latitude} >
                <DronePin size={30} />
            </Marker>
        );
    }
    const _renderWarehouseMarker = (warehouse, index) => {
        return (
            <Marker
                key={`marker-warehouse-${index}`}
                longitude={warehouse.longitude}
                latitude={warehouse.latitude} >
                <WarehousePin size={30} />
            </Marker>
        )
    }
    const _renderMarkers = (pos, index) => {
        return (
            <Marker
                key={`marker-customer-${index}`}
                longitude={pos.longitude}
                latitude={pos.latitude} >
            </Marker>
        )

    }
    const dataOne = {
        type: "Feature",
        properties: {},
        geometry: {
            type: "LineString",
            coordinates: [
                [warehouse.longitude, warehouse.latitude],
                [marker.longitude, marker.latitude]
            ]
        }
    };
    return (
        <Map
            id='mapData'
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            style={{ width: 800, height: 600 }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={MAPBOX_TOKEN}
        >
            {marker && _renderMarkers(marker)}
            {warehouse && _renderWarehouseMarker(warehouse)}
            {drone && _renderDroneMarker(drone)}
            <GeolocateControl
                onViewportChange={_onViewportChange}
                onGeolocate={(position) => {
                    setMarker({
                        longitue: position.coords.longitude,
                        latitude: position.coords.latitude
                    })
                }}
                showAccuracyCircle={false} />
            <NavigationControl />
            <ScaleControl />
            <Source id="polylineLayer" type="geojson" data={dataOne}>
                <Layer
                    id="lineLayer"
                    type="line"
                    source="my-data"
                    layout={{
                        "line-join": "round",
                        "line-cap": "round"
                    }}
                    paint={{
                        "line-color": "rgba(3, 170, 238, 0.5)",
                        "line-width": 5
                    }}
                />
            </Source>
        </Map>
    );
}

export { LiveMap }