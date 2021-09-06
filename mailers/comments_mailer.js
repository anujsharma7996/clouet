const nodemailer = require('../config/nodemailer');

// another way of exporting a method
exports.newComment = (comment) => {
    nodemailer.transporter.sendMail({
        from: 'noahsharma.dev@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: '<h1> Your comment is publushed! </h>'
    }, (err, info) => {
        if (err) { console.log('Error in sending mail', err); return; }

        console.log('Message send', info);
        return;
    });
}