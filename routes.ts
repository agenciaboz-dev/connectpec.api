import express, { Express, Request, Response } from "express"
import { version } from "./src/version"
import study from "./src/rest/study/study"

export const router = express.Router()

router.get("/", (request, response) => {
    response.json({ version })
})

router.use("/study", study)
