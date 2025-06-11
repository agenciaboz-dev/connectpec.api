export type DocumentInfo = {
    telefoneContato: string | null
    emailContato: string | null
    siteContato: string | null
    versaoEData: string | null
}
export type ConfinementStudyForm = {
    pesoOrigemKg: number | string | null
    rendimento: number | string | null
    pesoOrigemArroba: number | string | null
    custoDaCompraPorArroba: number | string | null
    custoDaCompraPorKg: number | string | null
    custoPorAnimal: number | string | null
    quebraDeViagemEmPorcentagem: number | string | null
    quebraDeViagemEmKg: number | string | null
    pesoConfinamentoKg: number | string | null
    pesoConfinamentoArroba: number | string | null
    rendimentoNegociado: number | string | null
    pesoConfinamentoArrobaNegociado: number | string | null
    responsavelPeloFreteInicial: string | null
    distanciaDaOrigemAoConfinamento: number | string | null
    custoDoFretePorKm: number | string | null
    numeroDeCabecasPorCarreta: number | string | null
    custoDoFretePorAnimal: number | string | null
    custoDoFretePorArroba: number | string | null
    subsidio: number | string | null
    ganhoMedioDiarioEmConfinamento: number | string | null
    diariasDeEngorda: number | string | null
    pesoAproximadoNoAbateEmKg: number | string | null
    ganhoNoPeriodoEmKg: number | string | null
    ganhoMedioDiarioDaOrigemAoConfinamento: number | string | null
    rendimentoDeAbate: number | string | null
    ganhoDiarioDeCarcaca: number | string | null
    valorDaArrobaFutura: number | string | null
    bonificacao: number | string | null
    pesoVendaArroba: number | string | null
    receitaPorAnimal: number | string | null
}
export type FinancialAnalysisForm = {
    valorDiaria: number | string | null
    valorArrobaProduzida: number | string | null
    ganhoEmArrobaOrigem: number | string | null
    ganhoEmArrobaConfinamento: number | string | null
    ganhoEmArrobaConfinamentoNegociado: number | string | null
    freteResultado: number | string | null
    comissaoEmPorcentagem: number | string | null
    comissaoEmReais: number | string | null
    impostosETaxas: number | string | null
    compra: number | string | null
    receitaBruta: number | string | null
    receitaLiquida: number | string | null
    confinamento: number | string | null
    confinamentoArrobaProduzida: number | string | null
    despesaPorAnimal: number | string | null
    despesaPorAnimalNegociado: number | string | null
    investimentoInicial: number | string | null
    resultadoLiquido: number | string | null
    resultadoLiquidoNegociado: number | string | null
    prazo: string | null
    porcentagemAoMes: number | string | null
    porcentagemAoMesNegociado: number | string | null
    previsaoDeEntrada: string | null
    previsaoDeAbate: string | null
}
export interface InvestmentStudyForm {
    simulation: string | null
    documentInfo: DocumentInfo
    confinementStudyForm: ConfinementStudyForm
    financialAnalysisForm: FinancialAnalysisForm
}
