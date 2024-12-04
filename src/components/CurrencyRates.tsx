import { useEffect, useState } from 'react'
import Loading from './Loading'
import Error from './Error'

interface Valute {
  ID: string
  NumCode: string
  CharCode: string
  Nominal: number
  Name: string
  Value: number
  Previous: number
}

interface RatesResponse {
  Date: string
  PreviousDate: string
  PreviousURL: string
  Timestamp: string
  Valute: Record<string, Valute>
}

const CurrencyRates = () => {
  const [rates, setRates] = useState<Record<string, Valute>>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
        if (!response.ok) {
          
          setError('Сеть не отвечает')
        }
        const data: RatesResponse = await response.json()
        setRates(data.Valute)
        setError(null)
      } catch (err) {
        setError(`Ошибка получения валют: ${err}`)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    const interval = setInterval(fetchData, 5000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error error={error} />
  }

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Курсы валют</h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Валюта</th>
            <th>Курс</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(rates).map(([key, value]) => (
            <tr key={key}>
              <td>
                {value.Name} ({value.CharCode})
              </td>
              <td>{value.Value.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CurrencyRates
