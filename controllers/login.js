const models = require('../models');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize')

async function signIn(req, res, next) {
    try {
        
        // let token = req.headers['access-token'];
        let token = null;
        let users = null;
        let msg = null;
        users = await models.Users.findOne({
            where: {
                [Op.and]: [
                    { userName: req.body.userName },
                    {
                        [Op.or]: [
                            { accepted: true },
                            { role: "admin" }
                        ]
                    }
                ]

            }
        });

        let match = null;
        if (users) {
            match = passwordHash.verify(req.body.password, users.password);
            
        }
        else {
            res.send({
                success: false,
                uSuccess: false,
                pSuccess: false,
                // role: users.role
            })
        }
        if (match) {
            res.status(200).json({
                success: true,
                uSuccess: true,
                pSuccess: true,
                role: users.role,
                token: await jwt.sign({ id: users.id, userName: users.userName }, 'keyboard cat 4 ever', { expiresIn: '1h' }) // Signing the token
            });
        }
        else {
            res.send(
                {
                    success: false,
                    uSuccess: true,
                    pSuccess: false,
                    role: users.role
                }
            );
        }
    } catch (error) {
        next(error);
    }
}
module.exports = exports = signIn;