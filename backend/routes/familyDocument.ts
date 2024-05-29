import { Router } from "express";
import { errorHandler } from "../error-handler";

import adminMiddleware from "../middlewares/admin";
import authMiddleware from "../middlewares/auth";
import { createFamilyDocument, deleteFamilyDocument, getFamilyDocuments, updateFamilyDocument, getFamilyDocumentById } from "../controllers/familyDocument";


const familyDocumentRoutes: Router = Router()

familyDocumentRoutes.get('/', [authMiddleware], errorHandler(getFamilyDocuments))
familyDocumentRoutes.post('/', [authMiddleware, adminMiddleware], errorHandler(createFamilyDocument))
familyDocumentRoutes.put('/:id', [authMiddleware, adminMiddleware], errorHandler(updateFamilyDocument))
familyDocumentRoutes.delete('/:id', [authMiddleware, adminMiddleware], errorHandler(deleteFamilyDocument))
familyDocumentRoutes.get('/:id', [authMiddleware], errorHandler(getFamilyDocumentById))

export default familyDocumentRoutes