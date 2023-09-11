import joiBase from "joi"
import joiDate from "@joi/date"

const joi = joiBase.extend(joiDate)

export const passangerSchema = joi.object({
  firstName: joi.string().min(2).max(100).required(),
	lastName: joi.string().min(2).max(100).required()
});

export const citySchema = joi.object({
  name: joi.string().min(2).max(100).required()
});

export const flightSchema = joi.object({
  origin: joi.number().integer().min(1).required(),
  destination: joi.number().integer().min(1).required(),
  date: joi.date().format('DD-MM-YYYY').required()
});

export const travelSchema = joi.object({
  passengerId: joi.number().integer().min(1).required(),
	flightId: joi.number().integer().min(1).required()
});


/*
export const employeeInsertSchema = joi.object({
  fullName: joi.string().required(),
  birthDate: joi.date().format('DD/MM/YYYY').required(),
  position: joi.string().required(),
  grossSalary: joi.number().required(),
});

export const employeeUpdateSchema = joi.object({
  fullName: joi.string(),
  birthDate: joi.date(),
  position: joi.string(),
  grossSalary: joi.number(),
});
*/
