import { Router } from "express";
import accountRouter from "./account.routes.js";
import citiesRouter from "./cities.routes.js";
import ticketRouter from "./tickets.routes.js";
import hotelsRouter from "./hotels.routes.js";

const router = Router();

router.use(accountRouter);
router.use(citiesRouter);
router.use(ticketRouter);
router.use(hotelsRouter);

export default router;