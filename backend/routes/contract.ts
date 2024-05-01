import { Router } from "express";
import { errorHandler } from "../error-handler";

import adminMiddleware from "../middlewares/admin";
import authMiddleware from "../middlewares/auth";
import { createContract, deleteContract, getContractById, getContracts, updateContract } from "../controllers/contract";


const contractRoutes: Router = Router()

contractRoutes.get('/', [authMiddleware], errorHandler(getContracts))
contractRoutes.post('/', [authMiddleware, adminMiddleware], errorHandler(createContract))
contractRoutes.put('/:id', [authMiddleware, adminMiddleware], errorHandler(updateContract))
contractRoutes.delete('/:id', [authMiddleware, adminMiddleware], errorHandler(deleteContract))
contractRoutes.get('/:id', [authMiddleware], errorHandler(getContractById))

export default contractRoutes