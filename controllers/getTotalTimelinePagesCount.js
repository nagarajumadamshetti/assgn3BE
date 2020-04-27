const models = require('../models');
const { Op } = require('sequelize');
const jwtDecode=require('./jwtDecode');


const totalPagesCount = async (req, res, next) => {
    try {
        const token=req.params.id

        const payload = await jwtDecode(token)
        let users = await models.Following.findAll({
            where: {
                userId: payload.id
            },
            attributes: ['followingUserId']
        });
        users = await users.map(obj => obj.followingUserId)

        let count = await models.Posts.count({
            where: {
                userId: {
                    [Op.in]: users
                }
            },
        }

        )
        res.status(200).json({
            count,
            success: true
        });



    } catch (error) {
        next(error);
    }
}
module.exports = exports = totalPagesCount;