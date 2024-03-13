import express, { Express } from 'express';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { NODE_ENV, PORT } from './secrets';
import rootRouter from './routes';
import { errorMiddleware } from './middlewares/errors';

const app: Express = express();
app.use(express.json());

app.use(errorMiddleware)
app.use('/api', rootRouter)


const port = PORT || 5000;

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

app.listen(port, () => console.log(`Server started on port ${port}`));