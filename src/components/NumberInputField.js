import React, { Component } from 'react'

class NumberInputField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      number: 0
    }
  }

  incrementNumber = () => {
    if (this.state.number < Number.MAX_SAFE_INTEGER) {
    const number = this.state.number + 1
      this.setState({ number: number })
      this.props.updateNrOfTokens(number)
    }
  }

  decrementNumber = () => {
    if (this.state.number > 0) {
        const number = this.state.number - 1
      this.setState({ number: number })
      this.props.updateNrOfTokens(number)
    }
  }

  setNumberFromInput = (event) => {
    const newNumber = parseInt(event.target.value)
    if (newNumber >= 0 && newNumber <= Number.MAX_SAFE_INTEGER) {
        this.setState({ number: newNumber })
        this.props.updateNrOfTokens(newNumber)
    }
  }

  render() {
    return (
      <div className="number-input-field">
        <button onClick={this.decrementNumber}>-</button>
        <input type="number" value={this.state.number} onChange={this.setNumberFromInput}/>
        <button onClick={this.incrementNumber}>+</button>
      </div>
    )
  }
}

export default NumberInputField