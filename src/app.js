require('dotenv').config();
const { google } = require("googleapis");
const express = require("express");
const app = express();
const path = require("path");
const staticPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3001;
const nodemailer = require('nodemailer');
const OAuth2 = google.auth.OAuth2;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// To serve static files use the express.static built-in middleware function in Express.
app.use('/css', express.static(path.join(__dirname, '../public/CSS/')));
app.use('/js', express.static(__dirname + '../public/JS/'));
app.use('/images', express.static(__dirname + '../public/Images/'));
app.use(express.static(staticPath));


// send email of contact form
app.get("/", (req, res) => {
    res.send('hello');
});
app.post("/", (req, res) => {
    const formData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    }
console.log(formData);
    // CREATING TRANSPORT
    const createTransporter = async () => {
        const oauth2Client = new OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            "https://developers.google.com/oauthplayground"
        );

        oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN
        });

        const accessToken = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
                if (err) {
                    reject("Failed to create access token :(", err);
                }
                resolve(token);
            });
        });

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        return transporter;
    };

    //emailOptions - who sends what to whom
    const sendEmail = async (emailOptions) => {
        try {
            let emailTransporter = await createTransporter();
            await emailTransporter.sendMail(emailOptions);
        } catch (e) {
            console.log(e);
        }
    };


    sendEmail({
        subject: "Portfolio Website - Contact Form",
        to: process.env.EMAIL,
        from: process.env.EMAIL,
        text: `
        Here's the contact form data from ${formData.name}
        Name : ${formData.name}
        Email : ${formData.email}
        Phone No. : ${formData.phone}
        Message : ${formData.message}
        `
    });

    res.status(204).send("hello");

})
app.listen(port, () => {
    console.log("listening to the port", port);

});

