import { db } from "../database/database.js";
import { hotelSchema } from "../schemas/hotelsSchema.js";

export async function postHotel(req, res){
    const { cityId, name, image, priceperday, description,  extraimage1, extraimage2, extraimage3,
         extraimage4, extraimage5, extraimage6, amenity1, amenity2, amenity3} = req.body;
    const validation = hotelSchema.validate(req.body);
    
    if(validation.error){
        return res.status(422).send(validation.error.message);
    }

    try {
        const cityExists = await db.query(`SELECT * FROM cities WHERE id = '${cityId}';`);
        if(!cityExists.rows[0]){
            return res.sendStatus(404);
        }
        const ticketExists = await db.query(`SELECT * FROM cities WHERE id = '${cityId}';`);
        if(!ticketExists.rows[0]){
            return res.sendStatus(404);
        }

        const insert = await db.query(`INSERT INTO hotels (cityId, description, name, image, priceperday) VALUES('${cityId}', '${description}', '${name}', '${image}', '${priceperday}') RETURNING id;`);
        console.log('teste 1');
        const hotelsId = insert.rows[0].id;
        console.log('teste 2');
        await db.query(`INSERT INTO hotelimage (hotelsId, image) VALUES('${hotelsId}', '${extraimage1}');`)
        await db.query(`INSERT INTO hotelimage (hotelsId, image) VALUES('${hotelsId}', '${extraimage2}');`)
        await db.query(`INSERT INTO hotelimage (hotelsId, image) VALUES('${hotelsId}', '${extraimage3}');`)
        await db.query(`INSERT INTO hotelimage (hotelsId, image) VALUES('${hotelsId}', '${extraimage4}');`)
        await db.query(`INSERT INTO hotelimage (hotelsId, image) VALUES('${hotelsId}', '${extraimage5}');`)
        await db.query(`INSERT INTO hotelimage (hotelsId, image) VALUES('${hotelsId}', '${extraimage6}');`)

        await db.query(`INSERT INTO amenities (hotelsId, amenity) VALUES('${hotelsId}', '${amenity1}');`)
        await db.query(`INSERT INTO amenities (hotelsId, amenity) VALUES('${hotelsId}', '${amenity2}');`)
        await db.query(`INSERT INTO amenities (hotelsId, amenity) VALUES('${hotelsId}', '${amenity3}');`)

        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getHotelByCity(req, res){
    const { cityId } = req.params;

    try {
        const exists = await db.query(`SELECT * FROM hotels WHERE cityId = '${cityId}';`)
        if(!exists.rows[0]){
            return res.sendStatus(404);
        }
        let hotelsId = [];
        let names = [];
        let descriptions = [];
        let pricesperday = [];
        let images = [];
        for(let i = 0; i < exists.rowCount; i++){
            hotelsId.push(exists.rows[i].id);
            names.push(exists.rows[i].name);
            descriptions.push(exists.rows[i].description);
            pricesperday.push(exists.rows[i].priceperday);
            images.push(exists.rows[i].image);
        }
        const length = hotelsId.length;
        let finalArray = [];
        for(let i = 0; i < length; i++){
            const check = await db.query(`SELECT * FROM amenities WHERE hotelsId = '${hotelsId[i]}';`)
            const amenity1 = check.rows[0].amenity;
            const amenity2 = check.rows[1].amenity;
            const amenity3 = check.rows[2].amenity;
            const look = await db.query(`SELECT * FROM hotelimage WHERE hotelsId = '${hotelsId[i]}';`)
            const extraimage1 = look.rows[0].image;
            const extraimage2 = look.rows[1].image;
            const extraimage3 = look.rows[2].image;
            const extraimage4 = look.rows[0].image;
            const extraimage5 = look.rows[1].image;
            const extraimage6 = look.rows[2].image;
            let answer = {
                name: names[i],
                priceperday: pricesperday[i],
                description: descriptions[i],
                image: images[i],
                amenity1: amenity1,
                amenity2: amenity2,
                amenity3: amenity3,
                extraimage1: extraimage1,
                extraimage2: extraimage2,
                extraimage3: extraimage3,
                extraimage4: extraimage4,
                extraimage5: extraimage5,
                extraimage6: extraimage6,
            }
            finalArray.push(answer);
        }
        return res.status(200).send(finalArray);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}