import * as React from 'react';
import { useState  } from 'react';
import { LiveMap } from '../../Components/Map/liveMap';

function MasterMap() {
    const [viewState, setViewState] = useState({
        latitude: 40,
        longitude: -73,
        zoom: 12,
    });
    const [markers, setMarkers] = useState([{
        latitude: 41.75,
        longitude: -73.98,
    }]);
    const [warehouses, setWarehouses] = useState([{
        latitude: 39,
        longitude: -73.98,
    }]);
    const [drones, setDrones] = useState([{
        latitude: 40.75,
        longitude: -73.98,
    }])
    const dataOne = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates: [
                        [warehouses[0].longitude, warehouses[0].latitude],
                        [markers[0].longitude, markers[0].latitude]
                    ]
                }
            },
            {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates: [
                        [warehouses[0].longitude, warehouses[0].latitude],
                        [markers[0].longitude, markers[0].longitude]
                    ]
                }
            }
        ]
    };
    return (
        <>
        <LiveMap dataOne={dataOne} viewState={viewState} setViewState={setViewState} drones={drones} warehouses={warehouses}  markers={markers}  />
        </>
    );
}
export default MasterMap;