const fetch = require('node-fetch');

const admin = require("firebase-admin");

var serviceAccount = require(process.env.FB_TOKEN);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://frc-scouting-epicnd.firebaseio.com"
});