import express, { Express, Request, Response } from "express"
import { version } from "./src/version"

export const router = express.Router()

router.get("/", (request, response) => {
    response.json({ version })
})
