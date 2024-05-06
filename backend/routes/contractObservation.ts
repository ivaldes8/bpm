import { Router } from "express";
import { errorHandler } from "../error-handler";

import adminMiddleware from "../middlewares/admin";
import authMiddleware from "../middlewares/auth";
import { createContractObservation, deleteContractObservation, getContractObservationById, getContractObservations, updateContractObservation } from "../controllers/contractObservation";


const contractObservationRoutes: Router = Router()

contractObservationRoutes.get('/', [authMiddleware], errorHandler(getContractObservations))
contractObservationRoutes.post('/', [authMiddleware, adminMiddleware], errorHandler(createContractObservation))
contractObservationRoutes.put('/:id', [authMiddleware, adminMiddleware], errorHandler(updateContractObservation))
contractObservationRoutes.delete('/:id', [authMiddleware, adminMiddleware], errorHandler(deleteContractObservation))
contractObservationRoutes.get('/:id', [authMiddleware], errorHandler(getContractObservationById))

export default contractObservationRoutes