import { generalServices } from "../services/generalServices.js"
import httpStatus from "http-status";


export async function postPassengers(req, res) {
    const { firstName, lastName } = req.body;

    let resposta = await generalServices.postPassengerService( firstName, lastName )

    res.send(resposta)
}

export async function postCities(req, res) {
    const { name } = req.body;

    let resposta = await generalServices.postCityService(name)

    res.send(resposta)
}

export async function postFlights(req, res) {
    const { origin, destination, date } = req.body;

    let resposta = await generalServices.postFlightService(origin, destination, date)

    res.send(resposta)
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

