import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: 'mail.indecmexico.com',
  port: 465,
  auth: {
    user: 'sitioweb@indecmexico.com',
    pass: 'Z2^6mVdJKJY%'
  }
});

// -------------------------------------- CONTACT US MOREVAL ------------------------------------------
router.post('/contact-us', async(req, res) => {
  if(req.body.name == null)
    res.send("Ayudanos escribiendo tu nombre, queremos conocerte");
  else if(req.body.email == null)
    res.send("Necesitamos tu correo electrónico para pronto ponernos en contacto");
  else {
    var htmlMail = ` 
      <h3>INFORMACIÓN DEL CLIENTE: </h3>
        <p> Nombre: ${req.body.name}
        <p> Dirección de correo electónico: ${req.body.email}
        <p> Teléfono: ${req.body.phone} 
      <h3>MENSAJE: </h3>
        <p>${req.body.message}
    `;
    
    var subject = "CONTACTO moreval.net | " + req.body.name;

    var mailOptions = {
      from: req.body.email,
      to: "sitioweb@indecmexico.com",
      // to: 'ventas@moreval.net',
      subject: subject,
      html: htmlMail
    };

    transporter.sendMail(mailOptions, function(error, info){
      if(error)
        res.send(error)
      else
        res.send("El correo se envío con éxito, pronto estaremos en contacto");
    });
  }
});


module.exports = router;