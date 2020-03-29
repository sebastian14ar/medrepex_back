import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

var transporter = nodemailer.createTransport({
  host:'mail.indecmexico.com',
  port: 465,
  auth: {
    user:'sitioweb@indecmexico.com',
    pass: 'Z2^6mVdJKJY%'
  }
});

// -------------------------------------- CONTACT US INDEC ------------------------------------------
router.post('/contact-us', async(req, res) => {

  console.log(req.body);

  if(req.body.name == null)
    res.send('Ayudanos agregando tu nombre, queremos conocerte');
  else if(req.body.email == null)  
    res.send('Necesitamos tu dirección de correo para contactarte')
  else {
    var htmlMail = `
      <h3>INFORMACIÓN DEL CLIENTE: </h3>
      <h4>
        <p> Nombre: ${req.body.name}
        <p> Ciudad: ${req.body.city} 
        <p> Dirección de correo electónico: ${req.body.email}
      </h4>
      <h3>MENSAJE: </h3>
      <h4> 
        <p>${req.body.message}
      </h4>
      `;
    
    var subject = 'Me gustaría distribuir con ustedes | ' +  req.body.name + ' | ' + req.body.city;

    var mailOptions = {
      from: req.body.email,
      // to: "sitioweb@indecmexico.com",
      to: 'ventas@indecmexico.com, carlos.alvarado@indecmexico.com',
      subject: subject,
      html: htmlMail
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.send(error);
      }
      else {
        res.send('EL correo se envío con éxito');
      }
    });
  }
});


module.exports = router;