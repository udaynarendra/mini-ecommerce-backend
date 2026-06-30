import Joi from 'joi';
const registerValidation=Joi.object({
    name:Joi.string()
    .trim()
    .lowercase()
    .required(),
    email:Joi.string()
    .trim()
    .lowercase()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
        "string.pattern.base":"Invalid email format"
    }),
    password:Joi.string()
    .trim()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)
    .min(8)
    .required()
    .messages({
        "string.pattern.base":"Password must contain at least 8 characters, one uppercase letter, one lowercase letters"
    }),
    phone:Joi.string()
    .trim()
    .min(10)
    .max(10)
    .required(),
    address:Joi.string()
    .required()
})
export {registerValidation};