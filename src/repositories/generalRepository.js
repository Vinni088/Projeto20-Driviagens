import { db } from "../database/database.connection.js"


async function selectFrom(tabela) {
    let passangers = db.query(`SELECT * FROM ${tabela};`)
    return passangers;
}

async function insertIntoPassangers(name1, name2) {
    let insert = await db.query(`
    INSERT INTO "passengers" 
      ("firstName","lastName")
    VALUES 
      ($1, $2);
    `, [name1, name2])
}

async function insertIntoCities(name) {
    let insert = await db.query(`
    INSERT INTO "cities" 
      (name)
    VALUES 
      ($1);
    `, [name])
}

async function insertIntoFlights(idOrigem, idDestino, data) {
    let insert = await db.query(`
    INSERT INTO "flights" 
      (origin, destination, date)
    VALUES 
      ($1, $2, $3);
    `, [idOrigem, idDestino, data])
}

export const generalRepository = {
    selectFrom,
    insertIntoPassangers,
    insertIntoCities,
    insertIntoFlights
};