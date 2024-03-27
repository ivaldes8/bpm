import { Router } from "express";
import { changePassword, login, me, signup, updateProfile } from "../controllers/auth";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";

const authRoutes: Router = Router()

authRoutes.post("/login", errorHandler(login))
authRoutes.post("/signup", errorHandler(signup))
authRoutes.post("/change-password", [authMiddleware], errorHandler(changePassword))
authRoutes.put("/", [authMiddleware], errorHandler(updateProfile))
authRoutes.get("/me", [authMiddleware], errorHandler(me))

export default authRoutes