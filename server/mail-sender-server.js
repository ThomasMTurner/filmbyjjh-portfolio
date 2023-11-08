const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
const sanitizeHtml = require('sanitize-html');
const rateLimit = require('express-rate-limit');
dotenv.config({ path: './client-details.env' });



//creating the express server and obtaining env variables to access the SMTP server

const app = express();
const port = 3001;
const clientEmailUser = process.env.EMAIL_USER;
const clientAppPass = process.env.APP_PASS;


//setting a limiter object to prevent spam when sending emails
const limiter = rateLimit({
  windowMs:60 * 1000,
  max:10,
  message: 'Too many requests, please try again later',
  handler: (req, res) => {
    res.status(429).json({error:'Rate limit exceeded for sending emails, please try again.'})
  }
})

app.use(express.json());
app.use(cors());


//handle GET requests, simply want to verify it is working 
app.get('/', limiter, (req, res) => {
  res.send('Email has been sent successfully');
  res.json({status:'success'})

});


//listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



/*

- POST request deals with the API endpoint (/send-email),where data comes in from the frontend using axios.
- The request body is then parsed into an object with some extra formatting and sanitisation
- This is then sent using the nodemailer library to the dedicated SMTP server which is then sent to the client's email
address.

*/


app.post('/send-email', limiter,  (req, res) => {
  let transporter = nodemailer.createTransport( {
    service:'gmail',
    secure:true,
    auth: {
      user: clientEmailUser,
      pass: clientAppPass
    }
});

  let mailOptions = {
    from: sanitizeHtml(`${req.body.name} <${clientEmailUser}>`),
    to: 'thomasturner090205@gmail.com',
    subject: sanitizeHtml(req.body.subject),
    text: sanitizeHtml(`${req.body.email}\n\n  ${req.body.message}`)
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.json({status:'error'})
    } else {
      console.log('Email sent: ' + info.response);
      res.json({status:'success'})
    }
  }
  )

})

