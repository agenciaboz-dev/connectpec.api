import express, { Express, Request, Response } from 'express'
import { InvestmentStudyForm } from '../../class/InvestmentStudy'
import { PdfField, PdfHandler } from '../../class/PdfHandler'
const router = express.Router()

router.post("/generate", async (request: Request, response: Response) => {
    const data = request.body as InvestmentStudyForm

    try {
        const values = {...data.confinementStudyForm, ...data.financialAnalysisForm}
        const fields:PdfField[] = []

        Object.entries(values).forEach(([key, value]) => {
            const field: PdfField = { name: key, value: String(value) }
            fields.push(field)
        })

        console.log(fields)

        const filename = "relatorio.pdf"
        const output_dir = "static/relatorios/"
        const fullpath = output_dir + filename

        const pdf = new PdfHandler({ fields, template_path: "static/template/relatorio-template.pdf", output_dir, filename })

        await pdf.fillForm()

        response.json({ url: `https://api.connectpec.boz.app.br/${fullpath}` })
    } catch (error) {
        console.log(error)
        response.status(500).send(error)
    }
})

export default router