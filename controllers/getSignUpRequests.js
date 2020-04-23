const models = require('../models');
const { Op } = require('sequelize')

async function getSignUpRequests(req, res, next) {
    try {
        
        const users = await models.Users.findAll(
            {
                where: {
                    [Op.and]: [
                        { accepted: false },
                        {
                            role: {
                                [Op.ne]: "admin"
                            }
                        }
                    ]
                },
                attributes: ['userName']
            });
        res.status(200).json({
            success: true,
            users,

        });
    } catch (error) {
        next(error);
    }
}
module.exports = exports = getSignUpRequests;