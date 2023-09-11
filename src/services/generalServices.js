import { generalRepository } from "../repositories/generalRepository.js";
import { errors } from "../errors/errors.js";

export default async function postPassengerService(firstName, lastName) {

    let passengers = (await generalRepository.selectFrom("passengers")).rows;

    for (let i = 0; i < passengers.length; i++) {
        if (passengers[i].firstName == firstName && passengers[i].lastName == lastName) {
            throw errors.conflict("Passageiro");
        }
    }
    let insert = (await generalRepository.insertIntoPassangers(firstName, lastName))

    return("Passageiro registrado com sucesso");
}






export const generalServices = {
    postPassengerService
  };