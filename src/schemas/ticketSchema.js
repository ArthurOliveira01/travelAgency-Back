import Joi from "joi";

export const ticketSchema = Joi.object({
    cityId: Joi.number().required(),
    price: Joi.number().min(1).required(),
    time: Joi.string().pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/).required(),
    company : Joi.string().required()
})