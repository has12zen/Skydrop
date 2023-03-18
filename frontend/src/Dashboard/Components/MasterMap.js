import * as React from 'react';
import { useState, useEffect } from 'react';
import { MapProvider, useMap } from 'react-map-gl';
import { collection, where } from 'firebase/firestore';
import { LiveMap } from '../../Components/Map/liveMap';
import { Card, CardContent, Typography } from '@mui/material';
import { query, onSnapshot } from 'firebase/firestore';
import '../Styles/MasterMap.css';
import axios from 'axios';
import { db } from '../../db';

const DemoCard = ({ drone }) => {
  const { myMapA } = useMap();
  return (
    <Card
      sx={{ maxWidth: 275 }}
      onClick={() => {
        myMapA.flyTo({ center: [drone.longitude, drone.latitude] });
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2">
          {drone.color}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          latitude:{drone.latitude}\n longitude:{drone.longitude}
        </Typography>
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
          // coordinates: [
          //   [warehouses[0].longitude, warehouses[0].latitude],
          //   [markers[0].longitude, markers[0].longitude],
          // ],
        },
      },
    ],
  };
  const [viewState, setViewState] = useState({
    latitude: 40,
    longitude: -73,
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
        data.data.data.map((req) => {
          if (req.status in ['rejected', 'completed']) return;
          new_fatures.push({
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [[req.pickup.longitude, req.pickup.latitude], [req.destination.longitude, req.destination.latitude]],
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
        console.log('dataOne', dataOne)
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
            display: 'flex',
            width: '100%',
          }}
        >
          <div
            style={{
              overflow: 'auto',
            }}
          >
            {drones.map((drone, index) => (
              <div key={index} item xs={12}>
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
