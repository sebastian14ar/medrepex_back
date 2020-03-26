import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
const https = require('https');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  host: "smtp.medrepexpress.com",
  port: 587,
  auth: {
    user: "sales@medrepexpress.com",
    pass: "mxCY55Fc"
  }
});

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
 ==================================================================================================*/

// ----------------------------------------- CONTACT US ---------------------------------------------
app.post("/api/contact-us", async (req, res) => {
  console.log(req.body);

  var htmlMail = `
        <h3>----- CONTACT US -----</h3>
        <h3>INFORMATION OF CLIENT: </h3>
        <h4>
            <p> Name: ${req.body.name}
            <p> Email Address:  ${req.body.email}
        </h4>
        <h3>SUBJECT: </h3>
        <h4>
            <p> ${req.body.subject}
        </h4>
        <h3>MESSAGE: </h3>
        <h4>
            <p> ${req.body.message}
        </h4>
         `;

  var subject = "CONTACT US | " + req.body.name;

  var mailOptions = {
    from: req.body.email,
    // to: "sitioweb@indecmexico.com",
    to: "sales@medrepexpress.com",
    subject: subject,
    html: htmlMail
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log("Email sent");
      res.send("Email sent");
    }
  });
});

// -------------------------------------- REQUEST SAMPLES -------------------------------------------
app.post("/api/req-samples", async (req, res) => {
  console.log(req.body);

  var htmlMail = `
        <h3>----- REQUEST SAMPLES -----</h3>
        <h3>INFORMATION OF CLIENT: </h3>
        <h4>
            <p> Business Name: ${req.body.businessName}
            <p> Requestor's Name: ${req.body.name}
            <p> Phone Number: ${req.body.phone}
            <p> Fax: ${req.body.fax}
            <p> Email: ${req.body.email}
            <p> Shipping Address: ${req.body.shippingAddress}
        </h4>
        <h3>PRODUCT APPLICATION: </h3>
        <h4>
            <p> ${req.body.productApp}
        </h4>
    `;

  var subject =
    "REQUEST SAMPLES | " + req.body.businessName + " | " + req.body.name;

  var mailOptions = {
    from: req.body.email,
    // to: "sitioweb@indecmexico.com",
    to: "sales@medrepexpress.com",
    subject: subject,
    html: htmlMail
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log("Email sent");
      res.send("Email sent");
    }
  });
});

// ------------------------------------ REQUEST PRODUCT INFO ----------------------------------------
app.post("/api/req-product-info", async (req, res) => {
  console.log(req.body);

  var htmlMail = `
        <h3>----- REQUEST PRODUCT INFO -----</h3>
        <h3>INFORMATION OF CLIENT: </h3>
        <h4>
            <p> Business Name: ${req.body.businessName}
            <p> Requestor's Name: ${req.body.name}
            <p> Phone Number: ${req.body.phone}
            <p> Fax: ${req.body.fax}
            <p> Email: ${req.body.email}
            <p> Shipping Address: ${req.body.shippingAddress}
        </h4>
        <h3>PRODUCT INQUIRY: </h3>
        <h4>
            <p> ${req.body.productInq}
        </h4>
    `;

  var subject =
    "REQUEST PRODUCT INFO | " + req.body.businessName + " | " + req.body.name;

  var mailOptions = {
    from: req.body.email,
    // to: "sitioweb@indecmexico.com",
    to: "sales@medrepexpress.com",
    subject: subject,
    html: htmlMail
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log("Email sent");
      res.send("Email sent");
    }
  });
});

// --------------------------------------- SHOPPING CART --------------------------------------------
app.post("/api/shopping-cart", async (req, res) => {
  var purchaseOrder = "";
  var total;
  for (var key in req.body.items) {
    if (req.body.items.hasOwnProperty(key)) {
      purchaseOrder +=
        req.body.items[key].code + "  |   "  +
        req.body.items[key].description + "   |   "  +
        req.body.items[key].cant + "  |   "  +
        req.body.items[key].price + "   |  "  +
        (req.body.items[key].cant * req.body.items[key].price) + "   |   " +
        "<p>";
      total += (req.body.items[key].cant * req.body.items[key].price);
      console.log(total);
    }
  }  
  purchaseOrder += "STANDAR GROUND SHIPPING = $9.90" + "<p>";
  purchaseOrder += "<p>" + "<p>" + "TOTAL = $" + total;

  var htmlMail = `
        <h1>----- PURCHASE ORDER -----</h1>
        <h2>BILL TO: </h2>
          <p> Business/Company Name: ${req.body.businessName}
          <p> Address: ${req.body.address}
          <p> City: ${req.body.city}
          <p> State/Province: ${req.body.state}
          <p> ZIP Code: ${req.body.zipCode}
          <p> Phone Number: ${req.body.phone}
          <p> Email: ${req.body.email}
        <h2>PAYMENT (CREDIT CARD): </h2>
          <p> Credit Card Name Holder: ${req.body.cardNameHolder}
          <p> Credit Card Number: ${req.body.numberCard}
          <p> Expiration Date: ${req.body.numberExpDate}
        <h2>SHIP TO: </h2>
          <p> Business/Company Name: ${req.body.businessName_ship}          
          <p> Address: ${req.body.address_ship}
          <p> City: ${req.body.city_ship}
          <p> State/Province: ${req.body.state_ship}
          <p> ZIP Code: ${req.body.zipCode_ship}
          <p> Phone Number: ${req.body.phone_ship}
          <p> Email: ${req.body.email_ship}
        <h2>PURCHASE ORDER: </h2>
        <h4>ITEM NUMBER | DESCRIPTION | QUANTITY | x UNIT PRICE | TOTAL </h4>
          <p>${purchaseOrder}
        </h4>
    `;

  var subject =
    "PURCHASE ORDER | " + req.body.businessName + " | " + req.body.firstName;

  var mailOptions = {
    from: req.body.email,
    // to: "sitioweb@indecmexico.com",
    to: "sales@medrepexpress.com",
    subject: subject,
    html: htmlMail
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log("Email sent");
      res.send("Email sent");
    }
  });
});

/* ==================================================================================================
======================================= Server connection ===========================================
===================================================================================================*/

const port = process.env.port || 3001;
https.createServer(credentials, app).listen(port, () => {
  console.log("Listening on port: " + port);
});


/* ============================================= TEST ============================================*/

app.get('/', function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
});

/* EXECUTION COMMAND
pm2 start npm --name MedRep-Back -- start
*/
