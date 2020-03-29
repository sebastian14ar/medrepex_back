import express from "express";
import nodemailer from "nodemailer";

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

  var purchaseOrder = "";
  var total = 0;
  for (var key in req.body.items) {
    if (req.body.items.hasOwnProperty(key)) {
      var itemTotal = Math.round((req.body.items[key].cant * req.body.items[key].price) * 100) / 100;
      total += itemTotal;
      purchaseOrder +=
        req.body.items[key].code + " | "  +
        req.body.items[key].description + " | "  +
        req.body.items[key].cant + " | $"  +
        req.body.items[key].price + " | $"  +
        itemTotal +
        "<p>";
    }
  }  
  total = Math.round((total + 9.9) * 100) / 100;
  purchaseOrder += "STANDAR GROUND SHIPPING = $9.90" + "<p>";
  purchaseOrder += "<p>" + "<p>" + "TOTAL = $" + total;

  const htmlMail = `
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
          <p> ITEM | DESCRIPTION | QUANTITY | PRICE | TOTAL
          <p>${purchaseOrder}
    `;

  const subject = "PURCHASE ORDER | " + req.body.businessName + " | " + req.body.city;

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
        const htmlMailRes = `
          <h1>----- Order Confirmed -----</h1>
            <h2>Thanks ${req.body.businessName} </h2>
              <h3>Your Order </h3>
                <p> Thank you for placing your order with MedRepExpress. This email is to confirm your order has been placed successfully, and will be processed & shipped to you soon.
                <p> ${purchaseOrder}
            <h2>Shipping to: </h2>
              <p> Business/Company Name: ${req.body.businessName_ship}          
              <p> Address: ${req.body.address_ship}
              <p> City: ${req.body.city_ship}
              <p> State/Province: ${req.body.state_ship}
              <p> ZIP Code: ${req.body.zipCode_ship}
              <p> Phone Number: ${req.body.phone_ship}
              <p> Email: ${req.body.email_ship}
            <h3>Thank you for shopping at MedRepExpress!</h3>
            <h3>Sales@MedRepExpress.com</h3>
            <h3>Toll Free: 877-740-9133</h3>
            <p> © MedRepExpress
        `;

        const subjectRes = "ORDER CONFIRMED | MedRep Express";

        var mailOptionsRes = {
          from: "sales@medrepexpress.com",
          to: req.body.email,
          subject: subjectRes,
          html: htmlMailRes
        };

        transporter.sendMail(mailOptionsRes, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent to client");
          }
        });
      
      console.log("Email sent");
      res.send("Email sent. Thank you! Your purchase is in process.");
    }
  });
});


module.exports = router;