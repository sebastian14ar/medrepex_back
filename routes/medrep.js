import express from "express";
import nodemailer from "nodemailer";
import handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: "smtp.medrepexpress.com",
  port: 587,
  auth: {
    user: "sales@medrepexpress.com",
    pass: "mxCY55Fc"
  }
});

// ----------------------------------------- CONTACT US ---------------------------------------------
router.post("/contact-us", async (req, res) => {
  const htmlMail = `
        <h1> CONTACT US </h1>
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

  const subject = "CONTACT US | " + req.body.name;
  
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
      res.send("Email sent. Thanks for writing to us. We will get in contact soon.");
    }
  });
});

// -------------------------------------- REQUEST SAMPLES -------------------------------------------
router.post("/req-samples", async (req, res) => {
  const htmlMail = `
        <h1> REQUEST SAMPLES </h1>
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

  const subject = "REQUEST SAMPLES | " + req.body.businessName + " | " + req.body.name;
  
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
      res.send("Email sent. We will get in contact soon.");
    }
  });

});

// ------------------------------------ REQUEST PRODUCT INFO ----------------------------------------
router.post("/req-product-info", async (req, res) => {
  const htmlMail = `
        <h1> REQUEST PRODUCT INFO </h1>
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

  const subject = "REQUEST PRODUCT INFO | " + req.body.businessName + " | " + req.body.name;

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
      res.send("Email sent. We will get in contact soon.");
    }
  });

});

// --------------------------------------- SHOPPING CART --------------------------------------------
router.post("/shopping-cart", async (req, res) => {
  var templateOrderConfirmed = '../templates/medRep/orderConfirmed.hbs';
  var templatePurchaseOrder = '../templates/medRep/purchaseOrder.hbs';
  var subtotal = 0;
  var total = 0;
  var items = [];
  for (var key in req.body.items) {
    if (req.body.items.hasOwnProperty(key)) {
      var itemTotal = Math.round((req.body.items[key].cant * req.body.items[key].price) * 100) / 100;
      subtotal += itemTotal;
      items.push({
        code: req.body.items[key].code,
        description: req.body.items[key].description,
        quantityt: req.body.items[key].cant,
        price: req.body.items[key].price,
        total: itemTotal
      });
    }
  } 
  subtotal = Math.round((subtotal) * 100) / 100; 
  total = Math.round((subtotal + 9.9) * 100) / 100;

  const subject = "PURCHASE ORDER | " + req.body.businessName + " | " + req.body.city;

  let ts = Date.now();
  let date_ob = new Date(ts);
  let day = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let date = (month + "/" + day + "/" + year); 

  const replacements = {
    name: req.body.businessName,
    date: date,
    items: items,
    subtotal: subtotal,
    total: total,
    shipping_address_name: req.body.businessName_ship,
    shipping_address_street: req.body.address_ship,
    shipping_address_city: req.body.city_ship,
    shipping_address_province: req.body.state_ship,
    shipping_address_zip: req.body.zipCode_ship,
    billing_address_name: req.body.businessName,
    billing_address_street: req.body.address,
    billing_address_city: req.body.city,
    billing_address_province: req.body.state,
    billing_address_zip: req.body.zipCode   
  };     

  /** MAIL FOR MedRep */
  if(sendEmail("sales@medrepexpress.com", req.body.email, subject, replacements, templatePurchaseOrder)){
  // if(sendEmail("sitioweb@indecmexico.com", req.body.email, subject, replacements, templatePurchaseOrder)){
    /** CONFIRMATION MAIL FOR CLIENT */  
    const subjectRes = "ORDER CONFIRMED | MedRep Express";
    if(sendEmail(req.body.email, "sales@medrepexpress.com", subjectRes, replacements, templateOrderConfirmed)){
      console.log("Email sent");
      res.send("Email sent. Thank you! Your purchase is in process.");
    }
  }
});


// ============================ Send Mail with Template Implementation ==============================

async function sendEmail(emailTo, emailFrom, subject, replacements, templateHBS) {
  const filePath = path.join(__dirname, templateHBS);
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);

  const htmlToSend = template(replacements);
  
  var mailOptions = {
    from: emailFrom,
    to: emailTo,
    subject: subject,
    html: htmlToSend
  };  

  const info = await transporter.sendMail(mailOptions, () => {
    if (error) {
      console.log(error);
      return true;
    } else {
      console.log("Email sent: %s", info.messageId);
      return false;
    }
  });

  /* REFERENCES
  https://stackoverflow.com/questions/39489229/pass-variable-to-html-template-in-nodemailer
  */

}

module.exports = router;