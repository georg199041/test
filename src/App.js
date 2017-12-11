/**
 * Make an App that has an
 * - input field
 * - button
 * - list of city, states
 * user should be able to enter a zipcode into the field
 * and press the button to save the city and state to the list.
 *
 * Bonus:
 * - Selecting an item in the list should fill the input with
 * the zip code that was used to look up the city and state
 * - when a list item is selected it should appear selected
 * - if the user enters a new zip code while an item is selected
 * and hits the button, the record should be updated (if valid input)
 * - User should be able to deselect selected item
 *
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import api from './api'

class App extends Component {
  handleClick(zip, id) {
    if (this.props.selectedZipId) {
      this.props.dispatch({ type: 'UPDATE_ITEM', zip, id })
    } else {
      this.props.dispatch({ type: 'LOADING', payload: true })
      api.getLocationByZip(zip)
        .then(res => this.props.dispatch({ type: 'UPDATE_LIST', payload: res.places[0], zip }))
    }
  }

  render() {
    let input
    return (
      <div className="app" onClick={(e) => {
        if (e.target.className !== 'city-item' && e.target.className !== 'input') {
          input.value = ''
          this.props.dispatch({ type: 'SELECTED_ZIP', payload: null })
        }
      }}>
        <div className="input-wrap">
          <div>ZIP example 90210</div>
          <input type="text"
                 className="input"
                 ref={el => input = el}
                 placeholder="Enter a ZIP code"
                 onKeyUp={() => {
                   this.props.dispatch({type: 'VALID_ZIP', payload: input && input.value.length })
                 }} />
          <button onClick={() => {
            this.handleClick(input.value, this.props.selectedZipId)
            input.value = ''
          }} disabled={!this.props.validZip}>Send ZIP</button>
        </div>
        <ul>
          {this.props.list.map(item => (
            <li key={item.id}
                onClick={(e) => {
              input.value = item.zip
              this.props.dispatch({ type: 'SELECTED_ZIP', payload: item.id })
            }} className={classnames('city-item', { selected: this.props.selectedZipId === item.id })}>
              {`${item['place name']}, ${item.state}, ${item.zip}`}
            </li>
        ))}
        </ul>
        {this.props.loading && <div className="loading">Loading</div>}
      </div>
    );
  }
}

const Root = connect((state = {
  list: [],
  loading: false,
  validZip: false,
  selectedZipId: null
}) => ({
  list: state.list,
  loading: state.loading,
  validZip: state.validZip,
  selectedZipId: state.selectedZipId
}), (dispatch) => ({ dispatch }))(App)

export default Root
