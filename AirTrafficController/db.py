import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import schedule
import time
import math

cred = credentials.Certificate('./serviceAccount.json')

app = firebase_admin.initialize_app(cred)

db = firestore.client()


def distance(lat1, lon1, lat2, lon2):
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = math.sin(dlat/2)**2 + math.cos(lat1) * \
        math.cos(lat2) * math.sin(dlon/2)**2
    c = 2 * math.asin(math.sqrt(a))
    r = 6371
    return c * r


def get_drones():
    requests = []
    drones = []
    docs = db.collection(u'requests').where(
        u'status', u'==', 'Accepted').stream()
    for doc in docs:
        dct = doc.to_dict()
        dct['id'] = doc.id
        requests.append(dct)
    docs = db.collection(u'drones').where(u'available', u'==', True).stream()
    for doc in docs:
        dct = doc.to_dict()
        dct['id'] = doc.id
        drones.append(dct)
    # print(requests)
    print(
        f"There are {len(requests)} requests and {len(drones)} drones available")
    newRequests = []
    newDrones = []
    for req in requests:
        pos = req['pickup']
        current_drone = None
        closest_distance = float('inf')
        for drone in drones:
            dist = distance(pos['latitude'], pos['longitude'],
                            drone['latitude'], drone['longitude'])
            if dist < closest_distance:
                closest_distance = dist
                current_drone = drone
        if (current_drone != None):
            drones.remove(current_drone)
            newRequests.append(req)
            current_drone['reqId'] = req['id']
            current_drone['available'] = False
            current_drone['destinationType'] = 'pickup'
            newDrones.append(current_drone)
    batch = db.batch()
    for req in newRequests:
        reqRef = db.collection(u'requests').document(req['id'])
        batch.update(reqRef, {'status': 'Active'})

    for drone in newDrones:
        droneRef = db.collection(u'drones').document(drone['id'])
        batch.update(droneRef, {
                     'available': False, 'destinationType': 'pickup', 'reqId': drone['reqId']})
    batch.commit()
    print(f"{len(newRequests)} requests have been assigned to {len(newDrones)}drones")


def move_drones():
    drones = []
    docs = db.collection(u'drones').where(u'available', u'==', False).stream()
    for doc in docs:
        dct = doc.to_dict()
        dct['id'] = doc.id
        drones.append(dct)
    batch = db.batch()
    for drone in drones:
        req = db.collection(u'requests').document(
            drone['reqId']).get().to_dict()
        if drone['destinationType'] == 'pickup':
            dist = distance(drone['latitude'], drone['longitude'],
                            req['pickup']['latitude'], req['pickup']['longitude'])
            print(dist)
            if dist < 0.5:
                droneRef = db.collection(u'drones').document(drone['id'])
                batch.update(droneRef, {'destinationType': 'dropoff'})
            else:
                droneRef = db.collection(u'drones').document(drone['id'])
                batch.update(droneRef, {'latitude': drone['latitude'] + (req['pickup']['latitude'] - drone['latitude']) /
                             dist, 'longitude': drone['longitude'] + (req['pickup']['longitude'] - drone['longitude'])/dist})
        elif drone['destinationType'] == 'dropoff':
            dist = distance(drone['latitude'], drone['longitude'],
                            req['destination']['latitude'], req['destination']['longitude'])
            print(dist)
            if dist < 0.5:
                droneRef = db.collection(u'drones').document(drone['id'])
                batch.update(
                    droneRef, {'available': True, 'reqId': None, 'destinationType': None})
                reqRef = db.collection(u'requests').document(req['id'])
                batch.update(reqRef, {'status': 'Completed'})
            else:
                droneRef = db.collection(u'drones').document(drone['id'])
                batch.update(droneRef, {'latitude': drone['latitude'] + (req['destination']['latitude'] - drone['latitude']) /
                             dist, 'longitude': drone['longitude'] + (req['destination']['longitude'] - drone['longitude'])/dist})
    batch.commit()


def fun1():
    print("fun1")


def fun2():
    print("fun2")

schedule.every(15).seconds.do(get_drones)

schedule.every(10).seconds.do(move_drones)

while True:
    schedule.run_pending()
    time.sleep(1)


move_drones()
