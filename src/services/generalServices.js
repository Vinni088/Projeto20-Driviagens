import { generalRepository } from "../repositories/generalRepository.js";
import { errors } from "../errors/errors.js";

function gerardata() {
    let datajs = new Date();
    let dia = datajs.getDate();
    let month = datajs.getMonth() + 1;
    if (month < 10) {
        month = String(month);
        month = "0" + month;
    }
    let ano = datajs.getFullYear();
    let data = `${dia}-${month}-${ano}`;
    return data;
}

async function postPassengerService(firstName, lastName) {

    let passengers = (await generalRepository.selectFrom("passengers")).rows;

    for (let i = 0; i < passengers.length; i++) {
        if (passengers[i].firstName == firstName && passengers[i].lastName == lastName) {
            throw errors.conflict("Este passageiro");
        }
    }
    await generalRepository.insertIntoPassangers(firstName, lastName);

    return ("Passageiro registrado com sucesso");
}

async function postCityService(name) {

    let cities = (await generalRepository.selectFrom("cities")).rows;

    for (let i = 0; i < cities.length; i++) {
        if (cities[i].name.toLowerCase() == name.toLowerCase()) {
            throw errors.conflict("Esta cidade");
        }
    }

    await generalRepository.insertIntoCities(name.toLowerCase());

    return ("Cidade registrada com sucesso");
}

async function postFlightService(origin, destination, date) {

    if (origin === destination) {
        throw errors.incoherent("Inicio ou fim do trajeto");
    }

    let cities = (await generalRepository.selectFrom("cities")).rows;
    cities = cities.map(city => city.id)

    if (!cities.includes(origin) || !cities.includes(destination)) {
        throw errors.notFound("Inicio ou fim do trajeto");
    }

    let dateSplit = date.split("-")
    let nowSplit = gerardata().split("-")

    if (Number(dateSplit[2]) < Number(nowSplit[2])) {
        throw errors.unprocessableEntity("data: ano");
    } else if (
        (Number(dateSplit[2]) === Number(nowSplit[2])) && 
        (Number(dateSplit[1]) < Number(nowSplit[1]))) {
        throw errors.unprocessableEntity("data: mês");
    } else if ( 
        (Number(dateSplit[2]) === Number(nowSplit[2])) && 
        (Number(dateSplit[1]) === Number(nowSplit[1])) && 
        (Number(dateSplit[0]) < Number(nowSplit[0]))) {
        throw errors.unprocessableEntity("data: dia");
    }
    let novadata = dateSplit[1] + "-" + dateSplit[0] + "-" + dateSplit[2]
    await generalRepository.insertIntoFlights(origin, destination, novadata);

    return (" Vôo registrado com sucesso");
}

async function postTravelsService(passengerId, flightId) {
    let passengers = (await generalRepository.selectFrom("passengers")).rows;
    passengers = passengers.map(obj => obj.id);
    let flights = (await generalRepository.selectFrom("flights")).rows;
    flights = flights.map(obj => obj.id);
    if (!passengers.includes(passengerId)) {
        throw errors.notFound("Este passageiro");
    } else if (!flights.includes(flightId)) {
        throw errors.notFound("Este vôo");
    }

    await generalRepository.insertIntoTravels(passengerId, flightId);

    return ("Passageiro registrado com sucesso neste vôo");
}

async function getFlightsService( origin, destination ) {
    
    let flights = (await generalRepository.selectFlightsProperly()).rows;

    return (flights);
}

async function getPassengerTravelsService(nome) {
    if (nome) {
        let passengers = (await generalRepository.selectPassengersTravelsByName(nome)).rows
        passengers = passengers.map(pas => {
            return {
                passenger: pas.firstName + " " + pas.lastName,
                travels: pas.travels
            }
        })
        if (passengers.length > 10) throw {type: "tooManyResults", message: " Too many results "}
        return passengers;
    } else {
        let passengers = (await generalRepository.selectPassengersTravels()).rows;
        passengers = passengers.map(pas => {
            return {
                passenger: pas.firstName + " " + pas.lastName,
                travels: pas.travels
            }
        })
        if (passengers.length > 10) throw {type: "tooManyResults", message: " Too many results "}
        return passengers;
    }
}



export const generalServices = {
    postPassengerService,
    postCityService,
    postFlightService,
    postTravelsService,
    getFlightsService,
    getPassengerTravelsService
};