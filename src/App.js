import React, { useEffect, useState } from 'react'

const App = () => {
  const [dolar, setDolar] = useState({})
  const [toconvert, setToConvert] = useState({
    monto: 0,
  })

  const resultInitialState = { pre: 0, impuesto1: 0, impuesto2: 0, final: 0 }
  const [result, setResult] = useState(resultInitialState)

  const { monto } = toconvert
  const { preTotal = 0, firstTax = 0, secondTax = 0, finalAmount = 0 } = result

  useEffect(() => {
    if (Object.keys(dolar) == 0) {
      getDolar()
    }

    if (monto !== 0) {
      compute(monto)
    }
  }, [monto])

  const getDolar = async () => {
    const values = await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales').then(res => res.json())

    const parsedValues = values.map(({ casa: { compra, venta, agencia } }) => ({
      compra: compra.replace(',', '.'),
      venta: venta.replace(',', '.'),
      agencia,
    }))

    setDolar(parsedValues[0])
  }

  const onChange = e => {
    e.preventDefault()

    setToConvert({
      ...toconvert,
      [e.target.name]: e.target.value,
    })
  }

  const compute = amount => {
    let { compra: price } = dolar
    const parsedAmount = parseFloat(amount)
    const parsedPrice = parseFloat(price)

    const preTotal = parsedPrice * parsedAmount
    const firstTax = preTotal * 0.3
    const secondTax = preTotal * 0.35
    const f = preTotal + firstTax + secondTax

    setResult({
      preTotal: preTotal.toFixed(2),
      firstTax: firstTax.toFixed(2),
      secondTax: secondTax.toFixed(2),
      finalAmount: f.toFixed(2),
    })
  }

  return (
    <div className="w-full h-screen bg-gray-300">
      <main className="flex justify-center items-center">
        <div className="w-4/5 sm:w-2/3 bg-white mt-32">
          <p className="text-center text-3xl m-4">
            <span className="text-green-600">
              {dolar.compra} <span className="text-xl">ARS</span>
            </span>{' '}
            = 1 <span className="text-xl">USD</span>
          </p>
          <form className="flex justify-center items-center">
            <input
              name="monto"
              onChange={onChange}
              value={monto}
              type="number"
              className="w-2/3 py-2 px-3 text-gray-700 bg-gray-200"
              placeholder="Monto a convertir"
            />
          </form>
          <p className="text-center text-xl text-gray-700">
            Pre-total <span className="font-bold">{preTotal}</span> <span className="text-sm">ARS</span>
          </p>
          <p className="text-center text-xl text-gray-700">
            Impuesto PAIS <span className="text-sm">30%</span> <span className="font-bold">{firstTax}</span>{' '}
            <span className="text-sm">ARS</span>
          </p>
          <p className="text-center text-xl text-gray-700">
            Impuesto AFIP <span className="text-sm">35%</span> <span className="font-bold">{secondTax}</span>{' '}
            <span className="text-sm">ARS</span>
          </p>
          <p className="text-center text-4xl text-green-700">
            Total <span className="font-bold">{finalAmount}</span> <span className="text-xl">ARS</span>
          </p>
        </div>
      </main>
      <footer className="bg-white w-4/5 sm:w-2/3 m-auto">
        <div className="p-3">
          <p className="text-center text-gray-600 mt-4">Conversor de dolar a pesos para compras al exterior</p>
          <p className="text-center text-gray-600 mt-2">
            Copyright {new Date().getFullYear()} Todos los derechos reservados &copy;
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
