import { db } from "../database/database.js";
import { citySchema } from "../schemas/citySchema.js";


export async function getCity(req, res){
    try {
        const cities = await db.query(`SELECT * FROM cities`);
        return res.status(200).send(cities.rows);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function postCity(req, res){
    const { name, image } = req.body;
    const validation = citySchema.validate(req.body);

    if(validation.error){
        return res.status(422).send(validation.error.message);
    }

    try {
        await db.query(`INSERT INTO cities (name, image) VALUES('${name}', '${image}');`);
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getCityById(req, res){
    const { id } = req.params;
    try {
        const exists = await db.query(`SELECT * FROM cities WHERE id = '${id}';`);
        if(!exists.rows[0]){
            return res.sendStatus(404);
        }
        return res.status(200).send(exists.rows[0]);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}