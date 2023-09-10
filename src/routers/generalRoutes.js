import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import {
    postPassengers, 
    postCities, 
    postFlights, 
    postTravels,
    getFlights,
    getPassangersTravels
} from "../controllers/generalControllers.js"

const generalRoutes = Router();

generalRoutes.post("/passengers", postPassengers);
generalRoutes.post("/cities", postCities);
generalRoutes.post("/flights", postFlights);
generalRoutes.post("/travels", postTravels);
generalRoutes.get("/flights", getFlights);
generalRoutes.get("/passengers/travels", getPassangersTravels);

export default generalRoutes

