import { Router } from "express";
import { errorHandler } from "../error-handler";

import adminMiddleware from "../middlewares/admin";
import authMiddleware from "../middlewares/auth";
import { createContractDocument, deleteContractDocument, getContractDocumentById, getContractDocuments, updateContractDocument } from "../controllers/contractDocument";


const contractDocumentRoutes: Router = Router()

contractDocumentRoutes.get('/', [authMiddleware], errorHandler(getContractDocuments))
contractDocumentRoutes.post('/', [authMiddleware], errorHandler(createContractDocument))
contractDocumentRoutes.put('/:id', [authMiddleware], errorHandler(updateContractDocument))
contractDocumentRoutes.delete('/:id', [authMiddleware, adminMiddleware], errorHandler(deleteContractDocument))
contractDocumentRoutes.get('/:id', [authMiddleware], errorHandler(getContractDocumentById))

export default contractDocumentRoutes