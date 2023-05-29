import { Router } from "express";
import { postTicket, getTicketByCity } from "../controllers/tickets.controllers.js";

const ticketRouter = Router();

ticketRouter.post("/tickets", postTicket);
ticketRouter.get("/tickets/:cityId", getTicketByCity);

export default ticketRouter;