import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import { WithoutFunctions } from "./helpers"
import { PDFDocument, PDFForm } from "pdf-lib"
import path from "path"
// import fontkit from '@pdf-lib/fontkit'

export interface PdfField {
    name: string
    value: string
    bold?: boolean
}

export class PdfHandler {
    template_path: string
    output_dir: string
    filename: string
    font?: { regular: string; bold: string }
    fields: PdfField[]

    document?: PDFDocument
    form?: PDFForm

    constructor(data: WithoutFunctions<PdfHandler>) {
        this.template_path = data.template_path
        this.output_dir = data.output_dir
        this.filename = data.filename
        this.font = data.font
        this.fields = data.fields
    }

    async init() {
        const buffer = readFileSync(this.template_path)
        this.document = await PDFDocument.load(buffer)
        this.form = this.document.getForm()
    }

    async flatten() {
        if (!this.form || !this.document) {
            await this.init()
        }

        if (!this.form) {
            throw "Falha na inicialização do formulário"
        }

        this.form.flatten()
        await this.save()
    }

    async fillForm() {
        if (!this.form || !this.document) {
            await this.init()
        }

        if (!this.form) {
            throw "Falha na inicialização do formulário"
        }

        // todo CONFIGURAR FONTES
        // document.registerFontkit(fontkit)
        // const fontRegularBytes = fs.readFileSync(path.join(__dirname, `./fonts/${options.font.regular}`))
        // const fontBoldBytes = fs.readFileSync(path.join(__dirname, `./fonts/${options.font.bold}`))

        // const customFontRegular = await pdfDoc.embedFont(fontRegularBytes)
        // const customFontBold = await pdfDoc.embedFont(fontBoldBytes)

        this.fields.forEach((field) => {
            try {
                const formfield = this.form!.getTextField(field.name)
                formfield.setText(field.value)
                // formfield.updateAppearances(field.bold ? customFontBold : customFontRegular)
            } catch (error) {
                console.log(`error setting ${field.name} `)
                console.log(error)
            }
        })

        await this.save()
    }

    async updateImage(field_name: string, image_path: string, image_base64?: string) {
        if (!this.form || !this.document) {
            await this.init()
        }

        const imageBytes = image_path && readFileSync(path.join(__dirname, `./image`))
        const image = await this.document!.embedPng(image_base64 || imageBytes)

        try {
            const button = this.form!.getButton(field_name)
            button.setImage(image)
        } catch (error) {
            console.log(error)
        }

        await this.save()
    }

    async save() {
        if (!this.document) {
            throw "documento não inicializado"
        }

        if (!existsSync(this.output_dir)) {
            mkdirSync(this.output_dir, { recursive: true })
        }

        const file = await this.document.save()
        writeFileSync(path.join(this.output_dir, this.filename), file)
    }
}
