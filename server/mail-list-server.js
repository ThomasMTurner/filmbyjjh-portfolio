const mongoose = require('mongoose'); 
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer')
const sanitizeHtml = require('sanitize-html');
const rateLimit = require('express-rate-limit');
dotenv.config({ path: './client-details.env' });




//mongoDB model to store mailing list


///connect to the db, need to make sure its set up before this code is run
mongoose.connect('mongodb://localhost:27017', {
    dbName:'mail-list',
    useNewUrlParser: true,
    useUnifiedTopology: true,
}), err => err ? console.log(err) :
console.log('Connected to database');


///create schema for the mailing list
const MailListSchema = new mongoose.Schema ( {
    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        
    },
    entryDate: {
        type: Date
    }
});

const MailList = mongoose.model('MailList', MailListSchema);
MailList.createIndexes();


//express.js server to deal with requests to add to mailing list
const clientEmailUser = process.env.EMAIL_USER;
const clientAppPass = process.env.APP_PASS;

///rate limiter for the email
const limiter = rateLimit({
    windowMs:60 * 1000,
    max:10,
    message: 'Too many requests, please try again later',
    handler: (req, res) => {
      res.status(429).json({error:'Rate limit exceeded for sending emails, please try again.'})
    }
})



/// consider either manually sending the mailing list, or configuring
/// an automatic process where a command sent by jacob to the throwaway mail
/// account will prompt the mailing list to be posted.

const app = express();
const port = 7060;
app.use(express.json());
app.use(cors());


///handle GET request
app.get('/', limiter, (req, res) => {
    res.json({status:'success'})
})


///handle POST request

app.post('/add-to-mailing-list', limiter, (req, res) => {
    console.log(req.body);

    //instantiate transporter to send mail using existing GMAIL STMP server.
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: clientEmailUser,
            pass: clientAppPass
        }
    });


    //track the current date when the POST request is being made
    const currentDate = new Date();

    // Configuring the request body to fit into the schema (add to model)
    const entryBody = {
        firstName: sanitizeHtml(req.body.firstName),
        lastName: sanitizeHtml(req.body.lastName),
        email: sanitizeHtml(req.body.email),
        entryDate: currentDate,
    };

    // save new entry
    const newEntry = new MailList(entryBody);

    async function saveEntry () {
        try {
            await newEntry.save();
        } catch (error) {
            console.error(error);
        }
    }


    // Handle sending an email with the existing mail list, and the new entry at the top.
    console.log("Hey we made it to the POST request")
    async function sendMailListEntries() {
        try {
            const mailListEntries = await MailList.find({}).sort({ entryDate: -1 });
            let textToSend = mailListEntries.map(entry => {
                return `${entry.firstName} ${entry.lastName} <${entry.email}>`;
            }).join('\n\n');


            let mainContent = mailListEntries.map((entry, index) => {
                if (index == 0) {
                    return `<h1 style="color:green">Newest client: ${entry.firstName} ${entry.lastName} &lt;${entry.email}&gt;</h1>`;
                }
             
                else {
                return `<h1 style="color:black"><span style="color:red">${index + 1}:</span> ${entry.firstName} ${entry.lastName} &lt;${entry.email}&gt;  </h1>`;
                }
            }).join('');

            let mailOptions = {
                from: clientEmailUser,
                to: 'thomasturner090205@gmail.com',
                subject: 'Hey Jacob, there has been an update to your mailing list',
                text: " \n " + textToSend,
                html: `
                    <html>
                        <head>
                            <style>
                                body{
                                    font-family:helvetica;
                                }
                                p {
                                    font-size:1.5rem;
                                    line-height:1.5;
                                    color:gray;
                                }
                                h1{
                                    font-size:1rem;
                                    font-family:helvetica;
                                    width:20rem;
                                    font-weight:200;
    
                                }




                            </style>
                        </head>
                        <body>
                            <p>Hey, these are your clients on the mailing list up to date.</p>
                            <div class='mail-list-container'>${mainContent}</div>
                        <body>
                    </html>
                `
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.json({ status: 'error' });
                } else {
                    res.json({ status: 'success' });
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    saveEntry();
    console.log("Hey we saved the new entry")
    sendMailListEntries();
    console.log("Hey we completed everything")
});






//listen for requests
app.listen(port, () => {
    (console.log(`Server is running on port ${port}`))
});



