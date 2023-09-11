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
    const { passengerId, flightId } = req.body;

    let resposta = await generalServices.postTravelsService( passengerId, flightId )

    res.send(resposta)
}

export async function getFlights(req, res) {
    let resposta = await generalServices.getFlightsService()

    res.send(resposta)
}

export async function getPassangersTravels(req, res) {
    let resposta = await generalServices.getPassengerTravelsService()

    res.send(resposta)
}

