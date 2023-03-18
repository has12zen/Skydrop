import * as React from 'react';
import { useState, useEffect } from 'react';
import { MapProvider, useMap } from 'react-map-gl';
import { collection } from 'firebase/firestore';
import { LiveMap } from '../../Components/Map/liveMap';
import { Card, CardContent, Typography } from '@mui/material';
import { query, onSnapshot } from 'firebase/firestore';
import '../Styles/MasterMap.css';
import axios from 'axios';
import { db } from '../../db';

import DronePin from '../../Components/Map/Markers/drone';

const DemoCard = ({ drone }) => {
  const { myMapA } = useMap();
  return (
    <Card
      sx={{
        width: '200px',
        margin: '10px 0px 10px 20px',
        cursor: 'pointer',
        transition: 'all 0.1s ease-in-out',
        '&:hover': {
          backgroundColor: 'rgb(205, 228, 247)',
          transform: 'scale(1.05)',
        },
      }}
      onClick={() => {
        myMapA.flyTo({ center: [drone.longitude, drone.latitude] });
      }}
    >
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <DronePin fill={drone.color} />
          <Typography
            variant="h5"
            component="h2"
            style={{ marginLeft: '10px' }}
          >
            {drone.color}
          </Typography>
        </div>
        <div sx={{ mb: 1.5 }} color="text.secondary">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>latitude:</div>
            <div>{parseFloat(drone.latitude).toFixed(3)}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>longitude:</div>
            <div>{parseFloat(drone.longitude).toFixed(3)}</div>
          </div>
        </div>
        <Typography variant="body2">This is drone info</Typography>
      </CardContent>
    </Card>
  );
};
function MasterMap() {
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
  const [viewState, setViewState] = useState({
    latitude: 20.14529,
    longitude: 85.67352,
    zoom: 12,
  });
  const [markers, setMarkers] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [drones, setDrones] = useState([]);
  const [jsonData, setJsonData] = useState(null);
  const getRequests = async () => {
    axios
      .get(`/api/requests/getAll`)
      .then((res) => {
        const { data } = res;
        const pickUps = [];
        const dropOff = [];
        const new_fatures = [];
        data.map((req) => {
          if (req.status in ['Rejected', 'Completed']) return;
          new_fatures.push({
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [
                [req.pickup.longitude, req.pickup.latitude],
                [req.destination.longitude, req.destination.latitude],
              ],
            },
          });
          pickUps.push(req.pickup);
          dropOff.push(req.destination);
        });
        // console.log('drps marker', dropOff);
        // console.log('pks warehouse', pickUps);
        setMarkers(dropOff);
        setWarehouses(pickUps);
        dataOne.features = new_fatures;
        setJsonData(dataOne);
        console.log('dataOne', dataOne);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const q = query(collection(db, 'drones'));
    getRequests();
    const sub = onSnapshot(q, (querySnapshot) => {
      const newDrones = [];
      let idx = 0;
      const clrMap = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];
      querySnapshot.docs.map((doc) => {
        if (!doc.data().latitude) return;
        if (!doc.data().longitude) return;
        // if(!doc.data().available) return;
        newDrones.push({
          ...doc.data(),
          color: clrMap[idx++],
        });
        idx = idx % clrMap.length;
      });
      setDrones(newDrones);
    });
  }, []);

  return (
    <>
      <MapProvider>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            width: '100%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              overflow: 'auto',
              width: '100%',
              bottom: 0,
              left: 0,
              display: 'flex',
              zIndex: 100,
            }}
          >
            {drones.map((drone, index) => (
              <div key={index}>
                <DemoCard drone={drone} />
              </div>
            ))}
          </div>
          <div id="mapCont">
            <LiveMap
              dataOne={jsonData}
              viewState={viewState}
              setViewState={setViewState}
              drones={drones}
              warehouses={warehouses}
              markers={markers}
            />
          </div>
        </div>
      </MapProvider>
    </>
  );
}
export default MasterMap;
