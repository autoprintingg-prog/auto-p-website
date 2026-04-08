import { Calculator, Copy, Layers3 } from 'lucide-react'
import { useMemo, useState } from 'react'

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const pricingModes = [
  {
    key: 'bw',
    label: 'B&W',
    note: 'Use the per-page black and white rate configured by the connected print desk.',
  },
  {
    key: 'color',
    label: 'Color',
    note: 'Use the per-page color rate configured by the connected print desk.',
  },
] as const

export function PricingCalculator() {
  const [mode, setMode] = useState<'bw' | 'color'>('bw')
  const [pages, setPages] = useState(1)
  const [copies, setCopies] = useState(1)
  const [rate, setRate] = useState('')
  const [duplex, setDuplex] = useState<'single' | 'duplex'>('single')

  const numericRate = Number(rate)
  const total = useMemo(() => {
    if (!numericRate || numericRate < 0) {
      return 0
    }

    return pages * copies * numericRate
  }, [copies, numericRate, pages])

  const activeMode = pricingModes.find((item) => item.key === mode)

  return (
    <div className="glass-card calculator">
      <div className="calculator-header">
        <div>
          <span className="eyebrow">Price Calculator</span>
          <h3>Estimate a print request using your configured rate</h3>
        </div>
        <div className="calculator-icon">
          <Calculator size={20} />
        </div>
      </div>

      <div className="toggle-row">
        {pricingModes.map((item) => (
          <button
            key={item.key}
            aria-pressed={mode === item.key}
            className={['toggle-card', mode === item.key ? 'is-active' : ''].join(' ')}
            onClick={() => setMode(item.key)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>

      <p className="calculator-note">{activeMode?.note}</p>

      <div className="calculator-grid">
        <label className="field">
          <span>Pages</span>
          <div className="field-input">
            <Layers3 size={16} />
            <input
              min="1"
              onChange={(event) => setPages(Number(event.target.value))}
              type="number"
              value={pages}
            />
          </div>
        </label>

        <label className="field">
          <span>Copies</span>
          <div className="field-input">
            <Copy size={16} />
            <input
              min="1"
              onChange={(event) => setCopies(Number(event.target.value))}
              type="number"
              value={copies}
            />
          </div>
        </label>

        <label className="field field-full">
          <span>Rate per page</span>
          <div className="field-input">
            <span className="field-prefix">INR</span>
            <input
              inputMode="decimal"
              min="0"
              onChange={(event) => setRate(event.target.value)}
              placeholder="Enter your configured rate"
              step="0.01"
              type="number"
              value={rate}
            />
          </div>
        </label>
      </div>

      <div className="toggle-row">
        <button
          aria-pressed={duplex === 'single'}
          className={['toggle-card', duplex === 'single' ? 'is-active' : ''].join(' ')}
          onClick={() => setDuplex('single')}
          type="button"
        >
          Single-side
        </button>
        <button
          aria-pressed={duplex === 'duplex'}
          className={['toggle-card', duplex === 'duplex' ? 'is-active' : ''].join(' ')}
          onClick={() => setDuplex('duplex')}
          type="button"
        >
          Duplex
        </button>
      </div>

      <div className="result-card">
        <div>
          <span className="result-label">Formula</span>
          <strong>
            {pages} x {numericRate > 0 ? numericRate.toFixed(2) : 'rate'} x {copies}
          </strong>
        </div>
        <div>
          <span className="result-label">Estimated total</span>
          <strong>{currencyFormatter.format(total)}</strong>
        </div>
      </div>

      <p className="calculator-footnote">
        Duplex preference is captured for workflow clarity. The visible formula stays pages x rate x
        copies to keep the pricing model explicit and easy to understand.
      </p>
    </div>
  )
}
