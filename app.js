import express from "express";
import cors from "cors";
import https from 'https';
import fs from 'fs';

const app = express();

const medRep = require("./routes/medrep");
const indec = require("./routes/indec");
const moreval = require("./routes/moreval");

/* ==================================================================================================
======================================= SSL Configurations ==========================================
===================================================================================================*/

const privateKey = fs.readFileSync('/home/ssl_certificates/medrepexpress.com.key', 'utf8');
const certificate = fs.readFileSync('/home/ssl_certificates/medrepexpress.com.signed.cert', 'utf8');
const ca = fs.readFileSync('/home/ssl_certificates/letsencrypt-intermediate.pem', 'utf8');

const credentials = {
key: privateKey,
cert: certificate,
ca: ca
};

/* ==================================================================================================
=========================================== Middleware ==============================================
===================================================================================================*/

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', medRep);
app.use('/indec', indec);
app.use('/moreval', moreval);

// Configure headers and cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

/* ==================================================================================================
============================================== Routes ===============================================
===================================================================================================*/

app.get('/', function (req, res) {
  res.writeHead(200);
  res.end("by VainillaDev\n");
});


/* ==================================================================================================
======================================= Server connection ===========================================
===================================================================================================*/

const port = process.env.port || 3001;
// app.listen(port, () => {
https.createServer(credentials, app).listen(port, () => {
  console.log("Listening on port: " + port);
});
