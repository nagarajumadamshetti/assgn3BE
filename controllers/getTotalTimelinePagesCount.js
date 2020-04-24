const models = require('../models');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');


const totalPagesCount = async (req, res, next) => {
    try {
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        const payload = jwt.decode(req.params.id)
        let users = await models.Following.findAll({
            where: {
                userId: payload.id
            },
            attributes: ['followingUserId']
        });
        users = await users.map(obj => obj.followingUserId)
        console.log("")
        console.log("")
        let count = await models.Posts.count({
            where: {
                userId: {
                    [Op.in]: users
                }
            },
        }

        )
        console.log("")
        console.log("")
        res.status(200).json({
            count,
            success: true
        });



    } catch (error) {
        next(error);
    }
}
module.exports = exports = totalPagesCount;