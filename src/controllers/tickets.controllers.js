import { db } from "../database/database.js";
import { ticketSchema } from "../schemas/ticketSchema.js";


export async function postTicket(req, res){
    const { time, company, price, cityId } = req.body;
    const validation = ticketSchema.validate(req.body);
    if(validation.error){
        return res.status(422).send(validation.error.message);
    }
    try {
        const exists = await db.query(`SELECT * FROM cities WHERE id = '${cityId}';`)
        if(!exists.rows[0]){
            return res.sendStatus(404);
        }
            await db.query(`INSERT INTO tickets (cityId, time, price, company) VALUES('${cityId}', '${time}', '${price}', '${company}');`);
            return res.sendStatus(201);
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getTicketByCity(req, res){
    const { cityId } = req.params;
    try {
        const exists = await db.query(`SELECT * FROM tickets WHERE cityId = '${cityId}';`)
        if(!exists.rows[0]){
            return res.sendStatus(404);
        }
        return res.status(200).send(exists.rows);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}