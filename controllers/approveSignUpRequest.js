const models = require('../models');
const nodemailer=require('nodemailer')
require('dotenv').config();

const sendMail = async (users) => {
    const email = process.env.email;
    const pass = process.env.password;
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
       // port: 587,
        secure: true, // true for 465, false for other ports
        auth: {
          user: email, // generated ethereal user
          pass: pass // generated ethereal password
        },
        tls: {
          ciphers:'SSLv3'
    ,      ignoreTLS:true,
    rejectUnauthorized: false,
    secureProtocol: "TLSv1_method"
    }
      });
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: email, // sender address
        to: users.email, // list of receivers
        subject: "Signup:", // Subject line
        text: "signup accepted?", // plain text body
        html: "<b>Hello user your sign up request has been accepted</b>" // html body
      });
     return;
}
async function approveSignUpRequest(req, res, next) {
    try {
        if (req.body.accepted === true) {
            let users = await models.Users.update(
                { accepted: req.body.accepted },
                {
                    where: {
                        userName: req.body.userName
                    }
                });
                users=await models.Users.findOne({
                    where:{
                        userName:req.body.userName,
                        accepted:true
                    }
                })
                await sendMail(users);
            res.status(200).json({
                users,
                success: true
            });
        }
        
    } catch (error) {
        next(error);
    }
}
module.exports = exports = approveSignUpRequest;