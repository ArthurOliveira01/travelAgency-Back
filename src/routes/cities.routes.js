import { Router } from "express";
import { getCity, getCityById } from "../controllers/cities.controllers.js";

const citiesRouter = Router();

citiesRouter.get("/cities", getCity);
citiesRouter.get("/cities/:id", getCityById);

export default citiesRouter;