const PAIS_TAX = 0.3
const AFIP_TAX = 0.35

const computeTaxes = ({ amount, dollarData }) => {
  let { bid: dollarPrice } = dollarData
  const parsedAmount = parseFloat(amount)

  console.log({ parsedAmount, dollarPrice })

  const preTotalResult = dollarPrice * parsedAmount
  const paisTaxResult = preTotalResult * PAIS_TAX
  const afipTaxResult = preTotalResult * AFIP_TAX
  const finalAmountResult = preTotalResult + paisTaxResult + afipTaxResult

  const preTotal = isNaN(preTotalResult) ? 0 : preTotalResult
  const paisTax = isNaN(paisTaxResult) ? 0 : paisTaxResult
  const afipTax = isNaN(afipTaxResult) ? 0 : afipTaxResult
  const finalAmount = isNaN(finalAmountResult) ? 0 : finalAmountResult

  const parseNumber = number => number.toLocaleString([], { currency: 'ARS', maximumFractionDigits: 2 })

  return {
    preTotal: parseNumber(preTotal),
    paisTax: parseNumber(paisTax),
    afipTax: parseNumber(afipTax),
    finalAmount: parseNumber(finalAmount),
  }
}

export default computeTaxes
