import { Router } from "express";
import authRoutes from "./auth";
import companyRoutes from "./company";
import userRoutes from "./user";
import loadRoutes from "./load";
import mediatorRoutes from "./mediator";
import branchRoutes from "./branch";
import contractRoutes from "./contract";

const rootRouter: Router = Router()

rootRouter.use("/auth", authRoutes)
rootRouter.use("/users", userRoutes)
rootRouter.use("/companies", companyRoutes)
rootRouter.use("/mediators", mediatorRoutes)
rootRouter.use("/branches", branchRoutes)
rootRouter.use("/load", loadRoutes)
rootRouter.use("/contracts", contractRoutes)


export default rootRouter