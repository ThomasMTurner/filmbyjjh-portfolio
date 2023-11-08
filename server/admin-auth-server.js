const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const crypto = require('crypto');
const cors = require('cors');
const jwt = require('jsonwebtoken');
dotenv.config({ path: './client-details.env' });

const app = express();
app.use(cors());
app.use(express.json());

const port = 7102;
const clientEmailUser = process.env.EMAIL_USER;
const clientAppPass = process.env.APP_PASS;
const secretKey = process.env.SECRET_KEY;


app.listen(port, () => {
    console.log(`Auth server is running on ${port}`);
})


app.get('/get-token', (req, res) => {
    //produce a random token of length 16
    const authCode = crypto.randomBytes(Math.ceil(16/2)).toString('hex');
    //sign in json web token
    const token = jwt.sign({authCode: authCode}, secretKey, {expiresIn:"1h"});
    //send the token by email to the client
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: clientEmailUser,
            pass: clientAppPass
        }
    });


    //format email to send including the token
    let mailOptions = {
        from: clientEmailUser,
        to: 'thomasturner090205@gmail.com',
        subject: 'Hey Jacob, here is your authorisation token.',
        html: `
        <html>
            <head>
                <style>
                body{
                    font-family:helvetica;
                }
                p {
                    font-size:1rem;
                    color:green;
                    width:20rem;
                    font-weight:200;
                    font-family:helvetica;
                }
                h1{
                    font-size:1.5rem;
                    font-family:helvetica;
                    font-weight:bold;
                    color:black;

                }
                </style>
                <body>
                    <h1>Here is your authorisation token.</h1>
                    <p>${authCode}</p>
                </body>
            </head>
        </html>
        
        `
    }
    
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(error);
            res.json({status:'error'});
        }
        else {
            res.json({status:'success'});
        }
    })

    res.json({token: token});

});

/*
- This endpoint should be triggered when the client enters their auth token into the form
- This should then check against the most previously generated auth code


*/
app.post('/validate', (req, res) => {
    const testAuthCode = req.body.test;
    const token = req.body.token;
    //then decode the token in the server memory, and check against testAuthCode
    //if match back send back JSON with valid: true
    //otherwise send back JSON with valid:false
    try {
        const authCode = jwt.verify(token, secretKey).authCode;
        if (authCode == testAuthCode) {
            res.json({valid: true});
        }
        else{
            res.json({valid: false});
        }
    } catch (error) {
        res.status(401).send('Invalid token')
    }


});

