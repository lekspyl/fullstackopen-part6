import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const Header = () => <div><h1>How would you rate our service?</h1></div>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatsLine = ({ text, value }) => <tr><td>{text}:</td><td>{value}</td></tr>

const StatsCalculator = ({ rates }) => {
  const totalRates = Object.values(rates).reduce((a, b) => a + b)
  if (totalRates > 0) {
    const avgScore = (rates.good - rates.bad) / totalRates
    const positivePct = (rates.good / totalRates) * 100

    return (
      <table>
        <tbody>
          <StatsLine text='Good' value={rates.good} />
          <StatsLine text='Okay' value={rates.ok} />
          <StatsLine text='Bad' value={rates.bad} />
          <StatsLine text='Average score' value={avgScore.toFixed(2)} />
          <StatsLine text='Total responses' value={totalRates} />
          <StatsLine text='Positive %' value={positivePct.toFixed(2)} />
        </tbody>
      </table>
    )
  } else {
    return <p>No feedback given</p>
  }
}

const StatsDisplay = ({ rates }) => {
  return (
    <footer>
      <h2>Statistics</h2>
      <StatsCalculator rates={rates} />
    </footer>
  )
}

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'RESET'
    })
  }

  return (
    <div>
      <Header />
      <Button onClick={good} text='Good' />
      <Button onClick={ok} text='Okay' />
      <Button onClick={bad} text='Bad' />
      <Button onClick={reset} text='Reset Stats' />
      <StatsDisplay rates={store.getState()} />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
