import { Router } from "express";
import multer from 'multer'
const router = Router()
import { importCSV } from '../controllers/import.controller.js'

const upload = multer({
    storage: multer.memoryStorage()
})

router.post("/import",upload.single("file"), importCSV)




export default router