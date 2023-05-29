import { Router } from "express";
import { getHotelByCity, postHotel } from "../controllers/hotels.controllers.js";

const hotelsRouter = Router();

hotelsRouter.post("/hotel", postHotel);
hotelsRouter.get("/hotel/:cityId", getHotelByCity);

export default hotelsRouter