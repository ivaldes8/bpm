import { Router } from "express";
import authRoutes from "./auth";
import companyRoutes from "./company";
import userRoutes from "./user";
import loadRoutes from "./load";
import mediatorRoutes from "./mediator";

const rootRouter: Router = Router()

rootRouter.use("/auth", authRoutes)
rootRouter.use("/users", userRoutes)
rootRouter.use("/companies", companyRoutes)
rootRouter.use("/mediators", mediatorRoutes)
rootRouter.use("/load", loadRoutes)

export default rootRouter