const Joi = require('joi');

const validationResult = (isValid, error) => {
    return {
        isValid,
        error
    }
}

const userRegistrationSchema = Joi.object({
    name: Joi.string()
             .min(2)
             .max(30)
             .required(),

    email: Joi.string()
              .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
              .required(),

    password: Joi.string()
                 .required()          
});

const userLoginSchema = Joi.object({
    email: Joi.string()
            //   .email({ tlds: { allow: ['com', 'net'] } })
              .required(),

    password: Joi.string()
                 .required()          
});

const validateUserRegistrationObject = (object) => {
    const { error } = userRegistrationSchema.validate(object);
    return (error == null);
};

const validateUserLoginObject = (object) => {
    const { error } = userLoginSchema.validate(object);
    return (error == null);
};

module.exports = {
    validateUserRegistrationObject,
    validateUserLoginObject
};