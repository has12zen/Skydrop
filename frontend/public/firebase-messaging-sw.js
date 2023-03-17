

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDdp-u23KRJJCgtsQnXrWbZv57jmilPs0g",
  authDomain: "skydrop-2023.firebaseapp.com",
  projectId: "skydrop-2023",
  storageBucket: "skydrop-2023.appspot.com",
  messagingSenderId: "920258411671",
  appId: "1:920258411671:web:8c761ce7ff56ec6f6c7dd2"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});