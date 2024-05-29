import { Router } from "express";
import { errorHandler } from "../error-handler";

import adminMiddleware from "../middlewares/admin";
import authMiddleware from "../middlewares/auth";
import { getTypeConciliation, createTypeConciliation, deleteTypeConciliation, updateTypeConciliation, getTypeConciliationById } from "../controllers/typeConciliation";


const TypeConciliationRoutes: Router = Router()

TypeConciliationRoutes.get('/', [authMiddleware], errorHandler(getTypeConciliation))
TypeConciliationRoutes.post('/', [authMiddleware, adminMiddleware], errorHandler(createTypeConciliation))
TypeConciliationRoutes.put('/:id', [authMiddleware, adminMiddleware], errorHandler(updateTypeConciliation))
TypeConciliationRoutes.delete('/:id', [authMiddleware, adminMiddleware], errorHandler(deleteTypeConciliation))
TypeConciliationRoutes.get('/:id', [authMiddleware], errorHandler(getTypeConciliationById))

export default TypeConciliationRoutes