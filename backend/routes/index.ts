import { Router } from "express";
import authRoutes from "./auth";
import companyRoutes from "./company";
import userRoutes from "./user";

const rootRouter: Router = Router()

rootRouter.use("/auth", authRoutes)
rootRouter.use("/users", userRoutes)
rootRouter.use("/companies", companyRoutes)

export default rootRouter