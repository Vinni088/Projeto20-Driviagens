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

export const generalRepository = {
    selectFrom,
    insertIntoPassangers,
    insertIntoCities
};