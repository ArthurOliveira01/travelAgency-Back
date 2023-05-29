import Joi from "joi";

export const citySchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required()
})