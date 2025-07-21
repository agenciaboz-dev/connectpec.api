import express, { Express, Request, Response } from "express"
import { InvestmentStudyForm } from "../../class/InvestmentStudy"
import { PdfField, PdfHandler } from "../../class/PdfHandler"
import { v4 as uuidv4 } from "uuid"
const router = express.Router()

const getSimulationName = (simulation: string | null) => {
    if (simulation === "2") {
        return "Comparacao"
    } else if (simulation === "1") {
        return "ArrobaProduzida"
    } else {
        return "Diarias"
    }
}

const getFormattedTimestamp = (): string => {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes().toString().padStart(2, "0")
    const day = now.getDate().toString().padStart(2, "0")
    const month = (now.getMonth() + 1).toString().padStart(2, "0")
    const year = now.getFullYear()

    return `${hours}h${minutes}m_${day}.${month}.${year}_${uuidv4().substring(0, 8)}`
}

router.post("/generate", async (request: Request, response: Response) => {
    const data = request.body as InvestmentStudyForm

    try {
        const values = { ...data.documentInfo, ...data.confinementStudyForm, ...data.financialAnalysisForm }
        const fields: PdfField[] = []

        Object.entries(values).forEach(([key, value]) => {
            const field: PdfField = { name: key, value: String(value) }
            fields.push(field)
        })

        console.log(fields)

        const output_dir = "static/relatorios/"
        const chosenSimulation = data.simulation
        const simName = getSimulationName(chosenSimulation)
        const timestamp = getFormattedTimestamp()
        const filename = `Estudo_de_Investimento_${simName}_${timestamp}.pdf`
        const fullpath = output_dir + filename
        console.log({ chosenSimulation })

        const pdf = new PdfHandler({
            fields,
            template_path: `static/templates/template_${chosenSimulation}.pdf`,
            output_dir,
            filename,
        })

        await pdf.fillForm()

        // response.json({ url: `http://192.168.15.4:8090/${fullpath}?time=${new Date().getTime()}` })
        response.json({ url: `https://api.connectpec.boz.app.br/${fullpath}?time=${new Date().getTime()}` })
    } catch (error) {
        console.log(error)
        response.status(500).send(error)
    }
})

export default router
