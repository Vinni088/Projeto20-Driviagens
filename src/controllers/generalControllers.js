import { generalServices } from "../services/generalServices.js"
import httpStatus from "http-status";


export async function postPassengers(req, res) {
    const { firstName, lastName } = req.body;

    let resposta = await generalServices.postPassengerService( firstName, lastName )
    res.send(resposta)
}

export async function postCities(req, res) {
    res.send("Esta é a rota post para '/cities'")
}

export async function postFlights(req, res) {
    res.send("Esta é a rota post para '/flights'")
}

export async function postTravels(req, res) {
    res.send("Esta é a rota post para '/travels'")
}

export async function getFlights(req, res) {
    res.send("Esta é a rota get para '/flights'")
}

export async function getPassangersTravels(req, res) {
    res.send("Esta é a rota get para '/passengers/travels'")
}

