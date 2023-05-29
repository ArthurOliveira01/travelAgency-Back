import bcrypt from "bcrypt";
import { db } from "../database/database.js";
import { userSchema, loginSchema } from "../schemas/userSchema.js";
import { v4 as uuid } from "uuid";


export async function signup(req, res){
    const {name, email, password, confirmPassword} = req.body;

    const validation = userSchema.validate(req.body);
    if(validation.error){
        return res.sendStatus(422);
    }

    if(password !== confirmPassword){
        return res.status(422).send('Senhas diferentes');
    }
    try {
        const exists = await db.query(`SELECT * FROM users WHERE email = '${email}';`);
        if(exists.rows[0]){
            return res.status(409).send('E-mail já cadastrado');
        }
        const passwordHash = bcrypt.hashSync(password, 10);
        await db.query(`INSERT INTO users (name, email, password) VALUES('${name}', '${email}', '${passwordHash}');`);
        return res.status(201).send('Sucesso');
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}

export async function signin(req, res){
    const {email, password} = req.body;
    const validation = loginSchema.validate(req.body);
    if(validation.error){
        console.log(validation.error);
        return res.sendStatus(422);
    }
    try {
        const exists = await db.query(`SELECT * FROM users WHERE email = '${email}';`);
        if(!exists.rows[0]){
            return res.status(401).send('Esse e-mail não está cadastrado');
        }
        const hash = exists.rows[0].password;
        const compare = bcrypt.compareSync(password, hash);
        if(!compare){
            return res.status(401).send('Senha incorreta');
        }
        const token = uuid();
        const userId = exists.rows[0].id;
        await db.query(`INSERT INTO tokens (token, userid) VALUES('${token}', '${userId}');`);
        const object = {
            token: token
        }
        return res.status(200).send(object);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
