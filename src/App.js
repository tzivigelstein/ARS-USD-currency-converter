import React, { useEffect, useState } from 'react'
import getDollarPrice from './services/getDollarPrice'
import computeTaxes from './services/computeTaxes'

const App = () => {
  const [dollarData, setDolarData] = useState({})
  const [toConvert, setToConvert] = useState({
    amount: 0,
  })

  const resultInitialState = { preTotal: 0, paisTax: 0, afipTax: 0, finalAmount: 0 }
  const [result, setResult] = useState(resultInitialState)

  const { amount } = toConvert
  const { preTotal = 0, paisTax = 0, afipTax = 0, finalAmount = 0 } = result

  useEffect(() => {
    if (Object.keys(dollarData).length === 0) {
      Promise.resolve(getDollarPrice())
        .then(data => setDolarData(data))
        .catch(err => console.log(err))
    } else if (amount !== 0) {
      setResult(computeTaxes({ amount, dollarData }))
    }
  }, [amount])

  const onChange = e => {
    e.preventDefault()

    setToConvert({
      ...toConvert,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="w-full h-screen bg-gray-300">
      <main className="flex justify-center items-center">
        <div className="w-4/5 sm:w-2/3 bg-white mt-32 p-10">
          <p className="text-center text-3xl m-4">
            <span className="text-green-600">
              {dollarData.bid || 0} <span className="text-xl">ARS</span>
            </span>{' '}
            = 1 <span className="text-xl">USD</span>
          </p>
          <form className="flex justify-center items-center">
            <input
              name="amount"
              onChange={onChange}
              value={amount}
              type="number"
              className="w-2/3 py-2 px-3 text-gray-700 bg-gray-200"
              placeholder="Monto a convertir"
            />
          </form>
          <p className="text-center text-xl text-gray-700">
            Pre-total <span className="font-bold">{preTotal}</span> <span className="text-sm">ARS</span>
          </p>
          <p className="text-center text-xl text-gray-700">
            Impuesto PAIS <span className="text-sm">30%</span> <span className="font-bold">{paisTax}</span>{' '}
            <span className="text-sm">ARS</span>
          </p>
          <p className="text-center text-xl text-gray-700">
            Impuesto AFIP <span className="text-sm">35%</span> <span className="font-bold">{afipTax}</span>{' '}
            <span className="text-sm">ARS</span>
          </p>
          <p className="text-center text-4xl text-green-700">
            Total <span className="font-bold">{finalAmount}</span> <span className="text-xl">ARS</span>
          </p>
        </div>
      </main>
    </div>
  )
}

export default App
