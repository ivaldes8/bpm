import { Router } from "express";
import { errorHandler } from "../error-handler";
import { getLoadLogs, importData, getLoadLogById, deleteLoadLog } from "../controllers/load/load";
import monitorMiddleware from "../middlewares/monitor";
import authMiddleware from "../middlewares/auth";
import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const loadRoutes: Router = Router()

loadRoutes.get('/', [authMiddleware, monitorMiddleware], errorHandler(getLoadLogs))
loadRoutes.post('/', [authMiddleware, monitorMiddleware, upload.single('file')], errorHandler(importData))
loadRoutes.delete('/:id', [authMiddleware, monitorMiddleware], errorHandler(deleteLoadLog))
loadRoutes.get('/:id', [authMiddleware, monitorMiddleware], errorHandler(getLoadLogById))


export default loadRoutes