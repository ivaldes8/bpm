import { Router } from "express";
import { errorHandler } from "../error-handler";

import adminMiddleware from "../middlewares/admin";
import authMiddleware from "../middlewares/auth";
import { createIncidenceDocument, deleteIncidenceDocument, getIncidenceDocumentById, getIncidenceDocuments, updateIncidenceDocument } from "../controllers/incidenceDocument";


const incidenceDocumentRoutes: Router = Router()

incidenceDocumentRoutes.get('/', [authMiddleware], errorHandler(getIncidenceDocuments))
incidenceDocumentRoutes.post('/', [authMiddleware], errorHandler(createIncidenceDocument))
incidenceDocumentRoutes.put('/:id', [authMiddleware], errorHandler(updateIncidenceDocument))
incidenceDocumentRoutes.delete('/:id', [authMiddleware], errorHandler(deleteIncidenceDocument))
incidenceDocumentRoutes.get('/:id', [authMiddleware], errorHandler(getIncidenceDocumentById))

export default incidenceDocumentRoutes