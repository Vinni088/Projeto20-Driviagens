import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { 
    passangerSchema, 
    citySchema, 
    flightSchema, 
    travelSchema 
} from "../schemas/generalSchemas.js"
import {
    postPassengers, 
    postCities, 
    postFlights, 
    postTravels,
    getFlights,
    getPassangersTravels
} from "../controllers/generalControllers.js"

const generalRoutes = Router();

generalRoutes.post("/passengers", validateSchema(passangerSchema), postPassengers);
generalRoutes.post("/cities", validateSchema(citySchema), postCities);
generalRoutes.post("/flights", validateSchema(flightSchema), postFlights);
generalRoutes.post("/travels", validateSchema(travelSchema), postTravels);
generalRoutes.get("/flights", getFlights);
generalRoutes.get("/passengers/travels", getPassangersTravels);

export default generalRoutes

