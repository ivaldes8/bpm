import { Router } from "express";
import authRoutes from "./auth";
import companyRoutes from "./company";

const rootRouter: Router = Router()

rootRouter.use("/auth", authRoutes)
rootRouter.use("/companies", companyRoutes)

export default rootRouter