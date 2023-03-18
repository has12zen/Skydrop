const dotenv = require("dotenv");
dotenv.config();
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

var serviceAccount = require("./serviceAccountKey.json");

const app = require("./app");
console.log("Starting app..");
const PORT = process.env.PORT || 3002;

// async function initializeApp() {
//     try {
        
        
//     } catch (error) {
//       console.error('Error connecting to Firestore:', error);
//     }
// }
  
// initializeApp();

initializeApp({
    credential: cert(serviceAccount)
});

console.log('Successfully connected to Firestore!');

db = getFirestore();
// console.log(db);
console.log("Starting the server ...");
// postController.aggregatePosts();
app.listen(PORT, () => {
  console.log(`✅ Server is running on PORT ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err);
  console.log("UNHANDLED REJECTION! 💥 Shutting Down...");
  app.close(() => {
    process.exit(1);
  });
});
module.exports = db;
