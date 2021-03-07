const nodemailer = require('nodemailer');

function sendemail(email, subject, html) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'reminderforyou.noreplay@gmail.com',
            pass: 'reminder1234'
        }
    });
    var mailOptions = {
        from: 'reminderforyou.noreplay@gmail.com',
        to: email,
        subject: subject,
        html: html
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendemail
}