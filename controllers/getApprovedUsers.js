const models = require('../models');

async function getApprovedUsers(req, res, next) {
    try {
        const users = await models.Users.findAll(
            {
                where: {
                    accepted: true
                },
                attributes: ['userName','id']
            });
        res.status(200).json({
            success: true,
            users,
        });
        
    } catch (error) {
        next(error);
    }
}
module.exports = exports = getApprovedUsers;