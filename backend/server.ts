import express, { Express } from "express"
import cron from "node-cron"
import rootRouter from "./routes"
import { PrismaClient } from "@prisma/client";
import { NODE_ENV, PORT } from "./secrets";
import { errorMiddleware } from "./middlewares/errors";
import path from "path";
import cors from 'cors';
import { sendEmailWithIncidencesByContract } from "./jobs/sendEmailWithIncidencesByContract";
import { checkNoLoadedContracts } from "./jobs/checkNoLoadedContracts";

const app: Express = express()

// Create a transporter object using the default SMTP transport

// Schedule task to run every minute
cron.schedule('0 0 * * *', async () => {
    console.log("Executing cron jobs")
    await checkNoLoadedContracts()
    await sendEmailWithIncidencesByContract()
});

app.use(express.json());

app.use(cors());

app.use("/api", rootRouter);

export const prismaClient = new PrismaClient()

if (NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist/")));

    app.get("*", (req, res) =>
        res.sendFile(
            path.resolve(__dirname, "../", "frontend", "dist", "index.html")
        )
    );
} else {
    app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`App working on port: ${PORT}!`)
})