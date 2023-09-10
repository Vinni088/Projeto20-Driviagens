import { Router } from "express";
import generalRoutes from "./generalRoutes.js"

const router = Router();

router.use(generalRoutes);

export default router;
