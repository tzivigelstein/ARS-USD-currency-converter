import { dollarApiUrl } from '../config'
const FIRST_RESULT = 0

const getDollarPrice = async () => {
  return await fetch(dollarApiUrl)
    .then(res => res.json())
    .then(
      values =>
        values.map(({ casa: { compra, venta, agencia } }) => ({
          bid: parseFloat(compra.replace(',', '.')),
          ask: parseFloat(venta.replace(',', '.')),
          agency: agencia,
        }))[FIRST_RESULT]
    )
}

export default getDollarPrice
