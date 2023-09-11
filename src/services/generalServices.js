import { generalRepository } from "../repositories/generalRepository.js";
import { errors } from "../errors/errors.js";

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






export const generalServices = {
    postPassengerService,
    postCityService
  };