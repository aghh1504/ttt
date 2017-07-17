import React, { Component } from 'react'
import * as actions from '../actions'
import { connect } from 'react-redux'
import CrsCode from './constants'

class Search extends Component {
  state = {
    value: ''
  }

  componentDidMount() {
    this.props.fetchCrsCode();
  }

  findCrsSuggestionsByName = (name) => {
    console.log('t=', this.props.crsCode);
    const nameFormatted = name.toLowerCase();
    return this.props.crsCode.filter((code) => {
      return code.stationName.toLowerCase() === nameFormatted;
    });
  }

  handleSubmitForm = event => {
    const { startingPoint, destination } = this.state
    event.preventDefault();
    const startingPointCrs = this.findCrsSuggestionsByName(startingPoint);
    const destinationCrs = this.findCrsSuggestionsByName(destination);
    const s = this.props.fetchRoutes(startingPointCrs[0].crsCode, destinationCrs[0].crsCode);
    console.log('s=', s);
    localStorage.setItem('routes', JSON.stringify(s))
  }

  onChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

  render() {
    const services = (this.props.routes[0] ? this.props.routes[0].trainServices : null);
    console.log('services: ', services);
    var storedValue = localStorage.getItem("routes");
    console.log('storedValue: ', storedValue);

    return (
      <div>
      <form onSubmit={this.handleSubmitForm}>
        <label>From</label>
        <input onChange={this.onChange} value={this.state.startingPoint} name='startingPoint'/>
        <label>To</label>
        <input onChange={this.onChange} value={this.state.destination} name='destination'/>
        <button type='sumbit'>Search!</button>
      </form>
      {

          services &&
          <div>
          <h2>{`${this.props.routes[0].locationName} - ${this.props.routes[0].filterLocationName}`}</h2>
          {
            this.props.routes[0].trainServices.map(train => {
              return (
                <div>
                  <p>{`The next train will arrive at ${train.sta}`}</p>
                  <p>{`The next train will arrive at ${train.operator}`}</p>
                  <p>{`The next train will arrive at ${train.platform}`}</p>
                  {  train.delayReason !== null ? <p>{` ${train.delayReason}`}</p> : <p>There are no delays</p> }
                </div>
              )
            })
          }

        </div>
      }
      {storedValue}
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('state=', state);
  return {
    routes: state.fetchRoutes,
    crsCode: state.fetchCrsCode
  }
}

export default connect(mapStateToProps, actions)(Search)
