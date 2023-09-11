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

    return("Passageiro registrado com sucesso");
}

async function postCityService(name) {

    let cities = (await generalRepository.selectFrom("cities")).rows;

    for (let i = 0; i < cities.length; i++) {
        if (cities[i].name.toLowerCase() == name.toLowerCase()) {
            throw errors.conflict("Esta cidade");
        }
    }

    await generalRepository.insertIntoCities(name.toLowerCase());

    return("Cidade registrada com sucesso");
}

async function postFlightService(origin, destination, date) {

    if (origin === destination) {
        throw errors.incoherent("Inicio ou fim do trajeto");
    }

    let cities = (await generalRepository.selectFrom("cities")).rows;
    cities = cities.map( city => city.id)

    if (!cities.includes(origin) || !cities.includes(destination)) {
        throw errors.notFound("Inicio ou fim do trajeto");
    }

    let dateSplit = date.split("-")
    let nowSplit = gerardata().split("-")

    if (Number(dateSplit[2]) < Number(nowSplit[2])) {
        throw errors.unprocessableEntity("data: ano");
    } else if (Number(dateSplit[1]) < Number(nowSplit[1])) {
        throw errors.unprocessableEntity("data: mês");
    } else if (Number(dateSplit[0]) < Number(nowSplit[0])) {
        throw errors.unprocessableEntity("data: dia");
    } 

    await generalRepository.insertIntoFlights(origin, destination, date);

    return(" Vôo registrado com sucesso");
}




export const generalServices = {
    postPassengerService,
    postCityService,
    postFlightService
  };