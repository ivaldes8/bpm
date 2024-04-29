import { Router } from "express";
import { errorHandler } from "../error-handler";

import adminMiddleware from "../middlewares/admin";
import authMiddleware from "../middlewares/auth";
import { getBranches, createBranch, deleteBranch, getBranchById, updateBranch, } from "../controllers/branch";


const branchRoutes: Router = Router()

branchRoutes.get('/', [authMiddleware], errorHandler(getBranches))
branchRoutes.post('/', [authMiddleware, adminMiddleware], errorHandler(createBranch))
branchRoutes.put('/:id', [authMiddleware, adminMiddleware], errorHandler(updateBranch))
branchRoutes.delete('/:id', [authMiddleware, adminMiddleware], errorHandler(deleteBranch))
branchRoutes.get('/:id', [authMiddleware], errorHandler(getBranchById))

export default branchRoutes