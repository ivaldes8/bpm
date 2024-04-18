import { Router } from "express";
import { errorHandler } from "../error-handler";
import { createCompany, deleteCompany, getCompanies, getCompaniesSimplified, getCompanyById, updateCompany } from "../controllers/company";
import adminMiddleware from "../middlewares/admin";
import authMiddleware from "../middlewares/auth";

const companyRoutes: Router = Router()

companyRoutes.get('/', [authMiddleware], errorHandler(getCompanies))
companyRoutes.get('/list/simplified', [authMiddleware], errorHandler(getCompaniesSimplified))
companyRoutes.post('/', [authMiddleware, adminMiddleware], errorHandler(createCompany))
companyRoutes.put('/:id', [authMiddleware, adminMiddleware], errorHandler(updateCompany))
companyRoutes.delete('/:id', [authMiddleware, adminMiddleware], errorHandler(deleteCompany))
companyRoutes.get('/:id', [authMiddleware], errorHandler(getCompanyById))


export default companyRoutes