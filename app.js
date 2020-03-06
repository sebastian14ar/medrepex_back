import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();

const transporter = nodemailer.createTransport({
    host:'smtp.medrepexpress.com',
      port: 587,
      auth: {
        user:'sales@medrepexpress.com',
        pass: 'mxCY55Fc'
      }
    });


/* ==================================================================================================
=========================================== Middleware ==============================================
===================================================================================================*/

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure headers and cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


/* ==================================================================================================
============================================== Routes ===============================================
 ==================================================================================================*/

// ----------------------------------------- CONTACT US ---------------------------------------------
app.post('/api/contact-us', async(req, res) => {
    console.log(req.body);

    var htmlMail = `
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

    var subject = 'CONTACT US | ' +  req.body.name;

    var mailOptions = {
        from: req.body.email,
        to: 'sales@medrepexpress.com',
        subject: subject,
        html: htmlMail
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            console.log('Email sent');
            res.send('Email sent');
        }
    });
});

// -------------------------------------- REQUEST SAMPLES -------------------------------------------
app.post('/api/req-samples', async(req, res) => {
    console.log(req.body);

    var htmlMail = `
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

    var subject = 'REQUEST SAMPLES | ' +  req.body.businessName + ' | ' + req.body.name;

    var mailOptions = {
        from: req.body.email,
        to: 'sales@medrepexpress.com',
        subject: subject,
        html: htmlMail
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            console.log('Email sent');
            res.send('Email sent');
        }
    });
});

// ------------------------------------ REQUEST PRODUCT INFO ----------------------------------------
app.post('/api/req-product-info', async(req, res) => {
    console.log(req.body);

    var htmlMail = `
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

    var subject = 'REQUEST PRODUCT INFO | ' +  req.body.businessName + ' | ' + req.body.name;

    var mailOptions = {
        from: req.body.email,
        to: 'sales@medrepexpress.com',
        subject: subject,
        html: htmlMail
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            console.log('Email sent');
            res.send('Email sent');
        }
    });
});

// --------------------------------------- SHOPPING CART --------------------------------------------
app.post('/api/shopping-cart', async(req, res) => {
    var purchaseOrder = '';
    var i = "1";
    for (var key in req.body.items) {
        if (req.body.items.hasOwnProperty(key)) {
            purchaseOrder += "Product " + i + 
                        " => Description: " + req.body.items[key].description + 
                        " | Code: " + req.body.items[key].code + 
                        " | Quantity of product: " + req.body.items[key].cant + "<p>";    
            i++;                  
        }
    }

    var htmlMail = `
        <h3>----- PURCHASE ORDER -----</h3>
        <h3>INFORMATION OF CLIENT: </h3>
        <h4>
            <p> Business/Company Name: ${req.body.businessName}
            <p> Requestor's First Name: ${req.body.firstName}
            <p> Requestor's Last Name: ${req.body.lastName}
            <p> Phone Number: ${req.body.phone}
            <p> Fax: ${req.body.fax}
            <p> Email: ${req.body.email}
            <p> Address: ${req.body.address}
            <p> Alternative Address: ${req.body.altAddress}
            <p> State/Province: ${req.body.state}
            <p> ZIP Code: ${req.body.zipCode}
            <p> Country: ${req.body.country}
        </h4>
        <h3>CREDIT CARD: </h3>
        <h4>
            <p> Credit Card Number: ${req.body.numberCard}
            <p> Credit Card Name Holder: ${req.body.cardNameHolder}
            <p> Expiration Date: ${req.body.numberExpDate}
            <p> Security Code: ${req.body.secCode}
        </h4>
        <h3>PURCHASE ORDER: </h3>
        <h4>
            <p>${purchaseOrder}
        </h4>
    `;

    var subject = 'PURCHASE ORDER | ' +  req.body.businessName + ' | ' + req.body.firstName;

    var mailOptions = {
        from: req.body.email,
        to: 'sales@medrepexpress.com',
        subject: subject,
        html: htmlMail
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            console.log('Email sent');
        }
    });
});

/* ==================================================================================================
======================================= Server connection ===========================================
===================================================================================================*/

const port = process.env.port || 3001;
app.listen(port, () => {
    console.log('Listenig on port: ' + port);
});

/* EXECUTION COMMAND
pm2 start npm -- run start --name "medrepexpress"
*/