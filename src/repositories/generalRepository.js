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

async function insertIntoTravels(idPassageiro, idVoo) {
  let insert = await db.query(`
    INSERT INTO "travels" 
      ("passengerId", "flightId")
    VALUES 
      ($1, $2);
    `, [idPassageiro, idVoo])
}

async function selectFlightsProperly() {
  let flights = await db.query(`
    SELECT 
        "flights".id, 
        (SELECT "cities".name FROM "cities" WHERE "cities".id = "flights"."origin") AS "origin",
        (SELECT "cities".name FROM "cities" WHERE "cities".id = "flights"."destination") AS "destination",
        TO_CHAR("flights".date, 'DD-MM-YYYY') AS date
    FROM flights
    LEFT JOIN  "cities"
        ON "cities".id = "flights".origin
    GROUP BY "flights".id
    ORDER BY "flights".id
    `)

  return flights;
}

async function selectPassengersTravels() {
  let travels = await db.query(`
    SELECT 
        "passengers"."firstName", 
        "passengers"."lastName", 
        CAST(COUNT("travels".*) AS INTEGER) AS "travels"
    FROM "passengers"
    LEFT JOIN  "travels"
        ON "travels"."passengerId" = "passengers"."id"
    GROUP BY "passengers"."id"
    ORDER BY travels DESC
    `)

  return travels;
}

async function selectPassengersTravelsByName(nome) {
  let travels = await db.query(`
  SELECT 
      "passengers"."firstName", 
      "passengers"."lastName", 
      CAST(COUNT("travels".*) AS INTEGER) AS "travels"
  FROM "passengers"
  LEFT JOIN  "travels"
      ON "travels"."passengerId" = "passengers"."id"
  WHERE "passengers"."firstName" ILIKE '%${nome}%' OR "passengers"."lastName" ILIKE '%${nome}%'
  GROUP BY "passengers"."id"
  ORDER BY travels DESC
  `)

  return travels;
}

export const generalRepository = {
  selectFrom,
  insertIntoPassangers,
  insertIntoCities,
  insertIntoFlights,
  insertIntoTravels,
  selectFlightsProperly,
  selectPassengersTravels,
  selectPassengersTravelsByName
};