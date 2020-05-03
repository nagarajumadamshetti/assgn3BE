const Joi = require('@hapi/joi');

const signupValidator = async (req, res, next) => {
    try {
        const addAccountDataSchema = Joi.object({
            userName: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().required(),
            accepted: Joi.boolean().required(),
            role: Joi.string().required()
        });

        const value = await addAccountDataSchema.validate(
            {
                userName: req.body.userName,
                password: req.body.password,
                email: req.body.email,
                phone: req.body.phone,
                accepted: req.body.accepted,
                role: req.body.role
            }
        );
        if (value) {
            next();
        }
        else {
            res.status(400).json({
                success: false,
            })
        }
    }
    catch (error) {
        next(error);
    }
}

module.exports = exports = signupValidator;