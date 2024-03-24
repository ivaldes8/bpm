import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { createUser, deleteUser, getUser, getUserList, updateUser } from "../controllers/users";

const userRoutes: Router = Router()

userRoutes.get("/", [authMiddleware, adminMiddleware], errorHandler(getUserList))
userRoutes.get("/:id", [authMiddleware, adminMiddleware], errorHandler(getUser))
userRoutes.post("/", [authMiddleware, adminMiddleware], errorHandler(createUser))
userRoutes.put("/:id", [authMiddleware, adminMiddleware], errorHandler(updateUser))
userRoutes.delete("/:id", [authMiddleware, adminMiddleware], errorHandler(deleteUser))


export default userRoutes