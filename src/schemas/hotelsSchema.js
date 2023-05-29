import Joi from "joi";

export const hotelSchema = Joi.object({
    cityId: Joi.number().required(),
    name: Joi.string().required(),
    image: Joi.string().required(),
    priceperday: Joi.number().min(0).required(),
    description: Joi.string().required(),
    extraimage1: Joi.string().required(),
    extraimage2: Joi.string().required(),
    extraimage3: Joi.string().required(),
    extraimage4: Joi.string().required(),
    extraimage5: Joi.string().required(),
    extraimage6: Joi.string().required(),
    amenity1: Joi.string().required(),
    amenity2: Joi.string().required(),
    amenity3: Joi.string().required()
})